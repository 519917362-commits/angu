import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {products} from '@/lib/data';
import {InquiryButtonLarge} from '@/components/inquiry/InquiryButtonLarge';
import {ProductCard} from '@/components/products/ProductCard';

const specLabels: Record<string, Record<string, string>> = {
  dimensions: {zh: '尺寸', en: 'Dimensions'},
  wireDiameter: {zh: '丝径', en: 'Wire Diameter'},
  meshAperture: {zh: '网孔', en: 'Mesh Aperture'},
  surfaceTreatment: {zh: '表面处理', en: 'Surface Treatment'},
  material: {zh: '材质', en: 'Material'},
  tensileStrength: {zh: '抗拉强度', en: 'Tensile Strength'},
  weight: {zh: '重量', en: 'Weight'},
  coating: {zh: '涂层', en: 'Coating'},
  width: {zh: '宽度', en: 'Width'},
  length: {zh: '长度', en: 'Length'},
  height: {zh: '高度', en: 'Height'},
  rollLength: {zh: '卷长', en: 'Roll Length'},
};

interface ProductDetailPageProps {
  params: Promise<{locale: string; slug: string}>;
}

export async function generateStaticParams() {
  const slugs = products.map((p) => p.slug);
  const params: {locale: string; slug: string}[] = [];
  const locales = ['en', 'zh', 'ar', 'ja', 'ko', 'id', 'vi', 'es', 'fr', 'de', 'pt', 'th'];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({locale, slug});
    }
  }
  return params;
}

export async function generateMetadata({params}: ProductDetailPageProps): Promise<Metadata> {
  const {locale, slug} = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {title: 'Product Not Found'};

  const name = product.names[locale] || product.names.en || '';
  const desc = product.shortDescriptions[locale] || product.shortDescriptions.en || '';

  return {
    title: `${name} | Paiqi Wire Mesh`,
    description: desc,
    openGraph: {
      title: name,
      description: desc,
      images: product.images[0] ? [{url: product.images[0]}] : undefined,
    },
  };
}

export default async function ProductDetailPage({params}: ProductDetailPageProps) {
  const {locale, slug} = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  const isZh = locale === 'zh';
  const name = product.names[locale] || product.names.en || '';
  const shortDesc = product.shortDescriptions[locale] || product.shortDescriptions.en || '';
  const fullDesc = product.fullDescriptions[locale] || product.fullDescriptions.en || '';
  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="text-sm text-slate-500 flex items-center gap-2">
            <Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">{isZh ? '首页' : 'Home'}</Link>
            <span>/</span>
            <Link href={`/${locale}/products`} className="hover:text-blue-600 transition-colors">{isZh ? '产品' : 'Products'}</Link>
            <span>/</span>
            <span className="text-slate-900 truncate max-w-xs">{name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Image + Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3 p-4 overflow-x-auto">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      className={`w-24 h-20 rounded-xl overflow-hidden border-2 transition-colors flex-shrink-0 ${
                        i === 0 ? 'border-blue-500' : 'border-transparent hover:border-slate-300'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Short Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-3">{isZh ? '产品概述' : 'Overview'}</h2>
              <p className="text-slate-600 leading-relaxed">{shortDesc}</p>
            </div>

            {/* Full Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">{isZh ? '产品描述' : 'Product Description'}</h2>
              <div className="prose prose-slate max-w-none">
                <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {fullDesc}
                </div>
              </div>
            </div>

            {/* Applications */}
            {product.applications.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4">{isZh ? '应用领域' : 'Applications'}</h2>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app, i) => (
                    <span
                      key={i}
                      className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Inquiry Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24 space-y-6">
              {/* Title */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                    {isZh ? '型号' : 'SKU'}: {product.sku}
                  </span>
                </div>
                <h1 className="text-xl font-bold text-slate-900 leading-snug">{name}</h1>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed border-b pb-6">
                {shortDesc}
              </p>

              {/* Specs Table */}
              <div>
                <h2 className="text-base font-semibold text-slate-900 mb-3">{isZh ? '技术规格' : 'Specifications'}</h2>
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} className="border-b border-slate-50 last:border-0">
                        <td className="py-2.5 font-medium text-slate-500">
                          {specLabels[key]?.[locale] || specLabels[key]?.en || key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()).trim()}
                        </td>
                        <td className="py-2.5 text-slate-900 text-end font-medium">{value}</td>
                      </tr>
                    ))}
                    <tr className="border-b border-slate-50">
                      <td className="py-2.5 font-medium text-slate-500">{isZh ? '起订量' : 'MOQ'}</td>
                      <td className="py-2.5 text-slate-900 text-end font-medium">
                        {product.moq ? `${product.moq} ${isZh ? '件' : 'pieces'}` : (isZh ? '可协商' : 'Negotiable')}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {product.priceRemark && (
                  <p className="text-xs text-slate-400 mt-2">{product.priceRemark}</p>
                )}
              </div>

              {/* Price */}
              {product.priceUsd && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-sm text-blue-600 mb-1">{isZh ? 'FOB价格' : 'FOB Price'}</div>
                  <div className="text-3xl font-bold text-blue-700">
                    ${product.priceUsd}
                    <span className="text-base font-normal text-blue-500">/{isZh ? '件' : 'unit'}</span>
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <InquiryButtonLarge
                productName={name}
                productSlug={product.slug}
                categorySlug={product.categorySlug}
                locale={locale}
              />

              <a
                href="https://wa.me/8613812345678"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all"
              >
                💬 {isZh ? 'WhatsApp咨询' : 'Chat on WhatsApp'}
              </a>

              {/* Quick Contact */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>📞</span>
                  <a href="tel:+8613812345678" className="hover:text-blue-600 transition-colors">
                    +86 138-1234-5678
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>✉️</span>
                  <a href="mailto:sales@paiqiwiremesh.com" className="hover:text-blue-600 transition-colors">
                    sales@paiqiwiremesh.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">{isZh ? '相关产品' : 'Related Products'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} locale={locale} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
