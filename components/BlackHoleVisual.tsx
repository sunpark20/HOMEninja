import type { BlackHoleObject } from "@/types/galaxy";

type Props = {
  obj: BlackHoleObject;
  onClick?: () => void;
};

const STROKE = "oklch(0.68 0.018 245 / 0.46)";
const DIM_STROKE = "oklch(0.42 0.012 250 / 0.38)";
const FILL = "oklch(0.30 0.012 250 / 0.52)";
const DARK_FILL = "oklch(0.12 0.01 250 / 0.78)";
const WARM_EDGE = "oklch(0.55 0.045 76 / 0.42)";

function SatelliteDebris() {
  return (
    <svg viewBox="0 0 160 120" className="absolute inset-0 h-full w-full overflow-visible">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="65" y="48" width="30" height="22" rx="3" fill={DARK_FILL} stroke={STROKE} strokeWidth="2" />
        <path d="M78 45 L82 33 M82 33 L92 25" stroke={DIM_STROKE} strokeWidth="1.5" />
        <path d="M94 54 L124 38 L134 58 L101 70 Z" fill={FILL} stroke={STROKE} strokeWidth="2" />
        <path d="M58 58 L26 44 L20 66 L55 72 Z" fill={FILL} stroke={STROKE} strokeWidth="2" />
        <path d="M35 49 L28 64 M112 44 L126 62 M50 55 L42 69 M120 40 L132 55" stroke={DIM_STROKE} strokeWidth="1" />
        <path d="M80 70 C72 84 64 89 52 92" stroke={WARM_EDGE} strokeWidth="1.4" />
        <circle cx="94" cy="25" r="5" fill="none" stroke={STROKE} strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function BoosterDebris() {
  return (
    <svg viewBox="0 0 160 120" className="absolute inset-0 h-full w-full overflow-visible">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M48 66 C54 41 101 32 116 50 C101 72 66 86 48 66 Z" fill={DARK_FILL} stroke={STROKE} strokeWidth="2" />
        <path d="M51 66 C42 70 35 78 30 90 C45 91 57 86 63 77" fill={FILL} stroke={DIM_STROKE} strokeWidth="2" />
        <path d="M116 50 L132 43 L123 60 Z" fill={FILL} stroke={STROKE} strokeWidth="2" />
        <path d="M65 45 L77 76 M84 38 L95 68 M103 39 L108 58" stroke={DIM_STROKE} strokeWidth="1" />
        <path d="M32 90 C42 84 51 81 63 77" stroke={WARM_EDGE} strokeWidth="1.5" />
        <path d="M39 58 L25 51 M83 83 L80 101" stroke={DIM_STROKE} strokeWidth="2" />
      </g>
    </svg>
  );
}

function PanelDebris() {
  return (
    <svg viewBox="0 0 160 120" className="absolute inset-0 h-full w-full overflow-visible">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M35 34 L124 24 L132 82 L50 93 Z" fill={DARK_FILL} stroke={STROKE} strokeWidth="2" />
        <path d="M73 29 L82 88 M104 27 L111 84 M40 54 L128 43 M45 75 L131 64" stroke={DIM_STROKE} strokeWidth="1" />
        <path d="M122 24 L113 42 L132 40 M52 93 L68 76 L43 76" stroke={WARM_EDGE} strokeWidth="1.4" />
        <path d="M25 75 L15 87 L31 91 Z M122 92 L139 92 L132 106 Z M50 19 L58 8 L66 21 Z" fill={FILL} stroke={DIM_STROKE} strokeWidth="1.2" />
      </g>
    </svg>
  );
}

function ShipDebris() {
  return (
    <svg viewBox="0 0 180 130" className="absolute inset-0 h-full w-full overflow-visible">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M34 79 C55 40 109 31 144 53 C122 82 71 99 34 79 Z" fill={DARK_FILL} stroke={STROKE} strokeWidth="2" />
        <path d="M83 41 L67 23 L105 35 M105 86 L124 102 L86 93" fill={FILL} stroke={DIM_STROKE} strokeWidth="2" />
        <path d="M36 78 L24 89 L43 93 L57 88" fill={FILL} stroke={STROKE} strokeWidth="1.7" />
        <path d="M129 47 L155 38 M137 56 L160 58 M122 65 L148 78" stroke={WARM_EDGE} strokeWidth="1.2" />
        <path d="M59 62 C77 52 100 48 122 52 M61 78 C83 73 106 65 129 52" stroke={DIM_STROKE} strokeWidth="1" />
        <path d="M91 39 L96 55 L115 35 M72 91 L84 74 L103 93" stroke={STROKE} strokeWidth="1.4" />
        <path d="M30 39 L17 31 L21 50 Z M139 88 L158 91 L147 105 Z" fill={FILL} stroke={DIM_STROKE} strokeWidth="1.2" />
      </g>
    </svg>
  );
}

function CapsuleDebris() {
  return (
    <svg viewBox="0 0 160 120" className="absolute inset-0 h-full w-full overflow-visible">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 64 C49 42 66 27 88 29 C111 32 124 49 120 70 C107 88 66 88 50 64 Z" fill={DARK_FILL} stroke={STROKE} strokeWidth="2" />
        <path d="M57 75 C73 84 102 84 117 70" stroke={WARM_EDGE} strokeWidth="1.5" />
        <path d="M70 36 L61 69 M92 31 L89 84 M111 45 L102 80" stroke={DIM_STROKE} strokeWidth="1" />
        <path d="M45 59 L25 50 M53 79 L40 95 M116 38 L132 25" stroke={DIM_STROKE} strokeWidth="2" />
        <path d="M129 25 L142 20 L138 35 Z M25 50 L12 47 L21 61 Z" fill={FILL} stroke={DIM_STROKE} strokeWidth="1.2" />
      </g>
    </svg>
  );
}

function DebrisShape({ type }: { type: NonNullable<BlackHoleObject["debrisType"]> }) {
  if (type === "satellite") return <SatelliteDebris />;
  if (type === "booster") return <BoosterDebris />;
  if (type === "panel") return <PanelDebris />;
  if (type === "capsule") return <CapsuleDebris />;
  return <ShipDebris />;
}

function AmbientFragments() {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute"
        style={{
          left: "10%",
          top: "18%",
          width: "9%",
          height: "7%",
          background: "oklch(0.24 0.012 250 / 0.62)",
          clipPath: "polygon(0 20%, 78% 0, 100% 80%, 18% 100%)",
          transform: "rotate(-18deg)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute"
        style={{
          right: "6%",
          top: "27%",
          width: "20%",
          height: "2px",
          background: "oklch(0.45 0.015 250 / 0.52)",
          transform: "rotate(41deg)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute"
        style={{
          left: "68%",
          bottom: "14%",
          width: "13%",
          height: "9%",
          border: "1px solid oklch(0.50 0.015 250 / 0.32)",
          clipPath: "polygon(8% 0, 100% 18%, 74% 100%, 0 70%)",
          transform: "rotate(12deg)",
        }}
      />
    </>
  );
}

export default function BlackHoleVisual({ obj, onClick }: Props) {
  const { size, position, rotate } = obj;
  const type = obj.debrisType ?? "ship";
  const driftIndex = type === "satellite" || type === "ship" ? 0 : type === "booster" ? 1 : 2;
  const duration = type === "ship" ? 34 : type === "panel" ? 42 : 38;
  const sizePx = `clamp(150px, ${size}vh, ${size * 1.55}vh)`;
  const clickable = !!onClick;

  return (
    <button
      type="button"
      aria-label={obj.name}
      onClick={onClick}
      disabled={!clickable}
      className="absolute p-0 border-0 bg-transparent pointer-events-auto"
      style={{
        left: position.x,
        top: position.y,
        width: sizePx,
        height: sizePx,
        cursor: clickable ? "pointer" : "default",
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <span
        aria-hidden="true"
        className="black-hole-drift absolute inset-0"
        style={{
          animation: `black-hole-drift-${driftIndex} ${duration}s ease-in-out infinite alternate`,
        }}
      >
        <span
          aria-hidden="true"
          className="absolute rounded-full"
          style={{
            inset: "18%",
            background:
              "radial-gradient(circle at 50% 50%, oklch(0.015 0.004 260) 0 38%, oklch(0.045 0.01 260 / 0.72) 45%, oklch(0.08 0.012 260 / 0.12) 64%, transparent 76%)",
            boxShadow: "inset 0 0 28px oklch(0.02 0.002 260 / 0.95)",
          }}
        />
        <span
          aria-hidden="true"
          className="absolute rounded-full"
          style={{
            left: "4%",
            right: "4%",
            top: "40%",
            height: "20%",
            borderTop: "1px solid oklch(0.60 0.045 80 / 0.34)",
            borderBottom: "1px solid oklch(0.36 0.035 75 / 0.16)",
            transform: "rotate(-10deg)",
          }}
        />
        <AmbientFragments />
        <span
          aria-hidden="true"
          className="absolute"
          style={{
            inset: type === "ship" ? "8%" : "12%",
            opacity: type === "panel" ? 0.62 : 0.72,
          }}
        >
          <DebrisShape type={type} />
        </span>
      </span>
    </button>
  );
}
