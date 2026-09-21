import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "책기록 개인정보처리방침",
  description: "책기록 앱 개인정보처리방침 / Book reading records privacy policy",
};

const supportEmail = "coastguard2681@gmail.com";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-medium mb-2" style={{ color: "var(--c-heading)" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function BookPrivacy() {
  return (
    <div className="min-h-screen flex items-start justify-center px-6 py-24">
      <article className="max-w-2xl w-full space-y-12">
        <h1 className="text-3xl font-semibold tracking-tight font-[family-name:var(--font-display)]" style={{ color: "var(--c-title)" }}>
          책기록 개인정보처리방침
          <span className="block text-xl font-normal mt-1" style={{ color: "var(--c-dim)" }}>
            Book reading records privacy policy
          </span>
        </h1>

        <div className="space-y-6 text-sm leading-relaxed" style={{ color: "var(--c-body)" }}>
          <div className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--c-meta)" }}>한국어</div>
          <Section title="1. 수집하는 정보">
            <p>책기록은 계정, 광고, 제3자 분석 도구를 사용하지 않습니다. 책 제목·저자·ISBN을 검색하면 검색어가 책 검색 제공자인 카카오의 도서 검색 API로 전송될 수 있습니다. 검색 결과의 책 정보와 표지 주소는 앱에서 선택한 책을 표시하기 위해 사용합니다.</p>
          </Section>
          <Section title="2. 기기 내 저장">
            <p>등록한 책, 독서 회차, 메모, 별점, 날짜, 사용자 표지와 책 속 이미지는 사용자의 기기 안에 저장됩니다. 책 검색 인증 정보는 iOS 키체인에 저장되며 백업 파일에 포함하지 않습니다.</p>
          </Section>
          <Section title="3. 사진과 카메라">
            <p>사용자가 선택한 사진을 표지나 책 속 이미지로 저장할 때만 사진 선택기 또는 카메라를 사용합니다. 선택하지 않은 사진이나 카메라 영상은 수집하지 않습니다.</p>
          </Section>
          <Section title="4. 백업과 공유">
            <p>백업 파일 내보내기와 복원은 사용자가 시작한 경우에만 동작합니다. 내보낸 파일에는 책 정보와 사용자가 작성한 기록·이미지가 포함될 수 있으므로, 파일을 공유할 때는 수신자와 보관 장소를 확인해 주세요. 앱은 백업 파일을 자동으로 서버에 업로드하지 않습니다.</p>
          </Section>
          <Section title="5. 삭제와 문의">
            <p>앱 안에서 책과 기록을 삭제하거나 앱을 삭제하면 기기 안의 해당 데이터가 제거됩니다. 개인정보 관련 문의는 <a href={`mailto:${supportEmail}`} className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors">{supportEmail}</a>으로 보내 주세요.</p>
          </Section>
          <p className="text-xs" style={{ color: "var(--c-meta)" }}>시행일: 2026년 9월 21일</p>
        </div>

        <div style={{ borderTop: "1px solid var(--c-divider)" }} />

        <div className="space-y-6 text-sm leading-relaxed" style={{ color: "var(--c-body)" }}>
          <div className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--c-meta)" }}>English</div>
          <Section title="1. Information we use">
            <p>Book does not use accounts, advertising, or third-party analytics. When you search for a title, author, or ISBN, the search query may be sent to Kakao&apos;s book search API. Book information and cover URLs from a selected result are used to display that book in the app.</p>
          </Section>
          <Section title="2. On-device storage">
            <p>Your books, dated reading sessions, notes, ratings, dates, custom covers, and page images are stored on your device. Search credentials are kept in the iOS Keychain and are not included in backups.</p>
          </Section>
          <Section title="3. Photos and camera">
            <p>The photo picker or camera is used only when you choose an image for a cover or page image. We do not collect photos or camera footage that you did not select.</p>
          </Section>
          <Section title="4. Backups and sharing">
            <p>Export and restore run only when you start them. An exported file can contain book details, reading records, and images that you entered, so review the recipient and storage location before sharing it. The app does not upload backups automatically.</p>
          </Section>
          <Section title="5. Deletion and contact">
            <p>You can delete books and records in the app, and deleting the app removes its on-device data. For privacy questions, contact <a href={`mailto:${supportEmail}`} className="underline underline-offset-2 hover:text-[var(--c-heading)] transition-colors">{supportEmail}</a>.</p>
          </Section>
          <p className="text-xs" style={{ color: "var(--c-meta)" }}>Effective date: September 21, 2026</p>
        </div>

        <div className="pt-4 flex flex-wrap gap-4">
          <Link href="/" className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]" style={{ color: "var(--c-dim)" }}>&larr; 홈으로 돌아가기</Link>
          <Link href="/support/book" className="text-sm transition-colors duration-200 hover:text-[var(--c-heading)]" style={{ color: "var(--c-dim)" }}>지원 페이지</Link>
        </div>
      </article>
    </div>
  );
}
