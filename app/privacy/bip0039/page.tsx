import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "BIP-0039 Mnemonic 개인정보처리방침" };
export default function Privacy() {
  return <main className="min-h-screen px-6 py-24"><article className="max-w-2xl mx-auto space-y-6 text-sm leading-relaxed" style={{color:"var(--c-body)"}}>
    <h1 className="text-3xl font-semibold" style={{color:"var(--c-title)"}}>BIP-0039 Mnemonic 개인정보처리방침</h1>
    <p>이 앱은 오프라인에서 단어 목록을 검색합니다. 앱은 검색어와 결과를 저장하거나 전송하지 않으며, 광고 및 분석 도구를 사용하지 않습니다. 앱이 비활성화되면 검색 내용이 초기화됩니다.</p>
    <p>기기의 스크린샷, 화면 녹화, 운영체제 진단 자료 또는 외부 촬영은 앱이 통제할 수 없습니다. 실제 복구 문구를 검색하거나 오류 보고에 포함하지 마세요.</p>
    <p>개인정보 문의: <a className="underline" href="mailto:coastguard2681@gmail.com">coastguard2681@gmail.com</a></p><p>시행일: 2026년 10월 27일</p>
    <h2 className="text-lg font-medium">Privacy</h2><p>The app works offline. It does not store or transmit search queries or results and does not use advertising or analytics. Search is cleared when the app becomes inactive. Do not enter real recovery phrases or include them in bug reports.</p>
    <Link href="/support/bip0039" className="underline">지원 페이지</Link>
  </article></main>;
}
