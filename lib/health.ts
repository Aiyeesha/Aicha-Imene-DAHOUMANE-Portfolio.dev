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
    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (!formId) {
      return { name: "Contact form", status: "operational", latencyMs: null, message: "Formspree not configured" };
    }

    const res = await withTimeout(
      fetch(`https://formspree.io/f/${formId}`, { method: "HEAD", cache: "no-store" }),
      4000
    );

    const latencyMs = Date.now() - start;
    // 200 ou 405 (Method Not Allowed) = endpoint joignable
    const ok = res.ok || res.status === 405;
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
  const [supabase, redis, contact] = await Promise.all([
    checkSupabase(),
    checkRedis(),
    checkContactForm(),
  ]);

  const services: ServiceHealth[] = [
    checkWebsite(),
    contact,
    supabase,
    redis,
    checkBlog(),
    checkPwa(),
  ];

  return {
    checkedAt: new Date().toISOString(),
    overall:   aggregateStatus(services),
    services,
  };
}
