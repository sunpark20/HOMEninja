import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VillageExplorer from "@/components/VillageExplorer";
import { isLocale, locales, dictionaries, type Locale } from "@/i18n";
import { legalMetadata, localizedRoutePaths, renderLocalizedLegalPage } from "@/components/LocalizedLegalPage";

export function generateStaticParams() {
  return locales.flatMap((locale) => localizedRoutePaths.map((path) => ({
    locale,
    ...(path === "/" ? { slug: [] } : { slug: path.slice(1).split("/") }),
  })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug?: string[] }> }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const routePath = slug?.length ? `/${slug.join("/")}` : "/";
  if (!localizedRoutePaths.includes(routePath as (typeof localizedRoutePaths)[number])) notFound();
  const page = legalMetadata(rawLocale, routePath);
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${rawLocale}${routePath === "/" ? "" : routePath}`,
      languages: {
        ko: `/ko${routePath === "/" ? "" : routePath}`,
        en: `/en${routePath === "/" ? "" : routePath}`,
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      locale: dictionaries[rawLocale].metadata.openGraphLocale,
    },
  };
}

export default async function LocalizedRoute({ params }: { params: Promise<{ locale: string; slug?: string[] }> }) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const routePath = slug?.length ? `/${slug.join("/")}` : "/";
  if (!localizedRoutePaths.includes(routePath as (typeof localizedRoutePaths)[number])) notFound();
  if (routePath === "/") return <VillageExplorer dictionary={dictionaries[locale]} locale={locale} />;
  return renderLocalizedLegalPage(locale, routePath);
}
