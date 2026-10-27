import type { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMeta } from '@/lib/seo-utils';
import { SITE_DATA_TAG } from '@/lib/api';
import { YEARS_IN_BUSINESS, COMPANY } from '@/lib/company';
import { IconWhatsApp } from '@/components/icons';
import { CertificationsSection } from '@/components/about/CertificationsSection';
import { CERTIFICATIONS, CERT_ISSUER, certificationLd } from '@/lib/certifications';

// ── Types ──
interface TimelineItem {
  id: number; year: number; emoji: string;
  title_en: string; title_zh: string;
  desc_en: string; desc_zh: string;
  sort_order: number; status: string;
}
interface TeamMember {
  id: number; avatar: string;
  name_en: string; name_zh: string;
  title_en: string; title_zh: string;
  market_en: string; market_zh: string;
  countries_en: string; countries_zh: string;
  phone: string; whatsapp: string; email: string; facebook: string;
  desc_en: string; desc_zh: string;
  sort_order: number; status: string;
}
interface FactoryImage {
  id: number; image_url: string;
  alt_en: string; alt_zh: string;
  sort_order: number; status: string;
}
interface Certification {
  id: number; icon: string;
  name_en: string; name_zh: string;
  desc_en: string; desc_zh: string;
  sort_order: number; status: string;
}
interface WhyChooseUs {
  id: number; icon: string;
  title_en: string; title_zh: string;
  description_en: string; description_zh: string;
  sort_weight: number; status: string;
}
interface AboutData {
  timeline: TimelineItem[];
  team: TeamMember[];
  factoryImages: FactoryImage[];
  certifications: Certification[];
  whyChooseUs: WhyChooseUs[];
  config: Record<string, { value_en: string; value_zh: string }>;
}

const API_BASE = process.env.API_BASE || 'http://localhost:3001';

async function fetchAboutData(): Promise<AboutData> {
  try {
    const res = await fetch(`${API_BASE}/api/about-page-config`, {
      next: { revalidate: 300, tags: [SITE_DATA_TAG] },
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch {
    return { timeline: [], team: [], factoryImages: [], certifications: [], whyChooseUs: [], config: {} };
  }
}

async function fetchSiteConfig(): Promise<Record<string, { value_en: string; value_zh: string }>> {
  try {
    const res = await fetch(`${API_BASE}/api/site-config`, {
      next: { revalidate: 300, tags: [SITE_DATA_TAG] },
    });
    if (!res.ok) return {};
    const data = await res.json();
    return (data as { config: Record<string, { value_en: string; value_zh: string }> }).config || {};
  } catch { return {}; }
}

function t(cfg: Record<string, { value_en: string; value_zh: string; value_vi?: string; value_th?: string }>, key: string, locale: string): string {
  const item = cfg[key];
  if (!item) return '';
  const localeMap: Record<string, string> = { zh: item.value_zh || '', vi: item.value_vi || '', th: item.value_th || '' };
  return localeMap[locale] || item.value_en || '';
}

import { pickLocale, tLabel } from '@/lib/i18n';

// pickLocale() imported from @/lib/i18n


// ── Breadcrumb (GEO: inline schema) ──
function BreadcrumbNav({ locale, items }: { locale: string; items: { label: string; href?: string }[] }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `https://www.angumesh.com${item.href}`,
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav className="text-sm text-slate-400 mb-0" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-slate-300">/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-blue-600 transition-colors">{item.label}</Link>
              ) : (
                <span className="text-slate-700 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

// ── Organization JSON-LD (GEO core) ──
function OrganizationLd({ locale, config }: { locale: string; config: Record<string, { value_en: string; value_zh: string }> }) {
  const name = t(config, 'company_name_en', locale) || 'Angu Wire Mesh';
  const desc = t(config, 'company_desc_en', locale) || '';
  const phone = t(config, 'phone', locale) || '+86 188 0318 9797';
  const email = t(config, 'email', locale) || 'annie@angumesh.com';
  const address = t(config, 'address', locale) || 'Anping County, Hengshui, Hebei, China';
  const logo = t(config, 'logo_url', locale) || '/uploads/1782284361461-934403953.png';

  const ld = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'Manufacturer', 'HomeAndConstructionBusiness'],
    '@id': 'https://www.angumesh.com/#organization',
    name,
    alternateName: ['Angu Wire Mesh', '安固丝网'],
    description: desc || undefined,
    url: 'https://www.angumesh.com',
    logo: `https://www.angumesh.com${logo}`,
    image: 'https://www.angumesh.com/og-image.jpg',
    telephone: phone,
    email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Anping County',
      addressRegion: 'Hebei',
      addressCountry: {'@type': 'Country', name: 'CN'},
      postalCode: '053600',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.235,
      longitude: 115.520,
    },
    foundingDate: COMPANY.foundedISO,
    foundingLocation: {
      '@type': 'Place',
      name: 'Anping County, Hebei, China',
      geo: {'@type': 'GeoCoordinates', latitude: 38.235, longitude: 115.520},
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: phone,
      contactType: 'sales',
      availableLanguage: ['English', 'Chinese', 'Vietnamese', 'Thai'],
    },
    hasCertification: [
      ...certificationLd(),
      {'@type': 'Certification', name: 'CE Marking', description: 'EU Market Compliance — Rockfall Protection Nets'},
    ],
    naics: '332618',
    areaServed: [
      {'@type': 'Continent', name: 'Asia'},
      {'@type': 'Continent', name: 'Europe'},
      {'@type': 'Continent', name: 'Africa'},
      {'@type': 'Continent', name: 'South America'},
      {'@type': 'Continent', name: 'North America'},
    ],
    sameAs: [
      'https://www.linkedin.com/company/angu-wire-mesh',
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />;
}

// ── About FAQ JSON-LD (GEO) ──
function AboutFaqLd({ locale, config }: { locale: string; config: Record<string, { value_en: string; value_zh: string }> }) {
  const companyName = t(config, 'company_name_en', locale) || 'Angu Wire Mesh';
  const faqs = [
    {
      q_en: `Where is ${companyName} located?`,
      q_zh: `${companyName}在哪里？`,
      q_vi: `${companyName} nằm ở đâu?`,
      q_th: `${companyName}ตั้งอยู่ที่ไหน?`,
      a_en: `${companyName} is located in Anping County, Hengshui City, Hebei Province, China — known as the "Wire Mesh Capital" of the world. The factory is near Tianjin Port (~300 km) for convenient export shipping.`,
      a_zh: `${companyName}位于中国河北省衡水市安平县，被誉为"中国丝网之都"。工厂距天津港约300公里，出口物流便利。`,
      a_vi: `${companyName} nằm tại Anping County, Hengshui City, Hebei Province, Trung Quốc — được mệnh danh là "Thủ phủ lưới thép" của thế giới. Nhà máy cách Tianjin Port khoảng 300 km, rất thuận tiện cho vận chuyển xuất khẩu.`,
      a_th: `${companyName}ตั้งอยู่ที่ Anping County, Hengshui City, Hebei Province ประเทศจีน — ได้ชื่อว่าเป็น "เมืองหลวงตาข่ายเหล็ก" ของโลก โรงงานอยู่ห่างจากท่าเรือ Tianjin Port ประมาณ 300 กม. สะดวกสำหรับการขนส่งส่งออก`,
    },
    {
      q_en: `What certifications does ${companyName} have?`,
      q_zh: `${companyName}有哪些认证？`,
      q_vi: `${companyName} có những chứng nhận gì?`,
      q_th: `${companyName}มีใบรับรองอะไรบ้าง?`,
      a_en: `${companyName} holds three ISO management system certificates issued by ${CERT_ISSUER.en}, all valid until 15 July 2027: ISO 9001:2015 quality management (No. ${CERTIFICATIONS[0].number}), ISO 14001:2015 environmental management (No. ${CERTIFICATIONS[1].number}) and ISO 45001:2018 occupational health & safety (No. ${CERTIFICATIONS[2].number}). Certificate copies are downloadable on this page and verifiable on China's CNCA platform. CE marking documentation and ETAG 027 test reports for rockfall protection nets, plus SGS/BV third-party inspection, are available on request.`,
      a_zh: `${companyName}持有${CERT_ISSUER.zh}颁发的三体系认证证书，有效期均至 2027 年 7 月 15 日：ISO 9001:2015 质量管理体系（证书号 ${CERTIFICATIONS[0].number}）、ISO 14001:2015 环境管理体系（证书号 ${CERTIFICATIONS[1].number}）、ISO 45001:2018 职业健康安全管理体系（证书号 ${CERTIFICATIONS[2].number}）。证书原件可在本页下载，并可在国家认监委网站核验。边坡防护网的 CE 标识资料、ETAG 027 检测报告，以及 SGS/必维（BV）第三方检验，均可按需提供。`,
      a_vi: `${companyName} sở hữu ba chứng nhận hệ thống ISO do ${CERT_ISSUER.en} cấp, có hiệu lực đến 15/07/2027: ISO 9001:2015 quản lý chất lượng (số ${CERTIFICATIONS[0].number}), ISO 14001:2015 quản lý môi trường (số ${CERTIFICATIONS[1].number}) và ISO 45001:2018 an toàn & sức khỏe nghề nghiệp (số ${CERTIFICATIONS[2].number}). Bản gốc có thể tải trên trang này và tra cứu tại cổng CNCA Trung Quốc. Hồ sơ CE, báo cáo thử nghiệm ETAG 027 cho lưới chống đá rơi và kiểm định bên thứ ba SGS/BV được cung cấp theo yêu cầu.`,
      a_th: `${companyName} ถือใบรับรองระบบมาตรฐาน ISO สามฉบับที่ออกโดย ${CERT_ISSUER.en} มีอายุถึง 15 กรกฎาคม 2027 ได้แก่ ISO 9001:2015 การจัดการคุณภาพ (เลขที่ ${CERTIFICATIONS[0].number}), ISO 14001:2015 การจัดการสิ่งแวดล้อม (เลขที่ ${CERTIFICATIONS[1].number}) และ ISO 45001:2018 อาชีวอนามัยและความปลอดภัย (เลขที่ ${CERTIFICATIONS[2].number}) ดาวน์โหลดสำเนาได้จากหน้านี้ และตรวจสอบได้ที่แพลตฟอร์ม CNCA ของจีน เอกสาร CE รายงานทดสอบ ETAG 027 สำหรับตาข่ายกันหินร่วง และการตรวจสอบโดย SGS/BV มีให้ตามคำขอ`,
    },
    {
      q_en: `What is the annual production capacity of ${companyName}?`,
      q_zh: `${companyName}的年产能是多少？`,
      q_vi: `Năng lực sản xuất hàng năm của ${companyName} là bao nhiêu?`,
      q_th: `กำลังการผลิตต่อปีของ ${companyName} อยู่ที่เท่าไหร่?`,
      a_en: `${companyName} has an annual production capacity of 5,000 tons across 10,000 m² of factory space, equipped with automated gabion weaving lines and welding mesh production lines.`,
      a_zh: `${companyName}拥有10,000㎡工厂面积，配备自动石笼网编织线和焊接网生产线，年产能5,000吨。`,
      a_vi: `${companyName} có năng lực sản xuất hàng năm 5.000 tấn với diện tích nhà máy 10.000 m², được trang bị dây chuyền đan lưới gabion tự động và dây chuyền sản xuất lưới hàn.`,
      a_th: `${companyName} มีกำลังการผลิตต่อปี 5,000 ตัน บนพื้นที่โรงงาน 10,000 ตร.ม. พร้อมด้วยสายการผลิตถักตาข่าย gabion อัตโนมัติและสายการผลิตตาข่ายเชื่อม`,
    },
    {
      q_en: `What products does ${companyName} manufacture?`,
      q_zh: `${companyName}生产哪些产品？`,
      q_vi: `${companyName} sản xuất những sản phẩm gì?`,
      q_th: `${companyName}ผลิตสินค้าอะไรบ้าง?`,
      a_en: `${companyName} manufactures 9 product categories: welded wire mesh, gabion boxes, chain link fences, rockfall protection nets, razor/barbed wire, noise barriers, blast barriers, stainless steel rope nets, and crowd barriers. All products are customizable.`,
      a_zh: `${companyName}生产9大品类产品：电焊网、石笼网箱、勾花网围栏、边坡防护网、刺绳/刀片刺绳、声屏障、防爆护栏、不锈钢绳网、临时围栏。全部支持定制。`,
      a_vi: `${companyName} sản xuất 9 nhóm sản phẩm: lưới hàn, hộp gabion, hàng rào lưới xích, lưới chống đá rơi, dây kẽm gai/dây gai dao, rào chắn tiếng ồn, rào chắn chống nổ, lưới dây thép không gỉ, và rào chắn đám đông. Tất cả sản phẩm đều có thể tùy chỉnh theo yêu cầu.`,
      a_th: `${companyName} ผลิตสินค้า 9 หมวดหมู่: ตาข่ายเชื่อม, กล่อง gabion, รั้วตาข่ายลูกโซ่, ตาข่ายป้องกันหินพัง, ลวดหนาม/ลวดมีด, แผ่นกันเสียง, รั้วกันระเบิด, ตาข่ายเชือกเหล็กไร้สนิม, และรั้วกันฝูงชน สินค้าทุกรายการสามารถปรับแต่งตามความต้องการได้`,
    },
    {
      q_en: `Does ${companyName} support OEM/ODM and trial orders?`,
      q_zh: `${companyName}是否支持OEM/ODM和试单？`,
      q_vi: `${companyName} có hỗ trợ OEM/ODM và đơn hàng dùng thử không?`,
      q_th: `${companyName} รองรับ OEM/ODM และคำสั่งซื้อทดลองหรือไม่?`,
      a_en: `Yes. ${companyName} supports OEM and ODM manufacturing with custom dimensions, wire diameters, and coatings. Trial orders start from as low as 50 m² so you can test quality before placing a bulk order.`,
      a_zh: `支持。${companyName}提供OEM和ODM定制制造，可来图来样定制尺寸、丝径和涂层。试单最低50㎡起，方便客户验货后再进行大批量采购。`,
      a_vi: `Có. ${companyName} hỗ trợ sản xuất OEM và ODM với kích thước, đường kính dây và lớp phủ tùy chỉnh. Đơn hàng dùng thử bắt đầu từ mức thấp nhất 50 m² để bạn có thể kiểm tra chất lượng trước khi đặt hàng số lượng lớn.`,
      a_th: `รองรับ ${companyName} ให้บริการผลิตแบบ OEM และ ODM โดยปรับขนาด เส้นผ่านศูนย์กลางลวด และการเคลือบตามความต้องการ คำสั่งซื้อทดลองเริ่มต้นเพียง 50 m² เพื่อให้คุณทดสอบคุณภาพก่อนสั่งซื้อจำนวนมาก`,
    },
  ];

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: pickLocale(f, 'q', locale),
      acceptedAnswer: {
        '@type': 'Answer',
        text: pickLocale(f, 'a', locale),
      },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />;
}

// ── Metadata ──
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const data = await fetchAboutData();
  const title = t(data.config, 'about_seo_title_en', locale) || (tLabel('关于安固丝网', 'About Angu Wire Mesh', locale));
  const desc = t(data.config, 'about_seo_desc_en', locale) || '';
  const keywords = t(data.config, 'about_seo_keywords_en', locale) || '';
  return generatePageMeta('about', locale, `/${locale}/about`, {
    title,
    description: desc,
    keywords,
    ogType: 'article',
  });
}

// ── Page ──
export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const data = await fetchAboutData();
  const siteCfg = await fetchSiteConfig();
  const cfg = (k: string) => t(data.config, k, locale) || t(siteCfg, k, locale);

  const timeline = data.timeline || [];
  const team = data.team || [];
  const factoryImages = data.factoryImages || [];
  const whyChooseUs = data.whyChooseUs || [];

  // Dynamic strings from config
  const headerTitle = cfg('about_header_title_en') || (tLabel('关于安固丝网', 'About Angu Wire Mesh', locale));
  const headerSubtitle = cfg('about_header_subtitle_en') || (tLabel('12年丝网制造经验，ISO 9001认证，出口30+国家。', 'wire mesh manufacturing since 2014, ISO 9001 certified, exported to 30+ countries.', locale));
  const sectionLabel = cfg('about_section_label_en') || (tLabel('关于我们', 'About Us', locale));
  const overviewTitle = cfg('about_overview_title_en') || '';
  const overviewP1 = cfg('about_overview_p1_en') || '';
  const overviewP2 = cfg('about_overview_p2_en') || '';
  const timelineTitle = cfg('about_timeline_title_en') || (tLabel('发展历程', 'Our Journey', locale));
  const teamTitle = cfg('about_team_title_en') || (tLabel('业务团队', 'Sales Team', locale));
  const teamSubtitle = cfg('about_team_subtitle_en') || '';
  const factoryTitle = cfg('about_factory_title_en') || (tLabel('我们的工厂', 'Our Factory', locale));
  const factorySubtitle = cfg('about_factory_subtitle_en') || '';
  const certTitle = cfg('about_cert_title_en') || (tLabel('认证与质量保证', 'Certifications & Quality Assurance', locale));
  const whyUsTitle = cfg('about_why_us_title_en') || (tLabel('为什么选择安固？', 'Why Choose Angu?', locale));
  const statsLabel = cfg('about_stats_label_en') || (tLabel('全球客户', 'Global Clients', locale));
  const locationBadge = cfg('about_location_badge_en') || (tLabel('安平 · 中国丝网之都', 'Anping · China Wire Mesh Capital', locale));

  // Dynamic stats from site config
  // 成立年限统一由工商登记日期计算；去掉历史配置里可能带的 "+"，
  // 否则下方 `${statYears}+` 会渲染成 "12++"。
  const statYears = (t(siteCfg, 'stats_years', locale) || String(YEARS_IN_BUSINESS)).replace(/\+$/, '');
  // 配置里可能已经带 "+"（如 "30+"），下面渲染时会再拼一次 "+"，
  // 不先剥掉就会输出 "30++"（2026-10-26 复检第 6 条）。
  const statCountries = (t(siteCfg, 'stats_countries', locale) || '30').replace(/\+$/, '');
  const statProducts = (t(siteCfg, 'stats_products', locale) || '30').replace(/\+$/, '');
  const statInspection = t(siteCfg, 'stats_inspection', locale) || '100%';

  // Dynamic hero badge text
  const heroBadge = cfg('hero_badge_en') || (tLabel('ISO 9001/14001/45001 三体系认证制造商', 'ISO 9001 / 14001 / 45001 Certified Manufacturer', locale));

  // Company hero image for right-side visual (from site_config, fallback to first factory image)
  // site_config returns { en: '...', zh: '...' } format for about_company_image
  const siteCfgAny = siteCfg as any;
  const companyHeroImage = siteCfgAny?.about_company_image?.[locale] 
    || siteCfgAny?.about_company_image?.en 
    || (factoryImages.length > 0 ? factoryImages[0].image_url : '/images/products/gabion-box.jpg');
  const companyHeroAlt = tLabel('安固工厂产品展示', 'Angu factory product showcase', locale);

  // Dynamic badges from config with locale-aware text
  const badgeDefs = [
    { en: 'ISO 9001 / 14001 / 45001', zh: 'ISO 三体系认证', vi: 'Chứng nhận ISO 3 hệ thống', th: 'ใบรับรอง ISO 3 ระบบ' },
    { en: 'CE Marking · Rockfall Nets', zh: 'CE 认证 · 落石防护网', vi: 'Dấu CE · Lưới chống đá rơi', th: 'เครื่องหมาย CE · ตะแกรงกันหินร่วง' },
    { en: `${statYears} Years Experience`, zh: `${statYears} 年经验`, vi: `${statYears} Năm Kinh Nghiệm`, th: `${statYears} ปีประสบการณ์` },
    { en: `${statCountries}+ Countries Exported`, zh: `出口 ${statCountries}+ 国家`, vi: `Xuất Khẩu ${statCountries}+ Quốc Gia`, th: `ส่งออก ${statCountries}+ ประเทศ` },
  ];

  // GEO: internal links to product categories
  const geoCategories = [
    { slug: 'wire-mesh', en: 'Welded Wire Mesh', zh: '电焊网', vi: 'Lưới Hàn', th: 'ตะแกรงเชื่อม' },
    { slug: 'fence', en: 'Chain Link & Fencing', zh: '勾花网围栏', vi: 'Hàng Rào Link Chain', th: 'รั้วลวดโซ่' },
    { slug: 'gabion', en: 'Gabion Boxes', zh: '石笼网箱', vi: 'Rọ Đá', th: 'กล่องเกเบี้ยน' },
    { slug: 'protection-net', en: 'Protection Nets', zh: '边坡防护网', vi: 'Lưới Chống Trượt', th: 'ตาข่ายกันดินถล่ม' },
    { slug: 'noise-barrier', en: 'Noise Barriers', zh: '声屏障', vi: 'Rào Chống Tiếng Ồn', th: 'แผ่นกันเสียง' },
  ];

  // About FAQ for GEO
  const companyName = cfg('company_name_en') || 'Angu Wire Mesh';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* GEO: Organization JSON-LD */}
      <OrganizationLd locale={locale} config={data.config} />
      {/* GEO: FAQ structured data */}
      <AboutFaqLd locale={locale} config={data.config} />
      {/* GEO: AboutPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: headerTitle,
          description: overviewP1 || headerSubtitle,
          url: `https://www.angumesh.com/${locale}/about`,
          mainEntity: {
            '@type': 'Organization',
            name: cfg('company_name_en') || 'Angu Wire Mesh',
            url: 'https://www.angumesh.com',
            sameAs: ['https://www.facebook.com/share/18mLHaLvMa/'],
          },
        }) }}
      />

      {/* Header (dark gradient) */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(59,130,246,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.4) 0%, transparent 50%)'}} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <BreadcrumbNav
              locale={locale}
              items={[
                { label: tLabel('首页', 'Home', locale), href: tLabel('/zh', '/en', locale) },
                { label: tLabel('关于我们', 'About', locale), href: `/${locale}/about` },
              ]}
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-4 leading-tight">{headerTitle}</h1>
            <p className="text-lg text-blue-200/80 leading-relaxed">{headerSubtitle}</p>
          </div>
        </div>
      </section>

      {/* SEO Intro paragraph (AI crawl corpus) */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600">
            {locale === 'zh' ? (
              <p>
                <strong>安固丝网（Angu Wire Mesh）</strong>是位于中国河北省安平县的<strong>ISO 9001 / ISO 14001 / ISO 45001 三体系认证制造商</strong>，
                专注石笼网箱、边坡防护网、勾花网围栏、电焊网等9大丝网品类的研发、生产和出口。
                工厂占地10,000㎡，年产5,000吨，<strong>自2014年成立</strong>，产品出口30+国家。
                我们支持来图来样OEM/ODM定制，提供从样品到门到门物流的全链路服务。
              </p>
            ) : locale === 'vi' ? (
              <p>
                <strong>Angu Wire Mesh</strong> là <strong>nhà sản xuất được chứng nhận ISO 9001 / 14001 / 45001</strong> đặt tại Huyện An Bình, Hà Bắc, Trung Quốc —
                trung tâm toàn cầu về sản xuất lưới thép. Chúng tôi chuyên nghiên cứu, sản xuất và xuất khẩu 9 danh mục sản phẩm bao gồm
                rọ đá, lưới chống rơi đá, hàng rào lưới mắt cáo và lưới thép hàn. Vận hành từ <strong>nhà máy 10.000 m² với năng lực hàng năm 5.000 tấn</strong>,
                chúng tôi sản xuất từ năm 2014 và xuất khẩu đến hơn 30 quốc gia. Hỗ trợ OEM/ODM theo bản vẽ và mẫu, dịch vụ toàn vòng từ nguyên mẫu đến logistics tận nơi.
              </p>
            ) : locale === 'th' ? (
              <p>
                <strong>Angu Wire Mesh</strong> เป็น <strong>ผู้ผลิตที่ได้รับการรับรอง ISO 9001 / 14001 / 45001</strong> ตั้งอยู่ที่เขตอันผิง หฺอเป่ย ประเทศจีน —
                ศูนย์กลางการผลิตตะแกรงลวดของโลก เราเชี่ยวชาญด้าน R&D การผลิต และการส่งออก 9 หมวดสินค้า รวมถึง
                กล่องเกเบี้ยน ตะแกรงป้องกันหินตก รั้วตะแกรงถัก และตะแกรงลวดเชื่อม ดำเนินงานจาก <strong>โรงงาน 10,000 ตร.ม. ผลิตได้ 5,000 ตันต่อปี</strong>
                เราผลิตตั้งแต่ปี 2014 และส่งออกไปกว่า 30 ประเทศ รองรับ OEM/ODM ตามแบบและตัวอย่าง บริการครบวงจรตั้งแต่ต้นแบบถึงการขนส่งถึงบ้าน
              </p>
            ) : (
              <p>
                <strong>Angu Wire Mesh</strong> is an <strong>ISO 9001 / 14001 / 45001 certified manufacturer</strong> based in Anping County, Hebei, China —
                the global hub of wire mesh production. We specialize in R&amp;D, manufacturing, and export of 9 product categories including
                gabion boxes, rockfall protection nets, chain link fences, and welded wire mesh. Operating from a <strong>10,000 m² factory with 5,000 tons annual capacity</strong>,
                we have been manufacturing since 2014 and ship to 30+ countries. We support drawing-to-sample OEM/ODM and full-cycle service from prototyping to door-to-door logistics.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Company Profile (unified card) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* ── Upper: 5/7 + 5/12 grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-8 md:p-12">
            {/* Left column (7/12) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">{sectionLabel}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">{overviewTitle}</h2>

              {/* Location inline */}
              <div className="flex items-center gap-2 mb-6 text-sm text-slate-500">
                <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{locationBadge}</span>
              </div>

              {overviewP1 && <p className="text-slate-600 leading-relaxed mb-4">{overviewP1}</p>}
              {overviewP2 && <p className="text-slate-600 leading-relaxed mb-6">{overviewP2}</p>}

              {/* Product category pills */}
              <div className="mb-5">
                <p className="text-sm font-semibold text-slate-700 mb-2">
                  {tLabel('主营产品：', 'Main Products:', locale)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {geoCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/${locale}/products?category=${cat.slug}`}
                      className="inline-flex items-center text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-700 transition-colors border border-slate-200"
                    >
                      {locale === 'zh' ? cat.zh : locale === 'vi' ? (cat as any).vi || cat.en : locale === 'th' ? (cat as any).th || cat.en : cat.en}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Certification badges */}
              <div className="flex flex-wrap gap-2">
                {badgeDefs.map((badge) => (
                  <span key={badge.en} className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full border border-green-200">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {locale === 'zh' ? badge.zh : locale === 'vi' ? (badge as any).vi || badge.en : locale === 'th' ? (badge as any).th || badge.en : badge.en}
                  </span>
                ))}
              </div>
            </div>

            {/* Right column (5/12): Image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-md h-full min-h-[280px]">
                <img
                  src={companyHeroImage}
                  alt={companyHeroAlt}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                />
                {/* Image bottom overlay with stats highlight */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-white text-sm font-medium">
                        {(locale === 'zh' ? `出口 ${statCountries}+ 国家` : locale === 'vi' ? `Xuất khẩu đến ${statCountries}+ quốc gia` : locale === 'th' ? `ส่งออกไปยัง ${statCountries}+ ประเทศ` : `Exported to ${statCountries}+ Countries`)}
                      </span>
                    </div>
                    <span className="text-white/70 text-xs bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {(locale === 'zh' ? `${statYears}+ 年` : locale === 'vi' ? `${statYears}+ năm` : locale === 'th' ? `${statYears}+ ปี` : `${statYears}+ Yrs`)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="border-t border-slate-100" />

          {/* ── Stats bar (GEO trust signals) ── */}
          <div className="px-8 md:px-12 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                // 字段名必须是 label_en / label_zh…：pickLocale() 找的是 `${field}_${locale}`，
                // 之前写成 labelEn/labelZh，取不到值导致四个标签全部渲染成空白。
                { value: `${statYears}+`, icon: '🏭', label_en: 'Years Experience', label_zh: '年行业经验', label_vi: 'Năm Kinh Nghiệm', label_th: 'ปีประสบการณ์' },
                { value: `${statCountries}+`, icon: '🌍', label_en: 'Countries Exported', label_zh: '出口国家', label_vi: 'Quốc Gia Xuất Khẩu', label_th: 'ประเทศที่ส่งออก' },
                { value: statProducts, icon: '📦', label_en: 'Product Series', label_zh: '产品系列', label_vi: 'Dòng Sản Phẩm', label_th: 'กลุ่มสินค้า' },
                { value: statInspection, icon: '✅', label_en: 'Inspection Rate', label_zh: '质检覆盖率', label_vi: 'Tỷ Lệ Kiểm Tra', label_th: 'อัตราการตรวจสอบ' },
              ].map((s) => (
                <div key={s.label_en} className="bg-slate-50 rounded-xl p-4 text-center hover:bg-blue-50 transition-colors group">
                  <div className="text-xl mb-1">{s.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{pickLocale(s, 'label', locale)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline / Factory / Team / FAQ / Certs / Why Choose Us — below the card, in the page flow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Timeline */}
        {timeline.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{timelineTitle}</h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto" />
            </div>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 via-blue-400 to-blue-300 transform md:-translate-x-0.5" />
              {timeline.map((item, i) => {
                const title = pickLocale(item, 'title', locale);
                const desc = pickLocale(item, 'desc', locale);
                return (
                  <div key={item.id} className={`relative flex items-start mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-2 mt-3 z-10 ring-4 ring-white shadow-md" />
                    <div className={`ml-12 md:ml-0 md:w-[calc(50%-2.5rem)] ${i % 2 === 0 ? 'md:pr-10' : 'md:pl-10'}`}>
                      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">{item.emoji}</span>
                          <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full">{item.year}</span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                    <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Factory Images */}
        {factoryImages.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{factoryTitle}</h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto mb-4" />
              {factorySubtitle && <p className="text-slate-500 max-w-xl mx-auto">{factorySubtitle}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {factoryImages.map((img) => (
                <div key={img.id} className="group relative overflow-hidden rounded-xl aspect-[3/2]">
                  <img src={img.image_url} alt={pickLocale(img, 'alt', locale)} width={600} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="text-white font-medium text-sm">{pickLocale(img, 'alt', locale)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sales Team */}
        {team.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{teamTitle}</h2>
              {teamSubtitle && <p className="text-slate-500 max-w-xl mx-auto">{teamSubtitle}</p>}
              <div className="w-16 h-1 bg-blue-600 mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((person) => (
                <div key={person.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden group">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-4xl shadow-lg group-hover:scale-105 transition-transform duration-300 mb-4 ring-4 ring-white overflow-hidden">
                      {person.avatar && (person.avatar.startsWith('/uploads/') || person.avatar.startsWith('http')) ? (
                        <img src={person.avatar} alt={pickLocale(person, 'name', locale)} width={96} height={96} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        person.avatar
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">{pickLocale(person, 'name', locale)}</h3>
                    <p className="text-blue-600 font-semibold text-sm">{pickLocale(person, 'title', locale)}</p>
                  </div>
                  <div className="p-5 space-y-3">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
                        {tLabel('负责市场', 'Market', locale)}
                      </p>
                      <p className="text-sm font-semibold text-slate-800">{pickLocale(person, 'market', locale)}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{pickLocale(person, 'countries', locale)}</p>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">{pickLocale(person, 'desc', locale)}</p>
                    <div className="border-t border-slate-100 pt-3 space-y-1.5">
                      <a href={`tel:${(person.phone || '').replace(/\s/g, '')}`} className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600 transition-colors">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        {person.phone}
                      </a>
                      {person.whatsapp && (
                        <a href={`https://wa.me/${(person.whatsapp || '').replace(/[^0-9+]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-green-600 hover:text-green-700 transition-colors">
                          <IconWhatsApp className="w-3.5 h-3.5 flex-shrink-0" />
                          WhatsApp
                        </a>
                      )}
                      <a href={`mailto:${person.email}`} className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600 transition-colors">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        {person.email}
                      </a>
                      {person.facebook && (
                        <a href={person.facebook.startsWith('http') ? person.facebook : `https://facebook.com/${person.facebook}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-700 transition-colors">
                          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                          Facebook
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GEO: About FAQ Section (visible + structured data) */}
        <div className="mb-20">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {{
                  vi: `Về ${companyName} — Câu Hỏi Thường Gặp`,
                  th: `เกี่ยวกับ ${companyName} — คำถามที่พบบ่อย`,
                }[locale] || (locale === 'zh' ? `关于${companyName}的常见问题` : `About ${companyName} — FAQ`)}
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                {{
                  vi: 'Tìm hiểu thông tin cơ bản về công ty chúng tôi: vị trí, chứng nhận, năng lực sản xuất và danh mục sản phẩm.',
                  th: 'เรียนรู้ข้อมูลพื้นฐานเกี่ยวกับบริษัทของเรา: ที่ตั้ง การรับรอง กำลังการผลิต และกลุ่มผลิตภัณฑ์',
                }[locale] || (tLabel('了解安固丝网的基本信息，包括公司位置、认证、产能和产品。', 'Learn about our company basics: location, certifications, capacity, and product range.', locale))}
              </p>
              <div className="w-16 h-1 bg-blue-600 mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  q_en: `Where is ${companyName} located?`,
                  q_zh: `${companyName}在哪里？`,
                  q_vi: `${companyName} ở đâu?`,
                  q_th: `${companyName} ตั้งอยู่ที่ไหน?`,
                  a_en: `${companyName} is located in Anping County, Hengshui City, Hebei Province, China — known as the "Wire Mesh Capital" of the world, near Tianjin Port.`,
                  a_zh: `${companyName}位于中国河北省衡水市安平县，被誉为"中国丝网之都"，紧邻天津港。`,
                  a_vi: `${companyName} tọa lạc tại huyện An Bình, thành phố Hành Thủy, tỉnh Hà Bắc, Trung Quốc — được biết đến là "Thủ Đô Lưới Thép" của thế giới, gần cảng Thiên Tân.`,
                  a_th: `${companyName} ตั้งอยู่ในอำเภออันผิง เมืองเหิงสุ่ย มณฑลเหอเป่ย ประเทศจีน — ที่รู้จักกันในชื่อ "เมืองหลวงลวดตาข่าย" ของโลก ใกล้ท่าเรือเทียนจิน`,
                },
                {
                  q_en: `Is ${companyName} certified?`,
                  q_zh: `${companyName}有哪些认证？`,
                  q_vi: `${companyName} có những chứng nhận nào?`,
                  q_th: `${companyName} ได้รับการรับรองอะไรบ้าง?`,
                  a_en: `Yes — ISO 9001:2015 quality management, CE certification, and ETAG 027 (rockfall protection). SGS/BV third-party inspection available.`,
                  a_zh: `ISO 9001:2015质量管理体系、CE产品认证、ETAG 027欧洲技术认证（边坡防护网）。支持SGS/BV第三方检验。`,
                  a_vi: `Có — ISO 9001:2015 quản lý chất lượng, chứng nhận CE, và ETAG 027 (chống đá rơi). Kiểm tra bên thứ ba SGS/BV có sẵn.`,
                  a_th: `มี — การจัดการคุณภาพ ISO 9001:2015, การรับรอง CE, และ ETAG 027 (การป้องกันหินร่วง) ตรวจสอบโดยบุคคลที่สาม SGS/BV ได้`,
                },
                {
                  q_en: `What is the factory capacity?`,
                  q_zh: `工厂产能如何？`,
                  q_vi: `Năng lực nhà máy thế nào?`,
                  q_th: `กำลังการผลิตของโรงงานเป็นอย่างไร?`,
                  a_en: `10,000 m² factory with 5,000 tons annual capacity. 6 automated gabion lines and 2 welding lines.`,
                  a_zh: `10,000㎡工厂面积，年产5,000吨。6条自动石笼网编织线、2条焊接网生产线。`,
                  a_vi: `Nhà máy 10.000 m² với năng lực 5.000 tấn/năm. 6 dây chuyền rọ đá tự động và 2 dây chuyền hàn.`,
                  a_th: `โรงงาน 10,000 ตร.ม. กำลังการผลิต 5,000 ตัน/ปี สายการผลิตกล่องเกเบี้ยนอัตโนมัติ 6 สาย และสายการเชื่อม 2 สาย`,
                },
                {
                  q_en: `What products are available?`,
                  q_zh: `产品种类有哪些？`,
                  q_vi: `Có những sản phẩm nào?`,
                  q_th: `มีผลิตภัณฑ์อะไรบ้าง?`,
                  a_en: `9 categories: welded mesh, gabion boxes, chain link fences, rockfall nets, razor wire, noise barriers, blast barriers, stainless rope nets, crowd barriers.`,
                  a_zh: `9大品类：电焊网、石笼网箱、勾花网围栏、边坡防护网、刺绳、声屏障、防爆护栏、不锈钢绳网、临时围栏。`,
                  a_vi: `9 danh mục: lưới hàn, rọ đá, hàng rào mắt xích, lưới chống đá rơi, dây thép gai, rào chắn tiếng ồn, hàng rào chống nổ, lưới dây thép không gỉ, hàng rào tạm thời.`,
                  a_th: `9 หมวดหมู่: ตาข่ายเชื่อม, กล่องเกเบี้ยน, รั้วตาข่าย, ตาข่ายกันหินร่วง, ลวดหนาม, แผงกั้นเสียง, รั้วกันระเบิด, ตาข่ายสแตนเลส, รั้วชั่วคราว`,
                },
                {
                  q_en: `Can I visit the factory?`,
                  q_zh: `可以参观工厂吗？`,
                  q_vi: `Có thể tham quan nhà máy không?`,
                  q_th: `สามารถเยี่ยมชมโรงงานได้หรือไม่?`,
                  a_en: `Absolutely. We welcome factory visits from clients worldwide. Our team can arrange airport pickup and accommodation. Contact us to schedule.`,
                  a_zh: `当然可以。我们欢迎全球客户来厂参观，可安排接机和住宿。请联系我们预约。`,
                  a_vi: `Hoàn toàn có thể. Chúng tôi hoan nghênh khách hàng toàn cầu tham quan nhà máy. Đội ngũ chúng tôi có thể sắp xếp đón sân bay và chỗ ở. Liên hệ để lên lịch.`,
                  a_th: `แน่นอน เรายินดีต้อนรับการเยี่ยมชมโรงงานจากลูกค้าทั่วโลก ทีมงานของเราสามารถจัดการรับสนามบินและที่พัก ติดต่อเราเพื่อนัดหมาย`,
                },
                {
                  q_en: `How to place a trial order?`,
                  q_zh: `如何试单？`,
                  q_vi: `Làm thế nào để đặt hàng thử?`,
                  q_th: `จะสั่งซื้อทดลองได้อย่างไร?`,
                  a_en: `MOQ is as low as 50 m². Contact our sales team with your requirements, and we'll prepare a proforma invoice within 24 hours.`,
                  a_zh: `最低起订量仅50㎡。联系销售经理提供需求，24小时内出形式发票。`,
                  a_vi: `MOQ thấp nhất chỉ 50 m². Liên hệ đội ngũ kinh doanh với yêu cầu của bạn, chúng tôi sẽ chuẩn bị hóa đơn chiếu lệ trong 24 giờ.`,
                  a_th: `MOQ ต่ำสุดเพียง 50 ตร.ม. ติดต่อทีมขายของเราพร้อมความต้องการของคุณ เราจะเตรียมใบแจ้งหนี้ Proforma ภายใน 24 ชั่วโมง`,
                },
              ].map((faq, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-800 mb-2 flex items-start gap-2">
                    <span className="text-blue-500 font-bold flex-shrink-0">Q{i + 1}.</span>
                    {(faq as any)['q_' + locale] || faq.q_en}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{(faq as any)['a_' + locale] || faq.a_en}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications — ISO 三体系（数据见 src/lib/certifications.ts） */}
        <CertificationsSection locale={locale} title={certTitle} />

        {/* Why Choose Us */}
        {whyChooseUs.length > 0 && (
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{whyUsTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whyChooseUs.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <span className="text-green-300 mt-0.5 flex-shrink-0">{item.icon || '✓'}</span>
                  <div>
                    <span className="font-medium">{pickLocale(item, 'title', locale)}</span>
                    {item.description_en && (
                      <p className="text-blue-100 text-sm mt-0.5">{pickLocale(item, 'description', locale)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cross-links */}
      <nav aria-label={tLabel('页面导航', 'Page navigation', locale)} className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h3 className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            {tLabel('浏览更多', 'Explore More', locale)}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}/products`} className="px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
              📦 {tLabel('全部产品', 'All Products', locale)}
            </Link>
            <Link href={`/${locale}/solutions`} className="px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
              🎯 {tLabel('行业解决方案', 'Solutions', locale)}
            </Link>
            <Link href={`/${locale}/service`} className="px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
              🛠️ {tLabel('我们的服务', 'Our Services', locale)}
            </Link>
            <Link href={`/${locale}/blog`} className="px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
              📝 {tLabel('行业博客', 'Blog', locale)}
            </Link>
            <Link href={`/${locale}/contact`} className="px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
              ✉️ {tLabel('联系我们', 'Contact Us', locale)}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
