import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "물한잔 지원",
  description: "물한잔(EatWater) 앱 지원 및 문의",
};

export default function EatWaterSupport() {
  return (
    <div className="min-h-screen flex items-start justify-center px-6 py-24">
      <article className="max-w-2xl w-full space-y-10">
        <h1
          className="text-3xl font-semibold tracking-tight font-[family-name:var(--font-display)]"
          style={{ color: "var(--c-title)" }}
        >
          물한잔 지원
          <span
            className="block text-xl font-normal mt-1"
            style={{ color: "var(--c-dim)" }}
          >
            EatWater Support
          </span>
        </h1>

        <div
          className="space-y-6 text-sm leading-relaxed"
          style={{ color: "var(--c-body)" }}
        >
          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              지원 환경
            </h2>
            <p>물한잔은 iOS 26 이상을 사용하는 iPhone을 지원합니다.</p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              문의하기
            </h2>
            <p>
              문제나 제안은{" "}
              <a
                href="mailto:coastguard2681@gmail.com?subject=%EB%AC%BC%ED%95%9C%EC%9E%94%20%EB%AC%B8%EC%9D%98"
                className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors"
              >
                coastguard2681@gmail.com
              </a>
              으로 보내 주세요.
            </p>
            <p className="mt-2">
              iPhone 모델, iOS 버전, 문제가 발생한 기능과 재현 순서를 함께
              알려주시면 확인에 도움이 됩니다. 알림 문제는 알림 권한, 집중 모드,
              무음 모드 상태도 함께 적어 주세요.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              Support
            </h2>
            <p>
              EatWater supports iPhone devices running iOS 26 or later. When
              reporting an issue, include your iPhone model, iOS version, the
              affected feature, and reproduction steps.
            </p>
          </section>
        </div>

        <div className="pt-4 flex flex-wrap gap-4">
          <Link
            href="/"
            className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]"
            style={{ color: "var(--c-dim)" }}
          >
            &larr; 홈으로 돌아가기
          </Link>
          <Link
            href="/privacy/eatwater"
            className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]"
            style={{ color: "var(--c-dim)" }}
          >
            개인정보처리방침
          </Link>
        </div>
      </article>
    </div>
  );
}
