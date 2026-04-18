"use client";

interface EarthProps {
  onClick: () => void;
  size?: number;
}

export default function Earth({ onClick, size = 52 }: EarthProps) {
  return (
    <button
      onClick={onClick}
      aria-label="후원 페이지 열기 — 지구에서 우리집까지 줌인"
      className="earth-btn"
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        border: "none",
        padding: 0,
        background: "transparent",
        cursor: "pointer",
        display: "block",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: -10,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.6 0.18 230 / 0.2), transparent 70%)",
          animation: "earth-halo 4s ease-in-out infinite alternate",
        }}
      />
      <svg
        viewBox="0 0 100 100"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          position: "relative",
        }}
      >
        <defs>
          <radialGradient id="earth-sphere" cx="0.35" cy="0.35" r="0.9">
            <stop offset="0%" stopColor="oklch(0.72 0.12 230)" />
            <stop offset="50%" stopColor="oklch(0.48 0.16 225)" />
            <stop offset="100%" stopColor="oklch(0.12 0.05 225)" />
          </radialGradient>
          <clipPath id="earth-clip">
            <circle cx="50" cy="50" r="48" />
          </clipPath>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#earth-sphere)" />
        <g
          clipPath="url(#earth-clip)"
          fill="oklch(0.55 0.12 140)"
          opacity="0.85"
        >
          <path d="M25,38 q6,-4 12,-2 q4,4 2,8 q-6,3 -12,1 z" />
          <path d="M42,30 q8,-2 14,2 q3,5 1,10 q-4,3 -10,1 q-6,-6 -5,-13 z" />
          <path d="M60,45 q10,-3 18,2 q4,6 -1,12 q-8,4 -15,-1 q-6,-7 -2,-13 z" />
          <path d="M30,60 q6,-2 10,1 q2,5 -2,8 q-6,1 -9,-3 z" />
          <path d="M50,68 q8,0 12,5 q-2,6 -10,7 q-7,-4 -2,-12 z" />
        </g>
        <circle
          cx="35"
          cy="35"
          r="14"
          fill="oklch(1 0 0 / 0.15)"
          style={{ filter: "blur(4px)" }}
        />
      </svg>
    </button>
  );
}
