"use server";

import { headers } from "next/headers";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { timingSafeStringEqual } from "@/lib/security/timingSafeEqual";
import {
  createTestimonialInvite,
  normalizeInviteDays,
  normalizeInviteLocale,
  type TestimonialInvite,
} from "@/lib/testimonialInvite";

// Défense en profondeur : re-vérifier l'auth Basic dans l'action elle-même.
// Le middleware proxy.ts protège déjà /admin, mais les Server Actions peuvent
// en théorie être invoquées directement via un POST forgé. Ce guard garantit
// que même hors contexte middleware, l'action rejette les appelants non authentifiés.
export async function requireAdminAuth(): Promise<void> {
  const expectedUser = process.env.ADMIN_USERNAME ?? "";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "";

  if (!expectedUser || !expectedPass) throw new Error("Unauthorized");

  const headersList = await headers();
  const authHeader = headersList.get("authorization") ?? "";

  if (!authHeader.startsWith("Basic ")) throw new Error("Unauthorized");

  try {
    const decoded = atob(authHeader.slice(6));
    const colonIdx = decoded.indexOf(":");
    if (colonIdx === -1) throw new Error("Unauthorized");

    const user = decoded.slice(0, colonIdx);
    const pass = decoded.slice(colonIdx + 1);

    const [userMatch, passMatch] = await Promise.all([
      timingSafeStringEqual(user, expectedUser),
      timingSafeStringEqual(pass, expectedPass),
    ]);

    if (!userMatch || !passMatch) throw new Error("Unauthorized");
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") throw e;
    // Base64 invalide ou autre erreur de décodage
    throw new Error("Unauthorized");
  }
}

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

// Génère un lien d'invitation témoignage depuis la page /admin (même lien que
// POST /api/admin/testimonial-invite, sans avoir à saisir de commande).
// Les paramètres venant du client sont re-normalisés côté serveur.
export async function generateTestimonialInvite(
  locale: string,
  days: number
): Promise<{ ok: true; invite: TestimonialInvite } | { ok: false; error: string }> {
  await requireAdminAuth();

  const invite = createTestimonialInvite(normalizeInviteLocale(locale), normalizeInviteDays(days));
  if (!invite) return { ok: false, error: "TESTIMONIAL_SUBMIT_TOKEN n'est pas configuré sur Vercel." };
  return { ok: true, invite };
}
