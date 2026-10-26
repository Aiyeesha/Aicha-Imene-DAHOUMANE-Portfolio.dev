// status/page.tsx
// ----------------
// Public status page. Data comes from uptime_pings (Supabase), filled by the
// daily cron (app/api/cron/ping); no outgoing check runs at render time.

import Link from "next/link";
import type { Metadata } from "next";
import type { ServiceStatus } from "@/lib/health";
import { getUptimeStats, getLatencyHistory, getLatestPingReport } from "@/lib/uptime";
import LatencySparkline from "@/components/LatencySparkline";
import { getSiteUrl } from "@/lib/siteUrl";

// 60-second ISR. Currently no effect: app/layout.tsx reads headers(), which
// makes the route dynamic. Data freshness comes from the Redis cache in
// lib/uptime.ts.
export const revalidate = 60;

// ── Local types ──────────────────────────────────────────────────────────────

type Locale = "en" | "fr" | "es";

// "maintenance" is display-only (never returned by the checks)
type DisplayStatus = ServiceStatus | "maintenance";

// ── Service descriptions (i18n) ──────────────────────────────────────────────

const SERVICE_DESCRIPTIONS: Record<string, Record<Locale, string>> = {
  "Website":              { en: "Next.js frontend — pages, blog, projects",      fr: "Frontend Next.js — pages, blog, projets",              es: "Frontend Next.js — páginas, blog, proyectos" },
  "Contact form":         { en: "Message delivery, rate-limiting, anti-spam",    fr: "Envoi de messages, limitation de débit, anti-spam",    es: "Envío de mensajes, limitación de tasa, anti-spam" },
  "Database (Supabase)":  { en: "Projects, contact, testimonials — PostgreSQL",  fr: "Projets, contact, témoignages — PostgreSQL",       es: "Proyectos, contacto, testimonios — PostgreSQL" },
  "Content integrity":    { en: "Featured projects have complete case-study content", fr: "Les projets mis en avant ont un contenu complet", es: "Los proyectos destacados tienen contenido completo" },
  "Security cluster integrity": { en: "is_security flag survives content re-seeds", fr: "Le flag is_security résiste aux ré-imports de contenu", es: "El flag is_security resiste las reimportaciones de contenido" },
  "Cache (Upstash Redis)":{ en: "Response caching and rate-limiting backend",    fr: "Cache des réponses et limitation de débit",             es: "Cache de respuestas y limitación de tasa" },
  "Blog & MDX":           { en: "Salesforce & IT Ops articles — static build",   fr: "Articles Salesforce & IT Ops — build statique",        es: "Artículos de Salesforce & IT Ops — build estático" },
  "PWA / Service Worker": { en: "Offline mode and static asset caching",         fr: "Mode hors-ligne et cache des fichiers statiques",       es: "Modo sin conexión y cache de archivos estáticos" },
};

// Display names: keys stay the technical ids returned by lib/health.ts (and
// /api/health); only this page translates them.
const SERVICE_NAMES: Record<string, Record<Locale, string>> = {
  "Website":              { en: "Website",              fr: "Site web",                       es: "Sitio web" },
  "Contact form":         { en: "Contact form",         fr: "Formulaire de contact",          es: "Formulario de contacto" },
  "Database (Supabase)":  { en: "Database (Supabase)",  fr: "Base de données (Supabase)",     es: "Base de datos (Supabase)" },
  "Content integrity":    { en: "Content integrity",    fr: "Intégrité du contenu",           es: "Integridad del contenido" },
  "Security cluster integrity": { en: "Security cluster integrity", fr: "Intégrité du cluster Sécurité", es: "Integridad del clúster de seguridad" },
  "Cache (Upstash Redis)":{ en: "Cache (Upstash Redis)", fr: "Cache (Upstash Redis)",         es: "Caché (Upstash Redis)" },
  "Blog & MDX":           { en: "Blog & MDX",           fr: "Blog et MDX",                    es: "Blog y MDX" },
  "PWA / Service Worker": { en: "PWA / Service Worker", fr: "PWA / Service Worker",           es: "PWA / Service Worker" },
};

// ── Visual config per status ──────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  DisplayStatus,
  { label: Record<Locale, string>; dot: string; badge: string; banner: string }
> = {
  operational: {
    label:  { en: "Operational", fr: "Opérationnel", es: "Operativo" },
    dot:    "bg-emerald-500",
    badge:  "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    banner: "border-emerald-500/20 bg-emerald-500/5",
  },
  degraded: {
    label:  { en: "Degraded", fr: "Dégradé", es: "Degradado" },
    dot:    "bg-amber-400",
    badge:  "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    banner: "border-amber-400/20 bg-amber-400/5",
  },
  outage: {
    label:  { en: "Outage", fr: "Panne", es: "Interrupción" },
    dot:    "bg-rose-500",
    badge:  "bg-rose-500/10 text-rose-700 dark:text-rose-300",
    banner: "border-rose-500/20 bg-rose-500/5",
  },
  maintenance: {
    label:  { en: "Maintenance", fr: "Maintenance", es: "Mantenimiento" },
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
  const isEs = locale === "es";
  const siteUrl = getSiteUrl();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
  const urlPath = `${siteUrl}/${locale}/status`;
  const title = isFr
    ? "Statut du site — Aïcha Imène DAHOUMANE"
    : isEs
    ? "Estado del sitio — Aïcha Imène DAHOUMANE"
    : "Site Status — Aïcha Imène DAHOUMANE";
  const description = isFr
    ? "État opérationnel en temps réel du site et de ses services."
    : isEs
    ? "Estado operativo en tiempo real del sitio y sus servicios."
    : "Real-time operational status of the site and its services.";
  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/status`,
        fr: `${siteUrl}/fr/status`,
        es: `${siteUrl}/es/status`,
        "x-default": `${siteUrl}/en/status`,
      },
    },
    openGraph: {
      title,
      description,
      url: urlPath,
      type: "website",
      locale: isFr ? "fr_FR" : isEs ? "es_ES" : "en_US",
      alternateLocale: isFr ? ["en_US", "es_ES"] : isEs ? ["en_US", "fr_FR"] : ["fr_FR", "es_ES"],
      siteName,
      images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/twitter-image`],
    },
    robots: { index: false }, // technical page, no SEO value
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function StatusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = locale === "fr" ? "fr" : locale === "es" ? "es" : "en";
  const isFr = safeLocale === "fr";
  const isEs = safeLocale === "es";

  // Latest report stored by the cron, uptime stats and latency history, all
  // from uptime_pings; no live outgoing calls.
  const [report, uptimeStats, latencyHistory] = await Promise.all([
    getLatestPingReport(),
    getUptimeStats(),
    getLatencyHistory(),
  ]);

  // Fallback before the first ping is recorded (initial deployment)
  const global   = report?.overall ?? "operational";
  const cfg      = STATUS_CONFIG[global];
  const checkedAt = report
    // Explicit Europe/Paris time zone with its name: the page is rendered on
    // the server (UTC). dateStyle/timeStyle cannot be combined with
    // timeZoneName (Intl TypeError), hence the detailed fields.
    ? new Date(report.checkedAt).toLocaleString(isFr ? "fr-FR" : locale === "es" ? "es-ES" : "en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Paris",
        timeZoneName: "short",
      })
    : "—";

  // Staleness guard: warn when data is older than 48h
  const STALE_THRESHOLD_HOURS = 48;
  // eslint-disable-next-line react-hooks/purity -- async server component, not a React hook
  const nowMs = Date.now();
  const ageHours = report
    ? (nowMs - new Date(report.checkedAt).getTime()) / (1000 * 3600)
    : null;
  const isStale = ageHours !== null && ageHours > STALE_THRESHOLD_HOURS;

  const labels = {
    headline:      isFr ? "Statut du site"           : isEs ? "Estado del sitio"              : "Site Status",
    breadcrumb:    isFr ? "Statut"                   : isEs ? "Estado"                          : "Status",
    home:          isFr ? "Accueil"                  : isEs ? "Inicio"                          : "Home",
    ariaLabel:     isFr ? "Fil d'Ariane"             : isEs ? "Ruta de navegación"              : "Breadcrumb",
    allOk:         isFr ? "Tous les systèmes sont opérationnels." : isEs ? "Todos los sistemas están operativos." : "All systems are operational.",
    degraded:      isFr ? "Certains services sont dégradés."      : isEs ? "Algunos servicios presentan problemas." : "Some services are experiencing issues.",
    outage:        isFr ? "Une panne est en cours."               : isEs ? "Hay una interrupción en curso."       : "An outage is currently in progress.",
    maintenance:   isFr ? "Maintenance en cours."                 : isEs ? "Mantenimiento en curso."               : "Maintenance in progress.",
    servicesTitle: isFr ? "Services"                 : isEs ? "Servicios"                       : "Services",
    lastChecked:   isFr ? "Vérifié le"               : isEs ? "Verificado el"                   : "Last checked",
    latency:       isFr ? "Latence"                  : isEs ? "Latencia"                         : "Latency",
    sparklineLabel: isFr ? "Latence sur 7 jours"     : isEs ? "Latencia de 7 días"               : "7-day latency",
    backHome:      isFr ? "← Retour à l'accueil"    : isEs ? "← Volver al inicio"                : "← Back to home",
    noIncidents:   isFr
      ? "Aucun incident signalé. Tout fonctionne normalement."
      : isEs
      ? "No se ha reportado ningún incidente. Todo funciona con normalidad."
      : "No incidents reported. Everything is running normally.",
    incidentTitle: isFr ? "Historique des incidents" : isEs ? "Historial de incidentes"         : "Incident history",
    apiLink:       isFr ? "Endpoint JSON brut ↗"    : isEs ? "Endpoint JSON sin procesar ↗"      : "Raw JSON endpoint ↗",
    staleWarning:  isFr
      ? `Avertissement : données de monitoring potentiellement obsolètes (${Math.floor(ageHours ?? 0)} h). Le cron de vérification n'a peut-être pas tourné récemment.`
      : isEs
      ? `Advertencia: los datos de monitoreo podrían estar desactualizados (${Math.floor(ageHours ?? 0)} h). Es posible que el cron de verificación no se haya ejecutado recientemente.`
      : `Warning: monitoring data may be stale (${Math.floor(ageHours ?? 0)} h old). The check cron may not have run recently.`,
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
        <Link href={`/${safeLocale}`} className="hover:underline soft-ring rounded-sm px-1">
          {labels.home}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-muted">{labels.breadcrumb}</span>
      </nav>

      {/* ── Page title, the only h1 ──────────────────────────────────────── */}
      <h1 className="mb-6 text-3xl font-bold tracking-tight">{labels.headline}</h1>

      {/* ── Staleness warning (data > 48h) ──────────────────────────────── */}
      {isStale && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/8 px-4 py-3 text-sm text-amber-700 dark:text-amber-300"
        >
          <span aria-hidden="true" className="mt-0.5 flex-none text-base">⚠</span>
          <span>{labels.staleWarning}</span>
        </div>
      )}

      {/* ── Global status banner ──────────────────────────────────────────── */}
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

      {/* ── Services ──────────────────────────────────────────────────────── */}
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
                className="flex items-center justify-between gap-2 bg-white dark:bg-white/2 px-4 py-4 sm:gap-4 sm:px-6"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{SERVICE_NAMES[service.name]?.[safeLocale] ?? service.name}</p>
                  <p className="truncate text-xs text-muted-2">{desc}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 sm:gap-3">
                  {/* 7-day latency sparkline, hidden below sm */}
                  {(latencyHistory[service.name]?.length ?? 0) >= 2 && (
                    <span title={labels.sparklineLabel} className="hidden sm:inline">
                      <LatencySparkline data={latencyHistory[service.name]} />
                    </span>
                  )}
                  {/* Current latency (only when measured) */}
                  {service.latencyMs !== null && service.latencyMs > 0 && (
                    <span className="text-xs text-muted-2 tabular-nums">
                      {service.latencyMs} ms
                    </span>
                  )}
                  {/* 30-day uptime %, once 3 pings exist */}
                  {uptimeStats[service.name] != null && (
                    <span
                      className="text-xs text-muted-2 tabular-nums"
                      title={isFr ? "Disponibilité sur 30 jours" : isEs ? "Disponibilidad de 30 días" : "30-day uptime"}
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

      {/* ── Incident history ──────────────────────────────────────────────── */}
      <section aria-labelledby="incidents-heading" className="mt-10">
        <h2 id="incidents-heading" className="mb-4 text-xl font-semibold">
          {labels.incidentTitle}
        </h2>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/2 px-6 py-8 text-center">
          <p className="text-sm text-muted-2">{labels.noIncidents}</p>
        </div>
      </section>

      {/* ── JSON endpoint link ────────────────────────────────────────────── */}
      <div className="mt-6 text-center">
        <a
          href="/api/health"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-muted-2 hover:underline soft-ring rounded-sm"
        >
          {labels.apiLink}
        </a>
      </div>

      {/* ── Back to home ──────────────────────────────────────────────────── */}
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
