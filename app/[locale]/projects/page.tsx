// app/[locale]/projects/page.tsx
// --------------------------------
// Galerie exhaustive des projets — liste TOUS les projets publiés pour la locale.
// Accessible depuis la home (bouton "Voir tous les projets →"), la Command Palette
// (entrée "Tous les projets" dans le groupe Pages) et le bouton "Retour" du détail.
//
// Rendu serveur avec cache Redis (via getPublishedProjectsWithAssetsCached).
// ISR identique à la page de détail (revalidate = 300 s).

import Link from "next/link";
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/siteUrl";
import { jsonLdStringify } from "@/lib/security/jsonLdSafe";
import { getPublishedProjectsWithAssetsCached } from "@/lib/data/projects.cached";
import type { SupportedLocale } from "@/i18n/projectTaxonomy";
import ProjectsSection from "@/components/ProjectsSection";

export const revalidate = 300;

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const isEs = locale === "es";
  const siteUrl = getSiteUrl();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
  const title = isFr
    ? "Projets — Aïcha Imène DAHOUMANE"
    : isEs
    ? "Proyectos — Aïcha Imène DAHOUMANE"
    : "Projects — Aïcha Imène DAHOUMANE";
  const description = isFr
    ? "Galerie complète des projets Salesforce et IT Ops : automatisations, déploiements, migrations, sécurité et plus."
    : isEs
    ? "Galería completa de proyectos de Salesforce e IT Ops: automatizaciones, despliegues, migraciones, seguridad y más."
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
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
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

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  const isFr = locale === "fr";
  const isEs = locale === "es";
  const safeLocale = (locale === "fr" ? "fr" : "en") as SupportedLocale;

  const projects = await getPublishedProjectsWithAssetsCached(locale);

  const L = {
    breadcrumbHome: isFr ? "Accueil" : isEs ? "Inicio" : "Home",
    title: isFr ? "Tous les projets" : isEs ? "Todos los proyectos" : "All projects",
    subtitle: isFr
      ? "Galerie complète — Salesforce et IT Ops."
      : isEs
      ? "Galería completa — Salesforce e IT Ops."
      : "Full gallery — Salesforce and IT Ops.",
    backHome: isFr ? "Retour à l'accueil" : isEs ? "Volver al inicio" : "Back to home",
    empty: isFr
      ? "Aucun projet disponible pour l'instant."
      : isEs
      ? "No hay proyectos disponibles por el momento."
      : "No projects available at the moment.",
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: L.breadcrumbHome, item: `${getSiteUrl()}/${locale}` },
      { "@type": "ListItem", position: 2, name: isFr ? "Projets" : isEs ? "Proyectos" : "Projects", item: `${getSiteUrl()}/${locale}/projects` },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdStringify(jsonLdBreadcrumb) }} />

      {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
      <nav
        aria-label={isFr ? "Fil d'Ariane" : isEs ? "Ruta de navegación" : "Breadcrumb"}
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

      {projects.length === 0 ? (
        <p className="mt-12 text-center text-muted">{L.empty}</p>
      ) : (
        <div className="mt-10">
          <ProjectsSection
            projects={projects}
            locale={safeLocale}
            includeFeatured
          />
        </div>
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
