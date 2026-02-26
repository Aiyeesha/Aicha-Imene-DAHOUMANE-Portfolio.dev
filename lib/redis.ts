import { Redis } from "@upstash/redis";

/**
 * Upstash Redis (REST) client.
 *
 * IMPORTANT:
 * - In local dev, if env vars are missing, we return `null` to avoid crashing the app.
 * - Cache helper will fall back to "no cache" mode when redis is null.
 */
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

export const redis = url && token ? new Redis({ url, token }) : null;
