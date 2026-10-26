// lib/uptime.ts
// -------------
// 30-day uptime % per service and 7-day hourly latency history (sparklines),
// from the `uptime_pings` table (Supabase, public read), cached 5 minutes in
// Redis.
// Uptime is Record<serviceName, number | null>: a % (e.g. 99.7), or null with
// fewer than 3 pings. Plain objects, as a Map is not JSON-serialisable.

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { cacheGetOrSet }              from "@/lib/cache";
import { redis }                      from "@/lib/redis";
import type { ServiceStatus, HealthReport } from "@/lib/health";

// Minimum pings before showing a %, to avoid "100%" right after the first deployment
const MIN_PINGS = 3;

// ── Latest status report (from uptime_pings) ──────────────────────────────────
// Rebuilds a HealthReport from the latest ping stored by the cron, so /status
// makes no live outgoing calls.

export async function getLatestPingReport(): Promise<HealthReport | null> {
  if (!redis) {
    return fetchLatestPingsFromSupabase();
  }

  try {
    const cached = await redis.get<HealthReport | null>("portfolio:uptime:latest");
    if (cached && cached.checkedAt) {
      // Guard: if cached data is older than 10 min the key is stale (e.g. set
      // manually without TTL). Delete it and fall through to a fresh fetch.
      const ageMs = Date.now() - new Date(cached.checkedAt).getTime();
      if (ageMs < 10 * 60 * 1000) return cached;
      await redis.del("portfolio:uptime:latest").catch(() => {});
    }
  } catch {}

  const fresh = await fetchLatestPingsFromSupabase();
  if (fresh) {
    await redis.set("portfolio:uptime:latest", fresh, { ex: 60 }).catch(() => {});
  }
  return fresh;
}

async function fetchLatestPingsFromSupabase(): Promise<HealthReport | null> {
  try {
    const supabase = createAdminSupabaseClient();

    // Latest ping of each service (one query)
    const { data, error } = await supabase
      .from("uptime_pings")
      .select("service, status, latency_ms, checked_at")
      .order("checked_at", { ascending: false })
      .limit(50); // enough to cover every service of the latest batch

    if (error || !data || data.length === 0) {
      console.error("[uptime] latest pings fetch error:", error?.message);
      return null;
    }

    // Keep only the most recent ping per service
    const seen = new Set<string>();
    const latest: typeof data = [];
    for (const row of data) {
      if (!seen.has(row.service)) {
        seen.add(row.service);
        latest.push(row);
      }
    }

    // Report timestamp = the most recent across services
    const checkedAt = latest[0].checked_at as string;

    const services = latest.map((row) => ({
      name:      row.service as string,
      status:    row.status  as ServiceStatus,
      latencyMs: row.latency_ms as number | null,
    }));

    // Global status: outage if any service is down, degraded if any is degraded
    const overall: ServiceStatus =
      services.some((s) => s.status === "outage")    ? "outage"      :
      services.some((s) => s.status === "degraded")  ? "degraded"    :
                                                       "operational";

    return { checkedAt, overall, services };
  } catch (e) {
    console.error("[uptime] latest pings unexpected error:", e);
    return null;
  }
}

export type UptimeStats = Record<string, number | null>;

export async function getUptimeStats(): Promise<UptimeStats> {
  return cacheGetOrSet<UptimeStats>(
    "portfolio:uptime:stats:30d",
    300, // 5 minutes
    fetchFromSupabase
  );
}

// ── Latency history ───────────────────────────────────────────────────────────
// Average latency (ms) per hour over the last 7 days, for the /status
// sparklines.

export type LatencyHistory = Record<string, number[]>;

export async function getLatencyHistory(): Promise<LatencyHistory> {
  return cacheGetOrSet<LatencyHistory>(
    "portfolio:uptime:latency:7d",
    300, // 5 min, the cron interval
    fetchLatencyFromSupabase
  );
}

async function fetchLatencyFromSupabase(): Promise<LatencyHistory> {
  const history: LatencyHistory = {};

  try {
    const supabase = createAdminSupabaseClient();
    const since    = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from("uptime_pings")
      .select("service, latency_ms, checked_at")
      .gte("checked_at", since)
      .not("latency_ms", "is", null)
      .order("checked_at", { ascending: true });

    if (error || !data) {
      console.error("[uptime] latency fetch error:", error?.message);
      return history;
    }

    // Group by service, then by hour (e.g. "2026-03-15T14")
    type Bucket = { sum: number; count: number };
    const buckets: Record<string, Record<string, Bucket>> = {};

    for (const row of data) {
      if (row.latency_ms == null) continue;
      // Truncate to the hour (first 13 characters of the ISO string)
      const hour = (row.checked_at as string).slice(0, 13);
      if (!buckets[row.service]) buckets[row.service] = {};
      if (!buckets[row.service][hour]) buckets[row.service][hour] = { sum: 0, count: 0 };
      buckets[row.service][hour].sum   += row.latency_ms as number;
      buckets[row.service][hour].count += 1;
    }

    // Averages in chronological order (guaranteed by the query)
    for (const [service, hours] of Object.entries(buckets)) {
      history[service] = Object.values(hours).map(b => Math.round(b.sum / b.count));
    }
  } catch (e) {
    console.error("[uptime] latency unexpected error:", e);
  }

  return history;
}

// ── Uptime stats ──────────────────────────────────────────────────────────────

async function fetchFromSupabase(): Promise<UptimeStats> {
  const stats: UptimeStats = {};

  try {
    const supabase = createAdminSupabaseClient();
    const since    = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from("uptime_pings")
      .select("service, status")
      .gte("checked_at", since);

    if (error || !data) {
      console.error("[uptime] Supabase error:", error?.message);
      return stats; // empty object: degrade gracefully
    }

    // Group by service
    const grouped: Record<string, { total: number; operational: number }> = {};
    for (const row of data) {
      if (!grouped[row.service]) grouped[row.service] = { total: 0, operational: 0 };
      grouped[row.service].total++;
      if (row.status === "operational") grouped[row.service].operational++;
    }

    // Percentage, one decimal
    for (const [service, counts] of Object.entries(grouped)) {
      if (counts.total < MIN_PINGS) {
        stats[service] = null; // not enough data
      } else {
        const pct = (counts.operational / counts.total) * 100;
        stats[service] = Math.round(pct * 10) / 10;
      }
    }
  } catch (e) {
    console.error("[uptime] Unexpected error:", e);
  }

  return stats;
}
