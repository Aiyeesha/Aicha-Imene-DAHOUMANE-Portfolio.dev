import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

// Charge explicitement .env.local (puis fallback .env)
const envLocalPath = path.resolve(process.cwd(), ".env.local");
const envPath = path.resolve(process.cwd(), ".env");

if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath, override: true });
  console.log(`✅ Loaded env from ${envLocalPath}`);
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath, override: true });
  console.log(`✅ Loaded env from ${envPath}`);
} else {
  console.warn("⚠️ No .env.local or .env file found.");
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("DEBUG ENV:", {
  cwd: process.cwd(),
  hasUrl: Boolean(url),
  hasAnon: Boolean(anon),
});

if (!url || !anon) {
  console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

const supabase = createClient(url, anon, { auth: { persistSession: false } });

async function run() {
  const about = await supabase
    .from("about_pages")
    .select("locale, headline, status")
    .eq("locale", "fr")
    .eq("status", "published")
    .maybeSingle();

  console.log("about_pages:", {
    error: about.error
      ? { message: about.error.message, code: (about.error as any).code }
      : null,
    data: about.data ?? null,
  });

  process.exit(0);
}

run().catch((e) => {
  console.error("❌ Script failed:", e);
  process.exit(1);
});