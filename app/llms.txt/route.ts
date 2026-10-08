import { apps } from "@/data/apps";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    "# 앱캔버스 · 모여봐 앱마을",
    "> 일상의 불편을 해결하는 작은 앱을 만드는 독립 앱 스튜디오",
    "",
    "## Apps",
    ...apps.map((app) => (
      `- ${app.displayName}: ${app.taglineEn} / ${app.taglineKo} (${app.platforms.join(", ")})`
    )),
    "",
    "## Detailed",
    "- [llms-full.txt](/llms-full.txt): 모든 앱의 상세 배경 정보",
    "",
    "## Links",
    "- Homepage: https://ninjaturtle.win",
    "- About: https://ninjaturtle.win/ko/about",
    "- GitHub: https://github.com/sunpark20",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
