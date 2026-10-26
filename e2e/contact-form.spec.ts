// e2e/contact-form.spec.ts
// ------------------------
// E2E tests: contact form

import { test, expect } from "@playwright/test";

test.describe("Formulaire de contact", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en");
    // Make sure the contact section is loaded before each test. .first()
    // avoids a strict-mode violation: streaming can briefly create two
    // #contact elements during hydration (fallback + real content).
    await page.locator("#contact").first().waitFor({ state: "visible" });
  });

  test("la section contact est présente sur la page d'accueil", async ({
    page,
  }) => {
    const contactSection = page.locator("#contact");
    await expect(contactSection).toBeVisible();
  });

  test("les champs nom et email ont l'attribut required", async ({ page }) => {
    const contact = page.locator("#contact").first();
    const nameInput = contact.locator("input[name='name']");
    const emailInput = contact.locator("input[type='email']");

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

    // HTML5 validation blocks the submission: no POST sent
    expect(formSubmitted).toBe(false);
  });

  test("le champ email rejette un format invalide via l'API HTML5", async ({
    page,
  }) => {
    const contact = page.locator("#contact").first();
    const nameInput = contact.locator("input[name='name']");
    const emailInput = contact.locator("input[type='email']");

    await nameInput.fill("Test User");
    await emailInput.fill("not-an-email");

    const valid = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validity.valid
    );
    expect(valid).toBe(false);
  });

  test("le pré-remplissage via contact:prefill met à jour le topic", async ({
    page,
  }) => {
    const topicSelect = page.locator("#contact-topic");
    await topicSelect.waitFor({ state: "visible" });
    // Short delay so React effects mount (hydration → effects)
    await page.waitForTimeout(500);

    // Dispatch the custom event (as a service card button would)
    await page.evaluate(() => {
      window.dispatchEvent(
        new CustomEvent("contact:prefill", {
          detail: { topic: "salesforce" },
        })
      );
    });

    // The topic select is prefilled with the given value
    await expect(topicSelect).toHaveValue("salesforce");
  });
});
