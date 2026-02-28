/**
 * Migrate content/projectDetails.ts → Supabase projects table.
 *
 * Updates ONLY the 3 new columns (hero_subtitle, sections, gallery)
 * on existing rows. Does NOT delete or reset any data.
 *
 * Prerequisites:
 *   Run in Supabase SQL Editor first:
 *     ALTER TABLE projects
 *       ADD COLUMN IF NOT EXISTS hero_subtitle text,
 *       ADD COLUMN IF NOT EXISTS sections      jsonb DEFAULT '[]'::jsonb,
 *       ADD COLUMN IF NOT EXISTS gallery       jsonb DEFAULT '[]'::jsonb;
 *
 * Usage:
 *   npx tsx scripts/migrate-project-details.ts
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

// ── 0) Load env ──────────────────────────────────────────────────────────────
const envLocalPath = path.resolve(process.cwd(), ".env.local");
const envPath = path.resolve(process.cwd(), ".env");

if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath, override: true });
  console.log(`✅ Loaded env from .env.local`);
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath, override: true });
  console.log(`✅ Loaded env from .env`);
} else {
  console.warn("⚠️  No .env.local or .env found.");
}

import { projectDetails } from "../content/projectDetails";

// ── 1) Validate env ──────────────────────────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "❌ Missing env vars:\n  - NEXT_PUBLIC_SUPABASE_URL\n  - SUPABASE_SERVICE_ROLE_KEY"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

// ── 2) Migrate ────────────────────────────────────────────────────────────────
async function migrate() {
  let updated = 0;
  let skipped = 0;
  let errors  = 0;

  for (const detail of projectDetails) {
    const { slug, gallery = [], locales = {} } = detail;

    const localeEntries: Array<{ locale: "en" | "fr"; heroSubtitle: string | null; sections: unknown[] }> = [
      {
        locale: "en",
        heroSubtitle: locales.en?.heroSubtitle ?? null,
        sections:     locales.en?.sections     ?? locales.fr?.sections ?? [],
      },
      {
        locale: "fr",
        heroSubtitle: locales.fr?.heroSubtitle ?? locales.en?.heroSubtitle ?? null,
        sections:     locales.fr?.sections     ?? locales.en?.sections     ?? [],
      },
    ];

    for (const { locale, heroSubtitle, sections } of localeEntries) {
      const { data: existing, error: fetchErr } = await supabase
        .from("projects")
        .select("id")
        .eq("slug", slug)
        .eq("locale", locale)
        .maybeSingle();

      if (fetchErr) {
        console.error(`❌ [${slug}/${locale}] fetch error: ${fetchErr.message}`);
        errors++;
        continue;
      }

      if (!existing) {
        console.warn(`⚠️  [${slug}/${locale}] row not found — skipping`);
        skipped++;
        continue;
      }

      const { error: updateErr } = await supabase
        .from("projects")
        .update({
          hero_subtitle: heroSubtitle,
          sections:      sections,
          gallery:       gallery,
        })
        .eq("id", existing.id);

      if (updateErr) {
        console.error(`❌ [${slug}/${locale}] update error: ${updateErr.message}`);
        errors++;
      } else {
        console.log(`✅ [${slug}/${locale}] updated`);
        updated++;
      }
    }
  }

  console.log(`\n── Summary ──────────────────────`);
  console.log(`  Updated : ${updated}`);
  console.log(`  Skipped : ${skipped}`);
  console.log(`  Errors  : ${errors}`);

  if (errors > 0) process.exit(1);
}

migrate().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
