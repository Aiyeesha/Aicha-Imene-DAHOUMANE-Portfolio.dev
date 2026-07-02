# messages/es.json — status: structural skeleton only

`messages/es.json` is **not** a real Spanish translation yet.

- Keys and hierarchy: copied exactly from `messages/en.json`.
- Values: the current English strings, copied as-is (no machine or human translation applied).

This file exists so the i18n infrastructure (message loading, type inference, tooling)
can be prepared ahead of time for a future Spanish locale, without shipping any
user-facing Spanish content yet.

## Do not activate "es" yet

`i18n/routing.ts` intentionally does **not** include `"es"` in `routing.locales`.
Do not add it until `messages/es.json` has been:

1. Actually translated into Spanish by a human (or reviewed machine translation), and
2. Proofread/reviewed for tone, accuracy, and correctness.

Activating `"es"` before that would make next-intl serve real `/es` pages in
production with unreviewed/English-fallback content, which hurts UX for
Spanish-speaking visitors and can create duplicate-content SEO issues.

See the comment above `routing.locales` in `i18n/routing.ts` for the exact
line to change once translation is complete.
