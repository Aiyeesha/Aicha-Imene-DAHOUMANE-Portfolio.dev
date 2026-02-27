import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

/**
 * POST /api/cache/invalidate
 * Header: x-cache-secret: <CACHE_INVALIDATE_SECRET>
 * Body examples:
 *   { "locale": "fr" } -> invalidates list for that locale
 *   { "locale": "fr", "slug": "..." } -> invalidates list + detail for that slug
 *   {} -> invalidates list keys for fr/en
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
  const locale = body?.locale as string | undefined;
  const slug = body?.slug as string | undefined;

  if (locale && slug) {
    await redis.del(`projects_with_assets:${locale}`);
    await redis.del(`project:${locale}:${slug}`);
  } else if (locale) {
    await redis.del(`projects_with_assets:${locale}`);
  } else {
    await redis.del("projects_with_assets:fr");
    await redis.del("projects_with_assets:en");
  }

  return NextResponse.json({ ok: true });
}
