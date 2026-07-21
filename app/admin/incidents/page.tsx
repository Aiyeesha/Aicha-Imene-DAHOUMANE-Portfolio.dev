// app/admin/incidents/page.tsx
// -----------------------------
// Liste des incidents — dashboard de gestion d'incidents.
// Opérationnalise les playbooks de github.com/Aiyeesha/playbook-reponse-incidents.

import Link from "next/link";
import { listIncidents, getIncidentWithChecklist, computeChecklistProgress } from "@/lib/supabase/incidents";
import { INCIDENT_TYPE_LABELS } from "@/lib/incidentPlaybooks";

const SEVERITY_BADGE: Record<string, string> = {
  S1: "bg-rose-500/15 text-rose-400",
  S2: "bg-amber-500/15 text-amber-400",
  S3: "bg-cyan-500/15 text-cyan-400",
  S4: "bg-slate-500/15 text-slate-400",
};

const STATUS_BADGE: Record<string, string> = {
  open: "bg-rose-500/15 text-rose-400",
  investigating: "bg-amber-500/15 text-amber-400",
  contained: "bg-violet-500/15 text-violet-400",
  resolved: "bg-emerald-500/15 text-emerald-400",
  closed: "bg-slate-500/15 text-slate-400",
};

const STATUS_LABELS: Record<string, string> = {
  open: "Ouvert",
  investigating: "En investigation",
  contained: "Confiné",
  resolved: "Résolu",
  closed: "Clôturé",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default async function IncidentsPage() {
  const incidents = await listIncidents();

  const progressByIncident = await Promise.all(
    incidents.map(async (incident) => {
      const { checklist } = await getIncidentWithChecklist(incident.id);
      return [incident.id, computeChecklistProgress(checklist)] as const;
    })
  );
  const progressMap = new Map(progressByIncident);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-xs text-slate-500 hover:text-cyan-400">
            ← Retour au dashboard
          </Link>
          <h1 className="mt-1 text-xl font-semibold text-slate-100">
            Dashboard de gestion d&apos;incidents
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Opérationnalise les playbooks{" "}
            <a
              href="https://github.com/Aiyeesha/playbook-reponse-incidents"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:underline"
            >
              playbook-reponse-incidents
            </a>
            .
          </p>
        </div>
        <Link
          href="/admin/incidents/new"
          className="rounded-lg bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-400 hover:bg-cyan-500/25 transition-colors"
        >
          + Nouvel incident
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3">Titre</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Sévérité</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Checklist</th>
              <th className="px-4 py-3">Détecté le</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {incidents.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-slate-500">
                  Aucun incident. Créez-en un pour tester le workflow.
                </td>
              </tr>
            ) : (
              incidents.map((incident) => {
                const progress = progressMap.get(incident.id);
                return (
                  <tr key={incident.id} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="px-4 py-3 max-w-[240px]">
                      <Link
                        href={`/admin/incidents/${incident.id}`}
                        className="font-medium text-slate-200 hover:text-cyan-400 transition-colors truncate block"
                      >
                        {incident.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">
                      {INCIDENT_TYPE_LABELS[incident.incident_type]}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${SEVERITY_BADGE[incident.severity]}`}>
                        {incident.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_BADGE[incident.status]}`}>
                        {STATUS_LABELS[incident.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">
                      {progress ? `${progress.done}/${progress.total} (${progress.percent}%)` : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{fmtDate(incident.detected_at)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
