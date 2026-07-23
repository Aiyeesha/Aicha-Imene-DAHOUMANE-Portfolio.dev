import { getPublishedProjectBySlugWithAssetsCached } from "@/lib/data/projectBySlug.cached";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import Image from "next/image";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/siteUrl";
import { jsonLdStringify } from "@/lib/security/jsonLdSafe";

// ISR : revalide les pages projet toutes les 5 minutes
export const revalidate = 300;

// ── URL safety helper ─────────────────────────────────────────────────────────
function safeHref(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (/^(https?:\/\/|\/)/i.test(trimmed)) return trimmed;
  return null;
}

type ProjectSection =
  | { type: "bullets";   title: string; items: string[] }
  | { type: "text";      title: string; paragraphs?: string[]; body?: string }
  | { type: "metrics";   title: string; items: { label: string; value: string; note?: string }[] }
  | { type: "timeline";  title: string; steps: { title?: string; label?: string; description: string }[] }
  | { type: "resources"; title: string; items: { label: string; href: string; note?: string }[] }
  | { type: "code";      title: string; language?: string; code: string; downloadUrl?: string };

type Params = { locale: string; slug: string };

// Locale display names, keyed by the reader's locale (rows) then the target locale (cols).
const LOCALE_NAMES: Record<string, Record<string, string>> = {
  en: { fr: "French", es: "Spanish", en: "English" },
  fr: { en: "anglaise", es: "espagnole", fr: "française" },
  es: { en: "inglés", fr: "francés", es: "español" },
};

type ProjectAsset = {
  id: string;
  title: string;
  description?: string | null;
  external_url?: string | null;
  storage_bucket?: string | null;
  storage_path?: string | null;
  mime_type?: string | null;
  type?: string | null;
};

function getPublicStorageUrl(bucket?: string | null, path?: string | null) {
  if (!path) return null;
  // Si storage_path est déjà une URL complète, la retourner directement
  if (/^https?:\/\//i.test(path)) return path;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base || !bucket) return null;
  // Encoder chaque segment du chemin pour gérer les espaces et caractères spéciaux
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  return `${base}/storage/v1/object/public/${bucket}/${encodedPath}`;
}

function looksLikeImage(asset: ProjectAsset) {
  // Deliverables are never displayed as images, regardless of file extension.
  // A .png data-model or .svg diagram in the deliverables bucket belongs in the
  // download sidebar, not the image grid.
  if (asset.type === "deliverable") return false;
  if (asset.type === "image") return true;
  if (asset.mime_type?.startsWith("image/")) return true;
  const p = asset.storage_path ?? "";
  return /\.(png|jpe?g|webp|gif|svg)$/i.test(p);
}

const PRIVATE_BUCKETS = new Set(["deliverables"]);

function getAssetHref(asset: ProjectAsset) {
  if (asset.external_url) return safeHref(asset.external_url);
  if (asset.storage_bucket && asset.storage_path) {
    if (PRIVATE_BUCKETS.has(asset.storage_bucket)) {
      const params = new URLSearchParams({
        bucket: asset.storage_bucket,
        path: asset.storage_path,
      });
      return `/api/storage/redirect?${params.toString()}`;
    }
    return getPublicStorageUrl(asset.storage_bucket, asset.storage_path);
  }
  return null;
}

// ── Section accent colours ────────────────────────────────────────────────────
const sectionAccent: Record<string, string> = {
  bullets:   "bg-cyan-500",
  text:      "bg-violet-500",
  metrics:   "bg-emerald-500",
  timeline:  "bg-amber-500",
  resources: "bg-sky-500",
  code:      "bg-slate-500",
};

function renderSection(section: ProjectSection, idx: number) {
  const accent = sectionAccent[section.type] ?? "bg-cyan-500";

  const wrapper = (children: React.ReactNode) => (
    <div key={idx} className="card p-6 md:p-7">
      <div className="flex items-center gap-3 mb-5">
        <span className={`h-5 w-1.5 rounded-full ${accent} flex-shrink-0`} aria-hidden />
        <h2 className="text-base font-semibold text-strong tracking-tight">{section.title}</h2>
      </div>
      {children}
    </div>
  );

  switch (section.type) {
    case "bullets":
      return wrapper(
        <ul className="space-y-3">
          {section.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-500" aria-hidden />
              <span className="text-sm text-muted leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "text": {
      // Support both `body` (string) and `paragraphs` (string[]) shapes
      const paras: string[] = section.body
        ? [section.body]
        : Array.isArray(section.paragraphs)
        ? section.paragraphs
        : [];
      return wrapper(
        <div className="space-y-4">
          {paras.map((p, i) => (
            <p key={i} className="text-sm leading-[1.8] text-muted">{p}</p>
          ))}
        </div>
      );
    }

    case "metrics": {
      const isStatLayout = section.items.every((item) => item.value.length <= 18);
      return wrapper(
        isStatLayout ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {section.items.map((item, i) => (
              <div key={i} className="rounded-xl border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] p-4">
                <div className="text-2xl font-bold text-cyan-500 tabular-nums">{item.value}</div>
                <div className="mt-1 text-sm font-medium text-strong">{item.label}</div>
                {item.note ? <div className="mt-1 text-xs text-muted-2">{item.note}</div> : null}
              </div>
            ))}
          </div>
        ) : (
          <dl className="divide-y divide-black/6 dark:divide-white/6">
            {section.items.map((item, i) => (
              <div key={i} className="grid grid-cols-[minmax(120px,160px)_1fr] gap-x-6 py-3 text-sm">
                <dt className="font-medium text-strong self-start pt-0.5 shrink-0">{item.label}</dt>
                <dd className="text-muted leading-relaxed">
                  {item.value}
                  {item.note ? <span className="ml-2 text-xs opacity-60">({item.note})</span> : null}
                </dd>
              </div>
            ))}
          </dl>
        )
      );
    }

    case "timeline":
      return wrapper(
        <ol className="space-y-0">
          {section.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/15 text-xs font-bold text-amber-600 dark:text-amber-300 ring-1 ring-amber-500/20">
                  {i + 1}
                </span>
                {i < section.steps.length - 1 && (
                  <span className="mt-1 flex-1 w-px bg-amber-500/20 min-h-[1.5rem]" />
                )}
              </div>
              <div className="pb-6 min-w-0">
                <div className="text-sm font-semibold text-strong leading-tight">{step.label ?? step.title}</div>
                <div className="mt-2 text-sm text-muted leading-[1.8]">{step.description}</div>
              </div>
            </li>
          ))}
        </ol>
      );

    case "resources":
      return wrapper(
        <ul className="space-y-2.5">
          {section.items.map((item, i) => {
            const href = safeHref(item.href);
            return (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sky-500 text-xs" aria-hidden>↗</span>
                <span>
                  {href ? (
                    <a href={href} target="_blank" rel="noreferrer"
                      className="font-medium text-strong underline underline-offset-4 decoration-black/20 dark:decoration-white/20 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-muted">{item.label}</span>
                  )}
                  {item.note ? <span className="ml-2 text-xs text-muted-2">{item.note}</span> : null}
                </span>
              </li>
            );
          })}
        </ul>
      );

    case "code": {
      const dlUrl = safeHref(section.downloadUrl);
      return wrapper(
        <>
          <pre className="overflow-x-auto rounded-xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/8 dark:border-white/8 p-5 text-xs leading-relaxed font-mono">
            <code>{section.code}</code>
          </pre>
          {dlUrl ? (
            <a href={dlUrl} className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted underline underline-offset-4 hover:opacity-70 transition-opacity"
              target="_blank" rel="noreferrer">
              ↓ Télécharger
            </a>
          ) : null}
        </>
      );
    }

    default:
      return null;
  }
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getPublishedProjectBySlugWithAssetsCached(locale, slug);
  if (!project) return { title: "Project not found" };

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
  const siteUrl = getSiteUrl();

  const title = `${project.title} | ${siteName}`;
  const description = project.hero_subtitle ?? project.summary ?? project.title;
  const canonical = `${siteUrl}/${locale}/projects/${slug}`;

  const firstGalleryImg = project.gallery?.[0]?.src;
  const ogImage = firstGalleryImg
    ? firstGalleryImg.startsWith("http")
      ? firstGalleryImg                      // URL CDN Supabase — déjà absolue
      : `${siteUrl}${firstGalleryImg}`       // chemin local — préfixer avec siteUrl
    : `${siteUrl}/opengraph-image`;

  const languages: Record<string, string> = {
    en: `${siteUrl}/en/projects/${slug}`,
    fr: `${siteUrl}/fr/projects/${slug}`,
    es: `${siteUrl}/es/projects/${slug}`,
    "x-default": `${siteUrl}/en/projects/${slug}`,
  };

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: "article",
      title: project.title,
      description,
      url: canonical,
      locale: locale === "fr" ? "fr_FR" : locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US", "es_ES"] : locale === "es" ? ["en_US", "fr_FR"] : ["fr_FR", "es_ES"],
      siteName,
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: [ogImage],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;

  const project = await getPublishedProjectBySlugWithAssetsCached(locale, slug);
  if (!project) return notFound();

  const siteUrl = getSiteUrl();

  const isFrPage = locale === "fr";
  const isEsPage = locale === "es";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isFrPage ? "Accueil" : isEsPage ? "Inicio" : "Home",
        item: `${siteUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isFrPage ? "Projets" : isEsPage ? "Proyectos" : "Projects",
        item: `${siteUrl}/${locale}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${siteUrl}/${locale}/projects/${slug}`,
      },
    ],
  };

  const projectDescription = project.hero_subtitle ?? project.summary ?? project.title;
  const projectCoverSrc = project.gallery?.[0]?.src;
  const projectCoverUrl = projectCoverSrc
    ? projectCoverSrc.startsWith("http") ? projectCoverSrc : `${siteUrl}${projectCoverSrc}`
    : undefined;

  const softwareSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: projectDescription,
    url: `${siteUrl}/${locale}/projects/${slug}`,
    inLanguage: locale,
    author: {
      "@type": "Person",
      name: "Aïcha Imène Dahoumane",
      url: `${siteUrl}/${locale}/about`,
    },
    ...(projectCoverUrl && { image: projectCoverUrl }),
    ...((project.tags ?? []).length > 0 && { keywords: (project.tags as string[]).join(", ") }),
  };

  const assets      = (project.project_assets ?? []) as ProjectAsset[];
  const badge       = project.badge ?? null;
  const tags        = (project.tags ?? []) as string[];
  const techStack   = project.tech_stack ?? [];
  const sections    = (project.sections ?? []) as ProjectSection[];
  const hasStaticResources = sections.some((s) => s.type === "resources");
  const heroSubtitle = project.hero_subtitle ?? project.summary ?? null;
  const gallery     = project.gallery ?? [];

  // Construire un ensemble des URLs déjà représentées dans gallery pour éviter
  // qu'un même fichier apparaisse à la fois dans la galerie ET dans la grille d'images.
  const galleryUrlSet = new Set<string>(
    gallery.flatMap((g) => {
      const urls: string[] = [g.src];
      // Ajouter aussi la version avec chemin encodé pour matcher les assets relatifs
      try {
        const u = new URL(g.src);
        // Extraire uniquement le nom de fichier encodé et non-encodé
        urls.push(decodeURIComponent(u.pathname));
        urls.push(u.pathname);
      } catch {
        // pas une URL absolue valide, ignorer
      }
      return urls;
    })
  );

  function assetAlreadyInGallery(asset: ProjectAsset): boolean {
    const href = getAssetHref(asset);
    if (href && galleryUrlSet.has(href)) return true;
    // Comparer le storage_path (relatif) avec les URL de gallery
    if (asset.storage_path && !/^https?:\/\//i.test(asset.storage_path)) {
      return gallery.some((g) => {
        try {
          const pathname = new URL(g.src).pathname;
          return decodeURIComponent(pathname).endsWith(asset.storage_path!);
        } catch { return false; }
      });
    }
    return false;
  }

  const imageAssets = assets.filter(looksLikeImage).filter((a) => !assetAlreadyInGallery(a));
  const fileAssets  = assets.filter((a) => !looksLikeImage(a));

  const badgeClass =
    badge?.tone === "client"   ? "badge badge-client"   :
    badge?.tone === "personal" ? "badge badge-personal" :
    badge?.tone === "training" ? "badge badge-training" : "";

  const repoHref = safeHref(project.repo_url);
  const liveHref = safeHref(project.live_url);

  // Cover = first gallery image. Remaining go to the gallery viewer.
  const coverImage  = gallery[0] ?? null;
  const galleryRest = gallery.slice(1);

  const isFr = locale === "fr";
  const isEs = locale === "es";

  return (
    <main className="py-10 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdStringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdStringify(softwareSchema) }}
      />
      <div className="container mx-auto max-w-6xl px-4">

        {/* ── BACK ─────────────────────────────────────────────────────────── */}
        <Link
          href={`/${locale}/projects`}
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors soft-ring rounded-full"
        >
          ← {isFr ? "Retour aux projets" : isEs ? "Volver a proyectos" : "Back to projects"}
        </Link>

        {/* ── COVER IMAGE ──────────────────────────────────────────────────── */}
        {coverImage && (
          <div className="mt-8 card overflow-hidden">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={coverImage.src}
                alt={coverImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-contain bg-white/90 dark:bg-white/5"
                priority
                unoptimized
              />
            </div>
          </div>
        )}

        {/* ── LOCALE FALLBACK NOTICE ───────────────────────────────────────────
            getPublishedProjectBySlugWithAssets falls back to another locale's
            published row when the requested locale has none (translation gap,
            or a same-slug revision still in draft). That fallback is silent at
            the data layer, so it's made visible here rather than letting a
            visitor mistake unrelated-locale content for a native page. */}
        {project.locale !== locale && (
          <div className="mt-8 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
            {isFr
              ? `Cette étude de cas n'est pas encore disponible en français — version ${LOCALE_NAMES.fr[project.locale] ?? project.locale} affichée.`
              : isEs
              ? `Este estudio de caso aún no está disponible en español — se muestra la versión en ${LOCALE_NAMES.es[project.locale] ?? project.locale}.`
              : `This case study isn't available in English yet — showing the ${LOCALE_NAMES.en[project.locale] ?? project.locale} version.`}
          </div>
        )}

        {/* ── HERO TEXT ────────────────────────────────────────────────────── */}
        <header className="mt-8">
          {(badge || project.is_bridge) && (
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {badge && <span className={badgeClass}>{badge.label}</span>}
              {project.is_bridge && (
                <span className="badge badge-bridge">
                  {isFr ? "Pont Salesforce ⇄ Infra" : isEs ? "Puente Salesforce ⇄ Infra" : "Salesforce ⇄ Infra bridge"}
                </span>
              )}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-strong leading-tight tracking-tight">
            {project.title}
          </h1>
          {heroSubtitle && (
            <p className="mt-4 text-base md:text-lg text-muted leading-relaxed max-w-3xl">
              {heroSubtitle}
            </p>
          )}
        </header>

        <div className="mt-8 h-px w-full bg-black/8 dark:bg-white/8" />

        {/* ── TWO-COLUMN LAYOUT ────────────────────────────────────────────── */}
        <div className="mt-10 lg:grid lg:grid-cols-3 lg:gap-10 lg:items-start">

          {/* ── LEFT: SECTIONS (2/3) ─────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">

            {sections.map((section, idx) => renderSection(section, idx))}

            {/* Supabase storage images */}
            {imageAssets.length > 0 && (
              <div className={`grid gap-4 ${imageAssets.length > 1 ? "sm:grid-cols-2" : ""}`}>
                {imageAssets.map((a) => {
                  const href = getAssetHref(a);
                  if (!href) return null;
                  return (
                    <div key={a.id} className="card overflow-hidden">
                      <div className="relative w-full aspect-video">
                        <SafeImage
                          src={href}
                          alt={a.title ?? ""}
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-contain"
                          loading="lazy"
                        />
                      </div>
                      {a.title && (
                        <p className="px-4 py-2 text-xs text-muted-2">{a.title}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Gallery viewer — remaining screenshots */}
            {galleryRest.length > 0 && (
              <div className="card p-6 md:p-7">
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" aria-hidden />
                  <h2 className="text-base font-semibold text-strong tracking-tight">
                    {isFr ? "Captures d'écran" : isEs ? "Capturas de pantalla" : "Screenshots"}
                  </h2>
                </div>
                <ImageGallery images={galleryRest} />
              </div>
            )}
          </div>

          {/* ── RIGHT: STICKY SIDEBAR (1/3) ──────────────────────────────── */}
          <aside className="mt-8 lg:mt-0">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)] space-y-4">

              {/* Project metadata card */}
              <div className="card p-5 space-y-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-2">
                  {isFr ? "Informations" : isEs ? "Información" : "Project info"}
                </p>

                {badge && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-2 mb-2">Type</p>
                    <span className={badgeClass}>{badge.label}</span>
                  </div>
                )}

                {project.is_bridge && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-2 mb-2">
                      {isFr ? "Profil" : isEs ? "Perfil" : "Profile"}
                    </p>
                    <span className="badge badge-bridge">
                      {isFr ? "Pont Salesforce ⇄ Infra" : isEs ? "Puente Salesforce ⇄ Infra" : "Salesforce ⇄ Infra bridge"}
                    </span>
                  </div>
                )}

                {tags.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-2 mb-2">
                      {isFr ? "Compétences" : isEs ? "Habilidades" : "Skills"}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <span key={tag} className="chip">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}

                {techStack.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-2 mb-2">
                      {isFr ? "Technologies" : isEs ? "Tecnologías" : "Tech stack"}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {techStack.map((t) => (
                        <span key={t} className="chip">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              {(repoHref || liveHref) && (
                <div className="flex flex-col gap-2">
                  {repoHref && (
                    <a
                      href={repoHref}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-sm font-medium hover:bg-black/10 dark:hover:bg-white/10 transition-colors soft-ring text-strong"
                    >
                      <span aria-hidden>↗</span>
                      {isFr ? "Voir le code" : isEs ? "Ver el código" : "View source"}
                    </a>
                  )}
                  {liveHref && (
                    <a
                      href={liveHref}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-black hover:opacity-90 transition-opacity soft-ring"
                    >
                      <span aria-hidden>↗</span>
                      {isFr ? "Voir le projet" : isEs ? "Ver el proyecto" : "Live demo"}
                    </a>
                  )}
                </div>
              )}

              {/* Deliverables */}
              {fileAssets.length > 0 && !hasStaticResources && (
                <div className="card p-5 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-2">
                    {isFr ? "Livrables" : isEs ? "Entregables" : "Deliverables"}
                  </p>
                  <ul className="space-y-3">
                    {fileAssets.map((a) => {
                      const href = getAssetHref(a);
                      return (
                        <li key={a.id} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 text-sm" aria-hidden>↓</span>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-strong truncate leading-tight">{a.title}</p>
                            {a.description && (
                              <p className="mt-0.5 text-xs text-muted-2 leading-snug">{a.description}</p>
                            )}
                            {href && (
                              <a
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-1 inline-block text-xs text-cyan-600 dark:text-cyan-300 underline underline-offset-4 hover:opacity-70 transition-opacity"
                              >
                                {isFr ? "Ouvrir" : isEs ? "Abrir" : "Open file"}
                              </a>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Back link — repeated for easy access on long pages */}
              <Link
                href={`/${locale}/projects`}
                className="flex items-center gap-1.5 text-sm text-muted hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors soft-ring rounded-full"
              >
                ← {isFr ? "Tous les projets" : isEs ? "Todos los proyectos" : "All projects"}
              </Link>

            </div>
          </aside>
        </div>

      </div>
    </main>
  );
}
