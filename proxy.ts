import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import {routing} from "./i18n/routing";

/**
 * Next.js 16: `middleware.ts` file convention is deprecated in favor of `proxy.ts`.
 * This file keeps locale-prefixed routing working for next-intl.
 *
 * Ref: https://nextjs.org/docs/messages/middleware-to-proxy
 */
const handler = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: "always"
});

export function proxy(request: NextRequest) {
  return handler(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
};
