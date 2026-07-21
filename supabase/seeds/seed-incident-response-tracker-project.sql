-- supabase/seeds/seed-incident-response-tracker-project.sql
-- -----------------------------------------------------------
-- Incident Response Tracker — SOC ticketing workflow enforcing
-- a state-machine lifecycle and a per-severity SLA clock.
-- Repo: https://github.com/Aiyeesha/incident-response-tracker
--
-- NOTE: distinct from the pre-existing "incident-response-playbook"
-- draft entry (a Markdown IR-playbook documentation project) — this
-- is a separate, working FastAPI + React application.
-- Already applied directly to production via the Supabase MCP on
-- 2026-07-21; this file exists for repo parity / audit trail.
-- -----------------------------------------------------------

-- ── EN ───────────────────────────────────────────────────────────────────────
INSERT INTO projects (slug, locale, title, summary, content, tech_stack, repo_url, live_url, track, categories, tags, badge, highlights, featured, sort_order, status)
VALUES (
  'incident-response-tracker', 'en',
  'Incident Response Tracker — SOC Ticketing Workflow',
  'Ticketing workflow for security incidents enforcing a strict lifecycle via a state machine, a per-severity SLA clock, and a timestamped audit trail of every status change, comment, and assignment.',
  'FastAPI backend where the workflow rules live in a pure, unit-tested state_machine module: legal transitions (new → triaged → investigating → contained → resolved → closed, with direct-to-closed and reopening support) and per-severity SLA targets (critical 4h, high 24h, medium 72h, low 7 days) are plain functions with no I/O. Illegal transitions are rejected with an explicit HTTP 409 listing the allowed next states. Every status change, comment, and assignment is appended to a per-incident audit timeline. React/TypeScript dashboard with a master-detail view. Verified live: an illegal new→resolved transition correctly rejected with a 409, valid transitions correctly recorded on the timeline.',
  ARRAY['Python','FastAPI','SQLAlchemy','React','TypeScript','Vite','SQLite','Docker','Pytest'],
  'https://github.com/Aiyeesha/incident-response-tracker', NULL,
  'itops', ARRAY['Security','Incident Response'], ARRAY['State Machine','SLA','FastAPI','React','Audit Trail'],
  '{"tone":"personal","label":"PERSONAL PROJECT"}'::jsonb,
  ARRAY[
    'Enforced lifecycle: new → triaged → investigating → contained → resolved → closed, illegal transitions rejected with HTTP 409',
    'Per-severity SLA clock: critical 4h, high 24h, medium 72h, low 7 days',
    'Full audit trail — every status change, comment, and assignment timestamped',
    '15 automated tests, including pure unit tests of the state machine with zero database dependency',
    'Verified live: an illegal new→resolved transition correctly rejected with a 409 and the allowed-states list'
  ],
  false, 261, 'published'
) ON CONFLICT (slug, locale) DO NOTHING;

-- ── FR ───────────────────────────────────────────────────────────────────────
INSERT INTO projects (slug, locale, title, summary, content, tech_stack, repo_url, live_url, track, categories, tags, badge, highlights, featured, sort_order, status)
VALUES (
  'incident-response-tracker', 'fr',
  'Incident Response Tracker — Workflow de ticketing SOC',
  'Workflow de ticketing pour les incidents de sécurité imposant un cycle de vie strict via une machine à états, une horloge SLA par sévérité, et un journal d''audit horodaté de chaque changement de statut, commentaire et assignation.',
  'Backend FastAPI où les règles du workflow vivent dans un module state_machine pur et testé unitairement : les transitions légales (nouveau → trié → en investigation → contenu → résolu → clôturé, avec clôture directe et réouverture possibles) et les cibles SLA par sévérité (critique 4h, élevée 24h, moyenne 72h, faible 7 jours) sont de simples fonctions sans I/O. Les transitions illégales sont rejetées avec un code 409 explicite listant les états suivants autorisés. Chaque changement de statut, commentaire et assignation est ajouté à une chronologie d''audit par incident. Tableau de bord React/TypeScript avec vue maître-détail. Vérifié en direct : une transition illégale new→resolved correctement rejetée avec un 409, les transitions valides correctement enregistrées dans la chronologie.',
  ARRAY['Python','FastAPI','SQLAlchemy','React','TypeScript','Vite','SQLite','Docker','Pytest'],
  'https://github.com/Aiyeesha/incident-response-tracker', NULL,
  'itops', ARRAY['Security','Incident Response'], ARRAY['Machine à états','SLA','FastAPI','React','Journal d''audit'],
  '{"tone":"personal","label":"PERSONAL PROJECT"}'::jsonb,
  ARRAY[
    'Cycle de vie imposé : nouveau → trié → en investigation → contenu → résolu → clôturé, transitions illégales rejetées avec un 409',
    'Horloge SLA par sévérité : critique 4h, élevée 24h, moyenne 72h, faible 7 jours',
    'Journal d''audit complet — chaque changement de statut, commentaire et assignation horodaté',
    '15 tests automatisés, dont des tests unitaires purs de la machine à états sans aucune dépendance base de données',
    'Vérifié en direct : une transition illégale new→resolved correctement rejetée avec un 409 et la liste des états autorisés'
  ],
  false, 261, 'published'
) ON CONFLICT (slug, locale) DO NOTHING;

-- ── ES ───────────────────────────────────────────────────────────────────────
INSERT INTO projects (slug, locale, title, summary, content, tech_stack, repo_url, live_url, track, categories, tags, badge, highlights, featured, sort_order, status)
VALUES (
  'incident-response-tracker', 'es',
  'Incident Response Tracker — Flujo de tickets SOC',
  'Flujo de trabajo de tickets para incidentes de seguridad que impone un ciclo de vida estricto mediante una máquina de estados, un reloj SLA por severidad, y un registro de auditoría con marca de tiempo de cada cambio de estado, comentario y asignación.',
  'Backend FastAPI donde las reglas del flujo de trabajo residen en un módulo state_machine puro y probado unitariamente: las transiciones legales (nuevo → clasificado → en investigación → contenido → resuelto → cerrado, con cierre directo y reapertura posibles) y los objetivos SLA por severidad (crítica 4h, alta 24h, media 72h, baja 7 días) son funciones simples sin I/O. Las transiciones ilegales se rechazan con un HTTP 409 explícito que lista los estados siguientes permitidos. Cada cambio de estado, comentario y asignación se añade a una cronología de auditoría por incidente. Dashboard React/TypeScript con vista maestro-detalle. Verificado en vivo: una transición ilegal new→resolved correctamente rechazada con un 409, transiciones válidas correctamente registradas en la cronología.',
  ARRAY['Python','FastAPI','SQLAlchemy','React','TypeScript','Vite','SQLite','Docker','Pytest'],
  'https://github.com/Aiyeesha/incident-response-tracker', NULL,
  'itops', ARRAY['Security','Incident Response'], ARRAY['State Machine','SLA','FastAPI','React','Audit Trail'],
  '{"tone":"personal","label":"PERSONAL PROJECT"}'::jsonb,
  ARRAY[
    'Ciclo de vida impuesto: nuevo → clasificado → en investigación → contenido → resuelto → cerrado, transiciones ilegales rechazadas con HTTP 409',
    'Reloj SLA por severidad: crítica 4h, alta 24h, media 72h, baja 7 días',
    'Registro de auditoría completo — cada cambio de estado, comentario y asignación con marca de tiempo',
    '15 pruebas automatizadas, incluyendo pruebas unitarias puras de la máquina de estados sin ninguna dependencia de base de datos',
    'Verificado en vivo: una transición ilegal new→resolved correctamente rechazada con un 409 y la lista de estados permitidos'
  ],
  false, 261, 'published'
) ON CONFLICT (slug, locale) DO NOTHING;
