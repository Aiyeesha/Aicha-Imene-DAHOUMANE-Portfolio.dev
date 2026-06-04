-- supabase/testimonial-submissions.sql
-- ------------------------------------
-- Table pour les témoignages soumis via le formulaire public (/testimonial-submit).
--
-- Workflow :
--   1. Un visiteur (collègue, formateur, jury…) accède à /testimonial-submit?token=SECRET
--   2. Il remplit le formulaire → INSERT dans cette table avec approved = false
--   3. Le portfolio owner examine le témoignage dans le dashboard Supabase
--   4. Si validé : copier dans la table `testimonials` avec is_published = true
--
-- RLS : INSERT public autorisé (avec rate-limit côté API), lecture interdite à anon.
-- ──────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS testimonial_submissions (
  id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identité du témoin
  full_name            TEXT        NOT NULL,
  role                 TEXT        NOT NULL,
  company              TEXT,

  -- Relation avec Aïcha
  -- Valeurs attendues : 'colleague' | 'trainer' | 'jury' | 'classmate' | 'client' | 'other'
  relation_type        TEXT        NOT NULL,

  -- Contexte libre (ex : "Alternance LD Digitales — 2023-2025")
  collaboration_context TEXT,

  -- Témoignage complet
  message              TEXT        NOT NULL,

  -- Photo (URL externe ou Supabase Storage — optionnelle)
  photo_url            TEXT,

  -- Langue du témoignage : 'fr' ou 'en'
  locale               TEXT        NOT NULL DEFAULT 'en'
                       CHECK (locale IN ('fr', 'en')),

  -- Modération — false par défaut, à passer à true après validation manuelle
  approved             BOOLEAN     NOT NULL DEFAULT false,

  -- IP du soumetteur (pour audit, jamais affiché)
  submitted_ip         TEXT,

  created_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index pour les requêtes d'administration (toutes les soumissions non approuvées)
CREATE INDEX IF NOT EXISTS idx_submissions_approved
  ON testimonial_submissions (approved, created_at DESC);

-- ── Row Level Security ────────────────────────────────────────────────────────

ALTER TABLE testimonial_submissions ENABLE ROW LEVEL SECURITY;

-- INSERT public : les visiteurs peuvent soumettre (rate-limit géré côté API)
DROP POLICY IF EXISTS "anon can submit testimonials" ON testimonial_submissions;
CREATE POLICY "anon can submit testimonials"
  ON testimonial_submissions
  FOR INSERT
  TO anon
  WITH CHECK (approved = false);   -- impossible de s'auto-approuver

-- Lecture interdite à anon : données personnelles à protéger
-- Seul le rôle service_role (admin) peut lire les soumissions
DROP POLICY IF EXISTS "anon cannot read submissions" ON testimonial_submissions;
