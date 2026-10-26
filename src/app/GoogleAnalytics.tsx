'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { adsAccountPrefix, gaMeasurementId, initContactTracking, isAdsConfigured, isGaConfigured, primaryTagId } from '@/lib/analytics';

// .env.local 里配置任一即可工作：
//   NEXT_PUBLIC_GA_ID                    GA4 衡量 ID，格式 G-XXXXXXXXXX
//   NEXT_PUBLIC_ADS_ID                   Ads 账户级代码，格式 AW-123456789
//   NEXT_PUBLIC_ADS_FORM_CONVERSION      表单线索转化，格式 AW-123456789/AbCdEfGhIjKlMnOp
//   NEXT_PUBLIC_ADS_WHATSAPP_CONVERSION  WhatsApp/电话点击转化，同上（建议在 Ads 后台单建一个转化）
// GA_ID 与 ADS_ID 都内置了兜底值，即使一个环境变量都不配，两条 config 也照常下发。

export function GoogleAnalytics() {
  const gaOn = isGaConfigured();
  const gaId = gaMeasurementId();
  const adsOn = isAdsConfigured();
  const tagId = primaryTagId();

  // 联系方式点击追踪：全站委托监听，只挂一次
  useEffect(() => {
    if (!gaOn && !adsOn) return;
    return initContactTracking();
  }, [gaOn, adsOn]);

  // 两个 ID 都没配置（或仍是占位符）时不加载脚本，避免无效请求
  if (!tagId) return null;

  const gaConfig = gaId ? `gtag('config','${gaId}');` : '';
  const adsPrefix = adsAccountPrefix();
  const adsConfig = adsPrefix ? `gtag('config','${adsPrefix}');` : '';

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${tagId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${gaConfig}
          ${adsConfig}
        `}
      </Script>
    </>
  );
}
