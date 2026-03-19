"use client";

// TrustedBy.tsx
// -------------
// Section "Ils m'ont fait confiance" — affichée tant que les témoignages réels
// ne sont pas disponibles (NEXT_PUBLIC_SHOW_TESTIMONIALS !== "true").
//
// Comportement :
// - Défilement horizontal automatique infini (marquee CSS Tailwind)
// - Logos en niveaux de gris → passage en couleur au hover de la bande entière
// - Duplication invisible du tableau pour un loop sans saut (aria-hidden sur le doublon)
// - prefers-reduced-motion : animation stoppée, logos statiques centrés
// - Pause au hover : group-hover sur le conteneur suspend l'animation
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
  }
];

// Bloc logo individuel — réutilisé dans les deux passes du marquee
function LogoItem({ company }: { company: (typeof companies)[0] }) {
  return (
    <div
      className="
        flex-shrink-0
        relative flex items-center justify-center
        opacity-50 grayscale transition-all duration-300
        group-hover:opacity-90 group-hover:grayscale-0
      "
      title={company.name}
    >
      <Image
        src={company.logo}
        alt={company.name}
        width={company.width}
        height={company.height}
        loading="lazy"
        className="object-contain"
        style={{ height: "auto" }}
      />
    </div>
  );
}

export default function TrustedBy() {
  const t = useTranslations();

  // Filtrer uniquement les logos visibles
  const visible = companies.filter((c) => c.is_visible);

  // Si aucun logo n'est disponible, ne rien afficher
  if (visible.length === 0) return null;

  return (
    <Reveal>
      <div className="text-center">
        {/* Titre de section sobre */}
        <p className="text-sm font-medium uppercase tracking-widest text-muted-2">
          {t("trustedBy.title")}
        </p>

        {/* ── Bande de défilement ───────────────────────────────────────────── */}
        {/* Cas normal      : overflow-hidden + animate-marquee (défilement infini)
            Reduced motion  : overflow visible + flex-wrap centré (pas de scroll)
            group-hover     : pause au survol de la bande entière */}
        {/* role="region" est requis pour que aria-label soit reconnu par les lecteurs
            d'écran (un <div> sans role ARIA ignore son aria-label — violation ARIA 1.2).
            La région est nommée par le <p> précédent, confirmé par aria-label. */}
        <div
          role="region"
          aria-label={t("trustedBy.title")}
          className="
            group mt-8 w-full
            overflow-hidden motion-reduce:overflow-visible
          "
        >
          <div
            className="
              flex items-center gap-12 md:gap-16
              w-max motion-reduce:w-full
              animate-marquee
              motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center
              group-hover:[animation-play-state:paused]
            "
          >
            {/* Première passe — contenu accessible */}
            {visible.map((company) => (
              <LogoItem key={`a-${company.id}`} company={company} />
            ))}

            {/* Deuxième passe — doublon visuel masqué des lecteurs d'écran
                (ignoré dans le cas motion-reduce car display:none via motion-reduce) */}
            <div
              aria-hidden="true"
              className="contents motion-reduce:hidden"
            >
              {visible.map((company) => (
                <LogoItem key={`b-${company.id}`} company={company} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
