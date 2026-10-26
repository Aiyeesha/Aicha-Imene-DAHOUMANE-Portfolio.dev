// lib/supabase/admin.ts
// ---------------------
// Supabase client with the service_role key, which bypasses RLS: strictly
// server-side (server components, route handlers). Never expose
// SUPABASE_SERVICE_ROLE_KEY to the client: `server-only` fails the build if
// this file is imported from a client component.
import "server-only";

import { createClient } from "@supabase/supabase-js";

export function createAdminSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing admin Supabase env vars. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
