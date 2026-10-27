import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "오늘 열었을까 지원" };
export default function Support() {
  return <main className="min-h-screen px-6 py-24"><article className="max-w-2xl mx-auto space-y-6 text-sm leading-relaxed" style={{color:"var(--c-body)"}}>
    <h1 className="text-3xl font-semibold" style={{color:"var(--c-title)"}}>오늘 열었을까 지원</h1>
    <p>장소를 검색하거나 네이버 지도에서 장소 또는 공유 가능한 저장 리스트를 보내 등록할 수 있습니다. 장소를 누르면 시간표와 휴무 공지를 확인하고 이름을 바꿀 수 있습니다.</p>
    <p>네이버 정보를 확인하지 못했다면 인터넷 연결을 확인하고 다시 시도해 주세요. 운영정보와 실제 운영 상황이 다를 수 있으니 방문 전 원문을 확인해 주세요.</p>
    <p><a className="underline" href="https://github.com/sunpark20/errorreport/issues/new?template=todayopen-bug.yml&version=unknown&build=unknown&os=unknown&device=unknown&diagnostics=unknown">오류 신고</a> · 공개 이슈이므로 개인정보를 포함하지 마세요.</p>
    <Link className="underline" href="/privacy/todayopen">개인정보처리방침</Link>
  </article></main>;
}
