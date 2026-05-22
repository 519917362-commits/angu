'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

interface LanguageSwitcherProps {
  locale: string;
}

const languages = [
  {code: 'en', label: 'EN', flag: '🇺🇸'},
  {code: 'zh', label: '中文', flag: '🇨🇳'},
];

export function LanguageSwitcher({locale}: LanguageSwitcherProps) {
  const pathname = usePathname();

  function getNewPath(newLocale: string) {
    if (!pathname) return `/${newLocale}`;
    return pathname.replace(/^\/(en|zh|ar|ja|ko|id|vi|es|fr|de|pt|th)/, `/${newLocale}`);
  }

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={getNewPath(lang.code)}
          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
            lang.code === locale
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
          }`}
        >
          <span>{lang.flag}</span>
          <span className="ml-1 hidden sm:inline">{lang.label}</span>
        </Link>
      ))}
    </div>
  );
}
