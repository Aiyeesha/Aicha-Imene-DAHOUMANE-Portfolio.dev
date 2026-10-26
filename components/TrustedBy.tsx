"use client";

// TrustedBy.tsx
// -------------
// "They trusted me" logo strip, shown while real testimonials are disabled
// (NEXT_PUBLIC_SHOW_TESTIMONIALS !== "true"). Infinite CSS marquee that
// pauses on hover; the duplicate pass that makes the loop seamless is
// aria-hidden. With reduced motion the logos are static and centred.
//
// To add a company: add an entry to `companies` and put the logo in
// /public/companies/ (.webp or .svg).

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { useTranslations } from "next-intl";

// Companies and schools; set is_visible: false to hide one without deleting it
const companies: {
  id: string;
  name: string;
  /** Path under /public/companies/ */
  logo: string;
  /** Display width in pixels */
  width: number;
  height: number;
  is_visible: boolean;
}[] = [
  {
    id: "ld-digitales",
    name: "LD Digitales",
    logo: "/companies/ld-digitales.webp",
    width: 120,
    height: 40,
    is_visible: true
  },
  {
    id: "midrange",
    name: "Midrange Group",
    logo: "/companies/midrange.webp",
    width: 120,
    height: 40,
    is_visible: true
  },
  {
    id: "openclassrooms",
    name: "OpenClassrooms",
    logo: "/companies/openclassrooms.svg",
    width: 160,
    height: 44,
    is_visible: true
  },
  {
    id: "greta",
    name: "GRETA du Val d'Oise",
    logo: "/companies/greta.svg",
    width: 160,
    height: 44,
    is_visible: true
  }
];

// Single logo, used in both marquee passes. 80% opacity keeps logos legible;
// in dark mode a light pill keeps their original colours visible.
function LogoItem({ company }: { company: (typeof companies)[0] }) {
  return (
    <div
      className="
        shrink-0
        relative flex items-center justify-center
        opacity-80 grayscale transition-all duration-300
        group-hover:opacity-100 group-hover:grayscale-0
        dark:rounded-lg dark:bg-white/90 dark:p-2
      "
      title={company.name}
    >
      <Image
        src={company.logo}
        alt={company.name}
        width={company.width}
        height={company.height}
        loading="lazy"
        className="object-contain"
        style={{ height: "auto", width: "auto" }}
        unoptimized={company.logo.endsWith(".svg")}
      />
    </div>
  );
}

export default function TrustedBy() {
  const t = useTranslations();

  // Visible logos only
  const visible = companies.filter((c) => c.is_visible);

  // Nothing to show
  if (visible.length === 0) return null;

  return (
    <Reveal>
      <div className="text-center">
        {/* Section title */}
        <p className="text-sm font-medium uppercase tracking-widest text-muted-2">
          {t("trustedBy.title")}
        </p>

        {/* ── Marquee ─────────────────────────────────────────────────────── */}
        {/* Default: overflow-hidden + infinite marquee, paused on hover.
            Reduced motion: static, wrapped and centred.
            role="region" is required for aria-label to be exposed on a <div>. */}
        <div
          role="region"
          aria-label={t("trustedBy.title")}
          className="
            group mt-8 w-full
            overflow-hidden motion-reduce:overflow-visible
          "
        >
          <div
            className="
              flex items-center gap-12 md:gap-16
              w-max motion-reduce:w-full
              animate-marquee
              motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center
              group-hover:[animation-play-state:paused]
            "
          >
            {/* First pass: accessible content */}
            {visible.map((company) => (
              <LogoItem key={`a-${company.id}`} company={company} />
            ))}

            {/* Second pass: visual duplicate, hidden from screen readers
                (and not displayed with reduced motion) */}
            <div
              aria-hidden="true"
              className="contents motion-reduce:hidden"
            >
              {visible.map((company) => (
                <LogoItem key={`b-${company.id}`} company={company} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
