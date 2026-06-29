// lib/social.ts
// Source unique de vérité pour les liens sociaux assainis.
// Tolère une variable d'env malformée (virgule, espaces, double-encodage)
// sans dupliquer la logique dans chaque composant.

export function sanitizeUrl(raw: string | undefined, fallback = ""): string {
  const candidate = (raw ?? "").split(",")[0].trim();
  if (!candidate) return fallback;
  try {
    const withScheme = candidate.startsWith("http") ? candidate : `https://${candidate}`;
    return new URL(withScheme).href;
  } catch {
    return fallback;
  }
}

export const LINKEDIN_URL = sanitizeUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL);

// Extrait l'URL GitHub depuis NEXT_PUBLIC_SAME_AS (liste séparée par virgules).
// Exemple : "https://linkedin.com/in/...,https://github.com/Aiyeesha"
export const GITHUB_URL = (() => {
  const sameAs = process.env.NEXT_PUBLIC_SAME_AS ?? "";
  const parts = sameAs.split(",").map((s) => s.trim());
  const gh = parts.find((u) => u.toLowerCase().includes("github.com"));
  return sanitizeUrl(gh);
})();
