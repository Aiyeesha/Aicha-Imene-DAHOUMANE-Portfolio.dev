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
// "tile": cards (/projects grid, featured projects), many per page → lazy.
//   Overlaid on the bottom-left corner of the cover (the parent must be
//   positioned) in a white tile: the logos are opaque, often near-square
//   images, which at the former 20px height (≈ 23×20px) were unreadable and
//   looked like broken images. 32px inside a padded tile, without adding
//   height to the card.
const SIZES = {
  md: { boxClass: "relative h-8 max-w-[140px]", imgClass: "h-8 w-auto", width: 140, height: 32 },
  tile: {
    boxClass: "absolute bottom-2 left-2 z-10 h-10 max-w-[140px] rounded-lg bg-white p-1 shadow-sm ring-1 ring-black/10",
    imgClass: "h-8 w-auto",
    width: 140,
    height: 32,
  },
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
    <div className={`w-auto shrink-0 ${boxClass}`}>
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
