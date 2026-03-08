"use client";

// TestimonialSubmitForm.tsx
// -------------------------
// Formulaire de soumission de témoignage professionnel.
// Accessible via /[locale]/testimonial-submit?token=SECRET.
//
// Sécurité :
//   - Le token est passé en prop depuis le Server Component (non exposé en URL côté client)
//   - Honeypot anti-spam (champ "website" caché visuellement mais présent dans le DOM)
//   - Validation côté client + côté serveur (API route)
//
// Champs :
//   - Nom complet *
//   - Rôle / Poste *
//   - Entreprise (optionnel)
//   - Relation avec Aïcha * (dropdown)
//   - Contexte de collaboration (optionnel)
//   - Message / Témoignage * (20-2000 caractères)
//   - URL photo (optionnel)
//   - Langue du témoignage *

import { useState, useId } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

type Locale = "en" | "fr";

type Props = {
  /** Token de soumission passé par le Server Component — jamais exposé dans l'URL côté client */
  token: string;
  locale: Locale;
};

type FormState = "idle" | "loading" | "success" | "error";

// ── Traductions inline (pas de useTranslations — page hors layout principal) ──

const LABELS = {
  en: {
    title:         "Share your testimonial",
    subtitle:      "Your feedback helps other professionals understand what it's like to work with me. Thank you!",
    full_name:     "Full name",
    role:          "Role / Job title",
    company:       "Company or organisation (optional)",
    relation_type: "Your relationship with Aïcha",
    relation_opts: [
      { value: "colleague",  label: "Colleague / Coworker" },
      { value: "trainer",    label: "Trainer / Mentor" },
      { value: "jury",       label: "Jury / Evaluator" },
      { value: "classmate",  label: "Classmate / Cohort member" },
      { value: "client",     label: "Client / Stakeholder" },
      { value: "other",      label: "Other" },
    ],
    context:    "Collaboration context (optional — e.g. 'Salesforce project, 6 weeks')",
    message:    "Your testimonial",
    message_hint: "Minimum 20 characters, maximum 2000.",
    photo_url:  "Your photo URL (optional — LinkedIn photo, Gravatar…)",
    lang:       "Language of this testimonial",
    lang_en:    "English",
    lang_fr:    "French",
    submit:     "Send testimonial",
    submitting: "Sending…",
    success:    "Thank you! Your testimonial has been received and will be reviewed before publication.",
    error:      "An error occurred. Please try again.",
    required:   "Required",
  },
  fr: {
    title:         "Partagez votre témoignage",
    subtitle:      "Votre retour aide d'autres professionnels à comprendre comment je travaille. Merci !",
    full_name:     "Nom complet",
    role:          "Rôle / Intitulé de poste",
    company:       "Entreprise ou organisme (optionnel)",
    relation_type: "Votre relation avec Aïcha",
    relation_opts: [
      { value: "colleague",  label: "Collègue / Coéquipier(e)" },
      { value: "trainer",    label: "Formateur / Mentore" },
      { value: "jury",       label: "Jury / Évaluateur" },
      { value: "classmate",  label: "Collègue de promotion" },
      { value: "client",     label: "Client / Donneur d'ordre" },
      { value: "other",      label: "Autre" },
    ],
    context:    "Contexte de collaboration (optionnel — ex. 'Projet Salesforce, 6 semaines')",
    message:    "Votre témoignage",
    message_hint: "Minimum 20 caractères, maximum 2000.",
    photo_url:  "URL de votre photo (optionnel — photo LinkedIn, Gravatar…)",
    lang:       "Langue de ce témoignage",
    lang_en:    "Anglais",
    lang_fr:    "Français",
    submit:     "Envoyer le témoignage",
    submitting: "Envoi en cours…",
    success:    "Merci ! Votre témoignage a bien été reçu et sera examiné avant publication.",
    error:      "Une erreur s'est produite. Veuillez réessayer.",
    required:   "Obligatoire",
  },
} as const;

// ── Composant principal ───────────────────────────────────────────────────────

export default function TestimonialSubmitForm({ token, locale }: Props) {
  const l = LABELS[locale];
  const uid = useId(); // préfixe unique pour les id HTML (accessibilité)

  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg,  setErrorMsg]  = useState("");
  const [charCount, setCharCount] = useState(0);

  // Valeurs du formulaire
  const [fields, setFields] = useState({
    full_name:             "",
    role:                  "",
    company:               "",
    relation_type:         "",
    collaboration_context: "",
    message:               "",
    photo_url:             "",
    locale:                locale as string,
    website:               "", // honeypot
  });

  // ── Mise à jour d'un champ ──────────────────────────────────────────────────
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (name === "message") setCharCount(value.length);
  }

  // ── Soumission ──────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/testimonial-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, token }),
      });

      const data: { ok?: boolean; error?: string } = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || l.error);
        setFormState("error");
        return;
      }

      setFormState("success");
    } catch {
      setErrorMsg(l.error);
      setFormState("error");
    }
  }

  // ── Succès ─────────────────────────────────────────────────────────────────
  if (formState === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 px-6 py-8 text-center"
      >
        <p className="text-2xl">✓</p>
        <p className="mt-3 font-medium text-emerald-800 dark:text-emerald-300">
          {l.success}
        </p>
      </div>
    );
  }

  // ── Formulaire ─────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5">

      {/* ── Honeypot — masqué visuellement, ignoré par les humains ────────── */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0 }}>
        <label htmlFor={`${uid}-website`}>Website</label>
        <input
          id={`${uid}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.website}
          onChange={handleChange}
        />
      </div>

      {/* Grille 2 colonnes sur desktop */}
      <div className="grid gap-5 sm:grid-cols-2">

        {/* Nom complet */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-full_name`} className="text-sm font-medium">
            {l.full_name} <span className="text-rose-500" aria-label={l.required}>*</span>
          </label>
          <input
            id={`${uid}-full_name`}
            name="full_name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            value={fields.full_name}
            onChange={handleChange}
            className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40"
          />
        </div>

        {/* Rôle */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-role`} className="text-sm font-medium">
            {l.role} <span className="text-rose-500" aria-label={l.required}>*</span>
          </label>
          <input
            id={`${uid}-role`}
            name="role"
            type="text"
            required
            maxLength={120}
            value={fields.role}
            onChange={handleChange}
            className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40"
          />
        </div>
      </div>

      {/* Entreprise */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${uid}-company`} className="text-sm font-medium">
          {l.company}
        </label>
        <input
          id={`${uid}-company`}
          name="company"
          type="text"
          maxLength={120}
          autoComplete="organization"
          value={fields.company}
          onChange={handleChange}
          className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40"
        />
      </div>

      {/* Relation */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${uid}-relation_type`} className="text-sm font-medium">
          {l.relation_type} <span className="text-rose-500" aria-label={l.required}>*</span>
        </label>
        <select
          id={`${uid}-relation_type`}
          name="relation_type"
          required
          value={fields.relation_type}
          onChange={handleChange}
          className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40"
        >
          <option value="" disabled>—</option>
          {l.relation_opts.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Contexte */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${uid}-collaboration_context`} className="text-sm font-medium">
          {l.context}
        </label>
        <input
          id={`${uid}-collaboration_context`}
          name="collaboration_context"
          type="text"
          maxLength={200}
          value={fields.collaboration_context}
          onChange={handleChange}
          className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${uid}-message`} className="text-sm font-medium">
          {l.message} <span className="text-rose-500" aria-label={l.required}>*</span>
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          required
          minLength={20}
          maxLength={2000}
          rows={7}
          value={fields.message}
          onChange={handleChange}
          className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40 resize-y"
        />
        {/* Compteur de caractères */}
        <p className="text-xs text-muted-2 text-right">
          {charCount} / 2000 — {l.message_hint}
        </p>
      </div>

      {/* URL photo */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${uid}-photo_url`} className="text-sm font-medium">
          {l.photo_url}
        </label>
        <input
          id={`${uid}-photo_url`}
          name="photo_url"
          type="url"
          maxLength={500}
          placeholder="https://..."
          value={fields.photo_url}
          onChange={handleChange}
          className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40"
        />
      </div>

      {/* Langue */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${uid}-locale`} className="text-sm font-medium">
          {l.lang} <span className="text-rose-500" aria-label={l.required}>*</span>
        </label>
        <select
          id={`${uid}-locale`}
          name="locale"
          value={fields.locale}
          onChange={handleChange}
          className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40"
        >
          <option value="en">{l.lang_en}</option>
          <option value="fr">{l.lang_fr}</option>
        </select>
      </div>

      {/* Erreur globale */}
      {formState === "error" && errorMsg && (
        <p role="alert" className="rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
          {errorMsg}
        </p>
      )}

      {/* Bouton submit */}
      <div>
        <button
          type="submit"
          disabled={formState === "loading"}
          className="rounded-full bg-cyan-500 px-6 py-2.5 text-sm font-medium text-black hover:opacity-90 disabled:opacity-50 soft-ring transition-opacity"
        >
          {formState === "loading" ? l.submitting : l.submit}
        </button>
      </div>
    </form>
  );
}
