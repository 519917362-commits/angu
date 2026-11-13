/**
 * 语种配置
 *
 * 只有四个语种做完整翻译：en / zh / vi / th。全站所有路由都生成这四个版本。
 *
 * 马来西亚语（ms）与阿拉伯语（ar）于 2026-11-11 下线：当时只翻译了首页与
 * 声屏障落地页两页，其余路径靠 proxy 308 回 /en，属于半翻译的重复内容，
 * 既拿不到排名也摊薄了抓取预算。现在这两个前缀统一 308 到英文对应路径，
 * 保留 URL 不让外链与历史索引变 404。
 */

export const locales = ['en', 'zh', 'vi', 'th'] as const;
export type Locale = (typeof locales)[number];

/** 已下线语种：URL 仍可访问，但一律 308 到 /en（见 src/proxy.ts） */
export const retiredLocales = ['ms', 'ar'] as const;

export const defaultLocale = 'en';

/** 从右向左书写的语种，需要在 <html dir> 上体现。当前无 RTL 语种，保留空数组以免调用点改动。 */
export const rtlLocales: readonly string[] = [];

/**
 * 生成站内链接。
 * 四个语种都有完整译文，直接拼前缀即可。
 */
export function localeHref(locale: string, path: string): string {
  return `/${locale}${path}`;
}

export const routing = {
  locales,
  defaultLocale,
  localePrefix: 'always' as const,
};

/**
 * 当前路径是不是声屏障「定制落地页」本身。
 *
 * 不能用 `includes('/noise-barrier')` —— 分类页 /en/noise-barrier/products
 * 也含这段字符串，会被误判成落地页，套上那套极简页头页脚（无导航、无分类菜单）。
 * 落地页只有 /{locale}/noise-barrier 一个地址，严格整串匹配。
 */
export function isNoiseBarrierLanding(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return /^\/(en|zh|vi|th|ms|ar)\/noise-barrier\/?$/.test(pathname);
}
