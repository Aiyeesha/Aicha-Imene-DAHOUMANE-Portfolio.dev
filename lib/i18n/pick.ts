// lib/i18n/pick.ts
// ----------------
// Picks the right language from content that is already translated in place
// ({ en, fr, es } objects in content/ and components). Interface strings
// belong in messages/*.json instead; this helper is for data.

export type Localized<T = string> = { en: T; fr: T; es: T };

/** Value for `locale`, English when the locale is neither French nor Spanish. */
export function pick<T>(value: Localized<T>, locale: string): T {
  if (locale === "fr") return value.fr;
  if (locale === "es") return value.es;
  return value.en;
}
