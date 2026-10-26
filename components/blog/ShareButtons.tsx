"use client";

// components/blog/ShareButtons.tsx
// ---------------------------------
// Blog post share buttons: LinkedIn (share page in a new tab) and copy link
// (with a "Copied!" message announced through a polite live region).
//
// Props: url (article URL), title (prefilled on LinkedIn), labels (translated
// strings: share, linkedin, copyLink, copied).

import { useState } from "react";

// ── Inline SVG icons ───────────────────────────────────────────────────────

const IconLinkedIn = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const IconLink = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const IconCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Types ──────────────────────────────────────────────────────────────────

type Labels = {
  share: string;
  linkedin: string;
  copyLink: string;
  copied: string;
};

type Props = {
  url: string;
  title: string;
  labels: Labels;
};

// ── Component ──────────────────────────────────────────────────────────────

export default function ShareButtons({ url, title, labels }: Props) {
  const [copied, setCopied] = useState(false);

  // Official LinkedIn share URL
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback when the Clipboard API is unavailable (http, old browsers)
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="mt-6 flex items-center gap-3 flex-wrap">
      {/* Label */}
      <span className="text-xs font-medium text-muted-2 uppercase tracking-wider">
        {labels.share}
      </span>

      {/* LinkedIn button */}
      <a
        href={linkedInHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${labels.linkedin} — ${title}`}
        className="
          inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium
          border-[#0a66c2]/30 bg-[#0a66c2]/8 text-[#0a66c2]
          dark:border-[#0a66c2]/40 dark:bg-[#0a66c2]/10 dark:text-[#70b5f9]
          hover:bg-[#0a66c2]/15 dark:hover:bg-[#0a66c2]/20
          transition-colors duration-150 soft-ring
        "
      >
        <IconLinkedIn />
        {labels.linkedin}
      </a>

      {/* Copy link button */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? labels.copied : labels.copyLink}
        className="
          inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium
          border-black/10 dark:border-white/10
          bg-black/5 dark:bg-white/5
          text-muted hover:text-strong
          hover:bg-black/10 dark:hover:bg-white/10
          transition-colors duration-150 soft-ring
        "
      >
        {copied ? <IconCheck /> : <IconLink />}
        <span>{copied ? labels.copied : labels.copyLink}</span>
      </button>

      {/* Screen reader "Copied!" announcement */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? labels.copied : ""}
      </span>
    </div>
  );
}
