// app/api/github-activity/route.ts
// ----------------------------------
// Proxy vers l'API publique de contributions GitHub.
// Source : github-contributions-api.jogruber.de (pas de token requis).
// Résultat mis en cache Redis 6 heures pour limiter les appels externes.

import { NextResponse }  from "next/server";
import { cacheGetOrSet } from "@/lib/cache";

const GITHUB_USERNAME = "Aiyeesha";
const SOURCE_URL      = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;
const CACHE_KEY       = "portfolio:github:activity";
const CACHE_TTL       = 6 * 60 * 60; // 6 heures en secondes

export type ContributionDay = {
  date:  string; // "YYYY-MM-DD"
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // 0 = aucune contribution, 4 = maximum
};

export type GitHubActivityData = {
  total:         Record<string, number>; // { "2025": 142, "2026": 37 }
  contributions: ContributionDay[];
};

async function fetchFromGitHub(): Promise<GitHubActivityData> {
  const res = await fetch(SOURCE_URL, {
    headers: { "User-Agent": "portfolio-next/1.0" },
    next:    { revalidate: 0 }, // pas de cache Next.js — on gère via Redis
  });

  if (!res.ok) {
    throw new Error(`GitHub contributions API returned ${res.status}`);
  }

  return res.json() as Promise<GitHubActivityData>;
}

export async function GET() {
  try {
    const data = await cacheGetOrSet<GitHubActivityData>(
      CACHE_KEY,
      CACHE_TTL,
      fetchFromGitHub
    );

    return NextResponse.json(data, {
      headers: {
        // Cache public CDN 1 heure, revalidation SWR 6 heures
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=21600",
      },
    });
  } catch (err) {
    console.error("[github-activity]", err);
    return NextResponse.json(
      { error: "Failed to fetch GitHub activity" },
      { status: 502 }
    );
  }
}
