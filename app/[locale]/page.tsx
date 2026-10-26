// page.tsx — Page d'accueil (one-page landing)
// ---------------------------------------------
// Architecture : chaque section est un composant indépendant.
// ProfileNarrative et ProfileFactsCard ont été déplacés vers la page About
// pour alléger le hero et améliorer la lisibilité.

import { rssAlternates } from "@/lib/seo";
import dynamic from "next/dynamic";
import TrackAwareHero from "./track-aware-hero";
import Reveal from "@/components/Reveal";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SkeletonCard from "@/components/SkeletonCard";
// Above-the-fold — chargés immédiatement
import TrackAwareSkills from "@/components/TrackAwareSkills";
import RecruiterPaths from "@/components/RecruiterPaths";
// Below-the-fold — lazy-loadés pour réduire le JS initial
//
// TrackAwareServices : importé via TrackAwareServicesLoader plutôt qu'un
// dynamic() direct ici — ssr:false délibéré (audit 2026-08-16), mais
// `next/dynamic(..., { ssr: false })` n'est pas autorisé directement dans un
// Server Component, d'où le wrapper Client Component. Le composant a
// toujours son propre garde-fou `mounted` pour éviter un flash de mauvais
// contenu, mais avec ssr:true la chaîne dynamic() + Reveal produisait parfois
// un DOM serveur non réconcilié (icônes et bloc "Maturité d'exploitation"
// absents, cookie de track ignoré) qui restait figé tant qu'aucun re-render
// externe (ex: bascule du toggle) ne forçait React à rejouer l'hydratation.
// ssr:false supprime la source du mismatch : plus de HTML serveur à
// réconcilier pour ce sous-arbre, donc plus de tentative d'hydratation qui
// peut échouer silencieusement.
import TrackAwareServices from "@/components/TrackAwareServicesLoader";
const TrustedBy          = dynamic(() => import("@/components/TrustedBy"));
const GlobalMetrics      = dynamic(() => import("@/components/GlobalMetrics"));
const FeaturedProjects   = dynamic(() => import("@/components/FeaturedProjects"), {
  loading: () => <div className="mt-5 grid gap-4 md:grid-cols-2"><SkeletonCard /><SkeletonCard /></div>,
});
const LatestPosts        = dynamic(() => import("@/components/LatestPosts"), {
  loading: () => <div className="mt-8 grid gap-4 md:grid-cols-2"><SkeletonCard lines={2} /><SkeletonCard lines={2} /></div>,
});
const ContactForm        = dynamic(() => import("@/components/ContactForm"));
const Testimonials       = dynamic(() => import("@/components/Testimonials"));
import { getExperienceItems } from "@/content/experience";
import { testimonials } from "@/content/testimonials";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getSiteUrl } from "@/lib/siteUrl";
import Link from "next/link";
import { getPublishedProjectsWithAssetsCached } from "@/lib/data/projects.cached";

type Props = { params: Promise<{ locale: "en" | "fr" | "es" }> };

// ── Métadonnées de l'accueil ────────────────────────────────────────────────
// Déplacées depuis app/[locale]/layout.tsx — audit 2026-10-23 (SEO-2, SEO-3) :
// au niveau du layout, ce canonical vers /{locale} et cette description
// étaient hérités par la page 404 et par les pages qui n'en déclarent pas.
// Contenu inchangé.
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "fr" ? "fr" : rawLocale === "es" ? "es" : "en";
  const t = await getTranslations({ locale: locale });

  // Track a le même problème que le flash "Salesforce" résolu plus bas pour le
  // rendu de page (cookie posé par providers.tsx setTrack()) : sans lecture ici,
  // un lien partagé par un visiteur de retour en IT Ops affiche toujours un
  // <title>/description Salesforce dans l'aperçu (réseaux sociaux, onglet
  // navigateur), quel que soit le contenu réellement affiché — voir audit
  // 2026-08-13. Ne change rien pour un tout premier visiteur (pas de cookie) :
  // le titre générique reste le même qu'avant, pas de régression SEO.
  const trackCookie = (await cookies()).get("track")?.value;
  const isItops = trackCookie === "itops";

  const title = t(isItops ? "metadata.titleItops" : "metadata.title");
  const description = t(isItops ? "metadata.descriptionItops" : "metadata.description");

  const siteUrl = getSiteUrl();

  const canonical = `${siteUrl}/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl}/en`,
        fr: `${siteUrl}/fr`,
        es: `${siteUrl}/es`,
        "x-default": `${siteUrl}/en`,
      },
      ...rssAlternates(locale),
    },
    openGraph: {
      type: "website",
      url: canonical,
      locale: locale === "fr" ? "fr_FR" : locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US", "es_ES"] : locale === "es" ? ["en_US", "fr_FR"] : ["fr_FR", "es_ES"],
      title,
      description,
      siteName: "Aïcha Imène DAHOUMANE — Salesforce & IT Ops",
      images: [
        {
          // URL absolue requise : certains crawlers OG (LinkedIn, Slack, WhatsApp)
          // n'utilisent pas metadataBase et échouent sur les URLs relatives.
          url: `${siteUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/twitter-image`]
    }
  };
}


// ISR — revalidation toutes les heures.
// ⚠️ Ce paramètre est actuellement sans effet sur le cache CDN Vercel :
// app/layout.tsx appelle headers() (pour le nonce CSP et getLocale()),
// ce qui opt toute la route en rendu dynamique et force Cache-Control: no-store.
// L'ISR redevient opérationnel lorsque le cache sera géré par le reverse proxy
// homelab (Nginx/Caddy) indépendamment du Cache-Control applicatif.
// Conserver cette valeur : elle sera utile dès la migration homelab.
export const revalidate = 3600;

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const experienceItems = getExperienceItems(locale);
  const supabaseProjects = await getPublishedProjectsWithAssetsCached(locale);


  return (
    <>
      {/* Scroll vers ancre (#hash) : géré une seule fois par Navbar via
          lib/anchorScroll.ts (ScrollToHash supprimé, il faisait doublon). */}

      {/* HERO — simplifié (photo + titre + badges + 2 CTAs)
          ProfileNarrative et ProfileFactsCard ont été déplacés vers /about
          pour que le hero tienne en un seul écran sur desktop 1440px et mobile 375px.
          BAIL-OUT NOTE : TrackAwareHero est "use client" — il lit le cookie `track`
          via useTrack() (Providers) et s'anime avec Framer Motion. Ce composant
          client à la racine de la page fait apparaître BAILOUT_TO_CLIENT_SIDE_RENDERING
          dans le HTML streamé ; c'est intentionnel : le contenu du hero dépend d'un
          état cookie côté client (Salesforce / IT Ops) qui n'est pas disponible en SSR.
          Si TICKET-03 réactive l'ISR, cette section restera hydratée côté client. */}
      {/* min-h prevents height collapse during Framer Motion opacity:0 entrance */}
      <section id="hero" className="py-8 md:py-10 min-h-[320px] sm:min-h-[400px]">
        <div className="pt-4 md:pt-6">
          <TrackAwareHero />
        </div>

        {/* Séparateur visuel discret */}
        <div className="mt-12">
          <div className="h-px w-full bg-black/10 dark:bg-white/10" />
        </div>
      </section>

      {/* PROJETS — remontés juste sous le hero (2026-10-26) : les réalisations
          sont la première preuve qu'un recruteur cherche ; elles passaient
          après six sections. section-stripe (fond alterné). */}
      <section id="projects" className="section-stripe py-14">
        <div>
          <Reveal>
            <h2 className="text-xl font-semibold">{t("projects.featured")}</h2>
          </Reveal>
          <div className="mt-5">
            <FeaturedProjects projects={supabaseProjects} />
          </div>
          <div className="mt-6 flex justify-end">
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
              aria-label={locale === "fr" ? "Voir tous les projets" : locale === "es" ? "Ver todos los proyectos" : "View all projects"}
            >
              {locale === "fr" ? "Voir tous les projets →" : locale === "es" ? "Ver todos los proyectos →" : "View all projects →"}
            </Link>
          </div>
        </div>
      </section>

      {/* VOUS RECRUTEZ POUR QUEL POSTE ? — point d'entrée recruteur (audit de
          contenu 2026-09-25, lot 2) : oriente vers le profil hybride ou bascule
          le track Salesforce / IT Ops, avec le CV correspondant. */}
      <RecruiterPaths />

      {/* PONT SALESFORCE ⇄ INFRA — remonté juste sous « Vous recrutez pour quel
          poste ? » (audit 2026-10-01) : c'est la preuve la plus directe du profil
          hybride, elle doit être lue dans les 30 premières secondes et non après
          sept blocs. Le seul projet réellement croisé (Legarant-AXG, badge-bridge)
          y est expliqué en clair, avec en seconde preuve le workflow public de
          MediCare Solutions. Dégradé cyan→violet repris de .badge-bridge (globals.css). */}
      <section id="bridge" className="py-14">
        <Reveal>
          <div
            className="rounded-2xl border-transparent bg-linear-to-r from-cyan-500/10 to-violet-500/10 dark:from-cyan-400/10 dark:to-violet-400/10 p-6 md:p-8"
            style={{ borderImage: "linear-gradient(to right, rgb(34 211 238 / 0.4), rgb(167 139 250 / 0.4)) 1", borderWidth: "1px", borderStyle: "solid" }}
          >
            <h2 className="text-2xl font-semibold">{t("sections.bridge_title")}</h2>
            {/* Trois puces au lieu d'un paragraphe de ~1 900 caractères
                (2026-10-26) : lisible en quelques secondes. */}
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted leading-[1.8] marker:text-cyan-500 dark:marker:text-cyan-400">
              {(t.raw("sections.bridge_points") as string[]).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/projects/legarant-axg-salesforce-deployment`}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
              >
                {t("sections.bridge_cta")}
                <span aria-hidden="true"> →</span>
              </Link>
              {/* Seconde preuve : artefact public vérifiable (workflow GitHub
                  Actions de MediCare Solutions, projet en cours) plutôt qu'une
                  page descriptive — d'où un lien externe et non un <Link>. */}
              <a
                href="https://github.com/Aiyeesha/medicare-solutions/blob/main/.github/workflows/validate.yml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
              >
                {t("sections.bridge_cta2")}
                <span aria-hidden="true"> ↗</span>
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* COMPÉTENCES — section-stripe (fond alterné) */}
      <section id="skills" className="section-stripe py-14">
        <Reveal>
          <h2 className="text-3xl font-semibold">{t("sections.skills_title")}</h2>
        </Reveal>
        <Reveal delayMs={70}>
          <p className="mt-3 text-muted">{t("sections.skills_subtitle")}</p>
        </Reveal>

        <TrackAwareSkills locale={locale} />
      </section>

      {/* EXPÉRIENCE — fond par défaut */}
      <section id="experience" className="py-14">
        <Reveal>
          <h2 className="text-3xl font-semibold">{t("sections.experience_title")}</h2>
        </Reveal>
        {/* Frise chronologique toujours dépliée — pleine largeur.
            Les certifications ont été déplacées vers /certifications (page dédiée). */}
        <div className="mt-8">
          <Reveal delayMs={110}>
            <ExperienceTimeline items={experienceItems} />
          </Reveal>
        </div>

        {/* Lien vers la page Certifications dédiée */}
        <Reveal delayMs={150}>
          <div className="mt-8 flex items-center gap-4">
            <Link
              href={`/${locale}/certifications`}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
            >
              {t("sections.certifications_title")}
              <span aria-hidden="true"> ↗</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* SERVICES — section-stripe (fond alterné) */}
      <section id="services" className="section-stripe py-14">
        <Reveal>
          <h2 className="text-3xl font-semibold">{t("sections.services_title")}</h2>
        </Reveal>
        <Reveal delayMs={70}>
          <p className="mt-3 text-muted">{t("sections.services_subtitle")}</p>
        </Reveal>
        <TrackAwareServices locale={locale} />
        {/* FAQ déplacée vers /work-with-me (2026-10-26), avec son JSON-LD FAQPage. */}
      </section>

      {/* TÉMOIGNAGES / LOGOS ENTREPRISES — fond par défaut
          Feature flag : NEXT_PUBLIC_SHOW_TESTIMONIALS=true pour activer les témoignages réels.
          Par défaut : section "Ils m'ont fait confiance" (logos uniquement, aucun placeholder). */}
      <section id={process.env.NEXT_PUBLIC_SHOW_TESTIMONIALS === "true" ? "testimonials" : "trusted-by"} className="py-14">
        {process.env.NEXT_PUBLIC_SHOW_TESTIMONIALS === "true" ? (
          <>
            <Reveal>
              <h2 className="text-3xl font-semibold">{t("sections.testimonials_title")}</h2>
            </Reveal>
            <Reveal delayMs={70}>
              <p className="mt-3 text-muted">{t("sections.testimonials_subtitle")}</p>
            </Reveal>
            <div className="mt-8">
              <Testimonials items={testimonials} />
            </div>
          </>
        ) : (
          <>
            <TrustedBy />
            {/* Compteurs animés — métriques clés chiffrées (Apex, Flows, gain, projets) */}
            <GlobalMetrics />
          </>
        )}
      </section>

      {/* BLOG — section-stripe (fond alterné, inversé depuis le déplacement des projets) */}
      <section id="blog" className="section-stripe py-14">
        <Reveal>
          <h2 className="text-3xl font-semibold">{t("sections.blog_title")}</h2>
        </Reveal>
        <Reveal delayMs={70}>
          <p className="mt-3 text-muted">{t("sections.blog_subtitle")}</p>
        </Reveal>
        <div className="mt-8">
          {/* track omis — LatestPosts affiche les 2 derniers posts (tous tracks).
              La personnalisation par track était bloquante pour le SSR. */}
          <LatestPosts locale={locale} />
        </div>
      </section>

      {/* CONTACT — fond par défaut (alternance inversée depuis le déplacement des projets) */}
      <section id="contact" className="py-14">
        <Reveal>
          <h2 className="text-3xl font-semibold">{t("sections.contact_title")}</h2>
        </Reveal>
        <Reveal delayMs={70}>
          <p className="mt-3 text-muted">{t("sections.contact_subtitle")}</p>
        </Reveal>
        <div className="mt-6">
          <Reveal delayMs={110}>
            <ContactForm />
          </Reveal>
        </div>
        {/* T1 — lien d'invitation témoignage retiré du HTML public.
             Utiliser POST /api/admin/testimonial-invite (Bearer ADMIN_PASSWORD)
             pour générer un lien HMAC signé à durée limitée. */}
      </section>
    </>
  );
}
