import { NextResponse } from "next/server";
import { contactRatelimit, safeLimit } from "@/lib/ratelimit";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { log } from "@/lib/logger";

type Payload = {
  name: string;
  email: string;
  topic?: string;
  subject?: string;
  message: string;
  /**
   * RGPD / privacy consent.
   * We require explicit consent before storing/forwarding the message.
   */
  acceptedPolicy?: boolean;
  // Honeypot: should remain empty
  company?: string;
  // Optional locale hint from the client ("fr" | "en")
  locale?: string;
};

const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT || "";

// Basic origin guard (helps reduce cross-site spam).
// If NEXT_PUBLIC_SITE_URL is set in production, we only accept requests from that origin.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "";
const ALLOWED_ORIGIN = SITE_URL ? new URL(SITE_URL).origin : "";

const MAX_NAME_LEN = 80;
const MAX_EMAIL_LEN = 254;
const MAX_MESSAGE_LEN = 2000;
const MIN_MESSAGE_LEN = 10;
const MAX_LINKS_IN_MESSAGE = 3;

const ALLOWED_TOPICS = new Set(["general", "salesforce", "itops", "availability", "other"]);

function getClientIp(req: Request) {
  // x-real-ip is injected by Vercel's edge — cannot be spoofed by the client.
  // x-forwarded-for is attacker-controlled (any value can be prepended),
  // so it is used only as a last-resort fallback.
  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function validate({
  name,
  email,
  message,
  topic,
  acceptedPolicy
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
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "invalid_email";

  if (!ALLOWED_TOPICS.has(topic)) return "invalid_topic";

  if (message.length < MIN_MESSAGE_LEN) return "message_too_short";
  if (message.length > MAX_MESSAGE_LEN) return "message_too_long";

  const linkCount = (message.match(/https?:\/\//g) || []).length;
  if (linkCount > MAX_LINKS_IN_MESSAGE) return "too_many_links";

  return null;
}

async function saveToSupabase(input: {
  name: string;
  email: string;
  topic: string;
  subject?: string;
  message: string;
  ip?: string | null;
  userAgent?: string | null;
  locale?: string | null;
}) {
  // Utilise service_role (createAdminSupabaseClient) — contourne le RLS.
  // La table messages n'a plus de policy INSERT pour anon : l'insertion directe
  // via l'API REST Supabase avec la clé anon publique est donc bloquée.
  // Seule cette Route Handler (côté serveur) peut insérer des messages,
  // garantissant que honeypot, origin guard et rate-limiting sont toujours actifs.
  let supabase: ReturnType<typeof createAdminSupabaseClient>;
  try {
    supabase = createAdminSupabaseClient();
  } catch {
    log.warn("contact/admin-client-unavailable", { hint: "SUPABASE_SERVICE_ROLE_KEY missing" });
    return;
  }

  const { error } = await supabase.from("messages").insert({
    name: input.name,
    email: input.email,
    topic: input.topic,
    subject: input.subject ?? null,
    message: input.message,
    accepted_policy: true,
    ip: input.ip ?? null,
    user_agent: input.userAgent ?? null,
    locale: input.locale ?? null
  });

  if (error) {
    log.error("contact/supabase-insert-failed", { code: error.code, hint: error.hint });
  }
}

/**
 * Contact API (Stage 7)
 * ---------------------
 * - Validates input
 * - Honeypot field ("company") anti-spam
 * - Rate limit (Upstash Redis, multi-instance safe)
 * - If FORMSPREE_ENDPOINT is set, forwards to Formspree and maps errors
 */
export async function POST(req: Request) {
  // Origin guard strict : en production, exiger que l'en-tête Origin soit présent
  // et corresponde à l'origine du site. Les navigateurs envoient toujours Origin
  // sur les requêtes POST cross-site ; les bots automatisés l'omettent souvent.
  // Rejeter aussi les requêtes sans Origin pour bloquer curl/scripts directs.
  const isPreview = process.env.VERCEL_ENV === "preview";
  if (!isPreview && process.env.NODE_ENV === "production" && ALLOWED_ORIGIN) {
    const origin = req.headers.get("origin") || "";
    if (!origin || origin !== ALLOWED_ORIGIN) {
      return NextResponse.json({ ok: false, error: "forbidden_origin" }, { status: 403 });
    }
  }

  // --- Upstash Rate Limit ---
  // We keep it early to protect CPU, but you can move it after honeypot if you prefer.
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

  const body = (await req.json().catch(() => null)) as Payload | null;
  if (!body) return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const topic = String(body.topic || "general").trim();
  const subject = String(body.subject || "").trim();
  const message = (body.message || "").trim();
  const company = (body.company || "").trim(); // honeypot
  const acceptedPolicy = Boolean(body.acceptedPolicy);
  const clientLocale = String(body.locale || "").trim() || null;
  const userAgent = req.headers.get("user-agent") || null;

  // Bot check
  if (company) return NextResponse.json({ ok: true }, { status: 200 });

  const v = validate({ name, email, message, topic, acceptedPolicy });
  if (v) return NextResponse.json({ ok: false, error: v }, { status: 400 });

  // Store in Supabase first (non-blocking if Supabase env/policy isn't ready)
  await saveToSupabase({ name, email, topic, subject, message, ip, userAgent, locale: clientLocale });

  // Forward to Formspree if configured
  if (FORMSPREE_ENDPOINT) {
    const resp = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, topic, subject, message, source: "portfolio-next" })
    });

    if (!resp.ok) {
      const data = (await resp.json().catch(() => null)) as Record<string, unknown> | null;
      log.error("contact/formspree-failed", { status: resp.status, body: data });
      return NextResponse.json({ ok: false, error: "upstream_failed" }, { status: 502 });
    }

    log.info("contact/sent-via-formspree", { topic, locale: clientLocale });
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Dev fallback — log uniquement le topic, pas de PII
  log.info("contact/received", { topic, locale: clientLocale });
  return NextResponse.json({ ok: true }, { status: 200 });
}