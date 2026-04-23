import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1
        className="text-6xl font-bold tracking-tight font-[family-name:var(--font-display)]"
        style={{ color: "var(--c-title)" }}
      >
        404
      </h1>
      <p className="mt-4 text-lg" style={{ color: "var(--c-secondary)" }}>
        우주에서 길을 잃었습니다
      </p>
      <Link
        href="/"
        className="mt-8 px-5 py-2.5 text-sm rounded-full transition-all duration-300 hover:scale-105"
        style={{
          border: "1px solid var(--c-border)",
          color: "var(--c-body)",
        }}
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
