import Image from 'next/image';

interface HeroContent {
  badge: string;
  headline: string;
  subheadline: string;
  trust: string[];
  ctaContact: string;
  ctaProducts: string;
}

const heroContent: Record<string, HeroContent> = {
  vi: {
    badge: 'Nhà Sản Xuất Trực Tiếp · Xuất Khẩu Sang Việt Nam',
    // H1 同时覆盖「tấm cách âm」（板材）与「tường chắn âm」（墙体）两个越南语高频叫法
    headline: 'Tấm Cách Âm & Tường Chắn Âm Đường Cao Tốc, Công Nghiệp — Giá Xuất Xưởng',
    subheadline: 'STC 32–34 · NRC 0.85 · Mạ Kẽm Nhúng Nóng 15+ Năm · Giao Cảng Hồ Chí Minh / Hải Phòng',
    trust: ['ISO 9001:2015', 'SGS Tested', 'Sản Xuất 10-15 Ngày', 'Hỗ Trợ CAD'],
    ctaContact: 'Liên Hệ Chúng Tôi',
    ctaProducts: 'Xem Tất Cả Sản Phẩm',
  },
  th: {
    badge: 'ผู้ผลิตโดยตรง · ส่งออกสู่ประเทศไทย',
    // H1 同时覆盖「แผงกั้นเสียง」（声屏障板）与「กำแพงกันเสียง」（隔音墙）两个泰语高频叫法
    headline: 'แผงกั้นเสียง & กำแพงกันเสียง สำหรับทางหลวงและอุตสาหกรรม — ราคาหน้าโรงงาน',
    subheadline: 'STC 32–34 · NRC 0.85 · ชุบกัลวาไนซ์ร้อน 15+ ปี · ส่งท่าเรือกรุงเทพฯ / แหลมฉบัง',
    trust: ['ISO 9001:2015', 'SGS Tested', 'ผลิต 10-15 วัน', 'รองรับ CAD'],
    ctaContact: 'ติดต่อเรา',
    ctaProducts: 'ดูสินค้าทั้งหมด',
  },
  en: {
    badge: 'Direct Factory Export · Shipping to Vietnam & Thailand',
    headline: 'Highway & Industrial Noise Barrier — Factory-Direct Pricing',
    subheadline: 'STC 32–34 · NRC 0.85 · Hot-Dip Galvanized 15+ Years · FOB/CIF to Southeast Asia',
    trust: ['ISO 9001:2015', 'SGS Tested', '10-15 Day Production', 'CAD Support'],
    ctaContact: 'Contact Us',
    ctaProducts: 'View All Products',
  },
  zh: {
    badge: '中国工厂直供 · 出口越南与泰国',
    headline: '公路与工业声屏障 — 工厂直供价',
    subheadline: 'STC 32–34 · NRC 0.85 · 热镀锌防腐 15+ 年 · FOB/CIF 胡志明/海防/曼谷',
    trust: ['ISO 9001:2015', 'SGS 检测', '10-15 天生产', 'CAD 技术支持'],
    ctaContact: '联系我们',
    ctaProducts: '浏览全部产品',
  },
  ms: {
    badge: 'Pengeluar Terus Kilang · Eksport ke Malaysia & GCC',
    headline: 'Penghadang Bunyi Lebuh Raya & Industri — Harga Terus Kilang',
    subheadline: 'STC 32–34 · NRC 0.85 · Galvani Hot-Dip 15+ Tahun · FOB/CIF ke Pelabuhan Klang & Jebel Ali',
    trust: ['ISO 9001:2015', 'Diuji SGS', 'Pengeluaran 10-15 Hari', 'Sokongan CAD'],
    ctaContact: 'Hubungi Kami',
    ctaProducts: 'Lihat Semua Produk',
  },
  ar: {
    badge: 'تصنيع مباشر من المصنع · تصدير إلى دول الخليج',
    headline: 'حواجز صوتية للطرق السريعة والمناطق الصناعية — بسعر المصنع',
    subheadline: 'STC 32–34 · NRC 0.85 · جلفنة بالغمس الساخن 15+ سنة · FOB/CIF إلى جبل علي والدمام',
    trust: ['ISO 9001:2015', 'مُختبر من SGS', 'إنتاج 10-15 يومًا', 'دعم CAD'],
    ctaContact: 'اتصل بنا',
    ctaProducts: 'عرض جميع المنتجات',
  },
};

export function HeroSection({ locale, heroImage }: { locale: string; heroImage?: string }) {
  const c = heroContent[locale] || heroContent.en;
  const img = heroImage || '/images/products/highway-noise-barrier.jpg';

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text + CTA */}
          <div className="space-y-6">
            <span className="inline-block px-3 py-1.5 bg-blue-600/20 border border-blue-400/30 text-blue-200 text-sm rounded-full backdrop-blur-sm">
              {c.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              {c.headline}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              {c.subheadline}
            </p>
            <div className="flex flex-wrap gap-2">
              {c.trust.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 rounded-full text-xs text-slate-300 border border-white/10">
                  <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={`/${locale}/contact`} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm">
                {c.ctaContact} →
              </a>
              <a href={`/${locale}/products`} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold rounded-lg transition-colors text-sm">
                {c.ctaProducts}
              </a>
            </div>
          </div>

          {/* Right: product image with floating spec badges */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src={img}
                alt="Noise Barrier — Angu"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </div>
            {/* Floating spec badges */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 text-slate-900 flex gap-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">32–34</div>
                <div className="text-xs text-slate-500">STC</div>
              </div>
              <div className="w-px bg-slate-200" />
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">0.85</div>
                <div className="text-xs text-slate-500">NRC</div>
              </div>
              <div className="w-px bg-slate-200" />
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">15+</div>
                <div className="text-xs text-slate-500">{locale === 'vi' ? 'Năm tuổi thọ mạ' : locale === 'th' ? 'ปีอายุเคลือบ' : locale === 'ms' ? 'Tahun Ketahanan Salutan' : locale === 'ar' ? 'سنة عمر الطلاء' : locale === 'zh' ? '年防腐' : 'Coating Years'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
