import type { AccordionItem } from "@/components/Accordion";

export type Locale = "en" | "fr";

export function getExperienceItems(locale: Locale): AccordionItem[] {
  if (locale === "fr") {
    return [
      {
        id: "exp-ld-cdi",
        logoSrc: "/companies/ld-digitales.webp",
        logoAlt: "LD Digitales",
        title: "Développeuse Salesforce (CDI) — LD Digitales",
        subtitle: "Remote · Contexte international",
        rightMeta: "Oct. 2025 — Aujourd’hui",
        content: (
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Conception et mise en œuvre de solutions Salesforce avancées en collaboration
              avec les équipes métier.
            </li>
            <li>
              Optimisation et refactoring du code Apex existant pour améliorer la qualité, la
              performance et la maintenabilité.
            </li>
            <li>
              Supervision des bonnes pratiques de développement : CI/CD, revues de code et
              gestion des performances.
            </li>
            <li>
              Accompagnement et formation des collègues et apprenants sur les outils et
              méthodes Salesforce.
            </li>
            <li>
              Coordination avec les équipes produit et marketing pour aligner les solutions
              techniques sur les besoins métier.
            </li>
          </ul>
        )
      },
      {
        id: "exp-ld-alt",
        logoSrc: "/companies/ld-digitales.webp",
        logoAlt: "LD Digitales",
        title: "Développeuse Salesforce (alternance) — LD Digitales",
        subtitle: "Remote · Contexte international",
        rightMeta: "Oct. 2023 — Sept. 2025",
        content: (
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Développement et maintenance de 10+ classes Apex et batchs pour automatiser
              le traitement de données et le reporting.
            </li>
            <li>
              Création de 20+ Flows pour orchestrer les processus métier, réduisant la charge
              manuelle d’environ 30%.
            </li>
            <li>
              Conception de composants réutilisables via Lightning App Builder et Lightning
              Web Components.
            </li>
            <li>
              Mise en place de pratiques CI/CD avec Salesforce CLI et Git, rationalisant les
              déploiements entre sandboxes.
            </li>
            <li>
              Support migrations de données (CSV / assistants d’import), avec contrôle qualité
              et intégrité des données.
            </li>
          </ul>
        )
      },
      {
        id: "exp-midrange",
        logoSrc: "/companies/midrange.webp",
        logoAlt: "Midrange Group",
        title: "Administratrice systèmes & réseaux junior (stage) — Midrange Group",
        subtitle: "France · Présentiel",
        rightMeta: "Fév. 2023 — Mai 2023",
        content: (
          <ul className="list-disc pl-5 space-y-2">
            <li>Support technique pour 50+ postes de travail et portables sur plusieurs sites.</li>
            <li>
              Installation et maintenance de logiciels (Blancco, Acronis, Datto RMM).
            </li>
            <li>
              Supervision de l’infrastructure réseau et réponse à des incidents de sécurité,
              dont des exercices de type ransomware.
            </li>
            <li>
              Rédaction de procédures et contribution à une base de connaissances sur les
              incidents récurrents.
            </li>
          </ul>
        )
      }
    ];
  }

  // EN
  return [
    {
      id: "exp-ld-ft",
      logoSrc: "/companies/ld-digitales.webp",
      logoAlt: "LD Digitales",
      title: "Salesforce Developer (Full-time) — LD Digitales",
      subtitle: "Remote · International context",
      rightMeta: "Oct 2025 — Present",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Designed and delivered advanced Salesforce solutions in close collaboration with
            business stakeholders.
          </li>
          <li>
            Refactored existing Apex codebases to improve quality, performance and
            maintainability.
          </li>
          <li>
            Enforced engineering best practices: CI/CD, code reviews, and performance
            monitoring.
          </li>
          <li>Coached teammates and learners on Salesforce tooling and methods.</li>
          <li>
            Coordinated with Product and Marketing to align technical delivery with business
            goals.
          </li>
        </ul>
      )
    },
    {
      id: "exp-ld-apprenticeship",
      logoSrc: "/companies/ld-digitales.webp",
      logoAlt: "LD Digitales",
      title: "Salesforce Developer (Apprenticeship) — LD Digitales",
      subtitle: "Remote · International context",
      rightMeta: "Oct 2023 — Sep 2025",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Built and maintained 10+ Apex classes and batch jobs to automate data processing
            and reporting.
          </li>
          <li>
            Created 20+ Flows to orchestrate business processes, reducing manual workload by
            ~30%.
          </li>
          <li>
            Delivered reusable UI components with Lightning App Builder and Lightning Web
            Components.
          </li>
          <li>
            Implemented CI/CD practices with Salesforce CLI and Git to streamline deployments
            across sandboxes.
          </li>
          <li>
            Supported data migrations (CSV/import tools) with strong focus on quality and
            integrity.
          </li>
        </ul>
      )
    },
    {
      id: "exp-midrange-intern",
      logoSrc: "/companies/midrange.webp",
      logoAlt: "Midrange Group",
      title: "Junior Systems & Network Administrator (Intern) — Midrange Group",
      subtitle: "France · On-site",
      rightMeta: "Feb 2023 — May 2023",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Provided support for 50+ workstations/laptops across multiple sites.</li>
          <li>Installed and maintained software using tools like Blancco, Acronis and Datto RMM.</li>
          <li>
            Monitored network infrastructure and responded to security incidents, including
            ransomware drills.
          </li>
          <li>Wrote procedures and contributed to a knowledge base for recurring incidents.</li>
        </ul>
      )
    }
  ];
}

export function getCertificationItems(locale: Locale): AccordionItem[] {
  if (locale === "fr") {
    return [
      {
        id: "cert-obtained",
        title: "Obtenu",
        subtitle: "Diplômes et certificats",
        rightMeta: "—",
        content: (
          <ul className="list-disc pl-5 space-y-2">
            <li>Diplôme Salesforce Developer — OpenClassrooms (Oct. 2023 – Oct. 2025)</li>
            <li>Titre pro Technicien(ne) Supérieur(e) Systèmes & Réseaux — GRETA du Val d’Oise (Oct. 2022 – Juin 2023)</li>
            <li>Certificat Linguaskill C2 — Cambridge University</li>
          </ul>
        )
      },
      {
        id: "cert-active",
        title: "Actif",
        subtitle: "Progression continue",
        rightMeta: "—",
        content: (
          <ul className="list-disc pl-5 space-y-2">
            <li>Trailhead Ranger — Salesforce Trailhead</li>
          </ul>
        )
      },
      {
        id: "cert-planned",
        title: "Prévu",
        subtitle: "Objectifs d’ici le 31 mars 2026",
        rightMeta: "2026",
        content: (
          <ul className="list-disc pl-5 space-y-2">
            <li>Salesforce Administrator</li>
            <li>Salesforce App Builder</li>
            <li>Salesforce Platform Developer I</li>
            <li>ISC2 CC (Certified in Cybersecurity)</li>
          </ul>
        )
      }
    ];
  }

  return [
    {
      id: "cert-obtained-en",
      title: "Completed",
      subtitle: "Degrees & certificates",
      rightMeta: "—",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Salesforce Developer Diploma — OpenClassrooms (Oct 2023 – Oct 2025)</li>
          <li>Higher Technician in Systems & Networks — GRETA du Val d’Oise (Oct 2022 – Jun 2023)</li>
          <li>Linguaskill C2 Certificate — University of Cambridge</li>
        </ul>
      )
    },
    {
      id: "cert-active-en",
      title: "Active",
      subtitle: "Continuous learning",
      rightMeta: "—",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Trailhead Ranger — Salesforce Trailhead</li>
        </ul>
      )
    },
    {
      id: "cert-planned-en",
      title: "Planned",
      subtitle: "Targets by March 31, 2026",
      rightMeta: "2026",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Salesforce Administrator</li>
          <li>Salesforce App Builder</li>
          <li>Salesforce Platform Developer I</li>
          <li>ISC2 CC (Certified in Cybersecurity)</li>
        </ul>
      )
    }
  ];
}
