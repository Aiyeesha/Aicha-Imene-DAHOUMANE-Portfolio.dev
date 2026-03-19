// app/api/testimonial-submit/route.ts
// ------------------------------------
// API Route POST — soumet un témoignage dans Supabase.
//
// Sécurité :
//   1. Token de soumission vérifié (TESTIMONIAL_SUBMIT_TOKEN)
//   2. Rate-limit : 3 soumissions / 24 h par IP (Upstash Redis)
//   3. Honeypot anti-spam (champ "website" doit être vide)
//   4. Validation des champs obligatoires (full_name, role, relation_type, message, locale)
//   5. Insertion via supabase admin (service_role) avec approved = false
//
// Variables d'environnement requises :
//   TESTIMONIAL_SUBMIT_TOKEN   — token secret partagé via lien (jamais NEXT_PUBLIC_)
//   SUPABASE_URL               — URL Supabase (non exposée côté client)
//   SUPABASE_SERVICE_KEY       — clé service_role (jamais NEXT_PUBLIC_)

import { NextRequest, NextResponse } from "next/server";
import { createHmac, createHash } from "crypto";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { testimonialRatelimit } from "@/lib/ratelimit";
import { headers } from "next/headers";

// ── Champs autorisés pour relation_type ──────────────────────────────────────
const VALID_RELATIONS = new Set([
  "colleague", "trainer", "jury", "classmate", "client", "other"
]);

export async function POST(req: NextRequest) {
  // ── 1. Rate-limit par IP ────────────────────────────────────────────────────
  const headersList = await headers();
  const ip =
    headersList.get("x-real-ip") ||
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  const { success: rateLimitOk } = await testimonialRatelimit.limit(ip);
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

  if (!validKeys.includes(submittedKey)) {
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
  const locale                = body.locale === "fr" ? "fr" : "en";

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

  // ── 6. Pseudonymisation de l'IP (RGPD) ──────────────────────────────────────
  // L'adresse IP est une donnée personnelle au sens RGPD. On la hache avec un sel
  // secret (IP_HASH_SALT) avant stockage pour permettre la déduplication (rate-limit
  // manuel, détection d'abus) sans stocker la valeur brute.
  // Si IP_HASH_SALT n'est pas défini, on utilise une chaîne vide — le hachage reste
  // irréversible mais sans sel, ce qui est acceptable pour un cas d'usage à faible
  // volumétrie. Ajouter IP_HASH_SALT en variable d'environnement est recommandé.
  const ipHashSalt = process.env.IP_HASH_SALT ?? "";
  const ipHash = createHash("sha256")
    .update(ip + ipHashSalt)
    .digest("hex");

  // ── 7. Insertion Supabase (service_role — contourne le RLS) ─────────────────
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.from("testimonial_submissions").insert({
    full_name,
    role,
    company:               company || null,
    relation_type,
    collaboration_context,
    message,
    photo_url,
    locale,
    approved:              false,    // toujours false — modération manuelle
    submitted_ip:          ipHash,   // hash SHA-256 + sel — jamais l'IP brute
  });

  if (error) {
    console.error("[testimonial-submit] Supabase error:", error.message);
    return NextResponse.json({ error: "Database error. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
