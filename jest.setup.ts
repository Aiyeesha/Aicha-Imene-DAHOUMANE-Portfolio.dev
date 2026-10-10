import "@testing-library/jest-dom";

// ── Mocks globaux pour les packages ESM purs ──────────────────────────────────
// next-intl utilise des modules ESM natifs que ts-jest
// (CommonJS) ne peut pas parser. On les remplace par des stubs légers.

// next-intl — useTranslations retourne les traductions réelles pour les clés
// utilisées dans les tests unitaires, et la clé brute pour les autres.
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

