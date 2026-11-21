// lib/i18n/ogLocale.ts
// --------------------
// Open Graph locale codes for a page locale, used by every page's metadata
// (openGraph.locale and openGraph.alternateLocale).

const OG: Record<string, string> = { fr: "fr_FR", en: "en_US", es: "es_ES" };

/** "fr_FR", "es_ES" or "en_US" (default). */
export function ogLocale(locale: string): string {
  return OG[locale] ?? OG.en;
}

/** The two other Open Graph locales, in a stable order. */
export function ogAlternateLocales(locale: string): string[] {
  const current = ogLocale(locale);
  return ["en_US", "fr_FR", "es_ES"].filter((l) => l !== current);
}

const INTL: Record<string, string> = { fr: "fr-FR", en: "en-US", es: "es-ES" };

/** BCP 47 tag for Intl / toLocaleString(): "fr-FR", "es-ES" or "en-US". */
export function intlLocale(locale: string): string {
  return INTL[locale] ?? INTL.en;
}
