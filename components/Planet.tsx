"use client";

import { useEffect, useRef } from "react";
import type { PlanetStyle } from "@/types/app";

/* ── 효과 목록 (독립 제거 가능) ──────────────────────
 * 1. 고리(ring) → ring 객체 제거하면 OFF
 * ─────────────────────────────────────────────── */

export default function Planet({
  colors,
  size,
  position,
  parallaxSpeed,
  shadowColor,
  ring,
  onClick,
}: PlanetStyle & { onClick?: () => void }) {
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
    </div>
  );
}
