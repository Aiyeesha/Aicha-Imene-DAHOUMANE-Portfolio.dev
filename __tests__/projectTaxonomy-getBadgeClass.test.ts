// __tests__/projectTaxonomy-getBadgeClass.test.ts
// getBadgeClass: single tone → CSS class mapping (i18n/projectTaxonomy.ts).
// Guards against an unknown tone being handled inconsistently, e.g. silently
// falling back to "badge-training" and showing a client project as a
// training exercise.

import { getBadgeClass } from "@/i18n/projectTaxonomy";

describe("getBadgeClass", () => {
  it.each([
    ["client", "badge badge-client"],
    ["personal", "badge badge-personal"],
    ["training", "badge badge-training"],
    ["capstone", "badge badge-capstone"],
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
    // A missing or misspelled badge.tone must not silently become
    // "badge badge-training" (a client project shown as a training exercise).
    expect(getBadgeClass("client-typo")).not.toContain("training");
  });
});
