// app/[locale]/loading.tsx
// ------------------------
// Affiché par Next.js (React Suspense) pendant que page.tsx attend
// les données Supabase (getPublishedProjectsWithAssetsCached).
//
// Structure calquée sur le layout réel de la page :
//   - Placeholder hero (avatar + lignes de texte)
//   - Placeholder section projets (4 skeleton cards)
// Utilise animate-pulse (Tailwind) — aucune dépendance JS.

import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading…" className="space-y-16 py-8">

      {/* ── Hero skeleton ─────────────────────────────────────────── */}
      <div className="grid items-center gap-8 pt-4 lg:grid-cols-[260px_1fr] animate-pulse">

        {/* Avatar placeholder */}
        <div className="mx-auto lg:mx-0">
          <div className="h-[246px] w-[246px] rounded-2xl bg-slate-200 dark:bg-white/10" />
        </div>

        {/* Texte placeholder */}
        <div className="space-y-4">
          {/* Badge disponibilité */}
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-white/10" />
            <div className="h-3 w-40 rounded-full bg-slate-200 dark:bg-white/10" />
          </div>
          {/* Value prop */}
          <div className="h-3.5 w-32 rounded-full bg-slate-200 dark:bg-white/10" />
          {/* Titre */}
          <div className="space-y-2">
            <div className="h-10 w-3/4 rounded-xl bg-slate-200 dark:bg-white/10" />
            <div className="h-6 w-1/2 rounded-xl bg-slate-200 dark:bg-white/10" />
          </div>
          {/* Tagline */}
          <div className="space-y-1.5">
            <div className="h-3.5 w-full rounded-full bg-slate-200 dark:bg-white/10" />
            <div className="h-3.5 w-5/6 rounded-full bg-slate-200 dark:bg-white/10" />
          </div>
          {/* Proof tags */}
          <div className="flex gap-2">
            {[80, 96, 72].map((w) => (
              <div
                key={w}
                className="h-6 rounded-full bg-slate-200 dark:bg-white/10"
                style={{ width: w }}
              />
            ))}
          </div>
          {/* CTAs */}
          <div className="flex gap-3">
            <div className="h-9 w-36 rounded-full bg-slate-200 dark:bg-white/10" />
            <div className="h-9 w-32 rounded-full bg-slate-200 dark:bg-white/10" />
          </div>
        </div>
      </div>

      {/* Séparateur */}
      <div className="h-px w-full bg-black/10 dark:bg-white/10" />

      {/* ── Projets skeleton ──────────────────────────────────────── */}
      <div>
        {/* Titre section */}
        <div className="animate-pulse space-y-2">
          <div className="h-7 w-48 rounded-xl bg-slate-200 dark:bg-white/10" />
          <div className="h-4 w-80 rounded-full bg-slate-200 dark:bg-white/10" />
        </div>

        {/* Grille de 4 cartes */}
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {(Array.from({ length: 4 }) as undefined[]).map((_, i) => (
            <SkeletonCard
              key={i}
              lines={i === 3 ? 2 : 3}
              staggerIndex={i as 0 | 1 | 2 | 3}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
