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

type Props = { params: Promise<{ locale: "en" | "fr" | "es" }> };

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
  // Comptes réels du cluster Sécurité — remplace les "16"/"39" figés dans les
  // traductions (voir audit 2026-08-12 : /projects affichait déjà 17/40).
  const securityProjectCount = supabaseProjects.filter((p: any) => p.is_security).length;
  const totalProjectCount = supabaseProjects.length;

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

      {/* VOUS RECRUTEZ POUR QUEL POSTE ? — point d'entrée recruteur (audit de
          contenu 2026-09-25, lot 2) : oriente vers le profil hybride ou bascule
          le track Salesforce / IT Ops, avec le CV correspondant. */}
      <RecruiterPaths />

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
          </>
        )}
      </section>

      {/* PONT SALESFORCE ⇄ INFRA — callout distinct juste avant les projets, pour que
          le seul projet réellement croisé (Légarant-AXG, badge-bridge) soit expliqué
          en clair avant que le visiteur ne tombe sur sa carte parmi d'autres.
          Dégradé cyan→violet repris de .badge-bridge (globals.css) pour le lien visuel. */}
      <section id="bridge" className="py-14">
        <Reveal>
          <div
            className="rounded-2xl border-transparent bg-gradient-to-r from-cyan-500/10 to-violet-500/10 dark:from-cyan-400/10 dark:to-violet-400/10 p-6 md:p-8"
            style={{ borderImage: "linear-gradient(to right, rgb(34 211 238 / 0.4), rgb(167 139 250 / 0.4)) 1", borderWidth: "1px", borderStyle: "solid" }}
          >
            <h2 className="text-2xl font-semibold">{t("sections.bridge_title")}</h2>
            <p className="mt-4 text-muted leading-[1.8]">{t("sections.bridge_body")}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/projects/legarant-axg-salesforce-deployment`}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
              >
                {t("sections.bridge_cta")}
                <span aria-hidden="true"> →</span>
              </Link>
              <Link
                href={`/${locale}/projects/cicd-pipeline-setup`}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
              >
                {t("sections.bridge_cta2")}
                <span aria-hidden="true"> →</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CLUSTER SÉCURITÉ — même logique que la section bridge ci-dessus : le
          sous-cluster le plus dense du portfolio (16/39 projets, STRIDE, CVSS,
          machine à états SLA, sync NVD réelle) était invisible hors du 5e onglet
          de /projects. Ambre repris de .badge-security pour le lien visuel. */}
      <section id="security-cluster" className="py-14">
        <Reveal>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] dark:bg-amber-400/[0.06] p-6 md:p-8">
            <h2 className="text-2xl font-semibold">{t("sections.security_title", { count: securityProjectCount })}</h2>
            <p className="mt-4 text-muted leading-[1.8]">{t("sections.security_body", { count: securityProjectCount, total: totalProjectCount })}</p>
            <div className="mt-5">
              <Link
                href={`/${locale}/projects?tab=security`}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
              >
                {t("sections.security_cta")}
                <span aria-hidden="true"> →</span>
              </Link>
            </div>
          </div>
        </Reveal>
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
              aria-label={locale === "fr" ? "Voir tous les projets" : locale === "es" ? "Ver todos los proyectos" : "View all projects"}
            >
              {locale === "fr" ? "Voir tous les projets →" : locale === "es" ? "Ver todos los proyectos →" : "View all projects →"}
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
