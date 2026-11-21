// app/[locale]/salesforce-security/salesforce-security-content.tsx — server component
// -----------------------------------------------------------------------------------
// "Salesforce security" page. Four layers, each with the principle applied
// and what was done, every point linked to the project that shows it, with
// the project's nature (training, personal, reconstructed case) stated next
// to it. Only claims found in the projects' published content belong here.
import Link from "next/link";
import { getTranslations } from "next-intl/server";

type Item = { text: string; proof: string; nature: string; href: string };
type Layer = { title: string; scope: string; principle: string; items: Item[] };

export default async function SalesforceSecurityContent({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "sfSecurity" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const layers = t.raw("layers") as Layer[];
  const breadLabel = tc("breadcrumb");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Breadcrumb */}
      <nav aria-label={breadLabel} className="mb-6 flex items-center gap-2 text-sm text-muted-2">
        <Link href={`/${locale}`} className="hover:underline soft-ring rounded-sm px-1">
          {t("breadcrumbHome")}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-muted">{t("breadcrumbCurrent")}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest bg-linear-to-r from-cyan-600 to-violet-600 dark:from-cyan-400 dark:to-violet-400 bg-clip-text text-transparent">
          {t("eyebrow")}
        </p>
        <h1 className="text-4xl font-display font-semibold tracking-tight">{t("h1")}</h1>
        <p className="mt-4 text-base text-muted leading-relaxed">{t("lead")}</p>
        {/* Nature of the evidence, stated up front */}
        <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/6 px-4 py-3 text-sm text-muted leading-relaxed">
          {t("honesty")}
        </p>
      </header>

      {/* The four layers */}
      <ol className="space-y-6">
        {layers.map((layer, i) => (
          <li key={layer.title}>
            <section
              aria-labelledby={`layer-${i + 1}`}
              className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/3 p-6"
            >
              <h2 id={`layer-${i + 1}`} className="text-lg font-semibold text-slate-900 dark:text-white">
                {layer.title}
              </h2>
              <p className="mt-1 font-mono text-xs text-muted-2">{layer.scope}</p>

              <p className="mt-4 text-sm text-muted leading-relaxed">
                <span className="font-semibold text-slate-700 dark:text-slate-200">{t("principleLabel")} — </span>
                {layer.principle}
              </p>

              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-2">{t("appliedLabel")}</p>
              <ul className="mt-2 space-y-3">
                {layer.items.map((item) => (
                  <li
                    key={item.text}
                    className="rounded-xl border border-cyan-500/20 dark:border-cyan-400/20 bg-linear-to-br from-cyan-500/6 to-violet-500/6 p-4"
                  >
                    <p className="text-sm text-muted leading-relaxed">{item.text}</p>
                    <p className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-semibold uppercase tracking-widest text-muted-2">{t("proofLabel")}</span>
                      <Link
                        href={`/${locale}${item.href}`}
                        className="inline-flex items-center gap-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1 text-slate-700 dark:text-slate-200 hover:bg-black/10 dark:hover:bg-white/10 soft-ring transition-colors"
                      >
                        {item.proof} →
                      </Link>
                      <span className="text-muted-2">{item.nature}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </li>
        ))}
      </ol>

      {/* Further reading */}
      <section aria-labelledby="section-links" className="mt-10">
        <h2 id="section-links" className="text-lg font-semibold mb-3">{t("linksTitle")}</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href={`/${locale}/hybride`} className="underline underline-offset-4 hover:opacity-80 soft-ring rounded-sm">
              {t("linkHybrid")}
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/certifications`} className="underline underline-offset-4 hover:opacity-80 soft-ring rounded-sm">
              {t("linkCerts")}
            </Link>
          </li>
        </ul>
      </section>

      {/* Back */}
      <div className="mt-10 border-t border-black/10 dark:border-white/10 pt-8">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-5 py-2.5 text-sm text-muted-2 hover:bg-black/5 dark:hover:bg-white/5 soft-ring transition-colors"
        >
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
}
