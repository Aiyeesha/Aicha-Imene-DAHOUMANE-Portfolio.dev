import { readAllPosts } from "./fs";

export function getPrevNext(
  locale: "en" | "fr",
  slug: string
): { prev?: { slug: string; title: string }; next?: { slug: string; title: string } } {
  const posts = readAllPosts(locale); // already sorted by date desc
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};

  const prev = posts[idx + 1]; // older
  const next = posts[idx - 1]; // newer

  return {
    prev: prev ? { slug: prev.slug, title: prev.title } : undefined,
    next: next ? { slug: next.slug, title: next.title } : undefined
  };
}

export function getAllTags(locale: "en" | "fr") {
  const posts = readAllPosts(locale);
  const map = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.tags) map.set(t, (map.get(t) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
