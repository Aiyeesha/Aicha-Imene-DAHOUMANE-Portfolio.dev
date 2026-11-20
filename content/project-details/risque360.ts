// content/project-details/risque360.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "risque360",
  "gallery": [],
  "locales": {
    "en": {
      "title": "risque360 — STRIDE Threat Modeling, Vendor Risk & Incident Recalibration",
      "sections": [
        {
          "type": "text",
          "title": "Context",
          "paragraphs": [
            "I built risque360 as a complement to my risk-assessment-matrix register (ISO/IEC 27005, EBIOS RM): a classic risk register poorly captures threats specific to an application's architecture, risks carried by vendors/third parties, and how a history of incidents should shift a probability declared \"in the abstract\". I brought these three angles together in a single register, with a data-driven probability recalibration mechanism — the most differentiating part of the project."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Organizational risk register — same spirit as risk-assessment-matrix (manual form, business categories)",
            "Application threat modeling (STRIDE) — for a given component (API Gateway, auth service, database...), generates one risk per STRIDE category: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege",
            "Vendor/third-party risk register — a vendor (access level, security questionnaire status, known incident) automatically generates a risk, with an initial probability estimated by a transparent heuristic — never enforced, always editable",
            "Incident log & recalibration — each risk carries a correlation key; incidents logged under that same key are used to compute a suggested probability over a rolling 12-month window. The suggestion is never auto-applied — an explicit \"Apply\" button is required"
          ],
          "title": "The 4 modules"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "0-2 incidents / rolling 12 months",
              "value": "No adjustment"
            },
            {
              "label": "3-5 incidents",
              "value": "Probability +1 (capped at 5)"
            },
            {
              "label": "6+ incidents",
              "value": "Probability +2 (capped at 5)"
            },
            {
              "label": "Test-validated example",
              "value": "\"Phishing — credential theft\" (declared probability 2/5): 4 related incidents in 12 months → suggested 3/5, shown with an explicit \"Apply\" button"
            }
          ],
          "title": "Recalibration algorithm"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Base",
              "value": "High access: 3 · medium: 2 · low: 1"
            },
            {
              "label": "+1",
              "value": "If security questionnaire not completed"
            },
            {
              "label": "+1",
              "value": "If questionnaire compliant with reservations"
            },
            {
              "label": "+1",
              "value": "If a known incident occurred in the last 12 months"
            },
            {
              "label": "Cap",
              "value": "5"
            }
          ],
          "title": "Vendor heuristic (transparent, editable)"
        },
        {
          "type": "text",
          "title": "Bug found and fixed during development",
          "paragraphs": [
            "Automatic correlation-key generation (from a vendor name or a STRIDE component) didn't strip punctuation — for example \"PayGateway Inc.\" generated the vendor key fournisseur-paygateway-inc. with a trailing period, which would have silently broken the link to incidents logged under that same key. I fixed it with a shared slugifier() function that strips diacritics and punctuation before generating the key, and verified the fix with a direct isolated-module test (cache-busting import) to rule out any ES module caching effect during debugging."
          ]
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Stack",
              "value": "Vanilla HTML/CSS/JS (ES modules, no dependencies) + Python CLI (argparse, Jinja2, pytest)"
            },
            {
              "label": "Tests",
              "value": "6 pytest tests — level boundaries, vendor heuristic, 12-month window, recalibration tiers, preview non-mutation, combined example-data validation"
            },
            {
              "label": "JS ↔ Python parity",
              "value": "Recalibration logic duplicated identically in the Python CLI (recalibration.py), tested separately"
            },
            {
              "label": "Interface",
              "value": "Tabbed app: Dashboard (heatmap + global register), Register, STRIDE, Vendors, Incidents"
            }
          ],
          "title": "Outcomes"
        }
      ]
    },
    "fr": {
      "title": "risque360 — Modélisation STRIDE, Risques Fournisseurs & Recalibration par Incidents",
      "heroSubtitle": "Registre des risques unifié qui réunit trois sources sous un même moteur de notation probabilité × impact : modélisation STRIDE par composant applicatif, risque fournisseur noté par une heuristique transparente, et journal d'incidents qui propose un recalibrage de la probabilité sur 12 mois glissants — jamais appliqué sans validation explicite.",
      "sections": [
        {
          "type": "text",
          "title": "Contexte",
          "paragraphs": [
            "J'ai construit risque360 en complément de mon registre risk-assessment-matrix (ISO/IEC 27005, EBIOS RM) : un registre de risques classique capture mal les menaces propres à une architecture applicative, les risques portés par les fournisseurs/tiers, et la façon dont un historique d'incidents devrait faire évoluer une probabilité déclarée « à froid ». J'ai réuni ces trois angles dans un registre unique, avec un mécanisme de recalibration de probabilité piloté par les données — la partie la plus différenciante du projet."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Registre de risques organisationnels — dans l'esprit de risk-assessment-matrix (formulaire manuel, catégories métier)",
            "Modélisation de menaces applicatives (STRIDE) — pour un composant donné (API Gateway, service d'auth, base de données...), génère un risque par catégorie STRIDE : Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege",
            "Registre des risques fournisseurs/tiers — un fournisseur (niveau d'accès, statut du questionnaire de sécurité, incident connu) génère automatiquement un risque, avec une probabilité initiale estimée par une heuristique transparente, jamais imposée, toujours modifiable",
            "Journal d'incidents & recalibration — chaque risque porte une clé de corrélation ; les incidents journalisés partageant cette clé permettent de calculer une probabilité suggérée sur une fenêtre glissante de 12 mois. La suggestion n'est jamais appliquée automatiquement : un bouton « Appliquer » explicite est requis"
          ],
          "title": "Les 4 modules"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "0-2 incidents / 12 mois glissants",
              "value": "Aucun ajustement"
            },
            {
              "label": "3-5 incidents",
              "value": "Probabilité +1 (plafonné à 5)"
            },
            {
              "label": "6+ incidents",
              "value": "Probabilité +2 (plafonné à 5)"
            },
            {
              "label": "Exemple validé par les tests",
              "value": "« Hameçonnage — vol d'identifiants » (probabilité déclarée 2/5) : 4 incidents liés sur 12 mois → suggestion 3/5, affichée avec un bouton « Appliquer » explicite"
            }
          ],
          "title": "Algorithme de recalibration"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Base",
              "value": "Accès élevé : 3 · moyen : 2 · faible : 1"
            },
            {
              "label": "+1",
              "value": "Si questionnaire de sécurité non réalisé"
            },
            {
              "label": "+1",
              "value": "Si questionnaire conforme avec réserves"
            },
            {
              "label": "+1",
              "value": "Si incident connu dans les 12 derniers mois"
            },
            {
              "label": "Plafond",
              "value": "5"
            }
          ],
          "title": "Heuristique fournisseur (transparente, éditable)"
        },
        {
          "type": "text",
          "title": "Bug détecté et corrigé pendant le développement",
          "paragraphs": [
            "La génération automatique de clé de corrélation (à partir du nom d'un fournisseur ou d'un composant STRIDE) ne retirait pas la ponctuation — par exemple « PayGateway Inc. » générait la clé fournisseur-paygateway-inc. avec un point final, ce qui aurait cassé silencieusement le lien avec les incidents journalisés partageant cette clé. Je l'ai corrigé avec une fonction slugifier() partagée qui retire diacritiques et ponctuation avant de générer la clé, et j'ai vérifié le correctif par un test direct du module en isolation (import avec cache-busting) pour écarter tout effet de cache de module ES pendant le débogage."
          ]
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Stack",
              "value": "HTML/CSS/JS vanilla (ES modules, sans dépendance) + CLI Python (argparse, Jinja2, pytest)"
            },
            {
              "label": "Tests",
              "value": "6 tests pytest — bornes de niveaux, heuristique fournisseur, fenêtre 12 mois, paliers de recalibration, non-mutation de l'aperçu, validation du jeu d'exemple combiné"
            },
            {
              "label": "Parité JS ↔ Python",
              "value": "Logique de recalibration dupliquée à l'identique côté CLI Python (recalibration.py), testée séparément"
            },
            {
              "label": "Interface",
              "value": "App à onglets : Tableau de bord (heatmap + registre global), Registre, STRIDE, Fournisseurs, Incidents"
            }
          ],
          "title": "Résultats"
        }
      ]
    },
    "es": {
      "title": "risque360 — Modelado STRIDE, Riesgo de Proveedores y Recalibración por Incidentes",
      "heroSubtitle": "Registro de riesgos unificado que reúne tres fuentes bajo un mismo motor de puntuación probabilidad × impacto: modelado STRIDE por componente de la aplicación, riesgo de proveedores puntuado con una heurística transparente y un registro de incidentes que propone recalibrar la probabilidad en 12 meses móviles — nunca aplicado sin validación explícita.",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "paragraphs": [
            "Construí risque360 como complemento de mi registro risk-assessment-matrix (ISO/IEC 27005, EBIOS RM): un registro de riesgos clásico capta mal las amenazas propias de una arquitectura de aplicación, los riesgos que aportan los proveedores/terceros, y cómo un historial de incidentes debería modificar una probabilidad declarada «en frío». Reuní estos tres ángulos en un único registro, con un mecanismo de recalibración de probabilidad impulsado por datos — la parte más diferenciadora del proyecto."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Registro de riesgos organizacionales — mismo espíritu que risk-assessment-matrix (formulario manual, categorías de negocio)",
            "Modelado de amenazas de aplicación (STRIDE) — para un componente dado (API Gateway, servicio de autenticación, base de datos...), genera un riesgo por categoría STRIDE: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege",
            "Registro de riesgos de proveedores/terceros — un proveedor (nivel de acceso, estado del cuestionario de seguridad, incidente conocido) genera automáticamente un riesgo, con una probabilidad inicial estimada mediante una heurística transparente — nunca impuesta, siempre editable",
            "Registro de incidentes y recalibración — cada riesgo lleva una clave de correlación; los incidentes registrados bajo esa misma clave permiten calcular una probabilidad sugerida en una ventana móvil de 12 meses. La sugerencia nunca se aplica automáticamente — se requiere un botón «Aplicar» explícito"
          ],
          "title": "Los 4 módulos"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "0-2 incidentes / 12 meses móviles",
              "value": "Sin ajuste"
            },
            {
              "label": "3-5 incidentes",
              "value": "Probabilidad +1 (tope 5)"
            },
            {
              "label": "6+ incidentes",
              "value": "Probabilidad +2 (tope 5)"
            },
            {
              "label": "Ejemplo validado por los tests",
              "value": "«Phishing — robo de credenciales» (probabilidad declarada 2/5): 4 incidentes relacionados en 12 meses → sugerencia 3/5, mostrada con un botón «Aplicar» explícito"
            }
          ],
          "title": "Algoritmo de recalibración"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Base",
              "value": "Acceso alto: 3 · medio: 2 · bajo: 1"
            },
            {
              "label": "+1",
              "value": "Si el cuestionario de seguridad no se ha completado"
            },
            {
              "label": "+1",
              "value": "Si el cuestionario es conforme con reservas"
            },
            {
              "label": "+1",
              "value": "Si hubo un incidente conocido en los últimos 12 meses"
            },
            {
              "label": "Tope",
              "value": "5"
            }
          ],
          "title": "Heurística de proveedores (transparente, editable)"
        },
        {
          "type": "text",
          "title": "Error detectado y corregido durante el desarrollo",
          "paragraphs": [
            "La generación automática de la clave de correlación (a partir del nombre de un proveedor o un componente STRIDE) no eliminaba la puntuación — por ejemplo, «PayGateway Inc.» generaba la clave fournisseur-paygateway-inc. con un punto final, lo que habría roto silenciosamente el enlace con los incidentes registrados bajo esa misma clave. Lo corregí con una función slugifier() compartida que elimina diacríticos y puntuación antes de generar la clave, y verifiqué la corrección con una prueba directa del módulo en aislamiento (importación con cache-busting) para descartar cualquier efecto de caché de módulos ES durante la depuración."
          ]
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Stack",
              "value": "HTML/CSS/JS vanilla (módulos ES, sin dependencias) + CLI Python (argparse, Jinja2, pytest)"
            },
            {
              "label": "Tests",
              "value": "6 tests pytest — límites de nivel, heurística de proveedores, ventana de 12 meses, niveles de recalibración, no mutación de la vista previa, validación del conjunto de datos de ejemplo combinado"
            },
            {
              "label": "Paridad JS ↔ Python",
              "value": "Lógica de recalibración duplicada de forma idéntica en la CLI Python (recalibration.py), probada por separado"
            },
            {
              "label": "Interfaz",
              "value": "App con pestañas: Panel (mapa de calor + registro global), Registro, STRIDE, Proveedores, Incidentes"
            }
          ],
          "title": "Resultados"
        }
      ]
    }
  }
};

export default details;
