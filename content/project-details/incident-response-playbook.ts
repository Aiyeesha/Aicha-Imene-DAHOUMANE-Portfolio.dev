// content/project-details/incident-response-playbook.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "incident-response-playbook",
  "gallery": [
    {
      "alt": "playbook-check catching a revoked MITRE ATT&CK technique and a broken link, then the JSON export",
      "src": "/projects/incident-response-playbook/cover.svg"
    },
    {
      "alt": "Web interface: estimated severity S1 with its deciding criterion and the internal timelines for that level (French)",
      "src": "/projects/incident-response-playbook/web-triage-fr.png"
    },
    {
      "alt": "Web interface in dark theme: legal deadline countdowns sorted by urgency (English)",
      "src": "/projects/incident-response-playbook/web-deadlines-en.png"
    },
    {
      "alt": "Repository README on GitHub with CI, Python, dependency, ATT&CK and licence badges",
      "src": "/projects/incident-response-playbook/github-readme-en.png"
    },
    {
      "alt": "Ransomware playbook front matter rendered as a table on GitHub, with its MITRE ATT&CK techniques",
      "src": "/projects/incident-response-playbook/github-playbook-en.png"
    },
    {
      "alt": "Triage and containment checklists of the ransomware playbook on GitHub",
      "src": "/projects/incident-response-playbook/github-checklist-en.png"
    },
    {
      "alt": "Release v1.0.0 on GitHub with the JSON exports attached",
      "src": "/projects/incident-response-playbook/github-release-fr.png"
    }
  ],
  "locales": {
    "en": {
      "title": "Incident Response Playbook — bilingual SOC procedures",
      "heroSubtitle": "Seven incident response playbooks a team can follow under pressure, in French and English — with legal deadlines, evidence handling and MITRE ATT&CK mapping, all checked automatically in CI",
      "sections": [
        {
          "type": "text",
          "title": "Context",
          "body": "I rebuilt this project from scratch by merging my two older repositories (one English, one French) into a single bilingual reference. The aim is practical: when an incident starts, a SOC analyst or an IT admin in a small or mid-sized company should know who does what, in which order, which evidence to keep and which deadlines apply — without having to interpret a framework. The procedures follow NIST SP 800-61 Rev. 3 (April 2025, aligned with CSF 2.0) and map every attacker behaviour to MITRE ATT&CK."
        },
        {
          "type": "bullets",
          "title": "What the repository contains",
          "items": [
            "7 playbooks: malware, ransomware, data breach, phishing, unauthorised access, denial of service, and compromised account with payment fraud",
            "The same 8 numbered phases in each: detection, triage, containment, evidence, eradication, recovery, obligations and communication, closure — with checklist actions",
            "6 reference documents: severity levels S1–S4 and timelines, escalation, RACI matrix, regulatory context, evidence preservation, and a ransomware tabletop exercise",
            "4 templates: incident report, blameless post-mortem, crisis communication (staff, customers, GDPR article 34, press) and evidence log with chain of custody",
            "Everything in French and English, with the same metadata in both languages"
          ]
        },
        {
          "type": "bullets",
          "title": "Legal and evidence choices",
          "items": [
            "GDPR articles 33 and 34: notification to the CNIL within 72 hours and information of the people affected when the risk is high",
            "NIS 2 article 23: early warning within 24 hours, notification within 72 hours, final report within one month — the French transposition flagged as still in progress",
            "French Insurance Code article L. 12-10-1: police complaint within 72 hours to be compensated for a cyberattack",
            "Evidence collected in order of volatility (RFC 3227), SHA-256 hashes and a chain of custody; machines isolated, never switched off",
            "Public contacts verified on official sources: 17Cyber, Cybermalveillance.gouv.fr, CERT-FR, CNIL, Signal Spam and 33700"
          ]
        },
        {
          "type": "bullets",
          "title": "Automated checks",
          "items": [
            "Every document starts with a structured front matter (strict YAML subset) rendered as a table on GitHub",
            "playbook-check verifies required fields, FR/EN parity of severities and techniques, the 8-phase structure with actions to tick, and every internal link",
            "Each MITRE ATT&CK technique is checked against the official 20.1 data bundled with the tool: unknown or revoked techniques are rejected with their replacement, and each one must be explained in the text",
            "playbook-export turns the documentation into JSON — checklists, severity grid and legal deadlines read from the Markdown tables — and refuses to export anything if a single problem remains"
          ]
        },
        {
          "type": "bullets",
          "title": "Web interface",
          "items": [
            "Severity triage on the five criteria of the severity grid: the most severe wins, a playbook can raise the level but never lower it",
            "Playbook choice from each playbook's \"when to use it\" paragraph",
            "Legal deadline countdowns from the time the incident became known: GDPR 72 h, NIS 2 24 h and 72 h, police complaint 72 h",
            "Timestamped checklist of the 8 phases and a Markdown report in UTC, ready for the incident report",
            "Strict content security policy, no analytics or cookies, nothing kept by default; published on GitHub Pages from the same commit as the playbooks"
          ]
        },
        {
          "type": "metrics",
          "title": "Engineering quality",
          "items": [
            {
              "label": "Checklist actions",
              "value": "219",
              "note": "per language, across 7 playbooks"
            },
            {
              "label": "Automated tests",
              "value": "142",
              "note": "108 Python (validator, export) + 34 web"
            },
            {
              "label": "CI jobs",
              "value": "7",
              "note": "Windows + Linux, Python 3.11/3.14, Ruff, documentation, web interface"
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
              "label": "Qualify",
              "description": "The severity grid (S1 to S4) and the decision table point to the right playbook and the right people to notify."
            },
            {
              "label": "Respond",
              "description": "The team follows the 8 phases and ticks each action, preserving evidence before anything is cleaned."
            },
            {
              "label": "Report",
              "description": "Legal deadlines are tracked from the moment of awareness; templates cover the report, the communication and the evidence log."
            },
            {
              "label": "Improve",
              "description": "A blameless post-mortem and a yearly tabletop exercise feed the next version of the playbooks."
            }
          ]
        },
        {
          "type": "resources",
          "title": "Links",
          "items": [
            {
              "label": "Live interface",
              "href": "https://aiyeesha.github.io/incident-response-playbook/"
            },
            {
              "label": "Source code",
              "href": "https://github.com/Aiyeesha/incident-response-playbook"
            },
            {
              "label": "Ransomware playbook (English)",
              "href": "https://github.com/Aiyeesha/incident-response-playbook/blob/main/en/playbooks/P02-ransomware.md"
            },
            {
              "label": "Release v1.1.0 and JSON exports",
              "href": "https://github.com/Aiyeesha/incident-response-playbook/releases/tag/v1.1.0"
            }
          ]
        }
      ]
    },
    "fr": {
      "title": "Playbook de réponse aux incidents — procédures SOC bilingues",
      "heroSubtitle": "Sept playbooks de réponse aux incidents qu'une équipe peut suivre sous pression, en français et en anglais — avec délais légaux, gestion des preuves et correspondance MITRE ATT&CK, le tout vérifié automatiquement en CI",
      "sections": [
        {
          "type": "text",
          "title": "Contexte",
          "body": "J'ai reconstruit ce projet de zéro en fusionnant mes deux anciens dépôts (l'un en anglais, l'autre en français) en une seule référence bilingue. L'objectif est concret : quand un incident commence, un analyste SOC ou un administrateur IT de PME ou d'ETI doit savoir qui fait quoi, dans quel ordre, quelles preuves conserver et quels délais s'appliquent — sans avoir à interpréter un référentiel. Les procédures suivent le NIST SP 800-61 Rev. 3 (avril 2025, aligné sur le CSF 2.0) et rattachent chaque comportement d'attaquant à MITRE ATT&CK."
        },
        {
          "type": "bullets",
          "title": "Ce que contient le dépôt",
          "items": [
            "7 playbooks : logiciel malveillant, rançongiciel, fuite de données, hameçonnage, accès non autorisé, déni de service, compte compromis et fraude au virement",
            "Les mêmes 8 phases numérotées dans chacun : détection, triage, confinement, preuves, éradication, restauration, obligations et communication, clôture — avec des actions à cocher",
            "6 documents de référence : niveaux de gravité S1–S4 et délais, escalade, matrice RACI, cadre réglementaire, préservation des preuves et exercice sur table de rançongiciel",
            "4 modèles : rapport d'incident, post-mortem sans recherche de coupable, communication de crise (salariés, clients, article 34 du RGPD, presse) et registre de preuves avec chaîne de custody",
            "Tout en français et en anglais, avec les mêmes métadonnées dans les deux langues"
          ]
        },
        {
          "type": "bullets",
          "title": "Choix juridiques et preuves",
          "items": [
            "RGPD, articles 33 et 34 : notification à la CNIL sous 72 heures et information des personnes concernées en cas de risque élevé",
            "NIS 2, article 23 : alerte précoce sous 24 heures, notification sous 72 heures, rapport final sous un mois — transposition française signalée comme en cours",
            "Code des assurances, article L. 12-10-1 : plainte sous 72 heures pour être indemnisé d'une cyberattaque",
            "Preuves collectées par ordre de volatilité (RFC 3227), empreintes SHA-256 et chaîne de custody ; machines isolées, jamais éteintes",
            "Contacts publics vérifiés sur les sources officielles : 17Cyber, Cybermalveillance.gouv.fr, CERT-FR, CNIL, Signal Spam et 33700"
          ]
        },
        {
          "type": "bullets",
          "title": "Vérifications automatiques",
          "items": [
            "Chaque document commence par une fiche structurée (sous-ensemble strict de YAML), affichée sous forme de tableau sur GitHub",
            "playbook-check vérifie les champs obligatoires, la parité FR/EN des gravités et des techniques, la structure en 8 phases avec actions à cocher et chaque lien interne",
            "Chaque technique MITRE ATT&CK est contrôlée sur les données officielles 20.1 embarquées dans l'outil : les techniques inconnues ou révoquées sont refusées avec leur remplaçante, et chacune doit être expliquée dans le texte",
            "playbook-export transforme la documentation en JSON — actions à cocher, grille de gravité et délais légaux lus dans les tableaux Markdown — et refuse tout export tant qu'il reste un seul problème"
          ]
        },
        {
          "type": "bullets",
          "title": "Interface web",
          "items": [
            "Qualification de la gravité sur les cinq critères de la grille : le plus grave l'emporte, un playbook peut relever le niveau mais jamais l'abaisser",
            "Choix du playbook grâce au paragraphe « Quand l'utiliser » de chacun",
            "Comptes à rebours des délais légaux depuis la prise de connaissance : RGPD 72 h, NIS 2 24 h et 72 h, plainte 72 h",
            "Actions des 8 phases cochées et horodatées, rapport Markdown en UTC prêt pour le rapport d'incident",
            "Politique de sécurité du contenu stricte, ni mesure d'audience ni cookie, rien de conservé par défaut ; publiée sur GitHub Pages à partir du même commit que les playbooks"
          ]
        },
        {
          "type": "metrics",
          "title": "Qualité logicielle",
          "items": [
            {
              "label": "Actions à cocher",
              "value": "219",
              "note": "par langue, sur 7 playbooks"
            },
            {
              "label": "Tests automatisés",
              "value": "142",
              "note": "108 Python (validateur, export) + 34 web"
            },
            {
              "label": "Jobs de CI",
              "value": "7",
              "note": "Windows + Linux, Python 3.11/3.14, Ruff, documentation, interface web"
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
              "label": "Qualifier",
              "description": "La grille de gravité (S1 à S4) et le tableau de décision orientent vers le bon playbook et les bonnes personnes à prévenir."
            },
            {
              "label": "Répondre",
              "description": "L'équipe suit les 8 phases et coche chaque action, en préservant les preuves avant tout nettoyage."
            },
            {
              "label": "Déclarer",
              "description": "Les délais légaux courent dès la prise de connaissance ; les modèles couvrent le rapport, la communication et le registre de preuves."
            },
            {
              "label": "Améliorer",
              "description": "Un post-mortem sans recherche de coupable et un exercice sur table annuel alimentent la version suivante des playbooks."
            }
          ]
        },
        {
          "type": "resources",
          "title": "Liens",
          "items": [
            {
              "label": "Interface en ligne",
              "href": "https://aiyeesha.github.io/incident-response-playbook/?lang=fr"
            },
            {
              "label": "Code source",
              "href": "https://github.com/Aiyeesha/incident-response-playbook"
            },
            {
              "label": "Playbook rançongiciel (français)",
              "href": "https://github.com/Aiyeesha/incident-response-playbook/blob/main/fr/playbooks/P02-rancongiciel.md"
            },
            {
              "label": "Version v1.1.0 et exports JSON",
              "href": "https://github.com/Aiyeesha/incident-response-playbook/releases/tag/v1.1.0"
            }
          ]
        }
      ]
    },
    "es": {
      "title": "Incident Response Playbook — procedimientos SOC bilingües",
      "heroSubtitle": "Siete playbooks de respuesta a incidentes que un equipo puede seguir bajo presión, en francés e inglés — con plazos legales, gestión de evidencias y correspondencia con MITRE ATT&CK, todo verificado automáticamente en la CI",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "body": "Reconstruí este proyecto desde cero fusionando mis dos repositorios anteriores (uno en inglés y otro en francés) en una única referencia bilingüe. El objetivo es práctico: cuando empieza un incidente, un analista SOC o un administrador IT de una pyme o empresa mediana debe saber quién hace qué, en qué orden, qué evidencias conservar y qué plazos se aplican, sin tener que interpretar un marco de referencia. Los procedimientos siguen el NIST SP 800-61 Rev. 3 (abril de 2025, alineado con el CSF 2.0) y vinculan cada comportamiento del atacante con MITRE ATT&CK."
        },
        {
          "type": "bullets",
          "title": "Qué contiene el repositorio",
          "items": [
            "7 playbooks: malware, ransomware, fuga de datos, phishing, acceso no autorizado, denegación de servicio y cuenta comprometida con fraude en transferencias",
            "Las mismas 8 fases numeradas en cada uno: detección, triaje, contención, evidencias, erradicación, recuperación, obligaciones y comunicación, cierre — con acciones verificables",
            "6 documentos de referencia: niveles de gravedad S1–S4 y plazos, escalado, matriz RACI, marco normativo, preservación de evidencias y un ejercicio de mesa sobre ransomware",
            "4 plantillas: informe de incidente, post-mortem sin culpables, comunicación de crisis (empleados, clientes, artículo 34 del RGPD, prensa) y registro de evidencias con cadena de custodia",
            "Todo en francés e inglés, con los mismos metadatos en ambos idiomas"
          ]
        },
        {
          "type": "bullets",
          "title": "Decisiones legales y de evidencias",
          "items": [
            "RGPD, artículos 33 y 34: notificación a la autoridad de control (la CNIL en Francia) en 72 horas e información a las personas afectadas si el riesgo es alto",
            "NIS 2, artículo 23: alerta temprana en 24 horas, notificación en 72 horas, informe final en un mes — la transposición francesa señalada como en curso",
            "Código de Seguros francés, artículo L. 12-10-1: denuncia en 72 horas para ser indemnizado por un ciberataque",
            "Evidencias recogidas por orden de volatilidad (RFC 3227), huellas SHA-256 y cadena de custodia; equipos aislados, nunca apagados",
            "Contactos públicos franceses verificados en fuentes oficiales: 17Cyber, Cybermalveillance.gouv.fr, CERT-FR, CNIL, Signal Spam y 33700"
          ]
        },
        {
          "type": "bullets",
          "title": "Verificaciones automáticas",
          "items": [
            "Cada documento empieza con una ficha estructurada (subconjunto estricto de YAML) que GitHub muestra como tabla",
            "playbook-check verifica los campos obligatorios, la paridad FR/EN de gravedades y técnicas, la estructura en 8 fases con acciones verificables y cada enlace interno",
            "Cada técnica MITRE ATT&CK se contrasta con los datos oficiales 20.1 incluidos en la herramienta: las técnicas desconocidas o revocadas se rechazan indicando su sustituta, y cada una debe explicarse en el texto",
            "playbook-export convierte la documentación en JSON — acciones, escala de gravedad y plazos legales leídos en las tablas Markdown — y se niega a exportar mientras quede un solo problema"
          ]
        },
        {
          "type": "bullets",
          "title": "Interfaz web",
          "items": [
            "Calificación de la gravedad con los cinco criterios de la escala: el más grave prevalece, un playbook puede elevar el nivel pero nunca bajarlo",
            "Elección del playbook gracias al párrafo «Cuándo usarlo» de cada uno",
            "Cuentas atrás de los plazos legales desde que se tiene conocimiento: RGPD 72 h, NIS 2 24 h y 72 h, denuncia 72 h",
            "Acciones de las 8 fases marcadas con hora e informe Markdown en UTC, listo para el informe del incidente",
            "Política de seguridad de contenido estricta, sin analítica ni cookies, nada guardado por defecto; publicada en GitHub Pages desde el mismo commit que los playbooks"
          ]
        },
        {
          "type": "metrics",
          "title": "Calidad de ingeniería",
          "items": [
            {
              "label": "Acciones verificables",
              "value": "219",
              "note": "por idioma, en 7 playbooks"
            },
            {
              "label": "Pruebas automatizadas",
              "value": "142",
              "note": "108 Python (validador, exportación) + 34 web"
            },
            {
              "label": "Jobs de CI",
              "value": "7",
              "note": "Windows + Linux, Python 3.11/3.14, Ruff, documentación, interfaz web"
            },
            {
              "label": "Dependencias de ejecución",
              "value": "0"
            }
          ]
        },
        {
          "type": "timeline",
          "title": "Cómo se usa",
          "steps": [
            {
              "label": "Calificar",
              "description": "La escala de gravedad (S1 a S4) y la tabla de decisión llevan al playbook adecuado y a las personas que hay que avisar."
            },
            {
              "label": "Responder",
              "description": "El equipo sigue las 8 fases y marca cada acción, preservando las evidencias antes de cualquier limpieza."
            },
            {
              "label": "Notificar",
              "description": "Los plazos legales cuentan desde que se tiene conocimiento; las plantillas cubren el informe, la comunicación y el registro de evidencias."
            },
            {
              "label": "Mejorar",
              "description": "Un post-mortem sin culpables y un ejercicio de mesa anual alimentan la siguiente versión de los playbooks."
            }
          ]
        },
        {
          "type": "resources",
          "title": "Enlaces",
          "items": [
            {
              "label": "Interfaz en línea",
              "href": "https://aiyeesha.github.io/incident-response-playbook/"
            },
            {
              "label": "Código fuente",
              "href": "https://github.com/Aiyeesha/incident-response-playbook"
            },
            {
              "label": "Playbook de ransomware (inglés)",
              "href": "https://github.com/Aiyeesha/incident-response-playbook/blob/main/en/playbooks/P02-ransomware.md"
            },
            {
              "label": "Versión v1.1.0 y exportaciones JSON",
              "href": "https://github.com/Aiyeesha/incident-response-playbook/releases/tag/v1.1.0"
            }
          ]
        }
      ]
    }
  }
};

export default details;
