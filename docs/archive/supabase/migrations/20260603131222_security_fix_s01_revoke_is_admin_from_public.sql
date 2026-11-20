-- S-01 (correctif) : la permission EXECUTE était sur PUBLIC, pas anon/authenticated
-- Révoquer sur PUBLIC puis accorder explicitement aux rôles qui en ont besoin
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
-- service_role et postgres conservent leur accès explicite (déjà accordé)
GRANT EXECUTE ON FUNCTION public.is_admin() TO service_role;
