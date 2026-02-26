import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import fs from "node:fs";
import matter from "gray-matter";
import { getTranslations } from "next-intl/server";

import { readAllPosts, readPostMeta } from "@/content/blog/fs";
import { extractToc } from "@/content/blog/toc";
import TableOfContents from "@/components/blog/TableOfContents";
import { getPrevNext } from "@/content/blog/navigation";

type Params = { locale: "en" | "fr"; slug: string };

export const dynamicParams = false;

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
  // Construct the base site URL (used to build absolute URLs)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  // Compute absolute URL for this post
  const urlPath = `${siteUrl}/${locale}/blog/${slug}`;
  // Use provided cover or fallback, and absolutize if it's a relative path
  const cover = meta.cover || "/opengraph-image";
  const ogImage = cover.startsWith("http://") || cover.startsWith("https://") ? cover : `${siteUrl}${cover.startsWith("/") ? cover : `/${cover}`}`;
  // Build alternate language URLs for SEO i18n.
// Only expose alternates that actually exist (prevents broken hreflang).
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
      images: [{ url: ogImage }]
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

  // Extract TOC from raw MDX (frontmatter removed).
  const raw = fs.readFileSync(meta.file, "utf-8");
  const parsed = matter(raw);
  const content = String(parsed.content || "");
  const toc = extractToc(content);
  const nav = getPrevNext(locale, slug);

  // IMPORTANT:
  // We render MDX using the official Next.js MDX pipeline (@next/mdx).
  const { default: Post } = await import(`@/content/blog/posts/${locale}/${slug}.mdx`);

  return (
      <section className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-muted-2">{meta.date}</div>
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
              </div>

              <Link
                href={`/${locale}/blog`}
                className="rounded-full border border-black/10 bg-black/5 px-5 py-2 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring"
              >
                ← {t("back")}
              </Link>
            </div>

            <article className="mt-10 card p-7">
              <div className="mdx space-y-5 text-slate-700 dark:text-white/80">
                <Post />
              </div>
            </article>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
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

        {/* JSON-LD (Article) */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: meta.title,
              datePublished: meta.date,
              dateModified: meta.date,
              author: {
                "@type": "Person",
                name: process.env.NEXT_PUBLIC_OG_NAME || "Aïcha Imène DAHOUMANE"
              },
              url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + `/${locale}/blog/${slug}`
            })
          }}
        />
      </section>
  );
}
