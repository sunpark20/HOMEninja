import Image from "next/image";

export default function HeroV2() {
  return (
    <section
      className="relative flex flex-col items-center justify-center"
      style={{ minHeight: "72vh", padding: "80px 24px 40px" }}
    >
      <div className="flex items-center gap-3">
        <Image
          src="/logo-icon.svg"
          alt="NinjaTurtle 로고"
          width={44}
          height={44}
          className="object-contain"
        />
        <h1
          className="font-[family-name:var(--font-display)] font-bold tracking-tight m-0"
          style={{
            color: "oklch(0.95 0.005 260)",
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
          }}
        >
          NinjaTurtle
        </h1>
      </div>
      <p
        className="mt-3.5 text-center max-w-[420px]"
        style={{
          color: "oklch(0.6 0.01 260)",
          fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
        }}
      >
        앱으로 세상을 조금 더 편하게
      </p>
      <p
        className="mt-1.5 text-center text-xs tracking-[0.15em] uppercase"
        style={{ color: "oklch(0.4 0.01 260)" }}
      >
        ← → 방향키나 아래 버튼으로 다른 은하 탐색
      </p>
    </section>
  );
}
