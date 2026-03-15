"use client";
// components/GitHubHeatmap.tsx
// ------------------------------
// Heatmap des contributions GitHub — grille 52 semaines × 7 jours.
// Données servies par /api/github-activity (cache Redis 6 h).
// Rendu CSS pur (pas de dépendance externe), responsive via CSS.
// Respecte prefers-reduced-motion (pas d'animation).

import { useEffect, useState } from "react";
import type { GitHubActivityData, ContributionDay } from "@/app/api/github-activity/route";

// ── Palette de couleurs par niveau (adaptée au thème du portfolio) ─────────
// Mode clair  : gris → cyan progressif
// Mode sombre : gris foncé → cyan progressif

const LEVEL_COLORS: Record<0 | 1 | 2 | 3 | 4, { light: string; dark: string }> = {
  0: { light: "#e2e8f0", dark: "#1e293b" }, // slate-200 / slate-800
  1: { light: "#a5f3fc", dark: "#164e63" }, // cyan-200 / cyan-900
  2: { light: "#22d3ee", dark: "#0e7490" }, // cyan-400 / cyan-700
  3: { light: "#0891b2", dark: "#06b6d4" }, // cyan-600 / cyan-400
  4: { light: "#0e7490", dark: "#22d3ee" }, // cyan-700 / cyan-300
};

// ── Utilitaires ───────────────────────────────────────────────────────────────

/** Groupe les jours par semaine (lundi = début). */
function groupByWeek(days: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  let   week:  ContributionDay[]   = [];

  for (const day of days) {
    const dow = new Date(day.date + "T12:00:00Z").getUTCDay(); // 0=dim … 6=sam
    // Première semaine : remplir les jours manquants au début
    if (weeks.length === 0 && week.length === 0 && dow !== 1) {
      for (let i = 1; i < dow || (dow === 0 && i < 7); i++) {
        week.push({ date: "", count: 0, level: 0 });
      }
    }
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) weeks.push(week);
  return weeks;
}

const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", ""];

// ── Composant ─────────────────────────────────────────────────────────────────

type Props = {
  locale?: "en" | "fr";
};

export default function GitHubHeatmap({ locale = "en" }: Props) {
  const isFr = locale === "fr";

  const [data,    setData]    = useState<GitHubActivityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);
  const [isDark,  setIsDark]  = useState(false);

  // Détecter le mode sombre
  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // Charger les données depuis l'API route interne
  useEffect(() => {
    fetch("/api/github-activity")
      .then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json() as Promise<GitHubActivityData>;
      })
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="h-28 animate-pulse rounded-xl bg-slate-100 dark:bg-white/5" aria-busy="true" />
    );
  }

  if (error || !data) {
    return (
      <p className="text-xs text-muted-2">
        {isFr ? "Activité GitHub non disponible." : "GitHub activity unavailable."}
      </p>
    );
  }

  const weeks      = groupByWeek(data.contributions);
  const totalYear  = Object.values(data.total).reduce((a, b) => a + b, 0);
  const CELL_SIZE  = 11; // px
  const CELL_GAP   = 2;  // px
  const STEP       = CELL_SIZE + CELL_GAP;

  // Labels des mois (un tous les ~4 semaines)
  const monthLabels: { label: string; x: number }[] = [];
  let   lastMonth = -1;
  weeks.forEach((week, wi) => {
    const firstReal = week.find((d) => d.date);
    if (!firstReal) return;
    const m = new Date(firstReal.date + "T12:00:00Z").getUTCMonth();
    if (m !== lastMonth) {
      monthLabels.push({ label: MONTH_ABBR[m], x: wi * STEP });
      lastMonth = m;
    }
  });

  const svgW = weeks.length * STEP;
  const svgH = 7 * STEP;

  return (
    <div>
      {/* Titre + total */}
      <div className="mb-3 flex items-baseline gap-2">
        <span className="text-sm font-medium">
          {isFr ? "Activité GitHub" : "GitHub Activity"}
        </span>
        <a
          href="https://github.com/Aiyeesha"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-muted-2 underline underline-offset-4 hover:opacity-80"
        >
          @Aiyeesha ↗
        </a>
        <span className="ml-auto text-xs text-muted-2">
          {totalYear.toLocaleString(isFr ? "fr-FR" : "en-US")}{" "}
          {isFr ? "contributions" : "contributions"}
        </span>
      </div>

      {/* Heatmap SVG */}
      <div className="overflow-x-auto">
        <svg
          width={svgW + 28}   // +28 pour les labels de jours à gauche
          height={svgH + 18}  // +18 pour les labels de mois en haut
          aria-label={isFr ? "Heatmap des contributions GitHub" : "GitHub contribution heatmap"}
          role="img"
        >
          {/* Labels des mois */}
          {monthLabels.map(({ label, x }) => (
            <text
              key={label + x}
              x={x + 28}
              y={10}
              fontSize={9}
              fill={isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)"}
            >
              {label}
            </text>
          ))}

          {/* Labels des jours (Lun, Mer, Ven) */}
          {DAY_LABELS.map((label, i) =>
            label ? (
              <text
                key={i}
                x={0}
                y={18 + i * STEP + CELL_SIZE - 1}
                fontSize={9}
                fill={isDark ? "rgba(255,255,255,0.40)" : "rgba(0,0,0,0.40)"}
              >
                {label}
              </text>
            ) : null
          )}

          {/* Cellules */}
          {weeks.map((week, wi) =>
            week.map((day, di) => {
              if (!day.date) return null;
              const level  = day.level as 0 | 1 | 2 | 3 | 4;
              const fill   = isDark ? LEVEL_COLORS[level].dark : LEVEL_COLORS[level].light;
              const x      = wi * STEP + 28;
              const y      = di * STEP + 18;
              const title  = `${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`;
              return (
                <rect
                  key={day.date}
                  x={x}
                  y={y}
                  width={CELL_SIZE}
                  height={CELL_SIZE}
                  rx={2}
                  fill={fill}
                  aria-label={title}
                >
                  <title>{title}</title>
                </rect>
              );
            })
          )}
        </svg>
      </div>

      {/* Légende */}
      <div className="mt-2 flex items-center gap-1.5">
        <span className="text-xs text-muted-2">{isFr ? "Moins" : "Less"}</span>
        {([0, 1, 2, 3, 4] as const).map((l) => (
          <span
            key={l}
            style={{
              width:           CELL_SIZE,
              height:          CELL_SIZE,
              borderRadius:    2,
              display:         "inline-block",
              backgroundColor: isDark ? LEVEL_COLORS[l].dark : LEVEL_COLORS[l].light,
            }}
          />
        ))}
        <span className="text-xs text-muted-2">{isFr ? "Plus" : "More"}</span>
      </div>
    </div>
  );
}
