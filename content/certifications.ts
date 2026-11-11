// Certifications & Diplomas Data
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  badgeUrl: string;
  credentialUrl?: string;
  earnedDate: string;
  expirationDate?: string;
  description: string;
  skills: string[];
}

export const certifications: Certification[] = [
  {
    id: 'dev-concepteur-logiciel-openclassrooms',
    name: 'Développeur Concepteur Logiciel',
    issuer: 'OpenClassrooms',
    badgeUrl: '/certifications/dev-concepteur-badge.png',
    earnedDate: 'Oct 2025',
    description: 'RNCP Level 6 professional title (Bac+3/4 equivalent) in software design and development. Salesforce specialization: Apex, Flows, data modeling, CI/CD with Salesforce CLI and GitHub Actions, LWC, security, and permission sets.',
    skills: ['Apex', 'Salesforce Flows', 'LWC', 'Data Modeling', 'CI/CD', 'GitHub Actions', 'Salesforce CLI', 'API Integration', 'Security & Permissions', 'Automated Testing']
  },
  {
    id: 'tssr-greta-valdoise',
    name: 'Higher Technician in Systems & Networks',
    issuer: 'GRETA du Val d\'Oise',
    badgeUrl: '/certifications/systems-networks-badge.png',
    earnedDate: 'Jun 2023',
    description: 'RNCP Level 5 (Bac+2) in systems and network administration. Two one-month internships at MIDRANGE Group: deployment of 264 workstations (64 re-imaged with Sysprep, 200 via Windows Autopilot), VMware Workstation 17, Windows Server 2022, AD DS, DNS, DHCP, WDS, GPO, PXE, PfSense/Squid, Acronis Cyber Protect Cloud, Datto RMM.',
    skills: ['Windows Server 2022', 'Active Directory', 'DNS', 'DHCP', 'WDS', 'GPO', 'PXE Deployment', 'VMware Workstation 17', 'PfSense', 'Squid Proxy', 'Acronis Cyber Protect', 'Datto RMM', 'Windows Autopilot', 'Sysprep', 'Blancco Secure Erase', 'Splashtop', 'Autotask', 'Webroot']
  },
  {
    id: 'tai-greta-valdoise',
    name: 'IT Support Technician',
    issuer: 'GRETA du Val d\'Oise — Lycée Louis Jouvet',
    badgeUrl: '/certifications/tai-badge.png',
    earnedDate: 'Jul 2022',
    description: 'RNCP Level 4 (Bac) in IT support and user assistance. Training at Lycée Louis Jouvet (Taverny). Covers Windows 10 installation, VirtualBox virtualization (training 2022), TP-Link network configuration, Active Directory roaming profiles, and hardware/software support.',
    skills: ['Windows 10', 'VirtualBox (formation 2022)', 'Active Directory', 'Roaming Profiles', 'WiFi Configuration', 'AOMEI Partition Assistant', 'Hardware Diagnosis', 'User Support', 'Messaging Configuration']
  },
  {
    id: 'linguaskill-cambridge',
    name: 'Linguaskill Business — C1+',
    issuer: 'Cambridge Assessment English',
    badgeUrl: '/certifications/linguaskill-badge.png',
    credentialUrl: 'https://results.linguaskill.com',
    earnedDate: 'Apr 2021',
    description: 'Cambridge Business English certification. Score: 180+ (C1+) in listening comprehension, 179 (B2) in reading comprehension. Issued via Astrolabe Formation PFD.',
    skills: ['Business English', 'Listening Comprehension', 'Reading Comprehension', 'Professional Communication']
  }
];

// Booked exam sessions (Salesforce test center, Europe/Paris). Update after
// each result: move the certification to `certifications` once earned.
// `iso` drives the label: once the day is over, /certifications shows
// "exam taken, result pending" instead of a date in the past, and
// __tests__/scheduled-exams.test.ts fails a week later as a reminder to
// record the result (FAQ, About page, this file).
export const SCHEDULED_EXAMS = {
  platformFoundations:   { iso: "2026-12-29", fr: "29 déc. 2026", en: "Dec 29, 2026", es: "29 dic. 2026" },
  platformAdministrator: { iso: "2026-12-30", fr: "30 déc. 2026", en: "Dec 30, 2026", es: "30 dic. 2026" },
} as const;

export type ScheduledExam = (typeof SCHEDULED_EXAMS)[keyof typeof SCHEDULED_EXAMS];

/** True once the exam day is over in Paris time (the exam centre's zone). */
export function isExamPast(exam: ScheduledExam, now: Date = new Date()): boolean {
  // Day after the exam, 00:00 Europe/Paris. CET (UTC+1) applies in December;
  // a fixed offset is enough for winter dates and avoids a timezone library.
  const dayAfter = new Date(`${exam.iso}T00:00:00+01:00`);
  dayAfter.setUTCDate(dayAfter.getUTCDate() + 1);
  return now.getTime() >= dayAfter.getTime();
}

/** "Examen le 29 déc. 2026", or "Examen passé le …, résultat à venir" afterwards. */
export function examTargetLabel(exam: ScheduledExam, locale: string, now: Date = new Date()): string {
  const past = isExamPast(exam, now);
  if (locale === "fr") return past ? `Examen passé le ${exam.fr} — résultat à venir` : `Examen le ${exam.fr}`;
  if (locale === "es") return past ? `Examen realizado el ${exam.es} — resultado pendiente` : `Examen el ${exam.es}`;
  return past ? `Exam taken on ${exam.en} — result pending` : `Exam on ${exam.en}`;
}

export const upcomingCertifications: string[] = [
  'Salesforce Platform Foundations — examen le 29 déc. 2026',
  'Salesforce Platform Administrator — examen le 30 déc. 2026',
  'Salesforce Platform App Builder — 2027',
  'Salesforce Platform Developer (ex-Platform Developer I) — 2027',
  'CompTIA Security+ (SY0-701) — 2027',
];

export const trailheadProfile = {
  rank: "Expeditioner",
  badges: 94,
  points: 59775,
  trails: 14,
  superbadges: 0,
  // Final URL: trailblazer.me/id/… is a retired domain that redirects (302) here.
  profileUrl: 'https://www.salesforce.com/trailblazer/aidahoumane',
  nextRank: {
    name: "Ranger",
    badgesNeeded: 6,
  },
};
