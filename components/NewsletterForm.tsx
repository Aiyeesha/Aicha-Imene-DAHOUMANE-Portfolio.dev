"use client";

// NewsletterForm.tsx
// ------------------
// Formulaire d'inscription à la newsletter (Brevo).
// Placé dans le footer — design minimaliste, une seule ligne.
// Gère : idle, sending, success, error, already subscribed.

import { useState } from "react";
import { useLocale } from "next-intl";

type Status = "idle" | "sending" | "success" | "already" | "error";

const LABELS = {
  en: {
    heading:     "Stay in the loop",
    sub:         "Occasional Salesforce & IT Ops insights. No spam, ever.",
    placeholder: "your@email.com",
    cta:         "Subscribe",
    sending:     "Sending…",
    success:     "You're in! Check your inbox to confirm.",
    already:     "You're already subscribed — thanks!",
    error:       "Something went wrong. Try again.",
    invalidEmail:"Please enter a valid email address.",
    ariaLabel:   "Subscribe to newsletter",
  },
  fr: {
    heading:     "Restez informé",
    sub:         "Des insights Salesforce & IT Ops de temps en temps. Jamais de spam.",
    placeholder: "votre@email.com",
    cta:         "S'inscrire",
    sending:     "Envoi…",
    success:     "C'est parti ! Vérifiez vos emails pour confirmer.",
    already:     "Vous êtes déjà inscrit — merci !",
    error:       "Une erreur est survenue. Réessayez.",
    invalidEmail:"Merci d'indiquer une adresse email valide.",
    ariaLabel:   "S'inscrire à la newsletter",
  },
};

export default function NewsletterForm() {
  const locale = useLocale() as "en" | "fr";
  const L = LABELS[locale] ?? LABELS.en;

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, locale }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus(data?.already ? "already" : "success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  const isDone = status === "success" || status === "already";

  return (
    <div className="mt-8 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-6 py-5">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">{L.heading}</p>
      <p className="mt-1 text-xs text-muted-2">{L.sub}</p>

      {isDone ? (
        /* Message de confirmation */
        <p className="mt-4 text-sm text-emerald-700 dark:text-emerald-300">
          {status === "success" ? L.success : L.already}
        </p>
      ) : (
        /* Formulaire */
        <form
          onSubmit={handleSubmit}
          aria-label={L.ariaLabel}
          className="mt-4 flex gap-2"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            {L.placeholder}
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
            placeholder={L.placeholder}
            disabled={status === "sending"}
            className="min-w-0 flex-1 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/40 outline-none focus:border-cyan-400/60 soft-ring disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="flex-none rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring disabled:opacity-60 transition-opacity"
          >
            {status === "sending" ? L.sending : L.cta}
          </button>
        </form>
      )}

      {/* Erreur inline */}
      {status === "error" && (
        <p className="mt-2 text-xs text-rose-700 dark:text-rose-300">{L.error}</p>
      )}
    </div>
  );
}
