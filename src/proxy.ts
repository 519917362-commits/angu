// Proxy (formerly middleware)
// File renamed in Next.js 16: middleware.ts → proxy.ts
//
// 两件事：
//
// 1) ms / ar 两个试水语种已于 2026-11-11 下线。它们当时只翻译了首页与
//    声屏障落地页，其余路径本来就要 308 回 /en，等于半翻译的重复内容。
//    现在这两个前缀一律 308 到对应的 /en 路径：
//    - /ms                → /en
//    - /ms/noise-barrier  → /en/noise-barrier
//    用 308 而不是 404，是为了让外链、书签、GSC 里的历史索引都能落到有效页，
//    把这两个语种累积的信号并回英文页。
//
// 2) 2026-11-13 品类结构调整：protection-net 拆分并改名为 slope-protection
//    （归入新建的 natural-disaster-protection 之下）。旧地址永久 301 到新地址，
//    保住已收录页面的权重，不让它直接变成 404。

import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {retiredLocales, locales} from '@/lib/routing';

const RETIRED_PREFIX = new RegExp(`^/(${retiredLocales.join('|')})(?=/|$)`);

/**
 * 品类改名映射：旧 slug → 新 slug。
 * 只收「同内容、仅路径变了」的情况。真正的拆分类不放这里——
 * 一个旧页面对应两个新页面时，重定向只能选一个，另一个要靠内容层承接。
 */
const RENAMED_CATEGORY: Record<string, string> = {
  'protection-net': 'slope-protection',
};

export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;

  // ── 品类改名 301 ──
  // 命中 /en/protection-net、/zh/protection-net/、/vi/protection-net/xxx
  const seg = pathname.split('/').filter(Boolean);
  if (
    seg.length >= 2 &&
    (locales as readonly string[]).includes(seg[0]) &&
    RENAMED_CATEGORY[seg[1]]
  ) {
    const url = request.nextUrl.clone();
    seg[1] = RENAMED_CATEGORY[seg[1]];
    url.pathname = `/${seg.join('/')}`;
    return NextResponse.redirect(url, 301);
  }

  // ── 下线语种 308 ──
  // 不是 ms / ar 的请求原样放行：matcher 里那条 protection-net 规则是宽匹配，
  // 若不在这里收口，/foo/protection-net 会被错误地重定向到 /en/foo/protection-net。
  if (!RETIRED_PREFIX.test(pathname)) return NextResponse.next();

  // 同时去掉尾斜杠：/ms/ 直接到 /en，不要先到 /en/ 再被 trailingSlash 规则跳一次
  const rest = pathname.replace(RETIRED_PREFIX, '').replace(/\/+$/, '');
  const url = request.nextUrl.clone();
  url.pathname = `/en${rest}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  // 第二组用宽匹配收住所有语种下的 protection-net，语种合法性在函数里再判一次，
  // 避免把 /foo/protection-net 这类不存在的语种也重定向出去。
  matcher: ['/ms/:path*', '/ar/:path*', '/:locale/protection-net/:path*', '/:locale/protection-net'],
};
