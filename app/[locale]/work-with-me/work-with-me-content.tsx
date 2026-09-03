"use client";

import Link from "next/link";
import { useTrack } from "@/app/[locale]/providers";
import { getSiteUrl } from "@/lib/siteUrl";
import { jsonLdStringify } from "@/lib/security/jsonLdSafe";
import CalendlyPopupButton from "@/components/CalendlyEmbed";

const CALENDLY_URL = "https://calendly.com/ai-dahoumane/30min";

type AvailabilityStatus = "open" | "limited" | "unavailable";

const AVAILABILITY: { status: AvailabilityStatus; since: Record<"en" | "fr", string> } = {
  status: "open",
  since: { en: "immediately", fr: "immédiatement" },
};

export default function WorkWithMeContent({ locale }: { locale: string }) {
  const { track } = useTrack();
  const isFr = locale === "fr";
  const isEs = locale === "es";
  const isSf = track === "salesforce";

  // ── Couleurs accent selon le track ────────────────────────────────────────
  const accent = isSf
    ? {
        kicker:     "text-cyan-600 dark:text-cyan-400",
        domainBadge:"bg-cyan-500/10 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300",
        stepNum:    "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
        stepBadge:  "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
        ctaSection: "border-cyan-200 dark:border-cyan-800 bg-cyan-500/5 dark:bg-cyan-500/10",
        // bg-cyan-600 + white text only reaches 3.68:1 contrast (WCAG AA needs 4.5:1
        // for normal-size text) — cyan-700 clears it at ~5.4:1. Caught by the axe-core
        // e2e scan added for this page.
        ctaBtn:     "bg-cyan-700 hover:bg-cyan-800 text-white",
      }
    : {
        kicker:     "text-violet-600 dark:text-violet-400",
        domainBadge:"bg-violet-500/10 border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300",
        stepNum:    "bg-violet-500/10 text-violet-700 dark:text-violet-300",
        stepBadge:  "bg-violet-500/10 text-violet-700 dark:text-violet-300",
        ctaSection: "border-violet-200 dark:border-violet-800 bg-violet-500/5 dark:bg-violet-500/10",
        ctaBtn:     "bg-violet-600 hover:bg-violet-700 text-white",
      };

  const labels = {
    kicker:         isFr ? "Remote · Mobilité & Relocalisation" : isEs ? "Remoto · Movilidad y Relocalización" : "Remote · Open to Relocation",
    h1:             isFr ? "Travaillons ensemble" : isEs ? "Trabajemos juntas" : "Work with me",
    subtitle:       isFr
      ? "Je suis disponible pour des missions Salesforce et IT Ops — 100 % Remote, hybride ou sur site, avec une ouverture complète à la mobilité et à la relocalisation, en France, en Europe ou dans un contexte anglophone."
      : isEs
      ? "Estoy disponible para proyectos de Salesforce e IT Ops — 100 % remoto, híbrido o presencial, totalmente abierta a la movilidad y a la relocalización, en Francia, Europa o en un contexto de habla inglesa."
      : "I'm available for Salesforce and IT Ops missions — 100 % Remote, hybrid or on-site, fully open to mobility and relocation in France, Europe, or any English-speaking context.",

    availTitle:     isFr ? "Disponibilité" : isEs ? "Disponibilidad" : "Availability",
    availOpen:      isFr ? "Disponible" : isEs ? "Disponible" : "Available",
    availLimited:   isFr ? "Disponibilité limitée" : isEs ? "Disponibilidad limitada" : "Limited availability",
    availNo:        isFr ? "Non disponible" : isEs ? "No disponible" : "Not available",
    availSince:     isFr ? "Entretiens dès maintenant · Poste à partir du 1er décembre 2026" : isEs ? "Entrevistas desde ya · Incorporación a partir del 1 de diciembre de 2026" : "Interviews now · Role starting December 1, 2026",
    availContracts: isFr
      ? "CDI · CDD · Mission"
      : isEs
      ? "Contrato indefinido · Temporal · Proyecto"
      : "Permanent · Fixed-term · Contract",
    availMode:      isFr
      ? "100 % Remote · Hybride · Sur site · Marseille / Provence-Alpes-Côte d'Azur · Mobilité & relocalisation — France, Europe, pays anglophones"
      : isEs
      ? "100 % remoto · Híbrido · Presencial · Marsella / Provenza-Alpes-Costa Azul · Movilidad y relocalización — Francia, Europa, países de habla inglesa"
      : "100 % Remote · Hybrid · On-site · Marseille / Provence-Alpes-Côte d'Azur · Mobility & relocation — France, Europe, English-speaking countries",

    lookingTitle:   isFr ? "Ce que je recherche" : isEs ? "Lo que busco" : "What I'm looking for",
    domainsLabel:   isFr ? "Domaines" : isEs ? "Ámbitos" : "Domains",
    domains:        ["Salesforce Dev", "Administration Salesforce", "IT Ops", "DevOps / CI·CD", "Web · Next.js"],
    durationLabel:  isFr ? "Durée" : isEs ? "Duración" : "Duration",
    durations:      isFr
      ? ["Courte", "Longue", "Récurrente", "Au cas par cas"]
      : isEs
      ? ["Corta", "Larga", "Recurrente", "Puntual"]
      : ["Short", "Long", "Ongoing", "Ad-hoc"],
    modeLabel:      isFr ? "Mode" : isEs ? "Modalidad" : "Mode",
    modes:          isFr
      ? ["100 % Remote", "Hybride · Sur site", "Mobilité & relocalisation envisageables"]
      : isEs
      ? ["100 % remoto", "Híbrido · Presencial", "Abierta a movilidad y relocalización"]
      : ["100% Remote", "Hybrid · On-site", "Open to mobility & relocation"],

    processTitle:   isFr ? "Mon process" : isEs ? "Mi proceso" : "My process",
    steps: isFr
      ? [
          { n: "01", title: "Appel découverte",    desc: "30 min, sans engagement. On discute du besoin, du périmètre et des contraintes.",  badge: "Gratuit" },
          { n: "02", title: "Proposition & devis", desc: "Devis détaillé sous 48 h — périmètre, jalons, livrables et conditions.",           badge: "48 h" },
          { n: "03", title: "Démarrage",           desc: "On fixe le planning et je démarre dès la première semaine disponible.",             badge: "Rapide" },
        ]
      : isEs
      ? [
          { n: "01", title: "Llamada de descubrimiento", desc: "30 min, sin compromiso. Hablamos de tu necesidad, el alcance y las restricciones.", badge: "Gratis" },
          { n: "02", title: "Propuesta y presupuesto",   desc: "Presupuesto detallado en 48 h — alcance, hitos, entregables y condiciones.",        badge: "48 h" },
          { n: "03", title: "Puesta en marcha",          desc: "Fijamos el calendario y empiezo desde la primera semana disponible.",               badge: "Rápido" },
        ]
      : [
          { n: "01", title: "Discovery call",   desc: "30 min, no commitment. We discuss your needs, scope, and constraints.",           badge: "Free" },
          { n: "02", title: "Proposal & quote", desc: "Detailed quote within 48 h — scope, milestones, deliverables, and terms.",        badge: "48 h" },
          { n: "03", title: "Kick-off",         desc: "We set the schedule and I start in your first available week.",                   badge: "Fast" },
        ],

    faqTitle: isFr ? "Questions fréquentes" : isEs ? "Preguntas frecuentes" : "FAQ",
    faqs: isFr
      ? [
          { q: "Sous quel type de contrat intervenez-vous ?",       a: "Je travaille en CDI, CDD ou mission selon le contexte — en France et à l'international. Décrivez votre besoin et on verra ensemble ce qui convient le mieux." },
          { q: "Êtes-vous disponible pour des missions courtes ?",  a: "Oui, y compris pour des audits, des formations ou des interventions ponctuelles. Décrivez le besoin et je reviens sous 24 h." },
          { q: "Quelle est votre zone géographique ?",              a: "Je travaille 100 % à distance depuis Marseille / Provence-Alpes-Côte d'Azur, et je suis ouverte à la mobilité et à la relocalisation — en France comme à l'international : Europe (Belgique, Luxembourg, Allemagne, Italie, Espagne, Royaume-Uni, Irlande, Malte) et tout contexte anglophone." },
        ]
      : isEs
      ? [
          { q: "¿Bajo qué tipo de contrato trabajas?",           a: "Trabajo con contrato indefinido, temporal o por proyecto según el contexto — en Francia y a nivel internacional. Cuéntame tu necesidad y vemos juntas qué encaja mejor." },
          { q: "¿Estás disponible para proyectos cortos?",       a: "Sí, incluyendo auditorías, formaciones o intervenciones puntuales. Describe la necesidad y te respondo en 24 h." },
          { q: "¿Cuál es tu zona geográfica?",                   a: "Trabajo 100 % en remoto desde Marsella / Provenza-Alpes-Costa Azul, y estoy abierta a la movilidad y a la relocalización — en Francia y a nivel internacional: Europa (Bélgica, Luxemburgo, Alemania, Italia, España, Reino Unido, Irlanda, Malta) y cualquier contexto de habla inglesa." },
        ]
      : [
          { q: "What contract type works best?",             a: "I work on permanent, fixed-term, or contract engagements — in France and internationally. Tell me about your context and we'll find what fits." },
          { q: "Do you take short missions?",                a: "Yes, including audits, training, or ad-hoc work. Describe the need and I'll get back to you within 24 h." },
          { q: "Where are you based?",                       a: "I work 100% remotely from Marseille / Provence-Alpes-Côte d'Azur, and I'm open to mobility and relocation — in France and internationally: Europe (Belgium, Luxembourg, Germany, Italy, Spain, UK, Ireland, Malta) and any English-speaking context." },
        ],

    ctaTitle:    isFr ? "Une mission en tête ?" : isEs ? "¿Tienes un proyecto en mente?" : "Got a mission in mind?",
    ctaSubtitle: isFr ? "Décrivez votre besoin en quelques lignes — je reviens sous 24 h." : isEs ? "Describe tu necesidad en pocas líneas — te respondo en 24 h." : "Describe your needs in a few lines — I'll get back to you within 24 h.",
    ctaContact:  isFr ? "Envoyer un message" : isEs ? "Enviar un mensaje" : "Send a message",
    ctaServices: isFr ? "Voir les services" : isEs ? "Ver los servicios" : "View services",
    backHome:    isFr ? "← Retour à l'accueil" : isEs ? "← Volver al inicio" : "← Back to home",
    breadHome:   isFr ? "Accueil" : isEs ? "Inicio" : "Home",
    breadLabel:  isFr ? "Fil d'Ariane" : isEs ? "Ruta de navegación" : "Breadcrumb",
  };

  const statusLabel = AVAILABILITY.status === "open" ? labels.availOpen
    : AVAILABILITY.status === "limited" ? labels.availLimited : labels.availNo;
  const statusColor = AVAILABILITY.status === "open"
    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
    : AVAILABILITY.status === "limited"
      ? "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
      : "bg-red-500/10 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800";
  const dotColor = AVAILABILITY.status === "open" ? "bg-emerald-500"
    : AVAILABILITY.status === "limited" ? "bg-amber-500" : "bg-red-500";

  const siteUrl = getSiteUrl();
  const ownerName = process.env.NEXT_PUBLIC_OG_NAME || "Aïcha Imène DAHOUMANE";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteName,
    url: `${siteUrl}/${locale}/work-with-me`,
    description: isFr
      ? "Missions Salesforce et IT Ops — 100 % remote, ouverte à la mobilité et à la relocalisation en France, en Europe et dans les pays anglophones."
      : isEs
      ? "Proyectos de Salesforce e IT Ops — 100 % remoto, abierta a la movilidad y a la relocalización en Francia, Europa y países de habla inglesa en todo el mundo."
      : "Salesforce and IT Ops missions — 100% remote, open to mobility and relocation in France, Europe, and English-speaking countries worldwide.",
    serviceType: ["Salesforce Development", "Salesforce Administration", "IT Operations", "DevOps / CI·CD", "Web Development"],
    provider: { "@type": "Person", name: ownerName, url: siteUrl },
    areaServed: [
      { "@type": "Country", name: "France" }, { "@type": "Country", name: "Algeria" },
      { "@type": "Country", name: "Belgium" }, { "@type": "Country", name: "Switzerland" },
      { "@type": "Country", name: "Luxembourg" }, { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "United Kingdom" }, { "@type": "Country", name: "Ireland" },
      { "@type": "Country", name: "Malta" }, "Worldwide",
    ],
    availableLanguage: ["French", "English"],
    workLocation: { "@type": "VirtualLocation" },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdStringify(professionalServiceSchema) }} />

      {/* Breadcrumb */}
      <nav aria-label={labels.breadLabel} className="mb-6 flex items-center gap-2 text-sm text-muted-2">
        <Link href={`/${locale}`} className="hover:underline soft-ring rounded px-1">{labels.breadHome}</Link>
        <span aria-hidden="true">›</span>
        <span className="text-muted">{labels.h1}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${accent.kicker}`}>{labels.kicker}</p>
        <h1 className="text-4xl font-display font-semibold tracking-tight">{labels.h1}</h1>
        <p className="mt-4 text-base text-muted leading-relaxed max-w-xl">{labels.subtitle}</p>
      </header>

      {/* Disponibilité */}
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

      {/* Ce que je recherche */}
      <section aria-labelledby="section-looking" className="mb-10">
        <h2 id="section-looking" className="text-lg font-semibold mb-4">{labels.lookingTitle}</h2>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-2">{labels.domainsLabel}</p>
            <div className="flex flex-wrap gap-2">
              {labels.domains.map((d) => (
                <span key={d} className={`rounded-full border px-3 py-1 text-sm font-medium ${accent.domainBadge}`}>{d}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-2">{labels.durationLabel}</p>
            <div className="flex flex-wrap gap-2">
              {labels.durations.map((d) => (
                <span key={d} className="rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 px-3 py-1 text-sm">{d}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-2">{labels.modeLabel}</p>
            <div className="flex flex-wrap gap-2">
              {labels.modes.map((m) => (
                <span key={m} className="rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 px-3 py-1 text-sm">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="section-process" className="mb-10">
        <h2 id="section-process" className="text-lg font-semibold mb-4">{labels.processTitle}</h2>
        <ol className="space-y-4">
          {labels.steps.map((step) => (
            <li key={step.n} className="flex gap-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5">
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl font-bold text-sm grid place-items-center ${accent.stepNum}`}>{step.n}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-900 dark:text-white">{step.title}</span>
                  <span className={`rounded-full text-xs px-2 py-0.5 font-medium ${accent.stepBadge}`}>{step.badge}</span>
                </div>
                <p className="mt-1 text-sm text-muted leading-relaxed">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section aria-labelledby="section-cta" className={`mb-10 rounded-2xl border p-8 text-center ${accent.ctaSection}`}>
        <h2 id="section-cta" className="text-xl font-semibold text-slate-900 dark:text-white">{labels.ctaTitle}</h2>
        <p className="mt-2 text-sm text-muted">{labels.ctaSubtitle}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <CalendlyPopupButton
            url={CALENDLY_URL}
            label={isFr ? "Réserver un appel" : isEs ? "Reservar una llamada" : "Book a call"}
            className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium soft-ring transition-colors ${accent.ctaBtn}`}
          />
          {/* Pointait vers /#contact (formulaire simple de la home) au lieu du
              formulaire structuré /contact que cette page est censée amener —
              repéré à l'audit 2026-08-13 : un visiteur qui lit ce pitch de bout
              en bout retombait sur le formulaire le moins qualifiant des deux. */}
          <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-white px-6 py-2.5 text-sm font-medium soft-ring transition-colors">
            {labels.ctaContact}
          </Link>
          <Link href={`/${locale}/#services`} className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-white px-6 py-2.5 text-sm font-medium soft-ring transition-colors">
            {labels.ctaServices}
          </Link>
        </div>
      </section>

      {/* FAQ */}
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

      {/* Retour */}
      <div className="border-t border-black/10 dark:border-white/10 pt-8">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-5 py-2.5 text-sm text-muted-2 hover:bg-black/5 dark:hover:bg-white/5 soft-ring transition-colors">
          {labels.backHome}
        </Link>
      </div>
    </div>
  );
}
