import {getRequestConfig} from "next-intl/server";
import {routing} from "./routing";

/**
 * next-intl plugin will look for this file by default:
 * - /i18n/request.ts (project root or src/)
 *
 * It provides request-specific configuration (locale + messages).
 */
export default getRequestConfig(async ({requestLocale}) => {
  // In locale-based routing, next-intl provides requestLocale.
  const locale = await requestLocale;

  const safeLocale = routing.locales.includes(locale as any)
    ? (locale as typeof routing.locales[number])
    : routing.defaultLocale;

  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}.json`)).default
  };
});
