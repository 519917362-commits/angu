'use client';

import React from 'react';
import {useSearchParams} from 'next/navigation';
import Link from 'next/link';
import {products, categories} from '@/lib/data';
import {ProductCard} from '@/components/products/ProductCard';

export default function ProductsPage({params}: {
  params: Promise<{locale: string}>;
}) {
  // In static export, we can't use searchParams on server
  // Use client-side searchParams hook instead
  const searchParams = useSearchParams();
  const categorySlug = searchParams?.get('category') || undefined;
  
  // We need to get locale from params
  const [locale, setLocale] = React.useState('en');
  
  React.useEffect(() => {
    params.then(({locale: l}) => setLocale(l));
  }, [params]);
  
  const isZh = locale === 'zh';

  const filteredProducts = categorySlug
    ? products.filter((p) => p.categorySlug === categorySlug)
    : products;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-3">{isZh ? '产品中心' : 'Products'}</h1>
          <nav className="text-sm text-blue-200">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">{isZh ? '首页' : 'Home'}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{isZh ? '产品' : 'Products'}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* Sidebar - Categories */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>📂</span> {isZh ? '分类' : 'Categories'}
              </h2>
              <ul className="space-y-1">
                <li>
                  <Link
                    href={`/${locale}/products`}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      !categorySlug
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span>{isZh ? '全部产品' : 'All Products'}</span>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full">{products.length}</span>
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/${locale}/products?category=${cat.slug}`}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        categorySlug === cat.slug
                          ? 'bg-blue-50 text-blue-600 font-semibold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span>{cat.names[locale] || cat.names.en}</span>
                      {cat.productCount && (
                        <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full">{cat.productCount}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-slate-600 text-sm">
                {isZh ? `显示 ${filteredProducts.length} 个产品` : `Showing ${filteredProducts.length} products`}
                {categorySlug && (
                  <span>
                    {isZh ? '，分类：' : ' in '}
                    <span className="font-semibold text-blue-600">
                      {categories.find((c) => c.slug === categorySlug)?.names[locale] || categories.find((c) => c.slug === categorySlug)?.names.en || categorySlug}
                    </span>
                  </span>
                )}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} locale={locale} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl">
                <div className="text-5xl mb-4">📦</div>
                <p className="text-lg font-semibold text-slate-900 mb-2">{isZh ? '未找到产品' : 'No products found'}</p>
                <p className="text-slate-500 text-sm mb-6">{isZh ? '尝试选择其他分类。' : 'Try selecting a different category.'}</p>
                <Link href={`/${locale}/products`}>
                  <button className="text-blue-600 font-medium hover:text-blue-700">← {isZh ? '查看全部产品' : 'View all products'}</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
