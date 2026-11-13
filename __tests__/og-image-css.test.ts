/**
 * @jest-environment node
 */
// __tests__/og-image-css.test.ts
// Share images (opengraph-image / twitter-image) are drawn by next/og
// (Satori), which supports only a subset of CSS. An unsupported value does
// not fail the build: the route throws at request time and answers 500, as
// /work-with-me/opengraph-image did in production with display: "inline-flex".
// This static check catches it on every pull request, without rendering.

import fs from "node:fs";
import path from "node:path";

// Values Satori accepts (error message of next/og, Satori docs).
const ALLOWED: Record<string, Set<string>> = {
  display: new Set(["flex", "block", "contents", "none", "-webkit-box"]),
  position: new Set(["relative", "absolute", "static"]),
};

const ROOT = process.cwd();

/** Every file that renders an ImageResponse: route files and lib/og helpers. */
function ogFiles(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, e.name);
      if (e.isDirectory()) walk(abs);
      else if (/^(opengraph|twitter)-image\.tsx$/.test(e.name)) out.push(abs);
    }
  };
  walk(path.join(ROOT, "app"));
  const lib = path.join(ROOT, "lib", "og");
  for (const f of fs.readdirSync(lib)) if (f.endsWith(".tsx")) out.push(path.join(lib, f));
  return out;
}

describe("images de partage (next/og)", () => {
  const files = ogFiles();

  it("trouve les fichiers d'images de partage", () => {
    // Guard against a refactor that would make the scan silently empty.
    expect(files.length).toBeGreaterThanOrEqual(10);
  });

  it.each(files.map((f) => [path.relative(ROOT, f), f]))(
    "%s n'utilise que des valeurs CSS supportées par Satori",
    (_rel, file) => {
      const src = fs.readFileSync(file, "utf8");
      const bad: string[] = [];
      for (const [prop, allowed] of Object.entries(ALLOWED)) {
        // Literal values only: style={{ display: "inline-flex" }}.
        const re = new RegExp(`\\b${prop}\\s*:\\s*["'\`]([^"'\`]+)["'\`]`, "g");
        for (const m of src.matchAll(re)) {
          if (!allowed.has(m[1])) {
            const line = src.slice(0, m.index).split("\n").length;
            bad.push(`ligne ${line} : ${prop}: "${m[1]}"`);
          }
        }
      }
      expect(bad).toEqual([]);
    },
  );
});
