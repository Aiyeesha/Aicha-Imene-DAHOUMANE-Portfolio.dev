import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import fs from "node:fs";
import matter from "gray-matter";
import { getTranslations } from "next-intl/server";

import { readAllPosts, readPostMeta } from "@/content/blog/fs";
import { extractToc } from "@/content/blog/toc";
import TableOfContents from "@/components/blog/TableOfContents";
import BackToTop from "@/components/blog/BackToTop";
import RelatedPosts from "@/components/blog/RelatedPosts";
import SeriesBanner from "@/components/blog/SeriesBanner";
import ScrollProgress from "@/components/ScrollProgress";
import ShareButtons from "@/components/blog/ShareButtons";
import { getPrevNext } from "@/content/blog/navigation";
import { formatDate } from "@/lib/blog-utils";
import { getSeriePosition } from "@/content/blog/series";
import ArticleReadTracker from "@/components/blog/ArticleReadTracker";

type Params = { locale: "en" | "fr"; slug: string };

// ISR : les articles pré-générés sont revalidés toutes les 24 h.
// dynamicParams = true → un nouvel article se génère à la première visite
// sans déclencher un rebuild complet (utile à 50+ articles).
export const revalidate    = 86400;
export const dynamicParams = true;

export async function generateStaticParams(): Promise<Params[]> {
  const out: Params[] = [];
  for (const locale of ["en", "fr"] as const) {
    const posts = readAllPosts(locale);
    for (const p of posts) out.push({ locale, slug: p.slug });
  }
  return out;
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { locale, slug } = await params;
  const meta = readPostMeta(locale, slug);

  if (!meta) return { title: "Not found" };

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Portfolio";
  const title = meta.title;
  const description = meta.excerpt || meta.title;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const urlPath = `${siteUrl}/${locale}/blog/${slug}`;
  const cover = meta.cover || "/opengraph-image";
  const ogImage = cover.startsWith("http://") || cover.startsWith("https://") ? cover : `${siteUrl}${cover.startsWith("/") ? cover : `/${cover}`}`;

  const languages: Record<string, string> = {};
  const enExists = locale === "en" ? meta : readPostMeta("en", slug);
  const frExists = locale === "fr" ? meta : readPostMeta("fr", slug);

  if (enExists) languages.en = `${siteUrl}/en/blog/${slug}`;
  if (frExists) languages.fr = `${siteUrl}/fr/blog/${slug}`;

  return {
    title: `${title} | ${siteName}`,
    description,
    alternates: { canonical: urlPath, languages },
    openGraph: {
      type: "article",
      title,
      description,
      url: urlPath,
      siteName,
      images: [{ url: ogImage }],
      // article:published_time — indexed by Google and social platforms (LinkedIn, Twitter)
      publishedTime: meta.date,
      // article:author — links to the author's profile page
      authors: [`${siteUrl}/en/about`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage]
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blogPost" });

  const meta = readPostMeta(locale, slug);
  if (!meta) notFound();

  const raw = fs.readFileSync(meta.file, "utf-8");
  const parsed = matter(raw);
  const content = String(parsed.content || "");
  const toc = extractToc(content);
  const nav = getPrevNext(locale, slug);

  // Série d'articles — null si l'article n'appartient à aucune série
  const seriePosition = getSeriePosition(slug);

  // Related posts: same locale, overlapping tags, exclude current
  const allPosts = readAllPosts(locale);
  const related = allPosts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      ...p,
      score: p.tags.filter((t) => meta.tags.includes(t)).length
    }))
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score || (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  const { default: Post } = await import(`@/content/blog/posts/${locale}/${slug}.mdx`);

  const authorName   = process.env.NEXT_PUBLIC_OG_NAME    || "Aïcha Imène DAHOUMANE";
  const avatarUrl    = process.env.NEXT_PUBLIC_AVATAR_URL  || "/avatar.webp";
  const linkedInUrl  = process.env.NEXT_PUBLIC_LINKEDIN_URL
    ? (process.env.NEXT_PUBLIC_LINKEDIN_URL.startsWith("http")
        ? process.env.NEXT_PUBLIC_LINKEDIN_URL
        : `https://${process.env.NEXT_PUBLIC_LINKEDIN_URL}`)
    : "";

  // ── JSON-LD ────────────────────────────────────────────────────────────────
  const siteUrl  = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const postUrl  = `${siteUrl}/${locale}/blog/${slug}`;
  const blogUrl  = `${siteUrl}/${locale}/blog`;

  // BlogPosting — indexé par Google (rich snippets pour les articles)
  // Le champ `image` est requis pour les Google Rich Results (article featured snippet).
  const coverImageUrl = meta.cover
    ? meta.cover.startsWith("http")
      ? meta.cover
      : `${siteUrl}${meta.cover.startsWith("/") ? meta.cover : `/${meta.cover}`}`
    : `${siteUrl}/opengraph-image`;

  const jsonLdBlogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": postUrl,
    headline: meta.title,
    description: meta.excerpt || meta.title,
    url: postUrl,
    datePublished: meta.date,
    dateModified: meta.date,
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    keywords: meta.tags.join(", "),
    image: coverImageUrl,
    author: {
      "@type": "Person",
      name: authorName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: authorName,
      url: siteUrl,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    isPartOf: { "@type": "Blog", "@id": blogUrl },
  };

  // BreadcrumbList — Home → Blog → Article
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "fr" ? "Accueil" : "Home",  item: `${siteUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Blog",                                 item: blogUrl },
      { "@type": "ListItem", position: 3, name: meta.title,                             item: postUrl },
    ],
  };

  return (
    <section className="py-12">
      {/* Données structurées — BlogPosting + BreadcrumbList */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLdBlogPosting, jsonLdBreadcrumb]) }}
      />
      <ScrollProgress />
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              {/* Date + reading time */}
              <div className="flex items-center gap-2 text-xs text-muted-2">
                <span>{formatDate(meta.date, locale)}</span>
                <span>·</span>
                <span>{meta.readingTime} {t("readingTime")}</span>
              </div>

              <h1 className="mt-2 text-4xl font-semibold leading-tight">{meta.title}</h1>
              {meta.excerpt ? <p className="mt-4 text-muted">{meta.excerpt}</p> : null}

              <div className="mt-4 flex flex-wrap gap-2">
                {meta.tags.map((tg) => (
                  <Link
                    key={tg}
                    href={`/${locale}/blog?tag=${encodeURIComponent(tg)}`}
                    className="chip hover:opacity-90"
                  >
                    {tg}
                  </Link>
                ))}
              </div>

              {/* Bandeau de série — affiché uniquement si l'article appartient à une série */}
              {seriePosition && (
                <SeriesBanner position={seriePosition} locale={locale} />
              )}
            </div>

            <Link
              href={`/${locale}/blog`}
              className="rounded-full border border-black/10 bg-black/5 px-5 py-2 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring shrink-0"
            >
              ← {t("back")}
            </Link>
          </div>

          <article className="mt-10 card p-7">
            <div className="mdx space-y-5 text-slate-700 dark:text-white/80">
              <Post />
            </div>
            {/* Sentinel: fires blog_article_completed when the reader reaches the end */}
            <ArticleReadTracker
              slug={slug}
              locale={locale}
              readingTimeMin={meta.readingTime}
            />
          </article>

          {/* Author card */}
          <div className="mt-8 card p-6">
            <div className="flex items-start gap-4">
              {/* Avatar avec bordure gradient cyan→violet */}
              <div className="shrink-0 rounded-full bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 p-[2px] shadow-lg shadow-cyan-500/15">
                <div className="rounded-full overflow-hidden">
                  <Image
                    src={avatarUrl}
                    alt={authorName}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover object-top"
                  />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-muted-2 uppercase tracking-wider">
                  {t("author")}
                </div>
                <div className="mt-0.5 font-semibold text-strong">{authorName}</div>
                <div className="text-sm text-cyan-700 dark:text-cyan-400">{t("authorRole")}</div>
              </div>
            </div>

            {/* Bio */}
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {t("authorBio")}
            </p>

            {/* Liens — profil + LinkedIn */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1.5 text-xs font-medium hover:bg-black/10 dark:hover:bg-white/10 soft-ring transition-colors"
              >
                {t("authorProfileLink")}
              </Link>
              {linkedInUrl && (
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1.5 text-xs font-medium hover:bg-black/10 dark:hover:bg-white/10 soft-ring transition-colors"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 opacity-60">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Share buttons — LinkedIn + copier le lien */}
          <ShareButtons
            url={postUrl}
            title={meta.title}
            labels={{
              share:     t("share"),
              linkedin:  t("shareLinkedIn"),
              copyLink:  t("copyLink"),
              copied:    t("copied"),
            }}
          />

          {/* Related posts */}
          {related.length > 0 && (
            <RelatedPosts posts={related} locale={locale} label={t("related")} />
          )}

          {/* Prev / Next */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {nav.prev ? (
              <Link
                href={`/${locale}/blog/${nav.prev.slug}`}
                className="card p-5 hover:bg-black/10 dark:hover:bg-white/5 soft-ring"
              >
                <div className="text-xs text-muted-2">{t("previous")}</div>
                <div className="mt-1 font-medium text-strong">{nav.prev.title}</div>
              </Link>
            ) : (
              <div className="card p-5 opacity-40">
                <div className="text-xs text-muted-2">{t("previous")}</div>
                <div className="mt-1 text-muted">—</div>
              </div>
            )}

            {nav.next ? (
              <Link
                href={`/${locale}/blog/${nav.next.slug}`}
                className="card p-5 hover:bg-black/10 dark:hover:bg-white/5 soft-ring text-right"
              >
                <div className="text-xs text-muted-2">{t("next")}</div>
                <div className="mt-1 font-medium text-strong">{nav.next.title}</div>
              </Link>
            ) : (
              <div className="card p-5 opacity-40 text-right">
                <div className="text-xs text-muted-2">{t("next")}</div>
                <div className="mt-1 text-muted">—</div>
              </div>
            )}
          </div>
        </div>

        <TableOfContents items={toc} />
      </div>

      {/* Back to top (client) */}
      <BackToTop label={t("backToTop")} />

      {/* JSON-LD supprimé ici — BlogPosting complet déjà injecté en tête de composant (lignes ~158-163). */}
    </section>
  );
}
