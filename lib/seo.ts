// lib/seo.ts
// ----------
// Gabarit unique des balises <title> et borne des meta descriptions.
//
// Audit 2026-10-23 (SEO-1, SEO-2) :
//   - les pages statiques utilisaient « X — Aïcha Imène DAHOUMANE » mais les
//     fiches projet et les articles « X | Aïcha Imène DAHOUMANE — Salesforce &
//     IT Ops » : deux gabarits, et jusqu'à 156 caractères (Google tronque vers
//     60). Un seul gabarit, sans suffixe de parcours, pour toutes les pages ;
//   - les descriptions des fiches et articles (reprises du contenu) allaient
//     jusqu'à 351 caractères ; Google en affiche ~155-160. Elles sont bornées à
//     160 caractères, coupées à une frontière de mot.
//
// Pour raccourcir le suffixe sur tout le site (ex. « A. I. DAHOUMANE »), il
// suffit de modifier TITLE_SUFFIX — c'est l'unique source.

export const TITLE_SUFFIX = "Aïcha Imène DAHOUMANE";

/** Titre de page selon le gabarit unique : « {titre} — Aïcha Imène DAHOUMANE ». */
export function pageTitle(title: string): string {
  return `${title} — ${TITLE_SUFFIX}`;
}

const DESCRIPTION_MAX = 160;

/**
 * Borne une meta description à 160 caractères : coupe à la dernière frontière
 * de mot avant la limite et ajoute « … ». Les espaces multiples et retours à
 * la ligne (fréquents dans les contenus MDX) sont normalisés.
 */
export function clampDescription(text: string, max = DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, " ").trim();
  // Comparaison en points de code (« é », « — » comptent pour 1).
  const chars = [...clean];
  if (chars.length <= max) return clean;
  const cut = chars.slice(0, max - 1).join("");
  const lastSpace = cut.lastIndexOf(" ");
  // Coupe au dernier espace s'il n'est pas trop loin ; ponctuation finale retirée.
  const base = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut;
  return `${base.replace(/[\s,;:.\-—–]+$/u, "")}…`;
}
