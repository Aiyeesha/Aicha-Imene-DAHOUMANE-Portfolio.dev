/**
 * Export Supabase `projects` (source of truth in production) → the two
 * legacy TS content files, so they stop drifting from what's actually live:
 *   - content/projects.ts        (per-slug, non-localized/shared fields)
 *   - content/projectDetails.ts  (per-slug, per-locale sections/gallery)
 *
 * Why this exists: content/projects.ts + content/projectDetails.ts are also
 * the ONLY inputs to scripts/seed.ts, which does a full DELETE + re-insert
 * of the `projects` table. If those files are stale (as of writing this
 * script, they were — missing draft placeholders, missing is_bridge, and
 * carrying an older EN/FR section structure than what's live), running
 * seed.ts today would silently destroy real production content. Keeping
 * this export current is what makes these files a safe fallback if the
 * database is ever dropped, AND what keeps seed.ts non-destructive to run.
 *
 * This is the inverse of scripts/migrate-project-details.ts (which pushes
 * content/projectDetails.ts → Supabase). Re-run this any time Supabase
 * content changes and the TS files need to catch up.
 *
 * Usage:
 *   npx tsx scripts/export-projects-from-supabase.ts
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

const envLocalPath = path.resolve(process.cwd(), ".env.local");
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath, override: true });
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath, override: true });
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "Missing env vars:\n  - NEXT_PUBLIC_SUPABASE_URL\n  - SUPABASE_SERVICE_ROLE_KEY"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

type DbRow = {
  slug: string;
  locale: string;
  title: string | null;
  summary: string | null;
  hero_subtitle: string | null;
  sections: unknown[] | null;
  gallery: { src: string; alt: string }[] | null;
  tech_stack: string[] | null;
  repo_url: string | null;
  live_url: string | null;
  track: string | null;
  categories: string[] | null;
  tags: string[] | null;
  badge: { label: string; tone: string } | null;
  pdf_url: string | null;
  content_updated_at: string | null;
  highlights: string[] | null;
  featured: boolean | null;
  sort_order: number | null;
  status: string | null;
  is_bridge: boolean | null;
};

function jsonLiteral(value: unknown, indent = 2): string {
  return JSON.stringify(value, null, indent);
}

async function main() {
  const { data, error } = await supabase
    .from("projects")
    .select(
      `slug, locale, title, summary, hero_subtitle, sections, gallery,
       tech_stack, repo_url, live_url, track, categories, tags, badge,
       pdf_url, content_updated_at, highlights, featured, sort_order,
       status, is_bridge`
    )
    .order("track", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("slug", { ascending: true });

  if (error) {
    console.error("Fetch failed:", error.message);
    process.exit(1);
  }

  const rows = (data ?? []) as DbRow[];
  console.log(`Fetched ${rows.length} rows from Supabase.`);

  const bySlug = new Map<string, DbRow[]>();
  for (const row of rows) {
    const list = bySlug.get(row.slug) ?? [];
    list.push(row);
    bySlug.set(row.slug, list);
  }

  // Preserve the order the query already gives us (track, sort_order, slug),
  // deduped by slug in first-seen order.
  const slugOrder: string[] = [];
  for (const row of rows) {
    if (!slugOrder.includes(row.slug)) slugOrder.push(row.slug);
  }

  // ── content/projects.ts ──────────────────────────────────────────────────
  const projectEntries = slugOrder.map((slug) => {
    const localeRows = bySlug.get(slug)!;
    const en = localeRows.find((r) => r.locale === "en") ?? localeRows[0];

    const entry = {
      slug,
      title: en.title,
      excerpt: en.summary,
      track: en.track,
      categories: en.categories ?? [],
      tags: en.tags ?? [],
      ...(en.badge ? { badge: en.badge } : {}),
      ...(en.pdf_url ? { pdfUrl: en.pdf_url } : {}),
      ...(en.repo_url ? { repoUrl: en.repo_url } : {}),
      ...(en.live_url ? { liveUrl: en.live_url } : {}),
      ...(en.tech_stack && en.tech_stack.length > 0 ? { techStack: en.tech_stack } : {}),
      ...(en.content_updated_at ? { updatedAt: en.content_updated_at } : {}),
      ...(en.highlights && en.highlights.length > 0 ? { highlights: en.highlights } : {}),
      featured: Boolean(en.featured),
      sortOrder: en.sort_order ?? 0,
      status: en.status ?? "published",
      ...(en.is_bridge ? { isBridge: true } : {}),
    };

    return `  ${jsonLiteral(entry).replace(/\n/g, "\n  ")},`;
  });

  const projectsTs = `// AUTO-GENERATED — do not hand-edit.
// Exported from Supabase (public.projects) by scripts/export-projects-from-supabase.ts.
// Re-run that script after any content change in Supabase to keep this file current.
// Last export: ${new Date().toISOString()}
//
// Kept in sync so this file remains a safe fallback if the Supabase dependency
// is ever dropped, and so scripts/seed.ts (which reads this file) never
// re-publishes stale content over what's actually live.

export type Project = {
  slug: string;
  title: string | null;
  excerpt: string | null;
  track: string | null;
  categories: string[];
  tags: string[];
  badge?: { label: string; tone?: string; color?: string };
  pdfUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
  techStack?: string[];
  updatedAt?: string;
  highlights?: string[];
  featured: boolean;
  sortOrder: number;
  status: string;
  isBridge?: boolean;
};

export const projects: Project[] = [
${projectEntries.join("\n")}
];
`;

  fs.writeFileSync(path.resolve(process.cwd(), "content/projects.ts"), projectsTs, "utf-8");
  console.log(`Wrote content/projects.ts (${projectEntries.length} projects).`);

  // ── content/projectDetails.ts ────────────────────────────────────────────
  const detailEntries = slugOrder.map((slug) => {
    const localeRows = bySlug.get(slug)!;
    const byLocale: Record<string, DbRow> = {};
    for (const r of localeRows) byLocale[r.locale] = r;

    const gallery =
      byLocale.en?.gallery ?? byLocale.fr?.gallery ?? byLocale.es?.gallery ?? [];

    const locales: Record<string, unknown> = {};
    for (const loc of ["en", "fr", "es"] as const) {
      const r = byLocale[loc];
      if (!r) continue;
      locales[loc] = {
        ...(r.title ? { title: r.title } : {}),
        ...(r.hero_subtitle ? { heroSubtitle: r.hero_subtitle } : {}),
        sections: r.sections ?? [],
      };
    }

    const entry = { slug, gallery, locales };
    return `  ${jsonLiteral(entry).replace(/\n/g, "\n  ")},`;
  });

  const projectDetailsTs = `// AUTO-GENERATED — do not hand-edit.
// Exported from Supabase (public.projects) by scripts/export-projects-from-supabase.ts.
// Re-run that script after any content change in Supabase to keep this file current.
// Last export: ${new Date().toISOString()}

import type { GalleryImage } from "@/components/ImageGallery";

export type ProjectSection =
  | { type: "bullets"; title: string; items: string[] }
  | { type: "text"; title: string; paragraphs?: string[]; body?: string }
  | { type: "metrics"; title: string; items: { label: string; value: string; note?: string }[] }
  | { type: "timeline"; title: string; steps: { title?: string; label?: string; description: string }[] }
  | { type: "resources"; title: string; items: { label: string; href: string; note?: string }[] }
  | { type: "code"; title: string; language?: string; code: string; downloadUrl?: string };

export type ProjectDetails = {
  slug: string;
  locales?: {
    en?: { title?: string; heroSubtitle?: string; sections?: ProjectSection[] };
    fr?: { title?: string; heroSubtitle?: string; sections?: ProjectSection[] };
    es?: { title?: string; heroSubtitle?: string; sections?: ProjectSection[] };
  };
  gallery?: GalleryImage[];
};

/**
 * Per-project content (sections + gallery), mirrored from Supabase.
 * Screenshots live under /public/projects/<slug>/.
 */
export const projectDetails: ProjectDetails[] = [
${detailEntries.join("\n")}
];
`;

  fs.writeFileSync(
    path.resolve(process.cwd(), "content/projectDetails.ts"),
    projectDetailsTs,
    "utf-8"
  );
  console.log(`Wrote content/projectDetails.ts (${detailEntries.length} projects).`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
