"use client";

// TrackAwareServicesLoader.tsx
// -----------------------------
// Loads TrackAwareServices on the client only (rendered on /work-with-me).
// ssr: false is deliberate: with server rendering, the dynamic() + Reveal
// chain sometimes left an unreconciled server DOM (missing icons and
// "operational maturity" block, track cookie ignored) until something forced
// a re-render. The dynamic() call lives in this Client Component so that a
// Server Component can also import it.

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
