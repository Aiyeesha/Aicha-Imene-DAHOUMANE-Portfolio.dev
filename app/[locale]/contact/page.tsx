// app/[locale]/contact/page.tsx
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { getSiteUrl } from "@/lib/siteUrl";
import { jsonLdStringify } from "@/lib/security/jsonLdSafe";
import ContactForm from "@/components/ContactForm";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const isEs = locale === "es";
  const siteUrl = getSiteUrl();
  const urlPath = `${siteUrl}/${locale}/contact`;
  const title = isFr
    ? "Contact — Aïcha Imène DAHOUMANE"
    : isEs
    ? "Contacto — Aïcha Imène DAHOUMANE"
    : "Contact — Aïcha Imène DAHOUMANE";
  const description = isFr
    ? "Contactez-moi pour une mission freelance Salesforce ou IT Ops, une opportunité CDI/CDD, ou toute question professionnelle. Réponse sous 48h."
    : isEs
    ? "Contáctame para una misión freelance de Salesforce o IT Ops, una oportunidad de contrato indefinido/temporal, o cualquier consulta profesional. Respondo en 48h."
    : "Get in touch for a Salesforce or IT Ops freelance mission, a permanent/fixed-term opportunity, or any professional inquiry. I reply within 48h.";
  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/contact`,
        fr: `${siteUrl}/fr/contact`,
        es: `${siteUrl}/es/contact`,
        "x-default": `${siteUrl}/en/contact`,
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
      images: [{ url: `${siteUrl}/${locale}/contact/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/twitter-image`],
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isFr = locale === "fr";
  const isEs = locale === "es";
  const siteUrl = getSiteUrl();

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isFr ? "Accueil" : isEs ? "Inicio" : "Home",
        item: `${siteUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isFr ? "Contact" : isEs ? "Contacto" : "Contact",
        item: `${siteUrl}/${locale}/contact`,
      },
    ],
  };

  const L = {
    breadcrumbHome: isFr ? "Accueil" : isEs ? "Inicio" : "Home",
    title: isFr ? "Qualifier une mission" : isEs ? "Calificar una misión" : "Start an engagement",
    subtitle: isFr
      ? "Un message rapide suffit toujours, mais ce formulaire structuré (secteur, délai, budget indicatif) m'aide à préparer une première réponse déjà cadrée sur votre contexte. Réponse sous 48h."
      : isEs
      ? "Un mensaje rápido siempre es suficiente, pero este formulario estructurado (sector, plazo, presupuesto indicativo) me ayuda a preparar una primera respuesta ya adaptada a tu contexto. Respondo en 48h."
      : "A quick message always works, but this structured form (sector, timeline, indicative budget) helps me prepare a first reply that's already grounded in your context. I reply within 48h.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLdStringify(jsonLdBreadcrumb) }}
      />
      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* Breadcrumb */}
        <nav
          aria-label={isFr ? "Fil d'Ariane" : isEs ? "Ruta de navegación" : "Breadcrumb"}
          className="mb-6 flex items-center gap-2 text-sm text-muted-2"
        >
          <Link href={`/${locale}`} className="hover:underline soft-ring rounded px-1">
            {L.breadcrumbHome}
          </Link>
          <span aria-hidden="true">›</span>
          <span className="text-muted">{L.title}</span>
        </nav>

        <h1 className="text-3xl font-semibold">{L.title}</h1>
        <p className="mt-3 text-muted">{L.subtitle}</p>

        <div className="mt-10">
          <ContactForm extended />
        </div>
      </div>
    </>
  );
}
