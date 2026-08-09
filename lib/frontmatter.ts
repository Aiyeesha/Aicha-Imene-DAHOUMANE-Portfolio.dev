// lib/frontmatter.ts
// -------------------
// Wrapper autour de gray-matter forçant un engine YAML js-yaml v4.
//
// gray-matter@4.0.3 (dernière version publiée) appelle en interne
// `yaml.safeLoad` / `yaml.safeDump` — retirés dans js-yaml v4 (CVE-2026-59870
// non backportée sur la branche 3.x, cf. package.json > overrides > gray-matter).
// On fournit donc un engine YAML basé sur `load`/`dump` (l'API v4, safe par
// défaut) pour ne jamais passer par le moteur par défaut de gray-matter.

import matter from "gray-matter";
import { load, dump } from "js-yaml";

const YAML_ENGINE = {
  parse: (input: string) => (load(input) as object) ?? {},
  stringify: (data: object) => dump(data),
};

export function parseFrontmatter(input: string) {
  return matter(input, { engines: { yaml: YAML_ENGINE } });
}
