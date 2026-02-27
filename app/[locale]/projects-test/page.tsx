import { getPublishedProjectsWithAssetsCached } from "@/lib/data/projects.cached";

type Params = { locale: string };

export default async function ProjectsTestPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;

  const projects = await getPublishedProjectsWithAssetsCached(locale);

  return (
    <div className="mt-8 grid gap-6">
      {projects.map((p) => (
        <section key={p.id} className="card p-6">
          <h2 className="text-xl font-semibold">{p.title}</h2>
          {p.summary ? <p className="mt-2 text-muted">{p.summary}</p> : null}
          <div className="mt-3 text-sm opacity-70">
            slug: {p.slug} — assets: {p.project_assets?.length ?? 0}
          </div>
        </section>
      ))}
    </div>
  );
}