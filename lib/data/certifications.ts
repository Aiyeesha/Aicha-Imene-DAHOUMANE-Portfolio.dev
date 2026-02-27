import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";

export type CertificationRow = {
  id: string;
  locale: "fr" | "en";
  name: string;
  issuer: string;
  badge_image_url: string | null;
  credential_url: string | null;
  obtained_at: string | null;
  expires_at: string | null;
  earned_label: string | null;
  description: string | null;
  skills: string[];
  sort_order: number;
  status: "draft" | "published" | "archived";
};

export async function getCertifications(locale: "fr" | "en") {
  const supabase = createPublicServerSupabaseClient();

  const { data, error } = await supabase
    .from("certifications")
    .select(
      "id, locale, name, issuer, badge_image_url, credential_url, obtained_at, expires_at, earned_label, description, skills, sort_order, status"
    )
    .eq("locale", locale)
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[certifications] error:", error.message);
    return [];
  }
  return (data ?? []) as CertificationRow[];
}