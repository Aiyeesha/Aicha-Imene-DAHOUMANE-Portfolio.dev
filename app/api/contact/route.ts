import { NextResponse } from "next/server";
import { contactRatelimit } from "@/lib/ratelimit";

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
  const xf = req.headers.get("x-forwarded-for") || "";
  // x-forwarded-for can be "ip, proxy1, proxy2"
  const ip = xf.split(",")[0]?.trim();
  return ip || "unknown";
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
  // Uses the anonymous key and relies on RLS policies to allow inserts.
  // If you prefer to bypass RLS, switch to a SERVICE_ROLE key kept server-side only.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    // We don't fail the request if Supabase isn't configured.
    // The contact message can still go to Formspree.
    console.warn("[CONTACT] Supabase env vars missing, skipping DB insert");
    return;
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

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
    console.error("[CONTACT] Supabase insert failed", error);
    // Non-blocking by default to avoid losing messages if DB policy is misconfigured.
    // If you want strict behaviour, throw new Error("supabase_failed");
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
  // Origin guard: in production, reject cross-origin requests if configured.
  // Note: some legitimate clients may omit the Origin header (rare for browsers on same-origin).
  if (process.env.NODE_ENV === "production" && ALLOWED_ORIGIN) {
    const origin = req.headers.get("origin") || "";
    if (origin && origin !== ALLOWED_ORIGIN) {
      return NextResponse.json({ ok: false, error: "forbidden_origin" }, { status: 403 });
    }
  }

  // --- Upstash Rate Limit ---
  // We keep it early to protect CPU, but you can move it after honeypot if you prefer.
  const ip = getClientIp(req);
  const identifier = `contact:ip:${ip}`;

  const rl = await contactRatelimit.limit(identifier);

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
      // Try parse Formspree error payload
      const data = (await resp.json().catch(() => null)) as any;
      console.error("[FORMSPREE_ERROR]", resp.status, data);

      // Map to a stable error code for UI
      // (We keep it generic; full details remain server-side)
      return NextResponse.json({ ok: false, error: "upstream_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Dev fallback
  // Avoid logging sensitive personal information (email/message). Log only the sender name.
  console.log("[CONTACT] Message received from", name);
  return NextResponse.json({ ok: true }, { status: 200 });
}