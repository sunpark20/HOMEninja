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
          style={{ color: "var(--c-title)" }}
        >
          CallNinja Privacy Policy
        </h1>

        {/* English */}
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
              CallNinja does not collect call content, contacts, or call
              history. Blocking is performed on the device. If you enable
              iCloud Sync, your selected country and saved phone-number
              patterns are stored in your private CloudKit database. Only you
              can access that private database; the developer cannot view it.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              2. Blocking Data
            </h2>
            <p>
              Phone-number patterns are stored in the app&apos;s iOS App Group on
              this device. When iCloud Sync is enabled, the selected country
              and saved patterns for every country are also synced through your
              private iCloud database. Turning sync off keeps the local data.
              Deleting the app removes its local data; synced data remains in
              iCloud unless you delete the saved patterns before uninstalling.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              3. Contacts Access
            </h2>
            <p>
              CallNinja does not access your contacts. A contact can still be
              blocked if its number matches a range you activate, so review
              each pattern before turning it on.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              4. Third Parties
            </h2>
            <p>
              Optional sync uses Apple&apos;s CloudKit private database. If you
              choose to report a problem, the app opens a GitHub issue draft
              containing app, build, device, OS, and diagnostic details for you
              to review. The app does not post the issue; you decide whether to
              submit it. The app contains no advertising or analytics SDKs.
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
              For privacy-related inquiries, contact{" "}
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
            Effective date: October 11, 2026
          </p>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid var(--c-divider)" }} />

        {/* Korean */}
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
              CallNinja는 통화 내용, 연락처, 통화 기록을 수집하지 않습니다.
              차단 기능은 기기에서 처리됩니다. iCloud 동기화를 켜면 선택한 국가와
              저장한 전화번호 패턴이 사용자의 비공개 CloudKit 데이터베이스에
              저장됩니다. 이 데이터베이스는 사용자만 접근할 수 있으며 개발자는
              내용을 볼 수 없습니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              2. 차단 번호 데이터
            </h2>
            <p>
              전화번호 패턴은 이 기기의 iOS App Group에 저장됩니다. iCloud 동기화를
              켜면 선택한 국가와 모든 국가에 저장한 패턴도 사용자의 비공개 iCloud
              데이터베이스를 통해 동기화됩니다. 동기화를 꺼도 기기 데이터는
              유지됩니다. 앱을 삭제하면 기기 데이터는 제거되지만, iCloud에 동기화된
              데이터는 앱 삭제만으로 지워지지 않으므로 삭제 전에 저장된 패턴을
              지워 주세요.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              3. 연락처 접근
            </h2>
            <p>
              CallNinja는 연락처에 접근하지 않습니다. 다만 연락처 번호라도 사용자가
              활성화한 차단 범위에 포함되면 차단될 수 있으니, 패턴을 확인한 뒤
              켜 주세요.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              4. 제3자 제공
            </h2>
            <p>
              선택적 동기화에는 Apple의 CloudKit 비공개 데이터베이스를 사용합니다.
              문제를 신고하기로 선택하면 앱·빌드·기기·OS 및 진단 정보가 포함된
              GitHub 이슈 초안을 열어 내용을 확인할 수 있습니다. 앱이 이슈를
              자동 게시하지 않으며, 사용자가 검토한 뒤 제출 여부를 결정합니다.
              광고나 분석 SDK는 포함하지 않습니다.
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
            시행일: 2026년 10월 11일
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]"
            style={{ color: "var(--c-dim)" }}
          >
            &larr; 홈으로 돌아가기
          </Link>
        </div>
      </article>
    </div>
  );
}
