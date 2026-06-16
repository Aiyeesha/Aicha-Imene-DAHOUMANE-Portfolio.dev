// app/[locale]/projects/page.tsx
// --------------------------------
// Galerie exhaustive des projets — liste TOUS les projets publiés pour la locale.
// Accessible depuis la home (bouton "Voir tous les projets →"), la Command Palette
// (entrée "Tous les projets" dans le groupe Pages) et le bouton "Retour" du détail.
//
// Rendu serveur avec cache Redis (via getPublishedProjectsWithAssetsCached).
// ISR identique à la page de détail (revalidate = 300 s).

import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/siteUrl";
import { getPublishedProjectsWithAssetsCached } from "@/lib/data/projects.cached";
import { tBadge, tTag } from "@/i18n/projectTaxonomy";
import type { SupportedLocale } from "@/i18n/projectTaxonomy";

export const revalidate = 300;

const STORAGE_CDN = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/projects`;

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const siteUrl = getSiteUrl();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
  const title = isFr
    ? "Projets — Aïcha Imène DAHOUMANE"
    : "Projects — Aïcha Imène DAHOUMANE";
  const description = isFr
    ? "Galerie complète des projets Salesforce et IT Ops : automatisations, déploiements, migrations, sécurité et plus."
    : "Full gallery of Salesforce and IT Ops projects: automations, deployments, migrations, security, and more.";
  const urlPath = `${siteUrl}/${locale}/projects`;
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/projects`,
        fr: `${siteUrl}/fr/projects`,
        "x-default": `${siteUrl}/en/projects`,
      },
    },
    openGraph: {
      url: urlPath,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      title,
      description,
      siteName,
      images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/twitter-image`],
    },
  };
}

const tones: Record<string, string> = {
  client: "badge badge-client",
  personal: "badge badge-personal",
  training: "badge badge-training",
};

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  const isFr = locale === "fr";
  const safeLocale = (locale === "fr" ? "fr" : "en") as SupportedLocale;

  const projects = await getPublishedProjectsWithAssetsCached(locale);

  const sorted = [...projects].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  const salesforceProjects = sorted.filter((p) => p.track === "salesforce");
  const itopsProjects = sorted.filter((p) => p.track === "itops");

  const L = {
    breadcrumbHome: isFr ? "Accueil" : "Home",
    title: isFr ? "Tous les projets" : "All projects",
    subtitle: isFr
      ? "Galerie complète — Salesforce et IT Ops."
      : "Full gallery — Salesforce and IT Ops.",
    salesforceTitle: "Salesforce",
    itopsTitle: "IT Ops",
    details: isFr ? "Voir le détail →" : "View details →",
    backHome: isFr ? "Retour à l'accueil" : "Back to home",
    empty: isFr ? "Aucun projet disponible pour l'instant." : "No projects available at the moment.",
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">

      {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
      <nav
        aria-label={isFr ? "Fil d'Ariane" : "Breadcrumb"}
        className="mb-6 flex items-center gap-2 text-sm text-muted-2"
      >
        <Link href={`/${locale}`} className="hover:underline soft-ring rounded px-1">
          {L.breadcrumbHome}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-muted">{L.title}</span>
      </nav>

      {/* ── En-tête ─────────────────────────────────────────────────────────── */}
      <h1 className="text-3xl font-semibold">{L.title}</h1>
      <p className="mt-3 text-muted">{L.subtitle}</p>

      {projects.length === 0 && (
        <p className="mt-12 text-center text-muted">{L.empty}</p>
      )}

      {/* ── Section Salesforce ─────────────────────────────────────────────── */}
      {salesforceProjects.length > 0 && (
        <section aria-labelledby="section-salesforce" className="mt-14">
          <h2 id="section-salesforce" className="text-xl font-semibold">{L.salesforceTitle}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {salesforceProjects.map((p) => (
              <ProjectCard
                key={p.slug}
                project={p}
                locale={safeLocale}
                detailsLabel={L.details}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Section IT Ops ─────────────────────────────────────────────────── */}
      {itopsProjects.length > 0 && (
        <section aria-labelledby="section-itops" className="mt-14">
          <h2 id="section-itops" className="text-xl font-semibold">{L.itopsTitle}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {itopsProjects.map((p) => (
              <ProjectCard
                key={p.slug}
                project={p}
                locale={safeLocale}
                detailsLabel={L.details}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Retour accueil ───────────────────────────────────────────────────── */}
      <div className="mt-14 border-t border-black/10 dark:border-white/10 pt-8">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
        >
          ← {L.backHome}
        </Link>
      </div>
    </div>
  );
}

// ── Project card (server-renderable) ─────────────────────────────────────────

import type { ProjectWithAssets } from "@/lib/data/projectBySlug";

function ProjectCard({
  project: p,
  locale,
  detailsLabel,
}: {
  project: ProjectWithAssets;
  locale: SupportedLocale;
  detailsLabel: string;
}) {
  const coverSrc =
    p.gallery?.[0]?.src || `${STORAGE_CDN}/${p.slug}/cover.webp`;

  return (
    <article className="card overflow-hidden flex flex-col">
      {/* Cover */}
      <div className="relative h-40 w-full bg-black/5 dark:bg-white/5 flex-shrink-0">
        <Image
          src={coverSrc}
          alt={p.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
          unoptimized
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold leading-snug">{p.title}</h3>
          {p.badge && (
            <span className={`shrink-0 ${tones[p.badge.tone] ?? "badge"}`}>
              {tBadge(p.badge.label, locale)}
            </span>
          )}
        </div>

        {p.summary && (
          <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">
            {p.summary}
          </p>
        )}

        {(p.tags ?? []).length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {(p.tags ?? []).slice(0, 4).map((tag) => (
              <span key={tag} className="chip">{tTag(tag, locale)}</span>
            ))}
          </div>
        )}

        <div className="mt-4 flex-1 flex items-end">
          <Link
            href={`/${locale}/projects/${p.slug}`}
            className="inline-flex items-center rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring"
          >
            {detailsLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
