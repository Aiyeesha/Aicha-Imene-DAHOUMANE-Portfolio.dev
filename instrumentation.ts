// instrumentation.ts
// Run once by Next.js at server start (App Router): validates environment
// variables before the first render.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { validateEnv } = await import("./lib/env");
    validateEnv();
  }
}
