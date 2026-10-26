// scripts/generate-cv-pdf.mjs
// ---------------------------
// Generates the CV PDF files from their HTML sources with Puppeteer
// (headless Chromium) for browser-accurate rendering.
//
// Usage: node scripts/generate-cv-pdf.mjs (puppeteer is a devDependency)

import puppeteer from "puppeteer";
import { PDFDocument } from "pdf-lib";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const CV_DIR     = join(__dirname, "../public/cv");

// CVs to generate: HTML source → target PDF + metadata
const CV_FILES = [
  {
    html: "Aicha-Imene-DAHOUMANE-CV-en-itops.html",
    pdf: "Aicha-Imene-DAHOUMANE-CV-en-itops.pdf",
    scale: 0.96,
    title: "Aïcha Imène DAHOUMANE — IT Ops / Systems & Networks — CV",
    author: "Aïcha Imène DAHOUMANE",
  },
  {
    html: "Aicha-Imene-DAHOUMANE-CV-en-salesforce.html",
    pdf: "Aicha-Imene-DAHOUMANE-CV-en-salesforce.pdf",
    scale: 0.96,
    title: "Aïcha Imène DAHOUMANE — Salesforce Developer — CV",
    author: "Aïcha Imène DAHOUMANE",
  },
  {
    html: "Aicha-Imene-DAHOUMANE-CV-fr-itops.html",
    pdf: "Aicha-Imene-DAHOUMANE-CV-fr-itops.pdf",
    scale: 0.94,
    title: "Aïcha Imène DAHOUMANE — IT Ops / Systèmes & Réseaux — CV",
    author: "Aïcha Imène DAHOUMANE",
  },
  {
    html: "Aicha-Imene-DAHOUMANE-CV-fr-salesforce.html",
    pdf: "Aicha-Imene-DAHOUMANE-CV-fr-salesforce.pdf",
    scale: 0.96,
    title: "Aïcha Imène DAHOUMANE — Développeuse Salesforce — CV",
    author: "Aïcha Imène DAHOUMANE",
  },
  {
    html: "Aicha-Imene-DAHOUMANE-CV-es-itops.html",
    pdf: "Aicha-Imene-DAHOUMANE-CV-es-itops.pdf",
    scale: 0.89,
    title: "Aïcha Imène DAHOUMANE — IT Ops / Sistemas y Redes — CV",
    author: "Aïcha Imène DAHOUMANE",
  },
  {
    html: "Aicha-Imene-DAHOUMANE-CV-es-salesforce.html",
    pdf: "Aicha-Imene-DAHOUMANE-CV-es-salesforce.pdf",
    scale: 0.95,
    title: "Aïcha Imène DAHOUMANE — Desarrolladora Salesforce — CV",
    author: "Aïcha Imène DAHOUMANE",
  },
  {
    html: "Aicha-Imene-DAHOUMANE-CV-fr-hybrid.html",
    pdf: "Aicha-Imene-DAHOUMANE-CV-fr-hybrid.pdf",
    scale: 0.96,
    title: "Aïcha Imène DAHOUMANE — Développeuse Salesforce & Infrastructure — CV",
    author: "Aïcha Imène DAHOUMANE",
  },
  {
    html: "Aicha-Imene-DAHOUMANE-CV-en-hybrid.html",
    pdf: "Aicha-Imene-DAHOUMANE-CV-en-hybrid.pdf",
    scale: 0.96,
    title: "Aïcha Imène DAHOUMANE — Salesforce & Infrastructure Developer — CV",
    author: "Aïcha Imène DAHOUMANE",
  },
  {
    html: "Aicha-Imene-DAHOUMANE-CV-es-hybrid.html",
    pdf: "Aicha-Imene-DAHOUMANE-CV-es-hybrid.pdf",
    scale: 0.95,
    title: "Aïcha Imène DAHOUMANE — Desarrolladora Salesforce e Infraestructura — CV",
    author: "Aïcha Imène DAHOUMANE",
  },
  // ── ATS versions (single column, no sidebar) ─────────────────────────────
  // In addition to the versions above, for recruitment platforms with
  // automatic parsing (Taleo, Workday, SmartRecruiters), where a two-column
  // layout can lose the sidebar content (skills, certifications).
  {
    html: "Aicha-Imene-DAHOUMANE-CV-fr-itops-ats.html",
    pdf: "Aicha-Imene-DAHOUMANE-CV-fr-itops-ats.pdf",
    scale: 1,
    title: "Aïcha Imène DAHOUMANE — IT Ops / Systèmes & Réseaux — CV (ATS)",
    author: "Aïcha Imène DAHOUMANE",
  },
  {
    html: "Aicha-Imene-DAHOUMANE-CV-fr-salesforce-ats.html",
    pdf: "Aicha-Imene-DAHOUMANE-CV-fr-salesforce-ats.pdf",
    scale: 1,
    title: "Aïcha Imène DAHOUMANE — Développeuse Salesforce — CV (ATS)",
    author: "Aïcha Imène DAHOUMANE",
  },
  {
    html: "Aicha-Imene-DAHOUMANE-CV-fr-hybrid-ats.html",
    pdf: "Aicha-Imene-DAHOUMANE-CV-fr-hybrid-ats.pdf",
    scale: 1,
    title: "Aïcha Imène DAHOUMANE — Développeuse Salesforce & Infrastructure — CV (ATS)",
    author: "Aïcha Imène DAHOUMANE",
  },
  {
    html: "Aicha-Imene-DAHOUMANE-CV-en-itops-ats.html",
    pdf: "Aicha-Imene-DAHOUMANE-CV-en-itops-ats.pdf",
    scale: 1,
    title: "Aïcha Imène DAHOUMANE — IT Ops / Systems & Networks — CV (ATS)",
    author: "Aïcha Imène DAHOUMANE",
  },
  {
    html: "Aicha-Imene-DAHOUMANE-CV-en-salesforce-ats.html",
    pdf: "Aicha-Imene-DAHOUMANE-CV-en-salesforce-ats.pdf",
    scale: 1,
    title: "Aïcha Imène DAHOUMANE — Salesforce Developer — CV (ATS)",
    author: "Aïcha Imène DAHOUMANE",
  },
  {
    html: "Aicha-Imene-DAHOUMANE-CV-en-hybrid-ats.html",
    pdf: "Aicha-Imene-DAHOUMANE-CV-en-hybrid-ats.pdf",
    scale: 1,
    title: "Aïcha Imène DAHOUMANE — Salesforce & Infrastructure Developer — CV (ATS)",
    author: "Aïcha Imène DAHOUMANE",
  },
  {
    html: "Aicha-Imene-DAHOUMANE-CV-es-itops-ats.html",
    pdf: "Aicha-Imene-DAHOUMANE-CV-es-itops-ats.pdf",
    scale: 1,
    title: "Aïcha Imène DAHOUMANE — IT Ops / Sistemas y Redes — CV (ATS)",
    author: "Aïcha Imène DAHOUMANE",
  },
  {
    html: "Aicha-Imene-DAHOUMANE-CV-es-salesforce-ats.html",
    pdf: "Aicha-Imene-DAHOUMANE-CV-es-salesforce-ats.pdf",
    scale: 1,
    title: "Aïcha Imène DAHOUMANE — Desarrolladora Salesforce — CV (ATS)",
    author: "Aïcha Imène DAHOUMANE",
  },
  {
    html: "Aicha-Imene-DAHOUMANE-CV-es-hybrid-ats.html",
    pdf: "Aicha-Imene-DAHOUMANE-CV-es-hybrid-ats.pdf",
    scale: 1,
    title: "Aïcha Imène DAHOUMANE — Desarrolladora Salesforce e Infraestructura — CV (ATS)",
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

  // Load the local HTML file (file:// URI)
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" });

  // Set metadata before printing: Chromium uses document.title for the PDF
  // Title and <meta name="author"> for Author.
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

  // Patch PDF metadata with pdf-lib (Chromium ignores Author/Subject/Creator)
  const pdfBytes = readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  pdfDoc.setTitle(title);
  pdfDoc.setAuthor(author);
  pdfDoc.setSubject(title);
  pdfDoc.setCreator("Aicha-Imene-DAHOUMANE-Portfolio.dev / Puppeteer + pdf-lib");
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
