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
import { getSiteUrl } from "@/lib/siteUrl";
import { jsonLdStringify } from "@/lib/security/jsonLdSafe";

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const siteUrl = getSiteUrl();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
  const title = isFr
    ? "Certifications & Diplômes — Aïcha Imène DAHOUMANE"
    : "Certifications & Diplomas — Aïcha Imène DAHOUMANE";
  const description = isFr
    ? "Diplômes (RNCP 4/5/6), certifications actives (Trailhead Expeditioner) et plan de 12 certifications Salesforce + CompTIA (juil. 2026 – juil. 2027)."
    : "Degrees (RNCP 4/5/6), active certifications (Trailhead Expeditioner) and a 12-certification roadmap across Salesforce + CompTIA (Jul 2026 – Jul 2027).";
  const urlPath = `${siteUrl}/${locale}/certifications`;
  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/certifications`,
        fr: `${siteUrl}/fr/certifications`,
        "x-default": `${siteUrl}/en/certifications`,
      }
    },
    openGraph: {
      title,
      description,
      url: urlPath,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      siteName,
      images: [{ url: `${siteUrl}/${locale}/certifications/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/${locale}/certifications/opengraph-image`],
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
    sectionUpcomingSub: isFr ? "Objectifs 2026–2027" : "2026–2027 Goals",
    trailheadBadges: isFr ? "badges" : "badges",
    trailheadPoints: isFr ? "points" : "points",
    trailheadTrails: isFr ? "parcours" : "trails",
    trailheadProfile: isFr ? "Voir le profil Trailhead" : "View Trailhead profile",
    trailheadHint: isFr
      ? "Classement Trailhead : Expeditioner — vérifiable en ligne · 10 badges pour atteindre Ranger"
      : "Trailhead rank: Expeditioner — verifiable online · 10 badges to reach Ranger",
    activelyPreparing: isFr ? "Préparation active" : "Actively preparing",
    backHome: isFr ? "Retour à l'accueil" : "Back to home",
    credentialLink: isFr ? "Voir le justificatif" : "View credential",
    diplomaLink: isFr ? "Voir le diplôme" : "View diploma",
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
      diplomaUrl: "/certifications/openclassrooms-dcl-diploma.pdf",
      initials: "DCL",
      color: "bg-indigo-700",
      logoUrl: "/certifications/dev-concepteur-badge.png",
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
      diplomaUrl: "/certifications/tssr-greta-diploma.pdf",
      initials: "TSSR",
      color: "bg-blue-700",
      logoUrl: "/certifications/systems-networks-badge.png",
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
      diplomaUrl: "/certifications/tai-greta-diploma.pdf",
      initials: "TAI",
      color: "bg-violet-700",
      logoUrl: "/certifications/tai-badge.png",
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
      diplomaUrl: "/certifications/Certification_LINGUASKILL_Page_1.png",
      initials: "C1+",
      color: "bg-rose-700",
      logoUrl: "/certifications/linguaskill-badge.png",
    },
  ];

  // Certifications en préparation — groupées par domaine
  type UpcomingItem = {
    id: string;
    name: string;
    issuer: string;
    target: string;
    description: string;
    initials: string;
    color: string;
    logoUrl?: string;
    track: "salesforce" | "comptia";
    isActive?: boolean;
  };

  const upcomingItems: UpcomingItem[] = [
    // ── Salesforce track (sprint Avr. → Juil. 2026) ──────────────────────────
    {
      id: "sf-platform-foundations",
      name: "Salesforce Platform Foundations",
      issuer: "Salesforce",
      target: isFr ? "Juil. 2026" : "Jul 2026",
      description: isFr
        ? "Fondamentaux de la plateforme Salesforce : navigation, objets standard, sécurité de base et automatisations simples."
        : "Salesforce platform fundamentals: navigation, standard objects, basic security and simple automations.",
      initials: "PF",
      color: "bg-sky-700",
      logoUrl: "/certifications/salesforce.svg",
      track: "salesforce",
      isActive: true,
    },
    {
      id: "sf-sales-foundations",
      name: "Salesforce Sales Foundations",
      issuer: "Salesforce",
      target: isFr ? "Juil. 2026" : "Jul 2026",
      description: isFr
        ? "Fondamentaux Sales Cloud : gestion des leads, opportunités, comptes, contacts et prévisions commerciales."
        : "Sales Cloud fundamentals: lead management, opportunities, accounts, contacts and sales forecasting.",
      initials: "SF",
      color: "bg-sky-700",
      logoUrl: "/certifications/salesforce.svg",
      track: "salesforce",
      isActive: true,
    },
    {
      id: "sf-platform-administrator",
      name: "Salesforce Platform Administrator",
      issuer: "Salesforce",
      target: isFr ? "Juil. 2026" : "Jul 2026",
      description: isFr
        ? "Administration avancée : configuration, sécurité, automatisations Flows, gestion des utilisateurs et maintenance org."
        : "Advanced administration: configuration, security, Flow automations, user management and org maintenance.",
      initials: "ADM",
      color: "bg-sky-800",
      logoUrl: "/certifications/salesforce.svg",
      track: "salesforce",
      isActive: false,
    },
    {
      id: "sf-platform-app-builder",
      name: "Salesforce Platform App Builder",
      issuer: "Salesforce",
      target: isFr ? "Août 2026" : "Aug 2026",
      description: isFr
        ? "Conception et déploiement d’applications personnalisées sur la plateforme Salesforce avec les outils low-code."
        : "Design and deployment of custom applications on the Salesforce platform using low-code tools.",
      initials: "PAB",
      color: "bg-sky-800",
      logoUrl: "/certifications/salesforce.svg",
      track: "salesforce",
    },
    {
      id: "sf-cpq-administrator",
      name: "Salesforce CPQ Administrator",
      issuer: "Salesforce",
      target: isFr ? "Sept. 2026" : "Sep 2026",
      description: isFr
        ? "Configuration Salesforce CPQ : catalogues produits, règles de prix, bundles et processus de devis complexes."
        : "Salesforce CPQ configuration: product catalogs, pricing rules, bundles and complex quoting processes.",
      initials: "CPQ",
      color: "bg-sky-800",
      logoUrl: "/certifications/salesforce.svg",
      track: "salesforce",
    },
    {
      id: "sf-marketing-cloud-admin",
      name: "Marketing Cloud Engagement Admin",
      issuer: "Salesforce",
      target: isFr ? "Oct. 2026" : "Oct 2026",
      description: isFr
        ? "Administration Marketing Cloud : Email Studio, Journey Builder, segmentation des abonnés et reporting."
        : "Marketing Cloud administration: Email Studio, Journey Builder, subscriber segmentation and reporting.",
      initials: "MCA",
      color: "bg-sky-800",
      logoUrl: "/certifications/salesforce.svg",
      track: "salesforce",
    },
    {
      id: "sf-platform-developer-i",
      name: "Salesforce Platform Developer I",
      issuer: "Salesforce",
      target: isFr ? "Nov. 2026" : "Nov 2026",
      description: isFr
        ? "Développement Salesforce : Apex, SOQL, Lightning Web Components, tests unitaires et bonnes pratiques."
        : "Salesforce development: Apex, SOQL, Lightning Web Components, unit testing and best practices.",
      initials: "PDI",
      color: "bg-sky-800",
      logoUrl: "/certifications/salesforce.svg",
      track: "salesforce",
    },
    // ── CompTIA track (sprint Oct. 2026 → Mai 2027) ──────────────────────────
    {
      id: "comptia-network-plus",
      name: "CompTIA Network+",
      issuer: "CompTIA",
      target: isFr ? "Jan. 2027" : "Jan 2027",
      description: isFr
        ? "Fondamentaux des réseaux : protocoles TCP/IP, infrastructure, sécurité réseau, dépannage et virtualisation."
        : "Networking fundamentals: TCP/IP protocols, infrastructure, network security, troubleshooting and virtualization.",
      initials: "N+",
      color: "bg-red-700",
      logoUrl: "/certifications/comptia-security.svg",
      track: "comptia",
    },
    {
      id: "comptia-security-plus",
      name: "CompTIA Security+",
      issuer: "CompTIA",
      target: isFr ? "Mars 2027" : "Mar 2027",
      description: isFr
        ? "Certification cybersécurité de référence : menaces, architecture de sécurité, gestion des identités et réponse aux incidents."
        : "Industry-standard cybersecurity cert: threats, security architecture, identity management and incident response.",
      initials: "S+",
      color: "bg-red-700",
      logoUrl: "/certifications/comptia-security.svg",
      track: "comptia",
    },
    {
      id: "comptia-linux-plus",
      name: "CompTIA Linux+",
      issuer: "CompTIA",
      target: isFr ? "Avr. 2027" : "Apr 2027",
      description: isFr
        ? "Administration Linux : ligne de commande, scripts shell, gestion des utilisateurs, sécurité et automatisation système."
        : "Linux administration: command line, shell scripting, user management, security and system automation.",
      initials: "L+",
      color: "bg-red-700",
      logoUrl: "/certifications/comptia-security.svg",
      track: "comptia",
    },
    {
      id: "comptia-cysa-plus",
      name: "CompTIA CySA+",
      issuer: "CompTIA",
      target: isFr ? "Juin 2027" : "Jun 2027",
      description: isFr
        ? "Analyse cybersécurité : threat intelligence, SIEM, analyse comportementale et gestion des vulnérabilités."
        : "Cybersecurity analysis: threat intelligence, SIEM, behavioral analysis and vulnerability management.",
      initials: "CSA+",
      color: "bg-red-700",
      logoUrl: "/certifications/comptia-security.svg",
      track: "comptia",
    },
    {
      id: "comptia-pentest-plus",
      name: "CompTIA PenTest+",
      issuer: "CompTIA",
      target: isFr ? "Juil. 2027" : "Jul 2027",
      description: isFr
        ? "Tests de pénétration : planification, reconnaissance, exploitation, post-exploitation et rapport de vulnérabilités."
        : "Penetration testing: planning, reconnaissance, exploitation, post-exploitation and vulnerability reporting.",
      initials: "PT+",
      color: "bg-red-700",
      logoUrl: "/certifications/comptia-security.svg",
      track: "comptia",
    },
  ];

  const salesforceCerts = upcomingItems.filter((c) => c.track === "salesforce");
  const comptaCerts = upcomingItems.filter((c) => c.track === "comptia");

  // ── JSON-LD — BreadcrumbList ──────────────────────────────────────────────
  const siteUrl = getSiteUrl();
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
        dangerouslySetInnerHTML={{ __html: jsonLdStringify(jsonLdBreadcrumb) }}
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
                  <h3 className="text-base font-semibold leading-snug text-slate-900 dark:text-white">{cert.name}</h3>
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

              {/* Liens diplôme + vérification */}
              {((cert as any).diplomaUrl || cert.credentialUrl) && (
                <div className="mt-4 flex flex-wrap gap-4">
                  {(cert as any).diplomaUrl && (
                    <a
                      href={(cert as any).diplomaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm underline underline-offset-4 hover:opacity-80"
                    >
                      {labels.diplomaLink}<span aria-hidden="true"> ↗</span>
                    </a>
                  )}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm underline underline-offset-4 hover:opacity-80"
                    >
                      {labels.credentialLink}<span aria-hidden="true"> ↗</span>
                    </a>
                  )}
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
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">Trailhead Expeditioner</h3>
                </div>
                <p className="mt-0.5 text-sm text-muted">Salesforce Trailhead</p>
                <p className="mt-2 text-sm text-muted leading-relaxed">{labels.trailheadHint}</p>

                {/* Stats Trailhead */}
                <div className="mt-5 grid grid-cols-3 gap-4">
                  <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-center">
                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                      <AnimatedCounter value={trailheadProfile.badges} />
                    </p>
                    <p className="mt-0.5 text-xs text-muted">{labels.trailheadBadges}</p>
                  </div>
                  <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-center">
                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                      <AnimatedCounter value={trailheadProfile.points} />
                    </p>
                    <p className="mt-0.5 text-xs text-muted">{labels.trailheadPoints}</p>
                  </div>
                  <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-center">
                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                      <AnimatedCounter value={trailheadProfile.trails} />
                    </p>
                    <p className="mt-0.5 text-xs text-muted">{labels.trailheadTrails}</p>
                  </div>
                </div>

                {/* Progression vers Ranger */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-2">
                      {isFr
                        ? `Progression vers Ranger — ${trailheadProfile.badges}/100 badges`
                        : `Progress to Ranger — ${trailheadProfile.badges}/100 badges`}
                    </span>
                    <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
                      {trailheadProfile.badges}%
                    </span>
                  </div>
                  <div
                    role="progressbar"
                    aria-valuenow={trailheadProfile.badges}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={isFr ? "Progression vers Ranger" : "Progress to Ranger"}
                    className="h-1.5 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden"
                  >
                    <div
                      className="h-full rounded-full bg-cyan-500"
                      style={{ width: `${trailheadProfile.badges}%` }}
                    />
                  </div>
                </div>

                {/* Lien profil */}
                <div className="mt-4">
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

        {/* ── Sous-groupe Salesforce ──────────────────────────────────────── */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Salesforce
            </span>
            <span className="text-xs text-muted-2">
              {isFr ? "— sprint Juil. → Nov. 2026" : "— sprint Jul. → Nov. 2026"}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {salesforceCerts.map((cert) => (
              <article
                key={cert.id}
                className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 transition-shadow hover:shadow-md dark:hover:shadow-none"
              >
                <div className="flex items-start gap-3">
                  <CertIcon initials={cert.initials} color={cert.color} logoUrl={cert.logoUrl} />
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold leading-snug text-slate-900 dark:text-white">{cert.name}</h3>
                    <p className="mt-0.5 text-xs text-muted">{cert.issuer}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted leading-relaxed">{cert.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  {cert.isActive ? (
                    <span className="inline-flex items-center rounded-full bg-cyan-100 dark:bg-cyan-900/30 px-2.5 py-0.5 text-xs font-medium text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                      {isFr ? "↻ En cours" : "↻ In progress"}
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/30 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-300">
                      {labels.activelyPreparing}
                    </span>
                  )}
                  <span className="text-xs text-muted-2">— {cert.target}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── Sous-groupe CompTIA ─────────────────────────────────────────── */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              CompTIA
            </span>
            <span className="text-xs text-muted-2">
              {isFr ? "— sprint Jan. 2027 → Juil. 2027" : "— sprint Jan. 2027 → Jul. 2027"}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {comptaCerts.map((cert) => (
              <article
                key={cert.id}
                className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 transition-shadow hover:shadow-md dark:hover:shadow-none"
              >
                <div className="flex items-start gap-3">
                  <CertIcon initials={cert.initials} color={cert.color} logoUrl={cert.logoUrl} />
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold leading-snug text-slate-900 dark:text-white">{cert.name}</h3>
                    <p className="mt-0.5 text-xs text-muted">{cert.issuer}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted leading-relaxed">{cert.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/30 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-300">
                    {labels.activelyPreparing}
                  </span>
                  <span className="text-xs text-muted-2">— {cert.target}</span>
                </div>
              </article>
            ))}
          </div>
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
