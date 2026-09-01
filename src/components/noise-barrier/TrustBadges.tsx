export function TrustBadges({ locale }: { locale: string }) {
  const lang = (['en', 'zh', 'vi', 'th'].includes(locale) ? locale : 'en') as 'en' | 'zh' | 'vi' | 'th';

  const badges = [
    { label: { en: 'ISO 9001:2015', zh: 'ISO 9001:2015', vi: 'ISO 9001:2015', th: 'ISO 9001:2015' }, desc: { en: 'Certified Quality Management', zh: '认证质量管理体系', vi: 'Hệ Thống Quản Lý Chất Lượng', th: 'ระบบบริหารคุณภาพที่ได้รับการรับรอง' } },
    { label: { en: 'SGS Tested', zh: 'SGS 检测', vi: 'Kiểm Định SGS', th: 'ทดสอบโดย SGS' }, desc: { en: '3rd Party Lab Verified', zh: '第三方实验室验证', vi: 'Phòng Thí Nghiệm Bên Thứ Ba', th: 'ตรวจสอบโดยห้องปฏิบัติการอิสระ' } },
    { label: { en: 'Custom OEM', zh: '定制代工', vi: 'Gia Công OEM', th: 'รับผลิต OEM' }, desc: { en: 'Your Specs, Our Factory', zh: '按图纸生产', vi: 'Sản Xuất Theo Bản Vẽ', th: 'ผลิตตามแบบของคุณ' } },
    { label: { en: 'Fast Delivery', zh: '快速交货', vi: 'Giao Hàng Nhanh', th: 'จัดส่งรวดเร็ว' }, desc: { en: '10–15 Days Standard', zh: '标准 10–15 天', vi: 'Tiêu Chuẩn 10–15 Ngày', th: 'มาตรฐาน 10–15 วัน' } },
    { label: { en: 'CAD Support', zh: 'CAD 支持', vi: 'Hỗ Trợ CAD', th: 'สนับสนุน CAD' }, desc: { en: 'Free Engineering Drawings', zh: '免费工程图纸', vi: 'Bản Vẽ Kỹ Thuật Miễn Phí', th: 'แบบวิศวกรรมฟรี' } },
    { label: { en: 'Export to ASEAN', zh: '出口东南亚', vi: 'Xuất Khẩu ASEAN', th: 'ส่งออกอาเซียน' }, desc: { en: 'VN & TH Regular Shipping', zh: '越南/泰国定期发货', vi: 'Vận Chuyển Thường Xuyên VN & TH', th: 'จัดส่งประจำ เวียดนาม-ไทย' } },
  ];

  return (
    <section className="py-12 bg-slate-100 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {badges.map((b, i) => (
            <div key={i} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-sm font-semibold text-slate-800">{b.label[lang]}</div>
              <div className="text-xs text-slate-500 mt-0.5">{b.desc[lang]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
