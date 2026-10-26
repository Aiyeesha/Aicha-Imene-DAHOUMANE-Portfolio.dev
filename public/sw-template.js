/**
 * sw.js — service worker (offline support)
 * =========================================
 * Caching strategy:
 *   - Next.js static files (_next/static)  : cache first (hashed URLs)
 *   - Assets (images, icons, CV PDF)       : cache first
 *   - HTML pages                           : network first → cache → offline page
 *   - API routes (/api/*)                  : network only (never cached)
 *   - /admin and /<locale>/testimonial-submit : network only (personal data:
 *     contact messages, signed invitation link)
 *
 * CACHE_VERSION is injected at runtime by app/sw.js/route.ts with the short
 * commit hash (VERCEL_GIT_COMMIT_SHA); do not edit it by hand. The previous
 * version's cache is deleted on activation.
 */

const CACHE_VERSION = "v1";
const CACHE_NAME = `portfolio-pwa-${CACHE_VERSION}`;

// Assets precached on install (minimal shell)
const PRECACHE_URLS = [
  "/offline.html",
  "/avatar.webp",
  "/icon-192.png",
  "/icon-512.png",
];

// Never cached: these pages show personal data (contact messages in /admin)
// or carry a signed invitation token (testimonial-submit). Excluded by path:
// every HTML page is served "private, no-store" (dynamic rendering because of
// the CSP nonce), so filtering on Cache-Control would disable offline mode.
const NETWORK_ONLY_PATHS = [
  /^\/admin(\/|$)/,
  /^\/(fr|en|es)\/testimonial-submit(\/|$)/,
];

// ── Install: precache the shell ───────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()) // activate right away
  );
});

// ── Activate: delete old caches ───────────────────────────────────────────────
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
      .then(() => self.clients.claim()) // take control of every open page
  );
});

// ── Fetch: caching per resource type ─────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Same-origin GET requests only
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  // API routes → network only
  if (url.pathname.startsWith("/api/")) return;

  // Sensitive pages → network only (see NETWORK_ONLY_PATHS)
  if (NETWORK_ONLY_PATHS.some((re) => re.test(url.pathname))) return;

  // Next.js static chunks → cache first (hashed, immutable)
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Static assets (images, icons, PDF, fonts) → cache first
  if (
    STATIC_ASSET_RE.test(url.pathname)
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // HTML pages → network first (fresh when online, cache otherwise)
  event.respondWith(networkFirst(request));
});

// ── Page cache limit ──────────────────────────────────────────────────────────
// HTML pages are kept for offline reading; beyond MAX_CACHED_PAGES the oldest
// entries are deleted (cache.keys() insertion order). Static resources are not
// concerned (hashed URLs or a finite set of public/ files).
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

// ── Cache first ───────────────────────────────────────────────────────────────
// Look in the cache; otherwise fetch and store.
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone()); // store a copy without blocking
    }
    return response;
  } catch {
    // Not cached and offline: let the browser handle the error
    return new Response("Network error", { status: 503 });
  }
}

// ── Network first (no timeout) ───────────────────────────────────────────────
// No timeout on purpose: with one, a slow but online visitor would silently
// get stale content.
//
//   1. fetch(request), no timeout
//   2. 2xx → store in the cache, return the fresh response
//   3. 5xx → try the cache, otherwise return the error response
//   4. any other response (redirect, 404, 410…) → return it as is, so an
//      unpublished, redirected or deleted page is never served from cache
//   5. fetch throws (offline, DNS failure) → cache, otherwise offline.html
//
// RSC payloads (?_rsc=…) are not cached: one entry per navigation would grow
// the cache without bound.
async function networkFirst(request) {
  try {
    const response = await fetch(request);

    if (response.ok) {
      // Network OK: cache for future offline visits
      if (!new URL(request.url).searchParams.has("_rsc")) {
        const cache = await caches.open(CACHE_NAME);
        // non-blocking (no await); caps the number of stored pages
        cache.put(request, response.clone()).then(() => trimPages(cache));
      }
      return response;
    }

    // Server error (5xx): try the cache before showing the error.
    if (response.status >= 500) {
      const cached = await caches.match(request);
      if (cached) return cached;
    }

    // Redirect, 404, 410… or nothing cached: return as is (React error
    // boundaries take over on the client)
    return response;
  } catch {
    // Network unreachable (offline, DNS timeout…)
    const cached = await caches.match(request);
    if (cached) return cached;

    // Last resort: offline page precached on install
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
