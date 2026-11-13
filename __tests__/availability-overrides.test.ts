// __tests__/availability-overrides.test.ts
// From AVAILABLE_FROM on, lib/i18n/availableNowOverrides.ts rewrites the dated
// "available from December" wordings. These tests keep the rules in step with
// messages/*.json and check the switch date itself.

import {
  AVAILABILITY,
  AVAILABLE_FROM,
  availability,
  isAvailableNow,
  type AvailabilityLocale,
} from "@/lib/availability";
import { AVAILABLE_NOW_OVERRIDES, applyOverrides, availableNowMessages } from "@/lib/i18n/availableNowOverrides";
import fr from "@/messages/fr.json";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

const MESSAGES: Record<AvailabilityLocale, unknown> = { fr, en, es };

// Wordings that only make sense before the start date.
const UPCOMING: Record<AvailabilityLocale, RegExp> = {
  fr: /à partir de décembre 2026|jusqu'au 30 novembre 2026|je quitte/i,
  en: /from December 2026|until November 30, 2026|I leave my/i,
  es: /a partir de diciembre de 2026|hasta el 30 de noviembre de 2026|dejo mi puesto/i,
};

function strings(node: unknown, path = ""): Array<[string, string]> {
  if (typeof node === "string") return [[path, node]];
  if (Array.isArray(node)) return node.flatMap((v, i) => strings(v, `${path}.${i}`));
  if (node && typeof node === "object") {
    return Object.entries(node).flatMap(([k, v]) => strings(v, path ? `${path}.${k}` : k));
  }
  return [];
}

describe("availability switch date", () => {
  it("is December 1, 2026 at midnight in Paris", () => {
    expect(AVAILABLE_FROM.toISOString()).toBe("2026-11-30T23:00:00.000Z");
  });

  it("switches exactly at AVAILABLE_FROM", () => {
    expect(isAvailableNow(new Date("2026-11-30T22:59:59.999Z"))).toBe(false);
    expect(isAvailableNow(new Date("2026-11-30T23:00:00.000Z"))).toBe(true);
  });

  it("returns the upcoming labels before, the immediate ones after", () => {
    expect(availability("fr", new Date("2026-11-13T12:00:00Z")).from).toBe(AVAILABILITY.fr.from);
    expect(availability("fr", new Date("2026-12-02T12:00:00Z")).from).toBe("immédiatement");
    expect(availability("xx", new Date("2026-12-02T12:00:00Z")).from).toBe("immediately");
  });
});

describe("available-now message overrides", () => {
  for (const locale of Object.keys(MESSAGES) as AvailabilityLocale[]) {
    it(`apply cleanly to messages/${locale}.json`, () => {
      expect(() => availableNowMessages(locale, MESSAGES[locale])).not.toThrow();
    });

    it(`leave no upcoming wording in messages/${locale}.json`, () => {
      const rewritten = availableNowMessages(locale, MESSAGES[locale]);
      const stale = strings(rewritten).filter(([, text]) => UPCOMING[locale].test(text));
      expect(stale).toEqual([]);
    });

    it(`do not mutate messages/${locale}.json`, () => {
      const before = JSON.stringify(MESSAGES[locale]);
      availableNowMessages(locale, MESSAGES[locale]);
      expect(JSON.stringify(MESSAGES[locale])).toBe(before);
    });
  }

  it("covers the same keys in every locale", () => {
    const keys = (l: AvailabilityLocale) => AVAILABLE_NOW_OVERRIDES[l].map((r) => r.key).sort();
    expect(keys("en")).toEqual(keys("fr"));
    expect(keys("es")).toEqual(keys("fr"));
  });

  it("throws on a missing path or fragment", () => {
    expect(() => applyOverrides({ a: "x" }, [{ key: "b", value: "y" }])).toThrow(/no message at b/);
    expect(() => applyOverrides({ a: "x" }, [{ key: "a", from: "z", to: "y" }])).toThrow(/not found in a/);
  });
});
