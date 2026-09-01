import type {Metadata} from 'next';
import Link from 'next/link';
import {getSiteConfig} from '@/lib/api';
import {generatePageMeta} from '@/lib/seo-utils';
import { tLabel } from '@/lib/i18n';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return generatePageMeta('service', locale, `/${locale}/service`);
}

export default async function ServicePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = (en: string, zh: string, vi: string, th: string) => locale === 'zh' ? zh : locale === 'vi' ? vi : locale === 'th' ? th : en;
  const siteConfig = await getSiteConfig();
  const config = siteConfig?.config;

  const v = (key: string, fbEn: string, fbZh?: string) => {
    const entry = config?.[key];
    if (!entry) return locale === 'zh' ? (fbZh ?? fbEn) : fbEn;
    return (entry as Record<string, string>)[locale] || entry.en || (locale === 'zh' ? (fbZh ?? fbEn) : fbEn);
  };
  const headerTitle = v('service_header_title', 'Our Services', '我们的服务');
  const headerSubtitle = v('service_header_subtitle', 'Factory-direct manufacturing, global logistics, and end-to-end project support for wire mesh procurement.', '工厂直供制造、全球物流和端到端丝网采购项目支持。');
  const headerBreadcrumb = v('service_header_breadcrumb', 'Services', '服务');
  const seoIntro = v('service_seo_intro',
    'Angu Wire Mesh provides full-service wire mesh solutions: custom manufacturing (OEM/ODM), global logistics, documentation support, third-party inspection (SGS/BV/CCIC), and dedicated 24/7 sales support. Factory-direct pricing from Anping, Hebei — China Wire Mesh Capital.',
    '安固丝网提供全套丝网解决方案：定制生产（OEM/ODM）、全球物流、单证支持、第三方检验（SGS/BV/CCIC）和专属24/7销售支持。工厂直供，来自河北安平——中国丝网之都。'
  );
  const faqTitle = v('service_faq_title', 'Frequently Asked Questions', '常见问题');
  const faqDesc = v('service_faq_desc', 'Common questions about working with Angu Wire Mesh', '关于与安固丝网合作的常见问题');
  const crosslinksTitle = v('service_crosslinks_title', 'Explore More', '了解更多');

  const services = locale === 'zh' ? [
    {icon: '📐', title: '定制生产', desc: '完整的OEM/ODM能力。根据您的规格定制尺寸、材质、网孔大小、表面处理和包装。'},
    {icon: '🚢', title: '全球运输', desc: '完整的出口物流：海运（拼箱/整箱）、空运、快递。提供大多数国家的门到门配送。'},
    {icon: '📋', title: '单证支持', desc: '完整的出口单证：商业发票、装箱单、提单、原产地证、质检报告。'},
    {icon: '🎨', title: 'Logo与包装定制', desc: '500件以上订单提供定制Logo印刷、彩盒包装和品牌单证。'},
    {icon: '💬', title: '24/7销售支持', desc: '销售团队通过WhatsApp、邮件和微信提供实时沟通，贯穿整个项目周期。'},
    {icon: '🔍', title: '第三方检验', desc: '发货前可进行SGS、BV或CCIC检验。所有订单均可提供工厂视频检验。'},
  ] : locale === 'vi' ? [
    {icon: '📐', title: 'Sản xuất tùy chỉnh', desc: 'Năng lực OEM/ODM đầy đủ. Kích thước, vật liệu, kích thước mắt lưới, xử lý bề mặt và đóng gói theo thông số của bạn.'},
    {icon: '🚢', title: 'Vận chuyển toàn cầu', desc: 'Logistics xuất khẩu đầy đủ: vận tải biển (LCL/FCL), hàng không, chuyển phát nhanh. Giao tận nơi cho hầu hết các quốc gia.'},
    {icon: '📋', title: 'Hỗ trợ chứng từ', desc: 'Chứng từ xuất khẩu đầy đủ: Hóa đơn thương mại, Danh sách đóng gói, Vận đơn, Giấy chứng nhận xuất xứ, Báo cáo kiểm tra chất lượng.'},
    {icon: '🎨', title: 'Tùy chỉnh Logo & Đóng gói', desc: 'In logo tùy chỉnh, đóng gói hộp màu và chứng từ có thương hiệu cho đơn hàng trên 500 chiếc.'},
    {icon: '💬', title: 'Hỗ trợ kinh doanh 24/7', desc: 'Đội ngũ kinh doanh sẵn sàng qua WhatsApp, Email và WeChat giao tiếp theo thời gian thực trong suốt vòng đời dự án.'},
    {icon: '🔍', title: 'Kiểm tra bên thứ ba', desc: 'Kiểm tra SGS, BV hoặc CCIC trước khi gửi hàng. Kiểm tra video nhà máy có sẵn cho mọi đơn hàng.'},
  ] : locale === 'th' ? [
    {icon: '📐', title: 'การผลิตแบบกำหนดเอง', desc: 'ความสามารถ OEM/ODM ครบถ้วน ขนาด วัสดุ ขนาดตาข่าย การเคลือบผิว และบรรจุภัณฑ์ตามข้อกำหนดของคุณ'},
    {icon: '🚢', title: 'การขนส่งทั่วโลก', desc: 'ลอจิสติกส์การส่งออกครบวงจร: ขนส่งทางเรือ (LCL/FCL) ทางอากาศ ส่งด่วน ส่งถึงบ้านในหลายประเทศ'},
    {icon: '📋', title: 'การสนับสนุนเอกสาร', desc: 'เอกสารส่งออกครบถ้วน: ใบกำกับสินค้าเชิงพาณิชย์ รายการบรรจุ ใบตราส่ง ใบรับรองแหล่งกำเนิด รายงานตรวจสอบคุณภาพ'},
    {icon: '🎨', title: 'ปรับแต่งโลโก้และบรรจุภัณฑ์', desc: 'พิมพ์โลโก้แบบกำหนดเอง กล่องสี และเอกสารแบรนด์สำหรับคำสั่งซื้อมากกว่า 500 ชิ้น'},
    {icon: '💬', title: 'สนับสนุนการขาย 24/7', desc: 'ทีมขายพร้อมผ่าน WhatsApp อีเมล และ WeChat สื่อสารแบบเรียลไทม์ตลอดวงจรโครงการ'},
    {icon: '🔍', title: 'การตรวจสอบโดยบุคคลที่สาม', desc: 'การตรวจสอบ SGS, BV หรือ CCIC ก่อนส่งมอบ การตรวจสอบวิดีโโรงงานมีให้สำหรับทุกคำสั่งซื้อ'},
  ] : [
    {icon: '📐', title: 'Custom Manufacturing', desc: 'Full OEM/ODM capabilities. Custom dimensions, materials, mesh sizes, surface treatments, and packaging per your specifications.'},
    {icon: '🚢', title: 'Global Shipping', desc: 'Complete export logistics: sea freight (LCL/FCL), air freight, express courier. Door-to-door delivery to most countries.'},
    {icon: '📋', title: 'Documentation Support', desc: 'Full export documentation: Commercial Invoice, Packing List, Bill of Lading, Certificate of Origin, Quality Inspection Reports.'},
    {icon: '🎨', title: 'Logo & Packaging Customization', desc: 'Custom logo printing, color box packaging, and branded documentation for orders above 500 units.'},
    {icon: '💬', title: '24/7 Sales Support', desc: 'Sales team available via WhatsApp, Email, and WeChat for real-time communication throughout your project lifecycle.'},
    {icon: '🔍', title: 'Third-Party Inspection', desc: 'SGS, BV, or CCIC inspections prior to shipment. Factory video inspection available for all orders.'},
  ];

  const processSteps = locale === 'zh' ? [
    {step: '01', title: '收到询盘', desc: '您向我们发送需求——产品类型、规格、数量、交货时间。', icon: '📨'},
    {step: '02', title: '报价', desc: '我们在24小时内提供详细报价，含FOB/CIF价格选项。', icon: '💰'},
    {step: '03', title: '样品（可选）', desc: '符合条件的客户可免费获取样品。批量下单前确认质量。', icon: '📦'},
    {step: '04', title: '生产', desc: '订单进入生产。制造过程中分享进度照片和质检报告。', icon: '🏭'},
    {step: '05', title: '质量检验', desc: '最终检验，如需第三方检测。提供质检报告供确认。', icon: '✅'},
    {step: '06', title: '发货', desc: '打包、装柜、发运。提供追踪信息。可提供门到门配送。', icon: '🚢'},
  ] : locale === 'vi' ? [
    {step: '01', title: 'Nhận yêu cầu', desc: 'Bạn gửi cho chúng tôi yêu cầu — loại sản phẩm, thông số, số lượng, thời gian giao hàng.', icon: '📨'},
    {step: '02', title: 'Báo giá', desc: 'Chúng tôi cung cấp báo giá chi tiết trong vòng 24 giờ với tùy chọn giá FOB/CIF.', icon: '💰'},
    {step: '03', title: 'Mẫu (Tùy chọn)', desc: 'Mẫu miễn phí cho khách hàng đủ điều kiện. Bạn xác minh chất lượng trước khi đặt hàng lớn.', icon: '📦'},
    {step: '04', title: 'Sản xuất', desc: 'Đơn hàng vào sản xuất. Chúng tôi chia sẻ ảnh tiến độ và báo cáo QC trong quá trình sản xuất.', icon: '🏭'},
    {step: '05', title: 'Kiểm tra chất lượng', desc: 'Kiểm tra cuối cùng, kiểm tra bên thứ ba nếu yêu cầu. Báo cáo chất lượng cung cấp để phê duyệt.', icon: '✅'},
    {step: '06', title: 'Vận chuyển', desc: 'Đóng gói, xếp container và gửi hàng. Thông tin theo dõi được cung cấp. Giao tận nơi có sẵn.', icon: '🚢'},
  ] : locale === 'th' ? [
    {step: '01', title: 'รับคำสอบถาม', desc: 'คุณส่งความต้องการให้เรา — ประเภทสินค้า ข้อมูลจำเพาะ จำนวน เวลาส่งมอบ', icon: '📨'},
    {step: '02', title: 'ใบเสนอราคา', desc: 'เราให้ใบเสนอราคาละเอียดภายใน 24 ชม. พร้อมตัวเลือกราคา FOB/CIF', icon: '💰'},
    {step: '03', title: 'ตัวอย่าง (ไม่บังคับ)', desc: 'ตัวอย่างฟรีสำหรับลูกค้าที่มีคุณสมบัติเหมาะสม คุณตรวจสอบคุณภาพก่อนสั่งจำนวนมาก', icon: '📦'},
    {step: '04', title: 'การผลิต', desc: 'คำสั่งซื้อเข้าสู่การผลิต เราแชร์ภาพความคืบหน้าและรายงาน QC ระหว่างการผลิต', icon: '🏭'},
    {step: '05', title: 'ตรวจสอบคุณภาพ', desc: 'การตรวจสอบสุดท้าย ทดสอบโดยบุคคลที่สามหากต้องการ รายงานคุณภาพเพื่ออนุมัติ', icon: '✅'},
    {step: '06', title: 'การขนส่ง', desc: 'บรรจุ ขนย้าย และส่ง พร้อมข้อมูลติดตาม ส่งถึงบ้านได้', icon: '🚢'},
  ] : [
    {step: '01', title: 'Inquiry Received', desc: 'You send us your requirements — product type, specs, quantity, delivery time.', icon: '📨'},
    {step: '02', title: 'Quotation', desc: 'We provide a detailed quotation within 24 hours with FOB/CIF pricing options.', icon: '💰'},
    {step: '03', title: 'Sample (Optional)', desc: 'Free samples available for qualified customers. You verify quality before bulk order.', icon: '📦'},
    {step: '04', title: 'Production', desc: 'Order enters production. We share progress photos and QC reports during manufacturing.', icon: '🏭'},
    {step: '05', title: 'Quality Check', desc: 'Final inspection, third-party testing if requested. Quality report provided for approval.', icon: '✅'},
    {step: '06', title: 'Shipping', desc: 'Packed, loaded, and shipped. Tracking info provided. Door-to-door delivery available.', icon: '🚢'},
  ];

  const faqs = locale === 'zh' ? [
    {q: '最小起订量（MOQ）是多少？', a: '不同产品MOQ不同。石笼网箱通常50件起订，防护网从100平方米起订。新客户可协商灵活安排。'},
    {q: '典型交货期是多久？', a: '标准产品：7-15天。定制/OEM订单：15-30天，视复杂程度和数量而定。加急订单可协商额外费用。'},
    {q: '你们提供免费样品吗？', a: '是的，大多数产品提供免费样品。客户承担运费。首次批量下单后可退还样品费。'},
    {q: '你们接受哪些付款方式？', a: '我们接受T/T（30%定金，70%发货前）、大额订单（2万美元以上）即期信用证、小额西联汇款，以及样品费PayPal。'},
    {q: '你们能做定制尺寸和规格吗？', a: '当然！我们的优势就是定制生产。提供图纸或规格，我们的工程团队将制定最佳方案。'},
  ] : locale === 'vi' ? [
    {q: 'Số lượng đặt hàng tối thiểu (MOQ) là bao nhiêu?', a: 'MOQ khác nhau tùy theo sản phẩm. Rọ đá thường 50 chiếc. Lưới bảo vệ từ 100 m². Có thể thảo luận linh hoạt cho khách hàng mới.'},
    {q: 'Thời gian giao hàng điển hình là bao lâu?', a: 'Sản phẩm tiêu chuẩn: 7-15 ngày. Đơn hàng tùy chỉnh/OEM: 15-30 ngày tùy độ phức tạp và số lượng. Đơn gấp có thể thương lượng thêm phí.'},
    {q: 'Bạn có cung cấp mẫu miễn phí không?', a: 'Có, chúng tôi cung cấp mẫu miễn phí cho hầu hết sản phẩm. Khách hàng chịu phí vận chuyển. Chi phí mẫu hoàn trả khi đặt đơn hàng lớn đầu tiên.'},
    {q: 'Bạn chấp nhận phương thức thanh toán nào?', a: 'Chấp nhận T/T (30% đặt cọc, 70% trước khi gửi), L/C trả tiền ngay cho đơn lớn (trên $20,000), Western Union cho số tiền nhỏ, PayPal cho phí mẫu.'},
    {q: 'Bạn có làm kích thước và thông số tùy chỉnh không?', a: 'Tuyệt đối! Thế mạnh của chúng tôi là sản xuất tùy chỉnh. Cung cấp bản vẽ hoặc thông số, đội ngũ kỹ thuật sẽ đưa ra giải pháp tốt nhất.'},
  ] : locale === 'th' ? [
    {q: 'จำนวนสั่งซื้อขั้นต่ำ (MOQ) คือเท่าไหร่?', a: 'MOQ แตกต่างกันตามสินค้า เกเบี้ยนมักที่ 50 ชิ้น ตะแกรงป้องกันตั้งแต่ 100 ตร.ม. สามารถหารือยืดหยุ่นสำหรับลูกค้าใหม่ได้'},
    {q: 'ระยะเวลาส่งมอบโดยทั่วไปนานเท่าใด?', a: 'สินค้ามาตรฐาน: 7-15 วัน คำสั่งกำหนดเอง/OEM: 15-30 วัน ขึ้นอยู่กับความซับซ้อนและปริมาณ คำสั่งด่วนเพิ่มค่าใช้จ่ายเพิ่มเติม'},
    {q: 'คุณให้ตัวอย่างฟรีหรือไม่?', a: 'ใช่ เราให้ตัวอย่างฟรีสำหรับสินค้าส่วนใหญ่ ลูกค้ารับผิดชอบค่าขนส่ง ค่าตัวอย่างคืนให้เมื่อสั่งจำนวนมากครั้งแรก'},
    {q: 'คุณรับวิธีการชำระเงินแบบใด?', a: 'รับ T/T (มัดจำ 30%, ชำระ 70% ก่อนส่ง), L/C สำหรับคำสั่งใหญ่ (มากกว่า $20,000), Western Union สำหรับจำนวนเงินน้อย, PayPal สำหรับค่าตัวอย่าง'},
    {q: 'คุณทำขนาดและข้อมูลจำเพาะแบบกำหนดเองได้หรือไม่?', a: 'แน่นอน! จุดแข็งของเราคือการผลิตแบบกำหนดเอง ส่งแบบร่างหรือข้อมูลจำเพาะให้เรา ทีมวิศวกรจะหาทางออกที่ดีที่สุดให้'},
  ] : [
    {q: 'What is the minimum order quantity (MOQ)?', a: 'MOQ varies by product. For gabion boxes, MOQ is typically 50 pieces. For protection nets, it starts from 100 m². We can discuss flexible arrangements for new clients.'},
    {q: 'What is the typical lead time?', a: 'Standard products: 7-15 days. Custom/OEM orders: 15-30 days depending on complexity and quantity. Rush orders can be accommodated with an additional fee.'},
    {q: 'Do you provide free samples?', a: 'Yes, we offer free samples for most products. The client covers the shipping cost. Sample cost is refundable upon placing the first bulk order.'},
    {q: 'What payment terms do you accept?', a: 'We accept T/T (30% deposit, 70% before shipping), L/C at sight for large orders (above $20,000), Western Union for small amounts, and PayPal for sample fees.'},
    {q: 'Can you do custom sizes and specifications?', a: 'Absolutely! Our strength is custom manufacturing. Provide us with your drawings or specifications, and our engineering team will work out the best solution.'},
  ];

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('安固丝网服务项目', 'Angu Wire Mesh Service Catalog', 'Danh mục dịch vụ Angu Wire Mesh', 'แคตตาล็อกบริการ Angu Wire Mesh'),
    numberOfItems: services.length,
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.title,
      description: s.desc,
      url: `https://www.angumesh.com/${locale}/service#service-${i + 1}`,
    })),
  };

  const serviceList = services.map((s, i) => ({
    '@type': 'Service' as const,
    serviceType: s.title,
    description: s.desc,
    position: i + 1,
    provider: {
      '@type': 'Organization',
      name: 'An Gu Wire Mesh Products Co., Ltd.',
      url: 'https://www.angumesh.com',
    },
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    url: `https://www.angumesh.com/${locale}/service#service-${i + 1}`,
  }));

  // ── JSON-LD structured data ──
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: tLabel('首页', 'Home', locale), item: `https://www.angumesh.com/${locale}`},
      {'@type': 'ListItem', position: 2, name: tLabel('服务', 'Services', locale), item: `https://www.angumesh.com/${locale}/service`},
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('安固丝网 — 一站式出口服务', 'Angu Wire Mesh — One-Stop Export Services', 'Angu Wire Mesh — Dịch vụ xuất khẩu một điểm đến', 'Angu Wire Mesh — บริการส่งออกแบบครบวงจร'),
    provider: {
      '@type': 'Organization',
      name: 'An Gu Wire Mesh Products Co., Ltd.',
      url: 'https://www.angumesh.com',
    },
    areaServed: {
      '@type': 'Continent',
      name: t('全球', 'Worldwide', 'Toàn cầu', 'ทั่วโลก'),
    },
    description: t(
      '从定制生产到全球运输的一站式丝网产品出口服务。OEM/ODM定制、海运/空运物流、出口单证、第三方质检。',
      'One-stop export service for wire mesh products from Anping, China. OEM/ODM manufacturing, sea/air freight logistics, export documentation, and third-party quality inspection.',
      'Dịch vụ xuất khẩu lưới thép một điểm đến từ Anping, Trung Quốc. Sản xuất OEM/ODM, vận tải biển/hàng không, chứng từ xuất khẩu, kiểm tra chất lượng bên thứ ba.',
      'บริการส่งออกตะแกรงลวดแบบครบวงจรจากอันผิง ประเทศจีน การผลิต OEM/ODM ลอจิสติกส์ทางเรือ/อากาศ เอกสารการส่งออก และการตรวจสอบคุณภาพโดยบุคคลที่สาม'
    ),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t('服务项目', 'Service Items', 'Mục dịch vụ', 'รายการบริการ'),
      itemListElement: serviceList,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {'@type': 'Answer', text: faq.a},
    })),
  };

  return (
    <>
      {/* ========== Structured Data ========== */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(serviceSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(itemListSchema)}} />

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

      {/* ========== SEO Intro ========== */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600">
            <p>{seoIntro}</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* Services Grid */}
          <div className="mb-20">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('我们提供什么', 'What We Offer', 'Chúng tôi cung cấp', 'เรามอบให้')}</h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => {
                const imgUrl = v(`service_card_${i + 1}_image`, '');
                return (
                <div key={s.title} id={`service-${i + 1}`} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-slate-100 hover:border-blue-200 group">
                  {imgUrl ? (
                    <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden">
                      <img src={imgUrl} alt={s.title} width={300} height={160} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading={i < 3 ? 'eager' : 'lazy'} />
                    </div>
                  ) : (
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">{s.icon}</div>
                  )}
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
                );
              })}
            </div>
          </div>

          {/* Process Flow */}
          <div className="mb-20">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('合作流程', 'How It Works', 'Quy trình hợp tác', 'กระบวนการทำงาน')}</h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto mb-4" />
              <p className="text-slate-500 max-w-xl mx-auto">{t('从询盘到交付——我们简化的流程确保顺畅合作。', 'From inquiry to delivery — our streamlined process ensures smooth collaboration.', 'Từ yêu cầu đến giao hàng — quy trình đơn giản đảm bảo hợp tác suôn sẻ.', 'จากการสอบถามถึงการส่งมอบ — กระบวนการที่คล่องตัวรับประกันความราบรื่นในการร่วมมือกัน')}</p>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute top-12 left-[calc(8.33%+1.5rem)] right-[calc(8.33%+1.5rem)] h-0.5 bg-blue-200" />
              <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                {processSteps.map((step) => (
                  <div key={step.step} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-2xl shadow-lg shadow-blue-500/20 mb-4 ring-4 ring-white relative z-10">
                      {step.icon}
                    </div>
                    <span className="text-xs font-bold text-blue-600 mb-1">STEP {step.step}</span>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">{step.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* OEM/ODM Section */}
          <div className="mb-20">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-4">OEM / ODM</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{t('定制生产解决方案', 'Custom Manufacturing Solutions', 'Giải pháp sản xuất tùy chỉnh', 'โซลูชันการผลิตแบบกำหนดเอง')}</h2>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {t('我们理解每个项目都是独特的。因此，我们提供全面的OEM和ODM服务，根据您的确切需求量身定制。', "We understand that every project is unique. That's why we offer comprehensive OEM and ODM services tailored to your exact requirements.", 'Chúng tôi hiểu rằng mỗi dự án là duy nhất. Do đó, chúng tôi cung cấp dịch vụ OEM và ODM toàn diện theo yêu cầu chính xác của bạn.', 'เราเข้าใจว่าโครงการทุกโครงการมีเอกลักษณ์เฉพาะ ดังนั้นเราจึงมีบริการ OEM และ ODM ครบถ้วนตามความต้องการของคุณ')}
                  </p>
                  <ul className="space-y-3">
                    {(locale === 'zh' ? [
                      '丝径定制：2.0mm至4.5mm',
                      '网孔尺寸定制',
                      '多种表面处理：镀锌、PVC包塑、高尔凡',
                      '任意尺寸定制',
                      '私人标签和品牌包装',
                      '工程图纸和技术支持',
                    ] : locale === 'vi' ? [
                      'Đường kính dây tùy chỉnh: 2.0mm đến 4.5mm',
                      'Kích thước mắt lưới tùy chỉnh',
                      'Nhiều xử lý bề mặt: mạ kẽm, phủ PVC, Galfan',
                      'Kích thước bất kỳ tùy chỉnh',
                      'Nhãn riêng và đóng gói thương hiệu',
                      'Bản vẽ kỹ thuật và hỗ trợ kỹ thuật',
                    ] : locale === 'th' ? [
                      'เส้นผ่านศูนย์กลางลวดกำหนดเอง 2.0mm ถึง 4.5mm',
                      'ขนาดตาข่ายกำหนดเอง',
                      'การเคลือบผิวหลายแบบ: ชุบสังกะสี พัน PVC Galfan',
                      'ขนาดกำหนดเองไม่จำกัด',
                      'ฉลากส่วนตัวและบรรจุภัณฑ์แบรนด์',
                      'แบบร่างทางวิศวกรรมและการสนับสนุนทางเทคนิค',
                    ] : [
                      'Custom wire diameter from 2.0mm to 4.5mm',
                      'Custom mesh aperture sizes',
                      'Various surface treatments: galvanized, PVC coated, Galfan',
                      'Custom dimensions up to any size',
                      'Private labeling and branded packaging',
                      'Engineering drawings and technical support',
                    ]).map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="text-green-500 font-bold">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                  <h3 className="font-bold text-slate-900">{t('OEM流程', 'OEM Process', 'Quy trình OEM', 'กระบวนการ OEM')}</h3>
                  {(locale === 'zh' ? ['1. 发送规格/图纸', '2. 工程师评估可行性', '3. 48小时内免费报价', '4. 样品生产（如需要）', '5. 确认后批量生产', '6. 质检与发货'] : locale === 'vi' ? ['1. Gửi thông số/bản vẽ', '2. Kỹ sư đánh giá khả thi', '3. Báo giá miễn phí trong 48 giờ', '4. Sản xuất mẫu (nếu cần)', '5. Sản xuất hàng loạt sau phê duyệt', '6. Kiểm tra chất lượng & vận chuyển'] : locale === 'th' ? ['1. ส่งข้อมูลจำเพาะ/แบบร่าง', '2. วิศวกรประเมินความเป็นไปได้', '3. ใบเสนอราคาฟรีภายใน 48 ชม.', '4. ผลิตตัวอย่าง (หากต้องการ)', '5. ผลิตจำนวนมากหลังอนุมัติ', '6. ตรวจสอบคุณภาพและขนส่ง'] : [
'1. Send us your specifications/drawings', '2. Our engineers evaluate feasibility', '3. Free quote within 48 hours', '4. Sample production (if needed)', '5. Mass production after approval', '6. Quality inspection & shipping']).map((step, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                      <span className="text-slate-600">{step.replace(/^[0-9]+\. /, '')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{faqTitle}</h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto" />
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-slate-900 hover:bg-slate-50 transition-colors list-none">
                    <span>{faq.q}</span>
                    <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href={`/${locale}/service/faq`}>
                <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all">
                  {t('查看全部常见问题 →', 'View All FAQ →', 'Xem tất cả FAQ →', 'ดู FAQ ทั้งหมด →')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ========== Cross-links ========== */}
      <nav aria-label={t('页面导航', 'Page navigation', 'Điều hướng trang', 'การนำทางหน้า')} className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h3 className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            {crosslinksTitle}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}/products`} className="px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
              📦 {tLabel('全部产品', 'All Products', locale)}
            </Link>
            <Link href={`/${locale}/solutions`} className="px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
              🎯 {tLabel('行业解决方案', 'Solutions', locale)}
            </Link>
            <Link href={`/${locale}/about`} className="px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
              🏢 {tLabel('关于我们', 'About Us', locale)}
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
    </>
  );
}
