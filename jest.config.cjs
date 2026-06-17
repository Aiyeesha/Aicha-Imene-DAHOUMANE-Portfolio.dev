/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1"
  },
  // Exclure : build Next.js, node_modules, et les tests E2E Playwright
  // (les specs e2e/ utilisent @playwright/test, incompatible avec Jest)
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/e2e/"
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
  // Seuil de couverture plancher — aligné sur la couverture actuelle (fichiers importés par les tests).
  // Augmenter progressivement au fil des nouvelles suites de tests.
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 30,
      functions: 50,
      lines: 50,
    },
  },
};
