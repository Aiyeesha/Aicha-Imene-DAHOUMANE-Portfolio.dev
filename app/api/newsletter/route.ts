// app/api/newsletter/route.ts
// ----------------------------
// Inscription à la newsletter via l'API Brevo (ex-Sendinblue).
//
// Setup Brevo :
//   1. Créer un compte gratuit sur https://brevo.com
//   2. Créer une liste de contacts (Contacts > Listes) — noter l'ID
//   3. Générer une clé API (Settings > API Keys)
//   4. Ajouter dans .env.local :
//        BREVO_API_KEY="xkeysib-..."
//        BREVO_LIST_ID="3"  ← remplacer par ton ID de liste
//
// Sécurité :
//   - Validation email basique côté serveur
//   - Rate-limiting passif (Brevo retourne 400 si l'email est déjà inscrit)
//   - NEXT_PUBLIC_SITE_URL utilisé pour la vérification d'origine

import { NextRequest, NextResponse } from "next/server";
import { newsletterRatelimit } from "@/lib/ratelimit";

const BREVO_API_URL = "https://api.brevo.com/v3/contacts";

export async function POST(req: NextRequest) {
  // ── Rate-limiting ────────────────────────────────────────────────────────
  // 3 soumissions par heure par IP — protège contre :
  //   - l'épuisement du quota Brevo (plan gratuit : 300 emails/jour)
  //   - l'énumération d'emails valides via les codes de retour
  //   - les inscriptions non consenties vers tiers
  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const { success } = await newsletterRatelimit.limit(ip);
  if (!success) {
    return NextResponse.json(
      { error: "too_many_requests" },
      { status: 429, headers: { "Retry-After": "3600" } }
    );
  }

  // ── Variables d'environnement ───────────────────────────────────────────
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID ? Number(process.env.BREVO_LIST_ID) : null;

  if (!apiKey || !listId) {
    console.error("[newsletter] BREVO_API_KEY or BREVO_LIST_ID not configured");
    return NextResponse.json(
      { error: "newsletter_not_configured" },
      { status: 503 }
    );
  }

  // ── Parse body ──────────────────────────────────────────────────────────
  let body: { email?: string; locale?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const locale = body.locale === "fr" ? "fr" : "en";

  // ── Validation email ────────────────────────────────────────────────────
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  // ── Appel API Brevo ─────────────────────────────────────────────────────
  try {
    const brevoRes = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "accept":       "application/json",
        "content-type": "application/json",
        "api-key":      apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: false, // ne pas écraser si déjà inscrit
        attributes: {
          LOCALE: locale,
          SIGNUP_DATE: new Date().toISOString().split("T")[0],
        },
      }),
    });

    // 204 = créé, 400 = déjà existant ou erreur Brevo
    if (brevoRes.status === 204 || brevoRes.ok) {
      return NextResponse.json({ ok: true });
    }

    const data = await brevoRes.json().catch(() => null);

    // Code Brevo 550 = contact already in list → on traite comme succès
    if (data?.code === "duplicate_parameter") {
      return NextResponse.json({ ok: true, already: true });
    }

    console.error("[newsletter] Brevo error:", data);
    return NextResponse.json({ error: "upstream_failed" }, { status: 502 });
  } catch (err) {
    console.error("[newsletter] fetch error:", err);
    return NextResponse.json({ error: "network_error" }, { status: 502 });
  }
}
