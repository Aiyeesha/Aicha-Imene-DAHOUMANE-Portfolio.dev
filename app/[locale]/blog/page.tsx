import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { readAllPosts } from "@/content/blog/fs";
import { getTopTags } from "@/lib/blog-utils";
import BlogTrackFilter from "@/components/blog/BlogTrackFilter";
import type { PostCard } from "@/components/blog/BlogTrackFilter";

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

export default async function BlogIndexPage({
  params,
  searchParams
}: {
  params: Promise<Params>;
  searchParams: Promise<{ tag?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: "blogIndex" });

  const selectedTag = sp.tag ? String(sp.tag) : "";

  const allRaw = readAllPosts(locale);

  // Sérialisation : on exclut `file` (chemin absolu serveur) avant de passer au Client Component
  const posts: PostCard[] = allRaw.map(({ slug, locale: l, title, excerpt, date, tags, readingTime }) => ({
    slug, locale: l, title, excerpt, date, tags, readingTime
  }));

  // Top 8 tags par fréquence (filtrage URL — reste server-side)
  const topTags = getTopTags(allRaw.map((p) => p.tags), 8);

  return (
    <section className="py-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs text-muted-2">{t("kicker")}</div>
          <h1 className="mt-2 text-4xl font-semibold">{t("title")}</h1>
          <p className="mt-3 text-muted">{t("subtitle")}</p>
        </div>
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
      <BlogTrackFilter posts={posts} locale={locale} selectedTag={selectedTag || undefined} />
    </section>
  );
}
