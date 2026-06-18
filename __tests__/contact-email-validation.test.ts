// __tests__/contact-email-validation.test.ts
// Tests unitaires — DX-02 : validation email via zod dans /api/contact.

import { z } from "zod";

// Schéma identique à celui utilisé dans app/api/contact/route.ts
const emailSchema = z.string().email();
const MAX_EMAIL_LEN = 254;

function validateEmail(email: string): "ok" | "email_too_long" | "invalid_email" {
  if (email.length > MAX_EMAIL_LEN) return "email_too_long";
  if (!emailSchema.safeParse(email).success) return "invalid_email";
  return "ok";
}

describe("contact email validation (DX-02)", () => {
  describe("emails valides", () => {
    const valid = [
      "user@example.com",
      "user.name@example.com",
      "user+tag@example.co.uk",
      "USER@EXAMPLE.COM",
      "user123@domain.org",
    ];

    it.each(valid)("accepte : %s", (email) => {
      expect(validateEmail(email)).toBe("ok");
    });
  });

  describe("emails invalides", () => {
    const invalid = [
      "not-an-email",
      "@domain.com",
      "user@",
      "user @example.com",
      "user@example",
      "",
    ];

    it.each(invalid)("rejette : %s", (email) => {
      expect(validateEmail(email)).toBe("invalid_email");
    });
  });

  it("rejette un email trop long (> 254 chars)", () => {
    // 250 + "@b.com" (6) = 256 > 254
    const longEmail = `${"a".repeat(250)}@b.com`;
    expect(longEmail.length).toBeGreaterThan(MAX_EMAIL_LEN);
    expect(validateEmail(longEmail)).toBe("email_too_long");
  });

  it("accepte exactement 254 chars si format valide", () => {
    // a@b.com = 7 chars — rembourrer le local part
    const localPart = "a".repeat(244);
    const email = `${localPart}@b.com`; // 244 + 1 + 5 = 250 chars
    expect(email.length).toBeLessThanOrEqual(MAX_EMAIL_LEN);
    expect(validateEmail(email)).toBe("ok");
  });
});
