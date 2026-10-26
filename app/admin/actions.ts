"use server";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { requireAdminAuth } from "@/lib/security/adminAuth";

// Defence in depth: server actions can be called with a forged POST, so the
// action re-checks Basic auth itself (lib/security/adminAuth.ts, shared with
// the /admin layout and pages). The check is not exported from here: in a
// "use server" file, every exported async function becomes a callable
// server action.

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
