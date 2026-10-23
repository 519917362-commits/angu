import {YEARS_LABEL} from '@/lib/company';

interface StatItem { value: string; label: Record<string, string> }

// 全部为可核验事实：成立年限由工商登记日期计算，产品数为当前在架 SKU 数
const stats: StatItem[] = [
  { value: YEARS_LABEL, label: { en: 'Years in Business', zh: '年制造经验', vi: 'Năm Hoạt Động', th: 'ปีดำเนินธุรกิจ' } },
  { value: '30+', label: { en: 'Export Countries', zh: '出口国家', vi: 'Quốc Gia Xuất Khẩu', th: 'ประเทศส่งออก' } },
  { value: '36', label: { en: 'Product Specifications', zh: '在架产品规格', vi: 'Mã Sản Phẩm', th: 'รายการสินค้า' } },
  { value: '5,000 t', label: { en: 'Annual Output', zh: '年产能', vi: 'Sản Lượng/Năm', th: 'กำลังผลิต/ปี' } },
];

interface TrustPoint { title: string; body: string }

// 原「客户评价」为无来源的虚构证言（含五星评分），已按合规要求移除，
// 改为采购方可自行核验的四个环节。取得客户书面授权后可替换为真实评价。
const trustPoints: Record<string, TrustPoint[]> = {
  en: [
    { title: 'Certificates you can check', body: 'ISO 9001:2015 (06724Q20693R1S), ISO 14001:2015 (06724E20351R1S) and ISO 45001:2018 (06724S30308R1S) certificates are published on our About page and verifiable on China\u2019s CNCA platform. CE documents are sent with the quotation.' },
    { title: 'Factory audit welcome', body: 'Third-party inspection (SGS, BV, TÜV) and video factory tours are arranged before or during production at the buyer\u2019s choice.' },
    { title: 'Samples before bulk', body: 'Trial orders start from 50 m². Panel samples with the actual coating weight and core density are sent before mass production.' },
    { title: 'FOB Tianjin, documented', body: 'Prices are quoted FOB Tianjin with specification, MOQ and lead time stated in writing. Pre-shipment inspection reports are shared before loading.' },
  ],
  zh: [
    { title: '可核验的资质', body: 'ISO 9001:2015（06724Q20693R1S）、ISO 14001:2015（06724E20351R1S）、ISO 45001:2018（06724S30308R1S）三体系证书已在「关于我们」页公开，可在国家认监委网站核验；CE 资料随报价提供。' },
    { title: '接受验厂与第三方验货', body: '可按买方要求安排 SGS、BV、TÜV 等第三方验货，或在生产前后安排视频验厂。' },
    { title: '批量前先看样', body: '试单 50 m² 起；量产前寄送实测镀层重量与芯材密度的样板。' },
    { title: '天津港 FOB，条款书面化', body: '报价为天津港 FOB，规格、起订量、交期均书面列明；装柜前提供出货检验报告。' },
  ],
  vi: [
    { title: 'Chứng nhận có thể kiểm chứng', body: 'Chứng nhận ISO 9001:2015 (06724Q20693R1S), ISO 14001:2015 (06724E20351R1S) và ISO 45001:2018 (06724S30308R1S) được công bố trên trang Giới thiệu và có thể tra cứu tại cổng CNCA Trung Quốc. Hồ sơ CE gửi kèm báo giá.' },
    { title: 'Sẵn sàng kiểm tra nhà máy', body: 'Có thể bố trí kiểm định bên thứ ba (SGS, BV, TÜV) hoặc tham quan nhà máy qua video theo yêu cầu của người mua.' },
    { title: 'Xem mẫu trước khi đặt hàng loạt', body: 'Đơn thử từ 50 m². Mẫu tấm với trọng lượng lớp mạ và mật độ lõi thực tế được gửi trước khi sản xuất hàng loạt.' },
    { title: 'FOB Thiên Tân, điều khoản bằng văn bản', body: 'Giá báo FOB Thiên Tân kèm quy cách, MOQ và thời gian giao hàng bằng văn bản. Báo cáo kiểm tra trước khi xuất hàng được chia sẻ trước khi xếp hàng.' },
  ],
  th: [
    { title: 'ใบรับรองที่ตรวจสอบได้', body: 'ใบรับรอง ISO 9001:2015 (06724Q20693R1S), ISO 14001:2015 (06724E20351R1S) และ ISO 45001:2018 (06724S30308R1S) เผยแพร่บนหน้าเกี่ยวกับเรา และตรวจสอบได้ที่แพลตฟอร์ม CNCA ของจีน เอกสาร CE แนบมากับใบเสนอราคา' },
    { title: 'ยินดีรับการตรวจโรงงาน', body: 'สามารถจัดให้มีการตรวจสอบโดยบุคคลที่สาม (SGS, BV, TÜV) หรือทัวร์โรงงานผ่านวิดีโอตามความต้องการของผู้ซื้อ' },
    { title: 'ดูตัวอย่างก่อนสั่งล็อตใหญ่', body: 'สั่งทดลองได้ตั้งแต่ 50 ตร.ม. ส่งตัวอย่างแผงที่ระบุน้ำหนักเคลือบและความหนาแน่นแกนจริงก่อนผลิตจำนวนมาก' },
    { title: 'FOB เทียนจิน ระบุเป็นลายลักษณ์อักษร', body: 'ราคาเป็น FOB เทียนจิน พร้อมระบุสเปก MOQ และเวลาส่งมอบเป็นลายลักษณ์อักษร มีรายงานตรวจสอบก่อนบรรทุกสินค้า' },
  ],
};

export function SocialProof({ locale }: { locale: string }) {
  const points = trustPoints[locale] || trustPoints.en;

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 mb-1">{s.value}</div>
              <div className="text-sm text-slate-500">{s.label[locale] || s.label.en}</div>
            </div>
          ))}
        </div>

        {/* How buyers verify us */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {locale === 'vi' ? 'Cách Người Mua Xác Minh Chúng Tôi'
             : locale === 'th' ? 'วิธีที่ผู้ซื้อตรวจสอบเรา'
             : locale === 'zh' ? '采购方可核验的四件事'
             : 'Four Things Buyers Can Verify'}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {points.map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="font-semibold text-slate-800 mb-2">{item.title}</div>
              <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
