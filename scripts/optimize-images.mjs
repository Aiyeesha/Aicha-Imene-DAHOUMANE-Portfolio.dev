// scripts/optimize-images.mjs
// ---------------------------
// Optimise toutes les images de public/projects/ vers public/projects-optimized/
// - PNG/JPG/JPEG → WebP (qualité 82, max 1920px)
// - WebP existant → recompressé (qualité 82, max 1920px)
// - SVG → copié tel quel
// Usage : node scripts/optimize-images.mjs

import sharp from "sharp";
import { readdir, stat, mkdir, copyFile, writeFile } from "fs/promises";
import { join, relative, extname, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_DIR  = join(__dirname, "../public/projects");
const OUTPUT_DIR = join(__dirname, "../public/projects-optimized");
const MAX_WIDTH  = 1920;
const QUALITY    = 82;

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

async function getSize(p) {
  return (await stat(p)).size;
}

async function main() {
  const allFiles = await walk(INPUT_DIR);
  const toProcess = allFiles.filter(f => /\.(png|jpe?g|webp|svg)$/i.test(f));

  console.log(`\n📁 ${toProcess.length} fichiers trouvés dans ${INPUT_DIR}\n`);

  let totalBefore = 0;
  let totalAfter  = 0;
  let converted   = 0;
  let skipped     = 0;
  const mapping = [];

  for (const src of toProcess) {
    const rel   = relative(INPUT_DIR, src);
    const ext   = extname(src).toLowerCase();
    const sizeBefore = await getSize(src);
    totalBefore += sizeBefore;

    if (ext === ".svg") {
      // SVG : copie directe
      const outPath = join(OUTPUT_DIR, rel);
      await mkdir(dirname(outPath), { recursive: true });
      await copyFile(src, outPath);
      totalAfter += sizeBefore;
      skipped++;
      mapping.push({ original: `/projects/${rel.replace(/\\/g, "/")}`, optimized: `/projects-optimized/${rel.replace(/\\/g, "/")}` });
      continue;
    }

    // PNG / JPG / WebP → WebP
    const relWebp   = rel.replace(/\.(png|jpe?g|webp)$/i, ".webp");
    const outPath   = join(OUTPUT_DIR, relWebp);
    await mkdir(dirname(outPath), { recursive: true });

    try {
      await sharp(src)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outPath);

      const sizeAfter = await getSize(outPath);
      totalAfter += sizeAfter;
      const saved = ((1 - sizeAfter / sizeBefore) * 100).toFixed(1);
      console.log(`✓ ${rel.padEnd(60)} ${(sizeBefore/1024).toFixed(0)}KB → ${(sizeAfter/1024).toFixed(0)}KB  (−${saved}%)`);
      converted++;
      mapping.push({ original: `/projects/${rel.replace(/\\/g, "/")}`, optimized: `/projects-optimized/${relWebp.replace(/\\/g, "/")}` });
    } catch (err) {
      console.error(`✗ ${rel} — ${err.message}`);
      skipped++;
    }
  }

  // Rapport final
  const totalSaved = totalBefore - totalAfter;
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Terminé : ${converted} convertis, ${skipped} copiés
📦 Avant   : ${(totalBefore / 1024 / 1024).toFixed(2)} MB
📦 Après   : ${(totalAfter  / 1024 / 1024).toFixed(2)} MB
💾 Gain    : ${(totalSaved  / 1024 / 1024).toFixed(2)} MB (${((totalSaved/totalBefore)*100).toFixed(1)}%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

  // Fichier de mapping pour la mise à jour Supabase
  await writeFile(
    join(__dirname, "../public/projects-optimized/_mapping.json"),
    JSON.stringify(mapping, null, 2)
  );
  console.log("📄 Mapping généré : public/projects-optimized/_mapping.json\n");
}

main().catch(console.error);
