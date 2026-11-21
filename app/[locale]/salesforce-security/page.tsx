// app/[locale]/salesforce-security/page.tsx — server component
// ----------------------------------------------------------
// "Salesforce security" page: the four levels of an org's security (record
// sharing, object/field access, Apex, integrations), each tied to a project.
// Content from the "sfSecurity" namespace of messages/{fr,en,es}.json. Fully
// server-rendered.
import { ogLocale, ogAlternateLocales } from "@/lib/i18n/ogLocale";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getSiteUrl } from "@/lib/siteUrl";
import { jsonLdStringify } from "@/lib/security/jsonLdSafe";
import SalesforceSecurityContent from "./salesforce-security-content";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sfSecurity" });
  const siteUrl = getSiteUrl();
  const urlPath = `${siteUrl}/${locale}/salesforce-security`;
  const title = t("metaTitle");
  const description = t("metaDescription");
  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/salesforce-security`,
        fr: `${siteUrl}/fr/salesforce-security`,
        es: `${siteUrl}/es/salesforce-security`,
        "x-default": `${siteUrl}/en/salesforce-security`,
      },
    },
    openGraph: {
      title,
      description,
      url: urlPath,
      type: "website",
      locale: ogLocale(locale),
      alternateLocale:
        ogAlternateLocales(locale),
      siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops",
      images: [{ url: `${siteUrl}/${locale}/salesforce-security/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/${locale}/salesforce-security/opengraph-image`],
    },
  };
}

export default async function SalesforceSecurityPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sfSecurity" });
  const siteUrl = getSiteUrl();

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumbHome"), item: `${siteUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumbCurrent"), item: `${siteUrl}/${locale}/salesforce-security` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdStringify(jsonLdBreadcrumb) }} />
      <SalesforceSecurityContent locale={locale} />
    </>
  );
}
