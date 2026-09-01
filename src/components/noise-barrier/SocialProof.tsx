interface StatItem { value: string; label: Record<string, string> }

const stats: StatItem[] = [
  { value: '10+', label: { en: 'Years Manufacturing', zh: '年生产经验', vi: 'Năm Sản Xuất', th: 'ปีผลิต' } },
  { value: '30+', label: { en: 'Export Countries', zh: '出口国家', vi: 'Quốc Gia Xuất Khẩu', th: 'ประเทศส่งออก' } },
  { value: '500+', label: { en: 'Projects Completed', zh: '完成项目', vi: 'Dự Án Hoàn Thành', th: 'โครงการที่เสร็จ' } },
  { value: '50,000+', label: { en: 'm² Monthly Output', zh: '月产能 m²', vi: 'm² Sản Xuất/Tháng', th: 'ตร.ม./เดือน' } },
];

const testimonials: Record<string, Array<{ name: string; role: string; quote: string }>> = {
  vi: [
    { name: 'Nguyễn V.', role: 'Nhà thầu — Dự án đường cao tốc Bắc Nam', quote: 'Chất lượng tấm tốt, mạ kẽm đều. Giao hàng đúng hạn và hỗ trợ bản vẽ CAD miễn phí. Sẽ tiếp tục hợp tác.' },
    { name: 'Trần H.', role: 'Giám đốc mua hàng — Công ty xây dựng VN', quote: 'Giá cạnh tranh so với nhà cung cấp nội địa, chất lượng vượt trội. Đặc biệt hài lòng với dịch vụ hậu mãi.' },
  ],
  th: [
    { name: 'Somchai P.', role: 'ผู้รับเหมา — โครงการทางด่วน', quote: 'แผงคุณภาพดี ชุบกัลวาไนซ์เรียบร้อย ส่งตรงเวลาและสนับสนุนแบบ CAD ฟรี จะใช้บริการต่อ' },
    { name: 'Apinya K.', role: 'ผู้จัดซื้อ — บริษัทก่อสร้างไทย', quote: 'ราคาแข่งกับผู้ผลิตในประเทศได้ คุณภาพดีกว่า ประทับใจบริการหลังการขายมาก' },
  ],
  en: [
    { name: 'David R.', role: 'Procurement Manager — Construction Co.', quote: 'Quality panels, consistent galvanizing, on-time delivery. Free CAD support was a big plus.' },
    { name: 'Ahmed S.', role: 'Contractor — Highway Project', quote: 'Competitive pricing, superior quality compared to local suppliers. Very satisfied with after-sales service.' },
  ],
  zh: [
    { name: '王先生', role: '采购经理 — 建筑工程公司', quote: '面板质量好，镀锌均匀，交货准时。免费 CAD 支持是加分项。' },
    { name: '李总', role: '承包商 — 高速公路项目', quote: '价格与本地供应商有竞争力，质量更优。售后服务令人满意。' },
  ],
};

export function SocialProof({ locale }: { locale: string }) {
  const t = testimonials[locale] || testimonials.en;

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

        {/* Testimonials */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {locale === 'vi' ? 'Khách Hàng Nói Gì?'
             : locale === 'th' ? 'ลูกค้าพูดถึงเรา'
             : locale === 'zh' ? '客户评价'
             : 'What Our Clients Say'}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {t.map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-start gap-1 mb-3">
                {[1,2,3,4,5].map(s => (
                  <span key={s} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-sm text-slate-600 italic leading-relaxed mb-4">"{item.quote}"</p>
              <div>
                <div className="font-semibold text-slate-800 text-sm">{item.name}</div>
                <div className="text-xs text-slate-500">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
