// app/[locale]/uses/page.tsx — server component (metadata only)
import { getTranslations } from "next-intl/server";
import { ogLocale, ogAlternateLocales } from "@/lib/i18n/ogLocale";
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/siteUrl";
import UsesContent from "./uses-content";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "uses" });
  const siteUrl = getSiteUrl();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
  const urlPath = `${siteUrl}/${locale}/uses`;
  const title = t("metaTitle");
  const description = t("metaDescription");
  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/uses`,
        fr: `${siteUrl}/fr/uses`,
        es: `${siteUrl}/es/uses`,
        "x-default": `${siteUrl}/en/uses`,
      },
    },
    openGraph: {
      title,
      description,
      url: urlPath,
      type: "website",
      locale: ogLocale(locale),
      alternateLocale: ogAlternateLocales(locale),
      siteName,
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

export default async function UsesPage({ params }: PageProps) {
  const { locale } = await params;
  return <UsesContent locale={locale} />;
}
