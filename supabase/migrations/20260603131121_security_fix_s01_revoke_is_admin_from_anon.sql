-- S-01 : révoquer EXECUTE sur is_admin() pour anon et authenticated
-- La fonction SECURITY DEFINER ne doit pas être callable publiquement
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM authenticated;
