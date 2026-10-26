"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import BookingLink from "./BookingLink";
import { useTrack } from "@/app/[locale]/providers";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success" }
  | { kind: "error"; message: string }
  // rate_limited: live countdown to 0, then back to idle
  | { kind: "rate_limited"; retryAfterSeconds: number };

// Formats seconds as "Xm Ys" or "Ys"
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

export default function ContactForm() {
  const t = useTranslations();
  const locale = useLocale();
  const { track } = useTrack();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  // ── Controlled fields, so service cards can prefill them ──
  const [topic, setTopic] = useState("general");
  const [msgLen,  setMsgLen]  = useState(0);
  const MSG_MAX_HARD = 2000; // must match MAX_MESSAGE_LEN (lib/contactValidation.ts)

  // ── Recruiter fields: role, contract type, location, start date ──
  // Grouped in a <details> collapsed by default to keep the quick form short.
  // All optional; they are composed into the message body before sending (see
  // onSubmit), so no API, validation or database change is needed.
  const [role, setRole] = useState("");
  const [contract, setContract] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [startDate, setStartDate] = useState("");

  // The context prefix counts towards the server's 2000-character limit
  // (MAX_MESSAGE_LEN); without this, a message near the limit would fail with
  // message_too_long once the prefix is added.
  const intakePrefix = useMemo(() => {
    const lines: string[] = [];
    if (role.trim())      lines.push(`${t("contact.intake.roleLabel")}: ${role.trim()}`);
    if (contract)         lines.push(`${t("contact.intake.contractLabel")}: ${t(`contact.intake.contract.${contract}`)}`);
    if (workplace.trim()) lines.push(`${t("contact.intake.workplaceLabel")}: ${workplace.trim()}`);
    if (startDate)        lines.push(`${t("contact.intake.startLabel")}: ${t(`contact.intake.start.${startDate}`)}`);
    return lines.length > 0 ? `[${t("contact.intake.messagePrefixHeading")}]\n${lines.join("\n")}\n\n` : "";
  }, [role, contract, workplace, startDate, t]);

  // Room left for free text once the context prefix is reserved.
  const MSG_MAX = Math.max(200, MSG_MAX_HARD - intakePrefix.length);

  // `contact:prefill` (dispatched by TrackAwareServices) prefills the topic and
  // subject when a visitor clicks "Discuss this" on a service card.
  useEffect(() => {
    function handlePrefill(e: Event) {
      const { topic: t } = (e as CustomEvent<{ topic: string }>).detail;
      if (t) setTopic(t);
    }
    window.addEventListener("contact:prefill", handlePrefill);
    return () => window.removeEventListener("contact:prefill", handlePrefill);
  }, []);

  // Live countdown: decrement every second, then return to idle (the reset
  // happens in the timer, not synchronously in the effect).
  useEffect(() => {
    if (status.kind !== "rate_limited") return;
    const timer = setTimeout(() => {
      const next = status.retryAfterSeconds - 1;
      setStatus(next > 0 ? { kind: "rate_limited", retryAfterSeconds: next } : { kind: "idle" });
    }, status.retryAfterSeconds > 0 ? 1000 : 0);
    return () => clearTimeout(timer);
  }, [status]);

  const cvUrl = `/cv/Aicha-Imene-DAHOUMANE-CV-${locale}-${track}.pdf`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "sending" });

    // Do not read the SyntheticEvent after an `await`: currentTarget can be
    // cleared by then. Keep a reference to the form element instead.
    const formEl = e.currentTarget;
    const form = new FormData(formEl);

    // Honeypot field (should stay empty)
    const company = String(form.get("company") || "");

    // Prefix the message with the role context (title/contract/location/date)
    // instead of extending the /api/contact schema. `intakePrefix` also bounds
    // maxMessageLen above, so both stay consistent.
    const rawMessage = String(form.get("message") || "");
    const message = `${intakePrefix}${rawMessage}`;

    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      topic: String(form.get("topic") || "general"),
      message,
      // Explicit GDPR consent (required)
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

        // rate_limited: show a countdown with the exact delay from the API
        if (code === "rate_limited") {
          const retryAfter =
            typeof data?.retryAfterSeconds === "number" && data.retryAfterSeconds > 0
              ? data.retryAfterSeconds
              : 60; // default to 60s when missing
          setStatus({ kind: "rate_limited", retryAfterSeconds: retryAfter });
          return;
        }

        const msg = t(errorToKey(code));
        throw new Error(msg);
      }

      // Reset the form (uncontrolled fields) and the controlled state.
      formEl.reset();
      setTopic("general");
      setRole("");
      setContract("");
      setWorkplace("");
      setStartDate("");
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
            className="mt-2 w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-slate-900 dark:text-white outline-hidden focus:border-cyan-400/40 soft-ring"
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
            className="mt-2 w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-slate-900 dark:text-white outline-hidden focus:border-cyan-400/40 soft-ring"
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
            className="mt-2 w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-slate-900 dark:text-white outline-hidden focus:border-cyan-400/40 soft-ring scheme-light dark:scheme-dark"
          >
            <option value="general">{t("contact.topicGeneral")}</option>
            <option value="salesforce">{t("contact.topicSalesforce")}</option>
            <option value="itops">{t("contact.topicItOps")}</option>
            <option value="availability">{t("contact.topicAvailability")}</option>
            <option value="other">{t("contact.topicOther")}</option>
          </select>
        </div>

        <details className="group rounded-xl border border-black/10 dark:border-white/10 p-4">
          <summary className="cursor-pointer list-none rounded-sm soft-ring [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold">{t("contact.intake.title")}</span>
              <span aria-hidden="true" className="text-muted-2 transition-transform group-open:rotate-180">▾</span>
            </span>
            <span className="mt-0.5 block text-xs text-muted-2">{t("contact.intake.subtitle")}</span>
          </summary>
          <div className="mt-3 space-y-3">
            <div>
              <label htmlFor="contact-role" className="text-xs text-muted-2">{t("contact.intake.roleLabel")}</label>
              <input
                id="contact-role"
                autoComplete="off"
                maxLength={100}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-2 w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-slate-900 dark:text-white outline-hidden focus:border-cyan-400/40 soft-ring"
                placeholder={t("contact.intake.rolePlaceholder")}
              />
            </div>

            <div>
              <label htmlFor="contact-contract" className="text-xs text-muted-2">{t("contact.intake.contractLabel")}</label>
              <select
                id="contact-contract"
                autoComplete="off"
                value={contract}
                onChange={(e) => setContract(e.target.value)}
                className="mt-2 w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-slate-900 dark:text-white outline-hidden focus:border-cyan-400/40 soft-ring scheme-light dark:scheme-dark"
              >
                <option value="">{t("contact.intake.contractPlaceholder")}</option>
                {["permanent","fixedTerm","temp","portage","other"].map((key) => (
                  <option key={key} value={key}>{t(`contact.intake.contract.${key}`)}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="contact-workplace" className="text-xs text-muted-2">{t("contact.intake.workplaceLabel")}</label>
              <input
                id="contact-workplace"
                autoComplete="off"
                maxLength={80}
                value={workplace}
                onChange={(e) => setWorkplace(e.target.value)}
                className="mt-2 w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-slate-900 dark:text-white outline-hidden focus:border-cyan-400/40 soft-ring"
                placeholder={t("contact.intake.workplacePlaceholder")}
              />
            </div>

            <div>
              <label htmlFor="contact-start" className="text-xs text-muted-2">{t("contact.intake.startLabel")}</label>
              <select
                id="contact-start"
                autoComplete="off"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-2 w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-slate-900 dark:text-white outline-hidden focus:border-cyan-400/40 soft-ring scheme-light dark:scheme-dark"
              >
                <option value="">{t("contact.intake.startPlaceholder")}</option>
                {["asap","q1_2027","later","tbd"].map((key) => (
                  <option key={key} value={key}>{t(`contact.intake.start.${key}`)}</option>
                ))}
              </select>
            </div>
          </div>
        </details>

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
            className="mt-2 w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-slate-900 dark:text-white outline-hidden focus:border-cyan-400/40 soft-ring"
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
            className="mt-1 h-4 w-4 rounded-sm border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5"
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
              /* CSS spinner (Tailwind animate-spin) */
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
          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          {/* emerald-800 in light mode for 4.5:1 contrast on the tinted background */}
          <span className="text-sm text-emerald-800 dark:text-emerald-300">{t("contact.availability")}</span>
        </div>

        {/* Direct contact */}
        <div className="border-t border-black/10 pt-2 dark:border-white/10 space-y-3">
          <BookingLink />
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
