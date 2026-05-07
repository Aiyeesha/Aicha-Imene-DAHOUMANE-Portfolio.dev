"use client";

// BlogAuthorCard.tsx
// ------------------
// Carte "À propos de l'auteure" affichée en bas de chaque article.
// Track-aware : contenu, couleur d'accent et badge s'adaptent au track actif
// (Salesforce → cyan / IT Ops → violet), exactement comme AboutTrackIntro.

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useTrack } from "@/app/[locale]/providers";

type Props = {
  authorName: string;
  avatarUrl:  string;
  locale:     string;
  linkedInUrl?: string;
};

export default function BlogAuthorCard({ authorName, avatarUrl, locale, linkedInUrl }: Props) {
  const t            = useTranslations("blogPost");
  const { track }    = useTrack();
  const isSalesforce = track === "salesforce";

  // Styles selon le track — miroir exact d'AboutTrackIntro
  const badgeClass = isSalesforce
    ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
    : "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300";

  const borderClass = isSalesforce
    ? "border-cyan-500/20"
    : "border-violet-500/20";

  const roleClass = isSalesforce
    ? "text-cyan-700 dark:text-cyan-400"
    : "text-violet-700 dark:text-violet-400";

  const trackLabel = isSalesforce ? "Salesforce" : "IT Ops";

  return (
    <div className={`rounded-2xl border p-6 space-y-4 ${borderClass}`}>

      {/* Ligne haute — avatar + identité + badge track */}
      <div className="flex items-center gap-4">
        <div className={`shrink-0 rounded-full p-[2.5px] ${isSalesforce ? "bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600" : "bg-gradient-to-br from-violet-400 via-purple-500 to-violet-600"}`}>
          <Image
            src={avatarUrl}
            alt={authorName}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover object-top"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-2">
            {t("author")}
          </div>
          <div className="mt-0.5 font-semibold text-strong leading-tight">{authorName}</div>
          <div className={`text-sm font-medium ${roleClass}`}>{t("authorRole")}</div>
        </div>

        {/* Badge track — même style qu'AboutTrackIntro */}
        <span className={`hidden sm:inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold shrink-0 ${badgeClass}`}>
          {trackLabel}
        </span>
      </div>

      {/* Bio track-aware */}
      <p className="text-sm leading-relaxed text-muted">{t("authorBio")}</p>

      {/* Liens */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <Link
          href={`/${locale}/about`}
          className={`inline-flex items-center gap-1 rounded-full border px-4 py-1.5 text-xs font-medium soft-ring transition-colors hover:opacity-80 ${isSalesforce ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300" : "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300"}`}
        >
          {t("authorProfileLink")}
        </Link>
        {linkedInUrl && (
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1.5 text-xs font-medium hover:bg-black/10 dark:hover:bg-white/10 soft-ring transition-colors"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 opacity-60">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}
