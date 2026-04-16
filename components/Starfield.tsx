"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
};

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>(0);
  const scrollYRef = useRef(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mql.matches;
    const onMotionChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mql.addEventListener("change", onMotionChange);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.scale(dpr, dpr);
      generateStars();
    }

    function generateStars() {
      const area = window.innerWidth * window.innerHeight;
      const count = Math.min(400, Math.max(100, Math.floor(area / 5000)));
      const pageHeight = document.documentElement.scrollHeight;
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * pageHeight,
        radius: 0.5 + Math.random() * 1.5,
        baseOpacity: 0.3 + Math.random() * 0.7,
        twinkleSpeed: 0.001 + Math.random() * 0.004,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    }

    function render(time: number) {
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx!.clearRect(0, 0, w, h);

      const scroll = scrollYRef.current;
      const stars = starsRef.current;
      const reduced = reducedMotionRef.current;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const opacity = reduced
          ? s.baseOpacity
          : s.baseOpacity +
            Math.sin(time * s.twinkleSpeed + s.twinklePhase) * 0.3;

        const yOffset = reduced ? 0 : scroll * 0.1;
        let drawY = s.y - yOffset;
        const pageH = document.documentElement.scrollHeight;
        drawY = ((drawY % pageH) + pageH) % pageH;
        drawY = drawY - scroll;

        if (drawY < -10 || drawY > h + 10) continue;

        ctx!.beginPath();
        ctx!.arc(s.x, drawY, s.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, opacity))})`;
        ctx!.fill();
      }

      if (reduced) return;
      rafRef.current = requestAnimationFrame(render);
    }

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 250);
    };

    resize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    if (reducedMotionRef.current) {
      requestAnimationFrame((t) => render(t));
    } else {
      rafRef.current = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mql.removeEventListener("change", onMotionChange);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
