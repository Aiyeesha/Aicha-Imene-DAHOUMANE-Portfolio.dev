// proxy.ts
// ---------
// Next.js 16 middleware (convention : proxy.ts remplace middleware.ts).
// Trois responsabilités par ordre d'exécution :
//
// 1. Nonce CSP — génère un UUID aléatoire base64 par requête.
//    Injecté dans le header Content-Security-Policy (réponse) ET dans
//    x-nonce (requête) pour que les Server Components puissent le lire
//    via `headers().get('x-nonce')` et l'appliquer aux scripts inline.
//    → remplace le 'unsafe-inline' statique de next.config.mjs.
//
// 2. Protection /admin — HTTP Basic Auth + rate-limit anti brute-force.
//    Variables d'env requises : ADMIN_USERNAME + ADMIN_PASSWORD
//
// 3. Routing i18n — next-intl (redirections /→/en/, préfix de locale).
//
// Edge Runtime — pas de Buffer, pas de Node.js. API Web uniquement.
// crypto.randomUUID() et btoa() sont disponibles dans l'Edge Runtime.
//
// ── NOTE ARCHITECTURALE : nonce CSP vs cache CDN ─────────────────────────────
// Le nonce généré ici est lu par app/layout.tsx via headers().get("x-nonce").
// Cet appel à headers() en Server Component opt TOUTE la route en rendu
// dynamique (Next.js App Router), ce qui interdit la mise en cache CDN Vercel
// (Cache-Control: no-store automatique) et rend l'ISR inopérant.
//
// Ce comportement est VOULU : la sécurité (nonce unique + strict-dynamic) prime
// sur le cache CDN. La résolution est prévue au homelab via reverse proxy cache
// (Nginx proxy_cache_bypass / Caddy cache directive) — voir app/layout.tsx.
// ─────────────────────────────────────────────────────────────────────────────

import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { adminRatelimit } from "./lib/ratelimit";
import { timingSafeStringEqual } from "./lib/security/timingSafeEqual";

const intlHandler = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: "always",
});

// ── CSP dynamique avec nonce ──────────────────────────────────────────────────
// La CSP est construite à chaque requête car elle contient un nonce unique.
// 'unsafe-inline' est remplacé par 'nonce-{nonce}' dans script-src.
// 'unsafe-eval' est conservé uniquement en développement (webpack HMR).
// Les origines externes (Calendly, Vercel Analytics) restent dans la liste blanche
// pour les navigateurs qui ne supportent pas encore CSP3 strict-dynamic.
function buildCSP(nonce: string, isDev: boolean): string {
  return [
    "default-src 'self'",
    // Dev : 'unsafe-inline' + 'unsafe-eval' nécessaires — webpack HMR injecte de nombreux
    // inline scripts sans nonce (hot-update chunks, error overlay, source maps).
    // Ces directives ne s'appliquent JAMAIS en production (isDev = false → branche else).
    // Prod : nonce uniquement — Next.js lit le header CSP de la requête (pas x-nonce)
    // pour injecter nonce= sur ses propres <script> (chunks d'hydratation, bootstrap webpack).
    isDev
      ? `script-src 'self' 'nonce-${nonce}' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com https://va.vercel-scripts.com`
      // 'strict-dynamic' (CSP3) : seuls les scripts chargés par un script noncé
      // héritent de la confiance — la whitelist de domaines est ignorée par les
      // navigateurs qui supportent strict-dynamic, mais reste en fallback pour les autres.
      : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://assets.calendly.com https://va.vercel-scripts.com`,
    "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
    "img-src 'self' data: https://*.supabase.co https://*.supabase.in",
    "font-src 'self'",
    "frame-src https://calendly.com",
    // Upstash Redis intentionnellement absent de connect-src :
    // les appels Redis sont exclusivement server-side (API routes, middleware).
    // Aucun script client ne contacte Upstash directement — l'autoriser dans
    // la CSP du navigateur serait une permission inutile (overpermission).
    isDev
      ? "connect-src 'self' data: https://*.supabase.co https://formspree.io https://vitals.vercel-insights.com https://github-contributions-api.jogruber.de"
      : "connect-src 'self' https://*.supabase.co https://formspree.io https://vitals.vercel-insights.com https://github-contributions-api.jogruber.de",
    "object-src 'none'",
    "base-uri 'self'",
    // Empêche les <form action="..."> de soumettre vers une URL externe.
    // Ne bloque pas fetch()/XHR — cible uniquement les soumissions HTML classiques.
    // Protection supplémentaire contre le détournement de formulaire (CSRF via HTML).
    "form-action 'self'",
    // Autorise le Service Worker (PWA) à s'enregistrer depuis la même origine.
    "worker-src 'self'",
    "frame-ancestors 'none'",
    "report-uri /api/csp-report",
    "report-to csp-endpoint",
  ].join("; ");
}

// ── CSP Report-Only : Trusted Types ──────────────────────────────────────────
// En mode report-only, la politique N'EST PAS appliquée — les violations sont
// seulement signalées à /api/csp-report?ro=1.
//
// Objectif ici : détecter toute utilisation de sink DOM dangereux (innerHTML,
// eval, document.write…) via require-trusted-types-for 'script'.
// React 19 est compatible Trusted Types (il ne passe par ces sinks), mais
// des bibliothèques tierces ou des patterns hérités pourraient en avoir besoin.
// Le paramètre ?ro=1 distingue les rapports report-only des violations actives
// dans les Vercel Runtime Logs, pour faciliter le tri.
function buildCSPReportOnly(): string {
  return [
    // Détecte tout usage de sink DOM non-noncé (innerHTML, eval, etc.)
    // Sans bloquer — le site reste fonctionnel même si des violations sont trouvées.
    "require-trusted-types-for 'script'",
    // Endpoint dédié report-only (distingué par ?ro=1 dans les logs)
    "report-uri /api/csp-report?ro=1",
    "report-to csp-endpoint",
  ].join("; ");
}


// ── HTTP Basic Auth pour /admin ───────────────────────────────────────────────
// Retourne null si les credentials sont valides, NextResponse sinon.
// Edge Runtime : utilise atob() (pas Buffer.from()).
async function adminAuth(request: NextRequest): Promise<NextResponse | null> {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPass) {
    return new NextResponse("Admin not configured.", { status: 503 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    try {
      const decoded = atob(authHeader.slice(6));
      const colonIdx = decoded.indexOf(":");
      if (colonIdx !== -1) {
        const user = decoded.slice(0, colonIdx);
        const pass = decoded.slice(colonIdx + 1);
        // Comparaison en temps constant — évite le timing oracle
        const userMatch = await timingSafeStringEqual(user, expectedUser);
        const passMatch = await timingSafeStringEqual(pass, expectedPass);
        if (userMatch && passMatch) {
          return null; // autorisé
        }
      }
    } catch {
      // base64 invalide → rejeter
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"',
    },
  });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDev = process.env.NODE_ENV === "development";

  // ── 1. Nonce par requête (Edge-compatible) ────────────────────────────────
  // crypto.randomUUID() retourne un UUID v4 aléatoire (CSPRNG).
  // btoa() encode en base64 — le nonce dans la CSP doit être base64.
  const nonce = btoa(crypto.randomUUID());
  const csp = buildCSP(nonce, isDev);
  const cspRO = buildCSPReportOnly();

  // ── 2. Protection /admin ──────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    // Rate-limit anti brute-force.
    // Priorité à x-real-ip (injecté par Vercel, non spoofable).
    const ip =
      request.headers.get("x-real-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    let rlSuccess = false;
    try {
      ({ success: rlSuccess } = await adminRatelimit.limit(ip));
    } catch (err) {
      // Panne Redis : fail-closed volontaire sur /admin (endpoint sensible).
      console.error("[admin] rate-limit error → fail-closed", err);
    }
    if (!rlSuccess) {
      return new NextResponse("Too many requests.", {
        status: 429,
        headers: { "Retry-After": "300" },
      });
    }

    const deny = await adminAuth(request);
    if (deny) return deny;

    // Injecter le nonce dans les headers de requête :
    //   - x-nonce         → lu par les Server Components via headers().get('x-nonce')
    //   - Content-Security-Policy → lu par Next.js pour injecter nonce= sur ses propres
    //     <script> (chunks d'hydratation, bootstrap webpack). Sans ce header REQUEST,
    //     Next.js ne tague pas ses scripts et strict-dynamic les bloque.
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-nonce", nonce);
    requestHeaders.set("Content-Security-Policy", csp);

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    response.headers.set("Content-Security-Policy", csp);
    response.headers.set("Content-Security-Policy-Report-Only", cspRO);
    return response;
  }

  // ── 3. Routing i18n ───────────────────────────────────────────────────────
  const intlResponse = intlHandler(request);

  // Redirections (ex: / → /en/) : pas de rendu de page, pas de nonce nécessaire.
  if (intlResponse.status >= 300 && intlResponse.status < 400) {
    return intlResponse;
  }

  // Pass-through : la page va être rendue — injecter le nonce.
  // On crée un nouveau NextResponse.next() avec x-nonce dans les headers de
  // requête, puis on copie les headers de intlHandler (cookies de locale, etc.).
  //   - x-nonce         → lu par les Server Components via headers().get('x-nonce')
  //   - Content-Security-Policy → lu par Next.js pour injecter nonce= sur ses propres
  //     <script> (chunks d'hydratation, bootstrap webpack). Sans ce header REQUEST,
  //     Next.js ne tague pas ses scripts et strict-dynamic les bloque.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  // Transmettre la locale détectée par next-intl aux Server Components.
  // getLocale() lit x-next-intl-locale depuis les request headers.
  // On extrait la locale depuis le pathname (ex: /fr/about → "fr")
  // car intlHandler communique la locale via ses request headers internes
  // que NextResponse.next() ne reçoit pas automatiquement.
  const localeMatch = pathname.match(/^\/([a-z]{2})(?:\/|$)/);
  const detectedLocale = localeMatch ? localeMatch[1] : routing.defaultLocale;
  requestHeaders.set("x-next-intl-locale", detectedLocale);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("Content-Security-Policy-Report-Only", cspRO);

  // Préserver les headers de intlHandler (x-next-intl-*, etc.)
  // ⚠️ NEXT_LOCALE cookie intentionnellement filtré :
  //    Quand Set-Cookie est présent dans la réponse, Vercel CDN force
  //    Cache-Control: private/no-cache et ne met jamais la page en cache,
  //    ce qui désactive complètement l'ISR (revalidate: 3600) — chaque
  //    visiteur paye un cold start serverless (~1.5–2s TTFB).
  //    Le cookie est redondant : la locale est déjà dans l'URL
  //    (localePrefix: "always"). Seule perte : '/' redirige vers la locale
  //    par défaut (/en/) au lieu de la préférence précédente — acceptable
  //    pour un portfolio.
  intlResponse.headers.forEach((value, key) => {
    if (key === "set-cookie") {
      // Transmettre tous les cookies SAUF NEXT_LOCALE
      if (!value.startsWith("NEXT_LOCALE=")) {
        response.headers.append(key, value);
      }
    } else if (key === "link") {
      // Le Link header hreflang généré par next-intl contient un x-default sans préfixe
      // de locale (ex: /legal au lieu de /en/legal), incohérent avec les balises <link>
      // dans <head> HTML (qui sont correctes). On filtre ce header ; Google utilise les
      // balises HTML en priorité — elles font autorité.
    } else if (!response.headers.has(key)) {
      response.headers.set(key, value);
    }
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|opengraph-image|twitter-image|.*\\..*).*)"],
};
