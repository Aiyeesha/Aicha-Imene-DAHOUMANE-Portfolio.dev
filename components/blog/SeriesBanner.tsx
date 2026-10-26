// components/blog/SeriesBanner.tsx
// ---------------------------------
// "This article is part of series X" banner, shown below the tags on a blog
// post: series name, position (e.g. "2 / 4"), progress bar and links to the
// previous and next articles. Server component.

import Link from "next/link";
import type { SeriePosition } from "@/content/blog/series";
import { readPostMeta } from "@/content/blog/fs";
import type { BlogLocale } from "@/content/blog/fs";

type Props = {
  position: SeriePosition;
  locale:   BlogLocale;
};

export default function SeriesBanner({ position, locale }: Props) {
  const { serie, index, prevSlug, nextSlug } = position;
  const isFr = locale === "fr";
  const isEs = locale === "es";

  // Titles of the adjacent articles
  const prevMeta = prevSlug ? readPostMeta(locale, prevSlug) : null;
  const nextMeta = nextSlug ? readPostMeta(locale, nextSlug) : null;

  const serieName  = isFr ? serie.name.fr : isEs ? serie.name.es : serie.name.en;
  const total      = serie.slugs.length;
  const position1  = index + 1; // 1-based for display

  return (
    <aside
      aria-label={isFr ? `Série : ${serieName}` : isEs ? `Serie: ${serieName}` : `Series: ${serieName}`}
      className="mt-6 rounded-2xl border border-cyan-200 dark:border-cyan-800/50 bg-cyan-50/60 dark:bg-cyan-950/30 px-5 py-4"
    >
      {/* Header: icon + series name + position */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Series icon */}
        <span aria-hidden="true" className="text-base">📚</span>

        <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
          {isFr ? "Série" : isEs ? "Serie" : "Series"}
        </span>

        <span className="text-sm font-semibold text-cyan-900 dark:text-cyan-200">
          {serieName}
        </span>

        {/* Position badge */}
        <span className="ml-auto shrink-0 rounded-full bg-cyan-100 dark:bg-cyan-900/50 px-2.5 py-0.5 text-xs font-medium text-cyan-800 dark:text-cyan-300">
          {position1} / {total}
        </span>
      </div>

      {/* Progress bar */}
      <div
        aria-hidden="true"
        className="mt-3 h-1 w-full overflow-hidden rounded-full bg-cyan-200/60 dark:bg-cyan-800/40"
      >
        <div
          className="h-full rounded-full bg-cyan-500 dark:bg-cyan-400 transition-all"
          style={{ width: `${(position1 / total) * 100}%` }}
        />
      </div>

      {/* Series navigation */}
      {(prevMeta || nextMeta) && (
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          {/* Previous article */}
          {prevMeta ? (
            <Link
              href={`/${locale}/blog/${prevSlug}`}
              className="flex flex-col gap-0.5 rounded-xl px-3 py-2 hover:bg-cyan-100/60 dark:hover:bg-cyan-900/30 transition-colors"
            >
              <span className="text-xs text-cyan-600 dark:text-cyan-500">
                ← {isFr ? "Précédent" : isEs ? "Anterior" : "Previous"}
              </span>
              <span className="font-medium text-cyan-900 dark:text-cyan-200 line-clamp-2 leading-snug">
                {prevMeta.title}
              </span>
            </Link>
          ) : (
            <div /> /* placeholder that keeps "next" on the right */
          )}

          {/* Next article */}
          {nextMeta ? (
            <Link
              href={`/${locale}/blog/${nextSlug}`}
              className="flex flex-col gap-0.5 rounded-xl px-3 py-2 text-right hover:bg-cyan-100/60 dark:hover:bg-cyan-900/30 transition-colors"
            >
              <span className="text-xs text-cyan-600 dark:text-cyan-500">
                {isFr ? "Suivant" : isEs ? "Siguiente" : "Next"} →
              </span>
              <span className="font-medium text-cyan-900 dark:text-cyan-200 line-clamp-2 leading-snug">
                {nextMeta.title}
              </span>
            </Link>
          ) : null}
        </div>
      )}
    </aside>
  );
}
