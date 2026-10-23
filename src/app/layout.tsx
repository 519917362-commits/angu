import type {Metadata} from 'next';
import './globals.css';
import { GoogleAnalytics } from './GoogleAnalytics';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.angumesh.com'),
  title: {
    default: 'Angu Wire Mesh — Factory-Direct Gabion Boxes & Rockfall Protection Nets | ISO 9001',
    template: '%s',
  },
  description:
    'Leading Chinese manufacturer of gabion boxes, PVC gabion, Reno mattress, active/passive rockfall protection nets. Factory direct, OEM available. ISO certified, 30+ countries exported.',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  // 站点所有权验证：码值由环境变量注入，换验证方式时不必改代码。
  // GSC 的 HTML 标签验证只覆盖「网址前缀」属性；「域名」属性需 DNS TXT，
  // 覆盖 www / 非 www / http / https 全部变体，建议最终切到 DNS 验证。
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION
      || 'EHjXUQbEQyBPYcUv9s7FJ7zQB7n6Y7Z42fztR4k4MRY',
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION } }
      : {}),
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
