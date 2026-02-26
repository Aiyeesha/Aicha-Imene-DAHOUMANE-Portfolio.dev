import { projects } from "@/content/projects";
import { tBadge, tCategory, tTag } from "@/i18n/projectTaxonomy";
import { projectDetails } from "@/content/projectDetails";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Params = { slug: string; locale: string };

function absolutizeUrl(pathOrUrl: string, base: string) {
  if (!pathOrUrl) return base;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
  if (pathOrUrl.startsWith("/")) return `${base}${pathOrUrl}`;
  return `${base}/${pathOrUrl}`;
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const extra = projectDetails.find((d) => d.slug === slug);
  const localized = extra?.locales?.[locale as "en" | "fr"] ?? extra?.locales?.en;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Portfolio";
  const title = `${project.title} | ${siteName}`;
  const description = localized?.heroSubtitle ?? project.excerpt;

  const ogImage = extra?.gallery?.[0]?.src
    ? absolutizeUrl(extra.gallery[0].src, siteUrl)
    : absolutizeUrl("/opengraph-image", siteUrl);

  // Build a fully-qualified canonical URL for the project page
  const canonical = `${siteUrl}/${locale}/projects/${slug}`;
  // Define alternate language URLs for SEO internationalization.
  // Regardless of the current locale, we always expose both language versions so crawlers can discover them.
  const languages = {
    en: `${siteUrl}/en/projects/${slug}`,
    fr: `${siteUrl}/fr/projects/${slug}`
  } as const;

  return {
    title,
    description,
    // Expose the canonical URL and language-specific alternates
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      locale,
      type: "article",
      images: [{ url: ogImage }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage]
    }
  };
}

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="card p-5">
      <div className="text-xs text-muted-2">{label}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {note ? <div className="mt-2 text-sm text-muted-2">{note}</div> : null}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-4 card p-6">{children}</div>
    </section>
  );
}

export default async function ProjectDetailsPage({ params }: { params: Promise<Params> }) {
  const { slug, locale } = await params;

  const t = await getTranslations({ locale, namespace: "projects" });

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const extra = projectDetails.find((d) => d.slug === slug);
  const localized = extra?.locales?.[locale as "en" | "fr"] ?? extra?.locales?.en;

  return (
    <section className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <div className="text-sm text-muted-2">{t("labelProject")}</div>
            <h1 className="mt-2 text-4xl font-semibold leading-tight">{project.title}</h1>
            <p className="mt-4 max-w-3xl text-muted">{localized?.heroSubtitle ?? project.excerpt}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="chip">
                  {tTag(t, locale as "en" | "fr")}
                </span>
              ))}
            </div>



            {project.highlights && project.highlights.length > 0 ? (
              <div className="mt-6 max-w-3xl">
                <div className="text-sm font-semibold text-strong">{t("highlightsTitle")}</div>
                <ul className="mt-3 list-disc pl-5 text-muted space-y-2">
                  {project.highlights.slice(0, 6).map((h, i) => (
                    <li key={`${slug}-hl-${i}`}>{h}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/#projects`}
                className="rounded-full border border-black/10 bg-black/5 px-5 py-2 text-sm hover:bg-black/10 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10 soft-ring"
              >
                {t("backToProjects")}
              </Link>

              {project.pdfUrl && (
                <a
                  href={project.pdfUrl}
                  className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring"
                >
                  {t("requirements")}
                </a>
              )}
            </div>
          </div>

          <div className="grid w-full gap-3 md:max-w-sm">
            <Stat label={t("trackLabel")} value={project.track === "salesforce" ? t("trackSalesforce") : t("trackItOps")} />
            <Stat label={t("typeLabel")} value={(project.categories[0] ? tCategory(project.categories[0], locale as "en" | "fr") : "—")} />
            <Stat label={t("scopeLabel")} value={(project.badge?.label ? tBadge(project.badge.label, locale as "en" | "fr") : "—")} />
          </div>
        </div>

        {extra?.gallery?.length ? (
          <Section title={t("overview")}>
            <ImageGallery images={extra.gallery} />
          </Section>
        ) : null}

        {(localized?.sections ?? []).map((s, idx) => {
          if (s.type === "bullets") {
            return (
              <Section key={`${s.title}-${idx}`} title={s.title}>
                <ul className="list-disc pl-5 text-muted space-y-2">
                  {s.items.map((it, i) => (
                    <li key={`${i}-${it.slice(0, 16)}`}>{it}</li>
                  ))}
                </ul>
              </Section>
            );
          }

          if (s.type === "text") {
            return (
              <Section key={`${s.title}-${idx}`} title={s.title}>
                <div className="text-muted space-y-3">
                  {s.paragraphs.map((p, i) => (
                    <p key={`${i}-${p.slice(0, 16)}`}>{p}</p>
                  ))}
                </div>
              </Section>
            );
          }

          if (s.type === "metrics") {
            return (
              <section key={`${s.title}-${idx}`} className="mt-10">
                <h2 className="text-xl font-semibold">{s.title}</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {s.items.map((m, i) => (
                    <Stat key={`${m.label}-${i}`} label={m.label} value={m.value} note={m.note} />
                  ))}
                </div>
              </section>
            );
          }

          if (s.type === "timeline") {
            return (
              <Section key={`${s.title}-${idx}`} title={s.title}>
                <ol className="relative border-l border-black/10 pl-5 text-muted space-y-4 dark:border-white/10">
                  {s.steps.map((st, i) => (
                    <li key={`${st.title}-${i}`} className="relative">
                      <div className="absolute -left-[6px] mt-1 h-3 w-3 rounded-full bg-cyan-400/70" />
                      <div className="font-medium text-strong">{st.title}</div>
                      <div className="text-sm">{st.description}</div>
                    </li>
                  ))}
                </ol>
              </Section>
            );
          }


          if (s.type === "resources") {
            return (
              <Section key={`${s.title}-${idx}`} title={s.title}>
                <ul className="space-y-3">
                  {s.items.map((it, i) => (
                    <li key={`${it.label}-${i}`} className="flex flex-col gap-1">
                      <a
                        href={it.href}
                        className="text-sm font-medium text-cyan-700 hover:underline dark:text-cyan-300"
                      >
                        {it.label}
                      </a>
                      {it.note ? <div className="text-sm text-muted-2">{it.note}</div> : null}
                    </li>
                  ))}
                </ul>
              </Section>
            );
          }

          if (s.type === "code") {
            return (
              <Section key={`${s.title}-${idx}`} title={s.title}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-muted-2">
                    {s.language ? s.language.toUpperCase() : "CODE"}
                  </div>
                  {s.downloadUrl ? (
                    <a
                      href={s.downloadUrl}
                      className="rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-xs hover:bg-black/10 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10 soft-ring"
                    >
                      {t("downloadCode")}
                    </a>
                  ) : null}
                </div>
                <pre className="mt-4 max-h-[520px] overflow-auto rounded-xl border border-black/10 bg-black/5 p-4 text-sm text-strong dark:border-white/10 dark:bg-white/5">
                  <code>{s.code}</code>
                </pre>
              </Section>
            );
          }

          return null;
        })}
    </section>
  );
}