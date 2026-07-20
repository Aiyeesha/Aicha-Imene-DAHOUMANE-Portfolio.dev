// withRetry() reads NEXT_PUBLIC_SUPABASE_URL once at module-load time to decide
// whether it's running against the CI placeholder host (see lib/supabase/withRetry.ts).
// The build-test CI job itself sets that env var to the placeholder — so these tests
// must not rely on whatever value happens to be ambient; each block sets its own
// value and re-imports the module fresh via jest.isolateModulesAsync.

async function loadWithRetry(supabaseUrl: string) {
  const original = process.env.NEXT_PUBLIC_SUPABASE_URL;
  process.env.NEXT_PUBLIC_SUPABASE_URL = supabaseUrl;
  let withRetry: typeof import("@/lib/supabase/withRetry").withRetry;
  await jest.isolateModulesAsync(async () => {
    ({ withRetry } = await import("@/lib/supabase/withRetry"));
  });
  process.env.NEXT_PUBLIC_SUPABASE_URL = original;
  return withRetry!;
}

describe("withRetry (real Supabase URL)", () => {
  it("returns data immediately on success", async () => {
    const withRetry = await loadWithRetry("https://real-project.supabase.co");
    const fn = jest.fn().mockResolvedValue({ data: { id: 1 }, error: null });
    const result = await withRetry(fn);
    expect(result).toEqual({ data: { id: 1 }, error: null });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("does not retry on a non-retryable error", async () => {
    const withRetry = await loadWithRetry("https://real-project.supabase.co");
    const fn = jest.fn().mockResolvedValue({ data: null, error: { code: "PGRST301", message: "not found" } });
    const result = await withRetry(fn);
    expect(result.error).toEqual({ code: "PGRST301", message: "not found" });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries on a retryable error and eventually succeeds", async () => {
    const withRetry = await loadWithRetry("https://real-project.supabase.co");
    const fn = jest
      .fn()
      .mockResolvedValueOnce({ data: null, error: { message: "fetch failed" } })
      .mockResolvedValueOnce({ data: { id: 2 }, error: null });
    const result = await withRetry(fn);
    expect(result).toEqual({ data: { id: 2 }, error: null });
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("gives up after exhausting all retries", async () => {
    const withRetry = await loadWithRetry("https://real-project.supabase.co");
    const fn = jest.fn().mockResolvedValue({ data: null, error: { message: "fetch failed" } });
    const result = await withRetry(fn, 2);
    expect(result.error).toEqual({ message: "fetch failed" });
    expect(fn).toHaveBeenCalledTimes(3); // attempt 0, 1, 2
  });

  it("treats a hanging attempt as a retryable timeout instead of blocking forever", async () => {
    const withRetry = await loadWithRetry("https://real-project.supabase.co");
    const hangingThenResolves = jest
      .fn()
      .mockImplementationOnce(() => new Promise(() => {})) // never resolves
      .mockResolvedValueOnce({ data: { id: 3 }, error: null });

    const result = await withRetry(hangingThenResolves);
    expect(result).toEqual({ data: { id: 3 }, error: null });
    expect(hangingThenResolves).toHaveBeenCalledTimes(2);
  }, 10000);
});

describe("withRetry against the CI placeholder Supabase URL", () => {
  it("fails fast with zero retries instead of retrying against a known-broken host", async () => {
    const withRetry = await loadWithRetry("https://placeholder.supabase.co");
    const fn = jest.fn().mockResolvedValue({ data: null, error: { message: "fetch failed" } });
    const result = await withRetry(fn);
    expect(result.error).toEqual({ message: "fetch failed" });
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
