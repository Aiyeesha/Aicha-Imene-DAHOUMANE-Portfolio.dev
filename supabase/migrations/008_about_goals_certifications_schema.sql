-- migrations/008_about_goals_certifications_schema.sql
-- Schéma complet : about_pages, goals_2026, certifications.
-- Idempotent (IF NOT EXISTS). Snapshot DDL au 2026-06-04.

-- ── Table : about_pages ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.about_pages (
  id         uuid        NOT NULL DEFAULT gen_random_uuid(),
  locale     text        NOT NULL,
  headline   text        NOT NULL,
  intro      text,
  body       jsonb       NOT NULL DEFAULT '{}',
  status     text        NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT about_pages_pkey       PRIMARY KEY (id),
  CONSTRAINT about_pages_locale_uidx UNIQUE (locale)
);

COMMENT ON TABLE public.about_pages IS
  'Page À propos — un enregistrement par locale (en/fr). '
  'body : JSONB avec sections journey, values, passions, goals2026, introduction. '
  'status = published | draft. Lecture publique si status = published.';

CREATE INDEX IF NOT EXISTS about_pages_status_idx ON public.about_pages (status);

ALTER TABLE public.about_pages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon can read about" ON public.about_pages;
CREATE POLICY "anon can read about"
  ON public.about_pages FOR SELECT
  USING (status = 'published');

-- ── Table : goals_2026 ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.goals_2026 (
  id         uuid        NOT NULL DEFAULT gen_random_uuid(),
  track      text        NOT NULL,
  text_en    text        NOT NULL,
  text_fr    text        NOT NULL,
  status     text        NOT NULL DEFAULT 'not_started',
  sort_order integer     NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT goals_2026_pkey PRIMARY KEY (id)
);

COMMENT ON TABLE public.goals_2026 IS
  'Objectifs 2026 — un enregistrement par objectif. '
  'track = salesforce | itops. '
  'status = not_started | in_progress | completed. '
  'Lecture publique sans restriction.';

CREATE INDEX IF NOT EXISTS idx_goals_2026_track ON public.goals_2026 (track, sort_order);

CREATE OR REPLACE FUNCTION public.update_goals_updated_at()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$;

DROP TRIGGER IF EXISTS trg_goals_2026_updated_at ON public.goals_2026;
CREATE TRIGGER trg_goals_2026_updated_at
  BEFORE UPDATE ON public.goals_2026
  FOR EACH ROW EXECUTE FUNCTION public.update_goals_updated_at();

ALTER TABLE public.goals_2026 ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon can read goals" ON public.goals_2026;
CREATE POLICY "anon can read goals"
  ON public.goals_2026 FOR SELECT
  USING (true);

-- ── Table : certifications ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.certifications (
  id              uuid        NOT NULL DEFAULT gen_random_uuid(),
  locale          text        NOT NULL,
  name            text        NOT NULL,
  issuer          text        NOT NULL DEFAULT 'Salesforce',
  badge_image_url text,
  credential_url  text,
  obtained_at     date,
  expires_at      date,
  description     text,
  skills          text[]      NOT NULL DEFAULT '{}',
  sort_order      integer     NOT NULL DEFAULT 0,
  status          text        NOT NULL DEFAULT 'draft',
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  earned_label    text,
  slug            text,
  level           text,
  initials        text,
  color_class     text,
  CONSTRAINT certifications_pkey              PRIMARY KEY (id),
  CONSTRAINT certifications_slug_locale_unique UNIQUE (slug, locale)
);

COMMENT ON TABLE public.certifications IS
  'Certifications et diplômes — un enregistrement par (slug, locale). '
  'status = published | draft. '
  'color_class : classe Tailwind CSS (ex. bg-indigo-500) pour le badge visuel. '
  'Lecture publique sans restriction.';

CREATE INDEX IF NOT EXISTS certifications_slug_idx   ON public.certifications (slug);
CREATE INDEX IF NOT EXISTS certifications_sort_idx   ON public.certifications (sort_order);
CREATE INDEX IF NOT EXISTS certifications_status_idx ON public.certifications (status);

ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon can read certifications" ON public.certifications;
CREATE POLICY "anon can read certifications"
  ON public.certifications FOR SELECT
  USING (true);
