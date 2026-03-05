"use client";

import { useEffect, useMemo, useState } from "react";
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
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL || "";
const LINKEDIN_HREF = LINKEDIN_URL
  ? (LINKEDIN_URL.startsWith("http") ? LINKEDIN_URL : `https://${LINKEDIN_URL}`)
  : "";

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

export default function ContactForm() {
  const t = useTranslations();
  const locale = useLocale();
  const { track } = useTrack();
  const [status, setStatus] = useState<Status>({ kind: "idle" });

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

  const cvUrl = useMemo(
    () =>
      process.env.NEXT_PUBLIC_CV_PDF_URL ||
      process.env.NEXT_PUBLIC_CV_URL ||
      `/cv/cv-${locale}-${track}.pdf`,
    [locale, track]
  );

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

    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      topic: String(form.get("topic") || "general"),
      subject: String(form.get("subject") || ""),
      message: String(form.get("message") || ""),
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

      // Reset the form first, then show success.
      formEl.reset();
      setStatus({ kind: "success" });
    } catch (err: any) {
      setStatus({ kind: "error", message: err?.message || t("contact.errors.generic") });
    }
  }

  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_420px]">
      <form onSubmit={onSubmit} className="card p-6 space-y-3">
        <div>
          <label htmlFor="contact-name" className="text-xs text-muted-2">{t("contact.nameLabel")}</label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
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
            defaultValue="general"
            className="mt-2 w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-cyan-400/40 soft-ring [color-scheme:light] dark:[color-scheme:dark]"
          >
            <option value="general">{t("contact.topicGeneral")}</option>
            <option value="salesforce">{t("contact.topicSalesforce")}</option>
            <option value="itops">{t("contact.topicItOps")}</option>
            <option value="availability">{t("contact.topicAvailability")}</option>
            <option value="other">{t("contact.topicOther")}</option>
          </select>
        </div>

        <div>
          <label htmlFor="contact-subject" className="text-xs text-muted-2">{t("contact.subjectLabel")}</label>
          <input
            id="contact-subject"
            name="subject"
            autoComplete="off"
            className="mt-2 w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-cyan-400/40 soft-ring"
            placeholder={t("contact.subjectPlaceholder")}
          />
        </div>

        {/* Honeypot (hidden for humans) */}
        <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <div>
          <label htmlFor="contact-message" className="text-xs text-muted-2">{t("contact.messageLabel")}</label>
          <textarea
            id="contact-message"
            name="message"
            autoComplete="off"
            required
            rows={5}
            className="mt-2 w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-cyan-400/40 soft-ring"
            placeholder={t("contact.messagePlaceholder")}
          />
        </div>

        <div className="mt-1 flex items-start gap-3">
          <input
            id="contact-accepted-policy"
            name="acceptedPolicy"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5"
            aria-label={t("contact.acceptPolicyAria")}
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
            className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring disabled:opacity-60"
          >
            {status.kind === "sending" ? t("contact.sending") : t("contact.send")}
          </button>

          <div id="contact-form-status" aria-live="polite" aria-atomic="true" className="min-h-[20px]">
            {status.kind === "success" && (
              <span className="text-sm text-emerald-700 dark:text-emerald-200">
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
              className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring"
              href={CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}` : "#"}
              aria-disabled={!CONTACT_EMAIL}
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
              aria-disabled={!LINKEDIN_HREF}
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
