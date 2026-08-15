import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quick Quit 개인정보처리방침",
  description: "Quick Quit 앱 개인정보처리방침",
};

export default function QuickQuitPrivacy() {
  return (
    <div className="min-h-screen flex items-start justify-center px-6 py-24">
      <article className="max-w-2xl w-full space-y-12">
        <h1
          className="text-3xl font-semibold tracking-tight font-[family-name:var(--font-display)]"
          style={{ color: "var(--c-title)" }}
        >
          Quick Quit 개인정보처리방침
          <span
            className="block text-xl font-normal mt-1"
            style={{ color: "var(--c-dim)" }}
          >
            Quick Quit Privacy Policy
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
              Quick Quit은 개인정보를 수집하지 않습니다. 계정, 광고 식별자,
              분석 도구, 원격 서버를 사용하지 않으며 네트워크 요청을 보내지
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
              최근 종료한 앱 목록(최대 20개)이 Mac의{" "}
              <code>~/Library/Application Support/Quick Quit</code>{" "}
              (App Store 버전은 앱 자체 샌드박스 컨테이너)에만 저장됩니다.
              단축키, 언어, 로그인 시 시작, 메뉴 막대 아이콘 표시 여부 같은
              설정은 표준 <code>UserDefaults</code>에 로컬로만 저장됩니다.
              iCloud 동기화나 내보내기 기능이 없어 이 데이터가 기기 밖으로
              나가는 경로는 존재하지 않습니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              3. 다른 앱 정보
            </h2>
            <p>
              종료할 앱을 보여주기 위해 실행 중인 응용 프로그램의 이름, bundle
              identifier, 아이콘만 읽으며, 이는 macOS가 모든 앱에 공개하는
              값입니다. 다른 앱의 창 내용이나 창 이름은 읽지 않습니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              4. 권한
            </h2>
            <p>
              웹사이트에서 직접 내려받은 버전은 macOS 권한을 요청하지
              않습니다. Mac App Store 버전은 샌드박스 안에서 사용자가 고른
              앱에 종료 명령(⌘Q)을 보내기 위해 손쉬운 사용의 PostEvent
              권한 하나만 요청하며, 이 권한을 다른 용도로 쓰지 않고 입력을
              감시하거나 기록하지 않습니다.
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
              최근 종료 기록은 설정의 기록 탭에서 언제든 지울 수 있습니다.
              앱을 삭제하면 macOS(App Store 버전) 또는 사용자가 직접(직접
              배포 버전) 관련 로컬 데이터를 제거할 수 있습니다.
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
                href="https://github.com/sunpark20/qq/issues/new"
                className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors"
              >
                GitHub 이슈
              </a>
              로 남겨 주세요.
            </p>
          </section>

          <p className="text-xs" style={{ color: "var(--c-meta)" }}>
            시행일: 2026년 8월 15일
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
              Quick Quit does not collect personal information. It uses no
              accounts, advertising identifiers, analytics, or remote servers,
              and makes no network requests.
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
              A list of up to 20 recently quit apps is stored only in{" "}
              <code>~/Library/Application Support/Quick Quit</code> (the
              app&apos;s own sandbox container in the Mac App Store version).
              Settings — the shortcut, language, launch-at-login, and menu bar
              icon preference — are stored locally in standard{" "}
              <code>UserDefaults</code>. There is no iCloud sync or export, so
              there is no path off the device.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              3. Other Applications
            </h2>
            <p>
              To show which apps can be quit, Quick Quit reads only the name,
              bundle identifier, and icon of running applications — values
              macOS publishes to every app. It does not read the contents or
              titles of other apps&apos; windows.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              4. Permissions
            </h2>
            <p>
              The version downloaded directly from the website requests no
              macOS permissions. The Mac App Store version, running inside the
              sandbox, asks for one Accessibility permission (PostEvent) to
              send a quit command (⌘Q) to the app you select. It is used for
              nothing else — no input monitoring, no recording.
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
              Recently quit apps can be cleared at any time from Settings ▸
              History. Uninstalling the app removes its local data (via macOS
              for the Mac App Store version, or manually for the direct
              download).
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
              For privacy inquiries, please open a{" "}
              <a
                href="https://github.com/sunpark20/qq/issues/new"
                className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors"
              >
                GitHub issue
              </a>
              .
            </p>
          </section>

          <p className="text-xs" style={{ color: "var(--c-meta)" }}>
            Effective date: August 15, 2026
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
            href="/support/quickquit"
            className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]"
            style={{ color: "var(--c-dim)" }}
          >
            Quick Quit 지원
          </Link>
        </div>
      </article>
    </div>
  );
}
