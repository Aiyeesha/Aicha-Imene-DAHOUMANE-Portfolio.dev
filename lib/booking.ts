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

import { sanitizeUrl } from "@/lib/social";

const raw = sanitizeUrl(process.env.NEXT_PUBLIC_BOOKING_URL);

export const BOOKING_URL = raw.startsWith("https://") ? raw : "";
