#!/usr/bin/env node

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import yaml from "js-yaml";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const shippingRoot = process.env.SHIPPING_ROOT
  ? path.resolve(process.env.SHIPPING_ROOT)
  : path.resolve(repositoryRoot, "../../0.shipping");
const outputPath = path.join(repositoryRoot, "data/apps.generated.ts");
const issueUrl = "https://github.com/sunpark20/errorreport/issues/new";
const expectedIDs = new Set([
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
]);
const validPlatforms = new Set(["ios", "android", "macos", "windows", "web"]);
const privateMarkers = ["jangbogo", "restlocktimer", "ytninza", "YT-Chita-source-archive"];

function fail(message) {
  throw new Error(`sync-apps.mjs: ${message}`);
}

function asObject(value, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail(`${label} must be a mapping`);
  }
  return value;
}

function requiredString(value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    fail(`${label} must be a non-empty string`);
  }
  return value.trim();
}

function optionalString(value, label) {
  if (value === undefined || value === null) return null;
  return requiredString(value, label);
}

function stringArray(value, label) {
  if (!Array.isArray(value) || value.length === 0) {
    fail(`${label} must be a non-empty list`);
  }
  return value.map((item, index) => requiredString(item, `${label}[${index}]`));
}

function urlMap(value, label) {
  if (value === undefined || value === null) return {};
  const object = asObject(value, label);
  return Object.fromEntries(
    Object.entries(object).map(([platform, url]) => {
      if (!validPlatforms.has(platform)) fail(`${label}.${platform} is not a known platform`);
      return [platform, optionalString(url, `${label}.${platform}`)];
    }),
  );
}

function downloadLabel(platform, url) {
  if (platform === "ios") return "App Store";
  if (platform === "android") return "Google Play";
  if (platform === "macos") return url.includes("apps.apple.com") ? "Mac App Store" : "macOS 다운로드";
  if (platform === "windows") return "Windows 다운로드";
  return "제품 소개 및 정책";
}

function reportUrl(template) {
  const query = new URLSearchParams({
    template,
    version: "unknown",
    build: "unknown",
    os: "unknown",
    device: "unknown",
    diagnostics: "unknown",
  });
  return `${issueUrl}?${query}`;
}

function loadManifest(directory) {
  const manifestPath = path.join(shippingRoot, directory, "shipping.yml");
  const manifest = asObject(yaml.load(readFileSync(manifestPath, "utf8")), manifestPath);
  if (manifest.schema_version !== 2) fail(`${manifestPath} must use schema_version: 2`);

  const app = asObject(manifest.app, `${manifestPath}.app`);
  const reporting = asObject(manifest.reporting, `${manifestPath}.reporting`);
  const web = asObject(manifest.web, `${manifestPath}.web`);
  const platforms = stringArray(app.platforms, `${manifestPath}.app.platforms`);
  for (const platform of platforms) {
    if (!validPlatforms.has(platform)) fail(`${manifestPath}: unsupported platform ${platform}`);
  }

  const store = urlMap(manifest.store, `${manifestPath}.store`);
  const release = urlMap(manifest.release, `${manifestPath}.release`);
  const downloads = platforms.flatMap((platform) => {
    const url = store[platform] ?? release[platform];
    return url ? [{ platform, url, label: downloadLabel(platform, url) }] : [];
  });
  if (release.web && !downloads.some((download) => download.platform === "web")) {
    downloads.push({ platform: "web", url: release.web, label: downloadLabel("web", release.web) });
  }

  const status = requiredString(app.status, `${manifestPath}.app.status`);
  if (!new Set(["released", "unreleased", "retired"]).has(status)) {
    fail(`${manifestPath}.app.status must be released, unreleased, or retired`);
  }

  const template = requiredString(reporting.template, `${manifestPath}.reporting.template`);
  const entry = {
    id: requiredString(app.id, `${manifestPath}.app.id`),
    displayName: requiredString(app.display_name, `${manifestPath}.app.display_name`),
    displayNameKo: requiredString(app.display_name_ko, `${manifestPath}.app.display_name_ko`),
    taglineKo: requiredString(app.tagline_ko, `${manifestPath}.app.tagline_ko`),
    platforms,
    minOS: requiredString(app.min_os, `${manifestPath}.app.min_os`),
    version: requiredString(app.version, `${manifestPath}.app.version`),
    status,
    updatedAt: optionalString(app.updated_at, `${manifestPath}.app.updated_at`),
    downloads,
    web: {
      privacy: optionalString(web.privacy, `${manifestPath}.web.privacy`),
      support: optionalString(web.support, `${manifestPath}.web.support`),
    },
    reporting: {
      template,
      locales: stringArray(reporting.locales, `${manifestPath}.reporting.locales`),
      url: reportUrl(template),
    },
  };

  const publicText = JSON.stringify(entry).toLowerCase();
  for (const marker of privateMarkers) {
    if (publicText.includes(marker.toLowerCase())) {
      fail(`${manifestPath} would expose private identifier ${marker}`);
    }
  }
  return entry;
}

const directories = readdirSync(shippingRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((directory) => {
    try {
      readFileSync(path.join(shippingRoot, directory, "shipping.yml"));
      return true;
    } catch {
      return false;
    }
  })
  .sort();
const apps = directories.map(loadManifest).sort((left, right) => left.id.localeCompare(right.id));
const actualIDs = new Set(apps.map((app) => app.id));
if (actualIDs.size !== expectedIDs.size || [...expectedIDs].some((id) => !actualIDs.has(id))) {
  fail(`app IDs must exactly match the approved twelve: ${[...expectedIDs].sort().join(", ")}`);
}

const output = [
  "/* This file is generated by scripts/sync-apps.mjs. Do not edit by hand. */",
  'import type { AppRegistryEntry } from "./apps";',
  "",
  `export const generatedApps: AppRegistryEntry[] = ${JSON.stringify(apps, null, 2)};`,
  "",
].join("\n");

if (process.argv.includes("--check")) {
  if (readFileSync(outputPath, "utf8") !== output) fail("data/apps.generated.ts is out of date; run node scripts/sync-apps.mjs");
  console.log(`verified ${apps.length} generated apps`);
} else {
  writeFileSync(outputPath, output, "utf8");
  console.log(`generated ${apps.length} apps from ${shippingRoot}`);
}
