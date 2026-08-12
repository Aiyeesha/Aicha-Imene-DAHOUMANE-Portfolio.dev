/**
 * Seed Supabase depuis :
 * - content/projects.ts
 * - content/projectDetails.ts
 * - content/about.ts
 *
 * (Les certifications ne sont plus seedées ici : la table Supabase
 * "certifications" a été supprimée, /certifications lit directement
 * content/certifications.ts — voir la note dans resetTables() ci-dessous.)
 *
 * Exécution :
 *   npx tsx scripts/seed.ts
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

// ------------------------------
// 0) Charger explicitement .env.local
// ------------------------------
const envLocalPath = path.resolve(process.cwd(), ".env.local");
const envPath = path.resolve(process.cwd(), ".env");

if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath, override: true });
  console.log(`✅ Loaded env from ${envLocalPath}`);
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath, override: true });
  console.log(`✅ Loaded env from ${envPath}`);
} else {
  console.warn("⚠️ No .env.local or .env file found in project root.");
}

// ✅ Imports TS directs (tsx les gère)
import { aboutContent } from "../content/about";
import { projectDetails } from "../content/projectDetails";
import { projects } from "../content/projects";

// ------------------------------
// 1) Vars d'env
// ------------------------------
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("DEBUG ENV:", {
  cwd: process.cwd(),
  hasUrl: Boolean(SUPABASE_URL),
  hasServiceRole: Boolean(SERVICE_ROLE_KEY),
});

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "❌ Variables manquantes. Vérifie .env.local :\n" +
      "- NEXT_PUBLIC_SUPABASE_URL\n" +
      "- SUPABASE_SERVICE_ROLE_KEY\n"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

type AnyObj = Record<string, any>;
type ProjectListItem = AnyObj & { slug: string };

// ------------------------------
// 2) Helpers
// ------------------------------
function normalizeSlug(slug: unknown): string {
  return String(slug ?? "").trim();
}

function toArray<T>(x: unknown): T[] {
  return Array.isArray(x) ? (x as T[]) : [];
}

/**
 * IMPORTANT : ton content/projectDetails.ts exporte un TABLEAU.
 * On construit une Map slug -> details compatible avec :
 * - array [{ slug, locales, gallery }]
 * - ou objet { [slug]: details } (fallback)
 */
function buildDetailsMap(details: unknown): Map<string, AnyObj> {
  const map = new Map<string, AnyObj>();

  // Cas 1 : tableau (TON CAS)
  if (Array.isArray(details)) {
    for (const item of details) {
      const slug = normalizeSlug((item as AnyObj)?.slug);
      if (slug) map.set(slug, item as AnyObj);
    }
    return map;
  }

  // Cas 2 : objet indexé par slug (fallback)
  if (details && typeof details === "object") {
    for (const [slug, value] of Object.entries(details as AnyObj)) {
      map.set(normalizeSlug(slug), value as AnyObj);
    }
  }

  return map;
}

const detailsMap = buildDetailsMap(projectDetails);

/**
 * Construit la ligne à insérer en table "projects".
 * - EN : base + details.locales.en si dispo
 * - FR : details.locales.fr si dispo sinon fallback EN
 * - ES : details.locales.es si dispo sinon fallback EN (les brouillons du
 *   futur framework Salesforce/Cloud n'ont pas encore de bloc `es` dans
 *   content/projectDetails.ts — cf. app/[locale]/projects/[slug]/page.tsx
 *   qui affiche déjà un bandeau "non disponible dans cette langue" pour ce cas)
 */
function buildProjectRow(params: {
  locale: "en" | "fr" | "es";
  base: ProjectListItem;
  detailsRaw?: AnyObj | null;
}) {
  const { locale, base, detailsRaw } = params;

  const slug = normalizeSlug(base.slug);
  const locales = detailsRaw?.locales ?? {};
  const d = (locale === "fr" ? locales.fr : locale === "es" ? locales.es : locales.en) ?? null;

  // Titre : projectDetails.locales.<lang>.title prioritaire, sinon list EN (projects.ts)
  const title = (d?.title as string) || (base.title as string) || slug;

  // hero_subtitle : depuis projectDetails si dispo
  const heroSubtitle =
    (d?.heroSubtitle as string) || (base.subtitle as string) || null;

  // summary : depuis projectDetails si dispo, sinon excerpt/description de la liste
  const summary =
    (d?.excerpt as string) ||
    (d?.summary as string) ||
    (base.excerpt as string) ||
    (base.description as string) ||
    null;

  // highlights : si projectDetails en a, sinon liste
  const highlights =
    toArray<string>(d?.highlights).length > 0
      ? toArray<string>(d?.highlights)
      : toArray<string>(base.highlights);

  // gallery : au niveau detailsRaw.gallery
  const gallery = detailsRaw?.gallery ?? base.gallery ?? null;

  // sections : projectDetails.locales.<lang>.sections
  const sections = d?.sections ?? null;

  // champs issus de content/projects.ts
  const techStack = toArray<string>(base.techStack ?? base.tech_stack);
  const categories = toArray<string>(base.categories);
  const tags = toArray<string>(base.tags);

  const repoUrl = (base.repoUrl ?? base.repo_url ?? null) as string | null;
  const liveUrl = (base.liveUrl ?? base.live_url ?? null) as string | null;
  const pdfUrl = (base.pdfUrl ?? base.pdf_url ?? null) as string | null;

  const contentUpdatedAt =
    base.updatedAt && !Number.isNaN(Date.parse(base.updatedAt))
      ? new Date(base.updatedAt).toISOString()
      : null;

  return {
    locale,
    slug,

    title,
    summary,
    content: null,

    tech_stack: techStack,
    track: (base.track ?? null) as string | null,

    categories,
    tags,

    badge: base.badge ?? null,
    pdf_url: pdfUrl,
    content_updated_at: contentUpdatedAt,
    highlights,

    gallery,
    hero_subtitle: heroSubtitle,
    sections,

    repo_url: repoUrl,
    live_url: liveUrl,

    featured: Boolean(base.featured),
    sort_order: Number.isFinite(base.sortOrder) ? (base.sortOrder as number) : 0,

    // Respecte le statut réel de content/projects.ts (draft reste draft) —
    // hardcoder "published" ici republierait les projets brouillon (dont
    // orgdocs-saas / sfrelease-saas, sous embargo public jusqu'en 2027) à
    // chaque reseed, quel que soit leur statut réel en base.
    status: (base.status as string) || "draft",
    is_bridge: Boolean(base.isBridge),
    is_security: Boolean(base.isSecurity),
  };
}

// ------------------------------
// 3) Reset tables
// ------------------------------
async function resetTables() {
  // "certifications" n'est plus une table de la base (confirmé via
  // information_schema.tables) — supprimée pour de bon après la migration
  // de /admin et /certifications vers content/certifications.ts comme
  // source unique (voir CHANGELOG.md). La référencer ici ferait échouer
  // resetTables() avant même que seedProjects() ne s'exécute.
  const tables = ["project_assets", "projects", "about_pages"] as const;

  for (const t of tables) {
    console.log(`🧹 Resetting table: ${t} ...`);
    const { error } = await supabase
      .from(t)
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (error) {
      throw new Error(`Reset failed on table ${t}: ${error.message}`);
    }
    console.log(`✅ Reset table: ${t}`);
  }
}

// ------------------------------
// 4) Seed projects
// ------------------------------
async function seedProjects() {
  console.log("📦 Building rows from content/projects.ts + content/projectDetails.ts ...");

  const rows: AnyObj[] = [];

  for (const base of projects as ProjectListItem[]) {
    const slug = normalizeSlug(base.slug);
    const detailsRaw = detailsMap.get(slug) ?? null;

    rows.push(buildProjectRow({ locale: "en", base, detailsRaw }));
    rows.push(buildProjectRow({ locale: "fr", base, detailsRaw }));
    rows.push(buildProjectRow({ locale: "es", base, detailsRaw }));
  }

  console.log(`📤 Inserting ${rows.length} rows into public.projects ...`);
  const { error } = await supabase.from("projects").insert(rows);

  if (error) {
    throw new Error(`Insert projects failed: ${error.message}`);
  }

  console.log(`✅ Projects inserted: ${rows.length} rows (EN + FR + ES)`);
}


// ------------------------------
// 5) Seed About (FR/EN/ES)
// ------------------------------
async function seedAbout() {
  console.log("📦 Seeding about_pages from content/about.ts ...");

  // On stocke l'objet complet dans body (jsonb) pour ne rien perdre
  const rows = [
    {
      locale: "fr",
      // aboutContent.fr n'a pas "title" => on met un headline fixe
      headline: "À propos",
      // l'intro correspond à "introduction" dans ton objet
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

  const { error } = await supabase
    .from("about_pages")
    .upsert(rows, { onConflict: "locale" });

  if (error) {
    throw new Error(`Upsert about_pages failed: ${error.message}`);
  }

  console.log(`✅ about_pages upserted: ${rows.length} rows (EN + FR + ES)`);
}

// ------------------------------
// 6) Verify (stats)
// ------------------------------
// NOTE: pas de seedCertifications() — la table Supabase "certifications" a
// été supprimée (voir le commentaire dans resetTables()). Les certifications
// sont servies exclusivement depuis content/certifications.ts, en dehors de
// ce script.
async function verifyStats() {
  const { data: pData, error: pErr } = await supabase
    .from("projects")
    .select("locale, sections, gallery, hero_subtitle");
  if (pErr) throw new Error(`Verify projects failed: ${pErr.message}`);

  const localeCounts = (pData ?? []).reduce((acc: Record<string, number>, r: AnyObj) => {
    acc[r.locale] = (acc[r.locale] ?? 0) + 1;
    return acc;
  }, {});

  const withSections = (pData ?? []).filter((r: AnyObj) => r.sections !== null).length;
  const withGallery = (pData ?? []).filter((r: AnyObj) => r.gallery !== null).length;
  const withHeroSubtitle = (pData ?? []).filter((r: AnyObj) => r.hero_subtitle !== null).length;

  const { data: aData, error: aErr } = await supabase.from("about_pages").select("locale");
  if (aErr) throw new Error(`Verify about_pages failed: ${aErr.message}`);

  const aboutCounts = (aData ?? []).reduce((acc: Record<string, number>, r: AnyObj) => {
    acc[r.locale] = (acc[r.locale] ?? 0) + 1;
    return acc;
  }, {});

  console.log("📊 Projects locale counts:", localeCounts);
  console.log("🧩 Projects rows with sections:", withSections);
  console.log("🖼️ Projects rows with gallery:", withGallery);
  console.log("🏷️ Projects rows with hero_subtitle:", withHeroSubtitle);
  console.log("📄 About locale counts:", aboutCounts);
}

// ------------------------------
// MAIN
// ------------------------------
(async function main() {
  try {
    console.log("🚀 Seed start (tsx)");
    await resetTables();
    await seedProjects();
    await seedAbout();
    await verifyStats();
    console.log("🎉 Seed done");
    process.exit(0);
  } catch (err: any) {
    console.error("❌ Seed failed:", err?.message ?? err);
    process.exit(1);
  }
})();