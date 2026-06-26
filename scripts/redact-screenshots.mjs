// scripts/redact-screenshots.mjs
// --------------------------------
// Détecte par OCR les zones sensibles (IP, emails, noms de domaine, URLs d'org,
// numéros de téléphone, identifiants Salesforce) dans les screenshots du portfolio
// et les floute avec sharp.
//
// Usage : node scripts/redact-screenshots.mjs [--dry-run] [--folder <nom>]
//   --dry-run   : affiche ce qui serait flouté sans modifier les fichiers
//   --folder    : traite uniquement un sous-dossier spécifique

import { createWorker } from "tesseract.js";
import sharp from "sharp";
import { readdirSync, statSync, existsSync, unlinkSync, readFileSync, writeFileSync } from "fs";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECTS_DIR = join(__dirname, "../public/projects");

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const folderIdx = args.indexOf("--folder");
const ONLY_FOLDER = folderIdx !== -1 ? args[folderIdx + 1] : null;
// --start-from permet de reprendre à partir d'un index donné (reprise après interruption)
const startFromIdx = args.indexOf("--start-from");
const START_FROM = startFromIdx !== -1 ? parseInt(args[startFromIdx + 1], 10) : 0;

// ── Patterns sensibles ────────────────────────────────────────────────────────
// Volontairement ciblés pour éviter les faux positifs sur le code source
// (noms de classes Apex, méthodes Java, etc.)
const SENSITIVE_PATTERNS = [
  // Adresses IP (IPv4) — ex: 192.168.1.1
  /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/,
  // Adresses email
  /\b[a-zA-Z0-9._%+\-]{2,}@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}\b/,
  // URLs complètes avec schéma http(s)
  /https?:\/\/[a-zA-Z0-9.\-/?=#&%_+]+/,
  // Domaines Salesforce spécifiques (org URL, lightning, etc.)
  /[a-zA-Z0-9\-]+\.(my\.salesforce|salesforce|lightning\.force|visual\.force)\.com/,
  // Numéros de téléphone FR format international : +33XXXXXXXXX ou 06/07 XX XX XX
  /(?:\+33|0033)[\s.\-]?[1-9](?:[\s.\-]?\d{2}){4}/,
  /\b0[67]\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}\b/,
  // Suites de chiffres ressemblant à un numéro de téléphone (8+ chiffres consécutifs)
  /\b\+?33\d{9,10}\b/,
  /\b\d{8,15}\b/,
  // IDs Salesforce (commencent par 00, 15-18 chars alphanumériques)
  /\b00[A-Za-z0-9]{13,16}\b/,
  // Noms de domaine réels (avec TLD connu) — exclut les .cls, .new, .old qui sont du code
  /\b[a-zA-Z0-9\-]{3,}\.(com|fr|net|org|io|co\.uk|eu|info|biz)\b/,
];

// ── Collecte des images ───────────────────────────────────────────────────────
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

// ── Vérifie si un mot OCR est sensible ───────────────────────────────────────
function isSensitive(text) {
  return SENSITIVE_PATTERNS.some((p) => p.test(text));
}

// ── Floutage d'une région (x, y, w, h) dans une image sharp ──────────────────
// Stratégie : extraire la région, la flouter fortement, la réinsérer.
async function blurRegion(image, { left, top, width, height }) {
  if (width < 4 || height < 4) return image; // trop petit, ignorer

  const blurred = await sharp(await image.toBuffer())
    .extract({ left, top, width, height })
    .blur(12) // sigma 12 — flou visible mais pas trop destructeur
    .toBuffer();

  return sharp(await image.toBuffer()).composite([
    { input: blurred, left, top },
  ]);
}

// ── Parse le HOCR pour extraire les mots avec bbox ───────────────────────────
// HOCR word : <span class='ocrx_word' title='bbox x0 y0 x1 y1; x_wconf N'>text</span>
function parseHocrWords(hocr) {
  const words = [];
  // Regex pour chaque span de mot OCR
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

// ── Traitement d'une image ────────────────────────────────────────────────────
async function processImage(filePath, worker) {
  // Lire en buffer pour ne pas laisser tesseract garder le fichier ouvert
  const fileBuffer = readFileSync(filePath);
  const result = await worker.recognize(fileBuffer, {}, { hocr: true });
  const hocr = result.data?.hocr ?? "";

  const allWords = parseHocrWords(hocr);

  // Regrouper les mots sensibles en "blocs" adjacents pour éviter trop de micro-zones
  const sensitiveWords = allWords.filter(
    (w) => w.confidence > 30 && isSensitive(w.text)
  );

  if (sensitiveWords.length === 0) return { path: filePath, redacted: 0 };

  // Fusionner les mots proches sur la même ligne (même bbox y ± 5px)
  const regions = mergeNearbyWords(sensitiveWords);

  if (DRY_RUN) {
    console.log(`  [DRY] ${basename(filePath)} — ${regions.length} zone(s) à flouter :`);
    for (const r of regions) {
      console.log(`    → "${r.text}" @ (${r.left},${r.top}) ${r.width}×${r.height}`);
    }
    return { path: filePath, redacted: regions.length };
  }

  // Appliquer le floutage séquentiellement (depuis le buffer déjà chargé)
  let img = sharp(fileBuffer);
  const meta = await img.metadata();

  for (const region of regions) {
    // Sécuriser les bornes pour ne pas dépasser l'image
    const left   = Math.max(0, region.left - 2);
    const top    = Math.max(0, region.top - 2);
    const width  = Math.min(region.width + 4, meta.width - left);
    const height = Math.min(region.height + 4, meta.height - top);
    if (width > 0 && height > 0) {
      img = await blurRegion(img, { left, top, width, height });
    }
  }

  // Écrire directement dans le fichier (tesseract n'a plus de handle dessus car on a lu en buffer)
  const ext = extname(filePath).toLowerCase();
  const buf = ext === ".webp"
    ? await img.webp({ quality: 88 }).toBuffer()
    : await img.toBuffer();

  writeFileSync(filePath, buf);

  return { path: filePath, redacted: regions.length };
}

// ── Fusionne les mots proches sur la même ligne ───────────────────────────────
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
    // Cherche un groupe existant proche (même ligne ± 8px, adjacent en x ± 80px)
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
    logger: () => {}, // silencieux
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

  // Indique l'index de reprise en cas de besoin
  console.log(`\n💡 Pour reprendre à partir du prochain lot : --start-from ${START_FROM + processed}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
