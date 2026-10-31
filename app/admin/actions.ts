"use server";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { requireAdminAuth } from "@/lib/security/adminAuth";
import {
  MAX_INVITE_DAYS,
  createInviteLink,
  type InviteLink,
  type InviteLocale,
} from "@/lib/security/testimonialInvite";

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

// Testimonial invitation link from the /admin page: same link as
// POST /api/admin/testimonial-invite, without typing a command (usable from a
// phone). Client parameters are normalized again on the server.
export async function generateTestimonialInvite(
  locale: string,
  days: number
): Promise<{ ok: true; invite: InviteLink } | { ok: false; error: string }> {
  await requireAdminAuth();

  const secret = process.env.TESTIMONIAL_SUBMIT_TOKEN ?? "";
  if (!secret) return { ok: false, error: "TESTIMONIAL_SUBMIT_TOKEN n'est pas configuré sur Vercel." };

  const safeLocale: InviteLocale = locale === "fr" ? "fr" : locale === "es" ? "es" : "en";
  const safeDays = Number.isFinite(days) ? days : MAX_INVITE_DAYS;
  return { ok: true, invite: createInviteLink(secret, safeLocale, safeDays) };
}
