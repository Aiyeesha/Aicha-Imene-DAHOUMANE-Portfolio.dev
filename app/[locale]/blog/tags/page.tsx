import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAllTags } from "@/content/blog/navigation";

type Params = { locale: "en" | "fr" };

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogTags" });

  const title = t("meta.title");
  const description = t("meta.description");
  const urlPath = `/${locale}/blog/tags`;

  return {
    title,
    description,
    alternates: { canonical: urlPath },
    openGraph: {
      title,
      description,
      url: urlPath,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Portfolio"
    }
  };
}

export default async function BlogTagsPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogTags" });

  const tags = getAllTags(locale);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs text-muted-2">{t("kicker")}</div>
            <h1 className="mt-2 text-4xl font-semibold">{t("title")}</h1>
            <p className="mt-3 text-muted">{t("subtitle")}</p>
          </div>

          <Link
            href={`/${locale}/blog`}
            className="rounded-full border border-black/10 bg-black/5 px-5 py-2 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring"
          >
            ← {t("back")}
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/${locale}/blog?tag=${encodeURIComponent(tag)}`}
              className="chip hover:opacity-90"
              title={`${tag} (${count})`}
            >
              <span>{tag}</span>
              <span className="ml-2 rounded-full bg-black/10 px-2 py-0.5 text-xs dark:bg-white/10">
                {count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
