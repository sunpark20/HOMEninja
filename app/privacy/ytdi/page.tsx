import type { Metadata } from "next";
import Link from "next/link";
import { appByID } from "@/data/apps";

export const metadata: Metadata = {
  title: "ytdi 개인정보처리방침",
  description: "ytdi privacy policy / ytdi 개인정보처리방침",
};

const app = appByID("ytdi");

export default function YtdiPrivacy() {
  return (
    <div className="min-h-screen flex items-start justify-center px-6 py-24">
      <article className="max-w-2xl w-full space-y-12">
        <h1 className="text-3xl font-semibold tracking-tight font-[family-name:var(--font-display)]" style={{ color: "var(--c-title)" }}>
          ytdi 개인정보처리방침
          <span className="block text-xl font-normal mt-1" style={{ color: "var(--c-dim)" }}>ytdi Privacy Policy</span>
        </h1>

        <div className="space-y-7 text-sm leading-relaxed" style={{ color: "var(--c-body)" }}>
          <div className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--c-meta)" }}>한국어</div>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>1. 개발자가 수집하는 정보</h2><p>ytdi 개발자는 개인정보를 수집하거나 보관하지 않습니다. 계정, 광고, 분석 SDK, 추적 기술, 개발자 운영 서버를 사용하지 않습니다.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>2. 기기에 저장되는 정보</h2><p>사용자가 입력한 영상 링크 또는 ID, 제목과 포맷 정보, 다운로드 진행 상태와 임시 조각, 완성 파일, 사용자 목록, 재생 위치, 앱 설정은 iPhone의 앱 컨테이너에 저장됩니다. 사용자는 앱 안에서 개별 항목을 삭제할 수 있고 앱을 삭제하면 컨테이너가 제거됩니다. iOS 백업 설정에 따라 로컬 데이터가 사용자의 기기 백업에 포함될 수 있습니다.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>3. 기능 수행을 위한 네트워크 통신</h2><p>사용자가 다운로드를 요청하면 링크와 영상 ID를 바탕으로 YouTube·Google의 콘텐츠 서버에 직접 연결하고, 표준 네트워크 정보(IP 주소와 요청 헤더 등)는 해당 서비스에 전달됩니다. 추출 규칙 갱신은 공개 GitHub Gist 파일을 가져오며 사용자 링크나 보관함 내용은 그 요청에 포함하지 않습니다. 각 서비스의 개인정보처리방침과 약관이 적용됩니다.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>4. 문제 신고</h2><p>신고는 사용자가 설정에서 버튼을 누른 경우에만 공개 GitHub Issue Form을 엽니다. 버전, 빌드, OS 버전, 일반 기기 종류와 제한된 진단값만 미리 채우며, 영상 링크·제목·파일 경로·기기 이름·원본 로그는 자동 첨부하지 않습니다. 사용자가 이슈에 직접 적은 내용은 GitHub의 공개 정책과 이용약관을 따릅니다.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>5. 추적·공유·보유</h2><p>개발자는 데이터를 추적, 판매, 광고용 공유하지 않습니다. 개발자가 수신하거나 보관하는 사용자 데이터가 없으므로 별도의 개발자 보유 기간도 없습니다.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>6. 문의</h2><p>개인정보 관련 문의는 <a className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors" href={app.reporting.url}>공개 GitHub 이슈</a>로 남겨 주세요. 민감정보나 원본 로그를 올리지 마세요.</p></section>
          <p className="text-xs" style={{ color: "var(--c-meta)" }}>시행일: 2026년 8월 22일</p>
        </div>

        <div style={{ borderTop: "1px solid var(--c-divider)" }} />

        <div className="space-y-7 text-sm leading-relaxed" style={{ color: "var(--c-body)" }}>
          <div className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--c-meta)" }}>English</div>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>1. Developer collection</h2><p>The ytdi developer does not collect or retain personal information. The app uses no account, advertising, analytics SDK, tracking technology, or developer-operated server.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>2. On-device information</h2><p>Entered media links or IDs, titles and format metadata, download state and temporary chunks, completed files, named lists, playback positions, and settings remain in the app container on the iPhone. Items can be deleted in the app; uninstalling removes the container. Local data may be included in the user&apos;s device backup depending on iOS backup settings.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>3. Functional network requests</h2><p>When the user requests a download, ytdi connects directly to YouTube and Google content servers based on the entered link or video ID. Those services receive standard network information such as IP address and request headers. Rule updates fetch a public GitHub Gist and contain no user link or library contents. Each service&apos;s policies and terms apply.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>4. Problem reports</h2><p>A public GitHub Issue Form opens only after the user taps the report button. The app pre-fills version, build, OS version, generic device class, and a limited diagnostic value. It does not automatically attach media links, titles, file paths, device names, or raw logs. Text the user submits is governed by GitHub&apos;s policies and is public.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>5. Tracking, sharing, and retention</h2><p>The developer does not track, sell, or share data for advertising. Because the developer receives no user data, there is no developer retention period.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>6. Contact</h2><p>For privacy questions, open the <a className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors" href={app.reporting.url}>public GitHub Issue Form</a>. Do not post sensitive information or raw logs.</p></section>
          <p className="text-xs" style={{ color: "var(--c-meta)" }}>Effective date: August 22, 2026</p>
        </div>

        <div className="pt-4 flex flex-wrap gap-4"><Link className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]" href="/" style={{ color: "var(--c-dim)" }}>&larr; 홈으로 돌아가기</Link><Link className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]" href="/support/ytdi" style={{ color: "var(--c-dim)" }}>ytdi 지원</Link></div>
      </article>
    </div>
  );
}
