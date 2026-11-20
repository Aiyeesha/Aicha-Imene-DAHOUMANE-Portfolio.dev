// content/project-details/it-ops-incident-management.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "it-ops-incident-management",
  "gallery": [
    {
      "alt": "Incident Management — vue principale",
      "src": "/projects/it-ops-incident-management/2023-05-16%2016_44_15-.webp"
    },
    {
      "alt": "Screenshot 1",
      "src": "/projects/it-ops-incident-management/screenshot-1.webp"
    },
    {
      "alt": "Screenshot 2",
      "src": "/projects/it-ops-incident-management/screenshot-2.webp"
    },
    {
      "alt": "Screenshot 4",
      "src": "/projects/it-ops-incident-management/screenshot-4.webp"
    },
    {
      "alt": "Screenshot 5",
      "src": "/projects/it-ops-incident-management/screenshot-5.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "IT Incident Management — Autotask, Webroot & Datto RMM",
      "heroSubtitle": "Live incident triage at MIDRANGE Group: Autotask ticketing, Datto RMM remote access, and Webroot false-positive resolution.",
      "sections": [
        {
          "type": "text",
          "title": "Context",
          "paragraphs": [
            "At MIDRANGE Group, within the Support Technique team alongside the team's systems & network administrator, I handled support requests for managed clients, received across three intake channels: direct phone calls to the support line, email to the support address, and automatic alerts raised by the Datto RMM agent installed on client endpoints.",
            "Once a ticket is opened in Autotask, it is routed either to the Support Technique team (user-facing incidents) or to the Exploitation team (infrastructure and monitoring). Here's how I handled a live client ticket from intake to resolution."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Tickets arrive through three different channels (phone, email, Datto RMM alerts) with three different levels of detail, so the first job on every ticket is filling the gaps before any real diagnosis starts.",
            "A support ticket has to be routed correctly on first read — user-facing issues go to Support Technique, infrastructure issues go to Exploitation — and a misrouted ticket costs time on both sides.",
            "Reproducing the exact symptom remotely, before touching any configuration, is the only way to avoid changing the wrong setting on a live client machine.",
            "A security tool flagging a legitimate site as malicious (Webroot false positive) looks identical to a genuine block from the user's side — telling the two apart requires checking the domain's actual reputation, not just trusting the alert.",
            "Every fix has to be documented in Autotask well enough to double as both a billing record and a future troubleshooting reference — writing a vague ticket note creates work for the next technician."
          ],
          "title": "Technical challenges"
        },
        {
          "type": "bullets",
          "items": [
            "Phone: client calls the support line directly. The technician creates a ticket in Autotask manually and begins triage immediately.",
            "Email: client sends a message to the support address. Autotask ingests it automatically and creates a ticket, which is then assigned to the correct queue.",
            "Datto RMM agent: the agent installed on managed endpoints monitors the device in real time and can raise alerts automatically (CPU spike, disk full, security event). These generate tickets in Autotask without any client action."
          ],
          "title": "How tickets reach the support team"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "title": "Step 1 — Ticket received in Autotask",
              "description": "A client reported being unable to access a specific website. Webroot was displaying a 'site blocked' warning on their machine. The ticket was assigned to me, with Théo on hand for support."
            },
            {
              "title": "Step 2 — Remote access via Datto RMM",
              "description": "We contacted the client and requested permission to take remote control of their workstation via Datto RMM. This allowed us to reproduce the issue in real time, see the exact Webroot warning message, and confirm which URL was being blocked."
            },
            {
              "title": "Step 3 — Diagnosis: Webroot false positive",
              "description": "After inspecting the blocked URL, we determined it was a legitimate business site incorrectly flagged by Webroot's threat intelligence. The site was not malicious — Webroot had classified it as suspicious based on its domain reputation score."
            },
            {
              "title": "Step 4 — URL suppression in Webroot Management Console",
              "description": "We connected to the Webroot Management Console (CE 23.2) and navigated to the URL suppression list under the client's policy. We added the blocked domain to the suppression (whitelist) list. The change propagated to the client's endpoint within minutes, and the site became accessible without any further intervention on the machine."
            },
            {
              "title": "Step 5 — Resolution logged in Autotask",
              "description": "A time entry was created in Autotask with a summary of the issue, the root cause (false positive), and the resolution steps taken. The ticket was closed as 'Complete'. The time worked was recorded for client billing and used as part of the audit trail."
            }
          ],
          "title": "Incident resolution — step by step"
        },
        {
          "body": "Incident resolved in a single session, entirely remote, with no onsite trip and no software reinstall on the client's machine.",
          "type": "text",
          "title": "Impact"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Phone · Email · Datto RMM agent",
              "label": "Ticket intake channels",
              "value": "3"
            },
            {
              "note": "Full remote resolution via Datto RMM",
              "label": "On-site intervention",
              "value": "None"
            },
            {
              "note": "URL suppression from console — endpoint untouched",
              "label": "Webroot reinstall required",
              "value": "No"
            },
            {
              "note": "Autotask time entry with root cause and steps",
              "label": "Resolution documented",
              "value": "Yes"
            }
          ],
          "title": "Key figures"
        },
        {
          "type": "bullets",
          "items": [
            "Webroot false positives on legitimate business sites are a recurring support scenario: the first reflex should always be to check the URL suppression list before escalating or reconfiguring the endpoint.",
            "Datto RMM remote access eliminates the need for on-site visits for most user-facing incidents, reducing resolution time significantly.",
            "Autotask time entries are not optional: they serve as both a billing record for the client and a searchable knowledge base for recurring issues.",
            "Routing matters: distinguishing between a Support Technique ticket (user-facing) and an Exploitation ticket (infrastructure) from the first description saves time and avoids wrong-team assignments.",
            "Always reproduce the issue remotely before touching any configuration — confirming the exact symptom prevents premature or incorrect changes."
          ],
          "title": "Best Practices"
        },
        {
          "type": "bullets",
          "items": [
            "This case covers a single, representative ticket end to end rather than the full volume of tickets I handled — the workflow described (intake → remote access → diagnosis → fix → documentation) is the one applied to every ticket, at different depths depending on complexity.",
            "URL suppression in the Webroot console fixes the immediate symptom for the reported domain; it does not retrain Webroot's underlying reputation scoring, so a similar false positive can recur on a different URL — that's a vendor-side limitation, not something fixable from the console.",
            "Remote resolution via Datto RMM assumes the client machine is reachable and the user available to grant access; a ticket where either condition fails would need an on-site visit, which falls outside the Support Technique workflow described here.",
            "Routing between Support Technique and Exploitation was based on the description at intake, which is a judgment call — a ticket that looks user-facing at first (like this one) can still turn out to have an infrastructure root cause, and vice versa."
          ],
          "title": "Known Limitations & Decisions"
        },
        {
          "type": "resources",
          "items": [
            {
              "href": "https://www.autotask.net",
              "label": "Autotask — PSA / Ticketing platform"
            },
            {
              "href": "https://www.webroot.com/us/en/business/smb/endpoint-protection",
              "label": "Webroot Business Endpoint Protection"
            },
            {
              "href": "https://www.datto.com/products/rmm",
              "label": "Datto RMM — Remote Monitoring & Management"
            }
          ],
          "title": "Tools used"
        }
      ]
    },
    "fr": {
      "title": "Gestion d'incidents IT — Autotask, Webroot & Datto RMM",
      "heroSubtitle": "Triage d'incidents en production chez MIDRANGE Group : ticketing Autotask, accès distant Datto RMM et résolution d'un faux positif Webroot.",
      "sections": [
        {
          "type": "text",
          "title": "Contexte",
          "paragraphs": [
            "Chez MIDRANGE Group, au sein de l'équipe Support Technique aux côtés de l'administrateur systèmes & réseaux de l'équipe, je traitais les demandes de support des clients gérés, réceptionnées via trois canaux : appels téléphoniques directs vers la ligne support, e-mails à l'adresse support, et alertes automatiques levées par l'agent Datto RMM installé sur les postes clients.",
            "Une fois un ticket ouvert dans Autotask, il est routé soit vers l'équipe Support Technique (incidents utilisateurs), soit vers l'équipe Exploitation (infrastructure et supervision). Voici le traitement d'un ticket client en production, de la prise en charge à la résolution."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Les tickets arrivent par trois canaux différents (téléphone, e-mail, alertes Datto RMM) avec trois niveaux de détail différents ; le premier travail sur chaque ticket est donc de combler les manques avant tout diagnostic réel.",
            "Un ticket doit être routé correctement dès la première lecture — les incidents utilisateurs vers le Support Technique, les incidents infrastructure vers l'Exploitation — et un mauvais routage coûte du temps des deux côtés.",
            "Reproduire le symptôme exact à distance, avant de toucher à une configuration, est le seul moyen d'éviter de modifier le mauvais réglage sur un poste client en production.",
            "Un outil de sécurité qui signale un site légitime comme malveillant (faux positif Webroot) ressemble en tout point à un blocage réel côté utilisateur — les distinguer nécessite de vérifier la réputation réelle du domaine, pas seulement de faire confiance à l'alerte.",
            "Chaque correction doit être documentée dans Autotask de façon suffisamment claire pour servir à la fois de pièce de facturation et de référence de dépannage future — une note de ticket vague crée du travail pour le prochain technicien."
          ],
          "title": "Défis techniques"
        },
        {
          "type": "bullets",
          "items": [
            "Téléphone : le client appelle directement la ligne support. Le technicien crée le ticket manuellement dans Autotask et commence le triage immédiatement.",
            "E-mail : le client envoie un message à l'adresse support. Autotask l'ingère automatiquement et crée le ticket, qui est ensuite assigné à la file appropriée.",
            "Agent Datto RMM : l'agent installé sur les postes gérés supervise l'appareil en temps réel et peut lever des alertes automatiquement (pic CPU, disque plein, événement de sécurité). Ces alertes génèrent des tickets dans Autotask sans aucune action du client."
          ],
          "title": "Les trois canaux d'ouverture de tickets"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "title": "Étape 1 — Ticket reçu dans Autotask",
              "description": "Un client signalait ne pas pouvoir accéder à un site internet spécifique. Webroot affichait un message « site bloqué » sur son poste. Le ticket m'a été assigné, avec Théo en soutien pour la résolution."
            },
            {
              "title": "Étape 2 — Prise en main à distance via Datto RMM",
              "description": "Nous avons contacté le client et demandé son autorisation pour prendre le contrôle à distance de son poste via Datto RMM. Cela nous a permis de reproduire le problème en temps réel, de voir exactement le message d'avertissement Webroot, et de confirmer quelle URL était bloquée."
            },
            {
              "title": "Étape 3 — Diagnostic : faux positif Webroot",
              "description": "Après examen de l'URL bloquée, nous avons déterminé qu'il s'agissait d'un site professionnel légitime, incorrectement signalé par l'intelligence de menaces de Webroot. Le site n'était pas malveillant — Webroot l'avait classé comme suspect sur la base de son score de réputation de domaine."
            },
            {
              "title": "Étape 4 — Exclusion d'URL dans la console de gestion Webroot",
              "description": "Nous nous sommes connectés à la console de gestion Webroot (CE 23.2) et avons navigué vers la liste de suppression d'URL dans la politique du client. Nous avons ajouté le domaine bloqué à la liste de suppression (liste blanche). Le changement s'est propagé sur le poste du client en quelques minutes, et le site est devenu accessible sans aucune intervention supplémentaire sur la machine."
            },
            {
              "title": "Étape 5 — Résolution consignée dans Autotask",
              "description": "Une saisie de temps a été créée dans Autotask avec un résumé du problème, la cause racine (faux positif) et les étapes de résolution effectuées. Le ticket a été clôturé comme « Terminé ». Le temps de travail a été enregistré pour la facturation client et intégré à la traçabilité des interventions."
            }
          ],
          "title": "Résolution de l'incident — étape par étape"
        },
        {
          "body": "Incident résolu en une seule session, entièrement à distance, sans déplacement ni réinstallation logicielle sur le poste du client.",
          "type": "text",
          "title": "Impact"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Téléphone · E-mail · Agent Datto RMM",
              "label": "Canaux d'entrée de tickets",
              "value": "3"
            },
            {
              "note": "Résolution 100% à distance via Datto RMM",
              "label": "Intervention sur site",
              "value": "Aucune"
            },
            {
              "note": "Exclusion d'URL depuis la console — poste non modifié",
              "label": "Réinstallation Webroot",
              "value": "Non"
            },
            {
              "note": "Saisie Autotask avec cause racine et étapes",
              "label": "Résolution documentée",
              "value": "Oui"
            }
          ],
          "title": "Chiffres clés"
        },
        {
          "type": "bullets",
          "items": [
            "Les faux positifs Webroot sur des sites professionnels légitimes sont un scénario de support récurrent : le premier réflexe doit toujours être de vérifier la liste de suppression d'URL avant d'escalader ou de reconfigurer le poste.",
            "L'accès distant Datto RMM élimine le besoin de déplacements sur site pour la majorité des incidents utilisateurs, réduisant significativement le temps de résolution.",
            "Les saisies de temps Autotask ne sont pas optionnelles : elles servent à la fois de pièce de facturation pour le client et de base de connaissances consultable pour les incidents récurrents.",
            "Le routage des tickets est essentiel : distinguer dès le premier signalement un ticket Support Technique (utilisateur) d'un ticket Exploitation (infrastructure) évite les mauvaises attributions et les pertes de temps.",
            "Toujours reproduire le problème à distance avant de modifier une configuration — confirmer le symptôme exact prévient les changements prématurés ou incorrects."
          ],
          "title": "Bonnes pratiques"
        },
        {
          "type": "bullets",
          "items": [
            "Ce cas couvre un ticket représentatif de bout en bout plutôt que le volume complet des tickets traités — le déroulé décrit (prise en charge → accès distant → diagnostic → correction → documentation) est celui appliqué à chaque ticket, à des degrés de profondeur variables selon la complexité.",
            "L'exclusion d'URL dans la console Webroot corrige le symptôme immédiat pour le domaine signalé ; elle ne réentraîne pas le score de réputation sous-jacent de Webroot, donc un faux positif similaire peut réapparaître sur une autre URL — c'est une limite côté éditeur, pas quelque chose de corrigeable depuis la console.",
            "La résolution à distance via Datto RMM suppose que le poste client est joignable et que l'utilisateur est disponible pour autoriser l'accès ; un ticket où l'une de ces conditions ne serait pas remplie nécessiterait un déplacement sur site, ce qui sort du périmètre du workflow Support Technique décrit ici.",
            "Le routage entre Support Technique et Exploitation reposait sur la description à la prise en charge, ce qui reste une appréciation ; un ticket qui paraît utilisateur au premier abord (comme celui-ci) peut malgré tout avoir une cause racine infrastructure, et inversement."
          ],
          "title": "Limites connues & décisions"
        },
        {
          "type": "resources",
          "items": [
            {
              "href": "https://www.autotask.net",
              "label": "Autotask — PSA / Plateforme de ticketing"
            },
            {
              "href": "https://www.webroot.com/fr/fr/business/smb/endpoint-protection",
              "label": "Webroot Business Endpoint Protection"
            },
            {
              "href": "https://www.datto.com/fr/products/rmm",
              "label": "Datto RMM — Supervision et gestion à distance"
            }
          ],
          "title": "Outils utilisés"
        }
      ]
    },
    "es": {
      "title": "Gestión de incidencias IT — Autotask, Webroot y Datto RMM",
      "heroSubtitle": "Triaje de incidencias en producción en MIDRANGE Group: ticketing Autotask, acceso remoto Datto RMM y resolución de un falso positivo de Webroot.",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "paragraphs": [
            "En MIDRANGE Group, dentro del equipo de Soporte Técnico junto al administrador de sistemas y redes del equipo, atendía las solicitudes de soporte de los clientes gestionados, recibidas a través de tres canales: llamadas telefónicas directas a la línea de soporte, correos electrónicos a la dirección de soporte y alertas automáticas generadas por el agente Datto RMM instalado en los equipos de los clientes.",
            "Una vez abierto un ticket en Autotask, se enruta al equipo de Soporte Técnico (incidencias de usuario) o al equipo de Explotación (infraestructura y supervisión). A continuación, el tratamiento de un ticket real de cliente, de la recepción a la resolución."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Los tickets llegan por tres canales distintos (teléfono, correo electrónico, alertas de Datto RMM) con tres niveles de detalle diferentes, así que la primera tarea en cada ticket es completar la información antes de empezar el diagnóstico real.",
            "Un ticket debe enrutarse correctamente desde la primera lectura — las incidencias de usuario van a Soporte Técnico, las de infraestructura a Explotación — y un enrutamiento incorrecto cuesta tiempo a ambos lados.",
            "Reproducir el síntoma exacto en remoto, antes de tocar cualquier configuración, es la única forma de evitar cambiar el ajuste equivocado en un equipo de cliente en producción.",
            "Una herramienta de seguridad que marca un sitio legítimo como malicioso (falso positivo de Webroot) resulta indistinguible de un bloqueo real desde el punto de vista del usuario — diferenciarlos exige comprobar la reputación real del dominio, no solo confiar en la alerta.",
            "Cada corrección debe documentarse en Autotask con claridad suficiente para servir tanto de justificante de facturación como de referencia de resolución futura — una nota de ticket vaga genera trabajo para el siguiente técnico."
          ],
          "title": "Retos técnicos"
        },
        {
          "type": "bullets",
          "items": [
            "Teléfono: el cliente llama directamente a la línea de soporte. El técnico crea el ticket manualmente en Autotask y comienza el triaje de inmediato.",
            "Correo electrónico: el cliente envía un mensaje a la dirección de soporte. Autotask lo procesa automáticamente y crea el ticket, que luego se asigna a la cola correspondiente.",
            "Agente Datto RMM: el agente instalado en los equipos gestionados supervisa el dispositivo en tiempo real y puede generar alertas automáticamente (pico de CPU, disco lleno, evento de seguridad). Estas generan tickets en Autotask sin ninguna acción del cliente."
          ],
          "title": "Cómo llegan los tickets al equipo de soporte"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "title": "Paso 1 — Ticket recibido en Autotask",
              "description": "Un cliente informó que no podía acceder a un sitio web específico. Webroot mostraba una advertencia de sitio bloqueado en su equipo. El ticket me fue asignado, con Théo como apoyo."
            },
            {
              "title": "Paso 2 — Acceso remoto vía Datto RMM",
              "description": "Contactamos al cliente y solicitamos permiso para tomar el control remoto de su equipo vía Datto RMM. Esto nos permitió reproducir el problema en tiempo real, ver el mensaje exacto de advertencia de Webroot y confirmar qué URL estaba siendo bloqueada."
            },
            {
              "title": "Paso 3 — Diagnóstico: falso positivo de Webroot",
              "description": "Tras inspeccionar la URL bloqueada, determinamos que se trataba de un sitio profesional legítimo, incorrectamente marcado por la inteligencia de amenazas de Webroot. El sitio no era malicioso — Webroot lo había clasificado como sospechoso según su puntuación de reputación de dominio."
            },
            {
              "title": "Paso 4 — Exclusión de URL en la consola de gestión de Webroot",
              "description": "Nos conectamos a la consola de gestión de Webroot (CE 23.2) y navegamos hasta la lista de exclusión de URL dentro de la política del cliente. Añadimos el dominio bloqueado a la lista de exclusión (lista blanca). El cambio se propagó al equipo del cliente en pocos minutos, y el sitio quedó accesible sin ninguna intervención adicional en la máquina."
            },
            {
              "title": "Paso 5 — Resolución registrada en Autotask",
              "description": "Se creó una entrada de tiempo en Autotask con un resumen del problema, la causa raíz (falso positivo) y los pasos de resolución realizados. El ticket se cerró como Completado. El tiempo trabajado se registró para la facturación del cliente y como parte de la trazabilidad de auditoría."
            }
          ],
          "title": "Resolución del incidente — paso a paso"
        },
        {
          "body": "Incidencia resuelta en una única sesión, totalmente en remoto, sin desplazamiento ni reinstalación de software en el equipo del cliente.",
          "type": "text",
          "title": "Impacto"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Teléfono · Correo electrónico · Agente Datto RMM",
              "label": "Canales de entrada de tickets",
              "value": "3"
            },
            {
              "note": "Resolución 100% remota vía Datto RMM",
              "label": "Intervención en sitio",
              "value": "Ninguna"
            },
            {
              "note": "Exclusión de URL desde la consola — equipo sin modificar",
              "label": "Reinstalación de Webroot requerida",
              "value": "No"
            },
            {
              "note": "Entrada de tiempo en Autotask con causa raíz y pasos",
              "label": "Resolución documentada",
              "value": "Sí"
            }
          ],
          "title": "Cifras clave"
        },
        {
          "type": "bullets",
          "items": [
            "Los falsos positivos de Webroot en sitios profesionales legítimos son un escenario de soporte recurrente: el primer reflejo debe ser siempre revisar la lista de exclusión de URL antes de escalar o reconfigurar el equipo.",
            "El acceso remoto vía Datto RMM elimina la necesidad de desplazamientos in situ para la mayoría de incidencias de usuario, reduciendo significativamente el tiempo de resolución.",
            "Las entradas de tiempo en Autotask no son opcionales: sirven tanto de justificante de facturación para el cliente como de base de conocimiento consultable para incidencias recurrentes.",
            "El enrutamiento importa: distinguir desde la primera descripción un ticket de Soporte Técnico (usuario) de un ticket de Explotación (infraestructura) ahorra tiempo y evita asignaciones incorrectas.",
            "Reproducir siempre el problema de forma remota antes de tocar cualquier configuración — confirmar el síntoma exacto evita cambios prematuros o incorrectos."
          ],
          "title": "Buenas prácticas"
        },
        {
          "type": "bullets",
          "items": [
            "Este caso cubre un ticket representativo de principio a fin, no el volumen completo de tickets que atendía — el flujo descrito (recepción → acceso remoto → diagnóstico → corrección → documentación) es el que se aplicaba a cada ticket, con distinta profundidad según la complejidad.",
            "La exclusión de URL en la consola de Webroot corrige el síntoma inmediato para el dominio señalado; no reentrena la puntuación de reputación subyacente de Webroot, por lo que un falso positivo similar puede repetirse en otra URL — es una limitación del propio fabricante, no algo corregible desde la consola.",
            "La resolución remota vía Datto RMM asume que el equipo del cliente es alcanzable y que el usuario está disponible para autorizar el acceso; un ticket en el que alguna de estas condiciones no se cumpla requeriría una visita in situ, fuera del alcance del flujo de Soporte Técnico descrito aquí.",
            "El enrutamiento entre Soporte Técnico y Explotación se basaba en la descripción inicial, lo cual sigue siendo una valoración; un ticket que a primera vista parece de usuario (como este) puede tener igualmente una causa raíz de infraestructura, y viceversa."
          ],
          "title": "Límites conocidos y decisiones"
        },
        {
          "type": "resources",
          "items": [
            {
              "href": "https://www.autotask.net",
              "label": "Autotask — Plataforma PSA / Ticketing"
            },
            {
              "href": "https://www.webroot.com/us/en/business/smb/endpoint-protection",
              "label": "Webroot Business Endpoint Protection"
            },
            {
              "href": "https://www.datto.com/products/rmm",
              "label": "Datto RMM — Supervisión y gestión remota"
            }
          ],
          "title": "Herramientas utilizadas"
        }
      ]
    }
  }
};

export default details;
