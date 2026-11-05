'use client';

import {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import {ChevronUp} from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const isLanding = pathname?.includes('/noise-barrier');

  useEffect(() => {
    if (isLanding) return;
    function handleScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLanding]);

  function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  if (isLanding || !visible) return null;

  return (
    // 移动端贴住底部联系条上沿（条高 61px + 8px 间距），避免浮在正文中间压字；
    // sm 以上没有联系条，回到原来右下角的位置。
    <button
      onClick={scrollToTop}
      className="fixed bottom-[72px] end-4 sm:bottom-24 sm:end-6 z-40 w-11 h-11 bg-white/95 backdrop-blur hover:bg-blue-600 text-slate-600 hover:text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center border border-slate-200"
      aria-label="Back to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
