import {getRequestConfig} from "next-intl/server";
import {routing} from "./routing";
import {isAvailableNow} from "../lib/availability";
import {availableNowMessages} from "../lib/i18n/availableNowOverrides";

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

  const messages = (await import(`../messages/${safeLocale}.json`)).default;

  return {
    locale: safeLocale,
    // From the start date on, dated "available from December" wordings are
    // rewritten to "available immediately" (lib/availability.ts).
    messages: isAvailableNow() ? availableNowMessages(safeLocale, messages) : messages
  };
});
