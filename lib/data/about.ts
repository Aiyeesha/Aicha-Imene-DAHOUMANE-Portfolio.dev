import { createServerSupabaseClient } from "@/lib/supabase/server";

export type AboutPageRow = {
  locale: "fr" | "en";
  headline: string;
  intro: string | null;
  body: any;
  status: "draft" | "published" | "archived";
  updated_at?: string;
};

export async function getAboutPage(locale: "fr" | "en") {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("about_pages")
    .select("locale, headline, intro, body, status, updated_at")
    .eq("locale", locale)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("[about_pages] error:", error.message);
    return null;
  }
  return (data ?? null) as AboutPageRow | null;
}