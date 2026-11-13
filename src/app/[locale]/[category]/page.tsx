import { routing } from '@/lib/routing';
import { PILLAR_SLUGS, type PillarSlug } from '@/lib/pillars';
import { buildCategoryMetadata, CategoryPageView } from '@/components/category/CategoryPageView';

/**
 * 品类支柱页：/en/gabion、/en/fence、/en/wire-mesh、/en/slope-protection、
 * /en/natural-disaster-protection（× 四语）。
 *
 * 声屏障不在这里：它在 /noise-barrier 有定制落地页（静态段优先于本动态段），
 * 产品分类页单独放在 app/[locale]/noise-barrier/products。
 * 模板本体在 components/category/CategoryPageView，两处共用同一套结构与文案表。
 */

// 页面级 revalidate：与 fetch 级的 REVALIDATE_SECONDS 保持一致。
// stale-while-revalidate 的窗口在 next.config.ts 的 expireTime 里配
// （Next 16 已废弃路由级 expireTime，写在这里不生效）。
export const revalidate = 300;

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PILLAR_SLUGS.map((category) => ({ locale, category }))
  );
}

type PageProps = { params: Promise<{ locale: string; category: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale, category } = await params;
  return buildCategoryMetadata(category as PillarSlug, locale);
}

export default async function PillarPage({ params }: PageProps) {
  const { locale, category } = await params;
  return <CategoryPageView slug={category as PillarSlug} locale={locale} />;
}
