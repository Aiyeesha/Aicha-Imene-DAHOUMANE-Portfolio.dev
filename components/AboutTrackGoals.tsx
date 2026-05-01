"use client";

// AboutTrackGoals.tsx
// -------------------
// Section "Objectifs 2026" track-aware avec indicateurs de statut dynamiques.
//
// Données : goals passés en props depuis about/page.tsx (serveur, Supabase).
// Fallback : si Supabase indisponible, utilise les traductions statiques (i18n).
//
// Statuts :
//   not_started → ○ gris (pas commencé)
//   in_progress → ◑ cyan (en cours)
//   completed   → ✓ vert (atteint)

import { useTranslations, useLocale } from "next-intl";
import { useTrack } from "@/app/[locale]/providers";
import type { Goal, GoalStatus } from "@/lib/data/goals";

// ── Icônes de statut ──────────────────────────────────────────────────────────

function StatusIcon({ status }: { status: GoalStatus }) {
  if (status === "completed") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  if (status === "in_progress") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-5 w-5 shrink-0 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        {/* Demi-arc = en cours */}
        <path d="M12 2a10 10 0 0 1 0 20" strokeLinecap="round" />
      </svg>
    );
  }
  // not_started
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-5 w-5 shrink-0 text-muted-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

// Libellé de statut pour le lecteur d'écran + badge visuel
function StatusBadge({ status, isFr }: { status: GoalStatus; isFr: boolean }) {
  const config = {
    completed:   { label: isFr ? "Atteint"       : "Completed",   cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" },
    in_progress: { label: isFr ? "En cours"       : "In progress", cls: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300" },
    not_started: { label: isFr ? "Non démarré"    : "Not started", cls: "bg-black/5 text-muted-2 dark:bg-white/5" },
  };
  const { label, cls } = config[status];
  return (
    <span className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>
      {label}
    </span>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────

type Props = {
  /** Goals récupérés depuis Supabase (peut être vide si indisponible) */
  goals: Goal[];
};

// ── Composant principal ───────────────────────────────────────────────────────

export default function AboutTrackGoals({ goals }: Props) {
  const t = useTranslations("profile");
  const { track } = useTrack();
  const locale = useLocale();
  const isFr = locale === "fr";
  const isSalesforce = track === "salesforce";

  // Filtrer les goals du track actif depuis Supabase
  const trackGoals = goals
    .filter((g) => g.track === track)
    .sort((a, b) => a.sort_order - b.sort_order);

  // Fallback : si Supabase vide, utiliser les traductions statiques (status = not_started)
  const useFallback = trackGoals.length === 0;
  const fallbackGoals = useFallback
    ? (t.raw(isSalesforce ? "goals2026Salesforce" : "goals2026Itops") as string[])
    : [];

  // Titre + badge spécifiques au track
  const trackLabel = isSalesforce ? "Salesforce" : "IT Ops";
  const trackAccent = isSalesforce
    ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 ring-1 ring-cyan-500/20"
    : "bg-violet-500/10 text-violet-600 dark:text-violet-300 ring-1 ring-violet-500/20";

  const sectionTitle = isFr
    ? `Objectifs ${trackLabel} 2026`
    : `${trackLabel} 2026 Goals`;

  return (
    <section className="rounded-2xl border p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">{sectionTitle}</h2>
          {/* Badge track — rappel visuel du mode actif */}
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${trackAccent}`}>
            {trackLabel}
          </span>
        </div>

        {/* Légende des statuts — visible uniquement si données Supabase présentes */}
        {!useFallback && (
          <div className="flex items-center gap-3 text-xs text-muted-2 shrink-0">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
              {isFr ? "Atteint" : "Done"}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-cyan-500 inline-block" />
              {isFr ? "En cours" : "In progress"}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-black/20 dark:bg-white/20 inline-block" />
              {isFr ? "À venir" : "Upcoming"}
            </span>
          </div>
        )}
      </div>

      {/* key={track} force le re-mount de la liste quand le track change
          → les items réapparaissent avec l'animation CSS native */}
      <ul key={track} className="mt-5 space-y-3 animate-[fadeIn_0.3s_ease_forwards]">
        {useFallback
          ? /* Fallback statique — tous en "not_started" */
            fallbackGoals.map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <StatusIcon status="not_started" />
                <span className="text-sm leading-relaxed opacity-90">{text}</span>
              </li>
            ))
          : /* Données Supabase avec statuts réels */
            trackGoals.map((goal) => (
              <li key={goal.id} className="flex items-start gap-3">
                <StatusIcon status={goal.status} />
                <span className={`flex-1 text-sm leading-relaxed ${goal.status === "completed" ? "line-through opacity-60" : "opacity-90"}`}>
                  {isFr ? goal.text_fr : goal.text_en}
                </span>
                <StatusBadge status={goal.status} isFr={isFr} />
              </li>
            ))
        }
      </ul>
    </section>
  );
}
