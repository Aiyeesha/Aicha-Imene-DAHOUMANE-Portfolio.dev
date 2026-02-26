/**
 * Centralized routing config for next-intl.
 * This is used by middleware and request config.
 */
export const routing = {
  locales: ["en", "fr"] as const,
  defaultLocale: "en" as const
};

export type AppLocale = (typeof routing.locales)[number];
