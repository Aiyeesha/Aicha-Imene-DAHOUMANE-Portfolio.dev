// lib/data/goals.ts
// -----------------
// Fetches 2026 goals from Supabase with their current status.
// Used by the About page (server component) to pass data to AboutTrackGoals.

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type GoalStatus = "not_started" | "in_progress" | "completed";

export type Goal = {
  id: string;
  track: "salesforce" | "itops";
  text_en: string;
  text_fr: string;
  status: GoalStatus;
  sort_order: number;
};

export async function getGoals2026(): Promise<Goal[]> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("goals_2026")
      .select("id, track, text_en, text_fr, status, sort_order")
      .order("track")
      .order("sort_order");

    if (error || !data) return [];

    // Déduplication : la migration peut avoir été exécutée plusieurs fois,
    // créant des doublons. On conserve la première occurrence par (track, text_en).
    const seen = new Set<string>();
    const unique = (data as Goal[]).filter((g) => {
      const key = `${g.track}:${g.text_en}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return unique;
  } catch {
    // Table absente ou erreur réseau → fallback silencieux
    return [];
  }
}
