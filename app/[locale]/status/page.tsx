// status/page.tsx
// ----------------
// Page de statut publique — affiche l'état opérationnel du site.
// Les données proviennent de uptime_pings (Supabase), alimenté par le cron
// quotidien app/api/cron/ping. Aucun appel sortant en direct au rendu (F5).
//
// Revalidation ISR : 60 secondes — statuts frais sans rebuild complet.

import Link from "next/link";
import type { Metadata } from "next";
import type { ServiceStatus } from "@/lib/health";
import { getUptimeStats, getLatencyHistory, getLatestPingReport } from "@/lib/uptime";
import LatencySparkline from "@/components/LatencySparkline";
import { getSiteUrl } from "@/lib/siteUrl";

// ISR : revalide toutes les 60 secondes
export const revalidate = 60;

// ── Types locaux ─────────────────────────────────────────────────────────────

type Locale = "en" | "fr";

// "maintenance" est un statut d'affichage uniquement (pas retourné par les checks)
type DisplayStatus = ServiceStatus | "maintenance";

// ── Descriptions des services (i18n) ─────────────────────────────────────────

const SERVICE_DESCRIPTIONS: Record<string, Record<Locale, string>> = {
  "Website":              { en: "Next.js frontend — pages, blog, projects",      fr: "Frontend Next.js — pages, blog, projets" },
  "Contact form":         { en: "Message delivery, rate-limiting, anti-spam",    fr: "Envoi de messages, limitation de débit, anti-spam" },
  "Database (Supabase)":  { en: "Projects, certifications, about — PostgreSQL",  fr: "Projets, certifications, à propos — PostgreSQL" },
  "Cache (Upstash Redis)":{ en: "Response caching and rate-limiting backend",    fr: "Cache des réponses et limitation de débit" },
  "Blog & MDX":           { en: "Salesforce & IT Ops articles — static build",   fr: "Articles Salesforce & IT Ops — build statique" },
  "PWA / Service Worker": { en: "Offline mode and static asset caching",         fr: "Mode hors-ligne et cache des fichiers statiques" },
};

// ── Configuration visuelle par statut ─────────────────────────────────────────

const STATUS_CONFIG: Record<
  DisplayStatus,
  { label: Record<Locale, string>; dot: string; badge: string; banner: string }
> = {
  operational: {
    label:  { en: "Operational", fr: "Opérationnel" },
    dot:    "bg-emerald-500",
    badge:  "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    banner: "border-emerald-500/20 bg-emerald-500/5",
  },
  degraded: {
    label:  { en: "Degraded", fr: "Dégradé" },
    dot:    "bg-amber-400",
    badge:  "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    banner: "border-amber-400/20 bg-amber-400/5",
  },
  outage: {
    label:  { en: "Outage", fr: "Panne" },
    dot:    "bg-rose-500",
    badge:  "bg-rose-500/10 text-rose-700 dark:text-rose-300",
    banner: "border-rose-500/20 bg-rose-500/5",
  },
  maintenance: {
    label:  { en: "Maintenance", fr: "Maintenance" },
    dot:    "bg-blue-400",
    badge:  "bg-blue-500/10 text-blue-700 dark:text-blue-300",
    banner: "border-blue-400/20 bg-blue-400/5",
  },
};

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const siteUrl = getSiteUrl();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
  const urlPath = `${siteUrl}/${locale}/status`;
  const title = isFr
    ? "Statut du site — Aïcha Imène DAHOUMANE"
    : "Site Status — Aïcha Imène DAHOUMANE";
  const description = isFr
    ? "État opérationnel en temps réel du site et de ses services."
    : "Real-time operational status of the site and its services.";
  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/status`,
        fr: `${siteUrl}/fr/status`,
        "x-default": `${siteUrl}/en/status`,
      },
    },
    openGraph: {
      title,
      description,
      url: urlPath,
      type: "website",
      locale: isFr ? "fr_FR" : "en_US",
      siteName,
      images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/twitter-image`],
    },
    robots: { index: false }, // page technique, pas d'intérêt SEO
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function StatusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = locale === "fr" ? "fr" : "en";
  const isFr = safeLocale === "fr";

  // Lit le dernier rapport stocké par le cron + stats uptime + historique latence.
  // Aucun appel sortant en direct — données issues de uptime_pings (Supabase).
  const [report, uptimeStats, latencyHistory] = await Promise.all([
    getLatestPingReport(),
    getUptimeStats(),
    getLatencyHistory(),
  ]);

  // Fallback si aucun ping n'a encore été enregistré (déploiement initial)
  const global   = report?.overall ?? "operational";
  const cfg      = STATUS_CONFIG[global];
  const checkedAt = report
    ? new Date(report.checkedAt).toLocaleString(isFr ? "fr-FR" : "en-US", { dateStyle: "medium", timeStyle: "short" })
    : "—";

  const labels = {
    headline:      isFr ? "Statut du site"           : "Site Status",
    breadcrumb:    isFr ? "Statut"                   : "Status",
    home:          isFr ? "Accueil"                  : "Home",
    ariaLabel:     isFr ? "Fil d'Ariane"             : "Breadcrumb",
    allOk:         isFr ? "Tous les systèmes sont opérationnels." : "All systems are operational.",
    degraded:      isFr ? "Certains services sont dégradés."      : "Some services are experiencing issues.",
    outage:        isFr ? "Une panne est en cours."               : "An outage is currently in progress.",
    maintenance:   isFr ? "Maintenance en cours."                 : "Maintenance in progress.",
    servicesTitle: isFr ? "Services"                 : "Services",
    lastChecked:   isFr ? "Vérifié le"               : "Last checked",
    latency:       isFr ? "Latence"                  : "Latency",
    sparklineLabel: isFr ? "Latence sur 7 jours"     : "7-day latency",
    backHome:      isFr ? "← Retour à l'accueil"    : "← Back to home",
    noIncidents:   isFr
      ? "Aucun incident signalé. Tout fonctionne normalement."
      : "No incidents reported. Everything is running normally.",
    incidentTitle: isFr ? "Historique des incidents" : "Incident history",
    apiLink:       isFr ? "Endpoint JSON brut ↗"    : "Raw JSON endpoint ↗",
  };

  const globalMessage =
    global === "operational" ? labels.allOk    :
    global === "degraded"    ? labels.degraded :
    global === "outage"      ? labels.outage   :
                               labels.maintenance;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">

      {/* ── Breadcrumb ────────────────────────────────────────────────────── */}
      <nav aria-label={labels.ariaLabel} className="mb-6 flex items-center gap-2 text-sm text-muted-2">
        <Link href={`/${safeLocale}`} className="hover:underline soft-ring rounded px-1">
          {labels.home}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-muted">{labels.breadcrumb}</span>
      </nav>

      {/* ── Bannière statut global ────────────────────────────────────────── */}
      <div className={`mb-10 flex items-center gap-4 rounded-2xl border p-6 ${cfg.banner}`}>
        <span className="relative flex h-4 w-4 flex-none" aria-hidden="true">
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:animate-none ${cfg.dot}`} />
          <span className={`relative inline-flex h-4 w-4 rounded-full ${cfg.dot}`} />
        </span>
        <div>
          <p className="text-base font-semibold">{globalMessage}</p>
          <p className="mt-0.5 text-xs text-muted-2">
            {labels.lastChecked} : {checkedAt}
          </p>
        </div>
      </div>

      {/* ── Liste des services ────────────────────────────────────────────── */}
      <section aria-labelledby="services-heading">
        <h2 id="services-heading" className="mb-4 text-xl font-semibold">
          {labels.servicesTitle}
        </h2>

        <div className="divide-y divide-black/5 dark:divide-white/5 rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
          {(report?.services ?? []).map((service) => {
            const s = STATUS_CONFIG[service.status];
            const desc = SERVICE_DESCRIPTIONS[service.name]?.[safeLocale] ?? "";
            return (
              <div
                key={service.name}
                className="flex items-center justify-between gap-2 bg-white dark:bg-white/[0.02] px-4 py-4 sm:gap-4 sm:px-6"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{service.name}</p>
                  <p className="truncate text-xs text-muted-2">{desc}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 sm:gap-3">
                  {/* Sparkline latence 7 jours — masquée sur petits écrans (<sm) */}
                  {(latencyHistory[service.name]?.length ?? 0) >= 2 && (
                    <span title={labels.sparklineLabel} className="hidden sm:inline">
                      <LatencySparkline data={latencyHistory[service.name]} />
                    </span>
                  )}
                  {/* Latence instantanée (uniquement si mesurée et significative) */}
                  {service.latencyMs !== null && service.latencyMs > 0 && (
                    <span className="text-xs text-muted-2 tabular-nums">
                      {service.latencyMs} ms
                    </span>
                  )}
                  {/* Uptime % sur 30 jours — affiché dès que 3 pings existent */}
                  {uptimeStats[service.name] != null && (
                    <span
                      className="text-xs text-muted-2 tabular-nums"
                      title={isFr ? "Disponibilité sur 30 jours" : "30-day uptime"}
                    >
                      {uptimeStats[service.name]}%
                    </span>
                  )}
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${s.badge}`}>
                    {s.label[safeLocale]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Historique incidents ──────────────────────────────────────────── */}
      <section aria-labelledby="incidents-heading" className="mt-10">
        <h2 id="incidents-heading" className="mb-4 text-xl font-semibold">
          {labels.incidentTitle}
        </h2>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.02] px-6 py-8 text-center">
          <p className="text-sm text-muted-2">{labels.noIncidents}</p>
        </div>
      </section>

      {/* ── Lien endpoint JSON ────────────────────────────────────────────── */}
      <div className="mt-6 text-center">
        <a
          href="/api/health"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-muted-2 hover:underline soft-ring rounded"
        >
          {labels.apiLink}
        </a>
      </div>

      {/* ── Retour accueil ────────────────────────────────────────────────── */}
      <div className="mt-10 border-t border-black/10 dark:border-white/10 pt-8">
        <Link
          href={`/${safeLocale}`}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-5 py-2.5 text-sm text-muted-2 hover:bg-black/5 dark:hover:bg-white/5 soft-ring transition-colors"
        >
          {labels.backHome}
        </Link>
      </div>
    </div>
  );
}
