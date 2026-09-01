/**
 * 全站 TDK 默认值 — 单一维护入口
 *
 * 页面 generateMetadata 优先读 site_config 表，
 * 若 API 不可用则 fallback 到此处默认值。
 *
 * 编辑方式：管理后台 → 站点设置 → SEO 分组
 */

export interface PageSeo {
  title: string;
  description: string;
  keywords?: string; // 部分海外引擎仍参考
}

type LocaleSeo = Record<string, PageSeo>;

/**
 * 每个页面的中英文默认 TDK。
 * key 对应 site_config 中的 seo.{page}.title / seo.{page}.description / seo.{page}.keywords
 */
export const pageSeoDefaults: Record<string, LocaleSeo> = {
  home: {
    en: {
      title: 'Noise Barrier Manufacturer — Highway & Industrial | Angu',
      description:
        'Factory-direct noise barriers for highways, industry, rail and bridges. ISO 9001 & CE certified, 15 years experience, shipped to 30+ countries.',
      keywords: 'noise barrier, sound barrier, highway noise barrier, acoustic barrier, noise barrier manufacturer, factory direct',
    },
    zh: {
      title: '声屏障厂家 — 公路·工业隔音屏障 | 安固丝网',
      description:
        '工厂直供公路、工业、轨道交通、桥梁声屏障。ISO 9001与CE认证，15年制造经验，出口30+国家。',
      keywords: '声屏障, 隔音屏障, 公路声屏障, 工业降噪, 声屏障厂家, 工厂直供',
    },
    vi: {
      title: 'Nhà Sản Xuất Tấm Chắn Ồn — Đường Cao Tốc & Công Nghiệp | Angu',
      description:
        'Tấm chắn ồn trực tiếp từ nhà máy cho đường cao tốc, công nghiệp, đường sắt và cầu. Chứng nhận ISO 9001 & CE, 15 năm kinh nghiệm, xuất khẩu 30+ quốc gia.',
      keywords: 'tấm chắn ồn, vách cách âm, tấm chắn ồn đường cao tốc, nhà sản xuất tấm chắn ồn, nhà máy trực tiếp',
    },
    th: {
      title: 'ผู้ผลิตแผงกั้นเสียง — ทางหลวง & อุตสาหกรรม | Angu',
      description:
        'แผงกั้นเสียงจากโรงงานโดยตรงสำหรับทางหลวง อุตสาหกรรม ระบบราง และสะพาน รับรอง ISO 9001 & CE ประสบการณ์ 15 ปี ส่งออก 30+ ประเทศ',
      keywords: 'แผงกั้นเสียง, แผงกันเสียง, แผงกั้นเสียงทางหลวง, ผู้ผลิตแผงกั้นเสียง, โรงงานโดยตรง',
    },
  },

  about: {
    en: {
      title: 'About Angu — Wire Mesh Manufacturer Since 2015 | ISO 9001 Certified',
      description:
        'Angu Wire Mesh is a leading manufacturer of gabion boxes, wire mesh fences, and rockfall protection nets based in Anping, China. ISO 9001 & CE certified, 15+ years experience, exporting to 30+ countries.',
      keywords: 'wire mesh manufacturer, Anping factory, ISO 9001, CE certified, gabion producer, about Angu',
    },
    zh: {
      title: '关于安固 — 丝网制造专家 | ISO 9001认证企业',
      description:
        '安固丝网位于中国丝网之都河北安平，专注石笼网箱、防护网、护栏网等丝网产品研发制造。ISO 9001与CE认证，15年行业经验，产品出口30+国家。',
      keywords: '丝网厂家, 安平工厂, ISO 9001认证, CE认证, 石笼网生产商, 关于安固',
    },
    vi: {
      title: 'Về Angu — Nhà Sản Xuất Lưới Thép Từ 2015 | ISO 9001',
      description:
        'Angu Wire Mesh là nhà sản xuất hàng đầu về lồng rọ đá, hàng rào lưới thép và lưới chống sạt lở tại Anping, Trung Quốc. Chứng nhận ISO 9001 & CE, 15+ năm kinh nghiệm, xuất khẩu đến 30+ quốc gia.',
      keywords: 'nhà sản xuất lưới thép, nhà máy Anping, ISO 9001, CE, sản xuất rọ đá, về Angu',
    },
    th: {
      title: 'เกี่ยวกับ Angu — ผู้ผลิตลวดตาข่ายตั้งแต่ปี 2015 | รับรอง ISO 9001',
      description:
        'Angu Wire Mesh เป็นผู้ผลิตชั้นนำด้านกล่องเกเบี้ยน รั้วลวดตาข่าย และตาข่ายกันหินร่วง ตั้งอยู่ที่ Anping ประเทศจีน ได้รับการรับรอง ISO 9001 & CE มีประสบการณ์ 15+ ปี ส่งออกไปยัง 30+ ประเทศ',
      keywords: 'ผู้ผลิตลวดตาข่าย, โรงงาน Anping, ISO 9001, CE, ผู้ผลิตเกเบี้ยน, เกี่ยวกับ Angu',
    },
  },

  products: {
    en: {
      title: 'Wire Mesh Products — Gabion, Fence, Netting & Barriers | Angu',
      description:
        'Browse 9 categories of wire mesh products: gabion boxes, chain link fence, hexagonal wire mesh, razor barbed wire, slope protection nets, blast-proof barriers, noise barriers, and stainless steel rope nets. Factory-direct pricing, low MOQ.',
      keywords: 'wire mesh products, gabion box, chain link fence, barbed wire, slope protection net, noise barrier, blast wall, stainless steel rope net',
    },
    zh: {
      title: '丝网产品 — 石笼网、护栏网、防护网、声屏障 | 安固丝网',
      description:
        '浏览9大品类丝网产品：石笼网箱、勾花网围栏、六角网、刺绳、边坡防护网、防爆石笼网、不锈钢绳网、防爆护栏、声屏障。工厂直供价格，低起订量。',
      keywords: '丝网产品, 石笼网箱, 护栏网, 刺绳, 边坡防护网, 声屏障, 防爆墙, 不锈钢绳网',
    },
    vi: {
      title: 'Sản Phẩm Lưới Thép — Rọ Đá, Hàng Rào, Lưới & Tấm Chắn | Angu',
      description:
        'Duyệt 9 danh mục sản phẩm lưới thép: lồng rọ đá, hàng rào mắt cáo, lưới lục giác, dây thép gai, lưới chống sạt, rọ đá chống nổ, lưới cáp thép không gỉ, tấm chắn tiếng ồn. Giá xuất xưởng, MOQ thấp.',
      keywords: 'sản phẩm lưới thép, rọ đá, hàng rào mắt cáo, dây thép gai, lưới chống sạt, tấm chắn tiếng ồn, tường chống nổ, lưới cáp thép',
    },
    th: {
      title: 'ผลิตภัณฑ์ลวดตาข่าย — เกเบี้ยน รั้ว ตาข่าย & แผงกั้น | Angu',
      description:
        'เรียกดูผลิตภัณฑ์ลวดตาข่าย 9 กลุ่ม: กล่องเกเบี้ยน รั้วโซ่ ตาข่ายหกเหลี่ยม ลวดหนาม ตาข่ายกันหินร่วง เกเบี้ยนกันระเบิด ตาข่ายสแตนเลส แผงกั้นเสียง ราคาโรงงาน MOQ ต่ำ',
      keywords: 'ผลิตภัณฑ์ลวดตาข่าย, กล่องเกเบี้ยน, รั้วโซ่, ลวดหนาม, ตาข่ายกันหินร่วง, แผงกั้นเสียง, กำแพงกันระเบิด, ตาข่ายสแตนเลส',
    },
  },

  blog: {
    en: {
      title: 'Wire Mesh Industry Blog — Gabion Guides & Technical Insights | Angu',
      description:
        'Expert guides on gabion construction, rockfall protection, wire mesh selection, and industry best practices. Technical articles for engineers, contractors, and procurement professionals.',
      keywords: 'wire mesh blog, gabion guide, rockfall protection, fence installation, industry insights',
    },
    zh: {
      title: '丝网行业博客 — 石笼网指南与技术洞察 | 安固丝网',
      description:
        '石笼网施工、边坡防护、丝网选型等专业指南。面向工程师、承包商和采购人员的技术文章与行业最佳实践。',
      keywords: '丝网博客, 石笼网指南, 边坡防护, 护栏安装, 行业洞察',
    },
    vi: {
      title: 'Blog Ngành Lưới Thép — Hướng Dẫn Rọ Đá & Kiến Thức Kỹ Thuật | Angu',
      description:
        'Hướng dẫn chuyên sâu về thi công rọ đá, chống sạt lở, lựa chọn lưới thép và các phương pháp tốt nhất trong ngành. Bài viết kỹ thuật dành cho kỹ sư, nhà thầu và chuyên viên mua hàng.',
      keywords: 'blog lưới thép, hướng dẫn rọ đá, chống sạt lở, lắp đặt hàng rào, kiến thức ngành',
    },
    th: {
      title: 'บล็อกอุตสาหกรรมลวดตาข่าย — คู่มือเกเบี้ยน & ข้อมูลทางเทคนิค | Angu',
      description:
        'คู่มือผู้เชี่ยวชาญเกี่ยวกับการก่อสร้างเกเบี้ยน การป้องกันหินร่วง การเลือกใช้ลวดตาข่าย และแนวทางปฏิบัติที่ดีที่สุดในอุตสาหกรรม บทความทางเทคนิคสำหรับวิศวกร ผู้รับเหมา และผู้จัดซื้อ',
      keywords: 'บล็อกลวดตาข่าย, คู่มือเกเบี้ยน, ป้องกันหินร่วง, ติดตั้งรั้ว, ความรู้ในอุตสาหกรรม',
    },
  },

  contact: {
    en: {
      title: 'Contact Us — Get a Free Quote for Wire Mesh Products | Angu',
      description:
        'Contact Angu Wire Mesh for factory-direct quotes on gabion boxes, rockfall nets, chain link fence, and more. Response within 24 hours. WhatsApp, email, or inquiry form available.',
      keywords: 'contact wire mesh supplier, get quote gabion, inquiry Angu, WhatsApp factory',
    },
    zh: {
      title: '联系我们 — 免费获取丝网产品报价 | 安固丝网',
      description:
        '联系安固丝网获取石笼网箱、防护网、护栏网等产品的工厂直供报价。24小时内回复。支持WhatsApp、邮件和询盘表单。',
      keywords: '联系丝网厂家, 获取报价, 石笼网询盘, 安固联系方式',
    },
    vi: {
      title: 'Liên Hệ — Nhận Báo Giá Miễn Phí Sản Phẩm Lưới Thép | Angu',
      description:
        'Liên hệ Angu Wire Mesh để nhận báo giá xuất xưởng cho lồng rọ đá, lưới chống sạt, hàng rào mắt cáo và nhiều sản phẩm khác. Phản hồi trong 24 giờ. WhatsApp, email hoặc form yêu cầu báo giá.',
      keywords: 'liên hệ nhà cung cấp lưới thép, nhận báo giá rọ đá, yêu cầu Angu, WhatsApp nhà máy',
    },
    th: {
      title: 'ติดต่อเรา — ขอใบเสนอราคาฟรีสำหรับผลิตภัณฑ์ลวดตาข่าย | Angu',
      description:
        'ติดต่อ Angu Wire Mesh เพื่อขอใบเสนอราคาโรงงานสำหรับกล่องเกเบี้ยน ตาข่ายกันหินร่วง รั้วโซ่ และอื่นๆ ตอบกลับภายใน 24 ชั่วโมง ทาง WhatsApp อีเมล หรือแบบฟอร์มสอบถาม',
      keywords: 'ติดต่อผู้ผลิตลวดตาข่าย, ขอราคาเกเบี้ยน, สอบถาม Angu, WhatsApp โรงงาน',
    },
  },

  service: {
    en: {
      title: 'Services — Custom Manufacturing, OEM & Quality Control | Angu',
      description:
        'Custom wire mesh manufacturing, OEM/ODM services, quality inspection, logistics support, and after-sales service. Factory-direct service with ISO 9001 quality control. Contact us for custom specifications.',
      keywords: 'custom wire mesh, OEM manufacturing, quality inspection, logistics, after-sales service',
    },
    zh: {
      title: '服务 — 定制生产、代工与质量控制 | 安固丝网',
      description:
        '丝网产品定制生产、OEM/ODM代工、质量检测、物流支持及售后服务。ISO 9001质量管理体系，工厂直供服务。联系我们获取定制规格方案。',
      keywords: '丝网定制, OEM代工, 质量检测, 物流服务, 售后服务',
    },
    vi: {
      title: 'Dịch Vụ — Sản Xuất Theo Yêu Cầu, OEM & Kiểm Soát Chất Lượng | Angu',
      description:
        'Sản xuất lưới thép theo yêu cầu, dịch vụ OEM/ODM, kiểm tra chất lượng, hỗ trợ logistics và dịch vụ hậu mãi. Dịch vụ trực tiếp từ nhà máy với kiểm soát chất lượng ISO 9001. Liên hệ để nhận giải pháp tùy chỉnh.',
      keywords: 'lưới thép tùy chỉnh, sản xuất OEM, kiểm tra chất lượng, logistics, dịch vụ hậu mãi',
    },
    th: {
      title: 'บริการ — ผลิตตามสั่ง OEM & ควบคุมคุณภาพ | Angu',
      description:
        'ผลิตลวดตาข่ายตามสั่ง บริการ OEM/ODM ตรวจสอบคุณภาพ สนับสนุนด้านโลจิสติกส์ และบริการหลังการขาย บริการตรงจากโรงงานด้วยการควบคุมคุณภาพ ISO 9001 ติดต่อเราเพื่อรับโซลูชันที่กำหนดเอง',
      keywords: 'ลวดตาข่ายสั่งทำ, ผลิต OEM, ตรวจสอบคุณภาพ, โลจิสติกส์, บริการหลังการขาย',
    },
  },

  faq: {
    en: {
      title: 'FAQ — Wire Mesh Products Frequently Asked Questions | Angu',
      description:
        'Find answers about gabion boxes, rockfall nets, chain link fence, and wire mesh products. Shipping, MOQ, payment terms, customization, and technical specifications explained.',
      keywords: 'wire mesh FAQ, gabion questions, MOQ, shipping terms, payment, technical specs',
    },
    zh: {
      title: '常见问题 — 丝网产品FAQ | 安固丝网',
      description:
        '石笼网箱、边坡防护网、勾花网围栏等丝网产品常见问题解答。涵盖运输、起订量、付款方式、定制服务及技术规格说明。',
      keywords: '丝网FAQ, 石笼网常见问题, 起订量, 运输, 付款方式, 技术规格',
    },
    vi: {
      title: 'FAQ — Câu Hỏi Thường Gặp Về Sản Phẩm Lưới Thép | Angu',
      description:
        'Giải đáp thắc mắc về lồng rọ đá, lưới chống sạt, hàng rào mắt cáo và các sản phẩm lưới thép. Vận chuyển, MOQ, điều khoản thanh toán, tùy chỉnh và thông số kỹ thuật.',
      keywords: 'FAQ lưới thép, câu hỏi rọ đá, MOQ, điều khoản vận chuyển, thanh toán, thông số kỹ thuật',
    },
    th: {
      title: 'คำถามที่พบบ่อย — ผลิตภัณฑ์ลวดตาข่าย FAQ | Angu',
      description:
        'ค้นหาคำตอบเกี่ยวกับกล่องเกเบี้ยน ตาข่ายกันหินร่วง รั้วโซ่ และผลิตภัณฑ์ลวดตาข่าย การขนส่ง MOQ เงื่อนไขการชำระเงิน การปรับแต่ง และข้อกำหนดทางเทคนิค',
      keywords: 'FAQ ลวดตาข่าย, คำถามเกเบี้ยน, MOQ, เงื่อนไขการขนส่ง, การชำระเงิน, ข้อมูลทางเทคนิค',
    },
  },

  solutions: {
    en: {
      title: 'Solutions — Wire Mesh Applications by Industry | Angu',
      description:
        'Industry-specific wire mesh solutions: bridge protection, mining safety, water conservancy, highway barriers, coastal defense, noise control, landscaping, livestock, and construction. 15 years expertise, factory-direct from Anping, China.',
      keywords: 'wire mesh solutions, bridge protection, mining safety, water conservancy, highway barriers, coastal defense',
    },
    zh: {
      title: '解决方案 — 丝网行业应用方案 | 安固丝网',
      description:
        '按行业定制的丝网解决方案：桥梁防护、矿山安全、水利工程、公路护栏、海岸防护、工业降噪、园林景观、畜牧养殖、建筑施工。15年经验，河北安平工厂直供。',
      keywords: '丝网解决方案, 桥梁防护, 矿山安全, 水利工程, 公路护栏, 海岸防护',
    },
    vi: {
      title: 'Giải Pháp — Ứng Dụng Lưới Thép Theo Ngành | Angu',
      description:
        'Giải pháp lưới thép chuyên biệt theo ngành: bảo vệ cầu, an toàn khai thác mỏ, thủy lợi, hàng rào cao tốc, phòng hộ bờ biển, kiểm soát tiếng ồn, cảnh quan, chăn nuôi và xây dựng. 15 năm kinh nghiệm, nhà máy tại Anping, Trung Quốc.',
      keywords: 'giải pháp lưới thép, bảo vệ cầu, an toàn mỏ, thủy lợi, hàng rào cao tốc, phòng hộ bờ biển',
    },
    th: {
      title: 'โซลูชัน — การประยุกต์ใช้ลวดตาข่ายตามอุตสาหกรรม | Angu',
      description:
        'โซลูชันลวดตาข่ายเฉพาะอุตสาหกรรม: ป้องกันสะพาน ความปลอดภัยเหมืองแร่ ชลประทาน แผงกั้นทางหลวง ป้องกันชายฝั่ง ควบคุมเสียงรบกวน ภูมิทัศน์ ปศุสัตว์ และก่อสร้าง ประสบการณ์ 15 ปี โรงงานที่ Anping จีน',
      keywords: 'โซลูชันลวดตาข่าย, ป้องกันสะพาน, ความปลอดภัยเหมืองแร่, ชลประทาน, แผงกั้นทางหลวง, ป้องกันชายฝั่ง',
    },
  },

  download: {
    en: {
      title: 'Downloads — Product Catalog & Technical Sheets | Angu',
      description:
        'Download Angu Wire Mesh product catalog, technical data sheets, and specifications. PDF downloads for gabion boxes, wire mesh fences, and protection net products.',
      keywords: 'wire mesh catalog download, gabion specs PDF, technical data sheet, product brochure',
    },
    zh: {
      title: '下载中心 — 产品目录与技术资料 | 安固丝网',
      description:
        '下载安固丝网产品目录、技术参数表与规格说明。提供石笼网箱、护栏网、防护网等产品的PDF资料下载。',
      keywords: '丝网目录下载, 石笼网规格PDF, 技术参数表, 产品手册',
    },
    vi: {
      title: 'Tải Xuống — Catalog Sản Phẩm & Tài Liệu Kỹ Thuật | Angu',
      description:
        'Tải catalog sản phẩm, bảng thông số kỹ thuật và tài liệu của Angu Wire Mesh. Tài liệu PDF cho lồng rọ đá, hàng rào lưới thép và sản phẩm lưới bảo vệ.',
      keywords: 'tải catalog lưới thép, thông số rọ đá PDF, tài liệu kỹ thuật, brochure sản phẩm',
    },
    th: {
      title: 'ดาวน์โหลด — แคตตาล็อกสินค้า & เอกสารทางเทคนิค | Angu',
      description:
        'ดาวน์โหลดแคตตาล็อกผลิตภัณฑ์ ตารางข้อมูลทางเทคนิค และเอกสารข้อมูลของ Angu Wire Mesh เอกสาร PDF สำหรับกล่องเกเบี้ยน รั้วลวดตาข่าย และผลิตภัณฑ์ตาข่ายป้องกัน',
      keywords: 'ดาวน์โหลดแคตตาล็อกลวดตาข่าย, ข้อมูลเกเบี้ยน PDF, เอกสารทางเทคนิค, โบรชัวร์ผลิตภัณฑ์',
    },
  },
};
