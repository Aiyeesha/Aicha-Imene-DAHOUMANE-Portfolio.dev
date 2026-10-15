// lib/booking.ts
// --------------
// Lien public de la page de réservation Proton Calendar (prise de rendez-vous).
//
// Simple lien ouvert dans un nouvel onglet : aucun script ni iframe tiers sur
// le site, donc aucune exception dans la CSP (remplace Calendly — audit du
// 2026-10-14, S4). Proton ne propose pas de widget intégrable.
//
// Variable : NEXT_PUBLIC_BOOKING_URL, de la forme
//   https://calendar.proton.me/bookings#<identifiant>
// Le fragment (#…) fait partie du lien Proton : sanitizeUrl() le conserve.
// Seules les URL HTTPS sont acceptées ; sinon les boutons de réservation sont
// masqués (chaîne vide).
//
// Valeur par défaut : le lien public de la page de réservation. Ce n'est pas un
// secret — il est affiché à tous les visiteurs —, il peut donc vivre dans le
// code ; la variable d'environnement reste prioritaire si elle est définie.

import { sanitizeUrl } from "@/lib/social";

const DEFAULT_BOOKING_URL =
  "https://calendar.proton.me/bookings#s9UABsFvjOQAlEeEdM8f45R16x5UT8NsuzpoClQ2n1M=";

const raw = sanitizeUrl(process.env.NEXT_PUBLIC_BOOKING_URL || DEFAULT_BOOKING_URL);

export const BOOKING_URL = raw.startsWith("https://") ? raw : "";
