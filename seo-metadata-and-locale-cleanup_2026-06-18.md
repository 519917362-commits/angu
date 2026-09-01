# SEO 元数据补全 + 语言简化（12→2）

**时间**：2026-06-18

**目标**：为所有页面添加 SEO 元数据（标题、描述、canonical、hreflang、OpenGraph），同时将多语言从 12 种简化为中英双语。

## 语言简化（12→2）

### locales 常量
- **文件**：`src/lib/routing.ts`
- **变更**：`['en', 'zh', 'ar', 'ja', 'ko', ...]` → `['en', 'zh']`
- **影响范围**：sitemap 生成、generateStaticParams、alternates.languages、JSON-LD

### sitemap
- 从 12 语言 → 2 语言，只生成 `/en/...` 和 `/zh/...` 的 URL

### 首页 JSX 简化
- 删除了 ja/ar 条件分支（Hero、Stats Bar、Featured Products、Categories、CTA 等 13 处）
- 仅保留 `locale === 'zh' ? ... : ...` 模式

### JSON-LD 组织数据
- `availableLanguage` 从 12 种语言缩减为 `['English', 'Chinese']`

### RTLProvider
- 不再需要（仅 ar 语言需要 RTL），但保留文件未删除（非阻塞）

## SEO 元数据补全

### 已添加 generateMetadata 的页面

| 页面 | 文件 | 标题模式 |
|------|------|---------|
| 首页 | `[locale]/page.tsx` | `安固丝网 — 厂家直销 | ISO 9001` / EN 对应 |
| 产品列表 | `[locale]/products/page.tsx` | `丝网产品 — 石笼网、护栏网 | 安固` |
| 产品详情 | `[locale]/products/[slug]/page.tsx` | 产品名 + `| Angu Wire Mesh` |
| 博客列表 | `[locale]/blog/page.tsx` | `丝网行业博客 — 石笼网指南 | 安固` |
| 博客详情 | `[locale]/blog/[slug]/page.tsx` | 文章标题 + `| Angu Wire Mesh`（清除了 markdown 语法） |
| 关于 | `[locale]/about/page.tsx` | `关于安固 — 丝网制造专家 | ISO 9001` |
| 服务 | `[locale]/service/page.tsx` | `服务 — 定制生产、代工与质量控制 | 安固` |
| FAQ | `[locale]/service/faq/page.tsx` | `常见问题 — 丝网产品FAQ | 安固` |
| 下载 | `[locale]/download/page.tsx` | `下载中心 — 产品目录与技术资料 | 安固` |
| 解决方案 | `[locale]/solutions/page.tsx` | 由静态 metadata → dynamic generateMetadata |
| 联系我们 | `[locale]/contact/layout.tsx` | 客户端组件页面的layout级metadata |

### 每个页面 metadata 包含
- ✅ 中英文双标题 + 描述
- ✅ canonical URL（BASE_URL）
- ✅ alternates.languages（EN ↔ ZH hreflang）
- ✅ OpenGraph（title、description、url、siteName、locale、type）

### 根布局更新
- `src/app/layout.tsx`：title.template 改为 `'%s'`（不再追加品牌后缀，各页已包含）
- default title 更新为 `Angu Wire Mesh — Factory-Direct Gabion Boxes...`

## 品牌名清理
- 全局 `Paiqi`/`派琦` → `Angu`/`安固`
- footer 描述
- about 页面标题、描述、时间线
- JSON-LD alternateName
- 根布局 default title

## 验证结果
- TypeScript 编译：零错误
- 所有页面 HTTP 200（20个路由全部通过）
- sitemap：仅 en/zh
- JSON-LD availableLanguage：仅 English/Chinese
- 标题无重复品牌后缀

## 已知残留
- `src/app/[locale]/about/page.tsx` line 42 提到河北派琦 → 已修复为安固
- Footer 中文描述 → 已修复
- `RTLProvider.tsx` 文件仍然存在（非阻塞，未被引用）
- Next.js 16 `middleware` → `proxy` 废弃警告（非阻塞）
