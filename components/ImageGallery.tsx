"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import SafeImage from "@/components/SafeImage";
import { isGenericAlt } from "@/lib/galleryAlt";

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
  title,
  className = ""
}: {
  images: GalleryImage[];
  /** Nom du projet : sert à remplacer les textes alternatifs génériques. */
  title: string;
  className?: string;
}) {
  const t = useTranslations();
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const altFor = (img: GalleryImage, i: number) =>
    isGenericAlt(img.alt)
      ? t("a11y.galleryImageAlt", { title, index: i + 1, total: safeImages.length })
      : img.alt;
  const [idx, setIdx] = useState(0);

  if (safeImages.length === 0) return null;

  const current = safeImages[Math.min(idx, safeImages.length - 1)];

  return (
    <div className={className}>
      <div className="card overflow-hidden">
        <div className="relative aspect-video w-full">
          <SafeImage
            src={current.src}
            alt={altFor(current, safeImages.indexOf(current))}
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-contain bg-white/90 dark:bg-white/10"
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
                "relative h-16 w-28 shrink-0 overflow-hidden rounded-xl border transition-colors",
                i === idx
                  ? "border-cyan-400/50"
                  : "border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20"
              ].join(" ")}
              aria-label={t("a11y.showImage", { index: i + 1 })}
            >
              {/* Vignette décorative : le bouton porte déjà son nom (« Afficher l'image N ») */}
              <SafeImage src={img.src} alt="" sizes="112px" className="object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
