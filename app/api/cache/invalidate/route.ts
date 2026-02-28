import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

/**
 * POST /api/cache/invalidate
 * Header: x-cache-secret: <CACHE_INVALIDATE_SECRET>
 * Body examples:
 *   {}                              -> flush ALL cache keys (projects, about, certifications)
 *   { "locale": "fr" }              -> flush all keys for that locale
 *   { "locale": "fr", "slug": "…" } -> flush list + detail for that slug only
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

  const deleted: string[] = [];

  if (locale && slug) {
    // Flush one specific project for a given locale
    const keys = [
      `projects_with_assets:${locale}`,
      `project:${locale}:${slug}`,
    ];
    await redis.del(...keys);
    deleted.push(...keys);
  } else if (locale) {
    // Flush all keys for a given locale
    const keys = [
      `projects_with_assets:${locale}`,
      `about:${locale}`,
      `certifications:${locale}`,
    ];
    await redis.del(...keys);
    deleted.push(...keys);
  } else {
    // Flush everything
    const keys = [
      "projects_with_assets:fr",
      "projects_with_assets:en",
      "about:fr",
      "about:en",
      "certifications:fr",
      "certifications:en",
    ];
    await redis.del(...keys);
    deleted.push(...keys);
  }

  return NextResponse.json({ ok: true, deleted });
}
