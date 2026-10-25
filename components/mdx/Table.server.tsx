// Table.server.tsx
// ----------------
// Server Component : enveloppe des tableaux GFM (remark-gfm) des contenus MDX.
// Utilisé par mdx-components.tsx (mapping `table`).
//
// Audit 2026-10-23 (P2) : les tableaux larges des études de cas (ex. colonne
// « Déclencheur technique » d'idemconnect-apex-backend) ne doivent jamais
// élargir la page sur mobile. Jusqu'ici, le défilement horizontal reposait sur
// `display: block` appliqué au <table> lui-même (globals.css) ; ce hack retire
// au tableau sa sémantique de tableau pour certains lecteurs d'écran
// (VoiceOver/Safari notamment). Le défilement est désormais porté par un
// conteneur dédié, et le <table> garde son affichage natif.
//
// Accessibilité du conteneur défilable :
//   - tabIndex={0}  : atteignable au clavier, donc défilable aux flèches
//                     (règle axe `scrollable-region-focusable`, WCAG 2.1.1) ;
//   - role="region" + aria-label traduit : un élément focalisable doit avoir
//                     un rôle et un nom accessibles annoncés au lecteur d'écran.

import type { ComponentPropsWithoutRef } from "react";
import { getTranslations } from "next-intl/server";

export default async function TableServer(props: ComponentPropsWithoutRef<"table">) {
  // Locale résolue par next-intl à partir de la requête (segment [locale]).
  const t = await getTranslations("a11y");
  return (
    <div
      className="mdx-table-wrap soft-ring"
      tabIndex={0}
      role="region"
      aria-label={t("scrollableTable")}
    >
      <table {...props} />
    </div>
  );
}
