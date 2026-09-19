import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionaries, isLocale, locales, type Locale } from "@/i18n";
import "../globals.css";

const metadataBase = new URL("https://homeninja.vercel.app");

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const dictionary = dictionaries[rawLocale];
  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    metadataBase,
    icons: { icon: "/favicon.svg" },
    alternates: {
      canonical: `/${rawLocale}`,
      languages: { ko: "/ko", en: "/en" },
    },
    openGraph: {
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      type: "website",
      locale: dictionary.metadata.openGraphLocale,
      alternateLocale: rawLocale === "ko" ? ["en_US"] : ["ko_KR"],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
    },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  return (
    <html lang={locale}>
      <body className="font-[family-name:var(--font-body)]" style={{ color: "var(--c-heading)" }}>
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
