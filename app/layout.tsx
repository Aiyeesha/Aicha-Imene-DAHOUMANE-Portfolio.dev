import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import type { ReactNode } from "react";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Root layout — point d'entrée HTML unique (html + body)
// --------------------------------------------------------
// SEO :
//   - metadataBase configurée depuis NEXT_PUBLIC_SITE_URL (nécessaire pour les balises OG relatives)
//   - JSON-LD Schema.org injecté en <head> :
//       WebSite + Person + ProfessionalService
//   - Validable sur : https://validator.schema.org/
//
// Analytics Vercel + Speed Insights uniquement en production.

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
  // Icônes PWA — déclarées ici pour que Next.js injecte les <link> dans <head>
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    // apple-touch-icon : iOS Safari (favoris, écran d'accueil)
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  }
};

/**
 * Construit le bloc JSON-LD Schema.org injecté dans <head>.
 * Contient :
 *   - WebSite : nom du site, URL, langue
 *   - Person  : identité professionnelle, titre, réseaux sociaux (sameAs)
 *   - ProfessionalService : nature des services proposés (Salesforce, IT Ops)
 *
 * Configurable via variables d'environnement (pas de secrets nécessaires).
 */
function buildJsonLd(locale: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Portfolio";
  const personName = process.env.NEXT_PUBLIC_OG_NAME || "Aïcha Imène DAHOUMANE";
  const headline = process.env.NEXT_PUBLIC_OG_HEADLINE || "Salesforce Developer & Consultant";

  // Liste des profils sociaux/professionnels (LinkedIn, GitHub…) — séparés par des virgules dans l'env var
  const sameAs = (process.env.NEXT_PUBLIC_SAME_AS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // Identifiant unique de la personne dans le graphe JSON-LD
  const personId = `${siteUrl}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // WebSite — entité de base du site
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        inLanguage: locale === "fr" ? "fr-FR" : "en-US",
        // Permet à Google de générer un champ de recherche dans les résultats
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/${locale}/blog?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },

      // Person — profil professionnel indexable
      {
        "@type": "Person",
        "@id": personId,
        name: personName,
        url: siteUrl,
        jobTitle: headline,
        // knowsAbout : compétences clés pour le rich snippet Knowledge Graph
        knowsAbout: [
          "Salesforce", "Apex", "Lightning Web Components", "SOQL",
          "CI/CD", "DevOps", "Linux", "Docker", "GitHub Actions",
          "IT Operations", "System Administration"
        ],
        sameAs,
        // Lien vers la page About pour plus de détails
        mainEntityOfPage: `${siteUrl}/${locale}/about`
      },

      // ProfessionalService — nature des services proposés
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        name: siteName,
        url: siteUrl,
        provider: { "@id": personId },
        // Catégories de services
        serviceType: ["Salesforce Development", "Salesforce Administration", "IT Operations", "DevOps"],
        areaServed: "FR",
        inLanguage: locale === "fr" ? "fr-FR" : "en-US"
      }
    ]
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale(); // "en" | "fr"
  const jsonLd = buildJsonLd(locale);
  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}
        {process.env.NODE_ENV === "production" && <Analytics />}
        {process.env.NODE_ENV === "production" && <SpeedInsights />}
      </body>
    </html>
  );
}
