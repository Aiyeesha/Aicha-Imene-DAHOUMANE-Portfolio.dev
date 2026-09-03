// app/[locale]/hybride/page.tsx — server component
// -------------------------------------------------
// Page « Profil hybride » : trois cas concrets où résoudre le problème exige la
// combinaison Salesforce + infrastructure + sécurité — pas leur juxtaposition.
// Contenu trilingue depuis messages/{fr,en,es}.json → namespace "hybrid".
// Volontairement track-neutre (le sujet EST la combinaison), donc pas de
// dépendance au toggle : rendu 100 % serveur.
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getSiteUrl } from "@/lib/siteUrl";
import { jsonLdStringify } from "@/lib/security/jsonLdSafe";
import HybrideContent from "./hybride-content";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hybrid" });
  const siteUrl = getSiteUrl();
  const urlPath = `${siteUrl}/${locale}/hybride`;
  const title = t("metaTitle");
  const description = t("metaDescription");
  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/hybride`,
        fr: `${siteUrl}/fr/hybride`,
        es: `${siteUrl}/es/hybride`,
        "x-default": `${siteUrl}/en/hybride`,
      },
    },
    openGraph: {
      title,
      description,
      url: urlPath,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : locale === "es" ? "es_ES" : "en_US",
      alternateLocale:
        locale === "fr" ? ["en_US", "es_ES"] : locale === "es" ? ["en_US", "fr_FR"] : ["fr_FR", "es_ES"],
      siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/twitter-image`],
    },
  };
}

export default async function HybridePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hybrid" });
  const siteUrl = getSiteUrl();

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumbHome"), item: `${siteUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumbCurrent"), item: `${siteUrl}/${locale}/hybride` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdStringify(jsonLdBreadcrumb) }} />
      <HybrideContent locale={locale} />
    </>
  );
}
