import type { Metadata } from "next";
import Link from "next/link";
import { appByID } from "@/data/apps";

export const metadata: Metadata = {
  title: "TideKeep 개인정보처리방침",
  description: "TideKeep privacy policy / TideKeep 개인정보처리방침",
};

const app = appByID("ytdi");

export default function TideKeepPrivacy() {
  return (
    <div className="min-h-screen flex items-start justify-center px-6 py-24">
      <article className="max-w-2xl w-full space-y-12">
        <h1 className="text-3xl font-semibold tracking-tight font-[family-name:var(--font-display)]" style={{ color: "var(--c-title)" }}>
          TideKeep 개인정보처리방침
          <span className="block text-xl font-normal mt-1" style={{ color: "var(--c-dim)" }}>TideKeep Privacy Policy</span>
        </h1>

        <div className="space-y-7 text-sm leading-relaxed" style={{ color: "var(--c-body)" }}>
          <div className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--c-meta)" }}>한국어</div>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>1. 개발자가 수집하는 정보</h2><p>TideKeep 개발자는 개인정보를 수집하거나 보관하지 않습니다. 앱은 계정, 광고, 분석 SDK, 추적 기술 또는 개발자 운영 서버를 사용하지 않습니다.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>2. 사용자가 선택한 파일</h2><p>앱은 사용자가 iOS 파일 선택기에서 직접 고른 재생 가능한 오디오·비디오 파일만 읽습니다. 선택한 파일은 앱의 문서 폴더로 복사되며 제목, 원래 파일 이름, 파일 크기, 재생 길이, SHA-256 무결성 값, 가져온 날짜, 이어보기 위치와 사용자 목록이 같은 기기의 앱 컨테이너에 저장됩니다.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>3. 네트워크와 타사 서비스</h2><p>TideKeep은 미디어 링크나 온라인 서비스를 탐색·추출·저장·변환·다운로드하지 않으며 기능 수행을 위한 네트워크 요청을 보내지 않습니다. 사용자가 설정에서 지원 또는 개인정보처리방침 링크를 누를 때만 시스템 브라우저가 이 공개 웹사이트를 엽니다.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>4. 공유, 삭제와 백업</h2><p>공유는 사용자가 파일 상세 화면의 공유 버튼을 누를 때만 iOS 공유 시트로 시작됩니다. 앱에서 파일을 삭제할 수 있고 앱을 제거하면 앱 컨테이너도 제거됩니다. iOS 백업 설정에 따라 로컬 파일과 메타데이터가 사용자의 기기 백업에 포함될 수 있습니다.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>5. 문제 신고</h2><p>신고는 사용자가 지원 페이지에서 <a className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors" href={app.reporting.url}>공개 GitHub Issue Form</a>을 연 경우에만 전송됩니다. 앱은 미디어 제목, 파일, 경로, 기기 식별자 또는 원본 로그를 자동 첨부하지 않습니다. 사용자가 직접 제출한 내용은 GitHub의 정책과 이용약관을 따릅니다.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>6. 문의</h2><p>개인정보 관련 문의는 공개 GitHub Issue Form으로 남겨 주세요. 민감정보, 미디어 제목, 파일 경로 또는 원본 로그를 올리지 마세요.</p></section>
          <p className="text-xs" style={{ color: "var(--c-meta)" }}>시행일: 2026년 8월 24일</p>
        </div>

        <div style={{ borderTop: "1px solid var(--c-divider)" }} />

        <div className="space-y-7 text-sm leading-relaxed" style={{ color: "var(--c-body)" }}>
          <div className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--c-meta)" }}>English</div>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>1. Developer collection</h2><p>The TideKeep developer does not collect or retain personal information. The app uses no account, advertising, analytics SDK, tracking technology, or developer-operated server.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>2. User-selected files</h2><p>The app reads only playable audio and video files the user explicitly selects with the iOS file picker. It copies selected files into the app&apos;s Documents folder. Titles, original filenames, sizes, durations, SHA-256 integrity values, import dates, resume positions, and named collections stay in the on-device app container.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>3. Network and third-party services</h2><p>TideKeep does not browse, extract, save, convert, or download media links or online services and makes no network request to perform its features. The system browser opens this public website only when the user taps Support or Privacy Policy in Settings.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>4. Sharing, deletion, and backup</h2><p>Sharing starts only when the user taps Share on a file detail screen. Files can be deleted in the app, and uninstalling removes the app container. Local files and metadata may be included in the user&apos;s device backup depending on iOS backup settings.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>5. Problem reports</h2><p>Information is submitted only if the user opens the <a className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors" href={app.reporting.url}>public GitHub Issue Form</a> from the support page. TideKeep does not automatically attach media titles, files, paths, device identifiers, or raw logs. User-submitted text is governed by GitHub&apos;s policies and terms.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>6. Contact</h2><p>For privacy questions, use the public GitHub Issue Form. Do not post sensitive information, media titles, file paths, or raw logs.</p></section>
          <p className="text-xs" style={{ color: "var(--c-meta)" }}>Effective date: August 24, 2026</p>
        </div>

        <div className="pt-4 flex flex-wrap gap-4"><Link className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]" href="/" style={{ color: "var(--c-dim)" }}>&larr; 홈으로 돌아가기</Link><Link className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]" href="/support/tidekeep" style={{ color: "var(--c-dim)" }}>TideKeep 지원</Link></div>
      </article>
    </div>
  );
}
