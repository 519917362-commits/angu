import { routing } from '@/lib/routing';
import { REVALIDATE_SECONDS, SITE_DATA_TAG } from '@/lib/api';
import { PILLAR_SLUGS } from '@/lib/pillars';

const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const BASE_URL = 'https://www.angumesh.com';

interface Product { slug: string; createdAt?: string; updatedAt?: string }
interface BlogPost { slug: string; updated_at?: string; publish_time?: string; created_at?: string }
interface Category { slug: string }

// Safe date formatting (YYYY-MM-DD)
function fmtDate(d: string | undefined): string | undefined {
  if (!d) return undefined;
  const m = d.match(/^\d{4}-\d{2}-\d{2}/);
  return m ? m[0] : undefined;
}

function xhtmlLink(rel: string, hreflang: string, href: string): string {
  return `    <xhtml:link rel="${rel}" hreflang="${hreflang}" href="${href}" />`;
}

function urlBlock(opts: {
  locale: string;
  path: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
}): string {
  const locales = routing.locales;
  const lines: string[] = [`  <url>`];
  const loc = `${BASE_URL}/${opts.locale}${opts.path}`;
  lines.push(`    <loc>${loc}</loc>`);
  // hreflang: self + all other locales
  for (const l of locales) {
    if (l === opts.locale) continue;
    lines.push(xhtmlLink('alternate', l, `${BASE_URL}/${l}${opts.path}`));
  }
  lines.push(xhtmlLink('alternate', 'x-default', `${BASE_URL}/en${opts.path}`));
  lines.push(`    <changefreq>${opts.changefreq}</changefreq>`);
  lines.push(`    <priority>${opts.priority}</priority>`);
  if (opts.lastmod) {
    lines.push(`    <lastmod>${opts.lastmod}</lastmod>`);
  }
  lines.push(`  </url>`);
  return lines.join('\n');
}

export async function GET() {
  // Fetch live data
  let products: Product[] = [];
  let blogPosts: BlogPost[] = [];
  let categories: Category[] = [];
  try {
    const [catRes, blogRes] = await Promise.all([
      fetch(`${BACKEND}/api/catalog`, {
        next: { revalidate: REVALIDATE_SECONDS, tags: [SITE_DATA_TAG] },
      }),
      // limit 必须显式给大值：后端 /api/blog-posts 默认只返回 10 条，
      // 文章超过 10 篇后其余会静默漏出 sitemap。
      fetch(`${BACKEND}/api/blog-posts?limit=500`, {
        next: { revalidate: REVALIDATE_SECONDS, tags: [SITE_DATA_TAG] },
      }),
    ]);
    if (catRes.ok) {
      const catData = await catRes.json();
      categories = catData.categories || [];
      products = catData.products || [];
    }
    if (blogRes.ok) {
      const blogData = await blogRes.json();
      blogPosts = blogData.posts || blogData || [];
    }
  } catch {
    /* silent */
  }

  // lastmod for static pages — use the date of the last significant site update
  const SITE_LASTMOD = '2026-09-01';
  const pages: [string, string, string][] = [
    ['', 'weekly', '1.0'],
    ['/products', 'daily', '0.9'],
    ['/service', 'weekly', '0.8'],
    ['/solutions', 'weekly', '0.9'],
    ['/blog', 'weekly', '0.8'],
    ['/service/faq', 'monthly', '0.7'],
    ['/download', 'monthly', '0.6'],
    ['/about', 'monthly', '0.7'],
    ['/contact', 'monthly', '0.7'],
    ['/noise-barrier', 'weekly', '0.9'],
    // 四个品类支柱页（/gabion、/fence、/wire-mesh、/protection-net）
    ...PILLAR_SLUGS.map((s) => [`/${s}`, 'weekly', '0.9'] as [string, string, string]),
    // /privacy 页面自身输出 noindex（法务页不需要排名），不应出现在 sitemap 里：
    // sitemap 收录 + 页面 noindex 是互相矛盾的信号，会浪费抓取预算并拉低 sitemap 可信度。
    ['/terms', 'yearly', '0.3'],
  ];

  const urls: string[] = [];

  for (const locale of routing.locales) {
    // Static pages — all get site lastmod
    for (const [path, freq, pri] of pages) {
      urls.push(urlBlock({ locale, path, changefreq: freq, priority: pri, lastmod: SITE_LASTMOD }));
    }
    // Category filter pages (/products?category=xx) 不进 sitemap：
    // 这些页面的 canonical 指向 /products，提交它们与 canonical 自相矛盾且浪费抓取配额
    // Product detail pages — use updatedAt or createdAt
    for (const product of products) {
      urls.push(urlBlock({
        locale,
        path: `/products/${product.slug}`,
        changefreq: 'weekly',
        priority: '0.7',
        lastmod: fmtDate(product.updatedAt || product.createdAt) || SITE_LASTMOD,
      }));
    }
    // Blog detail pages — use updated_at or publish_time or created_at
    for (const post of blogPosts) {
      urls.push(urlBlock({
        locale,
        path: `/blog/${post.slug}`,
        changefreq: 'monthly',
        priority: '0.7',
        lastmod: fmtDate(post.updated_at || post.publish_time || post.created_at) || SITE_LASTMOD,
      }));
    }
  }

  const ns = [
    'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    'xmlns:xhtml="http://www.w3.org/1999/xhtml"',
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset ${ns.join('\n  ')}>
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
