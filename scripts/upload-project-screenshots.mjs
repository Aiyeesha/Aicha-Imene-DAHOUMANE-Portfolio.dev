// Upload les screenshots de public/projects/<slug>/ vers le bucket Supabase Storage "projects".
// Usage: node scripts/upload-project-screenshots.mjs <slug1> [slug2] [...]
// Nécessite .env.local avec NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY.

import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
const slugs = process.argv.slice(2);

if (slugs.length === 0) {
  console.error("Usage: node scripts/upload-project-screenshots.mjs <slug1> [slug2] ...");
  process.exit(1);
}

for (const slug of slugs) {
  const dir = path.join("public", "projects", slug);
  if (!fs.existsSync(dir)) {
    console.warn(`Skip ${slug}: ${dir} not found`);
    continue;
  }
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".webp"));
  for (const file of files) {
    const filePath = path.join(dir, file);
    const buffer = fs.readFileSync(filePath);
    const storagePath = `${slug}/${file}`;
    const { error } = await supabase.storage
      .from("projects")
      .upload(storagePath, buffer, { contentType: "image/webp", upsert: true });
    if (error) {
      console.error(`FAILED ${storagePath}:`, error.message);
    } else {
      console.log(`OK ${storagePath}`);
    }
  }
}
