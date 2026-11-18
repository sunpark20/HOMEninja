import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "AirMouse 지원", description: "AirMouse 앱 지원 및 문의" };
export default function Support() {
  return <main className="min-h-screen px-6 py-24"><article className="max-w-2xl mx-auto space-y-6 text-sm leading-relaxed" style={{color:"var(--c-body)"}}>
    <h1 className="text-3xl font-semibold" style={{color:"var(--c-title)"}}>AirMouse 지원<span className="block text-xl font-normal mt-1" style={{color:"var(--c-dim)"}}>AirMouse Support</span></h1>
    <h2 className="text-lg font-medium" style={{color:"var(--c-heading)"}}>시작하기</h2>
    <p>앱을 열고 &quot;켜기&quot;를 누른 뒤 카메라와 손쉬운 사용 권한을 허용하세요. 손바닥을 펴서 카메라를 향하고 움직이면 커서가 따라 움직입니다. 엄지를 접으면 클릭, 새끼손가락을 구부리면 우클릭입니다.</p>
    <h2 className="text-lg font-medium" style={{color:"var(--c-heading)"}}>자주 묻는 질문</h2>
    <p><strong>커서가 움직이지 않아요.</strong> 시스템 설정 &gt; 개인정보 보호 및 보안 &gt; 손쉬운 사용에서 AirMouse가 켜져 있는지 확인하고 앱을 다시 실행해 주세요.</p>
    <p><strong>클릭이 너무 잘 되거나 안 돼요.</strong> 설정 창에서 엄지 접힘·펴짐 기준과 접는 빠르기, 새끼 굽힘 기준을 조절할 수 있습니다. 지금 값이 함께 표시됩니다.</p>
    <p><strong>손을 잘 못 찾아요.</strong> 밝은 곳에서 손 전체가 카메라에 보이게 해 주세요.</p>
    <p><a className="underline" href="https://github.com/sunpark20/errorreport/issues/new">오류 신고</a> · 공개 이슈이므로 개인정보를 포함하지 마세요.</p>
    <p>AirMouse는 Yuki TAKEYAMA 님의 오픈소스 NonMouse(Apache License 2.0)를 바탕으로 만들었습니다.</p>
    <Link className="underline" href="/privacy/airmouse">개인정보처리방침 / Privacy Policy</Link>
  </article></main>;
}
