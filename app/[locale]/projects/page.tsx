// app/[locale]/projects/page.tsx
// --------------------------------
// Full project gallery: every published project for the locale. Linked from
// the home page, the command palette and project pages' back link. Rendered
// on the server with the Redis cache (getPublishedProjectsWithAssetsCached).

import { ogLocale, ogAlternateLocales } from "@/lib/i18n/ogLocale";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/siteUrl";
import { jsonLdStringify } from "@/lib/security/jsonLdSafe";
import { getPublishedProjectsWithAssetsCached } from "@/lib/data/projects.cached";
import ProjectsSection from "@/components/ProjectsSection";
import { toProjectCards } from "@/lib/data/projectCards";

export const revalidate = 300;

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  const siteUrl = getSiteUrl();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
  const title = t("metaTitle");
  const description = t("metaDescription");
  const urlPath = `${siteUrl}/${locale}/projects`;
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/projects`,
        fr: `${siteUrl}/fr/projects`,
        es: `${siteUrl}/es/projects`,
        "x-default": `${siteUrl}/en/projects`,
      },
    },
    openGraph: {
      url: urlPath,
      type: "website",
      locale: ogLocale(locale),
      alternateLocale: ogAlternateLocales(locale),
      title,
      description,
      siteName,
      images: [{ url: `${siteUrl}/${locale}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/twitter-image`],
    },
  };
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  const t  = await getTranslations({ locale, namespace: "projectsPage" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const uiLocale: "en" | "fr" | "es" = locale === "fr" ? "fr" : locale === "es" ? "es" : "en";

  const projects = await getPublishedProjectsWithAssetsCached(locale);

  const L = {
    breadcrumbHome: tc("home"),
    title:          t("title"),
    subtitle:       t("subtitle"),
    backHome:       tc("backHome"),
    indexTitle:     t("indexTitle", { count: projects.length }),
    empty:          t("empty"),
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: L.breadcrumbHome, item: `${getSiteUrl()}/${locale}` },
      { "@type": "ListItem", position: 2, name: tn("projects"), item: `${getSiteUrl()}/${locale}/projects` },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdStringify(jsonLdBreadcrumb) }} />

      {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
      <nav
        aria-label={tc("breadcrumb")}
        className="mb-6 flex items-center gap-2 text-sm text-muted-2"
      >
        <Link href={`/${locale}`} className="hover:underline soft-ring rounded-sm px-1">
          {L.breadcrumbHome}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-muted">{L.title}</span>
      </nav>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <h1 className="text-3xl font-semibold">{L.title}</h1>
      <p className="mt-3 text-muted">{L.subtitle}</p>

      {projects.length === 0 ? (
        <p className="mt-12 text-center text-muted">{L.empty}</p>
      ) : (
        <div className="mt-10">
          {/* useSearchParams() in ProjectsSection (?tab=… deep links) needs a
              Suspense boundary on this route, or the build fails. */}
          <Suspense fallback={null}>
            <ProjectsSection
              projects={toProjectCards(projects)}
              locale={uiLocale}
              includeFeatured
            />
          </Suspense>
        </div>
      )}

      {/* ── Full index ─────────────────────────────────────────────────────────
          The tabbed gallery only renders the active tab's projects, so this
          server-rendered index links every project page for crawlers. A closed
          <details> keeps the content in the DOM without weighing on the page. */}
      {projects.length > 0 && (
        <details className="mt-12 rounded-2xl border border-black/10 dark:border-white/10 px-5 py-4">
          <summary className="cursor-pointer text-sm font-medium soft-ring rounded-sm">
            {L.indexTitle}
          </summary>
          <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/${locale}/projects/${p.slug}`} className="hover:underline soft-ring rounded-sm">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      )}

      {/* ── Back to home ─────────────────────────────────────────────────────── */}
      <div className="mt-14 border-t border-black/10 dark:border-white/10 pt-8">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
        >
          {L.backHome}
        </Link>
      </div>
    </div>
  );
}
