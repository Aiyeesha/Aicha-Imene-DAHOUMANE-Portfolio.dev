// docs/take-screenshots.js
// -------------------------
// Prend les captures d'écran du portfolio via Playwright.
// Usage :
//   node docs/take-screenshots.js                       # production
//   SCREENSHOT_BASE_URL=http://localhost:3000 node docs/take-screenshots.js
// Variables optionnelles :
//   SCREENSHOT_ONLY=hero-salesforce,blog   → ne régénère que ces captures
//   CHROMIUM_PATH=/chemin/vers/chromium     → navigateur déjà installé

const { chromium } = require("playwright");
const path = require("path");

const BASE   = process.env.SCREENSHOT_BASE_URL || "https://aicha-imene-dahoumane-portfolio.vercel.app";
const ONLY   = (process.env.SCREENSHOT_ONLY || "").split(",").map((s) => s.trim()).filter(Boolean);
const OUT    = path.join(__dirname, "screenshots");
const VPORT  = { width: 1280, height: 800 };

async function shot(page, name, url, { waitFor, action } = {}) {
  if (ONLY.length && !ONLY.includes(name)) return;
  console.log(`  → ${name}`);
  await page.goto(`${BASE}${url}`, { waitUntil: "networkidle" });
  if (action) await action(page);
  if (waitFor) await page.waitForSelector(waitFor, { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(1800); // animations (révélations, indicateur de navigation)
  await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: false });
}

(async () => {
  const browser = await chromium.launch(
    process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
  );
  const context = await browser.newContext({
    viewport: VPORT,
    colorScheme: "dark",
    locale: "en-US",
  });
  const page = await context.newPage();

  console.log("Taking screenshots…");

  // 1. Hero Salesforce (dark, default track)
  await shot(page, "hero-salesforce", "/en", {
    waitFor: "[data-testid='hero'], h1, .hero",
  });

  // 3. Blog listing
  await shot(page, "blog", "/en/blog", {
    waitFor: "article, [class*='blog']",
  });

  // 4. Blog article (premier article disponible)
  await shot(page, "blog-article", "/en/blog/salesforce-sandbox-management", {
    waitFor: "h1",
  });

  // 5. About — frise chronologique
  await shot(page, "about", "/en/about", {
    waitFor: "h1",
    action: async (p) => {
      // Amener la frise de carrière en haut de l'écran (sous la barre de navigation)
      await p.evaluate(() => {
        const el = document.querySelector('ol[aria-label="Career timeline"]');
        if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 220);
      });
      await p.waitForTimeout(1200);
    },
  });

  // 6. Profil hybride — page la plus différenciante
  await shot(page, "hybride", "/en/hybride", {
    waitFor: "h1",
  });

  // Hero IT Ops — en dernier : le choix de profil est mémorisé (cookie) et
  // s'appliquerait sinon aux pages suivantes.
  await shot(page, "hero-itops", "/en", {
    action: async (p) => {
      const toggle = p.locator("button").filter({ hasText: /IT Ops|itops/i }).first();
      if (await toggle.isVisible().catch(() => false)) await toggle.click();
      await p.waitForTimeout(3500); // fin de l'animation de frappe du sous-titre
    },
  });

  // 7. Status page — health checks + sparklines (données réelles : à prendre en production)
  await shot(page, "status", "/en/status", {
    waitFor: "h2",
  });

  await browser.close();
  console.log("Done → docs/screenshots/");
})();
