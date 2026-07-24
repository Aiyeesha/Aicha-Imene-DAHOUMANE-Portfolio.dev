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

const STORAGE_CDN = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/projects`;

export default function ProjectClientLogo({ slug, alt }: { slug: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <div className="relative h-8 w-auto max-w-[140px] shrink-0">
      <Image
        src={`${STORAGE_CDN}/${slug}/logo.webp`}
        alt={alt}
        width={140}
        height={32}
        className="h-8 w-auto object-contain object-left"
        unoptimized
        loading="eager"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
