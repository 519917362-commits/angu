/**
 * 广告归因采集：gclid / gbraid / wbraid / utm_*
 *
 * 为什么必须在前端存一份：
 * 1. gclid 是 Google Ads 的点击标识，只有它才能把后台成交回传给 Ads
 *    （离线转化导入）。一旦 URL 里的参数丢了就永久找不回来，而 B2B 客户
 *    从首访到询盘常常隔几天、跨好几个页面。
 * 2. 表单提交是 XHR，不会自动带上落地页的 query string，必须在提交时
 *    手动把参数塞进 body。
 *
 * 存储策略：localStorage，90 天过期——与 Google Ads 默认归因窗口对齐。
 * 不用 cookie，避免给全站引入同意弹窗的负担（目标市场不含 EU/UK）。
 *
 * 隐私：只存广告点击标识与渠道参数，不存任何表单内容，也不做跨站追踪。
 */

const STORAGE_KEY = 'angu_attr_v1';
/** gclid 归因窗口为 90 天，超过再存没有意义反而误导报表 */
const TTL_MS = 90 * 24 * 60 * 60 * 1000;
/** 单字段截断长度：防止被灌超长字符串撑爆数据库与邮件正文 */
const MAX_LEN = 200;

export interface Attribution {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  /** 首次落地的站内路径，如 /en/gabion */
  landing_page?: string;
  /** 首次访问的外部来源域名，仅同域外才记录 */
  referrer?: string;
  /** 本次归因的采集时间，ISO 字符串 */
  captured_at?: string;
}

interface StoredAttribution extends Attribution {
  /** 毫秒时间戳，用于过期判断 */
  ts?: number;
}

/** 数据库字段名与前端字段一一对应，顺序也保持一致 */
const FIELDS: (keyof Attribution)[] = [
  'gclid',
  'gbraid',
  'wbraid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'landing_page',
  'referrer',
  'captured_at',
];

function clean(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const v = String(value).trim().slice(0, MAX_LEN);
  return v.length > 0 ? v : undefined;
}

function readStore(): StoredAttribution | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAttribution;
    if (!parsed || typeof parsed !== 'object') return null;
    // 过期即丢弃，避免半年前的一次点击污染当前报表
    if (typeof parsed.ts !== 'number' || Date.now() - parsed.ts > TTL_MS) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    // localStorage 被禁用（隐私模式）或内容损坏时静默降级，
    // 归因缺失不能影响表单提交本身
    return null;
  }
}

/**
 * 采集当前 URL 的归因参数。
 * 应在每个页面加载/路由变化时调用一次；幂等，可重复执行。
 *
 * 合并规则：
 * - 本次带付费参数（gclid 系列或 utm_medium=cpc/paid）→ 覆盖上一次的广告归因，
 *   取最后一次有效点击（last-touch），这与 Ads 的归因逻辑一致
 * - landing_page / referrer 只在首次记录，用于分析首触点
 * - 本次无参数但已有记录 → 原样保留，不做任何修改
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const gclid = clean(params.get('gclid'));
  const gbraid = clean(params.get('gbraid'));
  const wbraid = clean(params.get('wbraid'));
  const utmMedium = clean(params.get('utm_medium'));
  const isPaidClick =
    Boolean(gclid || gbraid || wbraid) ||
    (utmMedium ? /cpc|ppc|paid|display|retarget/i.test(utmMedium) : false);

  const existing = readStore();

  // 无付费信号：只在完全没有记录时建立基线，否则保持原样。
  // 否则用户从广告进来、中途在地址栏改了一下 URL，归因就丢了。
  if (!isPaidClick) {
    if (existing) return;
  }

  const next: StoredAttribution = {
    // 只继承首触点，广告参数一律从本次 URL 重新取。
    // 若整组 {...existing} 展开，会遇到「新点击没带 utm_term，旧关键词残留」，
    // 拼出「泰国系列 + 越南关键词」这种串数据——实测踩过。
    landing_page: existing?.landing_page,
    referrer: existing?.referrer,
    ts: Date.now(),
  };

  if (gclid) next.gclid = gclid;
  if (gbraid) next.gbraid = gbraid;
  if (wbraid) next.wbraid = wbraid;

  const utmSource = clean(params.get('utm_source'));
  const utmCampaign = clean(params.get('utm_campaign'));
  const utmTerm = clean(params.get('utm_term'));
  const utmContent = clean(params.get('utm_content'));
  if (utmSource) next.utm_source = utmSource;
  if (utmMedium) next.utm_medium = utmMedium;
  if (utmCampaign) next.utm_campaign = utmCampaign;
  if (utmTerm) next.utm_term = utmTerm;
  if (utmContent) next.utm_content = utmContent;

  // 首触点：只在还没有记录过的时候写入
  if (!next.landing_page) {
    next.landing_page = clean(window.location.pathname) ?? '/';
  }
  if (!next.referrer) {
    const ref = document.referrer;
    if (ref) {
      try {
        const refHost = new URL(ref).hostname;
        // 站内跳转不算来源
        if (refHost && refHost !== window.location.hostname) {
          next.referrer = clean(refHost);
        }
      } catch {
        /* 非法 referrer 忽略 */
      }
    }
  }
  next.captured_at = new Date().toISOString();

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* 配额满或被禁用，忽略 */
  }
}

/** 读取当前生效的归因（已过滤过期）。无记录时返回空对象。 */
export function getAttribution(): Attribution {
  const stored = readStore();
  if (!stored) return {};
  const out: Attribution = {};
  for (const key of FIELDS) {
    const value = stored[key];
    if (typeof value === 'string' && value) {
      out[key] = value;
    }
  }
  return out;
}

/**
 * 转成扁平的提交载荷，字段名与后端 `inquiries` 表列名一致。
 * 无归因时返回空对象，提交行为与改造前完全相同。
 */
export function getAttributionPayload(): Record<string, string> {
  return getAttribution() as Record<string, string>;
}
