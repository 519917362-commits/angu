import { generatePageMeta } from '@/lib/seo-utils';
import { getCatalog, getSiteConfig } from '@/lib/api';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { Product, Category } from '@/types/product';
import { ProductCard } from '@/components/products/ProductCard';
import { tLabel } from '@/lib/i18n';

export async function generateMetadata({ params }: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMeta('products', locale, `/${locale}/products`);
}

function CategorySidebar({
  categories,
  products,
  currentSlug,
  locale,
}: {
  categories: Category[];
  products: Product[];
  currentSlug: string | undefined;
  locale: string;
}) {
  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
        <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span aria-hidden="true">📂</span> {tLabel('分类', 'Categories', locale)}
        </h2>
        <ul className="space-y-1">
          <li>
            <Link
              href={`/${locale}/products`}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                !currentSlug
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span>{tLabel('全部产品', 'All Products', locale)}</span>
              <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full">
                {products.length}
              </span>
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/${locale}/products?category=${cat.slug}`}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentSlug === cat.slug
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{cat.names[locale] || cat.names.en}</span>
                {cat.productCount && (
                  <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full">
                    {cat.productCount}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function MobileCategoryBar({
  categories,
  currentSlug,
  locale,
}: {
  categories: Category[];
  currentSlug: string | undefined;
  locale: string;
}) {
  return (
    <div className="lg:hidden mb-4 overflow-x-auto">
      <div className="flex gap-2 pb-2">
        <Link
          href={`/${locale}/products`}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !currentSlug
              ? 'bg-blue-600 text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          {tLabel('全部', 'All', locale)}
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/${locale}/products?category=${cat.slug}`}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              currentSlug === cat.slug
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.names[locale] || cat.names.en}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const { category: categoryParam } = await searchParams;
  const categorySlug = typeof categoryParam === 'string' ? categoryParam : undefined;

  const [catalog, siteConfig] = await Promise.all([
    getCatalog(),
    getSiteConfig(),
  ]);

  const products = catalog?.products || [];
  const categories = catalog?.categories || [];

  const filteredProducts = categorySlug
    ? products.filter((p) => p.categorySlug === categorySlug)
    : products;

  // Sort categories by product count desc
  const sortedCategories = [...categories].sort((a, b) => (b.productCount || 0) - (a.productCount || 0));

  const config = siteConfig?.config;
  const v = (key: string, fbEn: string, fbZh?: string) => {
    const entry = config?.[key];
    if (!entry) return locale === 'zh' ? (fbZh ?? fbEn) : fbEn;
    return (entry as Record<string, string>)[locale] || entry.en || (locale === 'zh' ? (fbZh ?? fbEn) : fbEn);
  };
  const headerTitle = v('products_header_title', 'Products', '产品中心');
  const headerSubtitle = v('products_header_subtitle',
    `${sortedCategories.length} categories · ${products.length} products · factory-direct. ${sortedCategories.slice(0, 5).map(c => c.names.en).join(', ')} — one-stop procurement.`,
    `${sortedCategories.length}大品类 · ${products.length}款产品 · 工厂直供。${sortedCategories.slice(0, 5).map(c => c.names.zh).join('、')} — 一站式采购。`
  );
  const headerBreadcrumb = v('products_header_breadcrumb', 'Products', '产品中心');
  const seoIntro = v('products_seo_intro',
    `Angu Wire Mesh is a professional wire mesh manufacturer based in Anping, Hebei — the "Wire Mesh Capital" of China. With 15 years of industry experience, we are ISO 9001 and CE certified. We offer ${sortedCategories.length} product categories with ${products.length} product series. All products are factory-direct with no middleman markup. We export to 30+ countries.`,
    `安固丝网是河北安平专业的丝网产品制造商，拥有15年行业经验，通过ISO 9001质量管理体系认证和CE产品认证。我们提供${sortedCategories.length}大品类、${products.length}款丝网产品。所有产品工厂直供，无中间商加价。出口全球30+国家和地区。`
  );
  const faqTitle = v('products_faq_title', 'Frequently Asked Questions', '常见问题');
  const faqDesc = v('products_faq_desc', 'Common questions about Angu Wire Mesh products and procurement', '关于安固丝网产品和采购的常见疑问解答');
  const crosslinksTitle = v('products_crosslinks_title', 'Browse by Application', '按行业应用浏览');

  const baseUrl = 'https://www.angumesh.com';
  const pagePath = `/${locale}/products`;
  const canonicalUrl = `${baseUrl}${pagePath}`;

  // ── JSON-LD: BreadcrumbList ──
  const breadcrumbLD = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: tLabel('首页', 'Home', locale),
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: tLabel('产品中心', 'Products', locale),
        item: canonicalUrl,
      },
    ],
  };

  // ── JSON-LD: ItemList (all products for AI engines) ──
  const itemListLD = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: locale === 'zh'
      ? '安固丝网产品目录 — 石笼网、防护网、护栏网等'
      : locale === 'vi'
      ? 'Danh mục sản phẩm Angu Wire Mesh — Rọ đá, Hàng rào, Lưới bảo vệ'
      : locale === 'th'
      ? 'แคตตาล็อกสินค้า Angu Wire Mesh — เกเบี้ยน รั้ว ตะแกรงป้องกัน'
      : 'Angu Wire Mesh Product Catalog — Gabion, Fence, Protection Nets',
    description: locale === 'zh'
      ? '安固丝网完整产品目录，涵盖石笼网箱、防护网、护栏网、刺绳、声屏障等九大品类，工厂直供，ISO 9001/CE认证。'
      : locale === 'vi'
      ? 'Danh mục sản phẩm đầy đủ của Angu Wire Mesh, bao gồm rọ đá, lưới bảo vệ, hàng rào, dây kẻ gai, cách âm và hơn thế nữa. Trực tiếp nhà máy, chứng nhận ISO 9001/CE.'
      : locale === 'th'
      ? 'แคตตาล็อกสินค้าครบถ้วนของ Angu Wire Mesh ครอบคลุมกล่องเกเบี้ยน ตะแกรงป้องกัน รั้ว ลวดหนาม แผงกั้นเสียง และอื่นๆ จำหน่ายโดยตรงจากโรงงาน ได้รับการรับรอง ISO 9001/CE'
      : 'Complete product catalog of Angu Wire Mesh, covering gabion boxes, protection nets, fencing, barbed wire, noise barriers and more. Factory-direct, ISO 9001/CE certified.',
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Thing',
        name: p.names[locale] || p.names.en,
        description: p.shortDescriptions?.[locale] || p.shortDescriptions?.en || '',
        image: p.images?.[0] ? `${baseUrl}${p.images[0]}` : undefined,
        url: `${baseUrl}/${locale}/products/${p.slug}`,
      },
    })),
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
  };

  // ── JSON-LD: FAQPage (GEO) ──
  const faqItems = locale === 'zh' ? [
    { q: '安固丝网主要生产哪些产品？', a: '安固丝网主要生产石笼网箱、勾花网围栏、双圈护栏网、刀片刺绳、六角网、电焊网、声屏障、防爆石笼网、不锈钢绳网等九大品类丝网产品，共28款系列产品，广泛应用于建筑、水利、公路、矿山、农牧等领域。' },
    { q: '产品是否通过国际认证？', a: '是的。安固丝网通过ISO 9001质量管理体系认证，石笼网、边坡防护网等核心产品获得CE认证，符合EN 10223-3、ETAG 027等欧洲标准，可用于海外工程项目采购。' },
    { q: '最小起订量是多少？可以接受样品订单吗？', a: '常规产品起订量为100-500平方米，具体因产品类型和规格不同而异。我们支持样品订单和小批量试单，方便您检验产品质量后再决定大批量采购。' },
    { q: '产品如何包装和运输？出口到哪些国家？', a: '采用防潮托盘包装或木箱包装，支持海运、铁路及空运。产品已出口至东南亚、中东、非洲、欧洲、南美等30多个国家和地区，在中国主要港口（天津、青岛、上海）发货。' },
    { q: '可以提供定制服务吗？交期多久？', a: '完全支持定制生产，包括尺寸、丝径、镀层、颜色等规格参数。标准产品交期7-15天，定制产品15-30天，具体取决于订单数量和工艺复杂度。欢迎联系我们获取详细报价和交期评估。' },
    { q: '如何获取产品报价？', a: '您可以通过网站联系表单、WhatsApp（+86 188 0318 9797）、邮件（anguwiremesh@gmail.com）或直接拨打销售热线联系我们。请在询盘中注明产品型号、规格需求、数量和目标港口，我们会在24小时内提供详细报价。' },
  ] : locale === 'vi' ? [
    { q: 'Angu Wire Mesh sản xuất những sản phẩm gì?', a: 'Angu Wire Mesh sản xuất 9 danh mục sản phẩm: rọ đá, lưới chống rơi đá, hàng rào lưới mắt cáo, lưới thép hàn, lưới thép lục giác, dây kẻ gai, rào chắn nổ, lưới dây thừng thép không gỉ và rào tạm thời — 28 dòng sản phẩm, được sử dụng rộng rãi trong xây dựng, thủy lợi, đường cao tốc, khai thác mỏ, nông nghiệp và cảnh quan.' },
    { q: 'Sản phẩm có chứng nhận quốc tế không?', a: 'Có. Angu Wire Mesh được chứng nhận ISO 9001, sản phẩm cốt lõi (rọ đá, lưới chống rơi đá) được chứng nhận CE, tuân thủ EN 10223-3, ETAG 027 và các tiêu chuẩn châu Âu khác, phù hợp cho mua sắm dự án quốc tế.' },
    { q: 'Số lượng đặt hàng tối thiểu (MOQ) là bao nhiêu? Có chấp nhận đơn hàng mẫu không?', a: 'MOQ tiêu chuẩn từ 100-500 m² tùy theo loại sản phẩm và thông số. Chúng tôi hoan nghênh đơn hàng mẫu và lô nhỏ để bạn đánh giá chất lượng trước khi mua số lượng lớn.' },
    { q: 'Sản phẩm được đóng gói và vận chuyển như thế nào? Xuất khẩu đến những quốc gia nào?', a: 'Sản phẩm được đóng gói bằng pallet chống ẩm hoặc thùng gỗ. Hỗ trợ vận tải biển, đường sắt và hàng không. Sản phẩm đã xuất khẩu đến hơn 30 quốc gia ở Đông Nam Á, Trung Đông, Châu Phi, Châu Âu và Nam Mỹ. Vận chuyển từ các cảng chính của Trung Quốc (Tianjin, Qingdao, Shanghai).' },
    { q: 'Có cung cấp dịch vụ sản xuất tùy chỉnh không? Thời gian giao hàng bao lâu?', a: 'Hoàn toàn hỗ trợ sản xuất tùy chỉnh bao gồm kích thước, đường kính dây, lớp phủ, màu sắc và các thông số khác. Sản phẩm tiêu chuẩn 7-15 ngày, sản phẩm tùy chỉnh 15-30 ngày tùy thuộc vào số lượng và độ phức tạp. Liên hệ chúng tôi để báo giá chi tiết và đánh giá thời gian giao hàng.' },
    { q: 'Làm thế nào để nhận báo giá?', a: 'Bạn có thể liên hệ qua biểu mẫu trên website, WhatsApp (+86 188 0318 9797), email (anguwiremesh@gmail.com) hoặc gọi đường dây nóng. Vui lòng ghi rõ model sản phẩm, thông số, số lượng và cảng đích trong yêu cầu, chúng tôi sẽ báo giá chi tiết trong vòng 24 giờ.' },
  ] : locale === 'th' ? [
    { q: 'Angu Wire Mesh ผลิตสินค้าอะไรบ้าง?', a: 'Angu Wire Mesh ผลิต 9 หมวดสินค้า: กล่องเกเบี้ยน ตะแกรงป้องกันหินตก รั้วตะแกรงถัก ตะแกรงลวดเชื่อม ตะแกรงลวดหกเหลี่ยม ลวดหนาม รั้วกันระเบิด ตะแกรงเชือกลวดสแตนเลส และรั้วชั่วคราว — 28 ซีรีส์สินค้า ใช้กันอย่างแพร่หลายในการก่อสร้าง ชลประทาน ทางหลวง เหมืองแร่ เกษตรกรรม และภูมิทัศน์' },
    { q: 'สินค้าได้รับการรับรองระดับสากลหรือไม่?', a: 'ใช่ Angu Wire Mesh ได้รับการรับรอง ISO 9001 สินค้าหลัก (กล่องเกเบี้ยน ตะแกรงป้องกันหินตก) ได้รับการรับรอง CE เป็นไปตามมาตรฐาน EN 10223-3, ETAG 027 และมาตรฐานยุโรปอื่นๆ เหมาะสำหรับการจัดซื้อโครงการระดับสากล' },
    { q: 'จำนวนสั่งซื้อขั้นต่ำ (MOQ) คือเท่าไหร่? รับคำสั่งตัวอย่างหรือไม่?', a: 'MOQ มาตรฐานตั้งแต่ 100-500 ตร.ม. ขึ้นอยู่กับประเภทและข้อมูลจำเพาะของสินค้า เรายินดีรับคำสั่งตัวอย่างและล็อตเล็กเพื่อให้คุณประเมินคุณภาพก่อนสั่งจำนวนมาก' },
    { q: 'สินค้าถูกบรรจุและขนส่งอย่างไร? ส่งออกไปประเทศใดบ้าง?', a: 'สินค้าถูกบรรจุด้วยพาเลตกันความชื้นหรือลังไม้ รองรับการขนส่งทางเรือ ทางรถไฟ และทางอากาศ สินค้าส่งออกไปยังกว่า 30 ประเทศในเอเชียตะวันออกเฉียงใต้ ตะวันออกกลาง แอฟริกา ยุโรป และอเมริกาใต้ ส่งจากท่าเรือหลักของจีน (เทียนจิน ชิงเต่า เซี่ยงไฮ้)' },
    { q: 'มีบริการผลิตแบบกำหนดเองหรือไม่? ระยะเวลาส่งมอบนานเท่าใด?', a: 'รองรับการผลิตแบบกำหนดเองอย่างเต็มที่ รวมถึงขนาด เส้นผ่านศูนย์กลางลวด การเคลือบ สี และข้อมูลจำเพาะอื่นๆ สินค้ามาตรฐาน 7-15 วัน สินค้ากำหนดเอง 15-30 วัน ขึ้นอยู่กับปริมาณและความซับซ้อน ติดต่อเราเพื่อรับใบเสนอราคาโดยละเอียดและการประเมินระยะเวลาส่งมอบ' },
    { q: 'จะขอรับใบเสนอราคาได้อย่างไร?', a: 'คุณสามารถติดต่อผ่านแบบฟอร์มบนเว็บไซต์ WhatsApp (+86 188 0318 9797) อีเมล (anguwiremesh@gmail.com) หรือโทรสายตรงได้โดยตรง โปรดระบุรุ่นสินค้า ข้อมูลจำเพาะ จำนวน และท่าเรือปลายทางในคำขอ เราจะให้ใบเสนอราคาโดยละเอียดภายใน 24 ชม.' },
  ] : [
    { q: 'What products does Angu Wire Mesh manufacture?', a: 'Angu Wire Mesh manufactures 9 product categories: gabion boxes, chain link fence, double-loop fencing, razor barbed wire, hexagonal wire mesh, welded wire mesh, noise barriers, blast-proof gabions, and stainless steel rope nets — 28 product series in total, widely used in construction, water conservancy, highway, mining, agriculture, and landscaping projects.' },
    { q: 'Are your products internationally certified?', a: 'Yes. Angu Wire Mesh is ISO 9001 certified, and our core products (gabion boxes, rockfall protection nets) are CE certified, compliant with EN 10223-3, ETAG 027, and other European standards, making them suitable for international project procurement.' },
    { q: 'What is the minimum order quantity (MOQ)? Do you accept sample orders?', a: 'Standard MOQ ranges from 100 to 500 sqm depending on the product type and specification. We welcome sample orders and small trial batches so you can evaluate product quality before committing to bulk purchases.' },
    { q: 'How are products packaged and shipped? Which countries do you export to?', a: 'Products are packed with moisture-proof pallets or wooden crates. We support sea freight, rail, and air shipping. Our products are exported to 30+ countries across Southeast Asia, the Middle East, Africa, Europe, and South America. We ship from major Chinese ports (Tianjin, Qingdao, Shanghai).' },
    { q: 'Do you offer custom manufacturing? What is the lead time?', a: 'Absolutely. We support full customization including dimensions, wire diameter, coating, color, and other specifications. Standard products ship within 7–15 days, custom orders within 15–30 days depending on quantity and complexity. Contact us for a detailed quote and lead time assessment.' },
    { q: 'How can I get a quote?', a: 'You can reach us through the contact form on our website, WhatsApp (+86 188 0318 9797), email (anguwiremesh@gmail.com), or by calling our sales hotline directly. Please include the product model, specifications, quantity, and target port in your inquiry, and we will provide a detailed quote within 24 hours.' },
  ];

  const faqLD = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  // combine all JSON-LD into one array
  const jsonLd = [breadcrumbLD, itemListLD, faqLD];

  return (
    <>
      {/* JSON-LD structured data injected into <head> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ========== Page Header ========== */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 80%, rgba(59,130,246,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.4) 0%, transparent 50%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-blue-300 text-sm mb-4">
              <Link href={`/${locale}`} className="hover:text-white transition-colors">
                {tLabel('首页', 'Home', locale)}
              </Link>
              <span>/</span>
              <span className="text-white">{headerBreadcrumb}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {headerTitle}
            </h1>
            <p className="text-lg text-blue-200/80 leading-relaxed">
              {headerSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ========== Content Body ========== */}
      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* SEO intro paragraph + category pills */}
          <div className="pt-8 pb-4">
            <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600">
              <p>{seoIntro}</p>
            </div>

            {/* Category quick-nav pills */}
            <nav className="flex flex-wrap gap-2 mt-4" aria-label={tLabel('产品分类快速导航', 'Product category quick navigation', locale)}>
              {sortedCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${locale}/products?category=${cat.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 text-slate-600 rounded-full text-xs font-medium transition-colors shadow-sm"
                >
                  {cat.names[locale] || cat.names.en}
                  <span className="text-slate-400">({cat.productCount})</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* ========== Products Grid ========== */}
          <div className="flex gap-8 pt-2 pb-10">
            <CategorySidebar
              categories={sortedCategories}
              products={products}
              currentSlug={categorySlug}
              locale={locale}
            />

            <div className="flex-1 min-w-0">
              <MobileCategoryBar
                categories={sortedCategories}
                currentSlug={categorySlug}
                locale={locale}
              />

              <div className="mb-6 flex items-center justify-between">
                <p className="text-slate-600 text-sm">
                  {locale === 'zh'
                    ? `显示 ${filteredProducts.length} 个产品`
                    : locale === 'vi'
                    ? `Hiển thị ${filteredProducts.length} sản phẩm`
                    : locale === 'th'
                    ? `แสดง ${filteredProducts.length} สินค้า`
                    : `Showing ${filteredProducts.length} products`}
                  {categorySlug && (
                    <span>
                      {tLabel('，分类：', ' in ', locale)}
                      <span className="font-semibold text-blue-600">
                        {categories.find((c) => c.slug === categorySlug)?.names[locale] ||
                          categories.find((c) => c.slug === categorySlug)?.names.en ||
                          categorySlug}
                      </span>
                    </span>
                  )}
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      locale={locale}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-xl">
                  <div className="text-5xl mb-4" aria-hidden="true">📦</div>
                  <p className="text-lg font-semibold text-slate-900 mb-2">
                    {tLabel('未找到产品', 'No products found', locale)}
                  </p>
                  <p className="text-slate-500 text-sm mb-6">
                    {locale === 'zh'
                      ? '尝试选择其他分类。'
                      : locale === 'vi'
                      ? 'Thử chọn danh mục khác.'
                      : locale === 'th'
                      ? 'ลองเลือกหมวดหมู่อื่น'
                      : 'Try selecting a different category.'}
                  </p>
                  <Link href={`/${locale}/products`}>
                    <button className="text-blue-600 font-medium hover:text-blue-700">
                      ← {tLabel('查看全部产品', 'View all products', locale)}
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========== GEO: FAQ Section ========== */}
      <section className="bg-slate-50 border-t border-slate-200" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-2">
            {faqTitle}
          </h2>
          <p className="text-slate-500 text-center mb-10 text-sm">
            {faqDesc}
          </p>

          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <details key={idx} className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors list-none">
                  <span className="font-medium text-slate-800 pr-4 text-sm md:text-base">{item.q}</span>
                  <svg
                    className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-4 text-slate-600 text-sm leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ========== GEO: Internal Link Cross-References ========== */}
      <section className="bg-white border-t border-slate-200" aria-labelledby="related-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 id="related-heading" className="text-xl font-bold text-slate-900 text-center mb-8">
            {crosslinksTitle}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { key: 'construction', en: 'Construction', zh: '建筑工程', vi: 'Xây dựng', th: 'งานก่อสร้าง', href: `/${locale}/solutions` },
              { key: 'highway', en: 'Highway & Railway', zh: '公路铁路', vi: 'Đường cao tốc & Đường sắt', th: 'ทางหลวง & รถไฟ', href: `/${locale}/solutions` },
              { key: 'mining', en: 'Mining & Slope', zh: '矿山边坡', vi: 'Khai thác mỏ & Dốc', th: 'เหมืองแร่ & ไหล่เขา', href: `/${locale}/solutions` },
              { key: 'water', en: 'Water Conservancy', zh: '水利工程', vi: 'Thủy lợi', th: 'ชลประทาน', href: `/${locale}/solutions` },
              { key: 'security', en: 'Perimeter Security', zh: '周界安防', vi: 'An ninh chu vi', th: 'การรักษาความปลอดภัยรอบพื้นที่', href: `/${locale}/solutions` },
              { key: 'agriculture', en: 'Agriculture', zh: '农牧养殖', vi: 'Nông nghiệp', th: 'เกษตรกรรม', href: `/${locale}/solutions` },
              { key: 'environmental', en: 'Environmental', zh: '生态环保', vi: 'Môi trường', th: 'สิ่งแวดล้อม', href: `/${locale}/solutions` },
              { key: 'residential', en: 'Residential', zh: '住宅社区', vi: 'Khu dân cư', th: 'ที่อยู่อาศัย', href: `/${locale}/solutions` },
              { key: 'about', en: 'About Factory', zh: '工厂实力', vi: 'Về nhà máy', th: 'เกี่ยวกับโรงงาน', href: `/${locale}/about` },
              { key: 'contact', en: 'Get Quote', zh: '获取报价', vi: 'Nhận báo giá', th: 'ขอใบเสนอราคา', href: `/${locale}/contact` },
            ].map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="flex items-center justify-center px-4 py-3 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-slate-600 rounded-xl text-sm font-medium transition-colors border border-transparent hover:border-blue-200"
              >
                {locale === 'zh' ? item.zh : locale === 'vi' ? (item.vi || item.en) : locale === 'th' ? (item.th || item.en) : item.en}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
