import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getSiteUrl } from "@/lib/siteUrl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const siteUrl = getSiteUrl();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
  const urlPath = `${siteUrl}/${locale}/privacy`;
  const title = isFr
    ? "Politique de confidentialité — Aïcha Imène DAHOUMANE"
    : "Privacy policy — Aïcha Imène DAHOUMANE";
  const description = isFr
    ? "Données collectées, cookies, durée de conservation et vos droits RGPD."
    : "Data collected, cookies, retention period, and your GDPR rights.";
  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/privacy`,
        fr: `${siteUrl}/fr/privacy`,
        "x-default": `${siteUrl}/en/privacy`,
      },
    },
    openGraph: {
      title,
      description,
      url: urlPath,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
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

export default async function PrivacyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

  return (
    <div className="py-14">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <p className="mt-2 text-xs text-muted-2">{t("lastUpdated")}</p>

      <div className="mt-8 grid gap-6">

        {/* Responsable du traitement */}
        <section className="card p-6">
          <h2 className="text-lg font-semibold">{t("controllerTitle")}</h2>
          <p className="mt-2 text-sm text-muted-2">
            {t("controllerBody", { email: contactEmail })}
          </p>
        </section>

        {/* Analytics & Performance */}
        <section className="card p-6">
          <h2 className="text-lg font-semibold">{t("analyticsTitle")}</h2>
          <p className="mt-2 text-sm text-muted-2">{t("analyticsBody")}</p>
        </section>

        {/* Cookies */}
        <section className="card p-6">
          <h2 className="text-lg font-semibold">{t("cookiesTitle")}</h2>
          <p className="mt-2 text-sm text-muted-2">{t("cookiesBody")}</p>
        </section>

        {/* Formulaire de contact */}
        <section className="card p-6">
          <h2 className="text-lg font-semibold">{t("formTitle")}</h2>
          <p className="mt-2 text-sm text-muted-2">{t("formBody")}</p>
          <p className="mt-3 text-sm text-muted-2">{t("retention")}</p>
        </section>

        {/* Sous-traitants — Art. 28 RGPD */}
        <section className="card p-6">
          <h2 className="text-lg font-semibold">{t("processorsTitle")}</h2>
          <p className="mt-2 text-sm text-muted-2">{t("processorsBody")}</p>
        </section>

        {/* Violation de données — Art. 33 RGPD */}
        <section className="card p-6">
          <h2 className="text-lg font-semibold">{t("breachTitle")}</h2>
          <p className="mt-2 text-sm text-muted-2">{t("breachBody")}</p>
        </section>

        {/* Vos droits */}
        <section className="card p-6">
          <h2 className="text-lg font-semibold">{t("rightsTitle")}</h2>
          <p className="mt-2 text-sm text-muted-2">{t("rightsBody")}</p>
          {contactEmail ? (
            <p className="mt-3 text-sm text-muted-2">{t("contact", { email: contactEmail })}</p>
          ) : null}
        </section>

      </div>
    </div>
  );
}
