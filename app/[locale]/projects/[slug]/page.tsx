import { getPublishedProjectBySlugWithAssetsCached } from "@/lib/data/projectBySlug.cached";
import { notFound } from "next/navigation";

/**
 * Project detail page powered by Supabase + Redis cache (Strategy A).
 * Replaces the old static import from `@/content/projects`.
 */
type Params = { locale: string; slug: string };

// Adjust `id` type if your DB uses number
type ProjectAsset = {
  id: string;
  title: string;
  description?: string | null;
  external_url?: string | null;

  // Supabase Storage fields (used when `external_url` is empty)
  storage_bucket?: string | null;
  storage_path?: string | null;
  mime_type?: string | null;
  type?: string | null; // e.g. "image" | "deliverable"
};

function getPublicStorageUrl(bucket?: string | null, path?: string | null) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base || !bucket || !path) return null;
  // Works ONLY for PUBLIC buckets.
  return `${base}/storage/v1/object/public/${bucket}/${path}`;
}

function looksLikeImage(asset: ProjectAsset) {
  if (asset.type === "image") return true;
  if (asset.mime_type?.startsWith("image/")) return true;
  const p = asset.storage_path ?? "";
  return /\.(png|jpe?g|webp|gif|svg)$/i.test(p);
}

function getAssetHref(asset: ProjectAsset) {
  // 1) External URL provided in DB
  if (asset.external_url) return asset.external_url;

  // 2) PUBLIC bucket URL
  const publicUrl = getPublicStorageUrl(asset.storage_bucket, asset.storage_path);
  if (publicUrl) return publicUrl;

  // 3) PRIVATE bucket (e.g. deliverables) -> redirect endpoint generates a signed URL
  if (asset.storage_bucket && asset.storage_path) {
    const params = new URLSearchParams({
      bucket: asset.storage_bucket,
      path: asset.storage_path,
    });
    return `/api/storage/redirect?${params.toString()}`;
  }

  return null;
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

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold">{project.title}</h1>

        {project.summary ? (
          <p className="mt-3 text-muted-foreground">{project.summary}</p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          {project.repo_url ? (
            <a className="underline" href={project.repo_url} target="_blank" rel="noreferrer">
              Repo
            </a>
          ) : null}

          {project.live_url ? (
            <a className="underline" href={project.live_url} target="_blank" rel="noreferrer">
              Live
            </a>
          ) : null}
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Assets</h2>

          {assets.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Aucun asset pour ce projet.
            </p>
          ) : (
            <div className="mt-4 grid gap-3">
              {assets.map((a) => (
                <div key={a.id} className="rounded-xl border p-4">
                  <div className="font-medium">{a.title}</div>

                  {a.description ? (
                    <div className="mt-1 text-sm text-muted-foreground">
                      {a.description}
                    </div>
                  ) : null}

                  {(() => {
                    const href = getAssetHref(a);
                    if (!href) return null;

                    const isImage = looksLikeImage(a);

                    return (
                      <>
                        {isImage ? (
                          <div className="mt-3">
                            {/* Use <img> to avoid Next/Image remote domain config */}
                            <img
                              src={href}
                              alt={a.title}
                              className="max-h-72 w-auto rounded-lg border"
                              loading="lazy"
                            />
                          </div>
                        ) : null}

                        <a
                          className="mt-3 inline-block underline"
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Ouvrir
                        </a>
                      </>
                    );
                  })()}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}