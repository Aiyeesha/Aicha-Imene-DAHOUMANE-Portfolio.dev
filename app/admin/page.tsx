// app/admin/page.tsx
// ------------------
// Dashboard admin — visualisation + actions sur les données Supabase.
// Accès protégé par HTTP Basic Auth (middleware.ts).
//
// Fonctionnalités :
//   - Stats : projets, blog, certifications, messages, témoignages
//   - Projets : table avec liens directs vers les pages publiques
//   - Messages : 20 derniers avec mailto
//   - Témoignages : liste complète avec toggle publish/unpublish inline
//   - Blog : compteur par catégorie (lecture filesystem)
//   - Revalidation de cache ISR

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { readdir } from "fs/promises";
import { join } from "path";
import Link from "next/link";
import TogglePublished from "./TogglePublished";
import RevalidateButton from "./RevalidateButton";

// ── Types ─────────────────────────────────────────────────────────────────────

type ProjectRow = {
  id: string; slug: string; locale: string; title: string;
  status: string; track: string | null; featured: boolean;
  sort_order: number | null; created_at: string | null;
};

type MessageRow = {
  id: string; name: string; email: string; topic: string | null;
  subject: string | null; message: string; locale: string | null;
  created_at: string | null;
};

type CertRow = {
  id: string; name: string; issuer: string | null; locale: string;
};

type TestimonialRow = {
  id: string; name: string; role: string | null; company: string | null;
  quote: string | null; locale: string; is_published: boolean;
  sort_order: number | null; created_at: string | null;
};

// ── Blog counter (filesystem) ─────────────────────────────────────────────────

async function countBlogArticles() {
  const base = join(process.cwd(), "content/blog/posts");
  try {
    const [en, fr] = await Promise.all([
      readdir(join(base, "en")).catch(() => [] as string[]),
      readdir(join(base, "fr")).catch(() => [] as string[]),
    ]);
    const enSlugs = en.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(".mdx", ""));
    const frSlugs = fr.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(".mdx", ""));
    const missingFr = enSlugs.filter((s) => !frSlugs.includes(s));

    const catCount = (slugs: string[]) => ({
      salesforce: slugs.filter((s) =>
        /salesforce|apex|lwc|soql|flow|visuaforce|sfdc/.test(s)
      ).length,
      itops: slugs.filter((s) =>
        /windows|linux|docker|active-directory|datto|acronis|pfsense|powershell|malware|incident|monitoring|ssl|hyper-v|veeam|vlan|siem|network|backup|autopilot|github-actions/.test(s)
      ).length,
      nextjs: slugs.filter((s) =>
        /next|react|tailwind|typescript|supabase|playwright|framer/.test(s)
      ).length,
    });

    return { enTotal: enSlugs.length, frTotal: frSlugs.length, missingFr, cats: catCount(enSlugs) };
  } catch {
    return { enTotal: 0, frTotal: 0, missingFr: [] as string[], cats: { salesforce: 0, itops: 0, nextjs: 0 } };
  }
}

// ── Data fetching ─────────────────────────────────────────────────────────────

async function fetchDashboardData() {
  const supabase = createAdminSupabaseClient();

  const [projects, messages, certifications, testimonials, blog] = await Promise.all([
    supabase
      .from("projects")
      .select("id, slug, locale, title, status, track, featured, sort_order, created_at")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false }),

    supabase
      .from("messages")
      .select("id, name, email, topic, subject, message, locale, created_at")
      .order("created_at", { ascending: false })
      .limit(20),

    supabase
      .from("certifications")
      .select("id, name, issuer, locale"),

    supabase
      .from("testimonials")
      .select("id, name, role, company, quote, locale, is_published, sort_order, created_at")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false }),

    countBlogArticles(),
  ]);

  return {
    projects:       (projects.data      ?? []) as ProjectRow[],
    messages:       (messages.data      ?? []) as MessageRow[],
    certifications: (certifications.data ?? []) as CertRow[],
    testimonials:   (testimonials.data  ?? []) as TestimonialRow[],
    blog,
    errors: {
      projects:       projects.error?.message,
      messages:       messages.error?.message,
      certifications: certifications.error?.message,
      testimonials:   testimonials.error?.message,
    },
  };
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, color = "slate" }: {
  label: string; value: number | string; sub?: string;
  color?: "slate" | "cyan" | "emerald" | "violet" | "amber" | "rose";
}) {
  const colors: Record<string, string> = {
    slate:   "border-white/10 bg-white/[0.04]",
    cyan:    "border-cyan-500/30 bg-cyan-500/10",
    emerald: "border-emerald-500/30 bg-emerald-500/10",
    violet:  "border-violet-500/30 bg-violet-500/10",
    amber:   "border-amber-500/30 bg-amber-500/10",
    rose:    "border-rose-500/30 bg-rose-500/10",
  };
  const textColors: Record<string, string> = {
    slate: "text-slate-100", cyan: "text-cyan-300", emerald: "text-emerald-300",
    violet: "text-violet-300", amber: "text-amber-300", rose: "text-rose-300",
  };

  return (
    <div className={`rounded-xl border p-5 ${colors[color]}`}>
      <p className="text-xs uppercase tracking-widest text-slate-400">{label}</p>
      <p className={`mt-2 text-3xl font-bold tabular-nums ${textColors[color]}`}>{value}</p>
      {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
      <strong>Erreur Supabase :</strong> {message}
    </div>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${color}`}>
      {label}
    </span>
  );
}

function SectionHeader({ title, count, right }: { title: string; count?: number; right?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-base font-semibold text-slate-200">
        {title}{count !== undefined && <span className="ml-2 text-slate-500 font-normal text-sm">({count})</span>}
      </h2>
      {right}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function AdminPage() {
  const { projects, messages, certifications, testimonials, blog, errors } =
    await fetchDashboardData();

  // Stats projets
  const enProjects = projects.filter((p) => p.locale === "en");
  const projectsPublished  = enProjects.filter((p) => p.status === "published").length;
  const projectsDraft      = enProjects.filter((p) => p.status === "draft").length;
  const projectsArchived   = enProjects.filter((p) => p.status === "archived").length;
  const projectsSalesforce = enProjects.filter((p) => p.track === "salesforce").length;
  const projectsItops      = enProjects.filter((p) => p.track === "itops").length;

  // Stats certifs
  const certsEn = certifications.filter((c) => c.locale === "en").length;
  const certsFr = certifications.filter((c) => c.locale === "fr").length;

  // Stats témoignages
  const testimonialsPublished = testimonials.filter((t) => t.is_published).length;
  const testimonialsDraft     = testimonials.filter((t) => !t.is_published).length;

  function fmtDate(iso: string | null) {
    if (!iso) return "—";
    return new Date(iso).toLocaleString("fr-FR", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  }

  const statusBadge = (s: string) => ({
    published: "bg-emerald-500/15 text-emerald-400",
    draft:     "bg-amber-500/15 text-amber-400",
    archived:  "bg-slate-500/15 text-slate-400",
  }[s] ?? "bg-slate-500/15 text-slate-400");

  const trackBadge = (t: string | null) =>
    t === "salesforce" ? "bg-cyan-500/15 text-cyan-400"
    : t === "itops"    ? "bg-violet-500/15 text-violet-400"
    :                    "bg-slate-500/15 text-slate-400";

  const topicBadge = (t: string | null) => ({
    salesforce: "bg-cyan-500/15 text-cyan-400",
    itops:      "bg-violet-500/15 text-violet-400",
    web:        "bg-emerald-500/15 text-emerald-400",
    other:      "bg-slate-500/15 text-slate-400",
  }[t ?? ""] ?? "bg-slate-500/15 text-slate-400");

  // Only show "en" projects in table (deduplicated)
  const enProjectRows = projects.filter((p) => p.locale === "en");

  return (
    <div className="space-y-10">

      {/* Erreurs */}
      {Object.entries(errors).map(([key, msg]) =>
        msg ? <ErrorBanner key={key} message={`${key}: ${msg}`} /> : null
      )}

      {/* ── Vue d'ensemble ────────────────────────────────────────────────────── */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-100">Vue d&apos;ensemble</h1>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/incidents"
              className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-400 hover:bg-cyan-500/20 transition-colors"
            >
              → Dashboard incidents
            </Link>
            <RevalidateButton />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard
            label="Projets"
            value={enProjectRows.length}
            sub={`${projectsPublished} publiés · ${projectsDraft} brouillons`}
            color="cyan"
          />
          <StatCard
            label="Blog EN"
            value={blog.enTotal}
            sub={`SF·${blog.cats.salesforce} IT·${blog.cats.itops} Web·${blog.cats.nextjs}`}
            color="emerald"
          />
          <StatCard
            label="Blog FR"
            value={blog.frTotal}
            sub={blog.missingFr.length > 0 ? `${blog.missingFr.length} traductions manquantes` : "Complet ✓"}
            color={blog.missingFr.length > 0 ? "amber" : "emerald"}
          />
          <StatCard
            label="Certifications"
            value={certifications.length / 2}
            sub={`EN: ${certsEn} · FR: ${certsFr}`}
            color="violet"
          />
          <StatCard
            label="Messages"
            value={messages.length}
            sub="20 derniers affichés"
            color="slate"
          />
          <StatCard
            label="Témoignages"
            value={testimonials.length / 2}
            sub={`${testimonialsPublished / 2} publiés · ${testimonialsDraft / 2} masqués`}
            color="amber"
          />
        </div>

        {/* Tracks répartition */}
        <div className="mt-4 flex gap-4 text-sm text-slate-400">
          <span className="text-cyan-400">Salesforce : {projectsSalesforce}</span>
          <span className="text-slate-600">·</span>
          <span className="text-violet-400">IT Ops : {projectsItops}</span>
          <span className="text-slate-600">·</span>
          <span>Archivés : {projectsArchived}</span>
        </div>
      </section>

      {/* ── Blog — traductions manquantes ─────────────────────────────────────── */}
      {blog.missingFr.length > 0 && (
        <section>
          <SectionHeader
            title="Articles blog sans traduction FR"
            count={blog.missingFr.length}
          />
          <div className="flex flex-wrap gap-2">
            {blog.missingFr.map((slug) => (
              <span key={slug} className="rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs text-amber-400 font-mono">
                {slug}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ── Projets ───────────────────────────────────────────────────────────── */}
      <section>
        <SectionHeader title="Projets" count={enProjectRows.length} />
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Titre</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Track</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">★</th>
                <th className="px-4 py-3">Créé le</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {enProjectRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-slate-500">Aucun projet.</td>
                </tr>
              ) : (
                enProjectRows.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="px-4 py-3 max-w-[220px]">
                      <a
                        href={`/en/projects/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-slate-200 hover:text-cyan-400 transition-colors truncate block group-hover:underline"
                      >
                        {p.title} <span className="opacity-0 group-hover:opacity-60 text-xs">↗</span>
                      </a>
                    </td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{p.slug}</td>
                    <td className="px-4 py-3">
                      {p.track && <Badge label={p.track} color={trackBadge(p.track)} />}
                    </td>
                    <td className="px-4 py-3">
                      <Badge label={p.status} color={statusBadge(p.status)} />
                    </td>
                    <td className="px-4 py-3 text-slate-400">{p.featured ? "⭐" : "—"}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{fmtDate(p.created_at)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Témoignages ───────────────────────────────────────────────────────── */}
      <section>
        <SectionHeader
          title="Témoignages"
          count={testimonials.filter((t) => t.locale === "en").length}
          right={
            <div className="text-xs text-slate-500">
              Cliquez sur le badge pour publier/masquer
            </div>
          }
        />
        {testimonials.length === 0 ? (
          <p className="text-sm text-slate-500">Aucun témoignage.</p>
        ) : (
          <div className="space-y-3">
            {testimonials
              .filter((t) => t.locale === "en")
              .map((t) => (
                <div
                  key={t.id}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex gap-4 items-start"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-medium text-slate-100 text-sm">{t.name}</span>
                      {t.role && <span className="text-xs text-slate-400">{t.role}</span>}
                      {t.company && (
                        <span className="text-xs text-slate-500">@ {t.company}</span>
                      )}
                      <span className="ml-auto text-xs text-slate-600">{fmtDate(t.created_at)}</span>
                    </div>
                    {t.quote && (
                      <p className="text-sm text-slate-300 italic leading-relaxed line-clamp-3">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <TogglePublished id={t.id} isPublished={t.is_published} />
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>

      {/* ── Messages de contact ───────────────────────────────────────────────── */}
      <section>
        <SectionHeader title="Messages de contact" count={messages.length} />
        {messages.length === 0 ? (
          <p className="text-sm text-slate-500">Aucun message reçu.</p>
        ) : (
          <div className="space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-medium text-slate-100">{m.name}</span>
                  <span className="text-slate-500">—</span>
                  <a href={`mailto:${m.email}`} className="text-cyan-400 hover:underline text-xs">
                    {m.email}
                  </a>
                  {m.topic && <Badge label={m.topic} color={topicBadge(m.topic)} />}
                  {m.locale && <Badge label={m.locale.toUpperCase()} color="bg-slate-500/15 text-slate-400" />}
                  <span className="ml-auto text-xs text-slate-500">{fmtDate(m.created_at)}</span>
                </div>
                {m.subject && (
                  <p className="mt-2 text-xs font-medium text-slate-400">Sujet : {m.subject}</p>
                )}
                <p className="mt-2 text-sm text-slate-300 leading-relaxed line-clamp-4">
                  {m.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Certifications ────────────────────────────────────────────────────── */}
      <section>
        <SectionHeader title="Certifications" count={certsEn} />
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Émetteur</th>
                <th className="px-4 py-3">Locale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {certifications.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-slate-500">Aucune certification.</td>
                </tr>
              ) : (
                certifications.map((c) => (
                  <tr key={c.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-200">{c.name}</td>
                    <td className="px-4 py-3 text-slate-400">{c.issuer ?? "—"}</td>
                    <td className="px-4 py-3">
                      <Badge label={c.locale} color="bg-slate-500/15 text-slate-400" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
