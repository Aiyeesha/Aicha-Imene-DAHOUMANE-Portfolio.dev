import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { readAllPosts } from "@/content/blog/fs";

type Params = { locale: "en" | "fr" };

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogIndex" });

  const title = t("meta.title");
  const description = t("meta.description");
  const urlPath = `/${locale}/blog`;

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

function toInt(v: string | undefined, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
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
  const items = filtered.slice(start, start + pageSize);

  const tags = Array.from(new Set(all.flatMap((p) => p.tags))).sort((a, b) => a.localeCompare(b));

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

          {tags.map((tg) => (
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

        {/* Posts list */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {items.map((p) => (
            <Link
              key={`${p.locale}-${p.slug}`}
              href={`/${locale}/blog/${p.slug}`}
              className="card p-6 hover:bg-black/10 dark:hover:bg-white/5 soft-ring"
            >
              <div className="text-xs text-muted-2">{p.date}</div>
              <div className="mt-2 text-xl font-semibold">{p.title}</div>
              <div className="mt-2 text-muted">{p.excerpt}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.slice(0, 6).map((tag) => (
                  <span key={tag} className="chip">{tag}</span>
                ))}
              </div>
              <div className="mt-4 text-sm text-cyan-700 dark:text-cyan-200">{t("readCta")} →</div>
            </Link>
          ))}
        </div>

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
