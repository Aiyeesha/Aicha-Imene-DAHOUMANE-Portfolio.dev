// __tests__/i18n-parity.test.ts
// Translation file parity: the key sets must stay strictly identical across
// the three files. messages/fr.json, en.json and es.json must:
//   1. expose exactly the same keys (a key missing from one language shows
//      its raw path on screen);
//   2. use the same ICU parameters for each key ({count}, {shortcut}…), as a
//      missing or renamed parameter breaks formatting at runtime;
//   3. contain no empty value.

import fr from "@/messages/fr.json";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

// Flattens { a: { b: "x" }, c: [{ d: "y" }] } into { "a.b": "x", "c.0.d": "y" }.
// Arrays (bullet lists, FAQ…) are indexed by position, so a shorter list in
// one language shows up as missing keys.
function flatten(value: unknown, prefix = ""): Record<string, string> {
  if (typeof value === "string") return { [prefix]: value };
  const out: Record<string, string> = {};
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      Object.assign(out, flatten(child, prefix ? `${prefix}.${key}` : key));
    }
  }
  return out;
}

// ICU parameter names of a string: "{count}", "{count, plural, …}".
function placeholders(value: string): string[] {
  return [...value.matchAll(/\{\s*([A-Za-z_][\w]*)\s*(?:,|\})/g)].map((m) => m[1]).sort();
}

const LOCALES = {
  fr: flatten(fr),
  en: flatten(en),
  es: flatten(es),
};

describe("messages/*.json — parité FR / EN / ES", () => {
  const frKeys = Object.keys(LOCALES.fr).sort();

  it.each(["en", "es"] as const)("%s a exactement les mêmes clés que fr", (locale) => {
    const keys = Object.keys(LOCALES[locale]).sort();
    const missing = frKeys.filter((k) => !(k in LOCALES[locale]));
    const extra = keys.filter((k) => !(k in LOCALES.fr));
    expect({ missing, extra }).toEqual({ missing: [], extra: [] });
  });

  it("chaque clé utilise les mêmes paramètres ICU dans les 3 langues", () => {
    const mismatches = frKeys.filter((key) => {
      const ref = placeholders(LOCALES.fr[key]).join(",");
      return (
        placeholders(LOCALES.en[key] ?? "").join(",") !== ref ||
        placeholders(LOCALES.es[key] ?? "").join(",") !== ref
      );
    });
    expect(mismatches).toEqual([]);
  });

  it("aucune valeur n'est vide", () => {
    const empty = (Object.entries(LOCALES) as [string, Record<string, string>][])
      .flatMap(([locale, map]) =>
        Object.entries(map)
          .filter(([, v]) => v.trim() === "")
          .map(([k]) => `${locale}:${k}`)
      );
    expect(empty).toEqual([]);
  });
});
