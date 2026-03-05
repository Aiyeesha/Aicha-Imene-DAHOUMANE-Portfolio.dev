// status/page.tsx
// ----------------
// Page de statut publique — affiche l'état opérationnel du site et de ses services.
// 100% statique : aucune dépendance externe, aucune requête réseau.
// Mise à jour manuelle si un incident survient (ou à connecter à un service
// de monitoring comme Betteruptime / UptimeRobot via API dans une future itération).

import Link from "next/link";
import type { Metadata } from "next";

// ── Types ────────────────────────────────────────────────────────────────────

type Locale = "en" | "fr";

type ServiceStatus = "operational" | "degraded" | "outage" | "maintenance";

type Service = {
  name: string;
  description: Record<Locale, string>;
  status: ServiceStatus;
};

// ── Données de statut ────────────────────────────────────────────────────────
// Modifier `status` ici en cas d'incident.

const SERVICES: Service[] = [
  {
    name: "Website",
    description: {
      en: "Next.js frontend — pages, blog, projects",
      fr: "Frontend Next.js — pages, blog, projets",
    },
    status: "operational",
  },
  {
    name: "Contact form",
    description: {
      en: "Message delivery, rate-limiting, anti-spam",
      fr: "Envoi de messages, limitation de débit, anti-spam",
    },
    status: "operational",
  },
  {
    name: "Database (Supabase)",
    description: {
      en: "Projects, certifications, about — PostgreSQL",
      fr: "Projets, certifications, à propos — PostgreSQL",
    },
    status: "operational",
  },
  {
    name: "Cache (Upstash Redis)",
    description: {
      en: "Response caching and rate-limiting backend",
      fr: "Cache des réponses et limitation de débit",
    },
    status: "operational",
  },
  {
    name: "Blog & MDX",
    description: {
      en: "Salesforce & IT Ops articles — static build",
      fr: "Articles Salesforce & IT Ops — build statique",
    },
    status: "operational",
  },
  {
    name: "PWA / Service Worker",
    description: {
      en: "Offline mode and static asset caching",
      fr: "Mode hors-ligne et cache des fichiers statiques",
    },
    status: "operational",
  },
];

// Dernière vérification manuelle — mettre à jour à chaque déploiement.
const LAST_CHECKED = "2026-03-05";

// ── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  ServiceStatus,
  { label: Record<Locale, string>; dot: string; badge: string }
> = {
  operational: {
    label: { en: "Operational", fr: "Opérationnel" },
    dot: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  degraded: {
    label: { en: "Degraded", fr: "Dégradé" },
    dot: "bg-amber-400",
    badge: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  outage: {
    label: { en: "Outage", fr: "Panne" },
    dot: "bg-rose-500",
    badge: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  },
  maintenance: {
    label: { en: "Maintenance", fr: "Maintenance" },
    dot: "bg-blue-400",
    badge: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  },
};

function globalStatus(services: Service[]): ServiceStatus {
  if (services.some((s) => s.status === "outage")) return "outage";
  if (services.some((s) => s.status === "degraded")) return "degraded";
  if (services.some((s) => s.status === "maintenance")) return "maintenance";
  return "operational";
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  return {
    title: isFr
      ? "Statut du site — Aïcha Imène DAHOUMANE"
      : "Site Status — Aïcha Imène DAHOUMANE",
    description: isFr
      ? "État opérationnel en temps réel du site et de ses services."
      : "Real-time operational status of the site and its services.",
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function StatusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = locale === "fr" ? "fr" : "en";
  const isFr = safeLocale === "fr";

  const global = globalStatus(SERVICES);
  const cfg = STATUS_CONFIG[global];

  const labels = {
    headline:    isFr ? "Statut du site" : "Site Status",
    breadcrumb:  isFr ? "Statut" : "Status",
    home:        isFr ? "Accueil" : "Home",
    ariaLabel:   isFr ? "Fil d'Ariane" : "Breadcrumb",
    allOk:       isFr ? "Tous les systèmes sont opérationnels." : "All systems are operational.",
    degraded:    isFr ? "Certains services sont dégradés." : "Some services are experiencing issues.",
    outage:      isFr ? "Une panne est en cours." : "An outage is currently in progress.",
    maintenance: isFr ? "Maintenance en cours." : "Maintenance in progress.",
    servicesTitle: isFr ? "Services" : "Services",
    lastChecked: isFr ? "Dernière vérification" : "Last checked",
    backHome:    isFr ? "← Retour à l'accueil" : "← Back to home",
    noIncidents: isFr
      ? "Aucun incident signalé. Tout fonctionne normalement."
      : "No incidents reported. Everything is running normally.",
    incidentTitle: isFr ? "Historique des incidents" : "Incident history",
  };

  const globalMessage =
    global === "operational"
      ? labels.allOk
      : global === "degraded"
        ? labels.degraded
        : global === "outage"
          ? labels.outage
          : labels.maintenance;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">

      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <nav aria-label={labels.ariaLabel} className="mb-6 flex items-center gap-2 text-sm text-muted-2">
        <Link href={`/${safeLocale}`} className="hover:underline soft-ring rounded px-1">
          {labels.home}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-muted">{labels.breadcrumb}</span>
      </nav>

      {/* ── Global status banner ─────────────────────────────────────────────── */}
      <div
        className={`mb-10 flex items-center gap-4 rounded-2xl border p-6 ${
          global === "operational"
            ? "border-emerald-500/20 bg-emerald-500/5"
            : global === "degraded"
              ? "border-amber-400/20 bg-amber-400/5"
              : global === "outage"
                ? "border-rose-500/20 bg-rose-500/5"
                : "border-blue-400/20 bg-blue-400/5"
        }`}
      >
        {/* Pulsing dot */}
        <span className="relative flex h-4 w-4 flex-none" aria-hidden="true">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:animate-none ${cfg.dot}`}
          />
          <span className={`relative inline-flex h-4 w-4 rounded-full ${cfg.dot}`} />
        </span>

        <div>
          <p className="text-base font-semibold">{globalMessage}</p>
          <p className="mt-0.5 text-xs text-muted-2">
            {labels.lastChecked} : {LAST_CHECKED}
          </p>
        </div>
      </div>

      {/* ── Services list ─────────────────────────────────────────────────────── */}
      <section aria-labelledby="services-heading">
        <h2 id="services-heading" className="mb-4 text-xl font-semibold">
          {labels.servicesTitle}
        </h2>

        <div className="divide-y divide-black/5 dark:divide-white/5 rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
          {SERVICES.map((service) => {
            const s = STATUS_CONFIG[service.status];
            return (
              <div
                key={service.name}
                className="flex items-center justify-between gap-4 bg-white dark:bg-white/[0.02] px-6 py-4"
              >
                <div>
                  <p className="text-sm font-medium">{service.name}</p>
                  <p className="text-xs text-muted-2">{service.description[safeLocale]}</p>
                </div>
                <span
                  className={`flex-none rounded-full px-2.5 py-1 text-xs font-medium ${s.badge}`}
                >
                  {s.label[safeLocale]}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Incident history ──────────────────────────────────────────────────── */}
      <section aria-labelledby="incidents-heading" className="mt-10">
        <h2 id="incidents-heading" className="mb-4 text-xl font-semibold">
          {labels.incidentTitle}
        </h2>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.02] px-6 py-8 text-center">
          <p className="text-sm text-muted-2">{labels.noIncidents}</p>
        </div>
      </section>

      {/* ── Back to home ──────────────────────────────────────────────────────── */}
      <div className="mt-12 border-t border-black/10 dark:border-white/10 pt-8">
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
