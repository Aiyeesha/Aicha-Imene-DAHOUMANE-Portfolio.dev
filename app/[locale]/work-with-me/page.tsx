// app/[locale]/work-with-me/page.tsx — server component (metadata only)
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/siteUrl";
import { getTranslations } from "next-intl/server";
import { jsonLdStringify } from "@/lib/security/jsonLdSafe";
import WorkWithMeContent from "./work-with-me-content";
import { isAvailableNow } from "@/lib/availability";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const isEs = locale === "es";
  const siteUrl = getSiteUrl();
  const urlPath = `${siteUrl}/${locale}/work-with-me`;
  const title = isFr
    ? "Me recruter — Aïcha Imène DAHOUMANE"
    : isEs
    ? "Contratarme — Aïcha Imène DAHOUMANE"
    : "Hire me — Aïcha Imène DAHOUMANE";
  const description = isFr
    ? "Disponibilité, contrats recherchés, postes visés et déroulé d'un recrutement : l'essentiel pour recruter un profil Salesforce & IT Ops en Île-de-France."
    : isEs
    ? "Disponibilidad, contratos buscados, puestos y proceso de selección: lo esencial para contratar un perfil Salesforce & IT Ops en Île-de-France."
    : "Availability, contract types, target roles and how hiring works: everything you need to hire a Salesforce & IT Ops profile in Île-de-France.";
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
      locale: locale === "fr" ? "fr_FR" : locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US", "es_ES"] : locale === "es" ? ["en_US", "fr_FR"] : ["fr_FR", "es_ES"],
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
  const isEs = locale === "es";
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isFr ? "Accueil" : isEs ? "Inicio" : "Home", item: `${siteUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: isFr ? "Me recruter" : isEs ? "Contratarme" : "Hire me", item: `${siteUrl}/${locale}/work-with-me` },
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
