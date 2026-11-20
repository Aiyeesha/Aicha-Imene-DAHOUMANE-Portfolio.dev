-- Re-assert the removal of the anon policies after the legacy migrations.
--
-- 002_policies.sql drops "anon can submit testimonials" and "anon can read
-- uptime pings", but 003_uptime.sql and 004_testimonial_submissions.sql,
-- which run after it, create them again. Production is clean (002 was
-- re-applied by hand afterwards), yet a database rebuilt by replaying the
-- migrations in order (Supabase Preview branch, local `supabase db reset`)
-- would let the public anon key insert testimonials directly and read the
-- uptime history.
--
-- Idempotent: DROP POLICY IF EXISTS is a no-op where the policy is absent.
-- All writes go through the server routes (service_role bypasses RLS).

DROP POLICY IF EXISTS "anon can submit testimonials" ON public.testimonial_submissions;
DROP POLICY IF EXISTS "anon can read uptime pings"   ON public.uptime_pings;
