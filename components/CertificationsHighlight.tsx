"use client";
// components/CertificationsHighlight.tsx
// --------------------------------------
// Compact "Certifications" block on the home page, below the experience
// timeline: the key proofs without a click, with a link to /certifications
// for the details. Three cards:
//   1. Earned: the RNCP 6 and RNCP 5 titles, ordered by the active track
//      (Salesforce: RNCP 6 first; IT Ops: RNCP 5 Systems & Networks first).
//   2. Trailhead: rank, badges and points.
//   3. Booked exams: dates from SCHEDULED_EXAMS, worded by examTargetLabel()
//      (after the exam day: "exam taken, result pending").
// Data comes from content/certifications.ts, like the /certifications page:
// one place to update after each result.
// Client component for the track (useTrack); the provider is initialised
// from the `track` cookie, so the server HTML already matches the track.

import Link from "next/link";
import { useTrack } from "@/app/[locale]/providers";
import { SCHEDULED_EXAMS, examTargetLabel, trailheadProfile } from "@/content/certifications";

type Locale = "fr" | "en" | "es";

// ── Localised labels ─────────────────────────────────────────────────────────
const L = {
  fr: {
    earned: "✓ Obtenu",
    active: "↻ Actif",
    booked: "📅 Programmés",
    rncp6: "Titre RNCP niveau 6 — Développeur Concepteur Logiciel",
    rncp6Sub: "OpenClassrooms · spécialisation Salesforce · 2025",
    rncp5: "Titre RNCP niveau 5 — Technicienne Supérieure Systèmes & Réseaux",
    rncp5Sub: "GRETA du Val d'Oise · 2023",
    trailheadRank: `Trailhead · rang ${trailheadProfile.rank}`,
    badges: "badges",
    points: "points",
    trailheadSub: "Profil public, vérifiable en ligne",
    more: "Voir toutes les certifications",
  },
  en: {
    earned: "✓ Earned",
    active: "↻ Active",
    booked: "📅 Booked",
    rncp6: "RNCP Level 6 — Développeur Concepteur Logiciel (software design & development)",
    rncp6Sub: "OpenClassrooms · Salesforce specialization · 2025",
    rncp5: "RNCP Level 5 — Higher Technician in Systems & Networks",
    rncp5Sub: "GRETA du Val d'Oise · 2023",
    trailheadRank: `Trailhead · ${trailheadProfile.rank} rank`,
    badges: "badges",
    points: "points",
    trailheadSub: "Public profile, verifiable online",
    more: "See all certifications",
  },
  es: {
    earned: "✓ Obtenido",
    active: "↻ Activo",
    booked: "📅 Programados",
    rncp6: "Título RNCP nivel 6 — Développeur Concepteur Logiciel (diseño y desarrollo de software)",
    rncp6Sub: "OpenClassrooms · especialización Salesforce · 2025",
    rncp5: "Título RNCP nivel 5 — Técnica Superior en Sistemas y Redes",
    rncp5Sub: "GRETA du Val d'Oise · 2023",
    trailheadRank: `Trailhead · rango ${trailheadProfile.rank}`,
    badges: "insignias",
    points: "puntos",
    trailheadSub: "Perfil público, verificable en línea",
    more: "Ver todas las certificaciones",
  },
} as const;

const NUMBER_LOCALE: Record<Locale, string> = { fr: "fr-FR", en: "en-US", es: "es-ES" };

export default function CertificationsHighlight({ locale: rawLocale }: { locale: string }) {
  const locale: Locale = rawLocale === "fr" ? "fr" : rawLocale === "es" ? "es" : "en";
  const t = L[locale];
  const { track } = useTrack();

  // Diplomas: the one closest to the active track first.
  const rncp6 = { title: t.rncp6, sub: t.rncp6Sub };
  const rncp5 = { title: t.rncp5, sub: t.rncp5Sub };
  const diplomas = track === "itops" ? [rncp5, rncp6] : [rncp6, rncp5];

  const exams = [
    { name: "Salesforce Platform Foundations", label: examTargetLabel(SCHEDULED_EXAMS.platformFoundations, locale) },
    { name: "Salesforce Platform Administrator", label: examTargetLabel(SCHEDULED_EXAMS.platformAdministrator, locale) },
  ];

  const fmt = (n: number) => n.toLocaleString(NUMBER_LOCALE[locale]);

  // Status pill, same colours as the /certifications page.
  const pill = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border";

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold">Certifications</h3>

      <ul className="mt-4 grid gap-4 md:grid-cols-3">
        {/* 1. Earned diplomas */}
        <li className="card p-5">
          <span className={`${pill} bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800`}>
            {t.earned}
          </span>
          <ul className="mt-3 grid gap-3">
            {diplomas.map((d) => (
              <li key={d.title}>
                <p className="text-sm font-semibold leading-snug">{d.title}</p>
                <p className="mt-0.5 text-xs text-muted-2">{d.sub}</p>
              </li>
            ))}
          </ul>
        </li>

        {/* 2. Trailhead profile */}
        <li className="card p-5">
          <span className={`${pill} bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800`}>
            {t.active}
          </span>
          <p className="mt-3 text-sm font-semibold">{t.trailheadRank}</p>
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <span><strong className="text-lg tabular-nums">{fmt(trailheadProfile.badges)}</strong> {t.badges}</span>
            <span><strong className="text-lg tabular-nums">{fmt(trailheadProfile.points)}</strong> {t.points}</span>
          </p>
          <a
            href={trailheadProfile.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-xs text-muted-2 underline underline-offset-4 hover:opacity-80 soft-ring rounded-sm"
          >
            {t.trailheadSub}
            <span aria-hidden="true"> ↗</span>
          </a>
        </li>

        {/* 3. Booked exams */}
        <li className="card p-5">
          <span className={`${pill} bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800`}>
            {t.booked}
          </span>
          <ul className="mt-3 grid gap-3">
            {exams.map((e) => (
              <li key={e.name}>
                <p className="text-sm font-semibold leading-snug">{e.name}</p>
                <p className="mt-0.5 text-xs text-muted-2">{e.label}</p>
              </li>
            ))}
          </ul>
        </li>
      </ul>

      <Link
        href={`/${locale}/certifications`}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
      >
        {t.more}
        <span aria-hidden="true"> →</span>
      </Link>
    </div>
  );
}
