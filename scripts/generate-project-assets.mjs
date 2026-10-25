#!/usr/bin/env node
// scripts/generate-project-assets.mjs
// -----------------------------------
// Génère content/project-assets.json : la liste des projets qui disposent
// d'un logo (public/projects/<slug>/logo.webp) et d'une couverture
// (public/projects/<slug>/cover.webp).
//
// Pourquoi un manifeste plutôt qu'un test d'existence à l'exécution — audit
// 2026-10-23 (P5) : sur Vercel, public/ est servi par le CDN et n'existe pas
// dans le système de fichiers des fonctions serveur ; et les cartes de projet
// sont des composants client. Sans cette information, chaque carte tentait de
// charger un logo et une couverture qui, pour la plupart des projets,
// n'existent pas : ~18 requêtes en 404 sur /fr/projects, chacune servie par une
// page HTML 404 complète (~70 Ko).
//
// Usage : npm run assets:manifest   (à relancer après ajout/suppression d'un
//         logo ou d'une couverture). Le test __tests__/projectAssets.test.ts
//         échoue si le manifeste n'est plus synchronisé avec public/projects.

import { readdirSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const PROJECTS_DIR = join(ROOT, "public", "projects");
const OUTPUT = join(ROOT, "content", "project-assets.json");

// Dossiers de projet, triés pour un fichier stable (diffs lisibles).
const slugs = readdirSync(PROJECTS_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const has = (slug, file) => existsSync(join(PROJECTS_DIR, slug, file));

const manifest = {
  // Commentaire embarqué : un JSON n'accepte pas de commentaire classique.
  _generated: "Fichier généré par scripts/generate-project-assets.mjs — ne pas modifier à la main.",
  logos: slugs.filter((slug) => has(slug, "logo.webp")),
  covers: slugs.filter((slug) => has(slug, "cover.webp")),
};

writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2) + "\n");
console.log(
  `project-assets.json : ${manifest.logos.length} logos, ${manifest.covers.length} couvertures (${slugs.length} dossiers)`
);
