// app/api/revalidate/route.ts
// ---------------------------
// On-demand revalidation of the affected Next.js pages, called manually or by
// a webhook (formerly a Supabase database webhook).
//
// Security: POST only, `x-revalidate-secret` header compared to
// REVALIDATE_SECRET, no internal details in error responses.
//
// Expected JSON body:
//   { type: "projects" | "blog" | "all", locale?: "en" | "fr" | "es", slug?: string }

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { revalidateRatelimit, safeLimit } from "@/lib/ratelimit";
import { timingSafeStringEqual } from "@/lib/security/timingSafeEqual";
import { isValidSlug } from "@/lib/security/slug";
import { routing } from "@/i18n/routing";

// Supported locales, from i18n/routing.ts
const LOCALES = routing.locales;

export async function POST(request: NextRequest) {
  // ── 0. Per-IP rate limit ──────────────────────────────────────────────────
  const ip =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const { success: rateLimitOk } = await safeLimit(revalidateRatelimit, ip);
  if (!rateLimitOk) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // ── 1. Secret check (timing-safe) ─────────────────────────────────────────
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    console.error("[revalidate] REVALIDATE_SECRET non configuré");
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const provided = request.headers.get("x-revalidate-secret") ?? "";
  const valid = await timingSafeStringEqual(provided, secret);
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── 2. Parameters: query string first, then body ─────────────────────────
  // Webhooks that send their own payload as the body (Supabase database
  // webhooks did) pass parameters in the query string:
  // /api/revalidate?type=projects&locale=en. A JSON body is accepted too.
  const { searchParams } = new URL(request.url);

  let bodyParams: { type?: string; locale?: string; slug?: string } = {};
  try {
    bodyParams = await request.json();
  } catch {
    // Missing or non-JSON body (webhook payload): ignore
  }

  const type = searchParams.get("type") ?? bodyParams.type ?? "all";
  const locale = searchParams.get("locale") ?? bodyParams.locale;
  const slug = searchParams.get("slug") ?? bodyParams.slug;

  if (!["projects", "blog", "all"].includes(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  // The slug ends up in revalidated paths and logs: kebab-case only (no
  // newline, "/" or "..").
  if (slug && !isValidSlug(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  // ── 3. Targeted invalidation ──────────────────────────────────────────────
  const revalidated: string[] = [];

  // Locales to invalidate: the requested one, or all
  const targetLocales =
    locale && LOCALES.includes(locale as (typeof LOCALES)[number])
      ? [locale]
      : LOCALES;

  if (type === "projects" || type === "all") {
    // Home page: FeaturedProjects + ProjectsSection
    for (const loc of targetLocales) {
      revalidatePath(`/${loc}`);
      revalidated.push(`/${loc}`);

      // /projects index (full grid), separate from the home page
      revalidatePath(`/${loc}/projects`);
      revalidated.push(`/${loc}/projects`);

      // Single project page when a slug is given
      if (slug) {
        revalidatePath(`/${loc}/projects/${slug}`);
        revalidated.push(`/${loc}/projects/${slug}`);
      }
    }
  }

  if (type === "blog" || type === "all") {
    for (const loc of targetLocales) {
      // Blog index
      revalidatePath(`/${loc}/blog`);
      revalidated.push(`/${loc}/blog`);

      // Single post when a slug is given
      if (slug) {
        revalidatePath(`/${loc}/blog/${slug}`);
        revalidated.push(`/${loc}/blog/${slug}`);
      }
    }
  }

  // The slug is already validated; CR/LF are still neutralised where the log
  // is written (defence in depth against log injection).
  console.info(
    "[revalidate] Chemins invalidés :",
    revalidated.join(", ").replace(/[\r\n]/g, "")
  );

  return NextResponse.json({ revalidated, now: Date.now() }, { status: 200 });
}
