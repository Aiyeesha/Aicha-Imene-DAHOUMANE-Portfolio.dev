// lib/supabase/withRetry.ts
// -------------------------
// Retry utilitaire pour les appels Supabase exposés aux blocages Cloudflare (503/429/524).
// Utilise un backoff exponentiel avec jitter pour éviter les thundering herds.
// Ne relance PAS sur les erreurs d'autorisation (401/403) ni "not found".

const RETRYABLE_CODES = new Set([429, 503, 524, 520, 521, 522, 523]);
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 200;
// Plafond dur par tentative — un client réseau qui traîne (DNS, TLS, undici
// hanging) ne doit jamais faire dépasser le budget de la requête appelante.
// Sans ce plafond, une tentative bloquée + le backoff des retries suivants
// peut à elle seule dépasser les timeouts de test E2E (30s) ou de route API.
const ATTEMPT_TIMEOUT_MS = 5000;
// CI (et les previews sans secrets configurés, ex. PRs Dependabot) retombe sur
// cette URL factice — voir .github/workflows/ci.yml. Retenter contre un hôte
// qu'on sait déjà cassé n'apporte rien et ne fait qu'accumuler du backoff sur
// chaque appel Supabase de chaque page testée (c'est ce qui faisait dépasser
// les timeouts Playwright, indépendamment de la version de @supabase/supabase-js).
const isPlaceholderSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co";
// Contre le placeholder, on sait déjà que l'appel échouera — pas besoin d'attendre
// jusqu'à ATTEMPT_TIMEOUT_MS pour un vrai aller-retour réseau qui n'aboutira jamais.
// Cet appel se produit sur CHAQUE page rendue (ex. getFeaturedProjectsForNav dans le
// layout) ; sous charge E2E concurrente, même quelques secondes par page suffisent à
// dépasser les timeouts d'assertion stricts (ex. 5s sur un changement de langue).
const PLACEHOLDER_ATTEMPT_TIMEOUT_MS = 300;

function isRetryable(error: { code?: string | number; status?: number; message?: string } | null): boolean {
  if (!error) return false;
  // Defensive fallback: @supabase/postgrest-js's PostgrestError never carries `status`
  // and always types `code` as a string (e.g. "PGRST301") — these two branches cannot
  // fire for the actual callers of withRetry() (see lib/data/about.ts, certifications.ts,
  // projects.ts, all Postgrest queries), but are kept in case a differently-shaped error
  // (e.g. from another Supabase subsystem) is ever passed through this same helper.
  if (error.status && RETRYABLE_CODES.has(error.status)) return true;
  if (typeof error.code === "number" && RETRYABLE_CODES.has(error.code)) return true;
  // Network-level failures (fetch rejected, no status code) and Cloudflare edge errors
  // (503/429/502/520-524) surfaced as plain text in PostgrestError.message when Cloudflare
  // intercepts the request before it reaches PostgREST (non-JSON body → message holds the
  // raw response text/status, e.g. "523" or "Origin Unreachable").
  if (
    error.message &&
    /network|timeout|ECONNRESET|ETIMEDOUT|fetch failed|too many requests|bad gateway|service unavailable|origin unreachable|\b(429|502|503|520|521|522|523|524)\b/i.test(
      error.message
    )
  ) {
    return true;
  }
  return false;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Course entre la promesse Supabase et un timer : si le client réseau n'a pas
// répondu dans le délai imparti, on traite ça comme une erreur "timeout"
// (retryable, voir isRetryable) plutôt que de rester bloqué indéfiniment.
function withTimeout<T>(
  promise: PromiseLike<{ data: T | null; error: { code?: string | number; status?: number; message?: string } | null }>,
  ms: number
): Promise<{ data: T | null; error: { code?: string | number; status?: number; message?: string } | null }> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve({ data: null, error: { message: "withRetry: attempt timeout" } }), ms);
    Promise.resolve(promise).then((result) => {
      clearTimeout(timer);
      resolve(result);
    });
  });
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
  retries = isPlaceholderSupabaseUrl ? 0 : MAX_RETRIES
): Promise<{ data: T | null; error: unknown }> {
  let lastError: unknown = null;

  const attemptTimeoutMs = isPlaceholderSupabaseUrl ? PLACEHOLDER_ATTEMPT_TIMEOUT_MS : ATTEMPT_TIMEOUT_MS;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const result = await withTimeout(fn(), attemptTimeoutMs);

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
