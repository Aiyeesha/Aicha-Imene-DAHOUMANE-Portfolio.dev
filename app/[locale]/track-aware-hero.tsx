"use client";

// track-aware-hero.tsx
// --------------------
// Hero section : photo + titre + tagline percutante + proof tags + CTAs.
// Deux variantes selon le track toggle (Salesforce / IT Ops).
//
// Animations (Framer Motion) :
//   - Entrance stagger : avatar + bloc texte s'animent en séquence au chargement
//   - Track switch     : AnimatePresence fade-slide sur le contenu dynamique
//   - Parallaxe avatar : léger décalage vertical de l'avatar au scroll (useScroll)
//   - Reduced motion   : toutes les animations sont désactivées si prefers-reduced-motion

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useTrack } from "./providers";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import CalendlyModal from "@/components/CalendlyModal";
import AvailabilityModal from "@/components/AvailabilityModal";

// ── Variants Framer Motion ─────────────────────────────────────────────────
// Container : orchestre le stagger des enfants — pas d'opacité propre.
// Le container reste visible (opacity: 1) dès le premier paint pour que
// l'image avatar (priority, LCP) soit immédiatement rendue, même avant
// que Framer Motion n'ait hydraté. Seul le bloc texte fait un fade-in.
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

// Avatar : zoom léger seulement — opacity reste à 1 pour ne pas retarder le LCP
const avatarVariants: Variants = {
  hidden: { opacity: 1, scale: 0.93 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Bloc texte : glisse depuis le bas
const textBlockVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function TrackAwareHero() {
  const t = useTranslations();
  const { track, setTrack } = useTrack();
  const locale = useLocale();
  const shouldReduce = useReducedMotion();

  // ── Parallaxe avatar ───────────────────────────────────────────────────────
  // scrollY : 0 → 400px de scroll → avatar remonte de 0 → -28px (subtil).
  // Désactivé si prefers-reduced-motion (useTransform appelé inconditionnellement
  // mais appliqué seulement si !shouldReduce pour respecter la règle des hooks).
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 400], [0, -28]);

  // URL du CV — toujours calculée en fonction du track ET de la locale.
  //
  // Priorité :
  //   1. NEXT_PUBLIC_CV_PDF_URL si elle contient les tokens {locale} et/ou {track}
  //      (ex: "https://storage.example.com/cv-{locale}-{track}.pdf")
  //   2. Pattern local : /cv/cv-{locale}-{track}.pdf  (4 fichiers dans /public/cv/)
  //
  // Une URL statique sans token dans NEXT_PUBLIC_CV_PDF_URL est ignorée
  // volontairement : elle servirait le même PDF quelle que soit la langue/le track,
  // ce qui est précisément le bug à corriger.
  const cvPdfUrl = useMemo(() => {
    const envUrl =
      process.env.NEXT_PUBLIC_CV_PDF_URL ||
      process.env.NEXT_PUBLIC_CV_URL ||
      process.env.NEXT_PUBLIC_PROFILE_PDF_URL;

    if (envUrl && (envUrl.includes("{locale}") || envUrl.includes("{track}"))) {
      // L'env var est un template : remplace les tokens
      return envUrl
        .replace(/\{locale\}/g, locale)
        .replace(/\{track\}/g, track);
    }

    // Fallback : fichiers locaux dans /public/cv/
    return `/cv/cv-${locale}-${track}.pdf`;
  }, [locale, track]);

  // Avatar : env var ou image locale
  const avatarUrl = useMemo(
    () => process.env.NEXT_PUBLIC_AVATAR_URL || "/avatar.webp",
    []
  );
  const [src, setSrc] = useState<string>(avatarUrl);

  // Proof tags différenciés par track
  const proofTags =
    track === "salesforce"
      ? [
          t("hero.proof1_salesforce"),
          t("hero.proof2_salesforce"),
          t("hero.proof3_salesforce"),
        ]
      : [
          t("hero.proof1_itops"),
          t("hero.proof2_itops"),
          t("hero.proof3_itops"),
        ];

  return (
    <motion.div
      className="grid items-center gap-8 lg:grid-cols-[260px_1fr]"
      // Entrance stagger (désactivé si reduced motion)
      variants={shouldReduce ? {} : containerVariants}
      initial={shouldReduce ? false : "hidden"}
      animate="visible"
    >
      {/* ── Colonne 1 — Avatar avec bordure gradient cyan→bleu ─────────────── */}
      {/* style.y : parallaxe au scroll (désactivé si prefers-reduced-motion) */}
      <motion.div
        className="mx-auto lg:mx-0"
        variants={shouldReduce ? {} : avatarVariants}
        style={shouldReduce ? undefined : { y: parallaxY }}
      >
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
      </motion.div>

      {/* ── Colonne 2 — Texte ────────────────────────────────────────────────── */}
      <motion.div variants={shouldReduce ? {} : textBlockVariants}>

        {/* Badge de disponibilité — cliquable → ouvre la modale de détails */}
        <div className="mb-4">
          <AvailabilityModal />
        </div>

        {/* Contenu dynamique (track-dépendant) — anime au changement de track */}
        <AnimatePresence mode="wait">
          <motion.div
            key={track}
            initial={shouldReduce ? false : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduce ? {} : { opacity: 0, x: -10 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            {/* Accroche courte — proposition de valeur immédiate */}
            <p className="text-sm font-medium text-cyan-800 dark:text-cyan-300">
              {track === "salesforce" ? t("hero.value_salesforce") : t("hero.value_itops")}
            </p>

            {/* Titre H1 en Space Grotesk */}
            <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold leading-tight tracking-tight">
              <span className="block">
                {track === "salesforce" ? t("hero.title_salesforce") : t("hero.title_itops")}
              </span>
              <span className="mt-1 block text-xl sm:text-2xl font-medium text-cyan-700 dark:text-cyan-300">
                {track === "salesforce" ? t("hero.subtitle_salesforce") : t("hero.subtitle_itops")}
              </span>
            </h1>

            {/* Tagline percutante — répond à "pourquoi travailler avec moi ?" */}
            <p className="mt-3 max-w-2xl text-muted text-base sm:text-lg leading-relaxed">
              {track === "salesforce" ? t("hero.intro_salesforce") : t("hero.intro_itops")}
            </p>

            {/* Proof tags — différents selon le track */}
            <div className="mt-4 flex flex-wrap gap-2">
              {proofTags.map((tag) => (
                <span key={tag} className="chip">{tag}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTAs — statiques, ne réaniment pas au changement de track */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {/* CTA primaire : scroll vers la section contact */}
          <a
            className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring transition-opacity"
            href="#contact"
            onClick={() => trackEvent("contact_click", { locale, track })}
          >
            {t("cta.workWithMe")}
          </a>

          {/* CTA secondaire 1 : ouvre la modale Calendly (disparaît si URL non configurée) */}
          <CalendlyModal variant="hero" />

          {/* CTA secondaire 2 : télécharge le CV PDF */}
          <a
            className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring transition-colors"
            href={cvPdfUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("cv_download", { locale, track })}
          >
            {t("cta.downloadCv")} ↓
          </a>
        </div>

        {/* Hint de switch de profil */}
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
      </motion.div>
    </motion.div>
  );
}
