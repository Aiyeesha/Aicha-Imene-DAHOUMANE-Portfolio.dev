// Injecte automatiquement le hash du commit courant dans le service worker (CACHE_VERSION).
// Appelé en postbuild : chaque déploiement génère une version unique → les anciens caches
// sont invalidés dès l'activation du nouveau SW.
//
// Sources du hash (priorité décroissante) :
//   1. VERCEL_GIT_COMMIT_SHA — injecté automatiquement par Vercel en production
//   2. git rev-parse HEAD     — utilisé en local et en CI (actions/checkout fournit git)

import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const sha =
  process.env.VERCEL_GIT_COMMIT_SHA ??
  execSync("git rev-parse HEAD").toString().trim();

const version = sha.slice(0, 8);
const swPath = join(__dirname, "../public/sw.js");

const original = readFileSync(swPath, "utf8");
const patched = original.replace(
  /const CACHE_VERSION = "[^"]*"/,
  `const CACHE_VERSION = "${version}"`
);

if (patched === original) {
  console.warn(
    "[inject-sw-version] AVERTISSEMENT : aucune occurrence de CACHE_VERSION trouvée dans sw.js"
  );
  process.exit(1);
}

writeFileSync(swPath, patched);
console.log(`[inject-sw-version] sw.js CACHE_VERSION → ${version}`);
