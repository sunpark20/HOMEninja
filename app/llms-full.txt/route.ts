import { apps } from "@/data/apps";

export const dynamic = "force-static";

export function GET() {
  const sections: string[] = [
    "# 앱캔버스 — 전체 앱 상세 정보",
    "> 일상의 불편을 해결하는 작은 앱을 만드는 독립 앱 스튜디오",
    "> https://ninjaturtle.win",
    "",
  ];

  for (const app of apps) {
    sections.push("---\n");
    sections.push(`## ${app.displayName}`);
    sections.push(`${app.taglineEn}\n${app.taglineKo}\n`);
    sections.push(`- 지원: ${app.minOS}`);
    sections.push(`- 상태: ${app.status}`);
    for (const download of app.downloads) sections.push(`- 다운로드: ${download.url}`);
    if (app.web.privacy) sections.push(`- 개인정보처리방침: ${app.web.privacy}`);
    if (app.web.support) sections.push(`- 지원: ${app.web.support}`);
    sections.push(`- 문제 신고: ${app.reporting.url}`);
    sections.push("");

  }

  return new Response(sections.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
