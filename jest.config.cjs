/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1"
  },
  // Exclure : build Next.js, node_modules, et les tests E2E Playwright
  // (les specs e2e/ utilisent @playwright/test, incompatible avec Jest).
  // .claude/ : worktrees git éphémères créés par les agents — contiennent une
  // copie du repo (dont e2e/), que Jest tenterait sinon de charger. Absent en CI.
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/e2e/",
    "<rootDir>/.claude/"
  ],
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.json" }]
  },
  // next-intl et @vercel/analytics sont des packages ESM purs.
  // Jest (CommonJS) ne peut pas les importer sans transformation.
  // On les exclut de transformIgnorePatterns pour que ts-jest les traite.
  transformIgnorePatterns: [
    "/node_modules/(?!(next-intl|@vercel/analytics|use-intl)/).*"
  ],
  coverageDirectory: "coverage",
  // Périmètre de la couverture : l'ensemble du code livré (app/components/lib),
  // pas seulement les fichiers déjà importés par les tests existants.
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "lib/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/*.test.{ts,tsx}",
    "!**/*.spec.{ts,tsx}",
  ],
  // ts-jest ne passe pas par Babel, donc le provider "babel" par défaut de Jest
  // n'instrumente aucun fichier (couverture silencieusement à 0/0). Le provider
  // "v8" fonctionne indépendamment du transform utilisé.
  coverageProvider: "v8",
  // Seuil de couverture plancher — reflète désormais la couverture réelle mesurée
  // sur l'ensemble du code livré (app/, components/, lib/), et non plus
  // seulement les fichiers déjà importés par les tests existants (ce qui donnait
  // une fausse impression de couverture représentative à 50%). Les valeurs
  // ci-dessous sont légèrement en dessous des chiffres réels mesurés le
  // 2026-07-12 (statements 7.14%, branches 42.58%, functions 17.01%, lines
  // 7.14%), après avoir ciblé les modules critiques (lib/contactValidation.ts,
  // lib/ratelimit.ts — cf. audit) plutôt que viser un chiffre global élevé.
  // À augmenter progressivement au fil de l'ajout de nouvelles suites de tests.
  coverageThreshold: {
    global: {
      statements: 7,
      branches: 41,
      functions: 16,
      lines: 7,
    },
  },
};
