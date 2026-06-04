-- migrations/006_security_hardening.sql
-- Appliqué le 2026-06-04 via Supabase MCP (audit sécurité PRs #71-73).
-- Idempotent : toutes les instructions utilisent DROP … IF EXISTS / OR REPLACE.
--
-- Contenu :
--   S-01 — REVOKE EXECUTE sur is_admin() depuis PUBLIC
--   S-02 — SET search_path = '' sur les 3 triggers de mise à jour
--   DB-2 — Correction anti-pattern auth.uid() → (select auth.uid()) sur admins_read_self
--   DB-3 — COMMENT ON TABLE uptime_pings (intent deny-all explicite)

-- ── S-01 : Révoquer is_admin() depuis PUBLIC ──────────────────────────────────
-- La fonction était accessible à anon et authenticated via le grant implicite PUBLIC.
-- Seul service_role doit pouvoir l'appeler.
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.is_admin() TO service_role;

-- ── S-02 : Corriger le mutable search_path sur les triggers ──────────────────
-- Sans search_path = '', un attaquant ayant CREATE ON SCHEMA public peut
-- substituer des objets (fonctions, types) dans le chemin de résolution.

CREATE OR REPLACE FUNCTION public.update_goals_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- ── DB-2 : Anti-pattern auth.uid() par ligne dans admins_read_self ────────────
-- auth.uid() appelé directement est réévalué pour chaque ligne parcourue.
-- (select auth.uid()) est évalué une seule fois par requête (subselect stable).
DROP POLICY IF EXISTS admins_read_self ON public.admins;

CREATE POLICY admins_read_self ON public.admins
  FOR SELECT
  USING ((select auth.uid()) = user_id);

-- ── DB-3 : Documenter l'intent deny-all sur uptime_pings ─────────────────────
-- RLS activée sans aucune policy = deny-all pour anon/authenticated.
-- Seul le service_role (bypass RLS) peut lire/écrire cette table.
-- Ce COMMENT évite qu'un futur lecteur croie à un oubli.
COMMENT ON TABLE public.uptime_pings IS
  'RLS activée sans policy = deny-all pour anon et authenticated. '
  'Accès réservé au service_role (bypass RLS). '
  'Écrit par /api/cron/ping (Vercel Cron, service_role). '
  'Lu par lib/uptime.ts via createAdminSupabaseClient() (service_role).';
