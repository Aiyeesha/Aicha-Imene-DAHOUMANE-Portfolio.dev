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

// ISR — revalidation toutes les 60 secondes.
// ⚠️ Actuellement sans effet : app/layout.tsx appelle headers() pour lire le nonce
// CSP (x-nonce), ce qui opt toute la route en rendu dynamique (Cache-Control: no-store).
// Conserver cette valeur : elle redeviendra opérationnelle lors de la migration
// homelab (reverse proxy cache indépendant du Cache-Control applicatif — cf. §6).
// La fraîcheur des données est déjà assurée par le cache Redis dans lib/uptime.ts.
export const revalidate = 60;

// ── Types locaux ─────────────────────────────────────────────────────────────

type Locale = "en" | "fr" | "es";

// "maintenance" est un statut d'affichage uniquement (pas retourné par les checks)
type DisplayStatus = ServiceStatus | "maintenance";

// ── Descriptions des services (i18n) ─────────────────────────────────────────

const SERVICE_DESCRIPTIONS: Record<string, Record<Locale, string>> = {
  "Website":              { en: "Next.js frontend — pages, blog, projects",      fr: "Frontend Next.js — pages, blog, projets",              es: "Frontend Next.js — páginas, blog, proyectos" },
  "Contact form":         { en: "Message delivery, rate-limiting, anti-spam",    fr: "Envoi de messages, limitation de débit, anti-spam",    es: "Envío de mensajes, limitación de tasa, anti-spam" },
  "Database (Supabase)":  { en: "Projects, certifications, about — PostgreSQL",  fr: "Projets, certifications, à propos — PostgreSQL",       es: "Proyectos, certificaciones, sobre mí — PostgreSQL" },
  "Cache (Upstash Redis)":{ en: "Response caching and rate-limiting backend",    fr: "Cache des réponses et limitation de débit",             es: "Cache de respuestas y limitación de tasa" },
  "Blog & MDX":           { en: "Salesforce & IT Ops articles — static build",   fr: "Articles Salesforce & IT Ops — build statique",        es: "Artículos de Salesforce & IT Ops — build estático" },
  "PWA / Service Worker": { en: "Offline mode and static asset caching",         fr: "Mode hors-ligne et cache des fichiers statiques",       es: "Modo sin conexión y cache de archivos estáticos" },
};

// ── Configuration visuelle par statut ─────────────────────────────────────────

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
  const safeLocale: Locale = locale === "fr" ? "fr" : locale === "es" ? "es" : "en";
  const isFr = safeLocale === "fr";
  const isEs = safeLocale === "es";

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
    ? new Date(report.checkedAt).toLocaleString(isFr ? "fr-FR" : locale === "es" ? "es-ES" : "en-US", { dateStyle: "medium", timeStyle: "short" })
    : "—";

  // Garde de fraîcheur : avertissement si les données dépassent 48 h
  const STALE_THRESHOLD_HOURS = 48;
  // eslint-disable-next-line react-hooks/purity -- Server Component async function, pas un hook React
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
        <Link href={`/${safeLocale}`} className="hover:underline soft-ring rounded px-1">
          {labels.home}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-muted">{labels.breadcrumb}</span>
      </nav>

      {/* ── Garde de fraîcheur — avertissement si données > 48 h ─────────── */}
      {isStale && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/8 px-4 py-3 text-sm text-amber-700 dark:text-amber-300"
        >
          <span aria-hidden="true" className="mt-0.5 flex-none text-base">⚠</span>
          <span>{labels.staleWarning}</span>
        </div>
      )}

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
