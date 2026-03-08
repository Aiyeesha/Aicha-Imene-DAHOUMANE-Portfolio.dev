-- supabase/seed-network-security-project.sql
-- -----------------------------------------------------------
-- Case study n°5 — IT Ops
-- "Securing Internet Access with pfSense + Squid"
-- pfSense 2.6.0, Squid, SquidGuard, LightSquid, firewall rules
-- Training lab — continuation of virtualization-lab (case study n°4)
-- -----------------------------------------------------------

-- ── EN ───────────────────────────────────────────────────────────────────────
INSERT INTO projects (
  slug, locale, title, summary,
  track, categories, tags,
  badge,
  highlights,
  featured, sort_order, status,
  repo_url, live_url,
  content
)
VALUES (
  'it-ops-network-security',
  'en',
  'Securing Internet Access with pfSense & Squid',
  'Extended the virtualized lab (case study n°4) by deploying a pfSense 2.6 firewall as the network gateway, integrating Squid transparent proxy, SquidGuard URL filtering, and LightSquid reporting — with custom firewall rules and aliases to control traffic between the AD domain servers and the internet.',
  'itops',
  ARRAY['IT Ops', 'Network', 'Security'],
  ARRAY['pfSense', 'Squid', 'Firewall', 'Routing', 'Security'],
  '{"tone": "training", "label": "TRAINING LAB"}',
  ARRAY[
    'Deployed pfSense 2.6 with dual NIC: WAN bridged to 4G modem, LAN on VMnet8 (192.168.100.0/24)',
    'Created IP aliases (SRV, Client) and firewall rules blocking servers from direct internet access',
    'Installed and configured Squid transparent proxy with SquidGuard URL filtering',
    'Generated a self-signed internal CA (Pfsense-CA) for HTTPS inspection',
    'Validated traffic control: server-to-internet blocked, LAN clients routed through proxy'
  ],
  false,
  50,
  'published',
  NULL,
  NULL,
  'Continuation of the virtualized lab environment: added a pfSense 2.6.0 firewall VM as the default gateway for the 192.168.100.0/24 LAN, configured Squid + SquidGuard for web filtering, and enforced custom firewall rules to restrict server internet access.'
)
ON CONFLICT (slug, locale) DO NOTHING;

-- ── FR ───────────────────────────────────────────────────────────────────────
INSERT INTO projects (
  slug, locale, title, summary,
  track, categories, tags,
  badge,
  highlights,
  featured, sort_order, status,
  repo_url, live_url,
  content
)
VALUES (
  'it-ops-network-security',
  'fr',
  'Sécuriser les accès à Internet avec pfSense & Squid',
  'Extension du lab virtualisé (étude de cas n°4) : déploiement d''un pare-feu pfSense 2.6 en tant que passerelle réseau, intégration du proxy transparent Squid, du filtrage URL SquidGuard et des rapports LightSquid — avec règles et alias personnalisés pour contrôler le trafic entre les serveurs du domaine AD et Internet.',
  'itops',
  ARRAY['IT Ops', 'Network', 'Security'],
  ARRAY['pfSense', 'Squid', 'Firewall', 'Routing', 'Security'],
  '{"tone": "training", "label": "TRAINING LAB"}',
  ARRAY[
    'Déploiement de pfSense 2.6 avec double carte réseau : WAN en bridge sur clé 4G, LAN sur VMnet8 (192.168.100.0/24)',
    'Création d''alias IP (SRV, Client) et règles de pare-feu bloquant l''accès Internet direct des serveurs',
    'Installation et configuration du proxy transparent Squid avec filtrage URL SquidGuard',
    'Génération d''une CA interne auto-signée (Pfsense-CA) pour l''inspection HTTPS',
    'Validation du contrôle du trafic : accès Internet bloqué pour les serveurs, clients LAN routés via le proxy'
  ],
  false,
  50,
  'published',
  NULL,
  NULL,
  'Suite du lab virtualisé : ajout d''une VM pfSense 2.6.0 comme passerelle par défaut du LAN 192.168.100.0/24, configuration de Squid + SquidGuard pour le filtrage web, et application de règles de pare-feu restreignant l''accès Internet des serveurs.'
)
ON CONFLICT (slug, locale) DO NOTHING;
