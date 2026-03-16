import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  // Route de diagnostic uniquement disponible en développement local.
  // En production : route fermée — évite l'exposition de la présence Redis,
  // le fingerprinting de l'infrastructure et les écritures non authentifiées.
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { success: false, error: "Not found." },
      { status: 404 }
    );
  }

  if (!redis) {
    return NextResponse.json(
      { success: false, error: "Cache service unavailable." },
      { status: 503 }
    );
  }

  try {
    await redis.set("healthcheck", "ok", { ex: 60 });
    const value = await redis.get("healthcheck");
    return NextResponse.json({ success: true, value });
  } catch {
    return NextResponse.json(
      { success: false, error: "Cache service unavailable." },
      { status: 503 }
    );
  }
}
