import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SpamCall070 개인정보처리방침",
  description: "SpamCall070 앱 개인정보처리방침",
};

export default function SpamCall070Privacy() {
  return (
    <div className="min-h-screen flex items-start justify-center px-6 py-24">
      <article className="max-w-2xl w-full space-y-8">
        <h1
          className="text-3xl font-semibold tracking-tight font-[family-name:var(--font-display)]"
          style={{ color: "var(--c-title)" }}
        >
          SpamCall070 개인정보처리방침
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
              1. 개인정보 수집 항목
            </h2>
            <p>
              SpamCall070은 개인정보를 수집하지 않습니다. 앱은 네트워크 통신 없이
              기기 내에서만 동작하며, 사용자의 통화 내용, 연락처, 통화 기록에
              접근하지 않습니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              2. 에러 리포트
            </h2>
            <p>
              앱 사용 중 오류가 발생하면 사용자가 직접 &quot;에러 신고하기&quot; 버튼을
              눌러 에러 리포트를 전송할 수 있습니다. 이때 전송되는 정보는
              다음과 같습니다:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>기기 모델명, iOS 버전</li>
              <li>앱 버전</li>
              <li>기기 저장공간 정보</li>
              <li>오류 코드 및 메시지</li>
            </ul>
            <p className="mt-2">
              에러 리포트는 사용자가 버튼을 누를 때만 전송되며, 자동으로
              수집되지 않습니다. 전송된 정보는 오류 해결 목적으로만 사용되며,
              제3자에게 제공되지 않습니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              3. 데이터 저장
            </h2>
            <p>
              모든 차단 번호 데이터는 iOS 시스템 내부에 저장되며, 앱 삭제 시
              함께 제거됩니다. 앱은 별도의 서버나 클라우드 저장소를 사용하지
              않습니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
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

          <p className="text-xs" style={{ color: "var(--c-meta)" }}>
            시행일: 2026년 4월 16일
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="text-sm transition-colors duration-200 hover:text-white/70"
            style={{ color: "var(--c-dim)" }}
          >
            &larr; 홈으로 돌아가기
          </Link>
        </div>
      </article>
    </div>
  );
}
