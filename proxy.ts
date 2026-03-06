import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

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

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protection /admin
  if (pathname.startsWith("/admin")) {
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
