// app/[locale]/work-with-me/page.tsx — server component (metadata only)
import { ogLocale, ogAlternateLocales } from "@/lib/i18n/ogLocale";
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/siteUrl";
import { getTranslations } from "next-intl/server";
import { jsonLdStringify } from "@/lib/security/jsonLdSafe";
import WorkWithMeContent from "./work-with-me-content";
import { isAvailableNow } from "@/lib/availability";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "workWithMePage" });
  const siteUrl = getSiteUrl();
  const urlPath = `${siteUrl}/${locale}/work-with-me`;
  const title = t("metaTitle");
  const description = t("metaDescription");
  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/work-with-me`,
        fr: `${siteUrl}/fr/work-with-me`,
        es: `${siteUrl}/es/work-with-me`,
        "x-default": `${siteUrl}/en/work-with-me`,
      },
    },
    openGraph: {
      title,
      description,
      url: urlPath,
      type: "website",
      locale: ogLocale(locale),
      alternateLocale: ogAlternateLocales(locale),
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
  const tc = await getTranslations({ locale, namespace: "common" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: tc("home"), item: `${siteUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: tn("workWithMe"), item: `${siteUrl}/${locale}/work-with-me` },
    ],
  };
  // FAQPage JSON-LD, from the same `faq` namespace as the displayed FAQ.
  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const faqItems = tFaq.raw("items") as { q: string; a: string }[];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdStringify(jsonLdBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdStringify(faqJsonLd) }} />
      <WorkWithMeContent locale={locale} availableNow={isAvailableNow()} />
    </>
  );
}
