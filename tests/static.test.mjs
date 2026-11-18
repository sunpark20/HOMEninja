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


test("homepage is a simple app list backed by the registry", () => {
  const page = read("app/[locale]/[[...slug]]/page.tsx");
  const home = read("components/Home.tsx");
  const list = read("components/AppList.tsx");
  const layout = read("app/[locale]/layout.tsx");

  assert.match(page, /<Home locale/);
  assert.match(home, /@\/data\/apps/);
  assert.match(home, /status !== "retired"/);
  assert.match(list, /comingSoon/);
  assert.doesNotMatch(layout, /mailto:|coastguard2681@gmail\.com/);
  assert.match(layout, /lang=\{locale\}/);
});

test("village features and TMT are removed", () => {
  for (const path of [
    "components/VillageExplorer.tsx",
    "components/VillageIcon.tsx",
    "components/VillageAdminEditModal.tsx",
    "data/village-visuals.ts",
    "data/tmt.json",
    "app/api/tmt/route.ts",
    "public/village",
  ]) assert.equal(existsSync(new URL(path, root)), false, path);
});

test("homepage stays self-hosted without email links", () => {
  const css = read("app/globals.css");
  const homeFiles = ["Home", "AppList", "SupportSection", "SupportDrawer"]
    .map((name) => read(`components/${name}.tsx`))
    .join("\n");

  assert.doesNotMatch(css, /backdrop-filter|gradient-text|fonts\.googleapis|jsdelivr|iconify|gsap/i);
  assert.doesNotMatch(homeFiles, /mailto:|api\.iconify|jsdelivr|fonts\.googleapis|gsap/i);
});

test("support data ships empty with no fabricated records", () => {
  const support = read("data/support.ts");

  assert.match(support, /export const donations: Donation\[\] = \[\];/);
  assert.match(support, /export const ledger: LedgerEntry\[\] = \[\];/);
});

test("legal contact exceptions stay on legal pages only", () => {
  const legal = read("components/LocalizedLegalPage.tsx");
  const home = read("components/Home.tsx");

  assert.doesNotMatch(home, /coastguard2681@gmail\.com|mailto:/);
  assert.match(legal, /coastguard2681@gmail\.com/);
});
