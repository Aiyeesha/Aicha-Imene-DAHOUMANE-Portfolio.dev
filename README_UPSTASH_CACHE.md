# Upstash Redis cache (Next.js) — Setup

This patch adds:
- Upstash Redis client with **safe fallback** when env vars are missing.
- Generic cache helper (get-or-set) with TTL.
- Cached Supabase fetch for projects (`getPublishedProjectsWithAssetsCached`).
- Redis test endpoint: `/api/redis-test`
- Optional cache invalidation endpoint: `/api/cache/invalidate` (POST)

## 1) Install dependency
From the project root (where package.json is):
```bash
npm i @upstash/redis
```

## 2) Add env vars (LOCAL)
Copy `.env.local.example` to `.env.local` and set values:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Then restart:
```bash
npm run dev
```

## 3) Test Redis
Open:
- http://localhost:3000/api/redis-test

Expected JSON:
```json
{ "success": true, "value": "ok" }
```

## 4) Cache verification (MISS/HIT logs)
Open:
- http://localhost:3000/fr/projects-test
Refresh. In the terminal you should see MISS then HIT.

## 5) Optional: Invalidate cache
POST to:
- /api/cache/invalidate

Example:
```bash
curl -X POST http://localhost:3000/api/cache/invalidate \
  -H "Content-Type: application/json" \
  -H "x-cache-secret: YOUR_SECRET" \
  -d "{\"locale\":\"fr\"}"
```
