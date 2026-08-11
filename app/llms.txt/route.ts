import { apps } from "@/data/apps";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    "# 닌자거북의홈 (ninjaturtle.win)",
    "> 인디 개발자 sunguk park의 앱 포트폴리오",
    "",
    "## Apps",
    ...apps.map((app) => (
      `- ${app.displayName}: ${app.taglineKo} (${app.platforms.join(", ")})`
    )),
    "",
    "## Detailed",
    "- [llms-full.txt](/llms-full.txt): 모든 앱의 상세 배경 정보",
    "",
    "## Links",
    "- Homepage: https://ninjaturtle.win",
    "- GitHub: https://github.com/sunpark20",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
