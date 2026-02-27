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
};

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

                  {a.external_url ? (
                    <a
                      className="mt-2 inline-block underline"
                      href={a.external_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ouvrir
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}