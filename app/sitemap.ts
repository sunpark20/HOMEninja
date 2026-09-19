import type { MetadataRoute } from "next";
import { apps } from "@/data/apps";
import { localizedRoutePaths } from "@/components/LocalizedLegalPage";
import { locales } from "@/i18n";

export const dynamic = "force-static";

const baseUrl = "https://homeninja.vercel.app";

function sitePath(url: string | null) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.origin === baseUrl ? parsed.pathname : null;
  } catch {
    return null;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appOwnedPaths = new Set(
    apps
      .flatMap((app) => [sitePath(app.web.privacy), sitePath(app.web.support)])
      .filter((path): path is string => Boolean(path)),
  );
  const paths = new Set<string>([...localizedRoutePaths].filter((path) => path !== "/"));
  for (const path of appOwnedPaths) paths.add(path);
  const lastModified = new Date();

  return locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: { languages: { ko: `${baseUrl}/ko`, en: `${baseUrl}/en` } },
    },
    ...[...paths].sort().map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.2,
      alternates: {
        languages: {
          ko: `${baseUrl}/ko${path}`,
          en: `${baseUrl}/en${path}`,
        },
      },
    })),
  ]);
}
