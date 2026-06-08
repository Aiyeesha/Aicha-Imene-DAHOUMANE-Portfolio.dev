// scripts/generate-cv-pdf.mjs
// ---------------------------
// Génère les 4 fichiers PDF des CV à partir de leurs sources HTML.
// Utilise Puppeteer (Chromium headless) pour un rendu fidèle au navigateur.
//
// Usage : node scripts/generate-cv-pdf.mjs
//
// Prérequis : puppeteer installé en devDependencies (npm i -D puppeteer)

import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const CV_DIR     = join(__dirname, "../public/cv");

// Liste des CV à générer : source HTML → PDF cible
const CV_FILES = [
  { html: "cv-en-itops.html",      pdf: "cv-en-itops.pdf",      scale: 1.07 },
  { html: "cv-en-salesforce.html", pdf: "cv-en-salesforce.pdf", scale: 1.06 },
  { html: "cv-fr-itops.html",      pdf: "cv-fr-itops.pdf",      scale: 1.08 },
  { html: "cv-fr-salesforce.html", pdf: "cv-fr-salesforce.pdf", scale: 1.06 },
];

async function generatePdf(browser, htmlFile, pdfFile, scale) {
  const htmlPath = join(CV_DIR, htmlFile);
  const pdfPath  = join(CV_DIR, pdfFile);

  if (!existsSync(htmlPath)) {
    console.error(`  ✗ Fichier source introuvable : ${htmlFile}`);
    return false;
  }

  const page = await browser.newPage();

  // Charger le fichier HTML local (file:// URI)
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" });

  await page.pdf({
    path:              pdfPath,
    format:            "A4",
    printBackground:   true,
    scale,
    margin:            { top: "0", right: "0", bottom: "0", left: "0" },
  });

  await page.close();
  return true;
}

async function main() {
  console.log("Génération des PDF des CV...\n");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let success = 0;

  for (const { html, pdf, scale } of CV_FILES) {
    process.stdout.write(`  Génération de ${pdf}...`);
    const ok = await generatePdf(browser, html, pdf, scale);
    if (ok) {
      console.log(" ✓");
      success++;
    }
  }

  await browser.close();

  console.log(`\n${success}/${CV_FILES.length} PDF générés avec succès.`);
  console.log(`Dossier : public/cv/\n`);
}

main().catch((err) => {
  console.error("Erreur :", err.message);
  process.exit(1);
});
