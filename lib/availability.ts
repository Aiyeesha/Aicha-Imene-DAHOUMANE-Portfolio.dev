// lib/availability.ts
// Single source of truth for the start date shown across the site.
// TSX pages import these labels; messages/*.json cannot import code, so
// __tests__/availability.test.ts fails if a message still holds another
// wording. To change the date: update AVAILABILITY, then the messages
// until the test passes.

export const AVAILABILITY = {
  fr: { from: "à partir de décembre 2026", badge: "Déc. 2026" },
  en: { from: "from December 2026",        badge: "Dec. 2026" },
  es: { from: "a partir de diciembre de 2026", badge: "Dic. 2026" },
} as const;

export type AvailabilityLocale = keyof typeof AVAILABILITY;

/** Labels for a locale, falling back to English. */
export function availability(locale: string) {
  return AVAILABILITY[(locale in AVAILABILITY ? locale : "en") as AvailabilityLocale];
}
