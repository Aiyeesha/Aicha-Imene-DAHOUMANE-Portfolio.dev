// certifications/page.tsx
// -----------------------
// Page dédiée "Certifications & Diplômes" — layout premium en 3 sections :
//   1. Obtenu (✓ vert)  — diplômes RNCP + Linguaskill
//   2. Actif   (↻ cyan) — Trailhead Ranger
//   3. En préparation (◎ ambre) — Salesforce Admin, PDI, ISC2 CC
//
// Source : content/certifications.ts (données statiques fiables) +
//          lib/data/certifications.cached.ts (Supabase, complément futur).
// Si Supabase retourne des données supplémentaires elles s'ajoutent à la section "Obtenu".

import { trailheadProfile } from "@/content/certifications";
import AnimatedCounter from "@/components/AnimatedCounter";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    title: isFr
      ? "Certifications & Diplômes — Aïcha Imène DAHOUMANE"
      : "Certifications & Diplomas — Aïcha Imène DAHOUMANE",
    description: isFr
      ? "Diplômes (RNCP 4/5/6), certifications actives (Trailhead Ranger) et certifications en préparation (Salesforce Admin, Platform Developer I, ISC2 CC)."
      : "Degrees (RNCP 4/5/6), active certifications (Trailhead Ranger) and upcoming certifications (CompTIA A+, Salesforce Admin, Platform Developer I, ISC2 CC).",
    alternates: {
      canonical: `${siteUrl}/${locale}/certifications`,
      languages: {
        en: `${siteUrl}/en/certifications`,
        fr: `${siteUrl}/fr/certifications`,
      }
    },
  };
}

// ── Helpers — badges de statut ─────────────────────────────────────────────────

type StatusBadgeProps = {
  status: "completed" | "active" | "upcoming";
  locale: string;
};

function StatusBadge({ status, locale }: StatusBadgeProps) {
  const isFr = locale === "fr";

  // Couleurs et libellés par statut
  const config = {
    completed: {
      label: isFr ? "✓ Obtenu" : "✓ Completed",
      className:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
    },
    active: {
      label: isFr ? "↻ Actif" : "↻ Active",
      className:
        "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800",
    },
    upcoming: {
      label: isFr ? "◎ En préparation" : "◎ In preparation",
      className:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
    },
  };

  const { label, className } = config[status];

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}

// ── Composant — Icône certification (logo si disponible, sinon badge initiales) ──

function CertIcon({
  initials, color, logoUrl
}: { initials: string; color: string; logoUrl?: string }) {
  if (logoUrl) {
    return (
      <div
        aria-hidden="true"
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-white/5 p-2"
      >
        <Image
          src={logoUrl}
          alt=""
          width={48}
          height={48}
          className="h-10 w-10 object-contain"
          loading="lazy"
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-base font-bold text-white ${color}`}
    >
      {initials}
    </div>
  );
}

// ── Page principale ────────────────────────────────────────────────────────────

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CertificationsPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale = locale === "fr" ? "fr" : "en";
  const isFr = safeLocale === "fr";

  // Note : la page utilise uniquement les données statiques (bilingues et complètes).
  // L'intégration Supabase sera activée ultérieurement quand les IDs et
  // les traductions FR seront alignés dans la base de données.

  // ── Contenu i18n statique ─────────────────────────────────────────────────

  const labels = {
    sectionCompleted: isFr ? "Obtenu" : "Completed",
    sectionCompletedSub: isFr ? "Diplômes et certificats" : "Degrees & certificates",
    sectionActive: isFr ? "Actif" : "Active",
    sectionActiveSub: isFr ? "Progression continue" : "Continuous learning",
    sectionUpcoming: isFr ? "En préparation" : "In preparation",
    sectionUpcomingSub: isFr ? "Objectifs 2026" : "2026 Goals",
    trailheadBadges: isFr ? "badges" : "badges",
    trailheadPoints: isFr ? "points" : "points",
    trailheadTrails: isFr ? "parcours" : "trails",
    trailheadProfile: isFr ? "Voir le profil Trailhead" : "View Trailhead profile",
    trailheadHint: isFr
      ? "Classement Trailhead : Ranger — vérifiable en ligne"
      : "Trailhead rank: Ranger — verifiable online",
    activelyPreparing: isFr ? "Préparation active" : "Actively preparing",
    backHome: isFr ? "Retour à l'accueil" : "Back to home",
    credentialLink: isFr ? "Voir le justificatif" : "View credential",
    breadcrumbHome: isFr ? "Accueil" : "Home",
    breadcrumbCerts: "Certifications",
    intro: isFr
      ? "Diplômes RNCP obtenus, certifications actives et certifications en cours de préparation."
      : "Earned RNCP degrees, active certifications, and certifications currently in preparation.",
  };

  // ── Données certifications complétées ─────────────────────────────────────
  // Libellés traduits pour les certifications statiques

  const completedCerts = [
    {
      id: "dev-concepteur-logiciel-openclassrooms",
      name: isFr
        ? "Développeur Concepteur Logiciel"
        : "Développeur Concepteur Logiciel",
      issuer: "OpenClassrooms",
      earnedDate: isFr ? "Oct. 2025" : "Oct 2025",
      level: isFr ? "Titre RNCP niveau 6 (Bac+3/4)" : "RNCP Level 6 (Bac+3/4 equivalent)",
      description: isFr
        ? "Titre professionnel en conception et développement logiciel avec spécialisation Salesforce : Apex, Flows, modélisation des données, CI/CD (Salesforce CLI, GitHub Actions), LWC, sécurité et permission sets."
        : "Professional title in software design & development. Salesforce specialization: Apex, Flows, data modeling, CI/CD with Salesforce CLI and GitHub Actions, LWC, security, and permission sets.",
      skills: ["Apex", "Salesforce Flows", "LWC", "Data Modeling", "CI/CD", "GitHub Actions", "Salesforce CLI", "API Integration", "Security & Permissions", "Automated Testing"],
      credentialUrl: undefined,
      initials: "DCL",
      color: "bg-indigo-700",
      logoUrl: "/companies/openclassrooms.svg",
    },
    {
      id: "tssr-greta-valdoise",
      name: isFr
        ? "Technicienne Supérieure Systèmes & Réseaux"
        : "Higher Technician in Systems & Networks",
      issuer: "GRETA du Val d'Oise",
      earnedDate: isFr ? "Juin 2023" : "Jun 2023",
      level: isFr ? "Titre RNCP niveau 5 (Bac+2)" : "RNCP Level 5 (Bac+2)",
      description: isFr
        ? "Administration systèmes & réseaux. Stage chez Midrange Group : déploiement de 200+ postes via Windows Autopilot, Windows Server 2022 (AD DS, DNS, DHCP, GPO, WDS, PXE), PfSense/Squid, Acronis, Datto RMM."
        : "Systems & network administration. Internship at Midrange Group: deployment of 200+ workstations via Windows Autopilot, Windows Server 2022 (AD DS, DNS, DHCP, GPO, WDS, PXE), PfSense/Squid, Acronis, Datto RMM.",
      skills: ["Windows Server 2022", "Active Directory", "DNS / DHCP / WDS", "GPO", "PXE", "VMware Workstation 17", "PfSense", "Squid Proxy", "Acronis Cyber Protect", "Datto RMM", "Windows Autopilot"],
      credentialUrl: undefined,
      initials: "TSSR",
      color: "bg-blue-700",
      logoUrl: "/companies/greta.svg",
    },
    {
      id: "tai-greta-valdoise",
      name: isFr
        ? "Technicien(ne) d'Assistance Informatique"
        : "IT Support Technician",
      issuer: "GRETA du Val d'Oise — Lycée Louis Jouvet",
      earnedDate: isFr ? "Juil. 2022" : "Jul 2022",
      level: isFr ? "Titre RNCP niveau 4 (Bac)" : "RNCP Level 4 (Bac)",
      description: isFr
        ? "Support et assistance informatique. Formation au Lycée Louis Jouvet (Taverny). Installation Windows 10, virtualisation VirtualBox, configuration réseau TP-Link, profils itinérants Active Directory, diagnostic matériel."
        : "IT support and user assistance. Training at Lycée Louis Jouvet (Taverny). Windows 10 installation, VirtualBox virtualization, TP-Link network configuration, Active Directory roaming profiles, hardware diagnosis.",
      skills: ["Windows 10", "VirtualBox", "Active Directory", "Roaming Profiles", "WiFi Configuration", "Hardware Diagnosis", "User Support"],
      credentialUrl: undefined,
      initials: "TAI",
      color: "bg-violet-700",
      logoUrl: "/companies/greta.svg",
    },
    {
      id: "linguaskill-cambridge",
      name: "Linguaskill Business — C1+",
      issuer: "Cambridge Assessment English",
      earnedDate: isFr ? "Avr. 2021" : "Apr 2021",
      level: isFr ? "Score 180+ (C1+) écoute · 179 (B2) lecture" : "Score 180+ (C1+) listening · 179 (B2) reading",
      description: isFr
        ? "Certification anglais des affaires Cambridge. Score : 180+ (C1+) compréhension orale, 179 (B2) compréhension écrite. Délivré via Astrolabe Formation PFD."
        : "Cambridge Business English certification. Score: 180+ (C1+) listening, 179 (B2) reading. Issued via Astrolabe Formation PFD.",
      skills: ["Business English", "Listening Comprehension", "Reading Comprehension", "Professional Communication"],
      credentialUrl: "https://www.cambridge.org/linguaskill",
      initials: "C1+",
      color: "bg-rose-700", // rose-500 = 3.67:1 ✗ → rose-700 ≈ 7:1 ✓
      logoUrl: "/certifications/linguaskill.svg",
    },
  ];

  // Certifications en préparation
  const upcomingItems = [
    {
      id: "comptia-aplus",
      name: "CompTIA A+",
      issuer: "CompTIA",
      target: "2026",
      description: isFr
        ? "Certification fondamentale en support matériel et logiciel : installation, configuration, dépannage de postes de travail, OS, réseaux et sécurité."
        : "Foundational hardware and software support certification: installation, configuration, troubleshooting of workstations, OS, networking and security.",
      initials: "A+",
      color: "bg-red-600",
      logoUrl: "/certifications/comptia-security.svg",
    },
    {
      id: "sf-admin",
      name: "Salesforce Certified Administrator",
      issuer: "Salesforce",
      target: "2026",
      description: isFr
        ? "Administration Salesforce : configuration, automatisation, sécurité, rapports et tableaux de bord."
        : "Salesforce administration: configuration, automation, security, reports and dashboards.",
      initials: "ADM",
      color: "bg-sky-800", // sky-500 = 2.77:1 ✗ → sky-800 ≈ 9:1 ✓
      logoUrl: "/certifications/salesforce.svg",
    },
    {
      id: "sf-pdi",
      name: "Salesforce Platform Developer I",
      issuer: "Salesforce",
      target: "2026",
      description: isFr
        ? "Développement sur la plateforme Salesforce : Apex, SOQL, LWC, tests unitaires, déploiement."
        : "Development on the Salesforce platform: Apex, SOQL, LWC, unit testing, deployment.",
      initials: "PDI",
      color: "bg-sky-800", // sky-500 = 2.77:1 ✗ → sky-800 ≈ 9:1 ✓
      logoUrl: "/certifications/salesforce.svg",
    },
    {
      id: "isc2-cc",
      name: "ISC2 CC — Certified in Cybersecurity",
      issuer: "ISC²",
      target: "2026",
      description: isFr
        ? "Fondamentaux de la cybersécurité : principes de sécurité, contrôle d'accès, réponse aux incidents, cryptographie."
        : "Cybersecurity fundamentals: security principles, access control, incident response, cryptography.",
      initials: "CC",
      color: "bg-slate-500",
    },
  ];

  // ── JSON-LD — BreadcrumbList ──────────────────────────────────────────────
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: labels.breadcrumbHome, item: `${siteUrl}/${safeLocale}` },
      { "@type": "ListItem", position: 2, name: labels.breadcrumbCerts, item: `${siteUrl}/${safeLocale}/certifications` },
    ],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Données structurées — BreadcrumbList */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
      <nav
        aria-label={isFr ? "Fil d'Ariane" : "Breadcrumb"}
        className="mb-6 flex items-center gap-2 text-sm text-muted-2"
      >
        <Link href={`/${safeLocale}`} className="hover:underline soft-ring rounded px-1">
          {labels.breadcrumbHome}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-muted">{labels.breadcrumbCerts}</span>
      </nav>

      {/* ── En-tête ─────────────────────────────────────────────────────────── */}
      <h1 className="text-3xl font-semibold">
        {isFr ? "Certifications & Diplômes" : "Certifications & Diplomas"}
      </h1>
      <p className="mt-3 text-muted">{labels.intro}</p>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1 — Obtenu / Completed                                        */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="section-completed" className="mt-12">
        <div className="flex items-center gap-3">
          <h2 id="section-completed" className="text-xl font-semibold">
            {labels.sectionCompleted}
          </h2>
          <StatusBadge status="completed" locale={safeLocale} />
        </div>
        <p className="mt-1 text-sm text-muted">{labels.sectionCompletedSub}</p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {/* Certifications statiques */}
          {completedCerts.map((cert) => (
            <article
              key={cert.id}
              className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 transition-shadow hover:shadow-md dark:hover:shadow-none"
            >
              {/* En-tête de carte */}
              <div className="flex items-start gap-4">
                <CertIcon initials={cert.initials} color={cert.color} logoUrl={(cert as { logoUrl?: string }).logoUrl} />
                <div className="min-w-0">
                  <h3 className="text-base font-semibold leading-snug">{cert.name}</h3>
                  <p className="mt-0.5 text-sm text-muted">{cert.issuer}</p>
                  <p className="mt-0.5 text-xs text-muted-2">{cert.level}</p>
                  <p className="mt-0.5 text-xs text-muted-2">
                    {isFr ? "Obtenu :" : "Earned:"} {cert.earnedDate}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-muted leading-relaxed">{cert.description}</p>

              {/* Tags compétences */}
              {cert.skills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-2.5 py-0.5 text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Lien vérification */}
              {cert.credentialUrl && (
                <div className="mt-4">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm underline underline-offset-4 hover:opacity-80"
                  >
                    {labels.credentialLink}<span aria-hidden="true"> ↗</span>
                  </a>
                </div>
              )}
            </article>
          ))}

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2 — Actif / Active : Trailhead Ranger                         */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="section-active" className="mt-14">
        <div className="flex items-center gap-3">
          <h2 id="section-active" className="text-xl font-semibold">
            {labels.sectionActive}
          </h2>
          <StatusBadge status="active" locale={safeLocale} />
        </div>
        <p className="mt-1 text-sm text-muted">{labels.sectionActiveSub}</p>

        <div className="mt-6">
          <article className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 transition-shadow hover:shadow-md dark:hover:shadow-none">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">

              {/* Icône Trailhead stylisée */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-lg font-bold text-white">
                ☁
              </div>

              {/* Texte */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-base font-semibold">Trailhead Ranger</h3>
                </div>
                <p className="mt-0.5 text-sm text-muted">Salesforce Trailhead</p>
                <p className="mt-2 text-sm text-muted leading-relaxed">{labels.trailheadHint}</p>

                {/* Stats Trailhead */}
                <div className="mt-5 grid grid-cols-3 gap-4">
                  <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-center">
                    <p className="text-xl font-bold">
                      <AnimatedCounter value={trailheadProfile.badges} />
                    </p>
                    <p className="mt-0.5 text-xs text-muted">{labels.trailheadBadges}</p>
                  </div>
                  <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-center">
                    <p className="text-xl font-bold">
                      <AnimatedCounter value={trailheadProfile.points} />
                    </p>
                    <p className="mt-0.5 text-xs text-muted">{labels.trailheadPoints}</p>
                  </div>
                  <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-center">
                    <p className="text-xl font-bold">
                      <AnimatedCounter value={trailheadProfile.trails} />
                    </p>
                    <p className="mt-0.5 text-xs text-muted">{labels.trailheadTrails}</p>
                  </div>
                </div>

                {/* Lien profil */}
                <div className="mt-5">
                  <a
                    href={trailheadProfile.profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1.5 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
                  >
                    {labels.trailheadProfile}<span aria-hidden="true"> ↗</span>
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 3 — En préparation / In preparation                           */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="section-upcoming" className="mt-14">
        <div className="flex items-center gap-3">
          <h2 id="section-upcoming" className="text-xl font-semibold">
            {labels.sectionUpcoming}
          </h2>
          <StatusBadge status="upcoming" locale={safeLocale} />
        </div>
        <p className="mt-1 text-sm text-muted">{labels.sectionUpcomingSub}</p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingItems.map((cert) => (
            <article
              key={cert.id}
              className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 transition-shadow hover:shadow-md dark:hover:shadow-none"
            >
              {/* En-tête */}
              <div className="flex items-start gap-3">
                <CertIcon initials={cert.initials} color={cert.color} logoUrl={(cert as { logoUrl?: string }).logoUrl} />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold leading-snug">{cert.name}</h3>
                  <p className="mt-0.5 text-xs text-muted">{cert.issuer}</p>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-muted leading-relaxed">{cert.description}</p>

              {/* Statut */}
              <div className="mt-4 flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/30 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-300">
                  {labels.activelyPreparing}
                </span>
                <span className="text-xs text-muted-2">— {cert.target}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Bouton retour accueil ────────────────────────────────────────────── */}
      <div className="mt-14 border-t border-black/10 dark:border-white/10 pt-8">
        <Link
          href={`/${safeLocale}`}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
        >
          ← {labels.backHome}
        </Link>
      </div>
    </div>
  );
}
