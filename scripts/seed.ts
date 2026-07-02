/**
 * Seed Supabase depuis :
 * - content/projects.ts
 * - content/projectDetails.ts
 * - content/about.ts
 * - content/certifications.ts
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
import { certifications } from "../content/certifications";
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
 */
function buildProjectRow(params: {
  locale: "en" | "fr";
  base: ProjectListItem;
  detailsRaw?: AnyObj | null;
}) {
  const { locale, base, detailsRaw } = params;

  const slug = normalizeSlug(base.slug);
  const locales = detailsRaw?.locales ?? {};
  const d = (locale === "fr" ? locales.fr : locales.en) ?? null;

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

    status: "published",
  };
}

// ------------------------------
// 3) Reset tables
// ------------------------------
async function resetTables() {
  const tables = ["project_assets", "projects", "certifications", "about_pages"] as const;

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
  }

  console.log(`📤 Inserting ${rows.length} rows into public.projects ...`);
  const { error } = await supabase.from("projects").insert(rows);

  if (error) {
    throw new Error(`Insert projects failed: ${error.message}`);
  }

  console.log(`✅ Projects inserted: ${rows.length} rows (EN + FR)`);
}


// ------------------------------
// 5) Seed About (FR/EN)
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
  ];

  const { error } = await supabase
    .from("about_pages")
    .upsert(rows, { onConflict: "locale" });

  if (error) {
    throw new Error(`Upsert about_pages failed: ${error.message}`);
  }

  console.log(`✅ about_pages upserted: ${rows.length} rows (EN + FR)`);
}

// ------------------------------
// 6) Seed Certifications (EN + FR fallback)
// ------------------------------
async function seedCertifications() {
  console.log("📦 Seeding certifications from content/certifications.ts ...");

  const frFallback = (enText: string) => enText; // fallback rapide (tu pourras remplacer par vraie traduction)

  const rows: AnyObj[] = [];
  const list = certifications as AnyObj[];

  list.forEach((c, idx) => {
    const common = {
      name: c.title ?? c.name,
      issuer: c.issuer ?? "Salesforce",
      badge_image_url: c.badgeImage ?? c.badge_image_url ?? null,
      credential_url: c.credentialUrl ?? c.credential_url ?? null,
      obtained_at: null,
      expires_at: null,
      earned_label: c.earnedDate ?? c.earned_label ?? null,
      description: c.description ?? null,
      skills: toArray<string>(c.skills),
      sort_order: Number.isFinite(c.sortOrder) ? c.sortOrder : idx + 1,
      status: "published",
    };

    rows.push({ locale: "en", ...common });

    rows.push({
      locale: "fr",
      ...common,
      description: c.descriptionFr ?? frFallback(c.description ?? ""),
    });
  });

  const { error } = await supabase.from("certifications").insert(rows);
  if (error) throw new Error(`Insert certifications failed: ${error.message}`);

  console.log(`✅ certifications inserted: ${rows.length} rows (EN + FR)`);
}

// ------------------------------
// 7) Verify (stats)
// ------------------------------
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

  const { data: cData, error: cErr } = await supabase.from("certifications").select("locale");
  if (cErr) throw new Error(`Verify certifications failed: ${cErr.message}`);

  const aboutCounts = (aData ?? []).reduce((acc: Record<string, number>, r: AnyObj) => {
    acc[r.locale] = (acc[r.locale] ?? 0) + 1;
    return acc;
  }, {});

  const certCounts = (cData ?? []).reduce((acc: Record<string, number>, r: AnyObj) => {
    acc[r.locale] = (acc[r.locale] ?? 0) + 1;
    return acc;
  }, {});

  console.log("📊 Projects locale counts:", localeCounts);
  console.log("🧩 Projects rows with sections:", withSections);
  console.log("🖼️ Projects rows with gallery:", withGallery);
  console.log("🏷️ Projects rows with hero_subtitle:", withHeroSubtitle);
  console.log("📄 About locale counts:", aboutCounts);
  console.log("🎓 Certifications locale counts:", certCounts);
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
    await seedCertifications();
    await verifyStats();
    console.log("🎉 Seed done");
    process.exit(0);
  } catch (err: any) {
    console.error("❌ Seed failed:", err?.message ?? err);
    process.exit(1);
  }
})();