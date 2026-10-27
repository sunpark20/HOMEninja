import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "BIP-0039 Mnemonic 지원" };
export default function Support() {
  return <main className="min-h-screen px-6 py-24"><article className="max-w-2xl mx-auto space-y-6 text-sm leading-relaxed" style={{color:"var(--c-body)"}}>
    <h1 className="text-3xl font-semibold" style={{color:"var(--c-title)"}}>BIP-0039 Mnemonic 지원</h1>
    <p>오프라인에서 BIP-39 영문 단어 목록을 찾을 수 있습니다. 앱을 벗어나면 검색 내용은 초기화됩니다.</p>
    <p><a className="underline" href="https://github.com/sunpark20/errorreport/issues/new?template=bip0039-bug.yml&version=unknown&build=unknown&os=unknown&device=unknown&diagnostics=unknown">오류 신고</a> · 공개 이슈입니다. 실제 복구 문구와 개인정보를 입력하지 마세요.</p>
    <Link className="underline" href="/privacy/bip0039">개인정보처리방침</Link>
  </article></main>;
}
