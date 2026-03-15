// docs/take-screenshots.js
// -------------------------
// Prend les captures d'écran du portfolio en production via Playwright.
// Usage : node docs/take-screenshots.js

const { chromium } = require("playwright");
const path = require("path");

const BASE   = "https://portfolio-next-one-gold.vercel.app";
const OUT    = path.join(__dirname, "screenshots");
const VPORT  = { width: 1280, height: 800 };

async function shot(page, name, url, { waitFor, action } = {}) {
  console.log(`  → ${name}`);
  await page.goto(`${BASE}${url}`, { waitUntil: "networkidle" });
  if (action) await action(page);
  if (waitFor) await page.waitForSelector(waitFor, { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(800); // animations
  await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: false });
}

(async () => {
  const browser = await chromium.launch();
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

  // 2. Hero IT Ops — cliquer sur le toggle de track
  await shot(page, "hero-itops", "/en", {
    action: async (p) => {
      // Le toggle est un bouton qui change de track
      const toggle = p.locator("button").filter({ hasText: /IT Ops|itops/i }).first();
      if (await toggle.isVisible().catch(() => false)) await toggle.click();
      await p.waitForTimeout(600);
    },
  });

  // 3. Blog listing
  await shot(page, "blog", "/en/blog", {
    waitFor: "article, [class*='blog']",
  });

  // 4. Blog article (premier article disponible)
  await shot(page, "blog-article", "/en/blog/salesforce-cicd-github-actions", {
    waitFor: "h1",
  });

  // 5. About — frise chronologique
  await shot(page, "about", "/en/about", {
    waitFor: "h1",
    action: async (p) => {
      // Scroller jusqu'à la timeline
      await p.evaluate(() => window.scrollTo(0, 600));
      await p.waitForTimeout(600);
    },
  });

  // 6. Status page — health checks + sparklines
  await shot(page, "status", "/en/status", {
    waitFor: "h2",
  });

  await browser.close();
  console.log("Done → docs/screenshots/");
})();
