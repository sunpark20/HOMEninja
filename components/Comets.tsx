"use client";

import { useEffect, useRef, useState } from "react";

interface CometData {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  angle: number;
  duration: number;
  tailLength: number;
  delay: number;
}

function randomComet(id: number): CometData {
  const fromRight = Math.random() > 0.5;
  const startX = fromRight ? 100 + Math.random() * 15 : -(5 + Math.random() * 15);
  const startY = Math.random() * 70;
  const endX = fromRight ? -(10 + Math.random() * 20) : 100 + Math.random() * 20;
  const endY = startY + 15 + Math.random() * 40;
  const dx = endX - startX;
  const dy = endY - startY;
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return {
    id,
    startX,
    startY,
    endX,
    endY,
    angle,
    duration: 2 + Math.random() * 4,
    tailLength: 40 + Math.random() * 80,
    delay: 0,
  };
}

function CometElement({ comet, onDone }: { comet: CometData; onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const anim = el.animate(
      [
        {
          opacity: 0,
          transform: `translate(${comet.startX}vw, ${comet.startY}vh) rotate(${comet.angle}deg)`,
        },
        {
          opacity: 0.85,
          offset: 0.08,
        },
        {
          opacity: 0.85,
          offset: 0.7,
        },
        {
          opacity: 0,
          transform: `translate(${comet.endX}vw, ${comet.endY}vh) rotate(${comet.angle}deg)`,
        },
      ],
      { duration: comet.duration * 1000, easing: "linear", fill: "forwards" },
    );

    anim.onfinish = onDone;
    return () => anim.cancel();
  }, [comet, onDone]);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 2,
        height: 2,
        borderRadius: "50%",
        background: "oklch(0.95 0.02 240)",
        boxShadow: "0 0 4px oklch(0.95 0.02 240 / 0.8)",
        opacity: 0,
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: comet.tailLength,
          height: 1,
          background:
            "linear-gradient(to left, oklch(0.95 0.02 240 / 0.7), transparent)",
          transformOrigin: "left center",
        }}
      />
    </div>
  );
}

export default function Comets() {
  const [comets, setComets] = useState<CometData[]>([]);
  const counterRef = useRef(0);
  const reducedRef = useRef(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mql.matches;
    const handler = (e: MediaQueryListEvent) => {
      reducedRef.current = e.matches;
    };
    mql.addEventListener("change", handler);

    function spawn() {
      if (reducedRef.current) return;
      const count = 1 + Math.floor(Math.random() * 2);
      const newComets: CometData[] = [];
      for (let i = 0; i < count; i++) {
        newComets.push(randomComet(counterRef.current++));
      }
      setComets((prev) => [...prev, ...newComets]);
    }

    function scheduleNext() {
      const wait = 6000 + Math.random() * 18000;
      return setTimeout(() => {
        spawn();
        timerRef = scheduleNext();
      }, wait);
    }

    const initialDelay = setTimeout(() => {
      spawn();
      timerRef = scheduleNext();
    }, 3000 + Math.random() * 5000);

    let timerRef: ReturnType<typeof setTimeout>;

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(timerRef);
      mql.removeEventListener("change", handler);
    };
  }, []);

  const handleDone = (id: number) => {
    setComets((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div aria-hidden="true">
      {comets.map((c) => (
        <CometElement
          key={c.id}
          comet={c}
          onDone={() => handleDone(c.id)}
        />
      ))}
    </div>
  );
}
