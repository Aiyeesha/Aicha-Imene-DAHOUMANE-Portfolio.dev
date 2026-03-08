// page.tsx — Page d'accueil (one-page landing)
// ---------------------------------------------
// Architecture : chaque section est un composant indépendant.
// ProfileNarrative et ProfileFactsCard ont été déplacés vers la page About
// pour alléger le hero et améliorer la lisibilité.

import dynamic from "next/dynamic";
import TrackAwareHero from "./track-aware-hero";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
// Above-the-fold — chargés immédiatement
import TrackAwareSkills from "@/components/TrackAwareSkills";
// Below-the-fold — lazy-loadés pour réduire le JS initial
const TrackAwareServices = dynamic(() => import("@/components/TrackAwareServices"));
const ServicesFaq        = dynamic(() => import("@/components/ServicesFaq"));
const TrustedBy          = dynamic(() => import("@/components/TrustedBy"));
const GlobalMetrics      = dynamic(() => import("@/components/GlobalMetrics"));
const FeaturedProjects   = dynamic(() => import("@/components/FeaturedProjects"));
const ProjectsSection    = dynamic(() => import("@/components/ProjectsSection"));
const LatestPosts        = dynamic(() => import("@/components/LatestPosts"));
const ContactForm        = dynamic(() => import("@/components/ContactForm"));
import { getExperienceItems } from "@/content/experience";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getPublishedProjectsWithAssetsCached } from "@/lib/data/projects.cached";
import { cookies } from "next/headers";

type Props = { params: Promise<{ locale: "en" | "fr" }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const experienceItems = getExperienceItems(locale);
  const supabaseProjects = await getPublishedProjectsWithAssetsCached(locale);

  // Lecture du track actif depuis le cookie (même logique que le layout)
  const cookieStore = await cookies();
  const rawTrack = cookieStore.get("track")?.value;
  const activeTrack: "salesforce" | "itops" =
    rawTrack === "itops" ? "itops" : "salesforce";

  return (
    <>
      {/* HERO — simplifié (photo + titre + badges + 2 CTAs)
          ProfileNarrative et ProfileFactsCard ont été déplacés vers /about
          pour que le hero tienne en un seul écran sur desktop 1440px et mobile 375px. */}
      <section className="py-8 md:py-10">
        <div className="pt-4 md:pt-6">
          <TrackAwareHero />
        </div>

        {/* Séparateur visuel discret */}
        <div className="mt-12">
          <div className="h-px w-full bg-black/10 dark:bg-white/10" />
        </div>
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
        <Reveal delayMs={70}>
          <p className="mt-3 text-muted">{t("sections.experience_subtitle")}</p>
        </Reveal>
        {/* Accordéon expérience — pleine largeur.
            Les certifications ont été déplacées vers /certifications (page dédiée). */}
        <div className="mt-8">
          <Reveal delayMs={110}>
            <Accordion items={experienceItems} defaultOpenId="exp-1" />
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
        <ServicesFaq />
      </section>

      {/* TÉMOIGNAGES / LOGOS ENTREPRISES — fond par défaut
          Feature flag : NEXT_PUBLIC_SHOW_TESTIMONIALS=true pour activer les témoignages réels.
          Par défaut : section "Ils m'ont fait confiance" (logos uniquement, aucun placeholder). */}
      <section id="testimonials" className="py-14">
        {process.env.NEXT_PUBLIC_SHOW_TESTIMONIALS === "true" ? (
          <>
            <Reveal>
              <h2 className="text-3xl font-semibold">{t("sections.testimonials_title")}</h2>
            </Reveal>
            <Reveal delayMs={70}>
              <p className="mt-3 text-muted">{t("sections.testimonials_subtitle")}</p>
            </Reveal>
            <div className="mt-8">
              {/* Testimonials sera réactivé quand is_published=true dans Supabase */}
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

      {/* PROJETS — section-stripe (fond alterné) */}
      <section id="projects" className="section-stripe py-14">
        <Reveal>
          <h2 className="text-3xl font-semibold">{t("sections.projects_title")}</h2>
        </Reveal>
        <Reveal delayMs={70}>
          <p className="mt-3 text-muted">{t("sections.projects_subtitle")}</p>
        </Reveal>
        <div className="mt-8">
          <Reveal>
            <h3 className="text-xl font-semibold">{t("projects.featured")}</h3>
          </Reveal>
          <Reveal delayMs={60}>
            <p className="mt-2 text-sm text-muted">{t("projects.featuredSubtitle")}</p>
          </Reveal>
          <div className="mt-5">
            <FeaturedProjects projects={supabaseProjects} />
          </div>
          <div className="mt-10">
            <ProjectsSection locale={locale} projects={supabaseProjects} />
          </div>
        </div>
      </section>

      {/* BLOG — fond par défaut */}
      <section id="blog" className="py-14">
        <Reveal>
          <h2 className="text-3xl font-semibold">{t("sections.blog_title")}</h2>
        </Reveal>
        <Reveal delayMs={70}>
          <p className="mt-3 text-muted">{t("sections.blog_subtitle")}</p>
        </Reveal>
        <div className="mt-8">
          <LatestPosts locale={locale} track={activeTrack} />
        </div>
        <div className="mt-6">
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
            href={`/${locale}/blog`}
          >
            {t("blogIndex.ctaAllPosts")} →
          </Link>
        </div>
      </section>

      {/* CONTACT — section-stripe (fond alterné) */}
      <section id="contact" className="section-stripe py-14">
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
      </section>
    </>
  );
}
