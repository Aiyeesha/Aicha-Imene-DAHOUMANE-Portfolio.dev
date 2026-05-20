import type { Metadata, Viewport } from "next";
import { getLocale } from "next-intl/server";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import "./globals.css";
import { getSiteUrl } from "@/lib/siteUrl";

import { Space_Grotesk, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import DevConsoleMessage from "@/components/DevConsoleMessage";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import GlobalErrorHandler from "@/components/GlobalErrorHandler";

// ── Polices premium ────────────────────────────────────────────────────────────
// Space Grotesk : display/titres — distinctive, géométrique, moderne
// Inter         : corps de texte — lisible, neutre, éprouvée
//
// font-display: swap évite le FOIT (flash of invisible text).
// subsets : latin couvre le français et l'anglais.
// variable : expose une CSS variable pour Tailwind.

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Root layout — point d'entrée HTML unique (html + body)
// --------------------------------------------------------
// SEO :
//   - metadataBase configurée depuis NEXT_PUBLIC_SITE_URL (nécessaire pour les balises OG relatives)
//   - JSON-LD Schema.org injecté en <head> :
//       WebSite + Person + ProfessionalService
//   - Validable sur : https://validator.schema.org/
//
// Analytics Vercel + Speed Insights uniquement en production.

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#0c1425" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  // Icônes PWA — déclarées ici pour que Next.js injecte les <link> dans <head>
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    // apple-touch-icon : iOS Safari (favoris, écran d'accueil)
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  // Flux RSS — annoncé dans <head> pour les lecteurs de flux et moteurs de recherche
  // Deux flux : EN (/feed.xml) et FR (/feed-fr.xml) pour l'audience francophone.
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: "RSS Feed (EN)" },
        { url: "/feed-fr.xml", title: "Flux RSS (FR)" },
      ],
    },
  },
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
  const siteUrl = getSiteUrl();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
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
        // potentialAction SearchAction supprimée : la route /blog?q= n'implémente
        // pas de recherche côté serveur — Google ignorerait ou déprécierait l'entrée.
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
        name: personName,
        url: siteUrl,
        provider: { "@id": personId },
        // Catégories de services
        serviceType: ["Salesforce Development", "Salesforce Administration", "IT Operations", "DevOps"],
        areaServed: [
          { "@type": "Country", name: "France" },
          { "@type": "Country", name: "Algeria" },
          { "@type": "Country", name: "Belgium" },
          { "@type": "Country", name: "Switzerland" },
          { "@type": "Country", name: "Luxembourg" },
          { "@type": "Country", name: "Canada" },
          "Worldwide", // remote international — string Text valide Schema.org
        ],
        inLanguage: locale === "fr" ? "fr-FR" : "en-US"
      }
    ]
  };
}

// ── NOTE ARCHITECTURALE : tension CSP nonce ↔ cache CDN ──────────────────────
//
// Ce layout appelle headers() à deux endroits :
//   1. getLocale()         → next-intl lit x-next-intl-locale via headers() en interne
//   2. headers().get("x-nonce") → lecture du nonce CSP injecté par proxy.ts
//
// En Next.js App Router, tout appel à headers() dans l'arbre de rendu opt le
// ROUTE ENTIER en rendu dynamique (per-request), ce qui force :
//   - Cache-Control: private, no-cache, no-store (posé par Next.js)
//   - X-Vercel-Cache: MISS sur toutes les requêtes (CDN ne cache pas)
//   - ISR (revalidate: 3600 dans page.tsx) ignoré — la page est re-rendue à chaque req.
//   - TTFB = cold start serverless (~1.5–2s sur Vercel Hobby)
//
// CE COMPORTEMENT EST INTENTIONNEL. La sécurité prime sur la performance CDN :
//   - Nonce unique par requête + 'strict-dynamic' = CSP niveau 3 (gold standard)
//   - Régresser vers 'unsafe-inline' pour gagner du cache CDN serait une
//     dégradation de sécurité inacceptable.
//
// RÉSOLUTION PRÉVUE — migration homelab (fin 2026) :
//   Nginx / Caddy en reverse proxy peut mettre en cache le HTML rendu à sa couche
//   (proxy_cache / Cache directive), indépendamment du Cache-Control applicatif.
//   Séparation des responsabilités : l'app reste dynamique + sécurisée,
//   le cache est géré par l'infra. TTFB cible : ~5–20ms sur cache HIT.
//
//   Exemple Nginx (à configurer côté homelab) :
//     proxy_cache_valid 200 1h;
//     proxy_ignore_headers Cache-Control;   # ignore le no-store de l'app
//     proxy_cache_bypass $http_pragma;      # bypass sur Ctrl+F5
// ─────────────────────────────────────────────────────────────────────────────
export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale(); // "en" | "fr" — lit x-next-intl-locale via headers()
  const jsonLd = buildJsonLd(locale);
  // Lire le nonce injecté par proxy.ts dans les headers de requête.
  // undefined si le middleware ne tourne pas (build statique, tests).
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <head>
        {/* Preconnect — réduit la latence DNS+TCP+TLS pour les APIs SSR et client */}
        {/* Supabase : projets, certifications, about (SSR + client) */}
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} crossOrigin="anonymous" />
        )}
        {/* Upstash Redis : cache API rate-limiting */}
        {process.env.UPSTASH_REDIS_REST_URL && (
          <link rel="dns-prefetch" href={new URL(process.env.UPSTASH_REDIS_REST_URL).origin} />
        )}
        {/* Formspree : formulaire de contact (chargé à la demande) */}
        <link rel="dns-prefetch" href="https://formspree.io" />
        {/* Preload avatar — candidat LCP (Largest Contentful Paint) sur le hero.
            fetchpriority="high" priorise le téléchargement avant le parsing du Hero.
            Gain LCP typique : ~200–400ms sur Chrome/Edge.
            Dégradation gracieuse : ignoré silencieusement sur Firefox et Safari < 17.2
            (pas de régression, juste pas de gain de priorité sur ces navigateurs). */}
        <link
          rel="preload"
          as="image"
          href={process.env.NEXT_PUBLIC_AVATAR_URL || "/avatar.webp"}
          fetchPriority="high"
        />
        {/* nonce : autorise ce script inline dans la CSP sans 'unsafe-inline' */}
        <script
          type="application/ld+json"
          nonce={nonce}
          suppressHydrationWarning
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <GlobalErrorHandler />
        <DevConsoleMessage />
        <ServiceWorkerRegistration />
        {/* nonce transmis pour que les scripts Vercel respectent la CSP */}
        {process.env.NODE_ENV === "production" && <Analytics />}
        {process.env.NODE_ENV === "production" && <SpeedInsights />}
      </body>
    </html>
  );
}
