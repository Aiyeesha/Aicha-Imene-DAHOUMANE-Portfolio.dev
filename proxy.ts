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

import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { adminRatelimit } from "./lib/ratelimit";

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
    // Prod : nonce uniquement — Next.js applique automatiquement x-nonce aux RSC scripts.
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
    isDev
      ? "connect-src 'self' data: https://*.supabase.co https://*.upstash.io https://formspree.io https://vitals.vercel-insights.com https://github-contributions-api.jogruber.de"
      : "connect-src 'self' https://*.supabase.co https://*.upstash.io https://formspree.io https://vitals.vercel-insights.com https://github-contributions-api.jogruber.de",
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

// ── Comparaison de strings en temps constant (timing-safe) ───────────────────
// crypto.subtle.timingSafeEqual() est disponible dans l'Edge Runtime.
// La comparaison == en JS peut court-circuiter sur le premier caractère différent,
// créant un timing oracle : un attaquant peut déduire le bon credential caractère
// par caractère en mesurant le temps de réponse (même si le rate-limit atténue
// fortement le risque ici, la correction a un coût quasi nul).
//
// Technique : on encode les deux chaînes en UTF-8 et on les pad à la même longueur
// avant la comparaison pour éviter un oracle sur la longueur. La longueur est
// comparée séparément avant de retourner le résultat final.
// crypto.subtle.timingSafeEqual() est disponible dans l'Edge Runtime (Node.js ≥ 15 / Web Crypto),
// mais absent des types TypeScript standard de SubtleCrypto (non spécifié dans le W3C).
// On étend localement le type plutôt que d'utiliser `any`.
type SubtleCryptoWithTimingSafe = SubtleCrypto & {
  timingSafeEqual(a: BufferSource, b: BufferSource): Promise<boolean>;
};

async function timingSafeStringEqual(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const maxLen = Math.max(a.length, b.length);
  // Pad pour que les buffers soient identiques en longueur avant timingSafeEqual
  const aBuf = enc.encode(a.padEnd(maxLen, "\0"));
  const bBuf = enc.encode(b.padEnd(maxLen, "\0"));
  // timingSafeEqual compare les deux buffers octet par octet sans court-circuit
  const equal = await (crypto.subtle as SubtleCryptoWithTimingSafe).timingSafeEqual(aBuf, bBuf);
  // Vérifier aussi la longueur originale pour rejeter les paddings faussement égaux
  return equal && a.length === b.length;
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

  // ── 2. Protection /admin ──────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    // Rate-limit anti brute-force.
    // Priorité à x-real-ip (injecté par Vercel, non spoofable).
    const ip =
      request.headers.get("x-real-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    const { success } = await adminRatelimit.limit(ip);
    if (!success) {
      return new NextResponse("Too many requests.", {
        status: 429,
        headers: { "Retry-After": "300" },
      });
    }

    const deny = await adminAuth(request);
    if (deny) return deny;

    // Injecter le nonce dans les headers de requête (lisible par Server Components
    // via headers().get('x-nonce')) et dans la réponse (header CSP).
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-nonce", nonce);

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    response.headers.set("Content-Security-Policy", csp);
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
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

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
    } else if (!response.headers.has(key)) {
      response.headers.set(key, value);
    }
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
