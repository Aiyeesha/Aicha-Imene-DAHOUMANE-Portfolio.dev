// components/BookingLink.tsx
// --------------------------
// "Book a call" button: Proton Calendar booking page in a new tab (see
// lib/booking.ts). Renders nothing when NEXT_PUBLIC_BOOKING_URL is not set.
//
// Variants:
//   "contact" (default): full-width button in the contact section
//   "hero"             : compact pill next to the hero CTAs
//   "plain"            : bare link, classes from the caller

import { useTranslations } from "next-intl";
import { BOOKING_URL } from "@/lib/booking";

type Props = {
  variant?: "contact" | "hero" | "plain";
  /** Custom label (otherwise translated per variant). */
  label?: string;
  className?: string;
};

export default function BookingLink({ variant = "contact", label, className }: Props) {
  const t = useTranslations();
  if (!BOOKING_URL) return null;

  // noopener: the new page gets no window.opener;
  // noreferrer: no portfolio URL is sent to Proton.
  const common = { href: BOOKING_URL, target: "_blank", rel: "noopener noreferrer" } as const;
  const newTab = t("contact.opensInNewTab");

  if (variant === "hero") {
    return (
      <a
        {...common}
        aria-label={`${label ?? t("cta.call15")} (${newTab})`}
        className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring transition-colors"
      >
        {label ?? t("cta.call15")} ↗
      </a>
    );
  }

  if (variant === "plain") {
    return (
      <a {...common} aria-label={`${label ?? t("contact.bookCall")} (${newTab})`} className={className}>
        {label ?? t("contact.bookCall")}
      </a>
    );
  }

  return (
    <a
      {...common}
      aria-label={`${label ?? t("contact.bookCall")} (${newTab})`}
      className="flex w-full items-center justify-between rounded-xl border border-black/10 dark:border-white/10
        bg-black/5 dark:bg-white/5 px-4 py-3 text-sm
        hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
    >
      <span>{label ?? t("contact.bookCall")}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}
