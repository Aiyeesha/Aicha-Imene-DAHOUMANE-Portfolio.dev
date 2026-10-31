// lib/incidents.ts
// ----------------
// Data access for the incident management dashboard (/admin/incidents),
// stored in Upstash Redis (formerly the Supabase tables incidents and
// incident_checklist_items, retired with Supabase).
//
// Layout:
//   portfolio:incidents          sorted set, incident ids scored by creation
//                                time (newest first when listed)
//   portfolio:incident:<uuid>    JSON { incident, checklist } — one document
//                                per incident, read and written as a whole
//
// Server-only: called from the admin pages and server actions, which check
// the admin authentication first. Writes are read-modify-write on a single
// document: fine for one administrator, not designed for concurrent editors.
import "server-only";

import { redis } from "@/lib/redis";
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

type IncidentDocument = { incident: IncidentRow; checklist: ChecklistItemRow[] };

export const INCIDENTS_INDEX_KEY = "portfolio:incidents";
const incidentKey = (id: string) => `portfolio:incident:${id}`;

// Ids come from URLs and form posts: only UUIDs ever reach a Redis key.
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isIncidentId = (id: string) => UUID_RE.test(id);

function requireRedis() {
  if (!redis) throw new Error("Redis n'est pas configuré : le tableau des incidents est indisponible.");
  return redis;
}

/** Accepts a document as stored (JSON string) or already parsed by the client. */
function parseDocument(value: unknown): IncidentDocument | null {
  try {
    const doc = typeof value === "string" ? JSON.parse(value) : value;
    if (!doc || typeof doc !== "object") return null;
    const d = doc as IncidentDocument;
    return d.incident && Array.isArray(d.checklist) ? d : null;
  } catch {
    return null;
  }
}

async function readDocument(id: string): Promise<IncidentDocument | null> {
  if (!isIncidentId(id)) return null;
  return parseDocument(await requireRedis().get(incidentKey(id)));
}

async function writeDocument(doc: IncidentDocument): Promise<void> {
  await requireRedis().set(incidentKey(doc.incident.id), JSON.stringify(doc));
}

// ── Pure helpers (exported for the tests) ───────────────────────────────────

/** New incident and its checklist, pre-filled from the playbook template. */
export function buildIncident(input: CreateIncidentInput, id: string, now: string): IncidentDocument {
  const incident: IncidentRow = {
    id,
    title: input.title,
    incident_type: input.incident_type,
    severity: input.severity,
    status: "open",
    description: input.description ?? null,
    detected_at: now,
    resolved_at: null,
    created_at: now,
    updated_at: now,
  };
  const checklist = INCIDENT_CHECKLIST_TEMPLATES[input.incident_type].map((item, index) => ({
    id: `${id}:${index}`,
    incident_id: id,
    phase: item.phase,
    label: item.label,
    is_done: false,
    sort_order: index,
  }));
  return { incident, checklist };
}

/** Status change; resolved_at is set when resolved or closed, cleared otherwise. */
export function applyStatus(incident: IncidentRow, status: IncidentStatus, now: string): IncidentRow {
  const resolved = status === "resolved" || status === "closed";
  return { ...incident, status, resolved_at: resolved ? now : null, updated_at: now };
}

// ── Read ────────────────────────────────────────────────────────────────────

export async function listIncidents(): Promise<IncidentRow[]> {
  if (!redis) return [];
  const ids = await redis.zrange<string[]>(INCIDENTS_INDEX_KEY, 0, -1, { rev: true });
  const docs = await Promise.all(ids.map((id) => readDocument(String(id))));
  return docs.filter((d): d is IncidentDocument => d !== null).map((d) => d.incident);
}

export async function getIncidentWithChecklist(id: string): Promise<{
  incident: IncidentRow | null;
  checklist: ChecklistItemRow[];
}> {
  if (!redis) return { incident: null, checklist: [] };
  const doc = await readDocument(id);
  return {
    incident: doc?.incident ?? null,
    checklist: [...(doc?.checklist ?? [])].sort((a, b) => a.sort_order - b.sort_order),
  };
}

// ── Write ───────────────────────────────────────────────────────────────────

export async function createIncident(input: CreateIncidentInput): Promise<string> {
  const client = requireRedis();
  const now = new Date().toISOString();
  const doc = buildIncident(input, crypto.randomUUID(), now);
  await writeDocument(doc);
  await client.zadd(INCIDENTS_INDEX_KEY, { score: Date.parse(now), member: doc.incident.id });
  return doc.incident.id;
}

export async function toggleChecklistItem(
  incidentId: string,
  itemId: string,
  currentValue: boolean,
): Promise<void> {
  const doc = await readDocument(incidentId);
  if (!doc) throw new Error("Incident introuvable.");
  const item = doc.checklist.find((i) => i.id === itemId);
  if (!item) throw new Error("Élément de checklist introuvable.");
  item.is_done = !currentValue;
  doc.incident.updated_at = new Date().toISOString();
  await writeDocument(doc);
}

export async function updateIncidentStatus(id: string, status: IncidentStatus): Promise<void> {
  const doc = await readDocument(id);
  if (!doc) throw new Error("Incident introuvable.");
  doc.incident = applyStatus(doc.incident, status, new Date().toISOString());
  await writeDocument(doc);
}
