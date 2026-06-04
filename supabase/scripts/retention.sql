-- supabase/retention.sql
-- ----------------------
-- Documentation de la politique de rétention des données RGPD.
--
-- La suppression effective est effectuée automatiquement par le Cron Vercel
-- (app/api/cron/ping/route.ts, toutes les 5 minutes) via le service_role.
--
-- Ce fichier est fourni à titre de référence et peut être exécuté
-- manuellement via le Supabase SQL Editor pour nettoyer les données
-- en dehors du cycle cron (ex : après incident, audit, demande RGPD).
--
-- Rétentions :
--   uptime_pings  — 30 jours  (données techniques internes, non personnelles)
--   messages      — 90 jours  (données personnelles : nom, email, contenu du message)
--
-- Note : la suppression via cron est idempotente et non bloquante.
--        Les erreurs sont loguées en warning mais ne font pas échouer le ping.

-- ── Purge manuelle uptime_pings > 30 jours ───────────────────────────────────
DELETE FROM uptime_pings
WHERE checked_at < NOW() - INTERVAL '30 days';

-- ── Purge manuelle messages > 90 jours (RGPD) ────────────────────────────────
DELETE FROM messages
WHERE created_at < NOW() - INTERVAL '90 days';
