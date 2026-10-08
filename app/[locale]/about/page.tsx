import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apps } from "@/data/apps";
import { isLocale, localePath, localizedAppName, localizedAppTagline, type Locale } from "@/i18n";

const copy = {
  ko: {
    title: "앱캔버스 | 일상의 문제를 해결하는 작은 앱",
    description: "일상의 불편을 작고 사용하기 쉬운 앱으로 해결하는 앱캔버스의 소개와 제품을 확인하세요.",
    language: "언어 선택", home: "앱마을", eyebrow: "독립 앱 스튜디오 · 제주, 대한민국",
    headline: "일상의 불편을\n쓸모 있는 앱으로.",
    intro: "앱캔버스는 사람들이 매일 마주치는 불편을 발견하고, 오래 곁에 둘 수 있는 작고 실용적인 앱으로 해결합니다.",
    productsEyebrow: "출시한 앱", productsTitle: "실제 문제에서 출발한 앱",
    productsIntro: "macOS와 iPhone에서 반복되는 일을 줄이고, 필요한 순간에 바로 쓸 수 있는 도구를 만듭니다.",
    released: "출시됨", developmentEyebrow: "일하는 방식",
    developmentTitle: "작게 만들고, 실제로 써보며 개선합니다",
    developmentBody: "큰 계획보다 실제 사용에서 확인되는 문제를 먼저 해결합니다. 작은 단위로 만들고 출시한 뒤, 사용 경험을 바탕으로 꾸준히 다듬습니다.",
    aiTitle: "AI로 어려운 문제에 도전합니다",
    aiBody: "Claude Code를 앱 설계와 개발 과정에 활용합니다. 불가능해 보이는 문제도 AI를 활용해 실제로 작동하는 해결책으로 만들겠다는 것이 앱캔버스의 비전입니다.",
    companyEyebrow: "사업자 정보", companyTitle: "앱캔버스", businessName: "상호",
    representative: "대표자", registration: "사업자등록번호", address: "사업장 주소",
    email: "이메일", back: "앱마을에서 전체 앱 보기",
  },
  en: {
    title: "Appcanvas | Small apps for everyday problems",
    description: "Meet Appcanvas and explore practical apps that make everyday tasks easier.",
    language: "Language", home: "App Village", eyebrow: "Independent app studio · Jeju, South Korea",
    headline: "Everyday problems,\nmade easier with apps.",
    intro: "Appcanvas finds everyday friction and turns it into small, practical apps people can keep using.",
    productsEyebrow: "Released apps", productsTitle: "Apps grounded in real needs",
    productsIntro: "We build tools for macOS and iPhone that reduce repetitive work and help when they are needed.",
    released: "Available", developmentEyebrow: "How we work",
    developmentTitle: "Build small, use it, improve it",
    developmentBody: "We start with a problem people can verify in daily use. We build and release in small steps, then keep improving from real experience.",
    aiTitle: "Taking on hard problems with AI",
    aiBody: "Claude Code is part of our app design and development workflow. Our vision is to use AI to turn even seemingly impossible problems into solutions that work in practice.",
    companyEyebrow: "Business information", companyTitle: "Appcanvas", businessName: "Business name",
    representative: "Representative", registration: "Business registration no.", address: "Business address",
    email: "Email", back: "Explore all apps in App Village",
  },
} as const;

const productPreviews: Partial<Record<string, { src: string; srcByLocale?: Partial<Record<Locale, string>>; alt: Record<Locale, string>; frame?: "landscape" | "icon" }>> = {
  book: { src: "/appcanvas/book.webp", alt: { ko: "책기록 앱의 독서 기록 화면", en: "Book app reading journal screen" } },
  "breaklock-timer": { src: "/appcanvas/breaklock-timer.webp", alt: { ko: "Breaklock Timer 화면", en: "Breaklock Timer app screen" }, frame: "landscape" },
  callninja: { src: "/appcanvas/callninja.webp", alt: { ko: "콜닌자 앱 화면", en: "CallNinja app screen" } },
  centuryiris: { src: "/appcanvas/centuryiris.webp", alt: { ko: "Century Iris 화면", en: "Century Iris app screen" }, frame: "landscape" },
  earth: { src: "/appcanvas/earth-icon.webp", alt: { ko: "Earth 앱 아이콘", en: "Earth app icon" }, frame: "icon" },
  eatwater: { src: "/appcanvas/eatwater.webp", srcByLocale: { en: "/appcanvas/eatwater-en.webp" }, alt: { ko: "물을 마시는 새의 물 섭취 기록 화면", en: "The Bird That Drinks Water daily log screen" } },
  gnomon: { src: "/appcanvas/gnomon.jpg", alt: { ko: "Gnomon 앱 아이콘", en: "Gnomon app icon" }, frame: "icon" },
  "memory-palace": { src: "/appcanvas/memory-palace.webp", alt: { ko: "기억의궁전 뇌모닉 앱 화면", en: "Memory Palace app screen" } },
  snapcart: { src: "/appcanvas/snapcart.webp", alt: { ko: "찰칵 장값 계산기 앱 화면", en: "SnapCart grocery calculator screen" } },
  spamcall070: { src: "/appcanvas/spamcall070.webp", alt: { ko: "070 스팸 전화 차단 앱 화면", en: "070 spam call blocker screen" } },
  "yt-bulk-downloader": { src: "/appcanvas/yt-chita.webp", alt: { ko: "YT Chita 앱 아이콘", en: "YT Chita app icon" }, frame: "icon" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const text = copy[rawLocale];
  return {
    title: text.title,
    description: text.description,
    alternates: { canonical: `/${rawLocale}/about`, languages: { ko: "/ko/about", en: "/en/about" } },
    openGraph: { title: text.title, description: text.description, type: "website", locale: rawLocale === "ko" ? "ko_KR" : "en_US" },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const text = copy[locale];
  const releasedApps = apps.filter((app) => app.status === "released");
  const platformNames: Record<string, string> = locale === "ko"
    ? { macos: "macOS", ios: "iPhone", android: "Android", windows: "Windows", web: "웹" }
    : { macos: "macOS", ios: "iPhone", android: "Android", windows: "Windows", web: "Web" };

  return (
    <main className="about-page" lang={locale}>
      <header className="about-header">
        <Link className="about-wordmark" href={localePath(locale)}>appcanvas</Link>
        <nav aria-label={text.language} className="about-nav">
          <Link href={localePath(locale)}>{text.home}</Link>
          <Link aria-current={locale === "ko" ? "page" : undefined} href="/ko/about" lang="ko">한글</Link>
          <span aria-hidden="true">/</span>
          <Link aria-current={locale === "en" ? "page" : undefined} href="/en/about" lang="en">EN</Link>
        </nav>
      </header>

      <div className="about-content">
        <section className="about-hero">
          <p className="about-eyebrow">{text.eyebrow}</p>
          <h1>{text.headline.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="about-intro">{text.intro}</p>
          <a className="about-button" href="#products">{text.productsTitle}<span aria-hidden="true">↓</span></a>
        </section>

        <section aria-labelledby="about-products" className="about-section" id="products">
          <p className="about-eyebrow">{text.productsEyebrow}</p>
          <h2 id="about-products">{text.productsTitle}</h2>
          <p className="about-section-intro">{text.productsIntro}</p>
          <ul className="about-products">
            {releasedApps.map((app) => {
              const preview = productPreviews[app.id];
              return (
                <li className="about-product" key={app.id}>
                  {preview && (
                    <div className={`about-product-preview${preview.frame ? ` about-product-preview--${preview.frame}` : ""}`}>
                      <Image
                        alt={preview.alt[locale]}
                        fill
                        sizes="(max-width: 640px) 64px, 100px"
                        src={preview.srcByLocale?.[locale] ?? preview.src}
                      />
                    </div>
                  )}
                  <div className="about-product-copy">
                    <h3>{localizedAppName(app, locale)}</h3>
                    <p>{localizedAppTagline(app, locale)}</p>
                    <div className="about-product-meta">
                      <span>{app.platforms.map((platform) => platformNames[platform] ?? platform).join(" · ")}</span>
                      <span>{text.released}</span>
                      {app.downloads.filter((download) => download.url).map((download) => (
                        <a className="about-store-link" href={download.url!} key={`${app.id}-${download.platform}`} rel="noreferrer" target="_blank">{download.label}<span aria-hidden="true">↗</span></a>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="about-approach" className="about-section about-approach">
          <div>
            <p className="about-eyebrow">{text.developmentEyebrow}</p>
            <h2 id="about-approach">{text.developmentTitle}</h2>
          </div>
          <p>{text.developmentBody}</p>
        </section>

        <section aria-labelledby="about-vision" className="about-vision">
          <p className="about-eyebrow">Appcanvas · Vision</p>
          <h2 id="about-vision">{text.aiTitle}</h2>
          <p>{text.aiBody}</p>
        </section>

        <section aria-labelledby="about-company" className="about-section about-company">
          <div>
            <p className="about-eyebrow">{text.companyEyebrow}</p>
            <h2 id="about-company">{text.companyTitle}</h2>
          </div>
          <dl>
            <div><dt>{text.businessName}</dt><dd>앱캔버스 (appcanvas)</dd></div>
            <div><dt>{text.representative}</dt><dd>박성욱</dd></div>
            <div><dt>{text.registration}</dt><dd>741-01-03949</dd></div>
            <div><dt>{text.address}</dt><dd>{locale === "ko" ? "제주특별자치도 서귀포시 신서로" : "Sinseo-ro, Seogwipo-si, Jeju, South Korea"}</dd></div>
            <div><dt>{text.email}</dt><dd><a href="mailto:founder@ninjaturtle.win">founder@ninjaturtle.win</a></dd></div>
          </dl>
        </section>

        <footer className="about-footer">
          <a className="about-button" href={`/${locale}`}>{text.back}<span aria-hidden="true">↗</span></a>
          <span>© {new Date().getFullYear()} Appcanvas</span>
        </footer>
      </div>
    </main>
  );
}
