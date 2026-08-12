// __tests__/projectTaxonomy-getBadgeClass.test.ts
// getBadgeClass — source unique tone → classe CSS (voir i18n/projectTaxonomy.ts).
// Régression directe du bug corrigé le 2026-08-12 : 3 implémentations
// divergentes (ProjectsSection.tsx, FeaturedProjects.tsx, projects/[slug]/page.tsx)
// géraient une tone inconnue de 3 façons différentes — dont un repli silencieux
// de FeaturedProjects.tsx sur "badge-training", qui affichait un projet client
// comme un exercice de formation.

import { getBadgeClass } from "@/i18n/projectTaxonomy";

describe("getBadgeClass", () => {
  it.each([
    ["client", "badge badge-client"],
    ["personal", "badge badge-personal"],
    ["training", "badge badge-training"],
    ["simulation", "badge badge-simulation"],
    ["anonymized", "badge badge-anonymized"],
  ])("mappe la tone %s vers %s", (tone, expected) => {
    expect(getBadgeClass(tone)).toBe(expected);
  });

  it("retombe sur la classe neutre .badge pour une tone inconnue (jamais badge-training)", () => {
    expect(getBadgeClass("some-future-tone")).toBe("badge");
  });

  it("retombe sur .badge pour undefined/null (aucun badge défini)", () => {
    expect(getBadgeClass(undefined)).toBe("badge");
    expect(getBadgeClass(null)).toBe("badge");
  });

  it("ne mal-étiquette jamais une tone inconnue comme 'training'", () => {
    // C'était exactement le bug de FeaturedProjects.tsx : un badge.tone
    // manquant/typo tombait silencieusement sur "badge badge-training",
    // faisant passer un projet client pour un exercice de formation.
    expect(getBadgeClass("client-typo")).not.toContain("training");
  });
});
