// lib/data/projectMdx.ts
// ----------------------
// Deep case studies are authored as MDX under:
//   content/projects/<slug>/<locale>.mdx        (locale = en | fr | es)
//
// When a project has an MDX file, the detail page renders it instead of the
// structured `sections[]` from content/projectDetails.ts. Projects without an
// MDX file keep using `sections[]` — both paths coexist.
//
// This module only does filesystem detection (server-only). The actual render
// uses a dynamic `import()` of the compiled .mdx module in the page, exactly
// like the blog (app/[locale]/blog/[slug]/page.tsx).

import fs from "node:fs";
import path from "node:path";

export type ProjectLocale = "en" | "fr" | "es";

const DIR = path.join(process.cwd(), "content", "projects");

/** true if content/projects/<slug>/ contains at least one <locale>.mdx file. */
export function hasProjectMdx(slug: string): boolean {
  const dir = path.join(DIR, slug);
  if (!fs.existsSync(dir)) return false;
  return fs.readdirSync(dir).some((f) => f.endsWith(".mdx"));
}

/**
 * Which MDX locale file to render for a requested locale: the requested one,
 * else English, else the first available. Returns null if none exist.
 */
export function resolveProjectMdxLocale(
  slug: string,
  locale: string
): ProjectLocale | null {
  const dir = path.join(DIR, slug);
  if (!fs.existsSync(dir)) return null;
  const req = (locale === "fr" ? "fr" : locale === "es" ? "es" : "en") as ProjectLocale;
  const order: ProjectLocale[] = [req, "en", "fr", "es"];
  for (const loc of order) {
    if (fs.existsSync(path.join(dir, `${loc}.mdx`))) return loc;
  }
  return null;
}

/** Slugs that have a deep-dive MDX case study (any locale). */
export function projectMdxSlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && hasProjectMdx(d.name))
    .map((d) => d.name);
}
