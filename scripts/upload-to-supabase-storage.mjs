// scripts/upload-to-supabase-storage.mjs
// ----------------------------------------
// Uploads all optimized images from public/projects-optimized/
// to Supabase Storage bucket "projects".
//
// - Preserves directory structure (e.g. avenir-telecom/cover.webp)
// - Skips _mapping.json
// - Upsert mode: safe to re-run
// - Sets correct Content-Type per extension
//
// Usage: node scripts/upload-to-supabase-storage.mjs

import { createClient } from "@supabase/supabase-js";
import { readdir, readFile, stat } from "fs/promises";
import { join, relative, extname, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Config ────────────────────────────────────────────────────────────────────
const SUPABASE_URL          = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET                = "projects";
const INPUT_DIR             = join(__dirname, "../public/projects-optimized");

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("❌  NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing.");
  console.error("    Run: node --env-file=.env.local scripts/upload-to-supabase-storage.mjs");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ── MIME types ────────────────────────────────────────────────────────────────
const MIME = {
  ".webp": "image/webp",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg":  "image/svg+xml",
  ".gif":  "image/gif",
};

// ── Walk directory recursively ────────────────────────────────────────────────
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const allFiles = await walk(INPUT_DIR);
  const toUpload = allFiles.filter(f => !f.endsWith("_mapping.json"));

  console.log(`\n📤 ${toUpload.length} fichiers à uploader vers bucket "${BUCKET}"\n`);

  let success = 0;
  let failed  = 0;
  let totalBytes = 0;

  for (const filePath of toUpload) {
    const storagePath = relative(INPUT_DIR, filePath).replace(/\\/g, "/");
    const ext         = extname(filePath).toLowerCase();
    const contentType = MIME[ext] ?? "application/octet-stream";

    try {
      const fileBuffer = await readFile(filePath);
      const fileSize   = (await stat(filePath)).size;

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, fileBuffer, {
          contentType,
          upsert: true,
        });

      if (error) {
        console.error(`✗ ${storagePath.padEnd(70)} — ${error.message}`);
        failed++;
      } else {
        console.log(`✓ ${storagePath.padEnd(70)} ${(fileSize / 1024).toFixed(0)}KB`);
        success++;
        totalBytes += fileSize;
      }
    } catch (err) {
      console.error(`✗ ${storagePath} — ${err.message}`);
      failed++;
    }
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  Terminé : ${success} uploadés, ${failed} erreurs
📦  Volume  : ${(totalBytes / 1024 / 1024).toFixed(2)} MB transférés
🌐  Bucket  : ${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

  if (failed > 0) process.exit(1);
}

main().catch(console.error);
