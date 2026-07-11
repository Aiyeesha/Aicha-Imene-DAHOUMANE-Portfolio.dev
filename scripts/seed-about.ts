/**
 * Seed non destructif de public.about_pages depuis content/about.ts.
 *
 * Contrairement à seed.ts (qui vide TOUTES les tables avant de reseed),
 * ce script ne fait qu'un upsert sur about_pages (locale = clé de conflit) :
 * aucune table n'est vidée, aucune autre ligne n'est touchée.
 *
 * Usage :
 *   npx tsx scripts/seed-about.ts
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath, override: true });
}

import { aboutContent } from "../content/about";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

(async function main() {
  console.log("Building about_pages rows from content/about.ts ...");

  const rows = [
    {
      locale: "fr",
      headline: "À propos",
      intro: aboutContent.fr?.introduction ?? null,
      body: aboutContent.fr ?? {},
      status: "published",
    },
    {
      locale: "en",
      headline: "About",
      intro: aboutContent.en?.introduction ?? null,
      body: aboutContent.en ?? {},
      status: "published",
    },
    {
      locale: "es",
      headline: "Sobre mí",
      intro: aboutContent.es?.introduction ?? null,
      body: aboutContent.es ?? {},
      status: "published",
    },
  ];

  console.log(`Upserting ${rows.length} about_pages rows (fr/en/es) ...`);
  const { error } = await supabase.from("about_pages").upsert(rows, { onConflict: "locale" });
  if (error) throw new Error(`Upsert about_pages failed: ${error.message}`);

  console.log("Done. Verifying ...");
  const { data, error: verifyError } = await supabase
    .from("about_pages")
    .select("locale, intro")
    .order("locale");
  if (verifyError) throw new Error(`Verify failed: ${verifyError.message}`);
  console.log("✅ about_pages state:", data);
})().catch((err) => {
  console.error("Failed:", err?.message ?? err);
  process.exit(1);
});
