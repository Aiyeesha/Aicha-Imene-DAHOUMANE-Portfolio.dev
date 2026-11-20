// content/project-details/nova-manufacturing-classic-to-lightning.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "nova-manufacturing-classic-to-lightning",
  "gallery": [
    {
      "alt": "Before/after architecture: Salesforce Classic components (Visualforce, JavaScript button, Process Builder, 8 profiles, Custom Settings, unsecured Apex) and their Lightning Experience replacements (LWC, Quick Action and Screen Flow, Record-Triggered Flow, 5 Permission Set Groups, Named Credentials, Apex with sharing and stripInaccessible)",
      "src": "/projects/nova-manufacturing-classic-to-lightning/architecture.svg"
    }
  ],
  "locales": {
    "en": {
      "title": "Salesforce Classic to Lightning Experience Migration (Nova Manufacturing)",
      "heroSubtitle": "Classic to Lightning migration and Apex security hardening for an international industrial equipment manufacturer.",
      "sections": [
        {
          "body": "> Reconstructed case study: the scenario, company and figures are fictional. It describes neither a client engagement nor my job.\n\nNova Manufacturing is an international manufacturer of industrial equipment (~150 sales reps spread across 3 sites/hubs in Europe). Its Salesforce CRM, still mostly running on Classic, had accumulated several generations of development: Visualforce pages, JavaScript buttons, Process Builder, heavily customized profiles, and REST integrations with third-party systems (ERP, billing). With Classic being progressively deprecated, the scenario is the modernization of the application — with an explicit mandate: don't just migrate the interface, harden the security of the legacy Apex code along the way, some of which had never been audited since its initial release.",
          "type": "text",
          "title": "Context"
        },
        {
          "type": "bullets",
          "items": [
            "Visualforce page Compte360 (Account object): search and display orders and contracts linked to an account, SOQL query built dynamically in the controller → converted to a Lightning Web Component AccountOrdersOverview, wired to AccountOrdersController.getOrders() (6 days)",
            "JavaScript button UpdateContractStatus (Contract object): updated contract status with no rights check or user confirmation → replaced by a Quick Action triggering a Screen Flow with an invocable Apex method (3 days)",
            "Process Builder \"Order Validation\": multi-level approval workflow triggered on creation → migrated to a Record-Triggered Flow (separate before-save/after-save to respect Governor Limits) (4 days)",
            "4 legacy Apex controllers: systematic audit, no CRUD/FLS rights testing in place → rebuilt with a strict with sharing pattern. Plus 4 new controllers built for this project, with security designed in from the start (5 days total)",
            "Total estimate: 25 days (audit 2d, Visualforce→LWC migration 6d, JS button→Quick Action/Flow 3d, Process Builder→Flow 4d, Apex security 5d, testing 3d, documentation 2d), plus 8h of user training"
          ],
          "title": "Identified Components & Proposed Solutions"
        },
        {
          "type": "bullets",
          "items": [
            "LWC AccountOrdersOverview: lightning-datatable with server-side pagination and keyword search, wired to an @AuraEnabled(cacheable=true) Apex method using WITH SECURITY_ENFORCED",
            "Record-Triggered Flow \"Order Validation v2\": bulkified logic processing the full collection (the old Process Builder wasn't, and caused Governor Limit errors on bulk imports), with a reusable sub-flow for the notification step",
            "Permission Set Groups: consolidated 8 near-duplicate legacy profiles into 5 groups, reducing configuration debt and clarifying access audits",
            "Named Credentials: replaced hardcoded REST endpoints (credentials previously visible in Custom Settings to any admin) with Named Credentials, authentication managed by the platform"
          ],
          "title": "Delivered Development"
        },
        {
          "type": "bullets",
          "items": [
            "ContractService.updateStatus(): before the rebuild, it wrote directly to Contract with no checks, and the class ran without sharing by default from an old Visualforce controller. After: Security.stripInaccessible(AccessType.UPDATABLE, records) before every DML, explicit with sharing on the class",
            "Dedicated unit test simulating a user without edit rights on Contract.Statut__c to verify the write is correctly blocked by stripInaccessible()",
            "Audit of the 4 legacy controllers: no CRUD/FLS rights test existed before this project — systematic addition of explicit checks wherever queries weren't eligible for WITH SECURITY_ENFORCED. Security designed in from the start on the 4 new controllers built for the project",
            "Profile-to-permission-set mapping matrix validated with business managers before cutover, to avoid any silent regression on access rights"
          ],
          "title": "Security & Best Practices"
        },
        {
          "type": "bullets",
          "items": [
            "Legacy Apex controller incompatibility (medium impact) → sandbox regression testing before each cutover, component-by-component deployment rather than a single big-bang release",
            "User adoption (high probability) → 8h of training split across 2 sessions, short role-based documentation instead of a single manual",
            "Governor Limit errors on migrated Flows (low impact, already hit once in sandbox) → bulkification built in from the design stage, tested with 200+ record datasets",
            "Silent access-rights regression during profile consolidation (high impact) → profile-to-permission-set mapping matrix validated with business managers before production rollout"
          ],
          "title": "Risk Management"
        },
        {
          "type": "bullets",
          "items": [
            "Lightning Web Components, Apex, SOQL",
            "Flow (Record-Triggered, before-save/after-save)",
            "Permission Set Groups, Named Credentials",
            "Salesforce Security Model — CRUD/FLS, WITH SECURITY_ENFORCED, stripInaccessible()"
          ],
          "title": "Stack & Technologies"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "4 legacy hardened + 4 new built secure-by-design",
              "label": "Apex classes secured",
              "value": "8"
            },
            {
              "note": "Permission Set Groups",
              "label": "Profiles consolidated",
              "value": "8 → 5"
            },
            {
              "note": "audit + migration + security + testing + documentation",
              "label": "Estimated effort",
              "value": "25 days"
            },
            {
              "note": "Governor Limits validation on migrated Flows",
              "label": "Bulk tested",
              "value": "200+ records"
            }
          ],
          "title": "Results"
        },
        {
          "type": "bullets",
          "items": [
            "Progressive, component-by-component migration rather than a big bang: slower, but allows a targeted rollback if a migrated component reveals an unanticipated production issue",
            "Simple Visualforce pages with no real migration upside left as-is: Lightning Experience supports them natively, migrating the entire scope would have been cost with no measurable user benefit",
            "Named Credentials deployed only on the REST integrations flagged as priority during the audit — secondary integrations remain on the old mechanism, migration documented as a next step"
          ],
          "title": "Known Limitations & Decisions"
        }
      ]
    },
    "fr": {
      "title": "Migration Salesforce Classic vers Lightning Experience (Nova Manufacturing)",
      "heroSubtitle": "Migration Classic → Lightning et durcissement sécurité Apex pour un fabricant industriel international.",
      "sections": [
        {
          "body": "> Étude de cas reconstituée : le scénario, l'entreprise et les chiffres sont fictifs. Elle ne décrit ni une mission client ni mon poste.\n\nNova Manufacturing est un fabricant international d'équipements industriels (~150 commerciaux répartis sur 3 sites/pôles en Europe). Son CRM Salesforce, encore majoritairement sous Classic, accumulait plusieurs générations de développements : pages Visualforce, boutons JavaScript, Process Builder, profils très personnalisés, intégrations REST vers des systèmes tiers (ERP, facturation). Avec la dépréciation progressive de Classic, le scénario porte sur la modernisation de l'application — avec un mandat explicite : ne pas se contenter de migrer l'interface, mais durcir la sécurité des développements Apex historiques au passage, dont plusieurs n'avaient jamais été audités depuis leur mise en production initiale.",
          "type": "text",
          "title": "Contexte"
        },
        {
          "type": "bullets",
          "items": [
            "Page Visualforce Compte360 (objet Account) : recherche et affichage des commandes et contrats liés à un compte, requête SOQL construite dynamiquement côté contrôleur → convertie en Lightning Web Component AccountOrdersOverview, wiré à AccountOrdersController.getOrders() (6 jours)",
            "Bouton JavaScript UpdateContractStatus (objet Contract) : mise à jour du statut contractuel sans vérification de droits ni confirmation utilisateur → remplacé par une Quick Action déclenchant un Screen Flow avec Apex invocable (3 jours)",
            "Process Builder \"Validation commande\" : workflow d'approbation multi-niveaux déclenché à la création → migré vers un Record-Triggered Flow (before-save + after-save séparés pour respecter les Governor Limits) (4 jours)",
            "4 contrôleurs Apex historiques : audit systématique, aucun test de droits CRUD/FLS en place → refonte avec pattern with sharing strict. + 4 nouveaux contrôleurs créés pour ce projet, avec sécurité intégrée dès la conception (5 jours au total)",
            "Estimation totale : 25 jours (audit 2j, migration Visualforce→LWC 6j, bouton JS→Quick Action/Flow 3j, Process Builder→Flow 4j, sécurité Apex 5j, tests 3j, documentation 2j), + 8h de formation utilisateurs"
          ],
          "title": "Composants identifiés & solutions proposées"
        },
        {
          "type": "bullets",
          "items": [
            "LWC AccountOrdersOverview : lightning-datatable avec pagination côté serveur et recherche par mot-clé, wiré à une méthode Apex @AuraEnabled(cacheable=true) en WITH SECURITY_ENFORCED",
            "Record-Triggered Flow \"Validation commande v2\" : logique bulkifiée traitant la collection complète (l'ancien Process Builder ne l'était pas et provoquait des erreurs Governor Limits sur les imports en masse), avec sous-flow réutilisable pour la partie notification",
            "Permission Set Groups : consolidation de 8 profils historiques quasi-dupliqués en 5 groupes, réduisant la dette de configuration et clarifiant l'audit des accès",
            "Named Credentials : remplacement des endpoints REST codés en dur (identifiants auparavant visibles dans des Custom Settings par tout admin) par des Named Credentials avec authentification gérée par la plateforme"
          ],
          "title": "Développements livrés"
        },
        {
          "type": "bullets",
          "items": [
            "ContractService.updateStatus() : avant refonte, écriture directe sur Contract sans vérification et classe en without sharing par défaut d'un ancien contrôleur Visualforce. Après refonte : Security.stripInaccessible(AccessType.UPDATABLE, records) avant tout DML, with sharing explicite sur la classe",
            "Test unitaire dédié simulant un utilisateur sans droit d'édition sur Contract.Statut__c pour vérifier que l'écriture est bien bloquée par stripInaccessible()",
            "Audit des 4 contrôleurs historiques : aucun test de droits CRUD/FLS n'existait avant ce projet — ajout systématique de vérifications explicites là où les requêtes ne sont pas éligibles à WITH SECURITY_ENFORCED. Sécurité intégrée dès la conception sur les 4 nouveaux contrôleurs créés pour le projet",
            "Matrice de comparaison profils → permission sets validée avec les managers métier avant bascule, pour éviter toute régression silencieuse sur les droits d'accès"
          ],
          "title": "Sécurité & bonnes pratiques"
        },
        {
          "type": "bullets",
          "items": [
            "Incompatibilité de contrôleurs Apex existants (impact moyen) → tests de non-régression en sandbox avant chaque bascule, déploiement composant par composant plutôt qu'en bloc",
            "Adoption utilisateurs (probabilité élevée) → 8h de formation réparties sur 2 sessions, documentation courte par rôle plutôt qu'un manuel unique",
            "Erreurs Governor Limits sur les migrations Flow (impact faible, déjà rencontré une fois en sandbox) → bulkification systématique dès la conception, testée avec des jeux de données de 200+ enregistrements",
            "Régression silencieuse sur les droits d'accès pendant la consolidation des profils (impact élevé) → matrice de comparaison profils → permission sets validée avec les managers métier avant mise en production"
          ],
          "title": "Gestion des risques"
        },
        {
          "type": "bullets",
          "items": [
            "Lightning Web Components, Apex, SOQL",
            "Flow (Record-Triggered, before-save/after-save)",
            "Permission Set Groups, Named Credentials",
            "Salesforce Security Model — CRUD/FLS, WITH SECURITY_ENFORCED, stripInaccessible()"
          ],
          "title": "Stack et outils"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "4 historiques durcies + 4 nouvelles créées sécurisées dès la conception",
              "label": "Classes Apex sécurisées",
              "value": "8"
            },
            {
              "note": "Permission Set Groups",
              "label": "Profils consolidés",
              "value": "8 → 5"
            },
            {
              "note": "audit + migration + sécurité + tests + documentation",
              "label": "Charge estimée",
              "value": "25 jours"
            },
            {
              "note": "validation Governor Limits sur les Flows migrés",
              "label": "Bulk testé",
              "value": "200+ enregistrements"
            }
          ],
          "title": "Résultats"
        },
        {
          "type": "bullets",
          "items": [
            "Migration progressive composant par composant plutôt qu'un big-bang : plus lent, mais permet un rollback ciblé si un composant migré révèle un problème non anticipé en production",
            "Pages Visualforce simples (sans réelle valeur ajoutée à migrer) laissées telles quelles : Lightning Experience les supporte nativement, migrer l'ensemble du périmètre n'aurait été qu'un coût sans bénéfice utilisateur mesurable",
            "Named Credentials déployés uniquement sur les intégrations REST identifiées comme prioritaires lors de l'audit — les intégrations secondaires restent sur l'ancien mécanisme, migration documentée comme prochaine étape"
          ],
          "title": "Limites connues & décisions"
        }
      ]
    },
    "es": {
      "title": "Migración de Salesforce Classic a Lightning Experience (Nova Manufacturing)",
      "heroSubtitle": "Migración de Classic a Lightning y refuerzo de seguridad Apex para un fabricante internacional de equipos industriales.",
      "sections": [
        {
          "body": "> Caso de estudio reconstruido: el escenario, la empresa y las cifras son ficticios. No describe ni un encargo de cliente ni mi puesto.\n\nNova Manufacturing es un fabricante internacional de equipos industriales (~150 comerciales repartidos en 3 sedes/polos en Europa). Su CRM Salesforce, todavía mayoritariamente en Classic, acumulaba varias generaciones de desarrollos: páginas Visualforce, botones JavaScript, Process Builder, perfiles muy personalizados, integraciones REST con sistemas externos (ERP, facturación). Con la progresiva desaparición de Classic, el escenario plantea la modernización de la aplicación — con un mandato explícito: no limitarse a migrar la interfaz, sino reforzar también la seguridad de los desarrollos Apex heredados, varios de los cuales nunca habían sido auditados desde su puesta en producción inicial.",
          "type": "text",
          "title": "Contexto"
        },
        {
          "type": "bullets",
          "items": [
            "Página Visualforce Compte360 (objeto Account): búsqueda y visualización de pedidos y contratos vinculados a una cuenta, consulta SOQL construida dinámicamente en el controlador → convertida en un Lightning Web Component AccountOrdersOverview, conectado a AccountOrdersController.getOrders() (6 días)",
            "Botón JavaScript UpdateContractStatus (objeto Contract): actualización del estado del contrato sin verificación de permisos ni confirmación del usuario → sustituido por una Quick Action que lanza un Screen Flow con un método Apex invocable (3 días)",
            "Process Builder \"Validación de pedido\": flujo de aprobación multinivel disparado en la creación → migrado a un Record-Triggered Flow (before-save y after-save separados para respetar los Governor Limits) (4 días)",
            "4 controladores Apex heredados: auditoría sistemática, sin ninguna prueba de permisos CRUD/FLS implementada → reconstruidos con un patrón with sharing estricto. Más 4 controladores nuevos creados para este proyecto, con seguridad integrada desde el diseño (5 días en total)",
            "Estimación total: 25 días (auditoría 2d, migración Visualforce→LWC 6d, botón JS→Quick Action/Flow 3d, Process Builder→Flow 4d, seguridad Apex 5d, pruebas 3d, documentación 2d), más 8h de formación de usuarios"
          ],
          "title": "Componentes identificados y soluciones propuestas"
        },
        {
          "type": "bullets",
          "items": [
            "LWC AccountOrdersOverview: lightning-datatable con paginación en el servidor y búsqueda por palabra clave, conectado a un método Apex @AuraEnabled(cacheable=true) con WITH SECURITY_ENFORCED",
            "Record-Triggered Flow \"Validación de pedido v2\": lógica bulkificada que procesa la colección completa (el antiguo Process Builder no lo hacía y provocaba errores de Governor Limits en las importaciones masivas), con un sub-flow reutilizable para la parte de notificación",
            "Permission Set Groups: consolidación de 8 perfiles heredados casi duplicados en 5 grupos, reduciendo la deuda de configuración y facilitando la auditoría de accesos",
            "Named Credentials: sustitución de los endpoints REST codificados directamente (credenciales antes visibles en Custom Settings para cualquier administrador) por Named Credentials, con autenticación gestionada por la plataforma"
          ],
          "title": "Desarrollos entregados"
        },
        {
          "type": "bullets",
          "items": [
            "ContractService.updateStatus(): antes de la reconstrucción, escribía directamente en Contract sin verificación, y la clase se ejecutaba en without sharing por defecto de un antiguo controlador Visualforce. Después: Security.stripInaccessible(AccessType.UPDATABLE, records) antes de cada DML, with sharing explícito en la clase",
            "Prueba unitaria dedicada que simula un usuario sin permiso de edición sobre Contract.Statut__c para verificar que stripInaccessible() bloquea correctamente la escritura",
            "Auditoría de los 4 controladores heredados: no existía ninguna prueba de permisos CRUD/FLS antes de este proyecto — se añadieron verificaciones explícitas allí donde las consultas no eran elegibles para WITH SECURITY_ENFORCED. Seguridad integrada desde el diseño en los 4 controladores nuevos creados para el proyecto",
            "Matriz de comparación perfiles → permission sets validada con los responsables de negocio antes del cambio, para evitar cualquier regresión silenciosa en los derechos de acceso"
          ],
          "title": "Seguridad y buenas prácticas"
        },
        {
          "type": "bullets",
          "items": [
            "Incompatibilidad de controladores Apex existentes (impacto medio) → pruebas de no regresión en sandbox antes de cada cambio, despliegue componente por componente en lugar de todo a la vez",
            "Adopción por parte de los usuarios (probabilidad alta) → 8h de formación repartidas en 2 sesiones, documentación breve por rol en lugar de un manual único",
            "Errores de Governor Limits en los Flows migrados (impacto bajo, ya detectado una vez en sandbox) → bulkificación sistemática desde el diseño, probada con conjuntos de 200+ registros",
            "Regresión silenciosa en los derechos de acceso durante la consolidación de perfiles (impacto alto) → matriz de comparación perfiles → permission sets validada con los responsables de negocio antes de la puesta en producción"
          ],
          "title": "Gestión de riesgos"
        },
        {
          "type": "bullets",
          "items": [
            "Lightning Web Components, Apex, SOQL",
            "Flow (Record-Triggered, before-save/after-save)",
            "Permission Set Groups, Named Credentials",
            "Modelo de seguridad de Salesforce — CRUD/FLS, WITH SECURITY_ENFORCED, stripInaccessible()"
          ],
          "title": "Stack y tecnologías"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "4 heredadas reforzadas + 4 nuevas creadas con seguridad desde el diseño",
              "label": "Clases Apex aseguradas",
              "value": "8"
            },
            {
              "note": "Permission Set Groups",
              "label": "Perfiles consolidados",
              "value": "8 → 5"
            },
            {
              "note": "auditoría + migración + seguridad + pruebas + documentación",
              "label": "Esfuerzo estimado",
              "value": "25 días"
            },
            {
              "note": "validación de Governor Limits en los Flows migrados",
              "label": "Probado en bloque",
              "value": "200+ registros"
            }
          ],
          "title": "Resultados"
        },
        {
          "type": "bullets",
          "items": [
            "Migración progresiva componente por componente en lugar de un big bang: más lenta, pero permite un rollback específico si un componente migrado revela un problema no anticipado en producción",
            "Páginas Visualforce simples sin valor añadido real de migrar se dejaron tal cual: Lightning Experience las soporta de forma nativa, migrar todo el alcance solo habría supuesto coste sin beneficio medible para el usuario",
            "Named Credentials desplegadas únicamente en las integraciones REST identificadas como prioritarias durante la auditoría — las integraciones secundarias siguen con el mecanismo antiguo, migración documentada como siguiente paso"
          ],
          "title": "Limitaciones conocidas y decisiones"
        }
      ]
    }
  }
};

export default details;
