// lib/security/cspReport.ts
// -------------------------
// Normalises the two CSP report formats received by /api/csp-report:
// - CSP Level 2 (report-uri): { "csp-report": { "blocked-uri", … } }, sent by
//   Firefox and Safari;
// - Reporting API (report-to / Reporting-Endpoints):
//   [{ type: "csp-violation", body: { blockedURL, effectiveDirective, … } }],
//   sent by Chrome and Edge (most visitors).

export type CspReport = {
  blockedUri: string;
  violatedDirective: string;
  documentUri: string;
  referrer: string;
  originalPolicy: string | undefined;
  /** "report" = report-only policy (Reporting API disposition field). */
  disposition: "enforce" | "report" | undefined;
};

/** Maximum reports handled per request (a Reporting API batch can hold several). */
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

/** Extracts CSP reports from a JSON body, whatever its format. */
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
