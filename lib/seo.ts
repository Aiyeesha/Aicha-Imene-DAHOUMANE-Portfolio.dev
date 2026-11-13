// lib/seo.ts
// ----------
// Single <title> template and meta description length limit.
// Every page uses "{title} — Aïcha Imène DAHOUMANE" (no track suffix, short
// enough for Google's ~60 characters), and descriptions are capped at 160
// characters on a word boundary. TITLE_SUFFIX is the only place to change the
// suffix site-wide.

export const TITLE_SUFFIX = "Aïcha Imène DAHOUMANE";

/**
 * Beyond about 60–65 characters Google truncates the title in its results,
 * and the suffix is the first part lost. Long titles (some blog posts and
 * projects reach 90–125 characters with the suffix) therefore drop it: the
 * subject of the page stays readable and the name remains in og:site_name,
 * the JSON-LD author and the page itself.
 */
export const TITLE_MAX = 65;

/**
 * Page title from the shared template: "{title} — Aïcha Imène DAHOUMANE",
 * or the bare title when the full form would exceed TITLE_MAX characters.
 */
export function pageTitle(title: string): string {
  const full = `${title} — ${TITLE_SUFFIX}`;
  // Count code points ("é", "—" count as 1), like clampDescription.
  return [...full].length <= TITLE_MAX ? full : title;
}

const DESCRIPTION_MAX = 160;

/**
 * Caps a meta description at 160 characters: cuts at the last word boundary
 * before the limit and adds "…". Repeated spaces and newlines (common in MDX)
 * are normalised.
 */
export function clampDescription(text: string, max = DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, " ").trim();
  // Count code points ("é", "—" count as 1).
  const chars = [...clean];
  if (chars.length <= max) return clean;
  const cut = chars.slice(0, max - 1).join("");
  const lastSpace = cut.lastIndexOf(" ");
  // Cut at the last space unless it is too far back; trailing punctuation removed.
  const base = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut;
  return `${base.replace(/[\s,;:.\-—–]+$/u, "")}…`;
}

// ── Discoverable RSS feeds ─────────────────────────────────────────────────
// A page defining its own `alternates` (canonical, hreflang) replaces the
// whole object, dropping the root layout's feed links. Spread this into it:
// `alternates: { canonical, languages, ...rssAlternates(locale) }`.
const FEEDS: Record<string, { url: string; title: string }> = {
  en: { url: "/feed.xml", title: "RSS Feed (EN)" },
  fr: { url: "/feed-fr.xml", title: "Flux RSS (FR)" },
  es: { url: "/feed-es.xml", title: "Feed RSS (ES)" },
};

export function rssAlternates(locale: string) {
  const feed = FEEDS[locale] ?? FEEDS.en;
  return { types: { "application/rss+xml": [feed] } };
}
