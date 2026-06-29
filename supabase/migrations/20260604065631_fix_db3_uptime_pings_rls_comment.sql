
-- DB-3 : uptime_pings — RLS activée, aucune policy → accès refusé pour anon/authenticated.
-- Seul le service_role (qui bypass RLS) peut lire/écrire cette table.
-- Ce COMMENT documente l'intention explicitement pour éviter toute confusion future.
COMMENT ON TABLE public.uptime_pings IS
  'RLS activée sans policy = deny-all pour anon et authenticated. '
  'Accès réservé au service_role (bypass RLS). '
  'Écrit par /api/cron/ping (Vercel Cron, service_role). '
  'Lu par lib/uptime.ts via createAdminSupabaseClient() (service_role).';
