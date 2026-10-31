/**
 * One-shot copy of the uptime history from Supabase (uptime_pings) to Upstash
 * Redis, the store /status reads since Supabase is being retired.
 *
 * Optional: without it, the history simply rebuilds itself over 30 days.
 * Idempotent: a batch is keyed by its timestamp, so running it twice does not
 * duplicate anything. Only the last 30 days are copied; nothing is deleted
 * from Supabase.
 *
 *   npm run db:uptime:copy            # copy
 *   npm run db:uptime:copy -- --dry   # count only, writes nothing
 *
 * Needs, in .env.local: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
 * UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN.
 */

import { createClient } from "@supabase/supabase-js";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) dotenv.config({ path: envLocalPath, override: true });

// Same key and format as lib/uptime.ts (PingBatch).
const KEY = "portfolio:uptime:history";
const KEY_TTL_S = 35 * 24 * 60 * 60;
const SINCE = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
const dryRun = process.argv.includes("--dry");

const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = process.env;
if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
  console.error("Missing Supabase or Upstash variables in .env.local");
  process.exit(1);
}

type Row = { service: string; status: string; latency_ms: number | null; checked_at: string };

(async function main() {
  const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
  const { data, error } = await supabase
    .from("uptime_pings")
    .select("service, status, latency_ms, checked_at")
    .gte("checked_at", SINCE)
    .order("checked_at", { ascending: true });
  if (error) throw new Error(error.message);

  // One batch per cron run (rows of a run share their checked_at).
  const batches = new Map<string, { checkedAt: string; services: { name: string; status: string; latencyMs: number | null }[] }>();
  for (const row of (data ?? []) as Row[]) {
    const checkedAt = new Date(row.checked_at).toISOString();
    const batch = batches.get(checkedAt) ?? { checkedAt, services: [] };
    batch.services.push({ name: row.service, status: row.status, latencyMs: row.latency_ms });
    batches.set(checkedAt, batch);
  }
  console.log(`${data?.length ?? 0} rows → ${batches.size} runs since ${SINCE.slice(0, 10)}`);
  if (dryRun || batches.size === 0) return;

  const redis = new Redis({ url: UPSTASH_REDIS_REST_URL, token: UPSTASH_REDIS_REST_TOKEN });
  for (const batch of batches.values()) {
    // Replace any batch already stored for the same run, then add it.
    const score = Date.parse(batch.checkedAt);
    await redis.zremrangebyscore(KEY, score, score);
    await redis.zadd(KEY, { score, member: JSON.stringify(batch) });
  }
  await redis.expire(KEY, KEY_TTL_S);
  await redis.del("portfolio:uptime:latest", "portfolio:uptime:stats:30d", "portfolio:uptime:latency:7d");
  console.log(`Copied ${batches.size} runs to Redis (${KEY}).`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
