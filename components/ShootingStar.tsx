/* ── 효과 #4: 유성 (Shooting Star) ────────────────
 * 제거 방법: layout.tsx에서 <ShootingStar /> 삭제
 * 구현: CSS keyframe 1개. DOM 요소 1개.
 * 성능 영향: 없음 (transform + opacity만 사용)
 * ─────────────────────────────────────────────── */

export default function ShootingStar() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <div className="shooting-star shooting-star-1" />
      <div className="shooting-star shooting-star-2" />
    </div>
  );
}
