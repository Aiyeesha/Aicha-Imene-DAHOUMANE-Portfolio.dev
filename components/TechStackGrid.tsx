"use client";

// TechStackGrid.tsx
// -----------------
// Interactive tech stack grid: one badge per technology, coloured by category,
// with a CSS-only tooltip (shown on hover/focus) giving the skill level,
// years of experience and context. Content depends on the track and locale.

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

// ── Level dots ──────────────────────────────────────────────────────────
function LevelDots({ level }: { level: TechLevel }) {
  // 4 dots, filled up to the level
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

// ── Tooltip alignment per column ──────────────────────────────────────────
// The 208px tooltip is wider than a mobile card. Centred, it overflowed the
// page from the last column (even while invisible, it stays in the layout)
// and was clipped from the first one. It is aligned to the card's left edge
// in the first column and right edge in the last, centred elsewhere. Column
// counts follow the grid breakpoints (3 / sm:4 / md:5); from lg (6 wide
// columns) centring fits again. Class names are spelled out in full so
// Tailwind can detect them.
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
  // lg and up: centred.
  parts.push("lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:after:left-1/2");
  return parts.join(" ");
}

// ── Badge + tooltip ───────────────────────────────────────────────────────
function TechCard({ tech, locale, index }: { tech: TechItem; locale: string; index: number }) {
  const safeLocale = toLocale(locale);
  const colors  = CATEGORY_COLORS[tech.category];
  const label   = LEVEL_LABELS[tech.level][safeLocale];
  const context = tech.context[safeLocale];
  // Localised decimal separator ("1,5" in FR/ES, "1.5" in EN). French takes
  // the plural from 2 on ("1,5 an", "2 ans"); Spanish and English from
  // anything other than 1 ("1,5 años", "1.5 yrs").
  const years = new Intl.NumberFormat(safeLocale, { maximumFractionDigits: 1 }).format(tech.years);
  const yearsLabel = locale === "fr"
    ? `${years} an${tech.years >= 2 ? "s" : ""}`
    : locale === "es"
    ? `${years} año${tech.years !== 1 ? "s" : ""}`
    : `${years} yr${tech.years !== 1 ? "s" : ""}`;

  // Unique id for aria-describedby
  const tooltipId = `tooltip-${tech.id}`;

  return (
    // Focusable so keyboard users get the tooltip. No role="button": the
    // element has no action.
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
        {/* Abbreviation (2-3 letters) */}
        <span
          className={[
            "font-display font-bold text-base leading-none",
            colors.text,
          ].join(" ")}
          aria-hidden="true"
        >
          {tech.abbr}
        </span>

        {/* Short name, truncated if needed */}
        <span className="text-[10px] font-medium text-center text-muted-2 leading-tight max-w-[60px] truncate">
          {tech.name}
        </span>
      </div>

      {/* ── Tooltip ────────────────────────────────────────────────────── */}
      {/* Above the badge; revealed on hover/focus with a small upward slide. */}
      <div
        id={tooltipId}
        role="tooltip"
        className={[
          // Horizontal position depends on the column (see tooltipAlignClasses)
          "absolute bottom-full mb-2 z-50",
          tooltipAlignClasses(index),
          "w-52",
          // Look
          "rounded-xl border border-black/10 dark:border-white/10",
          "bg-white/95 dark:bg-[#0d1b2e]/95 backdrop-blur-xs",
          "p-3 shadow-xl shadow-black/10 dark:shadow-black/30",
          // Arrow pointing down (horizontal position: after:left-* in tooltipAlignClasses)
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
        {/* Name + category */}
        <p className="font-semibold text-sm text-strong leading-tight">{tech.name}</p>

        {/* Level: dots + label */}
        <div className="mt-1.5 flex items-center gap-2">
          <LevelDots level={tech.level} />
          <span className={["text-xs font-medium", colors.text].join(" ")}>
            {label}
          </span>
        </div>

        {/* Years of experience */}
        <p className="mt-1 text-xs text-muted-2">
          {locale === "fr" ? `${yearsLabel} d'expérience` : locale === "es" ? `${yearsLabel} de experiencia` : `${yearsLabel} of experience`}
        </p>

        {/* Context / usage */}
        <p className="mt-1.5 text-xs text-muted leading-relaxed">{context}</p>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function TechStackGrid() {
  const { track } = useTrack();
  const locale    = useLocale();

  const items = getTechStack(track);

  return (
    <Reveal delayMs={80}>
      <div
        // Responsive grid: 3 columns on mobile up to 6 on desktop
        className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3"
        // List role for screen readers
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
