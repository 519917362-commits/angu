// 修复 DB 中指向已删除 .png 的引用（图片已转为 .jpg）
// 用法: node fix-image-refs.js
const sqlite3 = require('sqlite3');
const fs = require('fs');
const path = require('path');

const db = new sqlite3.Database('./inquiries.db');
const uploadsDir = path.join(__dirname, 'uploads');
const disk = new Set(fs.readdirSync(uploadsDir));

function all(sql, params = []) {
  return new Promise((resolve, reject) =>
    db.all(sql, params, (e, rows) => (e ? reject(e) : resolve(rows))));
}

(async () => {
  const tables = (await all("SELECT name FROM sqlite_master WHERE type='table'"))
    .map(r => r.name).filter(t => t !== 'sqlite_sequence');

  let fixed = 0, unfixable = [];
  const changes = []; // {table, column, rowid, old, new}

  for (const t of tables) {
    const cols = (await all(`PRAGMA table_info(${t})`)).map(c => c.name);
    for (const c of cols) {
      const rows = await all(`SELECT rowid AS rid, "${c}" AS v FROM "${t}" WHERE "${c}" LIKE '%/uploads/%'`);
      for (const row of rows) {
        if (typeof row.v !== 'string') continue;
        let val = row.v;
        const matches = val.match(/\/uploads\/[A-Za-z0-9._-]+/g) || [];
        for (const m of matches) {
          const file = m.replace('/uploads/', '');
          if (disk.has(file)) continue; // 文件存在，无需修
          // 尝试 .jpg 兄弟文件
          const jpg = file.replace(/\.png$/i, '.jpg');
          if (/\.png$/i.test(file) && disk.has(jpg)) {
            val = val.split(m).join(`/uploads/${jpg}`);
            changes.push({ table: t, column: c, rowid: row.rid, old: file, new: jpg });
            fixed++;
          } else {
            unfixable.push(`${t}#${row.rid}.${c} -> ${file}`);
          }
        }
        if (changes.some(ch => ch.table === t && ch.column === c && ch.rowid === row.rid)) {
          await all(`UPDATE "${t}" SET "${c}" = ? WHERE rowid = ?`, [val, row.rid]);
        }
      }
    }
  }

  console.log(`修复引用: ${fixed} 处 (.png -> .jpg)`);
  if (unfixable.length) {
    console.log(`无法修复（文件不存在且无 .jpg 替代）: ${unfixable.length} 处`);
    unfixable.forEach(u => console.log('  ' + u));
  }
  db.close();
})().catch(e => { console.error(e); process.exit(1); });
