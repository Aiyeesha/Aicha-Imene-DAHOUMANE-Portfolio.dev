# Project case studies (MDX)

Deep-dive case studies live here, one folder per project slug:

```
content/projects/<slug>/
  en.mdx
  fr.mdx
  es.mdx
```

Each file has YAML frontmatter (`title`, `heroSubtitle`) followed by the case
study body in Markdown/MDX. When a project has an MDX file, the detail page
(`app/[locale]/projects/[slug]/page.tsx`) renders it **instead of** the
structured `sections[]` in `content/projectDetails.ts`.

Projects without an MDX folder keep using `sections[]` — both paths coexist.

Images referenced from an MDX file use repo-local paths:
`/projects/<slug>/<file>` (committed under `public/projects/<slug>/`).

Detection logic: `lib/data/projectMdx.ts`. Rendering mirrors the blog
(`app/[locale]/blog/[slug]/page.tsx`) — a dynamic `import()` of the compiled
`.mdx` module.
