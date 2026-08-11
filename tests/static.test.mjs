import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);

function read(path) {
  return readFileSync(new URL(path, root), "utf8");
}

function readJson(path) {
  return JSON.parse(read(path));
}

test("package and lockfile names stay aligned", () => {
  const pkg = readJson("package.json");
  const lock = readJson("package-lock.json");

  assert.equal(lock.name, pkg.name);
  assert.equal(lock.packages[""].name, pkg.name);
});

test("Next output tracing is pinned to this project root", () => {
  const config = read("next.config.ts");

  assert.match(config, /outputFileTracingRoot:\s*projectRoot/);
  assert.match(config, /fileURLToPath\(import\.meta\.url\)/);
});

test("TMT content keeps the normalized API shape", () => {
  const tmt = readJson("data/tmt.json");

  for (const [appId, content] of Object.entries(tmt)) {
    assert.equal(typeof appId, "string");
    assert.equal(typeof content, "object");
    assert.ok(content !== null);
    assert.ok(content.name === null || typeof content.name === "string");
    assert.ok(
      content.description === null || typeof content.description === "string",
    );
    assert.ok(Array.isArray(content.entries));
    for (const entry of content.entries) {
      assert.equal(typeof entry, "string");
      assert.notEqual(entry.trim(), "");
    }
  }
});

test("homepage is the app-village entry point", () => {
  const page = read("app/page.tsx");
  const explorer = read("components/VillageExplorer.tsx");
  const layout = read("app/layout.tsx");

  assert.match(page, /VillageExplorer/);
  assert.match(explorer, /localStorage\.setItem\("appvillage\.resident"/);
  assert.match(explorer, /name.*animal.*device/s);
  assert.doesNotMatch(explorer, /email|mailto:/i);
  assert.doesNotMatch(layout, /mailto:|coastguard2681@gmail\.com/);
  assert.match(layout, /모여봐 앱마을/);
});

test("visual presentation is separate and covers every public app", () => {
  const generated = read("data/apps.generated.ts");
  const visuals = read("data/village-visuals.ts");

  const appIds = [...generated.matchAll(/\n    "id": "([^"]+)"/g)].map(
    (match) => match[1],
  );
  const visualIds = [...visuals.matchAll(/^\s{2,}(?:"([^"]+)"|([a-z][\w-]*)):\s*\{/gm)].map(
    (match) => match[1] ?? match[2],
  );

  assert.equal(appIds.length, 10);
  assert.deepEqual([...visualIds].sort(), [...appIds].sort());
  assert.match(visuals, /tree: "mac"/);
  assert.match(visuals, /tree: "iphone"/);
  assert.match(visuals, /id: "jeju-delivery"/);
  assert.match(visuals, /description: "이제는 그루터기에서 조용히 쉬고 있어요\."/);
});

test("retired source and components are removed", () => {
  const retiredPaths = [
    "data/galaxies.ts",
    "types/galaxy.ts",
    "components/GalaxyExplorer.tsx",
    "components/StarfieldV2.tsx",
    "components/Hyperspace.tsx",
    "components/galaxy/Galaxy.tsx",
    "public/black-hole.svg",
  ];

  for (const path of retiredPaths) assert.equal(existsSync(new URL(path, root)), false, path);
});

test("homepage stays self-hosted and sky-only", () => {
  const css = read("app/globals.css");
  const explorer = read("components/VillageExplorer.tsx");
  const icon = read("components/VillageIcon.tsx");

  assert.doesNotMatch(css, /backdrop-filter|gradient-text|fonts\.googleapis|jsdelivr|iconify|gsap/i);
  assert.doesNotMatch(explorer, /api\.iconify|jsdelivr|fonts\.googleapis|gsap/i);
  assert.match(css, /--v-sky/);
  assert.match(icon, /\"wind\"/);
  assert.match(icon, /\"download\"/);
});

test("legal contact exceptions stay on legal pages only", () => {
  const layout = read("app/layout.tsx");
  const village = read("components/VillageExplorer.tsx");
  const support = read("app/support/earth/page.tsx");
  const privacy = read("app/privacy/earth/page.tsx");

  assert.doesNotMatch(layout, /coastguard2681@gmail\.com|mailto:/);
  assert.doesNotMatch(village, /coastguard2681@gmail\.com|mailto:/);
  assert.match(support, /coastguard2681@gmail\.com/);
  assert.match(privacy, /coastguard2681@gmail\.com/);
});
