# 越南语(vi)和泰语(th)迁移报告

## 任务完成摘要

为目标外贸网站 Angu Wire Mesh 的后端 SQLite 数据库及 server.js 添加了越南语(vi)和泰语(th)支持。

---

## 1. 数据库迁移

对 `backend/inquiries.db` 的以下表执行了 ALTER TABLE ADD COLUMN：

| 表 | 新增 _vi 列 | 新增 _th 列 |
|---|---|---|
| products | name, short_description, description, specifications, applications, seo_title, seo_keywords, seo_description, faq (8列) | 同上 (8列) |
| product_categories | name | name |
| blog_categories | name | name |
| blog_posts | title, abstract, content, seo_title, seo_keywords, seo_description (6列) | 同上 (6列) |
| banners | title, subtitle, cta_text (3列) | 同上 (3列) |
| why_choose_us | title, description (2列) | 同上 (2列) |
| application_scenarios | name, description (2列) | 同上 (2列) |
| about_timeline | title, desc (2列) | 同上 (2列) |
| about_team | name, title, market, countries, desc (5列) | 同上 (5列) |
| about_factory_images | alt (1列) | alt (1列) |
| about_certifications | name, desc (2列) | name, desc (2列) |
| site_config | value_vi (1列) | value_th (1列) |

- 所有新列 DEFAULT 设为空字符串 ''
- 原有列和数据**未修改**
- 备份文件: `backend/inquiries.db.bak`

## 2. server.js 修改

### CREATE TABLE 语句 (12个表全部更新)
- products, product_categories, blog_categories, blog_posts, site_config, banners, why_choose_us, application_scenarios, about_timeline, about_team, about_factory_images, about_certifications

### Admin API Routes (INSERT/POST/GET/DELETE)
- POST/PUT `/api/admin/products` → 接受并写入 vi/th 字段
- POST/PUT `/api/admin/product-categories` → 同上
- POST/PUT `/api/admin/blog-categories` → 同上
- POST/PUT `/api/admin/blog-posts` → 同上
- POST/PUT `/api/admin/banners` → 同上
- POST/PUT `/api/admin/why-choose-us` → 同上
- POST/PUT `/api/admin/application-scenarios` → 同上
- POST/PUT `/api/admin/about-timeline` → 同上
- POST/PUT `/api/admin/about-team` → 同上（含 market, countries desc, title, name 的 vi/th）
- POST/PUT `/api/admin/about-factory-images` → 同上
- POST/PUT `/api/admin/about-certifications` → 同上
- GET/PUT `/api/admin/site-config` → 读写 value_vi, value_th 列

### Public API Routes (output)
- `GET /api/catalog` → 所有产品字段返回 `{en, zh, vi, th}` (names, shortDescriptions, fullDescriptions, specifications, applications, seoTitle, seoKeywords, seoDescription, faq)
- `GET /api/catalog/categories` → 返回 `names: {en, zh, vi, th}`
- `GET /api/catalog/:slug` → 同上（单产品详情）
- `GET /api/products` → raw rows 已含 vi/th 列（SELECT *）
- `GET /api/products/:slug` → raw rows 已含 vi/th 列
- `GET /api/site-config` → config 对象: `{en, zh, vi, th}`, banners: `title/subtitle/ctaText: {en, zh, vi, th}`, whyChooseUs: `title/description: {en, zh, vi, th}`, scenes: `name/description: {en, zh, vi, th}`
- `GET /api/about-page-config` → raw rows 已含所有新列

### Seed Data
- 默认 product_categories 和 blog_categories 种子数据增加 vi/th 空字符串值
- site_config 种子数据增加 value_vi/value_th 空字符串值

## 3. 验证

- `node -c backend/server.js` → 通过（语法正确）
- SQLite schema 确认所有表已添加相应列
- 数据库备份位于 `backend/inquiries.db.bak`
