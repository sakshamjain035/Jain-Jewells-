import mongoose from "mongoose";
import * as dns from "dns";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Use global to cache the connection in dev (avoids multiple connections on hot reload)
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable in .env.local");
  }
  return uri;
}


/**
 * Resolves SRV records using Google DNS (8.8.8.8) as a fallback.
 * The system DNS on some machines doesn't support SRV queries,
 * which causes MongoDB Atlas SRV connections to fail.
 */
function resolveWithGoogleDns(uri: string): Promise<string> {
  return new Promise((resolve) => {
    // Only handle mongodb+srv:// URIs
    if (!uri.startsWith("mongodb+srv://")) {
      return resolve(uri);
    }

    try {
      const url = new URL(uri);
      const hostname = url.hostname;

      const resolver = new dns.Resolver();
      resolver.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

      resolver.resolveSrv(`_mongodb._tcp.${hostname}`, (err, addresses) => {
        if (err || !addresses || addresses.length === 0) {
          // Fallback to original URI
          return resolve(uri);
        }

        const hosts = addresses
          .map((a) => `${a.name}:${a.port}`)
          .join(",");

        // Rebuild as a direct mongodb:// URI
        const userInfo = url.username
          ? `${url.username}${url.password ? ":" + url.password : ""}`
          : "";
        const pathname = url.pathname && url.pathname !== "/" ? url.pathname : "/jewelry-store";
        const params = new URLSearchParams(url.search);
        params.set("ssl", "true");
        params.set("retryWrites", "true");
        params.set("w", "majority");
        if (!params.has("authSource")) {
          params.set("authSource", "admin");
        }

        const directUri = `mongodb://${userInfo}@${hosts}${pathname}?${params.toString()}`;
        resolve(directUri);
      });
    } catch {
      resolve(uri);
    }
  });
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    const uri = getMongoUri();
    cached.promise = resolveWithGoogleDns(uri).then((resolvedUri) =>
      mongoose.connect(resolvedUri, opts).then((m) => m)
    );
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

