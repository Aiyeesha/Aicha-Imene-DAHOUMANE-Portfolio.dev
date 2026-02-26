import type { Metadata } from "next";
import type { ReactNode } from "react";
import Providers from "./providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import SkipToContent from "@/components/SkipToContent";

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

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const canonical = `${siteUrl}/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl}/en`,
        fr: `${siteUrl}/fr`
      }
    },
    openGraph: {
      type: "website",
      url: canonical,
      locale: locale,
      title,
      description,
      images: [
        {
          url: "/opengraph-image",
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
      images: ["/twitter-image"]
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

  // Read the preferred track from a cookie so SSR and the client agree.
  const cookieStore = await cookies();
  const rawTrack = cookieStore.get("track")?.value;
  const initialTrack = rawTrack === "itops" || rawTrack === "salesforce" ? rawTrack : "salesforce";

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Providers initialTrack={initialTrack}>
        <div className="min-h-screen bg-white text-slate-900 dark:bg-[#070B1A] dark:text-white">
          <div className="page-gradient" />

          <div className="relative z-10">
            <SkipToContent targetId="main" label={t("a11y.skip")} />
            <Navbar />

            {/*
              Global content container
              - Top padding is handled here so every page clears the fixed navbar.
              - Pages can focus on their content and internal spacing.
            */}
            <main id="main" className="mx-auto max-w-6xl px-6 pt-[var(--nav-offset)]">
              {children}
            </main>

            <footer className="border-t border-black/10 dark:border-white/10 py-10 mt-14">
              <div className="mx-auto max-w-6xl px-6 text-sm text-muted-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span>
                    © {new Date().getFullYear()} Aïcha Imène DAHOUMANE — {t("footer.builtWith")}
                  </span>
                  <a
                    className="underline underline-offset-4 hover:opacity-80 soft-ring rounded"
                    href={`/${locale}/privacy`}
                  >
                    {t("footer.privacy")}
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}
