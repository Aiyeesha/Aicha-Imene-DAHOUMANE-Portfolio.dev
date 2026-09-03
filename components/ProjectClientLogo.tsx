"use client";

// ProjectClientLogo.tsx
// ----------------------
// Logo du client/organisme associé à une mission (affiché sur la fiche projet).
// Convention de stockage : bucket public "projects", chemin {slug}/logo.webp
// — même logique que {slug}/cover.webp pour les images de couverture.
//
// La majorité des projets n'a pas de logo (mission perso, lab, projet en
// préparation) : on tente le chargement et on ne rend RIEN en cas d'échec,
// sans placeholder — contrairement à SafeImage/CoverImage qui affichent une
// icône de remplacement pour les images de couverture (toujours censées
// exister). Ici, l'absence est l'état normal pour la plupart des projets.

import Image from "next/image";
import { useState } from "react";

const STORAGE_CDN = "/projects";

// "md" — fiche détail (à côté du H1) : un seul par page, au-dessus de la ligne
//        de flottaison → chargement eager sûr, pas de coût réseau superflu.
// "sm" — cartes (grille /projects, Featured projects) : jusqu'à ~39 rendues
//        sur une même page, la plupart sans logo (404 silencieux). Un
//        chargement eager systématique enverrait des dizaines de requêtes
//        inutiles au premier rendu — lazy par défaut, comme CoverImage le
//        fait déjà pour les cartes de ces mêmes grilles.
const SIZES = {
  md: { boxClass: "h-8 max-w-[140px]", imgClass: "h-8 w-auto", width: 140, height: 32 },
  sm: { boxClass: "h-5 max-w-[90px]", imgClass: "h-5 w-auto", width: 90, height: 20 },
} as const;

type Props = {
  slug: string;
  alt: string;
  size?: keyof typeof SIZES;
  loading?: "eager" | "lazy";
};

export default function ProjectClientLogo({ slug, alt, size = "md", loading = "eager" }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  const { boxClass, imgClass, width, height } = SIZES[size];

  return (
    <div className={`relative w-auto shrink-0 ${boxClass}`}>
      <Image
        src={`${STORAGE_CDN}/${slug}/logo.webp`}
        alt={alt}
        width={width}
        height={height}
        className={`object-contain object-left ${imgClass}`}
        unoptimized
        loading={loading}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
