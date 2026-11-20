// content/project-details/risk-assessment-matrix.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "risk-assessment-matrix",
  "gallery": [
    {
      "alt": "risk-check catching a review set too far away and an acceptance signed by the wrong authority, then validating the register",
      "src": "/projects/risk-assessment-matrix/cover.svg"
    },
    {
      "alt": "Web interface in French: summary cards and residual risk heat map",
      "src": "/projects/risk-assessment-matrix/web-fr.png"
    },
    {
      "alt": "Web interface in dark theme: a heat map cell selected and the filtered list of risks (English)",
      "src": "/projects/risk-assessment-matrix/web-en-dark.png"
    },
    {
      "alt": "HTML report in French: summary and inherent and residual heat maps",
      "src": "/projects/risk-assessment-matrix/report-fr.png"
    },
    {
      "alt": "HTML report in dark theme (English)",
      "src": "/projects/risk-assessment-matrix/report-en-dark.png"
    }
  ],
  "locales": {
    "en": {
      "title": "Risk Assessment Matrix — methodical risk register",
      "heroSubtitle": "A risk register that follows a written method — ISO/IEC 27005:2022 or EBIOS Risk Manager — and checks itself: scores, treatment, formal acceptance by the right authority and reviews, with reports, safe CSV import/export and a web interface",
      "sections": [
        {
          "type": "text",
          "title": "Context",
          "body": "I rebuilt this project from scratch, replacing two older prototypes (an English risk matrix and its French rebuild). The aim: a risk register a small or mid-sized organisation can defend in front of management or an ISO/IEC 27001 auditor. The method — scales, grid, appetite, acceptance authorities — is written in a file and validated; every risk is then checked against it automatically. Atelier Lumen, the fictional company of my incident response tabletop exercise, provides the example registers."
        },
        {
          "type": "bullets",
          "title": "What the repository contains",
          "items": [
            "A method format in TOML, bilingual, with two presets: 5×5 likelihood × impact (ISO/IEC 27005:2022) and EBIOS RM 4×4 (likelihood V1–V4 × severity G1–G4, ANSSI 1.5)",
            "A register format: assets, threat, vulnerability, inherent and residual risk, planned measures, treatment (reduce, accept, transfer, avoid), formal acceptance, review, history",
            "References on each risk and measure: ISO/IEC 27001:2022 Annex A controls (numbers only), MITRE ATT&CK techniques, and the matching incident response playbook",
            "Four commands: risk-check (validation), risk-report (Markdown and HTML), risk-export (JSON, CSV) and risk-import (CSV to TOML)",
            "An assessment guide and Atelier Lumen example registers, in French and English"
          ]
        },
        {
          "type": "bullets",
          "title": "Rules checked automatically",
          "items": [
            "A consistent method: monotonic grid, every level used, an acceptance authority for each level above the appetite, shorter reviews for more severe risks",
            "Residual risk never above inherent risk without a justification",
            "Formal acceptance required when the residual risk stays above the appetite and nothing is under way to reduce it (ISO/IEC 27001, 6.1.3) — signed by the authority set by the method, for its maximum duration",
            "Next review within the frequency of the residual level; chronological history",
            "Errors (invalid data) are kept apart from warnings (overdue measure or review, expired acceptance); --strict makes warnings blocking"
          ]
        },
        {
          "type": "bullets",
          "title": "Security choices",
          "items": [
            "CSV export protected against formula injection (CWE-1236): cells starting with =, +, -, @ are neutralised, and the protection is removed on import",
            "Imports limited in size and rows, UTF-8 required, no file overwritten without --force",
            "HTML report as a single file with no script: every text escaped, CSP allowing only its own stylesheet through a SHA-256 hash",
            "Real registers excluded from Git by naming convention; the web interface reads a file locally and never sends or keeps it"
          ]
        },
        {
          "type": "bullets",
          "title": "Web interface",
          "items": [
            "Loads the example registers or a local JSON export, fully validated before display (types, dates, colours, consistency with the grid)",
            "Summary of active risks, risks above the appetite, overdue measures and reviews, expired acceptances",
            "Clickable inherent and residual heat maps, filters (level, owner, treatment, accent-insensitive search) and a detailed sheet per risk",
            "Action plan and review schedule; French and English, light and dark themes, keyboard and mobile friendly, strict CSP"
          ]
        },
        {
          "type": "metrics",
          "title": "Engineering quality",
          "items": [
            {
              "label": "Automated tests",
              "value": "240",
              "note": "216 Python + 24 web"
            },
            {
              "label": "CI jobs",
              "value": "7",
              "note": "Windows + Linux, Python 3.11/3.14, Ruff, registers, web interface"
            },
            {
              "label": "Method presets",
              "value": "2",
              "note": "5×5 and EBIOS RM 4×4"
            },
            {
              "label": "Runtime dependencies",
              "value": "0"
            }
          ]
        },
        {
          "type": "timeline",
          "title": "How it is used",
          "steps": [
            {
              "label": "Prepare",
              "description": "Pick a preset, adapt the scales and the appetite with management, and let risk-check validate the method."
            },
            {
              "label": "Assess",
              "description": "Describe each risk (cause → event → consequence) and score its inherent risk; the level is read from the method's grid."
            },
            {
              "label": "Treat and accept",
              "description": "Plan measures with owners and due dates, score the residual risk, and have the designated authority accept what remains."
            },
            {
              "label": "Review",
              "description": "Reviews and acceptances expire on their own schedule; risk-check --strict and the report flag what is overdue."
            }
          ]
        },
        {
          "type": "resources",
          "title": "Links",
          "items": [
            {
              "label": "Live interface",
              "href": "https://aiyeesha.github.io/risk-assessment-matrix/"
            },
            {
              "label": "Source code",
              "href": "https://github.com/Aiyeesha/risk-assessment-matrix"
            },
            {
              "label": "Assessment guide (English)",
              "href": "https://github.com/Aiyeesha/risk-assessment-matrix/blob/main/docs/en/assessment-guide.md"
            },
            {
              "label": "Release v1.1.0",
              "href": "https://github.com/Aiyeesha/risk-assessment-matrix/releases/tag/v1.1.0"
            }
          ]
        }
      ]
    },
    "fr": {
      "title": "Matrice d'évaluation des risques — registre méthodique",
      "heroSubtitle": "Un registre de risques qui suit une méthode écrite — ISO/IEC 27005:2022 ou EBIOS Risk Manager — et se vérifie lui-même : notes, traitement, acceptation formelle par la bonne autorité et revues, avec rapports, import/export CSV sûrs et interface web",
      "sections": [
        {
          "type": "text",
          "title": "Contexte",
          "body": "J'ai reconstruit ce projet de zéro, en remplacement de deux anciens prototypes (une matrice de risques en anglais et sa reconstruction en français). L'objectif : un registre de risques qu'une PME ou une ETI peut défendre devant sa direction ou un auditeur ISO/IEC 27001. La méthode — échelles, grille, appétence, autorités d'acceptation — est écrite dans un fichier et vérifiée ; chaque risque est ensuite contrôlé automatiquement par rapport à elle. Atelier Lumen, l'entreprise fictive de mon exercice sur table de réponse aux incidents, fournit les registres d'exemple."
        },
        {
          "type": "bullets",
          "title": "Contenu du dépôt",
          "items": [
            "Un format de méthode en TOML, bilingue, avec deux préréglages : 5×5 vraisemblance × impact (ISO/IEC 27005:2022) et EBIOS RM 4×4 (vraisemblance V1–V4 × gravité G1–G4, ANSSI 1.5)",
            "Un format de registre : actifs, menace, vulnérabilité, risque inhérent et résiduel, mesures prévues, traitement (réduire, accepter, transférer, éviter), acceptation formelle, revue, historique",
            "Des références sur chaque risque et chaque mesure : mesures de l'annexe A d'ISO/IEC 27001:2022 (numéros seulement), techniques MITRE ATT&CK et playbook de réponse aux incidents correspondant",
            "Quatre commandes : risk-check (vérification), risk-report (Markdown et HTML), risk-export (JSON, CSV) et risk-import (CSV vers TOML)",
            "Un guide d'évaluation et les registres d'exemple d'Atelier Lumen, en français et en anglais"
          ]
        },
        {
          "type": "bullets",
          "title": "Règles vérifiées automatiquement",
          "items": [
            "Une méthode cohérente : grille monotone, chaque niveau utilisé, une autorité d'acceptation pour chaque niveau au-dessus de l'appétence, revues plus fréquentes pour les risques plus graves",
            "Risque résiduel jamais supérieur à l'inhérent sans justification",
            "Acceptation formelle exigée quand le risque résiduel reste au-dessus de l'appétence et que plus rien n'est en cours pour le réduire (ISO/IEC 27001, 6.1.3) — signée par l'autorité prévue par la méthode, pour sa durée maximale",
            "Prochaine revue dans la fréquence du niveau résiduel ; historique chronologique",
            "Erreurs (données invalides) distinctes des avertissements (mesure ou revue en retard, acceptation expirée) ; --strict rend les avertissements bloquants"
          ]
        },
        {
          "type": "bullets",
          "title": "Choix de sécurité",
          "items": [
            "Export CSV protégé contre l'injection de formules (CWE-1236) : les cellules commençant par =, +, -, @ sont neutralisées, et la protection est retirée à l'import",
            "Imports limités en taille et en lignes, UTF-8 exigé, aucun fichier écrasé sans --force",
            "Rapport HTML en un seul fichier sans script : tout texte échappé, CSP n'autorisant que sa propre feuille de style par empreinte SHA-256",
            "Registres réels exclus de Git par convention de nommage ; l'interface web lit un fichier localement, sans jamais l'envoyer ni le conserver"
          ]
        },
        {
          "type": "bullets",
          "title": "Interface web",
          "items": [
            "Chargement des registres d'exemple ou d'un export JSON local, entièrement validé avant affichage (types, dates, couleurs, cohérence avec la grille)",
            "Synthèse des risques actifs, au-dessus de l'appétence, des mesures et revues en retard, des acceptations expirées",
            "Cartographies cliquables du risque inhérent et résiduel, filtres (niveau, responsable, traitement, recherche sans accents) et fiche détaillée par risque",
            "Plan d'action et calendrier des revues ; français et anglais, thèmes clair et sombre, clavier et mobile, CSP stricte"
          ]
        },
        {
          "type": "metrics",
          "title": "Qualité d'ingénierie",
          "items": [
            {
              "label": "Tests automatisés",
              "value": "240",
              "note": "216 Python + 24 web"
            },
            {
              "label": "Jobs de CI",
              "value": "7",
              "note": "Windows + Linux, Python 3.11/3.14, Ruff, registres, interface web"
            },
            {
              "label": "Préréglages de méthode",
              "value": "2",
              "note": "5×5 et EBIOS RM 4×4"
            },
            {
              "label": "Dépendances d'exécution",
              "value": "0"
            }
          ]
        },
        {
          "type": "timeline",
          "title": "Utilisation",
          "steps": [
            {
              "label": "Préparer",
              "description": "Choisir un préréglage, adapter les échelles et l'appétence avec la direction, puis faire valider la méthode par risk-check."
            },
            {
              "label": "Apprécier",
              "description": "Décrire chaque risque (cause → événement → conséquence) et coter le risque inhérent ; le niveau est lu dans la grille de la méthode."
            },
            {
              "label": "Traiter et accepter",
              "description": "Planifier les mesures avec responsables et échéances, coter le risque résiduel, et faire accepter ce qui reste par l'autorité désignée."
            },
            {
              "label": "Revoir",
              "description": "Revues et acceptations expirent à leur rythme ; risk-check --strict et le rapport signalent ce qui est en retard."
            }
          ]
        },
        {
          "type": "resources",
          "title": "Liens",
          "items": [
            {
              "label": "Interface en ligne",
              "href": "https://aiyeesha.github.io/risk-assessment-matrix/"
            },
            {
              "label": "Code source",
              "href": "https://github.com/Aiyeesha/risk-assessment-matrix"
            },
            {
              "label": "Guide d'évaluation (français)",
              "href": "https://github.com/Aiyeesha/risk-assessment-matrix/blob/main/docs/fr/guide-evaluation.md"
            },
            {
              "label": "Version v1.1.0",
              "href": "https://github.com/Aiyeesha/risk-assessment-matrix/releases/tag/v1.1.0"
            }
          ]
        }
      ]
    },
    "es": {
      "title": "Matriz de evaluación de riesgos — registro metódico",
      "heroSubtitle": "Un registro de riesgos que sigue un método escrito — ISO/IEC 27005:2022 o EBIOS Risk Manager — y se verifica a sí mismo: puntuaciones, tratamiento, aceptación formal por la autoridad correcta y revisiones, con informes, importación/exportación CSV segura e interfaz web",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "body": "Reconstruí este proyecto desde cero, en sustitución de dos prototipos anteriores (una matriz de riesgos en inglés y su reconstrucción en francés). El objetivo: un registro de riesgos que una pyme pueda defender ante su dirección o un auditor ISO/IEC 27001. El método — escalas, matriz, apetito, autoridades de aceptación — se escribe en un archivo y se valida; después, cada riesgo se comprueba automáticamente con él. Atelier Lumen, la empresa ficticia de mi ejercicio de simulación de respuesta a incidentes, aporta los registros de ejemplo."
        },
        {
          "type": "bullets",
          "title": "Contenido del repositorio",
          "items": [
            "Un formato de método en TOML, bilingüe, con dos preajustes: 5×5 probabilidad × impacto (ISO/IEC 27005:2022) y EBIOS RM 4×4 (probabilidad V1–V4 × gravedad G1–G4, ANSSI 1.5)",
            "Un formato de registro: activos, amenaza, vulnerabilidad, riesgo inherente y residual, medidas previstas, tratamiento (reducir, aceptar, transferir, evitar), aceptación formal, revisión, historial",
            "Referencias en cada riesgo y medida: controles del anexo A de ISO/IEC 27001:2022 (solo números), técnicas MITRE ATT&CK y el playbook de respuesta a incidentes correspondiente",
            "Cuatro comandos: risk-check (verificación), risk-report (Markdown y HTML), risk-export (JSON, CSV) y risk-import (CSV a TOML)",
            "Una guía de evaluación y los registros de ejemplo de Atelier Lumen, en francés e inglés"
          ]
        },
        {
          "type": "bullets",
          "title": "Reglas verificadas automáticamente",
          "items": [
            "Un método coherente: matriz monótona, todos los niveles usados, una autoridad de aceptación para cada nivel por encima del apetito, revisiones más frecuentes para los riesgos más graves",
            "Riesgo residual nunca superior al inherente sin justificación",
            "Aceptación formal obligatoria cuando el riesgo residual sigue por encima del apetito y ya nada está en curso para reducirlo (ISO/IEC 27001, 6.1.3) — firmada por la autoridad prevista en el método, por su duración máxima",
            "Próxima revisión dentro de la frecuencia del nivel residual; historial cronológico",
            "Errores (datos no válidos) separados de los avisos (medida o revisión atrasada, aceptación vencida); --strict hace que los avisos bloqueen"
          ]
        },
        {
          "type": "bullets",
          "title": "Decisiones de seguridad",
          "items": [
            "Exportación CSV protegida contra la inyección de fórmulas (CWE-1236): las celdas que empiezan por =, +, -, @ se neutralizan, y la protección se retira al importar",
            "Importaciones limitadas en tamaño y filas, UTF-8 obligatorio, ningún archivo sobrescrito sin --force",
            "Informe HTML en un solo archivo sin script: todo el texto escapado, CSP que solo autoriza su propia hoja de estilo mediante un hash SHA-256",
            "Registros reales excluidos de Git por convención de nombres; la interfaz web lee un archivo en local, sin enviarlo ni conservarlo nunca"
          ]
        },
        {
          "type": "bullets",
          "title": "Interfaz web",
          "items": [
            "Carga de los registros de ejemplo o de una exportación JSON local, validada por completo antes de mostrarse (tipos, fechas, colores, coherencia con la matriz)",
            "Resumen de riesgos activos, por encima del apetito, medidas y revisiones atrasadas, aceptaciones vencidas",
            "Mapas de calor interactivos del riesgo inherente y residual, filtros (nivel, responsable, tratamiento, búsqueda sin acentos) y ficha detallada de cada riesgo",
            "Plan de acción y calendario de revisiones; francés e inglés, temas claro y oscuro, teclado y móvil, CSP estricta"
          ]
        },
        {
          "type": "metrics",
          "title": "Calidad de ingeniería",
          "items": [
            {
              "label": "Pruebas automatizadas",
              "value": "240",
              "note": "216 Python + 24 web"
            },
            {
              "label": "Jobs de CI",
              "value": "7",
              "note": "Windows + Linux, Python 3.11/3.14, Ruff, registros, interfaz web"
            },
            {
              "label": "Preajustes de método",
              "value": "2",
              "note": "5×5 y EBIOS RM 4×4"
            },
            {
              "label": "Dependencias de ejecución",
              "value": "0"
            }
          ]
        },
        {
          "type": "timeline",
          "title": "Uso",
          "steps": [
            {
              "label": "Preparar",
              "description": "Elegir un preajuste, adaptar las escalas y el apetito con la dirección y hacer validar el método por risk-check."
            },
            {
              "label": "Evaluar",
              "description": "Describir cada riesgo (causa → evento → consecuencia) y puntuar su riesgo inherente; el nivel se lee en la matriz del método."
            },
            {
              "label": "Tratar y aceptar",
              "description": "Planificar las medidas con responsables y plazos, puntuar el riesgo residual y hacer aceptar lo que queda por la autoridad designada."
            },
            {
              "label": "Revisar",
              "description": "Revisiones y aceptaciones vencen a su ritmo; risk-check --strict y el informe señalan lo atrasado."
            }
          ]
        },
        {
          "type": "resources",
          "title": "Enlaces",
          "items": [
            {
              "label": "Interfaz en línea",
              "href": "https://aiyeesha.github.io/risk-assessment-matrix/"
            },
            {
              "label": "Código fuente",
              "href": "https://github.com/Aiyeesha/risk-assessment-matrix"
            },
            {
              "label": "Guía de evaluación (inglés)",
              "href": "https://github.com/Aiyeesha/risk-assessment-matrix/blob/main/docs/en/assessment-guide.md"
            },
            {
              "label": "Versión v1.1.0",
              "href": "https://github.com/Aiyeesha/risk-assessment-matrix/releases/tag/v1.1.0"
            }
          ]
        }
      ]
    }
  }
};

export default details;
