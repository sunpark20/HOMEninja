"use client";

import { useEffect, useState } from "react";

export default function LensFlare({ active }: { active: boolean }) {
  const [visible, setVisible] = useState(false);
  const [angle, setAngle] = useState(25);

  useEffect(() => {
    if (!active) {
      setVisible(false);
      return;
    }

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    function flash() {
      setAngle(15 + Math.random() * 30);
      setVisible(true);
      setTimeout(() => setVisible(false), 1200);
    }

    const first = 3000 + Math.random() * 4000;
    const t1 = setTimeout(() => {
      flash();
      const interval = setInterval(flash, 8000 + Math.random() * 12000);
      cleanup = () => clearInterval(interval);
    }, first);

    let cleanup = () => {};
    return () => {
      clearTimeout(t1);
      cleanup();
      setVisible(false);
    };
  }, [active]);

  if (!active || !visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 3, animation: "flare-in 1200ms ease-out forwards" }}
    >
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "110%",
          height: "6px",
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.95 0.02 60 / 0.15) 20%, oklch(0.98 0.01 60 / 0.5) 50%, oklch(0.95 0.02 60 / 0.15) 80%, transparent 100%)",
          transform: `rotate(${angle}deg)`,
          transformOrigin: "top right",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "110%",
          height: "2px",
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.98 0.005 60 / 0.3) 30%, oklch(1 0 0 / 0.7) 50%, oklch(0.98 0.005 60 / 0.3) 70%, transparent 100%)",
          transform: `rotate(${angle}deg)`,
          transformOrigin: "top right",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "80%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, oklch(0.9 0.03 60 / 0.2) 40%, oklch(0.95 0.01 60 / 0.4) 50%, transparent 80%)",
          transform: `rotate(${angle + 90}deg)`,
          transformOrigin: "top right",
        }}
      />
    </div>
  );
}
