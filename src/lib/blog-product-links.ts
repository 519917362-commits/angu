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

export const BLOG_PRODUCT_LINKS: Record<string, BlogProductLinks> = {
  'gabion-retaining-wall-cost-2026': {
    rules: [
      {pattern: /\bgabion (?:box|boxes|basket|baskets)\b/i, slug: GABION_BOX},
      {pattern: /\breno mattress(?:es)?\b/i, slug: RENO_MATTRESS},
      {pattern: /\bPVC[- ]coated gabion\b/i, slug: PVC_GABION},
    ],
    related: [GABION_BOX, RENO_MATTRESS, PVC_GABION],
  },
  'gabion-vs-concrete-retaining-wall': {
    rules: [
      {pattern: /\bgabion (?:box|boxes|basket|baskets)\b/i, slug: GABION_BOX},
      {pattern: /\breno mattress(?:es)?\b/i, slug: RENO_MATTRESS},
      {pattern: /\bPVC[- ]coated\b/i, slug: PVC_GABION},
    ],
    related: [GABION_BOX, RENO_MATTRESS, PVC_GABION],
  },
  'how-to-install-gabion-retaining-wall': {
    rules: [
      {pattern: /\bgabion (?:box|boxes|basket|baskets)\b/i, slug: GABION_BOX},
      {pattern: /\breno mattress(?:es)?\b/i, slug: RENO_MATTRESS},
    ],
    related: [GABION_BOX, RENO_MATTRESS],
  },
  'gabion-retaining-wall-guide': {
    rules: [
      {pattern: /\bgabion (?:box|boxes|basket|baskets)\b/i, slug: GABION_BOX},
      {pattern: /\breno mattress(?:es)?\b/i, slug: RENO_MATTRESS},
    ],
    related: [GABION_BOX, RENO_MATTRESS, PVC_GABION],
  },
  'galvanized-vs-pvc-vs-galfan-wire-coating': {
    rules: [
      {pattern: /\bchain[- ]link (?:fence|mesh)\b/i, slug: CHAIN_LINK},
      {pattern: /\bwelded wire mesh\b/i, slug: WELDED_MESH},
      {pattern: /\bPVC[- ]coated gabion\b/i, slug: PVC_GABION},
    ],
    related: [CHAIN_LINK, WELDED_MESH, PVC_GABION],
  },
  'chain-link-fence-specification-guide': {
    rules: [
      {pattern: /\bchain[- ]link (?:fence|mesh)\b/i, slug: CHAIN_LINK},
      {pattern: /\bbarbed wire\b/i, slug: BARBED_WIRE},
      {pattern: /\bhexagonal (?:wire )?mesh\b/i, slug: HEX_MESH},
    ],
    related: [CHAIN_LINK, BARBED_WIRE, WELDED_MESH],
  },
  'active-vs-passive-rockfall-protection': {
    rules: [
      {pattern: /\bpassive (?:rockfall )?barrier\b/i, slug: PASSIVE_BARRIER},
      {pattern: /\bactive (?:slope )?protection\b/i, slug: ACTIVE_NET},
      {pattern: /\bring net\b/i, slug: PASSIVE_BARRIER},
    ],
    related: [ACTIVE_NET, PASSIVE_BARRIER],
  },
  'rockfall-protection-net-systems': {
    rules: [
      {pattern: /\bpassive (?:rockfall )?barrier\b/i, slug: PASSIVE_BARRIER},
      {pattern: /\bactive (?:slope )?protection\b/i, slug: ACTIVE_NET},
    ],
    related: [ACTIVE_NET, PASSIVE_BARRIER],
  },
  'wire-mesh-supplier-china-guide': {
    rules: [
      {pattern: /\bchain[- ]link (?:fence|mesh)\b/i, slug: CHAIN_LINK},
      {pattern: /\bwelded wire mesh\b/i, slug: WELDED_MESH},
      {pattern: /\bhexagonal (?:wire )?mesh\b/i, slug: HEX_MESH},
    ],
    related: [CHAIN_LINK, WELDED_MESH, HEX_MESH],
  },
};

/** 取某篇文章的内链配置，未登记的文章返回空对象（前台就不插链） */
export function getBlogProductLinks(slug: string): BlogProductLinks {
  return BLOG_PRODUCT_LINKS[slug] || {rules: [], related: []};
}

/** 页尾卡片的区块标题 */
export const RELATED_PRODUCTS_LABEL: Record<string, string> = {
  en: 'Related products',
  zh: '相关产品',
  vi: 'Sản phẩm liên quan',
  th: 'สินค้าที่เกี่ยวข้อง',
};
