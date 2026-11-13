// lib/availability.ts
// Single source of truth for the start date shown across the site.
//
// Two phases, switched automatically by the date (pages are rendered per
// request, so no redeploy is needed):
// - before AVAILABLE_FROM: "interviews now, available from December 2026";
// - from AVAILABLE_FROM on: "available immediately".
//
// TSX pages read availability(locale). messages/*.json cannot import code:
// they hold the "upcoming" wording (checked by __tests__/availability.test.ts)
// and lib/i18n/availableNowOverrides.ts rewrites them once AVAILABLE_FROM is
// reached (applied in i18n/request.ts).
//
// To change the date: update AVAILABLE_FROM and AVAILABILITY, then the
// messages and the overrides until the tests pass.

/** First day of availability, midnight in Paris (UTC+1 in December). */
export const AVAILABLE_FROM = new Date("2026-12-01T00:00:00+01:00");

/** True once the start date is reached. */
export function isAvailableNow(now: Date = new Date()): boolean {
  return now.getTime() >= AVAILABLE_FROM.getTime();
}

/** Labels before the start date. */
export const AVAILABILITY = {
  fr: { from: "à partir de décembre 2026",     badge: "Déc. 2026", summary: "Entretiens dès maintenant · Disponible à partir de décembre 2026" },
  en: { from: "from December 2026",            badge: "Dec. 2026", summary: "Interviews now · Available from December 2026" },
  es: { from: "a partir de diciembre de 2026", badge: "Dic. 2026", summary: "Entrevistas desde ya · Disponible a partir de diciembre de 2026" },
} as const;

/** Labels from the start date on. */
export const AVAILABILITY_NOW = {
  fr: { from: "immédiatement", badge: "Immédiate", summary: "Disponible immédiatement" },
  en: { from: "immediately",   badge: "Now",       summary: "Available immediately" },
  es: { from: "de inmediato",  badge: "Ya",        summary: "Disponible de inmediato" },
} as const;

export type AvailabilityLocale = keyof typeof AVAILABILITY;

export type AvailabilityLabels = { from: string; badge: string; summary: string };

function toLocale(locale: string): AvailabilityLocale {
  return (locale in AVAILABILITY ? locale : "en") as AvailabilityLocale;
}

/** Labels for a locale and an explicit phase, falling back to English. */
export function availabilityLabels(locale: string, availableNow: boolean): AvailabilityLabels {
  return (availableNow ? AVAILABILITY_NOW : AVAILABILITY)[toLocale(locale)];
}

/** Labels for a locale at a given time (now by default). */
export function availability(locale: string, now: Date = new Date()): AvailabilityLabels {
  return availabilityLabels(locale, isAvailableNow(now));
}
