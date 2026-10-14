"use client";

import { useTransition } from "react";
import { revalidateSite } from "./actions";

export default function RevalidateButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => startTransition(() => revalidateSite())}
      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/4 px-4 py-2 text-sm text-slate-300 hover:bg-white/8 transition-colors disabled:opacity-50"
    >
      {isPending ? (
        <span className="animate-spin">↻</span>
      ) : (
        <span>↻</span>
      )}
      {isPending ? "Revalidation…" : "Revalider le cache"}
    </button>
  );
}
