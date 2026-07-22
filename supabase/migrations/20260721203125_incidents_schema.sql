-- migrations/009_incidents_schema.sql
-- Schéma du dashboard de gestion d'incidents (/admin/incidents).
-- Idempotent (IF NOT EXISTS / CREATE INDEX IF NOT EXISTS).
-- RLS activée sans aucune policy publique = deny-all pour anon/authenticated,
-- accès exclusivement via service_role (createAdminSupabaseClient()), même
-- pattern que uptime_pings (voir 006_security_hardening.sql, DB-3).

-- ── Table : incidents ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.incidents (
  id             uuid        NOT NULL DEFAULT gen_random_uuid(),
  title          text        NOT NULL,
  incident_type  text        NOT NULL,
  severity       text        NOT NULL,
  status         text        NOT NULL DEFAULT 'open',
  description    text,
  detected_at    timestamptz NOT NULL DEFAULT now(),
  resolved_at    timestamptz,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT incidents_pkey PRIMARY KEY (id),
  CONSTRAINT incidents_type_chk CHECK (incident_type IN (
    'malware', 'ransomware', 'data_breach', 'phishing',
    'unauthorized_access', 'dos'
  )),
  CONSTRAINT incidents_severity_chk CHECK (severity IN ('S1', 'S2', 'S3', 'S4')),
  CONSTRAINT incidents_status_chk CHECK (status IN (
    'open', 'investigating', 'contained', 'resolved', 'closed'
  ))
);

COMMENT ON TABLE public.incidents IS
  'Dashboard de gestion d''incidents (/admin/incidents), démo opérationnalisant '
  'les playbooks de github.com/Aiyeesha/playbook-reponse-incidents. '
  'RLS activée sans policy = deny-all pour anon et authenticated. '
  'Accès réservé au service_role via lib/supabase/incidents.ts.';

CREATE OR REPLACE FUNCTION public.update_incidents_updated_at()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$;

DROP TRIGGER IF EXISTS trg_incidents_updated_at ON public.incidents;
CREATE TRIGGER trg_incidents_updated_at
  BEFORE UPDATE ON public.incidents
  FOR EACH ROW EXECUTE FUNCTION public.update_incidents_updated_at();

-- ── Table : incident_checklist_items ────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.incident_checklist_items (
  id           uuid        NOT NULL DEFAULT gen_random_uuid(),
  incident_id  uuid        NOT NULL,
  phase        text        NOT NULL,
  label        text        NOT NULL,
  is_done      boolean     NOT NULL DEFAULT false,
  sort_order   integer     NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT incident_checklist_items_pkey PRIMARY KEY (id),
  CONSTRAINT incident_checklist_items_incident_fk FOREIGN KEY (incident_id)
    REFERENCES public.incidents (id) ON DELETE CASCADE,
  CONSTRAINT incident_checklist_items_phase_chk CHECK (phase IN (
    'detection', 'containment', 'eradication', 'recovery', 'post_incident'
  ))
);

COMMENT ON TABLE public.incident_checklist_items IS
  'Items de checklist par incident, pré-remplis depuis lib/incidentPlaybooks.ts '
  'selon incident_type à la création. RLS deny-all — voir public.incidents.';

CREATE OR REPLACE FUNCTION public.update_incident_checklist_items_updated_at()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$;

DROP TRIGGER IF EXISTS trg_incident_checklist_items_updated_at ON public.incident_checklist_items;
CREATE TRIGGER trg_incident_checklist_items_updated_at
  BEFORE UPDATE ON public.incident_checklist_items
  FOR EACH ROW EXECUTE FUNCTION public.update_incident_checklist_items_updated_at();

-- ── Indexes ───────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS incidents_status_idx   ON public.incidents (status);
CREATE INDEX IF NOT EXISTS incidents_created_idx  ON public.incidents (created_at DESC);
CREATE INDEX IF NOT EXISTS incident_checklist_items_incident_sort_idx
  ON public.incident_checklist_items (incident_id, sort_order);

-- ── RLS : deny-all (service_role uniquement) ────────────────────────────────

ALTER TABLE public.incidents               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incident_checklist_items ENABLE ROW LEVEL SECURITY;
