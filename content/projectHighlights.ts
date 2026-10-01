// content/projectHighlights.ts
// ------------------------------
// Traductions FR et ES des puces (« highlights ») des cartes projet.
//
// Les puces de content/projects.ts sont rédigées en anglais ; jusqu'à l'audit
// de contenu du 2026-09-25, elles s'affichaient telles quelles sur les pages
// FR et ES de /projects. Ce fichier fournit leur traduction, dans le même
// ordre et en même nombre que la version anglaise (vérifié par
// __tests__/projectHighlights.test.ts). Un projet absent de ce fichier, ou
// une locale manquante, retombe sur les puces anglaises.

export type LocalizedHighlights = { fr: string[]; es: string[] };

export const PROJECT_HIGHLIGHTS: Record<string, LocalizedHighlights> = {
  "homelab-cowrie-honeypot": {
    "fr": [
      "Honeypot Cowrie déployé et isolé sur un réseau VMnet2 dédié",
      "Attaque par force brute Hydra exécutée et analysée (3 mots de passe retrouvés)",
      "17 commandes de l'attaquant capturées et analysées avec jq",
      "VM d'attaque entièrement reconstruite après un incident de verrouillage dans le lab"
    ],
    "es": [
      "Honeypot Cowrie desplegado y aislado en una red VMnet2 dedicada",
      "Ataque de fuerza bruta con Hydra ejecutado y analizado (3 contraseñas recuperadas)",
      "17 comandos del atacante capturados y analizados con jq",
      "VM atacante reconstruida por completo tras un incidente de bloqueo en el laboratorio"
    ]
  },
  "homelab-network-sniffing": {
    "fr": [
      "Trafic ARP/ICMP, HTTP et FTP capturé et analysé sur un lab isolé",
      "Identifiants FTP interceptés en clair (USER/PASS lisibles sans aucun outil de cassage)",
      "Sniffeur réseau Python développé avec Scapy, testé sur du trafic réel du lab"
    ],
    "es": [
      "Tráfico ARP/ICMP, HTTP y FTP capturado y analizado en un laboratorio aislado",
      "Credenciales FTP interceptadas en claro (USER/PASS visibles sin ninguna herramienta de descifrado)",
      "Sniffer de red en Python desarrollado con Scapy y probado con tráfico real del laboratorio"
    ]
  },
  "homelab-password-cracking-lab": {
    "fr": [
      "Benchmark MD5 contre bcrypt mesuré (facteur d'environ 25 900)",
      "Chaîne de dépannage OpenCL/Mesa complète résolue sans GPU dédié",
      "Cas pratique multi-utilisateurs : mot de passe faible cassé, phrase de passe longue restée hors de portée",
      "Attaques par dictionnaire, par règles, par masque et par force brute documentées"
    ],
    "es": [
      "Benchmark MD5 frente a bcrypt medido (factor de unas 25 900 veces)",
      "Cadena completa de resolución de problemas OpenCL/Mesa sin GPU dedicada",
      "Caso práctico multiusuario: contraseña débil descifrada, frase de contraseña larga fuera de alcance",
      "Ataques de diccionario, por reglas, por máscara y de fuerza bruta documentados"
    ]
  },
  "it-ops-virtualization-lab": {
    "fr": [
      "Architecture réseau complète conçue sur un segment NAT VMware (192.168.100.0/24)",
      "Rôles AD DS, DNS, DHCP et WDS déployés sur une VM Windows Server 2022",
      "Installation des postes automatisée par démarrage PXE (WDS + option DHCP 060 PXEClient)",
      "GPO, profils itinérants et lecteur réseau partagé (\\\\DCAD22\\Partage) appliqués",
      "Client Windows 10 joint au domaine avec approbation WDS contrôlée par l'administrateur"
    ],
    "es": [
      "Arquitectura de red completa diseñada en un segmento NAT de VMware (192.168.100.0/24)",
      "Roles AD DS, DNS, DHCP y WDS desplegados en una VM Windows Server 2022",
      "Instalación de equipos automatizada mediante arranque PXE (WDS + opción DHCP 060 PXEClient)",
      "GPO, perfiles móviles y unidad de red compartida (\\\\DCAD22\\Partage) aplicados",
      "Cliente Windows 10 unido al dominio con aprobación WDS controlada por el administrador"
    ]
  },
  "security-monitoring-dashboard": {
    "fr": [
      "Flux d'événements de sécurité en temps réel via WebSocket",
      "Classification des alertes par sévérité : critique, haute, moyenne, basse, info",
      "Persistance SQLite et ingestion protégée par clé d'API (ajoutées lors d'une restructuration du backend)",
      "Suite Pytest couvrant les endpoints d'événements et de métriques",
      "Interface responsive en thème sombre, déployée en une commande avec Docker Compose"
    ],
    "es": [
      "Flujo de eventos de seguridad en tiempo real mediante WebSocket",
      "Clasificación de alertas por gravedad: crítica, alta, media, baja, info",
      "Persistencia SQLite e ingesta protegida por clave de API (añadidas en una reestructuración del backend)",
      "Suite Pytest que cubre los endpoints de eventos y métricas",
      "Interfaz responsive en tema oscuro, desplegada con un solo comando mediante Docker Compose"
    ]
  },
  "it-ops-rmm-supervision": {
    "fr": [
      "J'ai supervisé plus de 550 appareils (postes fixes, portables, serveurs) sur plusieurs sites clients via le tableau de bord Datto RMM",
      "J'ai contrôlé l'état des correctifs, la couverture antivirus et l'inventaire logiciel des postes gérés",
      "J'ai déployé des composants logiciels (Malwarebytes) à distance via des Quick Jobs, sans intervention sur site",
      "J'ai utilisé la prise en main à distance Splashtop pour assister les utilisateurs et dépanner leurs postes",
      "J'ai travaillé au sein de l'équipe Exploitation d'un MSP, aux côtés d'un administrateur systèmes confirmé"
    ],
    "es": [
      "Supervisé más de 550 equipos (sobremesa, portátiles, servidores) en varios sitios de clientes desde el panel de Datto RMM",
      "Revisé el estado de los parches, la cobertura antivirus y el inventario de software de los equipos gestionados",
      "Desplegué componentes de software (Malwarebytes) en remoto mediante Quick Jobs, sin desplazamiento",
      "Utilicé el acceso remoto Splashtop para asistir a los usuarios y resolver incidencias en sus equipos",
      "Trabajé en el equipo de Explotación de un MSP, junto a un administrador de sistemas sénior"
    ]
  },
  "workstation-mass-deployment": {
    "fr": [
      "J'ai effacé 64 Dell Optiplex avec Blancco (norme NIST 800-88) et les ai réimagés depuis une image Sysprep de référence",
      "J'ai déployé 200 portables Dell Latitude sans intervention (zero-touch) via Windows Autopilot et Dell ImageAssist",
      "J'ai limité le temps d'intervention par Latitude après installation à moins de 5 minutes",
      "J'ai produit un certificat d'effacement Blancco pour chaque appareil effacé",
      "J'ai configuré les profils de déploiement Intune, BitLocker, Defender et les anneaux de mise à jour"
    ],
    "es": [
      "Borré 64 Dell Optiplex con Blancco (norma NIST 800-88) y los reinstalé a partir de una imagen Sysprep de referencia",
      "Desplegué 200 portátiles Dell Latitude sin intervención (zero-touch) mediante Windows Autopilot y Dell ImageAssist",
      "Mantuve el tiempo de intervención por Latitude tras la instalación por debajo de 5 minutos",
      "Generé un certificado de borrado Blancco para cada equipo borrado",
      "Configuré los perfiles de despliegue de Intune, BitLocker, Defender y los anillos de actualización"
    ]
  },
  "it-ops-incident-management": {
    "fr": [
      "J'ai trié les tickets entrants dans Autotask (téléphone, e-mail, agent Datto RMM)",
      "J'ai diagnostiqué les incidents à distance via Datto RMM, sans intervention sur site",
      "J'ai résolu un faux positif Webroot par une exception d'URL créée depuis la console d'administration",
      "J'ai rétabli l'accès du client sans réinstaller ni reconfigurer Webroot",
      "J'ai documenté chaque résolution dans une saisie de temps Autotask, pour la facturation et la traçabilité"
    ],
    "es": [
      "Clasifiqué los tickets entrantes en Autotask (teléfono, correo, agente Datto RMM)",
      "Diagnostiqué las incidencias en remoto mediante Datto RMM, sin desplazamiento",
      "Resolví un falso positivo de Webroot con una excepción de URL creada desde la consola de administración",
      "Restablecí el acceso del cliente sin reinstalar ni reconfigurar Webroot",
      "Documenté cada resolución en un registro de tiempo de Autotask, para la facturación y la trazabilidad"
    ]
  },
  "it-ops-acronis-backup": {
    "fr": [
      "J'ai supervisé 105 appareils protégés répartis sur 5 plans de sauvegarde (VM, SQL, Exchange) dans Acronis Cyber Backup",
      "J'ai analysé 85 alertes (33 erreurs, 52 avertissements) et identifié leurs causes : disques pleins, serveurs hors ligne, plans corrompus, pannes réseau",
      "J'ai recréé les plans de sauvegarde corrompus avec une convention de nommage corrigée pour rétablir la continuité",
      "J'ai géré deux destinations NAS (10,5 Tio chacune) et un emplacement cloud (250 Gio) via Acronis",
      "J'ai utilisé Datto RMM et Splashtop pour accéder à distance aux serveurs du client pendant les investigations"
    ],
    "es": [
      "Supervisé 105 equipos protegidos repartidos en 5 planes de copia de seguridad (VM, SQL, Exchange) en Acronis Cyber Backup",
      "Analicé 85 alertas (33 errores, 52 avisos) e identifiqué sus causas: discos llenos, servidores desconectados, planes dañados, fallos de red",
      "Recreé los planes de copia dañados con una convención de nombres corregida para restablecer la continuidad",
      "Gestioné dos destinos NAS (10,5 TiB cada uno) y una ubicación en la nube (250 GiB) mediante Acronis",
      "Utilicé Datto RMM y Splashtop para acceder en remoto a los servidores del cliente durante las investigaciones"
    ]
  },
  "it-ops-network-security": {
    "fr": [
      "pfSense 2.6 déployé avec deux cartes réseau : WAN en pont sur un modem 4G, LAN sur VMnet8 (192.168.100.0/24)",
      "Alias IP (SRV, Client) et règles de pare-feu créés pour interdire aux serveurs l'accès direct à Internet",
      "Proxy transparent Squid installé et configuré avec le filtrage d'URL SquidGuard",
      "Autorité de certification interne auto-signée (Pfsense-CA) générée pour l'inspection HTTPS",
      "Contrôle du trafic validé : accès Internet des serveurs bloqué, clients LAN routés via le proxy"
    ],
    "es": [
      "pfSense 2.6 desplegado con dos tarjetas de red: WAN en puente con un módem 4G, LAN en VMnet8 (192.168.100.0/24)",
      "Alias IP (SRV, Client) y reglas de cortafuegos creados para impedir que los servidores accedan directamente a Internet",
      "Proxy transparente Squid instalado y configurado con el filtrado de URL de SquidGuard",
      "Autoridad de certificación interna autofirmada (Pfsense-CA) generada para la inspección HTTPS",
      "Control del tráfico validado: acceso a Internet de los servidores bloqueado, clientes LAN enrutados por el proxy"
    ]
  },
  "vulnerability-assessment-report": {
    "fr": [
      "Système de contrôles modulaires : scans réseau, configuration système et applications web",
      "Calcul automatique du score de base CVSS v3.1 pour chaque constat",
      "Résultats classés par risque : critique, élevé, moyen, faible, informatif",
      "Rapport HTML autonome avec CSS intégré, sans aucune dépendance externe",
      "Export JSON compatible avec les plateformes SIEM et de ticketing"
    ],
    "es": [
      "Sistema de comprobaciones modulares: análisis de red, de configuración del sistema y de aplicaciones web",
      "Cálculo automático de la puntuación base CVSS v3.1 para cada hallazgo",
      "Resultados ordenados por riesgo: crítico, alto, medio, bajo, informativo",
      "Informe HTML autónomo con CSS integrado, sin dependencias externas",
      "Exportación JSON compatible con plataformas SIEM y de ticketing"
    ]
  },
  "incident-response-tracker": {
    "fr": [
      "Cycle de vie imposé : new → triaged → investigating → contained → resolved → closed ; les transitions interdites sont rejetées en HTTP 409",
      "Délai SLA par sévérité : critique 4 h, haute 24 h, moyenne 72 h, basse 7 jours",
      "Piste d'audit complète : chaque changement de statut, commentaire et affectation est horodaté",
      "15 tests automatisés, dont des tests unitaires purs de la machine à états, sans dépendance à la base de données",
      "Vérifié en direct : une transition interdite new → resolved est bien rejetée avec un 409 et la liste des états autorisés"
    ],
    "es": [
      "Ciclo de vida impuesto: new → triaged → investigating → contained → resolved → closed; las transiciones no permitidas se rechazan con HTTP 409",
      "Plazo SLA por gravedad: crítica 4 h, alta 24 h, media 72 h, baja 7 días",
      "Registro de auditoría completo: cada cambio de estado, comentario y asignación queda con marca de tiempo",
      "15 pruebas automatizadas, incluidas pruebas unitarias puras de la máquina de estados, sin dependencia de la base de datos",
      "Verificado en directo: una transición no permitida new → resolved se rechaza con un 409 y la lista de estados permitidos"
    ]
  },
  "cve-watchlist": {
    "fr": [
      "Synchronisation en direct avec l'API REST publique NVD v2.0, sans données fictives",
      "Score de priorité transparent de 0 à 100 : score de base CVSS, exploitation connue (CISA KEV), vecteur d'attaque et fraîcheur",
      "Croisement avec le champ cisaExploitAdd de la NVD pour signaler les CVE activement exploitées et leurs échéances de correction",
      "13 tests automatisés, dont un client NVD entièrement simulé pour des exécutions de CI déterministes",
      "Vérifié en direct : 100 CVE réelles synchronisées, dont une RCE Spring Data notée 89/100"
    ],
    "es": [
      "Sincronización en directo con la API REST pública NVD v2.0, sin datos simulados",
      "Puntuación de prioridad transparente de 0 a 100: puntuación base CVSS, explotación conocida (CISA KEV), vector de ataque y antigüedad",
      "Cruce con el campo cisaExploitAdd de la NVD para señalar las CVE explotadas activamente y sus plazos de corrección",
      "13 pruebas automatizadas, incluido un cliente NVD totalmente simulado para ejecuciones de CI deterministas",
      "Verificado en directo: 100 CVE reales sincronizadas, entre ellas una RCE de Spring Data puntuada con 89/100"
    ]
  },
  "log-anomaly-detector": {
    "fr": [
      "Quatre règles de détection indépendantes : force brute, déplacement impossible, credential stuffing, accès hors horaires",
      "Déduplication des anomalies : une règle ne se redéclenche pas pour le même sujet dans sa fenêtre de temps",
      "Scénario de démonstration déterministe qui déclenche les quatre règles de façon reproductible, vérifié en direct, déduplication comprise",
      "20 tests automatisés : les 4 règles testées unitairement sur de simples dictionnaires d'événements, sans base de données ni horloge",
      "Génère des alertes en raisonnant sur des séquences d'événements, au lieu d'afficher des alertes existantes"
    ],
    "es": [
      "Cuatro reglas de detección independientes: fuerza bruta, viaje imposible, credential stuffing, acceso fuera de horario",
      "Deduplicación de anomalías: una regla no vuelve a dispararse para el mismo sujeto dentro de su ventana de tiempo",
      "Escenario de demostración determinista que dispara las cuatro reglas de forma reproducible, verificado en directo, deduplicación incluida",
      "20 pruebas automatizadas: las 4 reglas probadas unitariamente con simples diccionarios de eventos, sin base de datos ni reloj",
      "Genera alertas razonando sobre secuencias de eventos, en lugar de mostrar alertas ya existentes"
    ]
  },
  "risque360": {
    "fr": [
      "Modélisation des menaces STRIDE : un composant applicatif et une catégorie de menace deviennent un risque noté et suivi",
      "Risque fournisseur ou tiers noté par une heuristique transparente (niveau d'accès, état du questionnaire, incidents connus), toujours modifiable ensuite",
      "Le journal d'incidents recalibre la probabilité sur 12 mois glissants (3 à 5 incidents : +1, 6 et plus : +2) ; la valeur est proposée, jamais appliquée automatiquement",
      "La CLI Python reproduit exactement la logique de recalibrage (--recalibrer) et génère un rapport HTML",
      "6 tests pytest, dont un qui vérifie que l'aperçu du recalibrage ne modifie jamais le risque évalué"
    ],
    "es": [
      "Modelado de amenazas STRIDE: un componente de la aplicación y una categoría de amenaza se convierten en un riesgo puntuado y con seguimiento",
      "Riesgo de proveedores o terceros puntuado con una heurística transparente (nivel de acceso, estado del cuestionario, incidentes conocidos), siempre editable después",
      "El registro de incidentes recalibra la probabilidad en 12 meses móviles (de 3 a 5 incidentes: +1; 6 o más: +2); el valor se propone, nunca se aplica automáticamente",
      "La CLI en Python reproduce exactamente la lógica de recalibrado (--recalibrer) y genera un informe HTML",
      "6 pruebas pytest, incluida una que verifica que la vista previa del recalibrado nunca modifica el riesgo evaluado"
    ]
  },
  "avenir-telecom-lightning-app": {
    "fr": [
      "20 user stories chiffrées et priorisées (validation SIREN par webservice, devis DeviQo en temps réel en moins de 2 s, PDF et e-mail automatiques, purge RGPD)",
      "Cahier de tests de 20 classes de test et référentiel de bonnes pratiques Apex (bulkification, un trigger par objet, couverture ≥ 75 %)",
      "Backlog Kanban post-pilote : 3 évolutions, 3 corrections et 3 bugs issus du pilote simulé (E1-E3, C1-C3, B001-B003)"
    ],
    "es": [
      "20 user stories estimadas y priorizadas (validación del SIREN por webservice, presupuestos DeviQo en tiempo real en menos de 2 s, PDF y correo automáticos, purga RGPD)",
      "Plan de pruebas con 20 clases de prueba y catálogo de buenas prácticas Apex (bulkificación, un trigger por objeto, cobertura ≥ 75 %)",
      "Backlog Kanban posterior al piloto: 3 evoluciones, 3 correcciones y 3 bugs del piloto simulado (E1-E3, C1-C3, B001-B003)"
    ]
  },
  "digit-learning-salesforce-update": {
    "fr": [
      "Constat d'audit corrigé : un étudiant ne pouvait être lié qu'à une seule formation, résolu par un objet de jonction Formation Achetée (master-detail)",
      "Temps de traitement mesuré en Dev Org : affectation du mentor et inscription de plus de 30 min à 5 min par étudiant, gestion du catalogue de plus de 30 min à 15 min",
      "3 rapports livrés : places disponibles par formation, étudiants par statut et par mentor, taux de conversion prospect → client actif"
    ],
    "es": [
      "Hallazgo de auditoría corregido: un estudiante solo podía vincularse a una formación, resuelto con un objeto de unión Formación Comprada (master-detail)",
      "Tiempo de tratamiento medido en Dev Org: asignación de mentor e inscripción de más de 30 min a 5 min por estudiante, gestión del catálogo de más de 30 min a 15 min",
      "3 informes entregados: plazas disponibles por formación, estudiantes por estado y por mentor, tasa de conversión de prospecto a cliente activo"
    ]
  },
  "tours-for-life-salesforce-solution": {
    "fr": [
      "Modèle de données à 4 objets : Prospect (Lead), Voyageur (Person Account), objets Voyage et Voyage acheté distincts, Parc de bus lié à plusieurs voyages",
      "2 Flows déclenchés par enregistrement : décrément automatique des places disponibles et e-mail de confirmation au changement de statut du prospect",
      "Sécurité par rôles Nord/Sud avec règles de partage et OWD par objet (privé, public en lecture seule, contrôlé par le parent)"
    ],
    "es": [
      "Modelo de datos de 4 objetos: Prospecto (Lead), Viajero (Person Account), objetos Viaje y Viaje Comprado distintos, Flota de autobuses vinculada a varios viajes",
      "2 Flows desencadenados por registro: descuento automático de plazas disponibles y correo de confirmación al cambiar el estado del prospecto",
      "Seguridad por roles Norte/Sur con reglas de compartición y OWD por objeto (privado, público de solo lectura, controlado por el padre)"
    ]
  },
  "idemconnect-apex-backend": {
    "fr": [
      "3 règles métier (RG-01/02/03) implémentées selon un pattern trigger-handler strict, sans aucune logique dans le trigger",
      "Batch et Scheduler pour la relance mensuelle automatique des comptes inactifs, avec déduplication paramétrable",
      "23 tests unitaires, 100 % de réussite, 90 % de couverture globale, détail par classe documenté",
      "Sécurité appliquée partout : WITH SECURITY_ENFORCED, stripInaccessible et contrôles CRUD/FLS explicites là où la requête d'agrégat ne peut pas les couvrir"
    ],
    "es": [
      "3 reglas de negocio (RG-01/02/03) implementadas con un patrón trigger-handler estricto, sin ninguna lógica en el trigger",
      "Batch y Scheduler para la reactivación mensual automática de cuentas inactivas, con deduplicación configurable",
      "23 pruebas unitarias, 100 % superadas, 90 % de cobertura global, desglose por clase documentado",
      "Seguridad aplicada en todo el código: WITH SECURITY_ENFORCED, stripInaccessible y comprobaciones CRUD/FLS explícitas allí donde la consulta de agregación no puede cubrirlas"
    ]
  },
  "wirebright-visualforce-to-lightning": {
    "fr": [
      "Prototype LWC AccountOpportunitiesSearch (recherche dynamique d'opportunités) et classe Apex AccountOpportunitiesController",
      "Prototype de Quick Action Aura UpdateLeadStatus, en remplacement d'un bouton JavaScript incompatible avec Lightning",
      "Chiffrage détaillé (17 jours de développement) et matrice des risques par composant avec stratégies d'atténuation"
    ],
    "es": [
      "Prototipo LWC AccountOpportunitiesSearch (búsqueda dinámica de oportunidades) y clase Apex AccountOpportunitiesController",
      "Prototipo de Quick Action Aura UpdateLeadStatus, que sustituye un botón JavaScript incompatible con Lightning",
      "Estimación detallada (17 días de desarrollo) y matriz de riesgos por componente con estrategias de mitigación"
    ]
  },
  "ltp-apex-backend-prototype": {
    "fr": [
      "Architecture temps réel : webhook Apex REST (DeliveryWebhook), Platform Event, Queueable attentif aux limites (RefreshStatusQueueable) et LWC deliveryTracker",
      "Intégration batch : Talend et Bulk API v2, 500 000 lignes par heure, upsert sur External Id (Tracking_Number__c)",
      "Modèle de sécurité par zone : profil unique, rôles et règles de partage, FLS ciblée (Zone__c verrouillé, champs financiers masqués)",
      "Stratégie d'import de 2,1 M de comptes et 3,2 M de contacts, avec un ordre de dépendances validé sur 10 objets"
    ],
    "es": [
      "Arquitectura en tiempo real: webhook Apex REST (DeliveryWebhook), Platform Event, Queueable consciente de los límites (RefreshStatusQueueable) y LWC deliveryTracker",
      "Integración por lotes: Talend y Bulk API v2, 500 000 líneas por hora, upsert sobre External Id (Tracking_Number__c)",
      "Modelo de seguridad por zonas: perfil único, roles y reglas de compartición, FLS específica (Zone__c bloqueado, campos financieros ocultos)",
      "Estrategia de importación de 2,1 M de cuentas y 3,2 M de contactos, con un orden de dependencias validado en 10 objetos"
    ]
  },
  "fasha-apex-backend-optimization": {
    "fr": [
      "Bug diagnostiqué et corrigé : le trigger d'origine échouait dès qu'un compte dépassait 100 commandes (non bulk-safe)",
      "Second bug : le calcul du NetAmount fonctionnait depuis l'interface mais échouait silencieusement lors des imports en masse Data Loader",
      "Refactoring complet en pattern handler (AccountService, OrderTriggerHandler, TriggerHelper) et traitements asynchrones (@future, Batch, Scheduler)",
      "Couverture de tests supérieure à 85 % avec TestDataFactory, contre des tests peu fiables au départ"
    ],
    "es": [
      "Error diagnosticado y corregido: el trigger original fallaba en cuanto una cuenta superaba los 100 pedidos (no bulk-safe)",
      "Segundo error: el cálculo de NetAmount funcionaba desde la interfaz pero fallaba en silencio en las importaciones masivas con Data Loader",
      "Refactorización completa con patrón handler (AccountService, OrderTriggerHandler, TriggerHelper) y procesos asíncronos (@future, Batch, Scheduler)",
      "Cobertura de pruebas superior al 85 % con TestDataFactory, frente a pruebas poco fiables al inicio"
    ]
  },
  "legarant-axg-salesforce-deployment": {
    "fr": [
      "🔗 Preuve de croisement : développement Salesforce et infrastructure Heroku livrés ensemble, pas deux compétences séparées",
      "Sécurité : jetons OAuth à portée limitée, aucun secret dans le code, flux de données intra-UE conforme au RGPD",
      "Stratégie d'environnements (test → production) avec traçabilité",
      "Runbook de déploiement et checklist de validation",
      "Suite de validation d'API (Postman) pour la mise en production"
    ],
    "es": [
      "🔗 Prueba de cruce: desarrollo Salesforce e infraestructura Heroku entregados juntos, no dos competencias separadas",
      "Seguridad: tokens OAuth de alcance limitado, ningún secreto en el código, flujo de datos intra-UE conforme al RGPD",
      "Estrategia de entornos (prueba → producción) con trazabilidad",
      "Runbook de despliegue y checklist de validación",
      "Suite de validación de API (Postman) para la puesta en producción"
    ]
  },
  "cicd-pipeline-setup": {
    "fr": [
      "Stratégie de branches et promotions entre environnements",
      "Validations automatisées et déploiements SFDX",
      "Gestion des secrets et procédure de retour arrière"
    ],
    "es": [
      "Estrategia de ramas y promociones entre entornos",
      "Validaciones automatizadas y despliegues SFDX",
      "Gestión de secretos y procedimiento de vuelta atrás"
    ]
  },
  "nova-manufacturing-classic-to-lightning": {
    "fr": [
      "Sécurité durcie sur 4 classes Apex existantes et sécurité dès la conception sur 4 nouvelles classes : with sharing et stripInaccessible() systématiques sur les 8",
      "8 profils quasi identiques consolidés en 5 Permission Set Groups",
      "Migration complète Visualforce / boutons JavaScript / Process Builder vers LWC et Flow, testée en masse sur plus de 200 enregistrements"
    ],
    "es": [
      "Seguridad reforzada en 4 clases Apex existentes y seguridad desde el diseño en 4 clases nuevas: with sharing y stripInaccessible() sistemáticos en las 8",
      "8 perfiles casi idénticos consolidados en 5 Permission Set Groups",
      "Migración completa de Visualforce, botones JavaScript y Process Builder a LWC y Flow, probada en masa con más de 200 registros"
    ]
  }
};
