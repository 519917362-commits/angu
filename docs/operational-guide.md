# Angu Wire Mesh - AI 获客运维规则

> 目标：系统化维护 LLMs.txt / FAQ / 结构化数据 / Blog，确保独立站在 ChatGPT / Gemini / Perplexity 等 AI 搜索引擎中持续获得优先引用。

## 一、定期维护清单

### 每周（建议周五执行）

- [ ] **Blog 更新**：新建一篇面向海外采购决策者的博客文章
  - 主题来源：Google Search Console 搜索词报告、客户询盘高频问题、竞品内容分析
  - 格式要求：英文为主，标题含核心关键词，首段结论前置，正文含产品名+规格自然嵌入
  - 字数：800-1,200 词
- [ ] **FAQ 审查**：查看 Google Search Console 中的 FAQ rich result 点击表现
  - 低点击 FAQ 替换或重写
  - 新增 1-2 个 FAQ（基于本周客户询盘中新出现的技术问题）

### 每月（建议每月1日执行）

- [ ] **产品页审查**：抽查 3 个产品页
  - FAQ JSON-LD 结构化数据是否正常渲染（Google Rich Results Test）
  - 规格表数据是否与当前产能一致
  - 图片是否全部正常加载
- [ ] **LLMs.txt 审查**：确认 `public/llms.txt` 中的产品线、关键词、目标市场信息与实际一致
- [ ] **Blog 质量审计**：检查近 3 篇博客在 Google 是否被索引（site:anguwiremesh.com）
- [ ] **竞品监控**：用 Google/Bing 搜索 `galvanized gabion box factory` `chain link fence supplier China` 等核心词，记录前 5 名竞品内容策略变化

### 每季度

- [ ] **结构化数据全量审查**：所有产品页 FAQ JSON-LD + Organization JSON-LD + BreadcrumbList
- [ ] **内容刷新**：所有产品页的"常见问题"至少 1 条更新
- [ ] **应用场景页更新**：新增或更新一个行业应用方案
- [ ] **性能审查**：Lighthouse 评分 ≥ 90（Performance / SEO / Best Practices）

## 二、内容生产规范

### Blog 文章结构模板

```markdown
# [数字]+[形容词]+[核心关键词]+[应用场景标题]
## Quick Answer ([结论前置，100字以内])
## [H2: 产品/方案详细介绍]
## [H2: 技术规格与选型指引]
## [H2: 采购指南与风险提示]
## [H2: 常见问题 FAQ]
```

### 产品FAQ 写作准则

- 每个产品 5 个 FAQ
- 每个 FAQ 的 Q 必须是真实采购/技术问题（而非自问自答的市场话术）
- 每个 FAQ 的 A 含具体数字（规格值、性能数据、价格范围）而非空泛描述
- Q 用英文（面向海外采购商），A 中英文双语
- 控制答案在 80-150 词，确保 AI 搜索引擎能完整引用

### LLMs.txt 更新规则

- 每次新增产品线 / 新增认证 / 新增目标市场 / 新增核心优势时更新
- 保持文件 ≤ 5KB
- 包含：企业定位、核心产品类别与关键词、目标市场、核心优势、语言支持

## 三、SEO 技术基线

### 必做检查项

- [ ] `public/robots.txt`：确保 GPTBot / PerplexityBot / anthropic-ai / CCBot 放行
- [ ] 所有产品页含 `FAQPage` JSON-LD 结构化数据
- [ ] 所有页面含 `canonical` 链接
- [ ] 所有图片含 `alt` 文本
- [ ] 404 页面存在
- [ ] XML Sitemap 可达（`/sitemap.xml`）
- [ ] `robots.txt` 指向 Sitemap

## 四、数据来源

- **产品数据**：`src/lib/data/products.ts`
- **产品 FAQ**：`src/lib/data/productFaqs.ts`
- **Blog 内容**：后端 `angu.db` → `blog_posts` 表
- **翻译文件**：`src/i18n/messages/` 下各语言文件
- **LLMs.txt**：`public/llms.txt`
- **robots.txt**：`public/robots.txt`

## 五、工具与验证

- **Google Rich Results Test**：验证结构化数据：https://search.google.com/test/rich-results
- **Google Search Console**：监控 AI 搜索引擎引用数据（Discover / 富媒体搜索结果）
- **Perplexity Pages**：提交产品页 URL 加速索引 → https://www.perplexity.ai/pages
- **ChatGPT 引用验证**：搜索 `site:anguwiremesh.com` 观察是否被引用
