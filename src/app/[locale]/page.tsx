import Link from 'next/link';
import type {Metadata} from 'next';
import {getCatalog, getSiteConfig} from '@/lib/api';
import {  pickLocale, tLabel  } from '@/lib/i18n';;
import {ProductCard} from '@/components/products/ProductCard';

// ── Metadata ──
export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'zh'
      ? '声屏障厂家 — 公路·工业隔音屏障 | 安固丝网'
      : locale === 'vi'
      ? 'Nhà Sản Xuất Tấm Chắn Ồn — Đường Cao Tốc & Công Nghiệp | Angu'
      : locale === 'th'
      ? 'ผู้ผลิตแผงกั้นเสียง — ทางหลวง & อุตสาหกรรม | Angu'
      : 'Noise Barrier Manufacturer — Highway & Industrial | Angu',
    description: locale === 'zh'
      ? '工厂直供公路、工业、轨道交通、桥梁声屏障。ISO 9001与CE认证，15年制造经验，出口30+国家。'
      : locale === 'vi'
      ? 'Tấm chắn ồn trực tiếp từ nhà máy cho đường cao tốc, công nghiệp, đường sắt và cầu. Chứng nhận ISO 9001 & CE, 15 năm kinh nghiệm, xuất khẩu 30+ quốc gia.'
      : locale === 'th'
      ? 'แผงกั้นเสียงจากโรงงานโดยตรงสำหรับทางหลวง อุตสาหกรรม ระบบราง และสะพาน รับรอง ISO 9001 & CE ประสบการณ์ 15 ปี ส่งออก 30+ ประเทศ'
      : 'Factory-direct noise barriers for highways, industry, rail and bridges. ISO 9001 & CE certified, 15 years experience, shipped to 30+ countries.',
    keywords: locale === 'zh'
      ? '声屏障,隔音屏障,公路声屏障,工业降噪,声屏障厂家,工厂直供'
      : locale === 'vi'
      ? 'tấm chắn ồn,vách cách âm,tấm chắn ồn đường cao tốc,nhà sản xuất tấm chắn ồn,nhà máy trực tiếp'
      : locale === 'th'
      ? 'แผงกั้นเสียง,แผงกันเสียง,แผงกั้นเสียงทางหลวง,ผู้ผลิตแผงกั้นเสียง,โรงงานโดยตรง'
      : 'noise barrier,sound barrier,highway noise barrier,acoustic barrier,noise barrier manufacturer,factory direct',
    alternates: {
      canonical: `https://www.angumesh.com${locale === 'zh' ? '/zh' : locale === 'vi' ? '/vi' : locale === 'th' ? '/th' : '/en'}`,
      languages: {'x-default': '/en', en: '/en', zh: '/zh', vi: '/vi', th: '/th'},
    },
    openGraph: {
      title: locale === 'zh'
        ? '声屏障厂家 — 公路·工业隔音屏障 | 安固丝网'
        : locale === 'vi'
        ? 'Tấm Chắn Ồn — Đường Cao Tốc & Công Nghiệp | Angu'
        : locale === 'th'
        ? 'แผงกั้นเสียง — ทางหลวง & อุตสาหกรรม | Angu'
        : 'Noise Barrier Manufacturer — Highway & Industrial | Angu',
      description: locale === 'zh'
        ? '工厂直供公路、工业、轨道交通、桥梁声屏障。ISO 9001与CE认证，15年经验。'
        : locale === 'vi'
        ? 'Tấm chắn ồn trực tiếp từ nhà máy cho đường cao tốc, công nghiệp, đường sắt và cầu. Chứng nhận ISO 9001 & CE, 15 năm kinh nghiệm.'
        : locale === 'th'
        ? 'แผงกั้นเสียงจากโรงงานโดยตรงสำหรับทางหลวง อุตสาหกรรม ระบบราง และสะพาน รับรอง ISO 9001 & CE ประสบการณ์ 15 ปี'
        : 'Factory-direct noise barriers for highways, industry, rail and bridges. ISO 9001 & CE certified, 15 years experience.',
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : locale === 'vi' ? 'vi_VN' : locale === 'th' ? 'th_TH' : 'en_US',
      siteName: locale === 'zh' ? '安固丝网' : 'Angu Wire Mesh',
      url: `https://www.angumesh.com/${locale}`,
      images: [{url: 'https://www.angumesh.com/images/products/highway-noise-barrier.jpg', width: 1200, height: 630, alt: locale === 'zh' ? '公路声屏障' : 'Highway Noise Barrier'}],
    },
    twitter: {card: 'summary_large_image', title: locale === 'zh' ? '声屏障厂家 — 公路·工业隔音屏障' : locale === 'vi' ? 'Nhà Sản Xuất Tấm Chắn Ồn' : locale === 'th' ? 'ผู้ผลิตแผงกั้นเสียง' : 'Noise Barrier Manufacturer', description: locale === 'zh' ? '工厂直供公路/工业声屏障，ISO/CE认证。' : locale === 'vi' ? 'Tấm chắn ồn trực tiếp nhà máy, ISO/CE.' : locale === 'th' ? 'แผงกั้นเสียงโรงงานตรง ISO/CE' : 'Factory-direct noise barriers, ISO/CE certified.'},
    robots: {index: true, follow: true},
    other: {'geo.region': 'CN-HE', 'geo.placename': 'Anping County, Hengshui, Hebei'},
  };
}

// ── JSON-LD: WebSite ──
function WebSiteLd({locale}: {locale: string}) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: locale === 'zh' ? '安固丝网' : 'Angu Wire Mesh',
    url: `https://www.angumesh.com/${locale}`,
    description: locale === 'zh'
      ? '安固丝网 — 金属丝网制造商，主营石笼网箱、边坡防护网、护栏网、声屏障、刺绳等。ISO 9001/CE认证，工厂直供价格。'
      : locale === 'vi'
      ? 'Angu Wire Mesh — nhà sản xuất lưới kim loại chuyên rọ đá, lưới chống rơi đá, hàng rào, cách âm, dây kẻ gai. Chứng nhận ISO 9001/CE, trực tiếp nhà máy.'
      : locale === 'th'
      ? 'Angu Wire Mesh — ผู้ผลิตตะแกรงลวดโลหะ เชี่ยวชาญเกเบี้ยน ตะแกรงป้องกันหินตก รั้ว แผงกั้นเสียง ลวดหนาม รับรอง ISO 9001/CE จำหน่ายโรงงานตรง'
      : 'Angu Wire Mesh — metal wire mesh manufacturer specializing in gabion boxes, rockfall nets, fencing, noise barriers, and barbed wire. ISO 9001/CE certified, factory-direct.',
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `https://www.angumesh.com/${locale}/products?search={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(ld)}} />;
}

// ── JSON-LD: FAQPage ──
function HomeFaqLd({locale}: {locale: string}) {
  const faqItems = [
    { q_en: 'What products does Angu Wire Mesh manufacture?', q_zh: '安固丝网生产哪些产品？', q_vi: 'Angu Wire Mesh sản xuất những sản phẩm nào?', q_th: 'Angu Wire Mesh ผลิตผลิตภัณฑ์ใดบ้าง?', a_en: 'Angu Wire Mesh manufactures 9 product categories: gabion boxes, rockfall protection nets, chain link fences, welded wire mesh, noise barriers, barbed/razor wire, blast barriers, stainless steel rope nets, and crowd barriers. All products are ISO 9001 and CE certified, customizable to specifications.', a_zh: '安固丝网生产9大品类：石笼网箱、边坡防护网、勾花网围栏、电焊网、声屏障、刺绳/刀片刺绳、防爆护栏、不锈钢绳网、临时围栏。所有产品通过ISO 9001和CE认证，支持来图来样定制。', a_vi: 'Angu Wire Mesh sản xuất 9 danh mục sản phẩm: lưới đá gabion, lưới chống sạt lở, hàng rào xích liên kết, lưới hàn, rào chống tiếng ồn, dây gai/dây gai lưỡi dao, rào chống nổ, lưới dây thép không gỉ và rào tạm thời. Tất cả sản phẩm đạt chứng nhận ISO 9001 và CE, có thể tùy chỉnh theo yêu cầu.', a_th: 'Angu Wire Mesh ผลิตผลิตภัณฑ์ 9 หมวดหมู่: ตะกร้า gabion, ตาข่ายป้องกันหินไหล, รั้วลูกโซ่, ตาข่ายเชื่อม, แผ่นกันเสียง, ลวดหนาม/ลวดมีด, รั้วกันระเบิด, ตาข่ายเชือกสแตนเลส และรั้วชั่วคราว ผลิตภัณฑ์ทั้งหมดได้รับการรับรอง ISO 9001 และ CE สามารถปรับแต่งตามข้อกำหนด' },
    { q_en: 'Where is Angu Wire Mesh located?', q_zh: '安固丝网在哪里？', q_vi: 'Angu Wire Mesh nằm ở đâu?', q_th: 'Angu Wire Mesh ตั้งอยู่ที่ไหน?', a_en: 'Angu Wire Mesh is headquartered in Anping County, Hebei Province, China — the global Wire Mesh Capital. Factory is ~300 km from Tianjin Port for fast export shipping.', a_zh: '安固丝网位于中国河北省安平县——全球丝网之都。工厂距天津港约300公里，出口物流便捷。', a_vi: 'Angu Wire Mesh có trụ sở tại Anping County, tỉnh Hebei, Trung Quốc — thủ phủ lưới dây toàn cầu. Nhà máy cách Tianjin Port khoảng 300 km, thuận tiện cho xuất khẩu.', a_th: 'Angu Wire Mesh มีสำนักงานใหญ่ที่ Anping County มณฑล Hebei ประเทศจีน — เมืองหลวงตาข่ายโลก โรงงานอยู่ห่างจาก Tianjin Port ประมาณ 300 กม. ส่งออกสะดวกรวดเร็ว' },
    { q_en: 'Is Angu Wire Mesh certified?', q_zh: '安固丝网有哪些认证？', q_vi: 'Angu Wire Mesh có những chứng nhận gì?', q_th: 'Angu Wire Mesh มีการรับรองอะไรบ้าง?', a_en: 'Yes. ISO 9001:2015 quality management, CE product certification, and ETAG 027 European technical approval for rockfall protection nets. SGS/BV third-party inspection available upon request.', a_zh: '是的。我们拥有ISO 9001:2015质量管理体系认证、CE产品认证、边坡防护网ETAG 027欧洲技术认证。支持SGS/必维(BV)第三方检测。', a_vi: 'Có. Chứng nhận quản lý chất lượng ISO 9001:2015, chứng nhận sản phẩm CE và phê duyệt kỹ thuật châu Âu ETAG 027 cho lưới chống sạt lở. Có sẵn kiểm tra bên thứ ba SGS/BV theo yêu cầu.', a_th: 'ใช่ ได้รับการรับรองการจัดการคุณภาพ ISO 9001:2015 การรับรองผลิตภัณฑ์ CE และการอนุมัติทางเทคนิคยุโรป ETAG 027 สำหรับตาข่ายป้องกันหินไหล มีบริการตรวจสอบโดยบุคคลที่สาม SGS/BV ตามคำขอ' },
    { q_en: 'What is the MOQ and how fast is delivery?', q_zh: '起订量多少？交货期多久？', q_vi: 'Số lượng đặt hàng tối thiểu là bao nhiêu? Thời gian giao hàng bao lâu?', q_th: 'ปริมาณสั่งซื้อขั้นต่ำเท่าไหร่? ส่งมอบกี่วัน?', a_en: 'MOQ is as low as 50 m² for trial orders. Standard delivery is 15-25 days. Rush orders can be negotiated. Samples available.', a_zh: '试单最低50㎡起。标准交货期15-25天，加急订单可协商。提供样品。', a_vi: 'Số lượng đặt hàng tối thiểu cho đơn thử thấp tới 50 m². Thời gian giao hàng tiêu chuẩn 15-25 ngày. Đơn gấp có thể thương lượng. Có sẵn mẫu.', a_th: 'ปริมาณสั่งขั้นต่ำสำหรับการสั่งทดลองต่ำเพียง 50 ตร.ม. การส่งมอบมาตรฐาน 15-25 วัน สามารถเจรจาคำสั่งด่วนได้ มีตัวอย่างให้' },
    { q_en: 'Does Angu support OEM/ODM?', q_zh: '支持OEM/ODM定制吗？', q_vi: 'Angu có hỗ trợ OEM/ODM không?', q_th: 'Angu รองรับ OEM/ODM หรือไม่?', a_en: 'Yes. We accept drawing-to-sample OEM/ODM with custom dimensions, wire diameters, coatings, and packaging. Dedicated project managers handle the full process.', a_zh: '支持。接受来图来样OEM/ODM定制，可定制尺寸、丝径、涂层、包装。专属项目经理全程跟进。', a_vi: 'Có. Chúng tôi nhận OEM/ODM theo bản vẽ và mẫu với kích thước, đường kính dây, lớp phủ và đóng gói tùy chỉnh. Quản lý dự án chuyên trách phụ trách toàn bộ quy trình.', a_th: 'ใช่ เรารับ OEM/ODM ตามแบบและตัวอย่าง ปรับแต่งขนาด เส้นผ่านศูนย์กลางลวด การเคลือบ และบรรจุภัณฑ์ ผู้จัดการโครงการเฉพาะดูแลทั้งกระบวนการ' },
  ];
  const faqLd = {'@context':'https://schema.org','@type':'FAQPage', mainEntity: faqItems.map(f=>({'@type':'Question', name: pickLocale(f, 'q', locale), acceptedAnswer:{'@type':'Answer', text: pickLocale(f, 'a', locale)}}))};
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqLd)}} />;
}

// ── JSON-LD: BreadcrumbList ──
function BreadcrumbLd({locale}: {locale: string}) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: locale === 'zh' ? '首页' : 'Home', item: `https://www.angumesh.com/${locale}`},
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(ld)}} />;
}

// ── Page Component ──
export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const {products, categories} = await getCatalog();
  const featuredProducts = products.filter((p: {isFeatured: boolean}) => p.isFeatured).slice(0, 8);
  
  const siteConfig = await getSiteConfig();
  const config_ = siteConfig?.config || {};
  // Read i18n value from site_config table
  const cfg = (key: string, fbEn: string, fbZh?: string) => {
    const raw = config_[key];
    if (raw === undefined || raw === null) return locale === 'zh' ? (fbZh ?? fbEn) : fbEn;
    if (typeof raw === 'object' && raw !== null) {
      const r = raw as Record<string,string>;
      if (r[locale]) return r[locale];
      if (r.en) return r.en;
      return locale === 'zh' ? (fbZh ?? fbEn) : fbEn;
    }
    if (typeof raw === 'string') { try { const p = JSON.parse(raw); if (typeof p === 'object' && p && !Array.isArray(p)) { if (p[locale]) return p[locale]; if (p.en) return p.en; } } catch {} return raw; }
    return locale === 'zh' ? (fbZh ?? fbEn) : fbEn;
  };

  // --- Config values ---
  const heroBadge = cfg('hero_badge_en', locale === 'zh' ? 'ISO 9001 & CE 认证制造商' : 'ISO 9001 & CE Certified');
  const heroTitle = cfg('hero_title_prefix_en', locale === 'zh' ? '安固丝网 — 石笼网箱·防护网·护栏网厂家直销' : 'Angu Wire Mesh — Gabion · Rockfall · Fencing');
  const heroSubtitle = cfg('hero_subtitle_en', locale === 'zh' ? '中国丝网之都安平·15年制造经验·工厂直供' : 'Anping · China Wire Mesh Capital · 15 Years · Factory-Direct');
  const heroCta = cfg('hero_cta_en', locale === 'zh' ? '获取报价' : 'Get Quote');
  const companyTitle = cfg('home_company_title', locale === 'zh' ? '关于安固丝网' : 'About Angu Wire Mesh');
  const companyDesc1 = cfg('home_company_desc1', locale === 'zh' ? '安固丝网坐落于中国河北安平——中国丝网之都，是一家拥有15年行业经验的金属丝网制造商。公司引进全自动六角编织机、PVC包覆生产线等先进设备，年产金属丝网300万平方米，产品出口东南亚、中东、欧洲、非洲、南美等30多个国家和地区。' : 'Angu Wire Mesh is based in Anping, Hebei — the Wire Mesh Capital of China — with 15 years of manufacturing expertise. Our factory is equipped with fully automated hexagonal weaving machines and PVC coating lines, producing 3 million sqm of metal wire mesh annually. Products are exported to 30+ countries across Southeast Asia, the Middle East, Europe, Africa, and South America.');
  const companyDesc2 = cfg('home_company_desc2', locale === 'zh' ? '我们持有多项ISO 9001及CE认证，主营石笼网箱、边坡防护网、护栏网、声屏障、刺绳、钢格板等9大品类28款系列产品，广泛应用于建筑水利、公路铁路、矿山边坡、农牧养殖等领域，是工程采购的可靠合作伙伴。' : 'We hold ISO 9001 and CE certifications across our 9 product categories and 28 series: gabion boxes, rockfall protection nets, fencing, noise barriers, barbed wire, and steel grating — serving construction, highway, mining, agriculture, and more. A trusted partner for engineering procurement.');
  const aboutImage = cfg('home_about_image', locale === 'zh' ? '/images/about/factory-workshop.jpg' : '/images/about/factory-workshop.jpg');
  const featuredTitle = cfg('home_featured_title', locale === 'zh' ? '精选产品' : 'Featured Products');
  const featuredDesc = cfg('home_featured_desc', locale === 'zh' ? '工厂直供热销丝网产品，ISO/CE认证，支持定制' : 'Hot-selling factory-direct wire mesh products, ISO/CE certified, customizable.');
  const categoriesTitle = cfg('home_categories_title', locale === 'zh' ? '产品分类' : 'Product Categories');
  const categoriesDesc = cfg('home_categories_desc', locale === 'zh' ? '九大品类，一站式采购' : '9 categories, one-stop procurement.');
  const whyUsTitle = cfg('home_why_us_title', locale === 'zh' ? '为什么选择安固？' : 'Why Choose Angu?');
  const applicationsTitle = cfg('home_applications_title', locale === 'zh' ? '应用领域' : 'Engineering Applications');
  const applicationsDesc = cfg('home_applications_desc', locale === 'zh' ? '安固丝网产品覆盖9大应用领域，为全球客户提供一站式金属丝网解决方案：' : 'Angu wire mesh products cover 9 application fields, delivering one-stop metal mesh solutions worldwide:');
  const faqTitle = cfg('home_faq_title', locale === 'zh' ? '常见问题' : 'Frequently Asked Questions');
  const faqDesc = cfg('home_faq_desc', locale === 'zh' ? '关于安固丝网产品的常见疑问' : 'Common questions about Angu Wire Mesh');
  const ctaTitle = cfg('home_cta_title', locale === 'zh' ? '准备好获取免费报价了吗？' : 'Ready to Get Your Free Quote?');
  const ctaDesc = cfg('home_cta_desc', locale === 'zh' ? '告诉我们您的需求，我们24小时内回复详细报价。' : 'Tell us your requirements and get a detailed quote within 24 hours.');
  const ctaButton = cfg('home_cta_button', locale === 'zh' ? '立即询价' : 'Request Quote');
  const crosslinksTitle = cfg('home_crosslinks_title', locale === 'zh' ? '快速导航' : 'Quick Navigation');
  const seoIntroText = cfg('home_seo_intro', locale === 'zh' ? '安固丝网 — ISO/CE认证金属丝网制造商，主营石笼网箱、边坡防护网、护栏网、声屏障、刺绳等，工厂直供，出口30+国家。' : 'Angu Wire Mesh — ISO/CE certified manufacturer of gabion boxes, rockfall nets, fencing, noise barriers, barbed wire. Factory-direct, exported to 30+ countries.');

  const bannerData = siteConfig?.banners?.[0];
  const bannerCta = (bannerData?.ctaText as Record<string, string>)?.[locale] || bannerData?.ctaText?.en || 'Get a Quote';
  const bannerImage = (bannerData?.image as Record<string, string>)?.[locale] || bannerData?.image?.en || '/images/banners/banner1.jpg';

  const applicationFields = (siteConfig?.scenes || []).map((s: { icon: string; name: { en: string; zh: string }; description: { en: string; zh: string }; categorySlugs: string[] }) => ({
    icon: s.icon || '📦',
    label: (s.name as Record<string, string>)?.[locale] || s.name.en || '',
    desc: (s.description as Record<string, string>)?.[locale] || s.description.en || '',
    slugs: s.categorySlugs || [],
  }));

  return (
    <>
      {/* JSON-LD structured data */}
      <WebSiteLd locale={locale} />
      <BreadcrumbLd locale={locale} />
      <HomeFaqLd locale={locale} />

      {/* GEO: SEO intro paragraph — hidden from UI, retained in DOM for AI crawlers */}
      <section className="sr-only" aria-hidden="false">
        <div>
          <p>{seoIntroText}</p>
        </div>
      </section>

      {/* ─── Hero — Conclusion-First for AI Snippet Extraction ─── */}
      <section className="relative h-[580px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/40 z-10" />
        <img
          src={bannerImage}
          alt="Gabion wire mesh products"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={580}
          fetchPriority="high"
        />
        <div className="relative z-20 flex items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Conclusion-first H1 — extractable value proposition */}
            <h1 className="text-3xl md:text-4xl lg:text-[3rem] font-bold text-white leading-tight mb-4">
              {heroTitle}
            </h1>
            {/* Supporting identity paragraph */}
            <p className="text-lg text-white/85 mb-2">
              {heroSubtitle}
            </p>
            {/* Trust signal badge */}
            <div className="inline-flex items-center gap-2 bg-green-600/80 text-white text-xs px-3 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              {heroBadge}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${locale}/contact`}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  {bannerCta}
                </button>
              </Link>
              <Link href={`/${locale}/products`}>
                <button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold text-base backdrop-blur-sm transition-all hover:-translate-y-0.5">
                  {locale === 'zh' ? '浏览产品' : locale === 'vi' ? 'Xem sản phẩm' : locale === 'th' ? 'ดูสินค้า' : 'View Products'}
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                {num: '15+', label: locale === 'zh' ? '年行业经验' : locale === 'vi' ? 'Năm kinh nghiệm' : locale === 'th' ? 'ปีประสบการณ์' : 'Years Experience'},
                {num: '30+', label: locale === 'zh' ? '出口国家' : locale === 'vi' ? 'Quốc gia xuất khẩu' : locale === 'th' ? 'ประเทศส่งออก' : 'Countries Exported'},
                {num: '500+', label: locale === 'zh' ? '满意客户' : locale === 'vi' ? 'Khách hàng hài lòng' : locale === 'th' ? 'ลูกค้าพึงพอใจ' : 'Happy Clients'},
                {num: '50+', label: locale === 'zh' ? '产品类型' : locale === 'vi' ? 'Loại sản phẩm' : locale === 'th' ? 'ประเภทสินค้า' : 'Product Types'},
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">{stat.num}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Company Introduction ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Company Description */}
          <div>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              {companyTitle}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">
              {tLabel('安固丝网 — 中国丝网之都的制造商', 'Angu Wire Mesh — Manufacturer from China\'s Wire Mesh Capital', locale)}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {companyDesc1}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {companyDesc2}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {[
                {en: 'ISO 9001 Certified', zh: 'ISO 9001 认证', vi: 'Chứng nhận ISO 9001', th: 'ได้รับการรับรอง ISO 9001'},
                {en: 'CE Certified', zh: 'CE 认证', vi: 'Chứng nhận CE', th: 'ได้รับการรับรอง CE'},
                {en: '15+ Years Experience', zh: '15+ 年经验', vi: '15+ Năm Kinh Nghiệm', th: '15+ ปีประสบการณ์'},
                {en: '30+ Countries Exported', zh: '出口 30+ 国家', vi: 'Xuất Khẩu 30+ Quốc Gia', th: 'ส่งออก 30+ ประเทศ'},
              ].map((badge) => (
                <span key={badge.en} className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-200">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {locale === 'zh' ? badge.zh : locale === 'vi' ? badge.vi || badge.en : locale === 'th' ? badge.th || badge.en : badge.en}
                </span>
              ))}
            </div>
          </div>
          {/* Right: Visual */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-lg">
              <img
                src={aboutImage}
                alt={locale === 'zh' ? '安固工厂车间' : locale === 'vi' ? 'Xưởng Angu' : locale === 'th' ? 'โรงงาน Angu' : 'Angu factory workshop'}
                className="w-full h-full object-cover"
                width={600}
                height={450}
                loading="lazy"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">500+</div>
                  <div className="text-xs text-slate-500">{tLabel('全球客户', 'Global Clients', locale)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Products ─── */}
      <section className="py-20 bg-slate-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-t-3xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{featuredTitle}</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-4" />
          <p className="text-slate-500 max-w-xl mx-auto">
            {locale === 'zh' ? '探索我们最受欢迎的石笼网和防护网产品，深受全球客户信赖。' : locale === 'vi' ? 'Khám phá các sản phẩm rọ đá và lưới bảo vệ phổ biến nhất, được khách hàng toàn cầu tin tưởng.' : locale === 'th' ? 'ค้นพบสินค้าเกเบี้ยนและตะแกรงป้องกันยอดนิยม ได้รับความไว้วางใจจากลูกค้าทั่วโลก' : 'Discover our most popular gabion and protection net products, trusted by clients worldwide.'}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href={`/${locale}/products`}>
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all">
              {locale === 'zh' ? '查看全部产品 →' : locale === 'vi' ? 'Xem tất cả sản phẩm →' : locale === 'th' ? 'ดูสินค้าทั้งหมด →' : 'View All Products →'}
            </button>
          </Link>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{whyUsTitle}</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(siteConfig?.whyChooseUs || []).slice(0, 6).map((item, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 hover:border-blue-200 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-500/20" aria-hidden="true">
                  <span className="text-2xl">
                    {item.icon || (index === 0 ? '🏭' : index === 1 ? '🛡️' : index === 2 ? '🌍' : '🤝')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {(item.title as Record<string, string>)?.[locale] || item.title?.en || ''}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {(item.description as Record<string, string>)?.[locale] || item.description?.en || ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Product Categories ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {categoriesTitle}
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-4" />
          <p className="text-slate-500 max-w-xl mx-auto">
            {locale === 'zh' ? '浏览我们全面的金属丝网和防护产品系列。' : locale === 'vi' ? 'Duyệt dải sản phẩm lưới thép và bảo vệ toàn diện của chúng tôi.' : locale === 'th' ? 'เรียกดูผลิตภัณฑ์ตะแกรงลวดและการป้องกันครบถ้วนของเรา' : 'Browse our comprehensive range of wire mesh and protection products.'}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((cat) => (
            <Link key={cat.id} href={`/${locale}/products?category=${cat.slug}`}>
              <article className="group bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  {cat.image && (
                    <img
                      src={cat.image}
                      alt={cat.names[locale] || cat.names.en || ''}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width={400}
                      height={300}
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.names[locale] || cat.names.en}
                  </h3>
                  {cat.productCount && (
                    <p className="text-xs text-slate-400 mt-1">
                      {cat.productCount} {locale === 'zh' ? '款产品' : locale === 'vi' ? 'sản phẩm' : locale === 'th' ? 'สินค้า' : 'products'}
                    </p>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Application Fields ─── */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{applicationsTitle}</h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto" />
            <p className="text-slate-400 max-w-xl mx-auto mt-4">
              {applicationsDesc}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 max-w-3xl mx-auto">
            {applicationFields.map((field, index) => (
              <div
                key={index}
                className="p-4 sm:p-5 border border-slate-700 rounded-xl text-center hover:border-blue-500 hover:bg-slate-800 transition-all cursor-pointer group"
                title={field.desc}
              >
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3" aria-hidden="true">{field.icon}</div>
                <div className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                  {field.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ Section (GEO) ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {faqTitle}
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-4" />
          <p className="text-slate-500 max-w-xl mx-auto">
            {faqDesc}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {[
            {q_en:'What products does Angu Wire Mesh manufacture?', q_zh:'安固丝网生产哪些产品？', q_vi:'Angu Wire Mesh sản xuất những sản phẩm nào?', q_th:'Angu Wire Mesh ผลิตผลิตภัณฑ์ใดบ้าง?', a_en:'Angu Wire Mesh manufactures 9 product categories: gabion boxes, rockfall protection nets, chain link fences, welded wire mesh, noise barriers, barbed/razor wire, blast barriers, stainless steel rope nets, and crowd barriers. All products are ISO 9001 and CE certified, customizable to specifications.', a_zh:'安固丝网生产9大品类：石笼网箱、边坡防护网、勾花网围栏、电焊网、声屏障、刺绳/刀片刺绳、防爆护栏、不锈钢绳网、临时围栏。所有产品通过ISO 9001和CE认证，支持来图来样定制。', a_vi:'Angu Wire Mesh sản xuất 9 danh mục sản phẩm: lưới đá gabion, lưới chống sạt lở, hàng rào xích liên kết, lưới hàn, rào chống tiếng ồn, dây gai/dây gai lưỡi dao, rào chống nổ, lưới dây thép không gỉ và rào tạm thời. Tất cả sản phẩm đạt chứng nhận ISO 9001 và CE, có thể tùy chỉnh theo yêu cầu.', a_th:'Angu Wire Mesh ผลิตผลิตภัณฑ์ 9 หมวดหมู่: ตะกร้า gabion, ตาข่ายป้องกันหินไหล, รั้วลูกโซ่, ตาข่ายเชื่อม, แผ่นกันเสียง, ลวดหนาม/ลวดมีด, รั้วกันระเบิด, ตาข่ายเชือกสแตนเลส และรั้วชั่วคราว ผลิตภัณฑ์ทั้งหมดได้รับการรับรอง ISO 9001 และ CE สามารถปรับแต่งตามข้อกำหนด'},
            {q_en:'Where is Angu Wire Mesh located?', q_zh:'安固丝网在哪里？', q_vi:'Angu Wire Mesh nằm ở đâu?', q_th:'Angu Wire Mesh ตั้งอยู่ที่ไหน?', a_en:'Angu Wire Mesh is headquartered in Anping County, Hebei Province, China — the global Wire Mesh Capital. Our factory is ~300 km from Tianjin Port for fast export shipping.', a_zh:'安固丝网位于中国河北省安平县——全球丝网之都。工厂距天津港约300公里，出口物流便捷。', a_vi:'Angu Wire Mesh có trụ sở tại Anping County, tỉnh Hebei, Trung Quốc — thủ phủ lưới dây toàn cầu. Nhà máy của chúng tôi cách Tianjin Port khoảng 300 km, thuận tiện cho xuất khẩu.', a_th:'Angu Wire Mesh มีสำนักงานใหญ่ที่ Anping County มณฑล Hebei ประเทศจีน — เมืองหลวงตาข่ายโลก โรงงานของเราอยู่ห่างจาก Tianjin Port ประมาณ 300 กม. ส่งออกสะดวกรวดเร็ว'},
            {q_en:'Is Angu Wire Mesh certified?', q_zh:'安固丝网有哪些认证？', q_vi:'Angu Wire Mesh có những chứng nhận gì?', q_th:'Angu Wire Mesh มีการรับรองอะไรบ้าง?', a_en:'Yes. ISO 9001:2015 quality management, CE product certification, and ETAG 027 European technical approval for rockfall protection nets. SGS and Bureau Veritas (BV) third-party inspection available.', a_zh:'是的。ISO 9001:2015质量管理体系、CE产品认证，边坡防护网持有ETAG 027欧洲技术认证。支持SGS/必维(BV)第三方检测。', a_vi:'Có. Chứng nhận quản lý chất lượng ISO 9001:2015, chứng nhận sản phẩm CE và phê duyệt kỹ thuật châu Âu ETAG 027 cho lưới chống sạt lở. Có sẵn dịch vụ kiểm tra bên thứ ba SGS và Bureau Veritas (BV).', a_th:'ใช่ ได้รับการรับรองการจัดการคุณภาพ ISO 9001:2015 การรับรองผลิตภัณฑ์ CE และการอนุมัติทางเทคนิคยุโรป ETAG 027 สำหรับตาข่ายป้องกันหินไหล มีบริการตรวจสอบโดยบุคคลที่สาม SGS และ Bureau Veritas (BV)'},
            {q_en:'What is the minimum order quantity (MOQ)?', q_zh:'最低起订量是多少？', q_vi:'Số lượng đặt hàng tối thiểu (MOQ) là bao nhiêu?', q_th:'ปริมาณสั่งซื้อขั้นต่ำ (MOQ) คือเท่าไหร่?', a_en:'MOQ starts from as low as 50 m² for trial orders. Bulk orders welcome with volume discounts. Samples available upon request.', a_zh:'试单最低50㎡起。大批量订单享受阶梯折扣。可提供样品。', a_vi:'MOQ cho đơn thử thấp tới 50 m². Hoan nghênh đơn hàng số lượng lớn với chiết khấu theo khối lượng. Có sẵn mẫu theo yêu cầu.', a_th:'MOQ สำหรับการสั่งทดลองต่ำเพียง 50 ตร.ม. ยินดีรับคำสั่งจำนวนมากพร้อมส่วนลดตามปริมาณ มีตัวอย่างให้ตามคำขอ'},
            {q_en:'How fast is delivery and shipping?', q_zh:'交货期和物流时效？', q_vi:'Thời gian giao hàng và vận chuyển mất bao lâu?', q_th:'การส่งมอบและขนส่งกี่วัน?', a_en:'Standard production takes 15-25 days. FOB Tianjin or CIF to your port. Sea freight to major ports worldwide (~15-40 days depending on destination). Rush orders negotiable.', a_zh:'标准生产周期15-25天。支持FOB天津或CIF到港。海运至全球主要港口（约15-40天，依目的地而定）。加急订单可协商。', a_vi:'Sản xuất tiêu chuẩn 15-25 ngày. Hỗ trợ FOB Tianjin hoặc CIF đến cảng của bạn. Vận chuyển đường biển đến các cảng lớn trên toàn cầu (~15-40 ngày tùy điểm đến). Đơn gấp có thể thương lượng.', a_th:'การผลิตมาตรฐาน 15-25 วัน รองรับ FOB Tianjin หรือ CIF ถึงท่าเรือของคุณ ขนส่งทางทะเลไปยังท่าเรือหลักทั่วโลก (ประมาณ 15-40 วัน ขึ้นอยู่กับจุดหมายปลายทาง) สามารถเจรจาคำสั่งด่วนได้'},
            {q_en:'Does Angu support OEM/ODM customization?', q_zh:'支持OEM/ODM定制吗？', q_vi:'Angu có hỗ trợ tùy chỉnh OEM/ODM không?', q_th:'Angu รองรับการปรับแต่ง OEM/ODM หรือไม่?', a_en:'Yes. We accept drawing-to-sample OEM/ODM with custom dimensions, wire diameters, coatings (PVC, galvanized, Galfan), and packaging. Dedicated project manager for each order.', a_zh:'支持。接受来图来样OEM/ODM定制，可定制尺寸、丝径、涂层（PVC/镀锌/Galfan）、包装。每单配备专属项目经理。', a_vi:'Có. Chúng tôi nhận OEM/ODM theo bản vẽ và mẫu với kích thước, đường kính dây, lớp phủ (PVC, mạ kẽm, Galfan) và đóng gói tùy chỉnh. Mỗi đơn hàng có quản lý dự án chuyên trách.', a_th:'ใช่ เรารับ OEM/ODM ตามแบบและตัวอย่าง ปรับแต่งขนาด เส้นผ่านศูนย์กลางลวด การเคลือบ (PVC, ชุบสังกะสี, Galfan) และบรรจุภัณฑ์ มีผู้จัดการโครงการเฉพาะสำหรับทุกคำสั่ง'},
          ].map((faq, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:border-blue-200 transition-colors">
              <h3 className="font-semibold text-slate-800 mb-2 flex items-start gap-2">
                <span className="text-blue-600 font-bold flex-shrink-0">Q{i + 1}.</span>
                {pickLocale(faq, 'q', locale)}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{pickLocale(faq, 'a', locale)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {ctaTitle}
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            {ctaDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/contact`}>
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                {ctaButton}
              </button>
            </Link>
            <a
              href="https://wa.me/8618803189797"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
                <span aria-hidden="true">💬</span> {locale === 'zh' ? 'WhatsApp咨询' : locale === 'vi' ? 'Trò chuyện trên WhatsApp' : locale === 'th' ? 'แชทบน WhatsApp' : 'Chat on WhatsApp'}
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Cross-links (GEO internal linking) */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h3 className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-5">
            {crosslinksTitle}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}/about`} className="px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
              <span aria-hidden="true">👔</span> {tLabel('关于我们', 'About Us', locale)}
            </Link>
            <Link href={`/${locale}/products`} className="px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
              <span aria-hidden="true">📦</span> {tLabel('全部产品', 'All Products', locale)}
            </Link>
            <Link href={`/${locale}/solutions`} className="px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
              <span aria-hidden="true">🎯</span> {tLabel('行业解决方案', 'Solutions', locale)}
            </Link>
            <Link href={`/${locale}/service`} className="px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
              <span aria-hidden="true">🛠️</span> {tLabel('我们的服务', 'Our Services', locale)}
            </Link>
            <Link href={`/${locale}/blog`} className="px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
              <span aria-hidden="true">📝</span> {tLabel('行业博客', 'Blog', locale)}
            </Link>
            <Link href={`/${locale}/contact`} className="px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
              <span aria-hidden="true">✉️</span> {tLabel('联系我们', 'Contact Us', locale)}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
