#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""生成本地→生产数据库同步 SQL（增量 + 全量 site_config）。"""
import sqlite3, json

db = sqlite3.connect('backend/inquiries.db')
cur = db.cursor()

def esc(s):
    if s is None:
        return 'NULL'
    return "'" + str(s).replace("'", "''") + "'"

sql_lines = []
sql_lines.append("-- 本地→生产数据库同步 SQL (生成于 2026-08-15)")
sql_lines.append("BEGIN;")

# ── 1. INSERT 5 个新产品 ──
cur.execute('PRAGMA table_info(products)')
prod_cols = [r[1] for r in cur.fetchall()]
col_list = ', '.join(prod_cols)

new_slugs = ['metal-upright-noise-barrier',
             'metal-bent-curved-noise-barrier', 'transparent-acrylic-glass-noise-barrier',
             'fully-enclosed-noise-barrier']
for slug in new_slugs:
    cur.execute('SELECT * FROM products WHERE slug=?', (slug,))
    row = cur.fetchone()
    if not row:
        print(f'跳过(不存在): {slug}')
        continue
    vals = ', '.join(esc(v) for v in row)
    sql_lines.append(f"INSERT OR IGNORE INTO products ({col_list}) VALUES ({vals});")
    print(f'INSERT 产品: {slug} (id={row[0]})')

# ── 2. UPDATE 5 个旧声屏障产品的 vi/th 字段 ──
# 这些字段本地 8/13 已修复（name/SEO/正文翻译）
old_noise_slugs = ['highway-noise-barrier-3m', 'equipment-noise-barrier-2.5m',
                   'factory-noise-barrier-4m', 'rail-transit-noise-barrier', 'bridge-noise-barrier']
vi_th_fields = ['name_vi', 'name_th', 'short_description_vi', 'short_description_th',
                'description_vi', 'description_th', 'specifications_vi', 'specifications_th',
                'applications_vi', 'applications_th', 'seo_title_vi', 'seo_title_th',
                'seo_keywords_vi', 'seo_keywords_th', 'seo_description_vi', 'seo_description_th',
                'faq_vi', 'faq_th']

for slug in old_noise_slugs:
    cur.execute('SELECT * FROM products WHERE slug=?', (slug,))
    row = cur.fetchone()
    if not row:
        continue
    # 用 dict 映射列名
    rowdict = dict(zip(prod_cols, row))
    set_parts = []
    for f in vi_th_fields:
        set_parts.append(f"{f}={esc(rowdict.get(f))}")
    set_sql = ', '.join(set_parts)
    sql_lines.append(f"UPDATE products SET {set_sql} WHERE slug={esc(slug)};")
    print(f'UPDATE 产品 vi/th: {slug}')

# ── 3. 全量同步 site_config ──
cur.execute('PRAGMA table_info(site_config)')
cfg_cols = [r[1] for r in cur.fetchall()]
cfg_col_list = ', '.join(cfg_cols)

cur.execute('SELECT * FROM site_config ORDER BY key')
cfg_rows = cur.fetchall()
for row in cfg_rows:
    vals = ', '.join(esc(v) for v in row)
    sql_lines.append(f"INSERT OR REPLACE INTO site_config ({cfg_col_list}) VALUES ({vals});")
print(f'同步 site_config: {len(cfg_rows)} 个 key')

# ── 4. 更新 sqlite_sequence ──
cur.execute("SELECT seq FROM sqlite_sequence WHERE name='products'")
seq = cur.fetchone()
if seq:
    sql_lines.append(f"UPDATE sqlite_sequence SET seq={seq[0]} WHERE name='products';")
    print(f'更新 sqlite_sequence: products={seq[0]}')

sql_lines.append("COMMIT;")
db.close()

out = '/tmp/angu_sync.sql'
with open(out, 'w', encoding='utf-8') as f:
    f.write('\n'.join(sql_lines) + '\n')

print(f'\n已生成: {out} ({len(sql_lines)} 条语句)')
