import type { Metadata } from 'next';
import { routing } from '@/lib/routing';
import { getSiteConfig, getCatalog, getNoiseBarrierData } from '@/lib/api';
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
import { NoiseBarrierClient } from '@/components/noise-barrier/NoiseBarrierClient';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const seoContent: Record<string, { title: string; description: string; keywords: string }> = {
  vi: {
    title: 'Tấm Cách Âm Đường Cao Tốc & Công Nghiệp — Nhà Máy Trực Tiếp Trung Quốc | Angu',
    description: 'Nhà sản xuất tấm cách âm chất lượng cao: tấm tiêu âm đường cao tốc, tường cách âm nhà máy, tấm chắn ồn cầu & metro. Mạ kẽm nhúng nóng, STC>38dB, NRC 0.85–0.95. Giá xuất xưởng, giao cảng Việt Nam.',
    keywords: 'tấm cách âm, vách cách âm, tường tiêu âm, tấm chắn ồn, tấm tiêu âm, chắn ồn đường cao tốc, giảm tiếng ồn nhà máy, cách âm cầu, cách âm metro, rào chắn tiếng ồn, tấm hấp âm kim loại, mạ kẽm nhúng nóng, tấm cách âm nhôm, tấm cách âm sợi thủy tinh, xuất khẩu Việt Nam, nhà sản xuất tấm cách âm Trung Quốc, giá tấm cách âm, báo giá tấm tiêu âm, STC 38dB, NRC 0.85, MOQ 500m2, FOB CIF Hải Phòng Hồ Chí Minh',
  },
  th: {
    title: 'แผงกั้นเสียงทางหลวงและอุตสาหกรรม — โรงงานโดยตรงจากจีน | Angu',
    description: 'ผู้ผลิตแผงกั้นเสียงคุณภาพสูง: แผงซับเสียงทางด่วน กำแพงกันเสียงโรงงาน แผงกั้นเสียงสะพานและรถไฟฟ้า ชุบกัลวาไนซ์ร้อน STC>38dB NRC 0.85–0.95 ราคาหน้าโรงงาน ส่งออกไทย',
    keywords: 'แผงกั้นเสียง, กำแพงกันเสียง, แผงซับเสียง, แผงดูดซับเสียง, กันเสียงทางด่วน, ลดเสียงโรงงาน, กั้นเสียงสะพาน, กั้นเสียงรถไฟฟ้า, รั้วกันเสียง, แผงกั้นเสียงโลหะ, ชุบกัลวาไนซ์ร้อน, แผงกั้นเสียงอลูมิเนียม, แผงกั้นเสียงไฟเบอร์กลาส, ส่งออกประเทศไทย, โรงงานแผงกั้นเสียงจีน, ราคาแผงกั้นเสียง, STC 38dB, NRC 0.85, MOQ 500ตรม, FOB CIF ลาดบัญชิดเกต',
  },
  en: {
    title: 'Highway & Industrial Noise Barrier Manufacturer — Direct Factory China | Angu',
    description: 'High-quality noise barrier manufacturer: highway sound barriers, industrial acoustic walls, bridge & metro noise panels. Hot-dip galvanized, STC>38dB, NRC 0.85–0.95. Factory-direct pricing, shipping to Vietnam & Thailand.',
    keywords: 'noise barrier, sound barrier, acoustic barrier, sound wall, noise wall, acoustic panel, sound absorbing panel, highway noise barrier, industrial noise barrier, bridge noise barrier, metro noise barrier, reflective noise barrier, absorptive noise barrier, hot-dip galvanized noise barrier, aluminum noise barrier, fiberglass acoustic panel, noise barrier manufacturer China, noise barrier supplier, noise barrier price, STC 38dB, NRC 0.85, MOQ 500sqm, FOB CIF Vietnam Thailand Southeast Asia',
  },
  zh: {
    title: '公路与工业声屏障生产厂家 — 中国工厂直供 | 安固丝网',
    description: '高品质声屏障生产厂家：公路声屏障、工厂降噪墙、桥梁地铁隔音板。热镀锌防腐，STC>38dB，NRC 0.85–0.95。工厂直供价，出口越南泰国。',
    keywords: '声屏障, 隔音屏障, 隔音墙, 声屏障厂家, 公路声屏障, 高速声屏障, 工厂声屏障, 工厂降噪, 桥梁声屏障, 地铁声屏障, 反射型声屏障, 吸声型声屏障, 热镀锌声屏障, 铝板声屏障, 玻璃钢声屏障, 声屏障价格, 声屏障报价, 声屏障出口, 越南, 泰国, 东南亚, STC 38dB, NRC 0.85, MOQ 500平方米',
  },
};

const faqJsonLd: Record<string, Array<{ q: string; a: string }>> = {
  vi: [
    { q: 'Thời gian giao hàng đến Việt Nam là bao lâu?', a: 'Từ 10–15 ngày sản xuất + 7–14 ngày vận chuyển biển đến cảng Hồ Chí Minh hoặc Hải Phòng. Tổng thời gian thực tế khoảng 20–30 ngày kể từ khi xác nhận đơn.' },
    { q: 'Có hỗ trợ bản vẽ CAD và tính toán kết cấu không?', a: 'Có. Chúng tôi cung cấp miễn phí bản vẽ CAD, tính toán tải trọng gió, và phân tích kết cấu cho dự án của bạn.' },
    { q: 'Báo giá bao gồm những gì?', a: 'Báo giá FOB hoặc CIF bao gồm: tấm cách âm + trụ H + đế bản + bu lông + gioăng cao su.' },
    { q: 'Số lượng đặt hàng tối thiểu (MOQ) là bao nhiêu?', a: 'MOQ: 500 m² cho tấm tiêu âm tiêu chuẩn. Dự án lớn (>5000 m²) có giá chiết khấu đặc biệt.' },
    { q: 'Chính sách bảo hành như thế nào?', a: 'Bảo hành 5 năm cho mạ kẽm nhúng nóng. Tuổi thọ thiết kế 15+ năm trong khí hậu nhiệt đới.' },
    { q: 'Có thể tùy chỉnh màu sắc và kích thước không?', a: 'Có. Kích thước 2.0m / 2.5m / 3.0m / 4.0m. Màu theo RAL, sơn polyester hoặc PVDF.' },
  ],
  th: [
    { q: 'ระยะเวลาจัดส่งถึงประเทศไทยนานเท่าไหร่?', a: 'ผลิต 10–15 วัน + ขนส่งทางเรือ 7–14 วัน รวมประมาณ 20–30 วัน' },
    { q: 'มีบริการแบบ CAD และคำนวณโครงสร้างไหม?', a: 'มี เราให้บริการแบบ CAD และคำนวณโครงสร้างฟรี' },
    { q: 'ใบเสนอราคารวมอะไรบ้าง?', a: 'FOB/CIF รวม: แผงกั้นเสียง + เสา H + แผ่นฐาน + นอต + ปะเก็นยาง' },
    { q: 'จำนวนสั่งซื้อขั้นต่ำ (MOQ) เท่าไหร่?', a: 'MOQ: 500 ตร.ม. โครงการใหญ่มีส่วนลดพิเศษ' },
    { q: 'นโยบายรับประกันเป็นอย่างไร?', a: 'รับประกัน 5 ปี อายุการใช้งาน 15+ ปี' },
    { q: 'สามารถสั่งสีและขนาดพิเศษได้ไหม?', a: 'ได้ ขนาด 2.0/2.5/3.0/4.0 ม. สีตาม RAL' },
  ],
  en: [
    { q: 'What is the delivery time to Vietnam/Thailand?', a: '10–15 days production + 7–14 days sea freight. Total 20–30 days.' },
    { q: 'Do you provide CAD drawings?', a: 'Yes, free CAD drawings and structural analysis.' },
    { q: 'What does the quotation include?', a: 'FOB/CIF includes panels + H-posts + base plates + bolts + seals.' },
    { q: 'What is the MOQ?', a: '500 m² for standard panels. Large projects get special pricing.' },
    { q: 'Warranty?', a: '5-year warranty on galvanizing. 15+ year design life.' },
    { q: 'Custom colors and dimensions?', a: 'Yes, 2.0/2.5/3.0/4.0m panels, RAL colors.' },
  ],
  zh: [
    { q: '发货到越南/泰国需要多长时间？', a: '生产 10–15 天 + 海运 7–14 天，总计 20–30 天。' },
    { q: '提供 CAD 图纸吗？', a: '提供免费 CAD 图纸和结构分析。' },
    { q: '报价包含哪些？', a: 'FOB/CIF 包含面板+立柱+底板+螺栓+密封条。' },
    { q: 'MOQ 是多少？', a: '500 平方米起订，大项目有折扣。' },
    { q: '保修？', a: '热镀锌保修 5 年，设计寿命 15+ 年。' },
    { q: '可定制？', a: '可，尺寸 2.0/2.5/3.0/4.0m，RAL 色卡。' },
  ],
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
    en: 'en_US', zh: 'zh_CN', vi: 'vi_VN', th: 'th_TH',
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
      languages: {
        'x-default': '/en/noise-barrier',
        en: '/en/noise-barrier',
        zh: '/zh/noise-barrier',
        vi: '/vi/noise-barrier',
        th: '/th/noise-barrier',
      },
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
  const [catalog, siteConfig, nbData] = await Promise.all([
    getCatalog(),
    getSiteConfig(),
    getNoiseBarrierData(),
  ]);

  const noiseProducts = (catalog?.products || []).filter((p: any) => noiseSlugs.includes(p.slug));

  // Get phone from site config
  let phone = '8618803189797';
  if (siteConfig?.config?.phone) {
    const rawPhone = typeof siteConfig.config.phone === 'object'
      ? (siteConfig.config.phone as any)[locale] || (siteConfig.config.phone as any).en || ''
      : siteConfig.config.phone;
    if (rawPhone) phone = rawPhone;
  }
  const cleanPhone = phone.replace(/[^0-9+]/g, '');

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
    email: getCfg('email') || 'anguwiremesh@gmail.com',
    phone: getCfg('phone') || '+86 188 0318 9797',
    whatsapp: getCfg('whatsapp') || getCfg('phone') || '+86 188 0318 9797',
    facebook: getCfg('facebook') || 'https://www.facebook.com/anguwiremesh',
    zalo: getCfg('zalo') || getCfg('phone') || '+86 188 0318 9797',
    lineId: getCfg('line_id') || 'anguwiremesh',
    locale,
    qrWhatsApp: getCfg('qr_whatsapp') || '',
    qrZalo: getCfg('qr_zalo') || '',
    qrLine: getCfg('qr_line') || '',
    qrFacebook: getCfg('qr_facebook') || '',
  };

  // FAQ JSON-LD
  const faqItems = faqJsonLd[locale] || faqJsonLd.en;
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
    en: 'Noise Barrier', zh: '声屏障', vi: 'Tấm Cách Âm', th: 'แผงกั้นเสียง',
  };
  const homeLabels: Record<string, string> = {
    en: 'Home', zh: '首页', vi: 'Trang chủ', th: 'หน้าแรก',
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
      <ProductMatrix locale={locale} products={noiseProducts} />

      {/* 7. Tech Spec */}
      <TechSpecSection locale={locale} />

      {/* 8. Quote Form — post-trust, high conversion */}
      <QuoteForm locale={locale} />

      {/* 9. Social Proof */}
      <SocialProof locale={locale} />

      {/* 10. FAQ */}
      <FaqSection locale={locale} />

      {/* 11. CTA */}
      <CtaSection locale={locale} phone={cleanPhone} />

      {/* Client components: FloatingContact + ExitIntentPopup */}
      <NoiseBarrierClient locale={locale} contactInfo={contactInfo} />
    </main>
  );
}
