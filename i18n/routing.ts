/**
 * Centralized routing config for next-intl.
 * This is used by middleware and request config.
 */
// A Spanish locale is in preparation: messages/es.json already exists as a
// structural skeleton (same keys as messages/en.json, English values — not
// yet translated). Do NOT enable "es" here until messages/es.json has been
// actually translated into Spanish and proofread — see messages/es.README.md.
// Once ready, activate it with:
// locales: ["en", "fr", "es"] as const,
export const routing = {
  locales: ["en", "fr"] as const,
  defaultLocale: "en" as const
};

export type AppLocale = (typeof routing.locales)[number];
