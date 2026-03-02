"use client";

import Modal from "@/components/Modal";
import ProfileFactsCard from "@/components/ProfileFactsCard";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useTrack } from "./providers";

export default function TrackAwareHero() {
  const t = useTranslations();
  const { track } = useTrack();
  const locale = useLocale();

  // Public env vars (optional)
  const calendlyUrl = useMemo(() => process.env.NEXT_PUBLIC_CALENDLY_URL || "", []);
  // CV URL — track-aware + locale-aware bundled HTMLs, overridable via env var
  const cvPdfUrl = useMemo(
    () =>
      process.env.NEXT_PUBLIC_CV_PDF_URL ||
      process.env.NEXT_PUBLIC_CV_URL ||
      process.env.NEXT_PUBLIC_PROFILE_PDF_URL ||
      `/cv/cv-${locale}-${track}.pdf`,
    [locale, track]
  );

  const hasCvPdf = Boolean(cvPdfUrl);
// Public env var (optional). If not set, we use the bundled avatar in /public/avatar.webp
  const avatarUrl = useMemo(
    () => process.env.NEXT_PUBLIC_AVATAR_URL || "/avatar.webp",
    []
  );
  const [src, setSrc] = useState<string>(avatarUrl);
  const [calOpen, setCalOpen] = useState(false);

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[250px_1fr_380px] xl:grid-cols-[250px_1fr_420px]">
      {/* Avatar */}
      <div className="mx-auto lg:mx-0">
        {/* Gradient border: cyan → blue */}
        <div className="rounded-2xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 p-[3px] shadow-xl shadow-cyan-500/20 dark:shadow-cyan-400/15">
          <div className="relative h-[240px] w-[240px] overflow-hidden rounded-2xl bg-[#0d1b2e]">
            <Image
              src={src}
              alt={t("hero.avatar_alt")}
              fill
              priority
              sizes="240px"
              className="object-cover object-top"
              onError={() => setSrc("/avatar-placeholder.svg")}
            />
          </div>
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

          {calendlyUrl && (
            <button
              type="button"
              onClick={() => setCalOpen(true)}
              className="rounded-full border border-black/10 bg-black/5 px-5 py-2 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring"
            >
              {t("cta.call15")}
            </button>
          )}

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

      {/* Calendly modal */}
      {calendlyUrl && (
        <Modal open={calOpen} title={t("contact.bookCall")} onClose={() => setCalOpen(false)}>
          <div className="grid gap-3">
            <p className="text-sm text-muted">{t("contact.calendlyHint")}</p>
            <div className="overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
              <iframe title="Calendly" src={calendlyUrl} className="h-[70vh] w-full" loading="lazy" />
            </div>
            <div className="flex items-center justify-end gap-2">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
              >
                {t("contact.openInNewTab")}
              </a>
              <button
                type="button"
                onClick={() => setCalOpen(false)}
                className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring"
              >
                {t("contact.close")}
              </button>
            </div>
          </div>
        </Modal>
      )}
</div>
  );
}
