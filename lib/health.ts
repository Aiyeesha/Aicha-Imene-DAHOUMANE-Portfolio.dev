// lib/health.ts
// -------------
// Per-service health checks, used by app/api/health/route.ts (public JSON)
// and app/[locale]/status/page.tsx (direct server render). Each check returns
// a status, a latency and an optional message; 4-second timeout per check.

export type ServiceStatus = "operational" | "degraded" | "outage";

export type ServiceHealth = {
  name:      string;
  status:    ServiceStatus;
  latencyMs: number | null;   // null when the check could not measure it
  message?:  string;          // error detail (debugging, not shown in production)
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

// ── Supabase ──────────────────────────────────────────────────────────────────

async function checkSupabase(): Promise<ServiceHealth> {
  const start = Date.now();
  try {
    const url   = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anon) throw new Error("Supabase env vars not set");

    // Light REST query: one row of projects (always public)
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

// ── Upstash Redis ─────────────────────────────────────────────────────────────

async function checkRedis(): Promise<ServiceHealth> {
  const start = Date.now();
  try {
    const url   = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) {
      // Not configured: optional service, not an outage
      return { name: "Cache (Upstash Redis)", status: "operational", latencyMs: null, message: "Not configured — no-op mode" };
    }

    // PING through the Upstash REST API
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

// ── Contact form ─────────────────────────────────────────────────────────────
// Checks Formhook with a HEAD on its endpoint (no data sent).

async function checkContactForm(): Promise<ServiceHealth> {
  const start = Date.now();
  try {
    // FORMHOOK_ENDPOINT, as in app/api/contact/route.ts. Not configured is not
    // a degradation.
    const endpoint = process.env.FORMHOOK_ENDPOINT;
    if (!endpoint) {
      return { name: "Contact form", status: "operational", latencyMs: null, message: "Formhook not configured" };
    }

    // X-Auth-Token is required by Formhook for server-to-server requests. A
    // HEAD without it is still < 500, but sending it checks real access, not
    // just network reachability.
    const authToken = process.env.FORMHOOK_AUTH_TOKEN;
    const res = await withTimeout(
      fetch(endpoint, {
        method: "HEAD",
        cache: "no-store",
        headers: authToken ? { "X-Auth-Token": authToken } : undefined,
      }),
      2000 // 2s max: Formhook must not delay the cron
    );

    const latencyMs = Date.now() - start;
    // Any status < 500 means Formhook is reachable (400/405 for an unsupported
    // HEAD…); only a 5xx or a timeout means it is down.
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

// ── Content integrity ─────────────────────────────────────────────────────────
// Application-level backstop for the SQL constraint
// `featured_published_requires_sections`: a published, featured project must
// never have empty `sections`, in any locale. The constraint prevents the
// regression in the database; this check makes it visible.

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

// ── is_security flag integrity ───────────────────────────────────────────────
// A reseed that drops the flag would clear it on every project at once, so
// this only checks that at least one published project still has
// is_security = true (a fixed count would raise false alarms as the security
// cluster grows).
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

// ── Static services (operational whenever the server responds) ────────────────

function checkWebsite(): ServiceHealth {
  return { name: "Website", status: "operational", latencyMs: 0 };
}

function checkBlog(): ServiceHealth {
  // MDX is compiled at build time: if the server responds, the blog works
  return { name: "Blog & MDX", status: "operational", latencyMs: 0 };
}

function checkPwa(): ServiceHealth {
  return { name: "PWA / Service Worker", status: "operational", latencyMs: 0 };
}

// ── Aggregation ───────────────────────────────────────────────────────────────

function aggregateStatus(services: ServiceHealth[]): ServiceStatus {
  if (services.some((s) => s.status === "outage"))   return "outage";
  if (services.some((s) => s.status === "degraded")) return "degraded";
  return "operational";
}

// ── Entry point ───────────────────────────────────────────────────────────────

export async function runHealthChecks(): Promise<HealthReport> {
  // Network checks in parallel; static checks are instant
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
