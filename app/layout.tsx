import type { Metadata, Viewport } from "next";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";
import type { ReactNode } from "react";
import "./globals.css";
import { getSiteUrl } from "@/lib/siteUrl";
import { jsonLdStringify } from "@/lib/security/jsonLdSafe";
import { LINKEDIN_URL } from "@/lib/social";

import localFont from "next/font/local";
import DevConsoleMessage from "@/components/DevConsoleMessage";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import GlobalErrorHandler from "@/components/GlobalErrorHandler";

// ── Fonts ──────────────────────────────────────────────────────────────────────
// Space Grotesk for display/headings, Inter for body text. Self-hosted
// (app/fonts/, Fontsource variable files, SIL OFL 1.1) so the build does not
// download from Google Fonts. font-display: swap; Latin subset (FR/EN/ES).
// Each exposes a CSS variable used by the Tailwind theme (--font-display /
// --font-body in app/globals.css).

const spaceGrotesk = localFont({
  src: "./fonts/space-grotesk-latin-wght.woff2",
  variable: "--font-space-grotesk",
  display: "swap",
  weight: "300 700",
});

const inter = localFont({
  src: "./fonts/inter-latin-wght.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

// Root layout: the single <html>/<body> entry point.
// metadataBase comes from NEXT_PUBLIC_SITE_URL (needed for relative OG URLs);
// WebSite + Person JSON-LD is injected in <head>.

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
  // PWA icons, declared here so Next.js adds the <link> tags
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    // apple-touch-icon: iOS Safari (bookmarks, home screen)
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  // RSS feeds announced in <head>: EN (/feed.xml), FR (/feed-fr.xml), ES (/feed-es.xml).
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: "RSS Feed (EN)" },
        { url: "/feed-fr.xml", title: "Flux RSS (FR)" },
        { url: "/feed-es.xml", title: "Feed RSS (ES)" },
      ],
    },
  },
};

/**
 * Schema.org JSON-LD for <head>: WebSite (name, URL) and Person (identity,
 * job title, social profiles). Configured through public env variables.
 */
function buildJsonLd(locale: string) {
  const siteUrl = getSiteUrl();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
  const personName = process.env.NEXT_PUBLIC_OG_NAME || "Aïcha Imène DAHOUMANE";
  const headline = process.env.NEXT_PUBLIC_OG_HEADLINE || "Salesforce · Systems & Networks · DevOps";

  // Social and professional profiles (LinkedIn, GitHub…), comma-separated.
  // URLs must already be ASCII in the env var: new URL().href would
  // percent-encode accented characters into non-canonical URLs.
  const sameAs = (process.env.NEXT_PUBLIC_SAME_AS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((url) => { try { return new URL(url).href; } catch { return url; } });

  // Person id in the JSON-LD graph
  const personId = `${siteUrl}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // WebSite
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        // No inLanguage (non-standard on WebSite, and it caused @id conflicts
        // between locales) and no SearchAction (/blog?q= has no server-side search).
      },

      // Person
      {
        "@type": "Person",
        "@id": personId,
        name: personName,
        url: siteUrl,
        jobTitle: headline,
        description: "Salesforce Developer and IT Ops engineer based in Île-de-France, France, looking for a permanent, fixed-term, temp or umbrella-company role in any industry — on-site or hybrid; priority Paris / Île-de-France, then international relocation.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "FR",
          addressRegion: "Île-de-France",
          addressLocality: "Val-d'Oise"
        },
        // Key skills for the Knowledge Graph
        knowsAbout: [
          "Salesforce", "Apex", "Lightning Web Components", "SOQL",
          "CI/CD", "DevOps", "Linux", "Docker", "GitHub Actions",
          "IT Operations", "System Administration"
        ],
        sameAs,
        // About page for details
        mainEntityOfPage: `${siteUrl}/${locale}/about`
      },
    ]
  };
}

// ── Note: CSP nonce vs CDN caching ───────────────────────────────────────────
// getLocale() reads headers(), which makes every route dynamic
// (Cache-Control: no-store, no ISR). Two things prevent ISR even with
// setRequestLocale:
//   1. The root layout must render <html>/<body>, and moving <html lang> to
//      app/[locale]/layout.tsx breaks hydration; avoiding getLocale() here
//      would need Partial Prerendering.
//   2. The per-request CSP nonce (proxy.ts) cannot be cached: a cached page
//      would carry a stale nonce and its scripts would be blocked. Caching
//      HTML would require a hash-based CSP.
// setRequestLocale is still used in app/[locale]/layout.tsx for the child
// components. Next.js applies the nonce to its own scripts from the x-nonce
// header set by proxy.ts; the layout does not need to read it.
// ─────────────────────────────────────────────────────────────────────────────
export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale(); // reads x-next-intl-locale through headers()
  const jsonLd = buildJsonLd(locale);
  // data-track is rendered on the server so IT Ops visitors never see the
  // Salesforce gradient before hydration. Same cookie and fallback as the
  // locale layout's initialTrack; the `itops:` CSS variant relies on it.
  const track = (await cookies()).get("track")?.value === "itops" ? "itops" : "salesforce";
  return (
    <html
      lang={locale}
      data-track={track}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <head>
        {/* IndieWeb identity. Same LinkedIn URL source as the visible links. */}
        {LINKEDIN_URL && <link rel="me" href={LINKEDIN_URL} />}
        <link rel="me" href="https://github.com/Aiyeesha" />
        {/* No manual avatar preload: next/image with priority already
            preloads the optimised variant.
            application/ld+json is data, not executable script, so it needs no
            CSP nonce. */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: jsonLdStringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <GlobalErrorHandler />
        <DevConsoleMessage />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
