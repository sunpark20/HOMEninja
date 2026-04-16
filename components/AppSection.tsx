import type { AppData } from "@/types/app";
import Planet from "./Planet";
import Nebula from "./Nebula";
import AppCard from "./AppCard";

/* 각 행성 섹션에 배치할 성운 색상 */
const nebulaColors = [
  "oklch(0.5 0.1 45)",   // 따뜻한 톤 (행성 1 매칭)
  "oklch(0.5 0.08 210)", // 차가운 톤 (행성 2 매칭)
  "oklch(0.5 0.1 130)",  // 초록 톤 (행성 3 매칭)
];

export default function AppSection({
  app,
  index,
}: {
  app: AppData;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <section
      id={app.id}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* 효과 #3: 성운 — 제거: 이 <Nebula /> 삭제 */}
      <Nebula
        color={nebulaColors[index % nebulaColors.length]}
        position={{
          x: isEven ? "40%" : "10%",
          y: "30%",
        }}
        size={80}
      />
      <Planet {...app.planet} />
      <div
        className={`relative z-10 w-full max-w-5xl mx-auto px-6 py-24 ${
          isEven ? "sm:ml-[8%]" : "sm:ml-auto sm:mr-[8%]"
        }`}
      >
        <AppCard app={app} />
      </div>
    </section>
  );
}
