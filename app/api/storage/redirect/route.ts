import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { safeLimit, storageRatelimit } from "@/lib/ratelimit";

/**
 * Redirect to a signed URL for a PRIVATE Supabase Storage object.
 *
 * Why: your project keeps `deliverables` PRIVATE, but the UI still needs a way
 * to open/download those files. A signed URL is temporary and doesn't require
 * making the bucket public.
 *
 * Usage:
 *   /api/storage/redirect?bucket=deliverables&path=some-folder/file.pdf
 *
 * Required env vars (server-side only):
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 */

const ALLOWED_PRIVATE_BUCKETS = new Set(["deliverables"]);

function isSafePath(path: string) {
  // Prevent traversal, weird chars, etc. Keep it strict.
  // Allow: letters, numbers, dash, underscore, slash, dot
  return /^[a-zA-Z0-9/_\-.]+$/.test(path) && !path.includes("..") && !path.startsWith("/");
}

export async function GET(req: NextRequest) {
  // Rate-limit : 30 req/min par IP — route non authentifiée
  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const { success, reset } = await safeLimit(storageRatelimit, ip);
  if (!success) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)) },
      }
    );
  }

  const bucket = req.nextUrl.searchParams.get("bucket") ?? "";
  const path = req.nextUrl.searchParams.get("path") ?? "";

  if (!bucket || !path) {
    return NextResponse.json(
      { ok: false, error: "missing_bucket_or_path" },
      { status: 400 }
    );
  }

  if (!ALLOWED_PRIVATE_BUCKETS.has(bucket)) {
    return NextResponse.json(
      { ok: false, error: "bucket_not_allowed" },
      { status: 403 }
    );
  }

  if (!isSafePath(path)) {
    return NextResponse.json(
      { ok: false, error: "invalid_path" },
      { status: 400 }
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    // We intentionally return a clear error so you can detect misconfiguration.
    return NextResponse.json(
      { ok: false, error: "server_not_configured" },
      { status: 500 }
    );
  }

  const supabaseAdmin = createClient(url, serviceRoleKey);

  // 10 minutes is usually enough for a download.
  const expiresIn = 60 * 10;
  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn);

  if (error || !data?.signedUrl) {
    return NextResponse.json(
      { ok: false, error: "signed_url_failed" },
      { status: 404 }
    );
  }

  return NextResponse.redirect(data.signedUrl, { status: 302 });
}
