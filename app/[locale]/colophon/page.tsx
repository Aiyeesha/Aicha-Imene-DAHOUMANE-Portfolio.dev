// app/[locale]/colophon/page.tsx — server component (metadata only)
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/siteUrl";
import ColophonContent from "./colophon-content";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const isEs = locale === "es";
  const siteUrl = getSiteUrl();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
  const urlPath = `${siteUrl}/${locale}/colophon`;
  const title = isFr
    ? "Colophon — Comment ce site est construit"
    : isEs
    ? "Colofón — Cómo está construido este sitio"
    : "Colophon — How this site is built";
  const description = isFr
    ? "Stack technique complète, décisions d'architecture, stratégie de cache et pratiques de sécurité de ce portfolio Next.js."
    : isEs
    ? "Stack técnico completo, decisiones de arquitectura, estrategia de caché y prácticas de seguridad de este portfolio Next.js."
    : "Full technical stack, architecture decisions, caching strategy, and security practices behind this Next.js portfolio.";
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/colophon`,
        fr: `${siteUrl}/fr/colophon`,
        "x-default": `${siteUrl}/en/colophon`,
      },
    },
    openGraph: {
      url: urlPath,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US", "es_ES"] : locale === "es" ? ["en_US", "fr_FR"] : ["fr_FR", "es_ES"],
      title,
      description,
      siteName,
      images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: title }],
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
