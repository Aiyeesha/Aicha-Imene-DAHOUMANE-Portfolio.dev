// page.tsx — Page d'accueil (one-page landing)
// ---------------------------------------------
// Architecture : chaque section est un composant indépendant.
// ProfileNarrative et ProfileFactsCard ont été déplacés vers la page About
// pour alléger le hero et améliorer la lisibilité.

import TrackAwareHero from "./track-aware-hero";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import FeaturedProjects from "@/components/FeaturedProjects";
import ProjectsSection from "@/components/ProjectsSection";
import ContactForm from "@/components/ContactForm";
import TrackAwareSkills from "@/components/TrackAwareSkills";
import TrackAwareServices from "@/components/TrackAwareServices";
import LatestPosts from "@/components/LatestPosts";
import TrustedBy from "@/components/TrustedBy";
import { getExperienceItems, getCertificationItems } from "@/content/experience";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getPublishedProjectsWithAssetsCached } from "@/lib/data/projects.cached";

type Props = { params: Promise<{ locale: "en" | "fr" }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const experienceItems = getExperienceItems(locale);
  const certificationItems = getCertificationItems(locale);
  const supabaseProjects = await getPublishedProjectsWithAssetsCached(locale);

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
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Reveal delayMs={110}>
            <div>
              <h3 className="text-xl font-semibold">{t("sections.roles_title")}</h3>
              <div className="mt-4">
                <Accordion items={experienceItems} defaultOpenId="exp-1" />
              </div>
            </div>
          </Reveal>
          <Reveal delayMs={170}>
            <div>
              <h3 className="text-xl font-semibold">{t("sections.certifications_title")}</h3>
              <div className="mt-4">
                <Accordion items={certificationItems} />
              </div>
            </div>
          </Reveal>
        </div>
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
          <TrustedBy />
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
          <LatestPosts locale={locale} />
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
