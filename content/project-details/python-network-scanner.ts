// content/project-details/python-network-scanner.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "python-network-scanner",
  "gallery": [
    {
      "alt": "Command-line scan with risk levels and recommendations",
      "src": "/projects/python-network-scanner/cover.svg"
    },
    {
      "alt": "Local web interface — light theme (French)",
      "src": "/projects/python-network-scanner/web-light-fr.png"
    },
    {
      "alt": "Local web interface — dark theme (English)",
      "src": "/projects/python-network-scanner/web-dark-en.png"
    }
  ],
  "locales": {
    "en": {
      "title": "Port Scanner — async TCP scanner & detection lab",
      "heroSubtitle": "Zero-dependency asyncio port scanner, secure by default, that explains the risk of every open service — and the Blue Team side: how to detect that very scan with Wireshark, Suricata and Sigma",
      "sections": [
        {
          "type": "text",
          "title": "Context",
          "body": "I rebuilt this project from scratch with a defender's mindset. A port scanner is usually shown from the attacker's side; I wanted the opposite: a tool that is safe to run on a home or company network, tells you why an open port matters and what to do about it, and then teaches how a SOC detects the scan it just performed (MITRE ATT&CK T1046 — Network Service Discovery)."
        },
        {
          "type": "bullets",
          "title": "What I built",
          "items": [
            "An asynchronous TCP connect scanner (asyncio, standard library only): open / closed / filtered states, latency, bounded concurrency and memory",
            "Target and port parsing (IP, CIDR, hostnames; 22, 20-25, top100, all) with strict validation",
            "About 50 service profiles: risk level from info to critical and a defensive recommendation for each open port",
            "Optional passive banner grabbing, with every non-printable character escaped",
            "Text, JSON and CSV outputs, stable exit codes and --fail-on high for CI pipelines",
            "A bilingual local web UI (port-scanner-web) driving the same engine"
          ]
        },
        {
          "type": "bullets",
          "title": "Security choices",
          "items": [
            "Secure by default: only private networks (RFC 1918, IPv6 ULA) and loopback; IPv4-mapped IPv6, every DNS answer and ambiguous shorthand IPs (127.1, 0x7f.1) are checked",
            "Hard caps checked before any packet is sent: 1,024 addresses, 262,144 probes, 500 concurrent connections, 30 s timeout",
            "Banners treated as hostile input: terminal escape sequences and invisible bidirectional characters (Trojan Source) neutralised",
            "CSV formula injection prevented (OWASP); reports never overwrite an existing file without --force",
            "Local web server protected like an exposed service: loopback only, random 256-bit token in the URL fragment, Host check against DNS rebinding, Origin check against CSRF, strict CSP, textContent-only rendering",
            "Repository hardening: protected main branch, secret scanning with push protection, Dependabot, Ruff with Bandit rules, private vulnerability reporting"
          ]
        },
        {
          "type": "bullets",
          "title": "Detection side (Blue Team)",
          "items": [
            "Lab captures of a real scan, normal traffic and a very busy legitimate client",
            "Step-by-step Wireshark and tshark guide: the filters that reveal a scan",
            "Two Suricata rules (SYN burst, RST burst) and a Sigma value_count correlation (distinct ports per source)",
            "A CI job replays the captures through Suricata and checks the expected alerts — including no alert on normal traffic and a documented false positive"
          ]
        },
        {
          "type": "metrics",
          "title": "Engineering quality",
          "items": [
            {
              "label": "Automated tests",
              "value": "250+",
              "note": "real sockets on loopback, network simulated otherwise"
            },
            {
              "label": "CI jobs",
              "value": "6",
              "note": "Windows + Linux, Python 3.11/3.14, Ruff, Suricata + Sigma"
            },
            {
              "label": "Runtime dependencies",
              "value": "0"
            },
            {
              "label": "Releases",
              "value": "v1.0.0 → v1.1.0"
            }
          ]
        },
        {
          "type": "timeline",
          "title": "How it works",
          "steps": [
            {
              "label": "Validate",
              "description": "Targets and ports are parsed and checked against the private-network guard and the size caps before anything is sent."
            },
            {
              "label": "Scan",
              "description": "A fixed pool of asyncio workers opens and immediately closes one TCP connection per (address, port)."
            },
            {
              "label": "Explain",
              "description": "Each open port gets its probable service, a risk level and a defensive recommendation; banners are read and sanitised on request."
            },
            {
              "label": "Detect",
              "description": "The same scan is captured and caught by Suricata and Sigma rules, verified automatically in CI."
            }
          ]
        },
        {
          "type": "resources",
          "title": "Links",
          "items": [
            {
              "label": "Source code",
              "href": "https://github.com/Aiyeesha/port-scanner"
            },
            {
              "label": "Detection guide",
              "href": "https://github.com/Aiyeesha/port-scanner/tree/main/detection"
            }
          ]
        }
      ]
    },
    "fr": {
      "title": "Port Scanner — scanner TCP asynchrone et labo de détection",
      "heroSubtitle": "Scanner de ports asyncio sans dépendance, sécurisé par défaut, qui explique le risque de chaque service ouvert — et le versant Blue Team : comment détecter ce même scan avec Wireshark, Suricata et Sigma",
      "sections": [
        {
          "type": "text",
          "title": "Contexte",
          "body": "J'ai reconstruit ce projet de zéro avec un regard de défenseuse. Un scanner de ports se présente d'habitude du côté de l'attaquant ; je voulais l'inverse : un outil sans danger sur un réseau domestique ou d'entreprise, qui explique pourquoi un port ouvert compte et ce qu'il faut faire, puis qui montre comment un SOC détecte le scan qu'il vient d'effectuer (MITRE ATT&CK T1046 — Network Service Discovery)."
        },
        {
          "type": "bullets",
          "title": "Ce que j'ai construit",
          "items": [
            "Un scanner TCP « connect » asynchrone (asyncio, bibliothèque standard uniquement) : états ouvert / fermé / filtré, latence, concurrence et mémoire bornées",
            "L'analyse des cibles et des ports (IP, CIDR, noms d'hôte ; 22, 20-25, top100, all) avec une validation stricte",
            "Une cinquantaine de fiches de services : niveau de risque d'« info » à « critique » et recommandation de défense pour chaque port ouvert",
            "Une lecture de bannières optionnelle et passive, avec échappement de tout caractère non imprimable",
            "Des sorties texte, JSON et CSV, des codes de retour stables et --fail-on high pour l'intégration continue",
            "Une interface web locale bilingue (port-scanner-web) qui pilote le même moteur"
          ]
        },
        {
          "type": "bullets",
          "title": "Choix de sécurité",
          "items": [
            "Sécurisé par défaut : réseaux privés (RFC 1918, IPv6 ULA) et boucle locale uniquement ; IPv6 mappées, chaque réponse DNS et IP abrégées ambiguës (127.1, 0x7f.1) contrôlées",
            "Plafonds vérifiés avant tout envoi : 1 024 adresses, 262 144 tentatives, 500 connexions simultanées, délai de 30 s",
            "Bannières traitées comme des données hostiles : séquences d'échappement de terminal et caractères bidirectionnels invisibles (Trojan Source) neutralisés",
            "Injection de formules CSV empêchée (OWASP) ; aucun rapport existant écrasé sans --force",
            "Serveur web local protégé comme un service exposé : boucle locale uniquement, jeton aléatoire de 256 bits dans le fragment d'URL, contrôle Host contre le DNS rebinding, contrôle Origin contre le CSRF, CSP stricte, affichage par textContent uniquement",
            "Dépôt durci : branche main protégée, détection des secrets avec blocage à l'envoi, Dependabot, Ruff avec règles Bandit, signalement privé de vulnérabilités"
          ]
        },
        {
          "type": "bullets",
          "title": "Volet détection (Blue Team)",
          "items": [
            "Captures de laboratoire d'un vrai scan, de trafic normal et d'un client légitime très actif",
            "Guide Wireshark et tshark pas à pas : les filtres qui révèlent un scan",
            "Deux règles Suricata (rafale de SYN, rafale de RST) et une corrélation Sigma value_count (ports distincts par source)",
            "Un job de CI rejoue les captures dans Suricata et vérifie les alertes attendues — y compris l'absence d'alerte sur le trafic normal et un faux positif documenté"
          ]
        },
        {
          "type": "metrics",
          "title": "Qualité logicielle",
          "items": [
            {
              "label": "Tests automatisés",
              "value": "250+",
              "note": "vrais sockets en boucle locale, réseau simulé sinon"
            },
            {
              "label": "Jobs de CI",
              "value": "6",
              "note": "Windows + Linux, Python 3.11/3.14, Ruff, Suricata + Sigma"
            },
            {
              "label": "Dépendances d'exécution",
              "value": "0"
            },
            {
              "label": "Versions",
              "value": "v1.0.0 → v1.1.0"
            }
          ]
        },
        {
          "type": "timeline",
          "title": "Fonctionnement",
          "steps": [
            {
              "label": "Valider",
              "description": "Cibles et ports sont analysés puis confrontés au garde-fou réseaux privés et aux plafonds avant tout envoi."
            },
            {
              "label": "Scanner",
              "description": "Un pool fixe de travailleurs asyncio ouvre puis referme aussitôt une connexion TCP par couple (adresse, port)."
            },
            {
              "label": "Expliquer",
              "description": "Chaque port ouvert reçoit son service probable, un niveau de risque et une recommandation ; les bannières sont lues et nettoyées sur demande."
            },
            {
              "label": "Détecter",
              "description": "Le même scan est capturé puis repéré par les règles Suricata et Sigma, vérifiées automatiquement en CI."
            }
          ]
        },
        {
          "type": "resources",
          "title": "Liens",
          "items": [
            {
              "label": "Code source",
              "href": "https://github.com/Aiyeesha/port-scanner"
            },
            {
              "label": "Guide de détection",
              "href": "https://github.com/Aiyeesha/port-scanner/tree/main/detection"
            }
          ]
        }
      ]
    },
    "es": {
      "title": "Port Scanner — escáner TCP asíncrono y laboratorio de detección",
      "heroSubtitle": "Escáner de puertos asyncio sin dependencias, seguro por defecto, que explica el riesgo de cada servicio abierto — y la parte Blue Team: cómo detectar ese mismo escaneo con Wireshark, Suricata y Sigma",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "body": "Reconstruí este proyecto desde cero con mentalidad defensiva. Un escáner de puertos suele presentarse desde el lado del atacante; yo quería lo contrario: una herramienta segura en una red doméstica o empresarial, que explique por qué importa un puerto abierto y qué hacer al respecto, y que luego enseñe cómo un SOC detecta el escaneo que acaba de realizar (MITRE ATT&CK T1046 — Network Service Discovery)."
        },
        {
          "type": "bullets",
          "title": "Lo que construí",
          "items": [
            "Un escáner TCP «connect» asíncrono (asyncio, solo biblioteca estándar): estados abierto / cerrado / filtrado, latencia, concurrencia y memoria acotadas",
            "El análisis de objetivos y puertos (IP, CIDR, nombres de host; 22, 20-25, top100, all) con validación estricta",
            "Unas cincuenta fichas de servicios: nivel de riesgo de «info» a «crítico» y recomendación defensiva para cada puerto abierto",
            "Lectura de banners opcional y pasiva, con escape de todo carácter no imprimible",
            "Salidas en texto, JSON y CSV, códigos de salida estables y --fail-on high para la integración continua",
            "Una interfaz web local bilingüe (port-scanner-web) que usa el mismo motor"
          ]
        },
        {
          "type": "bullets",
          "title": "Decisiones de seguridad",
          "items": [
            "Seguro por defecto: solo redes privadas (RFC 1918, IPv6 ULA) y loopback; se comprueban las IPv6 mapeadas, cada respuesta DNS y las IP abreviadas ambiguas (127.1, 0x7f.1)",
            "Límites comprobados antes de cualquier envío: 1024 direcciones, 262 144 intentos, 500 conexiones simultáneas, 30 s de espera",
            "Banners tratados como datos hostiles: secuencias de escape de terminal y caracteres bidireccionales invisibles (Trojan Source) neutralizados",
            "Inyección de fórmulas CSV evitada (OWASP); ningún informe existente se sobrescribe sin --force",
            "Servidor web local protegido como un servicio expuesto: solo loopback, token aleatorio de 256 bits en el fragmento de la URL, control de Host contra DNS rebinding, control de Origin contra CSRF, CSP estricta, renderizado solo con textContent",
            "Repositorio reforzado: rama main protegida, detección de secretos con bloqueo en el push, Dependabot, Ruff con reglas Bandit, notificación privada de vulnerabilidades"
          ]
        },
        {
          "type": "bullets",
          "title": "Detección (Blue Team)",
          "items": [
            "Capturas de laboratorio de un escaneo real, de tráfico normal y de un cliente legítimo muy activo",
            "Guía paso a paso de Wireshark y tshark: los filtros que revelan un escaneo",
            "Dos reglas Suricata (ráfaga de SYN, ráfaga de RST) y una correlación Sigma value_count (puertos distintos por origen)",
            "Un job de CI reproduce las capturas en Suricata y verifica las alertas esperadas — incluida la ausencia de alertas en tráfico normal y un falso positivo documentado"
          ]
        },
        {
          "type": "metrics",
          "title": "Calidad de ingeniería",
          "items": [
            {
              "label": "Pruebas automatizadas",
              "value": "250+",
              "note": "sockets reales en loopback, red simulada en el resto"
            },
            {
              "label": "Jobs de CI",
              "value": "6",
              "note": "Windows + Linux, Python 3.11/3.14, Ruff, Suricata + Sigma"
            },
            {
              "label": "Dependencias de ejecución",
              "value": "0"
            },
            {
              "label": "Versiones",
              "value": "v1.0.0 → v1.1.0"
            }
          ]
        },
        {
          "type": "timeline",
          "title": "Cómo funciona",
          "steps": [
            {
              "label": "Validar",
              "description": "Objetivos y puertos se analizan y se contrastan con la protección de redes privadas y los límites antes de enviar nada."
            },
            {
              "label": "Escanear",
              "description": "Un grupo fijo de trabajadores asyncio abre y cierra de inmediato una conexión TCP por cada par (dirección, puerto)."
            },
            {
              "label": "Explicar",
              "description": "Cada puerto abierto recibe su servicio probable, un nivel de riesgo y una recomendación; los banners se leen y se limpian bajo demanda."
            },
            {
              "label": "Detectar",
              "description": "El mismo escaneo se captura y lo detectan las reglas Suricata y Sigma, verificadas automáticamente en la CI."
            }
          ]
        },
        {
          "type": "resources",
          "title": "Enlaces",
          "items": [
            {
              "label": "Código fuente",
              "href": "https://github.com/Aiyeesha/port-scanner"
            },
            {
              "label": "Guía de detección",
              "href": "https://github.com/Aiyeesha/port-scanner/tree/main/detection"
            }
          ]
        }
      ]
    }
  }
};

export default details;
