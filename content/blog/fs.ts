import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogLocale = "en" | "fr";

export type BlogFrontmatter = {
  title?: string;
  excerpt?: string;
  date?: string; // YYYY-MM-DD
  tags?: string[];
  cover?: string; // /blog/<slug>/cover.jpg (optional)
};

export type BlogPostMeta = {
  slug: string;
  locale: BlogLocale;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  cover?: string;
  readingTime: number; // estimated minutes
  file: string; // absolute path (server-only)
};

/** Estimate reading time in minutes from raw MDX content (strips code blocks). */
function calcReadingTime(content: string): number {
  const noCode = content.replace(/```[\s\S]*?```/g, "");
  const words = noCode.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
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
    const abs = path.join(dir, file);
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(abs, "utf-8");
    const parsed = matter(raw);
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
    const tags = Array.isArray(fm.tags) ? fm.tags : [];
    const cover = fm.cover;
    const readingTime = calcReadingTime(String(parsed.content || ""));

    out.push({
      slug,
      locale,
      title,
      excerpt,
      date,
      tags,
      cover,
      readingTime,
      file: abs
    });
  }

  return out.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function readPostMeta(locale: BlogLocale, slug: string): BlogPostMeta | null {
  const dir = postsDir(locale);
  const abs = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(abs)) return null;

  const raw = fs.readFileSync(abs, "utf-8");
  const parsed = matter(raw);
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
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    cover: fm.cover,
    readingTime: calcReadingTime(String(parsed.content || "")),
    file: abs
  };
}
