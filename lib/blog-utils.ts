/** Format a YYYY-MM-DD date string into a human-readable date. */
export function formatDate(dateStr: string, locale: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : locale === "es" ? "es-ES" : "en-US", {
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
 * Translations of the English tags used in MDX frontmatter, so tags display in
 * the reader's language without editing the source files. Frontmatter tags are
 * canonical English in every locale (filters, /feed/<tag>, related posts and
 * ?tag= links then match across languages); __tests__/blog-tags.test.ts
 * enforces it.
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
  "Integration":      "Intégration",
  "Development":      "Développement",
  "Data Integrity":   "Intégrité des données",
  "Lessons learned":  "Retour d'expérience",
  "Network":          "Réseau",
  "Firewall":         "Pare-feu",
};

const TAG_ES: Record<string, string> = {
  "Security":         "Seguridad",
  "Backup":           "Copias de seguridad",
  "Monitoring":       "Supervisión",
  "Hardening":        "Bastionado",
  "Networking":       "Redes",
  "Incident Response":"Gestión de incidentes",
  "Virtualization":   "Virtualización",
  "Performance":      "Rendimiento",
  "Caching":          "Cache",
  "Deployment":       "Despliegue",
  "Testing":          "Pruebas",
  "Best Practices":   "Buenas prácticas",
  "Database":         "Base de datos",
  "Automation":       "Automatización",
  "Animation":        "Animación",
  "Web":              "Web",
  "UI":               "Interfaz",
  "Scripts":          "Scripts",
  "Integration":      "Integración",
  "Development":      "Desarrollo",
  "Data Integrity":   "Integridad de datos",
  "Lessons learned":  "Retrospectiva",
  "Network":          "Red",
  "Support":          "Soporte",
  // Same word in French, not in Spanish (shown on /es/blog/tags and feed-es.xml).
  "Architecture":     "Arquitectura",
};

/** Translate a tag to the target locale (passthrough for EN, maps known tags for FR/ES). */
export function translateTag(tag: string, locale: string): string {
  if (locale === "fr") return TAG_FR[tag] ?? tag;
  if (locale === "es") return TAG_ES[tag] ?? tag;
  return tag;
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
