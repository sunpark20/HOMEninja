"use client";

import { useRef, useEffect } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  o: number;
  s: number;
  p: number;
  hue: number | null;
};

type Props = {
  density?: number;
  tint?: number | null;
  gasBands?: boolean;
  galaxyId: string;
};

export default function StarfieldV2({
  density = 1.0,
  tint = null,
  gasBands = false,
  galaxyId,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef(0);
  const reducedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mql.matches;
    const onMotion = (e: MediaQueryListEvent) => {
      reducedRef.current = e.matches;
    };
    mql.addEventListener("change", onMotion);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = window.innerWidth + "px";
      canvas!.style.height = window.innerHeight + "px";
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);
      gen();
    }

    function gen() {
      const area = window.innerWidth * window.innerHeight;
      const base = Math.floor(area / 5000);
      const count = Math.min(800, Math.max(60, Math.floor(base * density)));
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: 0.4 + Math.random() * (density > 1.5 ? 2.0 : 1.5),
        o: 0.25 + Math.random() * 0.75,
        s: 0.001 + Math.random() * 0.004,
        p: Math.random() * Math.PI * 2,
        hue:
          tint != null && Math.random() < 0.3
            ? tint + (Math.random() * 40 - 20)
            : null,
      }));
    }

    function render(t: number) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx!.clearRect(0, 0, w, h);
      const red = reducedRef.current;

      if (gasBands) {
        ctx!.save();
        const g1 = ctx!.createLinearGradient(0, h * 0.3, w, h * 0.7);
        g1.addColorStop(0, "rgba(0,0,0,0)");
        g1.addColorStop(0.4, "rgba(160,120,220,0.055)");
        g1.addColorStop(0.6, "rgba(200,140,240,0.07)");
        g1.addColorStop(1, "rgba(0,0,0,0)");
        ctx!.fillStyle = g1;
        ctx!.fillRect(0, 0, w, h);
        const g2 = ctx!.createLinearGradient(w, 0, 0, h);
        g2.addColorStop(0, "rgba(0,0,0,0)");
        g2.addColorStop(0.5, "rgba(100,180,230,0.04)");
        g2.addColorStop(1, "rgba(0,0,0,0)");
        ctx!.fillStyle = g2;
        ctx!.fillRect(0, 0, w, h);
        ctx!.restore();
      }

      for (const s of starsRef.current) {
        const o = red ? s.o : s.o + Math.sin(t * s.s + s.p) * 0.3;
        const clamped = Math.max(0, Math.min(1, o));
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle =
          s.hue !== null
            ? `oklch(0.85 0.1 ${s.hue} / ${clamped})`
            : `rgba(255,255,255,${clamped})`;
        ctx!.fill();

        if (density > 1.5 && s.r > 1.2) {
          ctx!.beginPath();
          ctx!.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, o * 0.15))})`;
          ctx!.fill();
        }
      }

      if (red) return;
      rafRef.current = requestAnimationFrame(render);
    }

    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(resize, 250);
    };
    resize();
    window.addEventListener("resize", onResize);
    render(performance.now());

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      mql.removeEventListener("change", onMotion);
      clearTimeout(rt);
    };
  }, [density, tint, gasBands, galaxyId]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
