# 产品列表页 SEO/GEO/AI 抓取优化

**时间**: 2026-06-26 09:13

## 改了什么

### 新建 `src/app/[locale]/products/layout.tsx` (Server Component)
- `generateMetadata` → dynamic title/desc/keywords/OG/Twitter/canonical/hreflang/robots
- 3 个 JSON-LD 块合并注入 `<head>`：
  - **BreadcrumbList** — 面包屑结构化数据
  - **ItemList** — 30 条产品全部序列化为 Product schema（含 name/description/image/url/sku/offers）
  - **FAQPage** — 6 问 6 答（中英双语），GEO 优化
- SEO 介绍段落（中英），面向 AI 爬虫消化
- 分类快速导航药丸（中英），SEO 内链
- FAQ 手风琴区块（可折叠），GEO 长尾关键词
- 行业应用交叉链接 10 项 → solutions/about/contact 内链

### 重构 `src/app/[locale]/products/page.tsx` (Client Component)
- 移除 Header 区块（迁至 layout）
- 保留分类侧边栏 + 产品网格 + 移动端横向分类 bar
- 分类按产品数量降序排列
- 提取 `CategorySidebar` / `MobileCategoryBar` 子组件
