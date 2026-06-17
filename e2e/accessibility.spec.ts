// e2e/accessibility.spec.ts
// -------------------------
// Audit WCAG 2.2 AA automatisé via @axe-core/playwright.
//
// Pages testées :
//   - Accueil /en
//   - About /en/about
//   - Blog (liste) /en/blog
//   - Blog (article) /en/blog/apex-triggers-best-practices
//   - Certifications /en/certifications
//   - Accueil FR /fr (vérification locale)
//
// Tags couverts : wcag2a, wcag2aa, wcag21aa, wcag22aa
//
// Violations connues et acceptées (si applicable) documentées inline.

import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { Result } from "axe-core";

// ── Helper ────────────────────────────────────────────────────────────────

async function runAxe(page: Page) {
  return new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    // Exclure les iframes tiers potentiels (Formspree, Calendly embeds)
    .exclude("iframe")
    .analyze();
}

function formatViolations(violations: Result[]) {
  return violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    description: v.description,
    nodes: v.nodes.length,
    help: v.helpUrl,
  }));
}

// ── Helper d'attente robuste ──────────────────────────────────────────────
// networkidle est préférable (hydration React complète) mais peut ne jamais
// se résoudre en CI : Vercel Analytics (NODE_ENV=production) fait des requêtes
// continues qui empêchent l'idle. On tente networkidle 8s max, puis on continue.
async function waitForReady(page: Page) {
  await page.waitForLoadState("networkidle", { timeout: 8_000 }).catch(() => {});
  // Laisser les transitions CSS color/background (200-250ms) se terminer avant l'audit
  await page.waitForTimeout(350);
}

// ── Tests ─────────────────────────────────────────────────────────────────

test.describe("WCAG 2.2 AA — Audit automatisé", () => {
  test("Page d'accueil /en — aucune violation critique", async ({ page }) => {
    await page.goto("/en");
    await waitForReady(page);

    const results = await runAxe(page);

    if (results.violations.length > 0) {
      console.log("Violations /en :", JSON.stringify(formatViolations(results.violations), null, 2));
    }

    // Les violations critiques (critical) ne sont pas tolérées
    const critical = results.violations.filter((v) => v.impact === "critical");
    expect(critical, `Violations critiques : ${JSON.stringify(formatViolations(critical))}`).toHaveLength(0);

    // Les violations sérieuses (serious) ne sont pas tolérées non plus
    const serious = results.violations.filter((v) => v.impact === "serious");
    expect(serious, `Violations sérieuses : ${JSON.stringify(formatViolations(serious))}`).toHaveLength(0);
  });

  test("Page About /en/about — aucune violation critique/sérieuse", async ({ page }) => {
    await page.goto("/en/about");
    await waitForReady(page);

    const results = await runAxe(page);

    const critical = results.violations.filter((v) => v.impact === "critical");
    expect(critical, `Violations critiques : ${JSON.stringify(formatViolations(critical))}`).toHaveLength(0);

    const serious = results.violations.filter((v) => v.impact === "serious");
    expect(serious, `Violations sérieuses : ${JSON.stringify(formatViolations(serious))}`).toHaveLength(0);
  });

  test("Blog liste /en/blog — aucune violation critique/sérieuse", async ({ page }) => {
    await page.goto("/en/blog");
    await waitForReady(page);

    const results = await runAxe(page);

    const critical = results.violations.filter((v) => v.impact === "critical");
    expect(critical, `Violations critiques : ${JSON.stringify(formatViolations(critical))}`).toHaveLength(0);

    const serious = results.violations.filter((v) => v.impact === "serious");
    expect(serious, `Violations sérieuses : ${JSON.stringify(formatViolations(serious))}`).toHaveLength(0);
  });

  test("Article blog — aucune violation critique/sérieuse", async ({ page }) => {
    await page.goto("/en/blog/apex-triggers-best-practices");
    await waitForReady(page);

    const results = await runAxe(page);

    const critical = results.violations.filter((v) => v.impact === "critical");
    expect(critical, `Violations critiques : ${JSON.stringify(formatViolations(critical))}`).toHaveLength(0);

    const serious = results.violations.filter((v) => v.impact === "serious");
    expect(serious, `Violations sérieuses : ${JSON.stringify(formatViolations(serious))}`).toHaveLength(0);
  });

  test("Page Certifications /en/certifications — aucune violation critique/sérieuse", async ({
    page,
  }) => {
    await page.goto("/en/certifications");
    await waitForReady(page);

    const results = await runAxe(page);

    const critical = results.violations.filter((v) => v.impact === "critical");
    expect(critical, `Violations critiques : ${JSON.stringify(formatViolations(critical))}`).toHaveLength(0);

    const serious = results.violations.filter((v) => v.impact === "serious");
    expect(serious, `Violations sérieuses : ${JSON.stringify(formatViolations(serious))}`).toHaveLength(0);
  });

  test("Page d'accueil FR /fr — aucune violation critique/sérieuse", async ({ page }) => {
    await page.goto("/fr");
    await waitForReady(page);

    const results = await runAxe(page);

    const critical = results.violations.filter((v) => v.impact === "critical");
    expect(critical, `Violations critiques : ${JSON.stringify(formatViolations(critical))}`).toHaveLength(0);

    const serious = results.violations.filter((v) => v.impact === "serious");
    expect(serious, `Violations sérieuses : ${JSON.stringify(formatViolations(serious))}`).toHaveLength(0);
  });

  // ── Tests de structure (sans axe) ───────────────────────────────────────

  test("Skip link 'Skip to main content' est présent et fonctionnel", async ({
    page,
  }) => {
    await page.goto("/en");

    // Le skip link est dans le DOM (visible au focus, caché visuellement)
    const skipLink = page.locator("a[href='#main']").first();
    await expect(skipLink).toBeAttached();

    // Il devient visible au focus clavier
    await skipLink.focus();
    await expect(skipLink).toBeVisible();
  });

  test("L'élément <main> a un id 'main' (cible du skip link)", async ({ page }) => {
    await page.goto("/en");
    const main = page.locator("main#main");
    await expect(main).toBeAttached();
  });

  test("La balise <html> a un attribut lang correct", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    await page.goto("/fr");
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  });

  test("Tous les champs du formulaire ont un label associé", async ({ page }) => {
    await page.goto("/en");
    await waitForReady(page);
    await page.locator("section#contact").waitFor({ state: "visible" });

    // Vérifier que chaque input (sauf honeypot) a un label avec htmlFor correspondant
    const inputs = ["contact-name", "contact-email", "contact-topic", "contact-message"];

    for (const id of inputs) {
      const label = page.locator(`label[for="${id}"]`);
      await expect(label, `Label manquant pour #${id}`).toBeAttached();
    }
  });

  test("Les images de contenu ont un texte alternatif non vide", async ({ page }) => {
    await page.goto("/en");

    // Vérifier qu'il n'y a pas d'images sans alt ou avec alt vide
    // (les icônes SVG décoratifs ont aria-hidden="true" et sont exemptés)
    const imgWithoutAlt = page.locator("img:not([alt]):not([aria-hidden='true'])");
    await expect(imgWithoutAlt).toHaveCount(0);

    const imgWithEmptyAlt = page.locator("img[alt='']:not([role='presentation']):not([aria-hidden='true'])");
    await expect(imgWithEmptyAlt).toHaveCount(0);
  });
});
