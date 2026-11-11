/**
 * 语种配置
 *
 * 分两档：
 * - locales：内容完整翻译的语种，全站所有路由都生成
 * - partialLocales：试水语种，只有 translatedPaths 里的页面真正翻译，
 *   其余路径由 src/proxy.ts 308 回退到 /en，避免半翻译页面被索引成重复内容
 */

export const locales = ['en', 'zh', 'vi', 'th'] as const;
export const partialLocales = ['ms', 'ar'] as const;
export const allLocales = [...locales, ...partialLocales] as const;

export type Locale = (typeof locales)[number];
export type PartialLocale = (typeof partialLocales)[number];
export type RenderLocale = (typeof allLocales)[number];

/** 从右向左书写的语种，需要在 <html dir> 上体现 */
export const rtlLocales: readonly string[] = ['ar'];

/**
 * partialLocales 真正翻译的路径（'' = 首页）
 * proxy.ts 用它当白名单：不在此列的一律 308 回 /en
 */
export const translatedPaths: readonly string[] = ['', '/noise-barrier'];

export function isPartialLocale(locale: string): locale is PartialLocale {
  return (partialLocales as readonly string[]).includes(locale);
}

export function isTranslatedPath(pathname: string): boolean {
  // 去掉语种前缀后比较；尾部斜杠归一到无斜杠形式
  const rest = pathname.replace(/^\/(ms|ar)(?=\/|$)/, '');
  return translatedPaths.includes(rest.replace(/\/+$/, ''));
}

export const defaultLocale = 'en';

/**
 * 生成站内链接。
 *
 * partialLocales 只有 translatedPaths 里的页面有译文：
 * - 这些路径保留 /ms /ar 前缀（首页与声屏障落地页是真译文，跳到 /en 反而丢了译文）
 * - 其余路径直接指向 /en，避免被 proxy 308 弹一次（用户少一跳、爬虫不浪费预算）
 */
export function localeHref(locale: string, path: string): string {
  if (!isPartialLocale(locale)) return `/${locale}${path}`;
  const rest = path.replace(/\/+$/, '');
  return translatedPaths.includes(rest) ? `/${locale}${path}` : `/${defaultLocale}${path}`;
}

export const routing = {
  locales: allLocales,
  defaultLocale,
  localePrefix: 'always' as const,
};
