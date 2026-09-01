#!/usr/bin/env node
/**
 * Convert migrate-data.js products to current bilingual schema seed format.
 * Run: node convert-products.js > seed-data/products.js
 */
const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'migrate-data.js'), 'utf8');

// Extract productsStatic array using eval (it's our own file, safe)
const idx = content.indexOf('const productsStatic = [');
const end = content.indexOf('\n];', idx) + 3;
const arrExpr = content.slice(idx, end).replace('const productsStatic = ', '');

// The file uses single quotes. Wrap in a function to eval safely.
const fn = new Function(`return ${arrExpr}`);
const products = fn();

// Convert to new schema
const out = products.map(p => ({
  slug: p.slug,
  category_slug: p.categorySlug,
  name_en: p.nameEn,
  name_zh: p.nameZh,
  short_description_en: p.shortDescEn,
  short_description_zh: p.shortDescZh,
  description_en: p.fullDescEn,
  description_zh: p.fullDescZh,
  price: p.priceUsd || 0,
  unit: p.unit || 'FOB Tianjin',
  moq: p.moq || 50,
  sort_weight: p.sortWeight || 0,
  status: 'published',
  is_featured: p.isFeatured || 0,
  images: JSON.stringify(p.images || []),
  specifications_en: JSON.stringify(p.specs || {}),
  specifications_zh: JSON.stringify(p.specs || {}),
  applications_en: JSON.stringify(p.apps || []),
  applications_zh: JSON.stringify(p.apps || []),
  seo_title_en: (p.seo && p.seo.title) || '',
  seo_title_zh: (p.seo && p.seo.title) || '',
  seo_keywords_en: (p.seo && p.seo.keywords) || '',
  seo_keywords_zh: (p.seo && p.seo.keywords) || '',
  seo_description_en: (p.seo && p.seo.description) || '',
  seo_description_zh: (p.seo && p.seo.description) || '',
}));

console.log(`module.exports = ${JSON.stringify(out, null, 2)};`);
