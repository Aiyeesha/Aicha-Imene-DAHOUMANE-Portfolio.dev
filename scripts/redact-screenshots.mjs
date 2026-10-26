// scripts/redact-screenshots.mjs
// --------------------------------
// Finds sensitive areas with OCR (IPs, emails, domain names, org URLs, phone
// numbers, Salesforce ids) in the portfolio screenshots and blurs them with
// sharp.
//
// Usage: node scripts/redact-screenshots.mjs [--dry-run] [--folder <name>]
//   --dry-run : show what would be blurred without changing files
//   --folder  : only process one sub-folder

import { createWorker } from "tesseract.js";
import sharp from "sharp";
import { readdirSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECTS_DIR = join(__dirname, "../public/projects");

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const folderIdx = args.indexOf("--folder");
const ONLY_FOLDER = folderIdx !== -1 ? args[folderIdx + 1] : null;
// --start-from resumes from a given index (after an interruption)
const startFromIdx = args.indexOf("--start-from");
const START_FROM = startFromIdx !== -1 ? parseInt(args[startFromIdx + 1], 10) : 0;

// ── Sensitive patterns ────────────────────────────────────────────────────────
// Deliberately narrow to avoid false positives on source code (Apex class
// names, Java methods…).
const SENSITIVE_PATTERNS = [
  // IPv4 addresses, e.g. 192.168.1.1
  /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/,
  // Email addresses
  /\b[a-zA-Z0-9._%+\-]{2,}@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}\b/,
  // Full URLs with an http(s) scheme
  /https?:\/\/[a-zA-Z0-9.\-/?=#&%_+]+/,
  // Salesforce-specific domains (org URL, lightning…)
  /[a-zA-Z0-9\-]+\.(my\.salesforce|salesforce|lightning\.force|visual\.force)\.com/,
  // French phone numbers: +33XXXXXXXXX or 06/07 XX XX XX
  /(?:\+33|0033)[\s.\-]?[1-9](?:[\s.\-]?\d{2}){4}/,
  /\b0[67]\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}\b/,
  // Digit runs that look like a phone number (8+ consecutive digits)
  /\b\+?33\d{9,10}\b/,
  /\b\d{8,15}\b/,
  // Salesforce ids (start with 00, 15-18 alphanumeric characters)
  /\b00[A-Za-z0-9]{13,16}\b/,
  // Real domain names (known TLD); excludes .cls, .new, .old, which are code
  /\b[a-zA-Z0-9\-]{3,}\.(com|fr|net|org|io|co\.uk|eu|info|biz)\b/,
];

// ── Collect images ────────────────────────────────────────────────────────────
function collectImages(dir) {
  const images = [];
  const EXTS = new Set([".webp", ".png", ".jpg", ".jpeg"]);

  for (const folder of readdirSync(dir)) {
    if (ONLY_FOLDER && folder !== ONLY_FOLDER) continue;
    const folderPath = join(dir, folder);
    if (!statSync(folderPath).isDirectory()) continue;

    for (const file of readdirSync(folderPath)) {
      if (!EXTS.has(extname(file).toLowerCase())) continue;
      images.push(join(folderPath, file));
    }
  }
  return images;
}

// ── Is an OCR word sensitive? ────────────────────────────────────────────────
function isSensitive(text) {
  return SENSITIVE_PATTERNS.some((p) => p.test(text));
}

// ── Blur a region (x, y, w, h) of a sharp image ──────────────────────────────
// Extract the region, blur it heavily, composite it back.
async function blurRegion(image, { left, top, width, height }) {
  if (width < 4 || height < 4) return image; // too small, skip

  const blurred = await sharp(await image.toBuffer())
    .extract({ left, top, width, height })
    .blur(12) // sigma 12: clearly blurred without being too destructive
    .toBuffer();

  return sharp(await image.toBuffer()).composite([
    { input: blurred, left, top },
  ]);
}

// ── Parse HOCR into words with bounding boxes ────────────────────────────────
// HOCR word : <span class='ocrx_word' title='bbox x0 y0 x1 y1; x_wconf N'>text</span>
function parseHocrWords(hocr) {
  const words = [];
  // Regex for each OCR word span
  const re = /class='ocrx_word'[^>]*title='bbox (\d+) (\d+) (\d+) (\d+)[^']*x_wconf (\d+)'[^>]*>([^<]+)</g;
  let m;
  while ((m = re.exec(hocr)) !== null) {
    const [, x0, y0, x1, y1, conf, rawText] = m;
    const text = rawText.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").trim();
    if (!text) continue;
    words.push({
      text,
      confidence: parseInt(conf, 10),
      bbox: { x0: +x0, y0: +y0, x1: +x1, y1: +y1 },
    });
  }
  return words;
}

// ── Process one image ─────────────────────────────────────────────────────────
async function processImage(filePath, worker) {
  // Read into a buffer so tesseract does not keep the file open
  const fileBuffer = readFileSync(filePath);
  const result = await worker.recognize(fileBuffer, {}, { hocr: true });
  const hocr = result.data?.hocr ?? "";

  const allWords = parseHocrWords(hocr);

  // Group adjacent sensitive words into blocks to avoid many tiny areas
  const sensitiveWords = allWords.filter(
    (w) => w.confidence > 30 && isSensitive(w.text)
  );

  if (sensitiveWords.length === 0) return { path: filePath, redacted: 0 };

  // Merge nearby words on the same line (same bbox y ± 5px)
  const regions = mergeNearbyWords(sensitiveWords);

  if (DRY_RUN) {
    console.log(`  [DRY] ${basename(filePath)} — ${regions.length} zone(s) à flouter :`);
    for (const r of regions) {
      console.log(`    → "${r.text}" @ (${r.left},${r.top}) ${r.width}×${r.height}`);
    }
    return { path: filePath, redacted: regions.length };
  }

  // Apply the blurs one after another (from the loaded buffer)
  let img = sharp(fileBuffer);
  const meta = await img.metadata();

  for (const region of regions) {
    // Clamp to the image bounds
    const left   = Math.max(0, region.left - 2);
    const top    = Math.max(0, region.top - 2);
    const width  = Math.min(region.width + 4, meta.width - left);
    const height = Math.min(region.height + 4, meta.height - top);
    if (width > 0 && height > 0) {
      img = await blurRegion(img, { left, top, width, height });
    }
  }

  // Write the file directly (tesseract has no handle on it, as it was read into a buffer)
  const ext = extname(filePath).toLowerCase();
  const buf = ext === ".webp"
    ? await img.webp({ quality: 88 }).toBuffer()
    : await img.toBuffer();

  writeFileSync(filePath, buf);

  return { path: filePath, redacted: regions.length };
}

// ── Merge nearby words on the same line ───────────────────────────────────────
function mergeNearbyWords(words) {
  if (words.length === 0) return [];
  const sorted = [...words].sort((a, b) => a.bbox.y0 - b.bbox.y0 || a.bbox.x0 - b.bbox.x0);
  const merged = [];

  for (const w of sorted) {
    const r = {
      text: w.text,
      left: w.bbox.x0, top: w.bbox.y0,
      width: w.bbox.x1 - w.bbox.x0,
      height: w.bbox.y1 - w.bbox.y0,
    };
    // Look for a nearby group (same line ± 8px, adjacent in x ± 80px)
    const existing = merged.find(
      (m) =>
        Math.abs(m.top - r.top) < 8 &&
        r.left >= m.left - 80 &&
        r.left <= m.left + m.width + 80
    );
    if (existing) {
      const x0 = Math.min(existing.left, r.left);
      const y0 = Math.min(existing.top, r.top);
      const x1 = Math.max(existing.left + existing.width, r.left + r.width);
      const y1 = Math.max(existing.top + existing.height, r.top + r.height);
      existing.left = x0; existing.top = y0;
      existing.width = x1 - x0; existing.height = y1 - y0;
      existing.text += " " + r.text;
    } else {
      merged.push({ ...r });
    }
  }
  return merged;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const images = collectImages(PROJECTS_DIR);
  const toProcess = images.slice(START_FROM);
  console.log(`\n📂 ${images.length} images trouvées — traitement de ${toProcess.length} (départ index ${START_FROM})`);
  if (DRY_RUN) console.log("   Mode DRY RUN — aucune modification\n");

  const worker = await createWorker("eng+fra", 1, {
    logger: () => {}, // silent
  });

  let totalRedacted = 0;
  let processed = 0;
  const errors = [];

  for (let i = 0; i < toProcess.length; i++) {
    const filePath = toProcess[i];
    const globalIdx = START_FROM + i;
    process.stdout.write(`  [${globalIdx + 1}/${images.length}] ${basename(filePath)} ... `);
    try {
      const result = await processImage(filePath, worker);
      if (result.redacted > 0) {
        console.log(`✓ ${result.redacted} zone(s) floutée(s)`);
        totalRedacted += result.redacted;
      } else {
        console.log(`— rien à flouter`);
      }
    } catch (err) {
      console.log(`✗ ERREUR: ${err.message}`);
      errors.push({ file: filePath, error: err.message });
    }
    processed++;
  }

  await worker.terminate();

  console.log(`\n✅ Terminé — ${processed} images traitées, ${totalRedacted} zones floutées`);
  if (errors.length > 0) {
    console.log(`\n⚠️  ${errors.length} erreur(s) :`);
    errors.forEach((e) => console.log(`  - ${basename(e.file)}: ${e.error}`));
  }

  // Show the resume index if needed
  console.log(`\n💡 Pour reprendre à partir du prochain lot : --start-from ${START_FROM + processed}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
