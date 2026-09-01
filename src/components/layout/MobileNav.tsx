'use client';

import {useState} from 'react';
import Link from 'next/link';
import {useRouter, usePathname} from 'next/navigation';
import {X, Menu, MessageCircle, Globe} from 'lucide-react';
import {LANGUAGE_FLAGS} from '@/lib/flags';
import { tLabel } from '@/lib/i18n';

const LOCALES = ['en', 'zh'] as const;

interface MobileNavProps {
  locale: string;
  whatsapp?: string;
}

export function MobileNav({locale, whatsapp = '8618803189797'}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isZh = locale === 'zh';

  const navItems = [
    {key: 'home', href: `/${locale}`, label: tLabel('首页', 'Home', locale)},
    {key: 'products', href: `/${locale}/products`, label: tLabel('产品', 'Products', locale)},
    {key: 'solutions', href: `/${locale}/solutions`, label: tLabel('解决方案', 'Solutions', locale)},
    {key: 'aboutUs', href: `/${locale}/about`, label: tLabel('关于我们', 'About Us', locale)},
    {key: 'services', href: `/${locale}/service`, label: tLabel('服务', 'Services', locale)},
    {key: 'blog', href: `/${locale}/blog`, label: tLabel('博客', 'Blog', locale)},
    {key: 'contactUs', href: `/${locale}/contact`, label: tLabel('联系我们', 'Contact Us', locale)},
  ];

  function handleLangSelect(newLocale: string) {
    if (!pathname) return;
    const newPathname = pathname.replace(/^\/[a-z]{2}/, `/${newLocale}`);
    router.replace(newPathname);
    setIsLangOpen(false);
    setIsOpen(false);
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 text-slate-700 hover:text-blue-600 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100">
          <span className="font-bold text-lg text-slate-900">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Language Switcher (top of nav) */}
        <div className="px-4 py-3 border-b border-slate-100">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>{LANGUAGE_FLAGS[locale]?.flag} {LANGUAGE_FLAGS[locale]?.nativeName}</span>
          </button>
          {isLangOpen && (
            <div className="mt-2 space-y-1">
              {LOCALES.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLangSelect(loc)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg transition-colors ${
                    loc === locale ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{LANGUAGE_FLAGS[loc]?.flag}</span>
                  <span>{LANGUAGE_FLAGS[loc]?.nativeName}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* WhatsApp CTA */}
        <div className="px-4 pt-4">
          <a
            href={`https://wa.me/${whatsapp}?text=Hello, I'm interested in your products.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Us
          </a>
        </div>
      </div>
    </>
  );
}
