import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "AirMouse 개인정보처리방침", description: "AirMouse 앱 개인정보처리방침" };
export default function Privacy() {
  return <main className="min-h-screen px-6 py-24"><article className="max-w-2xl mx-auto space-y-6 text-sm leading-relaxed" style={{color:"var(--c-body)"}}>
    <h1 className="text-3xl font-semibold" style={{color:"var(--c-title)"}}>AirMouse 개인정보처리방침<span className="block text-xl font-normal mt-1" style={{color:"var(--c-dim)"}}>AirMouse Privacy Policy</span></h1>
    <p>AirMouse는 개인정보를 수집하지 않습니다. 계정, 광고 식별자, 분석 도구, 원격 서버를 사용하지 않으며 네트워크 요청을 보내지 않습니다.</p>
    <h2 className="text-lg font-medium" style={{color:"var(--c-heading)"}}>카메라</h2><p>카메라 영상은 손 관절 위치를 찾기 위해 Mac 안에서 Apple Vision으로만 처리합니다. 영상과 관절 위치는 저장하거나 기기 밖으로 보내지 않으며, 앱을 끄면 사라집니다.</p>
    <h2 className="text-lg font-medium" style={{color:"var(--c-heading)"}}>손쉬운 사용 권한</h2><p>사용자의 손 동작에 따라 커서를 움직이고 클릭·우클릭하기 위해 이벤트 보내기(PostEvent) 권한만 사용합니다. 키보드 입력이나 다른 앱의 내용은 읽거나 기록하지 않습니다.</p>
    <h2 className="text-lg font-medium" style={{color:"var(--c-heading)"}}>기기 내 설정</h2><p>감도, 클릭 소리 같은 설정은 Mac의 앱 샌드박스 안 UserDefaults에만 저장되며, 앱을 삭제하면 함께 제거됩니다.</p>
    <p>오류 신고는 공개 GitHub 이슈로 연결됩니다. 개인정보를 포함하지 않도록 확인해 주세요. 개인정보 문의: <a className="underline" href="mailto:coastguard2681@gmail.com">coastguard2681@gmail.com</a></p>
    <p>시행일: 2026년 11월 18일</p>
    <div style={{borderTop:"1px solid var(--c-divider)"}} />
    <h2 className="text-lg font-medium" style={{color:"var(--c-heading)"}}>English</h2>
    <p>AirMouse does not collect personal information. It uses no accounts, advertising identifiers, analytics, or remote servers, and makes no network requests.</p>
    <p>Camera frames are processed only on your Mac with Apple Vision to locate hand joints. Frames and joint positions are never stored or sent off the device. The Accessibility (PostEvent) permission is used only to move the cursor and click as your hand directs; no keyboard input or other app content is read or recorded. Settings are stored locally in the app&apos;s sandbox and removed when the app is deleted.</p>
    <p>Effective date: November 18, 2026</p>
    <Link href="/support/airmouse" className="underline">지원 페이지 / Support</Link>
  </article></main>;
}
