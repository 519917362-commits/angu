export function CtaSection({ locale, phone }: { locale: string; phone: string }) {
  const isVi = locale === 'vi';
  const isTh = locale === 'th';

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-600 to-blue-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          {isVi ? 'Sẵn Sàng Bắt Đầu Dự Án Của Bạn?'
           : isTh ? 'พร้อมเริ่มโครงการของคุณหรือยัง?'
           : locale === 'zh' ? '准备启动您的项目了吗？'
           : 'Ready to Start Your Project?'}
        </h2>
        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
          {isVi
            ? 'Nhận báo giá trong 24 giờ. Gửi bản vẽ dự án của bạn — chúng tôi sẽ đề xuất giải pháp cách âm tối ưu và gửi báo giá FOB/CIF chi tiết.'
            : isTh
            ? 'รับใบเสนอราคาภายใน 24 ชั่วโมง ส่งแบบโครงการของคุณ — เราจะแนะนำโซลูชันกันเสียงที่ดีที่สุดและส่งใบเสนอราคา FOB/CIF โดยละเอียด'
            : locale === 'zh'
            ? '24小时内获取报价。发送您项目的图纸 — 我们将推荐最佳声学方案并提供详细的FOB/CIF报价。'
            : 'Get a quote within 24 hours. Send us your project drawings — we\'ll recommend the optimal acoustic solution and provide a detailed FOB/CIF quotation.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#quote-form"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-colors text-lg">
            {isVi ? '📋 Nhận Báo Giá Ngay'
             : isTh ? '📋 ขอใบเสนอราคาเลย'
             : locale === 'zh' ? '📋 获取报价'
             : '📋 Get Your Quote Now'}
          </a>

          {/* Vietnam: Zalo - Thailand: LINE */}
          {isVi ? (
            <a href={`https://zalo.me/${phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500/20 border border-blue-300/30 text-white font-semibold rounded-lg hover:bg-blue-500/30 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
              Chat Zalo
            </a>
          ) : isTh ? (
            <a href={`https://line.me/ti/p/~${phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-500/20 border border-green-300/30 text-white font-semibold rounded-lg hover:bg-green-500/30 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="6"/></svg>
              Chat LINE
            </a>
          ) : (
            <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-500/20 border border-green-300/30 text-white font-semibold rounded-lg hover:bg-green-500/30 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
              Chat WhatsApp
            </a>
          )}
        </div>

        <div className="mt-6">
          <a href={`/${locale}`}
            className="inline-flex items-center gap-1.5 text-blue-100 hover:text-white text-sm underline underline-offset-4 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            {isVi ? 'Về Trang Chủ'
             : isTh ? 'กลับหน้าหลัก'
             : locale === 'zh' ? '返回官网首页'
             : 'Back to Homepage'}
          </a>
        </div>
      </div>
    </section>
  );
}
