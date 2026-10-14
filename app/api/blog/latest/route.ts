// app/api/blog/latest/route.ts
// -----------------------------
// GET /api/blog/latest?locale=fr&limit=2
//
// Retourne les N derniers articles du blog (lecture du système de fichiers).
// Protégé par un rate limiter Upstash Redis (30 req / 60 s par IP).
// En l'absence de Redis configuré, le limiteur no-op laisse tout passer.

import { NextResponse } from "next/server";
import { blogRatelimit, safeLimit } from "@/lib/ratelimit";
import { readAllPosts } from "@/content/blog/fs";

// Extrait l'IP réelle du client depuis les headers Vercel / proxy standard.
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
  // ── End Rate limiting ─────────────────────────────────────────────────

  const { searchParams } = new URL(req.url);
  // Liste blanche : le paramètre sert à construire un chemin de fichiers dans
  // readAllPosts() — jamais de valeur libre (ex. « ../unpublished/fr »), audit du
  // 2026-10-14, S8. Même règle que /api/search.
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
