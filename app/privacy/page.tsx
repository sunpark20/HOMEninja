import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 — 닌자거북의홈",
  description: "개인정보처리방침 / Privacy Policy",
};

export default function Privacy() {
  return (
    <div className="min-h-screen flex items-start justify-center px-6 py-24">
      <article className="max-w-2xl w-full space-y-12">
        <h1
          className="text-3xl font-semibold tracking-tight font-[family-name:var(--font-display)]"
          style={{ color: "var(--c-title)" }}
        >
          개인정보처리방침
          <span
            className="block text-xl font-normal mt-1"
            style={{ color: "var(--c-dim)" }}
          >
            Privacy Policy
          </span>
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
              1. Information We Collect
            </h2>
            <p>
              This service collects only the minimum personal information
              necessary. Items collected and their purposes vary by app
              function and are described per-app in Section 5 below.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              2. Purpose of Use
            </h2>
            <p>
              Collected information is used solely to provide, secure, and
              improve the relevant service. Retention varies by app and data
              type as described below.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              3. Retention and Deletion
            </h2>
            <p>
              Information is deleted when it is no longer reasonably necessary
              for the stated purpose. Where retention is required by law, the
              data is stored securely for that period only.
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
                className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors"
              >
                coastguard2681@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              5. App-Specific Details
            </h2>

            <div>
              <h3
                className="text-base font-medium mb-1"
                style={{ color: "var(--c-subheading)" }}
              >
                SnapCart (찰칵 장값 계산기)
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Camera access is used to photograph retail price tags.</li>
                <li>
                  Apple Vision performs OCR on-device. The original price-tag
                  image is not sent for AI analysis.
                </li>
                <li>
                  Recognized text is sent through the app&apos;s configured proxy
                  to Google Gemini to identify the product and price.
                </li>
                <li>
                  When voice input is used, recorded audio is sent to Groq for
                  transcription, and the transcript is sent to Google Gemini
                  for item parsing.
                </li>
                <li>Cart items and analysis results are stored on-device.</li>
              </ul>
            </div>

            <div className="mt-6">
              <h3
                className="text-base font-medium mb-1"
                style={{ color: "var(--c-subheading)" }}
              >
                ytninza
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  An optional YouTube Data API key, download-folder location,
                  and window preferences are stored on the user&apos;s device.
                </li>
                <li>
                  URLs, channel handles, and public video metadata are processed
                  through YouTube, Google APIs, or yt-dlp to provide analysis
                  and downloads. Downloaded media remains on the user&apos;s device.
                </li>
                <li>
                  Fatal errors automatically send a diagnostic report through
                  Google Apps Script. Reports can include app and system details,
                  error information, a traceback, and the latest 50 log lines.
                  Recent logs may contain YouTube URLs, video titles, and local
                  file or folder paths.
                </li>
                <li>
                  Diagnostic data is used only for troubleshooting and product
                  improvement and is retained only as long as reasonably needed
                  for those purposes.
                </li>
              </ul>
              <p className="mt-2">
                See the complete ytninza privacy, terms, and copyright notices on
                the{" "}
                <a
                  href="https://sunpark20.github.io/YT-Chita/?lang=en#privacy"
                  className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors"
                >
                  product page
                </a>
                .
              </p>
            </div>
          </section>
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
              1. 수집하는 개인정보
            </h2>
            <p>
              본 서비스는 최소한의 개인정보만을 수집합니다. 수집 항목 및 목적은
              각 앱의 기능에 따라 다르며, 아래에서 앱별로 안내합니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              2. 개인정보의 이용 목적
            </h2>
            <p>
              수집된 개인정보는 관련 서비스 제공, 보안 및 개선 목적으로만
              사용합니다. 보관 기간은 아래의 앱과 데이터 유형별 설명에 따라
              달라집니다.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              3. 개인정보의 보관 및 파기
            </h2>
            <p>
              개인정보는 명시한 목적에 더 이상 합리적으로 필요하지 않을 때
              파기합니다. 법령에 의해 보관이 필요한 경우 해당 기간 동안만
              안전하게 보관합니다.
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
                className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors"
              >
                coastguard2681@gmail.com
              </a>
              으로 연락해 주세요.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-medium mb-2"
              style={{ color: "var(--c-heading)" }}
            >
              5. 앱별 추가사항
            </h2>

            <div>
              <h3
                className="text-base font-medium mb-1"
                style={{ color: "var(--c-subheading)" }}
              >
                찰칵 장값 계산기 (SnapCart)
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>카메라 접근 권한을 사용하여 매장의 가격표를 촬영합니다.</li>
                <li>
                  Apple Vision이 기기에서 OCR을 처리하며, 원본 가격표 이미지는
                  AI 분석을 위해 전송하지 않습니다.
                </li>
                <li>
                  인식된 텍스트는 상품명과 가격 판별을 위해 앱에 설정된 프록시를
                  거쳐 Google Gemini로 전송됩니다.
                </li>
                <li>
                  음성 입력을 사용하면 녹음한 오디오가 음성 변환을 위해 Groq로
                  전송되고, 변환된 텍스트는 품목 분석을 위해 Google Gemini로
                  전송됩니다.
                </li>
                <li>장바구니 항목과 분석 결과는 기기에 저장됩니다.</li>
              </ul>
            </div>

            <div className="mt-6">
              <h3
                className="text-base font-medium mb-1"
                style={{ color: "var(--c-subheading)" }}
              >
                ytninza
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  선택적으로 입력한 YouTube Data API 키, 다운로드 폴더 위치 및 창
                  설정은 사용자 기기에 저장됩니다.
                </li>
                <li>
                  URL, 채널 핸들 및 공개 영상 메타데이터는 분석과 다운로드 제공을
                  위해 YouTube, Google API 또는 yt-dlp를 통해 처리합니다. 다운로드한
                  미디어는 사용자 기기에 저장됩니다.
                </li>
                <li>
                  치명적인 오류가 발생하면 Google Apps Script를 통해 진단 보고서를
                  자동 전송합니다. 보고서에는 앱·시스템 정보, 오류 정보, 트레이스백
                  및 최근 로그 50줄이 포함될 수 있습니다. 최근 로그에는 YouTube URL,
                  영상 제목 및 로컬 파일·폴더 경로가 포함될 수 있습니다.
                </li>
                <li>
                  진단 데이터는 문제 해결과 제품 개선 목적으로만 사용하며 해당
                  목적에 합리적으로 필요한 기간 동안만 보관합니다.
                </li>
              </ul>
              <p className="mt-2">
                전체 개인정보처리방침, 이용약관 및 저작권 정책은{" "}
                <a
                  href="https://sunpark20.github.io/YT-Chita/?lang=ko#privacy"
                  className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors"
                >
                  ytninza 제품 페이지
                </a>
                에서 확인할 수 있습니다.
              </p>
            </div>
          </section>
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
