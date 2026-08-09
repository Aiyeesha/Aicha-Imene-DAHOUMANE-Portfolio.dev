-- 20260809120000_drop_orphaned_certifications_table.sql
-- --------------------------------------------------------------------------
-- Supprime la table public.certifications (12 lignes : 6 EN + 6 FR).
--
-- Contexte : la page publique /certifications lit exclusivement
-- content/certifications.ts (données statiques). Le dashboard /admin
-- interrogeait encore cette table Supabase (app/admin/page.tsx), mais avec
-- des données obsolètes et divergentes de la source statique — notamment
-- "Salesforce Sales Foundations" y était listée comme obtenue alors qu'elle
-- fait partie de upcomingCertifications (non obtenue) côté content/.
-- app/admin/page.tsx a été migré pour lire content/certifications.ts comme
-- la page publique ; plus aucun code ne référence cette table.

DROP TABLE IF EXISTS public.certifications;
