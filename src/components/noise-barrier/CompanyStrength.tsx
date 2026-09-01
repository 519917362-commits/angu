import Image from 'next/image';
import type { NoiseBarrierFactoryImage, NoiseBarrierCertification, LocaleText } from '@/lib/api';

interface SectionContent {
  title: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  certTitle: string;
}

const content: Record<string, SectionContent> = {
  vi: {
    title: 'Nhà Máy Trực Tiếp · 15 Năm Chuyên Sản Xuất',
    subtitle: '40 mẫu đất · 200+ nhân viên · 50,000 m²/năm năng lực sản xuất',
    stats: [
      { value: '15+', label: 'Năm kinh nghiệm' },
      { value: '40', label: 'Mẫu đất nhà máy' },
      { value: '200+', label: 'Nhân viên' },
      { value: '50,000㎡', label: 'Sản xuất / năm' },
    ],
    certTitle: 'Chứng Nhận & Kiểm Định',
  },
  th: {
    title: 'โรงงานผลิตโดยตรง · 15 ปี เชี่ยวชาญการผลิต',
    subtitle: '40 ไร่ · 200+ พนักงาน · 50,000 ตร.ม. ต่อปี กำลังการผลิต',
    stats: [
      { value: '15+', label: 'ปีประสบการณ์' },
      { value: '40', label: 'ไร่โรงงาน' },
      { value: '200+', label: 'พนักงาน' },
      { value: '50,000㎡', label: 'ผลิต / ปี' },
    ],
    certTitle: 'ใบรับรอง & ตรวจสอบ',
  },
  en: {
    title: 'Direct Factory · 15 Years of Manufacturing',
    subtitle: '40 mu · 200+ employees · 50,000 m²/year production capacity',
    stats: [
      { value: '15+', label: 'Years' },
      { value: '40', label: 'mu factory' },
      { value: '200+', label: 'Employees' },
      { value: '50,000㎡', label: 'Per year' },
    ],
    certTitle: 'Certifications & Testing',
  },
  zh: {
    title: '源头工厂 · 15 年专注生产',
    subtitle: '40 亩厂房 · 200+ 员工 · 50,000㎡/年 产能',
    stats: [
      { value: '15+', label: '年经验' },
      { value: '40', label: '亩工厂' },
      { value: '200+', label: '名员工' },
      { value: '50,000㎡', label: '年产能' },
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
