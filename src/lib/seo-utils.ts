/**
 * SEO 工具函数 — 统一 generateMetadata 入口
 *
 * 优先级：site_config 数据库 → seo.ts 默认值
 * 所有页面的 generateMetadata 都通过此函数获取 TDK，
 * 管理后台修改后在 site_config 表写入对应 key 即可覆盖。
 */

import type {Metadata} from 'next';
import {pageSeoDefaults, PageSeo} from './seo';

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
  overrides?: {title?: string; description?: string; keywords?: string; image?: string; ogType?: 'website' | 'article'},
): Promise<Metadata> {
  const seo = await getPageSeo(page, locale);
  const title = overrides?.title || seo.title;
  const description = overrides?.description || seo.description;
  const keywords = overrides?.keywords || seo.keywords;
  // Global fallback OG image from site_config
  const defaultImageConfig = await loadSiteConfig();
  const seoDefaultImage = defaultImageConfig?.seo_default_image?.[locale] || defaultImageConfig?.seo_default_image?.en || null;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${BASE_URL}${path}`,
      languages: {
        en: `${BASE_URL}/en${path.replace(/^\/zh|^\/en|^\/vi|^\/th/, '')}`,
        zh: `${BASE_URL}/zh${path.replace(/^\/zh|^\/en|^\/vi|^\/th/, '')}`,
        vi: `${BASE_URL}/vi${path.replace(/^\/zh|^\/en|^\/vi|^\/th/, '')}`,
        th: `${BASE_URL}/th${path.replace(/^\/zh|^\/en|^\/vi|^\/th/, '')}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${path}`,
      siteName: 'Angu Wire Mesh',
      locale: {'en':'en_US','zh':'zh_CN','vi':'vi_VN','th':'th_TH'}[locale] || 'en_US',
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
