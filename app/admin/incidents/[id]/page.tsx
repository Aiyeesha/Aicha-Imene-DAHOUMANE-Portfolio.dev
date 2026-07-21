// app/admin/incidents/[id]/page.tsx
// ------------------------------------
// Détail d'un incident : infos, statut, checklist interactive groupée par phase.

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getIncidentWithChecklist,
  computeChecklistProgress,
  groupChecklistByPhase,
} from "@/lib/supabase/incidents";
import { INCIDENT_TYPE_LABELS, CHECKLIST_PHASE_LABELS, type ChecklistPhase } from "@/lib/incidentPlaybooks";
import ChecklistItem from "../ChecklistItem";
import StatusSelect from "../StatusSelect";

const SEVERITY_BADGE: Record<string, string> = {
  S1: "bg-rose-500/15 text-rose-400",
  S2: "bg-amber-500/15 text-amber-400",
  S3: "bg-cyan-500/15 text-cyan-400",
  S4: "bg-slate-500/15 text-slate-400",
};

const PHASE_ORDER: ChecklistPhase[] = [
  "detection",
  "containment",
  "eradication",
  "recovery",
  "post_incident",
];

function fmtDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default async function IncidentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { incident, checklist } = await getIncidentWithChecklist(id);

  if (!incident) notFound();

  const progress = computeChecklistProgress(checklist);
  const grouped = groupChecklistByPhase(checklist);

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <Link href="/admin/incidents" className="text-xs text-slate-500 hover:text-cyan-400">
          ← Retour à la liste
        </Link>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-semibold text-slate-100">{incident.title}</h1>
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${SEVERITY_BADGE[incident.severity]}`}>
            {incident.severity}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          {INCIDENT_TYPE_LABELS[incident.incident_type]} · détecté le {fmtDate(incident.detected_at)}
        </p>
      </div>

      {incident.description && (
        <p className="text-sm text-slate-300 leading-relaxed rounded-lg border border-white/10 bg-white/[0.03] p-4">
          {incident.description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <div>
          <span className="block text-xs text-slate-500 mb-1.5">Statut</span>
          <StatusSelect incidentId={incident.id} status={incident.status} />
        </div>
        <div>
          <span className="block text-xs text-slate-500 mb-1.5">Progression checklist</span>
          <div className="flex items-center gap-2">
            <div className="h-2 w-40 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-cyan-500 transition-all"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
            <span className="text-xs text-slate-400 tabular-nums">
              {progress.done}/{progress.total}
            </span>
          </div>
        </div>
        {incident.resolved_at && (
          <div>
            <span className="block text-xs text-slate-500 mb-1.5">Résolu le</span>
            <span className="text-sm text-slate-300">{fmtDate(incident.resolved_at)}</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {PHASE_ORDER.map((phase) => {
          const items = grouped[phase];
          if (!items || items.length === 0) return null;
          return (
            <section key={phase}>
              <h2 className="mb-3 text-sm font-semibold text-slate-300">
                {CHECKLIST_PHASE_LABELS[phase]}
              </h2>
              <div className="space-y-2">
                {items.map((item) => (
                  <ChecklistItem
                    key={item.id}
                    id={item.id}
                    incidentId={incident.id}
                    label={item.label}
                    isDone={item.is_done}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
