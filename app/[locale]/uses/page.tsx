// app/[locale]/uses/page.tsx — server component (metadata only)
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/siteUrl";
import UsesContent from "./uses-content";

export const dynamic = "force-static";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const isEs = locale === "es";
  const siteUrl = getSiteUrl();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
  const urlPath = `${siteUrl}/${locale}/uses`;
  const title = isFr
    ? "Setup & Outils — Aïcha Imène DAHOUMANE"
    : isEs
    ? "Configuración y herramientas — Aïcha Imène DAHOUMANE"
    : "Uses & Setup — Aïcha Imène DAHOUMANE";
  const description = isFr
    ? "Mon environnement de développement, mes outils Salesforce et IT Ops, et ce que j'utilise au quotidien."
    : isEs
    ? "Mi entorno de desarrollo, mis herramientas de Salesforce e IT Ops, y lo que uso a diario."
    : "My development environment, Salesforce & IT Ops tools, and what I use daily.";
  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/uses`,
        fr: `${siteUrl}/fr/uses`,
        "x-default": `${siteUrl}/en/uses`,
      },
    },
    openGraph: {
      title,
      description,
      url: urlPath,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
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

export default async function UsesPage({ params }: PageProps) {
  const { locale } = await params;
  return <UsesContent locale={locale} />;
}
