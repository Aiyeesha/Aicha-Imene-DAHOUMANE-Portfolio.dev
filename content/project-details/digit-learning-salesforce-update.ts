// content/project-details/digit-learning-salesforce-update.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "digit-learning-salesforce-update",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/digit-learning-salesforce-update/cover.webp"
    },
    {
      "alt": "Screenshot 1",
      "src": "/projects/digit-learning-salesforce-update/screenshot-1.webp"
    },
    {
      "alt": "Screenshot 2",
      "src": "/projects/digit-learning-salesforce-update/screenshot-2.webp"
    },
    {
      "alt": "Screenshot 3",
      "src": "/projects/digit-learning-salesforce-update/screenshot-3.webp"
    },
    {
      "alt": "Screenshot 4",
      "src": "/projects/digit-learning-salesforce-update/screenshot-4.webp"
    },
    {
      "alt": "Data model — Mentor, Étudiants, Formations, Formations achetées",
      "src": "/projects/digit-learning-salesforce-update/screenshot-data-model.png"
    },
    {
      "alt": "Dashboard — prospect-to-client conversion reports",
      "src": "/projects/digit-learning-salesforce-update/screenshot-dashboard.png"
    }
  ],
  "locales": {
    "en": {
      "title": "Salesforce application update (Digit Learning)",
      "heroSubtitle": "Quality audit of a 2-year-old Salesforce org, then modernization: a junction object to lift the \"one student = one training\" limit, automated enrollment and mentor assignment, 3 management reports, data migration — with a quantified impact analysis."
    },
    "fr": {
      "title": "Mise à jour de l'application Salesforce (Digit Learning)",
      "heroSubtitle": "Audit qualité d'une org Salesforce de 2 ans puis modernisation : objet de jonction pour lever la limite « un étudiant = une formation », automatisation de l'inscription et de l'affectation des mentors, 3 rapports de pilotage, migration des données — avec analyse d'impact chiffrée."
    },
    "es": {
      "title": "Actualización de la aplicación Salesforce (Digit Learning)",
      "heroSubtitle": "Auditoría de calidad de una org Salesforce de 2 años y luego modernización: un objeto de unión para eliminar el límite «un estudiante = una formación», automatización de la inscripción y la asignación de mentores, 3 informes de seguimiento, migración de datos — con un análisis de impacto cuantificado."
    }
  }
};

export default details;
