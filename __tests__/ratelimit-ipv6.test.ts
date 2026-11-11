// __tests__/ratelimit-ipv6.test.ts
// Limiter keys: an IPv6 client is bucketed by its /64 network (it can rotate
// addresses inside it), IPv4 keys are left unchanged.

import { normalizeIpInKey } from "@/lib/security/ipBucket";

describe("normalizeIpInKey", () => {
  it("leaves IPv4 untouched", () => {
    expect(normalizeIpInKey("1.2.3.4")).toBe("1.2.3.4");
    expect(normalizeIpInKey("contact:ip:1.2.3.4")).toBe("contact:ip:1.2.3.4");
  });
  it("reduces a full IPv6 address to its /64", () => {
    expect(normalizeIpInKey("2001:db8:aaaa:bbbb:1:2:3:4")).toBe("2001:db8:aaaa:bbbb::/64");
  });
  it("gives the same bucket to two addresses of one /64", () => {
    const a = normalizeIpInKey("search:ip:2001:db8:0:1::abcd");
    const b = normalizeIpInKey("search:ip:2001:db8::1:ffff:ffff:ffff:ffff");
    expect(a).toBe("search:ip:2001:db8:0:1::/64");
    expect(b).toBe(a);
  });
  it("handles compressed addresses and zone ids", () => {
    expect(normalizeIpInKey("::1")).toBe("0:0:0:0::/64");
    expect(normalizeIpInKey("fe80::1%eth0")).toBe("fe80:0:0:0::/64");
  });
  it("keeps non-IP keys and unknown values", () => {
    expect(normalizeIpInKey("global")).toBe("global");
    expect(normalizeIpInKey("unknown")).toBe("unknown");
    expect(normalizeIpInKey("fp:script-src|https://x.example")).toBe("fp:script-src|https://x.example");
  });
});
