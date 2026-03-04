"use client";

// TrustedBy.tsx
// -------------
// Section "Ils m'ont fait confiance" — affichée tant que les témoignages réels
// ne sont pas disponibles (NEXT_PUBLIC_SHOW_TESTIMONIALS !== "true").
//
// Fonctionnement :
// - Logos en niveaux de gris par défaut (filter: grayscale)
// - Hover : passage en couleur (filter: none) avec transition douce
// - Alt text descriptif pour l'accessibilité
// - Aucun placeholder texte visible en production
//
// Pour ajouter une entreprise : ajouter un objet dans `companies` et
// déposer le logo dans /public/companies/ (format .webp ou .svg recommandé).

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { useTranslations } from "next-intl";

// Définition des entreprises/organismes associés
// Mettre is_visible: false pour masquer temporairement sans supprimer
const companies: {
  id: string;
  name: string;
  /** Chemin dans /public/companies/ */
  logo: string;
  /** Largeur d'affichage en pixels */
  width: number;
  height: number;
  is_visible: boolean;
}[] = [
  {
    id: "ld-digitales",
    name: "LD Digitales",
    logo: "/companies/ld-digitales.webp",
    width: 120,
    height: 40,
    is_visible: true
  },
  {
    id: "midrange",
    name: "Midrange Group",
    logo: "/companies/midrange.webp",
    width: 120,
    height: 40,
    is_visible: true
  },
  {
    id: "openclassrooms",
    name: "OpenClassrooms",
    logo: "/companies/openclassrooms.svg",
    width: 160,
    height: 44,
    is_visible: true
  },
  {
    id: "greta",
    name: "GRETA du Val d'Oise",
    logo: "/companies/greta.svg",
    width: 160,
    height: 44,
    is_visible: true
  },
  {
    id: "lycee-jouvet",
    name: "Lycée Louis Jouvet",
    logo: "/companies/lycee-jouvet.svg",
    width: 160,
    height: 44,
    is_visible: true
  }
];

export default function TrustedBy() {
  const t = useTranslations();

  // Filtrer uniquement les logos visibles
  const visible = companies.filter((c) => c.is_visible);

  // Si aucun logo n'est disponible, ne rien afficher
  // (évite une section vide en production)
  if (visible.length === 0) return null;

  return (
    <Reveal>
      <div className="text-center">
        {/* Titre de section sobre */}
        <p className="text-sm font-medium uppercase tracking-widest text-muted-2">
          {t("trustedBy.title")}
        </p>

        {/* Logos — niveaux de gris + hover couleur */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {visible.map((company, i) => (
            <Reveal key={company.id} delayMs={i * 60}>
              <div
                className="
                  relative flex items-center justify-center
                  opacity-50 grayscale transition-all duration-300
                  hover:opacity-100 hover:grayscale-0
                "
                title={company.name}
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={company.width}
                  height={company.height}
                  className="object-contain"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
