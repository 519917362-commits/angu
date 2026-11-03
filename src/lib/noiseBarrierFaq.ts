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
      a: 'MOQ starts at 50 m² for standard acoustic panels; most specifications are 100 m². For large projects (>5,000 m²) we offer discounted pricing and phased delivery.',
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
      a: '标准吸声板 MOQ 50 平方米起，主流规格 100 平方米。大型项目（>5,000 平方米）提供折扣与分批发货。',
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
      q: 'Thời gian giao hàng tường chắn âm đến Việt Nam là bao lâu?',
      a: 'Từ 10–15 ngày sản xuất + 7–14 ngày vận chuyển biển đến cảng Hồ Chí Minh hoặc Hải Phòng. Tổng thời gian thực tế khoảng 20–30 ngày kể từ khi xác nhận đơn hàng tường chắn âm.',
    },
    {
      // 越南买家确实分不清这两个词（tấm cách âm 在本地常指室内隔音板/棉），
      // 用一问一答把「墙体」与「单块板」分开，两个主词各出现多次且不显堆砌。
      q: 'Tường chắn âm và tấm cách âm khác nhau thế nào?',
      a: 'Tường chắn âm là cả hệ thống hoàn chỉnh: các tấm chắn âm gắn lên trụ thép H, neo xuống móng bê tông, dùng cho mặt đường cao tốc, vành đai khu công nghiệp và cầu — đây là hạng mục trong hồ sơ dự án. Tấm cách âm (tấm chắn âm) chỉ là một tấm panel đơn lẻ dày 80–100mm mà chúng tôi sản xuất, khách có thể mua riêng để thay thế hoặc tự lắp. Nếu bạn đang làm dự án giảm ồn, hãy đặt cả tường chắn âm; nếu chỉ cần vật liệu, đặt tấm là đủ.',
    },
    {
      q: 'Có hỗ trợ bản vẽ CAD và tính toán kết cấu không?',
      a: 'Có. Chúng tôi cung cấp miễn phí bản vẽ CAD, tính toán tải trọng gió, và phân tích kết cấu cho tường chắn âm của dự án bạn. Chỉ cần gửi yêu cầu kèm thông số dự án.',
    },
    {
      q: 'Báo giá bao gồm những gì?',
      a: 'Báo giá FOB hoặc CIF bao gồm: tấm chắn âm + trụ H + đế bản + bu lông + gioăng cao su. Không bao gồm phí lắp dựng tại công trường (có thể cử kỹ sư giám sát với chi phí phụ).',
    },
    {
      q: 'Số lượng đặt hàng tối thiểu (MOQ) là bao nhiêu?',
      a: 'MOQ từ 50 m² cho tấm chắn âm tiêu chuẩn, các mã phổ biến 100 m². Với dự án lớn (>5.000 m²), chúng tôi có giá chiết khấu và giao hàng theo đợt.',
    },
    {
      q: 'Chính sách bảo hành như thế nào?',
      a: 'Bảo hành 5 năm cho lớp mạ kẽm nhúng nóng chống rỉ sét. Tuổi thọ thiết kế của tường chắn âm là 15+ năm trong điều kiện khí hậu nhiệt đới tại Việt Nam.',
    },
    {
      q: 'Có thể tùy chỉnh màu sắc và kích thước tấm không?',
      a: 'Có. Kích thước tấm chắn âm tùy chỉnh 2.0m / 2.5m / 3.0m / 4.0m. Màu sắc theo bảng RAL, sơn tĩnh điện polyester hoặc PVDF.',
    },
  ],
  th: [
    {
      q: 'จัดส่งกำแพงกันเสียงถึงประเทศไทยใช้เวลานานเท่าไหร่?',
      a: 'ผลิต 10–15 วัน + ขนส่งทางเรือ 7–14 วัน ถึงท่าเรือกรุงเทพฯ หรือแหลมฉบัง รวมประมาณ 20–30 วันนับจากยืนยันคำสั่งซื้อกำแพงกันเสียง',
    },
    {
      // 泰语里 แผงกั้นเสียง（单块屏障板）与 กำแพงกันเสียง（整道隔音墙）是两个词，
      // 询盘里最常被混用。用一问一答把差别讲清，两个词各自获得自然词频。
      q: 'กำแพงกันเสียง กับแผงกั้นเสียง ต่างกันอย่างไร?',
      a: 'กำแพงกันเสียง คือระบบที่ประกอบเสร็จสมบูรณ์ ทั้งแนวกำแพงที่ยึดแผงเข้ากับเสาเหล็ก H แล้วยึดลงฐานคอนกรีต ใช้ริมทางหลวง เขตโรงงาน และสะพาน ซึ่งเป็นรายการในแบบก่อสร้างของโครงการ ส่วนแผงกั้นเสียง คือแผงเดี่ยวหนา 80–100 มม. ที่เราผลิต ลูกค้าซื้อแยกเพื่อเปลี่ยนของเดิมหรือนำไปติดตั้งเองได้ หากต้องการแก้ปัญหาเสียงทั้งโครงการ ควรสั่งเป็นกำแพงกันเสียง ถ้าต้องการเพียงวัสดุ สั่งแผงอย่างเดียวพอ',
    },
    {
      q: 'มีบริการแบบ CAD และคำนวณโครงสร้างไหม?',
      a: 'มี เราให้บริการแบบ CAD คำนวณแรงลม และวิเคราะห์โครงสร้างสำหรับกำแพงกันเสียงของโครงการฟรี เพียงส่งข้อมูลโครงการมาให้เรา',
    },
    {
      q: 'ใบเสนอราคารวมอะไรบ้าง?',
      a: 'FOB/CIF รวม: แผงกั้นเสียง + เสา H + แผ่นฐาน + นอต + ปะเก็นยาง ไม่รวมค่าติดตั้งที่หน้างาน (สามารถส่งวิศวกรไปควบคุมได้โดยมีค่าใช้จ่ายเพิ่ม)',
    },
    {
      q: 'จำนวนสั่งซื้อขั้นต่ำ (MOQ) เท่าไหร่?',
      a: 'MOQ เริ่ม 50 ตร.ม. สำหรับแผงกั้นเสียงมาตรฐาน รุ่นที่ใช้บ่อย 100 ตร.ม. โครงการใหญ่ (>5,000 ตร.ม.) มีส่วนลดพิเศษและจัดส่งเป็นงวด',
    },
    {
      q: 'นโยบายรับประกันเป็นอย่างไร?',
      a: 'รับประกัน 5 ปี สำหรับการชุบกัลวาไนซ์กันสนิม และอายุการใช้งานออกแบบของกำแพงกันเสียง 15+ ปี ในสภาพอากาศร้อนชื้นของไทย',
    },
    {
      q: 'สามารถสั่งสีและขนาดแผงพิเศษได้ไหม?',
      a: 'ได้ ขนาดแผงกั้นเสียงปรับได้ 2.0 / 2.5 / 3.0 / 4.0 ม. สีตาม RAL เคลือบสีฝุ่น polyester หรือ PVDF',
    },
  ],
  ms: [
    {
      q: 'Berapa lama masa penghantaran ke Malaysia dan GCC?',
      a: 'Pengeluaran 10–15 hari + pengangkutan laut 7–14 hari ke Pelabuhan Klang, Tanjung Pelepas, Jebel Ali atau Dammam. Jumlah masa dari pengesahan pesanan kira-kira 20–30 hari.',
    },
    {
      q: 'Adakah anda menyediakan lukisan CAD dan pengiraan struktur?',
      a: 'Ya. Kami menyediakan lukisan CAD, pengiraan beban angin dan analisis struktur secara percuma. Hantar sahaja spesifikasi projek anda kepada kami.',
    },
    {
      q: 'Apakah yang termasuk dalam sebut harga?',
      a: 'Sebut harga FOB atau CIF termasuk: panel akustik + tiang H + plat asas + bolt + kedap getah. Tidak termasuk pemasangan di tapak (sokongan jurutera lapangan tersedia dengan kos tambahan).',
    },
    {
      q: 'Apakah Kuantiti Pesanan Minimum (MOQ)?',
      a: 'MOQ 50 m² untuk panel akustik standard. Bagi projek besar (>5,000 m²) kami menawarkan harga diskaun khas dan penghantaran berperingkat.',
    },
    {
      q: 'Apakah dasar jaminan?',
      a: 'Jaminan 5 tahun terhadap karat pada galvanisasi hot-dip. Hayat reka bentuk 15+ tahun dalam keadaan iklim tropika dan gurun.',
    },
    {
      q: 'Bolehkah saya menyesuaikan warna dan dimensi?',
      a: 'Boleh. Dimensi panel boleh disesuaikan: 2.0m / 2.5m / 3.0m / 4.0m. Warna mengikut carta RAL, salutan serbuk poliester atau PVDF tersedia.',
    },
  ],
  ar: [
    {
      q: 'ما مدة التسليم إلى دول الخليج؟',
      a: 'إنتاج 10–15 يومًا + شحن بحري 7–14 يومًا إلى جبل علي أو الدمام أو جدة. إجمالي المدة من تأكيد الطلب نحو 20–30 يومًا.',
    },
    {
      q: 'هل تقدمون رسومات CAD وحسابات إنشائية؟',
      a: 'نعم. نقدم رسومات CAD وحسابات أحمال الرياح وتحليلًا إنشائيًا مجانًا. أرسل لنا مواصفات مشروعك فقط.',
    },
    {
      q: 'ماذا يشمل عرض السعر؟',
      a: 'عرض سعر FOB أو CIF يشمل: الألواح الصوتية + أعمدة H + قواعد التثبيت + المسامير + الحشوات المطاطية. لا يشمل التركيب في الموقع (يتوفر دعم مهندس ميداني بتكلفة إضافية).',
    },
    {
      q: 'ما الحد الأدنى لكمية الطلب (MOQ)؟',
      a: 'الحد الأدنى 50 م² للألواح الصوتية القياسية. وللمشاريع الكبيرة (أكثر من 5,000 م²) نقدم أسعارًا مخفضة وتسليمًا على مراحل.',
    },
    {
      q: 'ما سياسة الضمان؟',
      a: 'ضمان 5 سنوات ضد الصدأ للجلفنة بالغمس الساخن. العمر التصميمي 15+ سنة في ظروف المناخ الحار والغبار.',
    },
    {
      q: 'هل يمكن تخصيص الألوان والأبعاد؟',
      a: 'نعم. أبعاد الألواح قابلة للتخصيص: 2.0 م / 2.5 م / 3.0 م / 4.0 م. الألوان حسب مخطط RAL، ويتوفر طلاء بودرة بوليستر أو PVDF.',
    },
  ],
};

export function getNoiseBarrierFaqs(locale: string): FaqItem[] {
  return noiseBarrierFaqs[locale] || noiseBarrierFaqs.en;
}
