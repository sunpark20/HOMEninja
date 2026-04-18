"use client";

import { useEffect, useCallback } from "react";
import type { Galaxy } from "@/types/galaxy";

type Props = {
  galaxies: Galaxy[];
  current: number;
  onGo: (index: number) => void;
  disabled: boolean;
};

export default function GalaxyNav({ galaxies, current, onGo, disabled }: Props) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLElement &&
        /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)
      )
        return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onGo(current - 1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onGo(current + 1);
      }
    },
    [current, onGo],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const g = galaxies[current];
  const canPrev = current > 0 && !disabled;
  const canNext = current < galaxies.length - 1 && !disabled;

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 bottom-5 max-sm:left-3 max-sm:right-3 max-sm:translate-x-0 flex items-center gap-3.5 px-3.5 py-2.5 rounded-full font-[family-name:var(--font-body)]"
      style={{
        zIndex: 60,
        background: "oklch(0.04 0.01 260 / 0.92)",
        border: "1px solid oklch(1 0 0 / 0.1)",
      }}
    >
      <button
        aria-label="이전 은하"
        onClick={() => canPrev && onGo(current - 1)}
        className="inline-flex items-center justify-center w-11 h-11 rounded-full p-0 transition-all duration-200"
        style={{
          background: "oklch(0.08 0.01 260 / 0.85)",
          border: `1px solid oklch(1 0 0 / ${canPrev ? 0.2 : 0.08})`,
          color: canPrev
            ? "oklch(0.95 0.005 260)"
            : "oklch(0.35 0.01 260)",
          cursor: canPrev ? "pointer" : "not-allowed",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="flex flex-col items-center min-w-[220px] max-sm:min-w-0 max-sm:flex-1">
        <div
          className="font-[family-name:var(--font-display)] text-[10px] tracking-[0.2em] uppercase whitespace-nowrap"
          style={{ color: g.accent, opacity: 0.85 }}
        >
          {g.name}
        </div>
        <div
          className="text-sm mt-0.5 whitespace-nowrap"
          style={{ color: "oklch(0.9 0.005 260)" }}
        >
          {g.nameKo}
        </div>
        <div className="flex gap-1.5 mt-2">
          {galaxies.map((gx, i) => (
            <button
              key={gx.id}
              onClick={() => !disabled && onGo(i)}
              aria-label={`은하 ${i + 1}`}
              className="h-1.5 rounded-full p-0 border-none transition-all duration-200"
              style={{
                width: i === current ? 18 : 6,
                background:
                  i === current ? galaxies[i].accent : "oklch(1 0 0 / 0.2)",
                cursor: disabled ? "default" : "pointer",
              }}
            />
          ))}
        </div>
      </div>

      <button
        aria-label="다음 은하"
        onClick={() => canNext && onGo(current + 1)}
        className="inline-flex items-center justify-center w-11 h-11 rounded-full p-0 transition-all duration-200"
        style={{
          background: "oklch(0.08 0.01 260 / 0.85)",
          border: `1px solid oklch(1 0 0 / ${canNext ? 0.2 : 0.08})`,
          color: canNext
            ? "oklch(0.95 0.005 260)"
            : "oklch(0.35 0.01 260)",
          cursor: canNext ? "pointer" : "not-allowed",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
