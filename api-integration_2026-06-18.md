# 前端数据从静态文件切换到后端 API — 实施报告

## 时间
2026-06-18 14:39 GMT+8

## 背景
paiqi-wiremesh 项目（/Users/anxiang/.qclaw/workspace-agent-4fb505c4/paiqi-wiremesh）的前端展示数据从静态文件（src/lib/data/products.ts 1690行）切换为从后端 Express+SQLite API 获取，实现管理员编辑后前端联动。

## 完成内容

### 第 1 步：后端新增公共 API 端点（backend/server.js）

在 `backend/server.js` 的 PUBLIC API ROUTES 区域新增两个无需认证的端点 + 辅助函数：

1. **`GET /api/catalog`** — 合并多语言产品+分类
   - 查询所有 `status='published'` 的产品，按 slug 合并 en/zh 两条 locale 记录
   - 查询所有 `status='published'` 的分类，按 slug 合并 locale
   - 自动计算每个分类的 productCount
   - 返回格式: `{ products: Product[], categories: Category[] }`

2. **`GET /api/catalog/:slug`** — 单个产品详情（多语言合并）
   - 按 slug 查询并合并多条 locale 记录为单一 Product 对象

3. 新增 `mergeLocaleRows()` 和 `safeJsonParse()` 辅助函数

### 第 2 步：前端创建 API 客户端层（src/lib/api.ts）

新建 `src/lib/api.ts`，提供以下函数：
- `getCatalog()` — 获取全量产品+分类（首页/产品列表用）
- `getProduct(slug)` — 获取单个产品详情
- `getBlogPosts(locale?)` — 获取博客列表
- `getBlogPost(slug, locale?)` — 获取单篇博客
- `submitInquiry(data)` — 提交询盘

智能路由：服务端用 `http://localhost:3001` 直连后端，客户端用相对路径 `/api/...`（经 Next.js rewrites 代理）

### 第 3 步：前端页面改用 API 数据

**修改的文件（7个）：**

| 文件 | 变更 |
|------|------|
| `src/app/[locale]/page.tsx` | 首页：`import {products, categories}` → `fetch('http://localhost:3001/api/catalog')` (server component async fetch) |
| `src/app/[locale]/products/page.tsx` | 产品列表：`import {products, categories}` → `useState+useEffect` 调用 `getCatalog()`，增加 loading spinner |
| `src/app/[locale]/products/[slug]/page.tsx` | 产品详情：`products.find()` → `getProduct(slug)`，related products 从 API 获取 |
| `src/app/[locale]/blog/page.tsx` | 博客列表：硬编码 posts → `getBlogPosts(locale)` |
| `src/app/[locale]/blog/[slug]/page.tsx` | 博客详情：硬编码 blogPosts → `getBlogPost(slug, locale)` + 动态 related posts |
| `src/app/sitemap.xml/route.ts` | Sitemap：static imports → `fetch` 后端 API 动态生成 |
| `src/app/[locale]/contact/page.tsx` | 联系表单：`fetch('/api/inquiry')` → `submitInquiry()` |
| `src/components/inquiry/InquiryModal.tsx` | 询盘弹窗：同上改用 `submitInquiry()` |
| `next.config.ts` | 新增 `/api/catalog/:path*` 代理规则 |

**保留静态数据的部分：**
- `banners` — 首页 banner 轮播（不太会变）
- `whyChooseUs` — 公司优势展示（不太会变）

## 验证结果

1. ✅ `npx tsc --noEmit` — **零类型错误**
2. ✅ `curl -s http://localhost:3001/api/catalog` → **28 products, 13 categories**
3. ✅ `http://localhost:3000/en` → **HTTP 200**
4. ✅ `http://localhost:3000/zh` → **HTTP 200**
5. ✅ `http://localhost:3000/sitemap.xml` → **动态生成正常**
6. ✅ 博客列表/详情、产品详情、产品列表均 HTTP 200

## 关键技术决策

1. **首页保持 server component**：保留 `generateMetadata` SEO 功能，用 `fetch` 直连后端获取数据
2. **产品列表转为 client component**（已标记 'use client'）：使用 `useState + useEffect` + loading spinner
3. **产品详情/博客详情保持 server component**：async fetch 获取数据，支持 SSR
4. **错误静默回退**：API 请求失败时返回空数组，不阻塞页面渲染
5. **Locale 合并逻辑在后端完成**：前端收到的 Product/Category 已经是合并后的多语言对象

## 数据库现状

- Products: 28 个 published（仅 en locale，zh 翻译待管理员补充）
- Categories: 13 个 published（仅 en locale）
- Blog posts: 3 en + 3 zh（已双语言完善）
