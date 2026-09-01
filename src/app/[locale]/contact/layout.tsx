import type {Metadata} from 'next';
import Link from 'next/link';
import {getSiteConfig} from '@/lib/api';
import {generatePageMeta} from '@/lib/seo-utils';
import { tLabel } from '@/lib/i18n';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return generatePageMeta('contact', locale, `/${locale}/contact`);
}

/** Extract a site-config value with locale fallback */
function v(config: Record<string, {en: string; zh: string}> | undefined, key: string, locale: string, fallbackEn: string, fallbackZh?: string): string {
  if (!config) return locale === 'zh' ? (fallbackZh ?? fallbackEn) : fallbackEn;
  const entry = config[key];
  if (!entry) return locale === 'zh' ? (fallbackZh ?? fallbackEn) : fallbackEn;
  return (entry as Record<string, string>)[locale] || entry.en || (locale === 'zh' ? (fallbackZh ?? fallbackEn) : fallbackEn);
}

export default async function ContactLayout({children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const siteConfig = await getSiteConfig();
  const config = siteConfig?.config;

  // Dynamic values from site_config (with fallback to hardcoded defaults)
  const headerTitle = v(config, 'contact_header_title', locale, 'Contact Us', '联系我们');
  const headerSubtitle = v(config, 'contact_header_subtitle', locale, 'Get in touch with our team for a free consultation and factory-direct quotation.', '与我们的团队联系，获取免费咨询和工厂直供报价。');
  const headerBreadcrumb = v(config, 'contact_header_breadcrumb', locale, 'Contact Us', '联系我们');
  const seoIntro = v(config, 'contact_seo_intro', locale,
    'Angu Wire Mesh — headquartered in Anping County, Hebei, known as the "Wire Mesh Capital of China" — is a professional metal wire mesh manufacturer integrating R&D, production, and sales. With modern production lines and a rigorous quality inspection system, our main product lines include gabion boxes, slope protection nets, fencing systems, chain link fences, stainless steel rope nets, and noise barriers, serving global infrastructure projects. ISO 9001 and CE certified, exported to 30+ countries. Factory-direct, no-middleman model.',
    '安固丝网（Angu Wire Mesh）位于"中国丝网之都"河北安平，是一家集研发、生产、销售于一体的专业金属丝网制造企业。公司拥有现代化生产线和严格的质量检测体系，主营产品涵盖石笼网箱、边坡防护网、护栏网、勾花网围栏、不锈钢绳网、声屏障等多品类。产品通过ISO 9001、CE等国际认证，远销东南亚、中东、非洲、南美等30多个国家和地区。我们以"工厂直供、无中间商"的模式，为全球客户提供高性价比的定制化丝网解决方案。');
  const faqTitle = v(config, 'contact_faq_title', locale, 'Contacting Angu — FAQ', '联系安固丝网 — 常见问题');
  const crosslinksTitle = v(config, 'contact_crosslinks_title', locale, 'Explore More', '浏览更多');

  // Contact info from config for JSON-LD
  const ldPhone = v(config, 'phone', locale, '+86-188-0318-9797');
  const ldEmail = v(config, 'email', locale, 'anguwiremesh@gmail.com');

  // ── JSON-LD structured data ──
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: tLabel('首页', 'Home', locale), item: `https://www.angumesh.com/${locale}`},
      {'@type': 'ListItem', position: 2, name: headerBreadcrumb, item: `https://www.angumesh.com/${locale}/contact`},
    ],
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: locale === 'zh' ? `${headerTitle} — 安固丝网` : `${headerTitle} — Angu Wire Mesh`,
    description: locale === 'zh'
      ? '联系安固丝网获取石笼网箱、边坡防护网、护栏网等产品的工厂直供报价。24小时内回复。电话/WhatsApp/邮件/在线表单。'
      : locale === 'vi'
      ? 'Liên hệ Angu Wire Mesh để nhận báo giá trực tiếp nhà máy cho rọ đá, lưới chống rơi đá, hàng rào lưới mắt cáo và hơn thế nữa. Phản hồi trong 24 giờ qua điện thoại, WhatsApp, email hoặc biểu mẫu trực tuyến.'
      : locale === 'th'
      ? 'ติดต่อ Angu Wire Mesh เพื่อรับใบเสนอราคาโรงงานสำหรับกล่องเกเบี้ยน ตะแกรงป้องกันหินตก รั้วตะแกรงถัก และอื่นๆ ตอบกลับภายใน 24 ชม. ทางโทรศัพท์ WhatsApp อีเมล หรือแบบฟอร์มออนไลน์'
      : 'Contact Angu Wire Mesh for factory-direct quotes on gabion boxes, rockfall nets, chain link fences, and more. Response within 24 hours via phone, WhatsApp, email, or online form.',
    url: `https://www.angumesh.com/${locale}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: 'An Gu Wire Mesh Products Co., Ltd.',
      url: 'https://www.angumesh.com',
      telephone: ldPhone,
      email: ldEmail,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Anping County',
        addressRegion: 'Hebei',
        addressCountry: 'CN',
      },
    },
  };

  const faqItems = [
    {
      q: {en: 'How fast will I get a quote from Angu Wire Mesh?', zh: '联系安固丝网后多久能收到报价？', vi: 'Tôi sẽ nhận được báo giá từ Angu Wire Mesh bao lâu?', th: 'ฉันจะได้รับใบเสนอราคาจาก Angu Wire Mesh เร็วแค่ไหน?'},
      a: {en: 'We typically respond within 24 hours during business hours (Mon–Sat, UTC+8). For urgent inquiries, WhatsApp is the fastest channel — our sales team monitors it in real time.', zh: '工作时间（周一至周六，UTC+8）通常在24小时内回复。紧急询盘建议使用WhatsApp，销售团队实时在线。', vi: 'Chúng tôi thường phản hồi trong vòng 24 giờ trong giờ làm việc (T2–T7, UTC+8). Đối với yêu cầu gấp, WhatsApp là kênh nhanh nhất — đội ngũ kinh doanh theo dõi theo thời gian thực.', th: 'เรามักตอบกลับภายใน 24 ชม. ในเวลาทำการ (จ.–ส. UTC+8) สำหรับการสอบถามด่วน WhatsApp เป็นช่องทางเร็วที่สุด — ทีมขายของเราติดตามแบบเรียลไทม์'},
    },
    {
      q: {en: 'What information should I include in my inquiry?', zh: '询盘应包含哪些信息？', vi: 'Tôi nên cung cấp những thông tin gì trong yêu cầu?', th: 'ฉันควรระบุข้อมูลใดในการสอบถาม?'},
      a: {en: 'To receive the most accurate quote, please include: product type, specifications (wire diameter, mesh size, dimensions), quantity, surface treatment (galvanized/PVC/Galfan), destination port, and any special requirements.', zh: '为确保报价准确，请提供：产品类型、规格（丝径、网孔、尺寸）、数量、表面处理（镀锌/PVC/高尔凡）、目的港及特殊要求。', vi: 'Để nhận báo giá chính xác nhất, vui lòng bao gồm: loại sản phẩm, thông số (đường kính dây, kích thước mắt lưới, kích thước), số lượng, xử lý bề mặt (mạ kẽm/PVC/Galfan), cảng đích và mọi yêu cầu đặc biệt.', th: 'เพื่อรับใบเสนอราคาที่แม่นยำที่สุด โปรดระบุ: ประเภทสินค้า ข้อมูลจำเพาะ (เส้นผ่านศูนย์กลางลวด ขนาดตาข่าย มิติ) จำนวน การเคลือบผิว (ชุบสังกะสี/PVC/Galfan) ท่าเรือปลายทาง และข้อกำหนดพิเศษใดๆ'},
    },
    {
      q: {en: 'Can I request a video inspection of the factory or products?', zh: '可以申请视频验厂或验货吗？', vi: 'Tôi có thể yêu cầu kiểm tra video nhà máy hoặc sản phẩm không?', th: 'ฉันขอตรวจสอบวิดีโอโรงงานหรือสินค้าได้หรือไม่?'},
      a: {en: 'Yes! We offer free factory video tours and pre-shipment product inspections via video call. Third-party inspections (SGS, BV, CCIC) can also be arranged upon request.', zh: '可以！我们提供免费视频验厂和出货前视频验货。也可按需安排SGS、BV、CCIC等第三方检验。', vi: 'Có! Chúng tôi cung cấp tham quan nhà máy qua video miễn phí và kiểm tra sản phẩm trước khi gửi hàng qua video call. Kiểm tra bên thứ ba (SGS, BV, CCIC) cũng có thể được sắp xếp theo yêu cầu.', th: 'ได้! เราให้บริการทัวร์โรงงานวิดีโอฟรีและตรวจสอบสินค้าก่อนส่งมอบผ่านวิดีโอคอล การตรวจสอบโดยบุคคลที่สาม (SGS, BV, CCIC) สามารถจัดได้ตามคำขอ'},
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: locale === 'zh' ? item.q.zh : locale === 'vi' ? (item.q.vi || item.q.en) : locale === 'th' ? (item.q.th || item.q.en) : item.q.en,
      acceptedAnswer: {'@type': 'Answer', text: locale === 'zh' ? item.a.zh : locale === 'vi' ? (item.a.vi || item.a.en) : locale === 'th' ? (item.a.th || item.a.en) : item.a.en},
    })),
  };

  return (
    <>
      {/* ========== Structured Data ========== */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(contactSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqSchema)}} />

      {/* ========== Hero Header (dark gradient) ========== */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(59,130,246,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.4) 0%, transparent 50%)'}} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-blue-300 text-sm mb-4">
              <Link href={`/${locale}`} className="hover:text-white transition-colors">{tLabel('首页', 'Home', locale)}</Link>
              <span>/</span>
              <span className="text-white">{headerBreadcrumb}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {headerTitle}
            </h1>
            <p className="text-lg text-blue-200/80 leading-relaxed">
              {headerSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ========== Company Introduction (SEO/GEO corpus) ========== */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600">
            <p>{seoIntro}</p>
          </div>
        </div>
      </div>

      {/* ========== Main Form Area ========== */}
      <div className="min-h-screen bg-slate-50">
        {children}
      </div>

      {/* ========== FAQ (GEO) ========== */}
      <div className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">{faqTitle}</h2>
          <div className="space-y-3">
            {faqItems.map((faq, i) => (
              <details key={i} className="group bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-slate-800 hover:bg-slate-100 transition-colors list-none">
                  <span>{locale === 'zh' ? faq.q.zh : locale === 'vi' ? (faq.q.vi || faq.q.en) : locale === 'th' ? (faq.q.th || faq.q.en) : faq.q.en}</span>
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {locale === 'zh' ? faq.a.zh : locale === 'vi' ? (faq.a.vi || faq.a.en) : locale === 'th' ? (faq.a.th || faq.a.en) : faq.a.en}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* ========== Cross-links ========== */}
      <nav aria-label={tLabel('页面导航', 'Page navigation', locale)} className="bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h3 className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            {crosslinksTitle}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              {href: 'products', icon: '📦', en: 'All Products', zh: '全部产品', vi: 'Tất cả sản phẩm', th: 'สินค้าทั้งหมด'},
              {href: 'solutions', icon: '🎯', en: 'Solutions', zh: '行业解决方案', vi: 'Giải pháp', th: 'โซลูชัน'},
              {href: 'service', icon: '🛠️', en: 'Our Services', zh: '我们的服务', vi: 'Dịch vụ', th: 'บริการของเรา'},
              {href: 'about', icon: '🏢', en: 'About Us', zh: '关于我们', vi: 'Về chúng tôi', th: 'เกี่ยวกับเรา'},
              {href: 'blog', icon: '📝', en: 'Blog', zh: '行业博客', vi: 'Blog', th: 'บล็อก'},
            ].map(link => (
              <Link key={link.href} href={`/${locale}/${link.href}`} className="px-5 py-2.5 bg-white rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
                <span aria-hidden="true">{link.icon}</span> {locale === 'zh' ? link.zh : locale === 'vi' ? (link.vi || link.en) : locale === 'th' ? (link.th || link.en) : link.en}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
