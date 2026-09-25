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
    ? "Recruteurs : présentez-moi votre poste Salesforce, IT Ops ou hybride (CDI, CDD, intérim ou portage, tous secteurs). Réponse sous 48 h."
    : isEs
    ? "Reclutadores: preséntame tu puesto Salesforce, IT Ops o híbrido (indefinido, temporal, ETT o portage, todos los sectores). Respondo en 48 h."
    : "Recruiters: tell me about your Salesforce, IT Ops or hybrid role (permanent, fixed-term, temp or umbrella, any industry). I reply within 48 hours.";
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
    title: isFr ? "Me proposer un poste" : isEs ? "Proponerme un puesto" : "Tell me about your role",
    subtitle: isFr
      ? "Un message rapide suffit toujours. Si vous le souhaitez, précisez l'intitulé du poste, le type de contrat, le lieu et la date de prise de poste : je pourrai vous répondre précisément dès le premier échange. Réponse sous 48 h."
      : isEs
      ? "Un mensaje rápido siempre es suficiente. Si lo deseas, indica el nombre del puesto, el tipo de contrato, el lugar y la fecha de incorporación: así podré responderte con precisión desde el primer intercambio. Respondo en 48 h."
      : "A quick message always works. If you like, add the job title, contract type, location and start date so I can give you a precise answer from the very first exchange. I reply within 48 hours.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLdStringify(jsonLdBreadcrumb) }}
      />
      {/*
        max-w-2xl (672px) était hérité du gabarit "page de contenu" du reste du
        site, pensé pour du texte en colonne unique — mais ContactForm en mode
        `extended` rend une grille large `lg:grid-cols-[1fr_420px]` (formulaire +
        sidebar "Liens rapides"). À 672px, la colonne 1fr retombait à ~200-250px :
        les <select> du formulaire étendu tronquaient leur propre placeholder
        (repéré par l'utilisatrice sur le site de prod, audit 2026-08-13).
        max-w-4xl (896px) laisse ~430px à la colonne formulaire une fois les
        420px fixes de la sidebar et le gap soustraits — le texte d'en-tête
        (h1/breadcrumb/subtitle) n'a pas de max-width propre donc en hérite
        aussi, ce qui reste confortable à lire à cette largeur. */}
      <div className="mx-auto max-w-4xl px-4 py-10">
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
        <p className="mt-3 max-w-2xl text-muted">{L.subtitle}</p>

        <div className="mt-10">
          <ContactForm extended />
        </div>
      </div>
    </>
  );
}
