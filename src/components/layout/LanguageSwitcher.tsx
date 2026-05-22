'use client';

import {usePathname} from 'next/navigation';
import {LANGUAGE_FLAGS} from '@/lib/flags';

interface LanguageSwitcherProps {
  locale: string;
}

export function LanguageSwitcher({locale}: LanguageSwitcherProps) {
  const pathname = usePathname();

  function getNewPath(newLocale: string) {
    if (!pathname) return `/${newLocale}`;
    return pathname.replace(/^\/(en|zh|ar|ja|ko|id|vi|es|fr|de|pt|th)/, `/${newLocale}`);
  }

  const languages = Object.entries(LANGUAGE_FLAGS).map(([code, info]) => ({
    code,
    ...info,
  }));

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value;
    const newPath = getNewPath(newLocale);
    window.location.href = newPath;
  }

  return (
    <div className="flex items-center">
      <select
        value={locale}
        onChange={handleChange}
        className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer hover:bg-slate-50 transition-colors"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.nativeName}
          </option>
        ))}
      </select>
    </div>
  );
}
