import type { Metadata } from "next";
import Link from "next/link";
import { appByID } from "@/data/apps";

export const metadata: Metadata = {
  title: "Gnomon 개인정보처리방침",
  description: "Gnomon privacy policy",
};

const gnomon = appByID("gnomon");

export default function GnomonPrivacy() {
  return (
    <div className="legal-page">
      <article className="legal-card">
        <p className="eyebrow">Gnomon · Privacy</p>
        <h1>Gnomon 개인정보처리방침</h1>
        <p className="legal-lede">
          Gnomon은 Mac의 조도센서와 외장 모니터 설정을 연결하는 데 필요한 정보만
          기기 안에서 처리합니다.
        </p>
        <section>
          <h2>수집하지 않는 정보</h2>
          <p>
            계정, 광고 식별자, 분석 SDK, 연락처, 정밀 위치 정보를 수집하거나
            서버로 전송하지 않습니다.
          </p>
        </section>
        <section>
          <h2>기기 안의 처리</h2>
          <p>
            주변 밝기와 사용자가 고른 모니터 설정은 자동 조절 기능을 제공하기 위해
            Mac에서만 사용됩니다. 앱을 삭제하면 로컬 설정도 함께 제거됩니다.
          </p>
        </section>
        <section>
          <h2>문의</h2>
          <p>
            버그 신고는 이메일 대신 <a href={gnomon.reporting.url}>GitHub 신고 양식</a>을 이용해 주세요.
          </p>
        </section>
        <p className="legal-meta">시행일: 2026년 8월 12일</p>
        <Link className="legal-back" href="/">← 앱마을로 돌아가기</Link>
      </article>
    </div>
  );
}
