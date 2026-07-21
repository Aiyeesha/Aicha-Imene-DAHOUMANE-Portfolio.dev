// lib/supabase/incidents.ts
// --------------------------
// Accès aux données du dashboard de gestion d'incidents (/admin/incidents).
// Server-only — utilise createAdminSupabaseClient() (service_role), les
// tables incidents / incident_checklist_items ont RLS deny-all (voir
// supabase/migrations/009_incidents_schema.sql).
import "server-only";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import {
  INCIDENT_CHECKLIST_TEMPLATES,
  type ChecklistPhase,
  type IncidentType,
} from "@/lib/incidentPlaybooks";
export { computeChecklistProgress, groupChecklistByPhase } from "@/lib/incidentProgress";

export type IncidentSeverity = "S1" | "S2" | "S3" | "S4";
export type IncidentStatus = "open" | "investigating" | "contained" | "resolved" | "closed";

export type IncidentRow = {
  id: string;
  title: string;
  incident_type: IncidentType;
  severity: IncidentSeverity;
  status: IncidentStatus;
  description: string | null;
  detected_at: string;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ChecklistItemRow = {
  id: string;
  incident_id: string;
  phase: ChecklistPhase;
  label: string;
  is_done: boolean;
  sort_order: number;
};

export type CreateIncidentInput = {
  title: string;
  incident_type: IncidentType;
  severity: IncidentSeverity;
  description?: string;
};

// ── Lecture ──────────────────────────────────────────────────────────────────

export async function listIncidents(): Promise<IncidentRow[]> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("incidents")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as IncidentRow[];
}

export async function getIncidentWithChecklist(id: string): Promise<{
  incident: IncidentRow | null;
  checklist: ChecklistItemRow[];
}> {
  const supabase = createAdminSupabaseClient();

  const [incidentRes, checklistRes] = await Promise.all([
    supabase.from("incidents").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("incident_checklist_items")
      .select("*")
      .eq("incident_id", id)
      .order("sort_order", { ascending: true }),
  ]);

  if (incidentRes.error) throw new Error(incidentRes.error.message);
  if (checklistRes.error) throw new Error(checklistRes.error.message);

  return {
    incident: (incidentRes.data ?? null) as IncidentRow | null,
    checklist: (checklistRes.data ?? []) as ChecklistItemRow[],
  };
}

// ── Écriture ─────────────────────────────────────────────────────────────────

export async function createIncident(input: CreateIncidentInput): Promise<string> {
  const supabase = createAdminSupabaseClient();

  const { data: incident, error: incidentError } = await supabase
    .from("incidents")
    .insert({
      title: input.title,
      incident_type: input.incident_type,
      severity: input.severity,
      description: input.description ?? null,
    })
    .select("id")
    .single();

  if (incidentError) throw new Error(incidentError.message);

  const template = INCIDENT_CHECKLIST_TEMPLATES[input.incident_type];
  const items = template.map((item, index) => ({
    incident_id: incident.id as string,
    phase: item.phase,
    label: item.label,
    sort_order: index,
  }));

  const { error: checklistError } = await supabase
    .from("incident_checklist_items")
    .insert(items);

  if (checklistError) throw new Error(checklistError.message);

  return incident.id as string;
}

export async function toggleChecklistItem(id: string, currentValue: boolean): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from("incident_checklist_items")
    .update({ is_done: !currentValue })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function updateIncidentStatus(id: string, status: IncidentStatus): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const patch: { status: IncidentStatus; resolved_at?: string | null } = { status };
  if (status === "resolved" || status === "closed") {
    patch.resolved_at = new Date().toISOString();
  } else {
    patch.resolved_at = null;
  }

  const { error } = await supabase.from("incidents").update(patch).eq("id", id);
  if (error) throw new Error(error.message);
}

// Fonctions pures (computeChecklistProgress, groupChecklistByPhase) : voir
// lib/incidentProgress.ts et le ré-export en tête de fichier.
