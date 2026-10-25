// __tests__/seo.test.ts
// ---------------------
// Gabarit des titres et borne des meta descriptions (lib/seo.ts) —
// audit 2026-10-23 (SEO-1, SEO-2).

import { clampDescription, pageTitle, TITLE_SUFFIX } from "@/lib/seo";

describe("pageTitle", () => {
  it("applique le gabarit unique « titre — suffixe »", () => {
    expect(pageTitle("Projets")).toBe(`Projets — ${TITLE_SUFFIX}`);
  });
});

describe("clampDescription", () => {
  it("laisse intacte une description de 160 caractères ou moins", () => {
    const text = "a".repeat(160);
    expect(clampDescription(text)).toBe(text);
  });

  it("normalise espaces multiples et retours à la ligne", () => {
    expect(clampDescription("  Un   texte\n\nsur  deux lignes ")).toBe("Un texte sur deux lignes");
  });

  it("coupe à une frontière de mot, sans ponctuation finale, et ajoute « … »", () => {
    const text = `${"mot ".repeat(39)}fin, et une suite qui dépasse largement la limite`;
    const out = clampDescription(text);
    expect([...out].length).toBeLessThanOrEqual(160);
    expect(out.endsWith("…")).toBe(true);
    expect(out).not.toMatch(/[\s,;:.]…$/);
    // Le dernier mot conservé est entier.
    expect(text.startsWith(out.slice(0, -1))).toBe(true);
    expect(text.charAt(out.length - 1)).toMatch(/[\s,]/);
  });

  it("compte en points de code (accents comptés pour 1)", () => {
    const text = "é".repeat(200);
    const out = clampDescription(text);
    expect([...out].length).toBe(160);
  });
});
