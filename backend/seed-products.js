#!/usr/bin/env node
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'inquiries.db');
const db = new sqlite3.Database(DB_PATH);

db.get('SELECT COUNT(*) as cnt FROM products', [], (err, row) => {
  if (err) { console.error(err); process.exit(1); }
  if (row && row.cnt > 0) {
    console.log(`已有 ${row.cnt} 条产品，跳过`);
    process.exit(0);
  }
  seed();
});

function seed() {
  const products = require('./seed-data/products.js');
  
  const sql = `INSERT INTO products (
    slug, category_slug, name_en, name_zh,
    short_description_en, short_description_zh,
    description_en, description_zh,
    price, unit, moq, sort_weight, status, is_featured,
    images, specifications_en, specifications_zh,
    applications_en, applications_zh,
    seo_title_en, seo_title_zh,
    seo_keywords_en, seo_keywords_zh,
    seo_description_en, seo_description_zh
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  let done = 0;
  let errors = 0;
  const total = products.length;

  products.forEach(p => {
    db.run(sql, [
      p.slug, p.category_slug, p.name_en, p.name_zh,
      p.short_description_en, p.short_description_zh,
      p.description_en, p.description_zh,
      p.price, p.unit, p.moq, p.sort_weight, p.status, p.is_featured,
      p.images, p.specifications_en, p.specifications_zh,
      p.applications_en, p.applications_zh,
      p.seo_title_en, p.seo_title_zh,
      p.seo_keywords_en, p.seo_keywords_zh,
      p.seo_description_en, p.seo_description_zh,
    ], function(err) {
      if (err) { console.error(`❌ ${p.slug}: ${err.message}`); errors++; }
      done++;
      if (done === total) {
        console.log(`✅ 产品: ${done - errors} 成功, ${errors} 失败`);
        seedBlogs();
      }
    });
  });
}

function seedBlogs() {
  const posts = require('./seed-data/blogs.js');
  if (!posts.length) { finish(); return; }
  
  const sql = `INSERT INTO blog_posts (
    slug, category_slug, title_en, title_zh,
    abstract_en, abstract_zh, content_en, content_zh,
    cover_image, status, publish_time,
    seo_title_en, seo_title_zh,
    seo_keywords_en, seo_keywords_zh,
    seo_description_en, seo_description_zh
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  let done = 0;
  let errors = 0;
  const total = posts.length;

  posts.forEach(p => {
    db.run(sql, [
      p.slug, p.categorySlug, p.title_en, p.title_zh,
      p.abstract_en, p.abstract_zh, p.content_en, p.content_zh,
      p.coverImage, p.status || 'published', p.publishTime || new Date().toISOString(),
      p.seo_title_en, p.seo_title_zh,
      p.seo_keywords_en, p.seo_keywords_zh,
      p.seo_description_en, p.seo_description_zh,
    ], function(err) {
      if (err) { console.error(`❌ blog ${p.slug}: ${err.message}`); errors++; }
      done++;
      if (done === total) {
        console.log(`✅ 博客: ${done - errors} 成功, ${errors} 失败`);
        finish();
      }
    });
  });
}

function finish() {
  db.close();
  process.exit(0);
}
