import type { Metadata, Viewport } from "next";
import { getLocale } from "next-intl/server";
import type { ReactNode } from "react";
import "./globals.css";
import { getSiteUrl } from "@/lib/siteUrl";
import { jsonLdStringify } from "@/lib/security/jsonLdSafe";

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
  // Note : les URLs doivent déjà être en ASCII dans l'env var (slug LinkedIn sans accents).
  // new URL().href encode les caractères non-ASCII, ce qui produit des URLs percent-encodées
  // non canoniques (%C3%AF…) — mieux vaut garantir la saisie correcte côté env.
  const sameAs = (process.env.NEXT_PUBLIC_SAME_AS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((url) => { try { return new URL(url).href; } catch { return url; } });

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
          { "@type": "Country", name: "Tunisia" },
          { "@type": "Country", name: "Belgium" },
          { "@type": "Country", name: "Luxembourg" },
          { "@type": "Country", name: "Switzerland" },
          { "@type": "Country", name: "Germany" },
          { "@type": "Country", name: "Italy" },
          { "@type": "Country", name: "Spain" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Ireland" },
          { "@type": "Country", name: "Malta" },
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
// Ce layout appelle headers() via getLocale() (next-intl lit x-next-intl-locale
// en interne). En Next.js App Router, cet appel opt toute la route en rendu
// dynamique (per-request) : Cache-Control: no-store, ISR ignoré, TTFB ~1.5–2s.
//
// L'appel explicite à headers().get("x-nonce") a été supprimé (F3) car
// <script type="application/ld+json"> n'est pas un script exécutable — la
// directive CSP script-src ne s'y applique pas, le nonce y était superflu.
// Next.js applique le nonce à ses propres scripts internes via l'en-tête
// x-nonce posé par proxy.ts, sans que le layout ait à le lire.
//
// CONCLUSION SPIKE TICKET-03 (setRequestLocale) :
//   Deux barrières cumulatives empêchent l'ISR, même avec setRequestLocale :
//
//   1. BARRIÈRE LAYOUT : getLocale() ici est le seul endroit qui lit headers().
//      L'hypothèse était de déplacer <html lang> dans app/[locale]/layout.tsx et
//      d'y appeler setRequestLocale(locale) avant tout appel async. En pratique,
//      Next.js exige que le root layout rende <html>/<body> ; imbriquer une seconde
//      balise <html> dans le locale layout provoque une hydration break (vérifié).
//      Supprimer getLocale() ici nécessite PPR (Partial Pre-Rendering, expérimental).
//
//   2. BARRIÈRE CSP : même si le blocage layout était levé, le nonce CSP généré
//      par requête dans proxy.ts resterait incompatible avec le cache HTML CDN.
//      Un HTML mis en cache par Vercel CDN embarquerait un nonce périmé ; le
//      navigateur bloquerait tous les scripts inline sur chaque cache hit.
//      Abandon du nonce au profit de hash-based CSP serait requis (refacto majeur).
//
//   → setRequestLocale est conservé dans app/[locale]/layout.tsx pour ses bénéfices
//     sur les composants enfants (pas de lecture headers() dans le sous-arbre), mais
//     le Cache-Control: no-store sur les routes HTML reste inchangé.
//
// RÉSOLUTION PRÉVUE — migration homelab (fin 2026) :
//   Nginx / Caddy en reverse proxy peut mettre en cache le HTML rendu à sa couche
//   indépendamment du Cache-Control applicatif. TTFB cible : ~5–20ms sur HIT.
// ─────────────────────────────────────────────────────────────────────────────
export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale(); // "en" | "fr" — lit x-next-intl-locale via headers()
  const jsonLd = buildJsonLd(locale);
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
        {/* Formspree : formulaire de contact (chargé à la demande) */}
        <link rel="dns-prefetch" href="https://formspree.io" />
        {/* Identité sociale — vérification IndieWeb */}
        <link rel="me" href="https://www.linkedin.com/in/aicha-imene-dahoumane" />
        <link rel="me" href="https://github.com/Aiyeesha" />
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
        {/* type="application/ld+json" est une donnée, pas un script exécutable —
            pas besoin de nonce (CSP script-src ne s'applique pas à ce type). */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: jsonLdStringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <GlobalErrorHandler />
        <DevConsoleMessage />
        <ServiceWorkerRegistration />
        {process.env.NODE_ENV === "production" && <Analytics />}
        {process.env.NODE_ENV === "production" && <SpeedInsights />}
      </body>
    </html>
  );
}
