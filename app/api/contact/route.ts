import { NextResponse } from "next/server";
import { z } from "zod";
import { contactRatelimit, safeLimit } from "@/lib/ratelimit";
import { log } from "@/lib/logger";
import { validate, getClientIp, isAllowedOrigin } from "@/lib/contactValidation";

// Forme du corps (audit 2026-10-25) : un champ non textuel (nombre, objet)
// provoquait une erreur 500 sur .trim(), et subject n'était pas borné. Types
// et longueurs maximales sont vérifiés ici ; les règles métier (e-mail,
// liens, longueur minimale) restent dans lib/contactValidation.ts. Les bornes
// dépassent volontairement celles de validate() pour lui laisser renvoyer
// ses codes d'erreur précis (name_too_long, message_too_long…).
// .strict() : toute clé inconnue est refusée.
const payloadSchema = z
  .object({
    name: z.string().max(500).optional(),
    email: z.string().max(500).optional(),
    topic: z.string().max(50).optional(),
    subject: z.string().max(200).optional(),
    message: z.string().max(5000).optional(),
    /**
     * RGPD / privacy consent.
     * We require explicit consent before storing/forwarding the message.
     */
    acceptedPolicy: z.boolean().optional(),
    // Honeypot: should remain empty
    company: z.string().max(500).optional(),
    // Optional locale hint from the client ("fr" | "en" | "es")
    locale: z.string().max(10).optional(),
  })
  .strict();

// Délai maximal de l'appel à Formhook : sans lui, une lenteur amont gardait
// la fonction ouverte jusqu'au timeout de la plateforme.
const FORMHOOK_TIMEOUT_MS = 5000;

const FORMHOOK_ENDPOINT = process.env.FORMHOOK_ENDPOINT || "";
// Server-to-server submissions are rejected by Formhook unless this header is
// present — Origin-based allow-listing only covers browser <form> submissions.
const FORMHOOK_AUTH_TOKEN = process.env.FORMHOOK_AUTH_TOKEN || "";

/**
 * Contact API (Stage 7)
 * ---------------------
 * - Validates input
 * - Honeypot field ("company") anti-spam
 * - Rate limit (Upstash Redis, multi-instance safe)
 * - Forwards to Formhook (email delivery) — no server-side persistence:
 *   messages are received by email via Formhook, nothing is stored at rest.
 */
export async function POST(req: Request) {
  // Origin guard : en production, exiger un en-tête Origin qui corresponde soit à
  // l'origine configurée du site, soit à l'hôte qui sert réellement cette route
  // (voir isAllowedOrigin). Les navigateurs envoient toujours Origin sur les
  // POST cross-site ; les bots/scripts directs l'omettent souvent. Preview Vercel
  // exempté (URLs éphémères).
  const isPreview = process.env.VERCEL_ENV === "preview";
  if (!isPreview && process.env.NODE_ENV === "production" && !isAllowedOrigin(req)) {
    return NextResponse.json({ ok: false, error: "forbidden_origin" }, { status: 403 });
  }

  // Parse body early so the honeypot can fire before the rate limiter.
  // Honeypot-triggered requests shouldn't consume rate limit tokens: they're bots,
  // and the silent-200 lure should work even when Redis is unavailable.
  const raw = await req.json().catch(() => null);
  if (!raw) return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  const parsed = payloadSchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  const body = parsed.data;

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const topic = (body.topic || "general").trim();
  const subject = (body.subject || "").trim();
  const message = (body.message || "").trim();
  const company = (body.company || "").trim(); // honeypot
  const acceptedPolicy = Boolean(body.acceptedPolicy);
  const clientLocale = (body.locale || "").trim() || null;

  // Bot check — before rate limiter so bots don't consume tokens
  if (company) return NextResponse.json({ ok: true }, { status: 200 });

  // --- Upstash Rate Limit ---
  const ip = getClientIp(req);
  const identifier = `contact:ip:${ip}`;

  const rl = await safeLimit(contactRatelimit, identifier);

  if (!rl.success) {
    // rl.reset is typically a timestamp (ms). Compute retry-after defensively.
    const now = Date.now();
    const resetMs = typeof rl.reset === "number" ? rl.reset : now + 10_000;
    const retryAfterSeconds = Math.max(1, Math.ceil((resetMs - now) / 1000));

    return NextResponse.json(
      { ok: false, error: "rate_limited", retryAfterSeconds },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }
  // --- End Rate Limit ---

  const v = validate({ name, email, message, topic, acceptedPolicy });
  if (v) return NextResponse.json({ ok: false, error: v }, { status: 400 });

  // Forward to Formhook if configured
  if (FORMHOOK_ENDPOINT) {
    let resp: Response;
    try {
      resp = await fetch(FORMHOOK_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(FORMHOOK_AUTH_TOKEN ? { "X-Auth-Token": FORMHOOK_AUTH_TOKEN } : {}),
        },
        body: JSON.stringify({ name, email, topic, subject, message, source: "Aicha-Imene-DAHOUMANE-Portfolio.dev" }),
        signal: AbortSignal.timeout(FORMHOOK_TIMEOUT_MS),
      });
    } catch (err) {
      // Délai dépassé ou erreur réseau : même réponse qu'un échec amont.
      log.error("contact/formhook-unreachable", { error: err instanceof Error ? err.name : "unknown" });
      return NextResponse.json({ ok: false, error: "upstream_failed" }, { status: 502 });
    }

    if (!resp.ok) {
      const data = (await resp.json().catch(() => null)) as Record<string, unknown> | null;
      log.error("contact/formhook-failed", { status: resp.status, body: data });
      return NextResponse.json({ ok: false, error: "upstream_failed" }, { status: 502 });
    }

    log.info("contact/sent-via-formhook", { topic, locale: clientLocale });
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Dev fallback — log uniquement le topic, pas de PII
  log.info("contact/received", { topic, locale: clientLocale });
  return NextResponse.json({ ok: true }, { status: 200 });
}