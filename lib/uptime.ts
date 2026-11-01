// lib/uptime.ts
// -------------
// Uptime history for /status and /api/health, stored in Upstash Redis.
//
// Each run of the daily cron (app/api/cron/ping) records one "batch": the
// timestamp of the run and the status and latency of every service. Batches
// live in a sorted set scored by timestamp and are trimmed to 30 days, so the
// set never holds more than ~30 entries (a few kilobytes).
//
// From these batches /status shows:
//   - the latest report (no live outgoing call at render time);
//   - the 30-day uptime % per service (null with fewer than 3 pings);
//   - the 7-day latency history per service (sparklines), one point per hour.
//
// The computations are pure functions (exported for the tests); reading goes
// through a 5-minute Redis cache like the rest of the site. Without Redis
// (local development, CI) the page simply shows no history.

import { cacheGetOrSet } from "@/lib/cache";
import { redis }         from "@/lib/redis";
import type { ServiceStatus, HealthReport } from "@/lib/health";

// ── Storage format ──────────────────────────────────────────────────────────

/** One cron run: shared timestamp, then one entry per service. */
export type PingBatch = {
  checkedAt: string; // ISO 8601
  services: { name: string; status: ServiceStatus; latencyMs: number | null }[];
};

export const UPTIME_HISTORY_KEY = "portfolio:uptime:history";
const DAY_MS        = 24 * 60 * 60 * 1000;
const RETENTION_MS  = 30 * DAY_MS;
// Safety net: the whole set expires if the cron stops writing for 35 days.
const KEY_TTL_S     = 35 * 24 * 60 * 60;

// Minimum pings before showing a %, to avoid "100%" right after the first run
const MIN_PINGS = 3;

/**
 * Records one cron run and drops batches older than 30 days.
 * Returns false when Redis is not configured or the write fails.
 */
export async function recordPingBatch(batch: PingBatch, nowMs = Date.now()): Promise<boolean> {
  if (!redis) return false;
  const score = Date.parse(batch.checkedAt);
  if (Number.isNaN(score)) return false;
  try {
    // Stored as a JSON string: the member is the whole batch, unique by its
    // timestamp, and parsed back by parseBatch().
    await redis.zadd(UPTIME_HISTORY_KEY, { score, member: JSON.stringify(batch) });
    await redis.zremrangebyscore(UPTIME_HISTORY_KEY, 0, nowMs - RETENTION_MS);
    await redis.expire(UPTIME_HISTORY_KEY, KEY_TTL_S);
    // The cached views are now outdated.
    await redis.del(
      "portfolio:uptime:latest",
      "portfolio:uptime:stats:30d",
      "portfolio:uptime:latency:7d",
    );
    return true;
  } catch (e) {
    console.error("[uptime] could not record ping batch:", String(e));
    return false;
  }
}

/** Accepts a member as stored (JSON string) or already parsed by the client. */
export function parseBatch(member: unknown): PingBatch | null {
  try {
    const value = typeof member === "string" ? JSON.parse(member) : member;
    if (!value || typeof value !== "object") return null;
    const b = value as PingBatch;
    if (typeof b.checkedAt !== "string" || !Array.isArray(b.services)) return null;
    return b;
  } catch {
    return null;
  }
}

/** Batches since `sinceMs`, oldest first. Empty without Redis or on error. */
async function readBatches(sinceMs: number): Promise<PingBatch[]> {
  if (!redis) return [];
  try {
    const members = await redis.zrange<unknown[]>(UPTIME_HISTORY_KEY, sinceMs, "+inf", { byScore: true });
    return members
      .map(parseBatch)
      .filter((b): b is PingBatch => b !== null)
      .sort((a, b) => a.checkedAt.localeCompare(b.checkedAt));
  } catch (e) {
    console.error("[uptime] could not read history:", String(e));
    return [];
  }
}

// ── Pure computations ───────────────────────────────────────────────────────

/** Report rebuilt from the most recent batch, or null when there is none. */
export function latestReport(batches: PingBatch[]): HealthReport | null {
  const last = batches.at(-1);
  if (!last || last.services.length === 0) return null;

  const services = last.services.map((s) => ({
    name: s.name,
    status: s.status,
    latencyMs: s.latencyMs,
  }));
  // Global status: outage if any service is down, degraded if any is degraded
  const overall: ServiceStatus =
    services.some((s) => s.status === "outage")   ? "outage"   :
    services.some((s) => s.status === "degraded") ? "degraded" :
                                                    "operational";
  return { checkedAt: last.checkedAt, overall, services };
}

export type UptimeStats = Record<string, number | null>;

/** % of "operational" pings per service, one decimal; null under MIN_PINGS. */
export function computeUptimeStats(batches: PingBatch[]): UptimeStats {
  const grouped: Record<string, { total: number; operational: number }> = {};
  for (const batch of batches) {
    for (const s of batch.services) {
      grouped[s.name] ??= { total: 0, operational: 0 };
      grouped[s.name].total++;
      if (s.status === "operational") grouped[s.name].operational++;
    }
  }
  const stats: UptimeStats = {};
  for (const [service, counts] of Object.entries(grouped)) {
    stats[service] = counts.total < MIN_PINGS
      ? null
      : Math.round((counts.operational / counts.total) * 1000) / 10;
  }
  return stats;
}

/** A recorded check where at least one service was not operational. */
export type Disruption = {
  checkedAt: string;
  services: { name: string; status: ServiceStatus }[];
};

/**
 * Checks with at least one degraded or down service, most recent first
 * (max `limit`). This is what /status shows as its incident history: real
 * measurements only (the /admin incident board holds response-playbook
 * exercises, which must not be presented as outages).
 */
export function computeDisruptions(batches: PingBatch[], limit = 10): Disruption[] {
  return batches
    .map((b) => ({
      checkedAt: b.checkedAt,
      services: b.services
        .filter((s) => s.status !== "operational")
        .map((s) => ({ name: s.name, status: s.status })),
    }))
    .filter((d) => d.services.length > 0)
    .sort((a, b) => Date.parse(b.checkedAt) - Date.parse(a.checkedAt))
    .slice(0, limit);
}

export type LatencyHistory = Record<string, number[]>;

/** Average latency per service and per hour, in chronological order. */
export function computeLatencyHistory(batches: PingBatch[]): LatencyHistory {
  type Bucket = { sum: number; count: number };
  const buckets: Record<string, Map<string, Bucket>> = {};
  const ordered = [...batches].sort((a, b) => a.checkedAt.localeCompare(b.checkedAt));
  for (const batch of ordered) {
    const hour = batch.checkedAt.slice(0, 13); // "2026-03-15T14"
    for (const s of batch.services) {
      if (s.latencyMs == null) continue;
      buckets[s.name] ??= new Map();
      const bucket = buckets[s.name].get(hour) ?? { sum: 0, count: 0 };
      bucket.sum += s.latencyMs;
      bucket.count += 1;
      buckets[s.name].set(hour, bucket);
    }
  }
  const history: LatencyHistory = {};
  for (const [service, hours] of Object.entries(buckets)) {
    history[service] = [...hours.values()].map((b) => Math.round(b.sum / b.count));
  }
  return history;
}

// ── Cached readers used by /status and /api/health ──────────────────────────

export async function getLatestPingReport(): Promise<HealthReport | null> {
  return cacheGetOrSet<HealthReport | null>(
    "portfolio:uptime:latest",
    60,
    async () => latestReport(await readBatches(Date.now() - RETENTION_MS)),
  );
}

export async function getUptimeStats(): Promise<UptimeStats> {
  return cacheGetOrSet<UptimeStats>(
    "portfolio:uptime:stats:30d",
    300,
    async () => computeUptimeStats(await readBatches(Date.now() - RETENTION_MS)),
  );
}

export async function getRecentDisruptions(): Promise<Disruption[]> {
  return cacheGetOrSet<Disruption[]>(
    "portfolio:uptime:disruptions:30d",
    300,
    async () => computeDisruptions(await readBatches(Date.now() - RETENTION_MS)),
  );
}

export async function getLatencyHistory(): Promise<LatencyHistory> {
  return cacheGetOrSet<LatencyHistory>(
    "portfolio:uptime:latency:7d",
    300,
    async () => computeLatencyHistory(await readBatches(Date.now() - 7 * DAY_MS)),
  );
}
