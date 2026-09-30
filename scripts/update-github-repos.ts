/**
 * update-github-repos.ts
 * ----------------------
 * Met à jour uniquement le champ repo_url dans la table projects.
 * Ne supprime ni ne réinitialise aucune table.
 *
 * Usage :
 *   npx tsx scripts/update-github-repos.ts
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

// Charger .env.local
const envLocalPath = path.resolve(process.cwd(), ".env.local");
const envPath = path.resolve(process.cwd(), ".env");

if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath, override: true });
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath, override: true });
}

import { GITHUB_REPOS } from "../content/github-repos";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "❌ Variables manquantes dans .env.local :\n" +
      "  NEXT_PUBLIC_SUPABASE_URL\n" +
      "  SUPABASE_SERVICE_ROLE_KEY"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

(async function main() {
  console.log("🚀 Mise à jour des repo_url dans Supabase...\n");

  let updated = 0;
  let errors = 0;

  for (const [slug, repoUrl] of Object.entries(GITHUB_REPOS)) {
    // Met à jour toutes les lignes avec ce slug (EN + FR)
    const { error } = await supabase
      .from("projects")
      .update({ repo_url: repoUrl })
      .eq("slug", slug)
      .eq("status", "published");

    if (error) {
      console.error(`  ❌ ${slug} : ${error.message}`);
      errors++;
    } else {
      console.log(`  ✅ ${slug}\n     → ${repoUrl}`);
      updated++;
    }
  }

  console.log(`\n📊 Résultat : ${updated} slug(s) mis à jour, ${errors} erreur(s).`);
  process.exit(errors > 0 ? 1 : 0);
})();
