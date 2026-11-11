'use client';

import {useState, useEffect, useRef} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {isPartialLocale, translatedPaths} from '@/lib/routing';

interface LanguageSwitcherProps {
  locale: string;
}

const languages = [
  {code: 'en', label: 'English', flag: '🇺🇸'},
  {code: 'zh', label: '中文', flag: '🇨🇳'},
  {code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳'},
  {code: 'th', label: 'ไทย', flag: '🇹🇭'},
  {code: 'ms', label: 'Bahasa Malaysia', flag: '🇲🇾'},
  {code: 'ar', label: 'العربية', flag: '🇸🇦'},
];

// 语种与路径白名单统一来自 lib/routing.ts，避免这里的常量与 proxy 的 308 规则漂移

export function LanguageSwitcher({locale}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const current = languages.find((l) => l.code === locale) || languages[0];

  /**
   * 点外部关闭。原来这里放的是一个 `fixed inset-0` 的透明层，
   * 但它挂在 <header> 里，而 header 滚动后会加 backdrop-blur ——
   * backdrop-filter 会成为 fixed 后代的包含块，那层透明层只剩 header 那么高，
   * 点页面其他地方关不掉下拉。改成 document 级监听，不依赖布局。
   */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown, {passive: true});
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, [open]);

  function switchLanguage(newLocale: string) {
    if (!pathname) return;
    const stripped = pathname.replace(/^\/(en|zh|vi|th|ms|ar)(?=\/|$)/, '').replace(/\/+$/, '');
    const target = isPartialLocale(newLocale) && !(translatedPaths as readonly string[]).includes(stripped) ? '' : stripped;
    router.replace(`/${newLocale}${target}`);
    setOpen(false);
  }

  return (
    <div className="relative" ref={wrapRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 sm:px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
      >
        <span className="text-base">{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full end-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 max-h-80 overflow-y-auto">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm transition-colors ${
                lang.code === locale
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
