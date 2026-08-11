import type { Metadata } from "next";
import Link from "next/link";
import { appByID } from "@/data/apps";

export const metadata: Metadata = {
  title: "Gnomon 지원",
  description: "Gnomon support",
};

const reportUrl = appByID("gnomon").reporting.url;

export default function GnomonSupport() {
  return (
    <div className="legal-page">
      <article className="legal-card">
        <p className="eyebrow">Gnomon · Support</p>
        <h1>Gnomon 지원</h1>
        <p className="legal-lede">
          Gnomon은 macOS 15 이상, Apple Silicon Mac에서 외장 모니터 밝기를 자동으로
          맞춰줍니다.
        </p>
        <section>
          <h2>문제가 생겼나요?</h2>
          <p>
            조도센서 권한, 모니터 연결 상태, macOS 버전과 재현 순서를 확인한 뒤
            GitHub 신고 양식으로 보내 주세요. 계정으로 로그인하면 공개 이슈가
            만들어집니다.
          </p>
          <a className="button button-primary legal-action" href={reportUrl} rel="noreferrer" target="_blank">
            GitHub에서 신고하기
          </a>
        </section>
        <section>
          <h2>개인정보</h2>
          <p>
            Gnomon은 계정이나 분석 서버를 사용하지 않습니다. 자세한 내용은
            개인정보처리방침에서 확인할 수 있습니다.
          </p>
        </section>
        <Link className="legal-back" href="/privacy/gnomon">개인정보처리방침</Link>
        <span aria-hidden="true" className="legal-separator">·</span>
        <Link className="legal-back" href="/">앱마을로 돌아가기</Link>
      </article>
    </div>
  );
}
