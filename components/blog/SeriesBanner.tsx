// components/blog/SeriesBanner.tsx
// ---------------------------------
// Bandeau "Cet article fait partie de la série X" affiché sous les tags
// dans la page d'article de blog.
//
// Affiche :
//   - Nom de la série (bilingue)
//   - Position dans la série (ex : "Article 2 / 4")
//   - Lien vers l'article précédent et suivant dans la série
//   - Lien vers tous les articles de la série (filtre tag commun, si applicable)
//
// Server Component — aucun état client requis.

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

  // Lire les titres des articles adjacents pour l'affichage
  const prevMeta = prevSlug ? readPostMeta(locale, prevSlug) : null;
  const nextMeta = nextSlug ? readPostMeta(locale, nextSlug) : null;

  const serieName  = isFr ? serie.name.fr : isEs ? serie.name.es : serie.name.en;
  const total      = serie.slugs.length;
  const position1  = index + 1; // 1-based pour l'affichage

  return (
    <aside
      aria-label={isFr ? `Série : ${serieName}` : isEs ? `Serie: ${serieName}` : `Series: ${serieName}`}
      className="mt-6 rounded-2xl border border-cyan-200 dark:border-cyan-800/50 bg-cyan-50/60 dark:bg-cyan-950/30 px-5 py-4"
    >
      {/* En-tête — icône + nom de la série + position */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Icône série */}
        <span aria-hidden="true" className="text-base">📚</span>

        <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
          {isFr ? "Série" : isEs ? "Serie" : "Series"}
        </span>

        <span className="text-sm font-semibold text-cyan-900 dark:text-cyan-200">
          {serieName}
        </span>

        {/* Badge position */}
        <span className="ml-auto shrink-0 rounded-full bg-cyan-100 dark:bg-cyan-900/50 px-2.5 py-0.5 text-xs font-medium text-cyan-800 dark:text-cyan-300">
          {position1} / {total}
        </span>
      </div>

      {/* Progrès visuel — barre de progression */}
      <div
        aria-hidden="true"
        className="mt-3 h-1 w-full overflow-hidden rounded-full bg-cyan-200/60 dark:bg-cyan-800/40"
      >
        <div
          className="h-full rounded-full bg-cyan-500 dark:bg-cyan-400 transition-all"
          style={{ width: `${(position1 / total) * 100}%` }}
        />
      </div>

      {/* Navigation dans la série */}
      {(prevMeta || nextMeta) && (
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          {/* Article précédent */}
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
            <div /> /* placeholder pour aligner next à droite */
          )}

          {/* Article suivant */}
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
