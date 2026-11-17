#!/usr/bin/env node
// scripts/tooling/audit-gate.mjs
// -------------------------------
// CI security gate on production dependencies: fails on any HIGH or CRITICAL
// advisory reported by `npm audit --omit=dev --omit=optional`, except the
// advisories listed in ALLOWED below.
//
// An exception is only for an advisory that has no patched release yet and is
// not exploitable here. It is written down with its reason and lapses on its
// own:
//   - after `expires` (the gate fails again and the entry must be reviewed);
//   - as soon as the package publishes a version above `lastVulnerable`
//     (the gate fails and asks for the upgrade).
// Any other advisory, or a new one on the same package, still fails the build.
//
// Usage: node scripts/tooling/audit-gate.mjs

import { execFileSync } from "node:child_process";

const ALLOWED = [
  {
    id: "GHSA-fc5q-39xc-vjpf",
    package: "picomatch",
    lastVulnerable: "4.0.7",
    expires: "2026-12-31",
    reason:
      "ReDoS through single-branch repeated extglobs. No patched release yet. " +
      "Pulled in by @parcel/watcher for the next-intl message extractor only: " +
      "the glob patterns come from the code, never from visitor input.",
  },
];

const BLOCKING = new Set(["high", "critical"]);

function run(cmd, args) {
  try {
    return execFileSync(cmd, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (err) {
    // npm audit exits non-zero when it finds vulnerabilities: keep its output.
    if (err.stdout) return err.stdout;
    throw err;
  }
}

/** Compares dotted versions numerically ("4.0.10" > "4.0.7"). */
function versionGt(a, b) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d !== 0) return d > 0;
  }
  return false;
}

const report = JSON.parse(run("npm", ["audit", "--json", "--omit=dev", "--omit=optional"]));
const vulns = report.vulnerabilities ?? {};

/** Advisory ids behind a vulnerability, following "via" package references. */
function advisoryIds(name, seen = new Set()) {
  if (seen.has(name)) return [];
  seen.add(name);
  const ids = [];
  for (const via of vulns[name]?.via ?? []) {
    if (typeof via === "string") ids.push(...advisoryIds(via, seen));
    else if (via.url) ids.push(via.url.split("/").pop());
  }
  return ids;
}

const today = new Date().toISOString().slice(0, 10);
const failures = [];
const excused = [];

// Exceptions that no longer hold make the gate fail by themselves.
const activeAllowed = new Set();
for (const entry of ALLOWED) {
  if (today > entry.expires) {
    failures.push(`${entry.id} (${entry.package}): exception expired on ${entry.expires}, review it.`);
    continue;
  }
  const latest = run("npm", ["view", entry.package, "version"]).trim();
  if (latest && versionGt(latest, entry.lastVulnerable)) {
    failures.push(
      `${entry.id} (${entry.package}): ${entry.package}@${latest} is out (last vulnerable: ${entry.lastVulnerable}). ` +
        "Upgrade it and remove the exception.",
    );
    continue;
  }
  activeAllowed.add(entry.id);
}

for (const [name, v] of Object.entries(vulns)) {
  if (!BLOCKING.has(v.severity)) continue;
  const ids = advisoryIds(name);
  if (ids.length > 0 && ids.every((id) => activeAllowed.has(id))) {
    excused.push(`${name} (${v.severity}) — ${[...new Set(ids)].join(", ")}`);
  } else {
    failures.push(`${name} (${v.severity}) — ${[...new Set(ids)].join(", ") || "no advisory id"}`);
  }
}

for (const line of excused) console.log(`Exception documentée : ${line}`);
if (failures.length > 0) {
  console.error("Audit de sécurité en échec :");
  for (const line of failures) console.error(` • ${line}`);
  process.exit(1);
}
console.log("Audit de sécurité : aucune vulnérabilité élevée ou critique non couverte.");
