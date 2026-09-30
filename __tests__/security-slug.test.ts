// __tests__/security-slug.test.ts
// Tests unitaires — lib/security/slug.ts
// Vérifie qu'un slug kebab-case passe et que tout caractère dangereux
// (retour à la ligne, traversée, balise, schéma d'URL) est rejeté.

import { isValidSlug } from "@/lib/security/slug";

describe("isValidSlug", () => {
  it.each(["flow-orchestration", "orgdocs-saas", "a", "post-2026", "42"])(
    "accepts %s",
    (slug) => {
      expect(isValidSlug(slug)).toBe(true);
    }
  );

  it.each([
    "",
    "Upper-Case",
    "trailing-",
    "-leading",
    "double--dash",
    "under_score",
    "../etc/passwd",
    "a/b",
    "line\nbreak",
    "javascript:alert(1)",
    "<script>",
  ])("rejects %j", (slug) => {
    expect(isValidSlug(slug)).toBe(false);
  });

  it("rejects non-string values", () => {
    expect(isValidSlug(undefined)).toBe(false);
    expect(isValidSlug(null)).toBe(false);
    expect(isValidSlug(42)).toBe(false);
  });

  it("rejects slugs longer than 100 characters", () => {
    expect(isValidSlug("a".repeat(100))).toBe(true);
    expect(isValidSlug("a".repeat(101))).toBe(false);
  });
});
