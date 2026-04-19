"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type Props = {
  entries: string[];
};

function renderWithBreaks(text: string) {
  const parts = text.split("\n");
  return parts.map((part, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {part}
    </span>
  ));
}

export default function TmtSection({ entries }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const measure = useCallback(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    if (open) requestAnimationFrame(measure);
  }, [open, measure]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) setOpen(false);
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (entries.length === 0) return null;

  return (
    <div ref={containerRef} className="mt-4">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-1.5 px-2 py-1.5 text-xs tracking-wide transition-colors duration-200 rounded cursor-pointer"
        style={{
          color: open ? "oklch(0.65 0.01 260)" : "oklch(0.45 0.01 260)",
        }}
      >
        <span
          className="inline-block transition-transform duration-200"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          ▸
        </span>
        {open ? "Too Much Talk" : "TMT"}
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? `${contentHeight}px` : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="pt-3 flex flex-col gap-2.5">
          {entries.map((text, i) => (
            <p
              key={i}
              className="text-[13px] leading-relaxed m-0"
              style={{ color: "oklch(0.58 0.01 260)" }}
            >
              {renderWithBreaks(text)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
