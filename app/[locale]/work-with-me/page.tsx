// app/[locale]/work-with-me/page.tsx
// ------------------------------------
// Page "Travaillons ensemble" — positionnement freelance 2027.
// Présente la disponibilité, les types de missions, le process et un CTA contact.

import Link from "next/link";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: string }> };

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const urlPath = `${siteUrl}/${locale}/work-with-me`;
  const title = isFr
    ? "Travaillons ensemble — Aïcha Imène DAHOUMANE"
    : "Work with me — Aïcha Imène DAHOUMANE";
  const description = isFr
    ? "Disponible pour des missions freelance Salesforce et IT Ops — à distance, en Europe. Découvrez mes conditions, mon process et comment démarrer."
    : "Available for freelance Salesforce and IT Ops missions — remote, in Europe. Find out about my terms, process, and how to get started.";
  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/work-with-me`,
        fr: `${siteUrl}/fr/work-with-me`,
        "x-default": `${siteUrl}/en/work-with-me`,
      },
    },
    openGraph: {
      title,
      description,
      url: urlPath,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops",
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

// ── Données de disponibilité ──────────────────────────────────────────────────
// Mettre à jour manuellement selon la situation réelle.

type AvailabilityStatus = "open" | "limited" | "unavailable";

const AVAILABILITY: { status: AvailabilityStatus; since: Record<"en" | "fr", string> } = {
  status: "open",
  since: { en: "Early 2027", fr: "Début 2027" },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function WorkWithMePage({ params }: PageProps) {
  const { locale } = await params;
  const isFr = locale === "fr";

  const labels = {
    kicker:         isFr ? "Freelance · Remote · Europe" : "Freelance · Remote · Europe",
    h1:             isFr ? "Travaillons ensemble" : "Work with me",
    subtitle:       isFr
      ? "Je suis disponible pour des missions freelance en Salesforce et IT Ops — à distance, en Europe. Voici comment on peut collaborer."
      : "I'm available for freelance Salesforce and IT Ops missions — remote, in Europe. Here's how we can work together.",

    availTitle:     isFr ? "Disponibilité" : "Availability",
    availOpen:      isFr ? "Disponible" : "Available",
    availLimited:   isFr ? "Disponibilité limitée" : "Limited availability",
    availNo:        isFr ? "Non disponible" : "Not available",
    availSince:     isFr ? `À partir de ${AVAILABILITY.since.fr}` : `From ${AVAILABILITY.since.en}`,
    availContracts: isFr ? "Freelance · Mission · CDD" : "Freelance · Contract · Fixed-term",
    availMode:      isFr ? "100 % remote · Déplacements ponctuels Europe" : "100% remote · Occasional travel in Europe",

    lookingTitle:   isFr ? "Ce que je recherche" : "What I'm looking for",
    domainsLabel:   isFr ? "Domaines" : "Domains",
    domains:        ["Salesforce Dev", "Administration Salesforce", "IT Ops", "DevOps / CI·CD", "Web · Next.js"],
    durationLabel:  isFr ? "Durée" : "Duration",
    durations:      isFr
      ? ["Court terme (1–3 mois)", "Long terme (3–12 mois)", "Mission récurrente"]
      : ["Short term (1–3 months)", "Long term (3–12 months)", "Ongoing engagement"],
    modeLabel:      isFr ? "Mode" : "Mode",
    modes:          isFr
      ? ["100 % Remote", "Remote + déplacements ponctuels", "Europe uniquement"]
      : ["100% Remote", "Remote + occasional travel", "Europe only"],

    processTitle:   isFr ? "Mon process" : "My process",
    steps: isFr
      ? [
          { n: "01", title: "Appel découverte",   desc: "30 min, sans engagement. On discute du besoin, du périmètre et des contraintes.",           badge: "Gratuit" },
          { n: "02", title: "Proposition & devis", desc: "Devis détaillé sous 48 h — périmètre, jalons, livrables et conditions.",                    badge: "48 h" },
          { n: "03", title: "Démarrage",           desc: "On fixe le planning et je démarre dès la première semaine disponible.",                      badge: "Rapide" },
        ]
      : [
          { n: "01", title: "Discovery call",    desc: "30 min, no commitment. We discuss your needs, scope, and constraints.",                      badge: "Free" },
          { n: "02", title: "Proposal & quote",  desc: "Detailed quote within 48 h — scope, milestones, deliverables, and terms.",                   badge: "48 h" },
          { n: "03", title: "Kick-off",          desc: "We set the schedule and I start in your first available week.",                              badge: "Fast" },
        ],

    faqTitle:       isFr ? "Questions fréquentes" : "FAQ",
    faqs: isFr
      ? [
          {
            q: "Travaillez-vous en CDI ?",
            a: "J'étudie les propositions en CDI pour des postes Salesforce ou IT Ops bien positionnés — contactez-moi pour en discuter.",
          },
          {
            q: "Êtes-vous disponible pour des missions courtes (< 1 mois) ?",
            a: "Oui, notamment pour des audits, des formations ou des interventions ponctuelles. Décrivez le besoin et je reviens sous 24 h.",
          },
          {
            q: "Quelle est votre zone géographique ?",
            a: "Je travaille 100 % à distance. Des déplacements ponctuels en Europe sont possibles selon la mission.",
          },
        ]
      : [
          {
            q: "Are you open to permanent positions?",
            a: "I consider well-positioned Salesforce or IT Ops permanent roles — reach out and let's talk.",
          },
          {
            q: "Do you take short missions (< 1 month)?",
            a: "Yes, especially for audits, training, or ad-hoc interventions. Describe the need and I'll get back to you within 24 h.",
          },
          {
            q: "Where are you based?",
            a: "I work 100% remotely. Occasional travel within Europe is possible depending on the mission.",
          },
        ],

    ctaTitle:       isFr ? "Une mission en tête ?" : "Got a mission in mind?",
    ctaSubtitle:    isFr
      ? "Décrivez votre besoin en quelques lignes — je reviens sous 24 h."
      : "Describe your needs in a few lines — I'll get back to you within 24 h.",
    ctaContact:     isFr ? "Envoyer un message" : "Send a message",
    ctaServices:    isFr ? "Voir les services" : "View services",
    backHome:       isFr ? "← Retour à l'accueil" : "← Back to home",
    breadHome:      isFr ? "Accueil" : "Home",
    breadLabel:     isFr ? "Fil d'Ariane" : "Breadcrumb",
  };

  const statusLabel = AVAILABILITY.status === "open"
    ? labels.availOpen
    : AVAILABILITY.status === "limited"
      ? labels.availLimited
      : labels.availNo;

  const statusColor = AVAILABILITY.status === "open"
    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
    : AVAILABILITY.status === "limited"
      ? "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
      : "bg-red-500/10 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800";

  const dotColor = AVAILABILITY.status === "open"
    ? "bg-emerald-500"
    : AVAILABILITY.status === "limited"
      ? "bg-amber-500"
      : "bg-red-500";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">

      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <nav aria-label={labels.breadLabel} className="mb-6 flex items-center gap-2 text-sm text-muted-2">
        <Link href={`/${locale}`} className="hover:underline soft-ring rounded px-1">
          {labels.breadHome}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-muted">{labels.h1}</span>
      </nav>

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-2">
          {labels.kicker}
        </p>
        <h1 className="text-4xl font-display font-semibold tracking-tight">{labels.h1}</h1>
        <p className="mt-4 text-base text-muted leading-relaxed max-w-xl">{labels.subtitle}</p>
      </header>

      {/* ── Disponibilité ────────────────────────────────────────────────── */}
      <section aria-labelledby="section-availability" className="mb-10">
        <h2 id="section-availability" className="text-lg font-semibold mb-4">{labels.availTitle}</h2>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium self-start ${statusColor}`}>
            <span className={`h-2 w-2 rounded-full ${dotColor} ${AVAILABILITY.status === "open" ? "animate-pulse" : ""}`} />
            {statusLabel}
          </div>
          <div className="flex flex-col gap-1 text-sm text-muted">
            <span>{labels.availSince}</span>
            <span>{labels.availContracts}</span>
            <span>{labels.availMode}</span>
          </div>
        </div>
      </section>

      {/* ── Ce que je recherche ──────────────────────────────────────────── */}
      <section aria-labelledby="section-looking" className="mb-10">
        <h2 id="section-looking" className="text-lg font-semibold mb-4">{labels.lookingTitle}</h2>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 space-y-5">

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-2">{labels.domainsLabel}</p>
            <div className="flex flex-wrap gap-2">
              {labels.domains.map((d) => (
                <span key={d} className="rounded-full bg-cyan-500/10 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 px-3 py-1 text-sm font-medium">
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-2">{labels.durationLabel}</p>
            <div className="flex flex-wrap gap-2">
              {labels.durations.map((d) => (
                <span key={d} className="rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 px-3 py-1 text-sm">
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-2">{labels.modeLabel}</p>
            <div className="flex flex-wrap gap-2">
              {labels.modes.map((m) => (
                <span key={m} className="rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 px-3 py-1 text-sm">
                  {m}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="section-process" className="mb-10">
        <h2 id="section-process" className="text-lg font-semibold mb-4">{labels.processTitle}</h2>
        <ol className="space-y-4">
          {labels.steps.map((step) => (
            <li key={step.n} className="flex gap-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-bold text-sm grid place-items-center">
                {step.n}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-900 dark:text-white">{step.title}</span>
                  <span className="rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 text-xs px-2 py-0.5 font-medium">
                    {step.badge}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted leading-relaxed">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="section-cta"
        className="mb-10 rounded-2xl border border-cyan-200 dark:border-cyan-800 bg-cyan-500/5 dark:bg-cyan-500/10 p-8 text-center"
      >
        <h2 id="section-cta" className="text-xl font-semibold text-slate-900 dark:text-white">{labels.ctaTitle}</h2>
        <p className="mt-2 text-sm text-muted">{labels.ctaSubtitle}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href={`/${locale}/#contact`}
            className="inline-flex items-center gap-2 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 text-sm font-medium soft-ring transition-colors"
          >
            {labels.ctaContact}
          </Link>
          <Link
            href={`/${locale}/#services`}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-white px-6 py-2.5 text-sm font-medium soft-ring transition-colors"
          >
            {labels.ctaServices}
          </Link>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section aria-labelledby="section-faq" className="mb-10">
        <h2 id="section-faq" className="text-lg font-semibold mb-4">{labels.faqTitle}</h2>
        <dl className="space-y-4">
          {labels.faqs.map((item) => (
            <div key={item.q} className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5">
              <dt className="font-medium text-slate-900 dark:text-white">{item.q}</dt>
              <dd className="mt-1.5 text-sm text-muted leading-relaxed">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Retour ───────────────────────────────────────────────────────── */}
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
