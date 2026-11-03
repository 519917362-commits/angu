import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getBlogPost, getBlogPosts, getCatalog} from '@/lib/api';
import { tLabel, pickLocale, dateLocale } from '@/lib/i18n';
import {generatePageMeta} from '@/lib/seo-utils';
import {renderMarkdown, type ProductLinkContext} from '@/lib/markdown';
import {availableBlogLocales, hasBlogTranslation} from '@/lib/blog-locales';
import {getBlogProductLinks, MAX_INLINE_PRODUCT_LINKS, RELATED_PRODUCTS_LABEL} from '@/lib/blog-product-links';
import {localeHref} from '@/lib/routing';
import type {Product} from '@/types/product';

// 页面级 revalidate：与 fetch 级的 REVALIDATE_SECONDS 保持一致。
// stale-while-revalidate 的窗口在 next.config.ts 的 expireTime 里配
// （Next 16 已废弃路由级 expireTime，写在这里不生效）。
export const revalidate = 300;


interface Props {
  params: Promise<{locale: string; slug: string}>;
}

/**
 * SQLite 的 CURRENT_TIMESTAMP 存成 "YYYY-MM-DD HH:MM:SS"（UTC，无时区后缀），
 * 直接写进 schema.org 会被判为非 ISO 8601（dateModified 与 datePublished 格式不一致），
 * 这里统一补成带 T 与 Z 的 ISO 串。
 */
function toIsoUtc(value?: string | null): string | undefined {
  if (!value) return undefined;
  const s = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(s)) {
    return `${s.replace(' ', 'T')}.000Z`;
  }
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

/**
 * 相关文章打分用的词元。
 * 英文按整词（≥4 字母，去掉 the/and/how 这类虚词），中文按二字滑窗——
 * 中文没有空格，整句比对永远不重合，只有切成 bigram 才能算出「石笼」「防护」这种共享主题。
 */
const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'from', 'that', 'this', 'your', 'you', 'are',
  'how', 'what', 'when', 'why', 'vs', 'guide', 'best', 'top', 'buy', 'into',
  'can', 'does', 'not', 'but', 'its', 'their', 'about', 'than', 'then',
]);

function titleTokens(t: string): string[] {
  const out = new Set<string>();
  for (const w of (t || '').toLowerCase().split(/[^a-z0-9\u4e00-\u9fff]+/)) {
    if (!w) continue;
    if (/^[a-z0-9]+$/.test(w)) {
      if (w.length >= 4 && !STOP_WORDS.has(w)) out.add(w);
    } else if (w.length >= 2) {
      for (let i = 0; i + 2 <= w.length; i++) out.add(w.slice(i, i + 2));
    }
  }
  return [...out];
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const post = await getBlogPost(slug);
  if (!post) return {title: tLabel('文章未找到', 'Post Not Found', locale)};
  // pickLocale 会把「占位符级」的本地化值当成缺失、回落英文（见 lib/i18n.ts）
  const title = pickLocale(post, 'title', locale);
  const abstract = pickLocale(post, 'abstract', locale);
  const description = abstract
    ?.replace(/[#*`\[\]\|\-]/g, '')
    .replace(/\n+/g, ' ')
    .trim()
    .slice(0, 160) || 'Industry insights on wire mesh, gabion construction, and rockfall protection.';
  const seoTitle = pickLocale(post, 'seo_title', locale);
  // 后台标题可能自带品牌尾巴，先剥再拼，避免「… | Angu | Angu Wire Mesh」
  const cleanTitle = (seoTitle || title || 'Blog Post')
    .replace(/\s*[|｜]\s*(Angu(\s+Wire\s+Mesh)?|安固(丝网)?)\s*$/i, '')
    .trim();

  // hreflang 只能声明真有译文的语种。长文类文章多数只填了 en（部分连 zh 都有），
  // vi / th 的正文其实是英文回落；把这类语种写进 hreflang 会让整簇互指失效。
  const translatedLocales = availableBlogLocales(post);
  // 当前语种没有译文时，canonical 让给英文原版，避免英文正文被判重复内容
  const canonicalOverride = hasBlogTranslation(post, locale)
    ? undefined
    : `https://www.angumesh.com/en/blog/${slug}`;

  // 品牌尾巴按剩余长度条件拼接：SERP 只显示约 60 个字符，
  // 硬拼「| Angu」会把 9 篇文章的主题词（Cost / Comparison / Guide）挤出可见区，
  // 标题里出现两次品牌也不划算。超长时丢品牌，保留完整主题。
  const brandSuffix = locale === 'zh' ? '安固' : 'Angu';
  const titledWithBrand = `${cleanTitle} | ${brandSuffix}`;
  const finalTitle = titledWithBrand.length <= 62 ? titledWithBrand : cleanTitle;

  return generatePageMeta('blog', locale, `/${locale}/blog/${slug}`, {
    title: finalTitle,
    description,
    image: post.cover_image || undefined,
    altLocales: translatedLocales.length ? translatedLocales : ['en'],
    canonical: canonicalOverride,
    // 详情页之前在 og:type 里输出的是 website，LinkedIn / Facebook 据此按站点卡片渲染，
    // 不会显示文章标题层级与发布时间，分享点击率明显低于 article 卡片。
    ogType: 'article',
    publishedTime: toIsoUtc(post.publish_time),
    modifiedTime: toIsoUtc(post.updated_at),
  });
}

export default async function BlogDetailPage({params}: Props) {
  const {locale, slug} = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

const title = pickLocale(post, 'title', locale);
const content = pickLocale(post, 'content', locale);
const abstract = pickLocale(post, 'abstract', locale);
  const publishDate = post.publish_time
    ? new Date(post.publish_time).toLocaleDateString(dateLocale(locale), {year: 'numeric', month: 'long', day: 'numeric'})
    : '';
  const seoTitle = pickLocale(post, 'seo_title', locale);
const seoDesc = pickLocale(post, 'seo_description', locale);
const keywords = locale === 'zh' ? post.seo_keywords_zh : locale === 'vi' ? (post.seo_keywords_vi || post.seo_keywords_en) : locale === 'th' ? (post.seo_keywords_th || post.seo_keywords_en) : post.seo_keywords_en;
  const canonicalUrl = `https://www.angumesh.com/${locale}/blog/${slug}`;

  // 阅读时间估算（中英文均按字符数粗估）
  const contentText = content || '';
  const readingMinutes = Math.max(1, Math.ceil(contentText.length / (locale === 'zh' ? 400 : 800)));

  // 相关文章（同语言、排除当前、最多 3 篇）
  const allPosts = await getBlogPosts();
  // 旧写法是 allPosts.filter(...).slice(0, 3)，等于「最新三篇」：
  // 一篇石笼施工指南的页尾挂着声屏障选型，锚文本和正文毫无关系，读者点进去也不是他要的。
  // 现按「同品类 3 分 / SEO 关键词重合 2 分 / 标题词重合 1 分」排序，
  // 并列时优先该语种真有译文的，再按发布时间；全部分数为 0 才退回最新（下方标题随之改为「最新文章」）。
  const postKeywords = new Set(
    (post.seo_keywords_en || '').toLowerCase().split(/[,;，；]/).map((k) => k.trim()).filter(Boolean)
  );
  const postTitleTokens = new Set(titleTokens(post.title_en || ''));
  const scoredRelated = allPosts
    .filter((p) => p.id !== post.id && p.status === 'published')
    .map((p) => {
      let score = 0;
      if (p.category_slug && p.category_slug === post.category_slug) score += 3;
      for (const k of (p.seo_keywords_en || '').toLowerCase().split(/[,;，；]/)) {
        const kk = k.trim();
        if (kk && postKeywords.has(kk)) score += 2;
      }
      for (const t of titleTokens(p.title_en || '')) {
        if (postTitleTokens.has(t)) score += 1;
      }
      return {post: p, score};
    })
    .sort((a, b) =>
      b.score - a.score ||
      Number(hasBlogTranslation(b.post, locale)) - Number(hasBlogTranslation(a.post, locale)) ||
      String(b.post.publish_time || '').localeCompare(String(a.post.publish_time || ''))
    );
  const related = scoredRelated.slice(0, 3).map((x) => x.post);
  const relatedIsRelevant = (scoredRelated[0]?.score ?? 0) > 0;

  // ── 产品内链：正文插链 + 页尾卡片 ──
  // 9 篇文章此前一个产品链接都没有，访客读完深度文章无处可去，Google 也收不到权重传递。
  const {rules: productLinkRules, related: relatedProductSlugs} = getBlogProductLinks(slug);
  let catalogProducts: Product[] = [];
  try {
    const {products} = await getCatalog();
    catalogProducts = products;
  } catch {
    // 目录接口异常不能连累文章页渲染，退化成「无相关产品」即可
    catalogProducts = [];
  }
  const productBySlug = new Map(catalogProducts.map((p) => [p.slug, p]));
  // 每次渲染新建 ctx：used 集合必须按请求隔离，否则并发时会漏插。
  // 该语种没有正文译文时（vi / th 回落到英文）不插正文链——这些页面 canonical
  // 已经指向英文版，正文里再堆一层英文锚文本没有意义，只保留页尾产品卡。
  const productLinkCtx: ProductLinkContext | undefined = hasBlogTranslation(post, locale)
    ? {
        rules: productLinkRules,
        used: new Set<string>(),
        max: MAX_INLINE_PRODUCT_LINKS,
        hrefFor: (targetSlug) => localeHref(locale, `/products/${targetSlug}`),
      }
    : undefined;
  const relatedProducts = relatedProductSlugs
    .map((s) => productBySlug.get(s))
    .filter((p): p is Product => Boolean(p));
  const relatedProductsHeading = RELATED_PRODUCTS_LABEL[locale] || RELATED_PRODUCTS_LABEL.en;

  // ── JSON-LD Structured Data ──
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: tLabel('首页', 'Home', locale), item: `https://www.angumesh.com/${locale}`},
      {'@type': 'ListItem', position: 2, name: tLabel('博客', 'Blog', locale), item: `https://www.angumesh.com/${locale}/blog`},
      {'@type': 'ListItem', position: 3, name: title, item: canonicalUrl},
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: seoTitle || title,
    description: seoDesc || abstract?.slice(0, 160) || '',
    url: canonicalUrl,
    datePublished: toIsoUtc(post.publish_time),
    dateModified: toIsoUtc(post.updated_at) || toIsoUtc(post.publish_time),
    ...(post.cover_image
      ? {image: post.cover_image.startsWith('http') ? post.cover_image : `https://www.angumesh.com${post.cover_image}`}
      : {}),
    author: {
      '@type': 'Organization',
      name: 'Angu Wire Mesh',
      url: 'https://www.angumesh.com',
      sameAs: ['https://www.facebook.com/share/18mLHaLvMa/'],
    },
    publisher: {
      '@type': 'Organization',
      name: 'An Gu Wire Mesh Products Co., Ltd.',
      logo: {
        '@type': 'ImageObject',
        // Google 要求出版方 logo 至少 112×112，公开目录里只有 80×80 的 favicon 尺寸版本，
        // 会直接让 Article 富结果不可用，所以另出一份 512×512 专供结构化数据。
        url: 'https://www.angumesh.com/images/logo-512.png',
        width: 512,
        height: 512,
      },
      sameAs: ['https://www.facebook.com/share/18mLHaLvMa/'],
    },
    ...(keywords ? {keywords: keywords} : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  return (
    <>
      {/* ========== Structured Data ========== */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(articleSchema)}} />

      <div className="min-h-screen bg-slate-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="text-sm text-slate-500 flex items-center gap-2">
              <Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">
                {tLabel('首页', 'Home', locale)}
              </Link>
              <span>/</span>
              <Link href={`/${locale}/blog`} className="hover:text-blue-600 transition-colors">
                {tLabel('博客', 'Blog', locale)}
              </Link>
              <span>/</span>
              <span className="text-slate-900 truncate max-w-sm">{title}</span>
            </nav>
          </div>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <div className="mb-10">
            {publishDate && (
              <div className="text-sm text-slate-400 mb-4 flex items-center gap-3">
                <time dateTime={post.publish_time || undefined}>{publishDate}</time>
                <span aria-hidden="true">·</span>
                <span>{locale === 'zh' ? `${readingMinutes} 分钟阅读` : locale === 'vi' ? `${readingMinutes} phút đọc` : locale === 'th' ? `${readingMinutes} นาทีอ่าน` : `${readingMinutes} min read`}</span>
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
              {title}
            </h1>
            {seoDesc && (
              <p className="text-lg text-slate-500 leading-relaxed">{seoDesc}</p>
            )}
          </div>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="aspect-[21/9] bg-slate-100 rounded-2xl overflow-hidden mb-10 shadow-sm">
              <img
                src={post.cover_image}
                alt={title}
                width={840}
                height={360}
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-10">
            <div className="prose prose-slate max-w-none">
              {renderMarkdown(content, productLinkCtx)}
            </div>
          </div>

          {/* Related products —— 文章下的产品导流，同时建立 博客 → 产品 的内链 */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-lg font-bold text-slate-900 mb-6">{relatedProductsHeading}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rp) => {
                  const rpName = rp.names?.[locale] || rp.names?.en || rp.slug;
                  const rpImage = rp.images?.[0];
                  return (
                    <Link
                      key={rp.slug}
                      href={localeHref(locale, `/products/${rp.slug}`)}
                      className="group block bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-slate-50">
                        {rpImage ? (
                          <img
                            src={rpImage}
                            alt={rpName}
                            width={320}
                            height={240}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">
                            {rpName}
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 line-clamp-2">{rpName}</h4>
                        {/* 只留箭头，不写「View details」——整张卡片是一个链接，
                            任何额外文字都会被算进锚文本，稀释产品名 */}
                        <span className="mt-2 inline-flex items-center gap-1 text-xs text-blue-600 font-medium" aria-hidden="true">
                          →
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* 回链品类落地页 —— 这 4 篇声屏障长文此前一条都不指向 /noise-barrier，
              文章→产品页的内链是有的，但商业意图最强的那个页面一分权重都拿不到。
              按分类统一插入，新写的同分类文章自动带上，不用逐篇改正文。 */}
          {post.category_slug === 'noise-barrier' && (
            <Link
              href={localeHref(locale, '/noise-barrier')}
              className="mt-10 block rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6 sm:p-8 text-white hover:shadow-xl transition-shadow"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-300">
                {locale === 'zh' ? '声屏障' : locale === 'vi' ? 'Tường chắn âm' : locale === 'th' ? 'กำแพงกันเสียง' : locale === 'ms' ? 'Penghadang bunyi' : locale === 'ar' ? 'حاجز الضوضاء' : 'Noise barrier'}
              </p>
              <p className="mt-2 text-lg sm:text-xl font-bold leading-snug">
                {locale === 'zh'
                  ? '看实际型号与 FOB 参考价'
                  : locale === 'vi'
                  ? 'Xem các model thực tế và giá FOB tham khảo'
                  : locale === 'th'
                  ? 'ดูรุ่นจริงและราคา FOB อ้างอิง'
                  : locale === 'ms'
                  ? 'Lihat model sebenar dan harga FOB rujukan'
                  : locale === 'ar'
                  ? 'اطلع على الطرازات الفعلية وسعر FOB الاسترشادي'
                  : 'See the actual models and indicative FOB prices'}
              </p>
              <p className="mt-2 text-sm text-slate-300">
                {locale === 'zh'
                  ? '9 款在产型号、STC / NRC 实测参数、起订量与交期，一页看完。'
                  : locale === 'vi'
                  ? '9 mẫu đang sản xuất, thông số STC / NRC, MOQ và thời gian giao hàng trong một trang.'
                  : locale === 'th'
                  ? '9 รุ่นที่ผลิตอยู่ สเปค STC / NRC, MOQ และระยะเวลาจัดส่ง ครบในหน้าเดียว'
                  : locale === 'ms'
                  ? '9 model dalam pengeluaran, spesifikasi STC / NRC, MOQ dan masa penghantaran dalam satu halaman.'
                  : locale === 'ar'
                  ? '9 طرازات قيد الإنتاج، مواصفات STC / NRC، الحد الأدنى للطلب ومدة التسليم في صفحة واحدة.'
                  : 'Nine models in production, measured STC / NRC, MOQ and lead times — on one page.'}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-300">
                {locale === 'zh' ? '打开声屏障页' : locale === 'vi' ? 'Mở trang tường chắn âm' : locale === 'th' ? 'เปิดหน้ากำแพงกันเสียง' : locale === 'ms' ? 'Buka halaman penghadang bunyi' : locale === 'ar' ? 'افتح صفحة حاجز الضوضاء' : 'Open the noise barrier page'}
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          )}

          {/* Tags */}
          {keywords && (
            <div className="mt-8 flex flex-wrap gap-2">
              {keywords.split(',').map((kw, i) => (
                <span key={i} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
                  {kw.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Related Posts */}
          {related.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-6">{relatedIsRelevant ? tLabel('相关文章', 'Related Posts', locale) : tLabel('最新文章', 'Latest Articles', locale)}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map(rp => {
                  const rTitle = locale === 'zh' ? rp.title_zh : locale === 'vi' ? (rp.title_vi || rp.title_en) : locale === 'th' ? (rp.title_th || rp.title_en) : rp.title_en;
                  const rCover = rp.cover_image || '/images/products/gabion-box.jpg';
                  return (
                    <Link key={rp.id} href={`/${locale}/blog/${rp.slug}`} className="group block bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all">
                      <div className="aspect-[16/9] overflow-hidden">
                        <img src={rCover} alt={rTitle} width={300} height={169} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 line-clamp-2">{rTitle}</h4>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {tLabel('返回博客列表', 'Back to Blog', locale)}
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
