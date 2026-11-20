-- S-03 (suite) : EXECUTE était accordé directement à anon/authenticated
-- (pas seulement hérité de PUBLIC comme pour is_admin()/S-01) — le premier
-- REVOKE ... FROM PUBLIC était donc sans effet ici. Révocation explicite.
REVOKE EXECUTE ON FUNCTION public.update_incidents_updated_at() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_incident_checklist_items_updated_at() FROM anon, authenticated;
