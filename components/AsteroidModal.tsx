"use client";

import type { AsteroidObject } from "@/types/galaxy";

type Props = {
  obj: AsteroidObject | null;
  onClose: () => void;
};

export default function AsteroidModal({ obj, onClose }: Props) {
  if (!obj) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center p-6"
      style={{
        zIndex: 400,
        background: "oklch(0 0 0 / 0.7)",
        animation: "fade-in 200ms ease-out forwards",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="font-[family-name:var(--font-body)]"
        style={{
          maxWidth: 380,
          padding: "28px 28px 24px",
          borderRadius: 12,
          background: "oklch(0.08 0.01 260)",
          border: "1px solid oklch(1 0 0 / 0.1)",
          color: "oklch(0.85 0.005 260)",
        }}
      >
        <div
          className="text-[11px] tracking-[0.2em] uppercase mb-2"
          style={{ color: "oklch(0.5 0.02 60)" }}
        >
          운석 #{obj.id}
        </div>
        <h3
          className="font-[family-name:var(--font-display)] text-[22px] m-0"
          style={{ color: "oklch(0.95 0.005 260)" }}
        >
          {obj.name}
        </h3>
        <p
          className="mt-2.5 text-[15px] leading-relaxed"
          style={{ color: "oklch(0.72 0.01 260)" }}
        >
          {obj.hint}
        </p>
        <button
          onClick={onClose}
          className="mt-5 px-3.5 py-2 text-[13px] rounded-md font-[family-name:var(--font-body)] cursor-pointer"
          style={{
            background: "transparent",
            color: "oklch(0.75 0.01 260)",
            border: "1px solid oklch(1 0 0 / 0.15)",
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
