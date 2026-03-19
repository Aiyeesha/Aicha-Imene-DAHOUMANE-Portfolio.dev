// lib/ratelimit.ts
// -----------------
// Limiteurs de débit (rate-limiting) centralisés via Upstash Redis.
// Utilise l'algorithme sliding window pour une protection fluide sans pics.
//
// Stratégie par route :
//   - /api/contact      : 5 req / 10 min par IP (protection anti-spam)
//   - /api/blog/latest  : 30 req / 60 s par IP (route publique, plus permissive)
//
// Si les variables Upstash ne sont pas configurées (env local ou CI),
// un limiteur "no-op" (success=true toujours) est retourné silencieusement.
//
// Variables d'environnement :
//   UPSTASH_REDIS_REST_URL    — URL de l'instance Upstash Redis
//   UPSTASH_REDIS_REST_TOKEN  — Token d'authentification Upstash
//   CONTACT_RATE_LIMIT_MAX_REQUESTS   — max requêtes contact (défaut : 5)
//   CONTACT_RATE_LIMIT_WINDOW_SECONDS — fenêtre contact en secondes (défaut : 600)

import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// ── Configuration Upstash ─────────────────────────────────────────────
const url   = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

// ── Factory : crée un limiteur no-op si Redis n'est pas disponible ────
// En développement local et CI : success=true (pas de friction sans Redis).
// En production  : success=false (fail-closed) pour éviter qu'une panne
// Upstash désactive silencieusement toutes les protections anti-flood.
// Un attaquant qui surveille le statut Upstash pourrait sinon déclencher
// une attaque pendant une fenêtre de dégradation Redis.
const isProd = process.env.NODE_ENV === "production";
function createNoOpRatelimit(maxReq: number, windowMs: number) {
  return {
    limit: async () => ({
      success: !isProd, // fail-closed en production, permissif en dev/CI
      limit: maxReq,
      remaining: isProd ? 0 : maxReq,
      reset: Date.now() + windowMs
    })
  } as unknown as Ratelimit;
}

// ── Factory : crée un vrai limiteur Redis sliding window ──────────────
function createRatelimit(redis: Redis, maxReq: number, windowSec: number, prefix: string) {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(maxReq, `${windowSec} s`),
    prefix
  });
}

// Instance Redis partagée (créée une seule fois si la config est disponible)
const redis = url && token ? new Redis({ url, token }) : null;

if (!redis) {
  console.warn("[ratelimit] Upstash env vars missing — rate limiting disabled.");
}

// ── Limiteur pour /api/contact ─────────────────────────────────────────
// 5 requêtes par 10 minutes par IP (configurable via env vars)
const contactMax = Number(process.env.CONTACT_RATE_LIMIT_MAX_REQUESTS || "5");
const contactWindowSec = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_SECONDS || "600");

export const contactRatelimit = redis
  ? createRatelimit(redis, contactMax, contactWindowSec, "portfolio:rl:contact")
  : createNoOpRatelimit(contactMax, contactWindowSec * 1000);

// ── Limiteur pour /api/blog/latest ────────────────────────────────────
// 30 requêtes par 60 secondes par IP
// Plus permissif que le contact (route de lecture, pas de risque de spam)
export const blogRatelimit = redis
  ? createRatelimit(redis, 30, 60, "portfolio:rl:blog")
  : createNoOpRatelimit(30, 60_000);

// ── Limiteur pour /api/testimonial-submit ─────────────────────────────
// 3 soumissions par 24 heures par IP — les témoignages sont rares et
// intentionnels ; une limite stricte protège contre l'abus et le spam.
export const testimonialRatelimit = redis
  ? createRatelimit(redis, 3, 86_400, "portfolio:rl:testimonial")
  : createNoOpRatelimit(3, 86_400_000);

// ── Limiteur pour /api/cache/invalidate ───────────────────────────────
// 10 requêtes par 60 secondes — route admin uniquement, mais on la
// protège contre un abus de type DoS (vidage en boucle du cache).
export const cacheInvalidateRatelimit = redis
  ? createRatelimit(redis, 10, 60, "portfolio:rl:cache-invalidate")
  : createNoOpRatelimit(10, 60_000);

// ── Limiteur pour /admin (HTTP Basic Auth brute force) ────────────────
// 5 tentatives par 15 minutes par IP (réduit de 10/5min).
// Valeur précédente (10/5min) permettait ~100 tentatives/heure avec des
// proxies rotatifs — trop permissif pour un endpoint d'authentification.
// Avec 5/15min : ~20 tentatives/heure par IP → brute force distribué
// nettement plus coûteux en ressources pour l'attaquant.
export const adminRatelimit = redis
  ? createRatelimit(redis, 5, 900, "portfolio:rl:admin")
  : createNoOpRatelimit(5, 900_000);

// ── Limiteur pour /api/csp-report ─────────────────────────────────────
// 20 rapports par 60 secondes par IP.
// Remplace l'ancien compteur in-memory qui était réinitialisé à chaque
// cold-start Vercel — inefficace sur une architecture serverless.
// Un attaquant pouvait flooder /api/csp-report sans friction, épuisant
// les function invocations Vercel Hobby (100 000/mois).
export const cspReportRatelimit = redis
  ? createRatelimit(redis, 20, 60, "portfolio:rl:csp-report")
  : createNoOpRatelimit(20, 60_000);

// ── Limiteur pour /api/errors (client error reporting) ───────────────
// 10 rapports par 60 secondes par IP.
// Généreux pour ne pas bloquer un client en crash-loop (erreur JS qui
// se rejoue), mais suffisant pour absorber un flush d'erreurs groupées.
// La dedup côté client (GlobalErrorHandler) réduit déjà le bruit.
export const errorRatelimit = redis
  ? createRatelimit(redis, 10, 60, "portfolio:rl:errors")
  : createNoOpRatelimit(10, 60_000);

// ── Limiteur pour /api/revalidate ─────────────────────────────────────
// 10 requêtes par 60 secondes par IP.
// Protège contre le flood de l'endpoint ISR en cas de fuite/bruteforce du
// REVALIDATE_SECRET — épuisement des invocations Vercel Hobby (1M/mois).
// Suffisamment permissif pour les webhooks Supabase légitimes.
export const revalidateRatelimit = redis
  ? createRatelimit(redis, 10, 60, "portfolio:rl:revalidate")
  : createNoOpRatelimit(10, 60_000);
