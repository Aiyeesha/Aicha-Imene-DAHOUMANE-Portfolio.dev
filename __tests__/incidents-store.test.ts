/**
 * @jest-environment node
 */
// __tests__/incidents-store.test.ts
// Incident dashboard stored in Redis (lib/incidents.ts): creation from the
// playbook template, listing newest first, checklist toggle, status changes,
// and ids that never reach a Redis key unless they are UUIDs.

jest.mock("server-only", () => ({}), { virtual: true });

const kv = new Map<string, unknown>();
const zset = new Map<string, number>();
jest.mock("@/lib/redis", () => ({
  redis: {
    get: async (k: string) => kv.get(k) ?? null,
    set: async (k: string, v: unknown) => { kv.set(k, v); return "OK"; },
    zadd: async (_k: string, { score, member }: { score: number; member: string }) => { zset.set(member, score); return 1; },
    zrange: async (_k: string, _a: number, _b: number, opts?: { rev?: boolean }) => {
      const ids = [...zset.entries()].sort((a, b) => a[1] - b[1]).map(([m]) => m);
      return opts?.rev ? ids.reverse() : ids;
    },
  },
}));

import {
  applyStatus,
  buildIncident,
  createIncident,
  getIncidentWithChecklist,
  isIncidentId,
  listIncidents,
  toggleChecklistItem,
  updateIncidentStatus,
} from "@/lib/incidents";
import { INCIDENT_CHECKLIST_TEMPLATES } from "@/lib/incidentPlaybooks";

beforeEach(() => { kv.clear(); zset.clear(); });

describe("fonctions pures", () => {
  it("pré-remplit la checklist depuis le playbook du type d'incident", () => {
    const doc = buildIncident({ title: "Phishing RH", incident_type: "phishing", severity: "S2" }, "id-1", "2026-10-31T10:00:00.000Z");
    expect(doc.incident).toMatchObject({ status: "open", resolved_at: null, description: null });
    expect(doc.checklist).toHaveLength(INCIDENT_CHECKLIST_TEMPLATES.phishing.length);
    expect(doc.checklist.every((i) => !i.is_done && i.incident_id === "id-1")).toBe(true);
  });

  it("renseigne resolved_at à la résolution et l'efface à la réouverture", () => {
    const { incident } = buildIncident({ title: "t", incident_type: "malware", severity: "S1" }, "id", "2026-10-31T10:00:00.000Z");
    const resolved = applyStatus(incident, "resolved", "2026-10-31T12:00:00.000Z");
    expect(resolved.resolved_at).toBe("2026-10-31T12:00:00.000Z");
    expect(applyStatus(resolved, "investigating", "2026-10-31T13:00:00.000Z").resolved_at).toBeNull();
  });

  it("n'accepte que des UUID comme identifiants", () => {
    expect(isIncidentId("../../admin")).toBe(false);
    expect(isIncidentId(crypto.randomUUID())).toBe(true);
  });
});

describe("stockage Redis", () => {
  it("crée, liste du plus récent au plus ancien et relit un incident", async () => {
    const first = await createIncident({ title: "Premier", incident_type: "dos", severity: "S3" });
    await new Promise((r) => setTimeout(r, 5));
    const second = await createIncident({ title: "Second", incident_type: "ransomware", severity: "S1", description: "Chiffrement" });
    expect((await listIncidents()).map((i) => i.id)).toEqual([second, first]);
    const { incident, checklist } = await getIncidentWithChecklist(second);
    expect(incident?.description).toBe("Chiffrement");
    expect(checklist.map((i) => i.sort_order)).toEqual([...checklist.keys()]);
  });

  it("coche un élément de checklist et change le statut", async () => {
    const id = await createIncident({ title: "Accès", incident_type: "unauthorized_access", severity: "S2" });
    const item = (await getIncidentWithChecklist(id)).checklist[0];
    await toggleChecklistItem(id, item.id, false);
    await updateIncidentStatus(id, "contained");
    const { incident, checklist } = await getIncidentWithChecklist(id);
    expect(checklist[0].is_done).toBe(true);
    expect(incident?.status).toBe("contained");
  });

  it("répond « introuvable » pour un identifiant inconnu ou invalide", async () => {
    expect((await getIncidentWithChecklist("pas-un-uuid")).incident).toBeNull();
    await expect(updateIncidentStatus(crypto.randomUUID(), "closed")).rejects.toThrow("introuvable");
    expect(kv.size).toBe(0);
  });
});
