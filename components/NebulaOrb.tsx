import type { NebulaObject } from "@/types/galaxy";

export default function NebulaOrb({ obj }: { obj: NebulaObject }) {
  const { size, position, hue } = obj;
  const sizePx = `clamp(160px, ${size}vh, ${size * 1.5}vh)`;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: sizePx,
        height: sizePx,
        pointerEvents: "none",
        animation: "orb-float 9s ease-in-out infinite alternate",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: `radial-gradient(circle at 45% 40%,
            oklch(0.92 0.08 ${hue} / 0.85) 0%,
            oklch(0.72 0.20 ${hue} / 0.6) 20%,
            oklch(0.45 0.22 ${hue} / 0.35) 50%,
            oklch(0.25 0.15 ${hue} / 0.1) 75%,
            transparent 100%)`,
          filter: "blur(2px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "40%",
          top: "35%",
          width: "15%",
          height: "15%",
          borderRadius: "50%",
          background: `radial-gradient(circle, oklch(1 0 0 / 0.9), oklch(0.95 0.05 ${hue} / 0.3) 60%, transparent)`,
          filter: "blur(3px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "-30%",
          top: "-30%",
          width: "160%",
          height: "160%",
          borderRadius: "50%",
          background: `radial-gradient(circle, oklch(0.6 0.2 ${hue} / 0.15), transparent 60%)`,
        }}
      />
    </div>
  );
}
