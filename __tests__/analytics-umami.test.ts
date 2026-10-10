// __tests__/analytics-umami.test.ts
// ----------------------------------
// trackEvent() délègue à window.umami.track(), avec une courte file d'attente
// quand le script Umami n'est pas encore chargé (strategy="afterInteractive").

import { trackEvent } from "@/lib/analytics";

describe("trackEvent (Umami)", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    delete window.umami;
  });

  afterEach(() => {
    jest.useRealTimers();
    delete window.umami;
  });

  it("envoie l'événement immédiatement quand Umami est chargé", () => {
    const track = jest.fn();
    window.umami = { track };

    trackEvent("cv_download", { locale: "fr", track: "salesforce" });

    expect(track).toHaveBeenCalledWith("cv_download", { locale: "fr", track: "salesforce" });
  });

  it("met l'événement en attente puis l'envoie dès qu'Umami est disponible", () => {
    trackEvent("web_vital", { metric: "TTFB", value: 120, rating: "good", path: "/fr" });

    const track = jest.fn();
    window.umami = { track };
    jest.advanceTimersByTime(500);

    expect(track).toHaveBeenCalledTimes(1);
    expect(track).toHaveBeenCalledWith("web_vital", { metric: "TTFB", value: 120, rating: "good", path: "/fr" });
  });

  it("abandonne après ~10 s sans Umami, sans lever d'erreur", () => {
    expect(() => trackEvent("email_click", { locale: "en" })).not.toThrow();
    jest.advanceTimersByTime(15_000);

    const track = jest.fn();
    window.umami = { track };
    jest.advanceTimersByTime(1_000);

    expect(track).not.toHaveBeenCalled();
  });

  it("ne propage pas une erreur levée par Umami", () => {
    window.umami = { track: () => { throw new Error("réseau"); } };

    expect(() => trackEvent("linkedin_click", { locale: "es" })).not.toThrow();
  });
});
