// playwright.config.ts
// --------------------
// Configuration Playwright pour les tests E2E du portfolio.
//
// Navigateurs : Chromium + Firefox (couverture multi-moteur).
// En local : réutilise un serveur de dev déjà actif (reuseExistingServer).
// En CI   : démarre le serveur de production (npm run start, après build).
//
// Lancer : npm run test:e2e
// UI mode : npm run test:e2e:ui

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",

  // Exécution parallèle — désactivée en CI (évite les conflits de port)
  fullyParallel: !process.env.CI,

  // Échoue si un test est marqué .only en CI (évite les oublis)
  forbidOnly: !!process.env.CI,

  // 1 retry en CI pour absorber les flakiness réseau
  retries: process.env.CI ? 1 : 0,

  // 1 worker en CI, auto en local
  workers: process.env.CI ? 1 : undefined,

  // Reporter adapté à l'environnement
  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: "http://localhost:3000",
    // Capture une trace sur le premier retry (debug en CI)
    trace: "on-first-retry",
    // Screenshot uniquement en cas d'échec
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      // Firefox — moteur Gecko, comportements CSP/crypto parfois différents de Blink
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],

  // Serveur web automatique
  webServer: {
    // En CI : npm run start (production, requiert un build préalable)
    // En local : npm run dev (hot-reload, pas de build nécessaire)
    command: process.env.CI ? "npm run start" : "npm run dev",
    url: "http://localhost:3000",
    // En local : réutilise le serveur déjà lancé par le développeur
    reuseExistingServer: !process.env.CI,
    // 2 min pour le démarrage (build Next.js peut être lent)
    timeout: 120_000,
  },
});
