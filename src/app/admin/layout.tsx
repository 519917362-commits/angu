import type {Metadata} from 'next';
import '../globals.css';

/**
 * /admin 分支的根 layout。
 *
 * app/layout.tsx 已删除（为了让 /{locale}/* 在自己的根 layout 里输出正确的 <html lang>），
 * 因此每个顶层分支都要自带 <html>/<body>。后台是中文工具页，固定 lang="zh-CN"，
 * 并显式 noindex —— 之前它继承的是前台默认 metadata，理论上存在被索引的风险。
 */

export const metadata: Metadata = {
  title: {
    default: '安固丝网 · 管理后台',
    template: '%s | 安固丝网后台',
  },
  robots: {index: false, follow: false, nocache: true},
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function AdminRootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
