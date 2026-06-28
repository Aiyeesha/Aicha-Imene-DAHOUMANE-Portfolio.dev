"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Result = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  readingTime: number;
};

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function BlogSearchBar() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";

  const [query, setQuery]     = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen]       = useState(false);
  const containerRef          = useRef<HTMLDivElement>(null);
  const inputRef              = useRef<HTMLInputElement>(null);
  const abortRef              = useRef<AbortController | null>(null);

  const debouncedQuery = useDebounce(query, 250);

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
      setOpen(true);
    } catch {
      // aborted or network error — silently ignore
    } finally {
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => { search(debouncedQuery); }, [debouncedQuery, search]);

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
  const placeholder = isFr ? "Rechercher un article…" : "Search articles…";

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
          placeholder={placeholder}
          aria-label={placeholder}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-2"
        />
        {loading && (
          <span className="size-4 shrink-0 animate-spin rounded-full border-2 border-muted border-t-transparent" />
        )}
      </div>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-black/10 bg-[var(--bg)] shadow-lg dark:border-white/10"
        >
          {results.map((r) => (
            <Link
              key={r.slug}
              href={`/${locale}/blog/${r.slug}`}
              role="option"
              aria-selected="false"
              onClick={() => { setOpen(false); setQuery(""); }}
              className="block px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
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

      {open && results.length === 0 && query.length >= 2 && !loading && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border border-black/10 bg-[var(--bg)] px-4 py-3 shadow-lg dark:border-white/10">
          <p className="text-sm text-muted-2">
            {isFr ? <>Aucun résultat pour &laquo;&nbsp;</> : <>No results for &ldquo;</>}{query}{isFr ? <>&nbsp;&raquo;</> : <>&rdquo;</>}
          </p>
        </div>
      )}
    </div>
  );
}
