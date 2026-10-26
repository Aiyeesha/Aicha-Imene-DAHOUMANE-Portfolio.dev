// lib/booking.ts
// --------------
// Public Proton Calendar booking page link. A plain link in a new tab: no
// third-party script or iframe, so no CSP exception (Proton offers no
// embeddable widget).
//
// NEXT_PUBLIC_BOOKING_URL, like https://calendar.proton.me/bookings#<id>; the
// fragment is part of the Proton link and sanitizeUrl() keeps it. Only HTTPS
// URLs are accepted, otherwise booking buttons are hidden (empty string).
//
// The default is the public booking page link: not a secret (every visitor
// sees it), so it can live in the code; the env variable wins when set.

import { sanitizeUrl } from "@/lib/social";

const DEFAULT_BOOKING_URL =
  "https://calendar.proton.me/bookings#s9UABsFvjOQAlEeEdM8f45R16x5UT8NsuzpoClQ2n1M=";

const raw = sanitizeUrl(process.env.NEXT_PUBLIC_BOOKING_URL || DEFAULT_BOOKING_URL);

export const BOOKING_URL = raw.startsWith("https://") ? raw : "";
