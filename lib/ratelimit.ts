// lib/ratelimit.ts
// -----------------
// Centralised rate limiters on Upstash Redis (sliding window).
// Without the Upstash variables (local dev, CI) a no-op limiter is returned.
//
// Environment:
//   UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
//   CONTACT_RATE_LIMIT_MAX_REQUESTS   — contact max requests (default 5)
//   CONTACT_RATE_LIMIT_WINDOW_SECONDS — contact window in seconds (default 600)

import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// ── Upstash configuration ─────────────────────────────────────────────
const url   = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

// ── No-op limiter when Redis is not available ─────────────────────────
// Local dev and CI: success=true (no friction without Redis). Production:
// success=false (fail closed), so an Upstash outage never silently disables
// flood protection.
const isProd = process.env.NODE_ENV === "production";
function createNoOpRatelimit(maxReq: number, windowMs: number) {
  return {
    limit: async () => ({
      success: !isProd, // fail closed in production, permissive in dev/CI
      limit: maxReq,
      remaining: isProd ? 0 : maxReq,
      reset: Date.now() + windowMs
    }),
    // Read without consuming (used by /admin, see proxy.ts).
    getRemaining: async () => ({
      remaining: isProd ? 0 : maxReq,
      reset: Date.now() + windowMs
    })
  } as unknown as Ratelimit;
}

// ── Real Redis sliding-window limiter ─────────────────────────────────
function createRatelimit(redis: Redis, maxReq: number, windowSec: number, prefix: string) {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(maxReq, `${windowSec} s`),
    prefix,
    // If Redis does not answer within 500ms, the request goes through
    // (fail open on network slowness).
    timeout: 500,
  });
}

// Shared Redis instance (created once when configured)
const redis = url && token ? new Redis({ url, token }) : null;

if (!redis) {
  console.warn("[ratelimit] Upstash env vars missing — rate limiting disabled.");
}

// ── /api/contact ───────────────────────────────────────────────────────
// 5 requests / 10 minutes / IP (configurable through env vars)
const contactMax = Number(process.env.CONTACT_RATE_LIMIT_MAX_REQUESTS || "5");
const contactWindowSec = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_SECONDS || "600");

export const contactRatelimit = redis
  ? createRatelimit(redis, contactMax, contactWindowSec, "portfolio:rl:contact")
  : createNoOpRatelimit(contactMax, contactWindowSec * 1000);

// ── /api/blog/latest ──────────────────────────────────────────────────
// 30 requests / 60s / IP: a read-only route with no spam risk
export const blogRatelimit = redis
  ? createRatelimit(redis, 30, 60, "portfolio:rl:blog")
  : createNoOpRatelimit(30, 60_000);

// ── /api/testimonial-submit ───────────────────────────────────────────
// 3 submissions / 24h / IP: testimonials are rare and deliberate
export const testimonialRatelimit = redis
  ? createRatelimit(redis, 3, 86_400, "portfolio:rl:testimonial")
  : createNoOpRatelimit(3, 86_400_000);

// ── /api/cache/invalidate ─────────────────────────────────────────────
// 10 requests / 60s: admin-only route, protected against flush loops
export const cacheInvalidateRatelimit = redis
  ? createRatelimit(redis, 10, 60, "portfolio:rl:cache-invalidate")
  : createNoOpRatelimit(10, 60_000);

// ── /admin (HTTP Basic auth brute force) ──────────────────────────────
// 5 failed attempts / 15 minutes / IP, about 20 per hour: distributed
// brute force becomes costly.
export const adminRatelimit = redis
  ? createRatelimit(redis, 5, 900, "portfolio:rl:admin")
  : createNoOpRatelimit(5, 900_000);

// ── /api/csp-report ───────────────────────────────────────────────────
// 20 reports / 60s / IP. Redis-backed, unlike an in-memory counter reset on
// every serverless cold start, so the endpoint cannot be flooded to exhaust
// function invocations.
export const cspReportRatelimit = redis
  ? createRatelimit(redis, 20, 60, "portfolio:rl:csp-report")
  : createNoOpRatelimit(20, 60_000);

// ── /api/errors (client error reporting) ──────────────────────────────
// 10 reports / 60s / IP: room for a client in a crash loop, with the
// client-side dedup (GlobalErrorHandler) already reducing noise.
export const errorRatelimit = redis
  ? createRatelimit(redis, 10, 60, "portfolio:rl:errors")
  : createNoOpRatelimit(10, 60_000);

// ── /api/revalidate ───────────────────────────────────────────────────
// 10 requests / 60s / IP: guards against flooding if REVALIDATE_SECRET leaks,
// while leaving room for legitimate Supabase webhooks.
export const revalidateRatelimit = redis
  ? createRatelimit(redis, 10, 60, "portfolio:rl:revalidate")
  : createNoOpRatelimit(10, 60_000);

// ── Global limiter for critical CSP alerts ────────────────────────────
// 5 alerts / 10 minutes with a GLOBAL key (not per IP), so the same violation
// from many origins does not spam the webhook.
export const cspAlertRatelimit = redis
  ? createRatelimit(redis, 5, 600, "portfolio:rl:csp-alert")
  : createNoOpRatelimit(5, 600_000);

// ── Identifier pseudonymisation ───────────────────────────────────────
// Limiter identifiers contain the visitor's IP ("contact:ip:1.2.3.4"). They
// are replaced by a truncated HMAC-SHA-256 keyed with IP_HASH_SALT before
// reaching Upstash: no clear IP in Redis, and an unsalted hash would be
// brute-forceable over the IPv4 space. Without IP_HASH_SALT (local dev, CI)
// the identifier stays readable. Web Crypto (crypto.subtle) works in the
// Node runtime and in proxy.ts.
let hmacKey: Promise<CryptoKey> | null = null;
let hmacSalt = "";

export async function pseudonymizeKey(key: string): Promise<string> {
  const salt = process.env.IP_HASH_SALT ?? "";
  if (!salt) return key;
  if (!hmacKey || hmacSalt !== salt) {
    hmacSalt = salt;
    hmacKey = crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(salt),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
  }
  const sig = await crypto.subtle.sign("HMAC", await hmacKey, new TextEncoder().encode(key));
  // 16 bytes (128 bits) is plenty to avoid collisions between visitors.
  return Array.from(new Uint8Array(sig).slice(0, 16), (b) => b.toString(16).padStart(2, "0")).join("");
}

// ── Fail-open helper for immediate Redis errors ───────────────────────
// When Redis is down (quota, refused connection, expired token), `.limit()`
// may throw despite the timeout; this returns `success: true` so legitimate
// users are not blocked.
export async function safeLimit(
  limiter: { limit: (key: string) => Promise<{ success: boolean; reset?: number }> },
  key: string
): Promise<{ success: boolean; reset: number }> {
  try {
    const result = await limiter.limit(await pseudonymizeKey(key));
    return { success: result.success, reset: result.reset ?? Date.now() + 10_000 };
  } catch {
    return { success: true, reset: Date.now() + 10_000 };
  }
}
