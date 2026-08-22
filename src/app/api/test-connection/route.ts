import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connection.readyState === 1;

    return NextResponse.json({
      success: true,
      message: isConnected
        ? "✅ MongoDB connected successfully!"
        : "❌ MongoDB connection failed",
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      name: mongoose.connection.name,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "MongoDB connection error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
