/* ── 효과 #3: 성운 (Nebula) ──────────────────────
 * 제거 방법: AppSection.tsx에서 <Nebula /> 삭제
 * 구현: CSS radial-gradient + opacity. DOM 1개, 애니메이션 없음.
 * 성능 영향: 없음
 * ─────────────────────────────────────────────── */

export default function Nebula({
  color,
  position,
  size,
}: {
  color: string;
  position: { x: string; y: string };
  size: number;
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute rounded-full pointer-events-none"
      style={{
        width: `${size}vh`,
        height: `${size}vh`,
        left: position.x,
        top: position.y,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: 0.08,
      }}
    />
  );
}
