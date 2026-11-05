'use client';

import { useEffect, useState } from 'react';
import { X, FileText } from 'lucide-react';
import { submitInquiryLead } from '@/lib/inquiry';

/**
 * 落地页的资料索取弹窗。
 *
 * 三条硬约束（改之前先读一遍，它们都是踩过坑的）：
 *
 * 1. 不做「滚动 60% 触发」。滚到 60% 的访客是在核对参数，不是在离开；
 *    广告点击每次都是新标签页，sessionStorage 不跨标签，等于每个付费
 *    访客都被强制打断一次。现在只在真正的退出意图（鼠标移出视口顶部）
 *    或移动端停留 45s 且有阅读行为时出现。
 * 2. 不发 Ads 主转化。这里只收一个邮箱，走 trackLead 的 document 深度，
 *    与正式询盘完全分开，否则出价模型会优化成「目录下载机」。
 * 3. 文案必须与真实交付物一致。之前写的是「42 页目录 + 参考报价，
 *    自动发到邮箱」，站上根本没有这份 PDF，属于 Google Ads 的
 *    Misrepresentation 范畴。现在改为「工程师 24 小时内人工发送」，
 *    并把唯一真实存在的证书 PDF 直接给到手上。
 */

const CERT_PDF = '/downloads/angu-iso-three-system-certificates.pdf';

const content: Record<
  string,
  {
    title: string;
    subtitle: string;
    email: string;
    country: string;
    btn: string;
    close: string;
    sendError: string;
    sentTitle: string;
    sentBody: string;
    certCta: string;
  }
> = {
  vi: {
    title: 'Bộ Tài Liệu Kỹ Thuật Cho Dự Án',
    subtitle:
      'Bảng thông số tấm, chứng nhận ISO và báo giá mẫu cho dự án tương tự — kỹ sư của chúng tôi gửi trong 24 giờ.',
    email: 'Email của bạn',
    country: 'Quốc gia (không bắt buộc)',
    btn: '📩 Yêu Cầu Bộ Tài Liệu',
    close: 'Không, cảm ơn',
    sendError: 'Không gửi được. Vui lòng email trực tiếp:',
    sentTitle: 'Đã nhận yêu cầu',
    sentBody: 'Kỹ sư của chúng tôi sẽ gửi tài liệu đến email của bạn trong vòng 24 giờ.',
    certCta: 'Tải chứng nhận ISO ngay (PDF)',
  },
  th: {
    title: 'ชุดเอกสารทางเทคนิคสำหรับโครงการ',
    subtitle:
      'ตารางสเปคแผง ใบรับรอง ISO และตัวอย่างใบเสนอราคาโครงการที่คล้ายกัน — วิศวกรของเราส่งให้ภายใน 24 ชั่วโมง',
    email: 'อีเมลของคุณ',
    country: 'ประเทศ (ไม่บังคับ)',
    btn: '📩 ขอชุดเอกสาร',
    close: 'ไม่เป็นไร ขอบคุณ',
    sendError: 'ส่งไม่สำเร็จ กรุณาอีเมลโดยตรง:',
    sentTitle: 'ได้รับคำขอแล้ว',
    sentBody: 'วิศวกรของเราจะส่งเอกสารไปยังอีเมลของคุณภายใน 24 ชั่วโมง',
    certCta: 'ดาวน์โหลดใบรับรอง ISO ทันที (PDF)',
  },
  ms: {
    title: 'Pek Teknikal Untuk Projek Anda',
    subtitle:
      'Helaian data panel, sijil ISO dan contoh sebut harga — dihantar oleh jurutera kami dalam 24 jam.',
    email: 'E-mel anda',
    country: 'Negara (pilihan)',
    btn: '📩 Minta Pek Teknikal',
    close: 'Tidak, terima kasih',
    sendError: 'Tidak dapat dihantar. Sila e-mel terus:',
    sentTitle: 'Permintaan diterima',
    sentBody: 'Jurutera kami akan menghantar dokumen ke e-mel anda dalam masa 24 jam.',
    certCta: 'Muat turun sijil ISO sekarang (PDF)',
  },
  ar: {
    title: 'حزمة المستندات الفنية لمشروعك',
    subtitle:
      'ورقة بيانات الألواح وشهادات ISO ونموذج عرض سعر — يرسلها مهندسنا خلال 24 ساعة.',
    email: 'بريدك الإلكتروني',
    country: 'الدولة (اختياري)',
    btn: '📩 اطلب الحزمة الفنية',
    close: 'لا، شكرًا',
    sendError: 'تعذر الإرسال الآن. راسلنا مباشرة:',
    sentTitle: 'تم استلام الطلب',
    sentBody: 'سيرسل مهندسنا المستندات إلى بريدك الإلكتروني خلال 24 ساعة.',
    certCta: 'حمّل شهادات ISO الآن (PDF)',
  },
  en: {
    title: 'Technical Pack for Your Project',
    subtitle:
      'Panel data sheet, ISO certificates and a sample quotation — emailed by our engineer within 24 hours.',
    email: 'Your email',
    country: 'Country (optional)',
    btn: '📩 Request Technical Pack',
    close: 'No thanks',
    sendError: 'Could not send just now. Please email us directly:',
    sentTitle: 'Request received',
    sentBody: 'Our engineer will email the documents within 24 hours.',
    certCta: 'Download ISO certificates now (PDF)',
  },
  zh: {
    title: '项目技术资料包',
    subtitle: '面板规格书、ISO 证书与同类项目报价样例 — 工程师 24 小时内发到您的邮箱。',
    email: '您的邮箱',
    country: '国家（可选）',
    btn: '📩 索取技术资料',
    close: '不用了，谢谢',
    sendError: '提交未成功，请直接发邮件至',
    sentTitle: '已收到请求',
    sentBody: '工程师会在 24 小时内把资料发到您的邮箱。',
    certCta: '立即下载 ISO 证书（PDF）',
  },
};

const COUNTRIES = [
  'Vietnam',
  'Thailand',
  'Malaysia',
  'Indonesia',
  'Philippines',
  'Cambodia',
  'Laos',
  'Myanmar',
  'Singapore',
  'India',
  'Bangladesh',
  'United Arab Emirates',
  'Saudi Arabia',
  'Other',
];

/** 关闭后 7 天内不再打扰（sessionStorage 不跨标签，等于每个新客都弹一次） */
const DISMISS_KEY = 'angu_techpack_popup_dismissed_at';
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;
/** 桌面端至少停留这么久，才把「鼠标移出」当成真的离开，而不是随手划走 */
const DESKTOP_DWELL_MS = 30000;
/** 移动端没有退出意图信号，只能靠停留时长 + 阅读行为，45s 起步 */
const MOBILE_TIMER_MS = 45000;

export function ExitIntentPopup({ locale }: { locale: string }) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(true); // 先假设不显示，挂载后再判断
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const c = content[locale] || content.en;

  // 冷却期内不再弹
  useEffect(() => {
    try {
      const ts = Number(localStorage.getItem(DISMISS_KEY) || 0);
      if (!ts || Date.now() - ts > COOLDOWN_MS) setDismissed(false);
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    if (dismissed) return;

    const start = Date.now();
    let triggered = false;
    let ctaClicked = false;
    let scrolled = false;

    const fire = () => {
      if (triggered) return;
      triggered = true;
      setShow(true);
    };

    /** 用户正在填表单 / 页面不可见时，任何触发都推迟 */
    const busy = () => {
      if (document.visibilityState !== 'visible') return true;
      const el = document.activeElement as HTMLElement | null;
      const tag = el?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
      return false;
    };

    // 桌面：只在鼠标真的移出视口顶部时触发
    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY > 0) return;
      if (Date.now() - start < DESKTOP_DWELL_MS) return;
      if (busy() || ctaClicked) return;
      fire();
    }

    // 只在移动端用定时器：没有退出意图可捕捉，退而求其次看「停留 + 阅读」
    let mobileTimer: ReturnType<typeof setTimeout> | undefined;
    if (window.matchMedia('(max-width: 767px)').matches) {
      mobileTimer = setTimeout(() => {
        if (busy() || ctaClicked || !scrolled) return;
        fire();
      }, MOBILE_TIMER_MS);
    }

    // 记录阅读行为（只作为移动端前置条件，本身不触发弹窗）
    function handleScroll() {
      if (scrolled) return;
      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable > 0.3) scrolled = true;
    }

    // 已经点过 CTA 的人不需要再被拦一次
    function handleClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest?.('a[href],button');
      if (!el) return;
      const href = el.getAttribute('href') || '';
      if (href.includes('#quote-form') || href.includes('/contact') || href.includes('wa.me')) {
        ctaClicked = true;
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick, true);
      if (mobileTimer) clearTimeout(mobileTimer);
    };
  }, [dismissed]);

  function close() {
    setShow(false);
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
  }

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="techpack-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-slate-100"
          aria-label={c.close}
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        {sent ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{c.sentTitle}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-5">{c.sentBody}</p>
            <a
              href={CERT_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-600 font-medium hover:text-blue-700 underline underline-offset-4"
            >
              {c.certCta}
            </a>
            <button
              onClick={close}
              className="mt-6 block w-full py-2.5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              {c.close}
            </button>
          </div>
        ) : (
          <>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-7 h-7 text-blue-600" />
              </div>
              <h3 id="techpack-title" className="text-xl font-bold text-slate-900 mb-2">
                {c.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">{c.subtitle}</p>
            </div>

            <form
              action="/api/inquiry"
              method="POST"
              className="space-y-3"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = new FormData(form);
                const email = String(data.get('email') || '').trim();
                try {
                  const result = await submitInquiryLead(
                    {
                      ...Object.fromEntries(data.entries()),
                      // 后台要按人名检索，之前硬编码 "Exit Popup Lead" 让
                      // 所有弹窗线索长得一模一样。用邮箱前缀当临时姓名，
                      // 销售回信时也知道怎么称呼。
                      name: email.split('@')[0] || 'Website Visitor',
                      message: 'Technical pack request (popup): panel data sheet + ISO certificates + sample quotation',
                    },
                    {
                      source: 'exit_popup',
                      productInterest: 'Noise Barrier Technical Pack',
                      locale,
                    }
                  );
                  // 失败时不能显示"已收到" —— 这正是这次要修的那类问题：
                  // 说了却做不到。宁可让访客看到失败并改用邮件。
                  if (result.success) {
                    setSent(true);
                    setFailed(false);
                  } else {
                    setFailed(true);
                  }
                } catch {
                  setFailed(true);
                }
              }}
            >
              <input
                type="text"
                name="website"
                autoComplete="off"
                tabIndex={-1}
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
              />
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder={c.email}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-base sm:text-sm focus:outline-none focus:border-blue-500"
              />
              <select
                name="country"
                defaultValue=""
                aria-label={c.country}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-base sm:text-sm text-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="">{c.country}</option>
                {COUNTRIES.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <input type="hidden" name="source" value="exit_popup" />
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="product_interest" value="Noise Barrier Technical Pack" />
              {failed && (
                <p className="text-xs text-red-600 text-center" role="alert">
                  {c.sendError}{' '}
                  <a href="mailto:annie@angumesh.com" className="underline underline-offset-2">
                    annie@angumesh.com
                  </a>
                </p>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-colors"
              >
                {c.btn}
              </button>
            </form>

            <button onClick={close} className="mt-3 w-full text-xs text-slate-400 hover:text-slate-600 transition-colors">
              {c.close}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
