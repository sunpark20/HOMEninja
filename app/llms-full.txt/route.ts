import { galaxies } from "@/data/galaxies";
import tmtData from "@/data/tmt.json";
import type { AppObject } from "@/types/galaxy";

export const revalidate = 3600;

type ListedApp = AppObject & {
  description: string;
  downloads: NonNullable<AppObject["downloads"]>;
};

function isAppObject(obj: unknown): obj is ListedApp {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "downloads" in obj &&
    Array.isArray(obj.downloads) &&
    obj.downloads.length > 0 &&
    "description" in obj &&
    typeof obj.description === "string"
  );
}

async function fetchBgraw(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

export async function GET() {
  const apps = galaxies.flatMap((g) => g.objects).filter(isAppObject);
  const tmt = tmtData as Record<
    string,
    { name: string | null; description: string | null; entries: string[] }
  >;

  const sections: string[] = [
    "# 닌자거북의홈 — 전체 앱 상세 정보",
    "> 인디 개발자 sunguk park의 앱 포트폴리오",
    "> https://ninjaturtle.win",
    "",
  ];

  for (const app of apps) {
    sections.push(`---\n`);
    sections.push(`## ${app.name}`);
    sections.push(`${app.description}\n`);

    if (app.meta?.minOS) sections.push(`- 지원: ${app.meta.minOS}`);
    for (const dl of app.downloads) {
      if (dl.url) sections.push(`- 다운로드: ${dl.url}`);
    }
    sections.push("");

    if (app.bgrawUrl) {
      const bgraw = app.bgrawUrl;
      const content = await fetchBgraw(bgraw);
      if (content) {
        sections.push(content);
        sections.push("");
        continue;
      }
    }

    const appTmt = tmt[app.id];
    if (appTmt?.entries.length) {
      sections.push("### 배경");
      for (const entry of appTmt.entries) {
        sections.push(entry);
        sections.push("");
      }
    }
  }

  return new Response(sections.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
