// lib/logger.ts
// Structured JSON logger for API routes.
// One JSON line per call → searchable & filterable in Vercel Runtime Logs.
//
// Usage:
//   log.info("contact received", { name, topic })
//   log.warn("admin client unavailable")
//   log.error("supabase insert failed", { code: error.code })

type Level = "info" | "warn" | "error";
type Meta = Record<string, unknown>;

function emit(level: Level, msg: string, meta?: Meta) {
  const line = JSON.stringify({
    level,
    msg,
    ts: new Date().toISOString(),
    env: process.env.NODE_ENV,
    ...meta,
  });
  if (level === "error") console.error(line);
  else if (level === "warn")  console.warn(line);
  else                        console.log(line);
}

export const log = {
  info:  (msg: string, meta?: Meta) => emit("info",  msg, meta),
  warn:  (msg: string, meta?: Meta) => emit("warn",  msg, meta),
  error: (msg: string, meta?: Meta) => emit("error", msg, meta),
};
