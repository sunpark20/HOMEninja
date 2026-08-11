import { apps } from "@/data/apps";
import tmtData from "@/data/tmt.json";

export const dynamic = "force-static";

type AppContent = {
  name: string | null;
  description: string | null;
  entries: string[];
};

export function GET() {
  const tmt = tmtData as Record<string, AppContent>;
  const sections: string[] = [
    "# 닌자거북의홈 — 전체 앱 상세 정보",
    "> 인디 개발자 sunguk park의 앱 포트폴리오",
    "> https://ninjaturtle.win",
    "",
  ];

  for (const app of apps) {
    sections.push("---\n");
    sections.push(`## ${app.displayName}`);
    sections.push(`${app.taglineKo}\n`);
    sections.push(`- 지원: ${app.minOS}`);
    sections.push(`- 상태: ${app.status}`);
    for (const download of app.downloads) sections.push(`- 다운로드: ${download.url}`);
    if (app.web.privacy) sections.push(`- 개인정보처리방침: ${app.web.privacy}`);
    if (app.web.support) sections.push(`- 지원: ${app.web.support}`);
    sections.push(`- 문제 신고: ${app.reporting.url}`);
    sections.push("");

    const content = tmt[app.id];
    if (content?.entries.length) {
      sections.push("### 배경");
      for (const entry of content.entries) {
        sections.push(entry);
        sections.push("");
      }
    }
  }

  return new Response(sections.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
