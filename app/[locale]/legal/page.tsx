import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getSiteUrl } from "@/lib/siteUrl";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const siteUrl = getSiteUrl();
  const urlPath = `${siteUrl}/${locale}/legal`;
  const title = isFr
    ? "Mentions légales — Aïcha Imène DAHOUMANE"
    : "Legal Notice — Aïcha Imène DAHOUMANE";
  const description = isFr
    ? "Éditeur, hébergement, propriété intellectuelle et politique des données personnelles."
    : "Publisher, hosting, intellectual property, and personal data policy.";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/legal`,
        fr: `${siteUrl}/fr/legal`,
        "x-default": `${siteUrl}/en/legal`,
      },
    },
    openGraph: {
      url: urlPath,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      title,
      description,
      siteName,
      images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/twitter-image`],
    },
  };
}

export default async function LegalPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });

  const name = process.env.NEXT_PUBLIC_OG_NAME || process.env.NEXT_PUBLIC_SITE_NAME || "Portfolio";
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

  return (
    <div className="py-14">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>

      <div className="mt-8 grid gap-6">
        <section className="card p-6">
          <h2 className="text-lg font-semibold">{t("editorTitle")}</h2>
          <p className="mt-2 text-sm text-muted-2">{t("editorBody", { name, email: email || "—" })}</p>
        </section>

        <section className="card p-6">
          <h2 className="text-lg font-semibold">{t("hostingTitle")}</h2>
          <p className="mt-2 text-sm text-muted-2">{t("hostingBody")}</p>
        </section>

        <section className="card p-6">
          <h2 className="text-lg font-semibold">{t("ipTitle")}</h2>
          <p className="mt-2 text-sm text-muted-2">{t("ipBody")}</p>
        </section>

        <section className="card p-6">
          <h2 className="text-lg font-semibold">{t("liabilityTitle")}</h2>
          <p className="mt-2 text-sm text-muted-2">{t("liabilityBody")}</p>
        </section>

        {/* Données personnelles — clé présente dans les traductions, section précédemment non rendue */}
        <section className="card p-6">
          <h2 className="text-lg font-semibold">{t("dataTitle")}</h2>
          <p className="mt-2 text-sm text-muted-2">{t("dataBody", { email: email || "—" })}</p>
        </section>

      </div>

      {/* Bouton retour accueil */}
      <div className="mt-14 border-t border-black/10 dark:border-white/10 pt-8">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
        >
          ← {locale === "fr" ? "Retour à l'accueil" : "Back to home"}
        </Link>
      </div>
    </div>
  );
}
