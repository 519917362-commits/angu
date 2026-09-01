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
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 z-40 w-11 h-11 bg-white hover:bg-blue-600 text-slate-600 hover:text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center border border-slate-200"
      aria-label="Back to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
