// 全量图片引用校验: DB + 源码中引用的图片是否都存在且可解码
const sqlite3 = require('sqlite3');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const db = new sqlite3.Database('./inquiries.db');
const ROOT = path.join(__dirname, '..');

function all(sql, params = []) {
  return new Promise((resolve, reject) => db.all(sql, params, (e, r) => (e ? reject(e) : resolve(r))));
}

(async () => {
  const refs = new Map(); // path -> [来源]
  // 1. DB 全部文本列
  const tables = (await all("SELECT name FROM sqlite_master WHERE type='table'")).map(r => r.name);
  for (const t of tables) {
    if (t === 'sqlite_sequence') continue;
    const cols = (await all(`PRAGMA table_info(${t})`)).map(c => c.name);
    for (const c of cols) {
      const rows = await all(`SELECT rowid AS rid, "${c}" AS v FROM "${t}"`);
      for (const r of rows) {
        if (typeof r.v !== 'string') continue;
        for (const m of r.v.match(/\/(?:uploads|images)\/[A-Za-z0-9._/-]+/g) || []) {
          if (!refs.has(m)) refs.set(m, []);
          refs.get(m).push(`DB:${t}#${r.rid}.${c}`);
        }
      }
    }
  }
  // 2. 源码中的图片路径
  const srcMatches = execSync(
    `grep -rhoE "'/[a-zA-Z0-9_./-]+\\.(jpg|jpeg|png|webp|svg|gif)'" ${path.join(ROOT, 'src')} || true`,
    { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }
  );
  for (const m of srcMatches.matchAll(/'([^']+)'/g)) {
    const p = m[1];
    if (p.startsWith('/images/') || p.startsWith('/uploads/')) {
      if (!refs.has(p)) refs.set(p, []);
      refs.get(p).push('CODE');
    }
  }

  let missing = [], broken = [], ok = 0;
  const sizes = [];
  for (const [p, sources] of refs) {
    const full = path.join(ROOT, 'public', p.startsWith('/uploads/') ? p.replace('/uploads/', 'x') : p);
    // uploads 走 backend 目录
    const file = p.startsWith('/uploads/')
      ? path.join(ROOT, 'backend', p)
      : path.join(ROOT, 'public', p);
    if (!fs.existsSync(file)) { missing.push([p, sources[0]]); continue; }
    if (/\.(jpg|jpeg|png|webp)$/i.test(p)) {
      try {
        execSync(`/Users/anxiang/.workbuddy/binaries/python/versions/3.13.12/bin/python3 -c "
from PIL import Image
im = Image.open('${file}'); im.load()
print(im.size)"`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
        ok++;
        sizes.push([p, fs.statSync(file).size]);
      } catch (e) {
        broken.push([p, e.message.slice(0, 60)]);
      }
    } else ok++;
  }

  console.log(`引用总数: ${refs.size}`);
  console.log(`可正常解码: ${ok}`);
  console.log(`缺失: ${missing.length}`);
  missing.forEach(([p, s]) => console.log('  [缺失]', p, '<-', s));
  console.log(`损坏: ${broken.length}`);
  broken.forEach(([p, e]) => console.log('  [损坏]', p, e));

  sizes.sort((a, b) => b[1] - a[1]);
  console.log('\n=== 当前最大的 10 张被引用图片 ===');
  sizes.slice(0, 10).forEach(([p, s]) => console.log(`  ${(s / 1024).toFixed(0).padStart(6)}KB  ${p}`));
  const total = sizes.reduce((a, [, s]) => a + s, 0);
  console.log(`被引用图片总体积: ${(total / 1024 / 1024).toFixed(1)}MB`);
  db.close();
})().catch(e => { console.error(e); process.exit(1); });
