import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const urlPath = `${siteUrl}/${locale}/accessibility`;
  const title = isFr
    ? "Accessibilité — Aïcha Imène DAHOUMANE"
    : "Accessibility — Aïcha Imène DAHOUMANE";
  return {
    title,
    alternates: {
      canonical: urlPath,
      languages: { en: `${siteUrl}/en/accessibility`, fr: `${siteUrl}/fr/accessibility` },
    },
    openGraph: { url: urlPath, type: "website", locale, title },
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
