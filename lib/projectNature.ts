// lib/projectNature.ts
// ---------------------
// Nature and period of each project, shown in a banner on project pages and
// on cards, so real work, training and reconstructions are clearly told
// apart. Each project declares its nature in content/projects.ts; this module
// provides the label, period and explanatory note in the three languages.
//
// A period is only shown when known and verifiable (training and internship
// dates published on /certifications and /about). No date is invented: a
// project without a known period only shows its nature.

export type ProjectNature =
  | "rncp_capstone"   // RNCP 6 capstone project (Legarant-AXG only)
  | "rncp"            // other RNCP 6 projects (OpenClassrooms, work-study)
  | "openclassrooms"  // other OpenClassrooms training projects
  | "greta_tai"       // TAI programme exercises (Greta du Val d'Oise)
  | "greta_tssr"      // TSSR programme exercises (Greta du Val d'Oise)
  | "internship"      // MIDRANGE GROUP internships
  | "personal"        // personal project
  | "reconstructed";  // reconstructed case study (fictional scenario)

type Locale = "fr" | "en" | "es";
type Localized = Record<Locale, string>;

/** Project-specific localised period (overrides the nature's default). */
export type ProjectPeriod = Localized;

type NatureInfo = {
  /** Long label shown in the banner. */
  label: Localized;
  /** Default period of the nature (training, internship), when known. */
  period?: Localized;
  /** Sentence explaining the project's setting. */
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
 * Label, period and note of a project for a locale. The project's own period
 * (content/projects.ts) wins over the nature's; with neither, `period` is
 * null (nothing is invented).
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
