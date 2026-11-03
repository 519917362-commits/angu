import Link from 'next/link';
import { localeHref } from '@/lib/routing';

/**
 * 落地页 → 技术文章 的内链区块。
 *
 * 上线前的实测：这个投放落地页只有 11 条内部链接，全部指向页内锚点、
 * 6 个产品页、隐私条款和条款页 —— **一条都不指向博客**。为这个品类写的
 * 4 篇长文（选型对比 / 每平米造价 / 插入损失设计 / 安装指南）只能从博客首页
 * 进，等于把最值钱的内容孤立在流量入口之外。
 *
 * 反过来也一样：4 篇文章里没有一条回链落地页。
 *
 * 这里只做「出」的方向，回链在 blog/[slug] 模板里按分类统一加。
 * 刻意不放封面图：文章封面是 1200×675，四张就要多下 200KB+，
 * 而这一屏本来就是「往下滚才看到」的低优先内容，文字卡片更快也够用。
 */

const COPY = {
  en: {
    label: 'Technical reading',
    title: 'Four things engineers ask before signing',
    subtitle:
      'Selection, cost, acoustic design and installation — written by our engineering team, not by a copywriter.',
    read: 'Read',
    minutes: 'min read',
  },
  zh: {
    label: '技术资料',
    title: '工程师签约前必问的四件事',
    subtitle: '选型、造价、声学设计与安装，由工程团队撰写，不是文案写的。',
    read: '阅读',
    minutes: '分钟',
  },
  vi: {
    label: 'Tài liệu kỹ thuật',
    title: 'Bốn điều kỹ sư hỏi trước khi ký hợp đồng',
    subtitle:
      'Chọn loại, chi phí, thiết kế âm học và lắp đặt — do đội kỹ thuật của chúng tôi viết.',
    read: 'Đọc',
    minutes: 'phút đọc',
  },
  th: {
    label: 'เอกสารทางเทคนิค',
    title: 'สี่คำถามที่วิศวกรถามก่อนเซ็นสัญญา',
    subtitle: 'การเลือกชนิด ราคา การออกแบบเสียง และการติดตั้ง — เขียนโดยทีมวิศวกรของเรา',
    read: 'อ่าน',
    minutes: 'นาที',
  },
  ms: {
    label: 'Bacaan teknikal',
    title: 'Empat perkara jurutera tanya sebelum menandatangani',
    subtitle: 'Pemilihan, kos, reka bentuk akustik dan pemasangan — ditulis oleh pasukan kejuruteraan kami.',
    read: 'Baca',
    minutes: 'min baca',
  },
  ar: {
    label: 'قراءة فنية',
    title: 'أربعة أسئلة يطرحها المهندس قبل التوقيع',
    subtitle: 'الاختيار والتكلفة والتصميم الصوتي والتركيب — بقلم فريقنا الهندسي.',
    read: 'اقرأ',
    minutes: 'دقيقة',
  },
} as const;

export type ReadingItem = {
  slug: string;
  title: string;
  abstract: string;
  minutes: number;
};

export function RelatedReading({ locale, posts }: { locale: string; posts: ReadingItem[] }) {
  if (!posts.length) return null;
  const c = COPY[(locale as keyof typeof COPY) ?? 'en'] || COPY.en;

  return (
    <section id="reading" className="py-16 sm:py-20 bg-slate-50 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-600">{c.label}</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900">{c.title}</h2>
          <p className="mt-3 text-slate-600">{c.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {posts.map((p, i) => (
            <Link
              key={p.slug}
              href={localeHref(locale, `/blog/${p.slug}`)}
              className="group flex gap-4 bg-white rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all p-5"
            >
              <span className="shrink-0 text-sm font-bold text-slate-300 tabular-nums pt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {p.title}
                </span>
                {p.abstract && (
                  <span className="mt-1.5 block text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {p.abstract}
                  </span>
                )}
                <span className="mt-2 block text-xs text-slate-400">
                  {p.minutes} {c.minutes} · {c.read} →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
