"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const ZOOM_STAGES = [
  { id: "earth", label: "지구", caption: "파란 별, 우리 집이 있는 곳" },
  { id: "asia", label: "아시아", caption: "동쪽으로, 동쪽으로" },
  { id: "korea", label: "한반도", caption: "반도 하나가 보여요" },
  { id: "south", label: "대한민국", caption: "남쪽 끝 섬이 하나 있어요" },
  { id: "jeju", label: "제주도", caption: "섬 한복판에 한라산" },
  {
    id: "house",
    label: "우리집",
    caption: "여기서 닌자거북이 앱을 만들고 있어요",
  },
] as const;

const STAGE_VIEWS: Record<string, [number, number, number, number]> = {
  earth: [0, 0, 1000, 1000],
  asia: [480, 280, 360, 360],
  korea: [620, 380, 140, 200],
  south: [650, 440, 90, 120],
  jeju: [670, 530, 28, 22],
  house: [680, 538, 6, 5],
};

function WorldMap() {
  return (
    <g>
      <defs>
        <radialGradient id="zm-earth" cx="0.35" cy="0.35" r="0.8">
          <stop offset="0%" stopColor="oklch(0.75 0.12 230)" />
          <stop offset="55%" stopColor="oklch(0.45 0.16 225)" />
          <stop offset="100%" stopColor="oklch(0.15 0.06 225)" />
        </radialGradient>
        <radialGradient id="zm-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="60%" stopColor="oklch(0.6 0.2 230 / 0)" />
          <stop offset="85%" stopColor="oklch(0.7 0.22 230 / 0.4)" />
          <stop offset="100%" stopColor="oklch(0.6 0.22 230 / 0)" />
        </radialGradient>
        <clipPath id="zm-globe-clip">
          <circle cx="500" cy="500" r="490" />
        </clipPath>
      </defs>
      <circle cx="500" cy="500" r="540" fill="url(#zm-glow)" />
      <circle cx="500" cy="500" r="490" fill="url(#zm-earth)" />

      <g
        clipPath="url(#zm-globe-clip)"
        fill="oklch(0.6 0.14 145)"
        opacity="0.88"
      >
        <path d="M120,330 q60,-40 140,-20 q50,20 40,80 q-30,60 -80,80 q-90,20 -120,-30 q-40,-60 20,-110 z" />
        <path d="M280,560 q40,-20 70,10 q30,50 10,110 q-20,60 -50,70 q-40,-30 -40,-90 q-10,-60 10,-100 z" />
        <path d="M470,330 q40,-30 80,-15 q30,15 25,50 q-20,30 -60,30 q-50,-10 -45,-65 z" />
        <path d="M500,420 q40,-10 70,20 q20,60 -10,130 q-30,70 -70,70 q-50,-40 -30,-120 q10,-60 40,-100 z" />
        <path d="M560,300 q120,-30 220,20 q50,60 30,150 q-40,80 -130,100 q-110,10 -170,-60 q-40,-80 -20,-150 q10,-40 70,-60 z" />
        <path d="M780,640 q40,-10 60,10 q10,30 -10,50 q-40,20 -70,0 q-20,-30 20,-60 z" />
      </g>

      <g opacity="1">
        <path
          d="M560,380 q70,-20 130,-10 q50,20 60,55 q-10,40 -70,55 q-80,10 -130,-20 q-30,-30 10,-80 z"
          fill="oklch(0.55 0.11 140)"
          opacity="0.9"
        />
        <path
          d="M760,440 q12,-8 18,2 q4,12 -6,20 q-14,4 -12,-22 z"
          fill="oklch(0.52 0.12 140)"
        />
        <path
          d="M770,470 q10,-4 14,4 q2,10 -8,16 q-12,0 -6,-20 z"
          fill="oklch(0.52 0.12 140)"
        />
        <path
          d="M678,400 q10,-4 18,2 q6,10 2,22 q0,20 -4,40 q-2,30 -10,50 q-6,12 -14,8 q-6,-10 -4,-28 q0,-30 4,-50 q0,-24 8,-44 z"
          fill="oklch(0.6 0.13 145)"
        />
        <ellipse cx="685" cy="541" rx="14" ry="8" fill="oklch(0.62 0.14 145)" />
      </g>

      <g>
        <path
          d="M680,440 q12,0 18,8 q2,20 -2,40 q-6,18 -14,30 q-8,-2 -10,-18 q-2,-26 0,-44 q2,-12 8,-16 z"
          fill="oklch(0.65 0.12 140)"
          opacity="0.8"
        />
        <circle cx="698" cy="510" r="1.2" fill="oklch(0.8 0.08 80)" />
        <circle cx="692" cy="495" r="0.9" fill="oklch(0.8 0.08 80)" />
        <circle cx="686" cy="470" r="1.1" fill="oklch(0.8 0.08 80)" />
        <circle cx="690" cy="444" r="1.6" fill="oklch(0.85 0.12 60)" />
      </g>

      <g>
        <ellipse
          cx="685"
          cy="541"
          rx="14"
          ry="8.2"
          fill="oklch(0.64 0.13 145)"
        />
        <circle cx="685" cy="541" r="2.2" fill="oklch(0.55 0.09 60)" />
        <circle cx="685" cy="541" r="1.0" fill="oklch(0.85 0.04 60)" />
        <circle cx="679" cy="539" r="0.5" fill="oklch(0.8 0.1 60)" />
        <circle cx="691" cy="540" r="0.5" fill="oklch(0.8 0.1 60)" />
        <circle cx="685" cy="547" r="0.5" fill="oklch(0.8 0.1 60)" />
      </g>

      <g transform="translate(682.5, 540)">
        <circle cx="0" cy="0" r="1.5" fill="oklch(0.85 0.14 60 / 0.3)">
          <animate
            attributeName="r"
            from="1.5"
            to="4"
            dur="1.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="0.6"
            to="0"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </circle>
        <g transform="scale(0.06)">
          <path
            d="M-20,-4 L0,-22 L20,-4 L16,-4 L16,14 L-16,14 L-16,-4 Z"
            fill="oklch(0.72 0.16 40)"
            stroke="oklch(0.3 0.05 40)"
            strokeWidth="1.5"
          />
          <rect x="-5" y="2" width="10" height="12" fill="oklch(0.35 0.06 40)" />
          <rect
            x="-14"
            y="-2"
            width="6"
            height="6"
            fill="oklch(0.85 0.12 80)"
          />
          <rect x="8" y="-2" width="6" height="6" fill="oklch(0.85 0.12 80)" />
          <path
            d="M10,-10 q2,-4 0,-8 q-2,-4 2,-8"
            fill="none"
            stroke="oklch(0.7 0 0 / 0.6)"
            strokeWidth="1"
          />
        </g>
      </g>
    </g>
  );
}

function HousePanel({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "absolute",
        right: 24,
        bottom: 24,
        zIndex: 10,
        width: "min(420px, calc(100% - 48px))",
        padding: "32px 32px 28px",
        borderRadius: 16,
        background: "oklch(0.07 0.01 260 / 0.96)",
        border: "1px solid oklch(1 0 0 / 0.1)",
        fontFamily: "var(--font-body)",
        color: "oklch(0.88 0.005 260)",
        animation: "panel-rise 420ms cubic-bezier(.2,.8,.2,1) forwards",
        transform: "translateY(16px)",
        opacity: 0,
      }}
    >
      <h3
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "oklch(0.96 0.005 260)",
          textAlign: "center",
        }}
      >
        닌자거북이 작업실
      </h3>
      <p
        style={{
          marginTop: 6,
          fontSize: 13,
          lineHeight: 1.5,
          color: "oklch(0.6 0.01 260)",
          textAlign: "center",
        }}
      >
        여기서 기억의궁전, 제주택배비지원 같은 앱을 만들고 있어요
      </p>

      <div
        style={{
          marginTop: 20,
          padding: 20,
          borderRadius: 14,
          background: "oklch(0.98 0.002 260)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <Image
          src="/toss-qr.png"
          alt="토스 후원 QR 코드"
          width={240}
          height={240}
          style={{ borderRadius: 8 }}
        />
        <div
          style={{
            fontSize: 13,
            color: "oklch(0.45 0.01 260)",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          토스로 후원하기 — 카메라로 스캔하세요
        </div>
      </div>

      <button
        onClick={onClose}
        style={{
          position: "absolute",
          right: 12,
          top: 12,
          width: 28,
          height: 28,
          borderRadius: 999,
          background: "oklch(1 0 0 / 0.06)",
          border: "1px solid oklch(1 0 0 / 0.1)",
          color: "oklch(0.8 0.005 260)",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label="닫기"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 3l6 6M9 3l-6 6" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

function ZoomControls({
  step,
  total,
  onBack,
  onForward,
  onJump,
}: {
  step: number;
  total: number;
  onBack: () => void;
  onForward: () => void;
  onJump: (i: number) => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: 24,
        transform: "translateX(-50%)",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 10px",
        borderRadius: 999,
        background: "oklch(0.05 0.01 260 / 0.9)",
        border: "1px solid oklch(1 0 0 / 0.08)",
        fontFamily: "var(--font-body)",
      }}
    >
      <button
        onClick={onBack}
        disabled={step === 0}
        aria-label="한 단계 뒤로"
        style={{
          width: 36,
          height: 36,
          borderRadius: 999,
          padding: 0,
          background: "transparent",
          color:
            step === 0
              ? "oklch(0.3 0.01 260)"
              : "oklch(0.9 0.005 260)",
          border: "1px solid oklch(1 0 0 / 0.1)",
          cursor: step === 0 ? "not-allowed" : "pointer",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          style={{ display: "block", margin: "auto" }}
        >
          <path
            d="M10 3L5 8l5 5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div style={{ display: "flex", gap: 4 }}>
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onJump(i)}
            aria-label={`${i + 1}단계`}
            style={{
              width: i === step ? 20 : 6,
              height: 6,
              borderRadius: 3,
              padding: 0,
              border: "none",
              background:
                i === step
                  ? "oklch(0.7 0.15 230)"
                  : "oklch(1 0 0 / 0.2)",
              cursor: "pointer",
              transition: "all 240ms cubic-bezier(.25,1,.5,1)",
            }}
          />
        ))}
      </div>
      <button
        onClick={onForward}
        disabled={step === total - 1}
        aria-label="더 가까이"
        style={{
          width: 36,
          height: 36,
          borderRadius: 999,
          padding: 0,
          background: "transparent",
          color:
            step === total - 1
              ? "oklch(0.3 0.01 260)"
              : "oklch(0.9 0.005 260)",
          border: "1px solid oklch(1 0 0 / 0.1)",
          cursor: step === total - 1 ? "not-allowed" : "pointer",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          style={{ display: "block", margin: "auto" }}
        >
          <path
            d="M6 3l5 5-5 5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default function EarthZoom({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!open) {
      setStep(0);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        setStep((s) => Math.max(0, s - 1));
      if (e.key === "ArrowRight")
        setStep((s) => Math.min(ZOOM_STAGES.length - 1, s + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleClose = useCallback(() => onClose(), [onClose]);

  if (!open) return null;

  const stage = ZOOM_STAGES[step];
  const view = STAGE_VIEWS[stage.id];
  const isHouse = stage.id === "house";

  const advance = () =>
    setStep((s) => Math.min(ZOOM_STAGES.length - 1, s + 1));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="지구에서 우리집까지"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 700,
        background: "oklch(0.02 0.005 260)",
        animation: "fade-in 220ms ease-out forwards",
      }}
    >
      <svg
        onClick={() => !isHouse && advance()}
        viewBox={view.join(" ")}
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          transition: "all 1100ms cubic-bezier(.6,.05,.15,1)",
          cursor: isHouse ? "default" : "zoom-in",
        }}
      >
        <WorldMap />
      </svg>

      <div
        style={{
          position: "absolute",
          left: 24,
          top: 24,
          zIndex: 5,
          fontFamily: "var(--font-body)",
          color: "oklch(0.9 0.005 260)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "oklch(0.6 0.12 230)",
            opacity: 0.85,
            marginBottom: 6,
          }}
        >
          Step {step + 1} / {ZOOM_STAGES.length}
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {stage.label}
        </div>
        <div
          style={{
            marginTop: 4,
            fontSize: 14,
            color: "oklch(0.7 0.01 260)",
          }}
        >
          {stage.caption}
        </div>
      </div>

      <button
        onClick={handleClose}
        aria-label="닫기"
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 15,
          width: 40,
          height: 40,
          borderRadius: 999,
          background: "oklch(0.08 0.01 260 / 0.9)",
          border: "1px solid oklch(1 0 0 / 0.1)",
          color: "oklch(0.9 0.005 260)",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 3l8 8M11 3l-8 8" strokeLinecap="round" />
        </svg>
      </button>

      {isHouse && <HousePanel onClose={handleClose} />}

      <ZoomControls
        step={step}
        total={ZOOM_STAGES.length}
        onBack={() => setStep((s) => Math.max(0, s - 1))}
        onForward={advance}
        onJump={setStep}
      />
    </div>
  );
}
