"use client";

import type { AsteroidObject } from "@/types/galaxy";

type Props = {
  obj: AsteroidObject;
  onOpen: (obj: AsteroidObject) => void;
};

function seededRand(seed: number, n: number) {
  const x = Math.sin(seed * 9999 + n) * 10000;
  return x - Math.floor(x);
}

export default function Asteroid({ obj, onOpen }: Props) {
  const { size, position, rotate, tilt, name, id } = obj;
  const sizePx = `clamp(140px, ${size}vh, ${size * 1.5}vh)`;

  const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);

  const points: [number, number][] = [];
  const N = 12;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const r = 35 + seededRand(seed, i) * 15;
    points.push([50 + Math.cos(a) * r, 50 + Math.sin(a) * r]);
  }
  const path = "M " + points.map((p) => p.join(",")).join(" L ") + " Z";

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: sizePx,
        height: sizePx,
        pointerEvents: "auto",
        transform: `rotate(${rotate}deg)`,
        animation: `asteroid-drift-${seed % 3} ${14 + tilt * 3}s ease-in-out infinite alternate`,
        cursor: "pointer",
      }}
      onClick={() => onOpen(obj)}
      tabIndex={0}
      role="button"
      aria-label={`${name} 정보 보기`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(obj);
        }
      }}
    >
      <svg
        viewBox="0 0 100 100"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          <radialGradient id={`ast-${id}`} cx="0.35" cy="0.35" r="0.9">
            <stop offset="0%" stopColor="oklch(0.55 0.04 60)" />
            <stop offset="50%" stopColor="oklch(0.38 0.04 55)" />
            <stop offset="100%" stopColor="oklch(0.18 0.03 50)" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="50" fill="oklch(0.55 0.05 55 / 0.06)" />
        <path
          d={path}
          fill={`url(#ast-${id})`}
          stroke="oklch(0.15 0.02 50)"
          strokeWidth="0.3"
          strokeOpacity="0.4"
        />
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            cx={30 + seededRand(seed, i + 10) * 40}
            cy={30 + seededRand(seed, i + 20) * 40}
            r={1.5 + seededRand(seed, i + 30) * 3}
            fill="oklch(0.15 0.02 50 / 0.5)"
          />
        ))}
      </svg>
    </div>
  );
}
