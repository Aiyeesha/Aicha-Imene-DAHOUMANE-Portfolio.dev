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
    en?: { heroSubtitle?: string; sections?: ProjectSection[] };
    fr?: { heroSubtitle?: string; sections?: ProjectSection[] };
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
      { src: "/projects/legarant-axg-salesforce-deployment/changes-1.png", alt: "Legarant‑AXG — Heroku changes (1)" },
      { src: "/projects/legarant-axg-salesforce-deployment/changes-2.webp", alt: "Legarant‑AXG — Heroku changes (2)" },
      { src: "/projects/legarant-axg-salesforce-deployment/deploy-1.png", alt: "Legarant‑AXG — Deployment evidence (1)" },
      { src: "/projects/legarant-axg-salesforce-deployment/deploy-2.webp", alt: "Legarant‑AXG — Deployment evidence (2)" }
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
      }
    }
  },
  {
  slug: "ltp-apex-backend-prototype",
  gallery: [
    {
      src: "/projects/ltp-apex-backend-prototype/logo.png",
      alt: "LTP — Le Temps des Papillons (logo)"
    },
    {
      src: "/projects/ltp-apex-backend-prototype/shot-1.svg",
      alt: "LTP — Architecture & integration (illustration)"
    },
    {
      src: "/projects/ltp-apex-backend-prototype/shot-2.svg",
      alt: "LTP — Data model (illustration)"
    },
    {
      src: "/projects/ltp-apex-backend-prototype/shot-3.svg",
      alt: "LTP — Security & import strategy (illustration)"
    }
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
    }
  }
},
  {
    slug: "idemconnect-apex-backend",
    gallery: [
      { src: "/projects/idemconnect-apex-backend/cover.svg", alt: "iDEM Connect — Apex backend" }
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
      }
    }
  },
  {
    slug: "fasha-apex-backend-optimization",
    gallery: [
      { src: "/projects/fasha-apex-backend-optimization/cover.svg", alt: "FASHA — Apex backend optimization" }
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
      }
    }
  },
  {
    slug: "wirebright-visualforce-to-lightning",
    gallery: [
      {
        src: "/projects/wirebright-visualforce-to-lightning/HomepageClassique.png",
        alt: "wirebright-visualforce-to-lightning — classic home"
      },
      {
        src: "/projects/wirebright-visualforce-to-lightning/HomepageLightning.png",
        alt: "wirebright-visualforce-to-lightning — lightning home"
      },
      {
        src: "/projects/wirebright-visualforce-to-lightning/LeadUpdateClassique.png",
        alt: "wirebright-visualforce-to-lightning — classic lead update"
      },
      {
        src: "/projects/wirebright-visualforce-to-lightning/LeadUpdateLightning.png",
        alt: "wirebright-visualforce-to-lightning — lightning lead update"
      },
      {
        src: "/projects/wirebright-visualforce-to-lightning/Opportunity-SearchClassique.png",
        alt: "wirebright-visualforce-to-lightning — classic opportunity search"
      },
      {
        src: "/projects/wirebright-visualforce-to-lightning/Opportunity-SearchLightning.png",
        alt: "wirebright-visualforce-to-lightning — lightning opportunity search"
      }
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
      }
    }
  },
  {
    slug: "avenir-telecom-lightning-app",
    gallery: [
      {
        src: "/projects/avenir-telecom-lightning-app/image-e5a88d7b.webp",
        alt: "Avenir Télécom — Lightning app (overview)"
      },
      {
        src: "/projects/avenir-telecom-lightning-app/kanban-board.webp",
        alt: "Avenir Télécom — Kanban backlog (evolutions & fixes)"
      },
      {
        src: "/projects/avenir-telecom-lightning-app/image.webp",
        alt: "Avenir Télécom — Lightning app (screen)"
      }
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
      }
    }
  },
  {
    slug: "tours-for-life-salesforce-solution",
    gallery: [
      {
        src: "/projects/tours-for-life-salesforce-solution/screenshot-1.webp",
        alt: "Tours For Life — Home page & dashboards"
      },
      {
        src: "/projects/tours-for-life-salesforce-solution/data-model.webp",
        alt: "Tours For Life — Data model (Schema)"
      }
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
      }
    }
  },
  {
    slug: "digit-learning-salesforce-update",
    gallery: [
      {
        src: "/projects/digit-learning-salesforce-update/Schema_builder_captures_decran_122023.png",
        alt: "Digit Learning — data model (Schema Builder)"
      },
      {
        src: "/projects/digit-learning-salesforce-update/Mise a jour de place disponible par formation-.png",
        alt: "Digit Learning — Flow: update available seats"
      },
      {
        src: "/projects/digit-learning-salesforce-update/Mise a jours des status des etudiants vers Ancient client.png",
        alt: "Digit Learning — Scheduled Flow: student status to former client"
      },
      {
        src: "/projects/digit-learning-salesforce-update/inscriptions-formation-acheter-firefox-1.png",
        alt: "Digit Learning — Enrollment screen (1)"
      },
      {
        src: "/projects/digit-learning-salesforce-update/inscriptions-formation-acheter-firefox-2.png",
        alt: "Digit Learning — Enrollment screen (2)"
      },
      {
        src: "/projects/digit-learning-salesforce-update/Comparatif entre des taux de transformations du statut prospect en client actif.png",
        alt: "Digit Learning — report: prospect → active customer conversion"
      }
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
      }
    }
  },
  {
    slug: "monitoring-automation-pack",
    locales: {
      en: {
        heroSubtitle: "Monitoring & automation pack",
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
        heroSubtitle: "Monitoring & automation pack",
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
      }
    }
  },
  {
    slug: "tssr-windows-autopilot-provisioning",
    gallery: [
      { src: "/projects/tssr-windows-autopilot-provisioning/tssr-1.webp", alt: "Autopilot provisioning — OOBE / setup" },
      { src: "/projects/tssr-windows-autopilot-provisioning/tssr-2.webp", alt: "Autopilot provisioning — PowerShell hash collection" },
      { src: "/projects/tssr-windows-autopilot-provisioning/tssr-3.webp", alt: "Autopilot provisioning — provisioning flow" },
      { src: "/projects/tssr-windows-autopilot-provisioning/tssr-4.webp", alt: "Autopilot provisioning — validation (grouptag / domain)" }
    ],
    locales: {
      en: {
        heroSubtitle: "Windows Autopilot provisioning (Dell fleet)",
        sections: [
          {
            type: "text",
            title: "Context",
            paragraphs: [
              "During my internship (MSP environment), I helped prepare and deliver large device batches for different customers.",
              "The goal was to standardize Windows provisioning so every device is compliant, up to date, and ready for the end user with minimal manual steps."
            ]
          },
          {
            type: "bullets",
            title: "Scope & goals",
            items: [
              "Apply a clean baseline image ('vanilla' Windows) with current OEM drivers.",
              "Collect the hardware hash and hand it over to the Intune/Autopilot administration team for device registration.",
              "Trigger the Autopilot provisioning (apps, scripts, policies), then seal the device for delivery.",
              "Run final checks: drivers, activation, device naming, domain / tenant targeting (group tag)."
            ]
          },
          {
            type: "timeline",
            title: "Operational runbook (high level)",
            steps: [
              { title: "Apply baseline image", description: "Boot from the Dell ImageAssist USB key and deploy the vanilla Windows 10 image with the correct, up‑to‑date model drivers." },
              { title: "Enter OOBE + open CMD", description: "At first boot (OOBE), open a command prompt with Shift+F10 (or Shift+Fn+F10 depending on the device)." },
              { title: "Run PowerShell + allow scripts", description: "Start PowerShell, set the execution policy to allow the Autopilot script to run (per the runbook). Use an offline USB key to export the CSV output." },
              { title: "Collect hardware hash", description: "Install and run Get‑WindowsAutopilotInfo to export the hardware hash as a CSV file." },
              { title: "Registration workflow", description: "Send the CSV to the customer/DSI team. Wait for confirmation that the device has been imported into Intune and assigned to the correct Autopilot profile." },
              { title: "Start Autopilot provisioning", description: "Close the console and trigger the provisioning step (e.g., the Windows key action defined by the customer). Start provisioning and monitor progress." },
              { title: "Reseal & reboot", description: "Once provisioning completes, reseal the device so it boots into the standard first‑use experience. Reboot and verify the expected lock screen / group tag." },
              { title: "Final validation", description: "Verify naming conventions, domain/tenant targeting, Windows activation, and that required apps and policies are in place." }
            ]
          },
          {
            type: "metrics",
            title: "What I measured / validated",
            items: [
              { label: "Provisioning time per device", value: "~35 minutes", note: "Varies with network bandwidth and app/policy payload." },
              { label: "Evidence collected", value: "Autopilot CSV hash + screenshots", note: "Used for traceability and handover." },
              { label: "Quality gates", value: "Drivers + activation + naming + policies", note: "Final checks before delivery to end users." }
            ]
          },
          {
            type: "bullets",
            title: "Tools",
            items: [
              "Dell ImageAssist (vanilla image + current drivers).",
              "PowerShell + Get‑WindowsAutopilotInfo (hardware hash export).",
              "Microsoft Intune / Autopilot (import, profile assignment, provisioning).",
              "Windows activation & device readiness checks (drivers, updates)."
            ]
          }
        ]
      },
      fr: {
        heroSubtitle: "Provisionnement Windows Autopilot (parc Dell)",
        sections: [
          {
            type: "text",
            title: "Contexte",
            paragraphs: [
              "Lors de mon stage (environnement MSP), j’ai participé à la préparation et à la livraison de lots de postes pour plusieurs clients.",
              "L’objectif était de standardiser le provisionnement Windows afin que chaque machine soit conforme, à jour et prête à l’emploi, avec un minimum d’actions manuelles."
            ]
          },
          {
            type: "bullets",
            title: "Périmètre & objectifs",
            items: [
              "Appliquer une image de base propre (Windows « vanilla ») avec des drivers OEM récents.",
              "Récupérer le hardware hash et le transmettre à l’équipe d’administration Intune/Autopilot pour l’enrôlement.",
              "Déclencher le provisionnement Autopilot (apps, scripts, politiques), puis « resceller » le poste pour la livraison.",
              "Effectuer les contrôles finaux : drivers, activation, nommage, ciblage domaine/tenant (group tag)."
            ]
          },
          {
            type: "timeline",
            title: "Procédure opérationnelle (niveau macro)",
            steps: [
              { title: "Appliquer l’image de base", description: "Démarrer sur la clé USB Dell ImageAssist et déployer l’image Windows 10 « vanilla » avec les pilotes à jour pour le modèle." },
              { title: "OOBE + ouverture du CMD", description: "Au premier démarrage (OOBE), ouvrir un invite de commandes avec Shift+F10 (ou Shift+Fn+F10 selon le modèle)." },
              { title: "PowerShell + autoriser l’exécution", description: "Lancer PowerShell, ajuster la policy d’exécution pour exécuter le script Autopilot (selon la procédure). Utiliser une clé USB pour exporter le CSV." },
              { title: "Récupérer le hardware hash", description: "Installer et exécuter Get‑WindowsAutopilotInfo afin d’exporter le hardware hash dans un fichier CSV." },
              { title: "Workflow d’enrôlement", description: "Transmettre le CSV à l’équipe DSI/Intune du client. Attendre la confirmation d’import dans Intune et d’affectation au bon profil Autopilot." },
              { title: "Lancer le provisionnement Autopilot", description: "Fermer la console puis déclencher le mode de provisionnement (action spécifique client). Démarrer et suivre l’avancement." },
              { title: "Resceller & redémarrer", description: "Une fois terminé, resceller le poste pour revenir à une expérience « prêt à livrer ». Redémarrer et vérifier l’écran attendu (grouptag / verrouillage)." },
              { title: "Validation finale", description: "Contrôler les conventions de nommage, le ciblage (domaine/tenant), l’activation Windows, et la présence des applications/politiques requises." }
            ]
          },
          {
            type: "metrics",
            title: "Contrôles & résultats",
            items: [
              { label: "Temps de provisionnement / poste", value: "≈ 35 minutes", note: "Variable selon le réseau et la charge (apps/politiques)." },
              { label: "Preuves / traçabilité", value: "CSV hardware hash + captures", note: "Pour la passation et le suivi." },
              { label: "Gates qualité", value: "Drivers + activation + nommage + policies", note: "Avant remise à l’utilisateur final." }
            ]
          },
          {
            type: "bullets",
            title: "Outils",
            items: [
              "Dell ImageAssist (image « vanilla » + drivers récents).",
              "PowerShell + Get‑WindowsAutopilotInfo (export hardware hash).",
              "Microsoft Intune / Autopilot (import, affectation profil, provisioning).",
              "Vérifications Windows (activation, drivers, mises à jour)."
            ]
          }
        ]
      }
    }
  },
  {
    slug: "tssr-secure-wipe-and-imaging",
    locales: {
      en: {
        heroSubtitle: "Secure device preparation at scale",
        sections: [
          {
            type: "text",
            title: "Context",
            paragraphs: [
              "In an MSP context, I supported the preparation of customer device batches before deployment to end users.",
              "The workflow combined certified data erasure with reimaging and final quality checks (drivers, updates, activation)."
            ]
          },
          {
            type: "bullets",
            title: "What I did",
            items: [
              "Performed secure wipes on desktop devices using Blancco (license‑based certified erasure).",
              "Reinstalled a standardized Windows image using a Sysprep‑based deployment method.",
              "Updated drivers and firmware where required and applied OS updates.",
              "Validated Windows activation and delivery readiness for each device."
            ]
          },
          {
            type: "bullets",
            title: "Why it matters",
            items: [
              "Certified wipe provides auditable evidence of data destruction and reduces legal/security risk.",
              "Standard imaging reduces variability, accelerates delivery, and improves supportability (known baseline).",
              "Final checks prevent avoidable incidents on day‑1 (missing drivers, activation issues, outdated OS)."
            ]
          },
          {
            type: "bullets",
            title: "Tools",
            items: [
              "Blancco (secure erase + reporting).",
              "Sysprep imaging workflow.",
              "Windows update / driver management and activation validation."
            ]
          }
        ]
      },
      fr: {
        heroSubtitle: "Préparation sécurisée de postes à grande échelle",
        sections: [
          {
            type: "text",
            title: "Contexte",
            paragraphs: [
              "En environnement MSP, j’ai participé à la préparation de lots de postes clients avant déploiement aux utilisateurs finaux.",
              "Le workflow combinait effacement sécurisé certifié, re‑imaging et contrôles qualité (drivers, mises à jour, activation)."
            ]
          },
          {
            type: "bullets",
            title: "Réalisations",
            items: [
              "Effacement sécurisé des postes fixes avec Blancco (effacement certifié via licences).",
              "Réinstallation d’une image Windows standardisée via une méthode de déploiement basée sur Sysprep.",
              "Mise à jour des drivers/firmwares si nécessaire et application des mises à jour Windows.",
              "Vérification de l’activation Windows et de l’état « prêt à livrer » pour chaque poste."
            ]
          },
          {
            type: "bullets",
            title: "Apport",
            items: [
              "L’effacement certifié fournit une traçabilité (preuve) et réduit le risque légal/sécurité.",
              "L’image standard réduit la variabilité, accélère la livraison et facilite le support (baseline connue).",
              "Les contrôles finaux évitent les incidents « day‑1 » (drivers manquants, activation, OS obsolète)."
            ]
          },
          {
            type: "bullets",
            title: "Outils",
            items: [
              "Blancco (effacement sécurisé + reporting).",
              "Workflow d’image Sysprep.",
              "Gestion Windows Update / drivers et contrôle d’activation."
            ]
          }
        ]
      }
    }
  },

  {
    slug: "tssr-incident-management-rmm",
    gallery: [
      { src: "/projects/tssr-incident-management-rmm/datto-rmm-dashboard-redacted.jpg", alt: "Datto RMM — dashboard" },
      { src: "/projects/tssr-incident-management-rmm/autotask-dashboard-redacted.jpg", alt: "Autotask — ticketing dashboard" },
      { src: "/projects/tssr-incident-management-rmm/malwarebytes-activity-redacted.jpg", alt: "Malwarebytes — activity / detections" },
      { src: "/projects/tssr-incident-management-rmm/mitre-attack.webp", alt: "MITRE ATT&CK — reference" }
    ],
    locales: {
      en: {
        heroSubtitle: "Incident handling with RMM, ticketing & endpoint security",
        sections: [
          {
            type: "text",
            title: "Context",
            paragraphs: [
              "During my internship at Midrange Group, I worked alongside the operations team (Exploitation) and the technical support team.",
              "The workflow combined a ticketing system (Autotask), remote monitoring/management (Datto RMM + Splashtop), and endpoint security tooling (e.g., Webroot / Malwarebytes)."
            ]
          },
          {
            type: "bullets",
            title: "Mission",
            items: [
              "Triage user incidents, reproduce the issue when possible, and collect the right evidence.",
              "Use remote access to investigate quickly (without onsite travel).",
              "Apply a safe remediation (allowlisting, configuration change, or security action), then validate with the user.",
              "Document the resolution in the ticket and capture learnings as a lightweight runbook."
            ]
          },
          {
            type: "timeline",
            title: "Typical incident flow",
            steps: [
              { title: "Ticket intake", description: "Incident opened by phone/email/agent; assignment to Support or Operations depending on scope." },
              { title: "Remote session", description: "Start a Splashtop session from Datto RMM to observe the issue live and gather context." },
              { title: "Investigation", description: "Check endpoint security alerts/logs, confirm the exact blocked resource, and identify the control that triggered (policy/rule/category)." },
              { title: "Remediation", description: "Apply the least‑privilege fix (e.g., allowlist a legitimate URL/domain in the security console) and keep an audit trail." },
              { title: "Validation", description: "Retest with the user, confirm normal behavior, and ensure no side effects on other policies or endpoints." },
              { title: "Closure", description: "Update the Autotask ticket: steps, root cause, changes made, and prevention recommendations." }
            ]
          },
          {
            type: "bullets",
            title: "Tools & references",
            items: [
              "Autotask (ticket lifecycle, communication, traceability).",
              "Datto RMM + Splashtop (remote monitoring and remote assistance).",
              "Endpoint security consoles (Webroot / Malwarebytes) for investigation and allowlisting.",
              "MITRE ATT&CK as a shared vocabulary when mapping suspicious activity." 
            ]
          }
        ]
      },
      fr: {
        heroSubtitle: "Gestion d’incidents avec RMM, ticketing & outils de sécurité",
        sections: [
          {
            type: "text",
            title: "Contexte",
            paragraphs: [
              "Lors de mon stage chez Midrange Group, j’ai travaillé en lien avec l’équipe Exploitation et l’équipe Support Technique.",
              "Le fonctionnement s’appuyait sur un outil de ticketing (Autotask), une plateforme RMM (Datto RMM + Splashtop) et des consoles de sécurité endpoint (ex. Webroot / Malwarebytes)."
            ]
          },
          {
            type: "bullets",
            title: "Mission",
            items: [
              "Qualifier l’incident (symptômes, impact, périmètre) et collecter des éléments factuels.",
              "Investiguer à distance via une prise en main (Splashtop) pour gagner du temps et éviter un déplacement.",
              "Appliquer une remédiation sûre et traçable (ex. exclusion/allowlist d’une URL légitime, ajustement de règles).",
              "Valider avec l’utilisateur, puis documenter la résolution et les actions préventives."
            ]
          },
          {
            type: "timeline",
            title: "Déroulé type d’un incident",
            steps: [
              { title: "Ouverture / affectation", description: "Ticket ouvert par téléphone / email / agent; affectation Support ou Exploitation selon la nature du sujet." },
              { title: "Prise en main", description: "Connexion Splashtop depuis Datto RMM pour observer le problème et comprendre le contexte." },
              { title: "Investigation", description: "Analyse des alertes/logs de sécurité, identification précise de la ressource bloquée et de la règle/politique déclenchée." },
              { title: "Remédiation", description: "Correction au plus juste (least privilege) : par exemple, ajout en allowlist/exclusion d’un domaine/URL légitime, avec traçabilité." },
              { title: "Validation", description: "Re-tests avec l’utilisateur, vérification de l’absence d’effets de bord sur les autres postes/politiques." },
              { title: "Clôture", description: "Mise à jour du ticket Autotask : cause racine, actions réalisées, preuves, recommandations." }
            ]
          },
          {
            type: "bullets",
            title: "Outils & références",
            items: [
              "Autotask (cycle de vie des tickets, communication, traçabilité).",
              "Datto RMM + Splashtop (supervision et assistance à distance).",
              "Consoles endpoint (Webroot / Malwarebytes) pour analyser et autoriser/bloquer.",
              "MITRE ATT&CK pour cartographier/qualifier une activité suspecte." 
            ]
          }
        ]
      }
    }
  },
  {
    slug: "tssr-acronis-backup-recovery",
    gallery: [
      { src: "/projects/tssr-acronis-backup-recovery/acronis-dashboard-redacted.jpg", alt: "Acronis — dashboard / alerts" }
    ],
    locales: {
      en: {
        heroSubtitle: "Backup & recovery operations (Acronis)",
        sections: [
          {
            type: "text",
            title: "Context",
            paragraphs: [
              "As part of operations work, I used Acronis Cyber Protect Cloud / Acronis Cyber Backup to supervise backups for client environments.",
              "The objective was to keep backups reliable: detect failures early, remediate root causes (storage, connectivity, corruption), and validate recovery readiness."
            ]
          },
          {
            type: "bullets",
            title: "What I did",
            items: [
              "Daily dashboard review (alerts, job status, storage consumption).",
              "Investigate failures: full repository, offline host, transfer/network issues, corrupted backups.",
              "Remediation: cleanup/retention adjustments, fix connectivity (NAS/network), recreate plans when needed, rerun jobs.",
              "Verification: confirm job success and, when applicable, perform/prepare restore checks (granular or full).",
              "Document recurring causes and the remediation playbook."
            ]
          },
          {
            type: "timeline",
            title: "Operational workflow",
            steps: [
              { title: "Supervise", description: "Check dashboard alerts and failed jobs across sites/clients." },
              { title: "Diagnose", description: "Identify the failure reason (storage thresholds, offline devices, corruption, network transfer)." },
              { title: "Fix", description: "Apply the right corrective action: retention cleanup, plan adjustment, network/NAS remediation, recreate a plan if corrupted." },
              { title: "Validate", description: "Rerun backup jobs and verify success; ensure recovery objectives remain achievable." },
              { title: "Report", description: "Update runbooks and share prevention recommendations with the team." }
            ]
          },
          {
            type: "bullets",
            title: "Tools",
            items: [
              "Acronis Cyber Protect Cloud (cloud backups + security visibility).",
              "Acronis Cyber Backup (local/NAS backups, centralized management).",
              "Datto RMM (as a complementary view for endpoints/availability when needed)."
            ]
          }
        ]
      },
      fr: {
        heroSubtitle: "Exploitation sauvegardes & restauration (Acronis)",
        sections: [
          {
            type: "text",
            title: "Contexte",
            paragraphs: [
              "Dans un contexte d’exploitation, j’ai utilisé Acronis Cyber Protect Cloud / Acronis Cyber Backup pour superviser les sauvegardes d’environnements clients.",
              "L’objectif : garantir la fiabilité des sauvegardes (détection rapide des échecs), corriger les causes racines (stockage, réseau, corruption) et maintenir la capacité de restauration."
            ]
          },
          {
            type: "bullets",
            title: "Ce que j’ai fait",
            items: [
              "Revue quotidienne des tableaux de bord (alertes, jobs en échec, capacité de stockage).",
              "Analyse des causes d’échec : dépôt saturé (seuil ~75%), hôte arrêté/déconnecté, problèmes réseau/transfert, sauvegarde corrompue.",
              "Remédiation : nettoyage/rétention, correction réseau/NAS, recréation de plan si corruption, relance des jobs.",
              "Vérification : confirmation du succès et préparation/contrôle de la capacité de restauration (granulaire ou complète).",
              "Capitalisation : documentation des causes récurrentes et d’une procédure reproductible."
            ]
          },
          {
            type: "timeline",
            title: "Workflow d’exploitation",
            steps: [
              { title: "Superviser", description: "Contrôler alertes et jobs en échec sur les parcs / sites." },
              { title: "Diagnostiquer", description: "Identifier la cause (stockage, hôte hors-ligne, corruption, réseau/transfert)." },
              { title: "Corriger", description: "Appliquer l’action adaptée : rétention/nettoyage, ajustements, correction NAS/réseau, recréation de plan si nécessaire." },
              { title: "Valider", description: "Relancer la sauvegarde et vérifier la réussite; s’assurer que les objectifs de restauration restent atteignables." },
              { title: "Documenter", description: "Mettre à jour runbooks et recommandations de prévention." }
            ]
          },
          {
            type: "bullets",
            title: "Outils",
            items: [
              "Acronis Cyber Protect Cloud (sauvegardes cloud + visibilité sécurité).",
              "Acronis Cyber Backup (sauvegardes locales/NAS, gestion centralisée).",
              "Datto RMM (vue complémentaire sur disponibilité/postes si besoin)."
            ]
          }
        ]
      }
    }
  },
  {
    slug: "tssr-virtualization-windows-server-2022",
    gallery: [
      { src: "/projects/tssr-virtualization-windows-server-2022/tssr-1.png", alt: "VMware Workstation — VM creation" },
      { src: "/projects/tssr-virtualization-windows-server-2022/tssr-2.webp", alt: "Windows Server 2022 — network settings" },
      { src: "/projects/tssr-virtualization-windows-server-2022/tssr-3.webp", alt: "Active Directory — OU/users/groups" },
      { src: "/projects/tssr-virtualization-windows-server-2022/tssr-4.webp", alt: "WDS — PXE deployment" }
    ],
    locales: {
      en: {
        heroSubtitle: "Virtualization lab: Windows Server 2022 + AD DS",
        sections: [
          {
            type: "text",
            title: "Context",
            paragraphs: [
              "Training lab to build a full Windows infrastructure from scratch on a type‑2 hypervisor.",
              "The objective was to simulate a small company environment and validate key system administration tasks end‑to‑end."
            ]
          },
          {
            type: "bullets",
            title: "What I built",
            items: [
              "VM networking design (NAT network, controlled DHCP, static addressing).",
              "Windows Server 2022 installation + baseline hardening (static IPv4, IPv6 disable when required, VMware Tools).",
              "Directory services stack: AD DS + DNS + DHCP.",
              "Deployment services: WDS with PXE boot + Windows 10 client deployment and domain join.",
              "Ops building blocks: shared folder, OU structure, groups/users, roaming profile, mapped drive, GPOs."
            ]
          },
          {
            type: "timeline",
            title: "Implementation steps",
            steps: [
              { title: "Hypervisor & VM creation", description: "Create the server VM in VMware Workstation (resources aligned with the lab spec). Configure a dedicated NAT network (e.g., 192.168.100.0/24) with DHCP disabled when required." },
              { title: "Server installation", description: "Install Windows Server 2022, then set a static IPv4 address and apply baseline settings. Install VMware Tools for better UX and drivers." },
              { title: "Server identity", description: "Rename the server as per naming convention and reboot to apply changes." },
              { title: "AD DS / DNS", description: "Install AD DS (DNS included), promote the server to a domain controller, and validate name resolution." },
              { title: "DHCP", description: "Install DHCP, define scopes/options, and validate lease distribution for lab clients." },
              { title: "File services & structure", description: "Add an extra disk if needed, create and share a folder, set share/NTFS permissions, and model OUs/groups/users." },
              { title: "GPO & roaming", description: "Create and link GPOs, configure roaming profiles and mapped drives, then validate on the client side." },
              { title: "WDS / PXE deployment", description: "Import boot/install images, configure PXE, deploy a Windows 10 client via network boot, join it to the domain, and confirm policies apply." }
            ]
          },
          {
            type: "bullets",
            title: "Key takeaways",
            items: [
              "Treat networking (addressing, DNS, DHCP) as a prerequisite for everything else.",
              "Automate / standardize where possible (WDS deployment, GPO baselines).",
              "Validate continuously: after each role install, confirm expected behavior before moving on."
            ]
          }
        ]
      },
      fr: {
        heroSubtitle: "Lab virtualisation : Windows Server 2022 + AD DS",
        sections: [
          {
            type: "text",
            title: "Contexte",
            paragraphs: [
              "Lab de formation visant à construire une infrastructure Windows complète sur un hyperviseur de type 2.",
              "L’objectif : simuler un environnement « petite entreprise » et valider les tâches d’administration de bout en bout."
            ]
          },
          {
            type: "bullets",
            title: "Ce que j’ai construit",
            items: [
              "Conception du réseau VM (NAT dédié, DHCP maîtrisé, adressage statique).",
              "Installation Windows Server 2022 + paramétrage de base (IPv4 statique, désactivation IPv6 si demandé, VMware Tools).",
              "Socle annuaire : AD DS + DNS + DHCP.",
              "Services de déploiement : WDS avec boot PXE + déploiement d’un client Windows 10 et jointure au domaine.",
              "Briques « ops » : partage de fichiers, UO, groupes/utilisateurs, profil itinérant, lecteur mappé, GPO."
            ]
          },
          {
            type: "timeline",
            title: "Étapes de réalisation",
            steps: [
              { title: "Hyperviseur & création VM", description: "Créer la VM serveur dans VMware Workstation (ressources selon le cahier des charges). Configurer un réseau NAT dédié (ex. 192.168.100.0/24) avec DHCP désactivé si requis." },
              { title: "Installation du serveur", description: "Installer Windows Server 2022, puis configurer une IPv4 statique et appliquer les réglages de base. Installer VMware Tools pour les drivers et le confort." },
              { title: "Identité du serveur", description: "Renommer le serveur selon la convention et redémarrer pour appliquer." },
              { title: "AD DS / DNS", description: "Installer AD DS (DNS inclus), promouvoir le serveur en contrôleur de domaine et valider la résolution DNS." },
              { title: "DHCP", description: "Installer DHCP, définir les scopes/options, puis valider la distribution des baux côté clients." },
              { title: "Fichiers & structure", description: "Ajouter un disque si nécessaire, créer/partager un dossier, régler les droits (partage + NTFS), modéliser UO/groupes/utilisateurs." },
              { title: "GPO & itinérance", description: "Créer et lier les GPO, configurer les profils itinérants et les lecteurs mappés, puis valider côté poste client." },
              { title: "WDS / déploiement PXE", description: "Importer les images boot/install, configurer PXE, déployer un client Windows 10 via le réseau, le joindre au domaine et vérifier l’application des GPO." }
            ]
          },
          {
            type: "bullets",
            title: "Points clés",
            items: [
              "Le réseau (adressage, DNS, DHCP) est un prérequis : sans lui, tout le reste tombe.",
              "Standardiser/automatiser dès que possible (WDS, baselines GPO).",
              "Valider au fil de l’eau : après chaque rôle, vérifier le résultat avant de poursuivre."
            ]
          }
        ]
      }
    }
  },
  {
    slug: "tssr-pfsense-squid-proxy",
    gallery: [
      { src: "/projects/tssr-pfsense-squid-proxy/tssr-1.webp", alt: "pfSense — interfaces WAN/LAN" },
      { src: "/projects/tssr-pfsense-squid-proxy/tssr-2.webp", alt: "Squid — proxy configuration" },
      { src: "/projects/tssr-pfsense-squid-proxy/tssr-3.webp", alt: "Firewall rules — allow proxy traffic" },
      { src: "/projects/tssr-pfsense-squid-proxy/tssr-4.webp", alt: "Client settings — proxy + validation" }
    ],
    locales: {
      en: {
        heroSubtitle: "Network security lab: pfSense + Squid proxy",
        sections: [
          {
            type: "text",
            title: "Context",
            paragraphs: [
              "Training lab to secure internet access for a private network using a dedicated firewall and an explicit proxy.",
              "The design used a pfSense VM with two network interfaces: WAN bridged to the upstream internet access and LAN connected to the internal virtual network."
            ]
          },
          {
            type: "bullets",
            title: "Goals",
            items: [
              "Provide a controlled egress point (firewall) for the private network.",
              "Add an HTTP/HTTPS proxy (Squid) to enforce access control lists and generate audit logs.",
              "Keep the setup reproducible with a clear runbook and validation checklist."
            ]
          },
          {
            type: "timeline",
            title: "Implementation steps",
            steps: [
              { title: "Install pfSense VM", description: "Deploy a pfSense VM with two NICs and complete the base installation." },
              { title: "Configure WAN", description: "Set WAN parameters according to the ISP / upstream access method and confirm outbound connectivity." },
              { title: "Configure LAN", description: "Assign LAN IP/subnet to match the private network and ensure clients can reach the gateway." },
              { title: "Install Squid", description: "From pfSense Packages, install Squid and open the Squid Proxy Server settings under Services." },
              { title: "Configure proxy", description: "Enable the proxy, set the listening port, define ACLs (who can use it, what can be accessed), and tune cache/options as required." },
              { title: "Firewall rules", description: "Create rules to allow LAN clients to reach the proxy and allow the proxy to reach the internet (HTTP/HTTPS). Keep rules minimal and explicit." },
              { title: "Client configuration", description: "Configure each client to use the proxy (IP + port) at OS or browser level." },
              { title: "Validation", description: "Test browsing, verify blocks/allow rules, and review Squid logs to confirm policy enforcement and traceability." }
            ]
          },
          {
            type: "bullets",
            title: "Security notes",
            items: [
              "Prefer least‑privilege rules: allow only required egress ports and destinations.",
              "For HTTPS inspection, be explicit about legal/compliance constraints and certificate management (lab scope unless mandated).",
              "Log review is part of operations: validate that logs are usable and stored safely."
            ]
          }
        ]
      },
      fr: {
        heroSubtitle: "Lab sécurité réseau : pfSense + proxy Squid",
        sections: [
          {
            type: "text",
            title: "Contexte",
            paragraphs: [
              "Lab de formation visant à sécuriser l’accès Internet d’un réseau privé via un firewall dédié et un proxy explicite.",
              "Le design repose sur une VM pfSense avec deux interfaces : WAN en bridge vers l’accès Internet et LAN connecté au réseau interne de virtualisation."
            ]
          },
          {
            type: "bullets",
            title: "Objectifs",
            items: [
              "Fournir un point de sortie contrôlé (pare‑feu) pour le réseau privé.",
              "Ajouter un proxy HTTP/HTTPS (Squid) pour appliquer des ACL et produire des logs d’audit.",
              "Rendre l’installation reproductible avec une procédure claire et une checklist de validation."
            ]
          },
          {
            type: "timeline",
            title: "Étapes de mise en œuvre",
            steps: [
              { title: "Installer la VM pfSense", description: "Déployer une VM pfSense avec 2 cartes réseau et finaliser l’installation de base." },
              { title: "Configurer le WAN", description: "Renseigner les paramètres WAN selon le mode d’accès (FAI / amont) et valider la connectivité sortante." },
              { title: "Configurer le LAN", description: "Définir l’IP et le sous‑réseau LAN correspondant au réseau privé et vérifier l’accès à la passerelle." },
              { title: "Installer Squid", description: "Depuis Packages, installer Squid puis accéder à Services > Squid Proxy Server." },
              { title: "Paramétrer le proxy", description: "Activer le proxy, définir le port d’écoute, configurer les ACL (qui/quoi), et ajuster cache/options selon le besoin." },
              { title: "Règles firewall", description: "Créer les règles permettant aux clients LAN d’atteindre le proxy, et au proxy de sortir vers Internet (HTTP/HTTPS). Rester minimal et explicite." },
              { title: "Configurer les clients", description: "Paramétrer chaque client pour utiliser le proxy (IP + port) au niveau OS ou navigateur." },
              { title: "Valider", description: "Tester la navigation, vérifier les blocages/autorisation, et contrôler les logs Squid pour confirmer l’application des règles et la traçabilité." }
            ]
          },
          {
            type: "bullets",
            title: "Notes sécurité",
            items: [
              "Appliquer le moindre privilège : n’autoriser que les flux nécessaires (ports/destinations).",
              "Pour l’inspection HTTPS : cadrer les contraintes légales/compliance et la gestion des certificats (hors scope sauf demande).",
              "La revue des logs fait partie du RUN : s’assurer que les logs sont lisibles et correctement conservés."
            ]
          }
        ]
      }
    }
  },
  {
    slug: "tai-disk-partition-backup-restore",
    gallery: [
      {
        src: "/projects/tai-disk-partition-backup-restore/tai-1.webp",
        alt: "tai-disk-partition-backup-restore — 1"
      },
      {
        src: "/projects/tai-disk-partition-backup-restore/tai-2.webp",
        alt: "tai-disk-partition-backup-restore — 2"
      },
      {
        src: "/projects/tai-disk-partition-backup-restore/tai-3.webp",
        alt: "tai-disk-partition-backup-restore — 3"
      }
    ],
    locales: {
      en: {
        heroSubtitle: "Disk partitioning & backup/restore (AOMEI + Windows Server Backup)",
        sections: [
          {
            type: "bullets",
            title: "Context & goals",
            items: [
              "Build a reproducible lab (VM / test bench) or address a user need.",
              "Follow a structured approach: prepare → configure → validate → document."
            ]
          },
          {
            type: "bullets",
            title: "What I did",
            items: [
              "Configuration & hardening (network, accounts, services, rules).",
              "Validation tests (connectivity, scenarios).",
              "Wrote a step‑by‑step runbook."
            ]
          }
        ]
      },
      fr: {
        heroSubtitle: "Disk partitioning & backup/restore (AOMEI + Windows Server Backup)",
        sections: [
          {
            type: "bullets",
            title: "Contexte & objectifs",
            items: [
              "Mettre en place un environnement de test (VM / lab) ou intervenir sur un besoin utilisateur.",
              "Appliquer une démarche structurée : préparation → configuration → validation → documentation."
            ]
          },
          {
            type: "bullets",
            title: "Ce que j’ai fait",
            items: [
              "Paramétrage et sécurisation (réseau, comptes, services, règles).",
              "Tests de fonctionnement (connectivité, performances, scénarios).",
              "Rédaction d’une procédure reproductible."
            ]
          }
        ]
      }
    }
  },
  {
    slug: "tai-wifi-access-point-setup",
    gallery: [
      {
        src: "/projects/tai-wifi-access-point-setup/tai-1.png",
        alt: "tai-wifi-access-point-setup — 1"
      }
    ],
    locales: {
      en: {
        heroSubtitle: "Wi‑Fi access point configuration",
        sections: [
          {
            type: "bullets",
            title: "Context & goals",
            items: [
              "Build a reproducible lab (VM / test bench) or address a user need.",
              "Follow a structured approach: prepare → configure → validate → document."
            ]
          },
          {
            type: "bullets",
            title: "What I did",
            items: [
              "Configuration & hardening (network, accounts, services, rules).",
              "Validation tests (connectivity, scenarios).",
              "Wrote a step‑by‑step runbook."
            ]
          }
        ]
      },
      fr: {
        heroSubtitle: "Wi‑Fi access point configuration",
        sections: [
          {
            type: "bullets",
            title: "Contexte & objectifs",
            items: [
              "Mettre en place un environnement de test (VM / lab) ou intervenir sur un besoin utilisateur.",
              "Appliquer une démarche structurée : préparation → configuration → validation → documentation."
            ]
          },
          {
            type: "bullets",
            title: "Ce que j’ai fait",
            items: [
              "Paramétrage et sécurisation (réseau, comptes, services, règles).",
              "Tests de fonctionnement (connectivité, performances, scénarios).",
              "Rédaction d’une procédure reproductible."
            ]
          }
        ]
      }
    }
  },
  {
    slug: "tai-roaming-profile-adds",
    gallery: [
      {
        src: "/projects/tai-roaming-profile-adds/tai-1.webp",
        alt: "tai-roaming-profile-adds — 1"
      },
      {
        src: "/projects/tai-roaming-profile-adds/tai-2.png",
        alt: "tai-roaming-profile-adds — 2"
      }
    ],
    locales: {
      en: {
        heroSubtitle: "Roaming profiles with Active Directory",
        sections: [
          {
            type: "bullets",
            title: "Context & goals",
            items: [
              "Build a reproducible lab (VM / test bench) or address a user need.",
              "Follow a structured approach: prepare → configure → validate → document."
            ]
          },
          {
            type: "bullets",
            title: "What I did",
            items: [
              "Configuration & hardening (network, accounts, services, rules).",
              "Validation tests (connectivity, scenarios).",
              "Wrote a step‑by‑step runbook."
            ]
          }
        ]
      },
      fr: {
        heroSubtitle: "Roaming profiles with Active Directory",
        sections: [
          {
            type: "bullets",
            title: "Contexte & objectifs",
            items: [
              "Mettre en place un environnement de test (VM / lab) ou intervenir sur un besoin utilisateur.",
              "Appliquer une démarche structurée : préparation → configuration → validation → documentation."
            ]
          },
          {
            type: "bullets",
            title: "Ce que j’ai fait",
            items: [
              "Paramétrage et sécurisation (réseau, comptes, services, règles).",
              "Tests de fonctionnement (connectivité, performances, scénarios).",
              "Rédaction d’une procédure reproductible."
            ]
          }
        ]
      }
    }
  },
  {
    slug: "tai-email-configuration-guide",
    gallery: [
      {
        src: "/projects/tai-email-configuration-guide/tai-1.webp",
        alt: "tai-email-configuration-guide — 1"
      },
      {
        src: "/projects/tai-email-configuration-guide/tai-2.png",
        alt: "tai-email-configuration-guide — 2"
      }
    ],
    locales: {
      en: {
        heroSubtitle: "Outlook email configuration guide",
        sections: [
          {
            type: "bullets",
            title: "Context & goals",
            items: [
              "Build a reproducible lab (VM / test bench) or address a user need.",
              "Follow a structured approach: prepare → configure → validate → document."
            ]
          },
          {
            type: "bullets",
            title: "What I did",
            items: [
              "Configuration & hardening (network, accounts, services, rules).",
              "Validation tests (connectivity, scenarios).",
              "Wrote a step‑by‑step runbook."
            ]
          }
        ]
      },
      fr: {
        heroSubtitle: "Outlook email configuration guide",
        sections: [
          {
            type: "bullets",
            title: "Contexte & objectifs",
            items: [
              "Mettre en place un environnement de test (VM / lab) ou intervenir sur un besoin utilisateur.",
              "Appliquer une démarche structurée : préparation → configuration → validation → documentation."
            ]
          },
          {
            type: "bullets",
            title: "Ce que j’ai fait",
            items: [
              "Paramétrage et sécurisation (réseau, comptes, services, règles).",
              "Tests de fonctionnement (connectivité, performances, scénarios).",
              "Rédaction d’une procédure reproductible."
            ]
          }
        ]
      }
    }
  },
{
  slug: "hemebiotech-java-debug",
  gallery: [
    { src: "/projects/hemebiotech-java-debug/cover.png", alt: "HemeBiotech — Java debugging project" }
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
    }
  }
},

{
  slug: "parkit-java-testing",
  gallery: [
    {
      src: "/projects/parkit-java-testing/2024-06-07 00_45_59-TEST JACOCO Parking Service class.png",
      alt: "Parkit — JaCoCo coverage (ParkingService)"
    },
    {
      src: "/projects/parkit-java-testing/2024-06-07 00_45_59-TEST JACOCO in Clone of WIN10 DEV SALESFORCE - VMware Workstation.png",
      alt: "Parkit — JaCoCo report"
    },
    {
      src: "/projects/parkit-java-testing/2024-06-07 00_48_38-TEST Surefire in Clone of WIN10 DEV SALESFORCE - VMware Workstation.png",
      alt: "Parkit — Maven Surefire report"
    },
    {
      src: "/projects/parkit-java-testing/2024-06-07 00_48_38-TEST Surefire with details in Clone of WIN10 DEV SALESFORCE - VMware Workstation.png",
      alt: "Parkit — Surefire report details"
    },
    {
      src: "/projects/parkit-java-testing/2024-06-25 13_21_08-com.parkit.parkingsystem.dao - Opera.png",
      alt: "Parkit — DAO layer"
    }
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
    }
  }
},

{
  slug: "pochlib-ui",
  gallery: [
    {
      src: "/projects/pochlib-ui/cover.png",
      alt: "Poch'Lib — UI cover"
    }
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
    }
  }
}

];
