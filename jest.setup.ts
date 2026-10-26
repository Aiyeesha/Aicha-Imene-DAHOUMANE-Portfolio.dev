import "@testing-library/jest-dom";

// ── Global mocks for ESM-only packages ────────────────────────────────────────
// next-intl ships native ESM modules that ts-jest (CommonJS) cannot parse, so
// they are replaced with light stubs. useTranslations returns real
// translations for the keys used in unit tests, and the raw key otherwise.
const MOCK_TRANSLATIONS: Record<string, string> = {
  "scrollToTop":              "Retour en haut de page",
  "skip":                     "Aller au contenu principal",
  "a11y.scrollToTop":         "Retour en haut de page",
  "a11y.skip":                "Aller au contenu principal",
};

jest.mock("next-intl", () => ({
  useTranslations: (_ns?: string) => (key: string) => {
    const full = _ns ? `${_ns}.${key}` : key;
    return MOCK_TRANSLATIONS[full] ?? MOCK_TRANSLATIONS[key] ?? key;
  },
  useLocale:       () => "en",
  useNow:          () => new Date(),
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
}));

