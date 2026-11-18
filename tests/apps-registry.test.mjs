import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";

const expectedIDs = [
  "bip0039",
  "book",
  "breaklock-timer",
  "callninja",
  "earth",
  "eatwater",
  "gnomon",
  "memory-palace",
  "quick-quit",
  "snapcart",
  "spamcall070",
  "todayopen",
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

test("homepage registry references matching GitHub Issue Forms", () => {
  const errorReportApps = JSON.parse(
    readFileSync(new URL("apps.json", errorReportRoot), "utf8"),
  );
  assert.equal(errorReportApps.schema_version, 2);
  const reportAppsByID = new Map(errorReportApps.apps.map((app) => [app.id, app]));

  for (const app of generatedApps()) {
    assert.match(app.web.privacy, /^https:\/\//, app.id);
    assert.match(app.web.support, /^https:\/\//, app.id);
    const reportApp = reportAppsByID.get(app.id);
    assert.ok(reportApp, `Missing report entry for ${app.id}`);
    assert.equal(app.reporting.template, reportApp.report_template, app.id);
    assert.equal(app.reporting.url, reportApp.report_url, app.id);
  }
});
