import { withRetry } from "@/lib/supabase/withRetry";

describe("withRetry", () => {
  it("returns data immediately on success", async () => {
    const fn = jest.fn().mockResolvedValue({ data: { id: 1 }, error: null });
    const result = await withRetry(fn);
    expect(result).toEqual({ data: { id: 1 }, error: null });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("does not retry on a non-retryable error", async () => {
    const fn = jest.fn().mockResolvedValue({ data: null, error: { code: "PGRST301", message: "not found" } });
    const result = await withRetry(fn);
    expect(result.error).toEqual({ code: "PGRST301", message: "not found" });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries on a retryable error and eventually succeeds", async () => {
    const fn = jest
      .fn()
      .mockResolvedValueOnce({ data: null, error: { message: "fetch failed" } })
      .mockResolvedValueOnce({ data: { id: 2 }, error: null });
    const result = await withRetry(fn);
    expect(result).toEqual({ data: { id: 2 }, error: null });
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("gives up after exhausting all retries", async () => {
    const fn = jest.fn().mockResolvedValue({ data: null, error: { message: "fetch failed" } });
    const result = await withRetry(fn, 2);
    expect(result.error).toEqual({ message: "fetch failed" });
    expect(fn).toHaveBeenCalledTimes(3); // attempt 0, 1, 2
  });

  it("treats a hanging attempt as a retryable timeout instead of blocking forever", async () => {
    const hangingThenResolves = jest
      .fn()
      .mockImplementationOnce(() => new Promise(() => {})) // never resolves
      .mockResolvedValueOnce({ data: { id: 3 }, error: null });

    const result = await withRetry(hangingThenResolves);
    expect(result).toEqual({ data: { id: 3 }, error: null });
    expect(hangingThenResolves).toHaveBeenCalledTimes(2);
  }, 10000);
});
