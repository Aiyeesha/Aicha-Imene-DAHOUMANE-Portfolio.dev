// SkeletonCard.tsx
// ----------------
// Pulsing skeleton card for loading states (Tailwind only).
//
//   <SkeletonCard />            — default size (project card)
//   <SkeletonCard lines={2} />  — fewer text lines

type Props = {
  /** Number of description lines (1–4, default 3) */
  lines?: number;
  className?: string;
  /**
   * Stagger index (0-3): adds an animation-delay through the
   * `.skeleton-delay-{n}` classes in globals.css, so cards pulse in a wave
   * rather than all at once.
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
      {/* Header: title + badge placeholders */}
      <div className="flex items-start justify-between gap-3">
        <div className="h-5 w-2/3 rounded-full bg-slate-200 dark:bg-white/10" />
        <div className="h-5 w-14 rounded-full bg-slate-200 dark:bg-white/10" />
      </div>

      {/* Description lines */}
      <div className="mt-4 space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-3.5 rounded-full bg-slate-200 dark:bg-white/10"
            // Shorter last line
            style={{ width: i === lines - 1 ? "60%" : "100%" }}
          />
        ))}
      </div>

      {/* Tag placeholders */}
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
