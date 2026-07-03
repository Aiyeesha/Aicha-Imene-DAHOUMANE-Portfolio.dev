import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getSiteUrl } from "@/lib/siteUrl";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const isEs = locale === "es";
  const siteUrl = getSiteUrl();
  const urlPath = `${siteUrl}/${locale}/accessibility`;
  const title = isFr
    ? "Accessibilité — Aïcha Imène DAHOUMANE"
    : isEs
    ? "Accesibilidad — Aïcha Imène DAHOUMANE"
    : "Accessibility — Aïcha Imène DAHOUMANE";
  const description = isFr
    ? "Engagement WCAG 2.2 (niveau AA), limites connues et contact pour signaler un problème d'accessibilité."
    : isEs
    ? "Compromiso WCAG 2.2 (nivel AA), limitaciones conocidas y contacto para reportar un problema de accesibilidad."
    : "WCAG 2.2 (Level AA) commitment, known limitations, and contact to report an accessibility issue.";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/accessibility`,
        fr: `${siteUrl}/fr/accessibility`,
        es: `${siteUrl}/es/accessibility`,
        "x-default": `${siteUrl}/en/accessibility`,
      },
    },
    openGraph: {
      url: urlPath,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US", "es_ES"] : locale === "es" ? ["en_US", "fr_FR"] : ["fr_FR", "es_ES"],
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

export default async function AccessibilityPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "accessibility" });

  return (
    <div className="py-14">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <p className="mt-2 text-xs text-muted-2">{t("lastAudit")}</p>

      <div className="mt-8 grid gap-6">

        {/* Engagement d'accessibilité */}
        <section className="card p-6">
          <h2 className="text-lg font-semibold">{t("commitmentTitle")}</h2>
          <p className="mt-2 text-sm text-muted-2">{t("commitmentBody")}</p>
        </section>

        {/* Limites connues — clé présente dans les traductions, section précédemment non rendue */}
        <section className="card p-6">
          <h2 className="text-lg font-semibold">{t("limitsTitle")}</h2>
          <p className="mt-2 text-sm text-muted-2">{t("limitsBody")}</p>
        </section>

        {/* Signaler un problème */}
        <section className="card p-6">
          <h2 className="text-lg font-semibold">{t("helpTitle")}</h2>
          <p className="mt-2 text-sm text-muted-2">{t("helpBody")}</p>
        </section>

      </div>
    </div>
  );
}
