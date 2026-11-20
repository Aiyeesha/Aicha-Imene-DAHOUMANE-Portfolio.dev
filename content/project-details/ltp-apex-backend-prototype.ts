// content/project-details/ltp-apex-backend-prototype.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "ltp-apex-backend-prototype",
  "gallery": [
    {
      "alt": "LTP Apex Backend - Vue 2",
      "src": "/projects/ltp-apex-backend-prototype/screenshot-10.webp"
    },
    {
      "alt": "LTP Apex Backend - Vue 3",
      "src": "/projects/ltp-apex-backend-prototype/screenshot-11.webp"
    },
    {
      "alt": "LTP Apex Backend - Vue 4",
      "src": "/projects/ltp-apex-backend-prototype/screenshot-12.webp"
    },
    {
      "alt": "LTP Apex Backend - Vue 5",
      "src": "/projects/ltp-apex-backend-prototype/screenshot-13.webp"
    },
    {
      "alt": "LTP Apex Backend - Vue 6",
      "src": "/projects/ltp-apex-backend-prototype/screenshot-14.webp"
    },
    {
      "alt": "LTP Apex Backend - Vue 7",
      "src": "/projects/ltp-apex-backend-prototype/screenshot-15.webp"
    },
    {
      "alt": "LTP Apex Backend - Vue 8",
      "src": "/projects/ltp-apex-backend-prototype/screenshot-16.webp"
    },
    {
      "alt": "LTP Apex Backend - Vue 9",
      "src": "/projects/ltp-apex-backend-prototype/screenshot-17.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "Delivery tracking CRM design (LTP)",
      "heroSubtitle": "Complete architecture of a multi-carrier Salesforce delivery-tracking backend for a bridal couture house: UML data model, zone-based security model, 2.1M-account import strategy, real-time + batch integration — designed before the first line of code."
    },
    "fr": {
      "title": "Conception CRM de suivi de livraison (LTP)",
      "heroSubtitle": "Architecture complète d'un backend Salesforce de suivi de livraison multi-transporteurs pour une maison de couture nuptiale : modèle de données UML, modèle de sécurité par zone, stratégie d'import 2,1 M de comptes, intégration temps réel + batch — conçue avant la première ligne de code."
    },
    "es": {
      "title": "Diseño de CRM de seguimiento de entregas (LTP)",
      "heroSubtitle": "Arquitectura completa de un backend Salesforce de seguimiento de entregas multi-transportista para una casa de alta costura nupcial: modelo de datos UML, modelo de seguridad por zona, estrategia de importación de 2,1 M de cuentas, integración en tiempo real + batch — diseñada antes de la primera línea de código."
    }
  }
};

export default details;
