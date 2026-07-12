// __tests__/providers-console-filter.test.ts
// Vérifie le filtre console.error de app/[locale]/providers.tsx qui masque le
// faux positif React 19 "Encountered a script tag while rendering React
// component." déclenché par next-themes (voir commentaire dans providers.tsx).
// Le filtre s'installe une seule fois, au chargement du module — chaque test
// réinitialise le registre de modules pour ré-exécuter ce code d'installation
// sous un NODE_ENV différent.

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
