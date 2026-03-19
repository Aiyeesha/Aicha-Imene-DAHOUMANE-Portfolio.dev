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
//   { type: "projects" | "blog" | "all", locale?: "en" | "fr", slug?: string }
//
// Variables d'env requises :
//   REVALIDATE_SECRET — secret partagé avec le webhook Supabase

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { revalidateRatelimit } from "@/lib/ratelimit";

// Locales supportées par le site
const LOCALES = ["en", "fr"] as const;

// timingSafeEqual n'est pas dans les types W3C standard de SubtleCrypto —
// on étend le type localement comme dans proxy.ts.
type SubtleCryptoWithTimingSafe = SubtleCrypto & {
  timingSafeEqual(a: BufferSource, b: BufferSource): Promise<boolean>;
};

// Comparaison timing-safe pour éviter les attaques par oracle temporel
async function timingSafeEqual(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const bufA = enc.encode(a);
  const bufB = enc.encode(b);
  // Longueurs différentes → faux, mais on compare quand même pour masquer le timing
  const len = Math.max(bufA.length, bufB.length);
  const paddedA = new Uint8Array(len);
  const paddedB = new Uint8Array(len);
  paddedA.set(bufA);
  paddedB.set(bufB);
  const equal = await (crypto.subtle as SubtleCryptoWithTimingSafe).timingSafeEqual(paddedA, paddedB);
  return equal && bufA.length === bufB.length;
}

export async function POST(request: NextRequest) {
  // ── 0. Rate-limit par IP ──────────────────────────────────────────────────
  const ip =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const { success: rateLimitOk } = await revalidateRatelimit.limit(ip);
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
  const valid = await timingSafeEqual(provided, secret);
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

      // Page projets dédiée
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

  console.info("[revalidate] Chemins invalidés :", revalidated);

  return NextResponse.json({ revalidated, now: Date.now() }, { status: 200 });
}
