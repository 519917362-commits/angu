import { getNoiseBarrierFaqs } from '@/lib/noiseBarrierFaq';

/**
 * 声屏障 FAQ。
 *
 * 用原生 <details>/<summary> 而不是 useState 手风琴，原因：
 * 1) 6 条答案全部在 HTML 里 —— 之前只有第 1 条渲染，另 5 条要等 JS 点开才出现，
 *    抓取工具/AI 爬虫拿到的页面等于"5 个没有答案的问题"，而 FAQPage 结构化数据里
 *    却有完整答案，两者不一致属于有风险的结构化数据；
 * 2) 不依赖 JS，hydration 失败也能展开。
 *
 * 默认展开第一条：open 属性只在首次渲染生效，属于非受控行为。
 */
export function FaqSection({ locale }: { locale: string }) {
  const faqList = getNoiseBarrierFaqs(locale);

  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            {locale === 'vi' ? 'Câu Hỏi Thường Gặp'
             : locale === 'th' ? 'คำถามที่พบบ่อย'
             : locale === 'ms' ? 'Soalan Lazim'
             : locale === 'ar' ? 'الأسئلة الشائعة'
             : locale === 'zh' ? '常见问题'
             : 'Frequently Asked Questions'}
          </h2>
          <p className="mt-3 text-slate-500">
            {locale === 'vi'
              ? 'Những thắc mắc phổ biến nhất từ nhà thầu và nhà nhập khẩu'
              : locale === 'th'
              ? 'คำถามที่ผู้รับเหมาและผู้นำเข้าถามบ่อยที่สุด'
              : locale === 'ms'
              ? 'Soalan biasa daripada kontraktor dan pengimport'
              : locale === 'ar'
              ? 'أسئلة متكررة من المقاولين والمستوردين'
              : locale === 'zh'
              ? '承包商和进口商最常问的问题'
              : 'Common questions from contractors and importers'}
          </p>
        </div>

        <div className="space-y-3">
          {faqList.map((faq, i) => (
            <details
              key={faq.q}
              open={i === 0}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden"
            >
              <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <span className="font-semibold text-slate-800 text-sm">{faq.q}</span>
                <svg
                  className="w-5 h-5 text-slate-400 flex-shrink-0 transition-transform group-open:rotate-180"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-sm text-slate-600 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
