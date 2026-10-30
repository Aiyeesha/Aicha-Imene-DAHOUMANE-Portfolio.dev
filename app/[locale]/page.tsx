// page.tsx — home page (one-page landing)
// ---------------------------------------
// Each section is an independent component.

import { rssAlternates } from "@/lib/seo";
import dynamic from "next/dynamic";
import TrackAwareHero from "./track-aware-hero";
import Reveal from "@/components/Reveal";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SkeletonCard from "@/components/SkeletonCard";
// Above the fold: loaded immediately
import TrackAwareSkills from "@/components/TrackAwareSkills";
import RecruiterPaths from "@/components/RecruiterPaths";
// Below the fold: lazy-loaded to reduce initial JS.
//
// TrackAwareServices goes through TrackAwareServicesLoader because
// dynamic(..., { ssr: false }) is not allowed in a server component.
// ssr: false is deliberate: with server rendering, the dynamic() + Reveal
// chain sometimes left an unreconciled server DOM (missing icons and
// "operational maturity" block, track cookie ignored) until something forced
// a re-render.
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
import { toFeaturedProjectCards } from "@/lib/data/featuredProjects";

type Props = { params: Promise<{ locale: "en" | "fr" | "es" }> };

// ── Home metadata ───────────────────────────────────────────────────────────
// Defined on the page, not the layout, so the 404 page and pages without
// their own metadata do not inherit this canonical and description.
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "fr" ? "fr" : rawLocale === "es" ? "es" : "en";
  const t = await getTranslations({ locale: locale });

  // Read the track cookie so a link shared by a returning IT Ops visitor gets
  // an IT Ops title and description in its preview. First-time visitors (no
  // cookie) get the generic title.
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
          // Absolute URL: some OG crawlers (LinkedIn, Slack, WhatsApp) ignore
          // metadataBase and fail on relative URLs.
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


// Hourly ISR. Currently no effect on the Vercel CDN: app/layout.tsx reads
// headers(), which makes the route dynamic (Cache-Control: no-store). Kept for
// when HTML caching moves to a reverse proxy.
export const revalidate = 3600;

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const experienceItems = getExperienceItems(locale);
  const featuredProjects = toFeaturedProjectCards(await getPublishedProjectsWithAssetsCached(locale));


  return (
    <>
      {/* Hash scrolling (#anchor) is handled once, by Navbar (lib/anchorScroll.ts). */}

      {/* HERO: photo, title, badges, two CTAs. TrackAwareHero is a client
          component (the track comes from a cookie read on the client), so
          BAILOUT_TO_CLIENT_SIDE_RENDERING in the streamed HTML is expected.
          min-h prevents a height collapse during the entrance animation. */}
      <section id="hero" className="py-8 md:py-10 min-h-[320px] sm:min-h-[400px]">
        <div className="pt-4 md:pt-6">
          <TrackAwareHero />
        </div>

        {/* Subtle separator */}
        <div className="mt-12">
          <div className="h-px w-full bg-black/10 dark:bg-white/10" />
        </div>
      </section>

      {/* PROJECTS: right below the hero, as the first evidence a recruiter
          looks for. section-stripe (alternate background). */}
      <section id="projects" className="section-stripe py-14">
        <div>
          <Reveal>
            <h2 className="text-xl font-semibold">{t("projects.featured")}</h2>
          </Reveal>
          <div className="mt-5">
            <FeaturedProjects projects={featuredProjects} />
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

      {/* WHAT ROLE ARE YOU HIRING FOR? Recruiter entry point: hybrid profile
          or Salesforce / IT Ops track, with the matching CV. */}
      <RecruiterPaths />

      {/* SALESFORCE ⇄ INFRA BRIDGE: the most direct evidence of the hybrid
          profile, placed early. Explains the one truly cross-domain project
          (Legarant-AXG, badge-bridge), with MediCare Solutions' public workflow
          as second evidence. Cyan→violet gradient as in .badge-bridge. */}
      <section id="bridge" className="py-14">
        <Reveal>
          <div
            className="rounded-2xl border-transparent bg-linear-to-r from-cyan-500/10 to-violet-500/10 dark:from-cyan-400/10 dark:to-violet-400/10 p-6 md:p-8"
            style={{ borderImage: "linear-gradient(to right, rgb(34 211 238 / 0.4), rgb(167 139 250 / 0.4)) 1", borderWidth: "1px", borderStyle: "solid" }}
          >
            <h2 className="text-2xl font-semibold">{t("sections.bridge_title")}</h2>
            {/* Three bullets, readable in a few seconds. */}
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
              {/* Second evidence: a public, verifiable artefact (MediCare
                  Solutions' GitHub Actions workflow), hence an external link. */}
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

      {/* SKILLS — section-stripe */}
      <section id="skills" className="section-stripe py-14">
        <Reveal>
          <h2 className="text-3xl font-semibold">{t("sections.skills_title")}</h2>
        </Reveal>
        <Reveal delayMs={70}>
          <p className="mt-3 text-muted">{t("sections.skills_subtitle")}</p>
        </Reveal>

        <TrackAwareSkills locale={locale} />
      </section>

      {/* EXPERIENCE — default background */}
      <section id="experience" className="py-14">
        <Reveal>
          <h2 className="text-3xl font-semibold">{t("sections.experience_title")}</h2>
        </Reveal>
        {/* Always-expanded timeline, full width. */}
        <div className="mt-8">
          <Reveal delayMs={110}>
            <ExperienceTimeline items={experienceItems} />
          </Reveal>
        </div>

        {/* Link to the Certifications page */}
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

      {/* SERVICES — section-stripe */}
      <section id="services" className="section-stripe py-14">
        <Reveal>
          <h2 className="text-3xl font-semibold">{t("sections.services_title")}</h2>
        </Reveal>
        <Reveal delayMs={70}>
          <p className="mt-3 text-muted">{t("sections.services_subtitle")}</p>
        </Reveal>
        <TrackAwareServices locale={locale} />
        {/* The FAQ lives on /work-with-me, with its FAQPage JSON-LD. */}
      </section>

      {/* TESTIMONIALS / COMPANY LOGOS — default background.
          NEXT_PUBLIC_SHOW_TESTIMONIALS=true shows real testimonials; otherwise
          the "They trusted me" logo strip (no placeholders). */}
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
            {/* Animated key metrics */}
            <GlobalMetrics />
          </>
        )}
      </section>

      {/* BLOG — section-stripe */}
      <section id="blog" className="section-stripe py-14">
        <Reveal>
          <h2 className="text-3xl font-semibold">{t("sections.blog_title")}</h2>
        </Reveal>
        <Reveal delayMs={70}>
          <p className="mt-3 text-muted">{t("sections.blog_subtitle")}</p>
        </Reveal>
        <div className="mt-8">
          {/* No track: the latest posts across tracks (a per-track choice
              would block SSR). */}
          <LatestPosts locale={locale} />
        </div>
      </section>

      {/* CONTACT — default background */}
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
        {/* Testimonial invitation links are generated with
            POST /api/admin/testimonial-invite (signed, time-limited). */}
      </section>
    </>
  );
}
