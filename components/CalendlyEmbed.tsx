"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void };
  }
}

const SCRIPT_ID = "calendly-widget-script";
const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

type Props = {
  url: string;
  label: string;
  className?: string;
};

export default function CalendlyPopupButton({ url, label, className }: Props) {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current || document.getElementById(SCRIPT_ID)) return;
    loaded.current = true;
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.src = SCRIPT_SRC;
    s.async = true;
    document.head.appendChild(s);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);
  }, []);

  function openCalendly() {
    window.Calendly?.initPopupWidget({ url });
  }

  return (
    <button type="button" onClick={openCalendly} className={className}>
      {label}
    </button>
  );
}
