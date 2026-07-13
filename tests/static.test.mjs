import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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

test("moon shadow alpha is emitted through an OKLCH alpha helper", () => {
  const planet = read("components/Planet.tsx");

  assert.match(planet, /function withAlpha/);
  assert.match(planet, /withAlpha\(moon\.colors\[1\], 0\.3\)/);
  assert.doesNotMatch(planet, /\$\{moon\.colors\[1\]\} \/ 0\.3\)/);
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

test("retired Jeju app lives in the black-hole galaxy", () => {
  const galaxies = read("data/galaxies.ts");

  assert.match(galaxies, /kind: "blackholes"/);
  assert.match(galaxies, /starDensity: 0/);
  assert.match(galaxies, /id: "jeju-delivery"/);
  assert.doesNotMatch(
    galaxies,
    /id: "solar-system"[\s\S]*id: "jeju-delivery"[\s\S]*id: "asteroid-field"/,
  );
});

test("Century Iris and Gnomon are linked as friend planets", () => {
  const galaxies = read("data/galaxies.ts");

  assert.match(galaxies, /id: "gnomon"[\s\S]*targetId: "centuryiris"/);
  assert.match(galaxies, /id: "centuryiris"[\s\S]*targetId: "gnomon"/);
  assert.match(galaxies, /id: "centuryiris"[\s\S]*kind: "planet"/);
});

test("ytninza card uses the current product identity and landing page", () => {
  const galaxies = read("data/galaxies.ts");

  assert.match(galaxies, /id: "yt-bulk-downloader"[\s\S]*name: "ytninza"/);
  assert.match(galaxies, /Windows 10·11 64-bit/);
  assert.match(galaxies, /YT-Chita\/releases\/latest/);
  assert.match(galaxies, /https:\/\/sunpark20\.github\.io\/YT-Chita\//);
  assert.doesNotMatch(galaxies, /name: "YtBulkDownloader"/);
});

test("integrated privacy page reflects current ytninza and SnapCart data flows", () => {
  const privacy = read("app/privacy/page.tsx");

  assert.match(privacy, /Google Apps Script/);
  assert.match(privacy, /latest 50 log lines/);
  assert.match(privacy, /Apple Vision performs OCR on-device/);
  assert.match(privacy, /Google Gemini/);
  assert.match(privacy, /sent to Groq for/);
  assert.doesNotMatch(privacy, /external AI service \(OpenAI/);
});

test("site contact email matches the published product contact", () => {
  const layout = read("app/layout.tsx");

  assert.match(layout, /mailto:coastguard2681@gmail\.com/);
  assert.doesNotMatch(layout, /mailto:sun\.park20@gmail\.com/);
});
