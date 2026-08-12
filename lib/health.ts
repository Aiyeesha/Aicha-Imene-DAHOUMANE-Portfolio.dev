// lib/health.ts
// -------------
// Fonctions de vérification de l'état opérationnel de chaque service.
// Utilisé par :
//   - app/api/health/route.ts  (endpoint JSON public)
//   - app/[locale]/status/page.tsx (rendu serveur direct, sans HTTP roundtrip)
//
// Chaque check retourne : status + latenceMs + message optionnel.
// Timeout : 4 secondes par vérification.

export type ServiceStatus = "operational" | "degraded" | "outage";

export type ServiceHealth = {
  name:      string;
  status:    ServiceStatus;
  latencyMs: number | null;   // null si le check n'a pas pu mesurer
  message?:  string;          // détail d'erreur (non affiché en prod, pour debug)
};

export type HealthReport = {
  checkedAt:  string;         // ISO 8601
  overall:    ServiceStatus;
  services:   ServiceHealth[];
};

// ── Timeout helper ────────────────────────────────────────────────────────────

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
    ),
  ]);
}

// ── Vérification Supabase ─────────────────────────────────────────────────────

async function checkSupabase(): Promise<ServiceHealth> {
  const start = Date.now();
  try {
    const url   = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anon) throw new Error("Supabase env vars not set");

    // Requête REST légère : 1 ligne de la table projects (toujours publique)
    const res = await withTimeout(
      fetch(`${url}/rest/v1/projects?select=id&limit=1`, {
        headers: {
          apikey:        anon,
          Authorization: `Bearer ${anon}`,
        },
        cache: "no-store",
      }),
      4000
    );

    const latencyMs = Date.now() - start;
    if (!res.ok) return { name: "Database (Supabase)", status: "degraded", latencyMs, message: `HTTP ${res.status}` };
    return { name: "Database (Supabase)", status: "operational", latencyMs };
  } catch (e) {
    return { name: "Database (Supabase)", status: "outage", latencyMs: Date.now() - start, message: String(e) };
  }
}

// ── Vérification Upstash Redis ────────────────────────────────────────────────

async function checkRedis(): Promise<ServiceHealth> {
  const start = Date.now();
  try {
    const url   = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) {
      // Non configuré → pas un outage, service optionnel
      return { name: "Cache (Upstash Redis)", status: "operational", latencyMs: null, message: "Not configured — no-op mode" };
    }

    // Commande PING via REST API Upstash
    const res = await withTimeout(
      fetch(`${url}/ping`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }),
      4000
    );

    const latencyMs = Date.now() - start;
    if (!res.ok) return { name: "Cache (Upstash Redis)", status: "degraded", latencyMs, message: `HTTP ${res.status}` };
    return { name: "Cache (Upstash Redis)", status: "operational", latencyMs };
  } catch (e) {
    return { name: "Cache (Upstash Redis)", status: "outage", latencyMs: Date.now() - start, message: String(e) };
  }
}

// ── Vérification formulaire de contact ───────────────────────────────────────
// Le formulaire dépend de Supabase (messages) + Formspree.
// On vérifie Formspree via un HEAD sur son endpoint (pas d'envoi de données).

async function checkContactForm(): Promise<ServiceHealth> {
  const start = Date.now();
  try {
    // Utilise FORMSPREE_ENDPOINT (même variable que app/api/contact/route.ts)
    // pour éviter la désynchronisation avec FORMSPREE_ID.
    // Si non configuré → Supabase seul gère les messages, ce n'est pas une dégradation.
    const endpoint = process.env.FORMSPREE_ENDPOINT;
    if (!endpoint) {
      return { name: "Contact form", status: "operational", latencyMs: null, message: "Formspree not configured" };
    }

    const res = await withTimeout(
      fetch(endpoint, { method: "HEAD", cache: "no-store" }),
      2000 // 2 s max — Formspree ne doit pas retarder le cron au-delà de 2 s
    );

    const latencyMs = Date.now() - start;
    // Tout code < 500 = Formspree est joignable (400 = HEAD non supporté, 405 = méthode refusée, etc.)
    // Seul un 5xx ou un timeout indique une vraie indisponibilité du service.
    const ok = res.status < 500;
    return {
      name: "Contact form",
      status: ok ? "operational" : "degraded",
      latencyMs,
      message: ok ? undefined : `HTTP ${res.status}`,
    };
  } catch (e) {
    return { name: "Contact form", status: "degraded", latencyMs: Date.now() - start, message: String(e) };
  }
}

// ── Vérification intégrité du contenu ─────────────────────────────────────────
// Backstop applicatif à la contrainte SQL `featured_published_requires_sections`
// (migration prevent_empty_featured_published_sections) : un projet publié ET mis
// en avant ne doit jamais avoir un corps (`sections`) vide, quelle que soit la
// locale. La contrainte empêche la régression en base ; ce check la rend visible
// ici plutôt que seulement au moment (rare) d'une tentative d'écriture invalide.

type ContentGap = { slug: string; locale: string };

async function checkContentIntegrity(): Promise<ServiceHealth> {
  const start = Date.now();
  try {
    const { createServerSupabaseClient } = await import("@/lib/supabase/server");
    const { withRetry } = await import("@/lib/supabase/withRetry");
    const supabase = createServerSupabaseClient();

    const { data, error } = await withRetry<ContentGap[]>(() =>
      supabase
        .from("projects")
        .select("slug, locale")
        .eq("status", "published")
        .eq("featured", true)
        .or("sections.is.null,sections.eq.[]")
    );

    const latencyMs = Date.now() - start;
    if (error) {
      return { name: "Content integrity", status: "degraded", latencyMs, message: String((error as { message?: string })?.message ?? error) };
    }

    const gaps = data ?? [];
    if (gaps.length > 0) {
      const sample = gaps.slice(0, 3).map((g) => `${g.slug} (${g.locale})`).join(", ");
      return {
        name: "Content integrity",
        status: "degraded",
        latencyMs,
        message: `${gaps.length} featured project(s) missing body content: ${sample}${gaps.length > 3 ? "…" : ""}`,
      };
    }

    return { name: "Content integrity", status: "operational", latencyMs };
  } catch (e) {
    return { name: "Content integrity", status: "degraded", latencyMs: Date.now() - start, message: String(e) };
  }
}

// ── Intégrité du flag is_security ──────────────────────────────────────────────
// Backstop applicatif pour un bug corrigé le 2026-08-12 : `is_security` n'était
// round-tripé ni par scripts/export-projects-from-supabase.ts ni par
// scripts/seed.ts — un reseed depuis content/projects.ts effaçait silencieusement
// le flag sur les 49 projets d'un coup (régression totale, pas partielle).
// On vérifie donc juste qu'au moins un projet publié porte encore is_security
// = true, plutôt qu'un nombre figé (16 aujourd'hui) : le cluster Security a
// vocation à grandir, un seuil exact se serait remis à sonner l'alarme au
// premier nouveau projet ajouté sans être le signe d'une vraie régression.
async function checkSecurityClusterIntegrity(): Promise<ServiceHealth> {
  const start = Date.now();
  try {
    const { createServerSupabaseClient } = await import("@/lib/supabase/server");
    const { withRetry } = await import("@/lib/supabase/withRetry");
    const supabase = createServerSupabaseClient();

    const { data, error } = await withRetry<{ slug: string }[]>(() =>
      supabase
        .from("projects")
        .select("slug")
        .eq("status", "published")
        .eq("is_security", true)
        .limit(1)
    );

    const latencyMs = Date.now() - start;
    if (error) {
      return { name: "Security cluster integrity", status: "degraded", latencyMs, message: String((error as { message?: string })?.message ?? error) };
    }

    if (!data || data.length === 0) {
      return {
        name: "Security cluster integrity",
        status: "degraded",
        latencyMs,
        message: "0 published project has is_security = true — likely a reseed regression (see lib/health.ts).",
      };
    }

    return { name: "Security cluster integrity", status: "operational", latencyMs };
  } catch (e) {
    return { name: "Security cluster integrity", status: "degraded", latencyMs: Date.now() - start, message: String(e) };
  }
}

// ── Services statiques (toujours opérationnels si le serveur répond) ──────────

function checkWebsite(): ServiceHealth {
  return { name: "Website", status: "operational", latencyMs: 0 };
}

function checkBlog(): ServiceHealth {
  // Le blog MDX est compilé au build — si le serveur répond, le blog est opérationnel
  return { name: "Blog & MDX", status: "operational", latencyMs: 0 };
}

function checkPwa(): ServiceHealth {
  return { name: "PWA / Service Worker", status: "operational", latencyMs: 0 };
}

// ── Agrégation ────────────────────────────────────────────────────────────────

function aggregateStatus(services: ServiceHealth[]): ServiceStatus {
  if (services.some((s) => s.status === "outage"))   return "outage";
  if (services.some((s) => s.status === "degraded")) return "degraded";
  return "operational";
}

// ── Point d'entrée principal ──────────────────────────────────────────────────

export async function runHealthChecks(): Promise<HealthReport> {
  // Checks réseau en parallèle — les checks statiques sont instantanés
  const [supabase, redis, contact, contentIntegrity, securityCluster] = await Promise.all([
    checkSupabase(),
    checkRedis(),
    checkContactForm(),
    checkContentIntegrity(),
    checkSecurityClusterIntegrity(),
  ]);

  const services: ServiceHealth[] = [
    checkWebsite(),
    contact,
    supabase,
    redis,
    contentIntegrity,
    securityCluster,
    checkBlog(),
    checkPwa(),
  ];

  return {
    checkedAt: new Date().toISOString(),
    overall:   aggregateStatus(services),
    services,
  };
}
