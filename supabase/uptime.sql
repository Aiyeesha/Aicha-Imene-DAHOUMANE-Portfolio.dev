-- supabase/uptime.sql
-- -------------------
-- Table de stockage des résultats de ping par service (uptime monitoring).
-- Alimentée toutes les 5 minutes par le cron /api/cron/ping.
-- Fenêtre glissante de 30 jours — purge automatique à chaque invocation du cron.
--
-- Idempotent : peut être relancé sans danger.
-- ──────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS uptime_pings (
  -- BIGSERIAL plus efficace que UUID pour une table append-only à haute fréquence
  id          BIGSERIAL   PRIMARY KEY,
  service     TEXT        NOT NULL,
  status      TEXT        NOT NULL
              CHECK (status IN ('operational', 'degraded', 'outage')),
  latency_ms  INTEGER,              -- null si non mesurable (service statique)
  checked_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index composite pour la requête de calcul d'uptime (filtre service + période)
CREATE INDEX IF NOT EXISTS idx_uptime_pings_service_checked
  ON uptime_pings (service, checked_at DESC);

-- ── Row Level Security ────────────────────────────────────────────────────────

ALTER TABLE uptime_pings ENABLE ROW LEVEL SECURITY;

-- Lecture publique (stats agrégées, pas de données sensibles)
DROP POLICY IF EXISTS "anon can read uptime pings" ON uptime_pings;
CREATE POLICY "anon can read uptime pings"
  ON uptime_pings FOR SELECT TO anon USING (true);

-- INSERT réservé au service_role (cron) — anon ne peut pas insérer
-- (pas de politique INSERT pour anon)
