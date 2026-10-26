"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

type Result = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  readingTime: number;
};

export default function BlogSearchBar() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";

  const [query, setQuery]     = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen]       = useState(false);
  // Option active du motif combobox (WAI-ARIA 1.2) — audit 2026-10-25 : la
  // liste déclarait listbox/option sans aria-expanded, sans flèches ni Échap,
  // et le nombre de résultats n'était pas annoncé. -1 = aucune.
  const [active, setActive]   = useState(-1);
  const router                = useRouter();
  const listboxId             = useId();
  const optionId              = (i: number) => `${listboxId}-opt-${i}`;
  const containerRef          = useRef<HTMLDivElement>(null);
  const inputRef              = useRef<HTMLInputElement>(null);
  const abortRef              = useRef<AbortController | null>(null);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); setOpen(false); return; }
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setLoading(true);
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(q)}&locale=${locale}`,
        { signal: abortRef.current.signal }
      );
      const data = await res.json();
      setResults(data.results ?? []);
      setActive(-1);
      setOpen(true);
    } catch {
      // aborted or network error — silently ignore
    } finally {
      setLoading(false);
    }
  }, [locale]);

  // Debounce : la recherche part du minuteur (250 ms après la dernière frappe),
  // et non d'un effet sur une valeur « debouncée » qui appelait des setState
  // de façon synchrone — audit 2026-10-23 (PERF-5). Comportement identique.
  useEffect(() => {
    const t = setTimeout(() => { search(query); }, 250);
    return () => clearTimeout(t);
  }, [query, search]);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isFr = locale === "fr";
  const isEs = locale === "es";
  const placeholder = isFr ? "Rechercher un article…" : isEs ? "Buscar un artículo…" : "Search articles…";

  const expanded = open && results.length > 0;

  // Annonce lue par les lecteurs d'écran (région aria-live ci-dessous).
  const status = !open || query.length < 2 || loading
    ? ""
    : results.length === 0
      ? (isFr ? "Aucun résultat" : isEs ? "Sin resultados" : "No results")
      : isFr
        ? `${results.length} résultat${results.length > 1 ? "s" : ""}, flèches haut et bas pour parcourir`
        : isEs
          ? `${results.length} resultado${results.length > 1 ? "s" : ""}, flechas arriba y abajo para recorrer`
          : `${results.length} result${results.length > 1 ? "s" : ""}, use up and down arrows to browse`;

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      if (results.length === 0) return;
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      if (results.length === 0) return;
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      if (expanded && active >= 0) {
        e.preventDefault();
        const target = results[active];
        setOpen(false);
        setQuery("");
        router.push(`/${locale}/blog/${target.slug}`);
      }
    } else if (e.key === "Escape") {
      // 1re pression : ferme la liste ; 2e : vide le champ (comportement natif).
      if (open) {
        e.preventDefault();
        setOpen(false);
        setActive(-1);
      }
    }
  };

  // Garde l'option active visible quand la liste défile.
  useEffect(() => {
    if (active < 0) return;
    document.getElementById(optionId(active))?.scrollIntoView({ block: "nearest" });
    // optionId dérive de listboxId, stable pour la durée du composant.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 dark:border-white/10 dark:bg-white/5 soft-ring">
        {/* Search icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-4 shrink-0 text-muted"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label={placeholder}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={expanded}
          aria-controls={listboxId}
          aria-activedescendant={expanded && active >= 0 ? optionId(active) : undefined}
          className="w-full bg-transparent text-sm outline-hidden placeholder:text-muted-2"
        />
        {loading && (
          <span className="size-4 shrink-0 animate-spin rounded-full border-2 border-muted border-t-transparent" />
        )}
      </div>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={isFr ? "Articles trouvés" : isEs ? "Artículos encontrados" : "Matching articles"}
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-black/10 bg-white shadow-lg dark:bg-[#0D1426] dark:border-white/10"
        >
          {results.map((r, i) => (
            <Link
              key={r.slug}
              id={optionId(i)}
              href={`/${locale}/blog/${r.slug}`}
              role="option"
              aria-selected={i === active}
              // Le focus reste dans le champ (aria-activedescendant) : les
              // options ne sont pas des arrêts de tabulation.
              tabIndex={-1}
              onClick={() => { setOpen(false); setQuery(""); }}
              onMouseEnter={() => setActive(i)}
              className={`block px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${i === active ? "bg-black/5 dark:bg-white/10" : ""}`}
            >
              <p className="text-sm font-medium leading-snug">{r.title}</p>
              <p className="mt-0.5 line-clamp-1 text-xs text-muted">{r.excerpt}</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {r.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-black/10 px-2 py-0.5 text-[11px] dark:bg-white/10"
                  >
                    {t}
                  </span>
                ))}
                <span className="rounded-full bg-black/5 px-2 py-0.5 text-[11px] text-muted-2 dark:bg-white/5">
                  {r.readingTime} min
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Nombre de résultats annoncé aux lecteurs d'écran */}
      <p className="sr-only" role="status" aria-live="polite">{status}</p>

      {open && results.length === 0 && query.length >= 2 && !loading && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-lg dark:bg-[#0D1426] dark:border-white/10">
          <p className="text-sm text-muted-2">
            {isFr ? <>Aucun résultat pour &laquo;&nbsp;</> : isEs ? <>Sin resultados para &laquo;&nbsp;</> : <>No results for &ldquo;</>}{query}{isFr ? <>&nbsp;&raquo;</> : isEs ? <>&nbsp;&raquo;</> : <>&rdquo;</>}
          </p>
        </div>
      )}
    </div>
  );
}
