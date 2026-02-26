import { redis } from "@/lib/redis";

/**
 * Redis cache wrapper:
 * - If Redis is not configured (redis === null), it falls back to no-cache mode.
 */
export async function cacheGetOrSet<T>(
  key: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>
): Promise<T> {
  if (!redis) {
    // No Redis configured -> run without cache (keeps dev/prod resilient)
    return fetcher();
  }

  const cached = await redis.get<T>(key);
  if (cached !== null && cached !== undefined) {
    console.log("[CACHE HIT]", key);
    return cached;
  }

  console.log("[CACHE MISS]", key);
  const fresh = await fetcher();

  await redis.set(key, fresh, { ex: ttlSeconds });
  return fresh;
}

export async function cacheDel(key: string) {
  if (!redis) return;
  await redis.del(key);
}
