'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { captureAttribution } from '@/lib/attribution';

/**
 * 归因参数采集器。渲染 null，只负责把 URL 里的 gclid / wbraid / utm_* 落盘。
 *
 * 必须挂在根 layout：客户可能在任意页面落地（广告直投产品页），
 * 再跳到另一个页面填表，采集点不能只放首页。
 *
 * 依赖 pathname 而不是空数组：App Router 的客户端导航不会重新挂载 layout，
 * 若只跑一次，从落地页跳转后新增的 query 参数就抓不到了。
 */
export function AttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, [pathname]);

  return null;
}
