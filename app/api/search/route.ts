// app/api/search/route.ts
// ----------------------
// Full-text blog search with MiniSearch:
// GET /api/search?q=apex&locale=en → JSON array of results.
// The index is built in memory on the first request and kept for the life of
// the server process.

import { NextResponse, type NextRequest } from "next/server";
import MiniSearch from "minisearch";
import { readAllPosts } from "@/content/blog/fs";
import fs from "node:fs";
import { parseFrontmatter } from "@/lib/frontmatter";
import type { BlogLocale } from "@/content/blog/fs";

export const revalidate = 86400;

type SearchDoc = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string;
  content: string;
  date: string;
  readingTime: number;
};

type SearchResult = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  readingTime: number;
};

/** Strip MDX/Markdown syntax to plain text for indexing. */
function stripMarkdown(src: string): string {
  return src
    .replace(/```[\s\S]*?```/g, "") // code blocks
    .replace(/`[^`]+`/g, "")        // inline code
    .replace(/#{1,6}\s+/g, " ")     // headings
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, "$1") // bold/italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")  // links
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")   // images
    .replace(/^\s*[-*>|]\s*/gm, " ")          // lists, blockquotes, tables
    .replace(/\s{2,}/g, " ")
    .trim();
}

// In-memory cache per locale — survives across requests in the same process.
const indexCache = new Map<BlogLocale, MiniSearch<SearchDoc>>();
const docsCache  = new Map<BlogLocale, SearchDoc[]>();

function buildIndex(locale: BlogLocale): { index: MiniSearch<SearchDoc>; docs: SearchDoc[] } {
  const cached = indexCache.get(locale);
  const docs   = docsCache.get(locale);
  if (cached && docs) return { index: cached, docs };

  const posts = readAllPosts(locale);
  const allDocs: SearchDoc[] = posts.map((post) => {
    let rawContent = "";
    try {
      const raw = fs.readFileSync(post.file, "utf-8");
      const parsed = parseFrontmatter(raw);
      rawContent = stripMarkdown(String(parsed.content || ""));
    } catch {
      // file unreadable — index metadata only
    }
    return {
      id: post.slug,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      tags: post.tags.join(" "),
      content: rawContent.slice(0, 10_000), // cap to avoid memory bloat
      date: post.date,
      readingTime: post.readingTime,
    };
  });

  const ms = new MiniSearch<SearchDoc>({
    fields: ["title", "excerpt", "tags", "content"],
    storeFields: ["slug", "title", "excerpt", "tags", "date", "readingTime"],
    searchOptions: {
      boost: { title: 3, tags: 2, excerpt: 1.5 },
      prefix: true,
      fuzzy: 0.15,
    },
  });
  ms.addAll(allDocs);

  indexCache.set(locale, ms);
  docsCache.set(locale, allDocs);
  return { index: ms, docs: allDocs };
}

export async function GET(request: NextRequest) {
  // Query capped at 64 characters: fuzzy + prefix search cost grows with length.
  const q      = (request.nextUrl.searchParams.get("q") ?? "").trim().slice(0, 64);
  const locale = (request.nextUrl.searchParams.get("locale") ?? "en") as BlogLocale;
  const validLocale: BlogLocale = locale === "fr" ? "fr" : locale === "es" ? "es" : "en";

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const { index } = buildIndex(validLocale);
  const raw = index.search(q).slice(0, 8);

  const results: SearchResult[] = raw.map((r) => ({
    slug: r.slug as string,
    title: r.title as string,
    excerpt: r.excerpt as string,
    tags: (r.tags as string).split(" ").filter(Boolean),
    date: r.date as string,
    readingTime: r.readingTime as number,
  }));

  return NextResponse.json({ results }, {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
