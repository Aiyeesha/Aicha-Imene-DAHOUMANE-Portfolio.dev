"use client";

import { useTranslations } from "next-intl";

/**
 * ContactQuickLinks
 * -----------------
 * Small card used on the Home page to provide quick contact links.
 *
 * Configure:
 * - NEXT_PUBLIC_CONTACT_EMAIL
 * - NEXT_PUBLIC_LINKEDIN_URL
 * - NEXT_PUBLIC_CV_PDF_URL (preferred)
 * - NEXT_PUBLIC_CV_URL
 */
export default function ContactQuickLinks() {
  const t = useTranslations();

  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
  const linkedIn = process.env.NEXT_PUBLIC_LINKEDIN_URL || "";
  const linkedInHref = linkedIn
    ? (linkedIn.startsWith("http") ? linkedIn : `https://${linkedIn}`)
    : "";
  const cvUrl =
    process.env.NEXT_PUBLIC_CV_PDF_URL ||
    process.env.NEXT_PUBLIC_CV_URL ||
    "/cv.pdf";

  return (
    <div className="card p-6">
      <h3 className="font-semibold">{t("contact.homeMethodsTitle")}</h3>
      <p className="mt-2 text-muted text-sm">{t("contact.homeIntro")}</p>

      <div className="mt-4 flex flex-wrap gap-3">
        <a
          className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring"
          href={email ? `mailto:${email}` : "#"}
          aria-disabled={!email}
          onClick={(e) => {
            if (!email) e.preventDefault();
          }}
          title={!email ? t("contact.emailMissing") : undefined}
        >
          {t("contact.homeEmail")}
        </a>

        <a
          className="rounded-full border border-black/10 bg-black/5 px-5 py-2 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring"
          href={linkedInHref || "#"}
          target="_blank"
          rel="noreferrer"
          aria-disabled={!linkedInHref}
          onClick={(e) => {
            if (!linkedInHref) e.preventDefault();
          }}
          title={!linkedInHref ? t(process.env.NODE_ENV === "production" ? "contact.linkedInMissing" : "contact.envHint") : undefined}
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
  );
}
