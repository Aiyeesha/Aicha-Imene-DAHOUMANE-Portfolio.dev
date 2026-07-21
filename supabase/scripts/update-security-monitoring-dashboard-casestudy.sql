-- supabase/scripts/update-security-monitoring-dashboard-casestudy.sql
-- ------------------------------------------------------------------
-- Refreshes the existing "security-monitoring-dashboard" draft entry
-- (en + fr) to reflect the backend restructure (SQLite persistence,
-- API-key auth, Pytest suite) and publishes it.
-- Already applied directly to production via the Supabase MCP on
-- 2026-07-21; this file exists for repo parity / audit trail.

-- ── EN ───────────────────────────────────────────────────────────────────────
UPDATE projects SET
  title = 'Security Monitoring Dashboard (FastAPI + React)',
  summary = 'Full-stack security monitoring dashboard built with FastAPI and React/TypeScript. Streams security events in real time via WebSocket, classifies alerts by severity, and tracks MTTR — now with SQLite persistence, API-key-protected ingestion, and a Pytest test suite.',
  content = 'Layered FastAPI backend (routers / service layer / SQLAlchemy persistence) replacing an earlier flat-file version. Events are stored in SQLite instead of memory, write endpoints require an API key, and a Pytest suite covers the event and metrics endpoints end to end. React/TypeScript frontend with a custom WebSocket hook for live updates. Deployable via Docker Compose. First project in a 4-project security portfolio; the architectural template the other three build on.',
  tech_stack = ARRAY['Python','FastAPI','SQLAlchemy','SQLite','React','TypeScript','WebSocket','Vite','Docker','Pytest'],
  categories = ARRAY['Security','Monitoring'],
  tags = ARRAY['FastAPI','React','WebSocket','SQLite','Pytest'],
  badge = '{"tone":"personal","label":"PERSONAL PROJECT"}'::jsonb,
  highlights = ARRAY[
    'Real-time security event streaming via WebSocket',
    'Alert severity classification: Critical / High / Medium / Low / Info',
    'SQLite persistence + API-key-protected ingestion (added in a backend restructure)',
    'Pytest suite covering events and metrics endpoints',
    'Dark-theme responsive UI — one-command Docker Compose deployment'
  ],
  status = 'published'
WHERE slug = 'security-monitoring-dashboard' AND locale = 'en';

-- ── FR ───────────────────────────────────────────────────────────────────────
UPDATE projects SET
  title = 'Dashboard de surveillance sécurité (FastAPI + React)',
  summary = 'Dashboard de surveillance sécurité full-stack construit avec FastAPI et React/TypeScript. Diffuse les événements de sécurité en temps réel via WebSocket, classe les alertes par sévérité et suit le MTTR — désormais avec persistance SQLite, ingestion protégée par clé API et une suite de tests Pytest.',
  content = 'Backend FastAPI en couches (routers / couche service / persistance SQLAlchemy) remplaçant une version antérieure en fichier unique. Les événements sont stockés en SQLite plutôt qu''en mémoire, les endpoints d''écriture nécessitent une clé API, et une suite Pytest couvre les endpoints events et metrics de bout en bout. Frontend React/TypeScript avec un hook WebSocket personnalisé pour les mises à jour en direct. Déployable via Docker Compose. Premier projet d''un portfolio sécurité de 4 projets ; le gabarit architectural repris par les 3 autres.',
  tech_stack = ARRAY['Python','FastAPI','SQLAlchemy','SQLite','React','TypeScript','WebSocket','Vite','Docker','Pytest'],
  categories = ARRAY['Security','Monitoring'],
  tags = ARRAY['FastAPI','React','WebSocket','SQLite','Pytest'],
  badge = '{"tone":"personal","label":"PERSONAL PROJECT"}'::jsonb,
  highlights = ARRAY[
    'Streaming temps réel d''événements de sécurité via WebSocket',
    'Classification des alertes par sévérité : Critique / Élevé / Moyen / Faible / Info',
    'Persistance SQLite + ingestion protégée par clé API (ajoutées lors d''une restructuration du backend)',
    'Suite Pytest couvrant les endpoints events et metrics',
    'Interface dark-theme responsive — déploiement en une commande via Docker Compose'
  ],
  status = 'published'
WHERE slug = 'security-monitoring-dashboard' AND locale = 'fr';

-- ── ES ───────────────────────────────────────────────────────────────────────
-- The existing ES row described an unrelated generic concept ("KPI widgets
-- for patch status" etc.) — aligned here with what was actually built.
UPDATE projects SET
  title = 'Dashboard de supervisión de seguridad (FastAPI + React)',
  summary = 'Dashboard de supervisión de seguridad full-stack construido con FastAPI y React/TypeScript. Transmite eventos de seguridad en tiempo real vía WebSocket, clasifica las alertas por severidad y realiza el seguimiento del MTTR — ahora con persistencia SQLite, ingesta protegida por clave API y una suite de pruebas Pytest.',
  content = 'Backend FastAPI en capas (routers / capa de servicio / persistencia SQLAlchemy) que sustituye una versión anterior en un único archivo. Los eventos se almacenan en SQLite en lugar de en memoria, los endpoints de escritura requieren una clave API, y una suite Pytest cubre los endpoints de eventos y métricas de extremo a extremo. Frontend React/TypeScript con un hook de WebSocket personalizado para actualizaciones en vivo. Desplegable con Docker Compose. Primer proyecto de un portafolio de seguridad de 4 proyectos; la plantilla arquitectónica que siguen los otros tres.',
  tech_stack = ARRAY['Python','FastAPI','SQLAlchemy','SQLite','React','TypeScript','WebSocket','Vite','Docker','Pytest'],
  categories = ARRAY['Security','Monitoring'],
  tags = ARRAY['FastAPI','React','WebSocket','SQLite','Pytest'],
  badge = '{"tone":"personal","label":"PERSONAL PROJECT"}'::jsonb,
  highlights = ARRAY[
    'Transmisión en tiempo real de eventos de seguridad vía WebSocket',
    'Clasificación de alertas por severidad: Crítica / Alta / Media / Baja / Info',
    'Persistencia SQLite + ingesta protegida por clave API (añadidas en una reestructuración del backend)',
    'Suite Pytest que cubre los endpoints de eventos y métricas',
    'Interfaz responsive con tema oscuro — despliegue en un solo comando con Docker Compose'
  ],
  status = 'published'
WHERE slug = 'security-monitoring-dashboard' AND locale = 'es';
