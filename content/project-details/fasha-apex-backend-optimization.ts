// content/project-details/fasha-apex-backend-optimization.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "fasha-apex-backend-optimization",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/fasha-apex-backend-optimization/cover.webp"
    },
    {
      "alt": "Screenshot 1",
      "src": "/projects/fasha-apex-backend-optimization/screenshot-1.webp"
    },
    {
      "alt": "Screenshot 2",
      "src": "/projects/fasha-apex-backend-optimization/screenshot-2.webp"
    },
    {
      "alt": "Screenshot 3",
      "src": "/projects/fasha-apex-backend-optimization/screenshot-3.webp"
    },
    {
      "alt": "Screenshot 4",
      "src": "/projects/fasha-apex-backend-optimization/screenshot-4.webp"
    },
    {
      "alt": "Screenshot 5",
      "src": "/projects/fasha-apex-backend-optimization/screenshot-5.webp"
    },
    {
      "alt": "Screenshot 6",
      "src": "/projects/fasha-apex-backend-optimization/screenshot-6.webp"
    },
    {
      "alt": "Screenshot 7",
      "src": "/projects/fasha-apex-backend-optimization/screenshot-7.webp"
    },
    {
      "alt": "Screenshot 8",
      "src": "/projects/fasha-apex-backend-optimization/screenshot-8.webp"
    },
    {
      "alt": "Screenshot 9",
      "src": "/projects/fasha-apex-backend-optimization/screenshot-9.webp"
    },
    {
      "alt": "Screenshot 10",
      "src": "/projects/fasha-apex-backend-optimization/screenshot-10.webp"
    },
    {
      "alt": "Screenshot 11",
      "src": "/projects/fasha-apex-backend-optimization/screenshot-11.webp"
    },
    {
      "alt": "Screenshot 12",
      "src": "/projects/fasha-apex-backend-optimization/screenshot-12.webp"
    },
    {
      "alt": "Screenshot 13",
      "src": "/projects/fasha-apex-backend-optimization/screenshot-13.webp"
    },
    {
      "alt": "Screenshot 14",
      "src": "/projects/fasha-apex-backend-optimization/screenshot-14.webp"
    },
    {
      "alt": "Screenshot 15",
      "src": "/projects/fasha-apex-backend-optimization/screenshot-15.webp"
    },
    {
      "alt": "Screenshot 16",
      "src": "/projects/fasha-apex-backend-optimization/screenshot-16.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "Apex backend optimization (FASHA)",
      "heroSubtitle": "Taking over FASHA's Apex backend (training scenario): two bugs diagnosed down to root cause (a trigger that breaks at 100 orders, a calculation that silently fails on bulk import), a full refactor into a bulk-safe handler pattern, the weekly batch moved to async, >85% coverage."
    },
    "fr": {
      "title": "Optimisation du backend Apex (FASHA)",
      "heroSubtitle": "Reprise du backend Apex de FASHA (scénario de formation) : deux bugs diagnostiqués jusqu'à leur cause racine (trigger qui casse à 100 commandes, calcul silencieusement faux à l'import en masse), refactoring complet en pattern handler bulk-safe, batch hebdomadaire passé en asynchrone, couverture > 85 %."
    },
    "es": {
      "title": "Optimización de un backend Apex (FASHA)",
      "heroSubtitle": "Hacerse cargo del backend Apex de FASHA (escenario de formación): dos errores diagnosticados hasta su causa raíz (un trigger que se rompe con 100 pedidos, un cálculo que falla en silencio en la importación masiva), refactorización completa a un patrón handler bulk-safe, el batch semanal pasado a asíncrono, cobertura >85%."
    }
  }
};

export default details;
