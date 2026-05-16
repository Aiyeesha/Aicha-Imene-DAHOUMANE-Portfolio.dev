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

/**
 * Traductions FR des tags anglais présents dans les frontmatters MDX.
 * Permet d'afficher les tags en français sans modifier les fichiers source.
 */
const TAG_FR: Record<string, string> = {
  "Security":         "Sécurité",
  "Backup":           "Sauvegarde",
  "Monitoring":       "Supervision",
  "Hardening":        "Durcissement",
  "Networking":       "Réseau",
  "Incident Response":"Gestion des incidents",
  "Virtualization":   "Virtualisation",
  "Performance":      "Performances",
  "Caching":          "Cache",
  "Deployment":       "Déploiement",
  "Testing":          "Tests",
  "Best Practices":   "Bonnes pratiques",
  "Database":         "Base de données",
  "Automation":       "Automatisation",
  "Animation":        "Animation",
  "Web":              "Web",
  "UI":               "Interface",
  "Scripts":          "Scripts",
};

/** Translate a tag to the target locale (passthrough for EN, maps known tags for FR). */
export function translateTag(tag: string, locale: string): string {
  if (locale !== "fr") return tag;
  return TAG_FR[tag] ?? tag;
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
