import type { GalaxyBackground as GalaxyBgType } from "@/types/galaxy";

export default function GalaxyBackground({ bg }: { bg: GalaxyBgType }) {
  if (!bg.gradients.length) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {bg.gradients.map((g, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${g.size}vh`,
            height: `${g.size}vh`,
            left: g.x,
            top: g.y,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${g.color} 0%, transparent 65%)`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}
