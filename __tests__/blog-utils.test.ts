// __tests__/blog-utils.test.ts
// Fonctions utilitaires du blog — tests unitaires (fonctions pures, aucun mock).

import { formatDate, detectTrack, getTopTags } from "@/lib/blog-utils";

// ── formatDate ────────────────────────────────────────────────────────────────

describe("formatDate", () => {
  it("formate une date en anglais", () => {
    const result = formatDate("2024-03-15", "en");
    // Intl.DateTimeFormat peut varier selon le runtime — on vérifie les éléments essentiels
    expect(result).toMatch(/March/i);
    expect(result).toMatch(/2024/);
    expect(result).toMatch(/15/);
  });

  it("formate une date en français", () => {
    const result = formatDate("2024-03-15", "fr");
    expect(result).toMatch(/mars/i);
    expect(result).toMatch(/2024/);
    expect(result).toMatch(/15/);
  });

  it("gère correctement le premier jour du mois", () => {
    const result = formatDate("2024-01-01", "en");
    expect(result).toMatch(/January/i);
    expect(result).toMatch(/1/);
    expect(result).toMatch(/2024/);
  });
});

// ── detectTrack ──────────────────────────────────────────────────────────────

describe("detectTrack", () => {
  it("retourne 'salesforce' si le tag salesforce est présent", () => {
    expect(detectTrack(["Salesforce", "Apex", "Flows"])).toBe("salesforce");
  });

  it("est insensible à la casse pour salesforce", () => {
    expect(detectTrack(["SALESFORCE"])).toBe("salesforce");
  });

  it("retourne 'itops' si le tag itops est présent", () => {
    expect(detectTrack(["itops", "Linux", "Networking"])).toBe("itops");
  });

  it("retourne 'itops' si le tag 'it ops' (avec espace) est présent", () => {
    expect(detectTrack(["it ops", "DevOps"])).toBe("itops");
  });

  it("retourne null si aucun track n'est identifiable", () => {
    expect(detectTrack(["React", "Next.js", "TypeScript"])).toBeNull();
  });

  it("retourne null pour un tableau vide", () => {
    expect(detectTrack([])).toBeNull();
  });
});

// ── getTopTags ───────────────────────────────────────────────────────────────

describe("getTopTags", () => {
  const posts = [
    ["Salesforce", "Apex", "LWC"],
    ["Salesforce", "Flows"],
    ["Salesforce", "Apex"],
    ["Linux", "DevOps"],
  ];

  it("retourne les tags les plus fréquents en premier", () => {
    const top = getTopTags(posts, 3);
    expect(top[0]).toBe("Salesforce"); // 3 occurrences
    expect(top[1]).toBe("Apex");       // 2 occurrences
    expect(top.length).toBe(3);
  });

  it("respecte la limite passée en paramètre", () => {
    const top = getTopTags(posts, 1);
    expect(top.length).toBe(1);
    expect(top[0]).toBe("Salesforce");
  });

  it("retourne un tableau vide pour des posts sans tags", () => {
    expect(getTopTags([[], []], 5)).toEqual([]);
  });

  it("retourne un tableau vide si aucun post n'est passé", () => {
    expect(getTopTags([], 5)).toEqual([]);
  });

  it("ne dépasse pas le nombre de tags disponibles", () => {
    const top = getTopTags(posts, 100);
    // 6 tags uniques au total
    expect(top.length).toBeLessThanOrEqual(6);
  });
});
