// content/project-details/avenir-telecom-lightning-app.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "avenir-telecom-lightning-app",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/avenir-telecom-lightning-app/cover.webp"
    },
    {
      "alt": "Screenshot 1",
      "src": "/projects/avenir-telecom-lightning-app/screenshot-1.webp"
    },
    {
      "alt": "Screenshot 2",
      "src": "/projects/avenir-telecom-lightning-app/screenshot-2.webp"
    },
    {
      "alt": "Screenshot 3",
      "src": "/projects/avenir-telecom-lightning-app/screenshot-3.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "Lightning app delivery & backlog (Avenir Télécom)",
      "heroSubtitle": "Implementation strategy for a field-facing Salesforce Lightning app delivered by a 3-person team: a 20-story costed product backlog, a test plan + Apex reference standard, then a 3-month pilot (simulated by the scenario) → Kanban evolutions backlog loop."
    },
    "fr": {
      "title": "Livraison d'application Lightning & backlog Agile (Avenir Télécom)",
      "heroSubtitle": "Stratégie d'implémentation d'une app Salesforce Lightning terrain pour une équipe de 3 développeurs : backlog produit de 20 user stories chiffrées, cahier de tests + référentiel Apex, puis boucle pilote de 3 mois (simulée par le scénario) → backlog d'évolutions Kanban."
    },
    "es": {
      "title": "Entrega de app Lightning y backlog (Avenir Télécom)",
      "heroSubtitle": "Estrategia de implementación de una app Salesforce Lightning de campo entregada por un equipo de 3 personas: backlog de producto de 20 user stories estimadas, cuaderno de pruebas + catálogo Apex, y luego una vuelta de piloto de 3 meses (simulado por el escenario) → backlog Kanban de evoluciones."
    }
  }
};

export default details;
