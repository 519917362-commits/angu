#!/usr/bin/env node
/**
 * 把「最近改动过的 URL」推给 IndexNow（Bing / Yandex / DuckDuckGo / Seznam 共用）。
 *
 * 为什么需要它：sitemap 只是「请来抓」，IndexNow 是「这条已经变了」。
 * 新文章发出后，等搜索引擎按自己的节奏爬到，通常要几天到两周；推一次是分钟级。
 *
 * 用法：
 *   node scripts/indexnow.mjs                # 提交 lastmod 在最近 2 天内的 URL
 *   node scripts/indexnow.mjs 2026-11-01     # 提交指定日期之后的
 *   node scripts/indexnow.mjs --dry          # 只打印，不提交
 *
 * 默认窗口取 2 天而不是「今天」：发版常在夜里跨零点，只取当天会漏掉昨天的改动。
 * 重复提交同一 URL 不会受罚，但没必要，所以不设更大窗口。
 *
 * 依赖 sitemap 的 lastmod 真实：本脚本不猜哪些页面改过，完全以 sitemap 为准。
 * 已由 deploy.sh 第 6 步自动调用，正常发版无需手动执行。
 */
const HOST = 'www.angumesh.com';
const KEY = '0213841650b449e3acb0234ddce22b24';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const since = args.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a))
  || new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10);

const res = await fetch(`https://${HOST}/sitemap.xml`);
if (!res.ok) {
  console.error(`sitemap 拉取失败: HTTP ${res.status}`);
  process.exit(1);
}
const xml = await res.text();

// <url> 块内同时含 loc 与 lastmod，逐块解析而不是全局正则，
// 避免 loc 与 lastmod 错配到不同的 URL 上
const urls = [];
for (const block of xml.split('<url>').slice(1)) {
  const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
  const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
  if (!loc || !lastmod) continue;
  if (lastmod.slice(0, 10) >= since) urls.push(loc);
}

if (urls.length === 0) {
  console.log(`没有 lastmod >= ${since} 的 URL，跳过。`);
  process.exit(0);
}

console.log(`lastmod >= ${since} 的 URL：${urls.length} 条`);
for (const u of urls.slice(0, 10)) console.log('  ' + u);
if (urls.length > 10) console.log(`  … 其余 ${urls.length - 10} 条`);

if (dry) {
  console.log('\n--dry：未提交。');
  process.exit(0);
}

// IndexNow 单次上限 10 000 条，按 500 一批发送，避免请求体过大被网关截断
for (let i = 0; i < urls.length; i += 500) {
  const batch = urls.slice(i, i + 500);
  const r = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: batch }),
  });
  console.log(`批次 ${i / 500 + 1}: HTTP ${r.status} ${r.status === 200 || r.status === 202 ? '已接收' : await r.text()}`);
}
