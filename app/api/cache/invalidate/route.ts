import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

/**
 * POST /api/cache/invalidate
 * Headers:
 *   x-cache-secret: <CACHE_INVALIDATE_SECRET>
 * Body (JSON, optional):
 *   { "locale": "fr" }  -> invalidates that locale only
 *   {}                  -> invalidates both fr/en (default)
 */
export async function POST(req: Request) {
  const secret = req.headers.get("x-cache-secret");
  const expected = process.env.CACHE_INVALIDATE_SECRET;

  if (!expected || !secret || secret !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!redis) {
    return NextResponse.json({ ok: false, error: "Redis not configured" }, { status: 500 });
  }

  const body = await req.json().catch(() => ({} as any));
  const locale = body?.locale;

  if (locale) {
    await redis.del(`projects_with_assets:${locale}`);
  } else {
    await redis.del("projects_with_assets:fr");
    await redis.del("projects_with_assets:en");
  }

  return NextResponse.json({ ok: true });
}
