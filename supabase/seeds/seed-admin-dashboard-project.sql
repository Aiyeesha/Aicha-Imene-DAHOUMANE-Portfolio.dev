-- supabase/seed-admin-dashboard-project.sql
-- ------------------------------------------
-- Insère le projet "Admin Dashboard" dans la table projects.
-- À exécuter dans l'éditeur SQL Supabase (dashboard → SQL Editor).
--
-- Deux lignes : une par locale (en + fr).
-- La colonne locale n'accepte que 'en' | 'fr' (check constraint).
-- Idempotent : ON CONFLICT DO NOTHING évite les doublons si rejoué.

-- ── Version EN ───────────────────────────────────────────────────────────────

INSERT INTO projects (
  slug, locale, title, summary, content,
  tech_stack, repo_url, live_url,
  track, categories, tags, badge, highlights,
  featured, sort_order, status
)
VALUES (
  'nextjs-admin-dashboard',
  'en',
  'Admin Dashboard — Next.js 16 + Supabase',
  'Secure admin dashboard protected by HTTP Basic Auth, powered by a Supabase service_role client. Visualize projects, contact messages, certifications and testimonials — no extra dependencies.',
  'Full-stack admin dashboard built with Next.js 16 App Router and Supabase. Protected by HTTP Basic Auth at the proxy level (Edge runtime — atob, no Buffer). service_role client to read private tables (contact messages inaccessible to the anon role). 100% server-rendered (Server Components), zero client JavaScript. Stat cards, project table with status/track/featured, contact messages with clickable email, certifications table, testimonial counters.',
  ARRAY['Next.js 16', 'Supabase', 'TypeScript', 'Tailwind CSS', 'HTTP Basic Auth', 'Edge Runtime'],
  'https://github.com/Aiyeesha/Aicha-Imene-DAHOUMANE-Portfolio.dev',
  NULL,
  'itops',
  ARRAY['Web', 'Admin', 'Dashboard'],
  ARRAY['Next.js', 'Supabase', 'Dashboard', 'Security', 'Web'],
  NULL,
  ARRAY[
    'HTTP Basic Auth on Edge runtime (atob — no Buffer)',
    'Supabase service_role client — server-side only',
    'Reads private contact messages (RLS bypassed server-side)',
    '100% Server Components — zero client JS',
    'robots: index: false — never indexed by search engines'
  ],
  false,
  90,
  'published'
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
  'nextjs-admin-dashboard',
  'fr',
  'Admin Dashboard — Next.js 16 + Supabase',
  'Tableau de bord admin sécurisé par HTTP Basic Auth, alimenté par un client Supabase service_role. Visualisation des projets, messages de contact, certifications et témoignages — sans dépendance supplémentaire.',
  'Dashboard admin full-stack construit avec Next.js 16 App Router et Supabase. Protégé par HTTP Basic Auth au niveau du proxy (Edge runtime — atob, sans Buffer). Client service_role pour lire les tables privées (messages de contact inaccessibles au rôle anon). Rendu 100% serveur (Server Components), aucun JS client. Stat cards, table de projets avec statut/track/featured, messages de contact avec email cliquable, table de certifications, compteurs de témoignages.',
  ARRAY['Next.js 16', 'Supabase', 'TypeScript', 'Tailwind CSS', 'HTTP Basic Auth', 'Edge Runtime'],
  'https://github.com/Aiyeesha/Aicha-Imene-DAHOUMANE-Portfolio.dev',
  NULL,
  'itops',
  ARRAY['Web', 'Admin', 'Dashboard'],
  ARRAY['Next.js', 'Supabase', 'Dashboard', 'Sécurité', 'Web'],
  NULL,
  ARRAY[
    'HTTP Basic Auth sur Edge runtime (atob — sans Buffer)',
    'Client Supabase service_role côté serveur uniquement',
    'Lecture des messages de contact privés (RLS contourné serveur-side)',
    'Rendu 100% Server Components — zéro JS client',
    'robots: index: false — jamais référencé par les moteurs de recherche'
  ],
  false,
  90,
  'published'
)
ON CONFLICT (slug, locale) DO NOTHING;
