/**
 * SEO 工具函数 — 统一 generateMetadata 入口
 *
 * 优先级：site_config 数据库 → seo.ts 默认值
 * 所有页面的 generateMetadata 都通过此函数获取 TDK，
 * 管理后台修改后在 site_config 表写入对应 key 即可覆盖。
 */

import type {Metadata} from 'next';
import {pageSeoDefaults, PageSeo} from './seo';
import {REVALIDATE_SECONDS, SITE_DATA_TAG} from './api';
import {locales as fullLocales} from './routing';

export {pageSeoDefaults};
export type {PageSeo};

const BASE_URL = 'https://www.angumesh.com';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface SiteConfig {
  config: Record<string, Record<string, string | undefined>>;
}

let _configCache: SiteConfig | null = null;
let _configCacheTime = 0;
const CACHE_TTL = 60_000; // 1 分钟

async function loadSiteConfig(): Promise<SiteConfig['config']> {
  const now = Date.now();
  if (_configCache && now - _configCacheTime < CACHE_TTL) {
    return _configCache.config;
  }
  try {
    const res = await fetch(`${API_BASE}/api/site-config`, {
      signal: AbortSignal.timeout(3000),
      next: { revalidate: REVALIDATE_SECONDS, tags: [SITE_DATA_TAG] },
    });
    if (res.ok) {
      const data = await res.json();
      _configCache = data;
      _configCacheTime = now;
      return data.config || {};
    }
  } catch {
    // API 不可用时保持旧缓存
  }
  return _configCache?.config || {};
}

/**
 * 获取某页面的 TDK，优先读 site_config，fallback 到默认值
 */
export async function getPageSeo(page: string, locale: string): Promise<PageSeo> {
  const defaults = pageSeoDefaults[page]?.[locale] || pageSeoDefaults[page]?.en;
  if (!defaults) return {title: 'Angu Wire Mesh', description: ''};

  try {
    const config = await loadSiteConfig();
    const getVal = (key: string): string | undefined => {
      const v = config[key];
      if (!v) return undefined;
      if (typeof v === 'object') return (v as Record<string, string | undefined>)[locale] || (v as Record<string, string | undefined>).en;
      return String(v);
    };
    const title = getVal(`seo.${page}.title_en`);
    const desc = getVal(`seo.${page}.description_en`);
    const keywords = getVal(`seo.${page}.keywords_en`);

    if (title && desc) {
      return {
        title: title || defaults.title,
        description: desc || defaults.description,
        keywords: keywords || defaults.keywords,
      };
    }
  } catch {
    // fall through
  }

  return defaults;
}

/**
 * 生成标准 Metadata 对象，用于各页面 generateMetadata
 */
export async function generatePageMeta(
  page: string,
  locale: string,
  path: string,
  overrides?: {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    ogType?: 'website' | 'article';
    /**
     * 覆盖 hreflang 列表。默认只声明四个全量翻译的语种；
     * ms / ar 这类只做了部分页面的语种，由调用方显式传入 allLocales，
     * 避免在没有对应译文的页面上互相声明 hreflang。
     */
    altLocales?: readonly string[];
  },
): Promise<Metadata> {
  const seo = await getPageSeo(page, locale);
  const title = overrides?.title || seo.title;
  const description = overrides?.description || seo.description;
  // 不再输出 <meta name="keywords">：Google 自 2009 年起完全忽略该标签，
  // Bing 也仅作为作弊信号参考，唯一确定的效果是每页多几百字节 HTML。
  // PageSeo 里保留 keywords 字段仅为兼容后台表单，不再渲染到页面。
  // Global fallback OG image from site_config (1200x630, shipped in /public)
  const defaultImageConfig = await loadSiteConfig();
  const configuredImage = defaultImageConfig?.seo_default_image?.[locale] || defaultImageConfig?.seo_default_image?.en || null;
  const seoDefaultImage = configuredImage || `${BASE_URL}/og-image.jpg`;

  // 去掉语种前缀，得到与语种无关的路径
  const barePath = path.replace(/^\/(en|zh|vi|th|ms|ar)(?=\/|$)/, '');
  const altLocales = overrides?.altLocales ?? fullLocales;
  const languages: Record<string, string> = {
    'x-default': `${BASE_URL}/en${barePath}`,
  };
  for (const l of altLocales) {
    languages[l] = `${BASE_URL}/${l}${barePath}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}${path}`,
      languages,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${path}`,
      siteName: 'Angu Wire Mesh',
      locale:
        {en: 'en_US', zh: 'zh_CN', vi: 'vi_VN', th: 'th_TH', ms: 'ms_MY', ar: 'ar_AE'}[locale] ||
        'en_US',
      type: overrides?.ogType || 'website',
      ...(overrides?.image
        ? {images: [{url: overrides.image.startsWith('http') ? overrides.image : `${BASE_URL}${overrides.image}`}]}
        : seoDefaultImage
        ? {images: [{url: seoDefaultImage}]}
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  };
}
