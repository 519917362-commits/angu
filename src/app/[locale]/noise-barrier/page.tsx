import type { Metadata } from 'next';
import { routing } from '@/lib/routing';
import { getSiteConfig, getCatalog, getNoiseBarrierData, getBlogPosts } from '@/lib/api';
import { HeroSection } from '@/components/noise-barrier/HeroSection';
import { TrustBadges } from '@/components/noise-barrier/TrustBadges';
import { ValueProposition } from '@/components/noise-barrier/ValueProposition';
import { ProductMatrix } from '@/components/noise-barrier/ProductMatrix';
import { TechSpecSection } from '@/components/noise-barrier/TechSpecSection';
import { SocialProof } from '@/components/noise-barrier/SocialProof';
import { FaqSection } from '@/components/noise-barrier/FaqSection';
import { CtaSection } from '@/components/noise-barrier/CtaSection';
import { CompanyStrength } from '@/components/noise-barrier/CompanyStrength';
import { ProjectGallery } from '@/components/noise-barrier/ProjectGallery';
import { QuoteForm } from '@/components/noise-barrier/QuoteForm';
import { RelatedReading } from '@/components/noise-barrier/RelatedReading';
import { NoiseBarrierClient } from '@/components/noise-barrier/NoiseBarrierClient';
import { whatsappNumber, zaloHref, lineId, facebookUrl } from '@/lib/channels';
import { getNoiseBarrierFaqs } from '@/lib/noiseBarrierFaq';
import { pickLocale } from '@/lib/i18n';

// 页面级 revalidate：与 fetch 级的 REVALIDATE_SECONDS 保持一致。
// stale-while-revalidate 的窗口在 next.config.ts 的 expireTime 里配
// （Next 16 已废弃路由级 expireTime，写在这里不生效）。
export const revalidate = 300;


export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const seoContent: Record<string, { title: string; description: string; keywords: string }> = {
  vi: {
    title: 'Tường Chắn Âm & Tấm Chắn Âm Đường Cao Tốc | Angu',
    description: 'Nhà sản xuất tường chắn âm và tấm chắn âm cho đường cao tốc, khu công nghiệp, cầu và metro: STC 32–34, NRC 0.85, mạ kẽm nhúng nóng 15+ năm. Giá xuất xưởng, giao cảng Hồ Chí Minh và Hải Phòng.',
    keywords: 'tường chắn âm, tấm chắn âm, tấm cách âm, tường cách âm, tấm tiêu âm, chắn ồn đường cao tốc, giảm tiếng ồn nhà máy, cách âm cầu, cách âm metro, rào chắn tiếng ồn, tấm hấp âm kim loại, mạ kẽm nhúng nóng, panel chắn âm, xuất khẩu Việt Nam, nhà sản xuất tường chắn âm Trung Quốc, giá tường chắn âm, báo giá tấm chắn âm, STC 32–34, NRC 0.85, MOQ 50m2, FOB CIF Hải Phòng Hồ Chí Minh',
  },
  th: {
    title: 'กำแพงกันเสียง & แผงกั้นเสียง ทางหลวง | Angu',
    description: 'ผู้ผลิตกำแพงกันเสียงและแผงกั้นเสียงสำหรับทางหลวง นิคมอุตสาหกรรม สะพาน และรถไฟฟ้า: STC 32–34, NRC 0.85, ชุบกัลวาไนซ์ร้อนอายุ 15+ ปี ราคาหน้าโรงงาน ส่งท่าเรือกรุงเทพฯ และแหลมฉบัง',
    keywords: 'กำแพงกันเสียง, แผงกั้นเสียง, แผงซับเสียง, แผงดูดซับเสียง, กำแพงกันเสียงทางด่วน, ลดเสียงโรงงาน, กั้นเสียงสะพาน, กั้นเสียงรถไฟฟ้า, รั้วกันเสียง, แผงกั้นเสียงโลหะ, ชุบกัลวาไนซ์ร้อน, แผงกั้นเสียงอลูมิเนียม, แผงกั้นเสียงไฟเบอร์กลาส, ส่งออกประเทศไทย, โรงงานกำแพงกันเสียงจีน, ราคากำแพงกันเสียง, STC 32–34, NRC 0.85, MOQ 50ตรม, FOB CIF แหลมฉบัง กรุงเทพ',
  },
  en: {
    title: 'Noise Barrier Manufacturer — Highway, Rail & Bridge | Angu',
    description: 'Noise barrier manufacturer: highway sound walls, industrial acoustic barriers, bridge & metro panels. Hot-dip galvanized, STC 32–34, NRC 0.85. Factory-direct, ships to Vietnam & Thailand.',
    keywords: 'noise barrier, sound barrier, acoustic barrier, sound wall, noise wall, acoustic panel, sound absorbing panel, highway noise barrier, industrial noise barrier, bridge noise barrier, metro noise barrier, reflective noise barrier, absorptive noise barrier, hot-dip galvanized noise barrier, aluminum noise barrier, fiberglass acoustic panel, noise barrier manufacturer China, noise barrier supplier, noise barrier price, STC 32–34, NRC 0.85, MOQ 100sqm, FOB CIF Vietnam Thailand Southeast Asia',
  },
  zh: {
    title: '公路与工业声屏障生产厂家 — 中国工厂直供 | 安固丝网',
    description: '高品质声屏障生产厂家：公路声屏障、工厂降噪墙、桥梁地铁隔音板。热镀锌防腐，STC 32–34，NRC 0.85。工厂直供价，出口越南泰国。',
    keywords: '声屏障, 隔音屏障, 隔音墙, 声屏障厂家, 公路声屏障, 高速声屏障, 工厂声屏障, 工厂降噪, 桥梁声屏障, 地铁声屏障, 反射型声屏障, 吸声型声屏障, 热镀锌声屏障, 铝板声屏障, 玻璃钢声屏障, 声屏障价格, 声屏障报价, 声屏障出口, 越南, 泰国, 东南亚, STC 32–34, NRC 0.85, MOQ 100平方米',
  },
  ms: {
    title: 'Penghadang Bunyi Lebuh Raya & Industri | Angu',
    description: 'Pengeluar penghadang bunyi: dinding bunyi lebuh raya, penghadang akustik industri, panel jambatan & metro. Galvani hot-dip, STC 32–34, NRC 0.85. Harga terus kilang.',
    keywords: 'penghadang bunyi, dinding bunyi, penghadang akustik, panel akustik, penghadang bunyi lebuh raya, penghadang bunyi industri, penghadang bunyi jambatan, penghadang bunyi metro, galvanis hot-dip, penghadang bunyi Malaysia, pembekal penghadang bunyi, harga penghadang bunyi, STC 32–34, NRC 0.85, MOQ 50m2, FOB CIF Pelabuhan Klang',
  },
  ar: {
    title: 'حواجز صوتية للطرق السريعة والمناطق الصناعية | Angu',
    description: 'مصنّع حواجز صوتية: جدران عازلة للطرق السريعة، حواجز أكوستيك صناعية، ألواح للجسور والمترو. جلفنة بالغمس الساخن، STC 32–34، NRC 0.85. أسعار المصنع.',
    keywords: 'حاجز صوتي, جدار عازل للصوت, حاجز أكوستيك, لوح ماص للصوت, حواجز صوتية للطرق, عزل صوت المصانع, حاجز صوتي للجسور, حاجز صوتي للمترو, جلفنة بالغمس الساخن, حواجز صوتية السعودية الإمارات, مصنع حواجز صوتية, سعر حاجز صوتي, STC 32–34, NRC 0.85, MOQ 50m2, FOB CIF جبل علي',
  },
};


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = seoContent[locale] || seoContent.en;

  // 优先读管理后台配置的 SEO（site_config），未配置时回退硬编码
  let title = seo.title;
  let description = seo.description;
  let keywords = seo.keywords;
  try {
    const siteCfg = await getSiteConfig();
    const cfg = siteCfg?.config || {};
    const pick = (key: string): string | undefined => {
      const v = cfg[key];
      if (!v) return undefined;
      const t = (v as Record<string, string | undefined>)[locale] || (v as Record<string, string | undefined>).en;
      return t ? String(t) : undefined;
    };
    title = pick('noise_barrier_seo_title') || seo.title;
    description = pick('noise_barrier_seo_description') || seo.description;
    keywords = pick('noise_barrier_seo_keywords') || seo.keywords;
  } catch { /* fallback to hardcoded */ }

  const ogLocaleMap: Record<string, string> = {
    en: 'en_US', zh: 'zh_CN', vi: 'vi_VN', th: 'th_TH', ms: 'ms_MY', ar: 'ar_AE',
  };
  const ogLocale = ogLocaleMap[locale] || 'en_US';
  const altLocales = Object.entries(ogLocaleMap).filter(([l]) => l !== locale);

  return {
    title,
    description,
    keywords,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://www.angumesh.com/${locale}/noise-barrier`,
      languages: Object.fromEntries([
        ['x-default', 'https://www.angumesh.com/en/noise-barrier'],
        ...Object.keys(ogLocaleMap).map((l) => [l, `https://www.angumesh.com/${l}/noise-barrier`]),
      ]),
    },
    openGraph: {
      title,
      description,
      url: `https://www.angumesh.com/${locale}/noise-barrier`,
      type: 'website',
      locale: ogLocale,
      alternateLocale: altLocales.map(([, l]) => l),
      images: [{ url: 'https://www.angumesh.com/images/products/highway-noise-barrier.jpg', width: 1200, height: 630, alt: 'Angu Noise Barrier Solutions' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.angumesh.com/images/products/highway-noise-barrier.jpg'],
    },
  };
}

export default async function NoiseBarrierPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const noiseSlugs = [
    'highway-noise-barrier-3m',
    'bridge-noise-barrier',
    'rail-transit-noise-barrier',
    'metal-upright-noise-barrier',
    'metal-bent-curved-noise-barrier',
    'transparent-acrylic-glass-noise-barrier',
  ];

  // Parallel data fetching
  const [catalog, siteConfig, nbData, blogPosts] = await Promise.all([
    // 落地页只渲染产品名/图/短描述，不读正文/规格/FAQ 大字段
    getCatalog({ light: true }),
    getSiteConfig(),
    getNoiseBarrierData(),
    // 技术文章：用于「技术资料」区块（此前落地页一条博客链接都没有）
    getBlogPosts().catch(() => []),
  ]);

  const noiseProducts = (catalog?.products || []).filter((p: any) => noiseSlugs.includes(p.slug));

  // 品类下未进「推荐产品」的其余型号。原来只硬编码了 6 个 slug，
  // 工厂隔音墙 / 设备隔声罩 / 全封闭式这三款（恰是工业客户最常要的）
  // 在落地页上完全不可达。
  const moreProducts = (catalog?.products || [])
    // 注意：/api/catalog 返回的是驼峰 categorySlug，不是数据库列名 category_slug。
    // 写成 category_slug 会静默筛出 0 条 —— 这种错不报错，只是区块不渲染。
    .filter((p: any) => (p.categorySlug || p.category_slug) === 'noise-barrier' && !noiseSlugs.includes(p.slug))
    .map((p: any) => ({
      slug: p.slug,
      name: p.names?.[locale] || p.names?.en || p.name_en || p.slug,
    }))
    .filter((p: { name: string }) => !!p.name);

  // 阅读顺序：先按内容策划的优先级，再补齐同分类其它文章
  const READING_ORDER = [
    'noise-barrier-types-comparison',
    'noise-barrier-cost-per-square-meter',
    'noise-barrier-insertion-loss-design',
    'noise-barrier-installation-guide',
  ];
  // 走 pickLocale 而不是 `||` —— 4 篇文章的 title_vi / content_vi 在库里是一个
  // 单引号占位符，`||` 判不出来，会把 `'` 当成标题渲染到区块里。
  const pickField = (post: any, key: string): string => pickLocale(post, key, locale);
  const readingPosts = (blogPosts || [])
    .filter((p: any) => (p.category_slug || p.categorySlug) === 'noise-barrier')
    .sort((a: any, b: any) => {
      const ia = READING_ORDER.indexOf(a.slug);
      const ib = READING_ORDER.indexOf(b.slug);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    })
    .slice(0, 4)
    .map((p: any) => {
      const body = pickField(p, 'content').replace(/[#>*_`\[\]()]/g, ' ');
      const words = body.split(/\s+/).filter(Boolean).length;
      return {
        slug: p.slug,
        title: pickField(p, 'title'),
        abstract: pickField(p, 'abstract'),
        // 中文/泰文按字符估（~450 字/分钟），拉丁语系按词估（~200 词/分钟）
        minutes: Math.max(3, Math.round(['zh', 'th'].includes(locale) ? body.length / 450 : words / 200)),
      };
    });

  // Get phone from site config
  let phone = '8618803189797';
  if (siteConfig?.config?.phone) {
    const rawPhone = typeof siteConfig.config.phone === 'object'
      ? (siteConfig.config.phone as any)[locale] || (siteConfig.config.phone as any).en || ''
      : siteConfig.config.phone;
    if (rawPhone) phone = rawPhone;
  }

  // Get hero image from config or fallback
  const heroImage = nbData?.config?.noise_hero_image?.[locale as keyof typeof nbData.config.noise_hero_image]
    || nbData?.config?.noise_hero_image?.en
    || undefined;

  const factoryImages = nbData?.factoryImages || [];
  const certifications = nbData?.certifications || [];
  const projects = nbData?.projects || [];

  // Build contact info from site_config
  const cfg = siteConfig?.config || ({} as Record<string, any>);
  const getCfg = (key: string): string => {
    const v = cfg[key];
    if (!v) return '';
    if (typeof v === 'object') return v[locale] || v.en || '';
    return String(v);
  };
  const contactInfo = {
    email: getCfg('email') || 'annie@angumesh.com',
    phone: getCfg('phone') || '+86 188 0318 9797',
    whatsapp: whatsappNumber(getCfg('whatsapp') || getCfg('phone')) || '8618803189797',
    facebook: facebookUrl(getCfg('facebook')),
    // Zalo / LINE 不再回落到手机号：Zalo 只支持 +84，LINE ID 也必须有真实账号。
    // 后台没配就是空字符串，下游组件据此隐藏入口（见 src/lib/channels.ts）。
    // 注意 Zalo 现在也接受名片短链（zaloapp.com/qr/p/xxx），见 zaloHref。
    zalo: zaloHref(getCfg('zalo')),
    lineId: lineId(getCfg('line_id')),
    locale,
    qrWhatsApp: getCfg('qr_whatsapp') || '',
    qrZalo: getCfg('qr_zalo') || '',
    qrLine: getCfg('qr_line') || '',
    qrFacebook: getCfg('qr_facebook') || '',
  };

  // FAQ JSON-LD
  // FAQ 文案与页面渲染共用 src/lib/noiseBarrierFaq.ts，避免结构化数据与可见内容不一致
  const faqItems = getNoiseBarrierFaqs(locale);
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  // BreadcrumbList JSON-LD
  const breadcrumbLabels: Record<string, string> = {
    en: 'Noise Barrier', zh: '声屏障', vi: 'Tường Chắn Âm', th: 'กำแพงกันเสียง',
    ms: 'Penghadang Bunyi', ar: 'حاجز صوتي',
  };
  const homeLabels: Record<string, string> = {
    en: 'Home', zh: '首页', vi: 'Trang chủ', th: 'หน้าแรก',
    ms: 'Laman Utama', ar: 'الرئيسية',
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeLabels[locale] || homeLabels.en, item: `https://www.angumesh.com/${locale}` },
      { '@type': 'ListItem', position: 2, name: breadcrumbLabels[locale] || breadcrumbLabels.en, item: `https://www.angumesh.com/${locale}/noise-barrier` },
    ],
  };

  // Product JSON-LD — list noise barrier products
  // NOTE: no price (B2B) and no real reviews, so we use @type Thing
  // instead of Product. Google requires offers/review/aggregateRating on
  // Product — omitting them triggers a "severe issue" in Search Console.
  const productLd = noiseProducts.map((p: any) => {
    const firstImage = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null;
    return {
      '@type': 'Thing',
      name: p.name?.[locale] || p.name?.en || p.slug,
      description: p.short_description?.[locale] || p.short_description?.en || '',
      image: firstImage ? `https://www.angumesh.com${firstImage}` : undefined,
      category: 'Noise Barrier',
      url: `https://www.angumesh.com/${locale}/products/${p.slug}`,
    };
  });
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Noise Barrier Products',
    itemListElement: productLd.map((item: any, i: number) => ({
      '@type': 'ListItem',
      position: i + 1,
      item,
    })),
  };

  // 项目案例 JSON-LD
  // schema.org 没有 CaseStudy 这个类型，之前用 Article 代替其实是错的：
  // Article 富结果要求 author + datePublished，而项目库只有 title/location/spec
  // 和一个创建时间，编不出「发表日期」，Search Console 只会一直报缺字段。
  // 改成 CreativeWork —— 同样能表达「某地交付了什么规格的项目」，
  // 不假装是文章，也就不欠 Google 那两个字段。
  // 不写 Review / aggregateRating —— 没有真实评价就不虚构评分。
  const pick = (rec: Record<string, string | undefined>, key: string) =>
    rec[`${key}_${locale}`] || rec[`${key}_en`] || '';
  const caseStudyLd = projects.map((p) => {
    const rec = p as unknown as Record<string, string | undefined>;
    const title = pick(rec, 'title');
    const location = pick(rec, 'location');
    const spec = pick(rec, 'spec');
    const img = p.image_url;
    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: `${title} — ${location}`,
      description: spec,
      about: { '@type': 'Product', name: 'Noise Barrier', category: 'Noise Barrier' },
      locationCreated: { '@type': 'Place', name: location },
      ...(img ? { image: `https://www.angumesh.com${img}` } : {}),
      publisher: { '@id': 'https://www.angumesh.com/#organization' },
      mainEntityOfPage: `https://www.angumesh.com/${locale}/noise-barrier#projects`,
    };
  });

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      {caseStudyLd.map((ld, i) => (
        <script
          key={`case-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}

      {/* 1. Hero — pure display, no form */}
      <HeroSection locale={locale} heroImage={heroImage} />

      {/* 2. Company Strength — factory images + stats + certifications */}
      <CompanyStrength locale={locale} factoryImages={factoryImages} certifications={certifications} />

      {/* 3. Project Gallery — real case photos from admin */}
      <ProjectGallery locale={locale} projects={projects} />

      {/* 4. Trust Badges */}
      <TrustBadges locale={locale} />

      {/* 5. Value Proposition */}
      <ValueProposition locale={locale} />

      {/* 6. Product Matrix */}
      <ProductMatrix locale={locale} products={noiseProducts} moreProducts={moreProducts} />

      {/* 7. Quote Form — 上移到产品矩阵之后。
          原来它排在规格表之后（桌面 6085 / 8882 ≈ 68%，移动 11712 / 15203 ≈ 77%），
          中段近万像素没有一个表单，全靠吸底条兜底。产品看完就是最自然的
          "报价"时机，规格表留给真正要核参数的人往下翻。 */}
      <QuoteForm locale={locale} whatsapp={contactInfo.whatsapp} email={contactInfo.email} />

      {/* 8. Tech Spec */}
      <TechSpecSection locale={locale} />

      {/* 8b. 技术文章 —— 原本这里一条博客链接都没有。
          放在规格表之后：往下翻到这个位置的人，正是想深挖参数和造价的，
          给出四条能直接解答「选哪种 / 多少钱 / 怎么设计 / 怎么装」的长文。 */}
      <RelatedReading locale={locale} posts={readingPosts} />

      {/* 9. Social Proof */}
      <SocialProof locale={locale} />

      {/* 10. FAQ */}
      <FaqSection locale={locale} />

      {/* 11. CTA */}
      <CtaSection
        locale={locale}
        whatsapp={contactInfo.whatsapp}
        email={contactInfo.email}
        zalo={contactInfo.zalo}
        lineId={contactInfo.lineId}
      />

      {/* Client components: FloatingContact + ExitIntentPopup */}
      <NoiseBarrierClient locale={locale} contactInfo={contactInfo} />
    </main>
  );
}
