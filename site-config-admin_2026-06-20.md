# 站点配置后台管理系统 — 完成记录

**日期：2026-06-20 09:10–09:25**

## 目标
将前端各板块配置（Banner、Why Choose Us、应用场景、站点设置）从静态硬编码迁移到管理后台动态管理。

## 完成内容

### 1. 后端 (server.js)
- **修复 initDatabase() 竞态条件**：所有 `db.run` 用 `db.serialize()` 包裹，确保 DDL + seed 顺序执行
- **修复种子数据重复**：banners/why_choose_us/scenes/site_config 改为 `SELECT COUNT(*)` 先查后插，避免每次重启重复插入
- **新增 4 张表**：`site_config`(key-value双语)、`banners`、`why_choose_us`、`application_scenarios`
- **新增公开接口**：`GET /api/site-config` 合并返回 config/banners/whyChooseUs/scenes（嵌套双语对象格式）
- **新增 admin CRUD 路由**：7 组（site_config GET/PUT, banners/why-choose-us/application-scenarios 各 CRUD）

### 2. 管理后台 UI (4 个新组件)
- **SettingsManager.tsx**：按分组（公司信息/关于/联系/Hero/统计/其他）展示双语输入框，PUT 一次性保存
- **BannerManager.tsx**：列表+编辑视图，支持排序/状态/图片/标题/副标题/CTA
- **WhyChooseUsManager.tsx**：列表+编辑视图，图标/双语标题描述/排序/状态
- **SceneManager.tsx**：列表+编辑视图，图标/双语名称描述/关联分类 slugs

### 3. AdminLayout & admin/page.tsx
- 侧边栏新增 4 个 Tab（banners/why-choose-us/scenes/settings）
- admin-i18n.ts 新增对应导航标签和 TabKey 类型

### 4. 前端数据源切换
- **hooks.ts**：新增 `useSiteConfig()` 和 `useCategories()` 客户端钩子（含全局缓存），以及 `cfgVal()` 辅助函数
- **[locale]/page.tsx**：全面重写为 async Server Component，从 API 拉取 siteConfig/catalog，所有板块文字从 API config 取值，i18n JSON 作为 fallback
- **Header.tsx**：categories 改用 `useCategories()`，WhatsApp 号码从 `useSiteConfig()` 读取
- **Footer.tsx**：公司名称/简介/联系方式/产品分类列表/版权信息全部从 API 读取
- **MobileNav.tsx**：WhatsApp 号码改为 props 传入（从 Header 传递）

### 5. next.config.ts
- 新增 catch-all proxy：`/api/:path*` → `http://localhost:3001/api/:path*`

## 验证结果
- TypeScript 编译：零错误
- 后端健康检查：✅ OK
- `GET /api/site-config`：31 条 config + 3 条 banners + 6 条 whyChooseUs + 9 条 scenes
- Admin CRUD：登录 + 获取 banners 正常
- 前端首页 `/en` 渲染：81KB HTML，所有关键内容（ISO 9001、Gabion、Factory、Wire Mesh、Quote CTA）全部呈现
- API 代理：通过 Next.js rewrite 正常工作

## 注意事项
- 种子数据仅在表为空时插入，不会干扰已有数据
- 产品/博客业务数据需从备份恢复（旧 inquiries.db 已删除重建）
- admin CRUD 数据结构：admin API 用扁平双语字段（title_en/title_zh），公开 API 用嵌套双语对象（title: {en, zh}），两端已适配
