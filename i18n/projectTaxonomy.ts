/**
 * Project taxonomy (chips/badges) translation layer.
 *
 * Design choice:
 * - Keep internal data (content/projects.ts) in English.
 * - Translate at render time based on `locale`.
 * - "FR technique/IT": we translate to French wording where it improves readability,
 *   but we keep widely used IT terms and product names as-is (Ticketing, Scripting, Runbooks, CI/CD, etc.).
 */

export type SupportedLocale = "en" | "fr";
export type TaxonomyKind = "category" | "tag" | "badge";

/**
 * Normalize a potentially unsafe locale value to a supported one.
 *
 * Why: Some client components derive the locale from the pathname and cast it
 * for TypeScript. At runtime that value can be undefined or something other than
 * "en"/"fr" (during hydration, unexpected routes, etc.).
 */
function normalizeLocale(value: unknown): SupportedLocale {
  return value === "fr" ? "fr" : "en";
}

const CATEGORY_LABELS: Record<SupportedLocale, Record<string, string>> = {
  en: {
  "All": "All",
  "Automation": "Automation",
  "Back-end": "Back-end",
  "Backup": "Backup",
  "Delivery": "Delivery",
  "Deployment": "Deployment",
  "DevOps": "DevOps",
  "Endpoint": "Endpoint",
  "Front-end": "Front-end",
  "Hardware": "Hardware",
  "Identity": "Identity",
  "IT Ops": "IT Ops",
  "IT Support": "IT Support",
  "Java": "Java",
  "Maintenance": "Maintenance",
  "Migration": "Migration",
  "Network": "Network",
  "Operations": "Operations",
  "Performance": "Performance",
  "Salesforce": "Salesforce",
  "Security": "Security",
  "Software": "Software",
  "Solution": "Solution",
  "Support": "Support",
  "Systems": "Systems",
  "Testing": "Testing",
  "Virtualization": "Virtualization",
  "Web": "Web"
},
  fr: {
  "All": "Tous",
  "Automation": "Automatisation",
  "Back-end": "Back-end",
  "Backup": "Sauvegarde",
  "Delivery": "Livraison",
  "Deployment": "Déploiement",
  "DevOps": "DevOps",
  "Endpoint": "Endpoint",
  "Front-end": "Front-end",
  "Hardware": "Matériel",
  "Identity": "Identité",
  "IT Ops": "IT Ops",
  "IT Support": "Support IT",
  "Java": "Java",
  "Maintenance": "Maintenance",
  "Migration": "Migration",
  "Network": "Réseau",
  "Operations": "Opérations",
  "Performance": "Performance",
  "Salesforce": "Salesforce",
  "Security": "Sécurité",
  "Software": "Logiciel",
  "Solution": "Solution",
  "Support": "Support",
  "Systems": "Systèmes",
  "Testing": "Tests",
  "Virtualization": "Virtualisation",
  "Web": "Web"
},
};

const TAG_LABELS: Record<SupportedLocale, Record<string, string>> = {
  en: {
  "Acronis": "Acronis",
  "AD DS": "AD DS",
  "AOMEI": "AOMEI",
  "Apex": "Apex",
  "Audit": "Audit",
  "Automation": "Automation",
  "Autopilot": "Autopilot",
  "Backup": "Backup",
  "Batch": "Batch",
  "Blancco": "Blancco",
  "CI": "CI",
  "CI/CD": "CI/CD",
  "CSS": "CSS",
  "Data Model": "Data Model",
  "Debugging": "Debugging",
  "Deployment": "Deployment",
  "DHCP": "DHCP",
  "Email": "Email",
  "Enhancements": "Enhancements",
  "Excel": "Excel",
  "Firewall": "Firewall",
  "GitHub Actions": "GitHub Actions",
  "Heroku": "Heroku",
  "HTML": "HTML",
  "Integration Tests": "Integration Tests",
  "Intune": "Intune",
  "JavaScript": "JavaScript",
  "JUnit": "JUnit",
  "Kanban": "Kanban",
  "Lightning": "Lightning",
  "Monitoring": "Monitoring",
  "Optimization": "Optimization",
  "Outlook": "Outlook",
  "pfSense": "pfSense",
  "Platform Events": "Platform Events",
  "Postman": "Postman",
  "Procurement": "Procurement",
  "Quality": "Quality",
  "RAM": "RAM",
  "Refactoring": "Refactoring",
  "REST": "REST",
  "RMM": "RMM",
  "Roaming Profiles": "Roaming Profiles",
  "Routing": "Routing",
  "Runbooks": "Runbooks",
  "Salesforce CLI": "Salesforce CLI",
  "Scripting": "Scripting",
  "Scrum": "Scrum",
  "Security": "Security",
  "Sizing": "Sizing",
  "Squid": "Squid",
  "SSD": "SSD",
  "Sysprep": "Sysprep",
  "Testing": "Testing",
  "Ticketing": "Ticketing",
  "User Support": "User Support",
  "Visualforce": "Visualforce",
  "VMware": "VMware",
  "Windows": "Windows",
  "Windows Server": "Windows Server",
  "Wi‑Fi": "Wi‑Fi"
},
  fr: {
  "Acronis": "Acronis",
  "AD DS": "AD DS",
  "AOMEI": "AOMEI",
  "Apex": "Apex",
  "Audit": "Audit",
  "Automation": "Automatisation",
  "Autopilot": "Autopilot",
  "Backup": "Sauvegarde",
  "Batch": "Batch",
  "Blancco": "Blancco",
  "CI": "CI",
  "CI/CD": "CI/CD",
  "CSS": "CSS",
  "Data Model": "Modèle de données",
  "Debugging": "Débogage",
  "Deployment": "Déploiement",
  "DHCP": "DHCP",
  "Email": "Messagerie",
  "Enhancements": "Améliorations",
  "Excel": "Excel",
  "Firewall": "Pare-feu",
  "GitHub Actions": "GitHub Actions",
  "Heroku": "Heroku",
  "HTML": "HTML",
  "Integration Tests": "Tests d’intégration",
  "Intune": "Intune",
  "JavaScript": "JavaScript",
  "JUnit": "JUnit",
  "Kanban": "Kanban",
  "Lightning": "Lightning",
  "Monitoring": "Supervision",
  "Optimization": "Optimisation",
  "Outlook": "Outlook",
  "pfSense": "pfSense",
  "Platform Events": "Platform Events",
  "Postman": "Postman",
  "Procurement": "Achats IT",
  "Quality": "Qualité",
  "RAM": "RAM",
  "Refactoring": "Refactoring",
  "REST": "REST",
  "RMM": "RMM",
  "Roaming Profiles": "Profils itinérants",
  "Routing": "Routage",
  "Runbooks": "Runbooks",
  "Salesforce CLI": "Salesforce CLI",
  "Scripting": "Scripting",
  "Scrum": "Scrum",
  "Security": "Sécurité",
  "Sizing": "Dimensionnement",
  "Squid": "Squid",
  "SSD": "SSD",
  "Sysprep": "Sysprep",
  "Testing": "Tests",
  "Ticketing": "Ticketing",
  "User Support": "Support utilisateur",
  "Visualforce": "Visualforce",
  "VMware": "VMware",
  "Windows": "Windows",
  "Windows Server": "Windows Server",
  "Wi‑Fi": "Wi‑Fi"
},
};

const BADGE_LABELS: Record<SupportedLocale, Record<string, string>> = {
  en: {
  "CLIENT CONTEXT": "CLIENT CONTEXT",
  "FIELD PRACTICE": "FIELD PRACTICE",
  "PERSONAL PROJECT": "PERSONAL PROJECT",
  "TRAINING LAB": "TRAINING LAB",
  "TRAINING PROJECT": "Case study"
},
  fr: {
  "CLIENT CONTEXT": "Contexte client",
  "FIELD PRACTICE": "Pratique terrain",
  "PERSONAL PROJECT": "Projet personnel",
  "TRAINING LAB": "Lab de formation",
  "TRAINING PROJECT": "Étude de cas"
},
};

/**
 * Translate a category/tag/badge label.
 * - If a label is unknown, returns the original label (safe fallback).
 */
export function translateTaxonomyLabel(
  label: string,
  locale: SupportedLocale,
  kind: TaxonomyKind
): string {
  // Runtime safety:
  // Some client components derive the locale from the pathname and cast it.
  // During hydration or on unexpected routes, the runtime value can be
  // undefined or not one of the SupportedLocale union values.
  const safeLocale: SupportedLocale = locale === "fr" ? "fr" : "en";

  const dict =
    kind === "category"
      ? CATEGORY_LABELS[safeLocale]
      : kind === "tag"
        ? TAG_LABELS[safeLocale]
        : BADGE_LABELS[safeLocale];

  // Another safety net: if a dictionary is missing for any reason, fall back
  // gracefully to the original label.
  return (dict?.[label] ?? label) as string;
}

export function tCategory(label: string, locale: SupportedLocale): string {
  return translateTaxonomyLabel(label, locale, "category");
}
export function tTag(label: string, locale: SupportedLocale): string {
  return translateTaxonomyLabel(label, locale, "tag");
}
export function tBadge(label: string, locale: SupportedLocale): string {
  return translateTaxonomyLabel(label, locale, "badge");
}
