# About 页面：管理后台配置 + SEO + GEO 优化

**时间**: 2026-06-26 08:56-09:00

## 改造内容

### 1. 去硬编码（全部从 API 动态读取）
- 4 个公司徽章（ISO/CE/年数/国家数）→ 从 `site_config` 读 `stats_*` 动态拼接
- 浮动统计卡片 "500+" → 读 `stats_countries` 
- 右侧工厂大图 → 使用 `factoryImages[0].image_url`（而非硬编码 `gabion-box.jpg`）
- Header 标题/副标题、Overview 段落、各区块标题 → 全部从 `about_*` config key 读取

### 2. SEO 增强
- `generateMetadata` 新增：`openGraph.images`、`twitter:card`、`siteName`
- 页面顶部 Breadcrumb 导航 + 内嵌 `BreadcrumbList` JSON-LD

### 3. GEO 优化
- **Organization JSON-LD**：公司名称、描述、电话、邮箱、地址、成立年份、联系点、sameAs
- **FAQPage JSON-LD**：6 条公司 FAQ（位置、认证、产能、产品、参观、试单），中英双语
- **可见 FAQ 区块**：页面内渲染 6 条 FAQ（geoCategories 内链），双列网格布局
- **产品分类内链**：Overview 区下方 5 个品类 pill 链接（wire-mesh/fence/gabion/protection-net/noise-barrier）
- **信任信号统计条**：4 格数据展示（年限/国家/产品数/质检率）

### 4. 数据双源读取
- 优先读 `/api/about-page-config` 的 config
- 回退读 `/api/site-config` 的 config（合并两个 API 的数据）

## 文件变更
- `src/app/[locale]/about/page.tsx` — 完全重写（31KB）
