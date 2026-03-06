// lib/supabase/admin.ts
// ---------------------
// Client Supabase avec la clé service_role.
// Contourne le RLS → usage STRICTEMENT serveur (Server Components, Route Handlers).
// Ne jamais exposer SUPABASE_SERVICE_ROLE_KEY côté client.

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
