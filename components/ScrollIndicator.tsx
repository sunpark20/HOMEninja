"use client";

import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY < 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="flex flex-col items-center gap-2 animate-gentle-bounce">
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "oklch(0.55 0.01 260)" }}
        >
          탐색하기
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          style={{ color: "oklch(0.55 0.01 260)" }}
        >
          <path d="M4 7l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
