/** Format a YYYY-MM-DD date string into a human-readable date. */
export function formatDate(dateStr: string, locale: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/** Detect which content track an article belongs to based on its tags. */
export function detectTrack(tags: string[]): "salesforce" | "itops" | null {
  const lower = tags.map((t) => t.toLowerCase());
  if (lower.includes("salesforce")) return "salesforce";
  if (lower.some((t) => t.includes("it ops") || t === "itops")) return "itops";
  return null;
}

/** Count tag frequency from a list of posts and return sorted pairs [tag, count]. */
export function getTopTags(
  allTags: string[][],
  limit: number
): string[] {
  const freq = new Map<string, number>();
  for (const tags of allTags) {
    for (const tag of tags) {
      freq.set(tag, (freq.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}
