import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "오늘 열었을까 개인정보처리방침" };
export default function Privacy() {
  return <main className="min-h-screen px-6 py-24"><article className="max-w-2xl mx-auto space-y-6 text-sm leading-relaxed" style={{color:"var(--c-body)"}}>
    <h1 className="text-3xl font-semibold" style={{color:"var(--c-title)"}}>오늘 열었을까 개인정보처리방침</h1>
    <p>오늘 열었을까는 별도 회원가입, 광고 또는 제3자 분석 도구를 사용하지 않습니다.</p>
    <h2 className="text-lg font-medium">장소 검색과 운영정보</h2><p>장소 검색 시 검색어가 네이버 지역 검색 서비스에 전달됩니다. 선택한 장소의 주소와 네이버 장소 페이지를 이용해 운영시간과 공지를 확인합니다. 공유한 네이버 지도 링크도 해당 목록이나 장소를 읽기 위해 네이버에 요청합니다.</p>
    <h2 className="text-lg font-medium">저장과 iCloud</h2><p>장소, 별명, 운영시간, 공지와 앱 설정은 기기에 저장되며 iCloud를 사용할 수 있으면 사용자의 개인 iCloud에 동기화됩니다. iCloud 처리에는 Apple의 정책이 적용됩니다. 위젯은 기기에 저장된 정보의 사본을 사용합니다. 알림 설정은 기기에서 처리됩니다.</p>
    <h2 className="text-lg font-medium">사진 및 삭제</h2><p>사용자가 선택한 공지 이미지는 기기에서 글자를 읽는 데 사용합니다. 장소와 공지는 앱에서 삭제할 수 있습니다. 기기에 저장된 앱 데이터는 앱 삭제 시 제거되며, iCloud 데이터는 기기의 iCloud 저장 공간 설정에서 관리할 수 있습니다.</p>
    <p>오류 신고는 공개 GitHub 이슈로 연결됩니다. 개인정보를 포함하지 않도록 확인해 주세요. 개인정보 문의: <a className="underline" href="mailto:coastguard2681@gmail.com">coastguard2681@gmail.com</a></p>
    <p>시행일: 2026년 10월 27일</p><Link href="/support/todayopen" className="underline">지원 페이지</Link>
  </article></main>;
}
