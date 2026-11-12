'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
import Link from 'next/link';
import type {Product, Category} from '@/types/product';
import {ProductCard} from './ProductCard';
import {tLabel} from '@/lib/i18n';

/**
 * 产品列表 + 站内搜索。
 *
 * 为什么整块搬到客户端：
 * 这个页面此前用服务端 searchParams 过滤，Next 因此把整条路由判为动态，
 * 响应头是 `Cache-Control: private, no-cache, no-store`——《en/products》
 * 每次访问都要现场渲染，TTFB 3.3s（冷）/ 476ms（热），且 CDN 一个字都缓存不了。
 * 而列表内容对所有人都一样，只有筛选条件不同。把筛选交给浏览器后：
 * 页面重新变成可缓存（s-maxage=300），搜索从「整页刷新」变成即时过滤，
 * 完整产品列表也始终在 HTML 里，爬虫不再因为 ?search= 而只看到子集。
 *
 * URL 仍然同步（history.replaceState，不触发路由重渲染），
 * 复制链接分享筛选结果的行为和以前一致。
 */
export function ProductExplorer({
  products,
  categories,
  locale,
}: {
  products: Product[];
  categories: Category[];
  locale: string;
}) {
  const [query, setQuery] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  // URL 只在挂载后读一次：SSR 阶段没有 window，直接在 useState 初始化里读
  // 会导致服务端与客户端首帧不一致（hydration mismatch），所以走 effect。
  const [urlRead, setUrlRead] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = (params.get('search') || '').slice(0, 80);
    const c = params.get('category') || '';
    if (s) setQuery(s);
    if (c) setCategorySlug(c);
    setUrlRead(true);
  }, []);

  // 把当前筛选写回地址栏。用 replaceState 而不是 router.replace：
  // 后者会让 Next 重新请求 RSC payload，输入时每敲一个字都发一次请求。
  useEffect(() => {
    if (!urlRead) return;
    const params = new URLSearchParams();
    const q = query.trim();
    if (q) params.set('search', q);
    if (categorySlug) params.set('category', categorySlug);
    const qs = params.toString();
    const next = `${window.location.pathname}${qs ? `?${qs}` : ''}`;
    if (next !== window.location.pathname + window.location.search) {
      window.history.replaceState(null, '', next);
    }
  }, [query, categorySlug, urlRead]);

  // 搜索匹配产品名、型号 slug、短描述与品类名——
  // 采购常直接搜型号（"2x1x1"）或材料（"galvanized"），只匹配标题会大量漏检。
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle && !categorySlug) return products;
    return products.filter((p) => {
      if (categorySlug && p.categorySlug !== categorySlug) return false;
      if (!needle) return true;
      const cat = categories.find((c) => c.slug === p.categorySlug);
      const haystack = [
        p.names?.[locale], p.names?.en, p.slug,
        p.shortDescriptions?.[locale], p.shortDescriptions?.en,
        cat?.names?.[locale], cat?.names?.en,
      ];
      return haystack.some((v) => String(v || '').toLowerCase().includes(needle));
    });
  }, [products, categories, locale, query, categorySlug]);

  const activeCategory = categories.find((c) => c.slug === categorySlug);
  const hasFilter = !!query.trim() || !!categorySlug;

  const clearAll = () => {
    setQuery('');
    setCategorySlug('');
    inputRef.current?.focus();
  };

  return (
    <>
      {/* 站内搜索：读地址栏的 ?search= 做前端过滤，form 的 action 保留，
          JS 未加载时仍能整页提交。
          注意：首页 WebSite 结构化数据里**不再**声明 SearchAction——那段标记
          会让 Google 把 `?search={search_term_string}` 这个占位符当成真实网址去抓，
          GSC 索引报告里已经出现过 4 条这样的字面量 URL。 */}
      <form
        action={`/${locale}/products`}
        method="get"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          // 收起移动端软键盘，否则过滤结果被键盘挡住
          inputRef.current?.blur();
        }}
        className="mt-5 flex gap-2 max-w-md"
      >
        <div className="relative flex-1">
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value.slice(0, 80))}
            maxLength={80}
            placeholder={tLabel('搜索产品名称或型号，如 gabion 2x1x1', 'Search by product name or model, e.g. gabion 2x1x1', locale)}
            aria-label={tLabel('搜索产品', 'Search products', locale)}
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-base sm:text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex-shrink-0"
        >
          {tLabel('搜索', 'Search', locale)}
        </button>
      </form>

      {/* 结果计数 + 当前筛选。移动端分类条只做导航（跳支柱页），
          真正的筛选状态在这里体现，否则用户看不出自己正被过滤。 */}
      <div className="mb-5 mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-600">
        <p aria-live="polite">
          {locale === 'zh'
            ? `显示 ${filtered.length} 个产品`
            : locale === 'vi'
            ? `Hiển thị ${filtered.length} sản phẩm`
            : locale === 'th'
            ? `แสดง ${filtered.length} สินค้า`
            : `Showing ${filtered.length} products`}
        </p>
        {activeCategory && (
          <span className="inline-flex items-center gap-1">
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-blue-600">
              {activeCategory.names?.[locale] || activeCategory.names?.en}
            </span>
          </span>
        )}
        {query.trim() && (
          <span className="inline-flex items-center gap-1">
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-blue-600">“{query.trim()}”</span>
          </span>
        )}
        {hasFilter && (
          <button
            type="button"
            onClick={clearAll}
            className="text-blue-600 hover:underline underline-offset-2"
          >
            {tLabel('清除筛选', 'Clear filters', locale)}
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl">
          <div className="text-5xl mb-4" aria-hidden="true">📦</div>
          <p className="text-lg font-semibold text-slate-900 mb-2">
            {tLabel('未找到产品', 'No products found', locale)}
          </p>
          <p className="text-slate-500 text-sm mb-6">
            {query.trim()
              ? tLabel(
                  '换个更短的关键词试试，例如只输入 "gabion" 或 "2x1x1"。',
                  'Try a shorter keyword — just "gabion" or "2x1x1" usually works.',
                  locale
                )
              : tLabel('尝试选择其他分类。', 'Try selecting a different category.', locale)}
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            ← {tLabel('查看全部产品', 'View all products', locale)}
          </button>
        </div>
      )}

      {/* 空结果时给一条人工出口：搜不到型号的采购下一步通常是直接问人 */}
      {filtered.length === 0 && (
        <p className="text-center text-sm text-slate-500 mt-4">
          {tLabel('找不到需要的规格？', 'Cannot find the specification you need?', locale)}{' '}
          <Link href={`/${locale}/contact`} className="text-blue-600 hover:underline font-medium">
            {tLabel('直接告诉我们', 'Tell us what you need', locale)}
          </Link>
        </p>
      )}
    </>
  );
}
