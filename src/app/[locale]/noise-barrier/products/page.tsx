import { routing } from '@/lib/routing';
import { NOISE_BARRIER_SLUG } from '@/lib/pillars';
import { buildCategoryMetadata, CategoryPageView } from '@/components/category/CategoryPageView';

/**
 * 声屏障的产品分类页：/{locale}/noise-barrier/products
 *
 * 与 /{locale}/noise-barrier（定制落地页）分工不同：
 * - 这里 = 分类页，和其他品类同模板：Hero + 9 款产品网格 + FAQ + 其他产品线；
 * - 落地页 = 工厂实力、项目案例、声学规格表、报价表单。
 *
 * 分类入口（导航、页脚、产品页面包屑）全部通过 categoryHref() 指到本页，
 * 本页再显式回链落地页，避免落地页失去内链。
 */

export const revalidate = 300;

// 只有四语 + ms/ar（会被 proxy 308 到 /en），不允许任意动态段
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return buildCategoryMetadata(NOISE_BARRIER_SLUG, locale);
}

export default async function NoiseBarrierProductsPage({ params }: PageProps) {
  const { locale } = await params;
  return <CategoryPageView slug={NOISE_BARRIER_SLUG} locale={locale} />;
}
