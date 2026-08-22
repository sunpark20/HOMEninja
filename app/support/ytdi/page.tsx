import type { Metadata } from "next";
import Link from "next/link";
import { appByID } from "@/data/apps";

export const metadata: Metadata = {
  title: "ytdi 지원",
  description: "ytdi support / ytdi 사용법과 문제 해결",
};

const app = appByID("ytdi");

export default function YtdiSupport() {
  return (
    <div className="min-h-screen flex items-start justify-center px-6 py-24">
      <article className="max-w-2xl w-full space-y-10">
        <h1 className="text-3xl font-semibold tracking-tight font-[family-name:var(--font-display)]" style={{ color: "var(--c-title)" }}>ytdi 지원<span className="block text-xl font-normal mt-1" style={{ color: "var(--c-dim)" }}>ytdi Support</span></h1>
        <div className="space-y-7 text-sm leading-relaxed" style={{ color: "var(--c-body)" }}>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>시작하기</h2><p>큐에서 본인이 저장할 권리나 허가를 가진 영상 링크를 붙여넣고 화질을 선택하세요. 다운로드가 끝나면 다운로드받은 목록에 나타나며, 길게 눌러 새 목록으로 이동할 수 있습니다.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>회선이 끊겼어요</h2><p>네트워크가 없으면 주소를 반복해서 다시 만들지 않고 같은 받은 위치에서 기다립니다. 연결이 돌아오면 자동으로 이어받습니다. 앱 전환기에서 사용자가 강제 종료한 경우에는 앱을 다시 열어야 합니다.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>저장 공간이 부족해요</h2><p>공간 부족 상태에서는 이미 받은 바이트와 위치를 보존합니다. iPhone의 공간을 비운 뒤 앱을 열면 같은 위치에서 계속합니다. 고화질은 비디오, 오디오, 병합 결과가 잠시 함께 있어 표시 용량보다 더 많은 여유가 필요할 수 있습니다.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>재생과 목록</h2><p>파일이 사라진 항목은 경고와 함께 남지만 재생할 수 없습니다. 삭제는 가능합니다. 재생을 시작할 때의 목록 순서가 현재 큐의 스냅샷이므로, 재생 중 항목을 다른 목록으로 옮겨도 현재 큐는 갑자기 바뀌지 않습니다.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>권리 안내</h2><p>ytdi는 YouTube 또는 Google과 제휴·승인·후원 관계가 없는 독립 앱입니다. 직접 만든 콘텐츠, 다운로드가 명시적으로 허용된 콘텐츠, 또는 권리자 허가를 받은 콘텐츠에만 사용하세요.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>문제 신고</h2><p>버전, 증상, 재현 순서를 적어 <a className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors" href={app.reporting.url}>GitHub Issue Form</a>으로 알려 주세요. 영상 링크, 제목, 파일 경로, 기기 이름, 원본 로그와 개인정보는 공개 이슈에 올리지 마세요.</p></section>
          <section><h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>English support</h2><p>Paste only a media link you own or are authorized to save, choose a format, and let the single-connection queue resume interruptions. If storage runs out, free space and reopen the app; received offsets are preserved. Force-quitting from the app switcher requires reopening ytdi.</p><p className="mt-2">For a problem, open the <a className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors" href={app.reporting.url}>GitHub Issue Form</a> with version and reproduction steps. Never post media links, titles, file paths, device names, raw logs, or personal information.</p></section>
        </div>
        <div className="pt-4 flex flex-wrap gap-4"><Link className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]" href="/" style={{ color: "var(--c-dim)" }}>&larr; 홈으로 돌아가기</Link><Link className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]" href="/privacy/ytdi" style={{ color: "var(--c-dim)" }}>개인정보처리방침</Link></div>
      </article>
    </div>
  );
}
