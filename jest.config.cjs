/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1"
  },
  // Excluded: Next.js build, node_modules, Playwright E2E specs (they use
  // @playwright/test, incompatible with Jest) and .claude/ (temporary agent
  // worktrees holding a copy of the repo; absent in CI).
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/e2e/",
    "<rootDir>/.claude/"
  ],
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.json" }]
  },
  // next-intl and use-intl are ESM-only: excluded from transformIgnorePatterns
  // so ts-jest transforms them.
  transformIgnorePatterns: [
    "/node_modules/(?!(next-intl|use-intl)/).*"
  ],
  coverageDirectory: "coverage",
  // Coverage covers all shipped code (app/components/lib), not only files
  // imported by existing tests.
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "lib/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/*.test.{ts,tsx}",
    "!**/*.spec.{ts,tsx}",
  ],
  // ts-jest bypasses Babel, so Jest's default "babel" provider instruments
  // nothing (silently 0/0); "v8" works whatever the transform.
  coverageProvider: "v8",
  // Floor thresholds, slightly below the coverage measured over all shipped
  // code, after targeting critical modules (lib/contactValidation.ts,
  // lib/ratelimit.ts…) rather than a high global figure. Raise them as test
  // suites are added.
  coverageThreshold: {
    global: {
      statements: 7,
      branches: 41,
      functions: 16,
      lines: 7,
    },
  },
};
