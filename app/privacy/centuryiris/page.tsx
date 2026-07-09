import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Century Iris Privacy Policy",
  description: "Century Iris app privacy policy",
};

export default function CenturyIrisPrivacy() {
  return (
    <div className="min-h-screen flex items-start justify-center px-6 py-24">
      <article className="max-w-2xl w-full space-y-12">
        <h1
          className="text-3xl font-semibold tracking-tight font-[family-name:var(--font-display)]"
          style={{ color: "var(--c-title)" }}
        >
          Century Iris Privacy Policy
          <span
            className="block text-xl font-normal mt-1"
            style={{ color: "var(--c-dim)" }}
          >
            개인정보처리방침
          </span>
        </h1>

        <div
          className="space-y-6 text-sm leading-relaxed"
          style={{ color: "var(--c-body)" }}
        >
          <div
            className="text-xs font-medium uppercase tracking-widest"
            style={{ color: "var(--c-meta)" }}
          >
            English
          </div>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              1. Data Collection
            </h2>
            <p>
              Century Iris does not collect personal information. The app
              operates locally on your Mac and does not send display, ambient
              light, preference, or diagnostic data to any external server.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              2. Local Data
            </h2>
            <p>
              App preferences and optional diagnostic CSV logs are stored only
              on your device. These files are used to run the app and diagnose
              display behavior locally, and are removed when the app and its
              local container data are deleted.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              3. Permissions and Services
            </h2>
            <p>
              Century Iris does not use accounts, analytics SDKs, advertising
              SDKs, tracking SDKs, payments, or cloud services. It does not ask
              for location, contacts, camera, microphone, or call data.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              4. Contact
            </h2>
            <p>
              For privacy-related inquiries, contact{" "}
              <a
                href="mailto:coastguard2681@gmail.com"
                className="underline underline-offset-2 hover:text-white/80 transition-colors"
              >
                coastguard2681@gmail.com
              </a>
              .
            </p>
          </section>

          <p className="text-xs" style={{ color: "var(--c-meta)" }}>
            Effective date: July 9, 2026
          </p>
        </div>

        <div style={{ borderTop: "1px solid var(--c-divider)" }} />

        <div
          className="space-y-6 text-sm leading-relaxed"
          style={{ color: "var(--c-body)" }}
        >
          <div
            className="text-xs font-medium uppercase tracking-widest"
            style={{ color: "var(--c-meta)" }}
          >
            한국어
          </div>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              1. 개인정보 수집 항목
            </h2>
            <p>
              Century Iris는 개인정보를 수집하지 않습니다. 앱은 사용자의 Mac에서
              로컬로 동작하며, 디스플레이 정보, 주변 조도, 설정값, 진단 데이터를
              외부 서버로 전송하지 않습니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              2. 로컬 데이터
            </h2>
            <p>
              앱 설정값과 선택적 진단 CSV 로그는 사용자 기기에만 저장됩니다. 이
              파일은 앱 동작과 로컬 디스플레이 진단에만 사용되며, 앱과 로컬
              컨테이너 데이터를 삭제하면 함께 제거됩니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              3. 권한 및 외부 서비스
            </h2>
            <p>
              Century Iris는 계정, 분석 SDK, 광고 SDK, 추적 SDK, 결제, 클라우드
              서비스를 사용하지 않습니다. 위치, 연락처, 카메라, 마이크, 통화
              데이터 권한을 요청하지 않습니다.
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
            시행일: 2026년 7월 9일
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
