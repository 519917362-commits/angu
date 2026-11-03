/**
 * 博客文章 → 产品页的内链映射
 *
 * 目的：9 篇文章此前没有任何一个指向产品的链接，读完深度文章的访客无路可走，
 * Google 也收不到「博客 → 产品」的权重传递。
 *
 * 两个投放位置：
 * 1. 正文插链 —— 每篇文章最多 3 个，同一个产品只插一次，只在正文段落里插
 *    （标题、表格、已有链接里都不插，避免破坏结构）
 * 2. 页尾「相关产品」卡片 —— 直接列出该文章对应的产品，不做关键词匹配
 *
 * 关键词一律用产品特有用语（gabion box / reno mattress / chain link fence 等），
 * 不用 gabion、fence 这种泛词，避免把正文里无关的句子变成链接锚文本。
 */

export interface ProductLinkRule {
  /** 匹配正文里首次出现的关键词，大小写不敏感 */
  pattern: RegExp;
  /** 目标产品 slug */
  slug: string;
}

export interface BlogProductLinks {
  /** 正文插链规则，按优先级排列 */
  rules: ProductLinkRule[];
  /** 页尾卡片展示的产品 slug（按展示顺序） */
  related: string[];
}

/** 正文最多插入几个产品链接 */
export const MAX_INLINE_PRODUCT_LINKS = 3;

const GABION_BOX = 'galvanized-gabion-box-2x1x1m';
const PVC_GABION = 'pvc-coated-gabion-box-2x1x1m';
const RENO_MATTRESS = 'reno-mattress-6x2x0.3m';
const CHAIN_LINK = 'chain-link-fence-50mm';
const WELDED_MESH = 'welded-wire-mesh-50mm';
const HEX_MESH = 'hexagonal-wire-mesh-25mm';
const BARBED_WIRE = 'steel-barbed-wire-12x14';
const ACTIVE_NET = 'active-slope-protection-net-dns50';
const PASSIVE_BARRIER = 'passive-slope-protection-barrier-gl100';
const HIGHWAY_NB = 'highway-noise-barrier-3m';
const FACTORY_NB = 'factory-noise-barrier-4m';
const BRIDGE_NB = 'bridge-noise-barrier';
const UPRIGHT_NB = 'metal-upright-noise-barrier';
const CURVED_NB = 'metal-bent-curved-noise-barrier';
const TRANSPARENT_NB = 'transparent-acrylic-glass-noise-barrier';
const ENCLOSED_NB = 'fully-enclosed-noise-barrier';

/**
 * 关键词一律用产品特有用语，不用 gabion、fence、镀锌、丝网 这类泛词，
 * 避免把正文里无关的句子变成链接锚文本。
 * 中文没有 \b 词边界，靠「用词足够具体」来防误伤（石笼网箱 而不是 网箱）。
 */
export const BLOG_PRODUCT_LINKS: Record<string, BlogProductLinks> = {
  'gabion-retaining-wall-cost-2026': {
    rules: [
      {pattern: /\bgabion (?:box|boxes|basket|baskets)\b|石笼网箱|石笼箱/i, slug: GABION_BOX},
      {pattern: /\breno mattress(?:es)?\b|雷诺护垫|雷诺垫/i, slug: RENO_MATTRESS},
      {pattern: /\bPVC[- ]coated gabion\b|包塑石笼/i, slug: PVC_GABION},
    ],
    related: [GABION_BOX, RENO_MATTRESS, PVC_GABION],
  },
  'gabion-vs-concrete-retaining-wall': {
    rules: [
      {pattern: /\bgabion (?:box|boxes|basket|baskets)\b|石笼网箱|石笼箱/i, slug: GABION_BOX},
      {pattern: /\breno mattress(?:es)?\b|雷诺护垫|雷诺垫/i, slug: RENO_MATTRESS},
      {pattern: /\bPVC[- ]coated\b|包塑石笼/i, slug: PVC_GABION},
    ],
    related: [GABION_BOX, RENO_MATTRESS, PVC_GABION],
  },
  'how-to-install-gabion-retaining-wall': {
    rules: [
      {pattern: /\bgabion (?:box|boxes|basket|baskets)\b|石笼网箱|石笼箱/i, slug: GABION_BOX},
      {pattern: /\breno mattress(?:es)?\b|雷诺护垫|雷诺垫/i, slug: RENO_MATTRESS},
    ],
    related: [GABION_BOX, RENO_MATTRESS],
  },
  'gabion-retaining-wall-guide': {
    rules: [
      {pattern: /\bgabion (?:box|boxes|basket|baskets)\b|石笼网箱|石笼箱/i, slug: GABION_BOX},
      {pattern: /\breno mattress(?:es)?\b|雷诺护垫|雷诺垫/i, slug: RENO_MATTRESS},
    ],
    related: [GABION_BOX, RENO_MATTRESS, PVC_GABION],
  },
  'galvanized-vs-pvc-vs-galfan-wire-coating': {
    rules: [
      {pattern: /\bchain[- ]link (?:fence|mesh)\b|勾花网|菱形网/i, slug: CHAIN_LINK},
      {pattern: /\bwelded wire mesh\b|电焊网|焊接网/i, slug: WELDED_MESH},
      {pattern: /\bhexagonal (?:wire )?mesh\b|六角网|拧花网/i, slug: HEX_MESH},
    ],
    related: [CHAIN_LINK, WELDED_MESH, PVC_GABION],
  },
  'chain-link-fence-specification-guide': {
    rules: [
      {pattern: /\bchain[- ]link (?:fence|mesh)\b|勾花网|菱形网/i, slug: CHAIN_LINK},
      {pattern: /\bbarbed wire\b|刺绳|刺铁丝/i, slug: BARBED_WIRE},
      {pattern: /\bwelded wire mesh\b|电焊网|焊接网/i, slug: WELDED_MESH},
    ],
    related: [CHAIN_LINK, BARBED_WIRE, WELDED_MESH],
  },
  'active-vs-passive-rockfall-protection': {
    rules: [
      {pattern: /\bpassive (?:rockfall )?barrier\b|被动防护|被动拦石/i, slug: PASSIVE_BARRIER},
      {pattern: /\bactive (?:slope )?protection\b|主动防护|主动拦石/i, slug: ACTIVE_NET},
      {pattern: /\bring net\b|环形网/i, slug: PASSIVE_BARRIER},
    ],
    related: [ACTIVE_NET, PASSIVE_BARRIER],
  },
  'rockfall-protection-net-systems': {
    rules: [
      {pattern: /\bpassive (?:rockfall )?barrier\b|被动防护|被动拦石/i, slug: PASSIVE_BARRIER},
      {pattern: /\bactive (?:slope )?protection\b|主动防护|主动拦石/i, slug: ACTIVE_NET},
      {pattern: /\bring net\b|环形网/i, slug: PASSIVE_BARRIER},
    ],
    related: [ACTIVE_NET, PASSIVE_BARRIER],
  },
  'wire-mesh-supplier-china-guide': {
    rules: [
      {pattern: /\bchain[- ]link (?:fence|mesh)\b|勾花网|菱形网/i, slug: CHAIN_LINK},
      {pattern: /\bwelded wire mesh\b|电焊网|焊接网/i, slug: WELDED_MESH},
      {pattern: /\bhexagonal (?:wire )?mesh\b|六角网|拧花网/i, slug: HEX_MESH},
    ],
    related: [CHAIN_LINK, WELDED_MESH, HEX_MESH],
  },
  'noise-barrier-types-comparison': {
    rules: [
      {pattern: /\bmetal (?:absorptive )?upright\b|\bvertical noise barrier\b|金属直立|直立式声屏障/i, slug: UPRIGHT_NB},
      {pattern: /\b(?:bent|curved)[- ]top\b|弧形声屏障|弧形顶|折角顶/i, slug: CURVED_NB},
      {pattern: /\btransparent (?:PC |polycarbonate )?(?:noise )?barrier\b|透明声屏障|透明屏体|聚碳酸酯板/i, slug: TRANSPARENT_NB},
    ],
    related: [UPRIGHT_NB, CURVED_NB, TRANSPARENT_NB, ENCLOSED_NB, HIGHWAY_NB],
  },
  'noise-barrier-cost-per-square-meter': {
    rules: [
      {pattern: /\bhighway noise barrier\b|公路声屏障/i, slug: HIGHWAY_NB},
      {pattern: /\bpolycarbonate (?:panel|sheet)\b|聚碳酸酯板/i, slug: TRANSPARENT_NB},
      {pattern: /\bfully enclosed\b|全封闭声屏障|全封闭式/i, slug: ENCLOSED_NB},
    ],
    related: [HIGHWAY_NB, TRANSPARENT_NB, ENCLOSED_NB, FACTORY_NB],
  },
  'noise-barrier-insertion-loss-design': {
    rules: [
      {pattern: /\bhighway noise barrier\b|公路声屏障/i, slug: HIGHWAY_NB},
      {pattern: /\b(?:bent|curved)[- ]top\b|弧形顶|弧形声屏障/i, slug: CURVED_NB},
      {pattern: /\bviaduct\b|\bbridge deck\b|高架桥|桥面/i, slug: BRIDGE_NB},
    ],
    related: [HIGHWAY_NB, CURVED_NB, BRIDGE_NB],
  },
  'noise-barrier-installation-guide': {
    rules: [
      {pattern: /\bH[- ]section post\b|H\s?型钢立柱|H\s?型立柱/i, slug: UPRIGHT_NB},
      {pattern: /\bhighway noise barrier\b|公路声屏障/i, slug: HIGHWAY_NB},
      {pattern: /\bfactory noise barrier\b|厂界声屏障|厂房声屏障/i, slug: FACTORY_NB},
    ],
    related: [UPRIGHT_NB, HIGHWAY_NB, FACTORY_NB, BRIDGE_NB],
  },
};

/** 取某篇文章的内链配置，未登记的文章返回空对象（前台就不插链） */
export function getBlogProductLinks(slug: string): BlogProductLinks {
  return BLOG_PRODUCT_LINKS[slug] || {rules: [], related: []};
}

/**
 * 反向索引：产品 slug → 引用过它的文章 slug 列表。
 *
 * 上一轮只做了「博客 → 产品」单向链接。产品页本身是权重最高的商业页，
 * 却一条指向深度文章的链接都没有，形成孤岛：30 个产品页 × 4 语种
 * 全部没有通往那 9 篇长文的路径，Google 也读不出「这些文章围绕哪些产品」。
 * 这里由 BLOG_PRODUCT_LINKS 反推，不用维护第二份映射表，避免两边不同步。
 */
const PRODUCT_RELATED_POSTS: Record<string, string[]> = Object.entries(BLOG_PRODUCT_LINKS).reduce(
  (acc, [postSlug, cfg]) => {
    for (const productSlug of cfg.related) {
      (acc[productSlug] ||= []).push(postSlug);
    }
    return acc;
  },
  {} as Record<string, string[]>,
);

/** 取某个产品关联的文章 slug（未登记返回空数组） */
export function getProductRelatedPosts(productSlug: string): string[] {
  return PRODUCT_RELATED_POSTS[productSlug] || [];
}

/** 产品页「延伸阅读」区块标题 */
export const RELATED_READING_LABEL: Record<string, string> = {
  en: 'Further reading',
  zh: '延伸阅读',
  vi: 'Đọc thêm',
  th: 'อ่านเพิ่มเติม',
};

/** 页尾卡片的区块标题 */
export const RELATED_PRODUCTS_LABEL: Record<string, string> = {
  en: 'Related products',
  zh: '相关产品',
  vi: 'Sản phẩm liên quan',
  th: 'สินค้าที่เกี่ยวข้อง',
};
