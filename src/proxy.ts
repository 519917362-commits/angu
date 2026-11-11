// Proxy (formerly middleware)
// File renamed in Next.js 16: middleware.ts → proxy.ts
//
// 作用：ms / ar 两个试水语种已于 2026-11-11 下线。它们当时只翻译了首页与
// 声屏障落地页，其余路径本来就要 308 回 /en，等于半翻译的重复内容。
//
// 现在这两个前缀一律 308 到对应的 /en 路径：
// - /ms                → /en
// - /ms/noise-barrier  → /en/noise-barrier
// 用 308 而不是 404，是为了让外链、书签、GSC 里的历史索引都能落到有效页，
// 把这两个语种累积的信号并回英文页。
//
// matcher 只覆盖 /ms 与 /ar，其余语种完全不走这一层，不影响现有站点性能。

import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {retiredLocales} from '@/lib/routing';

const RETIRED_PREFIX = new RegExp(`^/(${retiredLocales.join('|')})(?=/|$)`);

export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;
  // 同时去掉尾斜杠：/ms/ 直接到 /en，不要先到 /en/ 再被 trailingSlash 规则跳一次
  const rest = pathname.replace(RETIRED_PREFIX, '').replace(/\/+$/, '');
  const url = request.nextUrl.clone();
  url.pathname = `/en${rest}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ['/ms/:path*', '/ar/:path*'],
};
