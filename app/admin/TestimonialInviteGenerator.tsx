"use client";

// TestimonialInviteGenerator.tsx
// ------------------------------
// "Generate an invitation link" button of the /admin page: pick language and
// validity, then show the signed link with a Copy button. Usable from a phone
// browser (no command to type). Each link is single use (see
// lib/security/testimonialInvite.ts).

import { useState, useTransition } from "react";
import { generateTestimonialInvite } from "./actions";

const LOCALES = [
  { value: "fr", label: "Français" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

// At most MAX_INVITE_DAYS (14), enforced again on the server.
const DURATIONS = [7, 14];

const fieldClass =
  "rounded-lg border border-white/10 bg-white/4 px-3 py-2 text-sm text-slate-200";

export default function TestimonialInviteGenerator() {
  const [locale, setLocale] = useState("fr");
  const [days, setDays] = useState(7);
  const [url, setUrl] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleGenerate() {
    setError("");
    setCopied(false);
    startTransition(async () => {
      try {
        const res = await generateTestimonialInvite(locale, days);
        if (!res.ok) {
          setUrl("");
          setError(res.error);
          return;
        }
        setUrl(res.invite.url);
        setExpiresAt(res.invite.expiresAt);
      } catch {
        setUrl("");
        setError("Génération impossible. Rechargez la page et réessayez.");
      }
    });
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard unavailable: the field can still be selected by hand.
      setCopied(false);
    }
  }

  return (
    <div className="mb-4 rounded-xl border border-white/10 bg-white/3 p-4">
      <p className="text-sm font-medium text-slate-200">Lien d&apos;invitation</p>
      <p className="mt-1 text-xs text-slate-500">
        Un lien par personne, à envoyer en message privé. Il ne sert qu&apos;une fois et expire automatiquement.
      </p>

      <div className="mt-3 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs text-slate-400">
          Langue
          <select value={locale} onChange={(e) => setLocale(e.target.value)} className={fieldClass}>
            {LOCALES.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-slate-400">
          Validité
          <select value={days} onChange={(e) => setDays(Number(e.target.value))} className={fieldClass}>
            {DURATIONS.map((d) => (
              <option key={d} value={d}>{d} jours</option>
            ))}
          </select>
        </label>
        <button
          type="button"
          disabled={isPending}
          onClick={handleGenerate}
          className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-600 transition-colors disabled:opacity-50"
        >
          {isPending ? "Génération…" : "Générer un lien d'invitation"}
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-400">{error}</p>
      )}

      {url && (
        <div className="mt-3 space-y-2">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              readOnly
              value={url}
              aria-label="Lien d'invitation"
              onFocus={(e) => e.target.select()}
              className={`${fieldClass} min-w-0 flex-1 font-mono text-xs`}
            />
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-lg border border-white/10 bg-white/4 px-4 py-2 text-sm text-slate-300 hover:bg-white/8 transition-colors"
            >
              {copied ? "Copié ✓" : "Copier"}
            </button>
          </div>
          <p className="text-xs text-slate-500">
            Expire le {new Date(expiresAt).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}.
          </p>
        </div>
      )}
    </div>
  );
}
