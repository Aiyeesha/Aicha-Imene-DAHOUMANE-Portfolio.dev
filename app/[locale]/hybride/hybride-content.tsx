// app/[locale]/hybride/hybride-content.tsx — server component
// -----------------------------------------------------------
// Rendu de la page « Profil hybride ». Track-neutre : accent cyan→violet
// (la combinaison des deux) plutôt qu'une couleur de track.
import Link from "next/link";
import { getTranslations } from "next-intl/server";

// Une preuve est soit une page interne (href relatif, préfixé par la locale),
// soit un artefact public vérifiable (href absolu, ex. un workflow GitHub) :
// ce second cas reçoit le libellé « Vérifiable » pour qu'un lecteur sache
// d'un coup d'œil qu'il peut ouvrir la source plutôt qu'une description.
type Proof = { label: string; href: string };
const isExternal = (href: string) => /^https?:\/\//.test(href);
type Scenario = {
  title: string;
  problem: string;
  soloTitle: string;
  solo: string;
  mineTitle: string;
  mine: string;
  proofs: Proof[];
  sectorLabel: string;
  sector: string;
};

export default async function HybrideContent({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "hybrid" });
  const isFr = locale === "fr";
  const isEs = locale === "es";

  const scenarios = t.raw("scenarios") as Scenario[];
  const eliminates = t.raw("eliminates") as string[];

  const labels = {
    problem: isFr ? "Le problème" : isEs ? "El problema" : "The problem",
    proofs: isFr ? "Preuves" : isEs ? "Pruebas" : "Proof",
    verifiable: isFr ? "Vérifiable" : isEs ? "Verificable" : "Verifiable",
    newTab: isFr ? "(s'ouvre dans un nouvel onglet)" : isEs ? "(se abre en una nueva pestaña)" : "(opens in a new tab)",
    backHome: isFr ? "← Retour à l'accueil" : isEs ? "← Volver al inicio" : "← Back to home",
    breadLabel: isFr ? "Fil d'Ariane" : isEs ? "Ruta de navegación" : "Breadcrumb",
    cvHref: `/cv/Aicha-Imene-DAHOUMANE-CV-${locale}-hybrid.pdf`,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Breadcrumb */}
      <nav aria-label={labels.breadLabel} className="mb-6 flex items-center gap-2 text-sm text-muted-2">
        <Link href={`/${locale}`} className="hover:underline soft-ring rounded px-1">
          {t("breadcrumbHome")}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-muted">{t("breadcrumbCurrent")}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-cyan-600 to-violet-600 dark:from-cyan-400 dark:to-violet-400 bg-clip-text text-transparent">
          {t("breadcrumbCurrent")}
        </p>
        <h1 className="text-4xl font-display font-semibold tracking-tight">{t("h1")}</h1>
        <p className="mt-4 text-base text-muted leading-relaxed">{t("lead")}</p>
      </header>

      {/* Scénarios */}
      <section aria-labelledby="section-scenarios" className="mb-10">
        <h2 id="section-scenarios" className="text-lg font-semibold mb-4">
          {t("scenariosTitle")}
        </h2>
        <ol className="space-y-6">
          {scenarios.map((s, i) => (
            <li
              key={s.title}
              className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-sm font-bold bg-gradient-to-br from-cyan-500 to-violet-600 bg-clip-text text-transparent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-semibold text-slate-900 dark:text-white">{s.title}</h3>
              </div>

              <p className="mt-3 text-sm text-muted leading-relaxed">
                <span className="font-semibold text-slate-700 dark:text-slate-200">{labels.problem} — </span>
                {s.problem}
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-1.5">
                    {s.soloTitle}
                  </p>
                  <p className="text-sm text-muted leading-relaxed">{s.solo}</p>
                </div>
                <div className="rounded-xl border border-cyan-500/20 dark:border-cyan-400/20 bg-gradient-to-br from-cyan-500/[0.06] to-violet-500/[0.06] p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1.5 bg-gradient-to-r from-cyan-700 to-violet-700 dark:from-cyan-300 dark:to-violet-300 bg-clip-text text-transparent">
                    {s.mineTitle}
                  </p>
                  <p className="text-sm text-muted leading-relaxed">{s.mine}</p>
                </div>
              </div>

              <p className="mt-4 text-sm text-muted leading-relaxed">
                <span className="font-semibold text-slate-700 dark:text-slate-200">{s.sectorLabel} — </span>
                {s.sector}
              </p>

              {s.proofs.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-2">
                    {labels.proofs}
                  </span>
                  {s.proofs.map((p) =>
                    isExternal(p.href) ? (
                      <a
                        key={p.href}
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.07] px-3 py-1 text-xs text-slate-700 dark:text-slate-200 hover:bg-emerald-500/15 soft-ring transition-colors"
                      >
                        <span className="rounded-full bg-emerald-600/15 px-1.5 py-px text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                          {labels.verifiable}
                        </span>
                        {p.label} ↗
                        <span className="sr-only"> {labels.newTab}</span>
                      </a>
                    ) : (
                      <Link
                        key={p.href}
                        href={`/${locale}${p.href}`}
                        className="inline-flex items-center gap-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1 text-xs text-slate-700 dark:text-slate-200 hover:bg-black/10 dark:hover:bg-white/10 soft-ring transition-colors"
                      >
                        {p.label} →
                      </Link>
                    )
                  )}
                </div>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* Ce que la combinaison élimine */}
      <section aria-labelledby="section-eliminates" className="mb-10">
        <h2 id="section-eliminates" className="text-lg font-semibold mb-4">
          {t("eliminatesTitle")}
        </h2>
        <ul className="space-y-3">
          {eliminates.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 text-sm text-muted leading-relaxed"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 flex-shrink-0 font-bold bg-gradient-to-br from-cyan-500 to-violet-600 bg-clip-text text-transparent"
              >
                ✕
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section
        aria-labelledby="section-cta"
        className="mb-10 rounded-2xl border border-cyan-500/20 dark:border-cyan-400/20 bg-gradient-to-br from-cyan-500/[0.06] to-violet-500/[0.06] p-8 text-center"
      >
        <h2 id="section-cta" className="text-xl font-semibold text-slate-900 dark:text-white">
          {t("ctaTitle")}
        </h2>
        <p className="mt-2 text-sm text-muted">{t("ctaText")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-violet-600 px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 soft-ring transition-opacity"
          >
            {t("ctaContact")}
          </Link>
          <a
            href={labels.cvHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-white px-6 py-2.5 text-sm font-medium soft-ring transition-colors"
          >
            {t("ctaCv")} ↓
          </a>
        </div>
      </section>

      {/* Retour */}
      <div className="border-t border-black/10 dark:border-white/10 pt-8">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-5 py-2.5 text-sm text-muted-2 hover:bg-black/5 dark:hover:bg-white/5 soft-ring transition-colors"
        >
          {labels.backHome}
        </Link>
      </div>
    </div>
  );
}
