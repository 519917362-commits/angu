'use client';

import Link from 'next/link';
import {useCallback, useEffect, useRef, useState} from 'react';
import type {Category} from '@/types/product';
import {categoryHref} from '@/lib/pillars';
import {tLabel} from '@/lib/i18n';

/**
 * 移动端横向分类条。
 *
 * 原来是一个服务端渲染的裸 overflow-x-auto，有两个实际问题：
 * 1. 分类多于一屏时没有任何「右边还有」的提示，用户以为就这几个分类，
 *    十几个品类里只看得到前四个；
 * 2. 从支柱页、搜索结果或分享链接进来时当前分类可能在屏幕外，
 *    用户看不到自己站在哪个分类下。
 *
 * 这里加两件事：边缘渐隐（只在真的还能滚的那一侧出现），
 * 以及首帧把当前分类滚进视野。滚动手感保持原生，不加 snap。
 */
export function MobileCategoryBar({
  categories,
  currentSlug,
  locale,
}: {
  categories: Category[];
  currentSlug: string | undefined;
  locale: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);
  const [edges, setEdges] = useState({start: false, end: false});

  const syncEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    // 2px 容差：iOS/安卓滚到边界时 scrollLeft 常留小数，不设容差会闪
    const max = el.scrollWidth - el.clientWidth;
    setEdges({start: el.scrollLeft > 2, end: el.scrollLeft < max - 2});
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    syncEdges();
    el.addEventListener('scroll', syncEdges, {passive: true});
    window.addEventListener('resize', syncEdges);
    return () => {
      el.removeEventListener('scroll', syncEdges);
      window.removeEventListener('resize', syncEdges);
    };
  }, [syncEdges]);

  // 当前分类在屏幕外时滚进来。用 scrollIntoView 而不是自己算 scrollLeft：
  // 阿拉伯语页面是 RTL，scrollLeft 在 RTL 下是 0 或负数，手算方向会反。
  useEffect(() => {
    const el = scrollerRef.current;
    const active = activeRef.current;
    if (!el || !active) return;
    const s = el.getBoundingClientRect();
    const a = active.getBoundingClientRect();
    if (a.left < s.left || a.right > s.right) {
      active.scrollIntoView({inline: 'center', block: 'nearest'});
      requestAnimationFrame(syncEdges);
    }
  }, [currentSlug, syncEdges]);

  const chip = 'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap';
  const on = 'bg-blue-600 text-white';
  const off = 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50';

  return (
    <div className="lg:hidden relative mb-4 -mx-4 sm:-mx-6">
      <div
        ref={scrollerRef}
        className="flex gap-2 px-4 sm:px-6 pb-2 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <Link
          href={`/${locale}/products`}
          ref={!currentSlug ? activeRef : undefined}
          aria-current={!currentSlug ? 'page' : undefined}
          className={`${chip} ${!currentSlug ? on : off}`}
        >
          {tLabel('全部', 'All', locale)}
        </Link>
        {categories.map((cat) => {
          const active = currentSlug === cat.slug;
          return (
            <Link
              key={cat.id}
              href={categoryHref(locale, cat.slug)}
              ref={active ? activeRef : undefined}
              aria-current={active ? 'page' : undefined}
              className={`${chip} ${active ? on : off}`}
            >
              {cat.names[locale] || cat.names.en}
            </Link>
          );
        })}
      </div>

      {/* 渐隐只出现在还能滚的那一侧，滚到头自动消失 */}
      {edges.start && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 start-0 w-10 bg-gradient-to-r from-slate-50 to-transparent rtl:bg-gradient-to-l"
        />
      )}
      {edges.end && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 end-0 w-10 bg-gradient-to-l from-slate-50 to-transparent rtl:bg-gradient-to-r"
        />
      )}
    </div>
  );
}
