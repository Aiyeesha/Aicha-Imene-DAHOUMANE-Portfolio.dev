"use client";

// ProjectClientLogo.tsx
// ----------------------
// Logo of the client or organisation behind a project, served from
// /public/projects/{slug}/logo.webp (like cover.webp).
//
// Most projects have no logo, and that is the normal case: nothing is
// rendered, no placeholder. Logo presence is known at build time
// (lib/data/projectAssets.ts), so no request is made for a missing logo;
// onError remains as a safety net (corrupt file, stale manifest).

import Image from "next/image";
import { useState } from "react";
import { hasProjectLogo } from "@/lib/data/projectAssets";

const STORAGE_CDN = "/projects";

// "md": project page, next to the H1, above the fold → eager loading.
// "sm": cards (/projects grid, featured projects), many per page → lazy.
const SIZES = {
  md: { boxClass: "h-8 max-w-[140px]", imgClass: "h-8 w-auto", width: 140, height: 32 },
  sm: { boxClass: "h-5 max-w-[90px]", imgClass: "h-5 w-auto", width: 90, height: 20 },
} as const;

type Props = {
  slug: string;
  alt: string;
  size?: keyof typeof SIZES;
  loading?: "eager" | "lazy";
};

export default function ProjectClientLogo({ slug, alt, size = "md", loading = "eager" }: Props) {
  const [failed, setFailed] = useState(false);

  // No known logo for this project: nothing to fetch.
  if (failed || !hasProjectLogo(slug)) return null;

  const { boxClass, imgClass, width, height } = SIZES[size];

  return (
    <div className={`relative w-auto shrink-0 ${boxClass}`}>
      <Image
        src={`${STORAGE_CDN}/${slug}/logo.webp`}
        alt={alt}
        width={width}
        height={height}
        className={`object-contain object-left ${imgClass}`}
        unoptimized
        loading={loading}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
