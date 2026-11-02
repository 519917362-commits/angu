/**
 * 博客文章的「实际译文」判断
 *
 * 背景：blog_posts 表每篇都有 content_en / content_zh / content_vi / content_th 四列，
 * 但长文类文章往往只填了 en（zh 有时也填），vi / th 留空。页面组件在译文缺失时
 * 会回落到英文正文（`post.content_vi || post.content_en`），于是 /vi/blog/xxx 和
 * /th/blog/xxx 会渲染出「越南语导航 + 英文正文」的混合页。
 *
 * 这种页面如果被 sitemap 收录、并在 hreflang 里声明成越南语版本，Google 会判定为
 * 英文正文的重复内容。因此 sitemap 与 hreflang 都必须按「真实存在的译文」来生成，
 * 未翻译语种改为 canonical 指向英文版。
 */

import {locales as fullLocales, type Locale} from './routing';

/** 正文低于此长度视为未翻译（过滤空串与「TODO」这类占位） */
const MIN_CONTENT_LENGTH = 200;

export interface BlogTranslationFields {
  content_en?: string | null;
  content_zh?: string | null;
  content_vi?: string | null;
  content_th?: string | null;
}

/**
 * 返回该文章实际有正文的语种，顺序与 `locales` 一致。
 * 英文缺失时返回空数组——调用方应把这样的文章整体排除（前台也会 notFound）。
 */
export function availableBlogLocales(post: BlogTranslationFields): Locale[] {
  const out: Locale[] = [];
  for (const locale of fullLocales) {
    const raw = post[`content_${locale}` as keyof BlogTranslationFields];
    if (typeof raw === 'string' && raw.trim().length >= MIN_CONTENT_LENGTH) {
      out.push(locale);
    }
  }
  return out;
}

/** 当前语种是否真有译文（决定要不要把 canonical 让给英文版） */
export function hasBlogTranslation(post: BlogTranslationFields, locale: string): boolean {
  const raw = post[`content_${locale}` as keyof BlogTranslationFields];
  return typeof raw === 'string' && raw.trim().length >= MIN_CONTENT_LENGTH;
}
