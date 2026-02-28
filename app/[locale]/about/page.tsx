import { getAboutPageCached } from "@/lib/data/about.cached";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type AboutBody = {
  introduction?: string;
  journey?: { title?: string; paragraphs?: string[] };
  values?: { title?: string; items?: { title: string; description: string }[] };
  passions?: { title?: string; paragraphs?: string[] };
  goals2026?: { title?: string; items?: string[] };
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale = locale === "fr" ? "fr" : "en";

  const about = await getAboutPageCached(safeLocale);

  if (!about) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-semibold">
          {safeLocale === "fr" ? "À propos" : "About"}
        </h1>
        <p className="mt-4 opacity-80">
          {safeLocale === "fr"
            ? "Contenu indisponible pour le moment."
            : "Content not available yet."}
        </p>
      </main>
    );
  }

  const body = (about.body ?? {}) as AboutBody;

  const journey = body.journey;
  const values = body.values;
  const passions = body.passions;
  const goals = body.goals2026;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header>
        <h1 className="text-3xl font-semibold">{about.headline}</h1>
        {about.intro ? (
          <p className="mt-4 text-base opacity-90">{about.intro}</p>
        ) : null}
      </header>

      {/* INTRODUCTION (si présent dans body) */}
      {body.introduction ? (
        <section className="mt-10 rounded-2xl border p-6">
          <p className="text-sm leading-relaxed opacity-90">{body.introduction}</p>
        </section>
      ) : null}

      <div className="mt-10 space-y-10">
        {/* JOURNEY */}
        {journey?.title || (journey?.paragraphs?.length ?? 0) > 0 ? (
          <section className="rounded-2xl border p-6">
            <SectionTitle>{journey?.title ?? (safeLocale === "fr" ? "Parcours" : "Journey")}</SectionTitle>
            {Array.isArray(journey?.paragraphs) ? (
              <div className="mt-4 space-y-3">
                {journey!.paragraphs!.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed opacity-90">
                    {p}
                  </p>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        {/* VALUES */}
        {values?.title || (values?.items?.length ?? 0) > 0 ? (
          <section className="rounded-2xl border p-6">
            <SectionTitle>
              {values?.title ?? (safeLocale === "fr" ? "Valeurs" : "Values")}
            </SectionTitle>

            {Array.isArray(values?.items) ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {values!.items!.map((it, idx) => (
                  <article key={idx} className="rounded-2xl border p-4">
                    <h3 className="font-semibold">{it.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed opacity-90">
                      {it.description}
                    </p>
                  </article>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        {/* PASSIONS */}
        {passions?.title || (passions?.paragraphs?.length ?? 0) > 0 ? (
          <section className="rounded-2xl border p-6">
            <SectionTitle>
              {passions?.title ?? (safeLocale === "fr" ? "En dehors du travail" : "Outside of work")}
            </SectionTitle>
            {Array.isArray(passions?.paragraphs) ? (
              <div className="mt-4 space-y-3">
                {passions!.paragraphs!.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed opacity-90">
                    {p}
                  </p>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        {/* GOALS */}
        {goals?.title || (goals?.items?.length ?? 0) > 0 ? (
          <section className="rounded-2xl border p-6">
            <SectionTitle>{goals?.title ?? (safeLocale === "fr" ? "Objectifs" : "Goals")}</SectionTitle>
            {Array.isArray(goals?.items) ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm opacity-90">
                {goals!.items!.map((g, i) => (
                  <li key={i} className="leading-relaxed">
                    {g}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ) : null}
      </div>
    </main>
  );
}