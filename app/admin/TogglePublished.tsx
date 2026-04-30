"use client";

import { useTransition } from "react";
import { toggleTestimonialPublished } from "./actions";

export default function TogglePublished({
  id,
  isPublished,
}: {
  id: string;
  isPublished: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() =>
        startTransition(() => toggleTestimonialPublished(id, isPublished))
      }
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-opacity disabled:opacity-50 cursor-pointer ${
        isPublished
          ? "bg-emerald-500/15 text-emerald-400 hover:bg-red-500/15 hover:text-red-400"
          : "bg-amber-500/15 text-amber-400 hover:bg-emerald-500/15 hover:text-emerald-400"
      }`}
    >
      {isPending ? "…" : isPublished ? "Publié ✓" : "Masqué"}
    </button>
  );
}
