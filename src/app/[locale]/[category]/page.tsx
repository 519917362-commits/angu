import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/routing';
import { getCatalog } from '@/lib/api';
import { ProductCard } from '@/components/products/ProductCard';
import { PILLARS, PILLAR_SLUGS, type PillarSlug } from '@/lib/pillars';
import { COMPANY } from '@/lib/company';

/**
 * 品类支柱页：/en/gabion、/en/fence、/en/wire-mesh、/en/protection-net（× 四语）。
 *
 * 这四个品类此前只能通过 /products?category=xx 访问——参数页给不了独立标题、
 * 独立内链和稳定的排名信号。这里给每个品类一个可收录的落地页，
 * 复用 ProductCard 展示该品类下的产品，并补 FAQ 与结构化数据。
 *
 * noise-barrier 已有单独的定制页（app/[locale]/noise-barrier），
 * 静态段优先于动态段，因此不会被本路由覆盖，也不列入 PILLAR_SLUGS。
 */

const BASE_URL = COMPANY.siteUrl;

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PILLAR_SLUGS.map((category) => ({ locale, category }))
  );
}

type PageProps = { params: Promise<{ locale: string; category: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, category } = await params;
  const copy = PILLARS[category as PillarSlug]?.[locale] ?? PILLARS[category as PillarSlug]?.en;
  if (!copy) return {};

  return {
    title: copy.metaTitle,
    description: copy.metaDesc,
    alternates: {
      canonical: `${BASE_URL}/${locale}/${category}`,
      languages: {
        'x-default': `${BASE_URL}/en/${category}`,
        ...Object.fromEntries(routing.locales.map((l) => [l, `${BASE_URL}/${l}/${category}`])),
      },
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDesc,
      url: `${BASE_URL}/${locale}/${category}`,
      type: 'website',
    },
  };
}

const LABEL = {
  home: { en: 'Home', zh: '首页', vi: 'Trang chủ', th: 'หน้าแรก' },
  products: { en: 'Products', zh: '产品中心', vi: 'Sản phẩm', th: 'สินค้า' },
  faq: { en: 'Frequently Asked Questions', zh: '常见问题', vi: 'Câu hỏi thường gặp', th: 'คำถามที่พบบ่อย' },
  related: { en: 'Other Product Lines', zh: '其他产品线', vi: 'Dòng sản phẩm khác', th: 'สินค้าอื่น ๆ' },
  viewAll: { en: 'View all products', zh: '查看全部产品', vi: 'Xem tất cả sản phẩm', th: 'ดูสินค้าทั้งหมด' },
  quote: { en: 'Request a Quote', zh: '获取报价', vi: 'Nhận báo giá', th: 'ขอใบเสนอราคา' },
  contact: { en: 'Talk to an engineer', zh: '联系工程师', vi: 'Liên hệ kỹ thuật', th: 'คุยกับวิศวกร' },
} as const;

const CATEGORY_NAME: Record<string, Record<string, string>> = {
  gabion: { en: 'Gabion', zh: '石笼网箱', vi: 'Gabion', th: 'Gabion' },
  fence: { en: 'Fencing', zh: '围栏', vi: 'Hàng rào', th: 'รั้ว' },
  'wire-mesh': { en: 'Wire Mesh', zh: '丝网', vi: 'Lưới thép', th: 'ลวดตาข่าย' },
  'protection-net': { en: 'Protection Net', zh: '防护网', vi: 'Lưới bảo vệ', th: 'ตาข่ายป้องกัน' },
};

function t(key: keyof typeof LABEL, locale: string): string {
  const entry = LABEL[key] as Record<string, string>;
  return entry[locale] || entry.en;
}

export default async function PillarPage({ params }: PageProps) {
  const { locale, category } = await params;
  const copy = PILLARS[category as PillarSlug]?.[locale] ?? PILLARS[category as PillarSlug]?.en;
  if (!copy) notFound();

  const { products } = await getCatalog();
  const list = products.filter((p) => p.categorySlug === category);
  const categoryName = CATEGORY_NAME[category]?.[locale] || CATEGORY_NAME[category]?.en || category;
  const others = PILLAR_SLUGS.filter((s) => s !== category);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('home', locale), item: `${BASE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: t('products', locale), item: `${BASE_URL}/${locale}/products` },
      { '@type': 'ListItem', position: 3, name: categoryName, item: `${BASE_URL}/${locale}/${category}` },
    ],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: copy.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: copy.h1,
    numberOfItems: list.length,
    itemListElement: list.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.names[locale] || p.names.en,
      url: `${BASE_URL}/${locale}/products/${p.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-300 mb-6">
            <Link href={`/${locale}`} className="hover:text-white">{t('home', locale)}</Link>
            <span className="mx-2 text-slate-500" aria-hidden="true">/</span>
            <Link href={`/${locale}/products`} className="hover:text-white">{t('products', locale)}</Link>
            <span className="mx-2 text-slate-500" aria-hidden="true">/</span>
            <span className="text-white">{categoryName}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">{copy.h1}</h1>
          <p className="mt-5 text-slate-300 leading-relaxed max-w-3xl">{copy.intro}</p>

          <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl">
            {copy.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-slate-200">
                <span className="text-green-400 mt-0.5" aria-hidden="true">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={`/${locale}/contact`}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-sm transition-colors">
              {t('quote', locale)} →
            </Link>
            <a href={`https://wa.me/8618803189797`} target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-semibold text-sm transition-colors">
              {t('contact', locale)}
            </a>
          </div>
        </div>
      </section>

      {/* Products in this category */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-end justify-between gap-4 mb-7">
          <h2 className="text-2xl font-bold text-slate-900">{categoryName}</h2>
          <Link href={`/${locale}/products`} className="text-sm text-blue-600 hover:underline whitespace-nowrap">
            {t('viewAll', locale)} →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {list.map((p) => <ProductCard key={p.id} product={p} locale={locale} />)}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('faq', locale)}</h2>
          <div className="space-y-3">
            {copy.faq.map((f, i) => (
              <details key={i} className="group bg-white rounded-xl border border-slate-200 overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors list-none">
                  <span className="font-medium text-slate-800 pe-4 text-sm md:text-base">{f.q}</span>
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform shrink-0"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-4 text-slate-600 text-sm leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related product lines — 给四个支柱页互相加权，避免孤岛 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('related', locale)}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {others.map((s) => (
            <Link key={s} href={`/${locale}/${s}`}
              className="group block p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all">
              <div className="font-semibold text-slate-900 group-hover:text-blue-600">
                {CATEGORY_NAME[s]?.[locale] || CATEGORY_NAME[s]?.en || s}
              </div>
              <div className="text-sm text-slate-500 mt-1 line-clamp-2">
                {PILLARS[s][locale]?.h1 || PILLARS[s].en.h1}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
