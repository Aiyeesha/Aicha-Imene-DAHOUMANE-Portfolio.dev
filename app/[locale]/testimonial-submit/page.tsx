// app/[locale]/testimonial-submit/page.tsx
// -----------------------------------------
// Page de soumission de témoignage professionnel.
// Accessible uniquement via lien privé : /[locale]/testimonial-submit?token=SECRET
//
// Sécurité :
//   - Le token est validé côté serveur (TESTIMONIAL_SUBMIT_TOKEN env var, jamais côté client)
//   - Si le token est absent ou incorrect → page d'erreur 403 (pas d'info sur le token attendu)
//   - noindex dans les métadonnées (ne doit pas apparaître dans les moteurs de recherche)
//
// Utilisation :
//   1. Définir TESTIMONIAL_SUBMIT_TOKEN dans les variables d'environnement Vercel
//   2. Partager le lien : https://votresite.com/en/testimonial-submit?token=VOTRE_TOKEN
//   3. Les soumissions apparaissent dans la table `testimonial_submissions` (Supabase)
//      avec approved = false — à valider manuellement avant publication

import type { Metadata } from "next";
import { createHmac } from "crypto";
import TestimonialSubmitForm from "@/components/TestimonialSubmitForm";

// ── Métadonnées — noindex obligatoire (page privée) ───────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";

  return {
    title: isFr
      ? "Partagez votre témoignage — Aïcha Imène DAHOUMANE"
      : "Share your testimonial — Aïcha Imène DAHOUMANE",
    // Exclure des moteurs de recherche et de l'indexation
    robots: { index: false, follow: false },
  };
}

// ── Page principale ────────────────────────────────────────────────────────────

type PageProps = {
  params:      Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TestimonialSubmitPage({
  params,
  searchParams,
}: PageProps) {
  const { locale: rawLocale } = await params;
  const sp                    = await searchParams;
  const locale                = rawLocale === "fr" ? "fr" : "en";
  const isFr                  = locale === "fr";

  // ── Validation du token côté serveur ──────────────────────────────────────
  const expectedToken  = process.env.TESTIMONIAL_SUBMIT_TOKEN ?? "";
  const submittedToken = typeof sp.token === "string" ? sp.token : "";

  // Si la feature n'est pas configurée ou si le token est invalide → accès refusé
  const isAuthorized = expectedToken.length > 0 && submittedToken === expectedToken;

  if (!isAuthorized) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="text-4xl">🔒</p>
        <h1 className="mt-4 text-xl font-semibold">
          {isFr ? "Accès non autorisé" : "Access denied"}
        </h1>
        <p className="mt-3 text-sm text-muted">
          {isFr
            ? "Ce lien n'est pas valide ou a expiré. Contactez Aïcha directement."
            : "This link is invalid or has expired. Please contact Aïcha directly."}
        </p>
      </div>
    );
  }

  // ── Génération d'une clé de session HMAC à durée limitée (30 min) ─────────
  // On ne passe JAMAIS le token brut au composant client — il serait sérialisé
  // dans le payload RSC (visible dans le HTML source). À la place, on génère un
  // HMAC(token, bucket_temps) valable 30 min. Le composant client l'envoie
  // à l'API, qui le revalide côté serveur sans exposer le secret d'origine.
  // eslint-disable-next-line react-hooks/purity -- Server Component async function, pas un hook React
  const timeBucket = Math.floor(Date.now() / (30 * 60 * 1000)).toString();
  const sessionKey  = createHmac("sha256", expectedToken).update(timeBucket).digest("hex");

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">
          {isFr ? "Partagez votre témoignage" : "Share your testimonial"}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {isFr
            ? "Votre retour aide d'autres professionnels à comprendre comment je travaille. Merci d'avoir pris le temps de répondre — votre témoignage sera relu avant publication."
            : "Your feedback helps other professionals understand what it's like to work with me. Thank you for taking the time — your testimonial will be reviewed before being published."}
        </p>
      </div>

      {/* Formulaire — sessionKey HMAC 30 min, jamais le token brut */}
      <TestimonialSubmitForm sessionKey={sessionKey} locale={locale} />

      {/* Confidentialité */}
      <p className="mt-8 text-xs text-muted-2">
        {isFr
          ? "Vos informations ne sont utilisées qu'aux fins du témoignage sur ce portfolio. Elles ne seront jamais revendues ni partagées avec des tiers."
          : "Your information is used solely for this portfolio testimonial. It will never be sold or shared with third parties."}
      </p>
    </div>
  );
}
