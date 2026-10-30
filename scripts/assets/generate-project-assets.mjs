#!/usr/bin/env node
// scripts/assets/generate-project-assets.mjs
// -----------------------------------
// Generates content/project-assets.json: the projects that have a logo
// (public/projects/<slug>/logo.webp) and a cover
// (public/projects/<slug>/cover.webp).
//
// A manifest rather than a runtime existence check: on Vercel, public/ is
// served by the CDN and is not on the server functions' file system, and
// project cards are client components. Without it, every card would request
// a logo and cover that mostly do not exist.
//
// Usage: npm run assets:manifest (re-run after adding or removing a logo or
//        cover). __tests__/projectAssets.test.ts fails when the manifest is
//        out of sync with public/projects.

import { readdirSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const PROJECTS_DIR = join(ROOT, "public", "projects");
const OUTPUT = join(ROOT, "content", "project-assets.json");

// Project folders, sorted for a stable file (readable diffs).
const slugs = readdirSync(PROJECTS_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const has = (slug, file) => existsSync(join(PROJECTS_DIR, slug, file));

const manifest = {
  // Embedded comment: JSON has no comment syntax.
  _generated: "Fichier généré par scripts/assets/generate-project-assets.mjs — ne pas modifier à la main.",
  logos: slugs.filter((slug) => has(slug, "logo.webp")),
  covers: slugs.filter((slug) => has(slug, "cover.webp")),
};

writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2) + "\n");
console.log(
  `project-assets.json : ${manifest.logos.length} logos, ${manifest.covers.length} couvertures (${slugs.length} dossiers)`
);
