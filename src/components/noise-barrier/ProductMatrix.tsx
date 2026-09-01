'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';

// 6 recommended noise-barrier products (top 6 by sort order)
const displaySlugs = [
  'highway-noise-barrier-3m',
  'bridge-noise-barrier',
  'rail-transit-noise-barrier',
  'metal-upright-noise-barrier',
  'metal-bent-curved-noise-barrier',
  'transparent-acrylic-glass-noise-barrier',
];

function pickLocale(obj: Record<string, string | undefined>, locale: string): string {
  return obj[locale] || obj['en'] || '';
}

export function ProductMatrix({ locale, products }: { locale: string; products: Product[] }) {
  const selected = displaySlugs
    .map(slug => products.find(p => p.slug === slug))
    .filter((p): p is Product => !!p);

  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            {locale === 'vi' ? 'Sản Phẩm Đề Xuất'
             : locale === 'th' ? 'ผลิตภัณฑ์แนะนำ'
             : locale === 'zh' ? '推荐产品'
             : 'Recommended Products'}
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            {locale === 'vi'
              ? 'Từ đường cao tốc đến nhà máy — chúng tôi có giải pháp cách âm phù hợp cho từng dự án'
              : locale === 'th'
              ? 'ตั้งแต่ทางหลวงถึงโรงงาน — เรามีโซลูชันกันเสียงสำหรับทุกโครงการ'
              : locale === 'zh'
              ? '从高速公路到工厂 — 每个项目都有合适的声学解决方案'
              : 'From highways to factories — a noise control solution for every project'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {selected.map((p) => {
            const name = pickLocale(p.names || {}, locale);
            const desc = pickLocale(p.shortDescriptions || {}, locale);
            const img = p.images?.[0];
            if (!name) return null;

            return (
              <Link key={p.slug} href={`/${locale}/products/${p.slug}`}
                className="group bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
                {img && (
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <Image
                      src={img}
                      alt={`${name} — Angu`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{name}</h3>
                  {desc && (
                    <p className="text-sm text-slate-600 leading-relaxed flex-1 line-clamp-2">{desc}</p>
                  )}
                  <span className="mt-4 pt-4 border-t border-slate-50 block text-xs text-blue-600 font-medium">
                    {locale === 'vi' ? 'Xem chi tiết →' : locale === 'th' ? 'ดูรายละเอียด →' : locale === 'zh' ? '查看详情 →' : 'View Details →'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
