import type { MetadataRoute } from "next";
import { apps } from "@/data/apps";

export const dynamic = "force-static";

const baseUrl = "https://homeninja.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const appOwnedPages = new Set(
    apps
      .flatMap((app) => [app.web.privacy, app.web.support])
      .filter((url): url is string => url?.startsWith(baseUrl) ?? false),
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...[...appOwnedPages].sort().map((url) => ({
      url,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
