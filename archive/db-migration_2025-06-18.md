# DB Migration — Products & Categories to SQLite

## Summary
Successfully migrated the full product data from `src/lib/data/products.ts` into `backend/inquiries.db`, adding zh locale rows and enriching all data fields.

## What Was Done

### Schema Fix
- Changed UNIQUE constraint on `products.slug` → `UNIQUE(slug, locale)` to allow en/zh rows for the same product
- Changed UNIQUE constraint on `product_categories.slug` → `UNIQUE(slug, locale)` similarly
- Used safe ALTER TABLE RENAME → CREATE → INSERT → DROP approach (no data loss)

### Data Updates (en locale, 28 products)
- Updated `specifications` from `"{}"` / truncated text → proper JSON objects
- Updated `applications` from `"[]"` / text → JSON arrays
- Updated `seo_title`, `seo_keywords`, `seo_description` with proper SEO content
- Updated `short_description` and `description` with structured English content
- Preserved existing `/uploads/` images (only used static `/images/products/` paths when DB had no uploads)

### Data Inserts (zh locale)
- 28 new zh product rows with Chinese names, descriptions, full descriptions
- 9 new zh category rows for the 9 main category slugs
- All shared fields (price, moq, images, specs, apps) copied from en rows

## Verification Results
| Check | Result | Status |
|-------|--------|--------|
| `products` locale counts | en=28, zh=28 | ✅ |
| welded-wire-mesh-50mm rows | 2 rows (en + zh) | ✅ |
| specifications no longer "{}" | Full JSON object with 7 keys | ✅ |
| `product_categories` locale counts | en=13, zh=9 | ✅ |
| /api/catalog merged products | 28 products with `{en, zh}` names | ✅ |
| /api/catalog merged categories | 13 categories with zh names | ✅ |
| /uploads/ images preserved | ✅ (e.g. `/uploads/1781230903573-202366729.png`) | ✅ |

## Script Location
`/Users/anxiang/.qclaw/workspace-agent-4fb505c4/paiqi-wiremesh/backend/migrate-data.js`
