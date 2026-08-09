-- 20260809120100_explicit_deny_policies_incidents_uptime.sql
-- --------------------------------------------------------------------------
-- Ajoute des policies deny-all explicites pour anon/authenticated sur
-- incidents, incident_checklist_items et uptime_pings.
--
-- Ces tables avaient RLS activée sans aucune policy, ce qui est déjà
-- deny-all par défaut pour anon/authenticated (seul service_role, qui
-- bypass RLS, peut lire/écrire) — voir les COMMENT ON TABLE existants
-- (20260721203125_incidents_schema.sql, 006_security_hardening.sql).
-- Un scanner de sécurité générique flague néanmoins "RLS enabled, no
-- policy" comme ambigu. Ces policies USING(false)/WITH CHECK(false) ne
-- changent aucun comportement — elles rendent l'intention deny-all
-- explicite et vérifiable en base plutôt que documentée uniquement en
-- commentaire.

CREATE POLICY "deny_all_anon_authenticated" ON public.incidents
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "deny_all_anon_authenticated" ON public.incident_checklist_items
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "deny_all_anon_authenticated" ON public.uptime_pings
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
