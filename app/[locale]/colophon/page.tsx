// app/[locale]/colophon/page.tsx — server component (metadata only)
import { getTranslations } from "next-intl/server";
import { ogLocale, ogAlternateLocales } from "@/lib/i18n/ogLocale";
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/siteUrl";
import ColophonContent from "./colophon-content";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "colophonPage" });
  const siteUrl = getSiteUrl();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
  const urlPath = `${siteUrl}/${locale}/colophon`;
  const title = t("metaTitle");
  const description = t("metaDescription");
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/colophon`,
        fr: `${siteUrl}/fr/colophon`,
        es: `${siteUrl}/es/colophon`,
        "x-default": `${siteUrl}/en/colophon`,
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
    robots: { index: false, follow: true },
  };
}

export default async function ColophonPage({ params }: PageProps) {
  const { locale } = await params;
  return <ColophonContent locale={locale} />;
}
