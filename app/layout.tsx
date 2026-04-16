import type { Metadata } from "next";
import { Outfit, Noto_Sans_KR } from "next/font/google";
import Starfield from "@/components/Starfield";
import ShootingStar from "@/components/ShootingStar";
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
        style={{ color: "oklch(0.85 0.005 260)" }}
      >
        <Starfield />
        {/* 효과 #4: 유성 — 제거: 이 줄 + import + globals.css의 .shooting-star 삭제 */}
        <ShootingStar />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
