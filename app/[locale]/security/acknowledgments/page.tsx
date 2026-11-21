import { ogLocale, ogAlternateLocales } from "@/lib/i18n/ogLocale";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getSiteUrl } from "@/lib/siteUrl";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "securityAck" });
  const siteUrl = getSiteUrl();
  const title = t("metaTitle");
  return {
    title,
    // Own description (would otherwise inherit the home page's)
    description: t("metaDescription"),
    robots: { index: false },
    alternates: {
      canonical: `${siteUrl}/${locale}/security/acknowledgments`,
      languages: {
        en: `${siteUrl}/en/security/acknowledgments`,
        fr: `${siteUrl}/fr/security/acknowledgments`,
        es: `${siteUrl}/es/security/acknowledgments`,
        "x-default": `${siteUrl}/en/security/acknowledgments`,
      },
    },
    // Same Open Graph shape as the other pages (og:locale and the localised
    // share image were missing).
    openGraph: {
      title,
      url: `${siteUrl}/${locale}/security/acknowledgments`,
      type: "website",
      locale: ogLocale(locale),
      alternateLocale: ogAlternateLocales(locale),
      images: [{ url: `${siteUrl}/${locale}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function SecurityAcknowledgmentsPage({ params }: PageProps) {
  const { locale } = await params;
  const t  = await getTranslations({ locale, namespace: "securityAck" });
  const tc = await getTranslations({ locale, namespace: "common" });

  return (
    <div className="py-14 max-w-2xl">
      <h1 className="text-3xl font-semibold text-strong">{t("title")}</h1>
      <p className="mt-4 text-sm text-muted leading-relaxed">
        {t.rich("intro", {
          link: (chunks) => (
            <a
              href="/.well-known/security.txt"
              className="underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
              {chunks}
            </a>
          ),
        })}
      </p>

      <div className="mt-10 card p-6">
        <p className="text-sm text-muted-2 italic">{t("none")}</p>
      </div>

      <div className="mt-10">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
        >
          {tc("backHome")}
        </Link>
      </div>
    </div>
  );
}
