"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import CalendlyModal from "./CalendlyModal";
import { useTrack } from "@/app/[locale]/providers";
import { trackEvent } from "@/lib/analytics";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success" }
  | { kind: "error"; message: string }
  // rate_limited : countdown live jusqu'à 0 puis retour à idle
  | { kind: "rate_limited"; retryAfterSeconds: number };

// Formate un nombre de secondes en "Xm Ys" ou "Ys"
function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
import { LINKEDIN_URL } from "@/lib/social";
const LINKEDIN_HREF = LINKEDIN_URL;

// Convert API error codes into i18n keys
function errorToKey(code: string) {
  switch (code) {
    case "policy_not_accepted":
      return "contact.errors.policy_not_accepted";
    case "invalid_json":
      return "contact.errors.invalid_json";
    case "name_too_short":
      return "contact.errors.name_too_short";
    case "name_too_long":
      return "contact.errors.name_too_long";
    case "email_too_long":
      return "contact.errors.email_too_long";
    case "invalid_email":
      return "contact.errors.invalid_email";
    case "invalid_topic":
      return "contact.errors.invalid_topic";
    case "message_too_short":
      return "contact.errors.message_too_short";
    case "message_too_long":
      return "contact.errors.message_too_long";
    case "too_many_links":
      return "contact.errors.too_many_links";
    case "forbidden_origin":
      return "contact.errors.forbidden_origin";
    case "rate_limited":
      return "contact.errors.rate_limited";
    case "upstream_failed":
      return "contact.errors.upstream_failed";
    default:
      return "contact.errors.generic";
  }
}

export default function ContactForm({ extended = false }: { extended?: boolean }) {
  const t = useTranslations();
  const locale = useLocale();
  const { track } = useTrack();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  // Guard: fire contact_form_started only once per mount (first keystroke)
  const startedRef = useRef(false);

  // ── Champs contrôlés pour permettre le pré-remplissage depuis les cartes services ──
  const [topic, setTopic] = useState("general");
  const [msgLen,  setMsgLen]  = useState(0);
  const MSG_MAX_HARD = 2000; // doit rester égal à MAX_MESSAGE_LEN (lib/contactValidation.ts)

  // ── Champs de qualification, uniquement rendus quand extended=true (page
  // /contact) — le formulaire rapide de la home (ancre #contact, prérempli
  // par TrackAwareServices via contact:prefill) reste inchangé, sans ces champs.
  // Tous facultatifs : composés dans le corps du message avant envoi plutôt
  // que d'ajouter des colonnes en base (voir onSubmit) — aucune donnée
  // structurée n'est perdue, mais aucun changement de schéma n'était requis.
  const [sector, setSector] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");

  // Le préfixe de contexte est compté dans les 2000 caractères imposés par
  // lib/contactValidation.ts (MAX_MESSAGE_LEN) côté serveur — sans ce calcul,
  // un message déjà proche du maximum pourrait dépasser la limite une fois le
  // préfixe ajouté et échouer silencieusement à l'envoi (message_too_long).
  const intakePrefix = useMemo(() => {
    const lines: string[] = [];
    if (sector)   lines.push(`${t("contact.intake.sectorLabel")}: ${t(`contact.intake.sector.${sector}`)}`);
    if (timeline) lines.push(`${t("contact.intake.timelineLabel")}: ${t(`contact.intake.timeline.${timeline}`)}`);
    if (budget)   lines.push(`${t("contact.intake.budgetLabel")}: ${t(`contact.intake.budget.${budget}`)}`);
    return lines.length > 0 ? `[${t("contact.intake.messagePrefixHeading")}]\n${lines.join("\n")}\n\n` : "";
  }, [sector, timeline, budget, t]);

  // Espace restant pour le texte libre une fois le préfixe de contexte réservé.
  const MSG_MAX = Math.max(200, MSG_MAX_HARD - intakePrefix.length);

  // Listener pour l'événement custom `contact:prefill` dispatché par TrackAwareServices.
  // Quand l'utilisateur clique "Discuter de ce service", le formulaire se pré-remplit
  // automatiquement avec le bon topic (salesforce/itops) et le titre du service.
  useEffect(() => {
    function handlePrefill(e: Event) {
      const { topic: t } = (e as CustomEvent<{ topic: string }>).detail;
      if (t) setTopic(t);
    }
    window.addEventListener("contact:prefill", handlePrefill);
    return () => window.removeEventListener("contact:prefill", handlePrefill);
  }, []);

  // Countdown live : décrémente retryAfterSeconds chaque seconde jusqu'à 0,
  // puis remet le formulaire en état idle (bouton réactivé automatiquement).
  useEffect(() => {
    if (status.kind !== "rate_limited") return;
    if (status.retryAfterSeconds <= 0) {
      setStatus({ kind: "idle" });
      return;
    }
    const timer = setTimeout(() => {
      setStatus({ kind: "rate_limited", retryAfterSeconds: status.retryAfterSeconds - 1 });
    }, 1000);
    return () => clearTimeout(timer);
  }, [status]);

  const cvUrl = `/cv/Aicha-Imene-DAHOUMANE-CV-${locale}-${track}.pdf`;

  // Show configuration hints only in non-production builds.
  // The page should not display internal setup instructions to visitors.
  const showEnvHint = useMemo(() => {
    if (process.env.NODE_ENV === "production") return false;

    const missingCalendly = !process.env.NEXT_PUBLIC_CALENDLY_URL;
    const missingEmail = !CONTACT_EMAIL;
    const missingLinkedIn = !LINKEDIN_URL;
    // CV has a sensible default (/cv.pdf), so we don't consider it "missing".

    return missingCalendly || missingEmail || missingLinkedIn;
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "sending" });

    // IMPORTANT:
    // Do NOT access properties on the React SyntheticEvent after an `await`.
    // Depending on the React/Next.js runtime, the event object can be cleared
    // (currentTarget becomes null), which would throw "Cannot read properties of null".
    // We snapshot the form element first and use it throughout the async flow.
    const formEl = e.currentTarget;
    const form = new FormData(formEl);

    // Honeypot field (should stay empty)
    const company = String(form.get("company") || "");

    // Préfixe le message avec le contexte de qualification (secteur/délai/
    // budget) plutôt que d'étendre le schéma de l'API /api/contact — celle-ci
    // ne connaît que { name, email, topic, message, ... } et ignore déjà
    // silencieusement tout champ inconnu, donc composer côté client est le
    // chemin qui ne touche ni la validation, ni la table Supabase `messages`,
    // ni Formhook. `intakePrefix` (mémoïsé plus haut) est aussi ce qui borne
    // maxMessageLen ci-dessous, donc les deux restent toujours cohérents.
    const rawMessage = String(form.get("message") || "");
    const message = `${intakePrefix}${rawMessage}`;

    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      topic: String(form.get("topic") || "general"),
      message,
      // Explicit RGPD consent (required)
      acceptedPolicy: Boolean(form.get("acceptedPolicy")),
      company,
      locale
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as any;
        const code = String(data?.error || "generic");

        // Cas spécial rate_limited : afficher un countdown avec les secondes exactes de l'API
        if (code === "rate_limited") {
          const retryAfter =
            typeof data?.retryAfterSeconds === "number" && data.retryAfterSeconds > 0
              ? data.retryAfterSeconds
              : 60; // fallback 60s si absent
          setStatus({ kind: "rate_limited", retryAfterSeconds: retryAfter });
          return;
        }

        const msg = t(errorToKey(code));
        throw new Error(msg);
      }

      // Track form submission (topic anonymisé — pas de données perso)
      trackEvent("contact_form_submit", { topic: payload.topic, locale });

      // Reset le formulaire (champs non contrôlés) + réinitialise les états contrôlés.
      formEl.reset();
      setTopic("general");
      setSector("");
      setTimeline("");
      setBudget("");
      setStatus({ kind: "success" });
    } catch (err: any) {
      setStatus({ kind: "error", message: err?.message || t("contact.errors.generic") });
    }
  }

  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_420px]">
      <form
        onSubmit={onSubmit}
        className="card p-6 space-y-3"
        onChange={() => {
          // Fire once on first user interaction with any form field
          if (startedRef.current) return;
          startedRef.current = true;
          trackEvent("contact_form_started", { locale });
        }}
      >
        <div>
          <label htmlFor="contact-name" className="text-xs text-muted-2">{t("contact.nameLabel")}</label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            className="mt-2 w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-cyan-400/40 soft-ring"
            placeholder={t("contact.namePlaceholder")}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="text-xs text-muted-2">{t("contact.emailLabel")}</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-2 w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-cyan-400/40 soft-ring"
            placeholder={t("contact.emailPlaceholder")}
          />
        </div>

        <div>
          <label htmlFor="contact-topic" className="text-xs text-muted-2">{t("contact.topicLabel")}</label>
          <select
            id="contact-topic"
            name="topic"
            autoComplete="off"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-2 w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-cyan-400/40 soft-ring [color-scheme:light] dark:[color-scheme:dark]"
          >
            <option value="general">{t("contact.topicGeneral")}</option>
            <option value="salesforce">{t("contact.topicSalesforce")}</option>
            <option value="itops">{t("contact.topicItOps")}</option>
            <option value="availability">{t("contact.topicAvailability")}</option>
            <option value="other">{t("contact.topicOther")}</option>
          </select>
        </div>

        {extended && (
          <div className="rounded-xl border border-black/10 dark:border-white/10 p-4 space-y-3">
            <div>
              <p className="text-sm font-semibold">{t("contact.intake.title")}</p>
              <p className="mt-0.5 text-xs text-muted-2">{t("contact.intake.subtitle")}</p>
            </div>

            <div>
              <label htmlFor="contact-sector" className="text-xs text-muted-2">{t("contact.intake.sectorLabel")}</label>
              <select
                id="contact-sector"
                autoComplete="off"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="mt-2 w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-cyan-400/40 soft-ring [color-scheme:light] dark:[color-scheme:dark]"
              >
                <option value="">{t("contact.intake.sectorPlaceholder")}</option>
                {["automotive","industry","logistics","supplyChain","maintenance","quality","energy","cybersecurity","supervision","automation","fieldService","operationalData","traceability","healthcare","luxury","other"].map((key) => (
                  <option key={key} value={key}>{t(`contact.intake.sector.${key}`)}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="contact-timeline" className="text-xs text-muted-2">{t("contact.intake.timelineLabel")}</label>
              <select
                id="contact-timeline"
                autoComplete="off"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="mt-2 w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-cyan-400/40 soft-ring [color-scheme:light] dark:[color-scheme:dark]"
              >
                <option value="">{t("contact.intake.timelinePlaceholder")}</option>
                {["asap","thisMonth","oneToThree","threeToSix","tbd"].map((key) => (
                  <option key={key} value={key}>{t(`contact.intake.timeline.${key}`)}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="contact-budget" className="text-xs text-muted-2">{t("contact.intake.budgetLabel")}</label>
              <select
                id="contact-budget"
                autoComplete="off"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="mt-2 w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-cyan-400/40 soft-ring [color-scheme:light] dark:[color-scheme:dark]"
              >
                <option value="">{t("contact.intake.budgetPlaceholder")}</option>
                {["under5k","from5to15k","from15to40k","over40k","tbd"].map((key) => (
                  <option key={key} value={key}>{t(`contact.intake.budget.${key}`)}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Honeypot (hidden for humans) */}
        <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="contact-message" className="text-xs text-muted-2">{t("contact.messageLabel")}</label>
            <span className={`text-xs tabular-nums ${msgLen > MSG_MAX ? "text-red-500" : "text-muted-2"}`}>
              {msgLen}/{MSG_MAX}
            </span>
          </div>
          <textarea
            id="contact-message"
            name="message"
            autoComplete="off"
            required
            minLength={10}
            maxLength={MSG_MAX}
            rows={5}
            className="mt-2 w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-cyan-400/40 soft-ring"
            placeholder={t("contact.messagePlaceholder")}
            onChange={(e) => setMsgLen(e.target.value.length)}
          />
        </div>

        <div className="mt-1 flex items-start gap-3">
          <input
            id="contact-accepted-policy"
            name="acceptedPolicy"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5"
          />
          <label htmlFor="contact-accepted-policy" className="text-xs text-muted-2">
            {t("contact.acceptPolicyPrefix")} {" "}
            <a
              className="underline underline-offset-4 hover:opacity-90"
              href={`/${locale}/privacy`}
              target="_blank"
              rel="noreferrer"
            >
              {t("contact.acceptPolicyLink")}
            </a>
            .
          </label>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="submit"
            disabled={status.kind === "sending" || status.kind === "rate_limited"}
            aria-describedby="contact-form-status"
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring disabled:opacity-60 disabled:cursor-not-allowed ${track === "salesforce" ? "bg-cyan-500" : "bg-violet-500"}`}
          >
            {status.kind === "sending" && (
              /* Spinner CSS — aucune dépendance JS, animate-spin est natif Tailwind */
              <svg
                aria-hidden="true"
                className="h-3.5 w-3.5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            )}
            {status.kind === "sending" ? t("contact.sending") : t("contact.send")}
          </button>

          <div id="contact-form-status" aria-live="polite" aria-atomic="true" className="min-h-[20px]">
            {status.kind === "success" && (
              /* animate-in = classe Tailwind v3.4+ animate-[fadeIn_0.3s_ease] */
              <span className="inline-block text-sm text-emerald-700 dark:text-emerald-200 animate-[fadeIn_0.35s_ease_forwards]">
                {t("contact.success")}
              </span>
            )}
            {status.kind === "error" && (
              <span className="text-sm text-rose-700 dark:text-rose-200">
                {status.message}
              </span>
            )}
            {status.kind === "rate_limited" && (
              <span className="text-sm text-amber-700 dark:text-amber-300">
                {t("contact.errors.rate_limited_countdown", {
                  time: formatCountdown(status.retryAfterSeconds),
                })}
              </span>
            )}
          </div>
        </div>

        <p className="pt-2 text-xs text-muted-2">{t("contact.privacyNote")}</p>
      </form>

      <div className="card p-6 flex flex-col gap-6">
        {/* Quick links */}
        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white">{t("contact.homeMethodsTitle")}</div>
          <p className="mt-2 text-sm text-muted-2">{t("contact.homeIntro")}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              className={`rounded-full px-5 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring ${track === "salesforce" ? "bg-cyan-500" : "bg-violet-500"}`}
              href={CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}` : "#"}
              aria-disabled={!CONTACT_EMAIL ? true : undefined}
              onClick={(e) => { if (!CONTACT_EMAIL) e.preventDefault(); }}
              title={!CONTACT_EMAIL ? t("contact.emailMissing") : undefined}
            >
              {t("contact.homeEmail")}
            </a>
            <a
              className="rounded-full border border-black/10 bg-black/5 px-5 py-2 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring"
              href={LINKEDIN_HREF || "#"}
              target="_blank"
              rel="noreferrer"
              aria-disabled={!LINKEDIN_HREF ? true : undefined}
              onClick={(e) => { if (!LINKEDIN_HREF) e.preventDefault(); }}
              title={!LINKEDIN_HREF ? t(process.env.NODE_ENV === "production" ? "contact.linkedInMissing" : "contact.envHint") : undefined}
            >
              {t("contact.homeLinkedIn")}
            </a>
            <a
              className="rounded-full border border-black/10 bg-black/5 px-5 py-2 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring"
              href={cvUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t("contact.homeCv")}
            </a>
          </div>
        </div>

        {/* Availability badge */}
        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-4 py-3">
          <span className="h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <span className="text-sm text-emerald-700 dark:text-emerald-300">{t("contact.availability")}</span>
        </div>

        {/* Direct contact */}
        <div className="border-t border-black/10 pt-2 dark:border-white/10 space-y-3">
          <CalendlyModal />
          {CONTACT_EMAIL ? (
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center justify-between rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
            >
              <span className="text-slate-900 dark:text-white">{t("contact.emailMe")}</span>
              <span className="text-xs text-muted-2">{CONTACT_EMAIL}</span>
            </a>
          ) : null}
          <p className="px-1 text-xs text-muted-2">{t("contact.homeFormSubtitle")}</p>
        </div>
      </div>
    </div>
  );
}
