import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Providers from "./providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { headers, cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import SkipToContent from "@/components/SkipToContent";
import ScrollToTop from "@/components/ScrollToTop";
import CommandPaletteLoader from "@/components/CommandPaletteLoader";
import CursorSpotlight from "@/components/CursorSpotlight";
import { getSiteUrl } from "@/lib/siteUrl";
import { GITHUB_URL } from "@/lib/social";
import { getFeaturedProjectsForNav } from "@/lib/data/projects";

/**
 * Locale layout
 * -------------
 * - Loads translations for the current locale
 * - Wraps the app with NextIntlClientProvider and client Providers (theme + track)
 *
 * IMPORTANT: Do NOT render <html>/<body> here (only in app/layout.tsx), otherwise hydration breaks.
 *
 * TICKET-03 SPIKE — setRequestLocale :
 * setRequestLocale(locale) est appelé en premier dans ce layout. Cela permet à next-intl
 * d'utiliser le segment d'URL comme source de vérité (pas les headers()) pour tous les
 * composants enfants qui appelleront getLocale()/getTranslations(). Cela active aussi
 * generateStaticParams pour la pré-génération statique des deux locales.
 *
 * CONCLUSION DU SPIKE : ISR reste inopérant malgré ce changement. Le root layout
 * (app/layout.tsx) appelle toujours getLocale() pour <html lang> — seul endroit où
 * les headers() sont lus. Déplacer <html> dans ce layout provoquerait une hydration
 * break (deux balises <html> imbriquées). De plus, même si getLocale() était supprimé,
 * le nonce CSP par requête de proxy.ts reste incompatible avec le cache HTML CDN.
 * Résolution : reverse-proxy homelab (fin 2026). Voir app/layout.tsx.
 */

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "fr" ? "fr" : rawLocale === "es" ? "es" : "en";
  const t = await getTranslations({ locale: locale });

  const title = t("metadata.title");
  const description = t("metadata.description");

  const siteUrl = getSiteUrl();

  const canonical = `${siteUrl}/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl}/en`,
        fr: `${siteUrl}/fr`,
        es: `${siteUrl}/es`,
        "x-default": `${siteUrl}/en`,
      }
    },
    openGraph: {
      type: "website",
      url: canonical,
      locale: locale === "fr" ? "fr_FR" : locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US", "es_ES"] : locale === "es" ? ["en_US", "fr_FR"] : ["fr_FR", "es_ES"],
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
  const locale = rawLocale === "fr" ? "fr" : rawLocale === "es" ? "es" : "en";
  // Stocker la locale dans l'AsyncLocalStorage de next-intl AVANT tout appel async.
  // Permet aux composants enfants d'appeler getLocale()/getTranslations() sans lire headers().
  setRequestLocale(locale);
  const messages = await getMessages({ locale: locale });
  const t = await getTranslations({ locale });
  const featuredProjectsForNav = await getFeaturedProjectsForNav(locale);
  // Nonce CSP posé par proxy.ts — transmis à ThemeProvider pour que son script
  // inline de détection de thème soit autorisé par la CSP strict-dynamic.
  // Résout aussi le warning React 19 "Encountered a script tag while rendering".
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  // Lu côté serveur pour éviter le flash "Salesforce" au premier paint SSR chez
  // un visiteur déjà passé sur IT Ops (cookie posé par providers.tsx setTrack()).
  // Sans danger pour le cache : le nonce CSP ci-dessus force déjà Cache-Control:
  // no-store / rendu dynamique sur toute cette route (voir commentaire au-dessus
  // et app/[locale]/status/page.tsx) — lire ce cookie ne dégrade donc rien qui
  // ne soit pas déjà non mis en cache.
  const trackCookie = (await cookies()).get("track")?.value;
  const initialTrack = trackCookie === "itops" ? "itops" : "salesforce";

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {/* initialTrack vient du cookie côté serveur (fallback "salesforce" si absent).
          Providers resynchronise depuis localStorage au montage (providers.tsx
          useEffect) uniquement comme filet pour le tout premier visiteur avant
          que le cookie n'existe. */}
      <Providers initialTrack={initialTrack} nonce={nonce}>
        <CursorSpotlight />
        <div className="min-h-screen bg-white text-slate-900 dark:bg-[#070B1A] dark:text-white">
          <div className="page-gradient" />

          <div className="relative z-10">
            <SkipToContent targetId="main" label={t("a11y.skip")} />
            <Navbar featuredProjects={featuredProjectsForNav} />
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
                    © 2025–{new Date().getFullYear()} Aïcha Imène DAHOUMANE — {t("footer.builtWith")}
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
                      {t("footer.colophon")}
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
                    <Link
                      className="underline underline-offset-4 hover:opacity-80 soft-ring rounded"
                      href={`/${locale}/uses`}
                    >
                      {t("footer.uses")}
                    </Link>
                    {GITHUB_URL && (
                      <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        className="underline underline-offset-4 hover:opacity-80 soft-ring rounded"
                      >
                        GitHub
                      </a>
                    )}
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
