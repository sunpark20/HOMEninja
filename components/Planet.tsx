"use client";

import { useEffect, useRef } from "react";
import type { PlanetStyle, MoonLink } from "@/types/app";

function seededRand(seed: number, n: number) {
  const x = Math.sin(seed * 9999 + n) * 10000;
  return x - Math.floor(x);
}

const MOON_SCALE = 0.25;

function MoonSatellite({ moon, parentSize }: { moon: MoonLink; parentSize: number }) {
  const moonSize = `clamp(42px, ${parentSize * MOON_SCALE}vw, ${parentSize * MOON_SCALE}vh)`;
  const handleClick = () => {
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
  };

  if (moon.kind === "asteroid") {
    const seed = moon.targetId.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const points: [number, number][] = [];
    const N = 12;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      const r = 35 + seededRand(seed, i) * 15;
      points.push([50 + Math.cos(a) * r, 50 + Math.sin(a) * r]);
    }
    const path = "M " + points.map((p) => p.join(",")).join(" L ") + " Z";
    const gradId = `moon-ast-${moon.targetId}`;

    return (
      <div
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
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
          <path d={path} fill={`url(#${gradId})`} stroke="oklch(0.15 0.02 50)" strokeWidth="0.3" strokeOpacity="0.4" />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={30 + seededRand(seed, i + 10) * 40} cy={30 + seededRand(seed, i + 20) * 40} r={1.5 + seededRand(seed, i + 30) * 3} fill="oklch(0.15 0.02 50 / 0.5)" />
          ))}
        </svg>
      </div>
    );
  }

  const gradient = `radial-gradient(ellipse at 30% 30%, ${moon.colors.join(", ")})`;
  return (
    <div
      className="absolute rounded-full"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
      style={{
        ...shared,
        width: moonSize,
        height: moonSize,
        background: gradient,
        boxShadow: `inset -8px -8px 20px rgba(0,0,0,0.5), 0 0 24px 6px ${moon.colors[1]} / 0.3)`,
      }}
    />
  );
}

export default function Planet({
  colors,
  size,
  position,
  parallaxSpeed,
  shadowColor,
  ring,
  onClick,
  moons,
}: PlanetStyle & { onClick?: () => void; moons?: MoonLink[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);

    const onScroll = () => {
      if (!isVisibleRef.current) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const viewCenter = window.innerHeight / 2;
        const offset = (center - viewCenter) * parallaxSpeed;
        el.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [parallaxSpeed]);

  const gradient = `radial-gradient(ellipse at 30% 30%, ${colors.join(", ")})`;
  const sizeVal = `clamp(140px, ${size}vw, ${size}vh)`;

  return (
    <div
      ref={ref}
      aria-hidden={!onClick}
      className="absolute pointer-events-none will-change-transform"
      style={{
        left: position.x,
        top: position.y,
        transform: "translateY(0)",
      }}
    >
      {/* ── 고리 뒤쪽 절반 (행성 뒤) ── */}
      {ring && (
        <div
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: `calc(${sizeVal} * ${ring.width})`,
            height: `calc(${sizeVal} * ${ring.width})`,
            transform: `translate(-50%, -50%) rotateX(${ring.tilt}deg)`,
            border: `2px solid ${ring.color}`,
            opacity: ring.opacity * 0.5,
            clipPath: "inset(0 0 50% 0)",
          }}
        />
      )}

      {/* ── 행성 본체 ── */}
      <div
        className="rounded-full overflow-hidden"
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") onClick();
              }
            : undefined
        }
        style={{
          width: sizeVal,
          height: sizeVal,
          background: gradient,
          boxShadow: `inset -20px -20px 60px rgba(0,0,0,0.6), 0 0 80px 20px ${shadowColor}`,
          cursor: onClick ? "pointer" : undefined,
          pointerEvents: onClick ? "auto" : undefined,
        }}
      />

      {/* ── 고리 앞쪽 절반 (행성 위) ── */}
      {ring && (
        <div
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: `calc(${sizeVal} * ${ring.width})`,
            height: `calc(${sizeVal} * ${ring.width})`,
            transform: `translate(-50%, -50%) rotateX(${ring.tilt}deg)`,
            border: `2px solid ${ring.color}`,
            opacity: ring.opacity,
            clipPath: "inset(50% 0 0 0)",
          }}
        />
      )}

      {/* ── 위성 (관련 앱 링크) ── */}
      {moons?.map((moon) => (
        <MoonSatellite key={moon.targetId} moon={moon} parentSize={size} />
      ))}
    </div>
  );
}
