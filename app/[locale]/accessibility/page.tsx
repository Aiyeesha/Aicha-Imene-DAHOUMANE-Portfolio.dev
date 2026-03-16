import { getTranslations } from "next-intl/server";

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
