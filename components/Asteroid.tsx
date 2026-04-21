"use client";

import type { AsteroidObject } from "@/types/galaxy";
import type { MoonLink } from "@/types/app";

type Props = {
  obj: AsteroidObject;
  onOpen: (obj: AsteroidObject) => void;
};

function seededRand(seed: number, n: number) {
  const x = Math.sin(seed * 9999 + n) * 10000;
  return x - Math.floor(x);
}

const MOON_SCALE = 0.25;

function MoonSatellite({ moon, parentSize }: { moon: MoonLink; parentSize: number }) {
  const moonSize = `clamp(42px, ${parentSize * MOON_SCALE}vh, ${parentSize * MOON_SCALE * 1.5}vh)`;
  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    window.dispatchEvent(
      new CustomEvent("navigate-to-app", { detail: moon.targetId })
    );
  };

  const shared = {
    position: "absolute" as const,
    right: "-20%",
    top: "15%",
    cursor: "pointer",
    pointerEvents: "auto" as const,
    animation: "moon-float 4s ease-in-out infinite alternate",
    zIndex: 5,
  };

  if (moon.kind === "asteroid") {
    const seed2 = moon.targetId.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const pts: [number, number][] = [];
    const N2 = 12;
    for (let i = 0; i < N2; i++) {
      const a = (i / N2) * Math.PI * 2;
      const r = 35 + seededRand(seed2, i) * 15;
      pts.push([50 + Math.cos(a) * r, 50 + Math.sin(a) * r]);
    }
    const astPath = "M " + pts.map((p) => p.join(",")).join(" L ") + " Z";
    const gradId = `moon-ast-${moon.targetId}`;

    return (
      <div
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(e); }}
        aria-label={`${moon.targetId}로 이동`}
        style={{ ...shared, width: moonSize, height: moonSize }}
      >
        <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          <defs>
            <radialGradient id={gradId} cx="0.35" cy="0.35" r="0.9">
              <stop offset="0%" stopColor="oklch(0.55 0.04 60)" />
              <stop offset="50%" stopColor="oklch(0.38 0.04 55)" />
              <stop offset="100%" stopColor="oklch(0.18 0.03 50)" />
            </radialGradient>
          </defs>
          <path d={astPath} fill={`url(#${gradId})`} stroke="oklch(0.15 0.02 50)" strokeWidth="0.3" strokeOpacity="0.4" />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={30 + seededRand(seed2, i + 10) * 40} cy={30 + seededRand(seed2, i + 20) * 40} r={1.5 + seededRand(seed2, i + 30) * 3} fill="oklch(0.15 0.02 50 / 0.5)" />
          ))}
        </svg>
      </div>
    );
  }

  const gradient = `radial-gradient(ellipse at 30% 30%, ${moon.colors.join(", ")})`;
  return (
    <div
      style={{
        ...shared,
        width: moonSize,
        height: moonSize,
        borderRadius: "50%",
        background: gradient,
        boxShadow: `inset -8px -8px 20px rgba(0,0,0,0.5), 0 0 24px 6px ${moon.colors[1]} / 0.3)`,
      }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(e); }}
      aria-label={`${moon.targetId}로 이동`}
    />
  );
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

      {obj.moons?.map((moon) => (
        <MoonSatellite key={moon.targetId} moon={moon} parentSize={size} />
      ))}
    </div>
  );
}
