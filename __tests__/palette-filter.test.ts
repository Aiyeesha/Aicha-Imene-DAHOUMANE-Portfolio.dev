// __tests__/palette-filter.test.ts
// ⌘K palette filter: whole words (case and accents ignored), title before
// keywords, no fuzzy subsequence matches.

import { paletteFilter, VALUE_SEPARATOR } from "@/lib/search/paletteFilter";

const v = (title: string) => `${title}${VALUE_SEPARATOR}project:slug`;

describe("lib/search/paletteFilter", () => {
  it("affiche tout quand la recherche est vide", () => {
    expect(paletteFilter("Contact", "   ")).toBe(1);
  });

  it("ne garde pas les correspondances par lettres éparses", () => {
    // p…f…s…e…n…s…e appear in order, but "pfsense" is not in the text
    expect(paletteFilter(v("Supervision d'infrastructure avec Datto RMM"), "pfsense")).toBe(0);
  });

  it("ignore la casse et les accents", () => {
    expect(paletteFilter(v("Sécuriser les accès à Internet"), "securiser acces")).toBeGreaterThan(0);
  });

  it("classe une correspondance dans le titre avant un mot-clé", () => {
    const byTitle = paletteFilter(v("Sécuriser les accès avec pfSense & Squid"), "pfsense");
    const byKeyword = paletteFilter(v("Déploiement de postes"), "pfsense", ["PfSense"]);
    expect(byTitle).toBeGreaterThan(byKeyword);
    expect(byKeyword).toBeGreaterThan(0);
  });

  it("exige que chaque mot corresponde quelque part", () => {
    expect(paletteFilter(v("Développement backend Apex"), "apex lwc")).toBe(0);
    expect(paletteFilter(v("Développement backend Apex"), "apex lwc", ["LWC"])).toBeGreaterThan(0);
  });

  it("n'utilise pas l'identifiant technique pour filtrer", () => {
    expect(paletteFilter(v("Titre"), "slug")).toBe(0);
  });
});
