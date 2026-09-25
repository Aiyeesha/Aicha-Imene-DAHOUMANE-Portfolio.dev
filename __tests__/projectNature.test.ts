// __tests__/projectNature.test.ts
// Bandeau « nature du projet » (audit de contenu 2026-09-25, lot 3) :
// chaque projet déclare sa nature, le « fil rouge » est réservé à
// Légarant-AXG et aucune période n'est inventée.

import { projects } from "@/content/projects";
import { resolveNature } from "@/lib/projectNature";

describe("nature des projets", () => {
  it("chaque projet déclare une nature résolue dans les 3 langues", () => {
    for (const p of projects) {
      for (const locale of ["fr", "en", "es"]) {
        const n = resolveNature(p.nature, locale, p.period);
        expect(n).not.toBeNull();
        expect(n?.label.length).toBeGreaterThan(0);
        expect(n?.note.length).toBeGreaterThan(0);
      }
    }
  });

  it("réserve le projet fil rouge à Légarant-AXG", () => {
    const capstones = projects.filter((p) => p.nature === "rncp_capstone").map((p) => p.slug);
    expect(capstones).toEqual(["legarant-axg-salesforce-deployment"]);
    const capstoneBadges = projects.filter((p) => p.badge?.label === "CAPSTONE RNCP 6").map((p) => p.slug);
    expect(capstoneBadges).toEqual(["legarant-axg-salesforce-deployment"]);
  });

  it("date le stage Midrange et n'invente pas de période pour un projet personnel", () => {
    expect(resolveNature("internship", "fr")?.period).toBe("févr. – mai 2023");
    expect(resolveNature("personal", "fr")?.period).toBeNull();
    expect(resolveNature("reconstructed", "en")?.period).toBeNull();
  });

  it("une période propre au projet prime sur celle de sa nature", () => {
    const period = { fr: "mars 2026", en: "Mar 2026", es: "mar. 2026" };
    expect(resolveNature("personal", "es", period)?.period).toBe("mar. 2026");
  });
});
