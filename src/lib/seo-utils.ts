/**
 * SEO 工具函数 — 统一 generateMetadata 入口
 *
 * 优先级：site_config 数据库 → seo.ts 默认值
 * 所有页面的 generateMetadata 都通过此函数获取 TDK，
 * 管理后台修改后在 site_config 表写入对应 key 即可覆盖。
 */

import type {Metadata} from 'next';
import fs from 'node:fs';
import nodePath from 'node:path';
import {pageSeoDefaults, PageSeo} from './seo';
import {REVALIDATE_SECONDS, SITE_DATA_TAG} from './api';
import {locales as fullLocales} from './routing';

export {pageSeoDefaults};
export type {PageSeo};

const BASE_URL = 'https://www.angumesh.com';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * 读取 public/ 下图片的真实像素尺寸。
 *
 * 为什么需要：og:image 缺少 width/height 时，LinkedIn / Facebook 的抓取器
 * 必须先下载整张图才知道比例，冷启动常退回小图卡或纯文本卡；声明准确尺寸后
 * 首屏就能按大图卡排版。仓库里的封面既有 1200×675 也有 800×533，
 * 写死一个数字反而会让平台按错误比例裁切，所以从文件头真实解析。
 *
 * 只处理站内静态资源：/images、/ 走 public/；/uploads 由后端进程托管，
 * 但同一个工程里就有 backend/uploads，可以直接读文件头，不必回源 HTTP。
 */
const _sizeCache = new Map<string, {width: number; height: number} | null>();

function localImageSize(urlPath: string): {width: number; height: number} | null {
  if (_sizeCache.has(urlPath)) return _sizeCache.get(urlPath)!;
  let out: {width: number; height: number} | null = null;
  try {
    const clean = urlPath.split('?')[0].replace(/^\//, '');
    if (!clean) return null;
    // /uploads 的物理位置在 backend/uploads，其余在 public/
    const candidates = clean.startsWith('uploads/')
      ? [nodePath.join(process.cwd(), 'backend', clean)]
      : [nodePath.join(process.cwd(), 'public', clean)];
    const file = candidates.find((f) => fs.existsSync(f));
    if (file) {
      const buf = fs.readFileSync(file);
      if (buf.length > 24 && buf.toString('ascii', 1, 4) === 'PNG') {
        out = {width: buf.readUInt32BE(16), height: buf.readUInt32BE(20)};
      } else if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
        // 逐段扫描 JPEG 的 SOF0/SOF1/SOF2 段取宽高
        let i = 2;
        while (i < buf.length - 9) {
          if (buf[i] !== 0xff) { i += 1; continue; }
          const marker = buf[i + 1];
          if (marker >= 0xc0 && marker <= 0xc3) {
            out = {height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7)};
            break;
          }
          if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
          i += 2 + buf.readUInt16BE(i + 2);
        }
      } else if (
        buf.length > 30 &&
        buf.toString('ascii', 0, 4) === 'RIFF' &&
        buf.toString('ascii', 8, 12) === 'WEBP'
      ) {
        // 后台导入的老文章封面有 .webp，不解析的话这些页会缺 og:image 尺寸
        const fmt = buf.toString('ascii', 12, 16);
        if (fmt === 'VP8 ') {
          out = {width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff};
        } else if (fmt === 'VP8L') {
          const bits = buf.readUInt32LE(21);
          out = {width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1};
        } else if (fmt === 'VP8X') {
          out = {width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1};
        }
      }
    }
  } catch {
    out = null;
  }
  _sizeCache.set(urlPath, out);
  return out;
}

/**
 * 构造 openGraph.images 的单条目（相对路径自动补域名，站内图自动带真实宽高）。
 * 手写 generateMetadata 的页面（分类落地页等）直接复用，避免再出现「有 OG 但没有图」。
 */
export function ogImageEntry(imagePath: string, alt: string): {
  url: string;
  alt: string;
  width?: number;
  height?: number;
} {
  const url = imagePath.startsWith('http') ? imagePath : `${BASE_URL}${imagePath}`;
  const size = localImageSize(url.startsWith(BASE_URL) ? url.slice(BASE_URL.length) : '');
  return {url, alt, ...(size ? {width: size.width, height: size.height} : {})};
}

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
    /**
     * 覆盖 canonical。用于「该语种其实没有译文、正文回落到英文」的页面，
     * 把权重让给英文原版，避免被判重复内容。
     */
    canonical?: string;
    /** og:type=article 时输出 article:published_time（ISO 8601） */
    publishedTime?: string;
    /** og:type=article 时输出 article:modified_time（ISO 8601） */
    modifiedTime?: string;
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

  const ogImageUrl = overrides?.image
    ? (overrides.image.startsWith('http') ? overrides.image : `${BASE_URL}${overrides.image}`)
    : seoDefaultImage || null;
  // 站内图解析真实宽高，外链 / uploads 图拿不到尺寸就不写这两个字段
  const ogImageSize = ogImageUrl
    ? localImageSize(ogImageUrl.startsWith(BASE_URL) ? ogImageUrl.slice(BASE_URL.length) : '')
    : null;

  return {
    title,
    description,
    alternates: {
      canonical: overrides?.canonical || `${BASE_URL}${path}`,
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
      ...(ogImageUrl
        ? {
            images: [
              {
                url: ogImageUrl,
                // alt 同时喂给读屏与部分平台的卡片描述，缺省时用页面标题
                alt: title,
                ...(ogImageSize
                  ? {width: ogImageSize.width, height: ogImageSize.height}
                  : {}),
              },
            ],
          }
        : {}),
      ...(overrides?.publishedTime && overrides?.ogType === 'article'
        ? {publishedTime: overrides.publishedTime}
        : {}),
      ...(overrides?.modifiedTime && overrides?.ogType === 'article'
        ? {modifiedTime: overrides.modifiedTime}
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImageUrl ? {images: [ogImageUrl]} : {}),
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  };
}
