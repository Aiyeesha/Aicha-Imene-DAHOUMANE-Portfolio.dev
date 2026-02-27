import { Redis } from "@upstash/redis";

/**
 * Upstash Redis (REST) client.
 * Safe fallback: if env vars are missing, export `null` to avoid crashing the app.
 */
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

export const redis = url && token ? new Redis({ url, token }) : null;
