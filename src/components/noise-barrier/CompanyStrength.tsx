import Image from 'next/image';
import type { NoiseBarrierFactoryImage, NoiseBarrierCertification, LocaleText } from '@/lib/api';
import {YEARS_LABEL} from '@/lib/company';

interface SectionContent {
  title: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  certTitle: string;
}

// 数据口径（与工商登记及官网一致）：
//   2014-08-15 成立 / 10,000 m² 厂区（自有中文站披露“近万平”）/ 年产 5,000 吨 / 出口 30+ 国家
// 旧版本写的 “40 亩 · 200+ 员工 · 50,000㎡” 无任何出处，且与年报及官网互相矛盾，已删除。
const content: Record<string, SectionContent> = {
  vi: {
    title: 'Nhà Máy Trực Tiếp · Sản Xuất Từ 2014',
    subtitle: 'Nhà xưởng 10.000 m² · 5.000 tấn/năm · 30+ quốc gia xuất khẩu',
    stats: [
      { value: YEARS_LABEL, label: 'Năm hoạt động' },
      { value: '10.000㎡', label: 'Diện tích nhà xưởng' },
      { value: '5.000 t', label: 'Sản lượng/năm' },
      { value: '30+', label: 'Quốc gia' },
    ],
    certTitle: 'Chứng Nhận & Kiểm Định',
  },
  th: {
    title: 'โรงงานผลิตโดยตรง · ผลิตตั้งแต่ปี 2014',
    subtitle: 'โรงงาน 10,000 ตร.ม. · 5,000 ตัน/ปี · ส่งออก 30+ ประเทศ',
    stats: [
      { value: YEARS_LABEL, label: 'ปีดำเนินธุรกิจ' },
      { value: '10,000㎡', label: 'พื้นที่โรงงาน' },
      { value: '5,000 t', label: 'กำลังผลิต/ปี' },
      { value: '30+', label: 'ประเทศ' },
    ],
    certTitle: 'ใบรับรอง & ตรวจสอบ',
  },
  en: {
    title: 'Direct Factory · Manufacturing Since 2014',
    subtitle: '10,000 m² facility · 5,000 t annual output · 30+ export countries',
    stats: [
      { value: YEARS_LABEL, label: 'Years in Business' },
      { value: '10,000㎡', label: 'Factory Area' },
      { value: '5,000 t', label: 'Annual Output' },
      { value: '30+', label: 'Countries' },
    ],
    certTitle: 'Certifications & Testing',
  },
  zh: {
    title: '源头工厂 · 2014 年建厂',
    subtitle: '10,000㎡ 厂区 · 年产 5,000 吨 · 出口 30+ 国家',
    stats: [
      { value: YEARS_LABEL, label: '年制造经验' },
      { value: '10,000㎡', label: '厂区面积' },
      { value: '5,000 吨', label: '年产能' },
      { value: '30+', label: '出口国家' },
    ],
    certTitle: '资质与检测',
  },
};

function pickLocale(field: { en?: string; zh?: string; vi?: string; th?: string } | undefined, locale: string): string {
  if (!field) return '';
  return field[locale as keyof typeof field] || field.en || '';
}

export function CompanyStrength({
  locale,
  factoryImages,
  certifications,
}: {
  locale: string;
  factoryImages: NoiseBarrierFactoryImage[];
  certifications: NoiseBarrierCertification[];
}) {
  const c = content[locale] || content.en;

  // Fallback images if DB is empty
  const images = factoryImages.length > 0
    ? factoryImages
    : [
        { id: 0, image_url: '/images/about/factory1.jpg', alt_en: 'Production Line', alt_zh: '', alt_vi: '', alt_th: '', sort_order: 0, status: 'published' },
        { id: 1, image_url: '/images/about/factory2.jpg', alt_en: 'Punching Workshop', alt_zh: '', alt_vi: '', alt_th: '', sort_order: 1, status: 'published' },
        { id: 2, image_url: '/images/about/factory-workshop.jpg', alt_en: 'Welding Workshop', alt_zh: '', alt_vi: '', alt_th: '', sort_order: 2, status: 'published' },
        { id: 3, image_url: '/images/about/factory4.jpg', alt_en: 'Warehouse', alt_zh: '', alt_vi: '', alt_th: '', sort_order: 3, status: 'published' },
      ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">{c.title}</h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">{c.subtitle}</p>
        </div>

        {/* Factory images grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {images.slice(0, 4).map((img, i) => (
            <div key={img.id || i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 group">
              {img.image_url ? (
                <Image
                  src={img.image_url}
                  alt={pickLocale({ en: img.alt_en, zh: img.alt_zh, vi: img.alt_vi, th: img.alt_th }, locale) || `Factory ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-300">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-white text-xs font-medium">
                  {pickLocale({ en: img.alt_en, zh: img.alt_zh, vi: img.alt_vi, th: img.alt_th }, locale) || `Factory ${i + 1}`}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-8 bg-slate-50 rounded-2xl">
          {c.stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600">{s.value}</div>
              <div className="text-sm text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mt-10">
            <h3 className="text-center text-lg font-semibold text-slate-700 mb-6">{c.certTitle}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg shadow-sm">
                  <span className="text-xl">{cert.icon || '📋'}</span>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">
                      {pickLocale({ en: cert.name_en, zh: cert.name_zh, vi: cert.name_vi, th: cert.name_th }, locale)}
                    </div>
                    <div className="text-xs text-slate-400">
                      {pickLocale({ en: cert.desc_en, zh: cert.desc_zh, vi: cert.desc_vi, th: cert.desc_th }, locale)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
