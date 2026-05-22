'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname() || '';
  const locale = pathname.split('/')[1] || 'en';
  const isZh = locale === 'zh';

  const t = {
    title: isZh ? '页面未找到' : 'Page Not Found',
    description: isZh
      ? '您访问的页面可能已被删除、名称已更改，或暂时不可用。'
      : 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
    backHome: isZh ? '← 返回首页' : '← Back to Home',
    browseProducts: isZh ? '浏览产品' : 'Browse Products',
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-8xl font-bold text-slate-200 mb-4">404</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">{t.title}</h1>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          {t.description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={`/${locale}`}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all">
              {t.backHome}
            </button>
          </Link>
          <Link href={`/${locale}/products`}>
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all">
              {t.browseProducts}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
