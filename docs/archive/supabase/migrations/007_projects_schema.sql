-- migrations/007_projects_schema.sql
-- Schéma complet des tables projects + project_assets.
-- Idempotent (IF NOT EXISTS / CREATE INDEX IF NOT EXISTS).
-- Snapshot DDL au 2026-06-04.

-- ── Table : projects ──────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.projects (
  id                 uuid        NOT NULL DEFAULT gen_random_uuid(),
  locale             text        NOT NULL,
  slug               text        NOT NULL,
  title              text        NOT NULL,
  summary            text,
  content            text,
  tech_stack         text[]      NOT NULL DEFAULT '{}',
  repo_url           text,
  live_url           text,
  featured           boolean     NOT NULL DEFAULT false,
  sort_order         integer     NOT NULL DEFAULT 0,
  status             text        NOT NULL DEFAULT 'draft',
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now(),
  track              text,
  categories         text[]      NOT NULL DEFAULT '{}',
  tags               text[]      NOT NULL DEFAULT '{}',
  badge              jsonb,
  pdf_url            text,
  content_updated_at timestamptz,
  highlights         text[]      NOT NULL DEFAULT '{}',
  gallery            jsonb,
  hero_subtitle      text,
  sections           jsonb,
  CONSTRAINT projects_pkey PRIMARY KEY (id),
  CONSTRAINT projects_locale_slug_uidx UNIQUE (locale, slug)
);

COMMENT ON TABLE public.projects IS
  'Projets du portfolio — un enregistrement par (locale, slug). '
  'track = salesforce | itops. status = published | draft. '
  'sections : JSONB array de ProjectSection (bullets/text/metrics/timeline/resources/code).';

-- Trigger updated_at
CREATE OR REPLACE FUNCTION public.update_projects_updated_at()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$;

DROP TRIGGER IF EXISTS trg_projects_updated_at ON public.projects;
CREATE TRIGGER trg_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_projects_updated_at();

-- ── Table : project_assets ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.project_assets (
  id             uuid        NOT NULL DEFAULT gen_random_uuid(),
  project_id     uuid        NOT NULL,
  type           text        NOT NULL,
  visibility     text        NOT NULL DEFAULT 'public',
  title          text,
  description    text,
  storage_bucket text,
  storage_path   text,
  external_url   text,
  mime_type      text,
  size_bytes     bigint,
  sort_order     integer     NOT NULL DEFAULT 0,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz,
  CONSTRAINT project_assets_pkey PRIMARY KEY (id),
  CONSTRAINT project_assets_project_fk FOREIGN KEY (project_id)
    REFERENCES public.projects (id) ON DELETE CASCADE
);

COMMENT ON TABLE public.project_assets IS
  'Assets liés aux projets. type = image | document | video. '
  'visibility = public | private. storage_bucket = projects | deliverables. '
  'Les assets deliverables sont servis via /api/storage/redirect (service_role).';

-- ── Indexes ───────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS projects_status_idx        ON public.projects (status);
CREATE INDEX IF NOT EXISTS projects_track_idx         ON public.projects (track);
CREATE INDEX IF NOT EXISTS projects_featured_sort_idx ON public.projects (featured DESC, sort_order);
CREATE INDEX IF NOT EXISTS projects_categories_gin    ON public.projects USING gin (categories);
CREATE INDEX IF NOT EXISTS projects_tags_gin          ON public.projects USING gin (tags);
CREATE INDEX IF NOT EXISTS project_assets_project_sort_idx
  ON public.project_assets (project_id, sort_order);

-- ── RLS ───────────────────────────────────────────────────────────────────────

ALTER TABLE public.projects       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_assets ENABLE ROW LEVEL SECURITY;

-- Lecture publique des projets publiés uniquement
DROP POLICY IF EXISTS "anon can read published projects" ON public.projects;
CREATE POLICY "anon can read published projects"
  ON public.projects FOR SELECT
  USING (status = 'published');

-- Lecture publique des assets des projets publiés uniquement
DROP POLICY IF EXISTS "anon can read published project assets" ON public.project_assets;
CREATE POLICY "anon can read published project assets"
  ON public.project_assets FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects p
      WHERE p.id = project_assets.project_id
        AND p.status = 'published'
    )
  );
