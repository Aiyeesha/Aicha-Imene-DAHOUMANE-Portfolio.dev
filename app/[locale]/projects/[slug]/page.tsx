import { getPublishedProjectBySlugWithAssetsCached } from "@/lib/data/projectBySlug.cached";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import Link from "next/link";
import type { Metadata } from "next";

// Shape of a section stored as JSON in Supabase
type ProjectSection =
  | { type: "bullets";   title: string; items: string[] }
  | { type: "text";      title: string; paragraphs: string[] }
  | { type: "metrics";   title: string; items: { label: string; value: string; note?: string }[] }
  | { type: "timeline";  title: string; steps: { title: string; description: string }[] }
  | { type: "resources"; title: string; items: { label: string; href: string; note?: string }[] }
  | { type: "code";      title: string; language?: string; code: string; downloadUrl?: string };

type Params = { locale: string; slug: string };

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
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base || !bucket || !path) return null;
  return `${base}/storage/v1/object/public/${bucket}/${path}`;
}

function looksLikeImage(asset: ProjectAsset) {
  if (asset.type === "image") return true;
  if (asset.mime_type?.startsWith("image/")) return true;
  const p = asset.storage_path ?? "";
  return /\.(png|jpe?g|webp|gif|svg)$/i.test(p);
}

const PRIVATE_BUCKETS = new Set(["deliverables"]);

function getAssetHref(asset: ProjectAsset) {
  if (asset.external_url) return asset.external_url;
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

// Section accent color per type
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
    <div key={idx} className="card p-6">
      <div className="flex items-center gap-3 mb-5">
        <span className={`h-5 w-1 rounded-full ${accent}`} aria-hidden />
        <h2 className="text-base font-semibold text-strong">{section.title}</h2>
      </div>
      {children}
    </div>
  );

  switch (section.type) {
    case "bullets":
      return wrapper(
        <ul className="space-y-2 text-sm">
          {section.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-500" aria-hidden />
              <span className="text-muted leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "text":
      return wrapper(
        <div className="space-y-3">
          {section.paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-muted">{p}</p>
          ))}
        </div>
      );

    case "metrics":
      return wrapper(
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item, i) => (
            <div key={i} className="rounded-xl border border-black/10 dark:border-white/10 bg-black/3 dark:bg-white/3 p-4">
              <div className="text-3xl font-bold text-cyan-500">{item.value}</div>
              <div className="mt-1 text-sm font-medium text-strong">{item.label}</div>
              {item.note ? <div className="mt-1 text-xs text-muted">{item.note}</div> : null}
            </div>
          ))}
        </div>
      );

    case "timeline":
      return wrapper(
        <ol className="space-y-5">
          {section.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-xs font-bold text-amber-600 dark:text-amber-300">
                  {i + 1}
                </span>
                {i < section.steps.length - 1 ? (
                  <span className="mt-1 h-full w-px bg-amber-500/20" />
                ) : null}
              </div>
              <div className="pb-4">
                <div className="text-sm font-semibold text-strong">{step.title}</div>
                <div className="mt-1 text-sm text-muted leading-relaxed">{step.description}</div>
              </div>
            </li>
          ))}
        </ol>
      );

    case "resources":
      return wrapper(
        <ul className="space-y-2">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-baseline gap-2 text-sm">
              <span className="text-sky-500" aria-hidden>↗</span>
              <span>
                <a href={item.href} target="_blank" rel="noreferrer"
                  className="underline underline-offset-4 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">
                  {item.label}
                </a>
                {item.note ? <span className="ml-2 text-xs text-muted">{item.note}</span> : null}
              </span>
            </li>
          ))}
        </ul>
      );

    case "code":
      return wrapper(
        <>
          <pre className="overflow-x-auto rounded-xl bg-black/10 dark:bg-white/5 border border-black/10 dark:border-white/10 p-4 text-xs leading-relaxed font-mono">
            <code>{section.code}</code>
          </pre>
          {section.downloadUrl ? (
            <a href={section.downloadUrl}
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted underline underline-offset-4 hover:opacity-70"
              target="_blank" rel="noreferrer">
              ↓ Télécharger
            </a>
          ) : null}
        </>
      );

    default:
      return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const project = await getPublishedProjectBySlugWithAssetsCached(locale, slug);
  if (!project) return { title: "Project not found" };

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Portfolio";
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const title = `${project.title} | ${siteName}`;
  const description = project.hero_subtitle ?? project.summary ?? project.title;
  const canonical = `${siteUrl}/${locale}/projects/${slug}`;

  // OG image: first gallery image (static public path) or default OG
  const firstGalleryImg = project.gallery?.[0]?.src;
  const ogImage =
    firstGalleryImg && firstGalleryImg.startsWith("/")
      ? `${siteUrl}${firstGalleryImg}`
      : `${siteUrl}/opengraph-image`;

  // Both locales always exist for each project
  const languages: Record<string, string> = {
    en: `${siteUrl}/en/projects/${slug}`,
    fr: `${siteUrl}/fr/projects/${slug}`,
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

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;

  const project = await getPublishedProjectBySlugWithAssetsCached(locale, slug);
  if (!project) return notFound();

  const assets = (project.project_assets ?? []) as ProjectAsset[];

  const badge = project.badge ?? null;
  const tags = (project.tags ?? []) as string[];
  const techStack = project.tech_stack ?? [];

  // Rich content from Supabase (hero_subtitle, sections, gallery)
  const sections = (project.sections ?? []) as ProjectSection[];
  // If there is already a "resources" section, don't show Supabase file assets
  // (same deliverables would appear twice).
  const hasStaticResources = sections.some((s) => s.type === "resources");
  const heroSubtitle = project.hero_subtitle ?? project.summary ?? null;
  const gallery = project.gallery ?? [];

  // Split assets: images displayed inline, others as download cards
  const imageAssets = assets.filter(looksLikeImage);
  const fileAssets  = assets.filter((a) => !looksLikeImage(a));

  const badgeClass =
    badge?.tone === "client"   ? "badge badge-client"   :
    badge?.tone === "personal" ? "badge badge-personal" :
    badge?.tone === "training" ? "badge badge-training" : "";

  return (
    <main className="py-10 md:py-14">
      <div className="container mx-auto max-w-4xl px-4">

        {/* BACK */}
        <div className="mb-8">
          <Link
            href={`/${locale}#projects`}
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors soft-ring rounded-full"
          >
            ← {locale === "fr" ? "Retour aux projets" : "Back to projects"}
          </Link>
        </div>

        {/* HERO */}
        <header>
          <div className="flex flex-wrap items-start gap-3">
            <h1 className="text-3xl font-bold text-strong leading-tight flex-1">
              {project.title}
            </h1>
            {badge ? (
              <span className={badgeClass}>{badge.label}</span>
            ) : null}
          </div>

          {heroSubtitle ? (
            <p className="mt-4 text-base text-muted leading-relaxed max-w-2xl">
              {heroSubtitle}
            </p>
          ) : null}

          {/* Tags + tech stack */}
          {(tags.length > 0 || techStack.length > 0) ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="chip">{tag}</span>
              ))}
              {techStack.map((tech) => (
                <span key={tech} className="chip">{tech}</span>
              ))}
            </div>
          ) : null}

          {/* Repo / Live links */}
          {(project.repo_url || project.live_url) ? (
            <div className="mt-5 flex flex-wrap gap-3">
              {project.repo_url ? (
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 transition-colors soft-ring"
                >
                  <span aria-hidden="true">↗ </span>Repo
                </a>
              ) : null}
              {project.live_url ? (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-black hover:opacity-90 transition-opacity soft-ring"
                >
                  <span aria-hidden="true">↗ </span>Live
                </a>
              ) : null}
            </div>
          ) : null}
        </header>

        {/* DIVIDER */}
        <div className="mt-10 h-px w-full bg-black/10 dark:bg-white/10" />

        {/* GALLERY */}
        {gallery.length > 0 ? (
          <div className="mt-10">
            <ImageGallery images={gallery} />
          </div>
        ) : null}

        {/* INLINE IMAGES from Supabase Storage */}
        {imageAssets.length > 0 ? (
          <div className={`mt-10 grid gap-4 ${imageAssets.length > 1 ? "sm:grid-cols-2" : ""}`}>
            {imageAssets.map((a) => {
              const href = getAssetHref(a);
              if (!href) return null;
              return (
                <div key={a.id} className="card overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={href}
                    alt={a.title}
                    className="w-full object-contain"
                    loading="lazy"
                  />
                  {a.title ? (
                    <p className="px-4 py-2 text-xs text-muted">{a.title}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}

        {/* RICH SECTIONS */}
        {sections.length > 0 ? (
          <div className="mt-10 space-y-5">
            {sections.map((section, idx) => renderSection(section, idx))}
          </div>
        ) : null}

        {/* DELIVERABLES / FILE ASSETS */}
        {fileAssets.length > 0 && !hasStaticResources ? (
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-strong mb-4">
              {locale === "fr" ? "Livrables & documents" : "Deliverables & documents"}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {fileAssets.map((a) => {
                const href = getAssetHref(a);
                return (
                  <div key={a.id} className="card flex items-start gap-4 p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 text-lg font-bold">
                      ↓
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-strong truncate">{a.title}</div>
                      {a.description ? (
                        <div className="mt-0.5 text-xs text-muted">{a.description}</div>
                      ) : null}
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-block text-xs text-cyan-600 dark:text-cyan-300 underline underline-offset-4 hover:opacity-70 transition-opacity"
                        >
                          {locale === "fr" ? "Ouvrir le fichier" : "Open file"}
                        </a>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

      </div>
    </main>
  );
}
