'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { localeHref } from '@/lib/routing';
import { PRODUCT_PARTIAL } from '@/lib/partial-content';

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

export function ProductMatrix({
  locale,
  products,
  moreProducts = [],
}: {
  locale: string;
  products: Product[];
  /** 同品类里没进「推荐」的其余型号，以一行紧凑链接兜底 */
  moreProducts?: { slug: string; name: string }[];
}) {
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
             : locale === 'ms' ? 'Produk Disyorkan'
             : locale === 'ar' ? 'منتجات مقترحة'
             : locale === 'zh' ? '推荐产品'
             : 'Recommended Products'}
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            {locale === 'vi'
              ? 'Từ đường cao tốc đến nhà máy — chúng tôi có giải pháp tường chắn âm phù hợp cho từng dự án'
              : locale === 'th'
              ? 'ตั้งแต่ทางหลวงถึงโรงงาน — เรามีโซลูชันกำแพงกันเสียงที่เหมาะกับทุกรูปแบบโครงการ'
              : locale === 'ms'
              ? 'Dari lebuh raya hingga kilang — ada penyelesaian kawalan bunyi untuk setiap projek'
              : locale === 'ar'
              ? 'من الطرق السريعة إلى المصانع — حل للتحكم في الضوضاء لكل مشروع'
              : locale === 'zh'
              ? '从高速公路到工厂 — 每个项目都有合适的声学解决方案'
              : 'From highways to factories — a noise control solution for every project'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {selected.map((p) => {
            // products 表无 ms/ar 列：按 slug 套覆盖层，没有则回落英文
            const ov = PRODUCT_PARTIAL[locale]?.[p.slug];
            const name = ov?.name || pickLocale(p.names || {}, locale);
            const desc = ov?.desc || pickLocale(p.shortDescriptions || {}, locale);
            const img = p.images?.[0];
            if (!name) return null;

            return (
              <Link key={p.slug} href={localeHref(locale, `/products/${p.slug}`)}
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
                    {locale === 'vi' ? 'Xem chi tiết' : locale === 'th' ? 'ดูรายละเอียด' : locale === 'ms' ? 'Lihat Butiran' : locale === 'ar' ? 'عرض التفاصيل' : locale === 'zh' ? '查看详情' : 'View Details'}
                    <span aria-hidden="true" className="rtl:rotate-180"> →</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 品类里还有 3 款没进推荐位：工厂隔音墙 4m、设备隔声罩 2.5m、全封闭式。
            这三款的买家（工业园区、厂界降噪）恰好是投放的主要客群，
            却因为 slug 是硬编码的 6 个而在这页完全不可达。
            不塞进上面的 3×3 网格 —— 那会把表单往下推一整行；
            用一行文字链接补齐，滚动成本几乎为零。 */}
        {moreProducts.length > 0 && (
          <p className="mt-8 text-sm text-slate-500 text-center leading-relaxed">
            <span className="text-slate-400">
              {locale === 'vi' ? 'Cùng dòng sản phẩm: '
               : locale === 'th' ? 'ในกลุ่มเดียวกัน: '
               : locale === 'ms' ? 'Dalam barisan ini: '
               : locale === 'ar' ? 'ضمن نفس الفئة: '
               : locale === 'zh' ? '同品类还有：'
               : 'Also in this range: '}
            </span>
            {moreProducts.map((mp, i) => (
              <span key={mp.slug}>
                {i > 0 && <span className="text-slate-300"> · </span>}
                <Link
                  href={localeHref(locale, `/products/${mp.slug}`)}
                  className="text-blue-600 hover:underline underline-offset-2 font-medium"
                >
                  {mp.name}
                </Link>
              </span>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}
