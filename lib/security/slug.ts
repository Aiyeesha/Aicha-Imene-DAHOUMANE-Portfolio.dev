// lib/security/slug.ts
// --------------------
// Strict slug validation (blog posts, projects). A legitimate slug is always
// lowercase ASCII kebab-case (e.g. "flow-orchestration-patterns"); anything
// else (newlines, "/", "..", "<", ":"…) is rejected, which:
//   - prevents fake log lines (CodeQL js/log-injection);
//   - keeps an unexpected file name in content/blog/posts out of hrefs
//     (CodeQL js/stored-xss);
//   - blocks directory traversal in path.join().
// The maximum length (100) is far above real slugs and bounds the regex cost.

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SLUG_MAX_LENGTH = 100;

export function isValidSlug(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= SLUG_MAX_LENGTH &&
    SLUG_RE.test(value)
  );
}
