// page.tsx — Page d'accueil (Option C : accueil « hybride »)
// ---------------------------------------------------------
// Principe directeur : l'accueil se lit en 2 minutes ; les pages secondaires
// (projets, blog, FAQ complète, certifications, profil hybride…) servent à qui
// veut creuser. Structure reprise de la preview « hybride », profondeur et
// fonctionnalités du site actuel conservées.
//
// Ordre des sections (brief §3.2) :
//   1. Hero                    — components/home/HomeSections.tsx
//   2. Sélecteur de profil     — components/RecruiterPaths.tsx (inchangé)
//   3. Profil                  — #about
//   4. Compétences en 4 couches — #skills
//   5. Pont Salesforce ⇄ infra — #bridge (version raccourcie)
//   6. Projets phares (5)      — #projects
//   7. Parcours                — #experience (frise existante)
//   8. Certifications          — #certifications
//   9. FAQ courte (4 questions) — #faq
//  10. Contact                 — #contact (formulaire sécurisé existant, inchangé)
//
// Retirés de l'accueil (toujours accessibles ailleurs) : logos, compteurs,
// services (→ /work-with-me), cluster sécurité (→ /projects?tab=security),
// aperçu du blog (→ /blog).

import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import RecruiterPaths from "@/components/RecruiterPaths";
import ScrollToHash from "@/components/ScrollToHash";
import {
  HomeHero,
  HomeProfile,
  HomeSkills,
  HomeBridge,
  HomeProjects,
  HomeCertifications,
  HomeFaq,
} from "@/components/home/HomeSections";
import { getExperienceItems } from "@/content/experience";
import { jsonLdStringify } from "@/lib/security/jsonLdSafe";
import { GITHUB_URL } from "@/lib/social";

// Formulaire de contact : chargé en lazy (sous la ligne de flottaison), logique
// anti-spam et limitation de débit inchangées (app/api/contact/route.ts).
const ContactForm = dynamic(() => import("@/components/ContactForm"));

type Props = { params: Promise<{ locale: "en" | "fr" | "es" }> };

// ISR — revalidation toutes les heures (voir l'historique de ce fichier : sans
// effet tant que app/layout.tsx appelle headers(), conservé pour la suite).
export const revalidate = 3600;

// Mêmes 4 questions que la FAQ courte affichée (HomeFaq) : le JSON-LD doit
// décrire le contenu réellement visible sur la page.
const SHORT_FAQ_INDEXES = [0, 1, 3, 4];

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const tc = await getTranslations({ locale, namespace: "contact" });
  const experienceItems = getExperienceItems(locale);

  // FAQPage JSON-LD — généré côté serveur à partir des mêmes traductions.
  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const allFaq = tFaq.raw("items") as { q: string; a: string }[];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SHORT_FAQ_INDEXES.map((i) => allFaq[i])
      .filter(Boolean)
      .map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdStringify(faqJsonLd) }}
      />
      {/* Scroll vers ancre (#hash) sur navigation SPA inter-pages */}
      <ScrollToHash />

      {/* 1. Hero */}
      <HomeHero locale={locale} />

      {/* 2. Sélecteur de profil — 3 cartes, chacune avec le CV de la locale. */}
      <RecruiterPaths />

      {/* 3 à 6. Profil, compétences, pont, projets phares */}
      <HomeProfile locale={locale} />
      <HomeSkills locale={locale} />
      <HomeBridge locale={locale} />
      <HomeProjects locale={locale} />

      {/* 7. Parcours — frise existante (content/experience.tsx), stage
          Midrange intitulé comme tel. */}
      <section id="experience" aria-labelledby="experience-title" className="py-14">
        <Reveal>
          <h2 id="experience-title" className="text-3xl font-semibold">{t("experience.title")}</h2>
        </Reveal>
        <div className="mt-8">
          <ExperienceTimeline items={experienceItems} />
        </div>
      </section>

      {/* 8 et 9. Certifications, FAQ courte */}
      <HomeCertifications locale={locale} />
      <HomeFaq locale={locale} />

      {/* 10. Contact — e-mail, LinkedIn, CV et réservation sont proposés par
          ContactForm ; le lien GitHub est ajouté ici. */}
      <section id="contact" aria-labelledby="contact-title" className="section-stripe py-14">
        <h2 id="contact-title" className="text-3xl font-semibold">{t("contact.title")}</h2>
        <p className="mt-3 text-muted">{t("contact.subtitle")}</p>
        {GITHUB_URL && (
          <p className="mt-3 text-sm">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub (${tc("opensInNewTab")})`}
              className="underline underline-offset-4 hover:text-cyan-700 dark:hover:text-cyan-300 soft-ring rounded"
            >
              GitHub · {GITHUB_URL.replace(/^https:\/\//, "").replace(/\/$/, "")}
            </a>
          </p>
        )}
        <div className="mt-6">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
