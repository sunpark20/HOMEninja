import Link from "next/link";
import type { ReactNode } from "react";
import { appByID, type AppRegistryEntry } from "@/data/apps";
import { localePath, localizedAppName, type Locale } from "@/i18n";

type LegalSection = {
  title: string;
  paragraphs?: ReactNode[];
  bullets?: ReactNode[];
};

type LegalAction = {
  href: string;
  label: string;
  external?: boolean;
};

type LegalPageProps = {
  locale: Locale;
  routePath: string;
  title: string;
  subtitle?: string;
  sections: LegalSection[];
  actions?: LegalAction[];
  effectiveDate?: string;
};

type LegalLabels = {
  language: string;
  korean: string;
  english: string;
  home: string;
  privacy: string;
  support: string;
  terms: string;
  report: string;
};

const labels: Record<Locale, LegalLabels> = {
  ko: {
    language: "언어 선택",
    korean: "한글",
    english: "EN",
    home: "← 앱마을로 돌아가기",
    privacy: "개인정보처리방침",
    support: "지원",
    terms: "이용약관",
    report: "GitHub Issue Form",
  },
  en: {
    language: "Language",
    korean: "한글",
    english: "EN",
    home: "← Back to App Village",
    privacy: "Privacy policy",
    support: "Support",
    terms: "Terms",
    report: "GitHub Issue Form",
  },
};

function pick<T>(locale: Locale, korean: T, english: T) {
  return locale === "ko" ? korean : english;
}

function reportLink(app: AppRegistryEntry, text: string) {
  return <a href={app.reporting.url} rel="noreferrer" target="_blank">{text}</a>;
}

export function LocalizedLegalPage({ actions = [], effectiveDate, locale, routePath, sections, subtitle, title }: LegalPageProps) {
  const copy = labels[locale];
  const alternateLocale = locale === "ko" ? "en" : "ko";
  return (
    <main className="legal-page">
      <article className="legal-card" lang={locale}>
        <nav aria-label={copy.language} className="legal-language-switcher">
          <Link aria-current={locale === "ko" ? "page" : undefined} className={locale === "ko" ? "is-current" : ""} href={localePath("ko", routePath)} lang="ko">{copy.korean}</Link>
          <span aria-hidden="true">/</span>
          <Link aria-current={locale === "en" ? "page" : undefined} className={locale === "en" ? "is-current" : ""} href={localePath("en", routePath)} lang="en">{copy.english}</Link>
        </nav>
        <h1>{title}{subtitle && <span className="legal-subtitle">{subtitle}</span>}</h1>
        {sections.map((section, index) => (
          <section key={`${section.title}-${index}`}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph, paragraphIndex) => <p key={`${section.title}-p-${paragraphIndex}`}>{paragraph}</p>)}
            {section.bullets && <ul>{section.bullets.map((bullet, bulletIndex) => <li key={`${section.title}-b-${bulletIndex}`}>{bullet}</li>)}</ul>}
          </section>
        ))}
        {effectiveDate && <p className="legal-meta">{effectiveDate}</p>}
        <div className="legal-actions">
          <Link className="legal-back" href={localePath(locale)}>{copy.home}</Link>
          {actions.map((action) => action.external ? <a className="legal-back" href={action.href} key={action.href} rel="noreferrer" target="_blank">{action.label}</a> : <Link className="legal-back" href={action.href} key={action.href}>{action.label}</Link>)}
        </div>
        <div className="legal-related" aria-label={copy.language}>
          <Link href={localePath(locale, "/privacy")}>{copy.privacy}</Link>
          <span aria-hidden="true">·</span>
          <Link href={localePath(locale, "/support")}>{copy.support}</Link>
          <span aria-hidden="true">·</span>
          <Link href={localePath(locale, "/terms/eatwater")}>{copy.terms}</Link>
          <span className="sr-only">{alternateLocale}</span>
        </div>
      </article>
    </main>
  );
}

function homePrivacy(locale: Locale) {
  return {
    title: pick(locale, "개인정보처리방침", "Privacy Policy"),
    subtitle: pick(locale, "Privacy Policy", "HOMEninja and app privacy details"),
    effectiveDate: pick(locale, "시행일: 2026년 8월 22일", "Effective date: August 22, 2026"),
    sections: locale === "ko" ? [
      { title: "1. 수집하는 개인정보", paragraphs: ["본 서비스는 최소한의 개인정보만을 수집합니다. 수집 항목과 목적은 각 앱의 기능에 따라 아래에 안내합니다."] },
      { title: "2. 이용 목적", paragraphs: ["수집된 정보는 관련 서비스 제공, 보안 및 개선 목적으로만 사용합니다."] },
      { title: "3. 보관과 삭제", paragraphs: ["정보는 명시한 목적에 더 이상 필요하지 않을 때 파기합니다. 법령상 보관이 필요한 경우 해당 기간 동안만 보관합니다."] },
      { title: "4. 문의", paragraphs: [<>개인정보 관련 문의는 <a href="mailto:coastguard2681@gmail.com">coastguard2681@gmail.com</a>으로 연락해 주세요.</>] },
      { title: "5. 앱별 안내", paragraphs: ["SnapCart는 가격표 촬영과 기기 내 OCR, 상품·가격 분석을 사용합니다. 장바구니와 분석 결과는 기기에 저장됩니다.", <>YT Chita의 자세한 내용은 <a href="https://sunpark20.github.io/YT-Chita/?lang=ko#privacy" rel="noreferrer" target="_blank">제품 정책 페이지</a>에서 확인할 수 있습니다.</>] },
    ] : [
      { title: "1. Information we collect", paragraphs: ["This service collects only the minimum information needed for each app. App-specific practices are described below."] },
      { title: "2. How information is used", paragraphs: ["Information is used only to provide, secure, and improve the relevant service."] },
      { title: "3. Retention and deletion", paragraphs: ["Information is deleted when it is no longer reasonably necessary for the stated purpose. Legally required retention lasts only for the required period."] },
      { title: "4. Contact", paragraphs: [<>For privacy inquiries, contact <a href="mailto:coastguard2681@gmail.com">coastguard2681@gmail.com</a>.</>] },
      { title: "5. App-specific details", paragraphs: ["SnapCart uses camera capture and on-device OCR for retail price tags. Cart items and analysis results stay on the device.", <>For YT Chita, see the <a href="https://sunpark20.github.io/YT-Chita/?lang=en#privacy" rel="noreferrer" target="_blank">product policy page</a>.</>] },
    ],
  };
}

function appPrivacy(locale: Locale, id: string) {
  const app = appByID(id === "tidekeep" ? "ytdi" : id);
  const copy = {
    callninja: {
      title: pick(locale, "콜닌자 개인정보처리방침", "CallNinja Privacy Policy"),
      sections: locale === "ko" ? [
        { title: "수집하지 않는 정보", paragraphs: ["콜닌자는 연락처, 통화 내용, 전화번호를 수집하거나 서버로 전송하지 않습니다."] },
        { title: "기기 내 처리", paragraphs: ["차단 규칙과 앱 설정은 사용자의 기기에 저장되며 통화 차단 기능은 iOS의 권한 범위에서 동작합니다."] },
        { title: "문제 신고", paragraphs: [<>신고는 사용자가 직접 여는 <a href={app.reporting.url} rel="noreferrer" target="_blank">{labels.ko.report}</a>을 통해서만 전송됩니다.</>] },
        { title: "문의", paragraphs: [<>개인정보 관련 문의는 <a href="mailto:coastguard2681@gmail.com">coastguard2681@gmail.com</a>으로 연락해 주세요.</>] },
      ] : [
        { title: "Information not collected", paragraphs: ["CallNinja does not collect or upload contacts, call contents, or phone numbers."] },
        { title: "On-device processing", paragraphs: ["Blocking rules and app settings stay on the device. Call blocking operates within the permissions provided by iOS."] },
        { title: "Problem reports", paragraphs: [<>A report is submitted only when the user opens the <a href={app.reporting.url} rel="noreferrer" target="_blank">{labels.en.report}</a>.</>] },
        { title: "Contact", paragraphs: [<>For privacy inquiries, contact <a href="mailto:coastguard2681@gmail.com">coastguard2681@gmail.com</a>.</>] },
      ],
    },
    centuryiris: {
      title: pick(locale, "Century Iris 개인정보처리방침", "Century Iris Privacy Policy"),
      sections: locale === "ko" ? [
        { title: "1. 수집하는 정보", paragraphs: ["Century Iris는 계정, 광고, 분석 도구를 사용하지 않으며 개인정보를 수집하지 않습니다."] },
        { title: "2. 센서와 기기 내 처리", paragraphs: ["MacBook 조도센서와 연결된 디스플레이 정보는 밝기와 색온도 조절을 위해 기기 안에서만 처리됩니다."] },
        { title: "3. 문의", paragraphs: [<>개인정보 관련 문의는 <a href="mailto:coastguard2681@gmail.com">coastguard2681@gmail.com</a>으로 연락해 주세요.</>] },
      ] : [
        { title: "1. Information collected", paragraphs: ["Century Iris uses no account, advertising, or analytics tools and does not collect personal information."] },
        { title: "2. Sensor and on-device processing", paragraphs: ["The MacBook ambient light sensor and connected display information are processed on the device to adjust brightness and color temperature."] },
        { title: "3. Contact", paragraphs: [<>For privacy inquiries, contact <a href="mailto:coastguard2681@gmail.com">coastguard2681@gmail.com</a>.</>] },
      ],
    },
    earth: {
      title: pick(locale, "Earth 개인정보처리방침", "Earth Privacy Policy"),
      sections: locale === "ko" ? [
        { title: "1. 수집하지 않는 정보", paragraphs: ["Earth는 계정, 광고, 분석 SDK를 사용하지 않으며 개인정보를 수집하지 않습니다."] },
        { title: "2. 위치와 시간", paragraphs: ["세계 시간과 하늘 표현에 필요한 시간대 정보는 기기 설정과 사용자가 고른 장소를 바탕으로 처리됩니다. 정확한 위치를 서버로 보내지 않습니다."] },
        { title: "3. 문의", paragraphs: [<>개인정보 관련 문의는 <a href="mailto:sun.park20@gmail.com">sun.park20@gmail.com</a>으로 연락해 주세요.</>] },
      ] : [
        { title: "1. Information not collected", paragraphs: ["Earth uses no account, advertising, or analytics SDK and does not collect personal information."] },
        { title: "2. Location and time", paragraphs: ["Time zones and user-selected places are used on the device to show world time and sky information. Precise location is not sent to a server."] },
        { title: "3. Contact", paragraphs: [<>For privacy inquiries, contact <a href="mailto:sun.park20@gmail.com">sun.park20@gmail.com</a>.</>] },
      ],
    },
    eatwater: {
      title: pick(locale, "물을 마시는 새 개인정보처리방침", "EatWater Privacy Policy"),
      sections: locale === "ko" ? [
        { title: "1. 개인정보 수집", paragraphs: ["물을 마시는 새는 개인정보를 수집하지 않습니다. 계정, 광고, 분석 SDK 또는 개발자 서버를 사용하지 않습니다."] },
        { title: "2. 기기 내 데이터", paragraphs: ["물 기록, 목표, 생활 시간과 알림 설정은 앱과 위젯이 함께 사용하는 iPhone의 로컬 App Group 컨테이너에만 저장됩니다."] },
        { title: "3. 알림과 Apple 건강", paragraphs: ["알림은 기기에서 예약됩니다. Apple 건강 연동은 선택 사항이며 허용한 경우 새 물 기록을 건강 앱에 쓸 수 있지만 건강 데이터를 읽거나 개발자가 접근하지는 않습니다."] },
        { title: "4. 보관과 삭제", paragraphs: ["기록은 앱에서 삭제할 수 있습니다. 앱을 삭제하면 로컬 데이터가 제거되지만 이미 Apple 건강에 저장된 기록은 건강 앱에서 별도로 삭제해야 할 수 있습니다."] },
        { title: "5. 문의", paragraphs: [<>개인정보 관련 문의는 <a href="mailto:sun.park20@gmail.com">sun.park20@gmail.com</a>으로 연락해 주세요.</>] },
      ] : [
        { title: "1. Data collection", paragraphs: ["EatWater does not collect personal information. It uses no account, advertising, analytics SDK, or developer-operated server."] },
        { title: "2. On-device data", paragraphs: ["Water records, goals, schedule settings, and notification preferences stay in the local iPhone App Group container shared by the app and widget."] },
        { title: "3. Notifications and Apple Health", paragraphs: ["Notifications are scheduled on the device. Apple Health integration is optional; with permission, new water entries may be written to Health. The app does not read Health data and the developer cannot access it."] },
        { title: "4. Retention and deletion", paragraphs: ["Records can be deleted in the app. Uninstalling removes local data; records already saved in Apple Health may need to be removed there separately."] },
        { title: "5. Contact", paragraphs: [<>For privacy inquiries, contact <a href="mailto:sun.park20@gmail.com">sun.park20@gmail.com</a>.</>] },
      ],
    },
    gnomon: {
      title: pick(locale, "Gnomon 개인정보처리방침", "Gnomon Privacy Policy"),
      sections: locale === "ko" ? [
        { title: "수집하지 않는 정보", paragraphs: ["Gnomon은 계정, 광고, 추적 기술 또는 개발자 서버를 사용하지 않습니다."] },
        { title: "기기 안의 처리", paragraphs: ["MacBook 조도센서와 외장 모니터 정보는 밝기 조절을 위해 기기 안에서만 처리됩니다."] },
        { title: "문의", paragraphs: [<>버그 신고는 이메일 대신 {reportLink(app, labels.ko.report)}을 이용해 주세요.</>] },
      ] : [
        { title: "Information not collected", paragraphs: ["Gnomon uses no account, advertising, tracking technology, or developer-operated server."] },
        { title: "On-device processing", paragraphs: ["MacBook ambient light sensor and external display information are processed on-device to adjust brightness."] },
        { title: "Contact", paragraphs: [<>Please use the {reportLink(app, labels.en.report)} instead of email for bug reports.</>] },
      ],
    },
    "quick-quit": {
      title: pick(locale, "Quick Quit 개인정보처리방침", "Quick Quit Privacy Policy"),
      sections: locale === "ko" ? [
        { title: "1. 수집하지 않는 정보", paragraphs: ["Quick Quit은 계정, 광고, 분석 SDK, 추적 기술 또는 개발자 서버를 사용하지 않습니다."] },
        { title: "2. 로컬 설정", paragraphs: ["단축키와 메뉴 막대 표시 설정은 Mac의 표준 UserDefaults와 앱 지원 폴더에 로컬로만 저장됩니다. iCloud 동기화나 내보내기는 없습니다."] },
        { title: "3. 문제 신고", paragraphs: [<>문제 신고는 사용자가 직접 여는 {reportLink(app, labels.ko.report)}을 통해서만 전송됩니다.</>] },
      ] : [
        { title: "1. Information not collected", paragraphs: ["Quick Quit uses no account, advertising, analytics SDK, tracking technology, or developer-operated server."] },
        { title: "2. Local settings", paragraphs: ["Shortcut and menu bar visibility settings are stored only in macOS UserDefaults and the app support folder. There is no iCloud sync or export."] },
        { title: "3. Problem reports", paragraphs: [<>A report is submitted only through the {reportLink(app, labels.en.report)} opened by the user.</>] },
      ],
    },
    spamcall070: {
      title: pick(locale, "070 스팸 전화 차단 개인정보처리방침", "SpamCall070 Privacy Policy"),
      sections: locale === "ko" ? [
        { title: "1. 수집 정보", paragraphs: ["SpamCall070은 연락처나 통화 내용을 수집하지 않습니다. 사용자가 신고를 선택한 경우에만 기기 모델, iOS 버전, 앱 버전과 제한된 오류 정보가 전송될 수 있습니다."] },
        { title: "2. 이용 목적", paragraphs: ["선택적으로 전송된 오류 정보는 문제 해결과 앱 개선에만 사용합니다."] },
        { title: "3. 문의", paragraphs: [<>개인정보 관련 문의는 <a href="mailto:coastguard2681@gmail.com">coastguard2681@gmail.com</a>으로 연락해 주세요.</>] },
      ] : [
        { title: "1. Information collected", paragraphs: ["SpamCall070 does not collect contacts or call contents. If the user chooses to report a problem, the report may include device model, iOS version, app version, and limited error information."] },
        { title: "2. Use", paragraphs: ["Optional error information is used only to troubleshoot and improve the app."] },
        { title: "3. Contact", paragraphs: [<>For privacy inquiries, contact <a href="mailto:coastguard2681@gmail.com">coastguard2681@gmail.com</a>.</>] },
      ],
    },
    tidekeep: {
      title: pick(locale, "TideKeep 개인정보처리방침", "TideKeep Privacy Policy"),
      sections: locale === "ko" ? [
        { title: "1. 개발자가 수집하는 정보", paragraphs: ["TideKeep 개발자는 개인정보를 수집하거나 보관하지 않습니다. 앱은 계정, 광고, 분석 SDK, 추적 기술 또는 개발자 운영 서버를 사용하지 않습니다."] },
        { title: "2. 사용자가 선택한 파일", paragraphs: ["앱은 사용자가 iOS 파일 선택기에서 직접 고른 오디오·비디오 파일만 읽고, 파일과 재생 정보는 같은 기기의 앱 컨테이너에 저장합니다."] },
        { title: "3. 공유, 삭제와 백업", paragraphs: ["공유는 사용자가 직접 공유 버튼을 누를 때만 시작됩니다. 앱에서 파일을 삭제할 수 있으며 iOS 백업 설정에 따라 로컬 데이터가 백업에 포함될 수 있습니다."] },
        { title: "4. 문제 신고", paragraphs: [<>신고는 {reportLink(app, labels.ko.report)}을 사용자가 직접 연 경우에만 전송됩니다. 민감정보나 원본 로그를 올리지 마세요.</>] },
      ] : [
        { title: "1. Developer collection", paragraphs: ["The TideKeep developer does not collect or retain personal information. The app uses no account, advertising, analytics SDK, tracking technology, or developer-operated server."] },
        { title: "2. User-selected files", paragraphs: ["The app reads only audio and video files explicitly selected with the iOS Files picker. Files and playback metadata stay in the on-device app container."] },
        { title: "3. Sharing, deletion, and backup", paragraphs: ["Sharing starts only when the user taps Share. Files can be deleted in the app, and local data may be included in device backups depending on iOS settings."] },
        { title: "4. Problem reports", paragraphs: [<>Information is submitted only through the {reportLink(app, labels.en.report)} opened by the user. Do not post sensitive information or raw logs.</>] },
      ],
    },
    ytdi: {
      title: pick(locale, "ytdi 개인정보처리방침", "ytdi Privacy Policy"),
      sections: locale === "ko" ? [
        { title: "1. 개발자가 수집하는 정보", paragraphs: ["ytdi 개발자는 개인정보를 수집하거나 보관하지 않습니다. 계정, 광고, 분석 SDK, 추적 기술 또는 개발자 서버를 사용하지 않습니다."] },
        { title: "2. 기기에 저장되는 정보", paragraphs: ["영상 링크, 제목, 다운로드 상태, 완성 파일, 목록, 재생 위치와 설정은 iPhone 앱 컨테이너에 저장됩니다."] },
        { title: "3. 기능 수행을 위한 네트워크", paragraphs: ["다운로드를 요청하면 링크와 영상 ID를 바탕으로 YouTube·Google 콘텐츠 서버에 연결합니다. 표준 네트워크 정보는 해당 서비스에 전달될 수 있습니다."] },
        { title: "4. 문제 신고", paragraphs: [<>문제 신고는 {reportLink(app, labels.ko.report)}을 사용자가 직접 열었을 때만 가능합니다. 공개 이슈에 민감정보와 원본 로그를 올리지 마세요.</>] },
      ] : [
        { title: "1. Developer collection", paragraphs: ["The ytdi developer does not collect or retain personal information. The app uses no account, advertising, analytics SDK, tracking technology, or developer-operated server."] },
        { title: "2. On-device information", paragraphs: ["Media links, titles, download state, completed files, lists, playback positions, and settings remain in the iPhone app container."] },
        { title: "3. Functional network requests", paragraphs: ["When a download is requested, ytdi connects to YouTube and Google content servers based on the entered link or video ID. Those services may receive standard network information."] },
        { title: "4. Problem reports", paragraphs: [<>A report is possible only through the {reportLink(app, labels.en.report)} opened by the user. Do not post sensitive information or raw logs in a public issue.</>] },
      ],
    },
  } as const;
  return {
    ...copy[id as keyof typeof copy],
    subtitle: pick(locale, "개인정보처리방침", "Privacy policy"),
    effectiveDate: pick(locale, "시행일: 2026년 8월 24일", "Effective date: August 24, 2026"),
  };
}

function appSupport(locale: Locale, id: string) {
  const app = appByID(id === "tidekeep" ? "ytdi" : id);
  const report = (text: string) => reportLink(app, text);
  const pages: Record<string, { title: string; sections: LegalSection[] }> = {
    earth: {
      title: pick(locale, "Earth 지원", "Earth Support"),
      sections: locale === "ko" ? [
        { title: "지원 환경", paragraphs: ["Earth는 iOS 17 이상을 사용하는 iPhone을 지원합니다."] },
        { title: "문제 신고", paragraphs: [<>버전, 기기와 재현 순서를 적어 {report(labels.ko.report)}으로 알려 주세요.</>] },
      ] : [
        { title: "Supported environment", paragraphs: ["Earth supports iPhone devices running iOS 17 or later."] },
        { title: "Report a problem", paragraphs: [<>Include your version, device, and reproduction steps in the {report(labels.en.report)}.</>] },
      ],
    },
    eatwater: {
      title: pick(locale, "물을 마시는 새 지원", "EatWater Support"),
      sections: locale === "ko" ? [
        { title: "지원 환경", paragraphs: ["물을 마시는 새는 iOS 26 이상을 사용하는 iPhone을 지원합니다."] },
        { title: "개발자 및 문의", paragraphs: [<>문제나 제안은 <a href="mailto:sun.park20@gmail.com">sun.park20@gmail.com</a>으로 보내 주세요. iPhone 모델, iOS 버전, 문제가 발생한 기능과 재현 순서를 함께 알려 주세요.</>] },
      ] : [
        { title: "Supported environment", paragraphs: ["EatWater supports iPhone devices running iOS 26 or later."] },
        { title: "Developer and contact", paragraphs: [<>For questions or suggestions, contact <a href="mailto:sun.park20@gmail.com">sun.park20@gmail.com</a>. Include your iPhone model, iOS version, affected feature, and reproduction steps.</>] },
      ],
    },
    gnomon: {
      title: pick(locale, "Gnomon 지원", "Gnomon Support"),
      sections: locale === "ko" ? [
        { title: "문제가 생겼나요?", paragraphs: [<>버전과 재현 순서를 적어 {report(labels.ko.report)}으로 알려 주세요.</>] },
        { title: "개인정보", paragraphs: [<>Gnomon은 기기 안에서 동작합니다. 자세한 내용은 <Link href={localePath(locale, "/privacy/gnomon")}>개인정보처리방침</Link>을 확인해 주세요.</>] },
      ] : [
        { title: "Need help?", paragraphs: [<>Include your version and reproduction steps in the {report(labels.en.report)}.</>] },
        { title: "Privacy", paragraphs: [<>Gnomon works on-device. See the <Link href={localePath(locale, "/privacy/gnomon")}>Privacy Policy</Link> for details.</>] },
      ],
    },
    "quick-quit": {
      title: pick(locale, "Quick Quit 지원", "Quick Quit Support"),
      sections: locale === "ko" ? [
        { title: "기본 사용법", paragraphs: [<><code>⌃⇧Q</code>를 누르거나 메뉴 막대 아이콘을 클릭하면 종료 패널이 열립니다. 화살표로 앱을 고르고 <code>⏎</code> 또는 <code>Space</code>로 종료합니다.</>] },
        { title: "문제 신고", paragraphs: [<>문제가 계속되면 {report(labels.ko.report)}으로 버전과 재현 순서를 보내 주세요.</>] },
      ] : [
        { title: "Basic use", paragraphs: [<>Press <code>⌃⇧Q</code>, or click the menu bar icon, to open the quit panel. Choose an app with the arrow keys and press <code>⏎</code> or <code>Space</code> to quit it.</>] },
        { title: "Problem reports", paragraphs: [<>If the problem persists, send the version and reproduction steps through the {report(labels.en.report)}.</>] },
      ],
    },
    tidekeep: {
      title: pick(locale, "TideKeep 지원", "TideKeep Support"),
      sections: locale === "ko" ? [
        { title: "시작하기", paragraphs: ["보관함 오른쪽 위의 +를 눌러 파일 앱에서 재생 가능한 오디오나 비디오를 고르세요. 같은 파일은 중복 보관하지 않습니다."] },
        { title: "재생과 파일 위치", paragraphs: ["비디오는 전체 화면과 Picture in Picture를 지원하고, 오디오는 화면이 잠긴 뒤에도 계속 재생할 수 있습니다. 실제 미디어는 파일 앱의 나의 iPhone > TideKeep > Media에 있습니다."] },
        { title: "문제 신고", paragraphs: [<>버전, 증상과 재현 순서를 적어 {report(labels.ko.report)}으로 알려 주세요. 공개 이슈에 파일이나 개인정보를 올리지 마세요.</>] },
      ] : [
        { title: "Getting started", paragraphs: ["Tap + in Library and choose playable audio or video with the system Files picker. Byte-identical files are not stored twice."] },
        { title: "Playback and files", paragraphs: ["Video supports full screen and Picture in Picture; audio can continue after the screen locks. Media appears in On My iPhone > TideKeep > Media in Files."] },
        { title: "Problem reports", paragraphs: [<>Include the version, symptoms, and reproduction steps in the {report(labels.en.report)}. Do not post files or personal information in a public issue.</>] },
      ],
    },
    ytdi: {
      title: pick(locale, "ytdi 지원", "ytdi Support"),
      sections: locale === "ko" ? [
        { title: "시작하기", paragraphs: ["본인이 저장할 권리나 허가를 가진 영상 링크를 붙여넣고 화질을 선택하세요. 다운로드가 끝나면 보관함에 나타납니다."] },
        { title: "회선이 끊겼어요", paragraphs: ["연결이 돌아오면 같은 받은 위치에서 자동으로 이어받습니다. 앱 전환기에서 강제 종료한 경우에는 앱을 다시 열어야 합니다."] },
        { title: "권리와 문제 신고", paragraphs: ["직접 만든 콘텐츠나 다운로드가 허용된 콘텐츠에만 사용하세요.", <>버전과 재현 순서를 적어 {report(labels.ko.report)}으로 알려 주세요.</>] },
      ] : [
        { title: "Getting started", paragraphs: ["Paste a media link you own or are authorized to save, choose a format, and wait for it to appear in your library."] },
        { title: "When a connection drops", paragraphs: ["The queue resumes from the received offset when the connection returns. If you force-quit the app, reopen it to continue."] },
        { title: "Rights and reports", paragraphs: ["Use ytdi only for content you made or are authorized to download.", <>Include the version and reproduction steps in the {report(labels.en.report)}.</>] },
      ],
    },
  };
  return pages[id];
}

function eatwaterTerms(locale: Locale) {
  return {
    title: pick(locale, "물을 마시는 새 이용약관", "EatWater Terms of Service"),
    subtitle: pick(locale, "The Bird That Drinks Water", "The Bird That Drinks Water"),
    effectiveDate: pick(locale, "시행일: 2026년 9월 20일", "Effective date: September 20, 2026"),
    sections: locale === "ko" ? [
      { title: "1. 서비스", paragraphs: ["물을 마시는 새는 사용자가 설정한 목표와 생활 시간에 맞춰 물 섭취를 기록하고 기기 내 알림을 예약하는 iPhone 앱입니다. 현재 구독, 인앱 구매와 광고는 없습니다."] },
      { title: "2. 건강 관련 안내", paragraphs: ["이 앱은 의료기기나 의료 서비스가 아니며 진단, 치료 또는 개인별 의학적 조언을 제공하지 않습니다. 건강 상태에 관한 의문은 의료 전문가와 상담해 주세요."] },
      { title: "3. 데이터와 Apple 건강", paragraphs: ["데이터 처리 방식은 개인정보처리방침에 설명되어 있습니다. Apple 건강 연동은 선택 사항이며 허용한 경우 새 수분 섭취량을 쓸 수 있습니다."] },
      { title: "4. 이용자의 책임", paragraphs: ["사용자는 기기, 알림 권한, 목표와 기록을 관리할 책임이 있습니다. 알림은 iOS 권한이나 집중 모드에 따라 지연될 수 있습니다."] },
      { title: "5. 제공과 변경", paragraphs: ["개발자는 안정성과 품질을 위해 앱을 수정하거나 업데이트할 수 있습니다. 앱은 법이 허용하는 범위에서 현재 상태로 제공됩니다."] },
      { title: "6. 개발자 및 문의", paragraphs: [<>개발자: sunguk park. 문의: <a href="mailto:sun.park20@gmail.com">sun.park20@gmail.com</a>.</>] },
    ] : [
      { title: "1. Service", paragraphs: ["EatWater is an iPhone app for logging water intake and scheduling on-device reminders around goals and waking hours set by the user. It currently has no subscriptions, in-app purchases, or advertising."] },
      { title: "2. Health disclaimer", paragraphs: ["The app is not a medical device or medical service and does not provide diagnosis, treatment, or personalized medical advice. Consult a qualified healthcare professional about your health."] },
      { title: "3. Data and Apple Health", paragraphs: ["Data practices are described in the Privacy Policy. Apple Health integration is optional; with permission, the app may write new water entries to Health."] },
      { title: "4. Your responsibilities", paragraphs: ["You are responsible for your device, notification permissions, goals, and records. Notifications may be delayed by iOS permissions or Focus modes."] },
      { title: "5. Availability and changes", paragraphs: ["The developer may update the app for stability and quality. To the extent permitted by law, the app is provided as available."] },
      { title: "6. Developer and contact", paragraphs: [<>Developer: sunguk park. Contact: <a href="mailto:sun.park20@gmail.com">sun.park20@gmail.com</a>.</>] },
    ],
  };
}

function genericSupport(locale: Locale) {
  return {
    title: pick(locale, "앱마을 지원", "App Village Support"),
    subtitle: pick(locale, "공개 앱 지원 링크 모음", "Public support links for the village apps"),
    sections: [{
      title: pick(locale, "앱별 지원", "App support"),
      paragraphs: [pick(locale, "앱 상세에서 각 앱의 지원 페이지와 GitHub 신고 양식을 확인할 수 있습니다.", "Open an app from the village to find its support page and GitHub issue form.")],
    }],
    actions: appsWithSupport(locale),
  };
}

function appsWithSupport(locale: Locale): LegalAction[] {
  return ["earth", "eatwater", "gnomon", "quick-quit", "ytdi"].flatMap((id) => {
    const app = appByID(id);
    return app.web.support ? [{ href: localePath(locale, new URL(app.web.support).pathname), label: `${localizedAppName(app, locale)} ${labels[locale].support}` }] : [];
  });
}

export const localizedRoutePaths = [
  "/",
  "/privacy",
  "/privacy/callninja",
  "/privacy/centuryiris",
  "/privacy/earth",
  "/privacy/eatwater",
  "/privacy/gnomon",
  "/privacy/quickquit",
  "/privacy/spamcall070",
  "/privacy/tidekeep",
  "/privacy/ytdi",
  "/support",
  "/support/earth",
  "/support/eatwater",
  "/support/gnomon",
  "/support/quickquit",
  "/support/tidekeep",
  "/support/ytdi",
  "/terms/eatwater",
] as const;

export function legalMetadata(locale: Locale, routePath: string) {
  if (routePath === "/") return { title: pick(locale, "모여봐 앱마을 · 닌자거북의홈", "App Village · HOMEninja"), description: pick(locale, "작은 앱들이 자라는 마을에서 필요한 앱을 골라보세요.", "Find a useful little app in a village where small apps grow.") };
  if (routePath === "/privacy") {
    const page = homePrivacy(locale);
    return { title: page.title, description: pick(locale, "앱마을의 개인정보처리방침", "App Village privacy policy") };
  }
  if (routePath.startsWith("/privacy/")) {
    const id = routePath.split("/").at(-1) === "quickquit" ? "quick-quit" : routePath.split("/").at(-1) ?? "";
    const page = appPrivacy(locale, id);
    return { title: page.title, description: pick(locale, `${page.title} 및 문의`, `${page.title} and contact details`) };
  }
  if (routePath === "/support") {
    const page = genericSupport(locale);
    return { title: page.title, description: page.subtitle };
  }
  if (routePath.startsWith("/support/")) {
    const id = routePath.split("/").at(-1) === "quickquit" ? "quick-quit" : routePath.split("/").at(-1) ?? "";
    const page = appSupport(locale, id);
    return { title: page.title, description: page.title };
  }
  const page = eatwaterTerms(locale);
  return { title: page.title, description: page.subtitle };
}

export function renderLocalizedLegalPage(locale: Locale, routePath: string) {
  if (routePath === "/") return null;
  if (routePath === "/privacy") {
    const page = homePrivacy(locale);
    return <LocalizedLegalPage locale={locale} routePath={routePath} {...page} />;
  }
  if (routePath.startsWith("/privacy/")) {
    const id = routePath.split("/").at(-1) === "quickquit" ? "quick-quit" : routePath.split("/").at(-1) ?? "";
    const page = appPrivacy(locale, id);
    if (!page) return null;
    return <LocalizedLegalPage locale={locale} routePath={routePath} {...page} />;
  }
  if (routePath === "/support") {
    const page = genericSupport(locale);
    return <LocalizedLegalPage locale={locale} routePath={routePath} {...page} />;
  }
  if (routePath.startsWith("/support/")) {
    const id = routePath.split("/").at(-1) === "quickquit" ? "quick-quit" : routePath.split("/").at(-1) ?? "";
    const page = appSupport(locale, id);
    if (!page) return null;
    return <LocalizedLegalPage locale={locale} routePath={routePath} {...page} />;
  }
  if (routePath === "/terms/eatwater") {
    return <LocalizedLegalPage locale={locale} routePath={routePath} {...eatwaterTerms(locale)} />;
  }
  return null;
}
