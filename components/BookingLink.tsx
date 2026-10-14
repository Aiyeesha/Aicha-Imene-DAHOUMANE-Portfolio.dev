// components/BookingLink.tsx
// --------------------------
// Bouton « Réserver un appel » : lien vers la page de réservation Proton
// Calendar, ouvert dans un nouvel onglet (voir lib/booking.ts).
// Ne rend rien si NEXT_PUBLIC_BOOKING_URL n'est pas configurée.
//
// Variantes :
//   "contact" (défaut) : bouton pleine largeur de la section contact
//   "hero"             : pastille compacte alignée avec les CTA du hero
//   "plain"            : lien nu, classes fournies par l'appelant

import { useTranslations } from "next-intl";
import { BOOKING_URL } from "@/lib/booking";

type Props = {
  variant?: "contact" | "hero" | "plain";
  /** Libellé personnalisé (sinon : traduction selon la variante). */
  label?: string;
  className?: string;
};

export default function BookingLink({ variant = "contact", label, className }: Props) {
  const t = useTranslations();
  if (!BOOKING_URL) return null;

  // noopener : la page ouverte n'accède pas à window.opener ;
  // noreferrer : aucune URL du portfolio transmise à Proton.
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
