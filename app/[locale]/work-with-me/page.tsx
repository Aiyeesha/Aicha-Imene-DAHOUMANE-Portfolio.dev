// app/[locale]/work-with-me/page.tsx — server component (metadata only)
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/siteUrl";
import { jsonLdStringify } from "@/lib/security/jsonLdSafe";
import WorkWithMeContent from "./work-with-me-content";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const siteUrl = getSiteUrl();
  const urlPath = `${siteUrl}/${locale}/work-with-me`;
  const title = isFr
    ? "Travaillons ensemble — Aïcha Imène DAHOUMANE"
    : "Work with me — Aïcha Imène DAHOUMANE";
  const description = isFr
    ? "Développeuse Salesforce & IT Ops — 100 % Remote, hybride ou sur site, mobilité & relocalisation envisageables. Disponible pour missions en France, Europe et pays anglophones."
    : "Salesforce Developer & IT Ops consultant — 100 % Remote, hybrid or on-site, open to mobility & relocation. Available for missions in France, Europe & English-speaking markets.";
  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/work-with-me`,
        fr: `${siteUrl}/fr/work-with-me`,
        "x-default": `${siteUrl}/en/work-with-me`,
      },
    },
    openGraph: {
      title,
      description,
      url: urlPath,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops",
      images: [{ url: `${siteUrl}/${locale}/work-with-me/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/twitter-image`],
    },
  };
}

export default async function WorkWithMePage({ params }: PageProps) {
  const { locale } = await params;
  const siteUrl = getSiteUrl();
  const isFr = locale === "fr";
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isFr ? "Accueil" : "Home", item: `${siteUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: isFr ? "Travaillons ensemble" : "Work with me", item: `${siteUrl}/${locale}/work-with-me` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdStringify(jsonLdBreadcrumb) }} />
      <WorkWithMeContent locale={locale} />
    </>
  );
}
