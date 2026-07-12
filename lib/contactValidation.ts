// lib/contactValidation.ts
// -------------------------
// Logique de validation du formulaire de contact, extraite de
// app/api/contact/route.ts pour être testable sans dépendre de next/server
// (NextResponse a besoin du global Request, absent de l'environnement Jest/jsdom).

import { z } from "zod";

const emailSchema = z.string().email();

export const MAX_NAME_LEN = 80;
export const MAX_EMAIL_LEN = 254;
export const MAX_MESSAGE_LEN = 2000;
export const MIN_MESSAGE_LEN = 10;
export const MAX_LINKS_IN_MESSAGE = 3;

export const ALLOWED_TOPICS = new Set(["general", "salesforce", "itops", "availability", "other"]);

export function validate({
  name,
  email,
  message,
  topic,
  acceptedPolicy,
}: {
  name: string;
  email: string;
  message: string;
  topic: string;
  acceptedPolicy: boolean;
}) {
  if (!acceptedPolicy) return "policy_not_accepted";

  if (name.length < 2) return "name_too_short";
  if (name.length > MAX_NAME_LEN) return "name_too_long";

  if (email.length > MAX_EMAIL_LEN) return "email_too_long";
  if (!emailSchema.safeParse(email).success) return "invalid_email";

  if (!ALLOWED_TOPICS.has(topic)) return "invalid_topic";

  if (message.length < MIN_MESSAGE_LEN) return "message_too_short";
  if (message.length > MAX_MESSAGE_LEN) return "message_too_long";

  const linkCount = (message.match(/https?:\/\//g) || []).length;
  if (linkCount > MAX_LINKS_IN_MESSAGE) return "too_many_links";

  return null;
}

// x-real-ip is injected by Vercel's edge — cannot be spoofed by the client.
// x-forwarded-for is attacker-controlled (any value can be prepended),
// so it is used only as a last-resort fallback.
export function getClientIp(req: { headers: { get(name: string): string | null } }) {
  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}
