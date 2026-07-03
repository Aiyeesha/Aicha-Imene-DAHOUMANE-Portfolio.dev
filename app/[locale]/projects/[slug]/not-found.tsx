import { getLocale } from "next-intl/server";
import Link from "next/link";
import { getPublishedProjectsWithAssetsCached } from "@/lib/data/projects.cached";

export default async function ProjectNotFound() {
  const locale = await getLocale();
  const isFr = locale === "fr";
  const isEs = locale === "es";

  const allProjects = await getPublishedProjectsWithAssetsCached(locale);
  const suggested = allProjects.slice(0, 3);

  return (
    <main className="py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4 text-center">

        <p className="text-8xl font-black text-cyan-500/20 dark:text-cyan-400/15 select-none leading-none">
          404
        </p>

        <h1 className="mt-4 text-2xl font-semibold text-strong">
          {isFr ? "Projet introuvable" : isEs ? "Proyecto no encontrado" : "Project not found"}
        </h1>
        <p className="mt-3 text-sm text-muted">
          {isFr
            ? "Ce projet n'existe pas ou a été déplacé."
            : isEs
            ? "Este proyecto no existe o ha sido trasladado."
            : "This project doesn't exist or may have been moved."}
        </p>

        <Link
          href={`/${locale}/projects`}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-2.5 text-sm font-medium text-black hover:opacity-90 transition-opacity"
        >
          {isFr ? "Voir tous les projets" : isEs ? "Ver todos los proyectos" : "See all projects"}
        </Link>

        {suggested.length > 0 && (
          <div className="mt-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-6">
              {isFr ? "Vous aimerez peut-être" : isEs ? "Quizás te interese" : "You might like"}
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {suggested.map((project) => (
                <Link
                  key={project.id}
                  href={`/${locale}/projects/${project.slug}`}
                  className="card p-5 text-left hover:border-cyan-500/30 transition-colors group"
                >
                  <p className="text-sm font-semibold text-strong group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                    {project.title}
                  </p>
                  {project.summary && (
                    <p className="mt-2 text-xs text-muted line-clamp-3 leading-relaxed">
                      {project.summary}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
