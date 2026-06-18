// app/api/csp-report/route.ts
// ---------------------------
// Récepteur de rapports de violation CSP (actifs) et CSPO (report-only).
// Les navigateurs envoient un POST JSON quand une ressource est bloquée (CSP)
// ou détectée (CSPO) par la Content-Security-Policy.
//
// Deux modes :
//   - POST /api/csp-report       → violation CSP active (bloquée)
//   - POST /api/csp-report?ro=1  → violation CSPO Trusted Types (report-only)
//
// Format W3C CSP Level 2 :
//   { "csp-report": { "violated-directive": "…", "blocked-uri": "…", … } }
//
// SÉCURITÉ (rate-limiting) :
//   Upstash Redis sliding window (20 req/60 s / IP) — robuste aux cold-starts
//   serverless (contrairement à un compteur in-memory).

import { type NextRequest, NextResponse } from "next/server";
import { cspAlertRatelimit, cspReportRatelimit, safeLimit } from "@/lib/ratelimit";

export const dynamic = "force-dynamic";

// ── Faux positifs connus ─────────────────────────────────────────────────────
// Les extensions navigateur génèrent des violations CSP légitimes dans leur
// propre contexte. Ces rapports ne reflètent PAS une vulnérabilité du site —
// les ignorer évite le bruit dans les logs et préserve les invocations Vercel.
const FALSE_POSITIVE_PREFIXES = [
  "chrome-extension://",
  "moz-extension://",
  "safari-extension://",
  "safari-web-extension://",
  "ms-browser-extension://",
  "edge-extension://",
];

// URI "vide" renvoyée par certains navigateurs pour les inline scripts bloqués.
// "(null)" est l'encodage textuel de l'URI null dans les rapports CSP Level 2.
const FALSE_POSITIVE_EXACT = new Set(["", "(null)", "about:blank", "data:"]);

function isFalsePositive(blockedUri: string | undefined): boolean {
  if (!blockedUri) return true;
  if (FALSE_POSITIVE_EXACT.has(blockedUri)) return true;
  return FALSE_POSITIVE_PREFIXES.some((prefix) => blockedUri.startsWith(prefix));
}

// ── Classification par sévérité ───────────────────────────────────────────────
// Les violations script-src sont les plus critiques (exécution de code).
// Les violations img-src ou font-src sont bénignes (chargement de ressource).
function getSeverity(violatedDirective: string | undefined): "critical" | "high" | "medium" | "low" {
  if (!violatedDirective) return "low";
  const directive = violatedDirective.split(" ")[0]; // ex: "script-src-elem" → "script-src-elem"
  if (directive.startsWith("script-src") || directive === "require-trusted-types-for") return "critical";
  if (directive === "object-src" || directive === "base-uri" || directive === "form-action") return "high";
  if (directive.startsWith("connect-src") || directive.startsWith("frame-src")) return "medium";
  return "low";
}

// ── Alerte webhook sur violation critique ─────────────────────────────────
// Non bloquant — une erreur ici ne doit jamais faire échouer la réponse 204.
// Rate-limité globalement (5/10 min) pour éviter le spam du webhook.
async function sendCriticalAlert(data: {
  violatedDirective: string;
  blockedUri: string;
  documentUri: string;
}) {
  const webhookUrl = process.env.CSP_ALERT_WEBHOOK_URL;
  if (!webhookUrl) return;

  const { success } = await safeLimit(cspAlertRatelimit, "global");
  if (!success) return;

  const msg = `🚨 CSP Critical Violation\nDirective: ${data.violatedDirective}\nBlocked: ${data.blockedUri}\nDocument: ${data.documentUri}`;
  fetch(webhookUrl, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ content: msg, text: msg, message: msg }),
  }).catch((e) => console.warn("[CSP-VIOLATION] Alert webhook failed:", String(e)));
}

export async function POST(req: NextRequest) {
  // ── Déterminer si c'est un rapport report-only (CSPO) ────────────────────
  const { searchParams } = new URL(req.url);
  const isReportOnly = searchParams.get("ro") === "1";

  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const { success: rateLimitOk } = await safeLimit(cspReportRatelimit, ip);
  if (!rateLimitOk) {
    // 204 plutôt que 429 — le navigateur n'a pas besoin de savoir qu'il est limité
    return new NextResponse(null, { status: 204 });
  }

  try {
    const body = await req.json() as Record<string, unknown>;
    // CSP Level 2 encapsule le rapport dans "csp-report".
    // Certaines anciennes implémentations envoient les champs au niveau racine.
    const report = (body["csp-report"] ?? body) as Record<string, unknown>;

    const blockedUri        = String(report["blocked-uri"]        ?? report["blockedURI"]        ?? "");
    const violatedDirective = String(report["violated-directive"] ?? report["violatedDirective"] ?? "");
    const documentUri       = String(report["document-uri"]       ?? report["documentURL"]       ?? "");
    const referrer          = String(report["referrer"]           ?? "");

    // ── Filtrer les faux positifs silencieusement ─────────────────────────
    // Pas de log pour éviter le bruit — les extensions navigateur génèrent
    // de nombreux rapports sans rapport avec une vulnérabilité du site.
    if (isFalsePositive(blockedUri)) {
      return new NextResponse(null, { status: 204 });
    }

    const severity = getSeverity(violatedDirective);

    // ── Log structuré → Vercel Runtime Logs ──────────────────────────────
    // Préfixe [CSP-VIOLATION] ou [CSPO-VIOLATION] pour filtrer facilement
    // dans Vercel Runtime Logs / un outil d'observabilité (Axiom, etc.)
    const prefix = isReportOnly ? "[CSPO-VIOLATION]" : "[CSP-VIOLATION]";

    console.warn(prefix, JSON.stringify({
      severity,
      report_only:        isReportOnly,
      blocked_uri:        blockedUri,
      violated_directive: violatedDirective,
      document_uri:       documentUri,
      referrer:           referrer || undefined,
      original_policy:    report["original-policy"] ?? report["originalPolicy"] ?? undefined,
    }));

    // ── Alerte webhook pour les violations critiques (hors report-only) ──
    // Les violations report-only ne sont pas bloquées — pas encore actives.
    // Les violations actives sur script-src ou require-trusted-types-for
    // signalent une injection potentielle ou une régression CSP.
    if (severity === "critical" && !isReportOnly) {
      await sendCriticalAlert({ violatedDirective, blockedUri, documentUri });
    }
  } catch {
    // Corps mal formé — ignorer silencieusement
  }

  // 204 No Content — le navigateur n'attend pas de corps
  return new NextResponse(null, { status: 204 });
}
