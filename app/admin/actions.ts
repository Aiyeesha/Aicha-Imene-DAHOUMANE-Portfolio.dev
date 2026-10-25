"use server";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { requireAdminAuth } from "@/lib/security/adminAuth";

// Défense en profondeur : re-vérifier l'auth Basic dans l'action elle-même.
// Le middleware proxy.ts protège déjà /admin, mais les Server Actions peuvent
// en théorie être invoquées directement via un POST forgé. Ce guard garantit
// que même hors contexte middleware, l'action rejette les appelants non authentifiés.
//
// Audit 2026-10-23 (P3) : la logique vit désormais dans lib/security/adminAuth.ts,
// partagée avec le layout et les pages de /admin. Elle n'est plus définie ni
// exportée ici : dans un fichier "use server", toute fonction async exportée
// devient une Server Action appelable par POST — requireAdminAuth n'a pas à
// être un point d'entrée public.

export async function toggleTestimonialPublished(id: string, currentValue: boolean) {
  await requireAdminAuth();

  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from("testimonials")
    .update({ is_published: !currentValue, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/en");
  revalidatePath("/fr");
}

export async function revalidateSite() {
  await requireAdminAuth();

  revalidatePath("/en", "layout");
  revalidatePath("/fr", "layout");
  revalidatePath("/admin");
}
