-- S-03 : deux correctifs de durcissement de sécurité (audit 2026-08-08)
--
-- 1) update_updated_at_column avait un search_path mutable en production
--    malgré un correctif apparent dans 20260603131143 (S-02) — la définition
--    live ne correspondait plus au contenu du fichier de migration (dérive
--    entre l'historique de migrations et l'état réel de la base). Refixé.
ALTER FUNCTION public.update_updated_at_column() SET search_path = '';

-- 2) update_incidents_updated_at() et update_incident_checklist_items_updated_at()
--    sont SECURITY DEFINER (nécessaire — RLS deny-all sur ces deux tables) mais
--    n'avaient jamais reçu le même traitement que is_admin() (S-01) : EXECUTE
--    restait accordé à PUBLIC, donc appelables directement par anon/authenticated
--    via /rest/v1/rpc/. Ce sont des fonctions trigger sans paramètre utile hors
--    contexte de déclencheur — aucun appel direct légitime.
REVOKE EXECUTE ON FUNCTION public.update_incidents_updated_at() FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.update_incidents_updated_at() TO service_role;

REVOKE EXECUTE ON FUNCTION public.update_incident_checklist_items_updated_at() FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.update_incident_checklist_items_updated_at() TO service_role;
