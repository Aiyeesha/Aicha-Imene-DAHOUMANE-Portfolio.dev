import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { timingSafeEqual } from "crypto";
import { redis } from "@/lib/redis";
import { cacheInvalidateRatelimit } from "@/lib/ratelimit";

/**
 * POST /api/cache/invalidate
 * Header: x-cache-secret: <CACHE_INVALIDATE_SECRET>
 * Body examples:
 *   {}                              -> flush ALL cache keys (projects, about, certifications)
 *   { "locale": "fr" }              -> flush all keys for that locale
 *   { "locale": "fr", "slug": "…" } -> flush list + detail for that slug only
 */
export async function POST(req: Request) {
  // ── 1. Rate-limit par IP ────────────────────────────────────────────────────
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  const { success: rateLimitOk } = await cacheInvalidateRatelimit.limit(ip);
  if (!rateLimitOk) {
    return NextResponse.json(
      { ok: false, error: "Too many requests" },
      { status: 429 }
    );
  }

  // ── 2. Vérification du secret (comparaison timing-safe) ─────────────────────
  // Une comparaison simple `!==` est vulnérable à une attaque de timing :
  // un attaquant peut déduire le secret en mesurant les temps de réponse.
  // timingSafeEqual garantit un temps constant quelle que soit la valeur comparée.
  const secret = req.headers.get("x-cache-secret");
  const expected = process.env.CACHE_INVALIDATE_SECRET;

  const secretValid = (() => {
    if (!expected || !secret) return false;
    const a = Buffer.from(secret);
    const b = Buffer.from(expected);
    // timingSafeEqual exige des buffers de même longueur
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  })();

  if (!secretValid) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // ── 3. Redis disponible ? ───────────────────────────────────────────────────
  if (!redis) {
    return NextResponse.json({ ok: false, error: "Cache not available" }, { status: 503 });
  }

  // ── 4. Invalidation ciblée ──────────────────────────────────────────────────
  const body = await req.json().catch(() => ({} as Record<string, unknown>));
  const locale = body?.locale as string | undefined;
  const slug   = body?.slug   as string | undefined;

  const deleted: string[] = [];

  if (locale && slug) {
    const keys = [
      `projects_with_assets:${locale}`,
      `project:${locale}:${slug}`,
    ];
    await redis.del(...keys);
    deleted.push(...keys);
  } else if (locale) {
    const keys = [
      `projects_with_assets:${locale}`,
      `about:${locale}`,
      `certifications:${locale}`,
    ];
    await redis.del(...keys);
    deleted.push(...keys);
  } else {
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

  // ── 5. Log de l'opération ───────────────────────────────────────────────────
  console.info(`[cache/invalidate] IP=${ip} deleted=${deleted.join(", ")}`);

  return NextResponse.json({ ok: true, deleted });
}
