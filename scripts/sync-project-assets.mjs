// scripts/sync-project-assets.mjs
// --------------------------------
// One-shot migration: pull every file from the public Supabase Storage bucket
// `projects` into `public/projects/<slug>/`, then rewrite the Supabase CDN URLs
// in content/projectDetails.ts and content/projects.ts to local `/projects/...`
// paths.
//
// After this runs, the project galleries/covers are served by Vercel's CDN from
// the repo — no Supabase Storage dependency.
//
// Usage: node --env-file=.env.local scripts/sync-project-assets.mjs
// Re-runnable (overwrites existing files). Safe to delete once P0 is merged.

import { createClient } from "@supabase/supabase-js";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC_DIR = join(ROOT, "public", "projects");
const BUCKET = "projects";

// Slugs never surfaced on the portfolio — do not migrate their assets.
const SKIP_SLUGS = new Set(["orgdocs-saas", "sfrelease-saas", "bdr-prospection-tool", "crm-healthcare-salesforce"]);
const SKIP_FILE = (name) => name.endsWith(".tmp") || name.endsWith(".emptyFolderPlaceholder");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Service role bypasses storage RLS for listing (one-shot local dev script).
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (run with --env-file=.env.local)");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

async function listFolder(prefix) {
  const { data, error } = await supabase.storage.from(BUCKET).list(prefix, { limit: 1000, sortBy: { column: "name", order: "asc" } });
  if (error) throw new Error(`list('${prefix}'): ${error.message}`);
  return data ?? [];
}

async function main() {
  console.log(`Syncing Supabase Storage bucket "${BUCKET}" → public/projects/\n`);

  const roots = await listFolder("");
  const slugs = roots.filter((e) => e.id === null).map((e) => e.name); // folders have id === null

  let downloaded = 0;
  let skipped = 0;
  const perSlug = {};

  for (const slug of slugs) {
    if (SKIP_SLUGS.has(slug)) {
      console.log(`  skip  ${slug}/ (excluded slug)`);
      continue;
    }
    const files = (await listFolder(slug)).filter((e) => e.id !== null);
    for (const f of files) {
      if (SKIP_FILE(f.name)) { skipped++; continue; }
      const remotePath = `${slug}/${f.name}`;
      const { data, error } = await supabase.storage.from(BUCKET).download(remotePath);
      if (error) { console.error(`  FAIL  ${remotePath}: ${error.message}`); continue; }
      const buf = Buffer.from(await data.arrayBuffer());
      const dest = join(PUBLIC_DIR, slug, f.name);
      await mkdir(dirname(dest), { recursive: true });
      await writeFile(dest, buf);
      downloaded++;
      perSlug[slug] = (perSlug[slug] ?? 0) + 1;
    }
  }

  console.log(`\n  ${downloaded} files written, ${skipped} skipped, across ${Object.keys(perSlug).length} projects.`);

  // ── Rewrite CDN URLs → local paths in the two content files ────────────────
  const cdnPrefix = `${url.replace(/\/$/, "")}/storage/v1/object/public/projects/`;
  const targets = [
    join(ROOT, "content", "projectDetails.ts"),
    join(ROOT, "content", "projects.ts"),
  ];
  for (const file of targets) {
    const before = await readFile(file, "utf8");
    const after = before.split(cdnPrefix).join("/projects/");
    if (after !== before) {
      await writeFile(file, after);
      const n = before.split(cdnPrefix).length - 1;
      console.log(`  rewrote ${n} URL(s) in ${file.replace(ROOT + "\\", "").replace(ROOT + "/", "")}`);
    }
  }

  console.log("\nDone. Review `git status` and the diff on content/*.ts, then commit public/projects/.");
}

main().catch((e) => { console.error(e); process.exit(1); });
