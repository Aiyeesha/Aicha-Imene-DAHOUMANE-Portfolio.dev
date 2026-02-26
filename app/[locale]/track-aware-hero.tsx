"use client";

import ProfileFactsCard from "@/components/ProfileFactsCard";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useTrack } from "./providers";

export default function TrackAwareHero() {
  const t = useTranslations();
  const { track } = useTrack();

  // Public env vars (optional)
  const calendlyUrl = useMemo(() => process.env.NEXT_PUBLIC_CALENDLY_URL || "", []);
  // CV / Profile PDF URL
  // - Prefer NEXT_PUBLIC_CV_PDF_URL (more explicit)
  // - Fallback to legacy NEXT_PUBLIC_PROFILE_PDF_URL
  // - Final fallback to a bundled asset
  const cvPdfUrl = useMemo(
    () =>
      process.env.NEXT_PUBLIC_CV_PDF_URL ||
      process.env.NEXT_PUBLIC_CV_URL ||
      process.env.NEXT_PUBLIC_PROFILE_PDF_URL ||
      "",
    []
  );

  const hasCvPdf = Boolean(cvPdfUrl);
// Public env var (optional). If not set, we use the bundled avatar in /public/avatar.webp
  const avatarUrl = useMemo(
    () => process.env.NEXT_PUBLIC_AVATAR_URL || "/avatar.webp",
    []
  );
  const [src, setSrc] = useState<string>(avatarUrl);

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[120px_1fr_380px] xl:grid-cols-[120px_1fr_420px]">
      {/* Avatar */}
      <div className="mx-auto lg:mx-0">
        <div className="relative h-[112px] w-[112px] overflow-hidden rounded-full ring-1 ring-black/10 dark:ring-white/10 shadow-[0_0_0_6px_rgba(34,211,238,0.08)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            src={src}
            alt={t("hero.avatar_alt")}
            fill
            priority
            sizes="112px"
            className="object-cover"
            onError={() => setSrc("/avatar-placeholder.svg")}
          />
        </div>
      </div>

      {/* Text */}
      <div>
        {/* Proposition de valeur (above the fold) */}
        <p className="text-sm font-medium text-cyan-800 dark:text-cyan-200">
          {track === "salesforce" ? t("hero.value_salesforce") : t("hero.value_itops")}
        </p>

        <h1 className="mt-2 text-4xl sm:text-5xl font-semibold leading-tight">
          <span className="block">
            {track === "salesforce" ? t("hero.title_salesforce") : t("hero.title_itops")}
          </span>
          <span className="mt-1 block text-xl sm:text-2xl font-semibold text-cyan-700 dark:text-cyan-200">
            {track === "salesforce" ? t("hero.subtitle_salesforce") : t("hero.subtitle_itops")}
          </span>
        </h1>

        <p className="mt-3 max-w-2xl text-muted text-base sm:text-lg">
          {track === "salesforce" ? t("hero.intro_salesforce") : t("hero.intro_itops")}
        </p>

        {/* Proof chips (fast scanning) */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="chip">{t("hero.proof1")}</span>
          <span className="chip">{t("hero.proof2")}</span>
          <span className="chip">{t("hero.proof3")}</span>
        </div>

        {/* CTAs (keep decision simple: 1 primary + 1 secondary + 1 tertiary) */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring"
            href="#contact"
          >
            {t("cta.workWithMe")}
          </a>

          <a
            className={`rounded-full border border-black/10 bg-black/5 px-5 py-2 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring ${
              calendlyUrl ? "" : "pointer-events-none opacity-50"
            }`}
            href={calendlyUrl || "#"}
            target={calendlyUrl ? "_blank" : undefined}
            rel={calendlyUrl ? "noreferrer" : undefined}
            aria-disabled={!calendlyUrl}
            title={!calendlyUrl ? t("contact.bookCallMissing") : undefined}
          >
            {t("cta.call15")}
          </a>

          {hasCvPdf ? (
          <a
            className="rounded-full px-2 py-1 text-sm text-cyan-800 hover:underline dark:text-cyan-200 soft-ring"
            href={cvPdfUrl}
            target="_blank"
            rel="noreferrer"
          >
            {t("cta.downloadCv")} →
          </a>
        ) : (
          <span className="rounded-full px-2 py-1 text-sm text-muted-2">
            {t("cta.cvOnRequest")}
          </span>
        )}
        </div>

        {/* Quick navigation (reduces scrolling friction) */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-2">
          <span className="font-medium text-muted">{t("hero.startHere")}</span>
          <a className="text-cyan-800 hover:underline dark:text-cyan-200" href="#projects">
            {t("cta.projects")}
          </a>
          <a className="text-cyan-800 hover:underline dark:text-cyan-200" href="#skills">
            {t("nav.skills")}
          </a>
          <a className="text-cyan-800 hover:underline dark:text-cyan-200" href="#contact">
            {t("nav.contact")}
          </a>
        </div>


      </div>

      {/* At a glance */}
      <div>
        <ProfileFactsCard delayMs={140} />
      </div>
</div>
  );
}
