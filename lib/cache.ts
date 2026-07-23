import { unstable_rethrow } from "next/navigation";
import { redis } from "@/lib/redis";

/**
 * Redis cache wrapper.
 * Falls back to no-cache mode if Redis is not configured.
 */
export async function cacheGetOrSet<T>(
  key: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>
): Promise<T> {
  if (!redis) {
    return fetcher();
  }

  try {
    const cached = await redis.get<T>(key);
    if (cached !== null && cached !== undefined) {
      if (process.env.NODE_ENV === "development") console.log("[CACHE HIT]", key);
      return cached;
    }

    if (process.env.NODE_ENV === "development") console.log("[CACHE MISS]", key);
    const fresh = await fetcher();
    await redis.set(key, fresh, { ex: ttlSeconds }).catch(() => {});
    return fresh;
  } catch (err) {
    // Next.js throws internal control-flow signals (DynamicServerError, redirect,
    // notFound...) through this same try/catch — e.g. redis.get()'s underlying
    // fetch() tripping the static-generation bailout on a `no-store` route. Those
    // are not real cache failures: swallowing them here desyncs Next's own
    // bookkeeping of which Suspense boundary is still pending, and the affected
    // route boundary's stream never gets its closing $RC(...) replacement —
    // the page hangs forever on the loading.tsx fallback even though the data
    // (via the fetcher() fallback below) rendered correctly. Rethrow those
    // untouched; only genuine Redis/network errors reach the fallback.
    unstable_rethrow(err);
    console.warn("[CACHE ERROR] Redis unavailable, falling back to direct fetch:", err instanceof Error ? err.message : err);
    return fetcher();
  }
}

export async function cacheDel(key: string) {
  if (!redis) return;
  await redis.del(key).catch(() => {});
}
