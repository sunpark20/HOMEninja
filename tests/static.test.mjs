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
