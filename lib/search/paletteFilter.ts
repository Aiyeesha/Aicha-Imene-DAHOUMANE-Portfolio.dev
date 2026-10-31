// lib/search/paletteFilter.ts
// ---------------------------
// Filter for the ⌘K palette (cmdk `filter` prop). cmdk's default scorer is a
// fuzzy subsequence match: "pfsense" then matches any title containing those
// letters in order, and Enter opens the wrong result. Here every word typed
// must appear as-is (case and accents ignored) in the title or a keyword,
// and title matches rank above keyword-only matches.

/** Separates the visible title from the unique id inside an item's value. */
export const VALUE_SEPARATOR = "␟";

/** Lowercase, without accents, so "securite" finds "Sécurité". */
export function normalize(text: string): string {
  return text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

/**
 * Score between 0 (hidden) and 1. `value` is the item's value (title, then
 * optionally VALUE_SEPARATOR and an id that is ignored); `keywords` are the
 * item's extra search terms.
 */
export function paletteFilter(value: string, search: string, keywords: string[] = []): number {
  const words = normalize(search).split(/\s+/).filter(Boolean);
  if (words.length === 0) return 1;

  const title = normalize(value.split(VALUE_SEPARATOR)[0]);
  const extra = normalize(keywords.join(" "));

  let score = 0;
  for (const word of words) {
    const inTitle = title.indexOf(word);
    if (inTitle === 0) score += 1;
    // Start of a word in the title ("apex" in "Backend Apex")
    else if (inTitle > 0 && /[^\p{L}\p{N}]/u.test(title[inTitle - 1])) score += 0.8;
    else if (inTitle > 0) score += 0.6;
    else if (extra.includes(word)) score += 0.4;
    else return 0; // every word must match somewhere
  }
  return score / words.length;
}
