// app/api/revalidate/route.ts
// ---------------------------
// Endpoint ISR on-demand — invalide le cache Next.js pour les pages concernées.
//
// Usage typique : webhook Supabase déclenché quand un projet est publié/modifié.
//
// Sécurité :
//   - Header `x-revalidate-secret` comparé à REVALIDATE_SECRET (env var).
//   - Méthode POST uniquement.
//   - Aucun détail interne exposé dans les réponses d'erreur.
//
// Body JSON attendu :
//   { type: "projects" | "blog" | "all", locale?: "en" | "fr" | "es", slug?: string }
//
// Variables d'env requises :
//   REVALIDATE_SECRET — secret partagé avec le webhook Supabase

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { revalidateRatelimit, safeLimit } from "@/lib/ratelimit";
import { timingSafeStringEqual } from "@/lib/security/timingSafeEqual";
import { isValidSlug } from "@/lib/security/slug";
import { routing } from "@/i18n/routing";

// Locales supportées par le site — source unique : i18n/routing.ts
// (auparavant figée à ["en", "fr"], ce qui n'invalidait jamais les pages /es).
const LOCALES = routing.locales;

export async function POST(request: NextRequest) {
  // ── 0. Rate-limit par IP ──────────────────────────────────────────────────
  const ip =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const { success: rateLimitOk } = await safeLimit(revalidateRatelimit, ip);
  if (!rateLimitOk) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // ── 1. Vérification du secret (timing-safe) ───────────────────────────────
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

  // ── 2. Paramètres — query string prioritaire sur le body ─────────────────
  // Supabase Database Webhooks envoient les données de la ligne en body (non
  // customisable dans l'UI). On passe donc les paramètres via query string :
  //   /api/revalidate?type=projects&locale=en
  // Le body JSON reste supporté pour les appels manuels / autres webhooks.
  const { searchParams } = new URL(request.url);

  let bodyParams: { type?: string; locale?: string; slug?: string } = {};
  try {
    bodyParams = await request.json();
  } catch {
    // body absent ou non-JSON (cas Supabase) — on ignore
  }

  const type = searchParams.get("type") ?? bodyParams.type ?? "all";
  const locale = searchParams.get("locale") ?? bodyParams.locale;
  const slug = searchParams.get("slug") ?? bodyParams.slug;

  if (!["projects", "blog", "all"].includes(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  // Le slug est injecté dans des chemins revalidés puis journalisés : on
  // n'accepte qu'un slug kebab-case (pas de retour à la ligne, « / », « .. »).
  if (slug && !isValidSlug(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  // ── 3. Invalidation ciblée ────────────────────────────────────────────────
  const revalidated: string[] = [];

  // Locales à invalider : soit la locale demandée, soit toutes
  const targetLocales =
    locale && LOCALES.includes(locale as (typeof LOCALES)[number])
      ? [locale]
      : LOCALES;

  if (type === "projects" || type === "all") {
    // Page d'accueil : contient FeaturedProjects + ProjectsSection
    for (const loc of targetLocales) {
      revalidatePath(`/${loc}`);
      revalidated.push(`/${loc}`);

      // Page d'index /projects (grille complète, ISR 300s — voir
      // app/[locale]/projects/page.tsx) — distincte de la homepage.
      revalidatePath(`/${loc}/projects`);
      revalidated.push(`/${loc}/projects`);

      // Page projet individuelle si slug fourni
      if (slug) {
        revalidatePath(`/${loc}/projects/${slug}`);
        revalidated.push(`/${loc}/projects/${slug}`);
      }
    }
  }

  if (type === "blog" || type === "all") {
    for (const loc of targetLocales) {
      // Index blog
      revalidatePath(`/${loc}/blog`);
      revalidated.push(`/${loc}/blog`);

      // Article individuel si slug fourni
      if (slug) {
        revalidatePath(`/${loc}/blog/${slug}`);
        revalidated.push(`/${loc}/blog/${slug}`);
      }
    }
  }

  // Le slug est déjà validé plus haut ; on neutralise tout de même CR/LF au
  // point d'écriture du log (défense en profondeur contre l'injection de logs).
  console.info(
    "[revalidate] Chemins invalidés :",
    revalidated.join(", ").replace(/[\r\n]/g, "")
  );

  return NextResponse.json({ revalidated, now: Date.now() }, { status: 200 });
}
