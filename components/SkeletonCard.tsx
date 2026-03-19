// SkeletonCard.tsx
// ----------------
// Carte squelette animée (animate-pulse) pour les états de chargement.
// Pure Tailwind, aucune dépendance externe.
//
// Usage :
//   <SkeletonCard />            — taille par défaut (card projet)
//   <SkeletonCard lines={2} />  — moins de lignes de texte

type Props = {
  /** Nombre de lignes de texte de description (1–4, défaut : 3) */
  lines?: number;
  className?: string;
  /**
   * Index de stagger (0-3) — applique un `animation-delay` CSS via la classe
   * `.skeleton-delay-{n}` définie dans globals.css, pour créer un effet
   * de cascade ondulant plutôt qu'une pulsation synchrone de toutes les cartes.
   */
  staggerIndex?: 0 | 1 | 2 | 3;
};

export default function SkeletonCard({ lines = 3, className = "", staggerIndex }: Props) {
  const staggerClass = staggerIndex ? `skeleton-delay-${staggerIndex}` : "";
  return (
    <div
      className={[
        "card p-6 animate-pulse",
        staggerClass,
        className,
      ].join(" ").trim()}
      aria-hidden="true"
    >
      {/* En-tête : titre + badge placeholder */}
      <div className="flex items-start justify-between gap-3">
        <div className="h-5 w-2/3 rounded-full bg-slate-200 dark:bg-white/10" />
        <div className="h-5 w-14 rounded-full bg-slate-200 dark:bg-white/10" />
      </div>

      {/* Lignes de description */}
      <div className="mt-4 space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-3.5 rounded-full bg-slate-200 dark:bg-white/10"
            // Dernière ligne plus courte pour un rendu naturel
            style={{ width: i === lines - 1 ? "60%" : "100%" }}
          />
        ))}
      </div>

      {/* Tags placeholder */}
      <div className="mt-5 flex gap-2">
        {[48, 64, 56].map((w) => (
          <div
            key={w}
            className="h-6 rounded-full bg-slate-200 dark:bg-white/10"
            style={{ width: w }}
          />
        ))}
      </div>

      {/* CTA placeholder */}
      <div className="mt-6 h-8 w-28 rounded-full bg-slate-200 dark:bg-white/10" />
    </div>
  );
}
