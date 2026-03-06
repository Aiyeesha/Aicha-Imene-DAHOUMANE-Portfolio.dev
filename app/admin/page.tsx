// app/admin/page.tsx
// ------------------
// Dashboard admin — visualisation des données Supabase.
// Accès protégé par HTTP Basic Auth (middleware.ts).
// Utilise le client service_role (contourne le RLS) pour lire toutes les tables.
//
// Données affichées :
//   - Compteurs : projets (published/draft/archived), certifications, messages, témoignages
//   - Répartition des projets par track (salesforce / itops)
//   - 20 derniers messages de contact (table messages — illisible pour anon)

import { createAdminSupabaseClient } from "@/lib/supabase/admin";

// ── Types ─────────────────────────────────────────────────────────────────────

type ProjectRow = {
  id: string;
  slug: string;
  locale: string;
  title: string;
  status: string;
  track: string | null;
  featured: boolean;
  sort_order: number | null;
  created_at: string | null;
};

type MessageRow = {
  id: string;
  name: string;
  email: string;
  topic: string | null;
  subject: string | null;
  message: string;
  locale: string | null;
  created_at: string | null;
};

type CertRow = {
  id: string;
  name: string;
  issuer: string | null;
  locale: string;
};

type TestimonialRow = {
  id: string;
  is_published: boolean;
};

// ── Data fetching ─────────────────────────────────────────────────────────────

async function fetchDashboardData() {
  const supabase = createAdminSupabaseClient();

  const [projects, messages, certifications, testimonials] = await Promise.all([
    supabase
      .from("projects")
      .select("id, slug, locale, title, status, track, featured, sort_order, created_at")
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
      .select("id, is_published"),
  ]);

  return {
    projects: (projects.data ?? []) as ProjectRow[],
    messages: (messages.data ?? []) as MessageRow[],
    certifications: (certifications.data ?? []) as CertRow[],
    testimonials: (testimonials.data ?? []) as TestimonialRow[],
    errors: {
      projects:     projects.error?.message,
      messages:     messages.error?.message,
      certifications: certifications.error?.message,
      testimonials: testimonials.error?.message,
    },
  };
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  color = "slate",
}: {
  label: string;
  value: number | string;
  sub?: string;
  color?: "slate" | "cyan" | "emerald" | "violet" | "amber";
}) {
  const colors: Record<string, string> = {
    slate:   "border-white/10 bg-white/[0.04]",
    cyan:    "border-cyan-500/30 bg-cyan-500/10",
    emerald: "border-emerald-500/30 bg-emerald-500/10",
    violet:  "border-violet-500/30 bg-violet-500/10",
    amber:   "border-amber-500/30 bg-amber-500/10",
  };
  const textColors: Record<string, string> = {
    slate:   "text-slate-100",
    cyan:    "text-cyan-300",
    emerald: "text-emerald-300",
    violet:  "text-violet-300",
    amber:   "text-amber-300",
  };

  return (
    <div className={`rounded-xl border p-5 ${colors[color]}`}>
      <p className="text-xs uppercase tracking-widest text-slate-400">{label}</p>
      <p className={`mt-2 text-3xl font-bold tabular-nums ${textColors[color]}`}>
        {value}
      </p>
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function AdminPage() {
  const { projects, messages, certifications, testimonials, errors } =
    await fetchDashboardData();

  // ── Stats projets ──────────────────────────────────────────────────────────
  const projectsPublished = projects.filter((p) => p.status === "published").length;
  const projectsDraft     = projects.filter((p) => p.status === "draft").length;
  const projectsArchived  = projects.filter((p) => p.status === "archived").length;
  const projectsSalesforce = projects.filter((p) => p.track === "salesforce").length;
  const projectsItops      = projects.filter((p) => p.track === "itops").length;

  // ── Stats certifications ───────────────────────────────────────────────────
  const certsEn = certifications.filter((c) => c.locale === "en").length;
  const certsFr = certifications.filter((c) => c.locale === "fr").length;

  // ── Stats témoignages ──────────────────────────────────────────────────────
  const testimonialsPublished = testimonials.filter((t) => t.is_published).length;
  const testimonialsDraft     = testimonials.filter((t) => !t.is_published).length;

  // ── Helpers ────────────────────────────────────────────────────────────────
  function fmtDate(iso: string | null) {
    if (!iso) return "—";
    return new Date(iso).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      published: "bg-emerald-500/15 text-emerald-400",
      draft:     "bg-amber-500/15 text-amber-400",
      archived:  "bg-slate-500/15 text-slate-400",
    };
    return map[status] ?? "bg-slate-500/15 text-slate-400";
  };

  const trackBadge = (track: string | null) => {
    if (track === "salesforce") return "bg-cyan-500/15 text-cyan-400";
    if (track === "itops")      return "bg-violet-500/15 text-violet-400";
    return "bg-slate-500/15 text-slate-400";
  };

  const topicBadge = (topic: string | null) => {
    const map: Record<string, string> = {
      salesforce: "bg-cyan-500/15 text-cyan-400",
      itops:      "bg-violet-500/15 text-violet-400",
      web:        "bg-emerald-500/15 text-emerald-400",
      other:      "bg-slate-500/15 text-slate-400",
    };
    return topic ? (map[topic] ?? "bg-slate-500/15 text-slate-400") : "";
  };

  return (
    <div className="space-y-10">

      {/* ── Erreurs ──────────────────────────────────────────────────────────── */}
      {Object.entries(errors).map(([key, msg]) =>
        msg ? <ErrorBanner key={key} message={`${key}: ${msg}`} /> : null
      )}

      {/* ── Section : Vue d'ensemble ──────────────────────────────────────────── */}
      <section>
        <h1 className="mb-6 text-xl font-semibold text-slate-100">Vue d&apos;ensemble</h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            label="Projets"
            value={projects.length}
            sub={`${projectsPublished} publiés · ${projectsDraft} brouillons`}
            color="cyan"
          />
          <StatCard
            label="Certifications"
            value={certifications.length}
            sub={`EN: ${certsEn} · FR: ${certsFr}`}
            color="emerald"
          />
          <StatCard
            label="Messages reçus"
            value={messages.length}
            sub="20 derniers affichés"
            color="violet"
          />
          <StatCard
            label="Témoignages"
            value={testimonials.length}
            sub={`${testimonialsPublished} publiés · ${testimonialsDraft} masqués`}
            color="amber"
          />
        </div>
      </section>

      {/* ── Section : Projets ─────────────────────────────────────────────────── */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-200">
            Projets ({projects.length})
          </h2>
          <div className="flex gap-3 text-xs text-slate-400">
            <span>Salesforce : {projectsSalesforce}</span>
            <span className="text-slate-600">·</span>
            <span>IT Ops : {projectsItops}</span>
            <span className="text-slate-600">·</span>
            <span>Archivés : {projectsArchived}</span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Titre</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Locale</th>
                <th className="px-4 py-3">Track</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3">Créé le</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-slate-500">
                    Aucun projet trouvé.
                  </td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-200 max-w-[200px] truncate">
                      {p.title}
                    </td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">
                      {p.slug}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        label={p.locale}
                        color="bg-slate-500/15 text-slate-400"
                      />
                    </td>
                    <td className="px-4 py-3">
                      {p.track && (
                        <Badge label={p.track} color={trackBadge(p.track)} />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge label={p.status} color={statusBadge(p.status)} />
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {p.featured ? "⭐" : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {fmtDate(p.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Section : Messages de contact ─────────────────────────────────────── */}
      <section>
        <h2 className="mb-4 text-base font-semibold text-slate-200">
          Messages de contact (20 derniers)
        </h2>

        {messages.length === 0 ? (
          <p className="text-sm text-slate-500">Aucun message reçu.</p>
        ) : (
          <div className="space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                {/* En-tête */}
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-medium text-slate-100">{m.name}</span>
                  <span className="text-slate-500">—</span>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-cyan-400 hover:underline text-xs"
                  >
                    {m.email}
                  </a>
                  {m.topic && (
                    <Badge label={m.topic} color={topicBadge(m.topic)} />
                  )}
                  {m.locale && (
                    <Badge
                      label={m.locale.toUpperCase()}
                      color="bg-slate-500/15 text-slate-400"
                    />
                  )}
                  <span className="ml-auto text-xs text-slate-500">
                    {fmtDate(m.created_at)}
                  </span>
                </div>

                {/* Sujet */}
                {m.subject && (
                  <p className="mt-2 text-xs font-medium text-slate-400">
                    Sujet : {m.subject}
                  </p>
                )}

                {/* Message */}
                <p className="mt-2 text-sm text-slate-300 leading-relaxed line-clamp-4">
                  {m.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Section : Certifications ──────────────────────────────────────────── */}
      <section>
        <h2 className="mb-4 text-base font-semibold text-slate-200">
          Certifications ({certifications.length})
        </h2>

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
                  <td colSpan={3} className="px-4 py-6 text-center text-slate-500">
                    Aucune certification trouvée.
                  </td>
                </tr>
              ) : (
                certifications.map((c) => (
                  <tr key={c.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-200">{c.name}</td>
                    <td className="px-4 py-3 text-slate-400">{c.issuer ?? "—"}</td>
                    <td className="px-4 py-3">
                      <Badge
                        label={c.locale}
                        color="bg-slate-500/15 text-slate-400"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Section : Témoignages ─────────────────────────────────────────────── */}
      <section>
        <h2 className="mb-4 text-base font-semibold text-slate-200">
          Témoignages ({testimonials.length})
        </h2>
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="text-slate-400">
              Publiés : <strong className="text-slate-200">{testimonialsPublished}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="text-slate-400">
              Masqués : <strong className="text-slate-200">{testimonialsDraft}</strong>
            </span>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Gérer les témoignages directement depuis le dashboard Supabase (is_published).
        </p>
      </section>

    </div>
  );
}
