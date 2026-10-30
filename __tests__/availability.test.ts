// __tests__/availability.test.ts
// The start date lives in lib/availability.ts; messages/*.json cannot import
// it, so this test keeps every translated mention in sync with it.

import { AVAILABILITY, type AvailabilityLocale } from "@/lib/availability";
import fr from "@/messages/fr.json";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

const MESSAGES: Record<AvailabilityLocale, unknown> = { fr, en, es };

// Any month name followed by a year: catches a stale or diverging date.
const DATE_MENTION = /(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre|january|february|march|april|may|june|july|august|september|october|november|december|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)( de)? 20\d\d/i;
const AVAILABILITY_WORDING = /disponib|available|incorporaci|prise de poste|start date/i;

function strings(node: unknown, path = ""): Array<[string, string]> {
  if (typeof node === "string") return [[path, node]];
  if (Array.isArray(node)) return node.flatMap((v, i) => strings(v, `${path}[${i}]`));
  if (node && typeof node === "object") {
    return Object.entries(node).flatMap(([k, v]) => strings(v, path ? `${path}.${k}` : k));
  }
  return [];
}

describe("availability date", () => {
  for (const locale of Object.keys(AVAILABILITY) as AvailabilityLocale[]) {
    it(`messages/${locale}.json uses the date from lib/availability.ts`, () => {
      const expected = AVAILABILITY[locale].from;
      const mentions = strings(MESSAGES[locale]).filter(
        ([, text]) => AVAILABILITY_WORDING.test(text) && DATE_MENTION.test(text)
      );
      expect(mentions.length).toBeGreaterThan(0);
      for (const [path, text] of mentions) {
        expect({ path, ok: text.includes(expected) }).toEqual({ path, ok: true });
      }
    });
  }
});
