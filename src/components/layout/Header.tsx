'use client';

import {useState, useEffect} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {LanguageSwitcher} from './LanguageSwitcher';
import {MobileNav} from './MobileNav';
import {MessageCircle} from 'lucide-react';
import {categories} from '@/lib/data';

interface HeaderProps {
  locale: string;
}

export function Header({locale}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2'
          : 'bg-white py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">PQ</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-slate-900 leading-tight">Angu Wire Mesh</div>
              <div className="text-xs text-slate-500 leading-tight">Gabion & Protection Net</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Home */}
            <Link
              href={`/${locale}`}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === `/${locale}` || pathname === `/${locale}/`
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              {locale === 'zh' ? '首页' : 'Home'}
            </Link>

            {/* Products with dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <Link
                href={`/${locale}/products`}
                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname?.includes('/products')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {locale === 'zh' ? '产品' : 'Products'}
                <svg className={`w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {isProductsOpen && (
                <div className="absolute top-full start-0 mt-1 w-80 bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-hidden max-h-[70vh] overflow-y-auto">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/${locale}/products?category=${cat.slug}`}
                      className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors border-b border-slate-50 last:border-0"
                    >
                      {cat.names[locale] || cat.names.en}
                    </Link>
                  ))}
                  <Link
                    href={`/${locale}/products`}
                    className="block px-4 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 transition-colors text-center"
                  >
                    {locale === 'zh' ? '查看全部产品 →' : 'View All Products →'}
                  </Link>
                </div>
              )}
            </div>

            {/* Solutions */}
            <Link
              href={`/${locale}/solutions`}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname?.includes('/solutions')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              {locale === 'zh' ? '解决方案' : 'Solutions'}
            </Link>

            {/* About Us */}
            <Link
              href={`/${locale}/about`}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname?.includes('/about')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              {locale === 'zh' ? '关于我们' : 'About Us'}
            </Link>

            {/* Services */}
            <Link
              href={`/${locale}/service`}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname?.includes('/service')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              {locale === 'zh' ? '服务' : 'Services'}
            </Link>

            {/* Blog */}
            <Link
              href={`/${locale}/blog`}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname?.includes('/blog')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              {locale === 'zh' ? '博客' : 'Blog'}
            </Link>

            {/* Contact Us */}
            <Link
              href={`/${locale}/contact`}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname?.includes('/contact')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              {locale === 'zh' ? '联系我们' : 'Contact Us'}
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} />

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/8613812345678?text=Hello, I'm interested in your products.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Nav */}
            <MobileNav locale={locale} />
          </div>
        </div>
      </div>
    </header>
  );
}
