"use client";

// ProjectClientLogo.tsx
// ----------------------
// Logo du client/organisme associé à une mission (affiché sur la fiche projet).
// Convention de stockage : bucket public "projects", chemin {slug}/logo.webp
// — même logique que {slug}/cover.webp pour les images de couverture.
//
// La majorité des projets n'a pas de logo (mission perso, lab, projet en
// préparation) : on ne rend RIEN dans ce cas, sans placeholder — contrairement
// à SafeImage/CoverImage qui affichent une icône de remplacement pour les
// images de couverture. Ici, l'absence est l'état normal pour la plupart des
// projets.
//
// Audit 2026-10-23 (P5) : auparavant, le chargement était TENTÉ pour chaque
// projet et l'échec masqué via onError — soit ~18 requêtes en 404 sur
// /fr/projects, chacune servie par une page HTML 404 complète. La présence du
// logo est désormais connue au build (lib/data/projectAssets.ts) : aucune
// requête n'est émise pour un logo inexistant. onError reste en filet de
// sécurité (fichier corrompu, manifeste non régénéré).

import Image from "next/image";
import { useState } from "react";
import { hasProjectLogo } from "@/lib/data/projectAssets";

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

  // Pas de logo connu pour ce projet → rien à demander au réseau.
  if (failed || !hasProjectLogo(slug)) return null;

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
