import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { adminRatelimit } from "./lib/ratelimit";

/**
 * Next.js 16: `middleware.ts` file convention is deprecated in favor of `proxy.ts`.
 * This file keeps locale-prefixed routing working for next-intl.
 *
 * Ref: https://nextjs.org/docs/messages/middleware-to-proxy
 *
 * Protection HTTP Basic Auth sur /admin — Edge runtime (atob, pas Buffer).
 * Variables d'env requises : ADMIN_USERNAME + ADMIN_PASSWORD
 */

const intlHandler = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: "always",
});

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

  // Protection /admin
  if (pathname.startsWith("/admin")) {
    // ── Rate-limit anti brute-force ──────────────────────────────────
    // Priorité à x-real-ip (injecté par Vercel, non spoofable).
    // Fallback sur x-forwarded-for uniquement si x-real-ip absent.
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
    return NextResponse.next();
  }

  // Routing i18n pour tout le reste
  return intlHandler(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
