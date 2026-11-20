// content/project-details/cicd-pipeline-setup.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "cicd-pipeline-setup",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/cicd-pipeline-setup/cover.svg"
    }
  ],
  "locales": {
    "en": {
      "title": "CI/CD Pipeline — Multi-environment Salesforce Deployment",
      "heroSubtitle": "Git branching, automated Apex validation, and a documented rollback path for Salesforce releases — not a deployment checklist",
      "sections": [
        {
          "body": "Salesforce doesn't ship a native CI/CD story: deployments between sandboxes and production are either point-and-click Change Sets or hand-rolled scripts, and \"it worked in my sandbox\" is a common failure mode. I built this pipeline as a personal project to apply the release discipline I'd use on any platform — branch protection, automated validation on every Pull Request, staged promotion, a documented rollback path — specifically to the constraints of Salesforce metadata deployments: no partial rollback, mandatory Apex test coverage, environment-specific metadata.",
          "type": "text",
          "title": "Context"
        },
        {
          "type": "bullets",
          "items": [
            "Git branching strategy: feature → develop → main, with branch protection on develop and main",
            "GitHub Actions workflow: Apex validation + automated tests triggered on every Pull Request",
            "Automatic deployment to the integration sandbox on develop merge, and to the staging (UAT) sandbox on main merge",
            "Production release by Quick Deploy, triggered manually after UAT sign-off, reusing the validation already run against production",
            "Salesforce credentials management via GitHub Secrets (encrypted SFDX Auth URL)",
            "Deployment status notifications integrated at every pipeline stage"
          ],
          "title": "What I built"
        },
        {
          "type": "bullets",
          "items": [
            "Salesforce CLI (SFDX) — metadata packaging and deployment",
            "GitHub Actions — CI/CD pipeline orchestration",
            "GitHub Secrets — secure SFDX credential management",
            "Apex Test Run — automated unit test execution",
            "SFDX Source Format — Salesforce metadata version control"
          ],
          "title": "Tools & Technologies"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Analysis",
              "description": "Mapping of environments (Dev, Staging, Prod) and defining a branching strategy adapted to the Salesforce release cycle"
            },
            {
              "label": "SFDX Setup",
              "description": "Project initialization in SFDX Source Format, .forceignore configuration and authentication setup via SFDX Auth URL"
            },
            {
              "label": "CI Pipeline",
              "description": "GitHub Actions workflows: Apex validation job with unit test execution triggered on every Pull Request to develop and to main"
            },
            {
              "label": "CD Pipeline",
              "description": "Deployment automation: integration sandbox on develop merge, staging (UAT) sandbox on main merge plus a check-only validation against production — then a manually triggered Quick Deploy to production that reuses that validated test run instead of re-running the full suite"
            },
            {
              "label": "Security",
              "description": "SFDX Auth URL credentials stored in GitHub Secrets; develop and main protected by required status checks (the CI validation must pass before any merge)"
            },
            {
              "label": "Rollback procedure",
              "description": "Salesforce metadata deployments have no native undo. Documented procedure: revert the merge commit on main, re-tag the last known-good package, and re-run it through the same CI pipeline — as long as a forward deploy, by design, since no shortcut exists for Salesforce metadata"
            }
          ],
          "title": "Implementation steps"
        },
        {
          "type": "bullets",
          "items": [
            "Quick Deploy reuses the CI stage's already-validated test run instead of re-running the full Apex suite — Salesforce allows this within a 10-day validation window, cutting minutes off every release without skipping coverage",
            "No automated rollback trigger: rollback is the documented manual procedure above, not a one-click tool — building true rollback tooling for Salesforce metadata would be its own separate project",
            "Branch protection relies on required status checks, not on a mandatory human review: on a single-maintainer pipeline, GitHub does not let authors approve their own Pull Request — a required reviewer is the first rule I would add with a second contributor",
            "No post-deploy smoke tests: the pipeline validates before deploying, not after — a gap I'd close first if this pipeline had to support a live production org today"
          ],
          "title": "Decisions & Limitations"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Integration, staging, production",
              "label": "Environments covered",
              "value": "3"
            },
            {
              "note": "Apex — required for deployment",
              "label": "Test coverage",
              "value": "> 75%"
            }
          ],
          "title": "Results"
        }
      ]
    },
    "fr": {
      "title": "Pipeline CI/CD — Déploiement Salesforce multi-environnements",
      "heroSubtitle": "Branches Git, validation Apex automatisée et procédure de rollback documentée pour les releases Salesforce — pas une simple checklist de déploiement",
      "sections": [
        {
          "body": "Salesforce n'a pas de story CI/CD native : les déploiements entre sandboxes et production se font soit via des Change Sets en point-and-click, soit via des scripts maison — et « ça marchait dans ma sandbox » est un mode d'échec classique. J'ai construit ce pipeline en projet personnel pour appliquer la discipline de release que j'appliquerais sur n'importe quelle plateforme — protection des branches, validation automatique à chaque Pull Request, promotion par étapes, procédure de rollback documentée — mais adaptée aux contraintes propres aux déploiements de métadonnées Salesforce : pas de rollback partiel, couverture de tests Apex obligatoire, métadonnées propres à chaque environnement.",
          "type": "text",
          "title": "Contexte"
        },
        {
          "type": "bullets",
          "items": [
            "Stratégie de branches Git : feature → develop → main, avec protection des branches develop et main",
            "Workflow GitHub Actions : validation Apex + tests automatiques à chaque Pull Request",
            "Déploiement automatique dans la sandbox d'intégration au merge sur develop, puis dans la sandbox de recette (staging) au merge sur main",
            "Mise en production par Quick Deploy, déclenchée manuellement après validation de la recette, en réutilisant la validation déjà exécutée contre la production",
            "Gestion des credentials Salesforce via GitHub Secrets (SFDX Auth URL chiffrée)",
            "Notifications de statut de déploiement intégrées à chaque étape du pipeline"
          ],
          "title": "Ce que j'ai mis en place"
        },
        {
          "type": "bullets",
          "items": [
            "Salesforce CLI (SFDX) — packaging et déploiement des métadonnées",
            "GitHub Actions — orchestration du pipeline CI/CD",
            "GitHub Secrets — gestion sécurisée des credentials SFDX",
            "Apex Test Run — exécution automatisée des tests unitaires",
            "SFDX Source Format — versionning des métadonnées Salesforce"
          ],
          "title": "Stack et outils"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Analyse",
              "description": "Cartographie des environnements (Dev, Staging, Prod) et définition de la stratégie de branches adaptée au cycle de release Salesforce"
            },
            {
              "label": "Configuration SFDX",
              "description": "Initialisation du projet en SFDX Source Format, configuration des .forceignore et mise en place de l'authentification via SFDX Auth URL"
            },
            {
              "label": "Pipeline CI",
              "description": "Création des workflows GitHub Actions : job de validation Apex avec exécution des tests unitaires déclenchée à chaque Pull Request vers develop et vers main"
            },
            {
              "label": "Pipeline CD",
              "description": "Automatisation des déploiements : sandbox d'intégration au merge sur develop, sandbox de recette (staging) au merge sur main, accompagnée d'une validation à blanc contre la production — puis Quick Deploy en production, déclenché manuellement, qui réutilise ce test run validé plutôt que de relancer toute la suite"
            },
            {
              "label": "Sécurisation",
              "description": "Stockage des credentials SFDX Auth URL dans GitHub Secrets ; develop et main protégées par des contrôles de statut obligatoires (la validation CI doit passer avant tout merge)"
            },
            {
              "label": "Procédure de rollback",
              "description": "Les déploiements de métadonnées Salesforce n'ont pas d'annulation native. Procédure documentée : revert du commit de merge sur main, re-tag du dernier package validé, puis re-déploiement via le même pipeline CI — aussi long qu'un déploiement normal, par construction, faute de raccourci possible sur les métadonnées Salesforce"
            }
          ],
          "title": "Étapes de mise en place"
        },
        {
          "type": "bullets",
          "items": [
            "Le Quick Deploy réutilise le test run déjà validé côté CI plutôt que de relancer toute la suite Apex — Salesforce l'autorise dans une fenêtre de validation de 10 jours, ce qui réduit chaque release de plusieurs minutes sans sacrifier la couverture",
            "Aucun déclenchement automatique de rollback : le rollback reste la procédure manuelle documentée ci-dessus, pas un outil en un clic — un vrai outillage de rollback pour les métadonnées Salesforce serait un projet à part entière",
            "La protection de branche repose sur des contrôles de statut obligatoires, pas sur une revue humaine imposée : sur un pipeline à une seule mainteneuse, GitHub ne permet pas d'approuver sa propre Pull Request — un relecteur obligatoire est la première règle que j'ajouterais avec une deuxième contributrice ou un deuxième contributeur",
            "Aucun test de fumée post-déploiement : le pipeline valide avant de déployer, pas après — la première limite que je comblerais si ce pipeline devait servir une org de production réelle aujourd'hui"
          ],
          "title": "Décisions & Limites"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Intégration, recette, production",
              "label": "Environnements couverts",
              "value": "3"
            },
            {
              "note": "Apex — requis pour déploiement",
              "label": "Couverture de tests",
              "value": "> 75%"
            }
          ],
          "title": "Résultats"
        }
      ]
    },
    "es": {
      "title": "Pipeline CI/CD — Despliegue Salesforce multi-entorno",
      "heroSubtitle": "Branching Git, validación Apex automatizada y un procedimiento de rollback documentado para releases de Salesforce — no una simple checklist de despliegue",
      "sections": [
        {
          "body": "Salesforce no tiene una historia CI/CD nativa: los despliegues entre sandboxes y producción se hacen con Change Sets point-and-click o con scripts caseros — y «funcionaba en mi sandbox» es un modo de fallo habitual. Construí este pipeline como proyecto personal para aplicar la misma disciplina de release que aplicaría en cualquier plataforma — protección de ramas, validación automática en cada Pull Request, promoción por etapas, procedimiento de rollback documentado — adaptada a las restricciones propias de los despliegues de metadatos de Salesforce: sin rollback parcial, cobertura de tests Apex obligatoria, metadatos específicos de cada entorno.",
          "type": "text",
          "title": "Contexto"
        },
        {
          "type": "bullets",
          "items": [
            "Estrategia de ramas Git: feature → develop → main, con protección de las ramas develop y main",
            "Workflow de GitHub Actions: validación Apex + tests automáticos en cada Pull Request",
            "Despliegue automático al sandbox de integración al hacer merge en develop, y al sandbox de validación (staging) al hacer merge en main",
            "Paso a producción mediante Quick Deploy, lanzado manualmente tras la validación de usuario, reutilizando la validación ya ejecutada contra producción",
            "Gestión de credenciales Salesforce vía GitHub Secrets (SFDX Auth URL cifrada)",
            "Notificaciones de estado de despliegue integradas en cada etapa del pipeline"
          ],
          "title": "Lo que construí"
        },
        {
          "type": "bullets",
          "items": [
            "Salesforce CLI (SFDX) — empaquetado y despliegue de metadatos",
            "GitHub Actions — orquestación del pipeline CI/CD",
            "GitHub Secrets — gestión segura de credenciales SFDX",
            "Apex Test Run — ejecución automatizada de pruebas unitarias",
            "SFDX Source Format — control de versiones de metadatos Salesforce"
          ],
          "title": "Herramientas y tecnologías"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Análisis",
              "description": "Mapeo de entornos (Dev, Staging, Prod) y definición de una estrategia de ramas adaptada al ciclo de release de Salesforce"
            },
            {
              "label": "Configuración SFDX",
              "description": "Inicialización del proyecto en SFDX Source Format, configuración de .forceignore y autenticación vía SFDX Auth URL"
            },
            {
              "label": "Pipeline CI",
              "description": "Workflows de GitHub Actions: job de validación Apex con ejecución de tests unitarios en cada Pull Request hacia develop y hacia main"
            },
            {
              "label": "Pipeline CD",
              "description": "Automatización de despliegues: sandbox de integración al merge en develop, sandbox de validación (staging) al merge en main junto con una validación en seco contra producción — después, un Quick Deploy a producción lanzado manualmente que reutiliza ese test run validado en vez de repetir toda la suite"
            },
            {
              "label": "Seguridad",
              "description": "Credenciales SFDX Auth URL almacenadas en GitHub Secrets; develop y main protegidas por comprobaciones de estado obligatorias (la validación de CI debe pasar antes de cualquier merge)"
            },
            {
              "label": "Procedimiento de rollback",
              "description": "Los despliegues de metadatos de Salesforce no tienen deshacer nativo. Procedimiento documentado: revertir el commit de merge en main, re-etiquetar el último paquete validado y volver a desplegarlo por el mismo pipeline CI — tan largo como un despliegue normal, por diseño, ya que no existe atajo posible para metadatos Salesforce"
            }
          ],
          "title": "Pasos de implementación"
        },
        {
          "type": "bullets",
          "items": [
            "El Quick Deploy reutiliza el test run ya validado en la etapa de CI en vez de repetir toda la suite Apex — Salesforce lo permite dentro de una ventana de validación de 10 días, recortando minutos en cada release sin sacrificar cobertura",
            "Sin disparador automático de rollback: el rollback sigue siendo el procedimiento manual documentado arriba, no una herramienta de un clic — construir un rollback automatizado real para metadatos Salesforce sería un proyecto aparte",
            "La protección de rama se basa en comprobaciones de estado obligatorias, no en una revisión humana impuesta: en un pipeline con una sola mantenedora, GitHub no permite aprobar la propia Pull Request — un revisor obligatorio es la primera regla que añadiría con una segunda persona en el equipo",
            "Sin pruebas de humo tras el despliegue: el pipeline valida antes de desplegar, no después — la primera limitación que resolvería si este pipeline tuviera que dar servicio a una org de producción real hoy"
          ],
          "title": "Decisiones y límites"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Integración, validación, producción",
              "label": "Entornos cubiertos",
              "value": "3"
            },
            {
              "note": "Apex — requerida para el despliegue",
              "label": "Cobertura de tests",
              "value": "> 75%"
            }
          ],
          "title": "Resultados"
        }
      ]
    }
  }
};

export default details;
