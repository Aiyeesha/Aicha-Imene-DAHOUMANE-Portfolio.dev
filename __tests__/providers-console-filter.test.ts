// __tests__/providers-console-filter.test.ts
// Checks the console.error filter in app/[locale]/providers.tsx that hides
// React 19's false positive "Encountered a script tag while rendering React
// component." triggered by next-themes (see the comment in providers.tsx).
// The filter installs once, on module load: each test resets the module
// registry to re-run that code under a different NODE_ENV.

describe("providers.tsx console.error filter", () => {
  const originalNodeEnv = process.env.NODE_ENV;
  const originalConsoleError = console.error;

  afterEach(() => {
    (process.env as Record<string, string | undefined>).NODE_ENV = originalNodeEnv;
    console.error = originalConsoleError;
    jest.resetModules();
  });

  it("suppresses only the script-tag warning in development, forwards everything else", () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "development";
    const spy = jest.fn();
    console.error = spy;

    jest.resetModules();
    require("@/app/[locale]/providers");

    console.error("Encountered a script tag while rendering React component.");
    expect(spy).not.toHaveBeenCalled();

    console.error("Some other real error");
    expect(spy).toHaveBeenCalledWith("Some other real error");

    const err = new Error("boom");
    console.error(err);
    expect(spy).toHaveBeenCalledWith(err);
  });

  it("does not install the filter outside development", () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "test";
    const spy = jest.fn();
    console.error = spy;

    jest.resetModules();
    require("@/app/[locale]/providers");

    console.error("Encountered a script tag while rendering React component.");
    expect(spy).toHaveBeenCalledWith("Encountered a script tag while rendering React component.");
  });
});
