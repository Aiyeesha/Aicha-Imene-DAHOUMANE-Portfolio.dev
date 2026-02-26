"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

export type GalleryImage = { src: string; alt: string };

/**
 * ImageGallery
 * ------------
 * Lightweight gallery:
 * - Main 16:9 preview
 * - Thumbnail strip (horizontal scroll)
 * - No external dependencies
 */
export default function ImageGallery({
  images,
  className = ""
}: {
  images: GalleryImage[];
  className?: string;
}) {
  const t = useTranslations();
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [idx, setIdx] = useState(0);

  if (safeImages.length === 0) return null;

  const current = safeImages[Math.min(idx, safeImages.length - 1)];

  return (
    <div className={className}>
      <div className="card overflow-hidden">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-contain bg-black/5 dark:bg-white/5"
            /*
             * Only prioritize the first image to improve perceived loading performance (LCP).
             * When idx === 0 the first image is visible, so we set priority to true.
             * Subsequent images will not be preloaded unnecessarily.
             */
            priority={idx === 0}
          />
        </div>
      </div>

      {safeImages.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {safeImages.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              type="button"
              onClick={() => setIdx(i)}
              className={[
                "relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-xl border transition-colors",
                i === idx
                  ? "border-cyan-400/50"
                  : "border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20"
              ].join(" ")}
              aria-label={t("a11y.showImage", { index: i + 1 })}
            >
              <Image src={img.src} alt={img.alt} fill sizes="112px" className="object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
