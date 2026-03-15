import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  if (!redis) {
    // Ne pas exposer les détails de configuration dans la réponse
    return NextResponse.json(
      { success: false, error: "Cache service unavailable." },
      { status: 503 }
    );
  }

  try {
    await redis.set("healthcheck", "ok", { ex: 60 });
    const value = await redis.get("healthcheck");
    return NextResponse.json({ success: true, value });
  } catch {
    return NextResponse.json(
      { success: false, error: "Cache service unavailable." },
      { status: 503 }
    );
  }
}
