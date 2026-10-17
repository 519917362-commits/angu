'use client';

import Script from 'next/script';

// Set NEXT_PUBLIC_GA_ID in .env.local to your Google Analytics 4 Measurement ID (e.g. G-XXXXXXXXXX)
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// 占位符守卫：未配置或仍是模板值（含连续 X）时不加载 gtag，避免无效请求
function isValidGaId(id: string | undefined): id is string {
  if (!id) return false;
  if (/X{4,}/i.test(id)) return false;
  return /^G-[A-Z0-9]{6,}$/i.test(id);
}

export function GoogleAnalytics() {
  if (!isValidGaId(GA_ID)) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
