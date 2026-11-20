// content/project-details/it-ops-wifi-config.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "it-ops-wifi-config",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/it-ops-wifi-config/cover.webp"
    },
    {
      "alt": "Screenshot 1",
      "src": "/projects/it-ops-wifi-config/screenshot-1.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "Wi-Fi Access Point Configuration (TP-Link)",
      "heroSubtitle": "TP-Link Access Point · LAN/WAN · DHCP · SSID · WPA2 · Greta du Val d'Oise",
      "sections": [
        {
          "body": "As part of the TAI training at Greta du Val d'Oise (Lycée Louis Jouvet, Taverny), I was tasked with configuring a TP-Link Wi-Fi access point from scratch, working independently. The exercise simulates a real-world IT technician task: deploying wireless connectivity for an office or training room, from physical cabling to full network validation.",
          "type": "text",
          "title": "Context"
        },
        {
          "type": "bullets",
          "items": [
            "Physically connect the TP-Link access point to the lab network switch (RJ45)",
            "Access the AP web administration interface (http://192.168.0.1)",
            "Configure WAN addressing (DHCP or static IP depending on topology)",
            "Enable the integrated DHCP server for Wi-Fi clients",
            "Configure the wireless network: SSID, band, channel and WPA2-PSK security",
            "Validate Wi-Fi connectivity from a test device (DHCP + internet access)"
          ],
          "title": "Scope & Objectives"
        },
        {
          "type": "bullets",
          "items": [
            "TP-Link AP connected to switch and powered on — link LEDs confirmed",
            "Admin interface accessed via http://192.168.0.1 with manufacturer default credentials",
            "WAN set to DHCP — valid IP obtained from upstream router",
            "Integrated DHCP server enabled for automatic address distribution to Wi-Fi clients",
            "SSID configured, 2.4 GHz band, WPA2-PSK encryption with strong passphrase",
            "Test device connected with DHCP IP obtained, ping 8.8.8.8 successful, internet access confirmed"
          ],
          "title": "Solution & Deliverables"
        },
        {
          "type": "bullets",
          "items": [
            "TP-Link Access Point — Wi-Fi AP provided by the training lab",
            "TP-Link web admin interface — browser-based configuration (192.168.0.1)",
            "WPA2-PSK — Wi-Fi security protocol with passphrase",
            "Integrated DHCP — automatic IP address distribution to wireless clients",
            "RJ45 / LAN Switch — wired infrastructure for AP uplink",
            "Ping / network test — internet connectivity validation"
          ],
          "title": "Stack & Technologies"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Physical connection",
              "description": "TP-Link AP connected to the lab switch via RJ45. Powered on and link LEDs checked to confirm network connection established."
            },
            {
              "label": "Admin interface access",
              "description": "Browser → http://192.168.0.1. Default manufacturer credentials entered (printed on device label). Access to TP-Link configuration panel."
            },
            {
              "label": "WAN addressing",
              "description": "WAN settings → DHCP mode selected to automatically obtain an IP from the upstream router. Valid WAN address verified."
            },
            {
              "label": "LAN & DHCP",
              "description": "AP local IP confirmed. Integrated DHCP server enabled for automatic address distribution to Wi-Fi clients."
            },
            {
              "label": "Wireless network",
              "description": "SSID configured, 2.4 GHz band, channel and transmission mode selected. Security: WPA2-PSK with strong passphrase."
            },
            {
              "label": "Verification",
              "description": "Test device connected to SSID. DHCP IP obtained, ping 8.8.8.8 successful, internet access confirmed, AP visible in admin dashboard."
            }
          ],
          "title": "Configuration Procedure"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "DHCP + internet access validated",
              "label": "Connectivity",
              "value": "Wi-Fi network operational"
            },
            {
              "note": "Custom SSID and passphrase",
              "label": "Security",
              "value": "WPA2-PSK"
            },
            {
              "note": "Addresses distributed to clients",
              "label": "DHCP",
              "value": "Active on AP"
            },
            {
              "note": "Full configuration without assistance",
              "label": "Mode",
              "value": "Autonomous"
            }
          ],
          "title": "Outcomes"
        }
      ]
    },
    "fr": {
      "title": "Configuration d'un point d'accès Wi-Fi (TP-Link)",
      "heroSubtitle": "Point d'accès TP-Link · LAN/WAN · DHCP · SSID · WPA2 · Greta du Val d'Oise",
      "sections": [
        {
          "body": "Dans le cadre de la formation TAI au Greta du Val d'Oise (Lycée Louis Jouvet, Taverny), j'ai été chargée de configurer un point d'accès Wi-Fi TP-Link de A à Z en autonomie. L exercice simule une mission réelle de technicien IT : déployer la connectivité sans fil pour un bureau ou une salle de formation, du raccordement physique à la validation réseau complète.",
          "type": "text",
          "title": "Contexte"
        },
        {
          "type": "bullets",
          "items": [
            "Raccorder physiquement le point d'accès TP-Link au switch réseau du labo (RJ45)",
            "Accéder à l'interface d'administration web du PA (http://192.168.0.1)",
            "Configurer l'adressage WAN (DHCP ou IP statique selon la topologie)",
            "Activer le serveur DHCP intégré pour les clients Wi-Fi",
            "Configurer le réseau sans fil : SSID, bande, canal et sécurité WPA2-PSK",
            "Valider la connectivité Wi-Fi depuis un appareil test (DHCP + accès Internet)"
          ],
          "title": "Périmètre & Objectifs"
        },
        {
          "type": "bullets",
          "items": [
            "Point d'accès TP-Link raccordé au switch et alimenté — LEDs de lien confirmées",
            "Interface d'administration accessible via http://192.168.0.1 avec identifiants constructeur",
            "Adressage WAN configuré en DHCP — IP valide obtenue depuis le routeur amont",
            "Serveur DHCP intégré activé pour distribution automatique d'adresses aux clients",
            "SSID configuré, bande 2,4 GHz, chiffrement WPA2-PSK avec phrase de passe robuste",
            "Appareil test connecté avec IP DHCP obtenue, ping 8.8.8.8 validé, accès Internet confirmé"
          ],
          "title": "Solution & Livrables"
        },
        {
          "type": "bullets",
          "items": [
            "TP-Link Access Point — point d'accès Wi-Fi du labo de formation",
            "Interface d'administration web TP-Link — configuration via navigateur (192.168.0.1)",
            "WPA2-PSK — protocole de sécurité Wi-Fi avec phrase de passe",
            "DHCP intégré — attribution automatique d'adresses IP aux clients",
            "RJ45 / Switch LAN — infrastructure filaire de connexion du PA",
            "Ping / test réseau — validation de la connectivité Internet"
          ],
          "title": "Stack et outils"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Connexion physique",
              "description": "PA TP-Link raccordé au switch labo via câble RJ45. Mise sous tension et vérification des LEDs indiquant l'établissement du lien réseau."
            },
            {
              "label": "Accès à l'interface admin",
              "description": "Navigateur → http://192.168.0.1. Saisie des identifiants constructeur (étiquette de l'appareil). Accès au panneau de configuration TP-Link."
            },
            {
              "label": "Adressage WAN",
              "description": "Paramètres WAN → mode DHCP sélectionné pour obtenir automatiquement une IP du routeur amont. Adresse WAN valide vérifiée."
            },
            {
              "label": "LAN & DHCP",
              "description": "IP locale du PA confirmée. Serveur DHCP intégré activé pour attribution automatique aux clients Wi-Fi."
            },
            {
              "label": "Réseau sans fil",
              "description": "SSID configuré, bande 2,4 GHz, canal et mode de transmission sélectionnés. Sécurité : WPA2-PSK avec phrase de passe robuste."
            },
            {
              "label": "Vérification",
              "description": "Connexion appareil test au SSID. IP DHCP obtenue, ping 8.8.8.8 réussi, accès Internet confirmé, PA visible dans le tableau de bord admin."
            }
          ],
          "title": "Procédure de configuration"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "DHCP + accès Internet validés",
              "label": "Connectivité",
              "value": "Réseau Wi-Fi opérationnel"
            },
            {
              "note": "SSID et phrase de passe personnalisés",
              "label": "Sécurité",
              "value": "WPA2-PSK"
            },
            {
              "note": "Adresses distribuées aux clients",
              "label": "DHCP",
              "value": "Actif sur PA"
            },
            {
              "note": "Configuration complète sans assistance",
              "label": "Mode",
              "value": "Autonome"
            }
          ],
          "title": "Résultats"
        }
      ]
    },
    "es": {
      "title": "Configuración de un punto de acceso Wi-Fi (TP-Link)",
      "heroSubtitle": "Punto de acceso TP-Link · LAN/WAN · DHCP · SSID · WPA2 · Greta du Val d'Oise",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "paragraphs": [
            "En el marco de la formación TAI en el Greta du Val d'Oise (Lycée Louis Jouvet, Taverny), se me encargó configurar un punto de acceso Wi-Fi TP-Link de principio a fin de forma autónoma. El ejercicio simula una misión real de técnico IT: desplegar la conectividad inalámbrica para una oficina o una sala de formación, desde la conexión física hasta la validación completa de la red."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Conectar físicamente el punto de acceso TP-Link al switch de red del laboratorio (RJ45)",
            "Acceder a la interfaz de administración web del PA (http://192.168.0.1)",
            "Configurar el direccionamiento WAN (DHCP o IP estática según la topología)",
            "Activar el servidor DHCP integrado para los clientes Wi-Fi",
            "Configurar la red inalámbrica: SSID, banda, canal y seguridad WPA2-PSK",
            "Validar la conectividad Wi-Fi desde un dispositivo de prueba (DHCP + acceso a Internet)"
          ],
          "title": "Alcance y objetivos"
        },
        {
          "type": "bullets",
          "items": [
            "Punto de acceso TP-Link conectado al switch y alimentado — LED de enlace confirmados",
            "Interfaz de administración accesible vía http://192.168.0.1 con credenciales del fabricante",
            "Direccionamiento WAN configurado en DHCP — IP válida obtenida del router upstream",
            "Servidor DHCP integrado activado para distribución automática de direcciones a los clientes",
            "SSID configurado, banda 2,4 GHz, cifrado WPA2-PSK con frase de contraseña robusta",
            "Dispositivo de prueba conectado con IP DHCP obtenida, ping a 8.8.8.8 validado, acceso a Internet confirmado"
          ],
          "title": "Solución y entregables"
        },
        {
          "type": "bullets",
          "items": [
            "Punto de acceso TP-Link — punto de acceso Wi-Fi del laboratorio de formación",
            "Interfaz de administración web TP-Link — configuración vía navegador (192.168.0.1)",
            "WPA2-PSK — protocolo de seguridad Wi-Fi con frase de contraseña",
            "DHCP integrado — asignación automática de direcciones IP a los clientes",
            "RJ45 / Switch LAN — infraestructura cableada de conexión del PA",
            "Ping / prueba de red — validación de la conectividad a Internet"
          ],
          "title": "Stack y tecnologías"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Conexión física",
              "description": "PA TP-Link conectado al switch del laboratorio mediante cable RJ45. Encendido y verificación de los LED que indican el establecimiento del enlace de red."
            },
            {
              "label": "Acceso a la interfaz de administración",
              "description": "Navegador → http://192.168.0.1. Introducción de las credenciales del fabricante (etiqueta del dispositivo). Acceso al panel de configuración de TP-Link."
            },
            {
              "label": "Direccionamiento WAN",
              "description": "Configuración WAN → modo DHCP seleccionado para obtener automáticamente una IP del router upstream. Dirección WAN válida verificada."
            },
            {
              "label": "LAN y DHCP",
              "description": "IP local del PA confirmada. Servidor DHCP integrado activado para la asignación automática a los clientes Wi-Fi."
            },
            {
              "label": "Red inalámbrica",
              "description": "SSID configurado, banda 2,4 GHz, canal y modo de transmisión seleccionados. Seguridad: WPA2-PSK con frase de contraseña robusta."
            },
            {
              "label": "Verificación",
              "description": "Conexión del dispositivo de prueba al SSID. IP DHCP obtenida, ping a 8.8.8.8 exitoso, acceso a Internet confirmado, PA visible en el panel de administración."
            }
          ],
          "title": "Procedimiento de configuración"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "DHCP + acceso a Internet validados",
              "label": "Conectividad",
              "value": "Red Wi-Fi operativa"
            },
            {
              "note": "SSID y frase de contraseña personalizados",
              "label": "Seguridad",
              "value": "WPA2-PSK"
            },
            {
              "note": "Direcciones distribuidas a los clientes",
              "label": "DHCP",
              "value": "Activo en el PA"
            },
            {
              "note": "Configuración completa sin asistencia",
              "label": "Modo",
              "value": "Autónomo"
            }
          ],
          "title": "Resultados"
        }
      ]
    }
  }
};

export default details;
