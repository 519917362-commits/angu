import {categories, products} from '@/lib/data';
import {routing} from '@/lib/routing';

// Blog slugs (hardcoded — same as blog/[slug]/page.tsx)
const blogSlugs = [
  'how-to-choose-right-gabion-box-size',
  'rockfall-protection-net-vs-retaining-walls',
  'gabion-construction-best-practices-coastal-projects',
  'understanding-etag-027-rockfall-certification',
  'pvc-coated-vs-galvanized-gabion-comparison',
  'reno-mattress-river-bank-protection-complete-guide',
];

const BASE_URL = 'https://www.anguwiremesh.com';

function url(locale: string, path: string): string {
  return `${BASE_URL}/${locale}${path}`;
}

function wrap(url: string, changefreq: string, priority: string): string {
  return `  <url>
    <loc>${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  const urls: string[] = [];

  // Static paths by priority
  const staticPaths: [string, string, string][] = [
    ['', 'weekly', '1.0'],        // homepage
    ['/products', 'daily', '0.9'],
    ['/solutions', 'monthly', '0.9'],
    ['/blog', 'weekly', '0.8'],
    ['/service/faq', 'monthly', '0.7'],
    ['/about', 'monthly', '0.6'],
    ['/contact', 'monthly', '0.6'],
    ['/download', 'monthly', '0.5'],
  ];

  for (const locale of routing.locales) {
    for (const [path, freq, pri] of staticPaths) {
      urls.push(wrap(url(locale, path), freq, pri));
    }
    // Product listing by category
    for (const cat of categories) {
      urls.push(wrap(url(locale, `/products?category=${cat.slug}`), 'weekly', '0.8'));
    }
    // Product detail pages
    for (const product of products) {
      urls.push(wrap(url(locale, `/products/${product.slug}`), 'weekly', '0.7'));
    }
    // Blog detail pages
    for (const slug of blogSlugs) {
      urls.push(wrap(url(locale, `/blog/${slug}`), 'monthly', '0.6'));
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
