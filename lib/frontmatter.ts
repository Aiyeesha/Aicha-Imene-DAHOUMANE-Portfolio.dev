// lib/frontmatter.ts
// -------------------
// gray-matter wrapper with a js-yaml v4 engine. gray-matter@4.0.3 (the latest
// release) calls yaml.safeLoad / yaml.safeDump internally, which js-yaml v4
// removed (the CVE-2026-59870 fix is not backported to 3.x, see package.json
// overrides). The engine here uses `load`/`dump` (the v4 API, safe by
// default), so gray-matter's default engine is never used.

import matter from "gray-matter";
import { load, dump } from "js-yaml";

const YAML_ENGINE = {
  parse: (input: string) => (load(input) as object) ?? {},
  stringify: (data: object) => dump(data),
};

export function parseFrontmatter(input: string) {
  return matter(input, { engines: { yaml: YAML_ENGINE } });
}
