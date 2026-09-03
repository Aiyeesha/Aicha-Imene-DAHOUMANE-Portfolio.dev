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

// Origin guard (anti cross-site spam).
// A submission is accepted when its `Origin` header either matches the
// configured site origin (NEXT_PUBLIC_SITE_URL / SITE_URL) OR is same-origin
// with the host actually serving the request. The same-origin fallback matters
// because this project is served on several hostnames (`*.vercel.app` aliases,
// preview URLs, a future custom domain) and NEXT_PUBLIC_SITE_URL can only pin
// one — without it, a real form submission from any non-pinned host was 403'd.
// An Origin-less request (curl / server-side script) or a cross-site Origin is
// still rejected.
export function isAllowedOrigin(req: { headers: { get(name: string): string | null } }) {
  const origin = req.headers.get("origin") || "";
  if (!origin) return false; // no Origin at all → curl / direct script

  let originHost = "";
  try {
    originHost = new URL(origin).host.toLowerCase();
  } catch {
    return false; // malformed Origin
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "";
  let allowedOrigin = "";
  try {
    allowedOrigin = siteUrl ? new URL(siteUrl).origin : "";
  } catch {
    allowedOrigin = "";
  }
  if (allowedOrigin && origin === allowedOrigin) return true;

  // Same-origin: the browser's Origin host matches the host actually serving
  // this route (Vercel sets x-forwarded-host; `host` is the local fallback).
  const reqHost = (
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    ""
  ).toLowerCase();
  return Boolean(reqHost) && originHost === reqHost;
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
