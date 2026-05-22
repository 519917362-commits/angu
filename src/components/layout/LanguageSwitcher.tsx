'use client';

import {useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';

interface LanguageSwitcherProps {
  locale: string;
}

const languages = [
  {code: 'en', label: 'English', flag: '🇺🇸'},
  {code: 'zh', label: '中文', flag: '🇨🇳'},
  {code: 'ar', label: 'العربية', flag: '🇸🇦'},
  {code: 'ja', label: '日本語', flag: '🇯🇵'},
  {code: 'ko', label: '한국어', flag: '🇰🇷'},
  {code: 'id', label: 'Bahasa', flag: '🇮🇩'},
  {code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳'},
  {code: 'es', label: 'Español', flag: '🇪🇸'},
  {code: 'fr', label: 'Français', flag: '🇫🇷'},
  {code: 'de', label: 'Deutsch', flag: '🇩🇪'},
  {code: 'pt', label: 'Português', flag: '🇵🇹'},
  {code: 'th', label: 'ไทย', flag: '🇹🇭'},
];

export function LanguageSwitcher({locale}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const current = languages.find((l) => l.code === locale) || languages[0];

  function switchLanguage(newLocale: string) {
    if (!pathname) return;
    const newPath = pathname.replace(/^\/(en|zh|ar|ja|ko|id|vi|es|fr|de|pt|th)/, `/${newLocale}`);
    router.replace(newPath);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
      >
        <span className="text-base">{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full end-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 max-h-80 overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`flex items-center gap-2 w-full px-4 py-2 text-sm transition-colors ${
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
        </>
      )}
    </div>
  );
}
