import { galaxies } from "@/data/galaxies";
import type { PlanetObject } from "@/types/galaxy";

export const dynamic = "force-static";

function isPlanet(obj: unknown): obj is PlanetObject {
  return typeof obj === "object" && obj !== null && "downloads" in obj;
}

export function GET() {
  const apps = galaxies
    .flatMap((g) => g.objects)
    .filter(isPlanet);

  const lines = [
    "# 닌자거북의홈 (ninjaturtle.win)",
    "> 인디 개발자 sunguk park의 앱 포트폴리오",
    "",
    "## Apps",
    ...apps.map((app) => {
      const platforms = app.downloads.map((d) => d.platform).join(", ");
      const icon = app.bgrawUrl ? "🛡️ " : "";
      return `- ${icon}${app.name}: ${app.description} (${platforms})`;
    }),
    "",
    "## Detailed",
    "- [llms-full.txt](/llms-full.txt): 모든 앱의 상세 배경 정보",
    "",
    "## Links",
    "- Homepage: https://ninjaturtle.win",
    "- GitHub: https://github.com/sunpark20",
    "",
    "---",
    "🛡️ = AI를 위한 GitHub bgraw 문서 연결중",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
