"use client";

import Link from "next/link";
import { useTrack } from "@/app/[locale]/providers";
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

  // ── Contenu « Me recruter » ─────────────────────────────────────────────
  // Réécrit à l'audit de contenu du 2026-09-25 : la page parlait à un client
  // (appel découverte gratuit, devis sous 48 h, durée « récurrente », missions
  // courtes et audits ponctuels) alors que la cible est un recrutement salarié
  // (CDI, CDD, intérim, portage). L'URL /work-with-me est conservée pour ne
  // casser aucun lien existant.
  const labels = {
    kicker:         isFr ? "Recrutement · Paris / Île-de-France · Mobilité" : isEs ? "Selección · París / Île-de-France · Movilidad" : "Hiring · Paris / Île-de-France · Open to relocation",
    h1:             isFr ? "Me recruter" : isEs ? "Contratarme" : "Hire me",
    subtitle:       isFr
      ? "Développeuse Salesforce en CDI chez LD Digitales, je recherche mon prochain poste, disponible sous 1 mois (préavis) : un rôle où Salesforce, l'infrastructure et la sécurité se croisent. Voici l'essentiel pour un recruteur, en une page."
      : isEs
      ? "Desarrolladora Salesforce con contrato indefinido en LD Digitales, busco mi próximo puesto, disponible en 1 mes (preaviso): un rol donde Salesforce, infraestructura y seguridad se cruzan. Aquí tienes lo esencial para un reclutador, en una página."
      : "A full-time Salesforce Developer at LD Digitales, I'm looking for my next role, available within 1 month (notice period): one where Salesforce, infrastructure and security meet. Here is everything a recruiter needs, on one page.",

    availTitle:     isFr ? "Disponibilité" : isEs ? "Disponibilidad" : "Availability",
    availOpen:      isFr ? "Disponible" : isEs ? "Disponible" : "Available",
    availLimited:   isFr ? "Disponibilité limitée" : isEs ? "Disponibilidad limitada" : "Limited availability",
    availNo:        isFr ? "Non disponible" : isEs ? "No disponible" : "Not available",
    availSince:     isFr ? "Entretiens dès maintenant · Disponible sous 1 mois (préavis)" : isEs ? "Entrevistas desde ya · Disponible en 1 mes (preaviso)" : "Interviews now · Available within 1 month (notice period)",
    availContracts: isFr
      ? "CDI · CDD · Intérim · Portage salarial — tous secteurs d'activité"
      : isEs
      ? "Indefinido · Temporal · ETT · Portage salarial — todos los sectores"
      : "Permanent · Fixed-term · Temp · Umbrella (portage) — any industry",
    availMode:      isFr
      ? "Val-d'Oise (95), Île-de-France · Priorité Paris / Île-de-France, puis Provence-Alpes-Côte d'Azur · Hybride · Sur site · Télétravail · Relocalisation internationale envisageable"
      : isEs
      ? "Val-d'Oise (95), Île-de-France · Prioridad París / Île-de-France y, después, Provenza-Alpes-Costa Azul · Híbrido · Presencial · Remoto · Abierta a traslado internacional"
      : "Val-d'Oise (95), Île-de-France · Priority Paris / Île-de-France, then Provence-Alpes-Côte d'Azur · Hybrid · On-site · Remote · Open to international relocation",

    lookingTitle:   isFr ? "Ce que je recherche" : isEs ? "Lo que busco" : "What I'm looking for",
    domainsLabel:   isFr ? "Postes visés" : isEs ? "Puestos buscados" : "Target roles",
    // Postes visés (décision du 01/10/2026) : trois intitulés mis en avant,
    // puis une ouverture explicite à tout poste où le profil hybride apporte
    // de la valeur — hiérarchie claire sans fermer de porte.
    domains:        isFr
      ? ["Ingénieure Salesforce & Infrastructure", "Développeuse Salesforce", "Administratrice systèmes & réseaux"]
      : isEs
      ? ["Ingeniera Salesforce & Infraestructura", "Desarrolladora Salesforce", "Administradora de sistemas y redes"]
      : ["Salesforce & Infrastructure Engineer", "Salesforce Developer", "Systems & Network Administrator"],
    domainsOpen:    isFr
      ? "Également ouverte à tout poste où mon profil hybride apporte de la valeur, notamment : administratrice ou consultante Salesforce, ingénieure DevOps, analyste SOC N1."
      : isEs
      ? "También abierta a cualquier puesto donde mi perfil híbrido aporte valor, en particular: administradora o consultora Salesforce, ingeniera DevOps, analista SOC N1."
      : "Also open to any role where my hybrid profile adds value, including: Salesforce Administrator or Consultant, DevOps Engineer, SOC Analyst (Tier 1).",
    durationLabel:  isFr ? "Contrats" : isEs ? "Contratos" : "Contracts",
    durations:      isFr
      ? ["CDI", "CDD", "Intérim", "Portage salarial"]
      : isEs
      ? ["Indefinido", "Temporal", "ETT", "Portage salarial"]
      : ["Permanent", "Fixed-term", "Temp (agency)", "Umbrella company (portage)"],
    modeLabel:      isFr ? "Mode et secteurs" : isEs ? "Modalidad y sectores" : "Work mode and industries",
    modes:          isFr
      ? ["Hybride · Sur site · Télétravail", "Priorité Paris / Île-de-France, puis PACA", "Relocalisation internationale envisageable", "Tous secteurs d'activité"]
      : isEs
      ? ["Híbrido · Presencial · Remoto", "Prioridad París / Île-de-France y, después, PACA", "Abierta a traslado internacional", "Todos los sectores"]
      : ["Hybrid · On-site · Remote", "Priority Paris / Île-de-France, then PACA", "Open to international relocation", "Any industry"],

    processTitle:   isFr ? "Comment se passe un recrutement avec moi" : isEs ? "Cómo es un proceso de selección conmigo" : "How hiring me works",
    steps: isFr
      ? [
          { n: "01", title: "Premier contact",      desc: "Par email, LinkedIn ou le formulaire recruteur. Je réponds sous 48 h, avec mon CV adapté au poste.",                        badge: "48 h" },
          { n: "02", title: "Entretiens",           desc: "Échange RH, entretien technique (Apex, SOQL, Flow, ou mise en situation systèmes et réseaux), rencontre de l'équipe.",       badge: "Dès maintenant" },
          { n: "03", title: "Prise de poste",       desc: "Arrivée sous 1 mois (préavis), diplômes et références fournis sur demande.",                                                 badge: "1 mois" },
        ]
      : isEs
      ? [
          { n: "01", title: "Primer contacto",      desc: "Por email, LinkedIn o el formulario para reclutadores. Respondo en 48 h, con mi CV adaptado al puesto.",                     badge: "48 h" },
          { n: "02", title: "Entrevistas",          desc: "Entrevista de RR. HH., entrevista técnica (Apex, SOQL, Flow o caso práctico de sistemas y redes), encuentro con el equipo.", badge: "Desde ya" },
          { n: "03", title: "Incorporación",        desc: "Incorporación en 1 mes (preaviso); diplomas y referencias disponibles bajo petición.",                                       badge: "1 mes" },
        ]
      : [
          { n: "01", title: "First contact",        desc: "By email, LinkedIn or the recruiter form. I reply within 48 hours, with a résumé tailored to the role.",                    badge: "48 h" },
          { n: "02", title: "Interviews",           desc: "HR screening, technical interview (Apex, SOQL, Flow, or a systems and network scenario), meeting the team.",                 badge: "Now" },
          { n: "03", title: "Start",                desc: "Start within 1 month (notice period); diplomas and references available on request.",                                       badge: "1 month" },
        ],

    faqTitle: isFr ? "Questions fréquentes" : isEs ? "Preguntas frecuentes" : "FAQ",
    faqs: isFr
      ? [
          { q: "Quels types de contrat acceptez-vous ?",  a: "CDI, CDD, intérim ou portage salarial, dans tous les secteurs d'activité. Ce qui compte pour moi, c'est un poste où mon double profil Salesforce et infrastructure est utile." },
          { q: "Quand pouvez-vous commencer ?",           a: "Je suis disponible dès maintenant pour des entretiens, avec une prise de poste sous 1 mois (durée de mon préavis)." },
          { q: "Quelle est votre zone géographique ?",    a: "Je suis basée dans le Val-d'Oise (95), en Île-de-France. Ma priorité est Paris et l'Île-de-France, puis la région Provence-Alpes-Côte d'Azur — hybride, sur site ou télétravail selon le poste. Je suis également ouverte à la relocalisation à l'international : en Europe (Belgique, Luxembourg, Allemagne, Italie, Espagne, Irlande, Suède, Malte), au Royaume-Uni, au Maghreb (Tunisie, Algérie), au Canada, aux États-Unis, en Nouvelle-Zélande et en Asie." },
        ]
      : isEs
      ? [
          { q: "¿Qué tipos de contrato aceptas?",           a: "Indefinido, temporal, ETT o portage salarial, en todos los sectores. Lo que me importa es un puesto donde mi doble perfil Salesforce e infraestructura sea útil." },
          { q: "¿Cuándo puedes empezar?",                   a: "Estoy disponible para entrevistas desde ya, con incorporación en 1 mes (mi preaviso)." },
          { q: "¿Cuál es tu zona geográfica?",              a: "Estoy ubicada en Val-d'Oise (95), en Île-de-France. Mi prioridad es París y la región de Île-de-France y, después, Provenza-Alpes-Costa Azul — híbrido, presencial o remoto según el puesto. También estoy abierta a un traslado internacional: en Europa (Bélgica, Luxemburgo, Alemania, Italia, España, Irlanda, Suecia, Malta), al Reino Unido, al Magreb (Túnez, Argelia), a Canadá, a Estados Unidos, a Nueva Zelanda y a Asia." },
        ]
      : [
          { q: "Which contract types do you accept?",       a: "Permanent, fixed-term, temp (agency) or umbrella-company (portage) contracts, in any industry. What matters to me is a role where my dual Salesforce and infrastructure profile is useful." },
          { q: "When can you start?",                       a: "I'm available for interviews right away, with a start date within 1 month (my notice period)." },
          { q: "Where are you based?",                      a: "I'm based in Val-d'Oise (95), Île-de-France. My priority is Paris and the Île-de-France region, then Provence-Alpes-Côte d'Azur — hybrid, on-site or remote depending on the role. I'm also open to international relocation: Europe (Belgium, Luxembourg, Germany, Italy, Spain, Ireland, Sweden, Malta), the United Kingdom, the Maghreb (Tunisia, Algeria), Canada, the United States, New Zealand and Asia." },
        ],

    ctaTitle:    isFr ? "Un poste à pourvoir ?" : isEs ? "¿Tienes un puesto por cubrir?" : "Hiring for a role?",
    ctaSubtitle: isFr ? "Présentez-moi le poste en quelques lignes — je réponds sous 48 h." : isEs ? "Preséntame el puesto en pocas líneas — respondo en 48 h." : "Tell me about the role in a few lines — I reply within 48 hours.",
    ctaContact:  isFr ? "Présenter un poste" : isEs ? "Presentar un puesto" : "Tell me about the role",
    ctaCall:     isFr ? "Planifier un échange" : isEs ? "Programar una llamada" : "Schedule a call",
    ctaCv:       isFr ? "Télécharger le CV hybride" : isEs ? "Descargar el CV híbrido" : "Download the hybrid résumé",
    ctaHybrid:   isFr ? "Voir le profil hybride" : isEs ? "Ver el perfil híbrido" : "See the hybrid profile",
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

  // Le JSON-LD ProfessionalService (référencement de prestations) a été retiré
  // à l'audit de contenu du 2026-09-25 : il présentait le profil comme une
  // offre de services. Le fil d'Ariane JSON-LD reste émis par page.tsx.
  const cvUrl = `/cv/Aicha-Imene-DAHOUMANE-CV-${isFr ? "fr" : isEs ? "es" : "en"}-hybrid.pdf`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
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
            <p className="mt-2 text-sm text-muted leading-relaxed">{labels.domainsOpen}</p>
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
          <Link href={`/${locale}/contact`} className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium soft-ring transition-colors ${accent.ctaBtn}`}>
            {labels.ctaContact}
          </Link>
          <CalendlyPopupButton
            url={CALENDLY_URL}
            label={labels.ctaCall}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-white px-6 py-2.5 text-sm font-medium soft-ring transition-colors"
          />
          <a href={cvUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-white px-6 py-2.5 text-sm font-medium soft-ring transition-colors">
            {labels.ctaCv}
          </a>
          <Link href={`/${locale}/hybride`} className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-white px-6 py-2.5 text-sm font-medium soft-ring transition-colors">
            {labels.ctaHybrid}
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
