// playwright.config.ts
// --------------------
// Playwright E2E configuration.
//   - CI: channel 'chrome' (Google Chrome preinstalled on ubuntu-latest, no
//     browser download, which used to hang); starts the production server
//     (npm run start, after a build).
//   - Local: Chromium + Firefox; reuses a running dev server.
// Run: npm run test:e2e (UI mode: npm run test:e2e:ui)

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",

  // Parallel runs, except in CI
  fullyParallel: !process.env.CI,

  // Fail on a leftover .only in CI
  forbidOnly: !!process.env.CI,

  // One retry in CI for network flakiness
  retries: process.env.CI ? 1 : 0,

  // 2 workers in CI (the shared server is stateless)
  workers: process.env.CI ? 2 : undefined,

  // Reporter per environment
  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: "http://localhost:3000",
    // Trace on the first retry (CI debugging)
    trace: "on-first-retry",
    // Screenshot on failure only
    screenshot: "only-on-failure",
  },

  // CI: preinstalled Google Chrome (`npx playwright install` used to hang on
  // extraction). Firefox runs locally only.
  projects: process.env.CI
    ? [{ name: "chromium", use: { ...devices["Desktop Chrome"], channel: "chrome" } }]
    : [
        { name: "chromium", use: { ...devices["Desktop Chrome"] } },
        {
          // Firefox (Gecko): CSP and crypto behaviour can differ from Blink
          name: "firefox",
          use: { ...devices["Desktop Firefox"] },
        },
      ],

  // Web server started automatically
  webServer: {
    // CI: npm run start (production, needs a prior build); local: npm run dev
    command: process.env.CI ? "npm run start" : "npm run dev",
    url: "http://localhost:3000",
    // Locally, reuse the server already started by the developer
    reuseExistingServer: !process.env.CI,
    // 2 minutes to start (Next.js can be slow)
    timeout: 120_000,
  },
});
