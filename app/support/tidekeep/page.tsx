import type { Metadata } from "next";
import Link from "next/link";
import { appByID } from "@/data/apps";

export const metadata: Metadata = {
  title: "TideKeep 지원",
  description: "TideKeep support / TideKeep 사용법과 문제 해결",
};

const app = appByID("ytdi");

export default function TideKeepSupport() {
  return (
    <div className="min-h-screen flex items-start justify-center px-6 py-24">
      <article className="max-w-2xl w-full space-y-10">
        <h1 className="text-3xl font-semibold tracking-tight font-[family-name:var(--font-display)]" style={{ color: "var(--c-title)" }}>TideKeep 지원<span className="block text-xl font-normal mt-1" style={{ color: "var(--c-dim)" }}>TideKeep Support</span></h1>
        <div className="space-y-7 text-sm leading-relaxed" style={{ color: "var(--c-body)" }}>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>시작하기</h2><p>보관함 오른쪽 위의 +를 눌러 파일 앱에서 오디오나 비디오를 고르세요. 여러 파일을 한 번에 선택할 수 있습니다. iCloud Drive 파일은 파일 앱이 먼저 기기로 내려받을 수 있습니다.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>파일이 들어오지 않아요</h2><p>TideKeep은 AVFoundation이 재생 가능하다고 확인한 오디오와 비디오만 가져옵니다. 빈 파일, 폴더, 손상된 파일 또는 지원하지 않는 코덱은 거절합니다. 같은 바이트의 파일은 SHA-256으로 확인해 중복 보관하지 않습니다.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>재생과 이어보기</h2><p>항목을 열어 재생하세요. 비디오는 전체 화면과 Picture in Picture를 지원하고, 오디오는 화면이 잠긴 뒤에도 계속 재생할 수 있습니다. 재생을 마치기 직전이 아니면 마지막 위치를 저장합니다.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>목록과 파일 위치</h2><p>파일 상세 화면에서 여러 사용자 목록에 항목을 추가할 수 있습니다. 실제 미디어는 파일 앱의 나의 iPhone &gt; TideKeep &gt; Media에도 나타납니다. 목록을 삭제해도 파일은 남고, 미디어 파일 삭제는 확인 뒤 실제 파일을 제거합니다.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>지원 범위와 권리</h2><p>TideKeep은 링크 입력, 웹사이트 탐색 또는 온라인 미디어 다운로드 기능이 없습니다. 직접 소유했거나 사용할 권한이 있는 파일만 가져오세요.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>문제 신고</h2><p>버전, 증상과 재현 순서를 적어 <a className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors" href={app.reporting.url}>GitHub Issue Form</a>으로 알려 주세요. 이슈는 공개되므로 미디어 제목, 파일, 사용자 파일 경로, 기기 식별자, 원본 로그 또는 개인정보를 올리지 마세요.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>English support</h2><p>Tap + in Library and choose playable audio or video with the system Files picker. TideKeep stores selected files locally, skips byte-identical duplicates using SHA-256, remembers playback position, supports collections, sharing, background audio, and Picture in Picture.</p><p className="mt-2">TideKeep has no link input, website browser, or online-media downloader. For help, open the <a className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors" href={app.reporting.url}>public GitHub Issue Form</a>. Never post media titles, files, user file paths, device identifiers, raw logs, or personal information.</p></section>
        </div>
        <div className="pt-4 flex flex-wrap gap-4"><Link className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]" href="/" style={{ color: "var(--c-dim)" }}>&larr; 홈으로 돌아가기</Link><Link className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]" href="/privacy/tidekeep" style={{ color: "var(--c-dim)" }}>개인정보처리방침</Link></div>
      </article>
    </div>
  );
}
