import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { redis } from "@/lib/redis";
import { cacheInvalidateRatelimit, safeLimit } from "@/lib/ratelimit";
import { timingSafeStringEqual } from "@/lib/security/timingSafeEqual";
import { isValidSlug } from "@/lib/security/slug";
import { routing } from "@/i18n/routing";
import { z } from "zod";

// ── Body validation ─────────────────────────────────────────────────────────
//   - `locale` must be one of routing.locales (en, fr, es);
//   - `slug` must be a valid kebab-case slug (lib/security/slug.ts) and is only
//     accepted with a `locale`;
//   - unknown keys are rejected (.strict());
//   - empty body → full flush (documented behaviour);
//   - invalid JSON → 400, never a full flush by default.
// The endpoint is already protected by a constant-time secret check; this is
// defence in depth.
const InvalidateBodySchema = z
  .object({
    locale: z.enum(routing.locales).optional(),
    slug: z
      .string()
      .refine((value) => isValidSlug(value), { message: "Invalid slug" })
      .optional(),
  })
  .strict()
  .refine((body) => body.slug === undefined || body.locale !== undefined, {
    message: "slug requires locale",
  });

// Body size limit: a legitimate body is a few dozen bytes
// ({"locale":"fr","slug":"…"}); 1 KiB leaves plenty of room.
const MAX_BODY_BYTES = 1024;

// SCAN: keys requested per iteration (a hint for Redis) and a maximum number
// of iterations, as a guard against a cursor that never returns to "0".
const SCAN_COUNT = 100;
const SCAN_MAX_ITERATIONS = 1000;

/**
 * POST /api/cache/invalidate
 * Header: x-cache-secret: <CACHE_INVALIDATE_SECRET>
 * Body examples:
 *   {} (or empty body)              -> flush ALL cache keys (projects, about, certifications)
 *   { "locale": "fr" }              -> flush all keys for that locale
 *   { "locale": "fr", "slug": "…" } -> flush list + detail for that slug only
 * Errors: 400 (invalid JSON, locale or slug, unknown key, slug without
 * locale), 401 (secret), 413 (body > 1 KiB), 429, 503 (no Redis).
 */
export async function POST(req: Request) {
  // ── 1. Per-IP rate limit ────────────────────────────────────────────────────
  const headersList = await headers();
  const ip =
    headersList.get("x-real-ip") ||
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  const { success: rateLimitOk } = await safeLimit(cacheInvalidateRatelimit, ip);
  if (!rateLimitOk) {
    return NextResponse.json(
      { ok: false, error: "Too many requests" },
      { status: 429 }
    );
  }

  // ── 2. Secret check (timing-safe) ───────────────────────────────────────────
  const secret = req.headers.get("x-cache-secret");
  const expected = process.env.CACHE_INVALIDATE_SECRET;

  const secretValid =
    !!expected && !!secret && await timingSafeStringEqual(secret, expected);

  if (!secretValid) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // ── 3. Redis available? ─────────────────────────────────────────────────────
  if (!redis) {
    return NextResponse.json({ ok: false, error: "Cache not available" }, { status: 503 });
  }

  // ── 4. Read and validate the body ───────────────────────────────────────────
  // Check Content-Length first (reject without reading), then the actual size:
  // the header may be missing (chunked) or wrong.
  const declaredLength = Number(req.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 });
  }
  const rawBody = await req.text();
  if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 });
  }

  let json: unknown = {};
  if (rawBody.trim() !== "") {
    try {
      json = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }
  }

  const parsed = InvalidateBodySchema.safeParse(json);
  if (!parsed.success) {
    // Generic message: the input is never echoed (response or logs).
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }
  const { locale, slug } = parsed.data;

  // ── 5. Targeted invalidation ────────────────────────────────────────────────
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
    // All three locales (en/fr/es) must be listed: a flush that misses one
    // leaves stale content until the TTL expires.
    const staticKeys = [
      "projects_with_assets:fr",
      "projects_with_assets:en",
      "projects_with_assets:es",
      "about:fr",
      "about:en",
      "about:es",
      "certifications:fr",
      "certifications:en",
      "certifications:es",
      "portfolio:uptime:latest",
      "portfolio:uptime:stats:30d",
      "portfolio:uptime:latency:7d",
    ];
    await redis.del(...staticKeys);
    deleted.push(...staticKeys);

    // Also delete every project detail key (project:{locale}:{slug}). SCAN in
    // batches rather than KEYS, which is O(N) and blocks Redis.
    const projectKeys: string[] = [];
    let cursor = "0";
    for (let i = 0; i < SCAN_MAX_ITERATIONS; i++) {
      const [nextCursor, keys] = await redis.scan(cursor, {
        match: "project:*",
        count: SCAN_COUNT,
      });
      projectKeys.push(...keys);
      cursor = String(nextCursor);
      if (cursor === "0") break;
    }
    // SCAN may return a key more than once: dedupe.
    const uniqueProjectKeys = [...new Set(projectKeys)];
    if (uniqueProjectKeys.length > 0) {
      await redis.del(...uniqueProjectKeys);
      deleted.push(...uniqueProjectKeys);
    }

    // Invalidate the Next.js cache for every project page
    revalidatePath("/[locale]/projects/[slug]", "page");
    revalidatePath("/en", "page");
    revalidatePath("/fr", "page");
    revalidatePath("/es", "page");
  }

  // ── 6. Log (no IP) ──────────────────────────────────────────────────────────
  console.info(`[cache/invalidate] deleted=${deleted.join(", ")}`);

  return NextResponse.json({ ok: true, deleted });
}
