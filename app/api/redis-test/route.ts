import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  // If Redis isn't configured, return a helpful message instead of throwing.
  if (!redis) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Redis is not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env.local (local) or Vercel env vars (prod).",
      },
      { status: 500 }
    );
  }

  // Write + Read
  await redis.set("healthcheck", "ok", { ex: 60 });
  const value = await redis.get("healthcheck");

  return NextResponse.json({ success: true, value });
}
