-- supabase/goals-2026.sql
-- -----------------------
-- Table des objectifs 2026 avec indicateurs de statut.
-- Mise à jour manuelle via le dashboard Supabase (colonne "status").
--
-- Statuts disponibles :
--   'not_started' → cercle vide gris (pas encore commencé)
--   'in_progress' → demi-rempli cyan (en cours)
--   'completed'   → check vert (atteint)
--
-- RLS : lecture publique (anon), écriture admin uniquement.
-- ──────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS goals_2026 (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  track      TEXT        NOT NULL CHECK (track IN ('salesforce', 'itops')),
  text_en    TEXT        NOT NULL,
  text_fr    TEXT        NOT NULL,
  status     TEXT        NOT NULL DEFAULT 'not_started'
             CHECK (status IN ('not_started', 'in_progress', 'completed')),
  sort_order INTEGER     NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_goals_2026_track ON goals_2026 (track, sort_order);

-- ── Trigger updated_at ──────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_goals_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_goals_updated_at ON goals_2026;
CREATE TRIGGER set_goals_updated_at
  BEFORE UPDATE ON goals_2026
  FOR EACH ROW EXECUTE FUNCTION update_goals_updated_at();

-- ── RLS ────────────────────────────────────────────────────────────────────

ALTER TABLE goals_2026 ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon can read goals" ON goals_2026;
CREATE POLICY "anon can read goals"
  ON goals_2026 FOR SELECT TO anon USING (true);

-- ── Données initiales — Salesforce ────────────────────────────────────────
-- status initial : 'not_started' — à modifier via le dashboard Supabase

INSERT INTO goals_2026 (track, text_en, text_fr, status, sort_order) VALUES
('salesforce',
 'Grow an international freelance practice with Salesforce clients in Europe and North America',
 'Développer une activité freelance internationale avec des clients Salesforce en Europe et Amérique du Nord',
 'in_progress', 1),

('salesforce',
 'Earn the Salesforce Platform Developer II certification',
 'Obtenir la certification Salesforce Platform Developer II',
 'in_progress', 2),

('salesforce',
 'Contribute to Salesforce open-source projects (AppExchange packages, DevOps tooling)',
 'Contribuer à des projets Salesforce open source (packages AppExchange, outils DevOps)',
 'not_started', 3),

('salesforce',
 'Publish technical articles regularly on the blog and Medium',
 'Publier régulièrement des articles techniques sur le blog et Medium',
 'in_progress', 4),

('salesforce',
 'Attend Salesforce events (Dreamin'', TrailheaDX) to grow the professional network',
 'Participer à des événements Salesforce (Dreamin'', TrailheaDX) pour développer le réseau',
 'not_started', 5);

-- ── Données initiales — IT Ops ────────────────────────────────────────────

INSERT INTO goals_2026 (track, text_en, text_fr, status, sort_order) VALUES
('itops',
 'Land international IT Ops / SRE / DevOps missions (remote-first)',
 'Décrocher des missions IT Ops / SRE / DevOps internationales (remote-first)',
 'in_progress', 1),

('itops',
 'Deepen infrastructure-as-code skills: Terraform, Ansible, provisioning automation',
 'Approfondir les compétences Infrastructure as Code : Terraform, Ansible, automatisation du provisionning',
 'in_progress', 2),

('itops',
 'Obtain a cloud certification (AWS Solutions Architect or Azure Administrator)',
 'Obtenir une certification cloud (AWS Solutions Architect ou Azure Administrator)',
 'not_started', 3),

('itops',
 'Build a full monitoring homelab: Prometheus, Grafana, Alertmanager',
 'Monter un homelab de supervision complet : Prometheus, Grafana, Alertmanager',
 'in_progress', 4),

('itops',
 'Contribute to open-source DevOps projects (runbooks, scripts, monitoring dashboards)',
 'Contribuer à des projets open source DevOps (runbooks, scripts, dashboards de monitoring)',
 'not_started', 5);
