// app/[locale]/testimonial-submit/page.tsx
// -----------------------------------------
// Page de soumission de témoignage professionnel.
// Accessible uniquement via lien d'invitation HMAC à durée limitée.
//
// Sécurité :
//   - Le token brut (TESTIMONIAL_SUBMIT_TOKEN) n'est JAMAIS exposé dans les URLs publiques.
//   - L'accès se fait via un lien signé HMAC généré par POST /api/admin/testimonial-invite.
//   - Format du lien : /[locale]/testimonial-submit?invite=<hmac-hex>&exp=<unix-timestamp>
//   - Si le lien est absent, invalide ou expiré → page d'erreur (pas d'info sur le secret)
//   - noindex dans les métadonnées (ne doit pas apparaître dans les moteurs de recherche)
//
// Utilisation :
//   1. Définir TESTIMONIAL_SUBMIT_TOKEN dans les variables d'environnement Vercel
//   2. Appeler POST /api/admin/testimonial-invite (Bearer ADMIN_PASSWORD) pour obtenir le lien
//   3. Partager le lien privément avec le collaborateur
//   4. Les soumissions apparaissent dans `testimonial_submissions` (Supabase), approved = false

import type { Metadata } from "next";
import { isInviteUsed, isInviteValid, sessionKeyFor } from "@/lib/security/testimonialInvite";
import TestimonialSubmitForm from "@/components/TestimonialSubmitForm";
import { getSiteUrl } from "@/lib/siteUrl";

// ── Métadonnées — noindex obligatoire (page privée) ───────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const isEs = locale === "es";
  const siteUrl = getSiteUrl();

  return {
    title: isFr
      ? "Partagez votre témoignage — Aïcha Imène DAHOUMANE"
      : isEs
      ? "Comparte tu testimonio — Aïcha Imène DAHOUMANE"
      : "Share your testimonial — Aïcha Imène DAHOUMANE",
    // Description propre — audit 2026-10-23 (SEO-2) : la page héritait de
    // celle de l'accueil.
    description: isFr
      ? "Formulaire privé réservé aux anciens collègues, jurys et mentors d'Aïcha Imène DAHOUMANE pour partager un témoignage sur leur collaboration."
      : isEs
      ? "Formulario privado para antiguos compañeros, miembros de tribunal y mentores de Aïcha Imène DAHOUMANE para compartir un testimonio de colaboración."
      : "Private form for former colleagues, jury members and mentors of Aïcha Imène DAHOUMANE to share a testimonial about working together.",
    // Exclure des moteurs de recherche et de l'indexation
    robots: { index: false, follow: false },
    // Canonical propre pour ne pas hériter celui du layout (qui pointe vers la homepage)
    alternates: { canonical: `${siteUrl}/${locale}/testimonial-submit` },
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
  const locale: "en" | "fr" | "es" = rawLocale === "fr" ? "fr" : rawLocale === "es" ? "es" : "en";
  const isFr                  = locale === "fr";
  const isEs                  = locale === "es";

  // ── Validation du lien d'invitation HMAC ──────────────────────────────────
  // Format : ?invite=<hmac-sha256-hex>&exp=<unix-timestamp-seconds>
  // Le HMAC est calculé comme : HMAC-SHA256(TESTIMONIAL_SUBMIT_TOKEN, "testimonial-invite:" + exp)
  // Le token brut n'est jamais dans l'URL — seul un dérivé HMAC à durée limitée est partagé.
  const secret     = process.env.TESTIMONIAL_SUBMIT_TOKEN ?? "";
  const invite     = typeof sp.invite === "string" ? sp.invite.trim() : "";
  const expStr     = typeof sp.exp    === "string" ? sp.exp.trim()    : "";
  const expUnix    = parseInt(expStr, 10);
  // eslint-disable-next-line react-hooks/purity -- Server Component async function, pas un hook React
  const nowSec     = Math.floor(Date.now() / 1000);

  // Lien signé, non expiré et pas encore utilisé (usage unique, audit
  // 2026-10-25 — lib/security/testimonialInvite.ts).
  let isAuthorized = isInviteValid(secret, invite, expUnix, nowSec * 1000);
  if (isAuthorized && (await isInviteUsed(invite))) isAuthorized = false;

  if (!isAuthorized) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="text-4xl">🔒</p>
        <h1 className="mt-4 text-xl font-semibold">
          {isFr ? "Accès non autorisé" : isEs ? "Acceso no autorizado" : "Access denied"}
        </h1>
        <p className="mt-3 text-sm text-muted">
          {isFr
            ? "Ce lien n'est pas valide ou a expiré. Contactez Aïcha directement."
            : isEs
            ? "Este enlace no es válido o ha caducado. Contacta con Aïcha directamente."
            : "This link is invalid or has expired. Please contact Aïcha directly."}
        </p>
      </div>
    );
  }

  // ── Clé de session HMAC à durée limitée (30 min), liée à cette invitation ──
  // On ne passe JAMAIS le token brut au composant client — il serait sérialisé
  // dans le payload RSC (visible dans le HTML source). La clé dérive du secret,
  // de l'invitation et du créneau de 30 min ; l'API la revalide côté serveur.
  const sessionKey = sessionKeyFor(secret, invite);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">
          {isFr ? "Partagez votre témoignage" : isEs ? "Comparte tu testimonio" : "Share your testimonial"}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {isFr
            ? "Votre retour aide d'autres professionnels à comprendre comment je travaille. Merci d'avoir pris le temps de répondre — votre témoignage sera relu avant publication."
            : isEs
            ? "Tu opinión ayuda a otros profesionales a entender cómo trabajo. Gracias por tomarte el tiempo de responder — tu testimonio será revisado antes de publicarse."
            : "Your feedback helps other professionals understand what it's like to work with me. Thank you for taking the time — your testimonial will be reviewed before being published."}
        </p>
      </div>

      {/* Formulaire — sessionKey HMAC 30 min, jamais le token brut */}
      <TestimonialSubmitForm sessionKey={sessionKey} invite={invite} exp={expUnix} locale={locale} />

      {/* Confidentialité */}
      <p className="mt-8 text-xs text-muted-2">
        {isFr
          ? "Vos informations ne sont utilisées qu'aux fins du témoignage sur ce portfolio. Elles ne seront jamais revendues ni partagées avec des tiers."
          : isEs
          ? "Tu información se utiliza únicamente para el testimonio en este portfolio. Nunca será vendida ni compartida con terceros."
          : "Your information is used solely for this portfolio testimonial. It will never be sold or shared with third parties."}
      </p>
    </div>
  );
}
