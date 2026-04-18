"use client";

import { useState } from "react";

type Streak = {
  top: number;
  len: number;
  delay: number;
  width: number;
  opacity: number;
};

type Props = {
  active: boolean;
  direction: number;
};

export default function Hyperspace({ active, direction }: Props) {
  const [streaks] = useState<Streak[]>(() =>
    Array.from({ length: 80 }, () => ({
      top: Math.random() * 100,
      len: 30 + Math.random() * 180,
      delay: Math.random() * 120,
      width: 1 + Math.random() * 1.5,
      opacity: 0.3 + Math.random() * 0.7,
    })),
  );

  if (!active) return null;
  const dirSign = direction >= 0 ? 1 : -1;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 500,
        background:
          "radial-gradient(ellipse at center, oklch(0.03 0.01 260 / 0.3), oklch(0 0 0 / 0.85))",
        animation: "hyperspace-flash 700ms ease-in forwards",
      }}
    >
      {streaks.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${s.top}%`,
            left: "50%",
            width: `${s.len}px`,
            height: `${s.width}px`,
            background: `linear-gradient(${dirSign > 0 ? "to right" : "to left"}, transparent, oklch(0.95 0.05 260 / ${s.opacity}))`,
            transformOrigin: "center",
            animation: `hyperstreak-${dirSign > 0 ? "r" : "l"} 700ms cubic-bezier(.5,0,.7,1) ${s.delay}ms forwards`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
