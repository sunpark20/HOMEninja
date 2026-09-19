import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "물을 마시는 새 이용약관",
  description: "물을 마시는 새(EatWater) 앱 이용약관 / Terms of Service",
};

export default function EatWaterTerms() {
  return (
    <div className="min-h-screen flex items-start justify-center px-6 py-24">
      <article className="max-w-2xl w-full space-y-12">
        <h1
          className="text-3xl font-semibold tracking-tight font-[family-name:var(--font-display)]"
          style={{ color: "var(--c-title)" }}
        >
          물을 마시는 새 이용약관
          <span
            className="block text-xl font-normal mt-1"
            style={{ color: "var(--c-dim)" }}
          >
            The Bird That Drinks Water / EatWater Terms of Service
          </span>
        </h1>

        <div className="space-y-6 text-sm leading-relaxed" style={{ color: "var(--c-body)" }}>
          <div className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--c-meta)" }}>
            한국어
          </div>

          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>1. 서비스</h2>
            <p>
              물을 마시는 새는 사용자가 직접 설정한 목표와 생활 시간에 맞춰 물 섭취를 기록하고
              기기 내 알림을 예약하는 iPhone 앱입니다. 앱은 무료이며 현재 구독, 인앱 구매,
              광고를 제공하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>2. 건강 관련 안내</h2>
            <p>
              이 앱은 의료기기나 의료 서비스가 아니며 진단, 치료 또는 개인별 의학적 조언을
              제공하지 않습니다. 물 섭취 목표와 알림은 사용자가 직접 설정합니다. 건강 상태나
              적절한 수분 섭취량에 관한 의문은 자격을 갖춘 의료 전문가와 상담해 주세요.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>3. 데이터와 Apple 건강</h2>
            <p>
              앱 데이터 처리 방식은 개인정보처리방침에 설명되어 있습니다. Apple 건강 연동은
              선택 사항이며, 사용자가 허용한 경우 앱에서 새로 기록한 수분 섭취량을 Apple 건강에
              쓸 수 있습니다. Apple 건강 데이터의 이용에는 Apple의 관련 약관도 적용됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>4. 이용자의 책임</h2>
            <p>
              사용자는 자신의 기기, 알림 권한, 목표 및 기록을 관리할 책임이 있습니다. 앱의 알림은
              iOS의 권한, 집중 모드, 시스템 상태 등에 따라 지연되거나 표시되지 않을 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>5. 제공과 변경</h2>
            <p>
              개발자는 앱의 안정성과 품질을 유지하기 위해 기능을 수정하거나 업데이트할 수 있습니다.
              법이 허용하는 범위에서 앱은 현재 상태로 제공되며 특정 목적에 대한 적합성이나 중단 없는
              동작을 보장하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>6. 책임 제한</h2>
            <p>
              관련 법령이 허용하는 범위에서 개발자는 앱 사용 또는 사용 불가로 인해 발생한 간접적,
              우발적 또는 결과적 손해에 대해 책임을 지지 않습니다. 이 조항은 관련 법률이 제한을
              허용하지 않는 권리에는 영향을 주지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>7. 개발자 및 문의</h2>
            <p>
              개발자: sunguk park. 문의:{" "}
              <a href="mailto:sun.park20@gmail.com" className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors">
                sun.park20@gmail.com
              </a>
              .
            </p>
          </section>

          <p className="text-xs" style={{ color: "var(--c-meta)" }}>시행일: 2026년 9월 20일</p>
        </div>

        <div style={{ borderTop: "1px solid var(--c-divider)" }} />

        <div className="space-y-6 text-sm leading-relaxed" style={{ color: "var(--c-body)" }}>
          <div className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--c-meta)" }}>
            English
          </div>

          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>1. Service</h2>
            <p>
              The Bird That Drinks Water (EatWater) is an iPhone app for logging water intake and
              scheduling on-device reminders around goals and waking hours set by the user. The app
              is free and currently has no subscriptions, in-app purchases, or advertising.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>2. Health Disclaimer</h2>
            <p>
              The app is not a medical device or medical service and does not provide diagnosis,
              treatment, or personalized medical advice. You choose your own water goal and reminder
              settings. Ask a qualified healthcare professional if you have questions about your
              health or appropriate fluid intake.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>3. Data and Apple Health</h2>
            <p>
              Data practices are described in the Privacy Policy. Apple Health integration is
              optional. With your permission, the app may write newly logged water entries to Apple
              Health. Apple&apos;s applicable terms also govern your use of Apple Health.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>4. Your Responsibilities</h2>
            <p>
              You are responsible for your device, notification permissions, goals, and records.
              Notifications may be delayed or suppressed by iOS permissions, Focus modes, or other
              system conditions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>5. Availability and Changes</h2>
            <p>
              The developer may modify or update the app to maintain stability and quality. To the
              extent permitted by law, the app is provided as available without a guarantee of
              uninterrupted operation or fitness for a particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>6. Limitation of Liability</h2>
            <p>
              To the extent permitted by applicable law, the developer is not liable for indirect,
              incidental, or consequential damages arising from use of or inability to use the app.
              This does not limit rights that cannot legally be excluded.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>7. Developer and Contact</h2>
            <p>
              Developer: sunguk park. Contact:{" "}
              <a href="mailto:sun.park20@gmail.com" className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors">
                sun.park20@gmail.com
              </a>
              .
            </p>
          </section>

          <p className="text-xs" style={{ color: "var(--c-meta)" }}>Effective date: September 20, 2026</p>
        </div>

        <div className="pt-4 flex flex-wrap gap-4">
          <Link href="/" className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]" style={{ color: "var(--c-dim)" }}>
            &larr; 홈으로 돌아가기
          </Link>
          <Link href="/privacy/eatwater" className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]" style={{ color: "var(--c-dim)" }}>
            개인정보처리방침
          </Link>
          <Link href="/support/eatwater" className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]" style={{ color: "var(--c-dim)" }}>
            지원 / Support
          </Link>
        </div>
      </article>
    </div>
  );
}
