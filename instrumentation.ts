// instrumentation.ts
// Run once by Next.js at server start (App Router): validates environment
// variables before the first render.
import type { Instrumentation } from "next";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { validateEnv } = await import("./lib/env");
    validateEnv();
  }
}

// Server errors (pages, route handlers, server actions, share images) in
// production → short alert on ALERT_WEBHOOK_URL, rate limited and without
// personal data (lib/monitoring/serverErrorAlert.ts). Node.js runtime only.
export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const { reportServerError } = await import("./lib/monitoring/serverErrorAlert");
  await reportServerError(error, request, context);
};
