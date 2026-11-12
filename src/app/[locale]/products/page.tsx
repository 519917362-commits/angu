import { generatePageMeta } from '@/lib/seo-utils';
import { categoryHref } from '@/lib/pillars';
import { getCatalog, getSiteConfig } from '@/lib/api';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { Product, Category } from '@/types/product';
import { ProductExplorer } from '@/components/products/ProductExplorer';
import { MobileCategoryBar } from '@/components/products/MobileCategoryBar';
import { tLabel } from '@/lib/i18n';
import { YEARS_LABEL } from '@/lib/company';

/**
 * 这个页面刻意不读 searchParams。
 *
 * 只要读了，Next 就把整条路由判成动态渲染，响应头变成
 * `Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate`——
 * 每次访问都要现场渲一遍，CDN 也缓存不了（实测冷 TTFB 3.3s）。
 * 而列表内容对所有访客都一样，差别只在筛选条件，那属于浏览器该干的活，
 * 交给 ProductExplorer 后这里就能命中 ISR 的 s-maxage=300。
 *
 * 代价是 `?category=` 不再能改变服务端输出的 canonical 与 noindex。
 * 已确认站内没有链接指向 `?category=`（分类条与侧栏都指向品类支柱页），
 * 这些参数只会从旧书签或外部链接进来，canonical 统一指向 /products 不会造成内容重复。
 */
export async function generateMetadata({ params }: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMeta('products', locale, `/${locale}/products`);
}

/**
 * 选型指南正文（GSC 诊断报告 2026-11-11 §7）。
 *
 * /products 此前只有产品卡片 + 常见问题，可排名的正文近乎为零——它拿到 259 次
 * 展示、平均排名 30.6，靠标题已经救不动了。这段刻意写成代码常量而不是
 * site_config：DB 里的 products_seo_intro 会随后台编辑被改写（现已被改成声屏障
 * 口径、只有 40 词），选型段必须稳定输出。
 *
 * 事实口径：MOQ 与品类一一对应（声屏障 50/80/100/200 m²，主流 100；其余 50–500 m²），
 * 交期 20 天——与产品页 FAQ 保持一致，改动前先核对。
 */
const SPEC_GUIDE: Record<string, { h2: string; items: { t: string; d: string }[] }> = {
  en: {
    h2: 'How to choose the right specification',
    items: [
      {
        t: 'Start from what the product has to hold back',
        d: 'Gabion boxes and reno mattresses retain earth and water — what decides their service life is stone size against mesh aperture and the zinc coating on the wire, not the price per square metre. Chain link, welded mesh and field fence control access, where the coating class decides how many years the fence lasts before it rusts through. Noise barriers, rockfall barriers and blast walls are engineered systems: the panel is one component, and the post, foundation and connection detail carry the load. Ask for the system drawing, not only the panel price.',
      },
      {
        t: 'Three variables that move price by 30–40%',
        d: 'Wire diameter, zinc coating mass (g/m²) and the edge wire decide whether two quotes for the same nominal mesh are actually the same product. A 2.7 mm wire with 60 g/m² coating and a 3.4 mm wire with 240 g/m² are both sold as "80×100 gabion mesh", and they will not last the same ten years on a coastal riverbank. Fix all three in writing before comparing prices, and ask which standard the coating is tested to — EN 10244-2 is the one that matters in export contracts.',
      },
      {
        t: 'MOQ and lead time',
        d: 'Noise barrier panels start at 50 m² per specification — 100 m² for mixed highway and rail profiles, 200 m² for fully enclosed tunnels. Gabion, fencing and wire mesh lines start between 50 and 500 m², depending on whether the mesh is woven to order or cut from stock. Catalogue specifications ship within 20 days of deposit; custom sizes, colours and coating classes are confirmed per order. Send the specification table or the drawing and we quote against it line by line.',
      },
    ],
  },
  zh: {
    h2: '如何选对规格',
    items: [
      {
        t: '先看它要挡住什么',
        d: '石笼网箱和雷诺护垫挡土挡水，决定寿命的不是每平米报价，而是石料粒径与网孔是否匹配、钢丝镀层够不够。勾花网、电焊网、牧场围栏管的是通行边界，镀层等级直接决定能用几年。声屏障、被动防护网、防爆墙是成套工程件：屏体只是其中一件，立柱、基础与连接节点才承力——询价时要系统图，不能只要屏体单价。',
      },
      {
        t: '三个变量能让报价差 30–40%',
        d: '丝径、镀锌量（g/m²）、边丝这三项，是同名规格两张报价单差价的主要来源。2.7 mm 丝径配 60 g/m² 镀层，和 3.4 mm 配 240 g/m²，都叫「80×100 石笼网」，但在沿海河道上寿命完全不同。比价前先把这三项写进询价单，并注明镀层按哪个标准检测——出口合同里认的是 EN 10244-2。',
      },
      {
        t: '起订量与交期',
        d: '声屏障按规格 50 m² 起订：公路与轨交混排 100 m²，全封闭隧道 200 m²。石笼、围栏、丝网类视「按单织造」还是「现货裁切」在 50–500 m² 之间。目录标准规格自定金到账起 20 天内交货；定制尺寸、颜色与镀层等级按订单单独确认。把规格表或图纸发来，我们按行逐条报价。',
      },
    ],
  },
  vi: {
    h2: 'Cách chọn đúng quy cách',
    items: [
      {
        t: 'Bắt đầu từ việc sản phẩm phải giữ lại cái gì',
        d: 'Rọ đá và nệm đá giữ đất và nước — tuổi thọ do cỡ đá so với mắt lưới và lớp mạ kẽm quyết định, không phải giá mỗi m². Lưới mắt cáo, lưới hàn và hàng rào chăn nuôi kiểm soát lối đi, cấp mạ quyết định dùng được bao nhiêu năm trước khi gỉ. Tấm chắn ồn, lưới chắn đá rơi và tường chống nổ là hệ kết cấu: tấm chỉ là một bộ phận, cột, móng và liên kết mới chịu lực. Hãy yêu cầu bản vẽ hệ thống, không chỉ giá tấm.',
      },
      {
        t: 'Ba thông số làm giá chênh 30–40%',
        d: 'Đường kính dây, khối lượng mạ kẽm (g/m²) và dây viền quyết định hai báo giá cùng tên quy cách có thực sự là cùng một sản phẩm hay không. Dây 2,7 mm mạ 60 g/m² và dây 3,4 mm mạ 240 g/m² đều được bán là "lưới rọ đá 80×100", nhưng tuổi thọ trên bờ biển hoàn toàn khác nhau. Ghi rõ cả ba trong yêu cầu báo giá trước khi so giá, và hỏi lớp mạ được kiểm theo tiêu chuẩn nào — EN 10244-2 là tiêu chuẩn dùng trong hợp đồng xuất khẩu.',
      },
      {
        t: 'MOQ và thời gian giao hàng',
        d: 'Tấm chắn ồn khởi điểm 50 m² mỗi quy cách — 100 m² cho hỗn hợp đường cao tốc và đường sắt, 200 m² cho hầm kín hoàn toàn. Rọ đá, hàng rào và lưới khởi điểm 50–500 m² tùy dệt theo đơn hay cắt từ kho. Quy cách catalogue giao trong 20 ngày kể từ khi nhận tiền đặt cọc; kích thước, màu và cấp mạ tùy chỉnh xác nhận theo từng đơn. Gửi bảng quy cách hoặc bản vẽ, chúng tôi báo giá theo từng dòng.',
      },
    ],
  },
  th: {
    h2: 'เลือกสเปกให้ตรงงาน',
    items: [
      {
        t: 'เริ่มจากสิ่งที่สินค้าต้องกั้น',
        d: 'กล่องเกเบี้ยนและเรโนแมทเทรสกั้นดินและน้ำ อายุการใช้งานขึ้นกับขนาดหินเทียบช่องตะแกรงและปริมาณสังกะสีเคลือบ ไม่ใช่ราคาต่อ ตร.ม. รั้วลูกโซ่ ตะแกรงเชื่อม และรั้วเลี้ยงสัตว์ควบคุมการเข้าออก ชั้นเคลือบสังกะสีเป็นตัวกำหนดว่าใช้ได้กี่ปีก่อนเป็นสนิม แผงกั้นเสียง ตาข่ายกันหินตก และกำแพงกันระเบิดเป็นระบบวิศวกรรม: แผงเป็นเพียงชิ้นส่วนหนึ่ง เสา ฐานราก และจุดเชื่อมต่อเป็นตัวรับแรง ขอแบบระบบ ไม่ใช่แค่ราคาแผง',
      },
      {
        t: 'สามตัวแปรที่ทำให้ราคาต่างกัน 30–40%',
        d: 'เส้นผ่านศูนย์กลางลวด ปริมาณสังกะสี (กรัม/ตร.ม.) และลวดขอบ คือสิ่งที่ทำให้ใบเสนอราคาสองใบต่างกันทั้งที่เรียกชื่อสเปกเดียวกัน ลวด 2.7 มม. เคลือบ 60 กรัม กับลวด 3.4 มม. เคลือบ 240 กรัม ต่างขายในชื่อ "ตะแกรงเกเบี้ยน 80×100" เหมือนกัน แต่ใช้งานชายฝั่งได้อายุไม่เท่ากัน ระบุทั้งสามค่าลงในใบขอราคาก่อนเทียบราคา และถามว่าเคลือบตามมาตรฐานใด — EN 10244-2 คือมาตรฐานที่ใช้ในสัญญาส่งออก',
      },
      {
        t: 'MOQ และระยะเวลาส่งมอบ',
        d: 'แผงกั้นเสียงเริ่มที่ 50 ตร.ม. ต่อสเปก — 100 ตร.ม. สำหรับงานผสมทางหลวงและรถไฟ 200 ตร.ม. สำหรับอุโมงค์ปิดสนิท เกเบี้ยน รั้ว และตะแกรงลวดเริ่มที่ 50–500 ตร.ม. ขึ้นกับว่าทอตามสั่งหรือตัดจากสต็อก สเปกตามแคตตาล็อกส่งภายใน 20 วันนับจากได้รับเงินมัดจำ ขนาด สี และชั้นเคลือบสั่งทำยืนยันเป็นรายออเดอร์ ส่งตารางสเปกหรือแบบมา เราจะเสนอราคาเป็นรายบรรทัด',
      },
    ],
  },
};

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
                href={categoryHref(locale, cat.slug)}
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

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [catalog, siteConfig] = await Promise.all([
    // 列表页只渲染 name/shortDesc/image/moq/price 卡片，不读正文/FAQ/SEO 大字段
    getCatalog({ light: true }),
    getSiteConfig(),
  ]);

  const products = catalog?.products || [];
  const categories = catalog?.categories || [];

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
    `Angu Wire Mesh is a professional wire mesh manufacturer based in Anping, Hebei — the "Wire Mesh Capital" of China. With ${YEARS_LABEL} years of industry experience, we are ISO 9001 certified. We offer ${sortedCategories.length} product categories with ${products.length} product series. All products are factory-direct with no middleman markup. We export to 30+ countries.`,
    `安固丝网是河北安平专业的丝网产品制造商，拥有${YEARS_LABEL}年行业经验，通过ISO 9001质量管理体系认证。我们提供${sortedCategories.length}大品类、${products.length}款丝网产品。所有产品工厂直供，无中间商加价。出口全球30+国家和地区。`
  );
  const faqTitle = v('products_faq_title', 'Frequently Asked Questions', '常见问题');
  const faqDesc = v('products_faq_desc', 'Common questions about Angu Wire Mesh products and procurement', '关于安固丝网产品和采购的常见疑问解答');
  const crosslinksTitle = v('products_crosslinks_title', 'Browse by Application', '按行业应用浏览');
  // 选型指南走代码常量，不读 site_config，避免被后台改写后再次变成薄内容
  const guide = SPEC_GUIDE[locale] || SPEC_GUIDE.en;

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
      ? '安固丝网完整产品目录，涵盖石笼网箱、防护网、护栏网、刺绳、声屏障等九大品类，工厂直供，ISO 9001认证。'
      : locale === 'vi'
      ? 'Danh mục sản phẩm đầy đủ của Angu Wire Mesh, bao gồm rọ đá, lưới bảo vệ, hàng rào, dây kẻ gai, cách âm và hơn thế nữa. Trực tiếp nhà máy, chứng nhận ISO 9001.'
      : locale === 'th'
      ? 'แคตตาล็อกสินค้าครบถ้วนของ Angu Wire Mesh ครอบคลุมกล่องเกเบี้ยน ตะแกรงป้องกัน รั้ว ลวดหนาม แผงกั้นเสียง และอื่นๆ จำหน่ายโดยตรงจากโรงงาน ได้รับการรับรอง ISO 9001'
      : 'Complete product catalog of Angu Wire Mesh, covering gabion boxes, protection nets, fencing, barbed wire, noise barriers and more. Factory-direct, ISO 9001 certified.',
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
    { q: '可以提供定制服务吗？交期多久？', a: '完全支持定制生产，包括尺寸、丝径、镀层、颜色等规格参数。标准目录规格自定金到账起 20 天内交货；定制或大型结构按订单单独确认。欢迎联系我们获取详细报价和交期评估。' },
    { q: '如何获取产品报价？', a: '您可以通过网站联系表单、WhatsApp（+86 188 0318 9797）、邮件（annie@angumesh.com）或直接拨打销售热线联系我们。请在询盘中注明产品型号、规格需求、数量和目标港口，我们会在24小时内提供详细报价。' },
  ] : locale === 'vi' ? [
    { q: 'Angu Wire Mesh sản xuất những sản phẩm gì?', a: 'Angu Wire Mesh sản xuất 9 danh mục sản phẩm: rọ đá, lưới chống rơi đá, hàng rào lưới mắt cáo, lưới thép hàn, lưới thép lục giác, dây kẻ gai, rào chắn nổ, lưới dây thừng thép không gỉ và rào tạm thời — 28 dòng sản phẩm, được sử dụng rộng rãi trong xây dựng, thủy lợi, đường cao tốc, khai thác mỏ, nông nghiệp và cảnh quan.' },
    { q: 'Sản phẩm có chứng nhận quốc tế không?', a: 'Có. Angu Wire Mesh được chứng nhận ISO 9001, sản phẩm cốt lõi (rọ đá, lưới chống rơi đá) được chứng nhận CE, tuân thủ EN 10223-3, ETAG 027 và các tiêu chuẩn châu Âu khác, phù hợp cho mua sắm dự án quốc tế.' },
    { q: 'Số lượng đặt hàng tối thiểu (MOQ) là bao nhiêu? Có chấp nhận đơn hàng mẫu không?', a: 'MOQ tiêu chuẩn từ 100-500 m² tùy theo loại sản phẩm và thông số. Chúng tôi hoan nghênh đơn hàng mẫu và lô nhỏ để bạn đánh giá chất lượng trước khi mua số lượng lớn.' },
    { q: 'Sản phẩm được đóng gói và vận chuyển như thế nào? Xuất khẩu đến những quốc gia nào?', a: 'Sản phẩm được đóng gói bằng pallet chống ẩm hoặc thùng gỗ. Hỗ trợ vận tải biển, đường sắt và hàng không. Sản phẩm đã xuất khẩu đến hơn 30 quốc gia ở Đông Nam Á, Trung Đông, Châu Phi, Châu Âu và Nam Mỹ. Vận chuyển từ các cảng chính của Trung Quốc (Tianjin, Qingdao, Shanghai).' },
    { q: 'Có cung cấp dịch vụ sản xuất tùy chỉnh không? Thời gian giao hàng bao lâu?', a: 'Hoàn toàn hỗ trợ sản xuất tùy chỉnh bao gồm kích thước, đường kính dây, lớp phủ, màu sắc và các thông số khác. Quy cách chuẩn trong danh mục giao trong vòng 20 ngày kể từ ngày nhận tiền đặt cọc; kết cấu tùy chỉnh hoặc cỡ lớn được xác nhận riêng cho từng đơn. Liên hệ chúng tôi để báo giá chi tiết và đánh giá thời gian giao hàng.' },
    { q: 'Làm thế nào để nhận báo giá?', a: 'Bạn có thể liên hệ qua biểu mẫu trên website, WhatsApp (+86 188 0318 9797), email (annie@angumesh.com) hoặc gọi đường dây nóng. Vui lòng ghi rõ model sản phẩm, thông số, số lượng và cảng đích trong yêu cầu, chúng tôi sẽ báo giá chi tiết trong vòng 24 giờ.' },
  ] : locale === 'th' ? [
    { q: 'Angu Wire Mesh ผลิตสินค้าอะไรบ้าง?', a: 'Angu Wire Mesh ผลิต 9 หมวดสินค้า: กล่องเกเบี้ยน ตะแกรงป้องกันหินตก รั้วตะแกรงถัก ตะแกรงลวดเชื่อม ตะแกรงลวดหกเหลี่ยม ลวดหนาม รั้วกันระเบิด ตะแกรงเชือกลวดสแตนเลส และรั้วชั่วคราว — 28 ซีรีส์สินค้า ใช้กันอย่างแพร่หลายในการก่อสร้าง ชลประทาน ทางหลวง เหมืองแร่ เกษตรกรรม และภูมิทัศน์' },
    { q: 'สินค้าได้รับการรับรองระดับสากลหรือไม่?', a: 'ใช่ Angu Wire Mesh ได้รับการรับรอง ISO 9001 สินค้าหลัก (กล่องเกเบี้ยน ตะแกรงป้องกันหินตก) ได้รับการรับรอง CE เป็นไปตามมาตรฐาน EN 10223-3, ETAG 027 และมาตรฐานยุโรปอื่นๆ เหมาะสำหรับการจัดซื้อโครงการระดับสากล' },
    { q: 'จำนวนสั่งซื้อขั้นต่ำ (MOQ) คือเท่าไหร่? รับคำสั่งตัวอย่างหรือไม่?', a: 'MOQ มาตรฐานตั้งแต่ 100-500 ตร.ม. ขึ้นอยู่กับประเภทและข้อมูลจำเพาะของสินค้า เรายินดีรับคำสั่งตัวอย่างและล็อตเล็กเพื่อให้คุณประเมินคุณภาพก่อนสั่งจำนวนมาก' },
    { q: 'สินค้าถูกบรรจุและขนส่งอย่างไร? ส่งออกไปประเทศใดบ้าง?', a: 'สินค้าถูกบรรจุด้วยพาเลตกันความชื้นหรือลังไม้ รองรับการขนส่งทางเรือ ทางรถไฟ และทางอากาศ สินค้าส่งออกไปยังกว่า 30 ประเทศในเอเชียตะวันออกเฉียงใต้ ตะวันออกกลาง แอฟริกา ยุโรป และอเมริกาใต้ ส่งจากท่าเรือหลักของจีน (เทียนจิน ชิงเต่า เซี่ยงไฮ้)' },
    { q: 'มีบริการผลิตแบบกำหนดเองหรือไม่? ระยะเวลาส่งมอบนานเท่าใด?', a: 'รองรับการผลิตแบบกำหนดเองอย่างเต็มที่ รวมถึงขนาด เส้นผ่านศูนย์กลางลวด การเคลือบ สี และข้อมูลจำเพาะอื่นๆ ขนาดมาตรฐานตามแคตตาล็อกจัดส่งภายใน 20 วันนับจากวันที่ได้รับเงินมัดจำ โครงสร้างสั่งทำพิเศษหรือขนาดใหญ่ยืนยันเป็นรายออเดอร์ ติดต่อเราเพื่อรับใบเสนอราคาโดยละเอียดและการประเมินระยะเวลาส่งมอบ' },
    { q: 'จะขอรับใบเสนอราคาได้อย่างไร?', a: 'คุณสามารถติดต่อผ่านแบบฟอร์มบนเว็บไซต์ WhatsApp (+86 188 0318 9797) อีเมล (annie@angumesh.com) หรือโทรสายตรงได้โดยตรง โปรดระบุรุ่นสินค้า ข้อมูลจำเพาะ จำนวน และท่าเรือปลายทางในคำขอ เราจะให้ใบเสนอราคาโดยละเอียดภายใน 24 ชม.' },
  ] : [
    { q: 'What products does Angu Wire Mesh manufacture?', a: 'Angu Wire Mesh manufactures 9 product categories: gabion boxes, chain link fence, double-loop fencing, razor barbed wire, hexagonal wire mesh, welded wire mesh, noise barriers, blast-proof gabions, and stainless steel rope nets — 28 product series in total, widely used in construction, water conservancy, highway, mining, agriculture, and landscaping projects.' },
    { q: 'Are your products internationally certified?', a: 'Yes. Angu Wire Mesh is ISO 9001 certified, and our core products (gabion boxes, rockfall protection nets) are CE certified, compliant with EN 10223-3, ETAG 027, and other European standards, making them suitable for international project procurement.' },
    { q: 'What is the minimum order quantity (MOQ)? Do you accept sample orders?', a: 'Standard MOQ ranges from 100 to 500 sqm depending on the product type and specification. We welcome sample orders and small trial batches so you can evaluate product quality before committing to bulk purchases.' },
    { q: 'How are products packaged and shipped? Which countries do you export to?', a: 'Products are packed with moisture-proof pallets or wooden crates. We support sea freight, rail, and air shipping. Our products are exported to 30+ countries across Southeast Asia, the Middle East, Africa, Europe, and South America. We ship from major Chinese ports (Tianjin, Qingdao, Shanghai).' },
    { q: 'Do you offer custom manufacturing? What is the lead time?', a: 'Absolutely. We support full customization including dimensions, wire diameter, coating, color, and other specifications. Standard catalogue specifications ship within 20 days of deposit receipt; custom or large structures are confirmed per order. Contact us for a detailed quote and lead time assessment.' },
    { q: 'How can I get a quote?', a: 'You can reach us through the contact form on our website, WhatsApp (+86 188 0318 9797), email (annie@angumesh.com), or by calling our sales hotline directly. Please include the product model, specifications, quantity, and target port in your inquiry, and we will provide a detailed quote within 24 hours.' },
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

            {/* Category quick-nav pills — 指向品类支柱页而不是 ?category= 参数页，
                参数页 canonical 指向 /products，拿不到排名；支柱页才能承接品类词 */}
            <nav className="flex flex-wrap gap-2 mt-4" aria-label={tLabel('产品分类快速导航', 'Product category quick navigation', locale)}>
              {sortedCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${locale}/${cat.slug}`}
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
            {/* 当前分类在服务端已无从得知（页面不再读 searchParams），
                侧栏只保留「全部产品」选中态；分类导航本身走上面的 pills 与支柱页 */}
            <CategorySidebar
              categories={sortedCategories}
              products={products}
              currentSlug={undefined}
              locale={locale}
            />

            <div className="flex-1 min-w-0">
              <MobileCategoryBar
                categories={sortedCategories}
                currentSlug={undefined}
                locale={locale}
              />

              {/* 搜索 + 计数 + 网格：客户端过滤，页面本体保持可缓存 */}
              <ProductExplorer
                products={products}
                categories={sortedCategories}
                locale={locale}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========== 选型指南正文 ========== */}
      <section className="bg-white border-t border-slate-200" aria-labelledby="spec-guide-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 id="spec-guide-heading" className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            {guide.h2}
          </h2>
          <div className="mt-8 space-y-8">
            {guide.items.map((item) => (
              <div key={item.t}>
                <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">{item.t}</h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
