import fs from "node:fs";
import path from "node:path";
import { parseFrontmatter } from "@/lib/frontmatter";
import { isValidSlug } from "@/lib/security/slug";

export type BlogLocale = "en" | "fr" | "es";

export type BlogFrontmatter = {
  title?: string;
  excerpt?: string;
  date?: string; // YYYY-MM-DD
  /** Date of the last content update (YYYY-MM-DD), distinct from the publication date. */
  updatedDate?: string;
  tags?: string[];
  cover?: string; // /blog/<slug>/cover.jpg (optional)
  /** Case studies applying the post's technique (project slugs, or "colophon"). */
  projects?: string[];
};

export type BlogPostMeta = {
  slug: string;
  locale: BlogLocale;
  title: string;
  excerpt: string;
  date: string;
  /** See BlogFrontmatter.updatedDate: shown as "Updated on …" and used as dateModified. */
  updatedDate?: string;
  tags: string[];
  cover?: string;
  /** See BlogFrontmatter.projects: shown as "Applied in". */
  projects: string[];
  readingTime: number; // estimated minutes
  file: string; // absolute path (server-only)
};

/**
 * gray-matter (via js-yaml) turns "YYYY-MM-DD" into a Date at runtime even
 * though the type says string: normalise back to "YYYY-MM-DD".
 */
function normalizeDate(raw: unknown): string | undefined {
  if (raw instanceof Date) return raw.toISOString().slice(0, 10);
  return typeof raw === "string" && raw ? raw : undefined;
}

/** Estimate reading time in minutes from raw MDX content.
 * Text prose: 200 wpm. Code blocks: 40 wpm (readers parse code more slowly).
 */
function calcReadingTime(content: string): number {
  let codeWords = 0;
  const noCode = content.replace(/```[\s\S]*?```/g, (block) => {
    // Strip the opening/closing fence lines, count only the code body
    const body = block.replace(/^```[^\n]*\n?/, "").replace(/```$/, "");
    codeWords += body.trim().split(/\s+/).filter(Boolean).length;
    return "";
  });
  const proseWords = noCode.trim().split(/\s+/).filter(Boolean).length;
  const minutes = proseWords / 200 + codeWords / 40;
  return Math.max(1, Math.round(minutes));
}

function postsDir(locale: BlogLocale) {
  // content/blog/posts/<locale>/*.mdx
  return path.join(process.cwd(), "content", "blog", "posts", locale);
}

export function readAllPosts(locale: BlogLocale): BlogPostMeta[] {
  const dir = postsDir(locale);
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .sort();

  const out: BlogPostMeta[] = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    // A file name that is not kebab-case is skipped: the slug ends up in hrefs
    // and paths and must never contain special characters.
    if (!isValidSlug(slug)) continue;
    const abs = path.join(dir, file);
    const raw = fs.readFileSync(abs, "utf-8");
    const parsed = parseFrontmatter(raw);
    const fm = (parsed.data || {}) as BlogFrontmatter;

    const title = fm.title || slug.replace(/-/g, " ");
    const excerpt = fm.excerpt || "";
    // gray-matter (via js-yaml) auto-casts "YYYY-MM-DD" to a JS Date object
    // at runtime, even though the type says `string | undefined`.
    // Cast to unknown first so the instanceof check compiles cleanly.
    const rawDate: unknown = fm.date;
    const date =
      rawDate instanceof Date
        ? rawDate.toISOString().slice(0, 10)
        : typeof rawDate === "string" && rawDate
          ? rawDate
          : "1970-01-01";
    const updatedDate = normalizeDate(fm.updatedDate);
    const tags = Array.isArray(fm.tags) ? fm.tags : [];
    const cover = fm.cover;
    const projects = Array.isArray(fm.projects) ? fm.projects : [];
    const readingTime = calcReadingTime(String(parsed.content || ""));

    out.push({
      slug,
      locale,
      title,
      excerpt,
      date,
      updatedDate,
      tags,
      cover,
      projects,
      readingTime,
      file: abs
    });
  }

  return out.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function readPostMeta(locale: BlogLocale, slug: string): BlogPostMeta | null {
  // The slug comes from the URL: reject anything that is not a kebab-case
  // slug (in particular "../") before path.join.
  if (!isValidSlug(slug)) return null;
  const dir = postsDir(locale);
  const abs = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(abs)) return null;

  const raw = fs.readFileSync(abs, "utf-8");
  const parsed = parseFrontmatter(raw);
  const fm = (parsed.data || {}) as BlogFrontmatter;

  return {
    slug,
    locale,
    title: fm.title || slug.replace(/-/g, " "),
    excerpt: fm.excerpt || "",
    date: (() => {
      // Same normalisation as in readAllPosts: js-yaml can return a Date object.
      const raw: unknown = fm.date;
      return raw instanceof Date
        ? raw.toISOString().slice(0, 10)
        : typeof raw === "string" && raw
          ? raw
          : "1970-01-01";
    })(),
    updatedDate: normalizeDate(fm.updatedDate),
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    cover: fm.cover,
    projects: Array.isArray(fm.projects) ? fm.projects : [],
    readingTime: calcReadingTime(String(parsed.content || "")),
    file: abs
  };
}
