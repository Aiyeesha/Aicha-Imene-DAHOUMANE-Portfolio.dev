// app/admin/page.tsx
// ------------------
// Admin dashboard, behind HTTP Basic Auth (proxy.ts and
// lib/security/adminAuth.ts): stats and projects read from content/ (the
// source of truth), project translation gaps, the testimonial invitation
// generator, blog counts per category, certifications, cache revalidation.
// Contact messages and testimonials arrive by e-mail (Formhook) and are not
// stored, so they have no section here.

import { projects as contentProjects } from "@/content/projects";
import { projectTranslationGaps } from "@/lib/contentChecks";
import { certifications as staticCertifications } from "@/content/certifications";
import { readdir } from "fs/promises";
import { join } from "path";
import Link from "next/link";
import RevalidateButton from "./RevalidateButton";
import TestimonialInviteGenerator from "./TestimonialInviteGenerator";
import { assertAdminOrNotFound } from "@/lib/security/adminAuth";

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

// ── Sub-components ─────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, color = "slate" }: {
  label: string; value: number | string; sub?: string;
  color?: "slate" | "cyan" | "emerald" | "violet" | "amber" | "rose";
}) {
  const colors: Record<string, string> = {
    slate:   "border-white/10 bg-white/4",
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
  // Auth guard first; see lib/security/adminAuth.ts for why it runs in each
  // page as well as in the layout.
  await assertAdminOrNotFound();

  const blog = await countBlogArticles();
  const translationGaps = projectTranslationGaps();

  // Project stats (content/projects.ts, one entry per slug)
  const statusOf = (p: { status?: string }) => p.status ?? "published";
  const projectsPublished  = contentProjects.filter((p) => statusOf(p) === "published").length;
  const projectsDraft      = contentProjects.filter((p) => statusOf(p) === "draft").length;
  const projectsArchived   = contentProjects.filter((p) => statusOf(p) === "archived").length;
  const projectsSalesforce = contentProjects.filter((p) => p.track === "salesforce").length;
  const projectsItops      = contentProjects.filter((p) => p.track === "itops").length;

  function fmtDate(iso: string | null | undefined) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("fr-FR", {
      day: "2-digit", month: "short", year: "numeric",
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

  // Same order as the site: featured first, then sort order
  const enProjectRows = [...contentProjects].sort(
    (a, b) => Number(b.featured) - Number(a.featured) || (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
  );

  return (
    <div className="space-y-10">

      {/* ── Overview ──────────────────────────────────────────────────────────── */}
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
            value={staticCertifications.length}
            sub="Source statique — content/certifications.ts"
            color="violet"
          />
        </div>

        {/* Track breakdown */}
        <div className="mt-4 flex gap-4 text-sm text-slate-400">
          <span className="text-cyan-400">Salesforce : {projectsSalesforce}</span>
          <span className="text-slate-600">·</span>
          <span className="text-violet-400">IT Ops : {projectsItops}</span>
          <span className="text-slate-600">·</span>
          <span>Archivés : {projectsArchived}</span>
        </div>
      </section>

      {/* ── Blog: missing translations ────────────────────────────────────────── */}
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

      {/* ── Projects: translations to check ───────────────────────────────────── */}
      {/* A slug present in FR/ES is not necessarily translated: this section
          shows such gaps before a visitor finds them. */}
      {translationGaps.length > 0 && (
        <section>
          <SectionHeader
            title="Projets — traductions à vérifier"
            count={translationGaps.length}
            right={
              <div className="text-xs text-slate-500">
                Champ identique à l&apos;EN ou manquant
              </div>
            }
          />
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Locale</th>
                  <th className="px-4 py-3">Champ</th>
                  <th className="px-4 py-3">Problème</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {translationGaps.map((g) => (
                  <tr key={`${g.slug}-${g.locale}-${g.field}`} className="hover:bg-white/3 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-slate-300">{g.slug}</td>
                    <td className="px-4 py-3">
                      <Badge label={g.locale.toUpperCase()} color="bg-slate-500/15 text-slate-400" />
                    </td>
                    <td className="px-4 py-3 text-slate-400">{g.field}</td>
                    <td className="px-4 py-3">
                      <Badge
                        label={g.reason === "missing" ? "manquant" : "= EN"}
                        color={g.reason === "missing" ? "bg-rose-500/15 text-rose-400" : "bg-amber-500/15 text-amber-400"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ── Projects ──────────────────────────────────────────────────────────── */}
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
                <th className="px-4 py-3">Mis à jour</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {enProjectRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-slate-500">Aucun projet.</td>
                </tr>
              ) : (
                enProjectRows.map((p) => (
                  <tr key={p.slug} className="hover:bg-white/3 transition-colors group">
                    <td className="px-4 py-3 max-w-[220px]">
                      <a
                        href={`/en/projects/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-slate-200 hover:text-cyan-400 transition-colors truncate block group-hover:underline"
                      >
                        {p.title ?? p.slug} <span className="opacity-0 group-hover:opacity-60 text-xs">↗</span>
                      </a>
                    </td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{p.slug}</td>
                    <td className="px-4 py-3">
                      {p.track && <Badge label={p.track} color={trackBadge(p.track)} />}
                    </td>
                    <td className="px-4 py-3">
                      <Badge label={statusOf(p)} color={statusBadge(statusOf(p))} />
                    </td>
                    <td className="px-4 py-3 text-slate-400">{p.featured ? "⭐" : "—"}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{fmtDate(p.updatedAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────────── */}
      {/* Submissions arrive by e-mail (Formhook); the site section is fed by
          content/testimonials.ts once a testimonial is approved. */}
      <section>
        <SectionHeader title="Témoignages" />
        <TestimonialInviteGenerator />
      </section>

      {/* ── Certifications ────────────────────────────────────────────────────── */}
      <section>
        <SectionHeader title="Certifications" count={staticCertifications.length} />
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Émetteur</th>
                <th className="px-4 py-3">Obtenue le</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {staticCertifications.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-slate-500">Aucune certification.</td>
                </tr>
              ) : (
                staticCertifications.map((c) => (
                  <tr key={c.id} className="hover:bg-white/3 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-200">{c.name}</td>
                    <td className="px-4 py-3 text-slate-400">{c.issuer}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{c.earnedDate}</td>
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
