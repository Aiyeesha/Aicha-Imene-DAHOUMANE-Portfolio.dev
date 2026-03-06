// e2e/contact-form.spec.ts
// ------------------------
// Tests E2E — Formulaire de contact

import { test, expect } from "@playwright/test";

test.describe("Formulaire de contact", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en");
    // S'assurer que la section contact est chargée avant chaque test
    await page.locator("#contact").waitFor({ state: "visible" });
  });

  test("la section contact est présente sur la page d'accueil", async ({
    page,
  }) => {
    const contactSection = page.locator("#contact");
    await expect(contactSection).toBeVisible();
  });

  test("les champs nom et email ont l'attribut required", async ({ page }) => {
    const nameInput = page.locator("#contact input[name='name']");
    const emailInput = page.locator("#contact input[type='email']");

    await expect(nameInput).toHaveAttribute("required");
    await expect(emailInput).toHaveAttribute("required");
  });

  test("soumettre le formulaire vide ne déclenche pas d'envoi réseau", async ({
    page,
  }) => {
    let formSubmitted = false;
    page.on("request", (req) => {
      if (req.method() === "POST") formSubmitted = true;
    });

    const submitBtn = page
      .locator("#contact")
      .getByRole("button", { name: /send|envoyer/i });

    if (await submitBtn.count()) {
      await submitBtn.click();
    }

    // La validation HTML5 empêche la soumission — aucun POST envoyé
    expect(formSubmitted).toBe(false);
  });

  test("le champ email rejette un format invalide via l'API HTML5", async ({
    page,
  }) => {
    const nameInput = page.locator("#contact input[name='name']");
    const emailInput = page.locator("#contact input[type='email']");

    await nameInput.fill("Test User");
    await emailInput.fill("not-an-email");

    const valid = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validity.valid
    );
    expect(valid).toBe(false);
  });

  test("le pré-remplissage via contact:prefill met à jour le champ sujet", async ({
    page,
  }) => {
    // Attendre que le champ sujet soit rendu et que React ait attaché les useEffect
    const subjectInput = page.locator("#contact-subject");
    await subjectInput.waitFor({ state: "visible" });
    // Délai court pour laisser les useEffect React se monter (hydration → effects)
    await page.waitForTimeout(500);

    // Déclencher l'événement custom (comme le ferait un bouton de service)
    await page.evaluate(() => {
      window.dispatchEvent(
        new CustomEvent("contact:prefill", {
          detail: { topic: "salesforce", subject: "Flow Builder automation" },
        })
      );
    });

    // Le champ sujet doit être pré-rempli avec la valeur passée
    await expect(subjectInput).toHaveValue("Flow Builder automation");
  });
});
