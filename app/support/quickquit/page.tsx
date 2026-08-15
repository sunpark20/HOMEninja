import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quick Quit 지원",
  description: "Quick Quit 앱 지원 및 문의",
};

export default function QuickQuitSupport() {
  return (
    <div className="min-h-screen flex items-start justify-center px-6 py-24">
      <article className="max-w-2xl w-full space-y-10">
        <h1
          className="text-3xl font-semibold tracking-tight font-[family-name:var(--font-display)]"
          style={{ color: "var(--c-title)" }}
        >
          Quick Quit 지원
          <span
            className="block text-xl font-normal mt-1"
            style={{ color: "var(--c-dim)" }}
          >
            Quick Quit Support
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
              시작하기
            </h2>
            <p>
              <code>⌃⇧Q</code>를 누르거나 메뉴 막대 아이콘을 클릭하면 종료
              패널이 열립니다. 화살표로 이동하고 <code>⏎</code> 또는{" "}
              <code>Space</code>로 종료하며, <code>esc</code>로 닫습니다.
              이름을 입력하면 바로 걸러집니다.
            </p>
            <p className="mt-2">
              메뉴 막대 아이콘을 우클릭하면 실행 중인 앱을 클릭으로 연달아
              종료할 수 있는 목록이 나옵니다. 이 목록은 앱을 종료해도 닫히지
              않습니다 — 클릭, 클릭, 클릭으로 여러 앱을 한 번에 정리할 수
              있습니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              자주 묻는 질문
            </h2>
            <p>
              <strong>앱이 종료되지 않아요.</strong> Quick Quit은 강제
              종료하지 않습니다. 저장하지 않은 작업이 있는 앱은 자기 저장
              대화상자를 띄우며 계속 실행되고, 목록에는 주황색 표시가
              남습니다. 대화상자에 답한 뒤 다시 종료해 주세요.
            </p>
            <p className="mt-2">
              <strong>
                클릭해도 반응이 없어요 (Mac App Store 버전).
              </strong>{" "}
              시스템 설정 ▸ 개인정보 보호 및 보안 ▸ 손쉬운 사용에서 Quick
              Quit을 켜주세요. 이미 켜져 있다면 목록에서 빼고 다시
              추가해 보세요.
            </p>
            <p className="mt-2">
              <strong>단축키를 바꿨더니 동작하지 않아요.</strong> 다른 앱이
              이미 그 조합을 쓰고 있을 수 있습니다. 설정에 경고가 뜨면 다른
              조합을 골라 주세요.
            </p>
            <p className="mt-2">
              <strong>메뉴 막대 아이콘을 숨겼는데 다시 켤 수 없어요.</strong>{" "}
              단축키는 계속 동작합니다. 단축키로 패널을 연 뒤 설정으로
              들어가거나, 응용 프로그램 폴더에서 Quick Quit을 다시
              실행해 주세요.
            </p>
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
                href="https://github.com/sunpark20/qq/issues/new"
                className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors"
              >
                GitHub 이슈
              </a>
              로 남겨 주세요.
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
              Quick Quit is a macOS menu bar app whose whole job is quitting
              other apps fast. Press <code>⌃⇧Q</code>, or click the menu bar
              icon, to open the quit grid. Right-click the icon for a
              clickable list that stays open across quits.
            </p>
            <p className="mt-2">
              An app with unsaved work is never force-quit — it shows its own
              save dialog and keeps a warning mark in the list until it is
              handled. The Mac App Store version needs the PostEvent
              permission under Privacy &amp; Security ▸ Accessibility to send
              a quit command; the direct download needs no permission at all.
            </p>
            <p className="mt-2">
              For issues or suggestions, please open a{" "}
              <a
                href="https://github.com/sunpark20/qq/issues/new"
                className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors"
              >
                GitHub issue
              </a>
              .
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
            href="/privacy/quickquit"
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
