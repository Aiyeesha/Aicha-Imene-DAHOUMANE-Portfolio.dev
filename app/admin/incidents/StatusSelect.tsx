"use client";

import { useTransition } from "react";
import { updateIncidentStatusAction } from "./actions";
import type { IncidentStatus } from "@/lib/supabase/incidents";

const STATUS_LABELS: Record<IncidentStatus, string> = {
  open: "Ouvert",
  investigating: "En investigation",
  contained: "Confiné",
  resolved: "Résolu",
  closed: "Clôturé",
};

export default function StatusSelect({
  incidentId,
  status,
}: {
  incidentId: string;
  status: IncidentStatus;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={isPending}
      onChange={(e) =>
        startTransition(() => updateIncidentStatusAction(incidentId, e.target.value))
      }
      className="rounded-lg border border-white/10 bg-slate-900 px-3 py-1.5 text-sm text-slate-200 disabled:opacity-50"
    >
      {Object.entries(STATUS_LABELS).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
