// about/page.tsx
// ---------------
// About page, fed by Supabase through getAboutPageCached:
//   1. ProfileFactsCard: "At a glance", per track (client component)
//   2. AboutTrackIntro: positioning, per track (client component)
//   3. tech stack grid and career timeline (static)
//   4. journey, values, passions (Supabase)

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAboutPageCached } from "@/lib/data/about.cached";
import Link from "next/link";
import { Suspense } from "react";
import ProfileFactsCard from "@/components/ProfileFactsCard";
import AboutTrackIntro from "@/components/AboutTrackIntro";
import TechStackGrid from "@/components/TechStackGrid";
import VisualTimeline from "@/components/VisualTimeline";
import CareerTimeline from "@/components/CareerTimeline";
import { getSiteUrl } from "@/lib/siteUrl";
import { jsonLdStringify } from "@/lib/security/jsonLdSafe";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const isEs = locale === "es";

  const name  = process.env.NEXT_PUBLIC_OG_NAME || "Aïcha Imène DAHOUMANE";
  const title = isFr ? `À propos — ${name}` : isEs ? `Sobre mí — ${name}` : `About — ${name}`;
  const description = isFr
    ? "De l'administration systèmes & réseaux au développement Salesforce. Développeuse Salesforce & ingénieure IT Ops — CDI, CDD, intérim ou portage, tous secteurs."
    : isEs
    ? "De la administración de sistemas y redes al desarrollo Salesforce. Desarrolladora Salesforce e ingeniera IT Ops — contrato indefinido, temporal, ETT o portage, todos los sectores."
    : "From systems & network administration to Salesforce development. Salesforce Developer & IT Ops Engineer — permanent, fixed-term, temp or umbrella contracts, any industry.";

  const siteUrl = getSiteUrl();
  const urlPath = `${siteUrl}/${locale}/about`;

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/about`,
        fr: `${siteUrl}/fr/about`,
        es: `${siteUrl}/es/about`,
        "x-default": `${siteUrl}/en/about`,
      }
    },
    openGraph: {
      title,
      description,
      url: urlPath,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US", "es_ES"] : locale === "es" ? ["en_US", "fr_FR"] : ["fr_FR", "es_ES"],
      siteName,
      images: [{ url: `${siteUrl}/${locale}/about/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/${locale}/about/opengraph-image`],
    },
  };
}

type AboutBody = {
  introduction?: string;
  journey?: { title?: string; paragraphs?: string[] };
  values?: { title?: string; items?: { title: string; description: string }[] };
  passions?: { title?: string; paragraphs?: string[] };
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale = locale === "fr" ? "fr" : locale === "es" ? "es" : "en";
  const t = await getTranslations({ locale: safeLocale, namespace: "about" });

  const siteUrl = getSiteUrl();
  const about = await getAboutPageCached(safeLocale);

  if (!about) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* Breadcrumb back to home */}
        <nav aria-label={t("breadcrumbAria")} className="mb-6 flex items-center gap-2 text-sm text-muted-2">
          <Link href={`/${safeLocale}`} className="hover:underline soft-ring rounded-sm">
            {t("breadcrumbHome")}
          </Link>
          <span aria-hidden="true">›</span>
          <span>{t("breadcrumbCurrent")}</span>
        </nav>
        <h1 className="text-3xl font-semibold">{t("title")}</h1>
        <p className="mt-4 opacity-80">{t("contentUnavailable")}</p>
      </div>
    );
  }

  const body = (about.body ?? {}) as AboutBody;

  const journey = body.journey;
  const values = body.values;
  const passions = body.passions;

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumbHome"), item: `${siteUrl}/${safeLocale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumbCurrent"), item: `${siteUrl}/${safeLocale}/about` },
    ],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdStringify(jsonLdBreadcrumb) }} />

      {/* Breadcrumb back to home */}
      <nav aria-label={t("breadcrumbAria")} className="mb-6 flex items-center gap-2 text-sm text-muted-2">
        <Link href={`/${safeLocale}`} className="hover:underline soft-ring rounded-sm px-1">
          {t("breadcrumbHome")}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-muted">{t("breadcrumbCurrent")}</span>
      </nav>

      <header>
        <h1 className="text-3xl font-semibold">{about.headline}</h1>
        {about.intro ? (
          <p className="mt-4 text-base opacity-90">{about.intro}</p>
        ) : null}
      </header>

      {/* AT A GLANCE (ProfileFactsCard): focus, location, languages, target
          roles, availability. Client hook (useTrack), hence Suspense. */}
      <section className="mt-10">
        <Suspense fallback={
          <div className="h-48 rounded-2xl border bg-black/5 dark:bg-white/5 animate-pulse" />
        }>
          <ProfileFactsCard />
        </Suspense>
      </section>

      {/* TRACK-AWARE INTRODUCTION (AboutTrackIntro): positioning, skills and
          edge for the active track. */}
      <section className="mt-10">
        <SectionTitle>{t("positioningTitle")}</SectionTitle>
        <div className="mt-4">
        <Suspense fallback={
          <div className="rounded-2xl border p-6 space-y-3">
            <div className="h-3 w-16 rounded-full bg-black/5 dark:bg-white/5 animate-pulse" />
            <div className="h-4 rounded-sm bg-black/5 dark:bg-white/5 animate-pulse" />
            <div className="h-4 w-5/6 rounded-sm bg-black/5 dark:bg-white/5 animate-pulse" />
          </div>
        }>
          <AboutTrackIntro />
        </Suspense>
        </div>
      </section>

      {/* ── TECH STACK GRID ──────────────────────────────────────────────────── */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">{t("techStackTitle")}</h2>
        <p className="mt-2 text-sm text-muted">{t("techStackSubtitle")}</p>
        <TechStackGrid />
      </section>

      {/* ── CAREER TIMELINE: static, always visible ────────────────────────
          Years, types and organisations, alongside the "Journey" section. */}
      <section className="mt-10 rounded-2xl border border-black/10 dark:border-white/10 p-6">
        <SectionTitle>{t("careerGlanceTitle")}</SectionTitle>
        <p className="mt-2 text-sm text-muted">{t("careerGlanceSubtitle")}</p>
        <CareerTimeline locale={safeLocale} />
      </section>

      <div className="mt-10 space-y-10">
        {/* JOURNEY: vertical timeline, one step per paragraph */}
        {journey?.title || (journey?.paragraphs?.length ?? 0) > 0 ? (
          <section className="rounded-2xl border p-6">
            <SectionTitle>{journey?.title ?? t("journeyTitle")}</SectionTitle>
            {Array.isArray(journey?.paragraphs) ? (
              <VisualTimeline
                steps={journey!.paragraphs!}
                ariaLabel={journey?.title ?? t("journeyTitle")}
              />
            ) : null}
          </section>
        ) : null}

        {/* VALUES */}
        {values?.title || (values?.items?.length ?? 0) > 0 ? (
          <section className="rounded-2xl border p-6">
            <SectionTitle>{values?.title ?? t("valuesTitle")}</SectionTitle>

            {Array.isArray(values?.items) ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {values!.items!.map((it, idx) => (
                  <article key={idx} className="rounded-2xl border p-4">
                    <h3 className="font-semibold">{it.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed opacity-90">
                      {it.description}
                    </p>
                  </article>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        {/* OUTSIDE WORK / PASSIONS */}
        {passions?.title || (passions?.paragraphs?.length ?? 0) > 0 ? (
          <section className="rounded-2xl border p-6">
            <SectionTitle>{passions?.title ?? t("passionsTitle")}</SectionTitle>
            {Array.isArray(passions?.paragraphs) ? (
              <div className="mt-4 space-y-3">
                {passions!.paragraphs!.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed opacity-90">
                    {p}
                  </p>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

      </div>

      {/* Back to home */}
      <div className="mt-12 border-t border-black/10 dark:border-white/10 pt-8">
        <Link
          href={`/${safeLocale}`}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
        >
          ← {t("backHome")}
        </Link>
      </div>
    </div>
  );
}