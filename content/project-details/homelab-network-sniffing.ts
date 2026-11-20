// content/project-details/homelab-network-sniffing.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "homelab-network-sniffing",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/homelab-network-sniffing/cover.webp"
    },
    {
      "alt": "Screenshot 1",
      "src": "/projects/homelab-network-sniffing/screenshot-1.webp"
    },
    {
      "alt": "Screenshot 2",
      "src": "/projects/homelab-network-sniffing/screenshot-2.webp"
    },
    {
      "alt": "Screenshot 3",
      "src": "/projects/homelab-network-sniffing/screenshot-3.webp"
    },
    {
      "alt": "Screenshot 4",
      "src": "/projects/homelab-network-sniffing/screenshot-4.webp"
    },
    {
      "alt": "Screenshot 5",
      "src": "/projects/homelab-network-sniffing/screenshot-5.webp"
    },
    {
      "alt": "Screenshot 6",
      "src": "/projects/homelab-network-sniffing/screenshot-6.webp"
    },
    {
      "alt": "Screenshot 7",
      "src": "/projects/homelab-network-sniffing/screenshot-7.webp"
    },
    {
      "alt": "Screenshot 8",
      "src": "/projects/homelab-network-sniffing/screenshot-8.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "Network Sniffing: tcpdump, Wireshark & Scapy",
      "heroSubtitle": "Traffic capture and analysis with tcpdump, Wireshark and Scapy in a homelab: reading a plaintext HTTP exchange and intercepting unencrypted FTP credentials.",
      "sections": [
        {
          "type": "text",
          "title": "Context",
          "paragraphs": [
            "This project is the \"network layer\" counterpart to an earlier password-cracking project. Where that project showed how a stored password can be guessed, this one demonstrates how a password in transit can be read directly if it isn't encrypted.",
            "The goal: capture raw network traffic with the industry's three reference tools (tcpdump, Wireshark, Scapy), read the exact anatomy of a packet, and concretely demonstrate — by intercepting an FTP credential sent in plaintext — why protocols like FTP or Telnet are now considered dangerous in production."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Capture and analyze raw network traffic with tcpdump and Wireshark (ARP, ICMP, TCP).",
            "Demonstrate plaintext reading of a full HTTP exchange via Follow HTTP Stream.",
            "Intercept FTP credentials sent without encryption.",
            "Build a custom network sniffer in Python with Scapy."
          ],
          "title": "Objectives"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "title": "Baseline capture with tcpdump",
              "description": "I captured ARP and ICMP traffic between the two lab machines, saved it to .pcap, and replayed it from the command line."
            },
            {
              "title": "Visual analysis with Wireshark",
              "description": "I opened the capture and explored the packet anatomy layer by layer (Ethernet → IP → TCP/ICMP), applying display filters."
            },
            {
              "title": "Plaintext HTTP interception",
              "description": "I started a test HTTP server, captured the targeted traffic, and read the full request and response via Follow HTTP Stream."
            },
            {
              "title": "FTP credential interception",
              "description": "I deployed a test vsftpd server, connected with a dedicated account, and read the login/password directly in cleartext in the Wireshark packet list."
            },
            {
              "title": "Custom Python sniffer (Scapy)",
              "description": "I wrote a script capturing and analyzing ARP/TCP/UDP traffic live, and successfully tested it on real traffic (ARP resolution, active SSH session)."
            }
          ],
          "title": "Project walkthrough"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Protocols analyzed",
              "value": "ARP, ICMP, TCP, HTTP, FTP"
            },
            {
              "label": "FTP credentials intercepted in plaintext",
              "value": "1 (USER + PASS)"
            },
            {
              "label": "Packets captured (Scapy script)",
              "value": "live ARP + TCP traffic"
            },
            {
              "label": "Tools mastered",
              "value": "3 (tcpdump, Wireshark, Scapy)"
            }
          ],
          "title": "Results"
        },
        {
          "type": "text",
          "title": "Key takeaway",
          "paragraphs": [
            "Sniffing never \"breaks\" encryption: an observer capturing HTTPS or SSH traffic sees unreadable bytes, not content. This project illustrates why widespread TLS adoption has made passive sniffing largely obsolete as a direct threat to content — the real risk today lies in legacy plaintext protocols (FTP, Telnet) and traffic metadata."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Kali Linux (capture + traffic generation) and Debian (target), on VMware Workstation Pro 17",
            "tcpdump (command-line capture, BPF filtering)",
            "Wireshark (visual analysis, Follow HTTP Stream)",
            "Scapy / Python (custom network sniffer)",
            "vsftpd (test FTP server)"
          ],
          "title": "Stack & tools"
        }
      ]
    },
    "fr": {
      "title": "Sniffing réseau : tcpdump, Wireshark & Scapy",
      "heroSubtitle": "Capture et analyse de trafic avec tcpdump, Wireshark et Scapy en homelab : lecture d'une requête HTTP en clair et interception d'identifiants FTP non chiffrés.",
      "sections": [
        {
          "type": "text",
          "title": "Contexte",
          "paragraphs": [
            "Ce projet est la contrepartie \"couche réseau\" d'un projet précédent consacré au cracking de mots de passe. Là où celui-ci montrait comment un mot de passe stocké peut être deviné, celui-ci démontre comment un mot de passe en transit peut être directement lu s'il n'est pas chiffré.",
            "L'objectif : capturer du trafic réseau brut avec les trois outils de référence du métier (tcpdump, Wireshark, Scapy), lire l'anatomie exacte d'un paquet, et démontrer concrètement — en interceptant un identifiant FTP transmis en clair — pourquoi des protocoles comme FTP ou Telnet sont aujourd'hui considérés comme dangereux en production."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Capturer et analyser du trafic réseau brut avec tcpdump et Wireshark (ARP, ICMP, TCP).",
            "Démontrer la lecture en clair d'une requête HTTP complète via Follow HTTP Stream.",
            "Intercepter des identifiants FTP transmis sans chiffrement.",
            "Développer un sniffeur réseau personnalisé en Python avec Scapy."
          ],
          "title": "Objectifs"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "title": "Capture de référence avec tcpdump",
              "description": "J'ai capturé le trafic ARP et ICMP entre les deux machines du lab, enregistré au format .pcap, puis relu en ligne de commande."
            },
            {
              "title": "Analyse visuelle avec Wireshark",
              "description": "J'ai ouvert la capture et exploré l'anatomie de paquet couche par couche (Ethernet → IP → TCP/ICMP), en appliquant des filtres d'affichage."
            },
            {
              "title": "Interception HTTP en clair",
              "description": "J'ai démarré un serveur HTTP de test, capturé le trafic ciblé, puis lu la requête et la réponse complètes via Follow HTTP Stream."
            },
            {
              "title": "Interception d'identifiants FTP",
              "description": "J'ai déployé un serveur vsftpd de test, connecté avec un compte dédié, et lu directement le login/mot de passe en clair dans la liste des paquets Wireshark."
            },
            {
              "title": "Développement d'un sniffeur Python (Scapy)",
              "description": "J'ai écrit un script capturant et analysant le trafic ARP/TCP/UDP en direct, testé avec succès sur du trafic réel (résolution ARP, session SSH active)."
            }
          ],
          "title": "Déroulé du projet"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Protocoles analysés",
              "value": "ARP, ICMP, TCP, HTTP, FTP"
            },
            {
              "label": "Identifiants FTP interceptés en clair",
              "value": "1 (USER + PASS)"
            },
            {
              "label": "Paquets capturés (script Scapy)",
              "value": "trafic ARP + TCP en direct"
            },
            {
              "label": "Outils maîtrisés",
              "value": "3 (tcpdump, Wireshark, Scapy)"
            }
          ],
          "title": "Résultats"
        },
        {
          "type": "text",
          "title": "Enseignement clé",
          "paragraphs": [
            "Le sniffing ne \"casse\" jamais le chiffrement : un observateur qui capture du trafic HTTPS ou SSH voit des octets illisibles, pas le contenu. Ce projet illustre pourquoi le déploiement généralisé de TLS a rendu le sniffing passif largement obsolète comme menace directe sur le contenu — le risque réel aujourd'hui porte sur les protocoles legacy encore en clair (FTP, Telnet) et sur les métadonnées de trafic."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Kali Linux (capture + génération de trafic) et Debian (cible), sous VMware Workstation Pro 17",
            "tcpdump (capture en ligne de commande, filtrage BPF)",
            "Wireshark (analyse visuelle, Follow HTTP Stream)",
            "Scapy / Python (sniffeur réseau personnalisé)",
            "vsftpd (serveur FTP de test)"
          ],
          "title": "Stack et outils"
        }
      ]
    },
    "es": {
      "title": "Sniffing de red: tcpdump, Wireshark y Scapy",
      "heroSubtitle": "Captura y análisis de tráfico con tcpdump, Wireshark y Scapy en un homelab: lectura de un intercambio HTTP en claro e interceptación de credenciales FTP sin cifrar.",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "paragraphs": [
            "Este proyecto es la contraparte de \"capa de red\" de un proyecto anterior de cracking de contraseñas. Mientras ese proyecto mostraba cómo se puede adivinar una contraseña almacenada, este demuestra cómo una contraseña en tránsito puede leerse directamente si no está cifrada.",
            "El objetivo: capturar tráfico de red en bruto con las tres herramientas de referencia del sector (tcpdump, Wireshark, Scapy), leer la anatomía exacta de un paquete, y demostrar concretamente — interceptando una credencial FTP enviada en texto plano — por qué protocolos como FTP o Telnet se consideran hoy peligrosos en producción."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Capturar y analizar tráfico de red en bruto con tcpdump y Wireshark (ARP, ICMP, TCP).",
            "Demostrar la lectura en texto plano de un intercambio HTTP completo mediante Follow HTTP Stream.",
            "Interceptar credenciales FTP enviadas sin cifrado.",
            "Desarrollar un sniffer de red personalizado en Python con Scapy."
          ],
          "title": "Objetivos"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "title": "Captura de referencia con tcpdump",
              "description": "Capturé el tráfico ARP e ICMP entre las dos máquinas del laboratorio, lo guardé en formato .pcap y lo repasé desde la línea de comandos."
            },
            {
              "title": "Análisis visual con Wireshark",
              "description": "Abrí la captura y exploré la anatomía del paquete capa por capa (Ethernet → IP → TCP/ICMP), aplicando filtros de visualización."
            },
            {
              "title": "Interceptación de HTTP en claro",
              "description": "Inicié un servidor HTTP de prueba, capturé el tráfico dirigido y leí la solicitud y la respuesta completas mediante Follow HTTP Stream."
            },
            {
              "title": "Interceptación de credenciales FTP",
              "description": "Desplegué un servidor vsftpd de prueba, me conecté con una cuenta dedicada y leí directamente el usuario/contraseña en texto plano en la lista de paquetes de Wireshark."
            },
            {
              "title": "Sniffer personalizado en Python (Scapy)",
              "description": "Escribí un script que captura y analiza tráfico ARP/TCP/UDP en vivo, y lo probé con éxito en tráfico real (resolución ARP, sesión SSH activa)."
            }
          ],
          "title": "Desarrollo del proyecto"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Protocolos analizados",
              "value": "ARP, ICMP, TCP, HTTP, FTP"
            },
            {
              "label": "Credenciales FTP interceptadas en claro",
              "value": "1 (USER + PASS)"
            },
            {
              "label": "Paquetes capturados (script Scapy)",
              "value": "tráfico ARP + TCP en vivo"
            },
            {
              "label": "Herramientas dominadas",
              "value": "3 (tcpdump, Wireshark, Scapy)"
            }
          ],
          "title": "Resultados"
        },
        {
          "type": "text",
          "title": "Lección clave",
          "paragraphs": [
            "El sniffing nunca \"rompe\" el cifrado: un observador que captura tráfico HTTPS o SSH ve bytes ilegibles, no contenido. Este proyecto ilustra por qué la adopción generalizada de TLS ha vuelto el sniffing pasivo en gran medida obsoleto como amenaza directa al contenido — el riesgo real hoy reside en los protocolos legacy aún en claro (FTP, Telnet) y en los metadatos de tráfico."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Kali Linux (captura + generación de tráfico) y Debian (objetivo), sobre VMware Workstation Pro 17",
            "tcpdump (captura en línea de comandos, filtrado BPF)",
            "Wireshark (análisis visual, Follow HTTP Stream)",
            "Scapy / Python (sniffer de red personalizado)",
            "vsftpd (servidor FTP de prueba)"
          ],
          "title": "Stack y herramientas"
        }
      ]
    }
  }
};

export default details;
