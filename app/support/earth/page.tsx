import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Earth 지원",
  description: "Earth app support / Earth 앱 지원 및 문의",
};

const supportEmail = "coastguard2681@gmail.com";

export default function EarthSupport() {
  return (
    <div className="min-h-screen flex items-start justify-center px-6 py-24">
      <article className="max-w-2xl w-full space-y-10">
        <h1
          className="text-3xl font-semibold tracking-tight font-[family-name:var(--font-display)]"
          style={{ color: "var(--c-title)" }}
        >
          Earth 지원
          <span
            className="block text-xl font-normal mt-1"
            style={{ color: "var(--c-dim)" }}
          >
            Earth Support
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
              지원 환경
            </h2>
            <p>
              Earth는 iOS 또는 iPadOS 17 이상을 사용하는 iPhone과 iPad를
              지원합니다. 계정이나 네트워크 연결 없이 핵심 기능을 사용할 수
              있습니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              나침반 안내
            </h2>
            <p>
              나침반 정렬은 자기 센서가 있는 실제 기기에서만 동작하며 자북을
              기준으로 합니다. 시뮬레이터나 자기 센서가 없는 기기에서는 북쪽 고정
              다이얼로 표시됩니다.
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
                href={`mailto:${supportEmail}?subject=Earth%20Support`}
                className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors"
              >
                {supportEmail}
              </a>
              으로 보내 주세요.
            </p>
            <p className="mt-2">
              기기 모델, OS 버전, 앱 언어, 선택한 도시 또는 시간대, 문제가 발생한
              기능과 재현 순서를 함께 알려주시면 확인에 도움이 됩니다.
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
              Earth supports iPhone and iPad devices running iOS or iPadOS 17
              or later. Core features work without an account or network
              connection. When reporting an issue, include the device model, OS
              version, app language, selected city or time zone, affected
              feature, and reproduction steps.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              サポート
            </h2>
            <p>
              EarthはiOSまたはiPadOS 17以降のiPhoneとiPadに対応しています。
              アカウントやネットワーク接続なしで主要機能を利用できます。
              お問い合わせの際は、端末モデル、OSバージョン、アプリ言語、選択した
              都市またはタイムゾーン、問題の機能、再現手順をお知らせください。
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
            href="/privacy/earth"
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
