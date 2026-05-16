import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const urlPath = `${siteUrl}/${locale}/legal`;
  const title = isFr
    ? "Mentions légales — Aïcha Imène DAHOUMANE"
    : "Legal Notice — Aïcha Imène DAHOUMANE";
  return {
    title,
    alternates: {
      canonical: urlPath,
      languages: { en: `${siteUrl}/en/legal`, fr: `${siteUrl}/fr/legal` },
    },
    openGraph: { url: urlPath, type: "website", locale, title },
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
    </div>
  );
}
