-- supabase/seeds/seed-incident-dashboard-project.sql
-- ----------------------------------------------------
-- Insère le projet "Incident Management Dashboard" dans la table projects.
-- Outil admin réel (/admin/incidents) qui opérationnalise les playbooks
-- publiés dans github.com/Aiyeesha/playbook-reponse-incidents.
--
-- À exécuter dans l'éditeur SQL Supabase (dashboard → SQL Editor) ou via
-- l'outil MCP Supabase execute_sql.
-- status = 'draft' tant que la PR feat/incident-management-dashboard n'est
-- pas mergée et déployée — repasser à 'published' ensuite (toggle possible
-- directement depuis /admin, ou UPDATE ... SET status = 'published').
-- Idempotent : ON CONFLICT DO NOTHING évite les doublons si rejoué.

-- ── Version EN ───────────────────────────────────────────────────────────────

INSERT INTO projects (
  slug, locale, title, summary, content,
  tech_stack, repo_url, live_url,
  track, categories, tags, badge, highlights,
  featured, sort_order, status
)
VALUES (
  'incident-management-dashboard',
  'en',
  'Incident Management Dashboard — Next.js, Supabase & TypeScript',
  'Admin-only tool that turns a written incident-response playbook into an operational workflow: create an incident by type, get an auto-generated response checklist grouped by phase, track completion and status in real time.',
  'Built as a follow-up to the incident-response-playbook project (github.com/Aiyeesha/playbook-reponse-incidents): 6 written procedures (malware, ransomware, data breach, phishing, unauthorized access, DoS/DDoS) covering detection, containment, eradication, recovery, and post-incident review. This dashboard operationalizes that content — creating an incident of a given type auto-generates its response checklist from the same procedures, grouped by phase, with interactive completion tracking and status changes (open → investigating → contained → resolved → closed). Built inside the existing portfolio-next codebase as a new /admin/incidents section: two new Postgres tables with RLS locked down to deny-all (service_role only, same model as the rest of /admin), Server Actions re-guarded server-side (defense in depth beyond the HTTP Basic Auth middleware), and pure progress/grouping logic kept dependency-free so it stays unit-testable.',
  ARRAY['Next.js 16', 'Supabase', 'PostgreSQL', 'TypeScript', 'Server Actions', 'Row Level Security'],
  'https://github.com/Aiyeesha/playbook-reponse-incidents',
  NULL,
  'itops',
  ARRAY['IT Ops', 'Incident Management', 'Security'],
  ARRAY['Next.js', 'Supabase', 'TypeScript', 'PostgreSQL', 'Security', 'Dashboard'],
  '{"tone": "professional", "label": "TOOL"}',
  ARRAY[
    'Auto-generates a phase-grouped response checklist from a real incident-response playbook',
    'New Postgres tables with RLS deny-all — service_role access only, same pattern as the rest of /admin',
    'Server Actions re-check Basic Auth server-side, in addition to the existing middleware guard',
    'Pure progress/grouping functions kept free of server-only imports — unit-tested without mocks',
    'Covers all 6 incident types from the companion playbook repo: malware, ransomware, data breach, phishing, unauthorized access, DoS/DDoS'
  ],
  false,
  85,
  'draft'
)
ON CONFLICT (slug, locale) DO NOTHING;

-- ── Version FR ───────────────────────────────────────────────────────────────

INSERT INTO projects (
  slug, locale, title, summary, content,
  tech_stack, repo_url, live_url,
  track, categories, tags, badge, highlights,
  featured, sort_order, status
)
VALUES (
  'incident-management-dashboard',
  'fr',
  'Dashboard de gestion d''incidents — Next.js, Supabase & TypeScript',
  'Outil admin qui transforme un playbook de réponse à incident écrit en workflow opérationnel : créer un incident par type, obtenir une checklist de réponse générée automatiquement et regroupée par phase, suivre la progression et le statut en temps réel.',
  'Construit en prolongement du projet incident-response-playbook (github.com/Aiyeesha/playbook-reponse-incidents) : 6 procédures rédigées (malware, ransomware, fuite de données, hameçonnage, accès non autorisé, déni de service) couvrant détection, confinement, éradication, récupération et retour d''expérience. Ce dashboard opérationnalise ce contenu — créer un incident d''un type donné génère automatiquement sa checklist de réponse depuis ces mêmes procédures, regroupée par phase, avec suivi interactif de la progression et changements de statut (ouvert → en investigation → confiné → résolu → clôturé). Construit dans la codebase existante de portfolio-next comme nouvelle section /admin/incidents : deux nouvelles tables Postgres avec RLS verrouillée en deny-all (service_role uniquement, même modèle que le reste de /admin), Server Actions re-vérifiées côté serveur (défense en profondeur au-delà du middleware HTTP Basic Auth), et logique pure de progression/regroupement gardée sans dépendance pour rester testable unitairement.',
  ARRAY['Next.js 16', 'Supabase', 'PostgreSQL', 'TypeScript', 'Server Actions', 'Row Level Security'],
  'https://github.com/Aiyeesha/playbook-reponse-incidents',
  NULL,
  'itops',
  ARRAY['IT Ops', 'Gestion des incidents', 'Sécurité'],
  ARRAY['Next.js', 'Supabase', 'TypeScript', 'PostgreSQL', 'Sécurité', 'Dashboard'],
  '{"tone": "professional", "label": "OUTIL"}',
  ARRAY[
    'Génère automatiquement une checklist de réponse regroupée par phase depuis un vrai playbook de réponse à incident',
    'Nouvelles tables Postgres avec RLS deny-all — accès service_role uniquement, même modèle que le reste de /admin',
    'Les Server Actions revérifient le Basic Auth côté serveur, en plus du garde-fou du middleware existant',
    'Fonctions pures de progression/regroupement sans import server-only — testées unitairement sans mock',
    'Couvre les 6 types d''incident du dépôt playbook associé : malware, ransomware, fuite de données, hameçonnage, accès non autorisé, déni de service'
  ],
  false,
  85,
  'draft'
)
ON CONFLICT (slug, locale) DO NOTHING;
