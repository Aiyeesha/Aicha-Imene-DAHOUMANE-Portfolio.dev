// scripts/certifications-to-png.mjs
// Convertit la page 1 de chaque PDF de certification en PNG
// et place les images dans public/certifications/
//
// Usage : node scripts/certifications-to-png.mjs

// scripts/certifications-to-png.mjs
// Convertit la page 1 de chaque PDF de certification en PNG
// et place les images dans public/certifications/
//
// Usage : node scripts/certifications-to-png.mjs

import puppeteer from "puppeteer";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "certifications");

// Chrome PDF viewer chrome dimensions (à l'échelle deviceScaleFactor: 2)
// toolbar haut : ~80px, sidebar gauche : ~300px (quand visible)
// On capture large et on crop ensuite avec sharp.
const VIEWPORT_W = 1400;
const VIEWPORT_H = 1000;
const SCALE = 2;

const CERTIFICATIONS = [
  {
    pdf: "C:\\Users\\aidah\\Downloads\\afd8f_titre-a-finalite-professionnelle_OpenClassrooms_Aïcha_Imène_DAHOUMANE_20251019.pdf",
    out: "dev-concepteur-badge.png",
    // Paysage OpenClassrooms — sidebar gauche + toolbar haut
    crop: { left: 230, top: 38, width: 1100, height: 820 },
  },
  {
    pdf: "C:\\Users\\aidah\\Downloads\\Titre Professionnel Technicienne Supérieure Systèmes et Réseaux informatique.pdf",
    out: "systems-networks-badge.png",
    // Scan A4 paysage — zoom 150% via hash, le scan prend toute la zone utile
    zoom: 150,
    crop: { left: 230, top: 38, width: 1100, height: 820 },
  },
  {
    pdf: "C:\\Users\\aidah\\Downloads\\Titre Professionnelle Technicienne d'Assistance en Informatique (TAI).pdf",
    out: "tai-badge.png",
    // Scan A4 portrait — zoom 150%
    zoom: 150,
    crop: { left: 230, top: 38, width: 1100, height: 820 },
  },
  {
    pdf: "C:\\Users\\aidah\\Downloads\\Certification_LINGUASKILL.pdf",
    out: "linguaskill-badge.png",
    // Portrait — crop plus large pour ne pas couper les descriptions à droite
    zoom: 110,
    crop: { left: 230, top: 38, width: 1100, height: 820 },
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: "new",       // nouveau headless Chrome — bien meilleur rendu PDF
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-web-security",
      "--allow-file-access-from-files",
    ],
  });

  for (const { pdf, out, crop, zoom } of CERTIFICATIONS) {
    const outPath = path.join(OUT_DIR, out);
    const tmpPath = path.join(OUT_DIR, "_tmp_" + out);
    const encodedPath = pdf.replace(/\\/g, "/").replace(/ /g, "%20").replace(/'/g, "%27");
    const fileUrl = "file:///" + encodedPath + (zoom ? `#zoom=${zoom}` : "");

    console.log(`→ Rendu de ${path.basename(pdf)}...`);

    const page = await browser.newPage();
    await page.setViewport({
      width: VIEWPORT_W,
      height: VIEWPORT_H,
      deviceScaleFactor: SCALE,
    });

    try {
      await page.goto(fileUrl, { waitUntil: "load", timeout: 30000 });
      // Attendre le rendu complet du viewer (8 s pour les PDFs lourds)
      await sleep(8000);

      // Capture brute (viewport complet)
      await page.screenshot({ path: tmpPath, fullPage: false });

      // Crop avec sharp pour enlever la UI du viewer Chrome
      // Les coordonnées crop sont en pixels viewport — sharp travaille en pixels image
      await sharp(tmpPath)
        .extract({
          left:   Math.round(crop.left  * SCALE),
          top:    Math.round(crop.top   * SCALE),
          width:  Math.round(crop.width * SCALE),
          height: Math.round(crop.height * SCALE),
        })
        .png({ quality: 90 })
        .toFile(outPath);

      fs.unlinkSync(tmpPath);
      const stat = fs.statSync(outPath);
      console.log(`   ✓ ${outPath} (${Math.round(stat.size / 1024)} KB)`);
    } catch (err) {
      console.error(`   ✗ Erreur sur ${path.basename(pdf)}: ${err.message}`);
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log("\nTerminé.");
}

main().catch(console.error);
