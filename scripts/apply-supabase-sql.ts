/**
 * apply-supabase-sql.ts
 * ---------------------
 * Applique les fichiers SQL de /supabase/ sur la base Supabase distante
 * via l'API Management Supabase (aucune dépendance supplémentaire, fetch natif Node 18+).
 *
 * Fichiers exécutés dans l'ordre (supabase/migrations/) :
 *   1. 001_testimonials.sql         — table testimonials
 *   2. 002_policies.sql             — RLS toutes tables
 *   3. 003_uptime.sql               — table uptime_pings
 *   4. 004_testimonial_submissions  — table testimonial_submissions
 *   5. 005_goals_2026.sql           — table goals_2026
 *   6. 006_security_hardening.sql   — durcissement sécurité (audit 2026-06-04)
 *
 * Variables d'environnement requises (dans .env.local) :
 *   SUPABASE_PROJECT_REF    — ID du projet (Settings > General > Reference ID)
 *   SUPABASE_ACCESS_TOKEN   — Token personnel (https://supabase.com/dashboard/account/tokens)
 *
 * Usage :
 *   npx tsx scripts/apply-supabase-sql.ts
 *
 * Idempotent : les instructions utilisent IF NOT EXISTS / DROP IF EXISTS.
 * Peut être relancé sans danger.
 */

import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

// ── 0. Charger l'environnement ────────────────────────────────────────────────
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

// ── 1. Vérifier les variables requises ────────────────────────────────────────
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

// ── 2. Utilitaires ────────────────────────────────────────────────────────────

/**
 * Découpe un fichier SQL en instructions individuelles.
 * Ignore les lignes de commentaires purs (-- ...).
 * Gère les chaînes dollar-quotées PostgreSQL ($$...$$, $tag$...$tag$)
 * pour ne pas couper une instruction au milieu d'un corps de fonction.
 * Filtre les instructions vides.
 */
function splitSqlStatements(sql: string): string[] {
  const statements: string[] = [];
  let current = "";
  // Tag dollar-quote actif, ou null si on n'est pas dans un bloc dollar-quoted
  let dollarTag: string | null = null;

  for (const line of sql.split("\n")) {
    const trimmed = line.trim();
    current += line + "\n";

    // ── Gestion des blocs dollar-quotés ─────────────────────────────────────
    // Un tag dollar-quote ressemble à $$ ou $identifiant$.
    // On cherche toutes les occurrences sur cette ligne pour ouvrir/fermer le bloc.
    const dollarMatches = [...line.matchAll(/\$([A-Za-z_]*)\$/g)];

    for (const match of dollarMatches) {
      const tag = match[0]; // ex. "$$" ou "$body$"
      if (dollarTag === null) {
        // Pas encore dans un bloc → on ouvre
        dollarTag = tag;
      } else if (tag === dollarTag) {
        // Tag correspondant → on ferme
        dollarTag = null;
      }
      // Un tag différent à l'intérieur d'un bloc est ignoré (non imbriqué)
    }

    // ── Détection de fin de statement ────────────────────────────────────────
    // On ne coupe que si on n'est PAS à l'intérieur d'un bloc dollar-quoté.
    if (dollarTag === null) {
      // Lignes de commentaires/vides seules → on les accumule mais ne coupe pas
      if (trimmed.startsWith("--") || trimmed === "") {
        continue;
      }
      // Si la ligne (hors commentaire inline) se termine par ; → fin du statement
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

  // Dernier statement sans ; terminal (sécurité)
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
 * Exécute une instruction SQL via l'API Management Supabase.
 * Retourne le résultat ou lève une erreur.
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

  // L'API renvoie { data, error } — vérifier le champ error
  const json = await res.json().catch(() => null);
  if (json?.error) {
    throw new Error(json.error);
  }
}

/**
 * Applique un fichier SQL complet, instruction par instruction.
 * Affiche la progression et continue même si une instruction échoue
 * (pratique pour les DROP IF EXISTS sur des tables qui n'existent pas encore).
 */
async function applyFile(filePath: string): Promise<{ ok: number; skipped: number; failed: number }> {
  const sql = fs.readFileSync(filePath, "utf-8");
  const statements = splitSqlStatements(sql);

  console.log(`\n📄 ${path.basename(filePath)} — ${statements.length} instruction(s)`);

  let ok = 0, skipped = 0, failed = 0;

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    // Afficher un résumé de l'instruction (première ligne non-commentaire)
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

      // Certaines erreurs sont attendues (ex : DROP IF EXISTS sur table inexistante)
      // → on les considère comme "skipped" plutôt que "failed"
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

  // Fichiers à appliquer dans l'ordre (supabase/migrations/)
  const SQL_FILES = [
    path.resolve(process.cwd(), "supabase/migrations/001_testimonials.sql"),
    path.resolve(process.cwd(), "supabase/migrations/002_policies.sql"),
    path.resolve(process.cwd(), "supabase/migrations/003_uptime.sql"),
    path.resolve(process.cwd(), "supabase/migrations/004_testimonial_submissions.sql"),
    path.resolve(process.cwd(), "supabase/migrations/005_goals_2026.sql"),
    path.resolve(process.cwd(), "supabase/migrations/006_security_hardening.sql"),
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

  // Rapport final
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
