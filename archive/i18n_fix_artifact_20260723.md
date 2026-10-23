# i18n 四语改造 — isZh 二元分支扩展为四语逻辑

## 任务目标
将 Next.js 多语言网站（en/zh/vi/th 四语）中 13 个文件里的 `isZh` / `locale === 'zh'` 二元分支扩展为四语逻辑。

## 处理的文件
1. `src/app/[locale]/not-found.tsx` — 删除 `isZh`，description 扩展为四语三元
2. `src/app/[locale]/download/page.tsx` — downloads 数组扩展为四语（zh/vi/th/en 各 8 项）
3. `src/app/[locale]/service/faq/page.tsx` — faqs 数组扩展为四语（各 12 条），quick links 标签四语
4. `src/app/[locale]/service/page.tsx` — `t()` 函数签名从 `(en, zh)` 改为 `(en, zh, vi, th)`，services/processSteps/faqs/OEM 列表全部扩展为四语，schema t() 调用全部增加 vi/th 参数
5. `src/app/[locale]/blog/page.tsx` — blogSchema description 四语，post title/abstract 选择四语，faqItems 增加 vi/th 字段，topic pills 增加 vi/th
6. `src/app/[locale]/blog/[slug]/page.tsx` — generateMetadata 和主组件中 post 字段选择四语（title/abstract/content/seoTitle/seoDesc/keywords），阅读时间标签四语
7. `src/app/[locale]/products/layout.tsx` — JSON-LD name/description 四语，faqItems 扩展为四语（各 6 条），cross-links 增加 vi/th 字段
8. `src/app/[locale]/products/page.tsx` — 删除未使用的 isZh，产品计数和空状态提示四语
9. `src/app/[locale]/products/[slug]/page.tsx` — 所有 UI 标签（产品概述/描述/应用/规格/MOQ/价格等）四语，specs/applications 选择逻辑改为 `locale !== 'en'` 优先使用 zh 版本
10. `src/app/[locale]/contact/layout.tsx` — contactSchema description 四语，faqItems 增加 vi/th 字段（3 条），cross-links 增加 vi/th
11. `src/app/[locale]/contact/page.tsx` — 仅删除 isZh（所有 UI 文本已通过 tLabel 四语）
12. `src/app/[locale]/about/page.tsx` — SEO intro 段落从二元扩展为四语
13. `src/app/[locale]/page.tsx` (homepage) — metadata title/description/keywords 四语，openGraph/twitter 四语，WebSiteLd/BreadcrumbLd 四语，cfg() fallback 改用 `locale === 'zh'`，stats bar 标签四语，按钮文案四语

## 额外修改
- `src/lib/api.ts` — BlogPost 接口增加 `title_vi?`, `title_th?`, `abstract_vi?`, `abstract_th?`, `content_vi?`, `content_th?`, `seo_title_vi?`, `seo_title_th?`, `seo_keywords_vi?`, `seo_keywords_th?`, `seo_description_vi?`, `seo_description_th?` 可选字段

## 规则执行
- ✅ `const isZh = locale === 'zh';` 全部删除
- ✅ `isZh ? X : Y` → `locale === 'zh' ? X : (locale === 'vi' ? VI : (locale === 'th' ? TH : Y))` 四语三元
- ✅ `isZh ? (fbZh ?? fbEn) : fbEn` → `(locale === 'zh' ? (fbZh ?? fbEn) : fbEn)` 二元保留（DB 已有 vi/th）
- ✅ `cfg('key', isZh ? '中文' : 'English')` 模式保持原样逻辑，isZh 改为 `locale === 'zh'`
- ✅ `t()` 函数签名从 `(en, zh)` 改为 `(en, zh, vi, th)`
- ✅ 越南语和泰语翻译自然准确

## 构建验证
- `npx next build` 成功通过
- TypeScript 类型检查通过
- 172 个静态页面全部生成
- 零错误，零警告

## 时间
2026-07-23
