"use client";

// TestimonialInviteGenerator.tsx
// ------------------------------
// Bouton « Générer un lien d'invitation » de la page /admin : choix de la
// langue et de la durée, puis affichage du lien signé avec un bouton Copier.
// Utilisable depuis le navigateur d'un téléphone (aucune commande à saisir).

import { useState, useTransition } from "react";
import { generateTestimonialInvite } from "./actions";

const LOCALES = [
  { value: "fr", label: "Français" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

const DURATIONS = [7, 14, 30];

const fieldClass =
  "rounded-lg border border-white/10 bg-white/4 px-3 py-2 text-sm text-slate-200";

export default function TestimonialInviteGenerator() {
  const [locale, setLocale] = useState("fr");
  const [days, setDays] = useState(30);
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
      // Presse-papiers indisponible : le champ reste sélectionnable à la main.
      setCopied(false);
    }
  }

  return (
    <div className="mb-4 rounded-xl border border-white/10 bg-white/3 p-4">
      <p className="text-sm font-medium text-slate-200">Lien d&apos;invitation</p>
      <p className="mt-1 text-xs text-slate-500">
        Un lien par personne, à envoyer en message privé. Il expire automatiquement.
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
