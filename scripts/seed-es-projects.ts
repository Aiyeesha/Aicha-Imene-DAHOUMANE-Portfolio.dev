/**
 * Ajoute les lignes locale = 'es' dans public.projects, à partir de
 * content/projects.ts + content/projectDetails.ts (bloc locales.es).
 *
 * Contrairement à seed.ts, ce script N'EFFACE RIEN : il insère uniquement
 * les lignes ES manquantes (idempotent — supprime d'abord ses propres
 * lignes ES avant de les réinsérer, ne touche jamais aux lignes fr/en).
 *
 * Usage :
 *   npx tsx scripts/seed-es-projects.ts
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath, override: true });
}

import { projectDetails } from "../content/projectDetails";
import { projects } from "../content/projects";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

type AnyObj = Record<string, any>;

function normalizeSlug(slug: unknown): string {
  return String(slug ?? "").trim();
}

function toArray<T>(x: unknown): T[] {
  return Array.isArray(x) ? (x as T[]) : [];
}

const detailsMap = new Map<string, AnyObj>();
for (const item of projectDetails as AnyObj[]) {
  const slug = normalizeSlug(item?.slug);
  if (slug) detailsMap.set(slug, item);
}

function buildEsRow(base: AnyObj, detailsRaw: AnyObj | null) {
  const slug = normalizeSlug(base.slug);
  const locales = detailsRaw?.locales ?? {};
  const d = locales.es ?? null;

  if (!d) {
    console.warn(`  ⚠️  No locales.es for slug "${slug}" — skipped`);
    return null;
  }

  const title = (d?.title as string) || (base.title as string) || slug;
  const heroSubtitle = (d?.heroSubtitle as string) || (base.subtitle as string) || null;
  const summary =
    (d?.excerpt as string) || (d?.summary as string) || (base.excerpt as string) || (base.description as string) || null;
  const highlights =
    toArray<string>(d?.highlights).length > 0 ? toArray<string>(d?.highlights) : toArray<string>(base.highlights);
  const gallery = detailsRaw?.gallery ?? base.gallery ?? null;
  const sections = d?.sections ?? null;

  const techStack = toArray<string>(base.techStack ?? base.tech_stack);
  const categories = toArray<string>(base.categories);
  const tags = toArray<string>(base.tags);
  const repoUrl = (base.repoUrl ?? base.repo_url ?? null) as string | null;
  const liveUrl = (base.liveUrl ?? base.live_url ?? null) as string | null;
  const pdfUrl = (base.pdfUrl ?? base.pdf_url ?? null) as string | null;
  const contentUpdatedAt =
    base.updatedAt && !Number.isNaN(Date.parse(base.updatedAt)) ? new Date(base.updatedAt).toISOString() : null;

  return {
    locale: "es",
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

(async function main() {
  console.log("Building ES rows from content/projects.ts + content/projectDetails.ts ...");

  const rows: AnyObj[] = [];
  for (const base of projects as AnyObj[]) {
    const slug = normalizeSlug(base.slug);
    const detailsRaw = detailsMap.get(slug) ?? null;
    const row = buildEsRow(base, detailsRaw);
    if (row) rows.push(row);
  }

  console.log(`Built ${rows.length} ES rows (out of ${projects.length} projects).`);

  console.log("Deleting any existing locale='es' rows (idempotent re-run safety) ...");
  const { error: delError } = await supabase.from("projects").delete().eq("locale", "es");
  if (delError) throw new Error(`Delete existing ES rows failed: ${delError.message}`);

  console.log(`Inserting ${rows.length} ES rows ...`);
  const { error: insError } = await supabase.from("projects").insert(rows);
  if (insError) throw new Error(`Insert ES rows failed: ${insError.message}`);

  console.log("Done. Verifying ...");
  const { data, error: verifyError } = await supabase.from("projects").select("locale").eq("locale", "es");
  if (verifyError) throw new Error(`Verify failed: ${verifyError.message}`);
  console.log(`✅ ${data?.length ?? 0} rows with locale='es' now in public.projects`);
})().catch((err) => {
  console.error("Failed:", err?.message ?? err);
  process.exit(1);
});
