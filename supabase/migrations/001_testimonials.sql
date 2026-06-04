-- supabase/testimonials.sql
-- -------------------------
-- Table pour stocker les témoignages professionnels.
-- Utilisée par la section Témoignages (activée via NEXT_PUBLIC_SHOW_TESTIMONIALS=true).
--
-- Workflow de publication :
--   1. Ajouter le témoignage avec is_published = false
--   2. Vérifier le contenu et obtenir la validation de la personne
--   3. Passer is_published = true pour afficher en production
--
-- La colonne `locale` permet d'afficher la version traduite du témoignage
-- (utile si la personne a rédigé en anglais et qu'on veut une version FR).
--
-- Exécuter dans l'éditeur SQL Supabase ou via la CLI : supabase db push

-- ── Création de la table ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  -- Identifiant unique auto-généré
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identité de la personne
  name        TEXT        NOT NULL,
  role        TEXT        NOT NULL,         -- ex. "CTO", "Product Owner"
  company     TEXT,                         -- ex. "SaaS B2B", "Retail (EU)"

  -- Contexte de collaboration (affiché sous le témoignage)
  -- ex. "Salesforce delivery • coordination métier/tech • 6 semaines"
  context     TEXT,

  -- Texte du témoignage (sans guillemets — ils sont ajoutés par le composant)
  quote       TEXT        NOT NULL,

  -- Photo de la personne (optionnel — stockée dans Supabase Storage ou URL externe)
  photo_url   TEXT,

  -- Langue du témoignage : 'fr' ou 'en'
  -- Permet d'afficher la bonne version selon la locale de l'utilisateur
  locale      TEXT        NOT NULL DEFAULT 'fr'
              CHECK (locale IN ('fr', 'en')),

  -- Contrôle de publication — seuls les témoignages publiés s'affichent
  is_published BOOLEAN    NOT NULL DEFAULT false,

  -- Ordre d'affichage (croissant : 1 = affiché en premier)
  sort_order  INTEGER     NOT NULL DEFAULT 0,

  -- Métadonnées
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Index pour les requêtes fréquentes ───────────────────────────────
-- Filtre principal : locale + is_published + sort_order
CREATE INDEX IF NOT EXISTS idx_testimonials_locale_published
  ON testimonials (locale, is_published, sort_order);

-- ── Trigger : mise à jour automatique de updated_at ──────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_testimonials_updated_at ON testimonials;
CREATE TRIGGER set_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ── Row Level Security ────────────────────────────────────────────────
-- Activé dans policies.sql (voir supabase/policies.sql)

-- ── Données de test (à supprimer avant mise en production) ───────────
-- INSERT INTO testimonials (name, role, company, context, quote, locale, is_published, sort_order)
-- VALUES (
--   'Prénom Nom',
--   'Product Owner',
--   'Entreprise',
--   'Salesforce delivery • coordination métier/tech • 6 semaines',
--   'Lorem ipsum — à remplacer par le vrai témoignage',
--   'fr',
--   false,  -- NE PAS publier avant validation
--   1
-- );
