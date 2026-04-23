import type { Metadata } from "next";
import { Outfit, Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "600", "700"],
});

const body = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "닌자거북의홈",
  description:
    "기억의궁전, 제주택배비지원 등 유용한 앱을 만듭니다.",
  metadataBase: new URL("https://homeninja.vercel.app"),
  openGraph: {
    title: "닌자거북의홈",
    description:
      "기억의궁전, 제주택배비지원 등 유용한 앱을 만듭니다.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "닌자거북의홈",
    description:
      "기억의궁전, 제주택배비지원 등 유용한 앱을 만듭니다.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${display.variable} ${body.variable}`}>
      <body
        className="font-[family-name:var(--font-body)]"
        style={{ color: "var(--c-heading)" }}
      >
        <header
          className="fixed top-0 left-0 right-0 z-50 flex justify-end items-center gap-4 px-4 py-2 text-[10px]"
          style={{ color: "var(--c-dim)" }}
        >
          <a
            href="mailto:sun.park20@gmail.com"
            className="transition-colors duration-200 hover:text-white/40"
          >
            문의사항
          </a>
          <a
            href="https://x.com/ppjp334"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-white/40"
          >
            X로 연락하기
          </a>
          <Link
            href="/privacy"
            className="transition-colors duration-200 hover:text-white/40"
          >
            개인정보처리방침
          </Link>
          <Link
            href="/llms.txt"
            className="transition-colors duration-200 hover:text-white/40"
          >
            llms.txt
          </Link>
        </header>
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
