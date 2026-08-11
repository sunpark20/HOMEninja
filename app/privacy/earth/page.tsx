import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Earth 개인정보처리방침",
  description: "Earth app privacy policy / Earth 앱 개인정보처리방침",
};

const supportEmail = "coastguard2681@gmail.com";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2
        className="text-lg font-medium mb-2"
        style={{ color: "var(--c-heading)" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function EarthPrivacy() {
  return (
    <div className="min-h-screen flex items-start justify-center px-6 py-24">
      <article className="max-w-2xl w-full space-y-12">
        <h1
          className="text-3xl font-semibold tracking-tight font-[family-name:var(--font-display)]"
          style={{ color: "var(--c-title)" }}
        >
          Earth 개인정보처리방침
          <span
            className="block text-xl font-normal mt-1"
            style={{ color: "var(--c-dim)" }}
          >
            Earth Privacy Policy
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

          <Section title="1. 개인정보 수집">
            <p>
              Earth는 개인정보를 수집하지 않습니다. 계정, 서버, 광고 또는 제3자
              분석 도구를 사용하지 않으며 앱에서 처리한 정보를 외부로 전송하지
              않습니다.
            </p>
          </Section>
          <Section title="2. 기기 내 데이터">
            <p>
              선택한 도시, 앱 언어와 지구본 표시 설정은 앱 기능을 제공하기 위해
              사용자의 기기에만 저장됩니다. 앱은 기기의 현재 시간대 식별자를
              읽어 초기 도시 시간을 표시할 수 있으며 이 정보도 전송하지 않습니다.
            </p>
          </Section>
          <Section title="3. 나침반 방향">
            <p>
              지원되는 기기에서는 자기 나침반 방향을 읽어 태양과 달의 방향을
              화면에 표시합니다. 정밀 위치를 요청하지 않으며 나침반 정보는
              저장하거나 전송하지 않습니다.
            </p>
          </Section>
          <Section title="4. 제3자 자료">
            <p>
              앱에 포함된 도시 자료, 천체 텍스처와 오프라인 천문 계산 코드는
              Earth를 통해 개인정보를 수집하거나 전송하지 않습니다.
            </p>
          </Section>
          <Section title="5. 보관과 삭제">
            <p>
              기기에 저장된 설정은 앱을 삭제하면 iOS에 의해 앱 데이터와 함께
              제거됩니다.
            </p>
          </Section>
          <Section title="6. 문의">
            <p>
              개인정보 관련 문의는{" "}
              <a
                href={`mailto:${supportEmail}`}
                className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors"
              >
                {supportEmail}
              </a>
              으로 연락해 주세요.
            </p>
          </Section>
          <p className="text-xs" style={{ color: "var(--c-meta)" }}>
            시행일: 2026년 8월 11일
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

          <Section title="1. Data Collection">
            <p>
              Earth does not collect personal information. It uses no account,
              server, advertising, or third-party analytics and does not transmit
              information processed by the app.
            </p>
          </Section>
          <Section title="2. On-Device Data">
            <p>
              Selected cities, app language, and globe display preferences are
              stored only on the device to provide app functionality. Earth may
              read the device&apos;s current time-zone identifier to choose an initial
              city time, but does not transmit it.
            </p>
          </Section>
          <Section title="3. Compass Heading">
            <p>
              On supported devices, Earth reads the magnetic compass heading to
              show the direction of the Sun and Moon. It does not request precise
              location, and heading data is neither stored nor transmitted.
            </p>
          </Section>
          <Section title="4. Third-Party Materials">
            <p>
              Bundled city data, celestial textures, and offline astronomical
              calculation code do not collect or transmit personal information
              through Earth.
            </p>
          </Section>
          <Section title="5. Retention and Deletion">
            <p>
              Settings stored on the device are removed with the app data when
              Earth is uninstalled.
            </p>
          </Section>
          <Section title="6. Contact">
            <p>
              For privacy inquiries, contact{" "}
              <a
                href={`mailto:${supportEmail}`}
                className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors"
              >
                {supportEmail}
              </a>
              .
            </p>
          </Section>
          <p className="text-xs" style={{ color: "var(--c-meta)" }}>
            Effective date: August 11, 2026
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
            日本語
          </div>

          <Section title="1. データの収集">
            <p>
              Earthは個人情報を収集しません。アカウント、サーバー、広告、
              第三者分析ツールを使用せず、アプリで処理した情報を外部へ送信しません。
            </p>
          </Section>
          <Section title="2. 端末内のデータ">
            <p>
              選択した都市、アプリの言語、地球儀の表示設定は、機能提供のため
              端末内にのみ保存されます。初期の都市時刻を表示するため端末の現在の
              タイムゾーン識別子を参照する場合がありますが、外部へ送信しません。
            </p>
          </Section>
          <Section title="3. コンパス方位">
            <p>
              対応端末では磁気コンパスの方位を読み取り、太陽と月の方向を表示します。
              正確な位置情報は要求せず、方位データを保存または送信しません。
            </p>
          </Section>
          <Section title="4. 第三者素材">
            <p>
              アプリ内の都市データ、天体テクスチャ、オフライン天文計算コードは、
              Earthを通じて個人情報を収集または送信しません。
            </p>
          </Section>
          <Section title="5. 保存と削除">
            <p>
              端末内の設定はEarthをアンインストールすると、アプリデータとともに
              iOSによって削除されます。
            </p>
          </Section>
          <Section title="6. お問い合わせ">
            <p>
              プライバシーに関するお問い合わせは{" "}
              <a
                href={`mailto:${supportEmail}`}
                className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors"
              >
                {supportEmail}
              </a>
              までご連絡ください。
            </p>
          </Section>
          <p className="text-xs" style={{ color: "var(--c-meta)" }}>
            施行日：2026年8月11日
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
            href="/support/earth"
            className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]"
            style={{ color: "var(--c-dim)" }}
          >
            Earth 지원
          </Link>
        </div>
      </article>
    </div>
  );
}
