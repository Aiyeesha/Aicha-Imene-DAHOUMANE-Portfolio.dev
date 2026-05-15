"use client";

import Link from "next/link";
import type React from "react";
import { useTranslations } from "next-intl";
import { detectTrack, formatDate } from "@/lib/blog-utils";

export type PostCard = {
  slug: string;
  locale: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime: number;
};

function TrackBadge({ track }: { track: "salesforce" | "itops" | null }) {
  if (!track) return null;
  const isSF = track === "salesforce";
  return (
    <span className={[
      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
      isSF
        ? "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300"
        : "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300"
    ].join(" ")}>
      {isSF ? "Salesforce" : "IT Ops"}
    </span>
  );
}

function trackBorderStyle(track: "salesforce" | "itops" | null): React.CSSProperties | undefined {
  if (track === "salesforce") return { borderLeft: "4px solid #06b6d4" };
  if (track === "itops")      return { borderLeft: "4px solid #8b5cf6" };
  return undefined;
}

type Props = {
  posts: PostCard[];
  locale: string;
  selectedTag?: string;
  totalPosts: number;
  currentPage: number;
  totalPages: number;
};

function pageHref(page: number, locale: string, tag?: string): string {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (tag) params.set("tag", tag);
  const qs = params.toString();
  return `/${locale}/blog${qs ? `?${qs}` : ""}`;
}

export default function BlogTrackFilter({ posts, locale, selectedTag, totalPosts, currentPage, totalPages }: Props) {
  const t = useTranslations("blogIndex");

  // Locale validé à "en" | "fr" ; slug restreint à [a-z0-9-_] pour éliminer
  // les alertes CodeQL js/stored-xss
  const safeLocale: "en" | "fr" = locale === "fr" ? "fr" : "en";
  const safeSlug = (slug: string) => slug.replace(/[^a-z0-9-_]/gi, "");

  // Filtrage par tag URL uniquement (le toggle global de la navbar gère le track)
  const filtered = posts.filter((p) =>
    !selectedTag || p.tags.includes(selectedTag)
  );

  const featuredPost = !selectedTag && currentPage === 1 ? filtered[0] ?? null : null;
  const gridItems = featuredPost ? filtered.slice(1) : filtered;

  return (
    <>
      {/* Article mis en avant — premier de la liste filtrée, page sans tag */}
      {featuredPost && (
        <Link
          href={`/${safeLocale}/blog/${safeSlug(featuredPost.slug)}`}
          className="mt-10 block card p-8 hover:bg-black/10 dark:hover:bg-white/5 soft-ring"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {t("featured")}
            </span>
            <TrackBadge track={detectTrack(featuredPost.tags)} />
          </div>
          <h2 className="text-2xl font-semibold leading-snug">{featuredPost.title}</h2>
          {featuredPost.excerpt && (
            <p className="mt-3 text-muted leading-relaxed">{featuredPost.excerpt}</p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-xs text-muted-2">{formatDate(featuredPost.date, locale)}</span>
            <span className="text-xs text-muted-2">·</span>
            <span className="text-xs text-muted-2">{featuredPost.readingTime} {t("readingTime")}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {featuredPost.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="chip">{tag}</span>
            ))}
          </div>
          <div className="mt-5 text-sm text-cyan-700 dark:text-cyan-200">{t("readCta")} →</div>
        </Link>
      )}

      {/* Grille d'articles */}
      {gridItems.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {gridItems.map((p) => {
            const postTrack = detectTrack(p.tags);
            return (
              <Link
                key={`${safeLocale}-${safeSlug(p.slug)}`}
                href={`/${safeLocale}/blog/${safeSlug(p.slug)}`}
                className="card p-6 hover:bg-black/10 dark:hover:bg-white/5 soft-ring"
                style={trackBorderStyle(postTrack)}
              >
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <TrackBadge track={postTrack} />
                  <span className="text-xs text-muted-2">
                    {formatDate(p.date, locale)} · {p.readingTime} {t("readingTime")}
                  </span>
                </div>
                <div className="mt-2 text-xl font-semibold leading-snug">{p.title}</div>
                <div className="mt-2 text-muted line-clamp-2">{p.excerpt}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="chip">{tag}</span>
                  ))}
                </div>
                <div className="mt-4 text-sm text-cyan-700 dark:text-cyan-200">{t("readCta")} →</div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 dark:border-white/10 py-16 px-6 text-center">
          <svg className="mx-auto mb-4 h-10 w-10 text-slate-300 dark:text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <p className="font-medium text-strong">{t("noResults")}</p>
          {selectedTag && (
            <Link href={`/${safeLocale}/blog`} className="mt-4 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring">
              {t("tags.all")}
            </Link>
          )}
        </div>
      )}

      {/* Compteur + pagination */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <p className="text-sm text-muted-2">
          {totalPosts} {t("articleCount")}
        </p>

        {totalPages > 1 && (
          <div className="flex items-center gap-4">
            {currentPage > 1 && (
              <Link
                href={pageHref(currentPage - 1, safeLocale, selectedTag)}
                className="rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring"
              >
                ← {t("pagination.prev")}
              </Link>
            )}

            <span className="text-sm text-muted-2">
              {t("pagination.page")} {currentPage} / {totalPages}
            </span>

            {currentPage < totalPages && (
              <Link
                href={pageHref(currentPage + 1, safeLocale, selectedTag)}
                className="rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring"
              >
                {t("pagination.next")} →
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
