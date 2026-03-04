"use client";

// track-aware-hero.tsx
// --------------------
// Hero section simplifiée : photo + titre + 3 badges + 2 CTAs max.
// Objectif UX : lisible en 6-10 secondes, tient en un seul écran.
// - "En bref" (ProfileFactsCard) déplacé vers la page About
// - "Lire la suite" (ProfileNarrative) déplacé vers la page About
// - "Appel 15 min" déplacé dans la section Contact (CalendlyModal déjà présent dans ContactForm)
// - Quick navigation supprimée (la navbar remplit ce rôle)

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useTrack } from "./providers";

export default function TrackAwareHero() {
  const t = useTranslations();
  const { track, setTrack } = useTrack();
  const locale = useLocale();

  // URL du CV — adaptée au parcours (track) et à la langue (locale), avec fallback sur env var
  const cvPdfUrl = useMemo(
    () =>
      process.env.NEXT_PUBLIC_CV_PDF_URL ||
      process.env.NEXT_PUBLIC_CV_URL ||
      process.env.NEXT_PUBLIC_PROFILE_PDF_URL ||
      `/cv/cv-${locale}-${track}.pdf`,
    [locale, track]
  );

  // Avatar : env var publique ou image locale dans /public/avatar.webp
  const avatarUrl = useMemo(
    () => process.env.NEXT_PUBLIC_AVATAR_URL || "/avatar.webp",
    []
  );
  // Fallback si l'image ne se charge pas
  const [src, setSrc] = useState<string>(avatarUrl);

  return (
    // Grille 2 colonnes sur desktop : [avatar | texte]
    // La colonne "En bref" a été retirée → déplacée dans la page About
    <div className="grid items-center gap-8 lg:grid-cols-[250px_1fr]">

      {/* Colonne 1 — Avatar avec bordure gradient cyan→bleu */}
      <div className="mx-auto lg:mx-0">
        <div className="rounded-2xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 p-[3px] shadow-xl shadow-cyan-500/20 dark:shadow-cyan-400/15">
          <div className="relative h-[240px] w-[240px] overflow-hidden rounded-2xl bg-[#0d1b2e]">
            <Image
              src={src}
              alt={t("hero.avatar_alt")}
              fill
              priority
              // Taille réelle d'affichage : 240px — évite de charger une image 3840px
              sizes="(max-width: 768px) 200px, 240px"
              className="object-cover object-top"
              onError={() => setSrc("/avatar-placeholder.svg")}
            />
          </div>
        </div>
      </div>

      {/* Colonne 2 — Texte : qui ? quoi ? pourquoi ? */}
      <div>
        {/* Accroche courte au-dessus du titre (proposition de valeur) */}
        <p className="text-sm font-medium text-cyan-800 dark:text-cyan-200">
          {track === "salesforce" ? t("hero.value_salesforce") : t("hero.value_itops")}
        </p>

        {/* Titre principal H1 + sous-titre (1 phrase) */}
        <h1 className="mt-2 text-4xl sm:text-5xl font-semibold leading-tight">
          <span className="block">
            {track === "salesforce" ? t("hero.title_salesforce") : t("hero.title_itops")}
          </span>
          <span className="mt-1 block text-xl sm:text-2xl font-semibold text-cyan-700 dark:text-cyan-200">
            {track === "salesforce" ? t("hero.subtitle_salesforce") : t("hero.subtitle_itops")}
          </span>
        </h1>

        {/* Intro 1 phrase — répond à "pourquoi travailler avec moi ?" */}
        <p className="mt-3 max-w-2xl text-muted text-base sm:text-lg">
          {track === "salesforce" ? t("hero.intro_salesforce") : t("hero.intro_itops")}
        </p>

        {/* 3 badges de valeur — scanning rapide en moins de 3 secondes */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="chip">{t("hero.proof1")}</span>
          <span className="chip">{t("hero.proof2")}</span>
          <span className="chip">{t("hero.proof3")}</span>
        </div>

        {/* CTAs — 1 principal + 1 secondaire discret
            Le bouton "Appel 15 min" a été déplacé dans la section Contact
            (CalendlyModal est déjà inclus dans ContactForm) */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {/* CTA principal : action immédiate */}
          <a
            className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring"
            href="#contact"
          >
            {t("cta.workWithMe")}
          </a>

          {/* CTA secondaire : téléchargement CV (toujours présent avec fallback) */}
          <a
            className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
            href={cvPdfUrl}
            target="_blank"
            rel="noreferrer"
          >
            {t("cta.downloadCv")} ↓
          </a>
        </div>

        {/* Hint de changement de profil — invite à switcher vers l'autre track
            S'affiche toujours, adapté au track actif, action directe (setTrack). */}
        <p className="mt-4 text-xs text-muted-2">
          <button
            type="button"
            onClick={() => setTrack(track === "salesforce" ? "itops" : "salesforce")}
            className="underline underline-offset-2 hover:text-muted transition-colors soft-ring rounded"
          >
            {track === "salesforce"
              ? t("hero.switchToItops")
              : t("hero.switchToSalesforce")}
          </button>
        </p>
      </div>
    </div>
  );
}
