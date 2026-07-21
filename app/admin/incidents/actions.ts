"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminAuth } from "@/app/admin/actions";
import {
  createIncident,
  toggleChecklistItem,
  updateIncidentStatus,
  type IncidentStatus,
} from "@/lib/supabase/incidents";
import type { IncidentSeverity } from "@/lib/supabase/incidents";
import type { IncidentType } from "@/lib/incidentPlaybooks";

const INCIDENT_TYPES: IncidentType[] = [
  "malware",
  "ransomware",
  "data_breach",
  "phishing",
  "unauthorized_access",
  "dos",
];
const SEVERITIES: IncidentSeverity[] = ["S1", "S2", "S3", "S4"];
const STATUSES: IncidentStatus[] = ["open", "investigating", "contained", "resolved", "closed"];

export async function createIncidentAction(formData: FormData): Promise<void> {
  await requireAdminAuth();

  const title = String(formData.get("title") ?? "").trim();
  const incidentType = String(formData.get("incident_type") ?? "");
  const severity = String(formData.get("severity") ?? "");
  const description = String(formData.get("description") ?? "").trim();

  if (!title) throw new Error("Le titre est requis.");
  if (!INCIDENT_TYPES.includes(incidentType as IncidentType)) {
    throw new Error("Type d'incident invalide.");
  }
  if (!SEVERITIES.includes(severity as IncidentSeverity)) {
    throw new Error("Sévérité invalide.");
  }

  const id = await createIncident({
    title,
    incident_type: incidentType as IncidentType,
    severity: severity as IncidentSeverity,
    description: description || undefined,
  });

  revalidatePath("/admin/incidents");
  redirect(`/admin/incidents/${id}`);
}

export async function toggleChecklistItemAction(
  id: string,
  currentValue: boolean,
  incidentId: string
): Promise<void> {
  await requireAdminAuth();
  await toggleChecklistItem(id, currentValue);
  revalidatePath(`/admin/incidents/${incidentId}`);
}

export async function updateIncidentStatusAction(
  incidentId: string,
  status: string
): Promise<void> {
  await requireAdminAuth();

  if (!STATUSES.includes(status as IncidentStatus)) {
    throw new Error("Statut invalide.");
  }

  await updateIncidentStatus(incidentId, status as IncidentStatus);
  revalidatePath(`/admin/incidents/${incidentId}`);
  revalidatePath("/admin/incidents");
}
