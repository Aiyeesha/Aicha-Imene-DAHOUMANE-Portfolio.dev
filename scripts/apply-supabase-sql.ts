/**
 * apply-supabase-sql.ts
 * ---------------------
 * Applies the SQL files of supabase/migrations/ to the remote Supabase
 * database through the Supabase Management API (native fetch, no extra
 * dependency), in order:
 *   1. 001_testimonials.sql         — testimonials table
 *   2. 002_policies.sql             — RLS on every table
 *   3. 003_uptime.sql               — uptime_pings table
 *   4. 004_testimonial_submissions  — testimonial_submissions table
 *   5. 005_goals_2026.sql           — goals_2026 table
 *   6. 006_security_hardening.sql               — security hardening
 *   7. 007_projects_schema.sql                  — projects + project_assets schema
 *   8. 008_about_goals_certifications_schema.sql — about_pages, goals_2026, certifications
 *
 * Required in .env.local:
 *   SUPABASE_PROJECT_REF    — project id (Settings > General > Reference ID)
 *   SUPABASE_ACCESS_TOKEN   — personal token (https://supabase.com/dashboard/account/tokens)
 *
 *   npx tsx scripts/apply-supabase-sql.ts
 *
 * Idempotent (IF NOT EXISTS / DROP IF EXISTS): safe to re-run.
 */

import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

// ── 0. Load the environment ───────────────────────────────────────────────────
const envLocalPath = path.resolve(process.cwd(), ".env.local");
const envPath      = path.resolve(process.cwd(), ".env");

if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath, override: true });
  console.log(`✅ Env chargé depuis ${envLocalPath}`);
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath, override: true });
  console.log(`✅ Env chargé depuis ${envPath}`);
} else {
  console.warn("⚠️  Aucun fichier .env.local ou .env trouvé.");
}

// ── 1. Check required variables ───────────────────────────────────────────────
const PROJECT_REF    = process.env.SUPABASE_PROJECT_REF;
const ACCESS_TOKEN   = process.env.SUPABASE_ACCESS_TOKEN;

if (!PROJECT_REF || !ACCESS_TOKEN) {
  console.error(`
❌ Variables manquantes. Ajoute dans .env.local :
   SUPABASE_PROJECT_REF=<ton-project-ref>
   SUPABASE_ACCESS_TOKEN=<ton-personal-access-token>

📌 Où trouver ces valeurs :
   - PROJECT_REF    : Supabase Dashboard → Settings → General → Reference ID
   - ACCESS_TOKEN   : https://supabase.com/dashboard/account/tokens
`);
  process.exit(1);
}

const API_URL = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`;

// ── 2. Utilities ──────────────────────────────────────────────────────────────

/**
 * Splits a SQL file into statements. Skips pure comment lines (-- ...),
 * handles PostgreSQL dollar-quoted strings ($$...$$, $tag$...$tag$) so a
 * function body is never cut, and drops empty statements.
 */
function splitSqlStatements(sql: string): string[] {
  const statements: string[] = [];
  let current = "";
  // Active dollar-quote tag, or null outside a dollar-quoted block
  let dollarTag: string | null = null;

  for (const line of sql.split("\n")) {
    const trimmed = line.trim();
    current += line + "\n";

    // ── Dollar-quoted blocks ────────────────────────────────────────────────
    // A tag looks like $$ or $identifier$; every occurrence on the line opens
    // or closes the block.
    const dollarMatches = [...line.matchAll(/\$([A-Za-z_]*)\$/g)];

    for (const match of dollarMatches) {
      const tag = match[0]; // e.g. "$$" or "$body$"
      if (dollarTag === null) {
        // Not in a block yet → open
        dollarTag = tag;
      } else if (tag === dollarTag) {
        // Matching tag → close
        dollarTag = null;
      }
      // A different tag inside a block is ignored (no nesting)
    }

    // ── End of statement ─────────────────────────────────────────────────────
    // Only split outside a dollar-quoted block.
    if (dollarTag === null) {
      // Comment-only or blank lines are accumulated, never split on
      if (trimmed.startsWith("--") || trimmed === "") {
        continue;
      }
      // A line ending with ; (outside an inline comment) ends the statement
      const lineWithoutComment = trimmed.replace(/--[^\n]*$/, "").trim();
      if (lineWithoutComment.endsWith(";")) {
        const cleaned = current.trim();
        const withoutComments = cleaned.replace(/--[^\n]*/g, "").trim();
        if (withoutComments.length > 0) {
          statements.push(cleaned);
        }
        current = "";
      }
    }
  }

  // Last statement without a trailing ; (safety)
  const remaining = current.trim();
  if (remaining) {
    const withoutComments = remaining.replace(/--[^\n]*/g, "").trim();
    if (withoutComments.length > 0) {
      statements.push(remaining);
    }
  }

  return statements;
}

/**
 * Runs a SQL statement through the Supabase Management API; returns the
 * result or throws.
 */
async function execSql(sql: string): Promise<void> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${ACCESS_TOKEN}`,
      "apikey": ACCESS_TOKEN as string,
    },
    body: JSON.stringify({ query: sql }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "(no body)");
    throw new Error(`HTTP ${res.status}: ${body}`);
  }

  // The API returns { data, error }: check error
  const json = await res.json().catch(() => null);
  if (json?.error) {
    throw new Error(json.error);
  }
}

/**
 * Applies a whole SQL file statement by statement, showing progress and
 * continuing past failures (useful for DROP IF EXISTS on missing tables).
 */
async function applyFile(filePath: string): Promise<{ ok: number; skipped: number; failed: number }> {
  const sql = fs.readFileSync(filePath, "utf-8");
  const statements = splitSqlStatements(sql);

  console.log(`\n📄 ${path.basename(filePath)} — ${statements.length} instruction(s)`);

  let ok = 0, skipped = 0, failed = 0;

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    // Summary of the statement (first non-comment line)
    const preview = stmt
      .split("\n")
      .find((l) => l.trim() && !l.trim().startsWith("--"))
      ?.trim()
      .slice(0, 80) ?? "(vide)";

    process.stdout.write(`  [${i + 1}/${statements.length}] ${preview}… `);

    try {
      await execSql(stmt);
      process.stdout.write("✅\n");
      ok++;
    } catch (err: any) {
      const msg: string = err?.message ?? String(err);

      // Some errors are expected (e.g. DROP IF EXISTS on a missing table):
      // counted as "skipped" rather than "failed"
      if (
        msg.includes("does not exist") ||
        msg.includes("already exists") ||
        msg.includes("42P07") ||  // duplicate_table
        msg.includes("42704")     // undefined_object
      ) {
        process.stdout.write(`⏭  (${msg.slice(0, 60)})\n`);
        skipped++;
      } else {
        process.stdout.write(`❌\n`);
        console.error(`     Erreur : ${msg}`);
        failed++;
      }
    }
  }

  return { ok, skipped, failed };
}

// ── 3. Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🚀 apply-supabase-sql — projet : ${PROJECT_REF}`);
  console.log("──────────────────────────────────────────────────────────");

  // Files to apply, in order (supabase/migrations/)
  const SQL_FILES = [
    path.resolve(process.cwd(), "supabase/migrations/001_testimonials.sql"),
    path.resolve(process.cwd(), "supabase/migrations/002_policies.sql"),
    path.resolve(process.cwd(), "supabase/migrations/003_uptime.sql"),
    path.resolve(process.cwd(), "supabase/migrations/004_testimonial_submissions.sql"),
    path.resolve(process.cwd(), "supabase/migrations/005_goals_2026.sql"),
    path.resolve(process.cwd(), "supabase/migrations/006_security_hardening.sql"),
    path.resolve(process.cwd(), "supabase/migrations/007_projects_schema.sql"),
    path.resolve(process.cwd(), "supabase/migrations/008_about_goals_certifications_schema.sql"),
  ];

  let totalOk = 0, totalSkipped = 0, totalFailed = 0;

  for (const filePath of SQL_FILES) {
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Fichier introuvable, ignoré : ${filePath}`);
      continue;
    }

    const { ok, skipped, failed } = await applyFile(filePath);
    totalOk      += ok;
    totalSkipped += skipped;
    totalFailed  += failed;
  }

  // Final report
  console.log("\n──────────────────────────────────────────────────────────");
  console.log(`📊 Résultat : ✅ ${totalOk} ok  ⏭  ${totalSkipped} ignorées  ❌ ${totalFailed} erreurs`);

  if (totalFailed > 0) {
    console.error("\n❌ Des erreurs ont été rencontrées. Vérifie les messages ci-dessus.");
    process.exit(1);
  } else {
    console.log("\n✅ Migration terminée avec succès.");
    console.log(`
💡 Vérification dans le SQL Editor Supabase :
   SELECT tablename, rowsecurity AS rls_enabled
   FROM pg_tables WHERE schemaname = 'public'
   ORDER BY tablename;
`);
  }
}

main().catch((err) => {
  console.error("💥 Erreur fatale :", err);
  process.exit(1);
});
