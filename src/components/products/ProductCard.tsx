import {Product} from '@/types/product';
import Link from 'next/link';
import { tLabel } from '@/lib/i18n';

interface ProductCardProps {
  product: Product;
  locale: string;
}

export function ProductCard({product, locale}: ProductCardProps) {
  const name = product.names[locale] || product.names.en || '';
  const shortDesc = product.shortDescriptions[locale] || product.shortDescriptions.en || '';

  return (
    <Link href={`/${locale}/products/${product.slug}`}>
      <article className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 h-full flex flex-col isolate">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 flex-shrink-0">
          <img
            src={product.images[0]}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            width={400}
            height={300}
          />
          {product.moq && (
            <span className="absolute top-3 start-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
              {locale === 'zh' ? `起订量: ${product.moq}` : locale === 'vi' ? `SL tối thiểu: ${product.moq}` : locale === 'th' ? `ขั้นต่ำ: ${product.moq}` : `MOQ: ${product.moq}`}
            </span>
          )}
          {product.isFeatured && (
            <span className="absolute top-3 end-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md">
              {tLabel('★ 精选', '★ Featured', locale)}
            </span>
          )}
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2 mb-3 flex-1">{shortDesc}</p>
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
            {product.priceUsd ? (
              <span className="text-blue-600 font-bold text-sm">${product.priceUsd}</span>
            ) : (
              <span className="text-slate-400 text-xs">{tLabel('价格面议', 'Price on request', locale)}</span>
            )}
            <span className="text-sm text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-medium">
              {tLabel('详情 →', 'Details →', locale)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
