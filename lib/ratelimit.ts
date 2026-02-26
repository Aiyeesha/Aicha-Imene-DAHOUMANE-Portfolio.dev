import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const maxRequests = Number(process.env.CONTACT_RATE_LIMIT_MAX_REQUESTS || "5");
const windowSeconds = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_SECONDS || "600");

// Vérifie explicitement la config Upstash
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

function createDisabledRatelimit() {
  // "Ratelimit" minimal : on renvoie toujours success=true
  return {
    limit: async () => ({
      success: true,
      limit: maxRequests,
      remaining: maxRequests,
      reset: Date.now() + windowSeconds * 1000
    })
  } as unknown as Ratelimit;
}

export const contactRatelimit = (() => {
  if (!url || !token) {
    console.warn(
      "[contactRatelimit] Upstash env vars missing. Ratelimit disabled locally/for this environment."
    );
    return createDisabledRatelimit();
  }

  const redis = new Redis({ url, token });

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(maxRequests, `${windowSeconds} s`),
    prefix: "portfolio:rl"
  });
})();