interface ValueCard {
  icon: string;
  title: Record<string, string>;
  desc: Record<string, string>;
}

const cards: ValueCard[] = [
  {
    icon: '🔇',
    title: {
      en: 'Superior Noise Reduction',
      zh: '卓越降噪性能',
      vi: 'Giảm Tiếng Ồn Vượt Trội',
      th: 'ลดเสียงรบกวนเหนือระดับ',
    },
    desc: {
      en: 'High-density mineral wool core + scientific louvered / micro-perforated panel design. NRC up to 0.85–0.95. Achieves 25–35 dB insertion loss for highway and industrial applications. Compliant with EN 1793, GB/T 19884.',
      zh: '高密度矿棉芯 + 科学百叶/微孔板设计，吸音系数 NRC 达 0.85–0.95。公路与工业场景实测插入损失 25–35 dB。符合 EN 1793、GB/T 19884 标准。',
      vi: 'Lõi bông khoáng mật độ cao + thiết kế tấm thanh / đục lỗ siêu nhỏ khoa học. Hệ số NRC đạt 0.85–0.95. Suy giảm tiếng ồn thực tế 25–35 dB cho đường cao tốc và nhà máy. Tuân thủ EN 1793, GB/T 19884.',
      th: 'แกนใยหินความหนาแน่นสูง + การออกแบบแผงเกล็ด / เจาะรูขนาดไมโครอย่างเป็นวิทยาศาสตร์ ค่า NRC สูงถึง 0.85–0.95 ลดเสียงแทรก 25–35 dB สำหรับทางหลวงและโรงงาน ตามมาตรฐาน EN 1793, GB/T 19884',
    },
  },
  {
    icon: '🌧️',
    title: {
      en: 'Tropical Weather Resistance',
      zh: '强耐候防腐',
      vi: 'Chống Chịu Khí Hậu Nhiệt Đới',
      th: 'ทนทานต่อสภาพอากาศร้อนชื้น',
    },
    desc: {
      en: 'Hot-dip galvanized base (≥275g/m² Zn on H-posts, ≥150g/m² on panels) + optional PVDF / polyester powder coating. Salt-spray tested >2000 hours. Withstands Vietnam monsoon and Thailand tropical sun with 15+ year service life.',
      zh: '热镀锌底材（H柱≥275g/m²，面板≥150g/m²）+ 可选氟碳/聚酯粉末喷涂。盐雾测试 >2000小时。耐越南季风与泰国强紫外线，设计使用寿命 15+ 年。',
      vi: 'Nền mạ kẽm nhúng nóng (trụ H ≥275g/m², tấm ≥150g/m²) + sơn tĩnh điện PVDF/polyester tùy chọn. Kiểm tra phun muối >2000 giờ. Chịu mưa gió mùa Việt Nam và tia UV mạnh Thái Lan, tuổi thọ thiết kế 15+ năm.',
      th: 'พื้นผิวชุบกัลวาไนซ์แบบจุ่มร้อน (เสา H ≥275g/ตร.ม., แผง ≥150g/ตร.ม.) + เคลือบสีฝุ่น PVDF/polyester เสริม ทดสอบพ่นเกลือ >2000 ชม. ทนฝนมรสุมเวียดนามและแดดร้อนจัดไทย อายุใช้งาน 15+ ปี',
    },
  },
  {
    icon: '📐',
    title: {
      en: 'Custom Engineering & CAD',
      zh: '定制工程设计与CAD支持',
      vi: 'Thiết Kế Kỹ Thuật Theo Yêu Cầu & CAD',
      th: 'วิศวกรรมสั่งทำพิเศษและ CAD',
    },
    desc: {
      en: 'Free CAD drawings, wind load calculations, and structural analysis for your project. One-stop supply: acoustic panels + H-posts + base plates + bolts + rubber seals. We engineer for Vietnamese expressway specs and Thai DOE requirements.',
      zh: '免费提供 CAD 图纸深化、抗风压计算和结构分析。一站式供应：吸隔声板 + H 型钢立柱 + 底板法兰 + 螺栓 + 橡胶密封条。按越南高速标准和泰国 DOE 规范设计。',
      vi: 'Bản vẽ CAD, tính toán tải trọng gió và phân tích kết cấu miễn phí. Cung cấp trọn gói: tấm tiêu âm + trụ thép H + đế bản + bu lông + gioăng cao su. Thiết kế theo tiêu chuẩn đường cao tốc Việt Nam và yêu cầu DOE Thái Lan.',
      th: 'แบบ CAD คำนวณแรงลม และวิเคราะห์โครงสร้าง ฟรี จัดหาครบวงจร: แผงซับเสียง + เสา H + แผ่นฐาน + นอต + ปะเก็นยาง ออกแบบตามมาตรฐานทางด่วนเวียดนามและข้อกำหนด DOE ไทย',
    },
  },
  {
    icon: '🚢',
    title: {
      en: 'Optimized Container Loading',
      zh: '节省海运成本',
      vi: 'Tối Ưu Hóa Xếp Container',
      th: 'การโหลดตู้คอนเทนเนอร์ที่เหมาะสมที่สุด',
    },
    desc: {
      en: 'Modular interlocking panel system for maximum container utilization. Typical load: 800–1200 m² per 20ft container. Nestable H-posts reduce freight volume by 40%. Direct shipping to Ho Chi Minh, Hai Phong, Bangkok, Laem Chabang.',
      zh: '模块化卡扣式结构，极高利用集装箱容积。典型装载量：每 20 尺柜 800–1200 m²。嵌套式 H 柱降低 40% 货运体积。直航胡志明、海防、曼谷、林查班港口。',
      vi: 'Hệ thống tấm mô-đun lắp ghép, tận dụng tối đa thể tích container. Tải điển hình: 800–1200 m² mỗi container 20ft. Trụ H lồng ghép giảm 40% thể tích vận chuyển. Vận chuyển thẳng cảng Hồ Chí Minh, Hải Phòng.',
      th: 'ระบบแผงประกอบแบบโมดูลาร์ ใช้ปริมาตรตู้คอนเทนเนอร์สูงสุด บรรทุกปกติ: 800–1200 ตร.ม. ต่อตู้ 20 ฟุต เสา H ซ้อนได้ลดปริมาตรขนส่ง 40% จัดส่งตรงท่าเรือกรุงเทพฯ แหลมฉบัง',
    },
  },
];

export function ValueProposition({ locale }: { locale: string }) {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            {locale === 'vi' ? 'Tại Sao Chọn Chúng Tôi?' : locale === 'th' ? 'ทำไมต้องเลือกเรา?' : locale === 'zh' ? '为什么选择我们?' : 'Why Choose Us?'}
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            {locale === 'vi'
              ? 'Giải quyết 4 vấn đề đau đầu nhất của nhà thầu và nhà nhập khẩu Đông Nam Á'
              : locale === 'th'
              ? 'แก้ 4 ปัญหาหลักของผู้รับเหมาและผู้นำเข้าในเอเชียตะวันออกเฉียงใต้'
              : locale === 'zh'
              ? '解决东南亚承包商和进口商最头疼的四大难题'
              : 'Solving the 4 biggest pain points for Southeast Asian contractors and importers'}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, i) => (
            <div key={i} className="group p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{card.title[locale] || card.title.en}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{card.desc[locale] || card.desc.en}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
