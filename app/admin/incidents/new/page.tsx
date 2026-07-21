// app/admin/incidents/new/page.tsx
// ----------------------------------
// Formulaire de création d'incident — pré-remplit la checklist depuis
// lib/incidentPlaybooks.ts selon le type sélectionné (voir actions.ts).

import Link from "next/link";
import { createIncidentAction } from "../actions";
import { INCIDENT_TYPE_LABELS } from "@/lib/incidentPlaybooks";

const SEVERITIES = ["S1", "S2", "S3", "S4"] as const;
const SEVERITY_HINTS: Record<string, string> = {
  S1: "Critique — réponse immédiate",
  S2: "Élevée — réponse < 1h",
  S3: "Moyenne — réponse < 4h",
  S4: "Faible — réponse < 24h",
};

export default function NewIncidentPage() {
  return (
    <div className="max-w-xl space-y-6">
      <div>
        <Link href="/admin/incidents" className="text-xs text-slate-500 hover:text-cyan-400">
          ← Retour à la liste
        </Link>
        <h1 className="mt-1 text-xl font-semibold text-slate-100">Nouvel incident</h1>
        <p className="mt-1 text-sm text-slate-500">
          La checklist correspondante sera générée automatiquement selon le type choisi.
        </p>
      </div>

      <form action={createIncidentAction} className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1.5">
            Titre
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="Ex : Alerte EDR sur poste FIN-042"
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600"
          />
        </div>

        <div>
          <label htmlFor="incident_type" className="block text-sm font-medium text-slate-300 mb-1.5">
            Type d&apos;incident
          </label>
          <select
            id="incident_type"
            name="incident_type"
            required
            defaultValue=""
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-slate-200"
          >
            <option value="" disabled>
              — Sélectionner —
            </option>
            {Object.entries(INCIDENT_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="severity" className="block text-sm font-medium text-slate-300 mb-1.5">
            Sévérité
          </label>
          <select
            id="severity"
            name="severity"
            required
            defaultValue=""
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-slate-200"
          >
            <option value="" disabled>
              — Sélectionner —
            </option>
            {SEVERITIES.map((s) => (
              <option key={s} value={s}>
                {s} — {SEVERITY_HINTS[s]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1.5">
            Description (optionnel)
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Contexte, source de détection, systèmes concernés…"
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-400 hover:bg-cyan-500/25 transition-colors"
        >
          Créer l&apos;incident
        </button>
      </form>
    </div>
  );
}
