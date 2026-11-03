// 轻量转化上报：Google Ads 转化 + GA4 事件
// 设计原则：ID 未配置或仍是占位符时全部静默跳过，绝不产生无效请求

// GA4 衡量 ID。
// G- 开头的衡量 ID 是公开标识（会原样出现在页面源码里），不是密钥，
// 所以内置一份作为兜底：服务器构建时即使没有 .env.local，也不会漏埋点。
// 优先级：NEXT_PUBLIC_GA_ID（且不是占位符） > 内置值。
const BUILTIN_GA_ID = 'G-VHCDNSEK78';
const ENV_GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GA_ID = ENV_GA_ID && !/X{4,}/i.test(ENV_GA_ID) ? ENV_GA_ID : BUILTIN_GA_ID;

// Google Ads 账户级代码 ID。
// 这个值由 Ads 后台「转化 → 设置 Google 代码」生成，是账户级公开标识
// （会原样出现在页面源码里），不是密钥，同样内置一份作兜底。
// gtag('config','AW-…') 一旦出现在页面上，Ads 才能收到该账户的事件。
const BUILTIN_ADS_ID = 'AW-18532049868';
const ENV_ADS_ID = process.env.NEXT_PUBLIC_ADS_ID;
const ADS_ID = ENV_ADS_ID && !/X{4,}/i.test(ENV_ADS_ID) ? ENV_ADS_ID : BUILTIN_ADS_ID;

// 两个独立转化：表单线索 / WhatsApp·电话点击，分别作为 Google Ads 出价目标
//
// 表单转化的 send_to 内置兜底：Ads 后台「提交潜在客户表单」这个转化操作
// 生成的事件代码段里就是这个值，会原样出现在页面源码中，不是密钥。
// 内置的好处是换机器/丢 .env.local 也不会静默丢掉转化上报。
const BUILTIN_ADS_FORM_CONV = 'AW-18532049868/Ow_JCPjxtqodEMzH4oRF';
const ENV_ADS_FORM_CONV = process.env.NEXT_PUBLIC_ADS_FORM_CONVERSION;
const ADS_FORM_CONV =
  ENV_ADS_FORM_CONV && !/X{4,}/i.test(ENV_ADS_FORM_CONV) ? ENV_ADS_FORM_CONV : BUILTIN_ADS_FORM_CONV;
const ADS_CONTACT_CONV = process.env.NEXT_PUBLIC_ADS_WHATSAPP_CONVERSION;

// 第三类转化：资料/目录下载（只收一个邮箱的微转化）。
//
// ⚠️ 必须与正式询盘分开，这是本文件里最重要的一条约束。
// 如果「留邮箱换资料」和「填完项目规格询价」共用同一个 send_to，
// 智能出价会去找最便宜的转化——永远是前者。账户跑两周就会自我
// 优化成一台目录下载机：CPA 漂亮，询盘质量归零。
//
// 该转化动作必须建在 Ads 后台，并设为「次要转化（不参与出价）」。
// 未配置时为 null → 这类来源只发 GA4，不发 Ads 转化（安全默认值：
// 宁可少一个次要信号，也不要把脏数据喂给出价模型）。
const ADS_CATALOG_CONV = process.env.NEXT_PUBLIC_ADS_CATALOG_CONVERSION;

/** GA4 衡量 ID 是否已配置真实值（G-XXXXXXXXXX） */
export function isGaConfigured(): boolean {
  if (!GA_ID) return false;
  if (/X{4,}/i.test(GA_ID)) return false;
  return /^G-[A-Za-z0-9]{6,}$/.test(GA_ID);
}

/**
 * 供 gtag('config') 使用的 GA4 衡量 ID；未配置时返回 null。
 * 必须走这个函数而不是直接读 process.env——否则环境变量为空时
 * 会拼出 gtag('config','undefined') 这种无效调用。
 */
export function gaMeasurementId(): string | null {
  return isGaConfigured() ? GA_ID : null;
}

/** send_to 值是否为有效格式（AW-123456789/AbCdEfGh） */
function isValidSendTo(id: string | undefined): id is string {
  if (!id) return false;
  if (/CONVERSION_ID|CONVERSION_LABEL|X{4,}/i.test(id)) return false;
  return /^AW-\d{6,}\/[A-Za-z0-9_-]+$/.test(id);
}

/** Google Ads 转化是否已配置（任一转化配好即可） */
export function isAdsConfigured(): boolean {
  return (
    isValidSendTo(ADS_FORM_CONV) ||
    isValidSendTo(ADS_CONTACT_CONV) ||
    isValidSendTo(ADS_CATALOG_CONV)
  );
}

/**
 * gtag.js 加载用的 ID。
 * 保持用 GA4 衡量 ID 加载：这条路径线上已验证稳定，换加载 ID 有可能
 * 影响 GA4 收录，而 Ads 只需在同一个 dataLayer 里追加一条
 * gtag('config','AW-…') 就能收到事件。GA4 未配置时才回落到 AW-。
 */
export function primaryTagId(): string | null {
  if (isGaConfigured()) return GA_ID as string;
  return adsAccountPrefix();
}

/** Ads 账户前缀（AW-xxxxxx），用于 gtag('config') */
export function adsAccountPrefix(): string | null {
  if (ADS_ID && /^AW-\d{6,}$/.test(ADS_ID)) return ADS_ID;
  if (!isAdsConfigured()) return null;
  const conv = isValidSendTo(ADS_FORM_CONV) ? ADS_FORM_CONV : ADS_CONTACT_CONV;
  return (conv as string).split('/')[0];
}

export type LeadParams = {
  /** 表单/入口来源，如 product_modal、contact_page、exit_popup */
  source?: string;
  /** 意向产品或品类 */
  productInterest?: string;
  /** 联系方式：form / whatsapp / phone */
  method?: string;
} & Record<string, unknown>;

/**
 * 线索深度决定这条转化算不算「出价信号」。
 * - quote：填完项目信息的正式询盘，唯一主转化
 * - document：只留一个邮箱换资料，次要转化，不参与出价
 * - contact：点 WhatsApp/电话，次要转化
 */
type LeadDepth = 'quote' | 'document' | 'contact';

function depthOf(source: string | undefined): LeadDepth {
  if (source === 'contact_click') return 'contact';
  // exit_popup 只收邮箱，见 ADS_CATALOG_CONV 的注释
  if (source === 'exit_popup') return 'document';
  return 'quote';
}

/**
 * 上报一条线索转化。
 * - 始终发送 GA4 事件（便于 DebugView 验证与受众分析）
 * - 仅当配置了对应深度的真实 Ads 转化 ID 时才发送 Google Ads 转化
 * - gtag 未加载时静默返回，不抛错
 */
export function trackLead(params: LeadParams = {}): void {
  if (typeof window === 'undefined') return;
  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
  };
  if (typeof w.gtag !== 'function') return;

  const { source, productInterest, method, ...rest } = params;
  const depth = depthOf(source);
  const payload = {
    lead_source: source ?? 'unknown',
    lead_depth: depth,
    ...(productInterest ? { product_interest: productInterest } : {}),
    ...(method ? { contact_method: method } : {}),
    ...rest,
  };

  // GA4 侧统一叫 generate_lead（便于把「询盘」作为一个整体看），
  // 深度差异走 lead_depth 参数区分；联系方式点击另开一个事件名。
  if (depth === 'contact') {
    w.gtag('event', 'contact_click', payload);
  } else {
    w.gtag('event', 'generate_lead', payload);
  }

  // 三类触点的 Ads 转化完全分开，互不污染。
  const sendTo =
    depth === 'contact' ? ADS_CONTACT_CONV : depth === 'document' ? ADS_CATALOG_CONV : ADS_FORM_CONV;
  if (isValidSendTo(sendTo)) {
    // 不传 value / currency：账户币种是人民币，这里写死 USD 会让价值报表失真。
    // 留空即采用转化操作里配置的默认值（1 CNY）。
    w.gtag('event', 'conversion', { send_to: sendTo });
  }
}

/**
 * 委托式联系方式点击追踪：一次挂载覆盖全站所有 WhatsApp / 电话链接，
 * 无需逐个组件埋点，后续新增链接自动生效。返回清理函数。
 */
export function initContactTracking(): () => void {
  if (typeof document === 'undefined') return () => {};

  const onClick = (e: MouseEvent) => {
    const el = (e.target as HTMLElement | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!el) return;
    const href = el.getAttribute('href') || '';
    if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) {
      trackLead({ source: 'contact_click', method: 'whatsapp' });
    } else if (href.startsWith('tel:')) {
      trackLead({ source: 'contact_click', method: 'phone' });
    }
  };

  document.addEventListener('click', onClick, true);
  return () => document.removeEventListener('click', onClick, true);
}
