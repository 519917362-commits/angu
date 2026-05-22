'use client';

import React, { createContext, useContext, ReactNode } from 'react';

interface I18nContextType {
  locale: string;
}

const I18nContext = createContext<I18nContextType>({ locale: 'en' });

export function I18nProvider({ children, locale }: { children: ReactNode; locale: string }) {
  return (
    <I18nContext.Provider value={{ locale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(I18nContext);
  return context.locale;
}
