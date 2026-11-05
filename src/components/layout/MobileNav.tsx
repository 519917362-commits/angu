'use client';

import {useState, useEffect} from 'react';
import {createPortal} from 'react-dom';
import Link from 'next/link';
import {useRouter, usePathname} from 'next/navigation';
import {X, Menu, MessageCircle, Globe} from 'lucide-react';
import {LANGUAGE_FLAGS} from '@/lib/flags';
import { tLabel } from '@/lib/i18n';

const LOCALES = ['en', 'zh', 'vi', 'th', 'ms', 'ar'] as const;

// 与 LanguageSwitcher 保持一致：ms / ar 只翻了首页与声屏障落地页，
// 其它路径切过去会 308 回 /en，所以直接落到该语种首页更顺。
const PARTIAL = ['ms', 'ar'];
const TRANSLATED = ['', '/noise-barrier'];

interface MobileNavProps {
  locale: string;
  whatsapp?: string;
}

export function MobileNav({locale, whatsapp = '8618803189797'}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // createPortal 只能在客户端用，SSR 阶段 document 还不存在
  useEffect(() => setMounted(true), []);

  // 抽屉打开时锁住背景滚动，否则手指一划页面在后面滑，看起来更像「没盖住」
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

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
    const stripped = pathname.replace(/^\/(en|zh|vi|th|ms|ar)(?=\/|$)/, '').replace(/\/+$/, '');
    const target = PARTIAL.includes(newLocale) && !TRANSLATED.includes(stripped) ? '' : stripped;
    router.replace(`/${newLocale}${target}`);
    setIsLangOpen(false);
    setIsOpen(false);
  }

  /**
   * 遮罩与抽屉必须挂在 <body> 上，不能留在 <header> 里。
   *
   * header 滚动后会加 `backdrop-blur-md`（backdrop-filter），而带 filter /
   * backdrop-filter / transform 的元素会成为 `position: fixed` 后代的**包含块**：
   * 抽屉的 `h-full` 会变成 header 的高度（64px），全屏遮罩也会被裁成一条。
   * 表现就是「点开菜单只有顶部一条白，后面整页露着」，看起来像菜单背景透明。
   * 用 portal 挂到 body 就绕开了这个包含块。
   *
   * z-[60] 同时压过 header(40)、底部联系条(40)、桌面悬浮按钮(40)。
   */
  const overlay = (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!isOpen}
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-[60] shadow-2xl transform transition-transform duration-300 lg:hidden overflow-y-auto overscroll-contain ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100">
          <span className="font-bold text-lg text-slate-900">
            {locale === 'ms' ? 'Menu' : locale === 'ar' ? 'القائمة' : 'Menu'}
          </span>
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

        {/* WhatsApp CTA —— 抽屉比屏幕高时也要能滚到，底部留出安全区 */}
        <div className="px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <a
            href={`https://wa.me/${whatsapp}?text=Hello, I'm interested in your products.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-green-700 hover:bg-green-800 text-white rounded-xl font-semibold transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            {locale === 'ms' ? 'WhatsApp Kami' : locale === 'ar' ? 'راسلنا على واتساب' : 'WhatsApp Us'}
          </a>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden -me-1 p-2.5 text-slate-700 hover:text-blue-600 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* 常驻挂载（关闭时平移出屏），这样开合都有过渡动画 */}
      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}
