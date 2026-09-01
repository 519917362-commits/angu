import Image from 'next/image';
import type { NoiseBarrierProject } from '@/lib/api';

interface GalleryContent {
  title: string;
  subtitle: string;
  emptyText: string;
}

const content: Record<string, GalleryContent> = {
  vi: {
    title: 'Dự Án Thực Tế',
    subtitle: 'Hình ảnh thi công thực tế từ các dự án đường cao tốc, nhà máy và cầu tại Việt Nam & quốc tế',
    emptyText: 'Hình ảnh dự án đang được cập nhật. Vui lòng liên hệ để nhận portfolio đầy đủ.',
  },
  th: {
    title: 'ผลงานจริง',
    subtitle: 'ภาพติดตั้งจริงจากโครงการทางด่วน โรงงาน และสะพานในประเทศไทยและต่างประเทศ',
    emptyText: 'กำลังอัปเดตรูปภาพโครงการ กรุณาติดต่อเพื่อรับ portfolio เต็มรูปแบบ',
  },
  en: {
    title: 'Real Project Gallery',
    subtitle: 'On-site installation photos from highway, factory, and bridge projects across Vietnam and internationally',
    emptyText: 'Project photos are being updated. Contact us for the full project portfolio.',
  },
  zh: {
    title: '实际案例',
    subtitle: '来自高速公路、工厂、桥梁项目的实拍安装图片',
    emptyText: '项目图片更新中，联系我们获取完整案例集。',
  },
};

function pickLocale(field: { en?: string; zh?: string; vi?: string; th?: string } | undefined, locale: string): string {
  if (!field) return '';
  return field[locale as keyof typeof field] || field.en || '';
}

export function ProjectGallery({
  locale,
  projects,
}: {
  locale: string;
  projects: NoiseBarrierProject[];
}) {
  const c = content[locale] || content.en;

  return (
    <section id="projects" className="py-16 sm:py-20 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">{c.title}</h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">{c.subtitle}</p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-sm">{c.emptyText}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="group bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  {p.image_url ? (
                    <Image
                      src={p.image_url}
                      alt={pickLocale({ en: p.title_en, zh: p.title_zh, vi: p.title_vi, th: p.title_th }, locale)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-300">
                      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {pickLocale({ en: p.title_en, zh: p.title_zh, vi: p.title_vi, th: p.title_th }, locale)}
                  </h3>
                  <p className="text-sm text-slate-500 mb-2">
                    <svg className="w-3.5 h-3.5 inline mr-1 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {pickLocale({ en: p.location_en, zh: p.location_zh, vi: p.location_vi, th: p.location_th }, locale)}
                  </p>
                  <p className="text-xs text-blue-600 font-medium">
                    {pickLocale({ en: p.spec_en, zh: p.spec_zh, vi: p.spec_vi, th: p.spec_th }, locale)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
