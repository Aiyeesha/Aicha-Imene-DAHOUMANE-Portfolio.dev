
-- DB-2 : Remplacer auth.uid() par (select auth.uid()) dans la policy admins_read_self.
-- L'appel direct auth.uid() est ré-évalué pour chaque ligne parcourue ;
-- la forme (select auth.uid()) est évaluée une seule fois par requête
-- (« stable subselect » optimisation documentée par Supabase).
DROP POLICY IF EXISTS admins_read_self ON public.admins;

CREATE POLICY admins_read_self ON public.admins
  FOR SELECT
  USING ((select auth.uid()) = user_id);
