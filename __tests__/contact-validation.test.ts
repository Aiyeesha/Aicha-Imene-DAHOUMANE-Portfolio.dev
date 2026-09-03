// __tests__/contact-validation.test.ts
// Couvre lib/contactValidation.ts (extrait de app/api/contact/route.ts pour être
// testable sans next/server), un module 0% testé jusqu'ici malgré son rôle de
// garde-fou anti-spam/qualité des données (cf. audit : cibler les modules
// critiques plutôt qu'un chiffre global).

import { validate, getClientIp, isAllowedOrigin } from "@/lib/contactValidation";

const VALID = {
  name: "Jane Doe",
  email: "jane@example.com",
  message: "Hello, I would like to discuss a project with you please.",
  topic: "general",
  acceptedPolicy: true,
};

describe("validate() — contact form", () => {
  it("accepts a fully valid payload", () => {
    expect(validate(VALID)).toBeNull();
  });

  it("rejects when the privacy policy isn't accepted", () => {
    expect(validate({ ...VALID, acceptedPolicy: false })).toBe("policy_not_accepted");
  });

  it("rejects a name shorter than 2 characters", () => {
    expect(validate({ ...VALID, name: "J" })).toBe("name_too_short");
  });

  it("rejects a name longer than 80 characters", () => {
    expect(validate({ ...VALID, name: "J".repeat(81) })).toBe("name_too_long");
  });

  it("rejects an email longer than 254 characters", () => {
    const longEmail = `${"a".repeat(250)}@a.co`;
    expect(validate({ ...VALID, email: longEmail })).toBe("email_too_long");
  });

  it("rejects a malformed email", () => {
    expect(validate({ ...VALID, email: "not-an-email" })).toBe("invalid_email");
  });

  it("rejects a topic outside the allowed set", () => {
    expect(validate({ ...VALID, topic: "crypto-airdrop" })).toBe("invalid_topic");
  });

  it("rejects a message shorter than 10 characters", () => {
    expect(validate({ ...VALID, message: "short" })).toBe("message_too_short");
  });

  it("rejects a message longer than 2000 characters", () => {
    expect(validate({ ...VALID, message: "a".repeat(2001) })).toBe("message_too_long");
  });

  it("rejects a message with more than 3 links", () => {
    const spammyMessage =
      "Check these out: http://a.com http://b.com http://c.com http://d.com and more text to pass length.";
    expect(validate({ ...VALID, message: spammyMessage })).toBe("too_many_links");
  });

  it("accepts a message with exactly 3 links", () => {
    const okMessage =
      "Check these out: http://a.com http://b.com http://c.com — that's my portfolio and case studies.";
    expect(validate({ ...VALID, message: okMessage })).toBeNull();
  });
});

describe("getClientIp()", () => {
  function reqWithHeaders(headers: Record<string, string>) {
    return { headers: new Headers(headers) };
  }

  it("prefers x-real-ip (Vercel edge, not spoofable) over x-forwarded-for", () => {
    const req = reqWithHeaders({ "x-real-ip": "1.2.3.4", "x-forwarded-for": "9.9.9.9" });
    expect(getClientIp(req)).toBe("1.2.3.4");
  });

  it("falls back to the first entry of x-forwarded-for when x-real-ip is absent", () => {
    const req = reqWithHeaders({ "x-forwarded-for": "5.6.7.8, 9.9.9.9" });
    expect(getClientIp(req)).toBe("5.6.7.8");
  });

  it("falls back to 'unknown' when neither header is present", () => {
    const req = reqWithHeaders({});
    expect(getClientIp(req)).toBe("unknown");
  });
});

describe("isAllowedOrigin() — contact form origin guard", () => {
  function reqWithHeaders(headers: Record<string, string>) {
    return { headers: new Headers(headers) };
  }

  const OLD_ENV = process.env;
  beforeEach(() => {
    process.env = { ...OLD_ENV };
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.SITE_URL;
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("rejects a request with no Origin header (curl / server-side script)", () => {
    expect(isAllowedOrigin(reqWithHeaders({ host: "example.com" }))).toBe(false);
  });

  it("rejects a malformed Origin header", () => {
    expect(isAllowedOrigin(reqWithHeaders({ origin: "not-a-url", host: "example.com" }))).toBe(false);
  });

  it("accepts an Origin that matches the configured NEXT_PUBLIC_SITE_URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://portfolio.example.com";
    expect(
      isAllowedOrigin(reqWithHeaders({ origin: "https://portfolio.example.com", host: "whatever" }))
    ).toBe(true);
  });

  it("accepts a same-origin request on a non-pinned host (x-forwarded-host, Vercel alias)", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://pinned.example.com";
    expect(
      isAllowedOrigin(
        reqWithHeaders({
          origin: "https://alias-git-main.vercel.app",
          "x-forwarded-host": "alias-git-main.vercel.app",
          host: "internal-lambda-host",
        })
      )
    ).toBe(true);
  });

  it("accepts a same-origin request via the host header when x-forwarded-host is absent", () => {
    expect(
      isAllowedOrigin(reqWithHeaders({ origin: "http://localhost:3000", host: "localhost:3000" }))
    ).toBe(true);
  });

  it("rejects a cross-site Origin even when the serving host is known", () => {
    expect(
      isAllowedOrigin(
        reqWithHeaders({
          origin: "https://evil.example",
          "x-forwarded-host": "portfolio.example.com",
          host: "portfolio.example.com",
        })
      )
    ).toBe(false);
  });

  it("is case-insensitive on the host comparison", () => {
    expect(
      isAllowedOrigin(
        reqWithHeaders({ origin: "https://Portfolio.Example.COM", "x-forwarded-host": "portfolio.example.com" })
      )
    ).toBe(true);
  });
});
