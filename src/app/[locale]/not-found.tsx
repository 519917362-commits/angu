// /{locale}/* 分支内的 404 边界。
//
// 必须是【服务端组件】：这个文件经常在「没有 layout 包裹」的错误文档壳里被渲染
// （例如 app/[locale]/layout.tsx 校验到非法语种直接 notFound()，或动态页在请求期抛
// notFound()），此时没有路由上下文，usePathname() 拿不到值，页面会 SSR 成空白。
// 旧版本用了 'use client' + usePathname，实测 /foo、/en/blog/xxx 的正文都是空的。
//
// 代价：not-found 组件不接收 params，无法知道当前语种，所以这里四种语言并列给出，
// 用户点哪个进哪个——对 404 场景来说这反而是更好的兜底。
import Link from 'next/link';

const CONTENT = {
  en: {
    title: 'Page Not Found',
    desc: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
    home: '← Back to Home',
    products: 'Browse Products',
    lang: 'en',
  },
  zh: {
    title: '页面未找到',
    desc: '您访问的页面可能已被删除、名称已更改，或暂时不可用。',
    home: '← 返回首页',
    products: '浏览产品',
    lang: 'zh',
  },
  vi: {
    title: 'Không tìm thấy trang',
    desc: 'Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng.',
    home: '← Về trang chủ',
    products: 'Xem sản phẩm',
    lang: 'vi',
  },
  th: {
    title: 'ไม่พบหน้าเว็บ',
    desc: 'หน้าเว็บที่คุณกำลังค้นหาอาจถูกลบ เปลี่ยนชื่อ หรือไม่พร้อมใช้งานชั่วคราว',
    home: '← กลับหน้าแรก',
    products: 'ดูสินค้า',
    lang: 'th',
  },
} as const;

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-16">
      <div className="text-center px-4 max-w-2xl">
        <div className="text-8xl font-bold text-slate-200 mb-4" aria-hidden="true">
          404
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          {CONTENT.en.title} · {CONTENT.zh.title}
        </h1>
        <p className="text-slate-500 mb-10">{CONTENT.en.desc}</p>

        <div className="space-y-3 text-left">
          {Object.values(CONTENT).map((c) => (
            <div
              key={c.lang}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white border border-slate-200 px-4 py-3"
            >
              <span className="text-sm text-slate-600">{c.desc}</span>
              <span className="flex gap-3 text-sm font-medium whitespace-nowrap">
                <Link href={`/${c.lang}`} className="text-blue-600 hover:underline">
                  {c.home}
                </Link>
                <Link href={`/${c.lang}/products`} className="text-slate-500 hover:text-blue-600 hover:underline">
                  {c.products}
                </Link>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
