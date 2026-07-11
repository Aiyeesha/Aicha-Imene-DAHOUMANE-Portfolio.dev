import type { GalleryImage } from "@/components/ImageGallery";

export type ProjectSection =
  | { type: "bullets"; title: string; items: string[] }
  | { type: "text"; title: string; paragraphs: string[] }
  | { type: "metrics"; title: string; items: { label: string; value: string; note?: string }[] }
  | { type: "timeline"; title: string; steps: { title: string; description: string }[] }
  | { type: "resources"; title: string; items: { label: string; href: string; note?: string }[] }
  | { type: "code"; title: string; language?: string; code: string; downloadUrl?: string };

export type ProjectDetails = {
  slug: string;
  locales?: {
    en?: { title?: string; heroSubtitle?: string; sections?: ProjectSection[] };
    fr?: { title?: string; heroSubtitle?: string; sections?: ProjectSection[] };
    es?: { title?: string; heroSubtitle?: string; sections?: ProjectSection[] };
  };
  gallery?: GalleryImage[];
};

/**
 * Per-project content (sections + gallery).
 * Screenshots live under /public/projects/<slug>/.
 */
export const projectDetails: ProjectDetails[] = [
  {
    slug: "legarant-axg-salesforce-deployment",
    gallery: [
        { src: "/projects/legarant-axg-salesforce-deployment/cover.webp", alt: "Legarant-AXG — cover" },
        { src: "/projects/legarant-axg-salesforce-deployment/screenshot-1.webp", alt: "Legarant-AXG — screenshot 1" },
        { src: "/projects/legarant-axg-salesforce-deployment/screenshot-2.webp", alt: "Legarant-AXG — screenshot 2" },
        { src: "/projects/legarant-axg-salesforce-deployment/screenshot-3.webp", alt: "Legarant-AXG — screenshot 3" },
        { src: "/projects/legarant-axg-salesforce-deployment/screenshot-4.webp", alt: "Legarant-AXG — screenshot 4" },
        { src: "/projects/legarant-axg-salesforce-deployment/screenshot-5.webp", alt: "Legarant-AXG — screenshot 5" },
        { src: "/projects/legarant-axg-salesforce-deployment/screenshot-6.webp", alt: "Legarant-AXG — screenshot 6" },
        { src: "/projects/legarant-axg-salesforce-deployment/screenshot-7.webp", alt: "Legarant-AXG — screenshot 7" },
        { src: "/projects/legarant-axg-salesforce-deployment/screenshot-8.webp", alt: "Legarant-AXG — screenshot 8" },
        { src: "/projects/legarant-axg-salesforce-deployment/screenshot-9.webp", alt: "Legarant-AXG — screenshot 9" },
    ],
    locales: {
      en: {
        heroSubtitle:
          "Integrate AXG into Legarant’s Salesforce and deliver a mobile-ready integration layer (REST + Heroku).",
        sections: [
          {
            type: "text",
            title: "Context",
            paragraphs: [
              "Legarant (life insurance) acquired AXG to expand into Germany. The goal was to keep Legarant’s Salesforce org as the single CRM and ingest key AXG data.",
              "The integration was one-way (AXG → Salesforce), with a mobile app planned. We also needed an outbound REST call to query Salesforce customers from the integration layer."
            ]
          },
          {
            type: "bullets",
            title: "What I delivered",
            items: [
              "Postman collection covering the required REST calls (standard API + custom endpoints where needed).",
              "Custom Apex REST controllers to implement business rules not covered by the standard Contact API (create-or-return, soft-delete via DELETE).",
              "A Heroku app connected to Salesforce (mobile-ready), with data replication and documented configuration changes.",
              "A deployment package + runbook: components to deploy, manual steps, and validation checklist for test and production."
            ]
          },
          {
            type: "bullets",
            title: "REST endpoints covered",
            items: [
              "POST /services/oauth2/token — OAuth token (Password Flow / client credentials).",
              "POST /services/apexrest/v1/contacts — Create Contact (create-or-return per spec).",
              "GET /services/apexrest/v1/contacts/{idOrExt} — Retrieve Contact by Id or External Id.",
              "PATCH /services/apexrest/v1/contacts/{externalId} — Update Contact by External Id.",
              "PATCH /services/apexrest/v1/contacts/{id} — Deactivate Contact (soft-delete behavior).",
              "POST /services/apexrest/v1/accounts — Create Account.",
              "GET /services/apexrest/v1/accounts/{idOrExt} — Retrieve Account by Id or External Id.",
              "PATCH /services/apexrest/v1/accounts/{externalId} — Update Account by External Id.",
              "POST /services/apexrest/v1/contracts — Create Contract.",
              "GET /services/apexrest/v1/contracts/{idOrExt} — Retrieve Contract by Id or External Id.",
              "PATCH /services/apexrest/v1/contracts/{externalId} — Update Contract by External Id."
            ]
          },
          {
            type: "code",
            title: "Endpoint parameters (from Postman)",
            language: "text",
            code: `POST <instance_url>/services/apexrest/v1/contacts
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Body (JSON): fields LastName, city, Email
  Example:
    {
      "LastName": "axG -tests Contact Test",
      "city" : "Berlin",
      "Email": "test.Contact@example.com"
    }

GET <instance_url>/services/apexrest/v1/contacts/{{idOrExt}}
  Path params: idOrExt
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json

PATCH <instance_url>/services/apexrest/v1/contacts/{{lastContactExt}}
  Path params: lastContactExt
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Body (JSON): fields MobilePhone
  Example:
    {
      "MobilePhone": "+491111"
    }

PATCH <instance_url>/services/apexrest/v1/contacts/{{lastContactId}}
  Path params: lastContactId
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Body (JSON): fields Active
  Example:
    {
      "Active": "false"
    }

POST <instance_url>/services/apexrest/v1/accounts
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Body (JSON): fields Name, Phone
  Example:
    {
      "Name": "AXG GmbH",
      "Phone": "12345"
    }

GET <instance_url>/services/apexrest/v1/accounts/{{idOrExt}}
  Path params: idOrExt
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json

PATCH <instance_url>/services/apexrest/v1/accounts/{{lastAccountExt}}
  Path params: lastAccountExt
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Body (JSON): fields Website
  Example:
    {
      "Website": "https://axg.de"
    }

POST <instance_url>/services/apexrest/v1/contracts
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Body (JSON): fields AccountId, Status, StartDate, ContractTerm
  Example:
    {
      "AccountId": "<axgAccountId>",
      "Status": "Draft",
      "StartDate": "2025-01-01",
      "ContractTerm": 12
    }

GET <instance_url>/services/apexrest/v1/contracts/{{idOrExt}}
  Path params: idOrExt
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json

PATCH <instance_url>/services/apexrest/v1/contracts/{{lastContractExt}}
  Path params: lastContractExt
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Body (JSON): fields Description
  Example:
    {
      "Description": "Mis \u00e0 jour"
    }

GET <instance_url>/services/data/v59.0/limits
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json

POST <instance_url>/services/oauth2/token
  Body (x-www-form-urlencoded): grant_type, client_id, client_secret`
          },

          {
            type: "timeline",
            title: "Implementation workflow",
            steps: [
              {
                title: "Integration design",
                description:
                  "Clarified data direction (AXG → Salesforce), identified endpoints, and defined authentication (Connected App + OAuth username/password flow)."
              },
              {
                title: "API implementation & tests",
                description:
                  "Built and validated the API calls in Postman. Added custom REST Apex where the standard API could not meet the spec (Contact creation rules and DELETE behavior)."
              },
              {
                title: "Heroku layer for mobile",
                description:
                  "Provisioned the app on Heroku, connected it to Salesforce, and validated bi-directional sync (Heroku ↔ Salesforce) for the required objects."
              },
              {
                title: "Data consistency hardening",
                description:
                  "Implemented automatic population of the External ID used for synchronization (trigger-based) to guarantee uniqueness and avoid manual errors."
              },
              {
                title: "Release & documentation",
                description:
                  "Produced a deployment document (components + manual steps) and a changes log for the Heroku setup, then prepared the demo checklist for stakeholders."
              }
            ]
          },
          {
            type: "metrics",
            title: "Quality & guardrails",
            items: [
              { label: "API correctness", value: "Postman collection validated against specs" },
              { label: "Business rules coverage", value: "Custom REST Apex for create/DELETE requirements" },
              { label: "Sync reliability", value: "External ID auto-filled to ensure uniqueness" },
              { label: "Operational readiness", value: "Deployment runbook + validation checklist" }
            ]
          },
          {
            type: "resources",
            title: "Deliverables",
            items: [
              { label: "Postman collection (JSON)", href: "/docs/projects/legarant-axg-salesforce-deployment/postman-collection.json" },
              { label: "Heroku changes (PDF)", href: "/docs/projects/legarant-axg-salesforce-deployment/heroku-changes.pdf" },
              { label: "Deployment guide (PDF)", href: "/docs/projects/legarant-axg-salesforce-deployment/deployment.pdf" },
              { label: "Requirements / spec (PDF)", href: "/docs/projects/legarant-axg-salesforce-deployment/requirements.pdf" },
              { label: "Project brief (DOCX)", href: "/docs/projects/legarant-axg-salesforce-deployment/brief.docx" },
              { label: "Legacy Heroku guide (PDF)", href: "/docs/projects/legarant-axg-salesforce-deployment/legacy-heroku-guide.pdf" },
              { label: "Azure free tier thresholds (PDF)", href: "/docs/projects/legarant-axg-salesforce-deployment/azure-free-tier-thresholds.pdf" },
              { label: "Repository link (TXT)", href: "/docs/projects/legarant-axg-salesforce-deployment/repository-link.txt" },
              { label: "Staging link (TXT)", href: "/docs/projects/legarant-axg-salesforce-deployment/sandbox-link.txt" }
            ]
          },
          {
            type: "code",
            title: "Links (repo + staging)",
            language: "text",
            code: `Repository: https://github.com/Aiyeesha/Projet-12/tree/main\nStaging app: https://legarant-staging-78a7880351d1.herokuapp.com`,
          }
        ]
      },
      fr: {
        heroSubtitle:
          "Intégrer AXG dans Salesforce (Legarant) et livrer une couche d’intégration prête pour une app mobile (REST + Heroku).",
        sections: [
          {
            type: "text",
            title: "Contexte",
            paragraphs: [
              "LEGARANT (assurance vie) a racheté AXG pour s’implanter en Allemagne. L’objectif était de conserver l’org Salesforce de Legarant comme CRM principal et d’y intégrer les données clés d’AXG.",
              "L’intégration est unidirectionnelle (AXG → Salesforce). Une application mobile étant prévue, il fallait aussi une couche applicative (hébergeur type Heroku) connectée à Salesforce, et des appels REST pour requêter la base clients."
            ]
          },
          {
            type: "bullets",
            title: "Ce que j’ai livré",
            items: [
              "Une collection Postman couvrant les appels REST demandés (API standard + endpoints custom si nécessaire).",
              "Des contrôleurs REST Apex pour implémenter des règles métiers non couvertes par l’API standard Contact (création « si absent sinon renvoyer l’Id », suppression logique via DELETE).",
              "Une application déployée sur Heroku et connectée à Salesforce, avec réplication des données et documentation des changements de configuration.",
              "Un package de déploiement + runbook : liste des composants, actions manuelles, et checklist de validation (test puis production)."
            ]
          },
          {
            type: "bullets",
            title: "Endpoints REST couverts",
            items: [
              "POST /services/oauth2/token — Token OAuth (Password Flow / client credentials).",
              "POST /services/apexrest/v1/contacts — Création Contact (création ou renvoi selon la spécification).",
              "GET /services/apexrest/v1/contacts/{idOrExt} — Lecture Contact par Id ou External Id.",
              "PATCH /services/apexrest/v1/contacts/{externalId} — Mise à jour Contact par External Id.",
              "PATCH /services/apexrest/v1/contacts/{id} — Désactivation Contact (suppression logique).",
              "POST /services/apexrest/v1/accounts — Création Account.",
              "GET /services/apexrest/v1/accounts/{idOrExt} — Lecture Account par Id ou External Id.",
              "PATCH /services/apexrest/v1/accounts/{externalId} — Mise à jour Account par External Id.",
              "POST /services/apexrest/v1/contracts — Création Contract.",
              "GET /services/apexrest/v1/contracts/{idOrExt} — Lecture Contract par Id ou External Id.",
              "PATCH /services/apexrest/v1/contracts/{externalId} — Mise à jour Contract par External Id."
            ]
          },
          {
            type: "code",
            title: "Paramètres des endpoints (depuis Postman)",
            language: "text",
            code: `POST <instance_url>/services/apexrest/v1/contacts
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Corps (JSON): champs LastName, city, Email
  Example:
    {
      "LastName": "axG -tests Contact Test",
      "city" : "Berlin",
      "Email": "test.Contact@example.com"
    }

GET <instance_url>/services/apexrest/v1/contacts/{{idOrExt}}
  Paramètres d’URL: idOrExt
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json

PATCH <instance_url>/services/apexrest/v1/contacts/{{lastContactExt}}
  Paramètres d’URL: lastContactExt
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Corps (JSON): champs MobilePhone
  Example:
    {
      "MobilePhone": "+491111"
    }

PATCH <instance_url>/services/apexrest/v1/contacts/{{lastContactId}}
  Paramètres d’URL: lastContactId
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Corps (JSON): champs Active
  Example:
    {
      "Active": "false"
    }

POST <instance_url>/services/apexrest/v1/accounts
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Corps (JSON): champs Name, Phone
  Example:
    {
      "Name": "AXG GmbH",
      "Phone": "12345"
    }

GET <instance_url>/services/apexrest/v1/accounts/{{idOrExt}}
  Paramètres d’URL: idOrExt
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json

PATCH <instance_url>/services/apexrest/v1/accounts/{{lastAccountExt}}
  Paramètres d’URL: lastAccountExt
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Corps (JSON): champs Website
  Example:
    {
      "Website": "https://axg.de"
    }

POST <instance_url>/services/apexrest/v1/contracts
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Corps (JSON): champs AccountId, Status, StartDate, ContractTerm
  Example:
    {
      "AccountId": "<axgAccountId>",
      "Status": "Draft",
      "StartDate": "2025-01-01",
      "ContractTerm": 12
    }

GET <instance_url>/services/apexrest/v1/contracts/{{idOrExt}}
  Paramètres d’URL: idOrExt
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json

PATCH <instance_url>/services/apexrest/v1/contracts/{{lastContractExt}}
  Paramètres d’URL: lastContractExt
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Corps (JSON): champs Description
  Example:
    {
      "Description": "Mis \u00e0 jour"
    }

GET <instance_url>/services/data/v59.0/limits
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json

POST <instance_url>/services/oauth2/token
  Corps (x-www-form-urlencoded): grant_type, client_id, client_secret`
          },

          {
            type: "timeline",
            title: "Workflow d’implémentation",
            steps: [
              {
                title: "Cadrage de l’intégration",
                description:
                  "Validation du sens de données (AXG → Salesforce), identification des endpoints et choix d’authentification (Connected App + OAuth username/password)."
              },
              {
                title: "Implémentation & tests API",
                description:
                  "Construction et validation des appels dans Postman. Ajout d’API custom Apex REST quand l’API standard ne respectait pas le cahier des charges (création Contact et comportement DELETE)."
              },
              {
                title: "Couche Heroku pour le mobile",
                description:
                  "Déploiement sur Heroku, connexion à Salesforce, et vérification de la synchronisation bidirectionnelle (Heroku ↔ Salesforce) sur les objets nécessaires."
              },
              {
                title: "Fiabilisation de la synchronisation",
                description:
                  "Automatisation du remplissage de l’External ID utilisé pour la synchro (trigger) afin de garantir l’unicité et éviter les erreurs de saisie manuelle."
              },
              {
                title: "Déploiement & documentation",
                description:
                  "Rédaction du document de déploiement (composants + actions manuelles) et du document de changements Heroku, puis préparation de la démo."
              }
            ]
          },
          {
            type: "metrics",
            title: "Qualité & garde-fous",
            items: [
              { label: "Conformité API", value: "Collection Postman testée selon les specs" },
              { label: "Règles métiers", value: "API custom Apex REST pour les exigences create/DELETE" },
              { label: "Fiabilité synchro", value: "External ID auto‑renseigné avec unicité" },
              { label: "Prêt pour run", value: "Runbook de déploiement + checklist de validation" }
            ]
          },
          {
            type: "resources",
            title: "Livrables",
            items: [
              { label: "Collection Postman (JSON)", href: "/docs/projects/legarant-axg-salesforce-deployment/postman-collection.json" },
              { label: "Changements Heroku (PDF)", href: "/docs/projects/legarant-axg-salesforce-deployment/heroku-changes.pdf" },
              { label: "Document de déploiement (PDF)", href: "/docs/projects/legarant-axg-salesforce-deployment/deployment.pdf" },
              { label: "Cahier des charges (PDF)", href: "/docs/projects/legarant-axg-salesforce-deployment/requirements.pdf" },
              { label: "Brief projet (DOCX)", href: "/docs/projects/legarant-axg-salesforce-deployment/brief.docx" },
              { label: "Ancien guide Heroku (PDF)", href: "/docs/projects/legarant-axg-salesforce-deployment/legacy-heroku-guide.pdf" },
              { label: "Seuils gratuits Azure (PDF)", href: "/docs/projects/legarant-axg-salesforce-deployment/azure-free-tier-thresholds.pdf" },
              { label: "Lien du dépôt (TXT)", href: "/docs/projects/legarant-axg-salesforce-deployment/repository-link.txt" },
              { label: "Lien staging (TXT)", href: "/docs/projects/legarant-axg-salesforce-deployment/sandbox-link.txt" }
            ]
          },
          {
            type: "code",
            title: "Liens (repo + staging)",
            language: "text",
            code:
              `Repository: https://github.com/Aiyeesha/Projet-12/tree/main
Staging app: https://legarant-staging-78a7880351d1.herokuapp.com
`,
          }
        ]
      },
      es: {
        heroSubtitle:
          "Integrar AXG en Salesforce (Legarant) y entregar una capa de integración lista para una app móvil (REST + Heroku).",
        sections: [
          {
            type: "text",
            title: "Contexto",
            paragraphs: [
              "LEGARANT (seguro de vida) adquirió AXG para expandirse en Alemania. El objetivo era mantener la org de Salesforce de Legarant como CRM principal e integrar en ella los datos clave de AXG.",
              "La integración es unidireccional (AXG → Salesforce). Como se preveía una app móvil, también se necesitaba una capa aplicativa (tipo Heroku) conectada a Salesforce, y llamadas REST para consultar la base de clientes."
            ]
          },
          {
            type: "bullets",
            title: "Lo que entregué",
            items: [
              "Una colección Postman que cubre las llamadas REST solicitadas (API estándar + endpoints personalizados cuando fue necesario).",
              "Controladores REST Apex personalizados para implementar reglas de negocio no cubiertas por la API estándar de Contact (crear o devolver el Id, borrado lógico vía DELETE).",
              "Una aplicación desplegada en Heroku y conectada a Salesforce, con replicación de datos y documentación de los cambios de configuración.",
              "Un paquete de despliegue + runbook: lista de componentes, acciones manuales y checklist de validación (test y producción)."
            ]
          },
          {
            type: "bullets",
            title: "Endpoints REST cubiertos",
            items: [
              "POST /services/oauth2/token — Token OAuth (Password Flow / client credentials).",
              "POST /services/apexrest/v1/contacts — Creación de Contact (crear o devolver según la especificación).",
              "GET /services/apexrest/v1/contacts/{idOrExt} — Lectura de Contact por Id o External Id.",
              "PATCH /services/apexrest/v1/contacts/{externalId} — Actualización de Contact por External Id.",
              "PATCH /services/apexrest/v1/contacts/{id} — Desactivación de Contact (borrado lógico).",
              "POST /services/apexrest/v1/accounts — Creación de Account.",
              "GET /services/apexrest/v1/accounts/{idOrExt} — Lectura de Account por Id o External Id.",
              "PATCH /services/apexrest/v1/accounts/{externalId} — Actualización de Account por External Id.",
              "POST /services/apexrest/v1/contracts — Creación de Contract.",
              "GET /services/apexrest/v1/contracts/{idOrExt} — Lectura de Contract por Id o External Id.",
              "PATCH /services/apexrest/v1/contracts/{externalId} — Actualización de Contract por External Id."
            ]
          },
          {
            type: "code",
            title: "Parámetros de los endpoints (desde Postman)",
            language: "text",
            code: `POST <instance_url>/services/apexrest/v1/contacts
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Cuerpo (JSON): campos LastName, city, Email
  Ejemplo:
    {
      "LastName": "axG -tests Contact Test",
      "city" : "Berlin",
      "Email": "test.Contact@example.com"
    }

GET <instance_url>/services/apexrest/v1/contacts/{{idOrExt}}
  Parámetros de ruta: idOrExt
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json

PATCH <instance_url>/services/apexrest/v1/contacts/{{lastContactExt}}
  Parámetros de ruta: lastContactExt
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Cuerpo (JSON): campo MobilePhone
  Ejemplo:
    {
      "MobilePhone": "+491111"
    }

PATCH <instance_url>/services/apexrest/v1/contacts/{{lastContactId}}
  Parámetros de ruta: lastContactId
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Cuerpo (JSON): campo Active
  Ejemplo:
    {
      "Active": "false"
    }

POST <instance_url>/services/apexrest/v1/accounts
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Cuerpo (JSON): campos Name, Phone
  Ejemplo:
    {
      "Name": "AXG GmbH",
      "Phone": "12345"
    }

GET <instance_url>/services/apexrest/v1/accounts/{{idOrExt}}
  Parámetros de ruta: idOrExt
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json

PATCH <instance_url>/services/apexrest/v1/accounts/{{lastAccountExt}}
  Parámetros de ruta: lastAccountExt
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Cuerpo (JSON): campo Website
  Ejemplo:
    {
      "Website": "https://axg.de"
    }

POST <instance_url>/services/apexrest/v1/contracts
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Cuerpo (JSON): campos AccountId, Status, StartDate, ContractTerm
  Ejemplo:
    {
      "AccountId": "<axgAccountId>",
      "Status": "Draft",
      "StartDate": "2025-01-01",
      "ContractTerm": 12
    }

GET <instance_url>/services/apexrest/v1/contracts/{{idOrExt}}
  Parámetros de ruta: idOrExt
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json

PATCH <instance_url>/services/apexrest/v1/contracts/{{lastContractExt}}
  Parámetros de ruta: lastContractExt
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json
  Cuerpo (JSON): campo Description
  Ejemplo:
    {
      "Description": "Actualizado"
    }

GET <instance_url>/services/data/v59.0/limits
  Headers:
    - Authorization: Bearer <access_token>
    - Content-Type: application/json

POST <instance_url>/services/oauth2/token
  Cuerpo (x-www-form-urlencoded): grant_type, client_id, client_secret`
          },
          {
            type: "timeline",
            title: "Flujo de implementación",
            steps: [
              {
                title: "Diseño de la integración",
                description:
                  "Validación del sentido de los datos (AXG → Salesforce), identificación de los endpoints y elección de la autenticación (Connected App + OAuth username/password flow)."
              },
              {
                title: "Implementación y pruebas de la API",
                description:
                  "Construcción y validación de las llamadas en Postman. Se añadió REST Apex personalizado cuando la API estándar no cumplía con la especificación (creación de Contact y comportamiento DELETE)."
              },
              {
                title: "Capa Heroku para el móvil",
                description:
                  "Despliegue en Heroku, conexión a Salesforce y verificación de la sincronización bidireccional (Heroku ↔ Salesforce) en los objetos necesarios."
              },
              {
                title: "Fiabilización de la sincronización",
                description:
                  "Automatización del llenado del External ID utilizado para la sincronización (trigger) para garantizar la unicidad y evitar errores manuales."
              },
              {
                title: "Despliegue y documentación",
                description:
                  "Redacción del documento de despliegue (componentes + acciones manuales) y del documento de cambios de Heroku, seguido de la preparación de la demo."
              }
            ]
          },
          {
            type: "metrics",
            title: "Calidad y garantías",
            items: [
              { label: "Conformidad de la API", value: "Colección Postman validada según las especificaciones" },
              { label: "Reglas de negocio", value: "REST Apex personalizado para los requisitos de create/DELETE" },
              { label: "Fiabilidad de la sincronización", value: "External ID autocompletado con unicidad garantizada" },
              { label: "Listo para producción", value: "Runbook de despliegue + checklist de validación" }
            ]
          },
          {
            type: "resources",
            title: "Entregables",
            items: [
              { label: "Colección Postman (JSON)", href: "/docs/projects/legarant-axg-salesforce-deployment/postman-collection.json" },
              { label: "Cambios en Heroku (PDF)", href: "/docs/projects/legarant-axg-salesforce-deployment/heroku-changes.pdf" },
              { label: "Guía de despliegue (PDF)", href: "/docs/projects/legarant-axg-salesforce-deployment/deployment.pdf" },
              { label: "Requisitos / especificación (PDF)", href: "/docs/projects/legarant-axg-salesforce-deployment/requirements.pdf" },
              { label: "Brief del proyecto (DOCX)", href: "/docs/projects/legarant-axg-salesforce-deployment/brief.docx" },
              { label: "Guía Heroku anterior (PDF)", href: "/docs/projects/legarant-axg-salesforce-deployment/legacy-heroku-guide.pdf" },
              { label: "Umbrales del nivel gratuito de Azure (PDF)", href: "/docs/projects/legarant-axg-salesforce-deployment/azure-free-tier-thresholds.pdf" },
              { label: "Enlace del repositorio (TXT)", href: "/docs/projects/legarant-axg-salesforce-deployment/repository-link.txt" },
              { label: "Enlace de staging (TXT)", href: "/docs/projects/legarant-axg-salesforce-deployment/sandbox-link.txt" }
            ]
          },
          {
            type: "code",
            title: "Enlaces (repo + staging)",
            language: "text",
            code: `Repository: https://github.com/Aiyeesha/Projet-12/tree/main\nStaging app: https://legarant-staging-78a7880351d1.herokuapp.com`,
          }
        ]
      }
    }
  },
  {
  slug: "ltp-apex-backend-prototype",
  gallery: [
      { src: "/projects/ltp-apex-backend-prototype/cover.webp", alt: "LTP Apex Prototype — cover" },
      { src: "/projects/ltp-apex-backend-prototype/screenshot-1.png", alt: "LTP Apex Prototype — screenshot 1" },
      { src: "/projects/ltp-apex-backend-prototype/screenshot-10.webp", alt: "LTP Apex Prototype — screenshot 10" },
      { src: "/projects/ltp-apex-backend-prototype/screenshot-11.webp", alt: "LTP Apex Prototype — screenshot 11" },
      { src: "/projects/ltp-apex-backend-prototype/screenshot-12.webp", alt: "LTP Apex Prototype — screenshot 12" },
      { src: "/projects/ltp-apex-backend-prototype/screenshot-13.webp", alt: "LTP Apex Prototype — screenshot 13" },
      { src: "/projects/ltp-apex-backend-prototype/screenshot-14.webp", alt: "LTP Apex Prototype — screenshot 14" },
      { src: "/projects/ltp-apex-backend-prototype/screenshot-15.webp", alt: "LTP Apex Prototype — screenshot 15" },
      { src: "/projects/ltp-apex-backend-prototype/screenshot-16.webp", alt: "LTP Apex Prototype — screenshot 16" },
      { src: "/projects/ltp-apex-backend-prototype/screenshot-17.webp", alt: "LTP Apex Prototype — screenshot 17" },
      { src: "/projects/ltp-apex-backend-prototype/shot-1.svg", alt: "LTP Apex Prototype — shot 1" },
      { src: "/projects/ltp-apex-backend-prototype/shot-2.svg", alt: "LTP Apex Prototype — shot 2" },
      { src: "/projects/ltp-apex-backend-prototype/shot-3.svg", alt: "LTP Apex Prototype — shot 3" },
  ],
  locales: {
    en: {
      heroSubtitle: "Salesforce delivery tracking CRM — solution blueprint (LTP)",
      sections: [
        {
          type: "text",
          title: "Context",
          paragraphs: [
            "Le Temps des Papillons (LTP) is a French luxury group. Sales teams need a fluid CRM to manage Leads → Accounts/Contacts/Opportunities, and to create deliveries.",
            "Support agents handle ~194 customer calls per day about shipment status, but tracking data currently lives in 3 external carriers systems (France, Europe, International).",
            "The goal of this project was to produce a complete technical blueprint for a Salesforce application: data model, security, and a realistic import & integration strategy."
          ]
        },
        {
          type: "bullets",
          title: "Key needs",
          items: [
            "Fast access to customer records from an order number, customer name or email.",
            "Automated shipment tracking and proactive customer notifications.",
            "A clear data model to support deliveries, carrier data and commercial activity.",
            "A security model (profiles/roles/sharing) aligned with Sales vs Support usage.",
            "An initial data import strategy that can handle large volumes safely."
          ]
        },
        {
          type: "timeline",
          title: "Delivery approach",
          steps: [
            {
              title: "Technical specifications",
              description: "Define scope, objects (standard + custom), key processes, and integration touchpoints with each carrier."
            },
            {
              title: "UML data model",
              description: "Document entities & relationships to support Opportunities, Orders/Deliveries, Carriers and tracking states."
            },
            {
              title: "Security & sharing",
              description: "Profiles + roles, object permissions and record visibility rules (who can see what) designed for Sales and Support."
            },
            {
              title: "Import & migration strategy",
              description: "Data loading plan (Data Loader / ETL), external IDs, dependency order and validation steps for high-volume datasets."
            }
          ]
        },
        {
          type: "metrics",
          title: "Key figures (scope)",
          items: [
            { label: "Carriers", value: "3", note: "France / Europe / International" },
            { label: "Support volume", value: "≈194 calls/day", note: "Delivery tracking inquiries" },
            { label: "Accounts", value: "2,123,000", note: "Initial dataset volumetry" },
            { label: "Contacts", value: "3,239,870", note: "Initial dataset volumetry" }
          ]
        },
        {
          type: "text",
          title: "Evaluation notes",
          paragraphs: [
            "⚠️ Note: the provided document contains two different evaluation blocks (one showing all skills validated, another listing points to correct). To avoid misrepresenting outcomes, the page highlights the actionable feedback below.",
            "Main improvement points mentioned: (1) import dependency order (e.g., Products before PricebookEntry), (2) starting from a 'Public Read-Only' baseline sharing model when explicitly required, and (3) using an ETL (not Batch Apex) for SFTP-based integration scenarios."
          ]
        },
        {
          type: "resources",
          title: "Deliverables & proofs",
          items: [
            { label: "Technical specifications (PDF)", href: "/docs/projects/ltp-apex-backend-prototype/specifications.pdf" },
            { label: "UML data model (PDF)", href: "/docs/projects/ltp-apex-backend-prototype/uml-data-model.pdf" },
            { label: "Access rights & sharing (PDF)", href: "/docs/projects/ltp-apex-backend-prototype/access-rights.pdf" },
            { label: "Import strategy (PDF)", href: "/docs/projects/ltp-apex-backend-prototype/import-strategy.pdf" },
            { label: "Requirements / brief (PDF)", href: "/docs/projects/ltp-apex-backend-prototype/requirements.pdf" },
            { label: "Project scenario (DOCX)", href: "/docs/projects/ltp-apex-backend-prototype/brief.docx" }
          ]
        }
      ]
    },
    fr: {
      heroSubtitle: "CRM Salesforce de suivi des livraisons — conception & livrables (LTP)",
      sections: [
        {
          type: "text",
          title: "Contexte",
          paragraphs: [
            "Le Temps des Papillons (LTP) est un groupe français (luxe / mode / beauté). Les commerciaux ont besoin d’un CRM fluide pour gérer le cycle Lead → Compte/Contact/Opportunité, puis créer des livraisons.",
            "Les agents du support reçoivent ~194 appels/jour de clients qui souhaitent connaître l’état d’avancement de leur livraison, mais les données sont réparties chez 3 transporteurs (France, Europe, International).",
            "L’objectif du projet : produire une conception technique complète de l’application Salesforce (spécifications, modèle de données, sécurité, stratégie d’import et d’intégration)."
          ]
        },
        {
          type: "bullets",
          title: "Besoins clés",
          items: [
            "Accéder rapidement à la fiche client depuis un numéro de commande, le nom ou l’email.",
            "Automatiser le suivi des livraisons et informer automatiquement les clients des changements de statut.",
            "Concevoir un modèle de données clair (objets standard + custom) pour les livraisons et le tracking.",
            "Définir un modèle de sécurité (profils / rôles / partage) adapté aux usages Commerciaux vs Support.",
            "Préparer une stratégie d’import initial réaliste et compatible avec une forte volumétrie."
          ]
        },
        {
          type: "timeline",
          title: "Approche de livraison",
          steps: [
            {
              title: "Spécifications techniques",
              description: "Définition du périmètre, liste des objets (standard + custom), processus clés et interfaces d’intégration par transporteur."
            },
            {
              title: "Diagramme UML (modèle de données)",
              description: "Formalisation des entités et relations pour supporter Opportunités, Commandes/Livraisons, Transporteurs et statuts de tracking."
            },
            {
              title: "Sécurité & visibilité",
              description: "Profils + rôles, droits d’accès par objet et règles de partage (qui voit quoi) pour les équipes commerciales et support."
            },
            {
              title: "Stratégie d’import / migration",
              description: "Plan de chargement (Data Loader / ETL), External IDs, ordre de dépendances et validations pour des jeux de données volumineux."
            }
          ]
        },
        {
          type: "metrics",
          title: "Chiffres clés (périmètre)",
          items: [
            { label: "Transporteurs", value: "3", note: "France / Europe / International" },
            { label: "Support", value: "≈194 appels/jour", note: "Demandes de suivi livraison" },
            { label: "Comptes", value: "2 123 000", note: "Volumétrie initiale" },
            { label: "Contacts", value: "3 239 870", note: "Volumétrie initiale" }
          ]
        },
        {
          type: "text",
          title: "Évaluation & retours",
          paragraphs: [
            "⚠️ Note : le document fourni contient deux blocs d’évaluation différents (un indiquant les compétences validées, l’autre listant des points à corriger). Pour éviter toute interprétation, je mets en avant les retours actionnables ci-dessous.",
            "Points d’amélioration mentionnés : (1) ordre de dépendances pour l’import (ex. Produits avant PricebookEntry), (2) respect du point de départ “Public en lecture seule” lorsque c’est explicitement demandé, (3) intégration SFTP : privilégier un ETL plutôt qu’un Batch Apex."
          ]
        },
        {
          type: "resources",
          title: "Livrables & preuves",
          items: [
            { label: "Spécifications techniques (PDF)", href: "/docs/projects/ltp-apex-backend-prototype/specifications.pdf" },
            { label: "Diagramme UML (PDF)", href: "/docs/projects/ltp-apex-backend-prototype/uml-data-model.pdf" },
            { label: "Droits d’accès & partage (PDF)", href: "/docs/projects/ltp-apex-backend-prototype/access-rights.pdf" },
            { label: "Stratégie d’import (PDF)", href: "/docs/projects/ltp-apex-backend-prototype/import-strategy.pdf" },
            { label: "Cahier des charges (PDF)", href: "/docs/projects/ltp-apex-backend-prototype/requirements.pdf" },
            { label: "Scénario du projet (DOCX)", href: "/docs/projects/ltp-apex-backend-prototype/brief.docx" }
          ]
        }
      ]
    },
    es: {
      heroSubtitle: "CRM Salesforce de seguimiento de entregas — diseño y entregables (LTP)",
      sections: [
        {
          type: "text",
          title: "Contexto",
          paragraphs: [
            "Le Temps des Papillons (LTP) es un grupo francés (lujo / moda / belleza). Los comerciales necesitan un CRM fluido para gestionar el ciclo Lead → Cuenta/Contacto/Oportunidad, y luego crear entregas.",
            "Los agentes de soporte reciben ~194 llamadas/día de clientes que quieren conocer el estado de su entrega, pero los datos están repartidos entre 3 transportistas (Francia, Europa, Internacional).",
            "El objetivo del proyecto: producir un diseño técnico completo de la aplicación Salesforce (especificaciones, modelo de datos, seguridad, estrategia de importación e integración)."
          ]
        },
        {
          type: "bullets",
          title: "Necesidades clave",
          items: [
            "Acceder rápidamente a la ficha del cliente desde un número de pedido, el nombre o el email.",
            "Automatizar el seguimiento de entregas e informar automáticamente a los clientes de los cambios de estado.",
            "Diseñar un modelo de datos claro (objetos estándar + personalizados) para las entregas y el tracking.",
            "Definir un modelo de seguridad (perfiles / roles / reglas de colaboración) adaptado a los usos de Comercial vs Soporte.",
            "Preparar una estrategia de importación inicial realista y compatible con un alto volumen de datos."
          ]
        },
        {
          type: "timeline",
          title: "Enfoque de entrega",
          steps: [
            {
              title: "Especificaciones técnicas",
              description: "Definición del alcance, lista de objetos (estándar + personalizados), procesos clave e interfaces de integración por transportista."
            },
            {
              title: "Diagrama UML (modelo de datos)",
              description: "Formalización de entidades y relaciones para dar soporte a Oportunidades, Pedidos/Entregas, Transportistas y estados de tracking."
            },
            {
              title: "Seguridad y visibilidad",
              description: "Perfiles + roles, permisos de acceso por objeto y reglas de colaboración (quién ve qué) para los equipos comerciales y de soporte."
            },
            {
              title: "Estrategia de importación / migración",
              description: "Plan de carga (Data Loader / ETL), External IDs, orden de dependencias y validaciones para conjuntos de datos voluminosos."
            }
          ]
        },
        {
          type: "metrics",
          title: "Cifras clave (alcance)",
          items: [
            { label: "Transportistas", value: "3", note: "Francia / Europa / Internacional" },
            { label: "Soporte", value: "≈194 llamadas/día", note: "Solicitudes de seguimiento de entrega" },
            { label: "Cuentas", value: "2.123.000", note: "Volumetría inicial" },
            { label: "Contactos", value: "3.239.870", note: "Volumetría inicial" }
          ]
        },
        {
          type: "text",
          title: "Evaluación y comentarios",
          paragraphs: [
            "⚠️ Nota: el documento proporcionado contiene dos bloques de evaluación distintos (uno indicando las competencias validadas, el otro listando puntos a corregir). Para evitar cualquier interpretación errónea, destaco a continuación los comentarios accionables.",
            "Puntos de mejora mencionados: (1) orden de dependencias en la importación (ej. Productos antes que PricebookEntry), (2) respetar el punto de partida «Público de solo lectura» cuando se solicita explícitamente, (3) integración SFTP: preferir un ETL en lugar de un Batch Apex."
          ]
        },
        {
          type: "resources",
          title: "Entregables y evidencias",
          items: [
            { label: "Especificaciones técnicas (PDF)", href: "/docs/projects/ltp-apex-backend-prototype/specifications.pdf" },
            { label: "Diagrama UML (PDF)", href: "/docs/projects/ltp-apex-backend-prototype/uml-data-model.pdf" },
            { label: "Derechos de acceso y colaboración (PDF)", href: "/docs/projects/ltp-apex-backend-prototype/access-rights.pdf" },
            { label: "Estrategia de importación (PDF)", href: "/docs/projects/ltp-apex-backend-prototype/import-strategy.pdf" },
            { label: "Requisitos (PDF)", href: "/docs/projects/ltp-apex-backend-prototype/requirements.pdf" },
            { label: "Escenario del proyecto (DOCX)", href: "/docs/projects/ltp-apex-backend-prototype/brief.docx" }
          ]
        }
      ]
    }
  }
},
  {
    slug: "idemconnect-apex-backend",
    gallery: [
        { src: "/projects/idemconnect-apex-backend/cover.svg", alt: "IdemConnect — cover" },
        { src: "/projects/idemconnect-apex-backend/cover.webp", alt: "IdemConnect — cover" },
        { src: "/projects/idemconnect-apex-backend/screenshot-1.webp", alt: "IdemConnect — screenshot 1" },
        { src: "/projects/idemconnect-apex-backend/screenshot-2.webp", alt: "IdemConnect — screenshot 2" },
        { src: "/projects/idemconnect-apex-backend/screenshot-3.webp", alt: "IdemConnect — screenshot 3" },
        { src: "/projects/idemconnect-apex-backend/screenshot-4.webp", alt: "IdemConnect — screenshot 4" },
        { src: "/projects/idemconnect-apex-backend/screenshot-5.webp", alt: "IdemConnect — screenshot 5" },
        { src: "/projects/idemconnect-apex-backend/screenshot-6.webp", alt: "IdemConnect — screenshot 6" },
        { src: "/projects/idemconnect-apex-backend/screenshot-7.webp", alt: "IdemConnect — screenshot 7" },
        { src: "/projects/idemconnect-apex-backend/screenshot-8.webp", alt: "IdemConnect — screenshot 8" },
        { src: "/projects/idemconnect-apex-backend/screenshot-9.webp", alt: "IdemConnect — screenshot 9" },
        { src: "/projects/idemconnect-apex-backend/screenshot-10.webp", alt: "IdemConnect — screenshot 10" },
        { src: "/projects/idemconnect-apex-backend/screenshot-11.webp", alt: "IdemConnect — screenshot 11" },
        { src: "/projects/idemconnect-apex-backend/screenshot-12.webp", alt: "IdemConnect — screenshot 12" },
        { src: "/projects/idemconnect-apex-backend/screenshot-13.webp", alt: "IdemConnect — screenshot 13" },
        { src: "/projects/idemconnect-apex-backend/screenshot-14.webp", alt: "IdemConnect — screenshot 14" },
        { src: "/projects/idemconnect-apex-backend/screenshot-15.webp", alt: "IdemConnect — screenshot 15" },
        { src: "/projects/idemconnect-apex-backend/screenshot-16.webp", alt: "IdemConnect — screenshot 16" },
        { src: "/projects/idemconnect-apex-backend/screenshot-17.webp", alt: "IdemConnect — screenshot 17" },
        { src: "/projects/idemconnect-apex-backend/screenshot-18.webp", alt: "IdemConnect — screenshot 18" },
        { src: "/projects/idemconnect-apex-backend/screenshot-19.webp", alt: "IdemConnect — screenshot 19" },
        { src: "/projects/idemconnect-apex-backend/screenshot-20.webp", alt: "IdemConnect — screenshot 20" },
    ],
    locales: {
      en: {
        heroSubtitle: "Apex backend delivery (iDEM Connect)",
        sections: [
          {
            type: "text",
            title: "Context",
            paragraphs: [
              "iDEM Connect is a global internet service provider and connectivity technology vendor. A new Salesforce application was designed to help sales teams better sell, track customers, and manage subscription contracts.",
              "My role focused on delivering the Apex backend (trigger, services, batch/scheduler) with strong engineering hygiene: documentation, unit tests, and a clear mapping between functional requirements and implementation."
            ]
          },
          {
            type: "bullets",
            title: "What was required",
            items: [
              "Implement an Apex Trigger and Apex classes covering the requested features (as defined in the feature grid).",
              "Provide a Batch Apex job and its Scheduler for recurring processing.",
              "Follow Apex best practices (bulk-safe, governor-limit friendly).",
              "Deliver class documentation (PDF) and a test execution report showing code coverage."
            ]
          },
          {
            type: "bullets",
            title: "Implementation approach",
            items: [
              "Service-layer design to keep triggers thin and responsibilities clear.",
              "Bulkification throughout (collections/maps), with no SOQL/DML inside loops.",
              "Batch + Scheduler to execute recurring updates safely and predictably.",
              "Unit tests aligned with the functional grid, plus a test run report to demonstrate coverage."
            ]
          },
          {
            type: "metrics",
            title: "Quality & evidence",
            items: [
              { label: "Skills validated (review)", value: "3/3" },
              { label: "Code coverage", value: "> 75%" },
              { label: "SOQL/DML in loops", value: "0" }
            ]
          },
          {
            type: "text",
            title: "Reviewer notes",
            paragraphs: [
              "The reviewer highlighted complete and relevant deliverables: documented classes, correctly running unit tests covering all specified features, bulk-safe Apex patterns, and a backend combining trigger, service classes, and a scheduled batch on Account and Order."
            ]
          },
          {
            type: "resources",
            title: "Deliverables & evidence",
            items: [
              { label: "Project brief (DOCX)", href: "/docs/projects/idemconnect-apex-backend/brief.docx" },
              { label: "Requirements (PDF)", href: "/docs/projects/idemconnect-apex-backend/cahier-des-charges.pdf" },
              { label: "Feature grid (PDF)", href: "/docs/projects/idemconnect-apex-backend/grille-de-fonctionnalites.pdf" },
              { label: "Repository link / code (TXT)", href: "/docs/projects/idemconnect-apex-backend/code-repo.txt" },
              { label: "Class documentation (PDF)", href: "/docs/projects/idemconnect-apex-backend/documentation.pdf" },
              { label: "Test execution report (PDF)", href: "/docs/projects/idemconnect-apex-backend/rapport-tests.pdf" }
            ]
          }
        ]
      },
      fr: {
        heroSubtitle: "Livraison d’un backend Apex (iDEM Connect)",
        sections: [
          {
            type: "text",
            title: "Contexte",
            paragraphs: [
              "iDEM Connect est un fournisseur d’accès à Internet mondial et un acteur des technologies de connexion. Une nouvelle application Salesforce a été définie pour aider les équipes commerciales à mieux vendre, suivre les clients et gérer les contrats d’abonnement.",
              "Mon périmètre : livrer le backend Apex (trigger, classes de service, batch + scheduler) avec une démarche “production-ready” : documentation, tests unitaires et traçabilité exigences → implémentation."
            ]
          },
          {
            type: "bullets",
            title: "Ce qui était attendu",
            items: [
              "Développer un Trigger Apex et des classes Apex couvrant les fonctionnalités de la grille.",
              "Fournir un Batch Apex et son Scheduler pour les traitements récurrents.",
              "Respecter les bonnes pratiques Apex (bulkification, limites Salesforce).",
              "Produire la documentation des classes (PDF) et un rapport d’exécution des tests montrant la couverture."
            ]
          },
          {
            type: "bullets",
            title: "Approche d’implémentation",
            items: [
              "Architecture en couche service : triggers “minces”, responsabilités claires, meilleure maintenabilité.",
              "Bulkification systématique (collections/maps), avec 0 SOQL/DML dans les boucles.",
              "Batch + Scheduler pour exécuter des mises à jour récurrentes de façon fiable et prévisible.",
              "Tests unitaires alignés sur la grille fonctionnelle + rapport de tests pour démontrer la couverture."
            ]
          },
          {
            type: "metrics",
            title: "Qualité & preuves",
            items: [
              { label: "Compétences validées (évaluation)", value: "3/3" },
              { label: "Couverture de code", value: "> 75%" },
              { label: "SOQL/DML dans les boucles", value: "0" }
            ]
          },
          {
            type: "text",
            title: "Retours d’évaluation",
            paragraphs: [
              "Les retours soulignent des livrables complets et pertinents : classes documentées, tests unitaires exécutés correctement couvrant les fonctionnalités, respect des standards Apex (bulk-safe), et backend combinant trigger, services et batch/scheduler pour répondre aux cas d’usage sur Account et Order."
            ]
          },
          {
            type: "resources",
            title: "Livrables & preuves",
            items: [
              { label: "Brief du projet (DOCX)", href: "/docs/projects/idemconnect-apex-backend/brief.docx" },
              { label: "Cahier des charges (PDF)", href: "/docs/projects/idemconnect-apex-backend/cahier-des-charges.pdf" },
              { label: "Grille de fonctionnalités (PDF)", href: "/docs/projects/idemconnect-apex-backend/grille-de-fonctionnalites.pdf" },
              { label: "Lien dépôt / code (TXT)", href: "/docs/projects/idemconnect-apex-backend/code-repo.txt" },
              { label: "Documentation des classes (PDF)", href: "/docs/projects/idemconnect-apex-backend/documentation.pdf" },
              { label: "Rapport d’exécution des tests (PDF)", href: "/docs/projects/idemconnect-apex-backend/rapport-tests.pdf" }
            ]
          }
        ]
      },
      es: {
        heroSubtitle: "Entrega de un backend Apex (iDEM Connect)",
        sections: [
          {
            type: "text",
            title: "Contexto",
            paragraphs: [
              "iDEM Connect es un proveedor de acceso a Internet global y un actor de las tecnologías de conexión. Se diseñó una nueva aplicación Salesforce para ayudar a los equipos comerciales a vender mejor, hacer seguimiento de clientes y gestionar contratos de suscripción.",
              "Mi alcance: entregar el backend Apex (trigger, clases de servicio, batch + scheduler) con un enfoque «listo para producción»: documentación, pruebas unitarias y trazabilidad requisitos → implementación."
            ]
          },
          {
            type: "bullets",
            title: "Lo que se solicitaba",
            items: [
              "Desarrollar un Trigger Apex y clases Apex que cubran las funcionalidades de la grilla.",
              "Proporcionar un Batch Apex y su Scheduler para los procesos recurrentes.",
              "Respetar las buenas prácticas de Apex (bulkificación, límites de Salesforce).",
              "Producir la documentación de las clases (PDF) y un informe de ejecución de pruebas mostrando la cobertura."
            ]
          },
          {
            type: "bullets",
            title: "Enfoque de implementación",
            items: [
              "Arquitectura en capa de servicio: triggers «ligeros», responsabilidades claras, mejor mantenibilidad.",
              "Bulkificación sistemática (colecciones/maps), con 0 SOQL/DML dentro de bucles.",
              "Batch + Scheduler para ejecutar actualizaciones recurrentes de forma fiable y predecible.",
              "Pruebas unitarias alineadas con la grilla funcional + informe de pruebas para demostrar la cobertura."
            ]
          },
          {
            type: "metrics",
            title: "Calidad y evidencias",
            items: [
              { label: "Competencias validadas (evaluación)", value: "3/3" },
              { label: "Cobertura de código", value: "> 75%" },
              { label: "SOQL/DML en bucles", value: "0" }
            ]
          },
          {
            type: "text",
            title: "Comentarios de la evaluación",
            paragraphs: [
              "Los comentarios destacan entregables completos y pertinentes: clases documentadas, pruebas unitarias ejecutadas correctamente cubriendo las funcionalidades, respeto de los estándares Apex (bulk-safe), y un backend que combina trigger, servicios y batch/scheduler para responder a los casos de uso sobre Account y Order."
            ]
          },
          {
            type: "resources",
            title: "Entregables y evidencias",
            items: [
              { label: "Brief del proyecto (DOCX)", href: "/docs/projects/idemconnect-apex-backend/brief.docx" },
              { label: "Requisitos (PDF)", href: "/docs/projects/idemconnect-apex-backend/cahier-des-charges.pdf" },
              { label: "Grilla de funcionalidades (PDF)", href: "/docs/projects/idemconnect-apex-backend/grille-de-fonctionnalites.pdf" },
              { label: "Enlace del repositorio / código (TXT)", href: "/docs/projects/idemconnect-apex-backend/code-repo.txt" },
              { label: "Documentación de las clases (PDF)", href: "/docs/projects/idemconnect-apex-backend/documentation.pdf" },
              { label: "Informe de ejecución de pruebas (PDF)", href: "/docs/projects/idemconnect-apex-backend/rapport-tests.pdf" }
            ]
          }
        ]
      }
    }
  },
  {
    slug: "fasha-apex-backend-optimization",
    gallery: [
        { src: "/projects/fasha-apex-backend-optimization/cover.svg", alt: "FASHA — cover" },
        { src: "/projects/fasha-apex-backend-optimization/cover.webp", alt: "FASHA — cover" },
        { src: "/projects/fasha-apex-backend-optimization/screenshot-1.webp", alt: "FASHA — screenshot 1" },
        { src: "/projects/fasha-apex-backend-optimization/screenshot-2.webp", alt: "FASHA — screenshot 2" },
        { src: "/projects/fasha-apex-backend-optimization/screenshot-3.webp", alt: "FASHA — screenshot 3" },
        { src: "/projects/fasha-apex-backend-optimization/screenshot-4.webp", alt: "FASHA — screenshot 4" },
        { src: "/projects/fasha-apex-backend-optimization/screenshot-5.webp", alt: "FASHA — screenshot 5" },
        { src: "/projects/fasha-apex-backend-optimization/screenshot-6.webp", alt: "FASHA — screenshot 6" },
        { src: "/projects/fasha-apex-backend-optimization/screenshot-7.webp", alt: "FASHA — screenshot 7" },
        { src: "/projects/fasha-apex-backend-optimization/screenshot-8.webp", alt: "FASHA — screenshot 8" },
        { src: "/projects/fasha-apex-backend-optimization/screenshot-9.webp", alt: "FASHA — screenshot 9" },
        { src: "/projects/fasha-apex-backend-optimization/screenshot-10.webp", alt: "FASHA — screenshot 10" },
        { src: "/projects/fasha-apex-backend-optimization/screenshot-11.webp", alt: "FASHA — screenshot 11" },
        { src: "/projects/fasha-apex-backend-optimization/screenshot-12.webp", alt: "FASHA — screenshot 12" },
        { src: "/projects/fasha-apex-backend-optimization/screenshot-13.webp", alt: "FASHA — screenshot 13" },
        { src: "/projects/fasha-apex-backend-optimization/screenshot-14.webp", alt: "FASHA — screenshot 14" },
        { src: "/projects/fasha-apex-backend-optimization/screenshot-15.webp", alt: "FASHA — screenshot 15" },
        { src: "/projects/fasha-apex-backend-optimization/screenshot-16.webp", alt: "FASHA — screenshot 16" },
        { src: "/projects/fasha-apex-backend-optimization/screenshot-17.webp", alt: "FASHA — screenshot 17" },
        { src: "/projects/fasha-apex-backend-optimization/screenshot-18.webp", alt: "FASHA — screenshot 18" },
        { src: "/projects/fasha-apex-backend-optimization/screenshot-19.webp", alt: "FASHA — screenshot 19" },
    ],
    locales: {
      en: {
        heroSubtitle: "Apex backend optimization (FASHA)",
        sections: [
          {
            type: "text",
            title: "Context",
            paragraphs: [
              "FASHA (global clothing distribution) was experiencing performance and reliability issues in their Salesforce CRM backend.",
              "Weekly batch jobs became slow after product price updates, users reported freezes when editing Accounts and Orders, and the codebase lacked structure (naming conventions, overly long classes)."
            ]
          },
          {
            type: "bullets",
            title: "Client needs",
            items: [
              "Optimize batch processing that recalculates Account revenue after product price changes.",
              "Prevent blocking behaviors during concurrent edits on Accounts and Orders.",
              "Re-organize the Apex codebase for maintainability (clear responsibilities, consistent naming)."
            ]
          },
          {
            type: "bullets",
            title: "Implementation",
            items: [
              "Refactor triggers into a handler/service architecture: keep triggers thin and move DML/SOQL to dedicated classes (bulk-safe patterns).",
              "Bulkify calculations (revenue / net amount) using collections & maps; consolidate queries and avoid SOQL/DML inside loops.",
              "Optimize SOQL on Orders with selective filters and safer batch logic to handle larger volumes without timeouts."
            ]
          },
          {
            type: "metrics",
            title: "Quality & proof",
            items: [
              { label: "Skills validated (jury)", value: "2/2" },
              { label: "SOQL/DML in loops", value: "0" },
              { label: "Test coverage", value: "Good (jury feedback)" }
            ]
          },
          {
            type: "text",
            title: "Reviewer notes",
            paragraphs: [
              "The jury highlighted functional batch + controller, correct revenue/net calculations, and the ability to process multiple order lines successfully, with optimized SOQL and solid automated tests."
            ]
          },
          {
            type: "resources",
            title: "Deliverables & evidence",
            items: [
              { label: "Project brief (DOCX)", href: "/docs/projects/fasha-apex-backend-optimization/brief.docx" },
              { label: "Framing note (PDF)", href: "/docs/projects/fasha-apex-backend-optimization/note-de-cadrage.pdf" },
              { label: "Repository link (TXT)", href: "/docs/projects/fasha-apex-backend-optimization/repository.txt" }
            ]
          }
        ]
      },
      fr: {
        heroSubtitle: "Optimisation backend Apex (FASHA)",
        sections: [
          {
            type: "text",
            title: "Contexte",
            paragraphs: [
              "FASHA (distribution de vêtements) rencontrait des problèmes de performance et de fiabilité sur le backend Salesforce.",
              "Des batchs hebdomadaires devenaient trop lents après mise à jour des prix produits, l’application se bloquait lors de la modification simultanée des Comptes et Commandes, et le code était peu structuré (naming, classes trop longues)."
            ]
          },
          {
            type: "bullets",
            title: "Besoins du client",
            items: [
              "Optimiser les batchs qui recalculent le chiffre d’affaires des comptes après modification des prix produits.",
              "Éviter les comportements bloquants lors des éditions concurrentes sur Comptes et Commandes.",
              "Réorganiser le code Apex pour améliorer la maintenabilité (responsabilités claires, conventions de nommage)."
            ]
          },
          {
            type: "bullets",
            title: "Mise en œuvre",
            items: [
              "Refactorisation en architecture trigger → handler/services : triggers “minces”, DML/SOQL déplacés dans des classes dédiées (bulk-safe).",
              "Bulkification des calculs (CA / montant net) via collections & maps ; consolidation des requêtes ; suppression de tout SOQL/DML dans les boucles.",
              "Optimisation des requêtes sur les commandes (filtres sélectifs) et sécurisation du batch pour traiter des volumes plus importants sans timeout."
            ]
          },
          {
            type: "metrics",
            title: "Qualité & preuves",
            items: [
              { label: "Compétences validées (jury)", value: "2/2" },
              { label: "SOQL/DML dans les boucles", value: "0" },
              { label: "Couverture de tests", value: "Bonne (retour jury)" }
            ]
          },
          {
            type: "text",
            title: "Retour d’évaluation",
            paragraphs: [
              "Le jury souligne : triggers sans opérations BD/DML (placées dans des classes séparées), code bien testé avec une bonne couverture, calculs CA/montant net corrects, batch + contrôleur fonctionnels, requêtes SOQL optimisées avec filtre et capacité à traiter plusieurs lignes de commande."
            ]
          },
          {
            type: "resources",
            title: "Livrables & preuves",
            items: [
              { label: "Brief du projet (DOCX)", href: "/docs/projects/fasha-apex-backend-optimization/brief.docx" },
              { label: "Note de cadrage (PDF)", href: "/docs/projects/fasha-apex-backend-optimization/note-de-cadrage.pdf" },
              { label: "Lien du dépôt (TXT)", href: "/docs/projects/fasha-apex-backend-optimization/repository.txt" }
            ]
          }
        ]
      },
      es: {
        heroSubtitle: "Optimización de backend Apex (FASHA)",
        sections: [
          {
            type: "text",
            title: "Contexto",
            paragraphs: [
              "FASHA (distribución de ropa) presentaba problemas de rendimiento y fiabilidad en el backend de Salesforce.",
              "Los batches semanales se volvían demasiado lentos tras las actualizaciones de precios de productos, la aplicación se bloqueaba al editar simultáneamente Cuentas y Pedidos, y el código estaba poco estructurado (naming, clases demasiado largas)."
            ]
          },
          {
            type: "bullets",
            title: "Necesidades del cliente",
            items: [
              "Optimizar los batches que recalculan la facturación de las cuentas tras cambios de precio de los productos.",
              "Evitar comportamientos bloqueantes durante ediciones concurrentes en Cuentas y Pedidos.",
              "Reorganizar el código Apex para mejorar la mantenibilidad (responsabilidades claras, convenciones de nombres)."
            ]
          },
          {
            type: "bullets",
            title: "Implementación",
            items: [
              "Refactorización en arquitectura trigger → handler/servicios: triggers «ligeros», DML/SOQL trasladados a clases dedicadas (bulk-safe).",
              "Bulkificación de los cálculos (facturación / importe neto) mediante colecciones y maps; consolidación de consultas; eliminación de todo SOQL/DML en bucles.",
              "Optimización de las consultas sobre pedidos (filtros selectivos) y refuerzo del batch para procesar mayores volúmenes sin timeout."
            ]
          },
          {
            type: "metrics",
            title: "Calidad y evidencias",
            items: [
              { label: "Competencias validadas (jurado)", value: "2/2" },
              { label: "SOQL/DML en bucles", value: "0" },
              { label: "Cobertura de pruebas", value: "Buena (feedback del jurado)" }
            ]
          },
          {
            type: "text",
            title: "Comentarios de la evaluación",
            paragraphs: [
              "El jurado destaca: triggers sin operaciones de BD/DML (trasladadas a clases separadas), código bien testeado con buena cobertura, cálculos de facturación/importe neto correctos, batch + controlador funcionales, consultas SOQL optimizadas con filtro y capacidad de procesar varias líneas de pedido."
            ]
          },
          {
            type: "resources",
            title: "Entregables y evidencias",
            items: [
              { label: "Brief del proyecto (DOCX)", href: "/docs/projects/fasha-apex-backend-optimization/brief.docx" },
              { label: "Nota de encuadre (PDF)", href: "/docs/projects/fasha-apex-backend-optimization/note-de-cadrage.pdf" },
              { label: "Enlace del repositorio (TXT)", href: "/docs/projects/fasha-apex-backend-optimization/repository.txt" }
            ]
          }
        ]
      }
    }
  },
  {
    slug: "wirebright-visualforce-to-lightning",
    gallery: [
        { src: "/projects/wirebright-visualforce-to-lightning/cover.png", alt: "Wirebright — cover" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-1.png", alt: "Wirebright — screenshot 1" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-2.png", alt: "Wirebright — screenshot 2" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-3.png", alt: "Wirebright — screenshot 3" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-4.png", alt: "Wirebright — screenshot 4" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-5.png", alt: "Wirebright — screenshot 5" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-6.png", alt: "Wirebright — screenshot 6" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-7.png", alt: "Wirebright — screenshot 7" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-8.png", alt: "Wirebright — screenshot 8" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-9.png", alt: "Wirebright — screenshot 9" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-10.png", alt: "Wirebright — screenshot 10" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-11.png", alt: "Wirebright — screenshot 11" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-12.png", alt: "Wirebright — screenshot 12" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-13.png", alt: "Wirebright — screenshot 13" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-14.png", alt: "Wirebright — screenshot 14" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-15.jpg", alt: "Wirebright — screenshot 15" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-16.png", alt: "Wirebright — screenshot 16" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-17.png", alt: "Wirebright — screenshot 17" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-18.png", alt: "Wirebright — screenshot 18" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-19.png", alt: "Wirebright — screenshot 19" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-20.png", alt: "Wirebright — screenshot 20" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-21.png", alt: "Wirebright — screenshot 21" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-22.png", alt: "Wirebright — screenshot 22" },
        { src: "/projects/wirebright-visualforce-to-lightning/screenshot-23.png", alt: "Wirebright — screenshot 23" },
    ],
    locales: {
      en: {
        heroSubtitle: "Visualforce to Lightning migration (WireBright)",
        sections: [
          {
            type: "text",
            title: "Context",
            paragraphs: [
              "EG Manufacturing was using Salesforce Classic with custom Visualforce pages and JavaScript buttons.",
              "The goal was to migrate to the Lightning Experience to unlock newer capabilities, modernize the UX, and keep business behavior equivalent.",
              "The work includes a migration plan (specifications), before/after proof with screenshots, and the first conversions (Visualforce + JavaScript button)."
            ]
          },
          {
            type: "bullets",
            title: "Objectives",
            items: [
              "Identify all Classic components impacted by Lightning migration (Visualforce pages, JavaScript buttons, custom UI).",
              "Propose conversion options with pros/cons (Lightning patterns) and estimate effort per component.",
              "Deliver before/after evidence and explain Lightning benefits for each screen.",
              "Start by converting the Visualforce pages and JavaScript buttons that would not work in Lightning."
            ]
          },
          {
            type: "bullets",
            title: "Solution",
            items: [
              "Technical & functional specifications: component inventory + recommended conversion approach.",
              "Conversion strategy for legacy JavaScript buttons (Lightning-friendly actions / patterns).",
              "Validation through side-by-side screenshots (Classic vs Lightning) and functional checks."
            ]
          },
          {
            type: "metrics",
            title: "Impact & proof",
            items: [
              { label: "Screens compared", value: "3 (before/after)" },
              { label: "Legacy components migrated", value: "2 (Visualforce + JS button)" },
              { label: "Skills validated (jury)", value: "2/2" }
            ]
          },
          {
            type: "resources",
            title: "Deliverables & evidence",
            items: [
              { label: "Technical & functional specs (PDF)", href: "/docs/projects/wirebright-visualforce-to-lightning/specifications.pdf" },
              { label: "Installation manual (PDF)", href: "/docs/projects/wirebright-visualforce-to-lightning/installation-manual.pdf" },
              { label: "Lightning advantages (PDF)", href: "/docs/projects/wirebright-visualforce-to-lightning/lightning-advantages.pdf" },
              { label: "Before/after screenshots (ZIP)", href: "/docs/projects/wirebright-visualforce-to-lightning/screenshots.zip" },
              { label: "Project request / brief (DOCX)", href: "/docs/projects/wirebright-visualforce-to-lightning/brief.docx" }
            ]
          },
          {
            type: "text",
            title: "Jury feedback",
            paragraphs: [
              "The assessment validated both targeted skills: producing technical/functional documentation and using wireframes/screens evidence for design & migration decisions.",
              "Highlights included a complete solution proposal with clear pros/cons and effort estimates, plus successful migration of the key components."
            ]
          },
          {
            type: "bullets",
            title: "Stack & tools",
            items: [
              "Salesforce Classic → Lightning Experience (Visualforce, Lightning patterns).",
              "Documentation-driven delivery (specs, install guide, evidence pack)."
            ]
          }
        ]
      },
      fr: {
        heroSubtitle: "Migration Visualforce → Lightning (WireBright)",
        sections: [
          {
            type: "text",
            title: "Contexte",
            paragraphs: [
              "EG Manufacturing utilisait Salesforce Classic avec des pages Visualforce et des boutons JavaScript personnalisés.",
              "L’objectif était de migrer vers l’expérience Lightning afin d’accéder aux fonctionnalités récentes, moderniser l’UX et conserver un comportement métier équivalent.",
              "Le travail couvre un plan de migration (spécifications), des preuves avant/après (captures), et les premières conversions (Visualforce + bouton JavaScript)."
            ]
          },
          {
            type: "bullets",
            title: "Objectifs",
            items: [
              "Identifier les composants Classic impactés par la migration Lightning (pages Visualforce, boutons JavaScript, UI custom).",
              "Proposer des options de conversion avec pour/contre (patterns Lightning) et estimer l’effort par composant.",
              "Fournir des preuves avant/après et expliquer les avantages de Lightning pour chaque écran.",
              "Commencer par convertir les pages Visualforce et les boutons JavaScript qui ne fonctionneraient plus en Lightning."
            ]
          },
          {
            type: "bullets",
            title: "Solution",
            items: [
              "Spécifications techniques et fonctionnelles : inventaire des composants + proposition de conversion.",
              "Stratégie de conversion des boutons JavaScript (actions/patterns compatibles Lightning).",
              "Validation via captures d’écran comparatives (Classic vs Lightning) et contrôles fonctionnels."
            ]
          },
          {
            type: "metrics",
            title: "Impact & preuves",
            items: [
              { label: "Écrans comparés", value: "3 (avant/après)" },
              { label: "Composants legacy migrés", value: "2 (Visualforce + bouton JS)" },
              { label: "Compétences validées (jury)", value: "2/2" }
            ]
          },
          {
            type: "resources",
            title: "Livrables & preuves",
            items: [
              { label: "Spécifications techniques & fonctionnelles (PDF)", href: "/docs/projects/wirebright-visualforce-to-lightning/specifications.pdf" },
              { label: "Manuel d’installation (PDF)", href: "/docs/projects/wirebright-visualforce-to-lightning/installation-manual.pdf" },
              { label: "Avantages de Lightning (PDF)", href: "/docs/projects/wirebright-visualforce-to-lightning/lightning-advantages.pdf" },
              { label: "Pack de captures avant/après (ZIP)", href: "/docs/projects/wirebright-visualforce-to-lightning/screenshots.zip" },
              { label: "Demande / brief projet (DOCX)", href: "/docs/projects/wirebright-visualforce-to-lightning/brief.docx" }
            ]
          },
          {
            type: "text",
            title: "Retour du jury",
            paragraphs: [
              "Les 2 compétences visées ont été validées : intégration de wireframes / preuves par captures, et production d’une documentation technique & fonctionnelle.",
              "Points forts relevés : bonne compréhension, proposition de solutions complète (pour/contre + estimations), et migration effective des composants clés."
            ]
          },
          {
            type: "bullets",
            title: "Stack & outils",
            items: [
              "Salesforce Classic → Lightning Experience (Visualforce, patterns Lightning).",
              "Delivery orienté documentation (spécifications, guide d’installation, pack de preuves)."
            ]
          }
        ]
      },
      es: {
        heroSubtitle: "Migración de Visualforce a Lightning (WireBright)",
        sections: [
          {
            type: "text",
            title: "Contexto",
            paragraphs: [
              "EG Manufacturing utilizaba Salesforce Classic con páginas Visualforce y botones JavaScript personalizados.",
              "El objetivo era migrar a Lightning Experience para acceder a las funcionalidades recientes, modernizar la UX y mantener un comportamiento de negocio equivalente.",
              "El trabajo incluye un plan de migración (especificaciones), evidencias antes/después (capturas) y las primeras conversiones (Visualforce + botón JavaScript)."
            ]
          },
          {
            type: "bullets",
            title: "Objetivos",
            items: [
              "Identificar los componentes Classic afectados por la migración a Lightning (páginas Visualforce, botones JavaScript, UI personalizada).",
              "Proponer opciones de conversión con pros/contras (patrones Lightning) y estimar el esfuerzo por componente.",
              "Proporcionar evidencias antes/después y explicar las ventajas de Lightning para cada pantalla.",
              "Empezar convirtiendo las páginas Visualforce y los botones JavaScript que dejarían de funcionar en Lightning."
            ]
          },
          {
            type: "bullets",
            title: "Solución",
            items: [
              "Especificaciones técnicas y funcionales: inventario de componentes + propuesta de conversión.",
              "Estrategia de conversión de los botones JavaScript (acciones/patrones compatibles con Lightning).",
              "Validación mediante capturas de pantalla comparativas (Classic vs Lightning) y controles funcionales."
            ]
          },
          {
            type: "metrics",
            title: "Impacto y evidencias",
            items: [
              { label: "Pantallas comparadas", value: "3 (antes/después)" },
              { label: "Componentes legacy migrados", value: "2 (Visualforce + botón JS)" },
              { label: "Competencias validadas (jurado)", value: "2/2" }
            ]
          },
          {
            type: "resources",
            title: "Entregables y evidencias",
            items: [
              { label: "Especificaciones técnicas y funcionales (PDF)", href: "/docs/projects/wirebright-visualforce-to-lightning/specifications.pdf" },
              { label: "Manual de instalación (PDF)", href: "/docs/projects/wirebright-visualforce-to-lightning/installation-manual.pdf" },
              { label: "Ventajas de Lightning (PDF)", href: "/docs/projects/wirebright-visualforce-to-lightning/lightning-advantages.pdf" },
              { label: "Capturas antes/después (ZIP)", href: "/docs/projects/wirebright-visualforce-to-lightning/screenshots.zip" },
              { label: "Solicitud / brief del proyecto (DOCX)", href: "/docs/projects/wirebright-visualforce-to-lightning/brief.docx" }
            ]
          },
          {
            type: "text",
            title: "Comentarios del jurado",
            paragraphs: [
              "Se validaron las 2 competencias evaluadas: integración de wireframes / evidencias mediante capturas, y producción de documentación técnica y funcional.",
              "Puntos fuertes señalados: buena comprensión, propuesta de solución completa (pros/contras + estimaciones), y migración efectiva de los componentes clave."
            ]
          },
          {
            type: "bullets",
            title: "Stack y herramientas",
            items: [
              "Salesforce Classic → Lightning Experience (Visualforce, patrones Lightning).",
              "Entrega orientada a documentación (especificaciones, guía de instalación, pack de evidencias)."
            ]
          }
        ]
      }
    }
  },
  {
    slug: "avenir-telecom-lightning-app",
    gallery: [
        { src: "/projects/avenir-telecom-lightning-app/cover.webp", alt: "Avenir Telecom — Lightning — cover" },
        { src: "/projects/avenir-telecom-lightning-app/screenshot-1.webp", alt: "Avenir Telecom — Lightning — screenshot 1" },
        { src: "/projects/avenir-telecom-lightning-app/screenshot-2.webp", alt: "Avenir Telecom — Lightning — screenshot 2" },
        { src: "/projects/avenir-telecom-lightning-app/screenshot-3.webp", alt: "Avenir Telecom — Lightning — screenshot 3" },
    ],
    locales: {
      en: {
        heroSubtitle: "Lightning app delivery, test strategy & continuous improvements (Avenir Télécom)",
        sections: [
          {
            type: "text",
            title: "Context",
            paragraphs: [
              "Following an internal audit, Avenir Télécom’s consumer sales teams for the South zone needed a new Lightning application aligned with their day-to-day process.",
              "I led the implementation approach and coordinated a small delivery team (3 Salesforce developers: senior / confirmed / junior) with an Agile workflow: first plan and test strategy, then continuous improvements after a 3‑month pilot."
            ]
          },
          {
            type: "bullets",
            title: "Business needs",
            items: [
              "Define a clear delivery strategy based on the functional brief.",
              "Build a structured Product Backlog (Scrum best practices) with business value, priority and estimates.",
              "Provide a unit + integration test workbook: what to test, associated test classes, and guidelines for reliable tests.",
              "After a 3‑month user pilot, capture improvement requests and build a Kanban backlog with clear statuses and WIP limits."
            ]
          },
          {
            type: "timeline",
            title: "Implementation approach",
            steps: [
              {
                title: "Phase 1 — Plan & quality strategy",
                description: "Backlog (Scrum), delivery plan and a test workbook (unit + integration) to ensure the Lightning app can be delivered and validated with a repeatable process."
              },
              {
                title: "Phase 2 — Continuous improvements",
                description: "After 3 months of real usage, consolidate change requests and produce a prioritized Kanban backlog (evolutions, fixes, enhancements) with clear statuses and WIP limits."
              }
            ]
          },
          {
            type: "metrics",
            title: "What this project demonstrates",
            items: [
              { label: "Backlog quality", value: "Detailed, prioritized & estimated", note: "Business value + order + effort" },
              { label: "Testing readiness", value: "Complete test workbook", note: "Unit + integration mapping to features" },
              { label: "Continuous delivery mindset", value: "Kanban with WIP limits", note: "Clear workflow and prioritization" }
            ]
          },
          {
            type: "bullets",
            title: "Stack & methods",
            items: [
              "Salesforce Lightning (App Builder & configuration).",
              "Agile planning: Scrum Product Backlog, then Kanban for evolutions.",
              "Quality artifacts: unit + integration test plan and best practices."
            ]
          },
          {
            type: "resources",
            title: "Deliverables & proofs",
            items: [
              { label: "Functional brief (DOCX)", href: "/docs/projects/avenir-telecom-lightning-app/brief.docx" },
              { label: "Requirements (PDF)", href: "/docs/projects/avenir-telecom-lightning-app/cahier-des-charges.pdf" },
              { label: "Implementation strategy (PDF)", href: "/docs/projects/avenir-telecom-lightning-app/strategy-implementation.pdf" },
              { label: "Initial backlog (XLSX)", href: "/docs/projects/avenir-telecom-lightning-app/backlog-initial.xlsx" },
              { label: "Test workbook (XLSX)", href: "/docs/projects/avenir-telecom-lightning-app/test-workbook.xlsx" },
              { label: "Audit report (PDF)", href: "/docs/projects/avenir-telecom-lightning-app/audit-report.pdf" },
              { label: "Change requests list (PDF)", href: "/docs/projects/avenir-telecom-lightning-app/requests-evolutions-corrections.pdf" },
              { label: "Evolutions backlog (Kanban export, PDF)", href: "/docs/projects/avenir-telecom-lightning-app/backlog-evolutions-kanban.pdf" },
              { label: "Evolutions backlog (XLSX)", href: "/docs/projects/avenir-telecom-lightning-app/backlog-evolutions.xlsx" }
            ]
          }
        ]
      },
      fr: {
        heroSubtitle: "Livraison d’une application Lightning, stratégie de tests & améliorations continues (Avenir Télécom)",
        sections: [
          {
            type: "text",
            title: "Contexte",
            paragraphs: [
              "Suite à un audit interne, les équipes de vente grand public de la zone Sud d’Avenir Télécom avaient besoin d’une nouvelle application Lightning, mieux alignée sur leurs usages.",
              "J’ai cadré la stratégie d’implémentation et animé l’organisation de la delivery avec une petite équipe (3 développeurs Salesforce : senior / confirmé / junior) en deux temps : plan & qualité, puis backlog d’évolutions après 3 mois de pilote."
            ]
          },
          {
            type: "bullets",
            title: "Besoins métier",
            items: [
              "Définir une stratégie d’implémentation à partir du cahier des charges.",
              "Construire un Product Backlog (bonnes pratiques Scrum) : valeur business, priorité et chiffrage.",
              "Produire un cahier de tests unitaires et d’intégration : fonctionnalités à tester, classes de test associées, et exigences/bonnes pratiques.",
              "Après 3 mois d’utilisation, consolider les demandes et créer un backlog Kanban (évolutions / corrections) avec statuts et limites WIP."
            ]
          },
          {
            type: "timeline",
            title: "Approche d’implémentation",
            steps: [
              {
                title: "Phase 1 — Plan & stratégie de qualité",
                description: "Backlog Scrum, stratégie de delivery et cahier de tests (unitaires + intégration) pour garantir une mise en production cadrée et vérifiable."
              },
              {
                title: "Phase 2 — Améliorations continues",
                description: "Après 3 mois de tests côté commerciaux, consolidation des demandes et production d’un backlog Kanban priorisé (statuts distincts + limites WIP)."
              }
            ]
          },
          {
            type: "metrics",
            title: "Ce que démontre ce projet",
            items: [
              { label: "Qualité backlog", value: "Détaillé, priorisé & chiffré", note: "Valeur business + ordre + effort" },
              { label: "Préparation aux tests", value: "Cahier de tests complet", note: "Mapping fonctionnalités → classes" },
              { label: "Amélioration continue", value: "Kanban + limites WIP", note: "Flux de travail clair" }
            ]
          },
          {
            type: "bullets",
            title: "Stack & méthode",
            items: [
              "Salesforce Lightning (App Builder & configuration).",
              "Agile : Scrum (Product Backlog), puis Kanban pour les évolutions.",
              "Qualité : cahier de tests unitaires/intégration + bonnes pratiques."
            ]
          },
          {
            type: "resources",
            title: "Livrables & preuves",
            items: [
              { label: "Brief (DOCX)", href: "/docs/projects/avenir-telecom-lightning-app/brief.docx" },
              { label: "Cahier des charges (PDF)", href: "/docs/projects/avenir-telecom-lightning-app/cahier-des-charges.pdf" },
              { label: "Stratégie d’implémentation (PDF)", href: "/docs/projects/avenir-telecom-lightning-app/strategy-implementation.pdf" },
              { label: "Backlog initial (XLSX)", href: "/docs/projects/avenir-telecom-lightning-app/backlog-initial.xlsx" },
              { label: "Cahier de tests (XLSX)", href: "/docs/projects/avenir-telecom-lightning-app/test-workbook.xlsx" },
              { label: "Rapport d’audit (PDF)", href: "/docs/projects/avenir-telecom-lightning-app/audit-report.pdf" },
              { label: "Demandes d’évolutions/corrections (PDF)", href: "/docs/projects/avenir-telecom-lightning-app/requests-evolutions-corrections.pdf" },
              { label: "Backlog d’évolutions (export Kanban, PDF)", href: "/docs/projects/avenir-telecom-lightning-app/backlog-evolutions-kanban.pdf" },
              { label: "Backlog d’évolutions (XLSX)", href: "/docs/projects/avenir-telecom-lightning-app/backlog-evolutions.xlsx" }
            ]
          },
          {
            type: "bullets",
            title: "Retour jury (synthèse)",
            items: [
              "Cahier de tests complet.",
              "Backlog unique, détaillé, priorisé et chiffré.",
              "Flux de travail clair (statuts distincts) et limites WIP respectées.",
              "Demandes classées par priorité, outil adapté utilisé."
            ]
          }
        ]
      },
      es: {
        heroSubtitle: "Entrega de una aplicación Lightning, estrategia de pruebas y mejoras continuas (Avenir Télécom)",
        sections: [
          {
            type: "text",
            title: "Contexto",
            paragraphs: [
              "Tras una auditoría interna, los equipos de venta al consumidor de la zona Sur de Avenir Télécom necesitaban una nueva aplicación Lightning, mejor alineada con sus usos diarios.",
              "Definí la estrategia de implementación y coordiné la organización de la entrega con un pequeño equipo (3 desarrolladores Salesforce: senior / confirmado / júnior) en dos fases: plan y calidad, y luego backlog de evoluciones tras 3 meses de piloto."
            ]
          },
          {
            type: "bullets",
            title: "Necesidades de negocio",
            items: [
              "Definir una estrategia de implementación a partir del pliego de requisitos.",
              "Construir un Product Backlog (buenas prácticas Scrum): valor de negocio, prioridad y estimación.",
              "Producir un cuaderno de pruebas unitarias y de integración: funcionalidades a probar, clases de test asociadas y buenas prácticas/requisitos.",
              "Tras 3 meses de uso, consolidar las solicitudes y crear un backlog Kanban (evoluciones / correcciones) con estados y límites WIP."
            ]
          },
          {
            type: "timeline",
            title: "Enfoque de implementación",
            steps: [
              {
                title: "Fase 1 — Plan y estrategia de calidad",
                description: "Backlog Scrum, estrategia de entrega y cuaderno de pruebas (unitarias + integración) para garantizar una puesta en producción controlada y verificable."
              },
              {
                title: "Fase 2 — Mejoras continuas",
                description: "Tras 3 meses de uso por parte de los comerciales, consolidación de las solicitudes y producción de un backlog Kanban priorizado (estados distintos + límites WIP)."
              }
            ]
          },
          {
            type: "metrics",
            title: "Lo que demuestra este proyecto",
            items: [
              { label: "Calidad del backlog", value: "Detallado, priorizado y estimado", note: "Valor de negocio + orden + esfuerzo" },
              { label: "Preparación para pruebas", value: "Cuaderno de pruebas completo", note: "Mapeo funcionalidades → clases" },
              { label: "Mejora continua", value: "Kanban + límites WIP", note: "Flujo de trabajo claro" }
            ]
          },
          {
            type: "bullets",
            title: "Stack y método",
            items: [
              "Salesforce Lightning (App Builder y configuración).",
              "Ágil: Scrum (Product Backlog), luego Kanban para las evoluciones.",
              "Calidad: cuaderno de pruebas unitarias/integración + buenas prácticas."
            ]
          },
          {
            type: "resources",
            title: "Entregables y evidencias",
            items: [
              { label: "Brief (DOCX)", href: "/docs/projects/avenir-telecom-lightning-app/brief.docx" },
              { label: "Pliego de requisitos (PDF)", href: "/docs/projects/avenir-telecom-lightning-app/cahier-des-charges.pdf" },
              { label: "Estrategia de implementación (PDF)", href: "/docs/projects/avenir-telecom-lightning-app/strategy-implementation.pdf" },
              { label: "Backlog inicial (XLSX)", href: "/docs/projects/avenir-telecom-lightning-app/backlog-initial.xlsx" },
              { label: "Cuaderno de pruebas (XLSX)", href: "/docs/projects/avenir-telecom-lightning-app/test-workbook.xlsx" },
              { label: "Informe de auditoría (PDF)", href: "/docs/projects/avenir-telecom-lightning-app/audit-report.pdf" },
              { label: "Solicitudes de evoluciones/correcciones (PDF)", href: "/docs/projects/avenir-telecom-lightning-app/requests-evolutions-corrections.pdf" },
              { label: "Backlog de evoluciones (export Kanban, PDF)", href: "/docs/projects/avenir-telecom-lightning-app/backlog-evolutions-kanban.pdf" },
              { label: "Backlog de evoluciones (XLSX)", href: "/docs/projects/avenir-telecom-lightning-app/backlog-evolutions.xlsx" }
            ]
          },
          {
            type: "bullets",
            title: "Feedback del jurado (síntesis)",
            items: [
              "Cuaderno de pruebas completo.",
              "Backlog único, detallado, priorizado y estimado.",
              "Flujo de trabajo claro (estados distintos) y límites WIP respetados.",
              "Solicitudes clasificadas por prioridad, herramienta adecuada utilizada."
            ]
          }
        ]
      }
    }
  },
  {
    slug: "tours-for-life-salesforce-solution",
    gallery: [
        { src: "/projects/tours-for-life-salesforce-solution/cover.png", alt: "Tours for Life — cover" },
        { src: "/projects/tours-for-life-salesforce-solution/screenshot-1.png", alt: "Tours for Life — screenshot 1" },
        { src: "/projects/tours-for-life-salesforce-solution/screenshot-2.png", alt: "Tours for Life — screenshot 2" },
        { src: "/projects/tours-for-life-salesforce-solution/screenshot-3.png", alt: "Tours for Life — screenshot 3" },
        { src: "/projects/tours-for-life-salesforce-solution/screenshot-4.png", alt: "Tours for Life — screenshot 4" },
        { src: "/projects/tours-for-life-salesforce-solution/screenshot-5.png", alt: "Tours for Life — screenshot 5" },
        { src: "/projects/tours-for-life-salesforce-solution/screenshot-6.png", alt: "Tours for Life — screenshot 6" },
        { src: "/projects/tours-for-life-salesforce-solution/screenshot-7.png", alt: "Tours for Life — screenshot 7" },
        { src: "/projects/tours-for-life-salesforce-solution/screenshot-8.png", alt: "Tours for Life — screenshot 8" },
        { src: "/projects/tours-for-life-salesforce-solution/screenshot-9.png", alt: "Tours for Life — screenshot 9" },
        { src: "/projects/tours-for-life-salesforce-solution/screenshot-10.png", alt: "Tours for Life — screenshot 10" },
        { src: "/projects/tours-for-life-salesforce-solution/screenshot-11.png", alt: "Tours for Life — screenshot 11" },
        { src: "/projects/tours-for-life-salesforce-solution/screenshot-12.png", alt: "Tours for Life — screenshot 12" },
        { src: "/projects/tours-for-life-salesforce-solution/screenshot-13.png", alt: "Tours for Life — screenshot 13" },
        { src: "/projects/tours-for-life-salesforce-solution/screenshot-14.webp", alt: "Tours for Life — screenshot 14" },
        { src: "/projects/tours-for-life-salesforce-solution/screenshot-15.webp", alt: "Tours for Life — screenshot 15" },
    ],
    locales: {
      en: {
        heroSubtitle: "Salesforce solution design (Tours For Life)",
        sections: [
          {
            type: "text",
            title: "Context",
            paragraphs: [
              "Tours For Life wanted to scale its commercial activity while simplifying day‑to‑day travel operations. The goal was to design a Salesforce solution that sales teams can actually use: lead capture, conversion into travelers, trip management, reporting and dashboards.",
              "During the scope refinement, an additional need was added: managing the bus fleet in Salesforce, controlled by sales directors and linked to trips (a bus can be used for multiple trips)."
            ]
          },
          {
            type: "bullets",
            title: "Key needs (client brief)",
            items: [
              "Create and qualify prospects in Salesforce (Lead).",
              "Convert prospects into travelers (Person Accounts) and centralize customer information.",
              "Create and manage trips for travelers, including capacity and available seats.",
              "Build reports and dashboards for pipeline and operations follow‑up.",
              "Manage a bus fleet and associate buses to trips (many trips per bus)."
            ]
          },
          {
            type: "text",
            title: "Solution overview",
            paragraphs: [
              "Data model and automation were designed around the full lifecycle: Lead → Traveler → Trip. The implementation uses standard objects when possible (Lead, Activity) and introduces custom objects for travel operations (Trip) and fleet management (Bus Fleet).",
              "A record‑triggered Flow was implemented to automatically decrement the field “Available seats” when travelers are assigned to a trip, ensuring reliable capacity tracking."
            ]
          },
          {
            type: "bullets",
            title: "Data model highlights",
            items: [
              "Prospects are stored as Leads and converted to Person Accounts (travelers).",
              "Trips are created and linked to travelers for operational follow‑up.",
              "Bus Fleet custom object: bus number (Text), capacity (Number), trip lookup (Lookup to Trip).",
              "Reporting model supports dashboards on the Home page (e.g., key KPIs + operational views)."
            ]
          },
          {
            type: "text",
            title: "Security model (roles, profiles, access)",
            paragraphs: [
              "Access was designed for two main audiences: sales representatives and sales directors. In the delivered setup, two profiles were created (Sales Rep and Sales Director) and three role levels for sales teams to reflect hierarchy.",
              "With hindsight, a more scalable approach would be to keep a single Sales profile and grant director capabilities via a Permission Set — this reduces maintenance and keeps access management more flexible."
            ]
          },
          {
            type: "metrics",
            title: "What this project demonstrates",
            items: [
              {
                label: "Validated competencies",
                value: "4/4",
                note: "Needs analysis, technical choices, data model & business rules, detailed specifications."
              },
              {
                label: "Automation delivered",
                value: "Flow",
                note: "Automatic decrement of “Available seats” to ensure reliable capacity tracking."
              },
              {
                label: "Security design",
                value: "2 profiles + 3 roles",
                note: "Documented object access and hierarchy (with an explicit improvement suggestion)."
              }
            ]
          },
          {
            type: "resources",
            title: "Deliverables & evidence",
            items: [
              {
                label: "Detailed specifications (PDF)",
                href: "/docs/projects/tours-for-life-salesforce-solution/specifications.pdf",
                note: "Functional + technical specs aligned with the client brief."
              },
              {
                label: "Presentation (PPTX)",
                href: "/docs/projects/tours-for-life-salesforce-solution/presentation.pptx",
                note: "Client-ready walkthrough of the application and choices."
              },
              {
                label: "Data model (PNG)",
                href: "/docs/projects/tours-for-life-salesforce-solution/data-model.png",
                note: "Schema screenshot showing objects and relationships."
              },
              {
                label: "Requirements (PDF)",
                href: "/docs/projects/tours-for-life-salesforce-solution/cahier-des-charges.pdf",
                note: "Original client brief & scope additions (fleet management)."
              },
              {
                label: "Sandbox creation guide (PDF)",
                href: "/docs/projects/tours-for-life-salesforce-solution/sandbox-creation-guide.pdf",
                note: "Installation steps used to prepare a demo environment."
              }
            ]
          }
        ]
      },
      fr: {
        heroSubtitle: "Conception d’une solution Salesforce (Tours For Life)",
        sections: [
          {
            type: "text",
            title: "Contexte",
            paragraphs: [
              "Tours For Life souhaitait accélérer son développement commercial tout en simplifiant la gestion des voyages (processus aujourd’hui trop complexe). L’objectif était de concevoir une solution Salesforce réellement utilisable par les commerciaux : création de prospects, conversion en voyageurs, gestion des voyages, rapports et tableaux de bord.",
              "Lors du cadrage, un besoin complémentaire a été ajouté : gérer la flotte de bus directement dans Salesforce, pilotée par les directeurs commerciaux et reliée aux voyages (un même bus pouvant servir à plusieurs voyages)."
            ]
          },
          {
            type: "bullets",
            title: "Besoins clés (brief client)",
            items: [
              "Créer et qualifier des prospects dans Salesforce (Lead).",
              "Convertir les prospects en voyageurs (Person Accounts) et centraliser les informations client.",
              "Créer et gérer des voyages pour les voyageurs, avec suivi de capacité et des places disponibles.",
              "Produire des rapports et tableaux de bord pour le pilotage (commercial & opérationnel).",
              "Gérer une flotte de bus et relier les bus aux voyages (plusieurs voyages par bus)."
            ]
          },
          {
            type: "text",
            title: "Vue d’ensemble de la solution",
            paragraphs: [
              "Le modèle de données et l’automatisation ont été conçus autour du cycle complet : Lead → Voyageur → Voyage. L’implémentation privilégie les objets standards (Lead, Activités) et introduit des objets personnalisés pour la partie opérationnelle (Voyage) ainsi que pour la gestion de flotte (Flotte de bus).",
              "Un Flow record‑triggered a été mis en place pour décrémenter automatiquement le champ « Nombre de places disponibles » lorsque des voyageurs sont affectés à un voyage, garantissant un suivi de capacité fiable."
            ]
          },
          {
            type: "bullets",
            title: "Points clés du modèle de données",
            items: [
              "Les prospects sont gérés via l’objet standard Lead, puis convertis en Person Accounts (voyageurs).",
              "Les voyages sont créés et associés aux voyageurs pour le suivi opérationnel.",
              "Nouvel objet « Flotte de bus » : numéro du bus (Texte), capacité (Nombre), lookup vers « Voyage ». ",
              "Le modèle est construit pour alimenter des dashboards sur la page d’accueil (KPIs + vues opérationnelles)."
            ]
          },
          {
            type: "text",
            title: "Sécurité (rôles, profils, accès)",
            paragraphs: [
              "Les accès ont été pensés pour deux populations : commerciaux et directeurs commerciaux. Dans la configuration livrée, deux profils ont été créés (Commercial et Directeur commercial) ainsi que trois rôles pour refléter la hiérarchie.",
              "Avec du recul, une approche plus scalable consiste à conserver un profil « Commercial » unique et à accorder les droits “directeur” via un Permission Set : cela réduit la maintenance et rend l’évolution des droits plus flexible."
            ]
          },
          {
            type: "metrics",
            title: "Ce que démontre ce projet",
            items: [
              {
                label: "Compétences validées",
                value: "4/4",
                note: "Analyse des besoins, choix techniques, modèle de données & règles métier, spécifications détaillées."
              },
              {
                label: "Automatisation livrée",
                value: "Flow",
                note: "Décrément automatique du « Nombre de places disponibles » pour un suivi fiable de la capacité."
              },
              {
                label: "Conception sécurité",
                value: "2 profils + 3 rôles",
                note: "Accès objets documentés et hiérarchie mise en place (avec proposition d’amélioration)."
              }
            ]
          },
          {
            type: "resources",
            title: "Livrables & preuves",
            items: [
              {
                label: "Spécifications détaillées (PDF)",
                href: "/docs/projects/tours-for-life-salesforce-solution/specifications.pdf",
                note: "Spécifications fonctionnelles + techniques alignées sur le cahier des charges."
              },
              {
                label: "Présentation (PPTX)",
                href: "/docs/projects/tours-for-life-salesforce-solution/presentation.pptx",
                note: "Support de présentation de la solution (cadrage, choix, démonstration)."
              },
              {
                label: "Modèle de données (PNG)",
                href: "/docs/projects/tours-for-life-salesforce-solution/data-model.png",
                note: "Capture du schéma (objets et relations)."
              },
              {
                label: "Cahier des charges (PDF)",
                href: "/docs/projects/tours-for-life-salesforce-solution/cahier-des-charges.pdf",
                note: "Brief initial + ajout de la gestion de flotte."
              },
              {
                label: "Guide de création de sandbox (PDF)",
                href: "/docs/projects/tours-for-life-salesforce-solution/sandbox-creation-guide.pdf",
                note: "Marche à suivre utilisée pour préparer un environnement de démonstration."
              }
            ]
          }
        ]
      },
      es: {
        heroSubtitle: "Diseño de una solución Salesforce (Tours For Life)",
        sections: [
          {
            type: "text",
            title: "Contexto",
            paragraphs: [
              "Tours For Life quería acelerar su desarrollo comercial simplificando a la vez la gestión de los viajes (proceso demasiado complejo). El objetivo era diseñar una solución Salesforce realmente utilizable por los comerciales: creación de prospectos, conversión en viajeros, gestión de viajes, informes y paneles de control.",
              "Durante el encuadre se añadió una necesidad adicional: gestionar la flota de autobuses directamente en Salesforce, controlada por los directores comerciales y vinculada a los viajes (un mismo autobús puede usarse en varios viajes)."
            ]
          },
          {
            type: "bullets",
            title: "Necesidades clave (brief del cliente)",
            items: [
              "Crear y calificar prospectos en Salesforce (Lead).",
              "Convertir los prospectos en viajeros (Person Accounts) y centralizar la información del cliente.",
              "Crear y gestionar viajes para los viajeros, con seguimiento de capacidad y plazas disponibles.",
              "Generar informes y paneles de control para el seguimiento comercial y operativo.",
              "Gestionar una flota de autobuses y vincular los autobuses a los viajes (varios viajes por autobús)."
            ]
          },
          {
            type: "text",
            title: "Visión general de la solución",
            paragraphs: [
              "El modelo de datos y la automatización se diseñaron en torno al ciclo completo: Lead → Viajero → Viaje. La implementación prioriza los objetos estándar (Lead, Actividades) e introduce objetos personalizados para la parte operativa (Viaje) y para la gestión de flota (Flota de autobuses).",
              "Se implementó un Flow record-triggered para decrementar automáticamente el campo «Plazas disponibles» cuando se asignan viajeros a un viaje, garantizando un seguimiento de capacidad fiable."
            ]
          },
          {
            type: "bullets",
            title: "Puntos clave del modelo de datos",
            items: [
              "Los prospectos se gestionan mediante el objeto estándar Lead y luego se convierten en Person Accounts (viajeros).",
              "Los viajes se crean y se asocian a los viajeros para el seguimiento operativo.",
              "Nuevo objeto «Flota de autobuses»: número del autobús (Texto), capacidad (Número), lookup hacia «Viaje».",
              "El modelo está construido para alimentar dashboards en la página de inicio (KPIs + vistas operativas)."
            ]
          },
          {
            type: "text",
            title: "Seguridad (roles, perfiles, accesos)",
            paragraphs: [
              "Los accesos se diseñaron para dos audiencias: comerciales y directores comerciales. En la configuración entregada se crearon dos perfiles (Comercial y Director comercial) y tres roles para reflejar la jerarquía.",
              "Con perspectiva, un enfoque más escalable consiste en mantener un único perfil «Comercial» y otorgar los permisos de director mediante un Permission Set: esto reduce el mantenimiento y hace más flexible la evolución de los accesos."
            ]
          },
          {
            type: "metrics",
            title: "Lo que demuestra este proyecto",
            items: [
              {
                label: "Competencias validadas",
                value: "4/4",
                note: "Análisis de necesidades, decisiones técnicas, modelo de datos y reglas de negocio, especificaciones detalladas."
              },
              {
                label: "Automatización entregada",
                value: "Flow",
                note: "Decremento automático de «Plazas disponibles» para un seguimiento fiable de la capacidad."
              },
              {
                label: "Diseño de seguridad",
                value: "2 perfiles + 3 roles",
                note: "Accesos a objetos documentados y jerarquía implementada (con propuesta de mejora)."
              }
            ]
          },
          {
            type: "resources",
            title: "Entregables y evidencias",
            items: [
              {
                label: "Especificaciones detalladas (PDF)",
                href: "/docs/projects/tours-for-life-salesforce-solution/specifications.pdf",
                note: "Especificaciones funcionales + técnicas alineadas con el pliego de requisitos."
              },
              {
                label: "Presentación (PPTX)",
                href: "/docs/projects/tours-for-life-salesforce-solution/presentation.pptx",
                note: "Soporte de presentación de la solución (encuadre, decisiones, demostración)."
              },
              {
                label: "Modelo de datos (PNG)",
                href: "/docs/projects/tours-for-life-salesforce-solution/data-model.png",
                note: "Captura del esquema (objetos y relaciones)."
              },
              {
                label: "Pliego de requisitos (PDF)",
                href: "/docs/projects/tours-for-life-salesforce-solution/cahier-des-charges.pdf",
                note: "Brief inicial + incorporación de la gestión de flota."
              },
              {
                label: "Guía de creación de sandbox (PDF)",
                href: "/docs/projects/tours-for-life-salesforce-solution/sandbox-creation-guide.pdf",
                note: "Procedimiento utilizado para preparar un entorno de demostración."
              }
            ]
          }
        ]
      }
    }
  },
  {
    slug: "digit-learning-salesforce-update",
    gallery: [
        { src: "/projects/digit-learning-salesforce-update/cover.webp", alt: "Digit Learning — cover" },
        { src: "/projects/digit-learning-salesforce-update/screenshot-1.webp", alt: "Digit Learning — screenshot 1" },
        { src: "/projects/digit-learning-salesforce-update/screenshot-2.webp", alt: "Digit Learning — screenshot 2" },
        { src: "/projects/digit-learning-salesforce-update/screenshot-3.webp", alt: "Digit Learning — screenshot 3" },
        { src: "/projects/digit-learning-salesforce-update/screenshot-4.webp", alt: "Digit Learning — screenshot 4" },
    ],
    locales: {
      en: {
        heroSubtitle:
          "Audit and modernization of a Salesforce org for an online learning platform: data model refactor, automation (Flows), and reporting.",
        sections: [
          {
            type: "text",
            title: "Context",
            paragraphs: [
              "Digit Learning is an online school. The Sales team had been using a Salesforce app for ~2 years to manage Students, Mentors, and Trainings.",
              "After key-user interviews, the IT team requested a structured audit and the implementation of concrete improvements to reduce manual work, improve data reliability, and better support decision-making."
            ]
          },
          {
            type: "bullets",
            title: "Key needs (from interviews)",
            items: [
              "Allow a single student to be enrolled in multiple trainings (current model was too restrictive).",
              "Automate enrollment and mentor assignment to reduce manual steps and errors.",
              "Track former customers to improve follow-up and re-engagement.",
              "Improve training management (capacity, relevance review) with reliable metrics.",
              "Provide management-ready reports and dashboards (students by status, available seats, conversion rates)."
            ]
          },
          {
            type: "bullets",
            title: "What I implemented",
            items: [
              "Data model update: created a junction object 'Purchased Trainings' (master-detail to Students and Trainings) to support multiple enrollments per student, with roll-up summaries for history and counts.",
              "Automation: record-triggered Flow on 'Purchased Trainings' to keep training availability up to date and to standardize enrollment actions.",
              "Automation: scheduled Flow to maintain student lifecycle status (Active Customer vs Former Customer) based on active trainings.",
              "Reporting: new reports to support Sales and Management, including available seats per training, students grouped by status (and by mentor), and a prospect → active customer conversion view.",
              "Operational documentation: deployment guidance + data import guidance to ensure a reproducible rollout."
            ]
          },
          {
            type: "metrics",
            title: "Measured outcomes (qualitative & quantitative)",
            items: [
              {
                label: "Enrollment handling time",
                value: "20 → 5 min / student",
                note: "Estimated 75% time saved per enrollment thanks to automation."
              },
              {
                label: "Former customers tracking",
                value: "500 records",
                note: "Re-engagement observed: +15% (tracking enabled and actionable)."
              },
              {
                label: "Training success rate",
                value: "70% → 85%",
                note: "Improvement: +15% via better follow-up and training management."
              }
            ]
          },
          {
            type: "resources",
            title: "Deliverables & evidence",
            items: [
              {
                label: "Audit report (DOCX)",
                href: "/docs/projects/digit-learning-salesforce-update/audit-report.docx",
                note: "Findings + recommendations based on key-user interviews."
              },
              {
                label: "Qualitative & quantitative analysis (DOCX)",
                href: "/docs/projects/digit-learning-salesforce-update/analysis-report.docx",
                note: "Time saved estimates and business impact explanation."
              },
              {
                label: "Deployment guide (PDF)",
                href: "/docs/projects/digit-learning-salesforce-update/deployment-guide.pdf"
              },
              {
                label: "Data import guide (PDF)",
                href: "/docs/projects/digit-learning-salesforce-update/data-import-guide.pdf"
              },
              {
                label: "Interview notes (PDF)",
                href: "/docs/projects/digit-learning-salesforce-update/interview-notes.pdf"
              },
              {
                label: "Package installation link (TXT)",
                href: "/docs/projects/digit-learning-salesforce-update/package-installation-link.txt"
              },
              {
                label: "Screenshots bundle (ZIP)",
                href: "/docs/projects/digit-learning-salesforce-update/screenshots.zip",
                note: "Schema Builder + Flows + reporting screenshots."
              }
            ]
          },
          {
            type: "bullets",
            title: "Stack & tools",
            items: [
              "Salesforce: custom objects, master-detail relationships, roll-up summaries, validation & reporting.",
              "Automation: record-triggered & scheduled Flows (focus on safe, maintainable patterns).",
              "Documentation: deployment + data import guidance for repeatable operations."
            ]
          }
        ]
      },
      fr: {
        heroSubtitle:
          "Audit et modernisation d’une org Salesforce pour une école en ligne : refonte du modèle de données, automatisations (Flows) et reporting.",
        sections: [
          {
            type: "text",
            title: "Contexte",
            paragraphs: [
              "Digit Learning est une école en ligne. Les équipes commerciales utilisent Salesforce depuis ~2 ans pour gérer les Étudiants, Mentors et Formations.",
              "Après des entretiens avec des utilisateurs clés, le service IT a demandé un audit structuré puis la mise en œuvre d’améliorations concrètes afin de réduire le travail manuel, fiabiliser la donnée et mieux piloter l’activité."
            ]
          },
          {
            type: "bullets",
            title: "Besoins utilisateurs (entretiens)",
            items: [
              "Permettre à un même étudiant de s’inscrire à plusieurs formations (modèle initial trop restrictif).",
              "Automatiser les inscriptions et l’attribution de mentors pour réduire les manipulations et les erreurs.",
              "Mettre en place un suivi des anciens clients pour améliorer la relance et le réengagement.",
              "Mieux gérer les formations (capacités, suivi) avec des indicateurs fiables.",
              "Fournir des rapports/tableaux de bord exploitables (étudiants par statut, places disponibles, taux de conversion)."
            ]
          },
          {
            type: "bullets",
            title: "Ce que j’ai mis en place",
            items: [
              "Mise à jour du modèle de données : création d’un objet de jonction « Formations achetées » (master-detail vers Étudiants et Formations) pour gérer plusieurs inscriptions par étudiant + roll-up summaries (historique, compteurs…).",
              "Automatisation : Flow record-triggered sur « Formations achetées » pour fiabiliser le processus d’inscription et maintenir les places disponibles à jour.",
              "Automatisation : Flow planifié pour gérer le cycle de vie des étudiants (Client actif vs Ancien client) en fonction des formations actives.",
              "Reporting : création de rapports (places disponibles, étudiants regroupés par statut et par mentor, comparatif du taux de transformation prospect → client actif).",
              "Documentation : guides de déploiement + import des données pour un passage en production reproductible."
            ]
          },
          {
            type: "metrics",
            title: "Résultats mesurés (qualitatif & quantitatif)",
            items: [
              {
                label: "Temps de traitement d’une inscription",
                value: "20 → 5 min / étudiant",
                note: "Estimation : 75% de temps gagné par inscription grâce à l’automatisation."
              },
              {
                label: "Suivi des anciens clients",
                value: "500 enregistrements",
                note: "Réengagement observé : +15% (suivi rendu possible et actionnable)."
              },
              {
                label: "Taux de réussite des formations",
                value: "70% → 85%",
                note: "Amélioration : +15% via un meilleur suivi et une gestion plus fiable."
              }
            ]
          },
          {
            type: "resources",
            title: "Livrables & preuves",
            items: [
              {
                label: "Rapport d’audit (DOCX)",
                href: "/docs/projects/digit-learning-salesforce-update/audit-report.docx",
                note: "Constats + recommandations issues des entretiens utilisateurs."
              },
              {
                label: "Analyse qualitative & quantitative (DOCX)",
                href: "/docs/projects/digit-learning-salesforce-update/analysis-report.docx",
                note: "Estimations de gains de temps + impact sur la performance."
              },
              {
                label: "Guide de déploiement (PDF)",
                href: "/docs/projects/digit-learning-salesforce-update/deployment-guide.pdf"
              },
              {
                label: "Guide d’import des données (PDF)",
                href: "/docs/projects/digit-learning-salesforce-update/data-import-guide.pdf"
              },
              {
                label: "Notes d’entretiens (PDF)",
                href: "/docs/projects/digit-learning-salesforce-update/interview-notes.pdf"
              },
              {
                label: "Lien d’installation du package (TXT)",
                href: "/docs/projects/digit-learning-salesforce-update/package-installation-link.txt"
              },
              {
                label: "Pack de captures d’écran (ZIP)",
                href: "/docs/projects/digit-learning-salesforce-update/screenshots.zip",
                note: "Schema Builder + Flows + reporting."
              }
            ]
          },
          {
            type: "bullets",
            title: "Stack & outils",
            items: [
              "Salesforce : objets custom, relations master-detail, roll-up summaries, validation et reporting.",
              "Automatisation : Flows record-triggered et planifiés (patterns maintenables).",
              "Documentation : guides de déploiement et d’import pour une exploitation reproductible."
            ]
          }
        ]
      },
      es: {
        heroSubtitle:
          "Auditoría y modernización de una org Salesforce para una escuela en línea: rediseño del modelo de datos, automatizaciones (Flows) y reporting.",
        sections: [
          {
            type: "text",
            title: "Contexto",
            paragraphs: [
              "Digit Learning es una escuela en línea. Los equipos comerciales llevan ~2 años usando Salesforce para gestionar Estudiantes, Mentores y Formaciones.",
              "Tras entrevistas con usuarios clave, el departamento de IT solicitó una auditoría estructurada y la implementación de mejoras concretas para reducir el trabajo manual, fiabilizar los datos y mejorar la toma de decisiones."
            ]
          },
          {
            type: "bullets",
            title: "Necesidades de los usuarios (entrevistas)",
            items: [
              "Permitir que un mismo estudiante se inscriba en varias formaciones (el modelo inicial era demasiado restrictivo).",
              "Automatizar las inscripciones y la asignación de mentores para reducir manipulaciones y errores.",
              "Implementar un seguimiento de antiguos clientes para mejorar la reactivación y el reenganche.",
              "Gestionar mejor las formaciones (capacidad, seguimiento) con indicadores fiables.",
              "Proporcionar informes/paneles accionables (estudiantes por estado, plazas disponibles, tasa de conversión)."
            ]
          },
          {
            type: "bullets",
            title: "Lo que implementé",
            items: [
              "Actualización del modelo de datos: creación de un objeto de unión «Formaciones compradas» (master-detail hacia Estudiantes y Formaciones) para gestionar varias inscripciones por estudiante + roll-up summaries (historial, contadores…).",
              "Automatización: Flow record-triggered sobre «Formaciones compradas» para fiabilizar el proceso de inscripción y mantener actualizadas las plazas disponibles.",
              "Automatización: Flow programado para gestionar el ciclo de vida de los estudiantes (Cliente activo vs Antiguo cliente) según las formaciones activas.",
              "Reporting: creación de informes (plazas disponibles, estudiantes agrupados por estado y por mentor, comparativo de la tasa de conversión prospecto → cliente activo).",
              "Documentación: guías de despliegue + importación de datos para un paso a producción reproducible."
            ]
          },
          {
            type: "metrics",
            title: "Resultados medidos (cualitativos y cuantitativos)",
            items: [
              {
                label: "Tiempo de procesamiento de una inscripción",
                value: "20 → 5 min / estudiante",
                note: "Estimación: 75% de tiempo ahorrado por inscripción gracias a la automatización."
              },
              {
                label: "Seguimiento de antiguos clientes",
                value: "500 registros",
                note: "Reenganche observado: +15% (seguimiento habilitado y accionable)."
              },
              {
                label: "Tasa de éxito de las formaciones",
                value: "70% → 85%",
                note: "Mejora: +15% gracias a un mejor seguimiento y una gestión más fiable."
              }
            ]
          },
          {
            type: "resources",
            title: "Entregables y evidencias",
            items: [
              {
                label: "Informe de auditoría (DOCX)",
                href: "/docs/projects/digit-learning-salesforce-update/audit-report.docx",
                note: "Hallazgos + recomendaciones basados en entrevistas con usuarios."
              },
              {
                label: "Análisis cualitativo y cuantitativo (DOCX)",
                href: "/docs/projects/digit-learning-salesforce-update/analysis-report.docx",
                note: "Estimaciones de tiempo ahorrado + explicación del impacto en el negocio."
              },
              {
                label: "Guía de despliegue (PDF)",
                href: "/docs/projects/digit-learning-salesforce-update/deployment-guide.pdf"
              },
              {
                label: "Guía de importación de datos (PDF)",
                href: "/docs/projects/digit-learning-salesforce-update/data-import-guide.pdf"
              },
              {
                label: "Notas de las entrevistas (PDF)",
                href: "/docs/projects/digit-learning-salesforce-update/interview-notes.pdf"
              },
              {
                label: "Enlace de instalación del paquete (TXT)",
                href: "/docs/projects/digit-learning-salesforce-update/package-installation-link.txt"
              },
              {
                label: "Pack de capturas de pantalla (ZIP)",
                href: "/docs/projects/digit-learning-salesforce-update/screenshots.zip",
                note: "Schema Builder + Flows + reporting."
              }
            ]
          },
          {
            type: "bullets",
            title: "Stack y herramientas",
            items: [
              "Salesforce: objetos personalizados, relaciones master-detail, roll-up summaries, validación y reporting.",
              "Automatización: Flows record-triggered y programados (patrones mantenibles).",
              "Documentación: guías de despliegue e importación para una operación reproducible."
            ]
          }
        ]
      }
    }
  },

  {
    slug: "cicd-pipeline-setup",
    locales: {
      en: {
        heroSubtitle: "CI/CD pipeline setup",
        sections: [
          {
            type: "bullets",
            title: "What I did",
            items: [
              "Scoped the work: objectives, deliverables, acceptance criteria.",
              "Implemented and/or documented the solution end‑to‑end.",
              "Validated results with tests/evidence and wrote clear documentation."
            ]
          }
        ]
      },
      fr: {
        heroSubtitle: "CI/CD pipeline setup",
        sections: [
          {
            type: "bullets",
            title: "Ce que j’ai réalisé",
            items: [
              "Cadrage : objectifs, livrables, critères d’acceptation.",
              "Réalisation : implémentation et/ou documentation de bout en bout.",
              "Validation : tests / preuves + mise en forme de la documentation."
            ]
          }
        ]
      },
      es: {
        heroSubtitle: "CI/CD pipeline setup",
        sections: [
          {
            type: "bullets",
            title: "Lo que hice",
            items: [
              "Definición del alcance: objetivos, entregables, criterios de aceptación.",
              "Realización: implementación y/o documentación de principio a fin.",
              "Validación: pruebas / evidencias + redacción de la documentación."
            ]
          }
        ]
      }
    }
  },
  // ── IT OPS — 13 case studies ──────────────────────────────────────────────
  {
    slug: "workstation-mass-deployment",
    gallery: [
        { src: "/projects/workstation-mass-deployment/cover.png", alt: "Workstation Deployment — cover" },
        { src: "/projects/workstation-mass-deployment/screenshot-1.png", alt: "Workstation Deployment — screenshot 1" },
        { src: "/projects/workstation-mass-deployment/screenshot-2.png", alt: "Workstation Deployment — screenshot 2" },
        { src: "/projects/workstation-mass-deployment/screenshot-3.png", alt: "Workstation Deployment — screenshot 3" },
        { src: "/projects/workstation-mass-deployment/screenshot-4.png", alt: "Workstation Deployment — screenshot 4" },
        { src: "/projects/workstation-mass-deployment/screenshot-5.png", alt: "Workstation Deployment — screenshot 5" },
        { src: "/projects/workstation-mass-deployment/screenshot-6.png", alt: "Workstation Deployment — screenshot 6" },
        { src: "/projects/workstation-mass-deployment/screenshot-7.png", alt: "Workstation Deployment — screenshot 7" },
        { src: "/projects/workstation-mass-deployment/screenshot-8.png", alt: "Workstation Deployment — screenshot 8" },
        { src: "/projects/workstation-mass-deployment/screenshot-9.png", alt: "Workstation Deployment — screenshot 9" },
        { src: "/projects/workstation-mass-deployment/screenshot-10.png", alt: "Workstation Deployment — screenshot 10" },
        { src: "/projects/workstation-mass-deployment/screenshot-11.png", alt: "Workstation Deployment — screenshot 11" },
        { src: "/projects/workstation-mass-deployment/screenshot-12.png", alt: "Workstation Deployment — screenshot 12" },
        { src: "/projects/workstation-mass-deployment/screenshot-13.png", alt: "Workstation Deployment — screenshot 13" },
        { src: "/projects/workstation-mass-deployment/screenshot-14.png", alt: "Workstation Deployment — screenshot 14" },
        { src: "/projects/workstation-mass-deployment/screenshot-15.jpg", alt: "Workstation Deployment — screenshot 15" },
        { src: "/projects/workstation-mass-deployment/screenshot-16.jpg", alt: "Workstation Deployment — screenshot 16" },
        { src: "/projects/workstation-mass-deployment/screenshot-17.jpg", alt: "Workstation Deployment — screenshot 17" },
        { src: "/projects/workstation-mass-deployment/screenshot-18.jpg", alt: "Workstation Deployment — screenshot 18" },
    ],
    locales: {
      en: { heroSubtitle: "Windows Autopilot · Dell Image Assist · Blancco · Intune · MIDRANGE GROUP internship" },
      fr: { heroSubtitle: "Windows Autopilot · Dell Image Assist · Blancco · Intune · Stage MIDRANGE GROUP" },
      es: { heroSubtitle: "Windows Autopilot · Dell Image Assist · Blancco · Intune · Prácticas en MIDRANGE GROUP" },
    },
  },
  {
    slug: "it-ops-incident-management",
    gallery: [
        { src: "/projects/it-ops-incident-management/cover.webp", alt: "IT Ops — Incident Management — cover" },
        { src: "/projects/it-ops-incident-management/screenshot-1.webp", alt: "IT Ops — Incident Management — screenshot 1" },
        { src: "/projects/it-ops-incident-management/screenshot-2.webp", alt: "IT Ops — Incident Management — screenshot 2" },
        { src: "/projects/it-ops-incident-management/screenshot-3.webp", alt: "IT Ops — Incident Management — screenshot 3" },
        { src: "/projects/it-ops-incident-management/screenshot-4.webp", alt: "IT Ops — Incident Management — screenshot 4" },
        { src: "/projects/it-ops-incident-management/screenshot-5.webp", alt: "IT Ops — Incident Management — screenshot 5" },
        { src: "/projects/it-ops-incident-management/screenshot-6.webp", alt: "IT Ops — Incident Management — screenshot 6" },
        { src: "/projects/it-ops-incident-management/screenshot-7.webp", alt: "IT Ops — Incident Management — screenshot 7" },
    ],
    locales: {
      en: { heroSubtitle: "Autotask PSA · Splashtop · Webroot · Datto RMM · MIDRANGE GROUP internship" },
      fr: { heroSubtitle: "Autotask PSA · Splashtop · Webroot · Datto RMM · Stage MIDRANGE GROUP" },
      es: { heroSubtitle: "Autotask PSA · Splashtop · Webroot · Datto RMM · Prácticas en MIDRANGE GROUP" },
    },
  },
  {
    slug: "hardware-upgrade-hp-laptop",
    gallery: [
        { src: "/projects/hardware-upgrade-hp-laptop/cover.webp", alt: "HP Laptop Upgrade — cover" },
        { src: "/projects/hardware-upgrade-hp-laptop/screenshot-1.webp", alt: "HP Laptop Upgrade — screenshot 1" },
    ],
    locales: {
      en: { heroSubtitle: "Samsung DDR4 · Samsung SSD · Acronis Clone · HP Laptop · Personal Project" },
      fr: { heroSubtitle: "Samsung DDR4 · Samsung SSD · Clone Acronis · HP Laptop · Projet personnel" },
      es: { heroSubtitle: "Samsung DDR4 · Samsung SSD · Clonado Acronis · HP Laptop · Proyecto personal" },
    },
  },
  {
    slug: "it-ops-rmm-supervision",
    gallery: [
        { src: "/projects/it-ops-rmm-supervision/cover.webp", alt: "IT Ops — RMM Supervision — cover" },
        { src: "/projects/it-ops-rmm-supervision/screenshot-1.webp", alt: "IT Ops — RMM Supervision — screenshot 1" },
        { src: "/projects/it-ops-rmm-supervision/screenshot-2.webp", alt: "IT Ops — RMM Supervision — screenshot 2" },
        { src: "/projects/it-ops-rmm-supervision/screenshot-3.webp", alt: "IT Ops — RMM Supervision — screenshot 3" },
        { src: "/projects/it-ops-rmm-supervision/screenshot-4.webp", alt: "IT Ops — RMM Supervision — screenshot 4" },
        { src: "/projects/it-ops-rmm-supervision/screenshot-5.webp", alt: "IT Ops — RMM Supervision — screenshot 5" },
        { src: "/projects/it-ops-rmm-supervision/screenshot-6.webp", alt: "IT Ops — RMM Supervision — screenshot 6" },
        { src: "/projects/it-ops-rmm-supervision/screenshot-7.webp", alt: "IT Ops — RMM Supervision — screenshot 7" },
    ],
    locales: {
      en: { heroSubtitle: "Datto RMM · Splashtop · MalwareBytes · MIDRANGE GROUP internship" },
      fr: { heroSubtitle: "Datto RMM · Splashtop · MalwareBytes · Stage MIDRANGE GROUP" },
      es: { heroSubtitle: "Datto RMM · Splashtop · MalwareBytes · Prácticas en MIDRANGE GROUP" },
    },
  },
  {
    slug: "it-ops-acronis-backup",
    gallery: [
        { src: "/projects/it-ops-acronis-backup/cover.webp", alt: "IT Ops — Acronis Backup — cover" },
        { src: "/projects/it-ops-acronis-backup/screenshot-1.webp", alt: "IT Ops — Acronis Backup — screenshot 1" },
        { src: "/projects/it-ops-acronis-backup/screenshot-2.webp", alt: "IT Ops — Acronis Backup — screenshot 2" },
    ],
    locales: {
      en: { heroSubtitle: "Acronis Cyber Backup · Acronis Cyber Protect Cloud · MIDRANGE GROUP internship" },
      fr: { heroSubtitle: "Acronis Cyber Backup · Acronis Cyber Protect Cloud · Stage MIDRANGE GROUP" },
      es: { heroSubtitle: "Acronis Cyber Backup · Acronis Cyber Protect Cloud · Prácticas en MIDRANGE GROUP" },
    },
  },
  {
    slug: "it-ops-virtualization-lab",
    gallery: [
        { src: "/projects/it-ops-virtualization-lab/cover.webp", alt: "IT Ops — Virtualization Lab — cover" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-1.webp", alt: "IT Ops — Virtualization Lab — screenshot 1" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-2.webp", alt: "IT Ops — Virtualization Lab — screenshot 2" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-3.webp", alt: "IT Ops — Virtualization Lab — screenshot 3" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-4.webp", alt: "IT Ops — Virtualization Lab — screenshot 4" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-5.webp", alt: "IT Ops — Virtualization Lab — screenshot 5" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-6.webp", alt: "IT Ops — Virtualization Lab — screenshot 6" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-7.webp", alt: "IT Ops — Virtualization Lab — screenshot 7" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-8.webp", alt: "IT Ops — Virtualization Lab — screenshot 8" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-9.webp", alt: "IT Ops — Virtualization Lab — screenshot 9" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-10.webp", alt: "IT Ops — Virtualization Lab — screenshot 10" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-11.webp", alt: "IT Ops — Virtualization Lab — screenshot 11" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-12.webp", alt: "IT Ops — Virtualization Lab — screenshot 12" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-13.webp", alt: "IT Ops — Virtualization Lab — screenshot 13" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-14.webp", alt: "IT Ops — Virtualization Lab — screenshot 14" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-15.webp", alt: "IT Ops — Virtualization Lab — screenshot 15" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-16.webp", alt: "IT Ops — Virtualization Lab — screenshot 16" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-17.webp", alt: "IT Ops — Virtualization Lab — screenshot 17" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-18.webp", alt: "IT Ops — Virtualization Lab — screenshot 18" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-19.webp", alt: "IT Ops — Virtualization Lab — screenshot 19" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-20.webp", alt: "IT Ops — Virtualization Lab — screenshot 20" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-21.webp", alt: "IT Ops — Virtualization Lab — screenshot 21" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-22.webp", alt: "IT Ops — Virtualization Lab — screenshot 22" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-23.webp", alt: "IT Ops — Virtualization Lab — screenshot 23" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-24.webp", alt: "IT Ops — Virtualization Lab — screenshot 24" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-25.webp", alt: "IT Ops — Virtualization Lab — screenshot 25" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-26.webp", alt: "IT Ops — Virtualization Lab — screenshot 26" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-27.webp", alt: "IT Ops — Virtualization Lab — screenshot 27" },
        { src: "/projects/it-ops-virtualization-lab/screenshot-28.webp", alt: "IT Ops — Virtualization Lab — screenshot 28" },
    ],
    locales: {
      en: { heroSubtitle: "VMware Workstation Pro 17 · Windows Server 2022 · AD DS · DNS · DHCP · WDS" },
      fr: { heroSubtitle: "VMware Workstation Pro 17 · Windows Server 2022 · AD DS · DNS · DHCP · WDS" },
      es: { heroSubtitle: "VMware Workstation Pro 17 · Windows Server 2022 · AD DS · DNS · DHCP · WDS" },
    },
  },
  {
    slug: "it-ops-network-security",
    gallery: [
        { src: "/projects/it-ops-network-security/cover.webp", alt: "IT Ops — Network Security — cover" },
        { src: "/projects/it-ops-network-security/screenshot-1.webp", alt: "IT Ops — Network Security — screenshot 1" },
        { src: "/projects/it-ops-network-security/screenshot-2.webp", alt: "IT Ops — Network Security — screenshot 2" },
        { src: "/projects/it-ops-network-security/screenshot-3.webp", alt: "IT Ops — Network Security — screenshot 3" },
        { src: "/projects/it-ops-network-security/screenshot-4.webp", alt: "IT Ops — Network Security — screenshot 4" },
        { src: "/projects/it-ops-network-security/screenshot-5.webp", alt: "IT Ops — Network Security — screenshot 5" },
        { src: "/projects/it-ops-network-security/screenshot-6.webp", alt: "IT Ops — Network Security — screenshot 6" },
        { src: "/projects/it-ops-network-security/screenshot-7.webp", alt: "IT Ops — Network Security — screenshot 7" },
        { src: "/projects/it-ops-network-security/screenshot-8.webp", alt: "IT Ops — Network Security — screenshot 8" },
        { src: "/projects/it-ops-network-security/screenshot-9.webp", alt: "IT Ops — Network Security — screenshot 9" },
    ],
    locales: {
      en: { heroSubtitle: "pfSense 2.6.0 · Squid · SquidGuard · LightSquid · VMware Workstation 17" },
      fr: { heroSubtitle: "pfSense 2.6.0 · Squid · SquidGuard · LightSquid · VMware Workstation 17" },
      es: { heroSubtitle: "pfSense 2.6.0 · Squid · SquidGuard · LightSquid · VMware Workstation 17" },
    },
  },
  {
    slug: "it-ops-disk-backup",
    gallery: [
        { src: "/projects/it-ops-disk-backup/cover.webp", alt: "IT Ops — Disk Backup — cover" },
        { src: "/projects/it-ops-disk-backup/screenshot-1.webp", alt: "IT Ops — Disk Backup — screenshot 1" },
        { src: "/projects/it-ops-disk-backup/screenshot-2.webp", alt: "IT Ops — Disk Backup — screenshot 2" },
        { src: "/projects/it-ops-disk-backup/screenshot-3.webp", alt: "IT Ops — Disk Backup — screenshot 3" },
        { src: "/projects/it-ops-disk-backup/screenshot-4.webp", alt: "IT Ops — Disk Backup — screenshot 4" },
        { src: "/projects/it-ops-disk-backup/screenshot-5.webp", alt: "IT Ops — Disk Backup — screenshot 5" },
        { src: "/projects/it-ops-disk-backup/screenshot-6.webp", alt: "IT Ops — Disk Backup — screenshot 6" },
        { src: "/projects/it-ops-disk-backup/screenshot-7.webp", alt: "IT Ops — Disk Backup — screenshot 7" },
        { src: "/projects/it-ops-disk-backup/screenshot-8.webp", alt: "IT Ops — Disk Backup — screenshot 8" },
        { src: "/projects/it-ops-disk-backup/screenshot-9.webp", alt: "IT Ops — Disk Backup — screenshot 9" },
    ],
    locales: {
      en: { heroSubtitle: "AOMEI Partition Assistant · AOMEI Backupper · Windows Server Backup · VirtualBox · Greta du Val d'Oise" },
      fr: { heroSubtitle: "AOMEI Partition Assistant · AOMEI Backupper · Sauvegarde Windows Server · VirtualBox · Greta du Val d'Oise" },
      es: { heroSubtitle: "AOMEI Partition Assistant · AOMEI Backupper · Copia de seguridad Windows Server · VirtualBox · Greta du Val d'Oise" },
    },
  },
  {
    slug: "it-ops-workstation-setup",
    gallery: [
        { src: "/projects/it-ops-workstation-setup/cover.webp", alt: "IT Ops — Workstation Setup — cover" },
        { src: "/projects/it-ops-workstation-setup/screenshot-1.webp", alt: "IT Ops — Workstation Setup — screenshot 1" },
        { src: "/projects/it-ops-workstation-setup/screenshot-2.webp", alt: "IT Ops — Workstation Setup — screenshot 2" },
        { src: "/projects/it-ops-workstation-setup/screenshot-3.webp", alt: "IT Ops — Workstation Setup — screenshot 3" },
        { src: "/projects/it-ops-workstation-setup/screenshot-4.webp", alt: "IT Ops — Workstation Setup — screenshot 4" },
        { src: "/projects/it-ops-workstation-setup/screenshot-5.webp", alt: "IT Ops — Workstation Setup — screenshot 5" },
        { src: "/projects/it-ops-workstation-setup/screenshot-6.webp", alt: "IT Ops — Workstation Setup — screenshot 6" },
        { src: "/projects/it-ops-workstation-setup/screenshot-7.webp", alt: "IT Ops — Workstation Setup — screenshot 7" },
    ],
    locales: {
      en: { heroSubtitle: "Windows 10 · Ninite · Office 2016 · OOBE · Greta du Val d'Oise" },
      fr: { heroSubtitle: "Windows 10 · Ninite · Office 2016 · OOBE · Greta du Val d'Oise" },
      es: { heroSubtitle: "Windows 10 · Ninite · Office 2016 · OOBE · Greta du Val d'Oise" },
    },
  },
  {
    slug: "it-ops-wifi-config",
    gallery: [
        { src: "/projects/it-ops-wifi-config/cover.webp", alt: "IT Ops — Wi-Fi Config — cover" },
        { src: "/projects/it-ops-wifi-config/screenshot-1.webp", alt: "IT Ops — Wi-Fi Config — screenshot 1" },
    ],
    locales: {
      en: { heroSubtitle: "TP-Link Access Point · LAN/WAN · DHCP · SSID · WPA2 · Greta du Val d'Oise" },
      fr: { heroSubtitle: "Point d'acces TP-Link · LAN/WAN · DHCP · SSID · WPA2 · Greta du Val d'Oise" },
      es: { heroSubtitle: "Punto de acceso TP-Link · LAN/WAN · DHCP · SSID · WPA2 · Greta du Val d'Oise" },
    },
  },
  {
    slug: "it-ops-roaming-profiles",
    gallery: [
        { src: "/projects/it-ops-roaming-profiles/cover.webp", alt: "IT Ops — Roaming Profiles — cover" },
        { src: "/projects/it-ops-roaming-profiles/screenshot-1.webp", alt: "IT Ops — Roaming Profiles — screenshot 1" },
        { src: "/projects/it-ops-roaming-profiles/screenshot-2.webp", alt: "IT Ops — Roaming Profiles — screenshot 2" },
        { src: "/projects/it-ops-roaming-profiles/screenshot-3.webp", alt: "IT Ops — Roaming Profiles — screenshot 3" },
        { src: "/projects/it-ops-roaming-profiles/screenshot-4.webp", alt: "IT Ops — Roaming Profiles — screenshot 4" },
        { src: "/projects/it-ops-roaming-profiles/screenshot-5.webp", alt: "IT Ops — Roaming Profiles — screenshot 5" },
    ],
    locales: {
      en: { heroSubtitle: "Active Directory · Roaming Profiles · Windows Server · EBTAI Domain · Greta du Val d'Oise" },
      fr: { heroSubtitle: "Active Directory · Profils itinerants · Windows Server · Domaine EBTAI · Greta du Val d'Oise" },
      es: { heroSubtitle: "Active Directory · Perfiles móviles · Windows Server · Dominio EBTAI · Greta du Val d'Oise" },
    },
  },
  {
    slug: "it-ops-hardware-procurement",
    gallery: [
        { src: "/projects/it-ops-hardware-procurement/cover.webp", alt: "IT Ops — Hardware Procurement — cover" },
    ],
    locales: {
      en: { heroSubtitle: "Hardware Sizing · Excel Devis · Component Research · Greta du Val d'Oise" },
      fr: { heroSubtitle: "Dimensionnement materiel · Devis Excel · Recherche composants · Greta du Val d'Oise" },
      es: { heroSubtitle: "Dimensionamiento de hardware · Presupuesto Excel · Investigación de componentes · Greta du Val d'Oise" },
    },
  },
  {
    slug: "it-ops-email-config",
    gallery: [
        { src: "/projects/it-ops-email-config/cover.webp", alt: "IT Ops — Email Config — cover" },
        { src: "/projects/it-ops-email-config/screenshot-1.webp", alt: "IT Ops — Email Config — screenshot 1" },
    ],
    locales: {
      en: { heroSubtitle: "Outlook 2016 · Exchange ActiveSync · User Onboarding · Greta du Val d'Oise" },
      fr: { heroSubtitle: "Outlook 2016 · Exchange ActiveSync · Onboarding utilisateur · Greta du Val d'Oise" },
      es: { heroSubtitle: "Outlook 2016 · Exchange ActiveSync · Incorporación de usuarios · Greta du Val d'Oise" },
    },
  },

{
  slug: "hemebiotech-java-debug",
  gallery: [
      { src: "/projects/hemebiotech-java-debug/cover.webp", alt: "HémeBioTech — cover" },
      { src: "/projects/hemebiotech-java-debug/screenshot-1.webp", alt: "HémeBioTech — screenshot 1" },
  ],
  locales: {
    en: {
      heroSubtitle: "Fix and refactor a Java symptom analytics app (Heme Biotech)",
      sections: [
        {
          type: "text",
          title: "Context",
          paragraphs: [
            "Heme Biotech needed a small analytics program to read a symptoms file and output the number of occurrences for each symptom.",
            "The code already read the input correctly, but the counting logic was wrong (e.g., 3 occurrences in the file ended up as 0 for every symptom)."
          ]
        },
        {
          type: "bullets",
          title: "Goals",
          items: [
            "Repair the counting so each symptom is correctly aggregated.",
            "Produce a result file (result.out) sorted alphabetically, in the expected format: symptom, count.",
            "Refactor into a clean OOP design (interfaces + small methods) to make the code maintainable for future contributors.",
            "Use Git properly (dev branch, frequent commits, clean history)."
          ]
        },
        {
          type: "timeline",
          title: "How I approached it",
          steps: [
            {
              title: "Reproduce and isolate the bug",
              description:
                "Ran the app locally, compared output vs expected behavior, then traced the logic responsible for incrementing counts."
            },
            {
              title: "Fix counting + edge cases",
              description:
                "Implemented a safe counting strategy (Map-based aggregation) and ensured the increment path is correct for repeated symptoms."
            },
            {
              title: "Refactor with interfaces",
              description:
                "Introduced a writer interface (ISymptomWriter) and moved responsibilities out of main: read → count → sort → write."
            },
            {
              title: "Deterministic alphabetical output",
              description:
                "Used a sorted map approach (TreeMap) so the output is alphabetically ordered by design."
            },
            {
              title: "Code quality hardening",
              description:
                "Cleaned naming (camelCase), removed useless comments, added Javadoc and consistent indentation, then validated with repeated runs."
            }
          ]
        },
        {
          type: "code",
          title: "Run locally",
          language: "bash",
          code: "javac com/hemebiotech/analytics/*.java\njava -cp \".\" com.hemebiotech.analytics.Main"
        },
        {
          type: "metrics",
          title: "Outcomes",
          items: [
            { label: "Correct counting", value: "Counts match input file occurrences" },
            { label: "Sorted output", value: "Alphabetical by design (TreeMap)" },
            { label: "Maintainable architecture", value: "Reader/Writer interfaces + small methods" },
            { label: "Collaboration readiness", value: "Git workflow + documented code (Javadoc)" }
          ]
        },
        {
          type: "resources",
          title: "Deliverables",
          items: [
            { label: "Project brief (DOCX)", href: "/docs/projects/hemebiotech-java-debug/brief.docx" },
            { label: "Key steps guide (PDF)", href: "/docs/projects/hemebiotech-java-debug/key-steps-guide.pdf" },
            { label: "Directives (PDF)", href: "/docs/projects/hemebiotech-java-debug/directives.pdf" },
            { label: "Email exchange (PDF)", href: "/docs/projects/hemebiotech-java-debug/email-exchange.pdf" },
            { label: "Submission (PDF)", href: "/docs/projects/hemebiotech-java-debug/deliverable.pdf" },
            { label: "Legacy version (PDF)", href: "/docs/projects/hemebiotech-java-debug/legacy-version-may-2023.pdf", note: "Reference" },
            { label: "Repository link (TXT)", href: "/docs/projects/hemebiotech-java-debug/repository.txt" }
          ]
        },
        {
          type: "code",
          title: "Repository",
          language: "text",
          code: "https://github.com/Aiyeesha/DAHOUMANE-Aicha-Imene-Debuggez-une-applicationJava.git",
        }
      ]
    },
    fr: {
      heroSubtitle: "Débugger et refactoriser une application Java d’analyse de symptômes (Heme Biotech)",
      sections: [
        {
          type: "text",
          title: "Contexte",
          paragraphs: [
            "Heme Biotech avait besoin d’un programme d’analyse simple : lire un fichier de symptômes et produire le nombre d’occurrences par symptôme.",
            "La lecture du fichier était correcte, mais le comptage était faux (ex. 3 occurrences dans le fichier → 0 en sortie pour tous les symptômes)."
          ]
        },
        {
          type: "bullets",
          title: "Objectifs",
          items: [
            "Corriger le comptage pour agréger correctement les occurrences de chaque symptôme.",
            "Générer un fichier de sortie (result.out) trié par ordre alphabétique, au format : symptôme, quantité.",
            "Refactorer en POO (interfaces + méthodes courtes) pour rendre le code maintenable.",
            "Appliquer un workflow Git propre (branche dev, commits réguliers, historique clair)."
          ]
        },
        {
          type: "timeline",
          title: "Démarche",
          steps: [
            {
              title: "Reproduire et isoler le bug",
              description:
                "Exécution locale, comparaison de la sortie au comportement attendu, puis identification du point de calcul des occurrences."
            },
            {
              title: "Correction du comptage + cas limites",
              description:
                "Mise en place d’un comptage robuste (agrégation via Map) et validation de l’incrémentation sur des symptômes répétés."
            },
            {
              title: "Refactor via interfaces",
              description:
                "Création de l’interface d’écriture (ISymptomWriter) et découpage en étapes : lire → compter → trier → écrire."
            },
            {
              title: "Tri alphabétique déterministe",
              description:
                "Utilisation d’une structure triée (TreeMap) pour garantir l’ordre alphabétique sans logique de tri additionnelle."
            },
            {
              title: "Durcissement qualité",
              description:
                "Nettoyage du code (naming camelCase, suppression de commentaires inutiles), ajout de Javadoc, indentation et validations répétées."
            }
          ]
        },
        {
          type: "code",
          title: "Exécuter en local",
          language: "bash",
          code: "javac com/hemebiotech/analytics/*.java\njava -cp \".\" com.hemebiotech.analytics.Main"
        },
        {
          type: "metrics",
          title: "Résultats",
          items: [
            { label: "Comptage correct", value: "Les décomptes correspondent aux occurrences du fichier" },
            { label: "Sortie triée", value: "Ordre alphabétique garanti (TreeMap)" },
            { label: "Architecture maintenable", value: "Interfaces reader/writer + méthodes courtes" },
            { label: "Prêt pour le travail en équipe", value: "Workflow Git + code documenté (Javadoc)" }
          ]
        },
        {
          type: "resources",
          title: "Livrables",
          items: [
            { label: "Brief du projet (DOCX)", href: "/docs/projects/hemebiotech-java-debug/brief.docx" },
            { label: "Guide d’étapes clés (PDF)", href: "/docs/projects/hemebiotech-java-debug/key-steps-guide.pdf" },
            { label: "Directives (PDF)", href: "/docs/projects/hemebiotech-java-debug/directives.pdf" },
            { label: "Échange email (PDF)", href: "/docs/projects/hemebiotech-java-debug/email-exchange.pdf" },
            { label: "Livrable (PDF)", href: "/docs/projects/hemebiotech-java-debug/deliverable.pdf" },
            { label: "Ancienne version (PDF)", href: "/docs/projects/hemebiotech-java-debug/legacy-version-may-2023.pdf", note: "Référence" },
            { label: "Lien du dépôt (TXT)", href: "/docs/projects/hemebiotech-java-debug/repository.txt" }
          ]
        },
        {
          type: "code",
          title: "Dépôt GitHub",
          language: "text",
          code: "https://github.com/Aiyeesha/DAHOUMANE-Aicha-Imene-Debuggez-une-applicationJava.git",
        }
      ]
    },
    es: {
      heroSubtitle: "Depurar y refactorizar una aplicación Java de análisis de síntomas (Heme Biotech)",
      sections: [
        {
          type: "text",
          title: "Contexto",
          paragraphs: [
            "Heme Biotech necesitaba un programa de análisis sencillo: leer un archivo de síntomas y generar el número de ocurrencias por síntoma.",
            "La lectura del archivo era correcta, pero el conteo era incorrecto (ej. 3 ocurrencias en el archivo → 0 en la salida para todos los síntomas)."
          ]
        },
        {
          type: "bullets",
          title: "Objetivos",
          items: [
            "Corregir el conteo para agregar correctamente las ocurrencias de cada síntoma.",
            "Generar un archivo de salida (result.out) ordenado alfabéticamente, con el formato: síntoma, cantidad.",
            "Refactorizar en POO (interfaces + métodos cortos) para hacer el código mantenible.",
            "Aplicar un flujo de trabajo Git limpio (rama dev, commits frecuentes, historial claro)."
          ]
        },
        {
          type: "timeline",
          title: "Enfoque",
          steps: [
            {
              title: "Reproducir y aislar el error",
              description:
                "Ejecución local, comparación de la salida con el comportamiento esperado, y localización del punto de cálculo de las ocurrencias."
            },
            {
              title: "Corrección del conteo + casos límite",
              description:
                "Implementación de un conteo robusto (agregación vía Map) y validación del incremento en síntomas repetidos."
            },
            {
              title: "Refactorización mediante interfaces",
              description:
                "Creación de la interfaz de escritura (ISymptomWriter) y división en etapas: leer → contar → ordenar → escribir."
            },
            {
              title: "Orden alfabético determinista",
              description:
                "Uso de una estructura ordenada (TreeMap) para garantizar el orden alfabético sin lógica de ordenación adicional."
            },
            {
              title: "Refuerzo de la calidad",
              description:
                "Limpieza del código (naming camelCase, eliminación de comentarios innecesarios), añadido de Javadoc, indentación y validaciones repetidas."
            }
          ]
        },
        {
          type: "code",
          title: "Ejecutar en local",
          language: "bash",
          code: "javac com/hemebiotech/analytics/*.java\njava -cp \".\" com.hemebiotech.analytics.Main"
        },
        {
          type: "metrics",
          title: "Resultados",
          items: [
            { label: "Conteo correcto", value: "Los recuentos coinciden con las ocurrencias del archivo" },
            { label: "Salida ordenada", value: "Orden alfabético garantizado (TreeMap)" },
            { label: "Arquitectura mantenible", value: "Interfaces reader/writer + métodos cortos" },
            { label: "Listo para trabajo en equipo", value: "Flujo Git + código documentado (Javadoc)" }
          ]
        },
        {
          type: "resources",
          title: "Entregables",
          items: [
            { label: "Brief del proyecto (DOCX)", href: "/docs/projects/hemebiotech-java-debug/brief.docx" },
            { label: "Guía de pasos clave (PDF)", href: "/docs/projects/hemebiotech-java-debug/key-steps-guide.pdf" },
            { label: "Directrices (PDF)", href: "/docs/projects/hemebiotech-java-debug/directives.pdf" },
            { label: "Intercambio de emails (PDF)", href: "/docs/projects/hemebiotech-java-debug/email-exchange.pdf" },
            { label: "Entrega (PDF)", href: "/docs/projects/hemebiotech-java-debug/deliverable.pdf" },
            { label: "Versión anterior (PDF)", href: "/docs/projects/hemebiotech-java-debug/legacy-version-may-2023.pdf", note: "Referencia" },
            { label: "Enlace del repositorio (TXT)", href: "/docs/projects/hemebiotech-java-debug/repository.txt" }
          ]
        },
        {
          type: "code",
          title: "Repositorio GitHub",
          language: "text",
          code: "https://github.com/Aiyeesha/DAHOUMANE-Aicha-Imene-Debuggez-une-applicationJava.git",
        }
      ]
    }
  }
},

{
  slug: "parkit-java-testing",
  gallery: [
      { src: "/projects/parkit-java-testing/cover.png", alt: "Parkit — cover" },
      { src: "/projects/parkit-java-testing/screenshot-1.png", alt: "Parkit — screenshot 1" },
      { src: "/projects/parkit-java-testing/screenshot-2.png", alt: "Parkit — screenshot 2" },
      { src: "/projects/parkit-java-testing/screenshot-3.png", alt: "Parkit — screenshot 3" },
      { src: "/projects/parkit-java-testing/screenshot-4.png", alt: "Parkit — screenshot 4" },
      { src: "/projects/parkit-java-testing/screenshot-5.png", alt: "Parkit — screenshot 5" },
      { src: "/projects/parkit-java-testing/screenshot-6.png", alt: "Parkit — screenshot 6" },
      { src: "/projects/parkit-java-testing/screenshot-7.png", alt: "Parkit — screenshot 7" },
      { src: "/projects/parkit-java-testing/screenshot-8.png", alt: "Parkit — screenshot 8" },
      { src: "/projects/parkit-java-testing/screenshot-9.png", alt: "Parkit — screenshot 9" },
      { src: "/projects/parkit-java-testing/screenshot-10.png", alt: "Parkit — screenshot 10" },
      { src: "/projects/parkit-java-testing/screenshot-11.png", alt: "Parkit — screenshot 11" },
      { src: "/projects/parkit-java-testing/screenshot-12.png", alt: "Parkit — screenshot 12" },
      { src: "/projects/parkit-java-testing/screenshot-13.png", alt: "Parkit — screenshot 13" },
      { src: "/projects/parkit-java-testing/screenshot-14.png", alt: "Parkit — screenshot 14" },
      { src: "/projects/parkit-java-testing/screenshot-15.png", alt: "Parkit — screenshot 15" },
      { src: "/projects/parkit-java-testing/screenshot-16.png", alt: "Parkit — screenshot 16" },
      { src: "/projects/parkit-java-testing/screenshot-17.png", alt: "Parkit — screenshot 17" },
      { src: "/projects/parkit-java-testing/screenshot-18.png", alt: "Parkit — screenshot 18" },
      { src: "/projects/parkit-java-testing/screenshot-19.png", alt: "Parkit — screenshot 19" },
  ],
  locales: {
    en: {
      heroSubtitle: "TDD, unit & integration tests for a Java parking payment system (Park’it)",
      sections: [
        {
          type: "text",
          title: "Context",
          paragraphs: [
            "Park’it is a CLI-based parking payment backend being promoted from beta to a production-ready phase. The product team requested bug fixes, automated testing, and new features before widening the rollout.",
            "The expectations included: fixing existing regressions, delivering new pricing rules with TDD, completing pending integration tests, and producing test execution evidence (Surefire + JaCoCo reports)."
          ]
        },
        {
          type: "bullets",
          title: "Goals & requirements",
          items: [
            "Fix the pricing bug causing negative parking durations when a vehicle stays more than 24 hours.",
            "Implement “free parking” for the first 30 minutes (0$) and cover it with unit tests (TDD).",
            "Implement a 5% discount for recurring users (based on the number of past tickets) and cover it with unit tests (TDD).",
            "Strengthen ParkingService tests using Mockito mocks and reach high coverage on that class.",
            "Complete the TODO integration tests (database-backed) and ensure a global coverage target (>= 70%)."
          ]
        },
        {
          type: "timeline",
          title: "Implementation workflow",
          steps: [
            {
              title: "Baseline & reproduction",
              description:
                "Forked and versioned the codebase, ran mvn test / mvn verify, and used failing tests to localize the root causes."
            },
            {
              title: "Bugfix: negative duration (>24h)",
              description:
                "Fixed the fare duration computation by relying on millisecond timestamps (Date.getTime()) then converting consistently to minutes."
            },
            {
              title: "TDD: first 30 minutes free",
              description:
                "Wrote failing unit tests for car and bike cases (< 30 minutes), then updated FareCalculatorService so calculateFare returns 0 when duration is below 30 minutes."
            },
            {
              title: "TDD: 5% recurring discount",
              description:
                "Added a discount-aware calculateFare(Ticket, boolean) path, implemented ticket counting in TicketDAO (getNbTicket), and applied the 5% reduction when the user is recurrent."
            },
            {
              title: "Unit tests hardening (Mockito)",
              description:
                "Improved ParkingService unit tests by mocking TicketDAO, ParkingSpotDAO and user inputs, and added targeted tests to cover success and failure paths."
            },
            {
              title: "Integration tests + reports",
              description:
                "Completed the TODO assertions in ParkingDatabaseIT, added a recurring-user integration test, and generated Surefire + JaCoCo reports with mvn verify."
            }
          ]
        },
        {
          type: "metrics",
          title: "Quality outcomes",
          items: [
            { label: "Pricing reliability", value: "Negative duration bug fixed" },
            { label: "New features delivered", value: "30-min free parking + 5% recurring discount" },
            { label: "Test scope", value: "Unit tests + DB-backed integration tests" },
            { label: "Coverage targets", value: ">= 70% global; > 90% on ParkingService (instructions)", note: "Verified via JaCoCo reports" },
            { label: "Evidence", value: "Surefire + JaCoCo reports captured", note: "Screenshots available in deliverables" }
          ]
        },
        {
          type: "resources",
          title: "Deliverables & evidence",
          items: [
            { label: "Project brief (DOCX)", href: "/docs/projects/parkit-java-testing/brief-parkit.docx" },
            { label: "Step-by-step guide (PDF)", href: "/docs/projects/parkit-java-testing/guide-etapes.pdf" },
            { label: "Key steps guide (PDF)", href: "/docs/projects/parkit-java-testing/guide-etapes-cles.pdf" },
            { label: "Onboarding kit (PDF)", href: "/docs/projects/parkit-java-testing/kit-technique-onboarding.pdf" },
            { label: "Archived version (PDF)", href: "/docs/projects/parkit-java-testing/ancienne-version-mai-2023.pdf" },
            { label: "Test reports screenshots (ZIP)", href: "/docs/projects/parkit-java-testing/screenshots.zip" },
            { label: "GitHub repository", href: "https://github.com/Aiyeesha/ParkingSystem.git" },
            { label: "Download repository link (TXT)", href: "/docs/projects/parkit-java-testing/repository-link.txt" }
          ]
        },
        {
          type: "code",
          title: "Repository",
          language: "text",
          code: "https://github.com/Aiyeesha/ParkingSystem.git",
        }
      ]
    },
    fr: {
      heroSubtitle: "TDD + tests unitaires & d’intégration sur un système de paiement de parking Java (Park’it)",
      sections: [
        {
          type: "text",
          title: "Contexte",
          paragraphs: [
            "Park’it est un back-end de paiement de parking (interface en terminal) qui doit passer d’une bêta à une version plus robuste. L’équipe produit attendait des corrections de bugs, une stratégie de tests, et des fonctionnalités avant d’élargir le déploiement.",
            "Les attentes incluaient : corriger les régressions existantes, développer de nouvelles règles tarifaires en TDD, compléter les tests d’intégration, et fournir des preuves d’exécution (rapports Surefire + JaCoCo)."
          ]
        },
        {
          type: "bullets",
          title: "Objectifs & exigences",
          items: [
            "Corriger le bug de tarification qui produisait des durées négatives lorsque le véhicule restait plus de 24h.",
            "Implémenter la gratuité pour les 30 premières minutes (0$) et la couvrir par des tests unitaires (TDD).",
            "Implémenter une remise de 5% pour les utilisateurs récurrents (basée sur le nombre de tickets) et la couvrir par des tests unitaires (TDD).",
            "Renforcer les tests de ParkingService via des mocks Mockito et atteindre une forte couverture sur cette classe.",
            "Compléter les TODO des tests d’intégration (base de données) et atteindre une couverture globale >= 70%."
          ]
        },
        {
          type: "timeline",
          title: "Déroulé de mise en œuvre",
          steps: [
            {
              title: "Baseline & reproduction",
              description:
                "Mise en place du versioning, exécution mvn test / mvn verify, puis analyse des tests en échec pour isoler les causes."
            },
            {
              title: "Correctif : durée négative (>24h)",
              description:
                "Correction du calcul de durée via des timestamps en millisecondes (Date.getTime()), puis conversion cohérente en minutes."
            },
            {
              title: "TDD : 30 minutes gratuites",
              description:
                "Écriture des tests unitaires (voiture + moto) pour un stationnement < 30 minutes, puis adaptation de FareCalculatorService pour retourner un tarif à 0 dans ce cas."
            },
            {
              title: "TDD : remise 5% utilisateur récurrent",
              description:
                "Ajout d’un chemin calculateFare(Ticket, boolean), implémentation du comptage côté TicketDAO (getNbTicket), et application de la remise lorsque l’utilisateur n’en est pas à son premier passage."
            },
            {
              title: "Durcissement tests unitaires (Mockito)",
              description:
                "Complétion des tests unitaires de ParkingService via mocks (TicketDAO, ParkingSpotDAO, InputReader), et ajout de tests ciblés pour couvrir les chemins nominaux et les cas d’échec."
            },
            {
              title: "Tests d’intégration + rapports",
              description:
                "Complétion des TODO dans ParkingDatabaseIT, ajout d’un test d’intégration pour la remise (utilisateur récurrent), puis génération des rapports Surefire + JaCoCo via mvn verify."
            }
          ]
        },
        {
          type: "metrics",
          title: "Résultats qualité",
          items: [
            { label: "Fiabilité tarification", value: "Bug de durée négative corrigé" },
            { label: "Fonctionnalités livrées", value: "30 min gratuites + remise 5% utilisateur récurrent" },
            { label: "Périmètre de tests", value: "Tests unitaires + tests d’intégration (DB)" },
            { label: "Objectifs de couverture", value: ">= 70% global ; > 90% sur ParkingService (instructions)", note: "Vérifié via JaCoCo" },
            { label: "Preuves", value: "Rapports Surefire + JaCoCo capturés", note: "Captures incluses dans les livrables" }
          ]
        },
        {
          type: "resources",
          title: "Livrables & preuves",
          items: [
            { label: "Brief du projet (DOCX)", href: "/docs/projects/parkit-java-testing/brief-parkit.docx" },
            { label: "Guide d’étapes (PDF)", href: "/docs/projects/parkit-java-testing/guide-etapes.pdf" },
            { label: "Guide d’étapes clés (PDF)", href: "/docs/projects/parkit-java-testing/guide-etapes-cles.pdf" },
            { label: "Kit technique onboarding (PDF)", href: "/docs/projects/parkit-java-testing/kit-technique-onboarding.pdf" },
            { label: "Version archivée (PDF)", href: "/docs/projects/parkit-java-testing/ancienne-version-mai-2023.pdf" },
            { label: "Captures rapports tests (ZIP)", href: "/docs/projects/parkit-java-testing/screenshots.zip" },
            { label: "Dépôt GitHub", href: "https://github.com/Aiyeesha/ParkingSystem.git" },
            { label: "Télécharger le lien du dépôt (TXT)", href: "/docs/projects/parkit-java-testing/repository-link.txt" }
          ]
        },
        {
          type: "code",
          title: "Dépôt",
          language: "text",
          code: "https://github.com/Aiyeesha/ParkingSystem.git",
        }
      ]
    },
    es: {
      heroSubtitle: "TDD + pruebas unitarias y de integración en un sistema de pago de parking en Java (Park’it)",
      sections: [
        {
          type: "text",
          title: "Contexto",
          paragraphs: [
            "Park’it es un backend de pago de aparcamiento (interfaz en terminal) que debe pasar de una beta a una versión más robusta. El equipo de producto esperaba correcciones de errores, una estrategia de pruebas y nuevas funcionalidades antes de ampliar el despliegue.",
            "Las expectativas incluían: corregir las regresiones existentes, desarrollar nuevas reglas de tarificación en TDD, completar las pruebas de integración pendientes y proporcionar evidencias de ejecución (informes Surefire + JaCoCo)."
          ]
        },
        {
          type: "bullets",
          title: "Objetivos y requisitos",
          items: [
            "Corregir el error de tarificación que producía duraciones negativas cuando el vehículo permanecía más de 24h.",
            "Implementar la gratuidad de los primeros 30 minutos (0$) y cubrirla con pruebas unitarias (TDD).",
            "Implementar un descuento del 5% para usuarios recurrentes (según el número de tickets) y cubrirlo con pruebas unitarias (TDD).",
            "Reforzar las pruebas de ParkingService mediante mocks de Mockito y alcanzar una alta cobertura en esa clase.",
            "Completar los TODO de las pruebas de integración (base de datos) y alcanzar una cobertura global >= 70%."
          ]
        },
        {
          type: "timeline",
          title: "Flujo de implementación",
          steps: [
            {
              title: "Línea base y reproducción",
              description:
                "Configuración del versionado, ejecución de mvn test / mvn verify, y análisis de las pruebas fallidas para aislar las causas."
            },
            {
              title: "Corrección: duración negativa (>24h)",
              description:
                "Corrección del cálculo de duración mediante timestamps en milisegundos (Date.getTime()), con conversión coherente a minutos."
            },
            {
              title: "TDD: 30 minutos gratuitos",
              description:
                "Escritura de pruebas unitarias (coche + moto) para estancias < 30 minutos, y adaptación de FareCalculatorService para devolver una tarifa de 0 en ese caso."
            },
            {
              title: "TDD: descuento 5% usuario recurrente",
              description:
                "Añadido de un flujo calculateFare(Ticket, boolean), implementación del conteo en TicketDAO (getNbTicket), y aplicación del descuento cuando el usuario no está en su primer uso."
            },
            {
              title: "Refuerzo de pruebas unitarias (Mockito)",
              description:
                "Ampliación de las pruebas unitarias de ParkingService mediante mocks (TicketDAO, ParkingSpotDAO, InputReader), y adición de pruebas específicas para cubrir los caminos exitosos y de error."
            },
            {
              title: "Pruebas de integración + informes",
              description:
                "Finalización de los TODO en ParkingDatabaseIT, adición de una prueba de integración para el descuento (usuario recurrente), y generación de los informes Surefire + JaCoCo mediante mvn verify."
            }
          ]
        },
        {
          type: "metrics",
          title: "Resultados de calidad",
          items: [
            { label: "Fiabilidad de tarificación", value: "Error de duración negativa corregido" },
            { label: "Funcionalidades entregadas", value: "30 min gratis + descuento 5% usuario recurrente" },
            { label: "Alcance de pruebas", value: "Pruebas unitarias + pruebas de integración (BD)" },
            { label: "Objetivos de cobertura", value: ">= 70% global; > 90% en ParkingService (instrucciones)", note: "Verificado vía JaCoCo" },
            { label: "Evidencias", value: "Informes Surefire + JaCoCo capturados", note: "Capturas incluidas en los entregables" }
          ]
        },
        {
          type: "resources",
          title: "Entregables y evidencias",
          items: [
            { label: "Brief del proyecto (DOCX)", href: "/docs/projects/parkit-java-testing/brief-parkit.docx" },
            { label: "Guía de pasos (PDF)", href: "/docs/projects/parkit-java-testing/guide-etapes.pdf" },
            { label: "Guía de pasos clave (PDF)", href: "/docs/projects/parkit-java-testing/guide-etapes-cles.pdf" },
            { label: "Kit técnico de incorporación (PDF)", href: "/docs/projects/parkit-java-testing/kit-technique-onboarding.pdf" },
            { label: "Versión archivada (PDF)", href: "/docs/projects/parkit-java-testing/ancienne-version-mai-2023.pdf" },
            { label: "Capturas de informes de pruebas (ZIP)", href: "/docs/projects/parkit-java-testing/screenshots.zip" },
            { label: "Repositorio GitHub", href: "https://github.com/Aiyeesha/ParkingSystem.git" },
            { label: "Descargar enlace del repositorio (TXT)", href: "/docs/projects/parkit-java-testing/repository-link.txt" }
          ]
        },
        {
          type: "code",
          title: "Repositorio",
          language: "text",
          code: "https://github.com/Aiyeesha/ParkingSystem.git",
        }
      ]
    }
  }
},

{
  slug: "pochlib-ui",
  gallery: [
      { src: "/projects/pochlib-ui/screenshot-1.png", alt: "Poch'Lib UI — screenshot 1" },
      { src: "/projects/pochlib-ui/screenshot-2.png", alt: "Poch'Lib UI — screenshot 2" },
      { src: "/projects/pochlib-ui/screenshot-3.png", alt: "Poch'Lib UI — screenshot 3" },
      { src: "/projects/pochlib-ui/screenshot-4.png", alt: "Poch'Lib UI — screenshot 4" },
      { src: "/projects/pochlib-ui/screenshot-5.png", alt: "Poch'Lib UI — screenshot 5" },
      { src: "/projects/pochlib-ui/screenshot-6.png", alt: "Poch'Lib UI — screenshot 6" },
      { src: "/projects/pochlib-ui/screenshot-7.png", alt: "Poch'Lib UI — screenshot 7" },
      { src: "/projects/pochlib-ui/screenshot-8.png", alt: "Poch'Lib UI — screenshot 8" },
      { src: "/projects/pochlib-ui/screenshot-9.png", alt: "Poch'Lib UI — screenshot 9" },
      { src: "/projects/pochlib-ui/screenshot-10.png", alt: "Poch'Lib UI — screenshot 10" },
      { src: "/projects/pochlib-ui/screenshot-11.png", alt: "Poch'Lib UI — screenshot 11" },
      { src: "/projects/pochlib-ui/screenshot-12.png", alt: "Poch'Lib UI — screenshot 12" },
      { src: "/projects/pochlib-ui/screenshot-13.png", alt: "Poch'Lib UI — screenshot 13" },
      { src: "/projects/pochlib-ui/screenshot-14.png", alt: "Poch'Lib UI — screenshot 14" },
      { src: "/projects/pochlib-ui/screenshot-15.png", alt: "Poch'Lib UI — screenshot 15" },
      { src: "/projects/pochlib-ui/screenshot-16.png", alt: "Poch'Lib UI — screenshot 16" },
      { src: "/projects/pochlib-ui/screenshot-17.png", alt: "Poch'Lib UI — screenshot 17" },
      { src: "/projects/pochlib-ui/screenshot-18.png", alt: "Poch'Lib UI — screenshot 18" },
      { src: "/projects/pochlib-ui/screenshot-19.png", alt: "Poch'Lib UI — screenshot 19" },
      { src: "/projects/pochlib-ui/screenshot-20.png", alt: "Poch'Lib UI — screenshot 20" },
      { src: "/projects/pochlib-ui/screenshot-21.png", alt: "Poch'Lib UI — screenshot 21" },
  ],
  locales: {
    en: {
      heroSubtitle: "Single Page Application UI for a bookstore (Poch'Lib)",
      sections: [
        {
          type: "text",
          title: "Context",
          paragraphs: [
            "Great’App (Nice) asked for the front-end of Poch’Lib, a book management app commissioned by the bookstore “La plume enchantée”.",
            "The deliverable is a responsive Single Page Application (mobile/tablet/desktop) aligned with functional specifications and UX wireframes."
          ]
        },
        {
          type: "bullets",
          title: "Core features",
          items: [
            "Search and add a book to the user’s list.",
            "Display the saved books and remove a book from the list.",
            "Responsive UI with 3 breakpoints (mobile / tablet / desktop)."
          ]
        },
        {
          type: "bullets",
          title: "Implementation highlights",
          items: [
            "Mobile-first integration matching the provided wireframes as closely as possible.",
            "Clean HTML semantics and structured styles (DRY approach, Sass).",
            "Vanilla JavaScript to update the DOM (add/remove elements, UI states).",
            "Fetch-based API calls to retrieve content dynamically."
          ]
        },
        {
          type: "metrics",
          title: "Quality signals",
          items: [
            { label: "Responsive", value: "3 formats (mobile / tablet / desktop)" },
            { label: "UI consistency", value: "Wireframes respected; coherent typography and spacing" },
            { label: "Front-end practice", value: "HTML/CSS/JS best practices + Sass" },
            { label: "Dynamic behavior", value: "DOM updates + Fetch integration" }
          ]
        },
        {
          type: "resources",
          title: "Deliverables & proofs",
          items: [
            { label: "Functional specifications (PDF)", href: "/docs/projects/pochlib-ui/functional-specs.pdf" },
            { label: "Project brief & jury report (DOCX)", href: "/docs/projects/pochlib-ui/brief.docx" },
            { label: "Demo HTML page (HTML)", href: "/docs/projects/pochlib-ui/index.html" },
            { label: "GitHub repository", href: "https://github.com/Aiyeesha/Projet-6-Creez-une-interface-utilisateur-pour-votre-application-PochLib.git" },
            { label: "Download repository link (TXT)", href: "/docs/projects/pochlib-ui/repository-link.txt" }
          ]
        },
        {
          type: "code",
          title: "Repository",
          language: "text",
          code: "https://github.com/Aiyeesha/Projet-6-Creez-une-interface-utilisateur-pour-votre-application-PochLib.git",
        }
      ]
    },
    fr: {
      heroSubtitle: "Interface Single Page Application pour une librairie (Poch’Lib)",
      sections: [
        {
          type: "text",
          title: "Contexte",
          paragraphs: [
            "Great’App (Nice) m’a confié la réalisation du front-end de Poch’Lib, une application de gestion de livres commandée par la librairie « La plume enchantée ».",
            "Le livrable attendu est une Single Page Application responsive (mobile/tablette/bureau), conforme aux spécifications fonctionnelles et aux wireframes UX."
          ]
        },
        {
          type: "bullets",
          title: "Fonctionnalités clés",
          items: [
            "Rechercher et ajouter un livre à sa liste.",
            "Afficher les livres enregistrés et supprimer un livre de la liste.",
            "Interface responsive sur 3 formats (mobile / tablette / bureau)."
          ]
        },
        {
          type: "bullets",
          title: "Points techniques",
          items: [
            "Intégration mobile-first en respectant au maximum les wireframes fournis.",
            "HTML sémantique + styles structurés (approche DRY, Sass).",
            "JavaScript vanilla pour mettre à jour le DOM (ajout/suppression, états UI).",
            "Fetch pour interagir avec une API et récupérer le contenu dynamiquement."
          ]
        },
        {
          type: "metrics",
          title: "Signaux qualité",
          items: [
            { label: "Responsive", value: "3 formats (mobile / tablette / bureau)" },
            { label: "Cohérence graphique", value: "Wireframes respectés + typo/espacements cohérents" },
            { label: "Bonnes pratiques", value: "HTML/CSS/JS + Sass (CSS structuré)" },
            { label: "Dynamisme", value: "Manipulation DOM + Fetch (API)" }
          ]
        },
        {
          type: "resources",
          title: "Livrables & preuves",
          items: [
            { label: "Spécifications fonctionnelles (PDF)", href: "/docs/projects/pochlib-ui/functional-specs.pdf" },
            { label: "Brief & compte rendu jury (DOCX)", href: "/docs/projects/pochlib-ui/brief.docx" },
            { label: "Page HTML de démonstration (HTML)", href: "/docs/projects/pochlib-ui/index.html" },
            { label: "Dépôt GitHub", href: "https://github.com/Aiyeesha/Projet-6-Creez-une-interface-utilisateur-pour-votre-application-PochLib.git" },
            { label: "Télécharger le lien du dépôt (TXT)", href: "/docs/projects/pochlib-ui/repository-link.txt" }
          ]
        },
        {
          type: "code",
          title: "Dépôt",
          language: "text",
          code: "https://github.com/Aiyeesha/Projet-6-Creez-une-interface-utilisateur-pour-votre-application-PochLib.git",
        }
      ]
    },
    es: {
      heroSubtitle: "Interfaz Single Page Application para una librería (Poch’Lib)",
      sections: [
        {
          type: "text",
          title: "Contexto",
          paragraphs: [
            "Great’App (Niza) me encargó la realización del front-end de Poch’Lib, una aplicación de gestión de libros solicitada por la librería «La plume enchantée».",
            "El entregable esperado es una Single Page Application responsive (móvil/tablet/escritorio), conforme a las especificaciones funcionales y a los wireframes UX."
          ]
        },
        {
          type: "bullets",
          title: "Funcionalidades clave",
          items: [
            "Buscar y añadir un libro a la lista del usuario.",
            "Mostrar los libros guardados y eliminar un libro de la lista.",
            "Interfaz responsive en 3 formatos (móvil / tablet / escritorio)."
          ]
        },
        {
          type: "bullets",
          title: "Puntos técnicos",
          items: [
            "Integración mobile-first respetando al máximo los wireframes proporcionados.",
            "HTML semántico + estilos estructurados (enfoque DRY, Sass).",
            "JavaScript vanilla para actualizar el DOM (añadir/eliminar, estados de UI).",
            "Fetch para interactuar con una API y obtener el contenido dinámicamente."
          ]
        },
        {
          type: "metrics",
          title: "Señales de calidad",
          items: [
            { label: "Responsive", value: "3 formatos (móvil / tablet / escritorio)" },
            { label: "Coherencia visual", value: "Wireframes respetados + tipografía/espaciados coherentes" },
            { label: "Buenas prácticas", value: "HTML/CSS/JS + Sass (CSS estructurado)" },
            { label: "Dinamismo", value: "Manipulación del DOM + Fetch (API)" }
          ]
        },
        {
          type: "resources",
          title: "Entregables y evidencias",
          items: [
            { label: "Especificaciones funcionales (PDF)", href: "/docs/projects/pochlib-ui/functional-specs.pdf" },
            { label: "Brief e informe del jurado (DOCX)", href: "/docs/projects/pochlib-ui/brief.docx" },
            { label: "Página HTML de demostración (HTML)", href: "/docs/projects/pochlib-ui/index.html" },
            { label: "Repositorio GitHub", href: "https://github.com/Aiyeesha/Projet-6-Creez-une-interface-utilisateur-pour-votre-application-PochLib.git" },
            { label: "Descargar enlace del repositorio (TXT)", href: "/docs/projects/pochlib-ui/repository-link.txt" }
          ]
        },
        {
          type: "code",
          title: "Repositorio",
          language: "text",
          code: "https://github.com/Aiyeesha/Projet-6-Creez-une-interface-utilisateur-pour-votre-application-PochLib.git",
        }
      ]
    }
  }
},

// ─────────────────────────────────────────────────────────────────────────────
// PYTHON PASSWORD CHECKER
// ─────────────────────────────────────────────────────────────────────────────
{
  slug: "python-password-checker",
  gallery: [
      { src: "/projects/python-password-checker/cover.svg", alt: "Password Checker — cover" },
      { src: "/projects/python-password-checker/screenshot-1.svg", alt: "Password Checker — screenshot 1" },
  ],
  locales: {
    en: {
      heroSubtitle: "Password strength analyzer — entropy, regex, HaveIBeenPwned (Python CLI)",
      sections: [
        {
          type: "text",
          title: "Context",
          paragraphs: [
            "A command-line tool that rigorously evaluates password strength without ever transmitting the password in plain text. Built as a security-focused personal project to explore Python's regex engine, entropy math, and privacy-preserving API design.",
            "The tool runs interactively in the terminal, masks input at the prompt, and produces a full structured report in one pass."
          ]
        },
        {
          type: "bullets",
          title: "What I built",
          items: [
            "Entropy calculation based on character-pool size and password length (bits), with a 0–100 composite score.",
            "Regex-based pattern detection: repeated characters, numeric/alphabetic sequences, keyboard walks (qwerty/azerty), embedded years, and long digit runs.",
            "Dictionary matching against a curated list of 30+ common passwords and base words.",
            "Crack-time estimation at three attack speeds (10k/s, 1M/s, 1B/s) using the full search-space formula.",
            "HaveIBeenPwned integration using the k-anonymity model: only the first 5 characters of the SHA-1 hash are sent to the API — the actual password never leaves the machine.",
            "ANSI-colored terminal output with a progress bar, per-criterion checklist, and actionable improvement suggestions."
          ]
        },
        {
          type: "metrics",
          title: "Key technical choices",
          items: [
            { label: "Entropy model", value: "log₂(pool^length) — character-pool aware" },
            { label: "HIBP privacy", value: "k-anonymity — only 5-char SHA-1 prefix sent" },
            { label: "Pattern engine", value: "9 compiled regex rules (RE_REPEAT, RE_SEQ_NUM, RE_KEYBOARD…)" },
            { label: "Score range", value: "0–100 with length, complexity, entropy bonuses & penalties" },
            { label: "Dependencies", value: "stdlib only (re, hashlib, math, getpass) + optional requests" }
          ]
        },
        {
          type: "code",
          title: "Run it",
          language: "bash",
          code: `# No install needed — stdlib only (requests optional for HIBP)\npython password_checker.py`
        }
      ]
    },
    fr: {
      heroSubtitle: "Analyseur de force de mot de passe — entropie, regex, HaveIBeenPwned (CLI Python)",
      sections: [
        {
          type: "text",
          title: "Contexte",
          paragraphs: [
            "Un outil en ligne de commande qui évalue rigoureusement la force d'un mot de passe sans jamais le transmettre en clair. Projet personnel centré sur la sécurité pour explorer le moteur regex de Python, le calcul d'entropie et la conception d'API respectueuses de la vie privée.",
            "L'outil fonctionne en mode interactif dans le terminal, masque la saisie et produit un rapport structuré complet en une seule passe."
          ]
        },
        {
          type: "bullets",
          title: "Ce que j'ai réalisé",
          items: [
            "Calcul de l'entropie basé sur la taille du pool de caractères et la longueur du mot de passe (bits), avec un score composite de 0 à 100.",
            "Détection de patterns par regex : caractères répétés, séquences numériques/alphabétiques, walks clavier (qwerty/azerty), années intégrées, longues séquences numériques.",
            "Correspondance avec un dictionnaire de 30+ mots de passe courants.",
            "Estimation du temps de crack à trois vitesses d'attaque (10k/s, 1M/s, 1 milliard/s) via la formule de l'espace de recherche.",
            "Intégration HaveIBeenPwned par k-anonymat : seuls les 5 premiers caractères du hash SHA-1 sont envoyés à l'API — le mot de passe ne quitte jamais la machine.",
            "Sortie terminal colorée ANSI avec barre de progression, checklist par critère et suggestions d'amélioration."
          ]
        },
        {
          type: "metrics",
          title: "Choix techniques clés",
          items: [
            { label: "Modèle d'entropie", value: "log₂(pool^longueur) — adapté au pool de caractères" },
            { label: "Confidentialité HIBP", value: "k-anonymat — seulement 5 caractères du hash SHA-1 envoyés" },
            { label: "Moteur de patterns", value: "9 règles regex compilées (RE_REPEAT, RE_SEQ_NUM, RE_KEYBOARD…)" },
            { label: "Plage de score", value: "0–100 avec bonus longueur, complexité, entropie et pénalités" },
            { label: "Dépendances", value: "stdlib uniquement (re, hashlib, math, getpass) + requests optionnel" }
          ]
        },
        {
          type: "code",
          title: "Lancer l'outil",
          language: "bash",
          code: `# Aucune installation requise — stdlib uniquement (requests optionnel pour HIBP)\npython password_checker.py`
        }
      ]
    },
    es: {
      heroSubtitle: "Analizador de fortaleza de contraseñas — entropía, regex, HaveIBeenPwned (CLI Python)",
      sections: [
        {
          type: "text",
          title: "Contexto",
          paragraphs: [
            "Una herramienta de línea de comandos que evalúa rigurosamente la fortaleza de una contraseña sin transmitirla nunca en texto plano. Proyecto personal centrado en la seguridad para explorar el motor de regex de Python, el cálculo de entropía y el diseño de APIs respetuosas con la privacidad.",
            "La herramienta funciona en modo interactivo en la terminal, enmascara la entrada y produce un informe estructurado completo en una sola pasada."
          ]
        },
        {
          type: "bullets",
          title: "Lo que construí",
          items: [
            "Cálculo de entropía basado en el tamaño del conjunto de caracteres y la longitud de la contraseña (bits), con una puntuación compuesta de 0 a 100.",
            "Detección de patrones mediante regex: caracteres repetidos, secuencias numéricas/alfabéticas, patrones de teclado (qwerty/azerty), años incluidos, largas series numéricas.",
            "Comparación con un diccionario de 30+ contraseñas comunes.",
            "Estimación del tiempo de crackeo a tres velocidades de ataque (10k/s, 1M/s, 1.000M/s) mediante la fórmula del espacio de búsqueda.",
            "Integración con HaveIBeenPwned mediante k-anonimato: solo se envían a la API los 5 primeros caracteres del hash SHA-1 — la contraseña nunca sale de la máquina.",
            "Salida de terminal coloreada con ANSI, barra de progreso, checklist por criterio y sugerencias de mejora accionables."
          ]
        },
        {
          type: "metrics",
          title: "Decisiones técnicas clave",
          items: [
            { label: "Modelo de entropía", value: "log₂(pool^longitud) — adaptado al conjunto de caracteres" },
            { label: "Privacidad HIBP", value: "k-anonimato — solo se envían 5 caracteres del hash SHA-1" },
            { label: "Motor de patrones", value: "9 reglas regex compiladas (RE_REPEAT, RE_SEQ_NUM, RE_KEYBOARD…)" },
            { label: "Rango de puntuación", value: "0–100 con bonificaciones de longitud, complejidad, entropía y penalizaciones" },
            { label: "Dependencias", value: "solo stdlib (re, hashlib, math, getpass) + requests opcional" }
          ]
        },
        {
          type: "code",
          title: "Ejecutar la herramienta",
          language: "bash",
          code: `# No requiere instalación — solo stdlib (requests opcional para HIBP)\npython password_checker.py`
        }
      ]
    }
  }
},

// ─────────────────────────────────────────────────────────────────────────────
// PYTHON NETWORK SCANNER
// ─────────────────────────────────────────────────────────────────────────────
{
  slug: "python-network-scanner",
  gallery: [
      { src: "/projects/python-network-scanner/cover.svg", alt: "Network Scanner — cover" },
      { src: "/projects/python-network-scanner/screenshot-1.svg", alt: "Network Scanner — screenshot 1" },
  ],
  locales: {
    en: {
      heroSubtitle: "Real-time network scanner — FastAPI backend + WebSocket + React/Vite UI",
      sections: [
        {
          type: "text",
          title: "Context",
          paragraphs: [
            "A full-stack local network scanner built as a personal security project. The goal was to produce a tool that identifies live hosts and open ports on a LAN segment, streams results in real time, and classifies each service by risk level.",
            "The project is split into two layers: a FastAPI Python backend that does the actual scanning with concurrent threads, and a React/Vite frontend that connects over WebSocket and displays results live."
          ]
        },
        {
          type: "bullets",
          title: "What I built",
          items: [
            "FastAPI backend with a WebSocket endpoint that streams scan results as they arrive — no polling, no page refresh.",
            "Concurrent port scanner using ThreadPoolExecutor: scans all top ports across a subnet in parallel, then aggregates results per host.",
            "Service detection table covering 100+ well-known ports (HTTP, SSH, RDP, MSSQL, Redis, MongoDB, Docker, K8s API…).",
            "Risk classification (high / medium / low) per open port based on a curated RISK_MAP (Telnet, RDP, Metasploit listener, exposed databases…).",
            "CORS-enabled REST API alongside the WebSocket endpoint for easy integration with any frontend.",
            "React/Vite frontend with live-updating host cards, port badges colour-coded by risk, and scan progress indicator."
          ]
        },
        {
          type: "metrics",
          title: "Technical highlights",
          items: [
            { label: "Transport", value: "WebSocket (FastAPI + uvicorn) — real-time streaming" },
            { label: "Concurrency", value: "ThreadPoolExecutor — parallel port probing per host" },
            { label: "Port coverage", value: "100+ known services mapped in KNOWN_SERVICES dict" },
            { label: "Risk levels", value: "high / medium / low per port (Telnet, RDP, exposed DBs…)" },
            { label: "Stack", value: "Python 3, FastAPI, uvicorn, websockets · React 18, Vite" }
          ]
        },
        {
          type: "timeline",
          title: "How it works",
          steps: [
            {
              title: "Host discovery",
              description: "The backend resolves the local subnet and pings each IP to build a list of live hosts."
            },
            {
              title: "Concurrent port scan",
              description: "For each live host, a ThreadPoolExecutor probes the TOP_PORTS list concurrently, collecting open ports and their service names."
            },
            {
              title: "Risk classification",
              description: "Each open port is looked up in RISK_MAP and tagged high / medium / low based on known exposure risk."
            },
            {
              title: "WebSocket streaming",
              description: "Results are pushed to the frontend in real time as each host finishes scanning — no need to wait for the full scan to complete."
            },
            {
              title: "React UI rendering",
              description: "The Vite/React frontend receives JSON events over WebSocket and renders host cards with colour-coded port badges on the fly."
            }
          ]
        },
        {
          type: "code",
          title: "Run it",
          language: "bash",
          code: `# Backend\npip install fastapi uvicorn websockets\npython backend.py\n\n# Frontend (separate terminal)\ncd scanner-ui\nnpm install && npm run dev`
        }
      ]
    },
    fr: {
      heroSubtitle: "Scanner réseau temps réel — backend FastAPI + WebSocket + interface React/Vite",
      sections: [
        {
          type: "text",
          title: "Contexte",
          paragraphs: [
            "Un scanner de réseau local full-stack réalisé comme projet personnel de sécurité. L'objectif était de produire un outil capable d'identifier les hôtes actifs et les ports ouverts sur un segment LAN, de diffuser les résultats en temps réel et de classer chaque service par niveau de risque.",
            "Le projet se compose de deux couches : un backend Python FastAPI qui effectue le scan réel avec des threads concurrents, et un frontend React/Vite qui se connecte via WebSocket et affiche les résultats en direct."
          ]
        },
        {
          type: "bullets",
          title: "Ce que j'ai réalisé",
          items: [
            "Backend FastAPI avec un endpoint WebSocket qui diffuse les résultats au fur et à mesure — sans polling ni rechargement de page.",
            "Scanner de ports concurrent via ThreadPoolExecutor : parcourt tous les top ports d'un sous-réseau en parallèle, puis agrège les résultats par hôte.",
            "Table de détection de services couvrant 100+ ports connus (HTTP, SSH, RDP, MSSQL, Redis, MongoDB, Docker, K8s API…).",
            "Classification des risques (élevé / moyen / faible) par port ouvert basée sur un RISK_MAP (Telnet, RDP, listener Metasploit, bases de données exposées…).",
            "API REST avec CORS activé en parallèle du endpoint WebSocket pour faciliter l'intégration.",
            "Frontend React/Vite avec cartes d'hôtes en mise à jour temps réel, badges de ports colorés par risque et indicateur de progression du scan."
          ]
        },
        {
          type: "metrics",
          title: "Points techniques clés",
          items: [
            { label: "Transport", value: "WebSocket (FastAPI + uvicorn) — streaming temps réel" },
            { label: "Concurrence", value: "ThreadPoolExecutor — sondage parallèle des ports par hôte" },
            { label: "Couverture ports", value: "100+ services connus dans le dict KNOWN_SERVICES" },
            { label: "Niveaux de risque", value: "élevé / moyen / faible par port (Telnet, RDP, BDD exposées…)" },
            { label: "Stack", value: "Python 3, FastAPI, uvicorn, websockets · React 18, Vite" }
          ]
        },
        {
          type: "timeline",
          title: "Fonctionnement",
          steps: [
            {
              title: "Découverte des hôtes",
              description: "Le backend résout le sous-réseau local et pinge chaque IP pour construire la liste des hôtes actifs."
            },
            {
              title: "Scan de ports concurrent",
              description: "Pour chaque hôte actif, un ThreadPoolExecutor sonde la liste TOP_PORTS en parallèle, collectant les ports ouverts et les noms de services."
            },
            {
              title: "Classification des risques",
              description: "Chaque port ouvert est recherché dans RISK_MAP et étiqueté élevé / moyen / faible selon le risque d'exposition connu."
            },
            {
              title: "Streaming WebSocket",
              description: "Les résultats sont envoyés au frontend en temps réel dès que chaque hôte termine son scan — sans attendre la fin du scan complet."
            },
            {
              title: "Rendu React UI",
              description: "Le frontend Vite/React reçoit des événements JSON via WebSocket et affiche des cartes d'hôtes avec des badges de ports colorés à la volée."
            }
          ]
        },
        {
          type: "code",
          title: "Lancer le projet",
          language: "bash",
          code: `# Backend\npip install fastapi uvicorn websockets\npython backend.py\n\n# Frontend (terminal séparé)\ncd scanner-ui\nnpm install && npm run dev`
        }
      ]
    },
    es: {
      heroSubtitle: "Escáner de red en tiempo real — backend FastAPI + WebSocket + interfaz React/Vite",
      sections: [
        {
          type: "text",
          title: "Contexto",
          paragraphs: [
            "Un escáner de red local full-stack realizado como proyecto personal de seguridad. El objetivo era producir una herramienta capaz de identificar los hosts activos y los puertos abiertos en un segmento LAN, transmitir los resultados en tiempo real y clasificar cada servicio por nivel de riesgo.",
            "El proyecto se compone de dos capas: un backend Python FastAPI que realiza el escaneo real con hilos concurrentes, y un frontend React/Vite que se conecta vía WebSocket y muestra los resultados en directo."
          ]
        },
        {
          type: "bullets",
          title: "Lo que construí",
          items: [
            "Backend FastAPI con un endpoint WebSocket que transmite los resultados a medida que se obtienen — sin polling ni recarga de página.",
            "Escáner de puertos concurrente mediante ThreadPoolExecutor: recorre todos los puertos principales de una subred en paralelo, y luego agrega los resultados por host.",
            "Tabla de detección de servicios que cubre 100+ puertos conocidos (HTTP, SSH, RDP, MSSQL, Redis, MongoDB, Docker, K8s API…).",
            "Clasificación de riesgo (alto / medio / bajo) por puerto abierto basada en un RISK_MAP curado (Telnet, RDP, listener de Metasploit, bases de datos expuestas…).",
            "API REST con CORS habilitado en paralelo al endpoint WebSocket para facilitar la integración.",
            "Frontend React/Vite con tarjetas de host actualizadas en tiempo real, badges de puertos coloreados por riesgo e indicador de progreso del escaneo."
          ]
        },
        {
          type: "metrics",
          title: "Puntos técnicos clave",
          items: [
            { label: "Transporte", value: "WebSocket (FastAPI + uvicorn) — streaming en tiempo real" },
            { label: "Concurrencia", value: "ThreadPoolExecutor — sondeo paralelo de puertos por host" },
            { label: "Cobertura de puertos", value: "100+ servicios conocidos en el dict KNOWN_SERVICES" },
            { label: "Niveles de riesgo", value: "alto / medio / bajo por puerto (Telnet, RDP, BD expuestas…)" },
            { label: "Stack", value: "Python 3, FastAPI, uvicorn, websockets · React 18, Vite" }
          ]
        },
        {
          type: "timeline",
          title: "Funcionamiento",
          steps: [
            {
              title: "Descubrimiento de hosts",
              description: "El backend resuelve la subred local y hace ping a cada IP para construir la lista de hosts activos."
            },
            {
              title: "Escaneo de puertos concurrente",
              description: "Para cada host activo, un ThreadPoolExecutor sondea la lista TOP_PORTS en paralelo, recopilando los puertos abiertos y los nombres de servicios."
            },
            {
              title: "Clasificación de riesgos",
              description: "Cada puerto abierto se busca en RISK_MAP y se etiqueta como alto / medio / bajo según el riesgo de exposición conocido."
            },
            {
              title: "Streaming WebSocket",
              description: "Los resultados se envían al frontend en tiempo real en cuanto cada host termina su escaneo — sin esperar a que finalice el escaneo completo."
            },
            {
              title: "Renderizado de la UI React",
              description: "El frontend Vite/React recibe eventos JSON vía WebSocket y muestra tarjetas de host con badges de puertos coloreados al vuelo."
            }
          ]
        },
        {
          type: "code",
          title: "Ejecutar el proyecto",
          language: "bash",
          code: `# Backend\npip install fastapi uvicorn websockets\npython backend.py\n\n# Frontend (terminal separada)\ncd scanner-ui\nnpm install && npm run dev`
        }
      ]
    }
  }
},

// ── CYBERSECURITY DELIVERABLES ───────────────────────────────────────────────

{
  slug: "security-monitoring-dashboard",
  locales: {
    en: {
      heroSubtitle: "Real-time security monitoring dashboard — KPIs, threat indicators, and vulnerability trends.",
      sections: [
        {
          type: "text",
          title: "Context",
          paragraphs: [
            "Designed and configured a network security monitoring dashboard to give security teams and management a centralised, real-time view of the infrastructure's security posture.",
            "The dashboard surfaces the metrics that matter most — open vulnerabilities, patch coverage gaps, active alerts — and visualises trends over time to support informed decision-making."
          ]
        },
        {
          type: "bullets",
          title: "What I built",
          items: [
            "KPI widgets tracking open vulnerabilities, critical alerts, patched vs. unpatched endpoints, and mean time to remediate.",
            "Trend charts for security events, vulnerability severity distribution, and patch compliance over rolling periods.",
            "Severity-filtered views (critical / high / medium / low) to allow rapid analyst triage.",
            "Executive-facing summary panel for management reporting without raw technical noise."
          ]
        },
        {
          type: "metrics",
          title: "Key indicators covered",
          items: [
            { label: "Vulnerability KPIs", value: "Open, patched, critical — live counts" },
            { label: "Trend window", value: "Rolling 30-day event and patch history" },
            { label: "Severity views", value: "4 levels: critical / high / medium / low" },
            { label: "Audience", value: "Analyst triage + management reporting" }
          ]
        },
        {
          type: "bullets",
          title: "Tools & stack",
          items: [
            "Security dashboard platform (SIEM-style layout).",
            "Data sources: vulnerability scanner feeds, endpoint patch status, alert logs.",
            "Design principles: information hierarchy, severity colour coding, drill-down capability."
          ]
        }
      ]
    },
    fr: {
      heroSubtitle: "Tableau de bord de surveillance sécurité en temps réel — KPIs, indicateurs de menaces et tendances de vulnérabilités.",
      sections: [
        {
          type: "text",
          title: "Contexte",
          paragraphs: [
            "Conception et configuration d'un tableau de bord de surveillance sécurité réseau offrant aux équipes et à la direction une vue centralisée et temps réel de la posture de sécurité de l'infrastructure.",
            "Le dashboard met en avant les métriques essentielles — vulnérabilités ouvertes, couverture de patchs, alertes actives — et visualise les tendances pour faciliter la prise de décision."
          ]
        },
        {
          type: "bullets",
          title: "Ce que j'ai réalisé",
          items: [
            "Widgets KPI : vulnérabilités ouvertes, alertes critiques, endpoints patchés vs. non patchés, MTTR.",
            "Graphiques de tendances : événements sécurité, distribution des sévérités, conformité des patchs sur des fenêtres glissantes.",
            "Vues filtrées par sévérité (critique / élevée / moyenne / faible) pour le triage rapide des analystes.",
            "Panneau de synthèse exécutif pour les rapports de direction, sans bruit technique brut."
          ]
        },
        {
          type: "metrics",
          title: "Indicateurs couverts",
          items: [
            { label: "KPIs vulnérabilités", value: "Ouvertes, patchées, critiques — compteurs live" },
            { label: "Fenêtre de tendance", value: "Historique événements & patchs sur 30 jours glissants" },
            { label: "Vues par sévérité", value: "4 niveaux : critique / élevé / moyen / faible" },
            { label: "Public cible", value: "Triage analyste + reporting direction" }
          ]
        },
        {
          type: "bullets",
          title: "Outils & stack",
          items: [
            "Plateforme de tableau de bord sécurité (disposition de type SIEM).",
            "Sources de données : flux scanner de vulnérabilités, statut de patch endpoints, journaux d'alertes.",
            "Principes de conception : hiérarchie de l'information, code couleur sévérité, capacité de drill-down."
          ]
        }
      ]
    },
    es: {
      heroSubtitle: "Panel de monitorización de seguridad en tiempo real — KPIs, indicadores de amenazas y tendencias de vulnerabilidades.",
      sections: [
        {
          type: "text",
          title: "Contexto",
          paragraphs: [
            "Diseño y configuración de un panel de monitorización de seguridad de red que ofrece a los equipos y a la dirección una vista centralizada y en tiempo real de la postura de seguridad de la infraestructura.",
            "El panel destaca las métricas más relevantes — vulnerabilidades abiertas, cobertura de parches, alertas activas — y visualiza las tendencias a lo largo del tiempo para facilitar la toma de decisiones."
          ]
        },
        {
          type: "bullets",
          title: "Lo que construí",
          items: [
            "Widgets KPI que muestran vulnerabilidades abiertas, alertas críticas, endpoints parcheados vs. no parcheados y tiempo medio de remediación.",
            "Gráficos de tendencias para eventos de seguridad, distribución de severidad de vulnerabilidades y cumplimiento de parches en periodos móviles.",
            "Vistas filtradas por severidad (crítica / alta / media / baja) para un triaje rápido de los analistas.",
            "Panel de resumen ejecutivo para informes de dirección, sin ruido técnico crudo."
          ]
        },
        {
          type: "metrics",
          title: "Indicadores clave cubiertos",
          items: [
            { label: "KPIs de vulnerabilidades", value: "Abiertas, parcheadas, críticas — contadores en vivo" },
            { label: "Ventana de tendencia", value: "Historial de eventos y parches en 30 días móviles" },
            { label: "Vistas por severidad", value: "4 niveles: crítica / alta / media / baja" },
            { label: "Audiencia", value: "Triaje de analistas + informes de dirección" }
          ]
        },
        {
          type: "bullets",
          title: "Herramientas y stack",
          items: [
            "Plataforma de panel de seguridad (disposición tipo SIEM).",
            "Fuentes de datos: feeds del escáner de vulnerabilidades, estado de parcheo de endpoints, registros de alertas.",
            "Principios de diseño: jerarquía de la información, código de color por severidad, capacidad de drill-down."
          ]
        }
      ]
    }
  }
},
{
  slug: "vulnerability-assessment-report",
  locales: {
    en: {
      heroSubtitle: "Tenable SecurityCenter vulnerability scan — executive summary, severity rankings, and CVE-mapped remediation.",
      sections: [
        {
          type: "text",
          title: "Context",
          paragraphs: [
            "Conducted a structured vulnerability assessment using Tenable SecurityCenter to evaluate the security posture of a target network segment.",
            "The output covered two layers: an executive summary for stakeholders, and a technical port vulnerability details report for the remediation team, with every finding tied to CVE references and CVSS scores."
          ]
        },
        {
          type: "bullets",
          title: "What I delivered",
          items: [
            "Scoped and ran a Tenable SecurityCenter scan against the target environment.",
            "Executive Summary report: top-level risk score, critical/high/medium/low finding counts, and trending comparison.",
            "Port Vulnerability Details report: per-host, per-port breakdown with CVE IDs, CVSS scores, and plugin output.",
            "Remediation priority list: critical and high findings ranked by exploitability, with recommended fixes."
          ]
        },
        {
          type: "metrics",
          title: "Assessment snapshot",
          items: [
            { label: "Tool", value: "Tenable SecurityCenter" },
            { label: "Report layers", value: "Executive summary + port vulnerability details" },
            { label: "Scoring", value: "CVSS v3 — critical / high / medium / low" },
            { label: "Output", value: "CVE-mapped findings with remediation guidance" }
          ]
        },
        {
          type: "bullets",
          title: "Skills demonstrated",
          items: [
            "Vulnerability scanner configuration and scan policy scoping.",
            "Interpreting CVSS scores and mapping findings to business risk.",
            "Producing dual-audience reports (executive + technical).",
            "Prioritising remediation by exploitability and asset criticality."
          ]
        }
      ]
    },
    fr: {
      heroSubtitle: "Évaluation de vulnérabilités Tenable SecurityCenter — synthèse exécutive, classement par sévérité et remédiation mappée CVE.",
      sections: [
        {
          type: "text",
          title: "Contexte",
          paragraphs: [
            "Réalisation d'une évaluation structurée des vulnérabilités avec Tenable SecurityCenter afin d'évaluer la posture de sécurité d'un segment réseau cible.",
            "Le livrable couvre deux niveaux : une synthèse exécutive pour les parties prenantes, et un rapport technique de détails de vulnérabilités par port pour l'équipe de remédiation — chaque finding étant lié à des références CVE et des scores CVSS."
          ]
        },
        {
          type: "bullets",
          title: "Ce que j'ai livré",
          items: [
            "Définition du périmètre et exécution d'un scan Tenable SecurityCenter sur l'environnement cible.",
            "Rapport de synthèse exécutive : score de risque global, compteurs critique/élevé/moyen/faible, comparaison de tendances.",
            "Rapport de détails de vulnérabilités par port : décomposition par hôte et par port avec CVE, scores CVSS et sortie des plugins.",
            "Liste de priorités de remédiation : findings critiques et élevés classés par exploitabilité, avec les correctifs recommandés."
          ]
        },
        {
          type: "metrics",
          title: "Aperçu de l'évaluation",
          items: [
            { label: "Outil", value: "Tenable SecurityCenter" },
            { label: "Couches de rapport", value: "Synthèse exécutive + détails vulnérabilités par port" },
            { label: "Scoring", value: "CVSS v3 — critique / élevé / moyen / faible" },
            { label: "Livrable", value: "Findings mappés CVE avec guidance de remédiation" }
          ]
        },
        {
          type: "bullets",
          title: "Compétences démontrées",
          items: [
            "Configuration du scanner de vulnérabilités et définition de la politique de scan.",
            "Interprétation des scores CVSS et mapping des findings sur le risque métier.",
            "Production de rapports à double audience (exécutif + technique).",
            "Priorisation de la remédiation par exploitabilité et criticité des actifs."
          ]
        }
      ]
    },
    es: {
      heroSubtitle: "Evaluación de vulnerabilidades Tenable SecurityCenter — resumen ejecutivo, clasificación por severidad y remediación mapeada a CVE.",
      sections: [
        {
          type: "text",
          title: "Contexto",
          paragraphs: [
            "Realización de una evaluación estructurada de vulnerabilidades con Tenable SecurityCenter para evaluar la postura de seguridad de un segmento de red objetivo.",
            "El entregable cubre dos niveles: un resumen ejecutivo para las partes interesadas, y un informe técnico de detalles de vulnerabilidades por puerto para el equipo de remediación — cada hallazgo vinculado a referencias CVE y puntuaciones CVSS."
          ]
        },
        {
          type: "bullets",
          title: "Lo que entregué",
          items: [
            "Definición del alcance y ejecución de un escaneo Tenable SecurityCenter sobre el entorno objetivo.",
            "Informe de resumen ejecutivo: puntuación de riesgo global, recuentos crítico/alto/medio/bajo, comparación de tendencias.",
            "Informe de detalles de vulnerabilidades por puerto: desglose por host y por puerto con CVE, puntuaciones CVSS y salida de los plugins.",
            "Lista de prioridades de remediación: hallazgos críticos y altos clasificados por explotabilidad, con las correcciones recomendadas."
          ]
        },
        {
          type: "metrics",
          title: "Resumen de la evaluación",
          items: [
            { label: "Herramienta", value: "Tenable SecurityCenter" },
            { label: "Capas del informe", value: "Resumen ejecutivo + detalles de vulnerabilidades por puerto" },
            { label: "Puntuación", value: "CVSS v3 — crítica / alta / media / baja" },
            { label: "Entregable", value: "Hallazgos mapeados a CVE con guía de remediación" }
          ]
        },
        {
          type: "bullets",
          title: "Competencias demostradas",
          items: [
            "Configuración del escáner de vulnerabilidades y definición de la política de escaneo.",
            "Interpretación de las puntuaciones CVSS y mapeo de los hallazgos al riesgo de negocio.",
            "Producción de informes de doble audiencia (ejecutivo + técnico).",
            "Priorización de la remediación por explotabilidad y criticidad de los activos."
          ]
        }
      ]
    }
  }
},
{
  slug: "incident-response-playbook",
  locales: {
    en: {
      heroSubtitle: "Phishing incident response playbook — detect, triage, contain, eradicate, recover.",
      sections: [
        {
          type: "text",
          title: "Context",
          paragraphs: [
            "Phishing remains one of the most common initial access vectors. This playbook provides analysts with a structured, decision-driven workflow to handle phishing incidents consistently and efficiently.",
            "It covers the full incident lifecycle — from initial detection through post-incident review — with explicit decision points, escalation paths, and communication guidelines at each stage."
          ]
        },
        {
          type: "timeline",
          title: "Playbook stages",
          steps: [
            {
              title: "Detection & reporting",
              description: "Alert generated via email security gateway, SIEM rule, or user report. Initial triage: confirm phishing indicators (sender, links, attachments, headers)."
            },
            {
              title: "Containment",
              description: "Block malicious sender/domain at gateway. Quarantine affected mailboxes. Isolate any endpoint that opened a link or attachment. Reset credentials if compromise is suspected."
            },
            {
              title: "Eradication",
              description: "Remove phishing emails from all mailboxes (admin purge). Revoke active sessions. Scan endpoints for malware dropped by any clicked payload."
            },
            {
              title: "Recovery",
              description: "Restore accounts and endpoint access after verification. Re-enable services progressively. Confirm no persistence mechanisms remain."
            },
            {
              title: "Post-incident review",
              description: "Document timeline, root cause, and lessons learned. Update detection rules and user awareness training. Produce incident report for stakeholders."
            }
          ]
        },
        {
          type: "bullets",
          title: "Playbook features",
          items: [
            "Decision flowchart with diamond gates at each triage checkpoint (Is it phishing? Was a link clicked? Were credentials entered?).",
            "Escalation matrix: L1 analyst → SOC lead → CISO depending on scope and confirmed compromise.",
            "Communication templates for user notifications and management updates.",
            "Evidence collection checklist for forensic handoff or legal requirements."
          ]
        },
        {
          type: "bullets",
          title: "Skills demonstrated",
          items: [
            "Incident response lifecycle design (NIST SP 800-61 aligned).",
            "Threat modelling for phishing attack vectors.",
            "Process flowchart design for analyst decision support.",
            "Stakeholder communication and escalation planning."
          ]
        }
      ]
    },
    fr: {
      heroSubtitle: "Playbook de réponse aux incidents phishing — détecter, trier, contenir, éradiquer, récupérer.",
      sections: [
        {
          type: "text",
          title: "Contexte",
          paragraphs: [
            "Le phishing reste l'un des vecteurs d'accès initial les plus fréquents. Ce playbook fournit aux analystes un workflow structuré et guidé par des décisions pour traiter les incidents phishing de manière cohérente et efficace.",
            "Il couvre le cycle de vie complet de l'incident — de la détection initiale à la revue post-incident — avec des points de décision explicites, des chemins d'escalade et des lignes directrices de communication à chaque étape."
          ]
        },
        {
          type: "timeline",
          title: "Étapes du playbook",
          steps: [
            {
              title: "Détection & signalement",
              description: "Alerte générée par la passerelle email, une règle SIEM ou un signalement utilisateur. Triage initial : confirmer les indicateurs phishing (expéditeur, liens, pièces jointes, en-têtes)."
            },
            {
              title: "Confinement",
              description: "Bloquer l'expéditeur/domaine malveillant au niveau de la passerelle. Mettre en quarantaine les boîtes aux lettres concernées. Isoler tout endpoint ayant ouvert un lien ou une pièce jointe. Réinitialiser les identifiants si une compromission est suspectée."
            },
            {
              title: "Éradication",
              description: "Supprimer les emails phishing de toutes les boîtes aux lettres (purge admin). Révoquer les sessions actives. Scanner les endpoints à la recherche de malwares déposés par un payload cliqué."
            },
            {
              title: "Rétablissement",
              description: "Restaurer l'accès aux comptes et endpoints après vérification. Réactiver les services progressivement. Confirmer l'absence de mécanismes de persistance."
            },
            {
              title: "Revue post-incident",
              description: "Documenter la chronologie, la cause racine et les leçons apprises. Mettre à jour les règles de détection et la formation de sensibilisation. Produire un rapport d'incident pour les parties prenantes."
            }
          ]
        },
        {
          type: "bullets",
          title: "Caractéristiques du playbook",
          items: [
            "Organigramme de décision avec des portes losange à chaque point de triage (Est-ce du phishing ? Un lien a-t-il été cliqué ? Des identifiants ont-ils été saisis ?).",
            "Matrice d'escalade : analyste L1 → responsable SOC → RSSI selon la portée et la compromission confirmée.",
            "Modèles de communication pour les notifications aux utilisateurs et les mises à jour à la direction.",
            "Checklist de collecte de preuves pour transfert forensique ou exigences légales."
          ]
        },
        {
          type: "bullets",
          title: "Compétences démontrées",
          items: [
            "Conception du cycle de vie de réponse aux incidents (aligné NIST SP 800-61).",
            "Modélisation des menaces pour les vecteurs d'attaque phishing.",
            "Conception d'organigrammes de processus pour l'aide à la décision des analystes.",
            "Planification des communications parties prenantes et de l'escalade."
          ]
        }
      ]
    },
    es: {
      heroSubtitle: "Playbook de respuesta a incidentes de phishing — detectar, triar, contener, erradicar, recuperar.",
      sections: [
        {
          type: "text",
          title: "Contexto",
          paragraphs: [
            "El phishing sigue siendo uno de los vectores de acceso inicial más frecuentes. Este playbook proporciona a los analistas un flujo de trabajo estructurado y guiado por decisiones para tratar los incidentes de phishing de manera coherente y eficaz.",
            "Cubre el ciclo de vida completo del incidente — desde la detección inicial hasta la revisión posterior — con puntos de decisión explícitos, rutas de escalado y directrices de comunicación en cada etapa."
          ]
        },
        {
          type: "timeline",
          title: "Etapas del playbook",
          steps: [
            {
              title: "Detección y notificación",
              description: "Alerta generada por la pasarela de correo, una regla SIEM o una notificación de usuario. Triaje inicial: confirmar los indicadores de phishing (remitente, enlaces, adjuntos, cabeceras)."
            },
            {
              title: "Contención",
              description: "Bloquear el remitente/dominio malicioso a nivel de pasarela. Poner en cuarentena los buzones afectados. Aislar cualquier endpoint que haya abierto un enlace o adjunto. Restablecer credenciales si se sospecha compromiso."
            },
            {
              title: "Erradicación",
              description: "Eliminar los correos de phishing de todos los buzones (purga de administrador). Revocar las sesiones activas. Escanear los endpoints en busca de malware depositado por algún payload abierto."
            },
            {
              title: "Recuperación",
              description: "Restaurar el acceso a cuentas y endpoints tras la verificación. Reactivar los servicios progresivamente. Confirmar la ausencia de mecanismos de persistencia."
            },
            {
              title: "Revisión post-incidente",
              description: "Documentar la cronología, la causa raíz y las lecciones aprendidas. Actualizar las reglas de detección y la formación de concienciación. Producir un informe de incidente para las partes interesadas."
            }
          ]
        },
        {
          type: "bullets",
          title: "Características del playbook",
          items: [
            "Organigrama de decisión con puertas de rombo en cada punto de triaje (¿Es phishing? ¿Se hizo clic en un enlace? ¿Se introdujeron credenciales?).",
            "Matriz de escalado: analista L1 → responsable SOC → CISO según el alcance y el compromiso confirmado.",
            "Plantillas de comunicación para notificaciones a usuarios y actualizaciones a la dirección.",
            "Checklist de recopilación de evidencias para transferencia forense o requisitos legales."
          ]
        },
        {
          type: "bullets",
          title: "Competencias demostradas",
          items: [
            "Diseño del ciclo de vida de respuesta a incidentes (alineado con NIST SP 800-61).",
            "Modelado de amenazas para vectores de ataque de phishing.",
            "Diseño de organigramas de proceso para el apoyo a la decisión de los analistas.",
            "Planificación de comunicación con partes interesadas y escalado."
          ]
        }
      ]
    }
  }
},
{
  slug: "risk-assessment-matrix",
  locales: {
    en: {
      heroSubtitle: "5×5 risk assessment matrix — likelihood × impact scoring with color-coded severity zones and risk register template.",
      sections: [
        {
          type: "text",
          title: "Context",
          paragraphs: [
            "Built a structured 5×5 risk assessment matrix as a reusable tool for evaluating IT, infrastructure, and compliance risks across an organisation.",
            "The matrix maps likelihood (1–5) against impact (1–5) to produce a risk score, with color-coded zones (green / yellow / orange / red) to guide prioritisation and treatment decisions."
          ]
        },
        {
          type: "bullets",
          title: "What I built",
          items: [
            "5×5 matrix: likelihood (1 = rare → 5 = almost certain) × impact (1 = negligible → 5 = catastrophic).",
            "Color-coded severity zones: Low (1–4), Medium (5–9), High (10–16), Critical (17–25).",
            "Risk register template: risk ID, description, likelihood, impact, score, owner, treatment, and review date.",
            "Example risk entries covering infrastructure, access control, data exposure, and business continuity scenarios."
          ]
        },
        {
          type: "metrics",
          title: "Matrix structure",
          items: [
            { label: "Dimensions", value: "5×5 — likelihood × impact" },
            { label: "Score range", value: "1 (low) → 25 (critical)" },
            { label: "Severity zones", value: "Low / Medium / High / Critical" },
            { label: "Use cases", value: "IT infrastructure, cloud, GRC, compliance audits" }
          ]
        },
        {
          type: "bullets",
          title: "Skills demonstrated",
          items: [
            "Risk identification, scoring, and treatment planning (ISO 27005 / NIST RMF aligned).",
            "GRC tooling: risk register design and lifecycle management.",
            "Translating technical risks into business-impact language for stakeholders.",
            "Applicable across infrastructure risk, cloud security, and compliance frameworks (ISO 27001, NIS2, GDPR)."
          ]
        }
      ]
    },
    fr: {
      heroSubtitle: "Matrice de risques 5×5 — scoring probabilité × impact, zones de sévérité colorées et modèle de registre des risques.",
      sections: [
        {
          type: "text",
          title: "Contexte",
          paragraphs: [
            "Construction d'une matrice de risques 5×5 structurée comme outil réutilisable pour évaluer les risques IT, d'infrastructure et de conformité au sein d'une organisation.",
            "La matrice croise la probabilité (1–5) avec l'impact (1–5) pour produire un score de risque, avec des zones colorées (vert / jaune / orange / rouge) pour guider la priorisation et les décisions de traitement."
          ]
        },
        {
          type: "bullets",
          title: "Ce que j'ai réalisé",
          items: [
            "Matrice 5×5 : probabilité (1 = rare → 5 = quasi-certaine) × impact (1 = négligeable → 5 = catastrophique).",
            "Zones de sévérité colorées : Faible (1–4), Moyen (5–9), Élevé (10–16), Critique (17–25).",
            "Modèle de registre des risques : ID, description, probabilité, impact, score, propriétaire, traitement et date de révision.",
            "Exemples de risques couvrant l'infrastructure, le contrôle d'accès, l'exposition des données et la continuité d'activité."
          ]
        },
        {
          type: "metrics",
          title: "Structure de la matrice",
          items: [
            { label: "Dimensions", value: "5×5 — probabilité × impact" },
            { label: "Plage de scores", value: "1 (faible) → 25 (critique)" },
            { label: "Zones de sévérité", value: "Faible / Moyen / Élevé / Critique" },
            { label: "Cas d'usage", value: "Infrastructure IT, cloud, GRC, audits de conformité" }
          ]
        },
        {
          type: "bullets",
          title: "Compétences démontrées",
          items: [
            "Identification, scoring et planification du traitement des risques (aligné ISO 27005 / NIST RMF).",
            "Outillage GRC : conception de registre des risques et gestion du cycle de vie.",
            "Traduction des risques techniques en langage d'impact métier pour les parties prenantes.",
            "Applicable sur les risques d'infrastructure, la sécurité cloud et les référentiels de conformité (ISO 27001, NIS2, RGPD)."
          ]
        }
      ]
    },
    es: {
      heroSubtitle: "Matriz de riesgos 5×5 — puntuación probabilidad × impacto, zonas de severidad coloreadas y plantilla de registro de riesgos.",
      sections: [
        {
          type: "text",
          title: "Contexto",
          paragraphs: [
            "Construcción de una matriz de riesgos 5×5 estructurada como herramienta reutilizable para evaluar los riesgos de TI, infraestructura y cumplimiento dentro de una organización.",
            "La matriz cruza la probabilidad (1–5) con el impacto (1–5) para producir una puntuación de riesgo, con zonas coloreadas (verde / amarillo / naranja / rojo) que guían la priorización y las decisiones de tratamiento."
          ]
        },
        {
          type: "bullets",
          title: "Lo que construí",
          items: [
            "Matriz 5×5: probabilidad (1 = rara → 5 = casi segura) × impacto (1 = insignificante → 5 = catastrófico).",
            "Zonas de severidad coloreadas: Baja (1–4), Media (5–9), Alta (10–16), Crítica (17–25).",
            "Plantilla de registro de riesgos: ID, descripción, probabilidad, impacto, puntuación, propietario, tratamiento y fecha de revisión.",
            "Ejemplos de riesgos que cubren infraestructura, control de acceso, exposición de datos y continuidad de negocio."
          ]
        },
        {
          type: "metrics",
          title: "Estructura de la matriz",
          items: [
            { label: "Dimensiones", value: "5×5 — probabilidad × impacto" },
            { label: "Rango de puntuación", value: "1 (baja) → 25 (crítica)" },
            { label: "Zonas de severidad", value: "Baja / Media / Alta / Crítica" },
            { label: "Casos de uso", value: "Infraestructura IT, cloud, GRC, auditorías de cumplimiento" }
          ]
        },
        {
          type: "bullets",
          title: "Competencias demostradas",
          items: [
            "Identificación, puntuación y planificación del tratamiento de riesgos (alineado con ISO 27005 / NIST RMF).",
            "Herramientas GRC: diseño de registro de riesgos y gestión del ciclo de vida.",
            "Traducción de riesgos técnicos a un lenguaje de impacto de negocio para las partes interesadas.",
            "Aplicable a riesgos de infraestructura, seguridad cloud y marcos de cumplimiento (ISO 27001, NIS2, RGPD)."
          ]
        }
      ]
    }
  }
},

];
