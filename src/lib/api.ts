import type { Product, Category } from '@/types/product';

// ── Types ──
export interface BlogPost {
  id: number;
  slug: string;
  categorySlug: string;
  title_en: string;
  title_zh: string;
  title_vi?: string;
  title_th?: string;
  abstract_en: string;
  abstract_zh: string;
  abstract_vi?: string;
  abstract_th?: string;
  content_en: string;
  content_zh: string;
  content_vi?: string;
  content_th?: string;
  cover_image?: string; // from API
  coverImage?: string;  // legacy
  publish_time?: string; // from API
  publishTime?: string;   // legacy
  status?: string;
  category_slug?: string;
  seo_title_en?: string;
  seo_title_zh?: string;
  seo_title_vi?: string;
  seo_title_th?: string;
  seo_keywords_en?: string;
  seo_keywords_zh?: string;
  seo_keywords_vi?: string;
  seo_keywords_th?: string;
  seo_description_en?: string;
  seo_description_zh?: string;
  seo_description_vi?: string;
  seo_description_th?: string;
}

// ── Helpers ──
function getApiBase(): string {
  // Server-side: call backend directly
  if (typeof window === 'undefined') {
    return 'http://localhost:3001';
  }
  // Client-side: use relative URL (proxied by Next.js rewrites)
  return '';
}

async function fetchAPI<T>(path: string): Promise<T | null> {
  try {
    const base = getApiBase();
    const res = await fetch(`${base}${path}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ── Public API ──

/** Get all site configuration (hero, footer, banners, whyChooseUs, scenes, etc.) */
export async function getSiteConfig(): Promise<SiteConfig | null> {
  return fetchAPI<SiteConfig>('/api/site-config');
}

export type LocaleText = { en: string; zh: string; vi: string; th: string };

export interface SiteConfig {
  config: Record<string, LocaleText>;
  banners: BannerConfig[];
  whyChooseUs: WhyChooseUsConfig[];
  scenes: SceneConfig[];
}

export interface BannerConfig {
  id: number;
  image: { en: string; zh: string };
  title: LocaleText;
  subtitle: LocaleText;
  ctaText: LocaleText;
  ctaLink: string;
}

export interface WhyChooseUsConfig {
  id: number;
  icon: string;
  title: LocaleText;
  description: LocaleText;
}

export interface SceneConfig {
  id: number;
  icon: string;
  name: LocaleText;
  description: LocaleText;
  categorySlugs: string[];
}

/** Get all published products + categories (homepage, product listing) */
export async function getCatalog(): Promise<{ products: Product[]; categories: Category[] }> {
  const data = await fetchAPI<{ products: Product[]; categories: Category[] }>('/api/catalog');
  return data || { products: [], categories: [] };
}

/** Get a single product by slug (product detail page) */
export async function getProduct(slug: string): Promise<Product | null> {
  return fetchAPI<Product>(`/api/catalog/${slug}`);
}

/** Get published blog posts */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const data = await fetchAPI<{ posts: BlogPost[] }>('/api/blog-posts');
  return data?.posts || [];
}

/** Get a single blog post by slug */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return fetchAPI<BlogPost>(`/api/blog-posts/${slug}`);
}

/** Submit an inquiry form */
export async function submitInquiry(data: Record<string, unknown>): Promise<{ success: boolean }> {
  try {
    const base = getApiBase();
    const res = await fetch(`${base}/api/inquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return { success: res.ok && json.success };
  } catch {
    return { success: false };
  }
}

// ── Noise Barrier Landing Page Data ──

export interface NoiseBarrierProject {
  id: number;
  image_url: string;
  title_en: string;
  title_zh: string;
  title_vi: string;
  title_th: string;
  location_en: string;
  location_zh: string;
  location_vi: string;
  location_th: string;
  spec_en: string;
  spec_zh: string;
  spec_vi: string;
  spec_th: string;
  sort_order: number;
  status: string;
}

export interface NoiseBarrierFactoryImage {
  id: number;
  image_url: string;
  alt_en: string;
  alt_zh: string;
  alt_vi: string;
  alt_th: string;
  sort_order: number;
  status: string;
}

export interface NoiseBarrierCertification {
  id: number;
  icon: string;
  name_en: string;
  name_zh: string;
  name_vi: string;
  name_th: string;
  desc_en: string;
  desc_zh: string;
  desc_vi: string;
  desc_th: string;
}

export interface NoiseBarrierData {
  projects: NoiseBarrierProject[];
  factoryImages: NoiseBarrierFactoryImage[];
  certifications: NoiseBarrierCertification[];
  config: Record<string, LocaleText>;
}

export async function getNoiseBarrierData(): Promise<NoiseBarrierData | null> {
  return fetchAPI<NoiseBarrierData>('/api/noise-barrier-data');
}
