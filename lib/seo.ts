// lib/seo.ts
// ----------
// Single <title> template and meta description length limit.
// Every page uses "{title} — Aïcha Imène DAHOUMANE" (no track suffix, short
// enough for Google's ~60 characters), and descriptions are capped at 160
// characters on a word boundary. TITLE_SUFFIX is the only place to change the
// suffix site-wide.

export const TITLE_SUFFIX = "Aïcha Imène DAHOUMANE";

/** Page title from the shared template: "{title} — Aïcha Imène DAHOUMANE". */
export function pageTitle(title: string): string {
  return `${title} — ${TITLE_SUFFIX}`;
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
