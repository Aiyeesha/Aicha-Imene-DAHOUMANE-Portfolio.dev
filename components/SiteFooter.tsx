// components/SiteFooter.tsx
// --------------------------
// Pied de page en 4 colonnes (Option C, brief §3.1) : Profil, Projets,
// Ressources, Légal.
//
// Pourquoi : la navigation principale est réduite à 6 entrées. Toutes les
// autres pages doivent rester accessibles — ce pied de page en est le point
// d'accès garanti, en complément de la palette ⌘K. Chaque route publique du
// site y figure (y compris celles exclues du sitemap, comme /uses et /colophon).
//
// Server Component : textes lus dans messages/<locale>.json, liens internes en
// <Link> (navigation SPA), liens externes en nouvel onglet avec noopener.

import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { GITHUB_URL } from "@/lib/social";

type Locale = "en" | "fr" | "es";
type FooterLink = { href: string; label: string; external?: boolean };

const linkClass = "hover:underline underline-offset-4 hover:text-slate-900 dark:hover:text-white soft-ring rounded-sm";

export default async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tc = await getTranslations({ locale, namespace: "contact" });
  const p = (path: string) => `/${locale}${path}`;

  // Colonnes : l'ordre suit le parcours d'un recruteur (qui → preuves →
  // approfondir → informations légales).
  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: t("colProfile"),
      links: [
        { href: p("/about"), label: t("about") },
        { href: p("/hybride"), label: t("hybrid") },
        { href: p("/certifications"), label: t("certifications") },
        { href: p("/work-with-me"), label: t("workWithMe") },
        { href: p("/contact"), label: t("qualifyMission") },
      ],
    },
    {
      title: t("colProjects"),
      links: [
        { href: p("/projects"), label: t("allProjects") },
        { href: p("/projects?tab=security"), label: t("securityCluster") },
        ...(GITHUB_URL ? [{ href: GITHUB_URL, label: "GitHub", external: true }] : []),
      ],
    },
    {
      title: t("colResources"),
      links: [
        { href: p("/blog"), label: t("blog") },
        { href: p("/resources"), label: t("resources") },
        { href: p("/uses"), label: t("uses") },
        { href: p("/colophon"), label: t("colophon") },
        { href: p("/status"), label: t("status") },
      ],
    },
    {
      title: t("colLegal"),
      links: [
        { href: p("/legal"), label: t("legal") },
        { href: p("/privacy"), label: t("privacy") },
        { href: p("/accessibility"), label: t("accessibility") },
        { href: p("/security/acknowledgments"), label: t("acknowledgments") },
      ],
    },
  ];

  return (
    <footer className="border-t border-black/10 dark:border-white/10 py-10 mt-14">
      <div className="mx-auto max-w-6xl px-6 text-sm text-muted-2">
        <nav aria-label={t("nav")} className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{col.title}</h2>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${l.label} (${tc("opensInNewTab")})`}
                        className={linkClass}
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className={linkClass}>
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <p className="mt-10 border-t border-black/5 dark:border-white/10 pt-6">
          © 2025–{new Date().getFullYear()} Aïcha Imène DAHOUMANE — {t("builtWith")}
        </p>
      </div>
    </footer>
  );
}
