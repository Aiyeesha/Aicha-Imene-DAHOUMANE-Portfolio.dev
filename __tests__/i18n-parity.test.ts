// __tests__/i18n-parity.test.ts
// Parité des fichiers de traduction — audit 2026-10-23 (P8, critère
// d'acceptation : « la parité des clés reste stricte entre les 3 fichiers »).
//
// Garantit que messages/fr.json, en.json et es.json :
//   1. exposent exactement les mêmes clés (une clé absente d'une langue fait
//      afficher le chemin brut de la clé à l'écran) ;
//   2. utilisent les mêmes paramètres ICU pour chaque clé ({count}, {shortcut}…)
//      — un paramètre manquant ou renommé casse le formatage à l'exécution ;
//   3. ne contiennent aucune valeur vide.

import fr from "@/messages/fr.json";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

// Aplatit { a: { b: "x" }, c: [{ d: "y" }] } en { "a.b": "x", "c.0.d": "y" }.
// Les tableaux (listes de puces, FAQ…) sont indexés par position : une liste
// plus courte dans une langue apparaît donc comme des clés manquantes.
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

// Noms des paramètres ICU d'une chaîne : « {count} », « {count, plural, …} ».
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
