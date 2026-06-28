// scripts/generate-cv-pdf.mjs
// ---------------------------
// Génère les 4 fichiers PDF des CV à partir de leurs sources HTML.
// Utilise Puppeteer (Chromium headless) pour un rendu fidèle au navigateur.
//
// Usage : node scripts/generate-cv-pdf.mjs
//
// Prérequis : puppeteer installé en devDependencies (npm i -D puppeteer)

import puppeteer from "puppeteer";
import { PDFDocument } from "pdf-lib";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const CV_DIR     = join(__dirname, "../public/cv");

// Liste des CV à générer : source HTML → PDF cible + métadonnées
const CV_FILES = [
  {
    html: "cv-en-itops.html",
    pdf: "cv-en-itops.pdf",
    scale: 1.04,
    title: "Aïcha Imène DAHOUMANE — IT Ops / Systems & Networks — CV",
    author: "Aïcha Imène DAHOUMANE",
  },
  {
    html: "cv-en-salesforce.html",
    pdf: "cv-en-salesforce.pdf",
    scale: 1.04,
    title: "Aïcha Imène DAHOUMANE — Salesforce Developer — CV",
    author: "Aïcha Imène DAHOUMANE",
  },
  {
    html: "cv-fr-itops.html",
    pdf: "cv-fr-itops.pdf",
    scale: 1.04,
    title: "Aïcha Imène DAHOUMANE — IT Ops / Systèmes & Réseaux — CV",
    author: "Aïcha Imène DAHOUMANE",
  },
  {
    html: "cv-fr-salesforce.html",
    pdf: "cv-fr-salesforce.pdf",
    scale: 1.04,
    title: "Aïcha Imène DAHOUMANE — Développeuse Salesforce — CV",
    author: "Aïcha Imène DAHOUMANE",
  },
];

async function generatePdf(browser, htmlFile, pdfFile, scale, title, author) {
  const htmlPath = join(CV_DIR, htmlFile);
  const pdfPath  = join(CV_DIR, pdfFile);

  if (!existsSync(htmlPath)) {
    console.error(`  ✗ Fichier source introuvable : ${htmlFile}`);
    return false;
  }

  const page = await browser.newPage();

  // Charger le fichier HTML local (file:// URI)
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" });

  // Forcer les métadonnées avant impression — Chromium lit document.title pour
  // le champ Title du PDF, et la balise <meta name="author"> pour le champ Author.
  await page.evaluate((t, a) => {
    document.title = t;
    let meta = document.querySelector('meta[name="author"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "author");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", a);
  }, title, author);

  await page.pdf({
    path:              pdfPath,
    format:            "A4",
    printBackground:   true,
    scale,
    margin:            { top: "0", right: "0", bottom: "0", left: "0" },
  });

  await page.close();

  // Patcher les métadonnées PDF via pdf-lib (Author/Subject/Creator non lus par Chromium)
  const pdfBytes = readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  pdfDoc.setTitle(title);
  pdfDoc.setAuthor(author);
  pdfDoc.setSubject(title);
  pdfDoc.setCreator("portfolio-next / Puppeteer + pdf-lib");
  pdfDoc.setProducer("Aïcha Imène DAHOUMANE");
  const patchedBytes = await pdfDoc.save();
  writeFileSync(pdfPath, patchedBytes);

  return true;
}

async function main() {
  console.log("Génération des PDF des CV...\n");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let success = 0;

  for (const { html, pdf, scale, title, author } of CV_FILES) {
    process.stdout.write(`  Génération de ${pdf}...`);
    const ok = await generatePdf(browser, html, pdf, scale, title, author);
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
