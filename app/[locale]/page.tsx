// page.tsx — Page d'accueil (one-page landing)
// ---------------------------------------------
// Architecture : chaque section est un composant indépendant.
// ProfileNarrative et ProfileFactsCard ont été déplacés vers la page About
// pour alléger le hero et améliorer la lisibilité.

import dynamic from "next/dynamic";
import TrackAwareHero from "./track-aware-hero";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import SkeletonCard from "@/components/SkeletonCard";
// Above-the-fold — chargés immédiatement
import TrackAwareSkills from "@/components/TrackAwareSkills";
// Below-the-fold — lazy-loadés pour réduire le JS initial
const TrackAwareServices = dynamic(() => import("@/components/TrackAwareServices"), {
  loading: () => <div className="mt-8 grid gap-4 md:grid-cols-2"><SkeletonCard /><SkeletonCard /></div>,
});
const ServicesFaq        = dynamic(() => import("@/components/ServicesFaq"));
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
import ScrollToHash from "@/components/ScrollToHash";
import { getExperienceItems } from "@/content/experience";
import { testimonials } from "@/content/testimonials";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getPublishedProjectsWithAssetsCached } from "@/lib/data/projects.cached";
import { jsonLdStringify } from "@/lib/security/jsonLdSafe";

type Props = { params: Promise<{ locale: "en" | "fr" }> };

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

  // FAQPage JSON-LD — généré côté serveur depuis les traductions i18n (même source que ServicesFaq).
  // Pattern identique à app/[locale]/blog/[slug]/page.tsx:138-181.
  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const faqItems = tFaq.raw("items") as { q: string; a: string }[];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      {/* FAQPage JSON-LD — potentiel rich result FAQ dans les SERP Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdStringify(faqJsonLd) }}
      />
      {/* Scroll vers ancre (#hash) sur navigation SPA inter-pages */}
      <ScrollToHash />

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
            {/* Indicateur témoignages en cours — visible tant que SHOW_TESTIMONIALS=false */}
            <Reveal delayMs={80}>
              <p className="mt-8 text-center text-xs text-muted-2">
                {locale === "fr"
                  ? "Témoignages clients en cours de collecte — disponibles prochainement"
                  : "Client testimonials in progress — coming soon"}
              </p>
            </Reveal>
          </>
        )}
      </section>

      {/* PROJETS — section-stripe (fond alterné) */}
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
              aria-label={locale === "fr" ? "Voir tous les projets" : "View all projects"}
            >
              {locale === "fr" ? "Voir tous les projets →" : "View all projects →"}
            </Link>
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
          {/* track omis — LatestPosts affiche les 2 derniers posts (tous tracks).
              La personnalisation par track était bloquante pour le SSR. */}
          <LatestPosts locale={locale} />
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
        {/* T1 — lien d'invitation témoignage retiré du HTML public.
             Utiliser POST /api/admin/testimonial-invite (Bearer ADMIN_PASSWORD)
             pour générer un lien HMAC signé à durée limitée. */}
      </section>
    </>
  );
}
