import Link from "next/link";
import type { Metadata } from "next";
import type React from "react";
import { getTranslations } from "next-intl/server";
import { readAllPosts } from "@/content/blog/fs";
import { formatDate, detectTrack, getTopTags } from "@/lib/blog-utils";

// ISR : revalide la liste des articles toutes les heures.
// Permet d'intégrer de nouveaux posts sans rebuild complet
// une fois le blog migré vers une source externe (CMS, Supabase).
export const revalidate = 3600;

type Params = { locale: "en" | "fr" };

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogIndex" });

  const title = t("meta.title");
  const description = t("meta.description");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const urlPath = `${siteUrl}/${locale}/blog`;

  return {
    title,
    description,
    // URLs absolues requises pour hreflang — Next.js combine metadataBase + relative
    // uniquement pour le canonical HTML, pas pour les balises <link rel="alternate">.
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/blog`,
        fr: `${siteUrl}/fr/blog`,
      }
    },
    openGraph: {
      title,
      description,
      url: urlPath,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Portfolio"
    }
  };
}

function toInt(v: string | undefined, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

function TrackBadge({ track }: { track: "salesforce" | "itops" | null }) {
  if (!track) return null;
  const isSF = track === "salesforce";
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        isSF
          ? "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300"
          : "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300"
      ].join(" ")}
    >
      {isSF ? "Salesforce" : "IT Ops"}
    </span>
  );
}

// Bordure gauche colorée — style inline requis (voir LatestPosts.tsx pour l'explication)
function trackBorderStyle(track: "salesforce" | "itops" | null): React.CSSProperties | undefined {
  if (track === "salesforce") return { borderLeft: "4px solid #06b6d4" };
  if (track === "itops")     return { borderLeft: "4px solid #8b5cf6" };
  return undefined;
}

export default async function BlogIndexPage({
  params,
  searchParams
}: {
  params: Promise<Params>;
  searchParams: Promise<{ tag?: string; page?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: "blogIndex" });

  const selectedTag = sp.tag ? String(sp.tag) : "";
  const page = toInt(sp.page, 1);

  const all = readAllPosts(locale);

  // Tag filter
  const filtered = selectedTag ? all.filter((p) => p.tags.includes(selectedTag)) : all;

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const start = (safePage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  // Featured: first item on page 1, only when no tag filter
  const isFirstPage = safePage === 1 && !selectedTag;
  const featuredPost = isFirstPage ? pageItems[0] : null;
  const gridItems = isFirstPage ? pageItems.slice(1) : pageItems;

  // Top 8 tags by frequency
  const topTags = getTopTags(all.map((p) => p.tags), 8);

  const makeUrl = (p: number) => {
    const qs = new URLSearchParams();
    if (selectedTag) qs.set("tag", selectedTag);
    if (p > 1) qs.set("page", String(p));
    const q = qs.toString();
    return `/${locale}/blog${q ? `?${q}` : ""}`;
  };

  return (
    <section className="py-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs text-muted-2">{t("kicker")}</div>
          <h1 className="mt-2 text-4xl font-semibold">{t("title")}</h1>
          <p className="mt-3 text-muted">{t("subtitle")}</p>
        </div>
        <div className="text-sm text-muted-2 pt-2 shrink-0">
          {filtered.length} {t("articleCount")}
        </div>
      </div>

      {/* Tags bar */}
      <div className="mt-10 flex flex-wrap gap-2">
        <Link
          href={`/${locale}/blog`}
          className={[
            "chip",
            !selectedTag ? "bg-black/10 border-black/20 dark:bg-white/10 dark:border-white/20" : ""
          ].join(" ")}
        >
          {t("tags.all")}
        </Link>

        {topTags.map((tg) => (
          <Link
            key={tg}
            href={`/${locale}/blog?tag=${encodeURIComponent(tg)}`}
            className={[
              "chip",
              selectedTag === tg ? "bg-black/10 border-black/20 dark:bg-white/10 dark:border-white/20" : ""
            ].join(" ")}
          >
            {tg}
          </Link>
        ))}

        <div className="flex-1" />

        <Link
          href={`/${locale}/blog/tags`}
          className="chip hover:opacity-90"
        >
          {t("tags.allTags")}
        </Link>
      </div>

      {/* Featured post — page 1 only, no tag filter */}
      {featuredPost && (
        <Link
          href={`/${locale}/blog/${featuredPost.slug}`}
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

      {/* Posts grid */}
      {gridItems.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {gridItems.map((p) => {
            const postTrack = detectTrack(p.tags);
            return (
            <Link
              key={`${p.locale}-${p.slug}`}
              href={`/${locale}/blog/${p.slug}`}
              className="card p-6 hover:bg-black/10 dark:hover:bg-white/5 soft-ring"
              style={trackBorderStyle(postTrack)}
            >
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <TrackBadge track={detectTrack(p.tags)} />
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
        !featuredPost && (
          // Empty state : tag sélectionné sans résultats — ou liste vide si aucun article
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 dark:border-white/10 py-16 px-6 text-center">
            {/* Icône signet */}
            <svg
              className="mx-auto mb-4 h-10 w-10 text-slate-300 dark:text-white/20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <p className="font-medium text-strong">{t("noResults")}</p>
            {selectedTag && (
              <Link
                href={`/${locale}/blog`}
                className="mt-4 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring"
              >
                {t("tags.all")}
              </Link>
            )}
          </div>
        )
      )}

      {/* Pagination */}
      <div className="mt-10 flex items-center justify-between">
        <div className="text-sm text-muted-2">
          {t("pagination.page")} {safePage} / {totalPages}
        </div>

        <div className="flex gap-2">
          <Link
            aria-disabled={safePage <= 1}
            href={makeUrl(Math.max(1, safePage - 1))}
            className={[
              "rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring",
              safePage <= 1 ? "opacity-40 pointer-events-none" : ""
            ].join(" ")}
          >
            ← {t("pagination.prev")}
          </Link>

          <Link
            aria-disabled={safePage >= totalPages}
            href={makeUrl(Math.min(totalPages, safePage + 1))}
            className={[
              "rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring",
              safePage >= totalPages ? "opacity-40 pointer-events-none" : ""
            ].join(" ")}
          >
            {t("pagination.next")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
