import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCatalog } from '@/lib/api';
import { ProductCard } from '@/components/products/ProductCard';
import {
  PILLARS,
  PILLAR_OG_IMAGE,
  CATEGORY_PARENT,
  CATEGORY_CHILDREN,
  TOP_LEVEL_PILLAR_SLUGS,
  NOISE_BARRIER_SLUG,
  categoryHref,
  type CategoryCopySlug,
} from '@/lib/pillars';
import { ogImageEntry } from '@/lib/seo-utils';
import { COMPANY } from '@/lib/company';

/**
 * 品类页模板（供两处复用）：
 * 1. app/[locale]/[category] —— gabion / fence / wire-mesh / slope-protection /
 *    natural-disaster-protection 五个动态路由；
 * 2. app/[locale]/noise-barrier/products —— 声屏障的产品分类页。
 *
 * 声屏障为什么要单独一条路由：它在 /noise-barrier 有一张定制落地页
 * （工厂实力、项目案例、报价表单），静态段优先于动态段，所以不能塞进
 * [category]，否则那张落地页会把品类页吃掉。
 */

const BASE_URL = COMPANY.siteUrl;

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
  // 声屏障专用：分类页 → 落地页的入口
  overviewTitle: {
    en: 'How we build and deliver them',
    zh: '我们怎么生产和交付',
    vi: 'Chúng tôi sản xuất và giao hàng thế nào',
    th: 'เราผลิตและส่งมอบอย่างไร',
  },
  overviewDesc: {
    en: 'Factory photos, delivered project cases, the full acoustic spec sheet and the quote form are on the solutions page.',
    zh: '工厂实拍、已交付的项目案例、完整声学参数表与报价表单，都在方案页里。',
    vi: 'Ảnh nhà máy, dự án đã bàn giao, bảng thông số âm học đầy đủ và form báo giá nằm ở trang giải pháp.',
    th: 'ภาพโรงงาน โครงการที่ส่งมอบแล้ว ตารางสเปกเสียงเต็ม และแบบฟอร์มขอใบเสนอราคา อยู่ในหน้าของโซลูชัน',
  },
  overviewCta: {
    en: 'Open the noise barrier overview',
    zh: '查看声屏障方案页',
    vi: 'Xem trang giải pháp chắn âm',
    th: 'ดูหน้าภาพรวมกำแพงกันเสียง',
  },
} as const;

const CATEGORY_NAME: Record<string, Record<string, string>> = {
  'natural-disaster-protection': { en: 'Natural Disaster Protection', zh: '自然灾害防护网', vi: 'Phòng chống thiên tai', th: 'ป้องกันภัยพิบัติ' },
  'slope-protection': { en: 'Slope Protection', zh: '边坡防护', vi: 'Bảo vệ mái dốc', th: 'การป้องกันลาดชัน' },
  gabion: { en: 'Gabion', zh: '石笼网', vi: 'Rọ đá', th: 'เกเบี้ยน' },
  fence: { en: 'Fencing', zh: '护栏网', vi: 'Hàng rào', th: 'รั้ว' },
  'wire-mesh': { en: 'Wire Mesh', zh: '丝网类', vi: 'Lưới thép', th: 'ลวดตาข่าย' },
  'noise-barrier': { en: 'Noise Barriers', zh: '声屏障', vi: 'Tường chắn âm', th: 'กำแพงกันเสียง' },
};

function t(key: keyof typeof LABEL, locale: string): string {
  const entry = LABEL[key] as Record<string, string>;
  return entry[locale] || entry.en;
}

/** 品类名（供页面与面包屑共用） */
export function categoryName(slug: string, locale: string): string {
  return CATEGORY_NAME[slug]?.[locale] || CATEGORY_NAME[slug]?.en || slug;
}

export function buildCategoryMetadata(slug: CategoryCopySlug, locale: string): Metadata {
  const copy = PILLARS[slug]?.[locale] ?? PILLARS[slug]?.en;
  if (!copy) return {};

  // 声屏障分类页挂在 /noise-barrier/products 下，不能直接用 `/${slug}`
  const path = slug === NOISE_BARRIER_SLUG ? '/noise-barrier/products' : `/${slug}`;
  const img = PILLAR_OG_IMAGE[slug];
  const ogImage = img ? ogImageEntry(img, copy.metaTitle) : undefined;

  return {
    title: copy.metaTitle,
    description: copy.metaDesc,
    alternates: {
      canonical: `${BASE_URL}/${locale}${path}`,
      languages: {
        'x-default': `${BASE_URL}/en${path}`,
        // 只能用 4 个全量语种——partialLocales（ms / ar）没有这些页面，
        // /ms/fence 这类地址被 proxy.ts 308 回 /en，写进 hreflang 会让整簇失效。
        ...Object.fromEntries(
          (['en', 'zh', 'vi', 'th'] as const).map((l) => [l, `${BASE_URL}/${l}${path}`])
        ),
      },
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDesc,
      url: `${BASE_URL}/${locale}${path}`,
      siteName: 'Angu Wire Mesh',
      type: 'website',
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.metaTitle,
      description: copy.metaDesc,
      ...(ogImage ? { images: [ogImage.url] } : {}),
    },
  };
}

export async function CategoryPageView({
  slug,
  locale,
}: {
  slug: CategoryCopySlug;
  locale: string;
}) {
  const copy = PILLARS[slug]?.[locale] ?? PILLARS[slug]?.en;
  if (!copy) notFound();

  const { products } = await getCatalog({ light: true });
  const children = CATEGORY_CHILDREN[slug] || [];
  const isParent = children.length > 0;
  const parentSlug = CATEGORY_PARENT[slug];

  // 父级枢纽页汇总全部子类的产品；叶级页只展示本类产品。
  // 同一个产品在树上只有一条路径，父级页只是聚合视图，不产生第二个归属。
  const list = isParent
    ? products.filter((p) => children.includes(p.categorySlug))
    : products.filter((p) => p.categorySlug === slug);

  const nameOf = (s: string) => categoryName(s, locale);
  const name = nameOf(slug);
  const selfHref = categoryHref(locale, slug);

  // 关联区块：子页面先给同级兄弟，再给其余一级品类；一级页面只给其余一级品类。
  // 父品类不出现在自己的子页面「其他产品线」里，避免层级表达前后矛盾。
  const related: string[] = [
    ...(parentSlug ? (CATEGORY_CHILDREN[parentSlug] || []).filter((s) => s !== slug) : []),
    ...TOP_LEVEL_PILLAR_SLUGS.filter((s) => s !== slug && s !== parentSlug),
  ];

  // 面包屑层级：子类多一跳父级，Schema 与可见导航必须一致
  const crumbs = [
    { name: t('home', locale), item: `${BASE_URL}/${locale}` },
    { name: t('products', locale), item: `${BASE_URL}/${locale}/products` },
    ...(parentSlug ? [{ name: nameOf(parentSlug), item: categoryHref(locale, parentSlug) }] : []),
    { name, item: selfHref },
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
          url: categoryHref(locale, s),
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
                <Link href={categoryHref(locale, parentSlug)} className="hover:text-white">{nameOf(parentSlug)}</Link>
                <span className="mx-2 text-slate-500" aria-hidden="true">/</span>
              </>
            )}
            <span className="text-white">{name}</span>
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
              const subCopy = PILLARS[s as CategoryCopySlug]?.[locale] || PILLARS[s as CategoryCopySlug]?.en;
              return (
                <Link
                  key={s}
                  href={categoryHref(locale, s)}
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
          <h2 className="text-2xl font-bold text-slate-900">{isParent ? t('products', locale) : name}</h2>
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
                    <Link href={categoryHref(locale, s)} className="text-xs text-blue-600 hover:underline">
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

      {/* 声屏障专属：分类页只解决「选型」，工厂/案例/报价在落地页。
          落地页此前唯一的入口是分类菜单，菜单改指分类页后会丢掉内链，
          所以这里必须显式回链。 */}
      {slug === NOISE_BARRIER_SLUG && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-slate-900">{t('overviewTitle', locale)}</h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t('overviewDesc', locale)}</p>
            </div>
            <Link
              href={`/${locale}/noise-barrier`}
              className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              {t('overviewCta', locale)}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      )}

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

      {/* Related product lines — 给品类页互相加权，避免孤岛 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('related', locale)}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map((s) => (
            <Link key={s} href={categoryHref(locale, s)}
              className="group block p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all">
              <div className="font-semibold text-slate-900 group-hover:text-blue-600">
                {nameOf(s)}
              </div>
              <div className="text-sm text-slate-500 mt-1 line-clamp-2">
                {PILLARS[s as CategoryCopySlug]?.[locale]?.h1 || PILLARS[s as CategoryCopySlug]?.en.h1}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
