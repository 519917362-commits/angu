// 分析 uploads/ 文件的数据库引用关系、体积、格式
// 用法: node scripts-analyze-uploads.js
const sqlite3 = require('sqlite3');
const fs = require('fs');
const path = require('path');

const db = new sqlite3.Database('./inquiries.db');
const uploadsDir = path.join(__dirname, 'uploads');

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (e, rows) => (e ? reject(e) : resolve(rows)));
  });
}

(async () => {
  const tables = await all("SELECT name FROM sqlite_master WHERE type='table'");
  const refs = new Map(); // file -> [{table, id, column}]

  for (const t of tables) {
    if (t.name === 'sqlite_sequence') continue;
    const cols = await all(`PRAGMA table_info(${t.name})`);
    const rows = await all(`SELECT rowid, * FROM ${t.name}`);
    for (const row of rows) {
      for (const c of cols) {
        const v = row[c.name];
        if (typeof v !== 'string' || !v.includes('/uploads/')) continue;
        const found = v.match(/\/uploads\/[A-Za-z0-9._-]+/g) || [];
        for (const m of found) {
          const file = m.replace('/uploads/', '');
          if (!refs.has(file)) refs.set(file, []);
          refs.get(file).push(`${t.name}#${row.rowid}.${c.name}`);
        }
      }
    }
  }

  const files = fs.readdirSync(uploadsDir).filter(f => fs.statSync(path.join(uploadsDir, f)).isFile());
  let totalSize = 0, refSize = 0, orphanSize = 0;
  const report = [];
  for (const f of files) {
    const st = fs.statSync(path.join(uploadsDir, f));
    totalSize += st.size;
    const r = refs.get(f);
    if (r) refSize += st.size; else orphanSize += st.size;
    report.push({ file: f, size: st.size, refs: r ? r.length : 0, where: (r || []).slice(0, 2).join(';') });
  }

  report.sort((a, b) => b.size - a.size);
  const kb = n => (n / 1024).toFixed(0) + 'KB';

  console.log(`总文件 ${files.length} 个, 总大小 ${kb(totalSize)}`);
  console.log(`被引用 ${report.filter(r => r.refs).length} 个 (${kb(refSize)}), 孤儿 ${report.filter(r => !r.refs).length} 个 (${kb(orphanSize)})`);
  console.log('\n=== 被引用的最大 20 张 ===');
  report.filter(r => r.refs).slice(0, 20).forEach(r =>
    console.log(`${kb(r.size).padStart(9)}  refs=${String(r.refs).padStart(3)}  ${r.file}  [${r.where}]`));
  console.log('\n=== 孤儿文件 ===');
  report.filter(r => !r.refs).forEach(r => console.log(`${kb(r.size).padStart(9)}  ${r.file}`));

  // 输出机器可读结果，供后续脚本使用
  fs.writeFileSync(path.join(__dirname, '..', 'uploads-analysis.json'),
    JSON.stringify({ totalSize, refSize, orphanSize, referenced: [...refs.keys()], report }, null, 2));
  db.close();
})().catch(e => { console.error(e); process.exit(1); });
