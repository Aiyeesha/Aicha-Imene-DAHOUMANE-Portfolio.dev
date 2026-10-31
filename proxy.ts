// proxy.ts
// ---------
// Next.js 16 middleware (proxy.ts replaces middleware.ts). In order:
//
// 1. CSP nonce: a random base64 UUID per request, set in the response's
//    Content-Security-Policy and in the request's x-nonce header so server
//    components can read it with headers().get('x-nonce').
// 2. /admin protection: HTTP Basic auth (ADMIN_USERNAME + ADMIN_PASSWORD)
//    with brute-force rate limiting.
// 3. i18n routing with next-intl (/ → /en/, locale prefix).
//
// Edge runtime: Web APIs only (no Buffer, no Node.js); crypto.randomUUID()
// and btoa() are available.
//
// Note: reading the nonce through headers() makes every route dynamic
// (Cache-Control: no-store, no ISR). This is deliberate: a unique nonce with
// strict-dynamic takes priority over CDN caching (see app/layout.tsx).

import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { adminRatelimit, pseudonymizeKey } from "./lib/ratelimit";
import { timingSafeStringEqual } from "./lib/security/timingSafeEqual";

const intlHandler = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: "always",
});

// ── Per-request CSP with nonce ────────────────────────────────────────────────
// script-src uses 'nonce-{nonce}'; 'unsafe-eval' only in development (webpack
// HMR). No external origin in script-src, style-src or frame-src: booking is
// a plain link to Proton Calendar (lib/booking.ts), no third-party script.
function buildCSP(nonce: string, isDev: boolean): string {
  return [
    "default-src 'self'",
    // Dev: 'unsafe-inline' + 'unsafe-eval' are needed, as webpack HMR injects
    // many inline scripts without a nonce. Never used in production.
    // Prod: nonce only. Next.js reads the request's CSP header (not x-nonce)
    // to add nonce= to its own <script> tags (hydration chunks, bootstrap).
    isDev
      ? `script-src 'self' 'nonce-${nonce}' 'unsafe-inline' 'unsafe-eval'`
      // 'strict-dynamic' (CSP3): only scripts loaded by a nonced script are
      // trusted.
      : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    // No iframes on the site: every frame is refused.
    "frame-src 'none'",
    // Only hosts the browser actually contacts: Formhook and Upstash Redis
    // are called server-side only, so they are not allowed here.
    isDev
      ? "connect-src 'self' data:"
      : "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    // <form action="..."> cannot submit to an external URL (classic HTML
    // submissions only; fetch()/XHR are unaffected).
    "form-action 'self'",
    // Lets the service worker register from the same origin.
    "worker-src 'self'",
    "frame-ancestors 'none'",
    "report-uri /api/csp-report",
    "report-to csp-endpoint",
  ].join("; ");
}

// ── Report-only CSP: Trusted Types ───────────────────────────────────────────
// Not enforced: violations are only reported to /api/csp-report?ro=1. Detects
// any use of dangerous DOM sinks (innerHTML, eval, document.write…) through
// require-trusted-types-for 'script'. React 19 does not use them, but a
// third-party library might. ?ro=1 separates these reports in the logs.
function buildCSPReportOnly(): string {
  return [
    // Report non-Trusted-Types sink usage without blocking anything
    "require-trusted-types-for 'script'",
    // Dedicated report-only endpoint (?ro=1)
    "report-uri /api/csp-report?ro=1",
    "report-to csp-endpoint",
  ].join("; ");
}

// ── HTTP Basic auth for /admin ────────────────────────────────────────────────
// Returns null when the credentials are valid, a NextResponse otherwise.
// Edge runtime: atob(), not Buffer.from().
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
        // Constant-time comparison (no timing oracle)
        const userMatch = await timingSafeStringEqual(user, expectedUser);
        const passMatch = await timingSafeStringEqual(pass, expectedPass);
        if (userMatch && passMatch) {
          return null; // authorised
        }
      }
    } catch {
      // Invalid base64 → reject
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

  // ── 1. Per-request nonce (Edge-compatible) ────────────────────────────────
  // crypto.randomUUID() is a CSPRNG v4 UUID; the CSP nonce must be base64.
  const nonce = btoa(crypto.randomUUID());
  const csp = buildCSP(nonce, isDev);
  const cspRO = buildCSPReportOnly();

  // ── 2. /admin protection ──────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    // Brute-force rate limit. x-real-ip first (set by Vercel, not spoofable).
    const ip =
      request.headers.get("x-real-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    // Refuse right away once the failure quota is used up (without checking
    // credentials); only a failed authentication consumes a token, so normal
    // admin browsing never locks itself out.
    const rlKey = await pseudonymizeKey(ip);
    const tooManyRequests = () =>
      new NextResponse("Too many requests.", {
        status: 429,
        headers: { "Retry-After": "300" },
      });

    let remaining = 0;
    try {
      ({ remaining } = await adminRatelimit.getRemaining(rlKey));
    } catch (err) {
      // Redis outage: deliberately fail closed on /admin (sensitive endpoint).
      console.error("[admin] rate-limit error → fail-closed", err);
    }
    if (remaining <= 0) return tooManyRequests();

    const deny = await adminAuth(request);
    if (deny) {
      try {
        const { success } = await adminRatelimit.limit(rlKey);
        if (!success) return tooManyRequests();
      } catch (err) {
        console.error("[admin] rate-limit error → fail-closed", err);
        return tooManyRequests();
      }
      return deny;
    }

    // Nonce in the request headers:
    //   - x-nonce → read by server components through headers().get('x-nonce');
    //   - Content-Security-Policy → read by Next.js to add nonce= to its own
    //     <script> tags; without it, strict-dynamic would block them.
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

  // ── 3. i18n routing ───────────────────────────────────────────────────────
  const intlResponse = intlHandler(request);

  // Redirects (e.g. / → /en/): no page render, no nonce needed.
  if (intlResponse.status >= 300 && intlResponse.status < 400) {
    return intlResponse;
  }

  // Pass-through: the page will render, so inject the nonce (same two
  // request headers as above), then copy intlHandler's headers.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  // Pass the locale to server components: getLocale() reads
  // x-next-intl-locale from the request headers, which NextResponse.next()
  // does not receive from intlHandler, so it is taken from the pathname
  // (e.g. /fr/about → "fr"). Only values in routing.locales are kept;
  // anything else falls back to the default locale.
  const localeMatch = pathname.match(/^\/([a-z]{2})(?:\/|$)/);
  const candidateLocale = localeMatch?.[1];
  const detectedLocale =
    candidateLocale && (routing.locales as readonly string[]).includes(candidateLocale)
      ? candidateLocale
      : routing.defaultLocale;
  requestHeaders.set("x-next-intl-locale", detectedLocale);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("Content-Security-Policy-Report-Only", cspRO);

  // Keep intlHandler's headers (x-next-intl-*…), except the NEXT_LOCALE
  // cookie: any Set-Cookie makes the Vercel CDN mark the page private and
  // never cache it. The cookie is redundant with localePrefix: "always"; the
  // only loss is that / redirects to the default locale rather than the last
  // one used.
  intlResponse.headers.forEach((value, key) => {
    if (key === "set-cookie") {
      // Every cookie except NEXT_LOCALE
      if (!value.startsWith("NEXT_LOCALE=")) {
        response.headers.append(key, value);
      }
    } else if (key === "link") {
      // next-intl's hreflang Link header has an x-default without a locale
      // prefix, inconsistent with the (correct) <link> tags in <head>, which
      // Google prefers anyway: drop it.
    } else if (!response.headers.has(key)) {
      response.headers.set(key, value);
    }
  });

  return response;
}

export const config = {
  // feed/*: per-tag RSS feeds, outside i18n.
  // Only extensions actually served from public/ or by a file route are
  // excluded (a blanket `.*\\..*` exclusion let any dotted path skip the CSP
  // and rate limit); HTML CVs (public/cv/) and offline.html by path. /admin is
  // listed explicitly so it always goes through the proxy.
  matcher: [
    "/((?!api|_next|opengraph-image|twitter-image|feed|cv/|offline\\.html|.*\\.(?:png|jpe?g|gif|webp|avif|svg|ico|txt|xml|js|css|map|pdf|webmanifest|woff2?)$).*)",
    "/admin",
    "/admin/:path*",
  ],
};
