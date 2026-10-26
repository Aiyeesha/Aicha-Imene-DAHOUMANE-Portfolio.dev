/**
 * sw.js — Service Worker (PWA offline)
 * =====================================
 * Stratégie de cache :
 *   - Statiques Next.js (_next/static) : Cache First (immutable — hash dans l'URL)
 *   - Assets (images, icônes, CV PDF)  : Cache First
 *   - Pages HTML                       : Network First → Cache → Offline fallback
 *   - Routes API (/api/*)              : Network Only (jamais mis en cache)
 *   - /admin et /<locale>/testimonial-submit : Network Only (données personnelles :
 *     messages de contact, lien d'invitation signé — audit du 2026-10-14, S3)
 *
 * CACHE_VERSION est injecté au runtime par app/sw.js/route.ts, avec le hash
 * court du commit Git (VERCEL_GIT_COMMIT_SHA) — ne pas modifier manuellement.
 * L'ancienne version est supprimée automatiquement à l'activation.
 */

const CACHE_VERSION = "v1";
const CACHE_NAME = `portfolio-pwa-${CACHE_VERSION}`;

// Assets à pré-cacher à l'installation (shell minimal)
const PRECACHE_URLS = [
  "/offline.html",
  "/avatar.webp",
  "/icon-192.png",
  "/icon-512.png",
];

// Pages jamais mises en cache : elles affichent des données personnelles
// (messages de contact dans /admin) ou portent un jeton d'invitation signé
// (testimonial-submit). Exclusion par chemin plutôt que par en-tête : toutes les
// pages HTML du site sont servies en « private, no-store » (rendu dynamique
// imposé par le nonce CSP), donc un filtre sur Cache-Control supprimerait
// tout le mode hors-ligne.
const NETWORK_ONLY_PATHS = [
  /^\/admin(\/|$)/,
  /^\/(fr|en|es)\/testimonial-submit(\/|$)/,
];

// ── Install : précache du shell ───────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()) // active le SW immédiatement sans attendre
  );
});

// ── Activate : nettoyage des anciens caches ───────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim()) // prend le contrôle de toutes les pages ouvertes
  );
});

// ── Fetch : logique de cache par type de ressource ───────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // On ne gère que les requêtes GET du même origin
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  // Routes API → Network Only (données dynamiques, rate-limiting, etc.)
  if (url.pathname.startsWith("/api/")) return;

  // Pages sensibles → Network Only (voir NETWORK_ONLY_PATHS)
  if (NETWORK_ONLY_PATHS.some((re) => re.test(url.pathname))) return;

  // Chunks Next.js statiques → Cache First (hash dans l'URL = immuable)
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Assets statiques (images, icônes, PDF, fonts) → Cache First
  if (
    STATIC_ASSET_RE.test(url.pathname)
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Pages HTML → Network First (contenu frais si connecté, cache sinon)
  event.respondWith(networkFirst(request));
});

// ── Borne du cache des pages ─────────────────────────────────────────────────
// Les pages HTML sont conservées pour la consultation hors ligne : au-delà de
// MAX_CACHED_PAGES, les plus anciennes entrées sont supprimées (ordre
// d'insertion de cache.keys()). Les ressources statiques ne sont pas
// concernées (URL hachées ou fichiers de public/, en nombre fini).
const MAX_CACHED_PAGES = 50;
const STATIC_ASSET_RE = /\.(png|jpg|jpeg|webp|svg|gif|ico|woff2?|ttf|pdf)$/i;
async function trimPages(cache) {
  const pages = (await cache.keys()).filter((req) => {
    const { pathname } = new URL(req.url);
    return !pathname.startsWith("/_next/static/") && !STATIC_ASSET_RE.test(pathname) && pathname !== "/offline.html";
  });
  const excess = pages.length - MAX_CACHED_PAGES;
  for (let i = 0; i < excess; i++) await cache.delete(pages[i]);
}

// ── Stratégie Cache First ─────────────────────────────────────────────────────
// 1. Chercher dans le cache
// 2. Si absent : fetch réseau + stocker dans le cache
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone()); // stocker une copie sans bloquer
    }
    return response;
  } catch {
    // Ressource non cachée et hors ligne → rien à faire, le navigateur gèrera l'erreur
    return new Response("Network error", { status: 503 });
  }
}

// ── Stratégie Network First (sans timeout) ───────────────────────────────────
//
// "Sans timeout" = décision intentionnelle :
//   - Avec timeout : on servirait du contenu obsolète même quand l'utilisateur
//     est en ligne mais sur une connexion lente → expérience dégradée silencieuse.
//   - Sans timeout : l'utilisateur attend le réseau aussi longtemps qu'il le faut.
//     La page est toujours fraîche si le serveur répond.
//
// Flux :
//   1. fetch(request)                               — réseau, pas de timeout
//   2. response.ok (2xx)  → stocker dans le cache, retourner la réponse fraîche
//   3. réponse 5xx (serveur en erreur) → essayer le cache
//      → si absent du cache → retourner la réponse d'erreur telle quelle
//   4. toute autre réponse (redirection, 404, 410…) → la retourner telle quelle
//   5. fetch throw (offline, DNS fail) → essayer le cache
//      → si absent → offline.html
//
// Audit 2026-10-25 : le cache était aussi consulté sur les 4xx et sur les
// redirections (réponse opaqueredirect, ok=false) — une page dépubliée,
// redirigée ou supprimée continuait d'être servie depuis le cache. Seule une
// erreur serveur (5xx) ou l'absence de réseau justifient désormais le repli.
// Les charges utiles RSC (?_rsc=…) ne sont plus mises en cache : une entrée
// par navigation faisait grossir le cache sans limite.
async function networkFirst(request) {
  try {
    const response = await fetch(request);

    if (response.ok) {
      // Réseau OK : mettre en cache pour les visites hors ligne futures
      if (!new URL(request.url).searchParams.has("_rsc")) {
        const cache = await caches.open(CACHE_NAME);
        // non bloquant (pas de await) ; borne le nombre de pages conservées
        cache.put(request, response.clone()).then(() => trimPages(cache));
      }
      return response;
    }

    // Erreur serveur (5xx) : tenter le cache avant de montrer l'erreur.
    if (response.status >= 500) {
      const cached = await caches.match(request);
      if (cached) return cached;
    }

    // Redirection, 404, 410… ou pas de cache : réponse telle quelle
    // (les error boundaries React prendront le relais côté client)
    return response;
  } catch {
    // Réseau injoignable (offline, timeout DNS, etc.)
    const cached = await caches.match(request);
    if (cached) return cached;

    // Fallback ultime : page offline précachée à l'installation
    const offline = await caches.match("/offline.html");
    return (
      offline ||
      new Response(
        `<!doctype html><html lang="en"><body style="font-family:sans-serif;padding:2rem;max-width:480px;margin:auto">
          <h1 style="font-size:1.5rem">You're offline</h1>
          <p style="color:#666">Please check your connection and try again.</p>
        </body></html>`,
        { headers: { "Content-Type": "text/html;charset=utf-8" } }
      )
    );
  }
}
