"use client";

import { useEffect, useState, useRef } from "react";

export default function LensFlare({ active }: { active: boolean }) {
  const [visible, setVisible] = useState(false);
  const [angle, setAngle] = useState(25);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (!active) {
      setVisible(false);
      return;
    }

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    function flash() {
      setAngle(15 + Math.random() * 25);
      setVisible(true);
      setTimeout(() => setVisible(false), 1800);
    }

    const t1 = setTimeout(() => {
      flash();
      intervalRef.current = setInterval(flash, 10000 + Math.random() * 8000);
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearInterval(intervalRef.current);
      setVisible(false);
    };
  }, [active]);

  if (!active || !visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 3, animation: "flare-in 1800ms ease-out forwards" }}
    >
      {/* 광원 포인트 */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "12%",
          width: 40,
          height: 40,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.99 0.02 70 / 0.9), oklch(0.95 0.04 60 / 0.3) 40%, transparent 70%)",
        }}
      />
      {/* 메인 빛줄기 — 넓은 */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "12%",
          width: "120vw",
          height: 20,
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.95 0.03 60 / 0.08) 10%, oklch(0.98 0.02 65 / 0.25) 40%, oklch(0.99 0.01 60 / 0.4) 50%, oklch(0.98 0.02 65 / 0.25) 60%, oklch(0.95 0.03 60 / 0.08) 90%, transparent 100%)",
          transform: `rotate(${angle}deg)`,
          transformOrigin: "0 50%",
        }}
      />
      {/* 코어 빛줄기 — 밝은 중심선 */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "12%",
          width: "120vw",
          height: 4,
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.99 0.01 60 / 0.2) 20%, oklch(1 0 0 / 0.6) 45%, oklch(1 0 0 / 0.8) 50%, oklch(1 0 0 / 0.6) 55%, oklch(0.99 0.01 60 / 0.2) 80%, transparent 100%)",
          transform: `rotate(${angle}deg)`,
          transformOrigin: "0 50%",
        }}
      />
      {/* 수직 교차 빛줄기 */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "12%",
          width: "60vw",
          height: 10,
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.95 0.03 60 / 0.06) 20%, oklch(0.98 0.02 60 / 0.2) 45%, oklch(0.99 0.01 60 / 0.3) 50%, oklch(0.98 0.02 60 / 0.2) 55%, transparent 80%)",
          transform: `rotate(${angle + 85}deg)`,
          transformOrigin: "0 50%",
        }}
      />
    </div>
  );
}
