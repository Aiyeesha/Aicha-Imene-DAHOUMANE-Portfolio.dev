"use client";

// TechStackGrid.tsx
// -----------------
// Grille interactive de la stack technique.
// Chaque technologie est représentée par un badge coloré par catégorie.
// Tooltip au hover : niveau de maîtrise (barres), années d'expérience, contexte.
//
// Comportement :
// - Badge : abbr colorée + nom court
// - Tooltip CSS pur (pas de JS) : visible au hover/focus, positionné au-dessus
// - Niveau : 4 pastilles pleines/vides (● ● ● ○) avec couleur adaptée
// - Accessibilité : focus-visible ring, role="tooltip", aria-describedby
// - prefers-reduced-motion : tooltip sans transition
// - Track-aware : contenu différent Salesforce vs IT Ops
// - Locale-aware : contexte en EN ou FR

import { useTrack } from "@/app/[locale]/providers";
import { useLocale } from "next-intl";
import Reveal from "@/components/Reveal";
import {
  getTechStack,
  LEVEL_LABELS,
  CATEGORY_COLORS,
  type TechItem,
  type TechLevel,
  type Locale,
} from "@/content/tech-stack";

const LOCALES: Locale[] = ["en", "fr", "es"];
function toLocale(locale: string): Locale {
  return (LOCALES as string[]).includes(locale) ? (locale as Locale) : "en";
}

// ── Sous-composant : pastilles de niveau ──────────────────────────────────
function LevelDots({ level }: { level: TechLevel }) {
  // 4 pastilles — pleines jusqu'au niveau, vides après
  return (
    <span className="flex items-center gap-0.5" aria-hidden="true">
      {([1, 2, 3, 4] as TechLevel[]).map((n) => (
        <span
          key={n}
          className={[
            "inline-block h-2 w-2 rounded-full",
            n <= level
              ? "bg-cyan-500 dark:bg-cyan-400"
              : "bg-black/15 dark:bg-white/15",
          ].join(" ")}
        />
      ))}
    </span>
  );
}

// ── Alignement du tooltip selon la colonne ────────────────────────────────
// Audit 2026-10-23 (P2) : le tooltip (w-52, soit 208 px) était toujours centré
// sur sa carte. Sur mobile, les cartes font ~100 px de large : celui des
// cartes de la dernière colonne dépassait à droite et, même invisible
// (opacity-0 — il reste dans le flux de mise en page), élargissait la page
// (/about mesuré à 403-420 px de large pour un viewport de 390 px). Celui des
// cartes de la première colonne dépassait à gauche et était coupé à l'affichage.
// Correctif : aligner le tooltip sur le bord gauche de la carte en première
// colonne, sur le bord droit en dernière colonne, centré ailleurs. Le nombre
// de colonnes suit les breakpoints de la grille (3 / sm:4 / md:5) ; à partir
// de lg (6 colonnes, cartes larges) le centrage ne déborde plus et est rétabli.
// Les classes sont écrites en toutes lettres (pas de concaténation) pour que
// Tailwind les détecte à la compilation.
const ALIGN_LEFT = {
  base: "left-0 translate-x-0 after:left-1/4",
  sm: "sm:left-0 sm:right-auto sm:translate-x-0 sm:after:left-1/4",
  md: "md:left-0 md:right-auto md:translate-x-0 md:after:left-1/4",
} as const;
const ALIGN_RIGHT = {
  base: "left-auto right-0 translate-x-0 after:left-3/4",
  sm: "sm:left-auto sm:right-0 sm:translate-x-0 sm:after:left-3/4",
  md: "md:left-auto md:right-0 md:translate-x-0 md:after:left-3/4",
} as const;
const ALIGN_CENTER = {
  base: "left-1/2 -translate-x-1/2 after:left-1/2",
  sm: "sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:after:left-1/2",
  md: "md:left-1/2 md:right-auto md:-translate-x-1/2 md:after:left-1/2",
} as const;
const COLUMNS = { base: 3, sm: 4, md: 5 } as const;

function tooltipAlignClasses(index: number): string {
  const parts: string[] = (Object.keys(COLUMNS) as (keyof typeof COLUMNS)[]).map((bp) => {
    const col = index % COLUMNS[bp];
    if (col === 0) return ALIGN_LEFT[bp];
    if (col === COLUMNS[bp] - 1) return ALIGN_RIGHT[bp];
    return ALIGN_CENTER[bp];
  });
  // lg et au-delà : centrage d'origine.
  parts.push("lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:after:left-1/2");
  return parts.join(" ");
}

// ── Sous-composant : badge individuel + tooltip ───────────────────────────
function TechCard({ tech, locale, index }: { tech: TechItem; locale: string; index: number }) {
  const safeLocale = toLocale(locale);
  const colors  = CATEGORY_COLORS[tech.category];
  const label   = LEVEL_LABELS[tech.level][safeLocale];
  const context = tech.context[safeLocale];
  const yearsLabel = locale === "fr"
    ? `${tech.years} an${tech.years > 1 ? "s" : ""}`
    : locale === "es"
    ? `${tech.years} año${tech.years !== 1 ? "s" : ""}`
    : `${tech.years} yr${tech.years !== 1 ? "s" : ""}`;

  // id unique pour aria-describedby
  const tooltipId = `tooltip-${tech.id}`;

  return (
    // group — permet au hover/focus d'activer les classes group-hover:
    // Pas de role="button" : cet élément ne fait qu'afficher un tooltip au focus/hover,
    // il n'a aucun gestionnaire de clic/clavier — role="button" sans action associée
    // trompait les lecteurs d'écran et les utilisateurs clavier (WCAG 4.1.2 / 2.1.1).
    <div className="group relative" tabIndex={0} aria-describedby={tooltipId}>
      {/* ── Badge ──────────────────────────────────────────────────────── */}
      <div
        className={[
          "flex flex-col items-center gap-1.5 rounded-2xl border p-3",
          "cursor-default select-none",
          "transition-all duration-200",
          "hover:scale-105 focus-visible:scale-105",
          "soft-ring outline-hidden",
          colors.bg,
          colors.border,
        ].join(" ")}
      >
        {/* Abréviation — 2-3 lettres, stylisée */}
        <span
          className={[
            "font-display font-bold text-base leading-none",
            colors.text,
          ].join(" ")}
          aria-hidden="true"
        >
          {tech.abbr}
        </span>

        {/* Nom complet — court, tronqué si nécessaire */}
        <span className="text-[10px] font-medium text-center text-muted-2 leading-tight max-w-[60px] truncate">
          {tech.name}
        </span>
      </div>

      {/* ── Tooltip ────────────────────────────────────────────────────── */}
      {/* Positionné au-dessus du badge, centré horizontalement.
          invisible → visible au hover/focus via group-hover: / group-focus:
          translate-y-1 → translate-y-0 pour effet de surgissement.
          z-50 pour passer au-dessus des autres éléments. */}
      <div
        id={tooltipId}
        role="tooltip"
        className={[
          // Positionnement — horizontal selon la colonne (voir tooltipAlignClasses)
          "absolute bottom-full mb-2 z-50",
          tooltipAlignClasses(index),
          "w-52",
          // Apparence
          "rounded-xl border border-black/10 dark:border-white/10",
          "bg-white/95 dark:bg-[#0d1b2e]/95 backdrop-blur-xs",
          "p-3 shadow-xl shadow-black/10 dark:shadow-black/30",
          // Flèche pointant vers le bas
          // (position horizontale de la flèche : after:left-* dans tooltipAlignClasses)
          "after:absolute after:top-full after:-translate-x-1/2",
          "after:border-4 after:border-transparent",
          "after:border-t-white/95 dark:after:border-t-[#0d1b2e]/95",
          // Transition
          "pointer-events-none",
          "opacity-0 translate-y-1",
          "group-hover:opacity-100 group-hover:translate-y-0",
          "group-focus-within:opacity-100 group-focus-within:translate-y-0",
          "transition-all duration-150 ease-out",
          "motion-reduce:transition-none",
        ].join(" ")}
      >
        {/* Nom + catégorie */}
        <p className="font-semibold text-sm text-strong leading-tight">{tech.name}</p>

        {/* Niveau : pastilles + label */}
        <div className="mt-1.5 flex items-center gap-2">
          <LevelDots level={tech.level} />
          <span className={["text-xs font-medium", colors.text].join(" ")}>
            {label}
          </span>
        </div>

        {/* Années d'expérience */}
        <p className="mt-1 text-xs text-muted-2">
          {locale === "fr" ? `${yearsLabel} d'expérience` : locale === "es" ? `${yearsLabel} de experiencia` : `${yearsLabel} of experience`}
        </p>

        {/* Contexte / usage */}
        <p className="mt-1.5 text-xs text-muted leading-relaxed">{context}</p>
      </div>
    </div>
  );
}

// ── Composant principal ────────────────────────────────────────────────────
export default function TechStackGrid() {
  const { track } = useTrack();
  const locale    = useLocale();

  const items = getTechStack(track);

  return (
    <Reveal delayMs={80}>
      <div
        // Grille responsive : 4 colonnes desktop, 3 tablette, 2+ mobile
        className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3"
        // Rôle liste pour les screen readers
        role="list"
        aria-label={
          locale === "fr"
            ? "Stack technique interactive"
            : locale === "es"
            ? "Stack técnico interactivo"
            : "Interactive tech stack"
        }
      >
        {items.map((tech, i) => (
          <Reveal key={tech.id} delayMs={i * 30}>
            <div role="listitem">
              <TechCard tech={tech} locale={locale} index={i} />
            </div>
          </Reveal>
        ))}
      </div>
    </Reveal>
  );
}
