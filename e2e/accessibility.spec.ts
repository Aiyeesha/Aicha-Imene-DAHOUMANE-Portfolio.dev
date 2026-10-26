// e2e/accessibility.spec.ts
// -------------------------
// Automated WCAG 2.2 AA checks with @axe-core/playwright on: /en, /en/about,
// /en/blog, a blog post, /en/certifications, /en/contact (redirected to
// /en#contact, recruiter fields expanded), /en/work-with-me, /fr and /es.
// Tags: wcag2a, wcag2aa, wcag21aa, wcag22aa. Known, accepted violations (if
// any) are documented inline.

import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { Result } from "axe-core";

// ── Helper ────────────────────────────────────────────────────────────────

async function runAxe(page: Page) {
  return new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    // Exclude potential third-party iframes (none today; a guard for embedded content)
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

// ── Robust wait ───────────────────────────────────────────────────────────
// networkidle (full hydration) may never resolve in CI if some script keeps
// making requests, so it is tried for 8s at most.
async function waitForReady(page: Page) {
  // Emulate prefers-reduced-motion: reduce, so entrance animations jump to
  // their final state and axe never scans mid-animation (which produced a
  // false color-contrast positive on the "Work with me" CTA, 8.65:1 once
  // stable).
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForLoadState("networkidle", { timeout: 8_000 }).catch(() => {});
  // Let CSS colour/background transitions (200-250ms) finish before the scan
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

    // No critical violations allowed
    const critical = results.violations.filter((v) => v.impact === "critical");
    expect(critical, `Violations critiques : ${JSON.stringify(formatViolations(critical))}`).toHaveLength(0);

    // No serious violations allowed either
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

  test("Contact /en/contact → /en#contact — aucune violation critique/sérieuse", async ({ page }) => {
    // /contact redirects to the home anchor; expand the recruiter block so
    // its fields are scanned too.
    await page.goto("/en/contact");
    await expect(page).toHaveURL(/\/en#contact$/);
    await waitForReady(page);
    await page.locator("#contact details summary").click();

    const results = await runAxe(page);

    if (results.violations.length > 0) {
      console.log("Violations /en/contact :", JSON.stringify(formatViolations(results.violations), null, 2));
    }

    const critical = results.violations.filter((v) => v.impact === "critical");
    expect(critical, `Violations critiques : ${JSON.stringify(formatViolations(critical))}`).toHaveLength(0);

    const serious = results.violations.filter((v) => v.impact === "serious");
    expect(serious, `Violations sérieuses : ${JSON.stringify(formatViolations(serious))}`).toHaveLength(0);
  });

  test("Page Work with me /en/work-with-me — aucune violation critique/sérieuse", async ({ page }) => {
    await page.goto("/en/work-with-me");
    await waitForReady(page);

    const results = await runAxe(page);

    if (results.violations.length > 0) {
      console.log("Violations /en/work-with-me :", JSON.stringify(formatViolations(results.violations), null, 2));
    }

    const critical = results.violations.filter((v) => v.impact === "critical");
    expect(critical, `Violations critiques : ${JSON.stringify(formatViolations(critical))}`).toHaveLength(0);

    const serious = results.violations.filter((v) => v.impact === "serious");
    expect(serious, `Violations sérieuses : ${JSON.stringify(formatViolations(serious))}`).toHaveLength(0);
  });

  test("Page d'accueil ES /es — aucune violation critique/sérieuse", async ({ page }) => {
    await page.goto("/es");
    await waitForReady(page);

    const results = await runAxe(page);

    if (results.violations.length > 0) {
      console.log("Violations /es :", JSON.stringify(formatViolations(results.violations), null, 2));
    }

    const critical = results.violations.filter((v) => v.impact === "critical");
    expect(critical, `Violations critiques : ${JSON.stringify(formatViolations(critical))}`).toHaveLength(0);

    const serious = results.violations.filter((v) => v.impact === "serious");
    expect(serious, `Violations sérieuses : ${JSON.stringify(formatViolations(serious))}`).toHaveLength(0);
  });

  // ── Structure tests (no axe) ────────────────────────────────────────────

  test("Skip link 'Skip to main content' est présent et fonctionnel", async ({
    page,
  }) => {
    await page.goto("/en");

    // The skip link is in the DOM (visually hidden until focused)
    const skipLink = page.locator("a[href='#main']").first();
    await expect(skipLink).toBeAttached();

    // It becomes visible on keyboard focus
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

    // Every input (except the honeypot) has a label with a matching htmlFor
    const inputs = ["contact-name", "contact-email", "contact-topic", "contact-message"];

    for (const id of inputs) {
      const label = page.locator(`label[for="${id}"]`);
      await expect(label, `Label manquant pour #${id}`).toBeAttached();
    }
  });

  test("Les images de contenu ont un texte alternatif non vide", async ({ page }) => {
    await page.goto("/en");

    // No images without alt or with an empty alt (decorative SVG icons have
    // aria-hidden="true" and are exempt)
    const imgWithoutAlt = page.locator("img:not([alt]):not([aria-hidden='true'])");
    await expect(imgWithoutAlt).toHaveCount(0);

    const imgWithEmptyAlt = page.locator("img[alt='']:not([role='presentation']):not([aria-hidden='true'])");
    await expect(imgWithEmptyAlt).toHaveCount(0);
  });
});
