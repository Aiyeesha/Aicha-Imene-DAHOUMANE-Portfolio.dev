// app/[locale]/work-with-me/page.tsx — server component (metadata only)
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/siteUrl";
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
    ? "Disponible pour des missions freelance Salesforce et IT Ops — 100 % remote, ouverte à la mobilité et à la relocalisation en France, en Europe et dans les pays anglophones. Découvrez mes conditions, mon process et comment démarrer."
    : "Available for freelance Salesforce and IT Ops missions — 100% remote, open to mobility and relocation in France, Europe, and English-speaking countries worldwide. Find out about my terms, process, and how to get started.";
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
      siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops",
      images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: title }],
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
  return <WorkWithMeContent locale={locale} />;
}
