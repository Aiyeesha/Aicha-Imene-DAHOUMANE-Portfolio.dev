"use client";

// TrackAwareServicesLoader.tsx
// -----------------------------
// `next/dynamic(..., { ssr: false })` can't be called directly inside a Server
// Component (app/[locale]/page.tsx) — Next.js requires the ssr:false dynamic()
// call to live in a Client Component. This is that thin wrapper; page.tsx
// imports it normally instead of calling dynamic() itself.
//
// Why ssr:false at all: see the comment on this import in page.tsx.

import dynamic from "next/dynamic";
import SkeletonCard from "@/components/SkeletonCard";

const TrackAwareServices = dynamic(() => import("@/components/TrackAwareServices"), {
  ssr: false,
  loading: () => (
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      <SkeletonCard />
      <SkeletonCard />
    </div>
  ),
});

export default TrackAwareServices;
