import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";

const expectedIDs = [
  "breaklock-timer",
  "callninja",
  "centuryiris",
  "earth",
  "eatwater",
  "gnomon",
  "memory-palace",
  "quick-quit",
  "snapcart",
  "spamcall070",
  "yt-bulk-downloader",
  "ytdi",
];
const errorReportRoot = process.env.ERRORREPORT_ROOT
  ? new URL(`file://${process.env.ERRORREPORT_ROOT.replace(/\/$/, "")}/`)
  : new URL("../../../errorreport/", import.meta.url);

function generatedApps() {
  const generated = readFileSync(new URL("../data/apps.generated.ts", import.meta.url), "utf8");
  const match = generated.match(/export const generatedApps: AppRegistryEntry\[\] = (\[[\s\S]*\]);\s*$/);
  assert.ok(match, "data/apps.generated.ts must contain a JSON app array");
  return JSON.parse(match[1]);
}

test("shipping registry is current, complete, and safe for public use", () => {
  execFileSync(process.execPath, ["scripts/sync-apps.mjs", "--check"], {
    cwd: new URL("../", import.meta.url),
    stdio: "pipe",
  });

  const generated = readFileSync(new URL("../data/apps.generated.ts", import.meta.url), "utf8");
  const ids = [...generated.matchAll(/"id": "([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(ids, expectedIDs);
  assert.doesNotMatch(generated, /jangbogo|restlocktimer|ytninza|YT-Chita-source-archive/i);

  const urls = [...generated.matchAll(/"url": "(https:[^"]+)"/g)].map((match) => match[1]);
  const reportURLs = urls.filter((url) => url.startsWith("https://github.com/sunpark20/errorreport/issues/new?"));
  assert.equal(reportURLs.length, expectedIDs.length);
  for (const reportURL of reportURLs) {
    assert.deepEqual(
      [...new URL(reportURL).searchParams.keys()].sort(),
      ["build", "device", "diagnostics", "os", "template", "version"],
    );
  }
});

test("shipping manifests, errorreport apps.json, and homepage registry agree", () => {
  execFileSync(process.execPath, ["scripts/sync-apps.mjs", "--check"], {
    cwd: new URL("../", import.meta.url),
    stdio: "pipe",
  });

  const errorReportApps = JSON.parse(
    readFileSync(new URL("apps.json", errorReportRoot), "utf8"),
  );
  assert.equal(errorReportApps.schema_version, 2);

  const comparableHomepageApps = generatedApps().map((app) => ({
    id: app.id,
    display_name: app.displayName,
    display_name_ko: app.displayNameKo,
    tagline_ko: app.taglineKo,
    platforms: app.platforms,
    min_os: app.minOS,
    version: app.version,
    status: app.status,
    downloads: app.downloads.map(({ platform, url }) => ({ platform, url })),
    web: app.web,
    report_template: app.reporting.template,
    report_url: app.reporting.url,
  }));

  for (const app of comparableHomepageApps) {
    assert.match(app.web.privacy, /^https:\/\//, `${app.id} privacy URL`);
    assert.match(app.web.support, /^https:\/\//, `${app.id} support URL`);
  }

  assert.deepEqual(errorReportApps.apps, comparableHomepageApps);
});
