-- S-02 : fixer search_path mutable sur les 3 fonctions trigger
-- Empêche les attaques de type search_path injection
ALTER FUNCTION public.update_goals_updated_at() SET search_path = '';
ALTER FUNCTION public.update_updated_at_column() SET search_path = '';
ALTER FUNCTION public.set_updated_at() SET search_path = '';
