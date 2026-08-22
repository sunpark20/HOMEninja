import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "모여봐 앱마을 · 닌자거북의홈",
  description:
    "작은 앱들이 자라는 마을에서 필요한 앱을 골라보세요.",
  metadataBase: new URL("https://homeninja.vercel.app"),
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "모여봐 앱마을 · 닌자거북의홈",
    description: "작은 앱들이 자라는 마을에서 필요한 앱을 골라보세요.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "모여봐 앱마을 · 닌자거북의홈",
    description: "작은 앱들이 자라는 마을에서 필요한 앱을 골라보세요.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className="font-[family-name:var(--font-body)]"
        style={{ color: "var(--c-heading)" }}
      >
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
