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
//
// 3) 2026-11-13 石笼网产品线收敛为 3 款（石笼箱 / 雷诺护垫 / Hesco 防爆墙）。
//    PVC 涂塑箱改为石笼箱的一种防腐选项，防爆墙板并入 Hesco 单元。
//    两个已下线的产品页 301 到承接页，同样是因为它们进过 sitemap 和外链。

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

/**
 * 已下线的产品页：旧 slug → 承接页 slug。
 *
 * 这两个页面上线期间进过 sitemap，也拿过外链和 GSC 索引，直接 404 会丢掉信号；
 * 承接页必须真的覆盖旧页的内容，否则用户落地后找不到想问的东西：
 * - PVC 涂塑箱 → 石笼箱：石笼箱页的 specification 里已写 PVC 覆塑选项，
 *   seo keywords 也补了 pvc coated / marine gabion。
 * - 防爆墙板（2×1×1 m）→ Hesco 单元（1×1×1 m）：同一套焊接石笼防爆结构，
 *   Hesco 页的 FAQ 讲了 2×1×1 m 变体与填充料。
 */
const RETIRED_PRODUCT: Record<string, string> = {
  'pvc-coated-gabion-box-2x1x1m': 'galvanized-gabion-box-2x1x1m',
  'blast-wall-panel-2x1x1m': 'hesco-bastion-blast-wall-1x1x1m',
  // 2026-11-13 护栏网素材收敛：防爆护栏只留 2.5 m 重型款，临时围栏只留北美与澳洲两款。
  // 下线的 explosion-proof-guardrail 是同一个 358 防爆结构、矮一档（2.0 m / 4.0 mm）；
  // isolation-fence-50mm 与澳洲款同为 2.1×2.4 m、AS 4687，属重复 SKU。
  'explosion-proof-guardrail': 'heavy-duty-blast-barrier-2.5m',
  'isolation-fence-50mm': 'temporary-fence-au-2100x2400',
  // 2026-11-13 演唱会护栏收敛为一款：钢制 1.1×2.0m（300 kg/m）留下，
  // 铝制 1.0m 款（150 kg/m，室内展览用）下线，属同用途轻量档重复 SKU。
  'stage-barrier-1.2m-aluminum': 'concert-crowd-barrier',
};

export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;

  // ── 产品下线 301 ──
  // 命中 /en/products/pvc-coated-gabion-box-2x1x1m 等四语路径
  const seg = pathname.split('/').filter(Boolean);
  if (
    seg.length === 3 &&
    (locales as readonly string[]).includes(seg[0]) &&
    seg[1] === 'products' &&
    RETIRED_PRODUCT[seg[2]]
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/${seg[0]}/products/${RETIRED_PRODUCT[seg[2]]}`;
    return NextResponse.redirect(url, 301);
  }

  // ── 品类改名 301 ──
  // 命中 /en/protection-net、/zh/protection-net/、/vi/protection-net/xxx
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
  // 产品页那条只匹配三层路径（/en/products/<slug>），列表页 /en/products 不进。
  matcher: [
    '/ms/:path*',
    '/ar/:path*',
    '/:locale/protection-net/:path*',
    '/:locale/protection-net',
    '/:locale/products/:slug',
  ],
};
