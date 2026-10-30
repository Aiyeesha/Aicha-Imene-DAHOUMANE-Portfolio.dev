// __tests__/tech-stack.test.ts
// Skill levels stay credible: "advanced" (3) needs 2+ years of use, and
// nothing is rated "expert" (see content/tech-stack.ts).

import { getTechStack } from "@/content/tech-stack";

const TECH_STACK = [...new Set([...getTechStack("salesforce"), ...getTechStack("itops")])];

describe("niveaux de compétence", () => {
  it("réserve « Avancé » à 2 ans de pratique ou plus, et n'affiche aucun « Expert »", () => {
    for (const tech of TECH_STACK) {
      expect({ name: tech.name, level: tech.level }).not.toEqual({ name: tech.name, level: 4 });
      if (tech.level >= 3) expect({ name: tech.name, years: tech.years >= 2 }).toEqual({ name: tech.name, years: true });
    }
  });
});
