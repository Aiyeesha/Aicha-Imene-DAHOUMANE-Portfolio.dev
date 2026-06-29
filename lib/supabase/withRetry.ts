// lib/supabase/withRetry.ts
// -------------------------
// Retry utilitaire pour les appels Supabase exposés aux blocages Cloudflare (503/429/524).
// Utilise un backoff exponentiel avec jitter pour éviter les thundering herds.
// Ne relance PAS sur les erreurs d'autorisation (401/403) ni "not found".

const RETRYABLE_CODES = new Set([429, 503, 524, 520, 521, 522, 523]);
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 200;

function isRetryable(error: { code?: string | number; status?: number; message?: string } | null): boolean {
  if (!error) return false;
  if (error.status && RETRYABLE_CODES.has(error.status)) return true;
  if (typeof error.code === "number" && RETRYABLE_CODES.has(error.code)) return true;
  // Network-level failures (fetch rejected, no status code)
  if (error.message && /network|timeout|ECONNRESET|ETIMEDOUT|fetch failed/i.test(error.message)) return true;
  return false;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Wraps a Supabase query thunk with exponential-backoff retry.
 *
 * @example
 *   const { data, error } = await withRetry(() =>
 *     supabase.from("certifications").select("*").eq("locale", "fr")
 *   );
 */
export async function withRetry<T>(
  fn: () => PromiseLike<{ data: T | null; error: { code?: string | number; status?: number; message?: string } | null }>,
  retries = MAX_RETRIES
): Promise<{ data: T | null; error: unknown }> {
  let lastError: unknown = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const result = await fn();

    if (!result.error) return result;

    lastError = result.error;

    if (!isRetryable(result.error) || attempt === retries) {
      return result;
    }

    // Exponential backoff with ±20% jitter
    const jitter = 1 + (Math.random() * 0.4 - 0.2);
    const delay = BASE_DELAY_MS * Math.pow(2, attempt) * jitter;
    console.warn(`[supabase/retry] attempt ${attempt + 1} failed (${result.error.message ?? result.error.status}), retrying in ${Math.round(delay)}ms`);
    await sleep(delay);
  }

  return { data: null, error: lastError };
}
