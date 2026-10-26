"use client";

// CareerTimeline.tsx
// ------------------
// Career timeline with static, verifiable milestones (EN/FR/ES).
// Left column: year badge, dot and connecting line. Right column: card with
// type, title, organisation, description and tags. Types are colour-coded:
// training (violet), internship (amber), work-study (cyan), job (emerald).
// Entries animate in on scroll (Framer Motion), except with reduced motion.

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────

type MilestoneType = "formation" | "stage" | "alternance" | "emploi";

type Milestone = {
  /** Displayed period (e.g. "2022", "2023 – 2025"), optionally per locale. */
  period: string | { en: string; fr: string; es: string };
  type: MilestoneType;
  /** Job or programme title */
  title: { en: string; fr: string; es: string };
  /** Organisation / company */
  org: string;
  /** Short description */
  description: { en: string; fr: string; es: string };
  /** Skill or diploma tags */
  tags: string[];
  /** Organisation logos (paths under /public/) */
  logos?: { src: string; alt: string }[];
};

// ── Career data ────────────────────────────────────────────────────────────────

const MILESTONES: Milestone[] = [
  {
    period: "2022",
    type: "formation",
    title: {
      en: "IT Support Technician",
      fr: "Technicien(ne) d'Assistance Informatique",
      es: "Técnico/a de Asistencia Informática",
    },
    org: "GRETA du Val d'Oise — Lycée Louis Jouvet",
    description: {
      en: "First professional qualification in IT. Hardware, networking, Windows 10, VirtualBox, Active Directory, user support.",
      fr: "Première qualification professionnelle en informatique. Matériel, réseau, Windows 10, VirtualBox, Active Directory, support utilisateur.",
      es: "Primera cualificación profesional en informática. Hardware, redes, Windows 10, VirtualBox, Active Directory, soporte a usuarios.",
    },
    tags: ["RNCP 4", "Windows 10", "Active Directory", "VirtualBox"],
    logos: [
      { src: "/companies/greta.svg", alt: "GRETA du Val d'Oise" },
    ],
  },
  {
    period: "2022",
    type: "stage",
    title: {
      en: "IT Support Technician (Internship)",
      fr: "Technicienne Assistance Informatique (stage)",
      es: "Técnica de Asistencia Informática (prácticas)",
    },
    org: "Global Info — Back Market partner",
    description: {
      en: "End-of-training internship (TAI). Hardware and software support, IT asset management.",
      fr: "Stage de fin de formation TAI. Support matériel et logiciel, gestion de parc informatique.",
      es: "Prácticas de fin de formación TAI. Soporte hardware y software, gestión de parque informático.",
    },
    tags: ["Windows 10", "User Support", "IT Asset Management"],
  },
  {
    period: "2023",
    type: "formation",
    title: {
      en: "Higher Technician in Systems & Networks (TSSR)",
      fr: "Technicienne Supérieure Systèmes & Réseaux (TSSR)",
      es: "Técnica Superior en Sistemas y Redes (TSSR)",
    },
    org: "GRETA du Val d'Oise",
    description: {
      en: "Administration of Windows Server environments, networking, virtualization, security, and monitoring.",
      fr: "Administration des environnements Windows Server, réseaux, virtualisation, sécurité et supervision.",
      es: "Administración de entornos Windows Server, redes, virtualización, seguridad y supervisión.",
    },
    tags: ["RNCP 5", "Windows Server", "VMware", "GPO", "Supervision"],
    logos: [
      { src: "/companies/greta.svg", alt: "GRETA du Val d'Oise" },
    ],
  },
  {
    period: "2023",
    type: "stage",
    title: {
      en: "Systems & Networks Internships",
      fr: "Stages Systèmes & Réseaux",
      es: "Prácticas de Sistemas y Redes",
    },
    org: "Midrange Group",
    description: {
      en: "Two one-month internships as part of the TSSR program (GRETA du Val d'Oise). Deployment of 264 Dell workstations (200 of them via Windows Autopilot), Windows Server 2022 (AD DS, DNS, DHCP, GPO), PfSense, Acronis, Datto RMM.",
      fr: "Deux stages d'un mois dans le cadre de la formation TSSR (GRETA du Val d'Oise). Déploiement de 264 postes Dell (dont 200 via Windows Autopilot), Windows Server 2022 (AD DS, DNS, DHCP, GPO), PfSense, Acronis, Datto RMM.",
      es: "Dos prácticas de un mes en el marco del programa TSSR (GRETA du Val d'Oise). Despliegue de 264 puestos Dell (200 de ellos vía Windows Autopilot), Windows Server 2022 (AD DS, DNS, DHCP, GPO), PfSense, Acronis, Datto RMM.",
    },
    tags: ["Windows Server 2022", "Autopilot", "PfSense", "Acronis", "Datto RMM"],
    logos: [
      { src: "/companies/midrange.webp", alt: "Midrange Group" },
      { src: "/companies/greta.svg", alt: "GRETA du Val d'Oise" },
    ],
  },
  {
    period: { en: "2023 – Sep. 2025", fr: "2023 – sept. 2025", es: "2023 – sept. 2025" },
    type: "alternance",
    title: {
      en: "Salesforce Developer & Administrator (Work-study)",
      fr: "Développeuse & Administratrice Salesforce (Alternance)",
      es: "Desarrolladora y Administradora Salesforce (Formación dual)",
    },
    org: "LD Digitales × OpenClassrooms",
    description: {
      en: "Full-stack Salesforce development (Apex, Flows, LWC, SOQL), CI/CD with GitHub Actions, security, deployments, and delivery of LD Digitales' internal Salesforce application.",
      fr: "Développement Salesforce full-stack (Apex, Flows, LWC, SOQL), CI/CD GitHub Actions, sécurité, déploiements et livraison de l'application Salesforce interne de LD Digitales.",
      es: "Desarrollo Salesforce full-stack (Apex, Flows, LWC, SOQL), CI/CD con GitHub Actions, seguridad, despliegues y entrega de la aplicación Salesforce interna de LD Digitales.",
    },
    tags: ["Apex", "LWC", "Flows", "SOQL", "GitHub Actions", "Salesforce CLI"],
    logos: [
      { src: "/companies/ld-digitales.webp",  alt: "LD Digitales"    },
      { src: "/companies/openclassrooms.svg", alt: "OpenClassrooms"  },
    ],
  },
  {
    period: "2025",
    type: "formation",
    title: {
      en: "Software Designer-Developer Degree (DCL)",
      fr: "Diplôme Développeur Concepteur Logiciel (DCL)",
      es: "Título de Diseñadora-Desarrolladora de Software (DCL)",
    },
    org: "OpenClassrooms",
    description: {
      en: "RNCP Level 6 (Bac+3/4 equivalent). Specialisation: Salesforce, Apex, LWC, CI/CD, automated testing, data modeling.",
      fr: "Titre RNCP niveau 6 (Bac+3/4). Spécialisation Salesforce : Apex, LWC, CI/CD, tests automatisés, modélisation des données.",
      es: "Título RNCP nivel 6 (equivalente a Bac+3/4). Especialización Salesforce: Apex, LWC, CI/CD, pruebas automatizadas, modelado de datos.",
    },
    tags: ["RNCP 6", "Apex", "LWC", "CI/CD", "Tests unitaires"],
    logos: [
      { src: "/companies/openclassrooms.svg", alt: "OpenClassrooms" },
    ],
  },
  {
    period: "2025 →",
    type: "emploi",
    title: {
      en: "Salesforce Developer (Full-time)",
      fr: "Développeuse Salesforce (CDI)",
      es: "Desarrolladora Salesforce (contrato indefinido)",
    },
    org: "LD Digitales",
    description: {
      en: "Salesforce project delivery, Apex/LWC development, Flow automation, integrations, client support, and technical documentation.",
      fr: "Livraisons de projets Salesforce, développement Apex/LWC, automatisation Flows, intégrations, support client, documentation technique.",
      es: "Entrega de proyectos Salesforce, desarrollo Apex/LWC, automatización con Flows, integraciones, soporte a clientes y documentación técnica.",
    },
    tags: ["Salesforce", "Apex", "LWC", "Integrations", "DevOps"],
    logos: [
      { src: "/companies/ld-digitales.webp", alt: "LD Digitales" },
    ],
  },
];

// ── Colours per type ──────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<MilestoneType, {
  badge: string;        // EN label
  badgeFr: string;      // FR label
  badgeEs: string;      // ES label
  badgeClass: string;   // pill badge classes
  dotClass: string;     // dot
  lineClass: string;    // connecting line
  borderStyle: React.CSSProperties; // card left border (inline, as in LatestPosts)
}> = {
  formation: {
    badge: "Training",
    badgeFr: "Formation",
    badgeEs: "Formación",
    badgeClass: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
    dotClass:   "bg-violet-500 dark:bg-violet-400",
    lineClass:  "bg-linear-to-b from-violet-400/40 to-violet-400/10",
    borderStyle: { borderLeft: "3px solid #8b5cf6" },
  },
  stage: {
    badge: "Internship",
    badgeFr: "Stage",
    badgeEs: "Prácticas",
    badgeClass: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    dotClass:   "bg-amber-500 dark:bg-amber-400",
    lineClass:  "bg-linear-to-b from-amber-400/40 to-amber-400/10",
    borderStyle: { borderLeft: "3px solid #f59e0b" },
  },
  alternance: {
    badge: "Work-study",
    badgeFr: "Alternance",
    badgeEs: "Formación dual",
    badgeClass: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
    dotClass:   "bg-cyan-500 dark:bg-cyan-400",
    lineClass:  "bg-linear-to-b from-cyan-400/50 to-cyan-400/10",
    borderStyle: { borderLeft: "3px solid #06b6d4" },
  },
  emploi: {
    badge: "Position",
    badgeFr: "Poste",
    badgeEs: "Puesto",
    badgeClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    dotClass:   "bg-emerald-500 dark:bg-emerald-400",
    lineClass:  "bg-linear-to-b from-emerald-400/50 to-emerald-400/10",
    borderStyle: { borderLeft: "3px solid #10b981" },
  },
};

// ── Single milestone ──────────────────────────────────────────────────────────

function TimelineItem({
  milestone,
  isLast,
  isFr,
  isEs,
  shouldReduce,
}: {
  milestone: Milestone;
  isLast: boolean;
  isFr: boolean;
  isEs: boolean;
  shouldReduce: boolean | null;
}) {
  const ref  = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const cfg  = TYPE_CONFIG[milestone.type];
  const show = shouldReduce || inView;

  // Localised period: shown in the left column from sm, in the card header
  // on mobile.
  const periodLabel =
    typeof milestone.period === "string"
      ? milestone.period
      : isFr ? milestone.period.fr : isEs ? milestone.period.es : milestone.period.en;

  return (
    <li ref={ref} className="flex gap-4 md:gap-6">

      {/* ── Left column: dot + line ─────────────────────────────────────── */}
      {/* max-sm:pt-5 aligns the dot with the card's type badge when the
          year badge is hidden. */}
      <div className="flex flex-col items-center shrink-0 pt-1 max-sm:pt-5">
        {/* Year badge, hidden below sm: on mobile the column would squeeze
            (or push off-screen) the card, so the period moves to the card
            header. display: none means it is never read twice. */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, scale: 0.7 }}
          animate={show ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-1.5 rounded-full bg-black/5 dark:bg-white/8 px-2 py-0.5 text-xs font-mono font-medium text-muted-2 whitespace-nowrap max-sm:hidden"
        >
          {periodLabel}
        </motion.div>

        {/* Coloured dot */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, scale: 0.5 }}
          animate={show ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
          className={`h-3 w-3 rounded-full shrink-0 shadow-xs ${cfg.dotClass}`}
          aria-hidden="true"
        />

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            initial={shouldReduce ? false : { scaleY: 0 }}
            animate={show ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            style={{ originY: 0 }}
            className={`mt-1.5 w-px flex-1 min-h-12 ${cfg.lineClass}`}
            aria-hidden="true"
          />
        )}
      </div>

      {/* ── Right column: card ──────────────────────────────────────────── */}
      <motion.div
        initial={shouldReduce ? false : { opacity: 0, x: 16 }}
        animate={show ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 }}
        // min-w-0 lets the flex item shrink below its longest content;
        // break-words wraps long words and identifiers on mobile.
        className={`min-w-0 flex-1 break-words rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-white/2 p-4 md:p-5 ${isLast ? "mb-0" : "mb-6"}`}
        style={cfg.borderStyle}
      >
        {/* Header: type + title */}
        <div className="flex flex-wrap items-start gap-2 mb-2">
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium shrink-0 ${cfg.badgeClass}`}>
            {isFr ? cfg.badgeFr : isEs ? cfg.badgeEs : cfg.badge}
          </span>
          {/* Period, mobile only (replaces the left-column badge). */}
          <span className="rounded-full bg-black/5 dark:bg-white/8 px-2 py-0.5 text-xs font-mono font-medium text-muted-2 whitespace-nowrap sm:hidden">
            {periodLabel}
          </span>
        </div>

        {/* On very small screens (320px) the logos wrap below the title
            instead of overflowing. */}
        <div className="flex items-start justify-between gap-3 max-sm:flex-wrap">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold leading-snug">
              {isFr ? milestone.title.fr : isEs ? milestone.title.es : milestone.title.en}
            </h3>
            <p className="mt-0.5 text-xs font-medium text-muted-2">{milestone.org}</p>
          </div>

          {/* Organisation logos */}
          {milestone.logos && milestone.logos.length > 0 && (
            <div className="flex items-center gap-2 shrink-0 max-sm:flex-wrap max-sm:shrink">
              {milestone.logos.map((logo) => (
                <div
                  key={logo.src}
                  className="h-8 w-auto flex items-center justify-center rounded-sm bg-white dark:bg-white/5 px-1.5 py-1 border border-black/8 dark:border-white/8"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={56}
                    height={24}
                    className="h-5 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="mt-2 text-sm text-muted leading-relaxed">
          {isFr ? milestone.description.fr : isEs ? milestone.description.es : milestone.description.en}
        </p>

        {/* Tags */}
        {milestone.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {milestone.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-2 py-0.5 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </li>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CareerTimeline({ locale }: { locale: string }) {
  const shouldReduce = useReducedMotion();
  const isFr = locale === "fr";
  const isEs = locale === "es";

  return (
    <ol className="mt-6 list-none space-y-0" aria-label={isFr ? "Frise de carrière" : isEs ? "Cronología profesional" : "Career timeline"}>
      {MILESTONES.map((m, i) => (
        <TimelineItem
          key={`${typeof m.period === "string" ? m.period : m.period.en}-${m.type}`}
          milestone={m}
          isLast={i === MILESTONES.length - 1}
          isFr={isFr}
          isEs={isEs}
          shouldReduce={shouldReduce}
        />
      ))}
    </ol>
  );
}
