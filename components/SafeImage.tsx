"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
};

const Placeholder = () => (
  <div
    className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800/50"
    aria-hidden="true"
  >
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className="text-slate-300 dark:text-slate-600"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  </div>
);

export default function SafeImage({ src, alt, fill = true, sizes, className, priority, loading }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) return <Placeholder />;

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
      loading={loading}
      unoptimized
      onError={() => setFailed(true)}
    />
  );
}
