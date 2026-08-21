import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "물을 마시는 새 개인정보처리방침",
  description: "물을 마시는 새(EatWater) 앱 개인정보처리방침",
};

export default function EatWaterPrivacy() {
  return (
    <div className="min-h-screen flex items-start justify-center px-6 py-24">
      <article className="max-w-2xl w-full space-y-12">
        <h1
          className="text-3xl font-semibold tracking-tight font-[family-name:var(--font-display)]"
          style={{ color: "var(--c-title)" }}
        >
          물을 마시는 새 개인정보처리방침
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
              물을 마시는 새는 개인정보를 수집하지 않습니다. 계정, 개발자 서버,
              광고, 제3자 분석 도구를 사용하지 않으며 개발자가 앱에서 입력한
              정보에 접근하지 않습니다.
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
              4. Apple 건강
            </h2>
            <p>
              Apple 건강 연동은 선택 사항입니다. 연결하면 앱은 수분 기록 쓰기
              권한만 요청하고, 연결 뒤 새로 남긴 양수 물 기록을 건강 앱에
              저장합니다. 건강 데이터를 읽거나 가져오지 않으며, 연결 전 기록과
              권한이 꺼진 동안의 기록을 나중에 보내지 않습니다. 개발자는 건강
              데이터에 접근하거나 광고, 분석, 데이터 마이닝에 사용하지 않습니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              5. 보관과 삭제
            </h2>
            <p>
              기록은 앱에서 개별 삭제할 수 있습니다. 연결된 동안 내보낸 기록을
              앱에서 삭제하면 앱이 만든 Apple 건강 사본도 삭제를 요청합니다. 앱을
              삭제하면 iOS가 앱의 로컬 데이터를 제거하지만 이미 건강 앱에 저장된
              기록은 남을 수 있으며, 사용자가 건강 앱에서 삭제할 수 있습니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              6. 문의
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
            시행일: 2026년 8월 22일
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
              accounts, developer servers, advertising, or third-party
              analytics, and the developer cannot access information entered
              in the app.
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
              4. Apple Health
            </h2>
            <p>
              Apple Health integration is optional. If connected, the app
              requests write access for water only and saves new positive water
              entries made after connection. It never reads or imports Health
              data, and it never backfills entries made before connection or
              while permission was off. The developer cannot access Health data
              and does not use it for advertising, analytics, or data mining.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              5. Retention and Deletion
            </h2>
            <p>
              Records can be deleted individually in the app. Deleting an
              exported entry asks Apple Health to remove the copy created by
              the app. Uninstalling removes local app data, but entries already
              saved in Health may remain and can be deleted in the Health app.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              6. Contact
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
            Effective date: August 22, 2026
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
            물을 마시는 새 지원
          </Link>
        </div>
      </article>
    </div>
  );
}
