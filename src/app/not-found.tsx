// 兜底 404（不依赖任何 layout 也能渲染）。
//
// 触发场景：/{任意非法语种}，例如 /foo。因为 app/[locale] 是最顶层动态段，
// 任何单段路径都会命中它；[locale]/layout.tsx 校验不通过时调用 notFound()，
// 而「layout 自己抛 notFound」意味着没有 layout 包住结果，只能回退到本文件，
// 由框架的错误文档壳直接渲染——那一层没有 layout，也就没人引入全局样式，
// 所以这里显式 import globals.css，否则 404 页会是无样式的裸 HTML。
//
// 同样的原因，本文件必须是【服务端组件】且不调用 usePathname：
// 错误文档壳里没有路由上下文，取不到 pathname，SSR 会渲染成空白。
import './globals.css';
import Link from 'next/link';

const LANGS = [
  {code: 'en', label: 'English'},
  {code: 'zh', label: '简体中文'},
  {code: 'vi', label: 'Tiếng Việt'},
  {code: 'th', label: 'ไทย'},
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-bold text-slate-200 mb-4" aria-hidden="true">
          404
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Page Not Found</h1>
        <p className="text-slate-500 mb-8">
          This address does not exist. Choose your language to continue:
        </p>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {LANGS.map((l) => (
            <Link
              key={l.code}
              href={`/${l.code}`}
              className="block px-4 py-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-700 font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <p className="text-sm text-slate-400">
          Or{' '}
          <a href="mailto:annie@angumesh.com" className="text-blue-600 hover:underline">
            email our sales team
          </a>
          .
        </p>
      </div>
    </div>
  );
}
