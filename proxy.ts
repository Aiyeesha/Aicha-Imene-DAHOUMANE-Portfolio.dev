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
    isDev
      ? `script-src 'self' 'nonce-${nonce}' 'unsafe-eval' https://assets.calendly.com https://va.vercel-scripts.com`
      : `script-src 'self' 'nonce-${nonce}' https://assets.calendly.com https://va.vercel-scripts.com`,
    "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
    "img-src 'self' data: https://*.supabase.co https://*.supabase.in",
    "font-src 'self'",
    "frame-src https://calendly.com",
    isDev
      ? "connect-src 'self' data: https://*.supabase.co https://*.upstash.io https://formspree.io https://vitals.vercel-insights.com https://github-contributions-api.jogruber.de"
      : "connect-src 'self' https://*.supabase.co https://*.upstash.io https://formspree.io https://vitals.vercel-insights.com https://github-contributions-api.jogruber.de",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "report-uri /api/csp-report",
    "report-to csp-endpoint",
  ].join("; ");
}

// ── HTTP Basic Auth pour /admin ───────────────────────────────────────────────
// Retourne null si les credentials sont valides, NextResponse sinon.
// Edge Runtime : utilise atob() (pas Buffer.from()).
function adminAuth(request: NextRequest): NextResponse | null {
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
        if (user === expectedUser && pass === expectedPass) {
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

    const deny = adminAuth(request);
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

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set("Content-Security-Policy", csp);

  // Préserver les headers de intlHandler (cookie de locale, x-next-intl-*, etc.)
  intlResponse.headers.forEach((value, key) => {
    if (key === "set-cookie") {
      // append pour ne pas écraser les cookies existants
      response.headers.append(key, value);
    } else if (!response.headers.has(key)) {
      response.headers.set(key, value);
    }
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
