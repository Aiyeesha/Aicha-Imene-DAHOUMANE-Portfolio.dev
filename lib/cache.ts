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
    console.warn("[CACHE ERROR] Redis unavailable, falling back to direct fetch:", err instanceof Error ? err.message : err);
    return fetcher();
  }
}

export async function cacheDel(key: string) {
  if (!redis) return;
  await redis.del(key).catch(() => {});
}
