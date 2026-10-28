export function TrustBadges({ locale }: { locale: string }) {
  const lang = (['en', 'zh', 'vi', 'th', 'ms', 'ar'].includes(locale) ? locale : 'en') as 'en' | 'zh' | 'vi' | 'th' | 'ms' | 'ar';

  const badges = [
    { label: { en: 'ISO 9001 / 14001 / 45001', zh: 'ISO 三体系认证', vi: 'Chứng nhận ISO 3 hệ thống', th: 'ใบรับรอง ISO 3 ระบบ', ms: 'ISO 9001 / 14001 / 45001', ar: 'ISO 9001 / 14001 / 45001' }, desc: { en: 'Quality · Environment · Safety', zh: '质量 · 环境 · 职业健康安全', vi: 'Chất lượng · Môi trường · An toàn', th: 'คุณภาพ · สิ่งแวดล้อม · ความปลอดภัย', ms: 'Kualiti · Alam Sekitar · Keselamatan', ar: 'الجودة · البيئة · السلامة' } },
    { label: { en: 'SGS Tested', zh: 'SGS 检测', vi: 'Kiểm Định SGS', th: 'ทดสอบโดย SGS', ms: 'Diuji SGS', ar: 'مُختبر من SGS' }, desc: { en: '3rd Party Lab Verified', zh: '第三方实验室验证', vi: 'Phòng Thí Nghiệm Bên Thứ Ba', th: 'ตรวจสอบโดยห้องปฏิบัติการอิสระ', ms: 'Pengesahan Makmal Pihak Ketiga', ar: 'تحقق مختبري من طرف ثالث' } },
    { label: { en: 'Custom OEM', zh: '定制代工', vi: 'Gia Công OEM', th: 'รับผลิต OEM', ms: 'OEM Tersuai', ar: 'تصنيع حسب الطلب' }, desc: { en: 'Your Specs, Our Factory', zh: '按图纸生产', vi: 'Sản Xuất Theo Bản Vẽ', th: 'ผลิตตามแบบของคุณ', ms: 'Spesifikasi Anda, Kilang Kami', ar: 'مواصفاتك، مصنعنا' } },
    { label: { en: 'Fast Production', zh: '快速生产', vi: 'Sản Xuất Nhanh', th: 'ผลิตรวดเร็ว', ms: 'Pengeluaran Pantas', ar: 'إنتاج سريع' }, desc: { en: '10–15 Days Standard', zh: '标准 10–15 天', vi: 'Tiêu Chuẩn 10–15 Ngày', th: 'มาตรฐาน 10–15 วัน', ms: 'Standard 10–15 Hari', ar: 'المعيار 10–15 يومًا' } },
    { label: { en: 'CAD Support', zh: 'CAD 支持', vi: 'Hỗ Trợ CAD', th: 'สนับสนุน CAD', ms: 'Sokongan CAD', ar: 'دعم CAD' }, desc: { en: 'Free Engineering Drawings', zh: '免费工程图纸', vi: 'Bản Vẽ Kỹ Thuật Miễn Phí', th: 'แบบวิศวกรรมฟรี', ms: 'Lukisan Kejuruteraan Percuma', ar: 'رسومات هندسية مجانية' } },
    { label: { en: 'Export to ASEAN', zh: '出口东南亚', vi: 'Xuất Khẩu ASEAN', th: 'ส่งออกอาเซียน', ms: 'Eksport ASEAN & GCC', ar: 'تصدير إلى الخليج' }, desc: { en: 'VN & TH Regular Shipping', zh: '越南/泰国定期发货', vi: 'Vận Chuyển Thường Xuyên VN & TH', th: 'จัดส่งประจำ เวียดนาม-ไทย', ms: 'Penghantaran Tetap MY & GCC', ar: 'شحن منتظم إلى دول الخليج' } },
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
