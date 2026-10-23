import { permanentRedirect } from 'next/navigation';

// 语言重定向是永久性的：308 传递权重（307 不会，且根路径可能被当作独立 URL 评估）
export default function RootPage() {
  permanentRedirect('/en');
}
