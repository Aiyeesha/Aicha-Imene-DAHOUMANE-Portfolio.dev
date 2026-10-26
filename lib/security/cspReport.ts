// lib/security/cspReport.ts
// -------------------------
// Normalise les deux formats de rapport CSP reçus par /api/csp-report.
//
// - CSP Level 2 (report-uri) : objet { "csp-report": { "blocked-uri", … } },
//   envoyé par Firefox et Safari ;
// - Reporting API (report-to / Reporting-Endpoints) : tableau
//   [{ type: "csp-violation", body: { blockedURL, effectiveDirective, … } }],
//   envoyé par Chrome et Edge.
//
// Audit du 2026-10-25 (constat 11) : seul le premier format était lu. Les
// rapports Chrome/Edge — la majorité des visiteurs — arrivaient sous forme de
// tableau, n'exposaient aucun champ attendu et étaient écartés comme « faux
// positifs » (blocked-uri vide), sans trace.

export type CspReport = {
  blockedUri: string;
  violatedDirective: string;
  documentUri: string;
  referrer: string;
  originalPolicy: string | undefined;
  /** "report" = politique report-only (champ disposition de la Reporting API). */
  disposition: "enforce" | "report" | undefined;
};

/** Plafond de rapports traités par requête (un lot Reporting API peut en contenir plusieurs). */
export const MAX_REPORTS_PER_REQUEST = 10;

type Raw = Record<string, unknown>;

const str = (v: unknown): string => (typeof v === "string" ? v : "");

function fromLevel2(r: Raw): CspReport {
  return {
    blockedUri:        str(r["blocked-uri"] ?? r["blockedURI"]),
    violatedDirective: str(r["violated-directive"] ?? r["effective-directive"] ?? r["violatedDirective"]),
    documentUri:       str(r["document-uri"] ?? r["documentURL"]),
    referrer:          str(r["referrer"]),
    originalPolicy:    str(r["original-policy"] ?? r["originalPolicy"]) || undefined,
    disposition:       r["disposition"] === "report" ? "report" : r["disposition"] === "enforce" ? "enforce" : undefined,
  };
}

function fromReportingApi(b: Raw): CspReport {
  return {
    blockedUri:        str(b["blockedURL"]),
    violatedDirective: str(b["effectiveDirective"] ?? b["violatedDirective"]),
    documentUri:       str(b["documentURL"]),
    referrer:          str(b["referrer"]),
    originalPolicy:    str(b["originalPolicy"]) || undefined,
    disposition:       b["disposition"] === "report" ? "report" : b["disposition"] === "enforce" ? "enforce" : undefined,
  };
}

const isObject = (v: unknown): v is Raw => typeof v === "object" && v !== null && !Array.isArray(v);

/** Extrait les rapports CSP d'un corps JSON, quel que soit son format. */
export function parseCspReports(body: unknown): CspReport[] {
  if (Array.isArray(body)) {
    return body
      .filter((entry): entry is Raw => isObject(entry) && entry["type"] === "csp-violation" && isObject(entry["body"]))
      .slice(0, MAX_REPORTS_PER_REQUEST)
      .map((entry) => fromReportingApi(entry["body"] as Raw));
  }
  if (isObject(body)) {
    const inner = body["csp-report"];
    return [fromLevel2(isObject(inner) ? inner : body)];
  }
  return [];
}
