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
import { getFeaturedProjectsForNav, getSecurityClusterCount } from "@/lib/data/projects";

/**
 * Locale layout
 * -------------
 * - Loads translations for the current locale
 * - Wraps the app with NextIntlClientProvider and client Providers (theme + track)
 *
 * IMPORTANT: Do NOT render <html>/<body> here (only in app/layout.tsx), otherwise hydration breaks.
 *
 * setRequestLocale(locale) is called first so child components get the
 * locale from the URL segment rather than headers(), and it enables
 * generateStaticParams. Routes stay dynamic anyway (see app/layout.tsx).
 */

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }, { locale: "es" }];
}

// Home page metadata lives in app/[locale]/page.tsx: declared here it would
// be inherited by the 404 and every page without its own (canonical to
// /{locale}, home description).

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "fr" ? "fr" : rawLocale === "es" ? "es" : "en";
  // Store the locale in next-intl's AsyncLocalStorage before any async call,
  // so children can call getLocale()/getTranslations() without headers().
  setRequestLocale(locale);
  const messages = await getMessages({ locale: locale });
  const t = await getTranslations({ locale });
  const [featuredProjectsForNav, securityClusterCount] = await Promise.all([
    getFeaturedProjectsForNav(locale),
    getSecurityClusterCount(locale),
  ]);
  // CSP nonce from proxy.ts, passed to ThemeProvider so its inline theme
  // script is allowed (strict-dynamic). Also avoids React 19's "Encountered a
  // script tag while rendering" warning.
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  // Read on the server so returning IT Ops visitors never see the Salesforce
  // variant first (cookie set by setTrack() in providers.tsx). The route is
  // already dynamic because of the nonce, so this costs no caching.
  const trackCookie = (await cookies()).get("track")?.value;
  const initialTrack = trackCookie === "itops" ? "itops" : "salesforce";

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {/* initialTrack comes from the cookie ("salesforce" when missing).
          Providers falls back to localStorage on mount only for first-time
          visitors without a cookie. */}
      <Providers initialTrack={initialTrack} nonce={nonce}>
        <CursorSpotlight />
        <div className="min-h-screen bg-white text-slate-900 dark:bg-[#070B1A] dark:text-white">
          <div className="page-gradient" />

          <div className="relative z-10">
            <SkipToContent targetId="main" label={t("a11y.skip")} />
            <Navbar featuredProjects={featuredProjectsForNav} securityClusterCount={securityClusterCount} />
            {/* Global command palette (⌘K / Ctrl+K) */}
            <CommandPaletteLoader />

            {/*
              Global content container
              - Top padding is handled here so every page clears the fixed navbar.
              - Pages can focus on their content and internal spacing.
            */}
            <main id="main" className="mx-auto max-w-6xl px-6 pt-(--nav-offset)">
              {children}
            </main>

            {/* "Back to top" button, after 300px of scroll */}
            <ScrollToTop />

            <footer className="border-t border-black/10 dark:border-white/10 py-10 mt-14">
              <div className="mx-auto max-w-6xl px-6 text-sm text-muted-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span>
                    © 2025–{new Date().getFullYear()} Aïcha Imène DAHOUMANE — {t("footer.builtWith")}
                  </span>
                  {/* Next.js Link for client-side navigation */}
                  {/* Links get py-2 (≈36px tap targets instead of 20px); the padding
                      replaces the vertical gap between wrapped rows. */}
                  <nav aria-label={t("footer.nav")} className="flex flex-wrap items-center gap-x-4 gap-y-0">
                    {/* Certifications (RNCP 6 diploma, Trailhead, upcoming
                        vendor certification) */}
                    <Link
                      className="inline-block py-2 underline underline-offset-4 hover:opacity-80 soft-ring rounded-sm"
                      href={`/${locale}/certifications`}
                    >
                      {t("nav.certifications")}
                    </Link>
                    <Link
                      className="inline-block py-2 underline underline-offset-4 hover:opacity-80 soft-ring rounded-sm"
                      href={`/${locale}/work-with-me`}
                    >
                      {t("footer.workWithMe")}
                    </Link>
                    {/* "Hybrid profile": three cases where Salesforce +
                        infrastructure + security are needed together */}
                    <Link
                      className="inline-block py-2 underline underline-offset-4 hover:opacity-80 soft-ring rounded-sm"
                      href={`/${locale}/hybride`}
                    >
                      {t("footer.hybrid")}
                    </Link>
                    {/* "Contact me" → the home page contact form, same label and
                        destination as in the hero and mobile menu */}
                    <Link
                      className="inline-block py-2 underline underline-offset-4 hover:opacity-80 soft-ring rounded-sm"
                      href={`/${locale}#contact`}
                    >
                      {t("footer.qualifyMission")}
                    </Link>
                    <Link
                      className="inline-block py-2 underline underline-offset-4 hover:opacity-80 soft-ring rounded-sm"
                      href={`/${locale}/colophon`}
                    >
                      {t("footer.colophon")}
                    </Link>
                    <Link
                      className="inline-block py-2 underline underline-offset-4 hover:opacity-80 soft-ring rounded-sm"
                      href={`/${locale}/privacy`}
                    >
                      {t("footer.privacy")}
                    </Link>
                    <Link
                      className="inline-block py-2 underline underline-offset-4 hover:opacity-80 soft-ring rounded-sm"
                      href={`/${locale}/legal`}
                    >
                      {t("footer.legal")}
                    </Link>
                    <Link
                      className="inline-block py-2 underline underline-offset-4 hover:opacity-80 soft-ring rounded-sm"
                      href={`/${locale}/accessibility`}
                    >
                      {t("footer.accessibility")}
                    </Link>
                    <Link
                      className="inline-block py-2 underline underline-offset-4 hover:opacity-80 soft-ring rounded-sm"
                      href={`/${locale}/status`}
                    >
                      {t("footer.status")}
                    </Link>
                    <Link
                      className="inline-block py-2 underline underline-offset-4 hover:opacity-80 soft-ring rounded-sm"
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
                        className="inline-block py-2 underline underline-offset-4 hover:opacity-80 soft-ring rounded-sm"
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
