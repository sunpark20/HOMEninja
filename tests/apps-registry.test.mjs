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
  "snapcart",
  "spamcall070",
  "yt-bulk-downloader",
];

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
