// content/project-details/it-ops-network-security.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "it-ops-network-security",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/it-ops-network-security/cover.webp"
    },
    {
      "alt": "Screenshot 1",
      "src": "/projects/it-ops-network-security/screenshot-1.webp"
    },
    {
      "alt": "Screenshot 2",
      "src": "/projects/it-ops-network-security/screenshot-2.webp"
    },
    {
      "alt": "Screenshot 3",
      "src": "/projects/it-ops-network-security/screenshot-3.webp"
    },
    {
      "alt": "Screenshot 4",
      "src": "/projects/it-ops-network-security/screenshot-4.webp"
    },
    {
      "alt": "Screenshot 5",
      "src": "/projects/it-ops-network-security/screenshot-5.webp"
    },
    {
      "alt": "Screenshot 6",
      "src": "/projects/it-ops-network-security/screenshot-6.webp"
    },
    {
      "alt": "Screenshot 7",
      "src": "/projects/it-ops-network-security/screenshot-7.webp"
    },
    {
      "alt": "Screenshot 8",
      "src": "/projects/it-ops-network-security/screenshot-8.webp"
    },
    {
      "alt": "Screenshot 9",
      "src": "/projects/it-ops-network-security/screenshot-9.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "Securing Internet Access with pfSense & Squid",
      "heroSubtitle": "A pfSense 2.6.0 gateway added to the Windows Server 2022 lab: Squid transparent proxy, SquidGuard filtering and LightSquid reports to secure the LAN's internet access.",
      "sections": [
        {
          "body": "Building on the virtualized lab (AD DS / DNS / DHCP / WDS on Windows Server 2022), I added a pfSense 2.6.0 firewall VM as the network gateway. Goal: secure outbound internet access for all LAN machines (192.168.100.0/24), filter web traffic through a Squid transparent proxy, and enforce access policies — replicating real-world enterprise perimeter security.",
          "type": "text",
          "title": "Context"
        },
        {
          "type": "bullets",
          "items": [
            "Hypervisor: VMware Workstation Pro 17",
            "pfSense 2.6.0 VM: FreeBSD 12 64-bit, 10 GB HDD, 2 GB RAM — LAN/WAN gateway",
            "WAN (em0): Bridged to host 4G USB dongle — DHCP — 192.168.1.110/24",
            "LAN (em1): VMnet8 (NAT) — 192.168.100.220/24 (pfSense gateway)",
            "DCAD22: 192.168.100.250 — AD DS, DNS, DHCP, WDS",
            "SRVSAMBA: 192.168.100.130 — Samba shares | Clients: 192.168.100.21/22"
          ],
          "title": "Lab Architecture"
        },
        {
          "type": "bullets",
          "items": [
            "IP aliases: SRV group (servers) and Client group (workstations) for targeted rules",
            "LAN rules: DNS (UDP 53) and ICMP allowed from SRV — REFUS SRV VERS INTERNET rule placed above allow-all",
            "Squid transparent proxy on LAN interface (port 3128) with SSL inspection enabled",
            "Internal CA Pfsense-CA (RSA 2048, SHA-256, 10 years) for SSL bump on outbound HTTPS",
            "SquidGuard: URL category filtering with blacklists",
            "LightSquid: per-client web traffic reporting dashboard"
          ],
          "title": "Configurations Deployed"
        },
        {
          "type": "bullets",
          "items": [
            "pfSense 2.6.0 — Firewall, NAT, routing (FreeBSD-based)",
            "Squid — Transparent proxy with SSL inspection (port 3128)",
            "SquidGuard — URL category filtering (blacklists)",
            "LightSquid — Per-user web usage reporting dashboard",
            "VMware Workstation Pro 17 — Type 2 hypervisor",
            "PKI / pfSense CA Manager — Internal certificate authority for HTTPS inspection"
          ],
          "title": "Stack & Technologies"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "pfSense installation",
              "description": "FreeBSD 12 64-bit VM created in VMware (10 GB, 2 GB RAM), 2 NICs: Bridged (4G WAN) + VMnet8 (LAN). pfSense 2.6.0 ISO installed. Console confirms WAN em0 (192.168.1.110) and LAN em1 (192.168.100.220)."
            },
            {
              "label": "Aliases & firewall rules",
              "description": "SRV (servers) and Client (workstations) IP aliases created. LAN rules: DNS + ICMP allowed from SRV, then REFUS SRV VERS INTERNET placed above allow-all — servers blocked except DNS/ICMP."
            },
            {
              "label": "Squid proxy & SquidGuard",
              "description": "3 packages installed: squid, squidGuard, LightSquid. Squid configured as transparent proxy port 3128 with SSL bump. SquidGuard set up with URL category blacklists. LightSquid enabled for traffic reports."
            },
            {
              "label": "Certificate authority",
              "description": "Pfsense-CA generated (RSA 2048, SHA-256, 10 years, C=FR). Used by Squid to re-sign intercepted HTTPS connections — must be imported as a trusted CA on all client machines."
            }
          ],
          "title": "Setup Phases"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "All LAN traffic routed via 4G WAN",
              "label": "Gateway",
              "value": "pfSense operational"
            },
            {
              "note": "DNS + ICMP exceptions only",
              "label": "Access control",
              "value": "Servers internet-isolated"
            },
            {
              "note": "URL categories blocked",
              "label": "Web filtering",
              "value": "Squid + SquidGuard active"
            },
            {
              "note": "Internal CA for encrypted traffic",
              "label": "HTTPS inspection",
              "value": "SSL bump deployed"
            },
            {
              "note": "Per-client web stats available",
              "label": "Reporting",
              "value": "LightSquid active"
            },
            {
              "note": "Complete personal lab",
              "label": "Skills",
              "value": "pfSense, firewall, proxy, PKI"
            }
          ],
          "title": "Outcomes"
        }
      ]
    },
    "fr": {
      "title": "Sécuriser les accès à Internet avec pfSense & Squid",
      "heroSubtitle": "Passerelle pfSense 2.6.0 ajoutée au lab Windows Server 2022 : proxy transparent Squid, filtrage SquidGuard et rapports LightSquid pour sécuriser les accès Internet du LAN.",
      "sections": [
        {
          "body": "En prolongement du lab virtualisé (AD DS / DNS / DHCP / WDS sur Windows Server 2022), j'ai ajouté une VM pfSense 2.6.0 pour jouer le rôle de passerelle réseau. Objectif : sécuriser les accès Internet sortants de toutes les machines du LAN privé (192.168.100.0/24), filtrer le trafic web via un proxy transparent Squid et appliquer des politiques d'accès — reproduisant la sécurité périmétrique d'une infrastructure d'entreprise réelle.",
          "type": "text",
          "title": "Contexte"
        },
        {
          "type": "bullets",
          "items": [
            "Hyperviseur : VMware Workstation Pro 17",
            "VM pfSense 2.6.0 : FreeBSD 12 64-bit, 10 Go HDD, 2 Go RAM — passerelle LAN/WAN",
            "WAN (em0) : Bridge sur clé 4G USB de l'hôte — DHCP — 192.168.1.110/24",
            "LAN (em1) : VMnet8 (NAT) — 192.168.100.220/24 (passerelle pfSense)",
            "DCAD22 : 192.168.100.250 — AD DS, DNS, DHCP, WDS",
            "SRVSAMBA : 192.168.100.130 — Partages Samba | Clients : 192.168.100.21/22"
          ],
          "title": "Architecture du lab"
        },
        {
          "type": "bullets",
          "items": [
            "Alias IP : groupe SRV (serveurs) et groupe Client (postes) pour règles ciblées",
            "Règles LAN : DNS (UDP 53) et ICMP autorisés depuis SRV — règle REFUS SRV VERS INTERNET au-dessus du allow-all",
            "Proxy Squid transparent sur l'interface LAN (port 3128) avec inspection SSL activée",
            "CA interne Pfsense-CA (RSA 2048, SHA-256, 10 ans) pour SSL bump sur HTTPS sortant",
            "SquidGuard : filtrage par catégories d'URL avec listes noires",
            "LightSquid : tableau de bord de reporting du trafic web par client"
          ],
          "title": "Configurations déployées"
        },
        {
          "type": "bullets",
          "items": [
            "pfSense 2.6.0 — Firewall, NAT, routage (basé FreeBSD)",
            "Squid — Proxy transparent avec inspection SSL (port 3128)",
            "SquidGuard — Filtrage par catégories d'URL (listes noires)",
            "LightSquid — Tableau de bord de reporting web par utilisateur",
            "VMware Workstation Pro 17 — Hyperviseur de type 2",
            "PKI / CA Manager pfSense — Autorité de certification interne pour HTTPS"
          ],
          "title": "Stack et outils"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Installation pfSense",
              "description": "VM FreeBSD 12 64-bit créée dans VMware (10 Go, 2 Go RAM), 2 NICs : Bridged (WAN 4G) + VMnet8 (LAN). ISO pfSense 2.6.0 installé. Console confirme WAN em0 (192.168.1.110) et LAN em1 (192.168.100.220)."
            },
            {
              "label": "Alias & règles pare-feu",
              "description": "Alias SRV (serveurs) et Client (postes) créés. Règles LAN : DNS + ICMP autorisés depuis SRV, puis REFUS SRV VERS INTERNET placé avant le allow-all — serveurs bloqués sauf DNS/ICMP."
            },
            {
              "label": "Proxy Squid & SquidGuard",
              "description": "3 paquets installés : squid, squidGuard, LightSquid. Squid configuré en proxy transparent port 3128 avec SSL bump. SquidGuard paramétré avec listes noires URL par catégorie. LightSquid activé pour les rapports."
            },
            {
              "label": "Autorité de certification",
              "description": "CA Pfsense-CA générée (RSA 2048, SHA-256, 10 ans, C=FR). Utilisée par Squid pour re-signer les connexions HTTPS interceptées — doit être importée comme CA de confiance sur les postes clients."
            }
          ],
          "title": "Phases de mise en place"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Tout le trafic LAN routé via la 4G WAN",
              "label": "Passerelle",
              "value": "pfSense opérationnel"
            },
            {
              "note": "Exceptions DNS + ICMP uniquement",
              "label": "Contrôle d'accès",
              "value": "Serveurs isolés d'Internet"
            },
            {
              "note": "Catégories URL bloquées",
              "label": "Filtrage web",
              "value": "Squid + SquidGuard actifs"
            },
            {
              "note": "CA interne pour trafic chiffré",
              "label": "Inspection HTTPS",
              "value": "SSL bump déployé"
            },
            {
              "note": "Stats web par client accessibles",
              "label": "Reporting",
              "value": "LightSquid actif"
            },
            {
              "note": "Lab personnel complet",
              "label": "Compétences",
              "value": "pfSense, pare-feu, proxy, PKI"
            }
          ],
          "title": "Résultats"
        }
      ]
    },
    "es": {
      "title": "Asegurar el acceso a Internet con pfSense y Squid",
      "heroSubtitle": "Pasarela pfSense 2.6.0 añadida al laboratorio Windows Server 2022: proxy transparente Squid, filtrado SquidGuard e informes LightSquid para asegurar el acceso a Internet de la LAN.",
      "sections": [
        {
          "body": "En continuidad con el laboratorio virtualizado (AD DS / DNS / DHCP / WDS en Windows Server 2022), añadí una VM pfSense 2.6.0 como firewall para actuar de pasarela de red. Objetivo: asegurar el acceso saliente a Internet de todas las máquinas de la LAN privada (192.168.100.0/24), filtrar el tráfico web mediante un proxy transparente Squid y aplicar políticas de acceso — reproduciendo la seguridad perimetral de una infraestructura empresarial real.",
          "type": "text",
          "title": "Contexto"
        },
        {
          "type": "bullets",
          "items": [
            "Hipervisor: VMware Workstation Pro 17",
            "VM pfSense 2.6.0: FreeBSD 12 de 64 bits, 10 GB de disco, 2 GB de RAM — pasarela LAN/WAN",
            "WAN (em0): en modo puente sobre el módem 4G del host — DHCP — 192.168.1.110/24",
            "LAN (em1): VMnet8 (NAT) — 192.168.100.220/24 (pasarela pfSense)",
            "DCAD22: 192.168.100.250 — AD DS, DNS, DHCP, WDS",
            "SRVSAMBA: 192.168.100.130 — recursos compartidos Samba | Clientes: 192.168.100.21/22"
          ],
          "title": "Arquitectura del laboratorio"
        },
        {
          "type": "bullets",
          "items": [
            "Alias IP: grupo SRV (servidores) y grupo Client (puestos) para reglas específicas",
            "Reglas LAN: DNS (UDP 53) e ICMP permitidos desde SRV — regla REFUS SRV VERS INTERNET colocada por encima del allow-all",
            "Proxy transparente Squid en la interfaz LAN (puerto 3128) con inspección SSL activada",
            "CA interna Pfsense-CA (RSA 2048, SHA-256, 10 años) para SSL bump en el tráfico HTTPS saliente",
            "SquidGuard: filtrado por categorías de URL con listas negras",
            "LightSquid: panel de informes de tráfico web por cliente"
          ],
          "title": "Configuraciones desplegadas"
        },
        {
          "type": "bullets",
          "items": [
            "pfSense 2.6.0 — Firewall, NAT, enrutamiento (basado en FreeBSD)",
            "Squid — Proxy transparente con inspección SSL (puerto 3128)",
            "SquidGuard — Filtrado por categorías de URL (listas negras)",
            "LightSquid — Panel de informes de uso web por usuario",
            "VMware Workstation Pro 17 — Hipervisor de tipo 2",
            "PKI / pfSense CA Manager — Autoridad de certificación interna para inspección HTTPS"
          ],
          "title": "Stack y tecnologías"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Instalación de pfSense",
              "description": "VM FreeBSD 12 de 64 bits creada en VMware (10 GB, 2 GB RAM), 2 tarjetas de red: en puente (WAN 4G) + VMnet8 (LAN). ISO de pfSense 2.6.0 instalada. La consola confirma WAN em0 (192.168.1.110) y LAN em1 (192.168.100.220)."
            },
            {
              "label": "Alias y reglas de firewall",
              "description": "Alias SRV (servidores) y Client (puestos) creados. Reglas LAN: DNS + ICMP permitidos desde SRV, luego REFUS SRV VERS INTERNET colocada antes del allow-all — servidores bloqueados salvo DNS/ICMP."
            },
            {
              "label": "Proxy Squid y SquidGuard",
              "description": "3 paquetes instalados: squid, squidGuard, LightSquid. Squid configurado como proxy transparente en el puerto 3128 con SSL bump. SquidGuard configurado con listas negras de URL por categoría. LightSquid activado para los informes de tráfico."
            },
            {
              "label": "Autoridad de certificación",
              "description": "CA Pfsense-CA generada (RSA 2048, SHA-256, 10 años, C=FR). Utilizada por Squid para volver a firmar las conexiones HTTPS interceptadas — debe importarse como CA de confianza en todos los equipos cliente."
            }
          ],
          "title": "Fases de configuración"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Todo el tráfico LAN enrutado vía WAN 4G",
              "label": "Pasarela",
              "value": "pfSense operativo"
            },
            {
              "note": "Solo excepciones DNS + ICMP",
              "label": "Control de acceso",
              "value": "Servidores aislados de Internet"
            },
            {
              "note": "Categorías de URL bloqueadas",
              "label": "Filtrado web",
              "value": "Squid + SquidGuard activos"
            },
            {
              "note": "CA interna para tráfico cifrado",
              "label": "Inspección HTTPS",
              "value": "SSL bump desplegado"
            },
            {
              "note": "Estadísticas web por cliente disponibles",
              "label": "Informes",
              "value": "LightSquid activo"
            },
            {
              "note": "Laboratorio personal completo",
              "label": "Competencias",
              "value": "pfSense, firewall, proxy, PKI"
            }
          ],
          "title": "Resultados"
        }
      ]
    }
  }
};

export default details;
