"use client";

import { useTransition } from "react";
import { toggleChecklistItemAction } from "./actions";

export default function ChecklistItem({
  id,
  incidentId,
  label,
  isDone,
}: {
  id: string;
  incidentId: string;
  label: string;
  isDone: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <label
      className={`flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm transition-opacity cursor-pointer hover:bg-white/[0.05] ${
        isPending ? "opacity-50" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={isDone}
        disabled={isPending}
        onChange={() =>
          startTransition(() => toggleChecklistItemAction(id, isDone, incidentId))
        }
        className="mt-0.5 h-4 w-4 rounded border-white/20 bg-transparent accent-cyan-500"
      />
      <span className={isDone ? "text-slate-500 line-through" : "text-slate-200"}>
        {label}
      </span>
    </label>
  );
}
