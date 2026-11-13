import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { routing, locales } from '@/lib/routing';
import { getCatalog } from '@/lib/api';
import { ProductCard } from '@/components/products/ProductCard';
import { PILLARS, PILLAR_SLUGS, PILLAR_OG_IMAGE, CATEGORY_PARENT, CATEGORY_CHILDREN, TOP_LEVEL_PILLAR_SLUGS, type PillarSlug } from '@/lib/pillars';
import { ogImageEntry } from '@/lib/seo-utils';
import { COMPANY } from '@/lib/company';

// 页面级 revalidate：与 fetch 级的 REVALIDATE_SECONDS 保持一致。
// stale-while-revalidate 的窗口在 next.config.ts 的 expireTime 里配
// （Next 16 已废弃路由级 expireTime，写在这里不生效）。
export const revalidate = 300;


/**
 * 品类支柱页：/en/gabion、/en/fence、/en/wire-mesh、/en/slope-protection、
 * /en/natural-disaster-protection（× 四语）。
 *
 * 其中 natural-disaster-protection 是一级枢纽页，正文列子品类（边坡防护 / 石笼网），
 * 产品按子类分组展示；其余为叶级页，直接列本类产品。
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

  const img = PILLAR_OG_IMAGE[category as PillarSlug];
  const ogImage = img ? ogImageEntry(img, copy.metaTitle) : undefined;

  return {
    title: copy.metaTitle,
    description: copy.metaDesc,
    alternates: {
      canonical: `${BASE_URL}/${locale}/${category}`,
      languages: {
        'x-default': `${BASE_URL}/en/${category}`,
        // 只能用 locales（4 个全量语种）——partialLocales（ms / ar）没有这四个品类页，
        // /ms/fence 这类地址被 proxy.ts 308 回 /en。若把它们写进 hreflang，
        // hreflang 指向重定向地址，Google 会整簇忽略（Semrush 记作 16 条 hreflang 错误）。
        ...Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}/${category}`])),
      },
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDesc,
      url: `${BASE_URL}/${locale}/${category}`,
      siteName: 'Angu Wire Mesh',
      type: 'website',
      ...(ogImage ? {images: [ogImage]} : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.metaTitle,
      description: copy.metaDesc,
      ...(ogImage ? {images: [ogImage.url]} : {}),
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
  // 父级枢纽页专用
  productTypes: { en: 'Product types', zh: '产品类型', vi: 'Loại sản phẩm', th: 'ประเภทสินค้า' },
  viewType: { en: 'View products', zh: '查看该类产品', vi: 'Xem sản phẩm', th: 'ดูสินค้า' },
} as const;

const CATEGORY_NAME: Record<string, Record<string, string>> = {
  'natural-disaster-protection': { en: 'Natural Disaster Protection', zh: '自然灾害防护网', vi: 'Phòng chống thiên tai', th: 'ป้องกันภัยพิบัติ' },
  'slope-protection': { en: 'Slope Protection', zh: '边坡防护', vi: 'Bảo vệ mái dốc', th: 'การป้องกันลาดชัน' },
  gabion: { en: 'Gabion', zh: '石笼网', vi: 'Rọ đá', th: 'เกเบี้ยน' },
  fence: { en: 'Fencing', zh: '护栏网', vi: 'Hàng rào', th: 'รั้ว' },
  'wire-mesh': { en: 'Wire Mesh', zh: '丝网类', vi: 'Lưới thép', th: 'ลวดตาข่าย' },
};

function t(key: keyof typeof LABEL, locale: string): string {
  const entry = LABEL[key] as Record<string, string>;
  return entry[locale] || entry.en;
}

export default async function PillarPage({ params }: PageProps) {
  const { locale, category } = await params;
  const copy = PILLARS[category as PillarSlug]?.[locale] ?? PILLARS[category as PillarSlug]?.en;
  if (!copy) notFound();

  const { products } = await getCatalog({ light: true });
  const children = CATEGORY_CHILDREN[category] || [];
  const isParent = children.length > 0;
  const parentSlug = CATEGORY_PARENT[category];

  // 父级枢纽页汇总全部子类的产品；叶级页只展示本类产品。
  // 同一个产品在树上只有一条路径，父级页只是聚合视图，不产生第二个归属。
  const list = isParent
    ? products.filter((p) => children.includes(p.categorySlug))
    : products.filter((p) => p.categorySlug === category);

  const nameOf = (s: string) => CATEGORY_NAME[s]?.[locale] || CATEGORY_NAME[s]?.en || s;
  const categoryName = nameOf(category);

  // 关联区块：子页面先给同级兄弟，再给其余一级品类；一级页面只给其余一级品类。
  // 父品类不出现在自己的子页面「其他产品线」里，避免层级表达前后矛盾。
  const related: string[] = [
    ...(parentSlug ? (CATEGORY_CHILDREN[parentSlug] || []).filter((s) => s !== category) : []),
    ...TOP_LEVEL_PILLAR_SLUGS.filter((s) => s !== category && s !== parentSlug),
  ];

  // 面包屑层级：子类多一跳父级，Schema 与可见导航必须一致
  const crumbs = [
    { name: t('home', locale), item: `${BASE_URL}/${locale}` },
    { name: t('products', locale), item: `${BASE_URL}/${locale}/products` },
    ...(parentSlug ? [{ name: nameOf(parentSlug), item: `${BASE_URL}/${locale}/${parentSlug}` }] : []),
    { name: categoryName, item: `${BASE_URL}/${locale}/${category}` },
  ];

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.item,
    })),
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

  // 父级枢纽页列的是「产品类型」而不是产品，ItemList 跟着换成子品类——
  // 否则父页把自己包装成一个产品列表，与两个子页争夺同一批关键词。
  const itemListLd = isParent
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: copy.h1,
        numberOfItems: children.length,
        itemListElement: children.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: nameOf(s),
          url: `${BASE_URL}/${locale}/${s}`,
        })),
      }
    : {
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
            {parentSlug && (
              <>
                <Link href={`/${locale}/${parentSlug}`} className="hover:text-white">{nameOf(parentSlug)}</Link>
                <span className="mx-2 text-slate-500" aria-hidden="true">/</span>
              </>
            )}
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

      {/* 子品类入口：只在父级枢纽页出现，叶级页没有这一块 */}
      {isParent && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('productTypes', locale)}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {children.map((s) => {
              const sub = products.filter((p) => p.categorySlug === s);
              const subCopy = PILLARS[s as PillarSlug]?.[locale] || PILLARS[s as PillarSlug]?.en;
              return (
                <Link
                  key={s}
                  href={`/${locale}/${s}`}
                  className="group block p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600">{nameOf(s)}</h3>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full shrink-0">
                      {sub.length}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">{subCopy?.intro}</p>
                  <span className="mt-3 inline-block text-sm font-medium text-blue-600">
                    {t('viewType', locale)} →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Products in this category */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-end justify-between gap-4 mb-7">
          <h2 className="text-2xl font-bold text-slate-900">{isParent ? t('products', locale) : categoryName}</h2>
          <Link href={`/${locale}/products`} className="text-sm text-blue-600 hover:underline whitespace-nowrap">
            {t('viewAll', locale)} →
          </Link>
        </div>

        {isParent ? (
          <div className="space-y-12">
            {children.map((s) => {
              const sub = products.filter((p) => p.categorySlug === s);
              if (!sub.length) return null;
              return (
                <div key={s}>
                  <div className="flex items-baseline gap-3 mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">{nameOf(s)}</h3>
                    <Link href={`/${locale}/${s}`} className="text-xs text-blue-600 hover:underline">
                      {t('viewType', locale)} →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sub.map((p) => <ProductCard key={p.id} product={p} locale={locale} />)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {list.map((p) => <ProductCard key={p.id} product={p} locale={locale} />)}
          </div>
        )}
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
          {related.map((s) => (
            <Link key={s} href={`/${locale}/${s}`}
              className="group block p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all">
              <div className="font-semibold text-slate-900 group-hover:text-blue-600">
                {nameOf(s)}
              </div>
              <div className="text-sm text-slate-500 mt-1 line-clamp-2">
                {PILLARS[s as PillarSlug]?.[locale]?.h1 || PILLARS[s as PillarSlug]?.en.h1}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
