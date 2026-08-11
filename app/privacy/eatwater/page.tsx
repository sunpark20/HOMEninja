import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "물한잔 개인정보처리방침",
  description: "물한잔(EatWater) 앱 개인정보처리방침",
};

export default function EatWaterPrivacy() {
  return (
    <div className="min-h-screen flex items-start justify-center px-6 py-24">
      <article className="max-w-2xl w-full space-y-12">
        <h1
          className="text-3xl font-semibold tracking-tight font-[family-name:var(--font-display)]"
          style={{ color: "var(--c-title)" }}
        >
          물한잔 개인정보처리방침
          <span
            className="block text-xl font-normal mt-1"
            style={{ color: "var(--c-dim)" }}
          >
            EatWater Privacy Policy
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
            한국어
          </div>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              1. 개인정보 수집
            </h2>
            <p>
              물한잔은 개인정보를 수집하지 않습니다. 계정, 서버, 광고, 제3자
              분석 도구를 사용하지 않으며 앱에서 입력한 정보를 외부로 전송하지
              않습니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              2. 기기 내 데이터
            </h2>
            <p>
              물 기록, 목표, 생활 시간, 알림 설정은 앱과 위젯이 함께 사용하는
              iPhone의 로컬 App Group 컨테이너에만 저장됩니다. Siri와 위젯에서
              추가한 기록도 같은 로컬 저장소에 반영됩니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              3. 알림
            </h2>
            <p>
              알림 권한은 사용자가 직접 설정한 물 마시기 알림을 기기에서
              예약하고 표시하는 데만 사용됩니다. 알림 일정과 기록은 외부 서버로
              전송되지 않습니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              4. 보관과 삭제
            </h2>
            <p>
              기록은 앱에서 개별 삭제할 수 있습니다. 앱을 삭제하면 iOS가 앱과
              관련된 로컬 데이터를 제거합니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              5. 문의
            </h2>
            <p>
              개인정보 관련 문의는{" "}
              <a
                href="mailto:coastguard2681@gmail.com"
                className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors"
              >
                coastguard2681@gmail.com
              </a>
              으로 연락해 주세요.
            </p>
          </section>

          <p className="text-xs" style={{ color: "var(--c-meta)" }}>
            시행일: 2026년 7월 15일
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
              EatWater does not collect personal information. It uses no
              accounts, servers, advertising, or third-party analytics, and it
              does not transmit information entered in the app.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              2. On-Device Data
            </h2>
            <p>
              Water records, goals, schedule settings, and notification
              preferences are stored only in the local iPhone App Group
              container shared by the app and widget. Siri and widget entries
              are written to the same local store.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              3. Notifications
            </h2>
            <p>
              Notification permission is used only to schedule and display the
              reminders configured by the user on the device. Notification
              schedules and records are not sent to an external server.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              4. Retention and Deletion
            </h2>
            <p>
              Records can be deleted individually in the app. When the app is
              uninstalled, iOS removes its associated local data.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              5. Contact
            </h2>
            <p>
              For privacy inquiries, contact{" "}
              <a
                href="mailto:coastguard2681@gmail.com"
                className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors"
              >
                coastguard2681@gmail.com
              </a>
              .
            </p>
          </section>

          <p className="text-xs" style={{ color: "var(--c-meta)" }}>
            Effective date: July 15, 2026
          </p>
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
            href="/support/eatwater"
            className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]"
            style={{ color: "var(--c-dim)" }}
          >
            물한잔 지원
          </Link>
        </div>
      </article>
    </div>
  );
}
