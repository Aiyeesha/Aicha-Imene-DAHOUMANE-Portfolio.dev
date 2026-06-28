import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { readAllPosts } from "@/content/blog/fs";
import { getTopTags } from "@/lib/blog-utils";
import BlogTrackFilter from "@/components/blog/BlogTrackFilter";
import type { PostCard } from "@/components/blog/BlogTrackFilter";
import BlogSearchBar from "@/components/blog/BlogSearchBar";
import { getSiteUrl } from "@/lib/siteUrl";

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
  const siteUrl = getSiteUrl();
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
        "x-default": `${siteUrl}/en/blog`,
      }
    },
    openGraph: {
      title,
      description,
      url: urlPath,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops",
      images: [{ url: `${urlPath}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${urlPath}/opengraph-image`],
    },
  };
}

const POSTS_PER_PAGE = 12;

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

  const allRaw = readAllPosts(locale);

  // Top 8 tags calculé sur TOUS les articles — cohérent quelle que soit la page ou le tag actif
  const topTags = getTopTags(allRaw.map((p) => p.tags), 8);

  // Filtrage par tag server-side avant pagination — garantit que tous les articles
  // correspondant au tag sont accessibles quelle que soit la page courante
  const tagFiltered = selectedTag
    ? allRaw.filter((p) => p.tags.includes(selectedTag))
    : allRaw;

  const totalPosts = tagFiltered.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));

  const requestedPage = Math.max(1, Number(sp.page ?? "1") || 1);
  const currentPage = Math.min(requestedPage, totalPages);

  const start = (currentPage - 1) * POSTS_PER_PAGE;

  // Sérialisation : on exclut `file` (chemin absolu serveur) avant de passer au Client Component
  const posts: PostCard[] = tagFiltered.slice(start, start + POSTS_PER_PAGE).map(({ slug, locale: l, title, excerpt, date, tags, readingTime }) => ({
    slug, locale: l, title, excerpt, date, tags, readingTime
  }));

  return (
    <section className="py-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-xs text-muted-2">{t("kicker")}</div>
          <h1 className="mt-2 text-4xl font-semibold">{t("title")}</h1>
          <p className="mt-3 text-muted">{t("subtitle")}</p>
        </div>
        <BlogSearchBar />
      </div>

      {/* Barre de tags (filtrage URL) */}
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

        <Link href={`/${locale}/blog/tags`} className="chip hover:opacity-90">
          {t("tags.allTags")}
        </Link>
      </div>

      {/* Onglets track + grille d'articles (Client Component) */}
      <BlogTrackFilter
        posts={posts}
        locale={locale}
        selectedTag={selectedTag || undefined}
        totalPosts={totalPosts}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      {/* Bouton retour accueil */}
      <div className="mt-14 border-t border-black/10 dark:border-white/10 pt-8">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
        >
          ← {locale === "fr" ? "Retour à l'accueil" : "Back to home"}
        </Link>
      </div>
    </section>
  );
}
