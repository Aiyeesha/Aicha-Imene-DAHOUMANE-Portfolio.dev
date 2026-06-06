"use client";

// CareerTimeline.tsx
// ------------------
// Frise chronologique visuelle du parcours professionnel d'Aïcha Imène DAHOUMANE.
// Données statiques (bilingues EN/FR) — milestones stables et vérifiables.
//
// Design :
//   - Colonne gauche : badge année + icône + ligne verticale de connexion
//   - Colonne droite : carte (type coloré, titre, organisation, description, tags)
//   - Types : "formation" (violet), "stage" (amber), "alternance" (cyan), "emploi" (emerald)
//   - Animation : entrée au scroll via Framer Motion (useInView), disabled si reduced motion
//
// Bilingue : chaque milestone a un champ `label` { en, fr }.

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────

type MilestoneType = "formation" | "stage" | "alternance" | "emploi";

type Milestone = {
  /** Période affichée (ex: "2022", "2023 – 2025"). Peut être bilingue { en, fr }. */
  period: string | { en: string; fr: string };
  type: MilestoneType;
  /** Titre du poste ou de la formation */
  title: { en: string; fr: string };
  /** Organisme / entreprise */
  org: string;
  /** Description courte */
  description: { en: string; fr: string };
  /** Tags compétences ou diplômes */
  tags: string[];
  /** Logos des organismes (chemins dans /public/) */
  logos?: { src: string; alt: string }[];
};

// ── Données du parcours ────────────────────────────────────────────────────────

const MILESTONES: Milestone[] = [
  {
    period: "2022",
    type: "formation",
    title: {
      en: "IT Support Technician",
      fr: "Technicien(ne) d'Assistance Informatique",
    },
    org: "GRETA du Val d'Oise — Lycée Louis Jouvet",
    description: {
      en: "First professional qualification in IT. Hardware, networking, Windows 10, VirtualBox, Active Directory, user support.",
      fr: "Première qualification professionnelle en informatique. Matériel, réseau, Windows 10, VirtualBox, Active Directory, support utilisateur.",
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
    },
    org: "Global Info — Back Market partner",
    description: {
      en: "End-of-training internship (TAI). Hardware and software support, IT asset management.",
      fr: "Stage de fin de formation TAI. Support matériel et logiciel, gestion de parc informatique.",
    },
    tags: ["Windows 10", "User Support", "IT Asset Management"],
  },
  {
    period: "2023",
    type: "formation",
    title: {
      en: "Higher Technician in Systems & Networks (TSSR)",
      fr: "Technicienne Supérieure Systèmes & Réseaux (TSSR)",
    },
    org: "GRETA du Val d'Oise",
    description: {
      en: "Administration of Windows Server environments, networking, virtualization, security, and monitoring.",
      fr: "Administration des environnements Windows Server, réseaux, virtualisation, sécurité et supervision.",
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
      en: "Systems & Networks Internship",
      fr: "Stage Systèmes & Réseaux",
    },
    org: "Midrange Group",
    description: {
      en: "Required internship as part of the TSSR program (GRETA du Val d'Oise). Deployment of 200+ workstations via Windows Autopilot, Windows Server 2022 (AD DS, DNS, DHCP, GPO), PfSense, Acronis, Datto RMM.",
      fr: "Stage de fin de formation TSSR (GRETA du Val d'Oise). Déploiement de 200+ postes via Windows Autopilot, Windows Server 2022 (AD DS, DNS, DHCP, GPO), PfSense, Acronis, Datto RMM.",
    },
    tags: ["Windows Server 2022", "Autopilot", "PfSense", "Acronis", "Datto RMM"],
    logos: [
      { src: "/companies/midrange.webp", alt: "Midrange Group" },
      { src: "/companies/greta.svg", alt: "GRETA du Val d'Oise" },
    ],
  },
  {
    period: { en: "2023 – Sep. 2025", fr: "2023 – sept. 2025" },
    type: "alternance",
    title: {
      en: "Salesforce Developer & Administrator (Work-study)",
      fr: "Développeuse & Administratrice Salesforce (Alternance)",
    },
    org: "LD Digitales × OpenClassrooms",
    description: {
      en: "Full-stack Salesforce development (Apex, Flows, LWC, SOQL), CI/CD with GitHub Actions, security, deployments, and delivery of LD Digitales' internal Salesforce application.",
      fr: "Développement Salesforce full-stack (Apex, Flows, LWC, SOQL), CI/CD GitHub Actions, sécurité, déploiements et livraison de l'application Salesforce interne de LD Digitales.",
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
    },
    org: "OpenClassrooms",
    description: {
      en: "RNCP Level 6 (Bac+3/4 equivalent). Specialisation: Salesforce, Apex, LWC, CI/CD, automated testing, data modeling.",
      fr: "Titre RNCP niveau 6 (Bac+3/4). Spécialisation Salesforce : Apex, LWC, CI/CD, tests automatisés, modélisation des données.",
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
      en: "Salesforce Developer & Consultant (CDI)",
      fr: "Développeuse & Consultante Salesforce (CDI)",
    },
    org: "LD Digitales",
    description: {
      en: "Salesforce project delivery, Apex/LWC development, Flow automation, integrations, client support, and technical documentation.",
      fr: "Livraisons de projets Salesforce, développement Apex/LWC, automatisation Flows, intégrations, support client, documentation technique.",
    },
    tags: ["Salesforce", "Apex", "LWC", "Integrations", "DevOps"],
    logos: [
      { src: "/companies/ld-digitales.webp", alt: "LD Digitales" },
    ],
  },
];

// ── Couleurs par type ─────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<MilestoneType, {
  badge: string;        // label EN
  badgeFr: string;      // label FR
  badgeClass: string;   // pill badge classes
  dotClass: string;     // cercle indicateur
  lineClass: string;    // ligne de connexion
  borderStyle: React.CSSProperties; // bordure gauche de la carte (inline — cf. LatestPosts)
}> = {
  formation: {
    badge: "Training",
    badgeFr: "Formation",
    badgeClass: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
    dotClass:   "bg-violet-500 dark:bg-violet-400",
    lineClass:  "bg-gradient-to-b from-violet-400/40 to-violet-400/10",
    borderStyle: { borderLeft: "3px solid #8b5cf6" },
  },
  stage: {
    badge: "Internship",
    badgeFr: "Stage",
    badgeClass: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    dotClass:   "bg-amber-500 dark:bg-amber-400",
    lineClass:  "bg-gradient-to-b from-amber-400/40 to-amber-400/10",
    borderStyle: { borderLeft: "3px solid #f59e0b" },
  },
  alternance: {
    badge: "Work-study",
    badgeFr: "Alternance",
    badgeClass: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
    dotClass:   "bg-cyan-500 dark:bg-cyan-400",
    lineClass:  "bg-gradient-to-b from-cyan-400/50 to-cyan-400/10",
    borderStyle: { borderLeft: "3px solid #06b6d4" },
  },
  emploi: {
    badge: "Position",
    badgeFr: "Poste",
    badgeClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    dotClass:   "bg-emerald-500 dark:bg-emerald-400",
    lineClass:  "bg-gradient-to-b from-emerald-400/50 to-emerald-400/10",
    borderStyle: { borderLeft: "3px solid #10b981" },
  },
};

// ── Étape individuelle ────────────────────────────────────────────────────────

function TimelineItem({
  milestone,
  isLast,
  isFr,
  shouldReduce,
}: {
  milestone: Milestone;
  isLast: boolean;
  isFr: boolean;
  shouldReduce: boolean | null;
}) {
  const ref  = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const cfg  = TYPE_CONFIG[milestone.type];
  const show = shouldReduce || inView;

  return (
    <li ref={ref} className="flex gap-4 md:gap-6">

      {/* ── Colonne gauche : point + ligne ──────────────────────────────── */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        {/* Badge année */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, scale: 0.7 }}
          animate={show ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-1.5 rounded-full bg-black/5 dark:bg-white/8 px-2 py-0.5 text-xs font-mono font-medium text-muted-2 whitespace-nowrap"
        >
          {typeof milestone.period === "string" ? milestone.period : (isFr ? milestone.period.fr : milestone.period.en)}
        </motion.div>

        {/* Point coloré */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, scale: 0.5 }}
          animate={show ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
          className={`h-3 w-3 rounded-full shrink-0 shadow-sm ${cfg.dotClass}`}
          aria-hidden="true"
        />

        {/* Ligne de connexion */}
        {!isLast && (
          <motion.div
            initial={shouldReduce ? false : { scaleY: 0 }}
            animate={show ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            style={{ originY: 0 }}
            className={`mt-1.5 w-px flex-1 min-h-[3rem] ${cfg.lineClass}`}
            aria-hidden="true"
          />
        )}
      </div>

      {/* ── Colonne droite : carte ───────────────────────────────────────── */}
      <motion.div
        initial={shouldReduce ? false : { opacity: 0, x: 16 }}
        animate={show ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 }}
        className={`flex-1 rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-white/[0.02] p-4 md:p-5 ${isLast ? "mb-0" : "mb-6"}`}
        style={cfg.borderStyle}
      >
        {/* En-tête : type + titre */}
        <div className="flex flex-wrap items-start gap-2 mb-2">
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium shrink-0 ${cfg.badgeClass}`}>
            {isFr ? cfg.badgeFr : cfg.badge}
          </span>
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold leading-snug">
              {isFr ? milestone.title.fr : milestone.title.en}
            </h3>
            <p className="mt-0.5 text-xs font-medium text-muted-2">{milestone.org}</p>
          </div>

          {/* Logos des organismes */}
          {milestone.logos && milestone.logos.length > 0 && (
            <div className="flex items-center gap-2 shrink-0">
              {milestone.logos.map((logo) => (
                <div
                  key={logo.src}
                  className="h-8 w-auto flex items-center justify-center rounded bg-white dark:bg-white/5 px-1.5 py-1 border border-black/8 dark:border-white/8"
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
          {isFr ? milestone.description.fr : milestone.description.en}
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

// ── Composant principal ───────────────────────────────────────────────────────

export default function CareerTimeline({ locale }: { locale: string }) {
  const shouldReduce = useReducedMotion();
  const isFr = locale === "fr";

  return (
    <ol className="mt-6 list-none space-y-0" aria-label={isFr ? "Frise de carrière" : "Career timeline"}>
      {MILESTONES.map((m, i) => (
        <TimelineItem
          key={`${typeof m.period === "string" ? m.period : m.period.en}-${m.type}`}
          milestone={m}
          isLast={i === MILESTONES.length - 1}
          isFr={isFr}
          shouldReduce={shouldReduce}
        />
      ))}
    </ol>
  );
}
