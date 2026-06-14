import Link from 'next/link';
import {products, banners, whyChooseUs, categories} from '@/lib/data';
import {ProductCard} from '@/components/products/ProductCard';

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const t = (key: string) => messages.home?.[key] || key;

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);
  const activeBanner = banners[0];
  const bannerCta = activeBanner.ctaText[locale] || activeBanner.ctaText.en || 'Get a Quote';
  const bannerImage = activeBanner.images[locale] || activeBanner.images.en || '';

  const applicationFields = [
    {icon: '🌉', label: 'Bridge Protection', color: 'bg-blue-50'},
    {icon: '🏗️', label: 'Construction', color: 'bg-slate-50'},
    {icon: '🌊', label: 'Water Conservancy', color: 'bg-blue-50'},
    {icon: '⛰️', label: 'Mining Safety', color: 'bg-slate-50'},
    {icon: '🛤️', label: 'Railway', color: 'bg-blue-50'},
    {icon: '🛣️', label: 'Highway', color: 'bg-slate-50'},
    {icon: '🏖️', label: 'Coastal Defense', color: 'bg-blue-50'},
    {icon: '🏡', label: 'Landscaping', color: 'bg-slate-50'},
  ];

  return (
    <>
      {/* ─── Hero — Conclusion-First for AI Snippet Extraction ─── */}
      <section className="relative h-[580px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/40 z-10" />
        <img
          src={bannerImage}
          alt="Gabion wire mesh products"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 flex items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Conclusion-first H1 — extractable value proposition */}
            <h1 className="text-3xl md:text-4xl lg:text-[3rem] font-bold text-white leading-tight mb-4">
              {locale === 'zh'
                ? '石笼网箱及防护网厂家直销 — 15年经验，出口30+国家'
                : locale === 'ja'
                ? '石籠ボックス・防護網を工場直送 — 15年の実績、30カ国以上へ輸出'
                : locale === 'ar'
                ? 'صناديق الجابيون وشبكات الحماية بسعر المصنع — 15 عامًا من الخبرة، التصدير إلى أكثر من 30 دولة'
                : 'Factory‑Direct Gabion Boxes & Rockfall Nets — 15 Years, 30+ Countries'}
            </h1>
            {/* Supporting identity paragraph */}
            <p className="text-lg text-white/85 mb-2">
              {locale === 'zh'
                ? 'ISO 9001 & CE 认证制造商，位于中国丝网之都——安平。50+产品类型，低起订量，快速全球交付。'
                : locale === 'ja'
                ? 'ISO 9001・CE認証取得。中国金網の中心地・安平に拠点を置き、50種類以上の製品を低MOQ・迅速なグローバル配送で提供。'
                : locale === 'ar'
                ? 'مصنع معتمد ISO 9001 و CE مقره في آنبينغ، عاصمة شبكات الأسلاك في الصين. أكثر من 50 نوع منتج، حد أدنى منخفض للطلب، توصيل سريع عالميًا.'
                : 'ISO 9001 & CE certified manufacturer based in Anping, China\'s wire mesh capital. 50+ product types, low MOQ, fast global delivery.'}
            </p>
            {/* Trust signal badge */}
            <div className="inline-flex items-center gap-2 bg-green-600/80 text-white text-xs px-3 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              {locale === 'zh'
                ? '500+全球客户信赖'
                : locale === 'ja'
                ? '世界500社以上が信頼'
                : locale === 'ar'
                ? 'موثوق من 500+ عميل عالمي'
                : 'Trusted by 500+ Global Clients'}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${locale}/contact`}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  {bannerCta}
                </button>
              </Link>
              <Link href={`/${locale}/products`}>
                <button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold text-base backdrop-blur-sm transition-all hover:-translate-y-0.5">
                  {t('viewProducts')}
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                {num: '15+', label: locale === 'zh' ? '年行业经验' : locale === 'ja' ? '年の経験' : locale === 'ar' ? 'عامًا من الخبرة' : 'Years Experience'},
                {num: '30+', label: locale === 'zh' ? '出口国家' : locale === 'ja' ? '輸出国' : locale === 'ar' ? 'دولة تصدير' : 'Countries Exported'},
                {num: '500+', label: locale === 'zh' ? '满意客户' : locale === 'ja' ? '満足顧客' : locale === 'ar' ? 'عميل سعيد' : 'Happy Clients'},
                {num: '50+', label: locale === 'zh' ? '产品类型' : locale === 'ja' ? '製品タイプ' : locale === 'ar' ? 'نوع منتج' : 'Product Types'},
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">{stat.num}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Products ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('featuredProducts')}</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-4" />
          <p className="text-slate-500 max-w-xl mx-auto">
            {locale === 'zh' ? '探索我们最受欢迎的石笼网和防护网产品，深受全球客户信赖。' : locale === 'ja' ? '世界中のクライアントに信頼されている、当社の人気石籠・防護網製品をご覧ください。' : locale === 'ar' ? 'اكتشف منتجات الجابيون وشبكات الحماية الأكثر شعبية، موثوقة من قبل العملاء حول العالم.' : 'Discover our most popular gabion and protection net products, trusted by clients worldwide.'}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href={`/${locale}/products`}>
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all">
              {locale === 'zh' ? '查看全部产品 →' : locale === 'ja' ? 'すべての製品を見る →' : locale === 'ar' ? 'عرض جميع المنتجات →' : 'View All Products →'}
            </button>
          </Link>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('whyChooseUs')}</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 hover:border-blue-200 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-500/20">
                  <span className="text-2xl">
                    {index === 0 ? '🏭' : index === 1 ? '🛡️' : index === 2 ? '🌍' : '🤝'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {item.titles[locale] || item.titles.en}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.descriptions[locale] || item.descriptions.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Product Categories ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {locale === 'zh' ? '产品分类' : locale === 'ja' ? '製品カテゴリー' : locale === 'ar' ? 'فئات المنتجات' : 'Product Categories'}
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-4" />
          <p className="text-slate-500 max-w-xl mx-auto">
            {locale === 'zh' ? '浏览我们全面的金属丝网和防护产品系列。' : locale === 'ja' ? '包括的な金網・防護製品ラインナップをご覧ください。' : locale === 'ar' ? 'تصفح مجموعتنا الشاملة من منتجات شبكات الأسلاك والحماية.' : 'Browse our comprehensive range of wire mesh and protection products.'}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/${locale}/products?category=${cat.slug}`}>
              <article className="group bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  {cat.image && (
                    <img
                      src={cat.image}
                      alt={cat.names[locale] || cat.names.en || ''}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.names[locale] || cat.names.en}
                  </h3>
                  {cat.productCount && (
                    <p className="text-xs text-slate-400 mt-1">
                      {cat.productCount} {locale === 'zh' ? '款产品' : locale === 'ja' ? '製品' : locale === 'ar' ? 'منتجات' : 'products'}
                    </p>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Application Fields ─── */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('applicationFields')}</h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto" />
            <p className="text-slate-400 max-w-xl mx-auto mt-4">
              {locale === 'zh' ? '我们的石笼网和防护网产品广泛应用于以下领域：' : locale === 'ja' ? '当社の石籠・防護網製品は以下の分野で広く使用されています：' : locale === 'ar' ? 'يتم استخدام منتجات الجابيون وشبكات الحماية لدينا على نطاق واسع في المجالات التالية:' : 'Our gabion and protection net products are widely used in the following fields:'}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {applicationFields.map((field, index) => (
              <div
                key={index}
                className="p-4 border border-slate-700 rounded-xl text-center hover:border-blue-500 hover:bg-slate-800 transition-all cursor-pointer group"
              >
                <div className="text-3xl mb-2">{field.icon}</div>
                <div className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                  {locale === 'zh'
                    ? field.label === 'Bridge Protection' ? '桥梁防护'
                    : field.label === 'Construction' ? '建筑施工'
                    : field.label === 'Water Conservancy' ? '水利工程'
                    : field.label === 'Mining Safety' ? '矿山安全'
                    : field.label === 'Railway' ? '铁路工程'
                    : field.label === 'Highway' ? '公路工程'
                    : field.label === 'Coastal Defense' ? '海岸防护'
                    : field.label === 'Landscaping' ? '园林景观'
                    : field.label
                    : field.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {locale === 'zh' ? '准备好获取免费报价了吗？' : locale === 'ja' ? '無料見積もりをご用意できますか？' : locale === 'ar' ? 'هل أنت مستعد للحصول على عرض سعر مجاني؟' : 'Ready to Get Your Free Quote?'}
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            {locale === 'zh' ? '发送您的规格要求，我们将在24小时内提供详细报价。无义务，工厂直销价格。' : locale === 'ja' ? '仕様をお送りいただければ、24時間以内に詳細な見積もりをご提供します。無義務、工場直送価格。' : locale === 'ar' ? 'أرسل لنا مواصفاتك وسنقدم لك عرض سعر مفصل في غضون 24 ساعة. بدون التزام، أسعار مباشرة من المصنع.' : "Send us your specifications and we'll provide a detailed quotation within 24 hours. No obligation, factory direct pricing."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/contact`}>
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                {locale === 'zh' ? '免费获取报价' : locale === 'ja' ? '無料見積もり' : locale === 'ar' ? 'احصل على عرض سعر مجاني' : 'Get Free Quote'}
              </button>
            </Link>
            <a
              href="https://wa.me/8613812345678"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
                💬 {locale === 'zh' ? 'WhatsApp咨询' : locale === 'ja' ? 'WhatsAppで相談' : locale === 'ar' ? 'دردشة على واتساب' : 'Chat on WhatsApp'}
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
