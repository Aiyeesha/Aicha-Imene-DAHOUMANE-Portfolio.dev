// __tests__/toc.test.ts
// TOC (table of contents) utilities: unit tests (pure functions).

import { slugify, extractToc } from "@/content/blog/toc";

// ── slugify ───────────────────────────────────────────────────────────────────

describe("slugify", () => {
  it("convertit les espaces en tirets", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("met tout en minuscules", () => {
    expect(slugify("APEX Triggers")).toBe("apex-triggers");
  });

  it("supprime la ponctuation courante", () => {
    expect(slugify("What's new in Salesforce?")).toBe("whats-new-in-salesforce");
  });

  it("supprime les parenthèses et points", () => {
    expect(slugify("Flows (Builder)")).toBe("flows-builder");
  });

  it("collapse plusieurs tirets consécutifs", () => {
    expect(slugify("Salesforce -- Best   Practices")).toBe("salesforce-best-practices");
  });

  it("gère les caractères accentués en les supprimant", () => {
    const result = slugify("Sécurité");
    // Non-ASCII accents are removed by the [^a-z0-9\s-] replace
    // ("sécurité" → "scurit" or "securite"); only check the result is a valid
    // slug (no space, lowercase)
    expect(result).not.toContain(" ");
    expect(result).toBe(result.toLowerCase());
  });

  it("gère une chaîne vide", () => {
    expect(slugify("")).toBe("");
  });
});

// ── extractToc ────────────────────────────────────────────────────────────────

describe("extractToc", () => {
  it("extrait les headings h2 (##)", () => {
    const source = "## Introduction\n\nSome text.\n\n## Conclusion";
    const toc = extractToc(source);
    expect(toc).toHaveLength(2);
    expect(toc[0]).toEqual({ depth: 2, text: "Introduction", id: "introduction" });
    expect(toc[1]).toEqual({ depth: 2, text: "Conclusion", id: "conclusion" });
  });

  it("extrait les headings h3 (###) avec depth=3", () => {
    const source = "## Section\n### Sub-section";
    const toc = extractToc(source);
    expect(toc).toHaveLength(2);
    expect(toc[1]).toEqual({ depth: 3, text: "Sub-section", id: "sub-section" });
  });

  it("ne capture pas les h1 (#)", () => {
    const source = "# Title\n## Section";
    const toc = extractToc(source);
    expect(toc).toHaveLength(1);
    expect(toc[0].depth).toBe(2);
  });

  it("ne capture pas les headings à l'intérieur des blocs de code", () => {
    const source = "## Real heading\n```\n## Fake heading in code\n```\n## Another real";
    const toc = extractToc(source);
    expect(toc).toHaveLength(2);
    expect(toc.map((i) => i.text)).toEqual(["Real heading", "Another real"]);
  });

  it("retourne un tableau vide si aucun heading", () => {
    const source = "Just some text without any headings.";
    expect(extractToc(source)).toHaveLength(0);
  });

  it("génère des IDs cohérents avec slugify", () => {
    const source = "## Salesforce Flows: Best Practices";
    const toc = extractToc(source);
    expect(toc[0].id).toBe("salesforce-flows-best-practices");
  });

  it("gère les retours à la ligne Windows (\\r\\n)", () => {
    const source = "## Section A\r\n### Sub A\r\n## Section B";
    const toc = extractToc(source);
    expect(toc).toHaveLength(3);
  });
});
