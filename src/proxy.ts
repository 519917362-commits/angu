// Proxy (formerly middleware)
// File renamed in Next.js 16: middleware.ts → proxy.ts
//
// 作用：partialLocales（ms / ar）目前只翻译了 translatedPaths 里的页面。
// 其余路径若直接渲染，会用英文内容填一个 /ms/ 或 /ar/ 的 URL，属于典型的
// 半翻译重复内容。这里统一 308 回退到对应的 /en 路径，让 Google 只收录
// 真正翻译过的那两页。
//
// matcher 只覆盖 /ms 与 /ar，其余语种完全不走这一层，不影响现有站点性能。

import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {isTranslatedPath} from '@/lib/routing';

export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;

  if (!isTranslatedPath(pathname)) {
    // /ms/products → /en/products；/ms → /en
    const rest = pathname.replace(/^\/(ms|ar)(?=\/|$)/, '');
    const url = request.nextUrl.clone();
    url.pathname = `/en${rest}`;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/ms/:path*', '/ar/:path*'],
};
