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
  file: string; // absolute path (server-only)
};

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
    const date = fm.date || "1970-01-01";
    const tags = Array.isArray(fm.tags) ? fm.tags : [];
    const cover = fm.cover;

    out.push({
      slug,
      locale,
      title,
      excerpt,
      date,
      tags,
      cover,
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
    date: fm.date || "1970-01-01",
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    cover: fm.cover,
    file: abs
  };
}
