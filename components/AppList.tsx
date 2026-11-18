import type { AppRegistryEntry } from "@/data/apps";
import { localizedAppName, type HomeDictionary, type Locale } from "@/i18n";

const GROUPS = [
  { title: "Mac", platform: "macos" },
  { title: "iPhone", platform: "ios" },
] as const;

// 같은 종류의 앱은 목록에서 위아래로 붙여 보여준다: [앞 앱, 바로 아래에 둘 앱]
const PAIRS = [["callninja", "spamcall070"]] as const;

function keepPairsTogether(items: AppRegistryEntry[]) {
  const result = [...items];
  for (const [first, second] of PAIRS) {
    const from = result.findIndex((app) => app.id === second);
    const to = result.findIndex((app) => app.id === first);
    if (from === -1 || to === -1) continue;
    const [moved] = result.splice(from, 1);
    result.splice(result.findIndex((app) => app.id === first) + 1, 0, moved);
  }
  return result;
}

export default function AppList({ apps, dictionary, locale }: { apps: AppRegistryEntry[]; dictionary: HomeDictionary; locale: Locale }) {
  return (
    <>
      {GROUPS.map((group) => {
        const hasLink = (app: AppRegistryEntry) => app.status === "released" && app.downloads.some((d) => d.url);
        const items = keepPairsTogether(apps
          .filter((app) => app.platforms.includes(group.platform))
          .sort((a, b) => Number(!hasLink(a)) - Number(!hasLink(b))));
        if (items.length === 0) return null;
        return (
          <section id={group.title.toLowerCase()} key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {items.map((app) => {
                const name = localizedAppName(app, locale);
                const url = app.status === "released" ? app.downloads.find((d) => d.url)?.url : null;
                return (
                  <li key={app.id}>
                    <strong>{url ? <a href={url} rel="noreferrer" target="_blank">{name}</a> : <span className="h-soon">{name}</span>}</strong>
                    {!url && <small className="h-soon"> {dictionary.apps.comingSoon}</small>}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </>
  );
}
