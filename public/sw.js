/**
 * sw.js — Service Worker (PWA offline)
 * =====================================
 * Stratégie de cache :
 *   - Statiques Next.js (_next/static) : Cache First (immutable — hash dans l'URL)
 *   - Assets (images, icônes, CV PDF)  : Cache First
 *   - Pages HTML                       : Network First → Cache → Offline fallback
 *   - Routes API (/api/*)              : Network Only (jamais mis en cache)
 *
 * Mise à jour : incrémenter CACHE_VERSION à chaque déploiement majeur.
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

  // Chunks Next.js statiques → Cache First (hash dans l'URL = immuable)
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Assets statiques (images, icônes, PDF, fonts) → Cache First
  if (
    url.pathname.match(/\.(png|jpg|jpeg|webp|svg|gif|ico|woff2?|ttf|pdf)$/i)
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Pages HTML → Network First (contenu frais si connecté, cache sinon)
  event.respondWith(networkFirst(request));
});

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

// ── Stratégie Network First ───────────────────────────────────────────────────
// 1. Essayer le réseau (toujours les données les plus récentes)
// 2. Si réseau OK : mettre en cache + retourner
// 3. Si réseau KO : chercher dans le cache
// 4. Si absent du cache : retourner la page offline.html
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;

    // Fallback ultime : page offline (toujours précachée à l'installation)
    const offline = await caches.match("/offline.html");
    return (
      offline ||
      new Response(
        `<!doctype html><html><body style="font-family:sans-serif;padding:2rem">
          <h1>You're offline</h1>
          <p>Please check your connection and try again.</p>
        </body></html>`,
        { headers: { "Content-Type": "text/html" } }
      )
    );
  }
}
