// app/api/blog/latest/route.ts
// -----------------------------
// GET /api/blog/latest?locale=fr&limit=2: the latest N blog posts (read from
// the file system). Rate limited with Upstash (30 requests / 60s / IP); the
// no-op limiter lets everything through when Redis is not configured.

import { NextResponse } from "next/server";
import { blogRatelimit, safeLimit } from "@/lib/ratelimit";
import { readAllPosts } from "@/content/blog/fs";

// Client IP from Vercel / standard proxy headers.
function getClientIp(req: Request): string {
  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

export async function GET(req: Request) {
  // ── Rate limiting ─────────────────────────────────────────────────────
  const ip = getClientIp(req);
  const rl = await safeLimit(blogRatelimit, `blog:ip:${ip}`);

  if (!rl.success) {
    const now = Date.now();
    const resetMs = typeof rl.reset === "number" ? rl.reset : now + 10_000;
    const retryAfterSeconds = Math.max(1, Math.ceil((resetMs - now) / 1000));

    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  const { searchParams } = new URL(req.url);
  // Allow-list: the value builds a file path in readAllPosts(), so free values
  // (e.g. "../unpublished/fr") are never accepted. Same rule as /api/search.
  const rawLocale = searchParams.get("locale");
  const locale = rawLocale === "fr" ? "fr" : rawLocale === "es" ? "es" : "en";
  const limit = Math.min(6, Math.max(1, Number(searchParams.get("limit") || "2")));

  const posts = readAllPosts(locale).slice(0, limit).map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    tags: p.tags
  }));

  return NextResponse.json({ ok: true, posts });
}
