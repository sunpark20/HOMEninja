"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface Streak {
  id: number;
  angle: number;
  length: number;
  thickness: number;
  opacity: number;
}

interface FlareEvent {
  id: number;
  originX: number;
  originY: number;
  streaks: Streak[];
  duration: number;
  pointSize: number;
}

function randomFlare(id: number): FlareEvent {
  const streakCount = 2 + Math.floor(Math.random() * 4);
  const baseAngle = Math.random() * 360;
  const streaks: Streak[] = [];

  for (let i = 0; i < streakCount; i++) {
    streaks.push({
      id: i,
      angle: baseAngle + (Math.random() * 120 - 60) + i * (140 / streakCount),
      length: 30 + Math.random() * 70,
      thickness: 1 + Math.random() * 16,
      opacity: 0.08 + Math.random() * 0.35,
    });
  }

  return {
    id,
    originX: 10 + Math.random() * 80,
    originY: 5 + Math.random() * 30,
    streaks,
    duration: 1200 + Math.random() * 1200,
    pointSize: 20 + Math.random() * 40,
  };
}

function FlareInstance({
  flare,
  onDone,
}: {
  flare: FlareEvent;
  onDone: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const anim = el.animate(
      [
        { opacity: 0 },
        { opacity: 1, offset: 0.1 },
        { opacity: 0.6, offset: 0.65 },
        { opacity: 0 },
      ],
      { duration: flare.duration, easing: "ease-out", fill: "forwards" },
    );
    anim.onfinish = onDone;
    return () => anim.cancel();
  }, [flare, onDone]);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 3,
        opacity: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: `${flare.originX}%`,
          top: `${flare.originY}%`,
          width: flare.pointSize,
          height: flare.pointSize,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.99 0.02 70 / 0.8), oklch(0.95 0.04 60 / 0.2) 40%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />
      {flare.streaks.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${flare.originX}%`,
            top: `${flare.originY}%`,
            width: `${s.length}vw`,
            height: s.thickness,
            background: `linear-gradient(90deg, oklch(0.99 0.01 60 / ${s.opacity}) 0%, oklch(1 0 0 / ${Math.min(s.opacity * 2, 0.7)}) 50%, oklch(0.99 0.01 60 / ${s.opacity}) 100%)`,
            transform: `rotate(${s.angle}deg)`,
            transformOrigin: "0 50%",
          }}
        />
      ))}
    </div>
  );
}

export default function LensFlare({ active }: { active: boolean }) {
  const [flares, setFlares] = useState<FlareEvent[]>([]);
  const counterRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleDone = useCallback((id: number) => {
    setFlares((prev) => prev.filter((f) => f.id !== id));
  }, []);

  useEffect(() => {
    if (!active) {
      setFlares([]);
      return;
    }

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    function spawn() {
      const f = randomFlare(counterRef.current++);
      setFlares((prev) => [...prev, f]);
    }

    function scheduleNext() {
      const wait = 8000 + Math.random() * 14000;
      timerRef.current = setTimeout(() => {
        spawn();
        scheduleNext();
      }, wait);
    }

    const initial = setTimeout(() => {
      spawn();
      scheduleNext();
    }, 2000 + Math.random() * 3000);

    return () => {
      clearTimeout(initial);
      clearTimeout(timerRef.current);
      setFlares([]);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div aria-hidden="true">
      {flares.map((f) => (
        <FlareInstance
          key={f.id}
          flare={f}
          onDone={() => handleDone(f.id)}
        />
      ))}
    </div>
  );
}
