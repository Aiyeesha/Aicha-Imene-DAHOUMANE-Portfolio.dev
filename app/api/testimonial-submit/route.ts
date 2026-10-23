// app/api/testimonial-submit/route.ts
// ------------------------------------
// API Route POST — transmet un témoignage par e-mail via Formhook, comme le
// formulaire de contact (app/api/contact/route.ts) : rien n'est stocké côté
// serveur, la modération se fait à la lecture de l'e-mail.
//
// Sécurité :
//   1. Token de soumission vérifié (TESTIMONIAL_SUBMIT_TOKEN)
//   2. Rate-limit : 3 soumissions / 24 h par IP (Upstash Redis)
//   3. Honeypot anti-spam (champ "website" doit être vide)
//   4. Validation des champs obligatoires (full_name, role, relation_type, message, locale)
//   5. Envoi à Formhook (même endpoint et même jeton que le formulaire de contact)
//
// Variables d'environnement requises :
//   TESTIMONIAL_SUBMIT_TOKEN   — token secret partagé via lien (jamais NEXT_PUBLIC_)
//   FORMHOOK_ENDPOINT          — URL du formulaire Formhook (partagée avec /api/contact)
//   FORMHOOK_AUTH_TOKEN        — jeton serveur à serveur Formhook (optionnel)

import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { testimonialRatelimit, safeLimit } from "@/lib/ratelimit";
import { log } from "@/lib/logger";
import { headers } from "next/headers";

// ── Champs autorisés pour relation_type ──────────────────────────────────────
const VALID_RELATIONS = new Set([
  "colleague", "trainer", "jury", "classmate", "client", "other"
]);

const FORMHOOK_ENDPOINT = process.env.FORMHOOK_ENDPOINT || "";
// Server-to-server submissions are rejected by Formhook unless this header is
// present — same token as the contact form.
const FORMHOOK_AUTH_TOKEN = process.env.FORMHOOK_AUTH_TOKEN || "";

export async function POST(req: NextRequest) {
  // ── 1. Rate-limit par IP ────────────────────────────────────────────────────
  const headersList = await headers();
  const ip =
    headersList.get("x-real-ip") ||
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  const { success: rateLimitOk } = await safeLimit(testimonialRatelimit, ip);
  if (!rateLimitOk) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  // ── 2. Parse du body JSON ───────────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // ── 3. Honeypot anti-bot (champ "website" doit être absent ou vide) ─────────
  if (body.website) {
    // Bot détecté — répondre 200 pour ne pas le signaler
    return NextResponse.json({ ok: true });
  }

  // ── 4. Validation de la clé de session HMAC ─────────────────────────────────
  // La page serveur génère un HMAC(token, bucket_30min) et le passe au client.
  // On revalide ici en recalculant le HMAC pour le bucket courant ET le précédent
  // (pour absorber les requêtes à cheval sur une frontière de 30 min).
  // Le token brut n'est jamais exposé côté client.
  const expectedToken = process.env.TESTIMONIAL_SUBMIT_TOKEN;
  const submittedKey  = typeof body.sessionKey === "string" ? body.sessionKey.trim() : "";

  if (!expectedToken || !submittedKey) {
    return NextResponse.json(
      { error: "Invalid or missing access token." },
      { status: 403 }
    );
  }

  const now        = Math.floor(Date.now() / (30 * 60 * 1000));
  const validKeys  = [now, now - 1].map((bucket) =>
    createHmac("sha256", expectedToken).update(bucket.toString()).digest("hex")
  );

  // Comparaison timing-safe — toujours évaluer les deux clés (pas de court-circuit)
  // HMAC-SHA256 produit 32 octets = 64 hex chars ; toute autre longueur est invalide.
  const HMAC_HEX_LEN = 64;
  const submittedBuf = Buffer.from(submittedKey, "utf8");
  const [key0Buf, key1Buf] = validKeys.map((k) => Buffer.from(k, "utf8"));
  const lenOk  = submittedBuf.length === HMAC_HEX_LEN;
  const match0 = lenOk && timingSafeEqual(submittedBuf, key0Buf);
  const match1 = lenOk && timingSafeEqual(submittedBuf, key1Buf);

  if (!(match0 || match1)) {
    return NextResponse.json(
      { error: "Invalid or missing access token." },
      { status: 403 }
    );
  }

  // ── 5. Validation des champs obligatoires ───────────────────────────────────
  const full_name             = typeof body.full_name === "string" ? body.full_name.trim() : "";
  const role                  = typeof body.role === "string" ? body.role.trim() : "";
  const company               = typeof body.company === "string" ? body.company.trim() : null;
  const relation_type         = typeof body.relation_type === "string" ? body.relation_type.trim() : "";
  const collaboration_context = typeof body.collaboration_context === "string"
    ? body.collaboration_context.trim() || null
    : null;
  const message               = typeof body.message === "string" ? body.message.trim() : "";
  const photo_url             = typeof body.photo_url === "string" ? body.photo_url.trim() || null : null;
  const locale                = body.locale === "fr" ? "fr" : body.locale === "es" ? "es" : "en";

  if (!full_name)                         return NextResponse.json({ error: "Name is required." }, { status: 400 });
  if (!role)                              return NextResponse.json({ error: "Role is required." }, { status: 400 });
  if (!VALID_RELATIONS.has(relation_type)) return NextResponse.json({ error: "Invalid relation type." }, { status: 400 });
  if (message.length < 20)               return NextResponse.json({ error: "Message too short (20 chars min)." }, { status: 400 });
  if (message.length > 2000)             return NextResponse.json({ error: "Message too long (2000 chars max)." }, { status: 400 });

  // Valider photo_url : doit être une URL http/https valide ou null.
  // Sans cette validation, un attaquant pourrait injecter une URL javascript:
  // (XSS si rendue sans sanitisation) ou une URL de tracking arbitraire
  // (fuite d'IP lors de l'affichage). On accepte uniquement http/https.
  if (photo_url) {
    try {
      const parsed = new URL(photo_url);
      if (!["http:", "https:"].includes(parsed.protocol)) {
        return NextResponse.json({ error: "Invalid photo URL protocol." }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid photo URL format." }, { status: 400 });
    }
  }

  // ── 6. Envoi par e-mail via Formhook ────────────────────────────────────────
  // Aucune persistance : ni le témoignage ni l'IP ne sont stockés côté serveur.
  if (FORMHOOK_ENDPOINT) {
    const resp = await fetch(FORMHOOK_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(FORMHOOK_AUTH_TOKEN ? { "X-Auth-Token": FORMHOOK_AUTH_TOKEN } : {}),
      },
      body: JSON.stringify({
        name: full_name,
        topic: "testimonial",
        subject: `Nouveau témoignage — ${full_name}`,
        role,
        company: company || "",
        relation_type,
        collaboration_context: collaboration_context || "",
        message,
        photo_url: photo_url || "",
        locale,
        source: "Aicha-Imene-DAHOUMANE-Portfolio.dev",
      }),
    });

    if (!resp.ok) {
      const data = (await resp.json().catch(() => null)) as Record<string, unknown> | null;
      log.error("testimonial/formhook-failed", { status: resp.status, body: data });
      return NextResponse.json({ error: "Delivery failed. Please try again." }, { status: 502 });
    }

    log.info("testimonial/sent-via-formhook", { relation_type, locale });
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  // Dev fallback — log uniquement le type de relation, pas de PII
  log.info("testimonial/received", { relation_type, locale });
  return NextResponse.json({ ok: true }, { status: 201 });
}
