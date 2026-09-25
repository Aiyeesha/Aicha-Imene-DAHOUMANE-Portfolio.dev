// lib/projectNature.ts
// ---------------------
// Nature et période de chaque projet, affichées dans un bandeau en tête de la
// page projet et sur les cartes (audit de contenu du 2026-09-25, lot 3).
//
// Pourquoi : la frontière entre travail réel, formation et reconstitution
// était floue (projets de formation décrits « en production », stage Midrange
// jamais nommé comme tel, projets non datés). Chaque projet déclare donc sa
// nature dans content/projects.ts, et ce module fournit le libellé, la période
// et la note explicative à afficher, dans les trois langues.
//
// Règle : une période n'est affichée que si elle est connue et vérifiable
// (dates de formation et de stage publiées sur /certifications et /about).
// Aucune date n'est inventée : un projet sans période connue n'affiche que sa
// nature, jusqu'à ce que sa date soit renseignée dans content/projects.ts.

export type ProjectNature =
  | "rncp_capstone"   // projet fil rouge du titre RNCP 6 (Légarant-AXG uniquement)
  | "rncp"            // autres projets du titre RNCP 6 (OpenClassrooms, alternance)
  | "openclassrooms"  // autres projets de formation OpenClassrooms
  | "greta_tai"       // exercices de la formation TAI (Greta du Val d'Oise)
  | "greta_tssr"      // exercices de la formation TSSR (Greta du Val d'Oise)
  | "internship"      // stage chez MIDRANGE GROUP
  | "personal"        // projet personnel
  | "reconstructed";  // étude de cas reconstituée (scénario fictif)

type Locale = "fr" | "en" | "es";
type Localized = Record<Locale, string>;

/** Période localisée propre à un projet (surcharge la période par défaut). */
export type ProjectPeriod = Localized;

type NatureInfo = {
  /** Libellé long affiché dans le bandeau. */
  label: Localized;
  /** Période par défaut de la nature (formation, stage), si elle est connue. */
  period?: Localized;
  /** Phrase qui explique le cadre du projet. */
  note: Localized;
};

const RNCP_PERIOD: Localized = {
  fr: "oct. 2023 – oct. 2025",
  en: "Oct 2023 – Oct 2025",
  es: "oct. 2023 – oct. 2025",
};

const NATURES: Record<ProjectNature, NatureInfo> = {
  rncp_capstone: {
    label: {
      fr: "Projet fil rouge — titre RNCP niveau 6 « Développeur Concepteur Logiciel » (OpenClassrooms, en alternance)",
      en: "Capstone project — RNCP Level 6 'Développeur Concepteur Logiciel' diploma (OpenClassrooms, work-study)",
      es: "Proyecto integrador — título RNCP nivel 6 «Développeur Concepteur Logiciel» (OpenClassrooms, formación dual)",
    },
    period: RNCP_PERIOD,
    note: {
      fr: "Projet de formation : entreprise et scénario fictifs, contraintes imposées, livrable soutenu devant un jury. Ce n'est pas une mission client.",
      en: "Training project: fictional company and scenario, imposed constraints, deliverable defended before a jury. It is not a client engagement.",
      es: "Proyecto de formación: empresa y escenario ficticios, restricciones impuestas, entregable defendido ante un tribunal. No es un encargo de cliente.",
    },
  },
  rncp: {
    label: {
      fr: "Projet de formation — titre RNCP niveau 6 « Développeur Concepteur Logiciel » (OpenClassrooms, en alternance)",
      en: "Training project — RNCP Level 6 'Développeur Concepteur Logiciel' diploma (OpenClassrooms, work-study)",
      es: "Proyecto de formación — título RNCP nivel 6 «Développeur Concepteur Logiciel» (OpenClassrooms, formación dual)",
    },
    period: RNCP_PERIOD,
    note: {
      fr: "Entreprise et scénario fictifs, contraintes imposées, livrable soutenu devant un jury. Ce n'est pas une mission client.",
      en: "Fictional company and scenario, imposed constraints, deliverable defended before a jury. It is not a client engagement.",
      es: "Empresa y escenario ficticios, restricciones impuestas, entregable defendido ante un tribunal. No es un encargo de cliente.",
    },
  },
  openclassrooms: {
    label: {
      fr: "Projet de formation — OpenClassrooms",
      en: "Training project — OpenClassrooms",
      es: "Proyecto de formación — OpenClassrooms",
    },
    note: {
      fr: "Scénario fictif fourni par la formation, livrable soutenu devant un évaluateur.",
      en: "Fictional scenario provided by the course, deliverable defended before an assessor.",
      es: "Escenario ficticio proporcionado por la formación, entregable defendido ante un evaluador.",
    },
  },
  greta_tai: {
    label: {
      fr: "Exercice de formation — Technicien d'Assistance Informatique (TAI), Greta du Val d'Oise",
      en: "Training exercise — IT Support Technician (TAI), Greta du Val d'Oise",
      es: "Ejercicio de formación — Técnica de Asistencia Informática (TAI), Greta du Val d'Oise",
    },
    period: { fr: "janv. – juil. 2022", en: "Jan – Jul 2022", es: "ene. – jul. 2022" },
    note: {
      fr: "Exercice encadré, réalisé en environnement de formation.",
      en: "Supervised exercise, carried out in a training environment.",
      es: "Ejercicio supervisado, realizado en un entorno de formación.",
    },
  },
  greta_tssr: {
    label: {
      fr: "Exercice de formation — Technicien Supérieur Systèmes et Réseaux (TSSR), Greta du Val d'Oise",
      en: "Training exercise — Systems & Network Technician (TSSR), Greta du Val d'Oise",
      es: "Ejercicio de formación — Técnica Superior de Sistemas y Redes (TSSR), Greta du Val d'Oise",
    },
    period: { fr: "oct. 2022 – juin 2023", en: "Oct 2022 – Jun 2023", es: "oct. 2022 – jun. 2023" },
    note: {
      fr: "Lab réalisé dans le cadre de la formation, en environnement virtualisé.",
      en: "Lab carried out as part of the course, in a virtualized environment.",
      es: "Laboratorio realizado en el marco de la formación, en un entorno virtualizado.",
    },
  },
  internship: {
    label: {
      fr: "Stage en entreprise — MIDRANGE GROUP (ESN / MSP)",
      en: "Company internship — MIDRANGE GROUP (IT services / MSP)",
      es: "Prácticas en empresa — MIDRANGE GROUP (servicios IT / MSP)",
    },
    period: { fr: "févr. – mai 2023", en: "Feb – May 2023", es: "feb. – may. 2023" },
    note: {
      fr: "Travail réel réalisé pendant mon stage. Les noms, adresses et données du client ont été anonymisés.",
      en: "Real work carried out during my internship. Client names, addresses and data have been anonymized.",
      es: "Trabajo real realizado durante mis prácticas. Los nombres, direcciones y datos del cliente se han anonimizado.",
    },
  },
  personal: {
    label: { fr: "Projet personnel", en: "Personal project", es: "Proyecto personal" },
    note: {
      fr: "Réalisé sur mon temps personnel, hors cadre professionnel et hors formation.",
      en: "Built on my own time, outside of work and coursework.",
      es: "Realizado en mi tiempo personal, fuera del ámbito profesional y de la formación.",
    },
  },
  reconstructed: {
    label: { fr: "Étude de cas reconstituée", en: "Reconstructed case study", es: "Caso de estudio reconstruido" },
    note: {
      fr: "Scénario, entreprise et chiffres fictifs. Elle s'inspire du type de travaux que je réalise en poste, dont le détail reste confidentiel.",
      en: "Fictional scenario, company and figures. It is inspired by the kind of work I do in my role, whose specifics remain confidential.",
      es: "Escenario, empresa y cifras ficticios. Se inspira en el tipo de trabajo que realizo en mi puesto, cuyos detalles siguen siendo confidenciales.",
    },
  },
};

export type ResolvedNature = {
  nature: ProjectNature;
  label: string;
  period: string | null;
  note: string;
};

/**
 * Résout le libellé, la période et la note d'un projet pour une locale.
 * La période propre au projet (content/projects.ts) prime sur celle de la
 * nature ; sans l'une ni l'autre, `period` vaut null (rien n'est inventé).
 */
export function resolveNature(
  nature: ProjectNature | null | undefined,
  locale: string,
  period?: ProjectPeriod | null,
): ResolvedNature | null {
  if (!nature) return null;
  const info = NATURES[nature];
  if (!info) return null;
  const loc: Locale = locale === "fr" || locale === "es" ? locale : "en";
  return {
    nature,
    label: info.label[loc],
    period: period?.[loc] ?? info.period?.[loc] ?? null,
    note: info.note[loc],
  };
}
