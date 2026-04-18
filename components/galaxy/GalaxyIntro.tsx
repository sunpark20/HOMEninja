import type { Galaxy } from "@/types/galaxy";

export default function GalaxyIntro({ galaxy }: { galaxy: Galaxy }) {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center"
      style={{
        minHeight: "75vh",
        padding: "40px 24px 60px",
        zIndex: 20,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(620px, 90%)",
          height: 260,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, oklch(0.5 0.15 280 / 0.12) 0%, transparent 65%)",
          filter: "blur(8px)",
          pointerEvents: "none",
        }}
      />
      <div
        className="relative font-[family-name:var(--font-display)] text-xs tracking-[0.3em] uppercase mb-4"
        style={{ color: galaxy.accent, opacity: 0.85 }}
      >
        {galaxy.name}
      </div>
      <h2
        className="relative m-0 font-[family-name:var(--font-display)] font-bold tracking-tight whitespace-nowrap"
        style={{
          color: "oklch(0.96 0.005 260)",
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          textShadow: "0 2px 30px oklch(0 0 0 / 0.5)",
        }}
      >
        {galaxy.nameKo}
      </h2>
      <p
        className="relative mt-3.5 max-w-[460px]"
        style={{
          color: "oklch(0.68 0.01 260)",
          fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
          textShadow: "0 1px 20px oklch(0 0 0 / 0.6)",
        }}
      >
        {galaxy.subtitle}
      </p>
    </section>
  );
}
