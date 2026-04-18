import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CallNinja Privacy Policy",
  description: "CallNinja app privacy policy",
};

export default function CallNinjaPrivacy() {
  return (
    <div className="min-h-screen flex items-start justify-center px-6 py-24">
      <article className="max-w-2xl w-full space-y-12">
        <h1
          className="text-3xl font-semibold tracking-tight font-[family-name:var(--font-display)]"
          style={{ color: "oklch(0.95 0.005 260)" }}
        >
          CallNinja Privacy Policy
        </h1>

        {/* English */}
        <div
          className="space-y-6 text-sm leading-relaxed"
          style={{ color: "oklch(0.7 0.01 260)" }}
        >
          <div
            className="text-xs font-medium uppercase tracking-widest"
            style={{ color: "oklch(0.5 0.01 260)" }}
          >
            English
          </div>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "oklch(0.85 0.005 260)" }}
            >
              1. Data Collection
            </h2>
            <p>
              CallNinja does not collect any personal information. The app
              operates entirely on-device with no network communication, and
              does not access your call content, contacts, or call history.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "oklch(0.85 0.005 260)" }}
            >
              2. Blocking Data
            </h2>
            <p>
              Phone number patterns entered by the user are stored only in iOS
              App Group storage on your device and are never transmitted to any
              external server. All data is removed when the app is deleted.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "oklch(0.85 0.005 260)" }}
            >
              3. Contacts Access
            </h2>
            <p>
              CallNinja does not access your contacts. iOS CallKit automatically
              protects numbers saved in your contacts — those numbers are never
              blocked.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "oklch(0.85 0.005 260)" }}
            >
              4. Third Parties
            </h2>
            <p>
              No data is collected, so no data is shared with third parties.
              The app contains no advertising SDKs, analytics tools, or external
              services.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "oklch(0.85 0.005 260)" }}
            >
              5. Contact
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

          <p className="text-xs" style={{ color: "oklch(0.5 0.01 260)" }}>
            Effective date: April 19, 2026
          </p>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid oklch(0.25 0.01 260)" }} />

        {/* Korean */}
        <div
          className="space-y-6 text-sm leading-relaxed"
          style={{ color: "oklch(0.7 0.01 260)" }}
        >
          <div
            className="text-xs font-medium uppercase tracking-widest"
            style={{ color: "oklch(0.5 0.01 260)" }}
          >
            한국어
          </div>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "oklch(0.85 0.005 260)" }}
            >
              1. 개인정보 수집 항목
            </h2>
            <p>
              CallNinja는 개인정보를 수집하지 않습니다. 앱은 네트워크 통신 없이
              기기 내에서만 동작하며, 사용자의 통화 내용, 연락처, 통화 기록에
              접근하지 않습니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "oklch(0.85 0.005 260)" }}
            >
              2. 차단 번호 데이터
            </h2>
            <p>
              사용자가 입력한 전화번호 패턴은 iOS App Group 저장소에만 보관되며,
              외부 서버로 전송되지 않습니다. 앱 삭제 시 모든 데이터가 함께
              제거됩니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "oklch(0.85 0.005 260)" }}
            >
              3. 연락처 접근
            </h2>
            <p>
              CallNinja는 연락처에 접근하지 않습니다. iOS CallKit이 연락처에
              저장된 번호를 자동으로 보호하며, 해당 번호는 차단되지 않습니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "oklch(0.85 0.005 260)" }}
            >
              4. 제3자 제공
            </h2>
            <p>
              수집된 정보가 없으므로 제3자에게 제공되는 정보도 없습니다. 앱은
              광고 SDK, 분석 도구, 외부 서비스를 포함하지 않습니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "oklch(0.85 0.005 260)" }}
            >
              5. 문의
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

          <p className="text-xs" style={{ color: "oklch(0.5 0.01 260)" }}>
            시행일: 2026년 4월 19일
          </p>
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
