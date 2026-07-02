import { createServerSupabaseClient } from "@/lib/supabase/server";
import { withRetry } from "@/lib/supabase/withRetry";

export type AboutPageRow = {
  locale: "fr" | "en" | "es";
  headline: string;
  intro: string | null;
  body: any;
  status: "draft" | "published" | "archived";
  updated_at?: string;
};

export async function getAboutPage(locale: "fr" | "en" | "es") {
  const supabase = createServerSupabaseClient();

  const { data, error } = await withRetry(() =>
    supabase
      .from("about_pages")
      .select("locale, headline, intro, body, status, updated_at")
      .eq("locale", locale)
      .eq("status", "published")
      .maybeSingle()
  );

  if (error) {
    console.error("[about_pages] error:", (error as any)?.message ?? error);
    return null;
  }
  return (data ?? null) as AboutPageRow | null;
}