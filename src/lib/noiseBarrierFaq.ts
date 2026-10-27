/**
 * 声屏障落地页 FAQ —— 单一数据源。
 *
 * 之前有两份：FaqSection.tsx 里是完整答案，page.tsx 的 faqJsonLd 里是精简版，
 * 两份文案不一致。FAQPage 结构化数据要求答案与页面可见内容一致，
 * 所以统一到这里，页面渲染与 JSON-LD 都读这一份。
 */
export interface FaqItem {
  q: string;
  a: string;
}

export const noiseBarrierFaqs: Record<string, FaqItem[]> = {
  en: [
    {
      q: 'What is the delivery time to Vietnam/Thailand?',
      a: '10–15 days production + 7–14 days sea freight to Ho Chi Minh, Hai Phong, Bangkok, or Laem Chabang. Total lead time approximately 20–30 days from order confirmation.',
    },
    {
      q: 'Do you provide CAD drawings and structural calculations?',
      a: 'Yes. We provide free CAD drawings, wind load calculations, and structural analysis for your project. Just send us your project specifications.',
    },
    {
      q: 'What does the quotation include?',
      a: 'FOB or CIF quotation includes: acoustic panels + H-posts + base plates + bolts + rubber seals. Excludes on-site installation (field engineer support available at additional cost).',
    },
    {
      q: 'What is the Minimum Order Quantity (MOQ)?',
      a: 'MOQ: 500 m² for standard acoustic panels. For large projects (>5000 m²), we offer special discounted pricing and phased delivery.',
    },
    {
      q: 'What is the warranty policy?',
      a: '5-year warranty on hot-dip galvanizing against rust. Design service life 15+ years in tropical climate conditions.',
    },
    {
      q: 'Can I customize colors and dimensions?',
      a: 'Yes. Panel dimensions customizable: 2.0m / 2.5m / 3.0m / 4.0m. Colors per RAL chart, polyester or PVDF powder coating available.',
    },
  ],
  zh: [
    {
      q: '发货到越南/泰国需要多长时间？',
      a: '生产 10–15 天 + 海运 7–14 天到胡志明、海防、曼谷或林查班港。从确认订单到收货约 20–30 天。',
    },
    {
      q: '提供 CAD 图纸和结构计算吗？',
      a: '提供。免费提供 CAD 图纸、抗风荷载计算和结构分析，只需发送项目参数即可。',
    },
    {
      q: '报价包含哪些内容？',
      a: 'FOB/CIF 报价包含：吸隔声板 + H 型钢立柱 + 底板法兰 + 螺栓 + 橡胶密封条。不含现场安装（可派工程师到场，另计费用）。',
    },
    {
      q: '最小起订量 (MOQ) 是多少？',
      a: '标准吸声板 MOQ：500 平方米。大型项目（>5000 平方米）提供特别折扣和分批发货。',
    },
    {
      q: '保修政策是什么？',
      a: '热镀锌防锈保修 5 年。热带气候条件下设计使用寿命 15+ 年。',
    },
    {
      q: '可以定制颜色和尺寸吗？',
      a: '可以。面板尺寸可选 2.0m / 2.5m / 3.0m / 4.0m。颜色按 RAL 色卡，聚酯或氟碳粉末喷涂。',
    },
  ],
  vi: [
    {
      q: 'Thời gian giao hàng đến Việt Nam là bao lâu?',
      a: 'Từ 10–15 ngày sản xuất + 7–14 ngày vận chuyển biển đến cảng Hồ Chí Minh hoặc Hải Phòng. Tổng thời gian thực tế khoảng 20–30 ngày kể từ khi xác nhận đơn.',
    },
    {
      q: 'Có hỗ trợ bản vẽ CAD và tính toán kết cấu không?',
      a: 'Có. Chúng tôi cung cấp miễn phí bản vẽ CAD, tính toán tải trọng gió, và phân tích kết cấu cho dự án của bạn. Chỉ cần gửi yêu cầu với thông số dự án.',
    },
    {
      q: 'Báo giá bao gồm những gì?',
      a: 'Báo giá FOB hoặc CIF bao gồm: tấm cách âm + trụ H + đế bản + bu lông + gioăng cao su. Không bao gồm phí lắp dựng tại công trường (có thể hỗ trợ kỹ sư hiện trường với chi phí phụ).',
    },
    {
      q: 'Số lượng đặt hàng tối thiểu (MOQ) là bao nhiêu?',
      a: 'MOQ: 500 m² cho tấm tiêu âm tiêu chuẩn. Với dự án lớn (>5000 m²), chúng tôi cung cấp giá chiết khấu đặc biệt và hỗ trợ giao hàng theo đợt.',
    },
    {
      q: 'Chính sách bảo hành như thế nào?',
      a: 'Bảo hành 5 năm cho mạ kẽm nhúng nóng chống rỉ sét. Tuổi thọ thiết kế 15+ năm trong điều kiện khí hậu nhiệt đới tại Việt Nam.',
    },
    {
      q: 'Có thể tùy chỉnh màu sắc và kích thước không?',
      a: 'Có. Kích thước tấm có thể tùy chỉnh 2.0m / 2.5m / 3.0m / 4.0m. Màu sắc theo bảng RAL, sơn tĩnh điện polyester hoặc PVDF.',
    },
  ],
  th: [
    {
      q: 'ระยะเวลาจัดส่งถึงประเทศไทยนานเท่าไหร่?',
      a: 'ผลิต 10–15 วัน + ขนส่งทางเรือ 7–14 วัน ถึงท่าเรือกรุงเทพฯ หรือแหลมฉบัง รวมประมาณ 20–30 วันนับจากยืนยันคำสั่ง',
    },
    {
      q: 'มีบริการแบบ CAD และคำนวณโครงสร้างไหม?',
      a: 'มี เราให้บริการแบบ CAD คำนวณแรงลม และวิเคราะห์โครงสร้างฟรี เพียงส่งข้อมูลโครงการมาให้เรา',
    },
    {
      q: 'ใบเสนอราคารวมอะไรบ้าง?',
      a: 'FOB/CIF รวม: แผงกั้นเสียง + เสา H + แผ่นฐาน + นอต + ปะเก็นยาง ไม่รวมค่าติดตั้งที่หน้างาน (สามารถส่งวิศวกรไปได้โดยมีค่าใช้จ่ายเพิ่ม)',
    },
    {
      q: 'จำนวนสั่งซื้อขั้นต่ำ (MOQ) เท่าไหร่?',
      a: 'MOQ: 500 ตร.ม. สำหรับแผงมาตรฐาน โครงการใหญ่ (>5000 ตร.ม.) มีส่วนลดพิเศษและจัดส่งเป็นงวด',
    },
    {
      q: 'นโยบายรับประกันเป็นอย่างไร?',
      a: 'รับประกัน 5 ปี สำหรับการชุบกัลวาไนซ์กันสนิม อายุการใช้งานออกแบบ 15+ ปี ในสภาพอากาศร้อนชื้นของไทย',
    },
    {
      q: 'สามารถสั่งสีและขนาดพิเศษได้ไหม?',
      a: 'ได้ ขนาดแผงปรับได้ 2.0 / 2.5 / 3.0 / 4.0 ม. สีตาม RAL เคลือบสีฝุ่น polyester หรือ PVDF',
    },
  ],
};

export function getNoiseBarrierFaqs(locale: string): FaqItem[] {
  return noiseBarrierFaqs[locale] || noiseBarrierFaqs.en;
}
