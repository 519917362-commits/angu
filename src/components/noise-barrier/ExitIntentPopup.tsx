'use client';

import { useEffect, useState } from 'react';
import { X, FileText } from 'lucide-react';

const content: Record<string, { title: string; subtitle: string; btn: string; close: string }> = {
  vi: {
    title: 'Đợi! Tải Catalog Đầy Đủ Ngay',
    subtitle: '42 trang thông số kỹ thuật, case study, và bảng giá tham khảo — gửi miễn phí đến email của bạn',
    btn: '📥 Tải Catalog PDF',
    close: 'Không, cảm ơn',
  },
  th: {
    title: 'รอก่อน! ดาวน์โหลดแคตตาล็อกฟรี',
    subtitle: '42 หน้าสเปค กรณีศึกษา และราคาอ้างอิง — ส่งฟรีไปยังอีเมลของคุณ',
    btn: '📥 ดาวน์โหลดแคตตาล็อก PDF',
    close: 'ไม่เป็นไร ขอบคุณ',
  },
  en: {
    title: 'Wait! Get Our Full Catalog',
    subtitle: '42 pages of specs, case studies, and reference pricing — sent free to your email',
    btn: '📥 Download Catalog PDF',
    close: 'No thanks',
  },
  zh: {
    title: '等等！免费获取完整目录',
    subtitle: '42 页规格参数、案例研究和参考报价 — 免费发送到您的邮箱',
    btn: '📥 下载目录 PDF',
    close: '不用了，谢谢',
  },
};

export function ExitIntentPopup({ locale }: { locale: string }) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const c = content[locale] || content.en;

  useEffect(() => {
    if (dismissed) return;

    let triggered = false;

    // Exit intent detection (desktop)
    function handleMouseLeave(e: MouseEvent) {
      if (triggered) return;
      if (e.clientY <= 0) {
        triggered = true;
        setShow(true);
      }
    }

    // Mobile: trigger after 15s if no form interaction
    let mobileTimer: ReturnType<typeof setTimeout>;
    if (window.innerWidth < 768) {
      mobileTimer = setTimeout(() => {
        if (!triggered) {
          triggered = true;
          setShow(true);
        }
      }, 15000);
    }

    // Scroll depth trigger (fallback): 60% page scroll
    function handleScroll() {
      if (triggered) return;
      const scrollPct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPct > 60) {
        triggered = true;
        setShow(true);
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(mobileTimer);
    };
  }, [dismissed]);

  function close() {
    setShow(false);
    setDismissed(true);
    // Persist dismissal in sessionStorage
    try { sessionStorage.setItem('exit_popup_dismissed', '1'); } catch {}
  }

  // Check sessionStorage on mount
  useEffect(() => {
    try {
      if (sessionStorage.getItem('exit_popup_dismissed')) {
        setDismissed(true);
      }
    } catch {}
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={close}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in zoom-in-50"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={close} className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-slate-100" aria-label="Close">
          <X className="w-5 h-5 text-slate-400" />
        </button>

        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <FileText className="w-7 h-7 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{c.title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">{c.subtitle}</p>

          <form
            action="/api/inquiry"
            method="POST"
            className="space-y-3"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new FormData(form);
              const body = Object.fromEntries(data.entries());
              body.source = 'exit_intent_popup';
              body.locale = locale;
              body.product_interest = 'Noise Barrier Catalog';
              try {
                await fetch('/api/inquiry', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(body),
                });
              } catch {}
              close();
            }}
          >
            <input type="text" name="website" autoComplete="off" tabIndex={-1}
              style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
            <input type="email" name="email" required
              placeholder={locale === 'vi' ? 'Email của bạn' : locale === 'th' ? 'อีเมลของคุณ' : 'Your email'}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
            <input type="hidden" name="name" value="Exit Popup Lead" />
            <input type="hidden" name="message" value="Catalog download request from exit intent popup" />
            <input type="hidden" name="source" value="exit_intent_popup" />
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="product_interest" value="Noise Barrier Catalog" />
            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-colors">
              {c.btn}
            </button>
          </form>

          <button onClick={close} className="mt-3 text-xs text-slate-400 hover:text-slate-600 transition-colors">
            {c.close}
          </button>
        </div>
      </div>
    </div>
  );
}
