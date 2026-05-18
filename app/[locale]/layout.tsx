import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Providers from "./providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import SkipToContent from "@/components/SkipToContent";
import ScrollToTop from "@/components/ScrollToTop";
import CommandPaletteLoader from "@/components/CommandPaletteLoader";
import CursorSpotlight from "@/components/CursorSpotlight";

/**
 * Locale layout
 * -------------
 * - Loads translations for the current locale
 * - Wraps the app with NextIntlClientProvider and client Providers (theme + track)
 *
 * IMPORTANT: Do NOT render <html>/<body> here (only in app/layout.tsx), otherwise hydration breaks.
 */

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "fr" ? "fr" : "en";
  const t = await getTranslations({ locale: locale });

  const title = t("metadata.title");
  const description = t("metadata.description");

  // NEXT_PUBLIC_SITE_URL est prioritaire (domaine custom).
  // VERCEL_URL n'est utilisé qu'en production Vercel — en preview, chaque déploiement
  // a une URL éphémère différente qui ne doit pas polluer les canonicals et og:url.
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_ENV === "production" && process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  const canonical = `${siteUrl}/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl}/en`,
        fr: `${siteUrl}/fr`,
        "x-default": `${siteUrl}/en`,
      }
    },
    openGraph: {
      type: "website",
      url: canonical,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      title,
      description,
      siteName: "Aïcha Imène DAHOUMANE — Salesforce & IT Ops",
      images: [
        {
          // URL absolue requise : certains crawlers OG (LinkedIn, Slack, WhatsApp)
          // n'utilisent pas metadataBase et échouent sur les URLs relatives.
          url: `${siteUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/twitter-image`]
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "fr" ? "fr" : "en";
  // next-intl resolves the current locale from the segment automatically.
  const messages = await getMessages({ locale: locale });
  const t = await getTranslations({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {/* initialTrack defaults to "salesforce"; Providers restores the saved
          preference from localStorage on mount (see providers.tsx useEffect).
          Removing cookies() here enables ISR and CDN caching for all pages. */}
      <Providers initialTrack="salesforce">
        <CursorSpotlight />
        <div className="min-h-screen bg-white text-slate-900 dark:bg-[#070B1A] dark:text-white">
          <div className="page-gradient" />

          <div className="relative z-10">
            <SkipToContent targetId="main" label={t("a11y.skip")} />
            <Navbar />
            {/* Palette de commandes globale — ⌘K / Ctrl+K */}
            <CommandPaletteLoader />

            {/*
              Global content container
              - Top padding is handled here so every page clears the fixed navbar.
              - Pages can focus on their content and internal spacing.
            */}
            <main id="main" className="mx-auto max-w-6xl px-6 pt-[var(--nav-offset)]">
              {children}
            </main>

            {/* Bouton "Retour en haut" — apparaît après 300px de scroll */}
            <ScrollToTop />

            <footer className="border-t border-black/10 dark:border-white/10 py-10 mt-14">
              <div className="mx-auto max-w-6xl px-6 text-sm text-muted-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span>
                    © {new Date().getFullYear()} Aïcha Imène DAHOUMANE — {t("footer.builtWith")}
                  </span>
                  {/* Link (Next.js) pour la navigation SPA — évite le rechargement de page
                      complet que <a href> provoque sur les routes locales. */}
                  <nav aria-label={t("footer.nav")} className="flex flex-wrap items-center gap-4">
                    <Link
                      className="underline underline-offset-4 hover:opacity-80 soft-ring rounded"
                      href={`/${locale}/work-with-me`}
                    >
                      {t("footer.workWithMe")}
                    </Link>
                    <Link
                      className="underline underline-offset-4 hover:opacity-80 soft-ring rounded"
                      href={`/${locale}/colophon`}
                    >
                      Colophon
                    </Link>
                    <Link
                      className="underline underline-offset-4 hover:opacity-80 soft-ring rounded"
                      href={`/${locale}/privacy`}
                    >
                      {t("footer.privacy")}
                    </Link>
                    <Link
                      className="underline underline-offset-4 hover:opacity-80 soft-ring rounded"
                      href={`/${locale}/legal`}
                    >
                      {t("footer.legal")}
                    </Link>
                    <Link
                      className="underline underline-offset-4 hover:opacity-80 soft-ring rounded"
                      href={`/${locale}/accessibility`}
                    >
                      {t("footer.accessibility")}
                    </Link>
                    <Link
                      className="underline underline-offset-4 hover:opacity-80 soft-ring rounded"
                      href={`/${locale}/status`}
                    >
                      {t("footer.status")}
                    </Link>
                    <Link
                      className="underline underline-offset-4 hover:opacity-80 soft-ring rounded"
                      href={`/${locale}/changelog`}
                    >
                      {t("footer.changelog")}
                    </Link>
                  </nav>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}
