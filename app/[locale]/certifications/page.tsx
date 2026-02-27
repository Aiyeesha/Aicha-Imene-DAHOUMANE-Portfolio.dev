import { getCertifications } from "@/lib/data/certifications";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CertificationsPage({ params }: PageProps) {
  const { locale } = await params;

  const safeLocale = locale === "fr" ? "fr" : "en";
  const items = (await getCertifications(safeLocale)) ?? [];

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Certifications</h1>

      {items.length === 0 ? (
        <p className="mt-4 opacity-80">
          {safeLocale === "fr"
            ? "Aucune certification pour le moment."
            : "No certifications yet."}
        </p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {items.map((c) => (
            <article key={c.id} className="rounded-2xl border p-5">
              <div className="flex items-start gap-4">
                {c.badge_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.badge_image_url}
                    alt={c.name}
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-xl border" />
                )}

                <div className="min-w-0">
                  <h2 className="text-lg font-semibold">{c.name}</h2>
                  <p className="text-sm opacity-80">{c.issuer}</p>

                  {c.earned_label ? (
                    <p className="mt-1 text-sm opacity-80">
                      {safeLocale === "fr" ? "Obtenue :" : "Earned:"}{" "}
                      {c.earned_label}
                    </p>
                  ) : null}
                </div>
              </div>

              {c.description ? (
                <p className="mt-4 text-sm opacity-90">{c.description}</p>
              ) : null}

              {Array.isArray(c.skills) && c.skills.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border px-3 py-1 text-xs opacity-90"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              ) : null}

              {c.credential_url ? (
                <div className="mt-5">
                  <a
                    href={c.credential_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm underline underline-offset-4"
                  >
                    {safeLocale === "fr"
                      ? "Voir le justificatif"
                      : "View credential"}
                  </a>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}