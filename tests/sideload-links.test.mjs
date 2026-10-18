import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import test from 'node:test';
import yaml from 'js-yaml';

test('released sideload IPA is distinct from App Store without changing other apps', () => {
  const root = fileURLToPath(new URL('../', import.meta.url));
  // Under the repository so the copied generator resolves the same node_modules.
  const temp = mkdtempSync(path.join(root, '.sideload-test-'));
  try {
    const shipping = process.env.SHIPPING_ROOT ?? path.resolve(root, '../../0.shipping');
    for (const dir of readdirSync(shipping)) {
      let content;
      try { content = readFileSync(path.join(shipping, dir, 'shipping.yml'), 'utf8'); } catch { continue; }
      const manifest = yaml.load(content);
      if (manifest.app.id === 'ytdi') {
        manifest.release.ios = 'https://github.com/sunpark20/ytdi-releases/releases/latest';
        manifest.app.status = 'released';
      }
      mkdirSync(path.join(temp, 'shipping', dir), { recursive: true });
      writeFileSync(path.join(temp, 'shipping', dir, 'shipping.yml'), yaml.dump(manifest));
    }
    mkdirSync(path.join(temp, 'scripts'));
    mkdirSync(path.join(temp, 'data'));
    copyFileSync(path.join(root, 'scripts/sync-apps.mjs'), path.join(temp, 'scripts/sync-apps.mjs'));
    execFileSync(process.execPath, [path.join(temp, 'scripts/sync-apps.mjs')], { env: { ...process.env, SHIPPING_ROOT: path.join(temp, 'shipping') } });
    const generated = readFileSync(path.join(temp, 'data/apps.generated.ts'), 'utf8');
    const apps = JSON.parse(generated.match(/= (\[[\s\S]*\]);/)[1]);
    const ytdi = apps.find(app => app.id === 'ytdi');
    assert.equal(ytdi.status, 'released');
    assert.deepEqual(ytdi.downloads.find(link => link.platform === 'ios'), {
      platform: 'ios', distribution: 'direct', label: 'IPA 다운로드',
      url: 'https://github.com/sunpark20/ytdi-releases/releases/latest',
    });
    for (const app of apps.filter(app => app.id !== 'ytdi')) {
      for (const link of app.downloads.filter(link => link.platform === 'ios')) {
        assert.equal(link.distribution, 'store');
        assert.equal(link.label, 'App Store');
      }
    }
  } finally { rmSync(temp, { recursive: true, force: true }); }
});
