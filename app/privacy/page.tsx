import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 — 닌자거북의홈",
  description: "개인정보처리방침",
};

export default function Privacy() {
  return (
    <div className="min-h-screen flex items-start justify-center px-6 py-24">
      <article className="max-w-2xl w-full space-y-8">
        <h1
          className="text-3xl font-semibold tracking-tight font-[family-name:var(--font-display)]"
          style={{ color: "oklch(0.95 0.005 260)" }}
        >
          개인정보처리방침
        </h1>

        <div
          className="space-y-6 text-sm leading-relaxed"
          style={{ color: "oklch(0.7 0.01 260)" }}
        >
          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "oklch(0.85 0.005 260)" }}
            >
              1. 수집하는 개인정보
            </h2>
            <p>
              본 서비스는 최소한의 개인정보만을 수집합니다. 수집 항목 및 목적은
              각 앱의 기능에 따라 다르며, 아래에서 앱별로 안내합니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "oklch(0.85 0.005 260)" }}
            >
              2. 개인정보의 이용 목적
            </h2>
            <p>
              수집된 개인정보는 서비스 제공 및 개선 목적으로만 사용되며, 목적
              달성 후 즉시 파기합니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "oklch(0.85 0.005 260)" }}
            >
              3. 개인정보의 보관 및 파기
            </h2>
            <p>
              개인정보는 수집 목적 달성 시 즉시 파기합니다. 법령에 의해 보관이
              필요한 경우 해당 기간 동안 안전하게 보관합니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "oklch(0.85 0.005 260)" }}
            >
              4. 문의
            </h2>
            <p>
              개인정보 관련 문의는{" "}
              <a
                href="mailto:coastguard2681@gmail.com"
                className="underline underline-offset-2 hover:text-white/80 transition-colors"
              >
                coastguard2681@gmail.com
              </a>
              으로 연락해 주세요.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "oklch(0.85 0.005 260)" }}
            >
              5. 앱별 추가사항
            </h2>

            <div className="space-y-4">
              <div>
                <h3
                  className="text-base font-medium mb-1"
                  style={{ color: "oklch(0.8 0.005 260)" }}
                >
                  장보고 (SnapCart)
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    카메라 접근 권한을 사용하여 영수증을 촬영합니다.
                  </li>
                  <li>
                    촬영된 이미지는 가격 분석을 위해 외부 AI 서비스(OpenAI
                    API)로 전송됩니다.
                  </li>
                  <li>
                    분석 결과는 기기 내에 저장되며, 서버에 별도로 보관하지
                    않습니다.
                  </li>
                  <li>
                    음성 입력 기능 사용 시 마이크 접근 권한을 사용합니다.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="text-sm transition-colors duration-200 hover:text-white/70"
            style={{ color: "oklch(0.45 0.01 260)" }}
          >
            &larr; 홈으로 돌아가기
          </Link>
        </div>
      </article>
    </div>
  );
}
