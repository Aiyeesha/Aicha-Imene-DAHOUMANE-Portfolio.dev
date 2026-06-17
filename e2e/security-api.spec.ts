// e2e/security-api.spec.ts
// ------------------------
// Tests E2E — sécurité de l'API /api/contact.
//
// Vérifie deux invariants critiques :
//   1. Origin guard : un POST avec un Origin étranger retourne 403 (production uniquement).
//   2. Honeypot   : un POST avec le champ `company` rempli retourne 200 silencieusement.
//
// Le test origin guard est skippé hors CI car l'origin guard n'est actif qu'en
// production (NODE_ENV=production + NEXT_PUBLIC_SITE_URL configuré).

import { test, expect } from "@playwright/test";

test.describe("API security — /api/contact", () => {
  test("POST with foreign Origin → 403 forbidden_origin (production only)", async ({ request }) => {
    // L'origin guard n'est activé qu'avec NODE_ENV=production + ALLOWED_ORIGIN configuré.
    // En CI, le serveur tourne en mode production (npm run start après build).
    // En local (npm run dev), NODE_ENV=development → le guard est inactif.
    test.skip(!process.env.CI, "origin guard only enforced in production builds");

    const response = await request.post("/api/contact", {
      headers: {
        "Content-Type": "application/json",
        Origin: "https://evil.example.com",
      },
      data: {
        name: "Attacker",
        email: "evil@example.com",
        message: "This should be blocked by origin guard",
        acceptedPolicy: true,
      },
    });

    expect(response.status()).toBe(403);
    const body = await response.json();
    expect(body.error).toBe("forbidden_origin");
  });

  test("POST with honeypot field filled → silent 200 ok:true", async ({ request }) => {
    // Le champ `company` est un honeypot invisible dans le formulaire.
    // S'il est rempli, la route retourne { ok: true } sans traitement (leurre pour bots).
    const response = await request.post("/api/contact", {
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      },
      data: {
        name: "Bot",
        email: "bot@example.com",
        message: "Automated spam message filling all fields",
        company: "honeypot-should-be-empty",
        acceptedPolicy: true,
      },
    });

    // Rejet silencieux — pas de 400 ni de message d'erreur révélateur
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.ok).toBe(true);
  });
});
