export type TocItem = {
  depth: 2 | 3;
  text: string;
  id: string;
};

/**
 * Very small slugify helper.
 * - lowercases
 * - removes non-alphanumeric (keeps dash)
 * - collapses dashes
 */
export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[`"'().,:!?]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Extract headings (## and ###) from MDX/Markdown source.
 * We skip fenced code blocks to avoid false positives.
 */
export function extractToc(source: string): TocItem[] {
  const lines = source.split(/\r?\n/);
  const out: TocItem[] = [];

  let inFence = false;

  for (const line of lines) {
    const fence = line.trim().startsWith("```");
    if (fence) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const m2 = line.match(/^##\s+(.+)$/);
    const m3 = line.match(/^###\s+(.+)$/);

    if (m2) {
      const text = m2[1].trim();
      out.push({ depth: 2, text, id: slugify(text) });
    } else if (m3) {
      const text = m3[1].trim();
      out.push({ depth: 3, text, id: slugify(text) });
    }
  }

  return out;
}
