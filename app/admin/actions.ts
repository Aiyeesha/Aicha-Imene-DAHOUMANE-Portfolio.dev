"use server";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function toggleTestimonialPublished(id: string, currentValue: boolean) {
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
  revalidatePath("/en", "layout");
  revalidatePath("/fr", "layout");
  revalidatePath("/admin");
}
