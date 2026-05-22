'use client';

import {isRTL} from '@/lib/utils';

interface RTLProviderProps {
  children: React.ReactNode;
  locale: string;
}

export function RTLProvider({children, locale}: RTLProviderProps) {
  const rtl = isRTL(locale);
  return (
    <div dir={rtl ? 'rtl' : 'ltr'} lang={locale}>
      {children}
    </div>
  );
}
