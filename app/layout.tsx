import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import type { ReactNode } from "react";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Root layout
 * -----------
 * The root layout is the only place where <html> and <body> should appear.
 * We also inject basic JSON-LD (WebSite + Person) for SEO.
 */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  )
};

function buildJsonLd(locale: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Portfolio";
  const personName = process.env.NEXT_PUBLIC_OG_NAME || "Aïcha Imène DAHOUMANE";
  const headline = process.env.NEXT_PUBLIC_OG_HEADLINE || "Salesforce / IT Ops";

  const sameAs = (process.env.NEXT_PUBLIC_SAME_AS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: siteName,
        url: siteUrl,
        inLanguage: locale
      },
      {
        "@type": "Person",
        name: personName,
        url: siteUrl,
        jobTitle: headline,
        sameAs
      }
    ]
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale(); // "en" | "fr"
  const jsonLd = buildJsonLd(locale);
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
