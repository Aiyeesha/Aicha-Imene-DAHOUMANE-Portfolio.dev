// lib/incidentProgress.ts
// -------------------------
// Pure computations on incident checklists, kept apart from
// lib/incidents.ts (which imports "server-only") so Jest can test
// them directly without mocks (see CONTRIBUTING.md → Testing).
import type { ChecklistPhase } from "@/lib/incidentPlaybooks";

export type ChecklistProgressItem = { is_done: boolean };
export type ChecklistPhaseItem = { phase: ChecklistPhase };

export function computeChecklistProgress(items: ChecklistProgressItem[]): {
  done: number;
  total: number;
  percent: number;
} {
  const total = items.length;
  const done = items.filter((item) => item.is_done).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return { done, total, percent };
}

export function groupChecklistByPhase<T extends ChecklistPhaseItem>(
  items: T[]
): Partial<Record<ChecklistPhase, T[]>> {
  const groups: Partial<Record<ChecklistPhase, T[]>> = {};
  for (const item of items) {
    if (!groups[item.phase]) groups[item.phase] = [];
    groups[item.phase]!.push(item);
  }
  return groups;
}
