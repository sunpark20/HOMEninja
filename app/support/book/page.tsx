import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "책기록 지원",
  description: "책기록 앱 지원 및 문의 / Book reading records support",
};

const supportEmail = "coastguard2681@gmail.com";

export default function BookSupport() {
  return (
    <div className="min-h-screen flex items-start justify-center px-6 py-24">
      <article className="max-w-2xl w-full space-y-10">
        <h1 className="text-3xl font-semibold tracking-tight font-[family-name:var(--font-display)]" style={{ color: "var(--c-title)" }}>
          책기록 지원
          <span className="block text-xl font-normal mt-1" style={{ color: "var(--c-dim)" }}>Book support</span>
        </h1>
        <div className="space-y-6 text-sm leading-relaxed" style={{ color: "var(--c-body)" }}>
          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>사용 방법</h2>
            <p>책 추가에서 제목·저자·ISBN을 검색하거나 직접 등록할 수 있습니다. 책 상세에서 독서 회차별 상태, 날짜, 별점, 메모와 책 속 이미지를 남길 수 있습니다. 설정 및 백업에서 JSON 백업을 내보내고 파일 앱에서 다시 불러올 수 있습니다.</p>
          </section>
          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>검색이 되지 않을 때</h2>
            <p>네트워크 연결이나 검색어를 확인한 뒤 다시 시도해 주세요. 검색 결과가 없는 책은 책 추가 화면의 직접 등록으로 저장할 수 있습니다. 검색은 카카오 도서 검색 API를 사용합니다.</p>
          </section>
          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>백업과 복원</h2>
            <p>복원은 현재 보관함을 선택한 백업으로 교체하며, 복원 전에 안전 사본을 남깁니다. 복원할 수 없는 파일은 기존 데이터를 바꾸지 않습니다. 문제가 생기면 원본 백업 파일과 오류 화면을 보관해 주세요.</p>
          </section>
          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>문의하기</h2>
            <p>문제나 제안은 <a href={`mailto:${supportEmail}?subject=책기록%20지원`} className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors">{supportEmail}</a>으로 보내 주세요. 기기 모델, iOS 버전, 앱 버전·빌드, 문제가 발생한 기능과 재현 순서를 함께 알려주시면 확인에 도움이 됩니다. 책 제목·메모·백업 파일에는 개인정보가 포함될 수 있으니 필요한 경우 내용을 지운 뒤 첨부해 주세요.</p>
          </section>
          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>Support</h2>
            <p>Book lets you search for books or add them manually, keep dated reading records, and export or restore a JSON backup. If search fails, check the network and try a manual entry. When reporting an issue, include the device model, iOS version, app version and build, affected feature, and reproduction steps. Avoid attaching books, notes, or backups that contain personal information unless necessary.</p>
          </section>
        </div>
        <div className="pt-4 flex flex-wrap gap-4">
          <Link href="/" className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]" style={{ color: "var(--c-dim)" }}>&larr; 홈으로 돌아가기</Link>
          <Link href="/privacy/book" className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]" style={{ color: "var(--c-dim)" }}>개인정보처리방침</Link>
        </div>
      </article>
    </div>
  );
}
