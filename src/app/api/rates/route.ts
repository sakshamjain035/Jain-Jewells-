import { NextResponse } from "next/server";
import {
  buildLiveRates,
  FALLBACK_LIVE_RATES,
  RATE_CONFIG,
  type LiveRatesPayload,
} from "@/lib/liveRates";

export const dynamic = "force-dynamic";

const GOLD_SPOT_URL = "https://api.gold-api.com/price/XAU";
const SILVER_SPOT_URL = "https://api.gold-api.com/price/XAG";
const FX_URL = "https://open.er-api.com/v6/latest/USD";

interface CacheEntry {
  payload: LiveRatesPayload;
  expiresAt: number;
}

// Module-level cache: shared across requests in the same server instance.
let cache: CacheEntry | null = null;

async function fetchJson(url: string): Promise<Record<string, unknown> | null> {
  try {
    const res = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
      headers: { accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

const asNumber = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) ? value : null;

async function fetchLiveRates(): Promise<LiveRatesPayload> {
  const [gold, silver, fx] = await Promise.all([
    fetchJson(GOLD_SPOT_URL),
    fetchJson(SILVER_SPOT_URL),
    fetchJson(FX_URL),
  ]);

  const goldUsdPerOunce = asNumber(gold?.price);
  const silverUsdPerOunce = asNumber(silver?.price);

  const fxRates = fx?.rates as Record<string, unknown> | undefined;
  const usdInr = asNumber(fxRates?.INR);

  const isLive = goldUsdPerOunce !== null && silverUsdPerOunce !== null;

  // If spot prices are unavailable, keep serving the last good board rather
  // than dropping to the build-time snapshot.
  if (!isLive) {
    return cache?.payload ?? FALLBACK_LIVE_RATES;
  }

  return buildLiveRates(
    {
      goldUsdPerOunce,
      silverUsdPerOunce,
      usdInr: usdInr ?? cache?.payload.usdInr ?? RATE_CONFIG.usdInrFallback,
      updatedAt: new Date().toISOString(),
      source: "live",
    },
    cache?.payload
  );
}

export async function GET() {
  const now = Date.now();

  if (cache && cache.expiresAt > now) {
    return NextResponse.json(cache.payload, {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
      },
    });
  }

  const payload = await fetchLiveRates();
  cache = { payload, expiresAt: now + RATE_CONFIG.cacheMs };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
