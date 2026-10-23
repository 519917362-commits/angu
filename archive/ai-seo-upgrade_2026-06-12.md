# Angu Wire Mesh — AI 获客系统性改造 (2026-06-12)

## 目标
系统化改造 Angu 外贸独立站，使其在 ChatGPT / Gemini / Perplexity 等 AI 搜索引擎中获得优先引用，提升海外 B2B 采购决策者的自然发现率。

## 已完成交付物

### Part 1: LLMs.txt + Robots.txt（底层配置通过）
- `public/llms.txt` (3,142 bytes)：企业定位、核心产品关键词、目标市场、核心优势、技术规格范围、语言支持
- `public/robots.txt` (752 bytes)：放行 GPTBot、PerplexityBot、anthropic-ai、CCBot、Google-Extended；禁止 /admin/ 和 /api/；指向 sitemap

### Part 2: 产品页 FAQ 化（结论前置 + 结构化数据）
- `src/lib/data/productFaqs.ts` (258 行)：28 个产品各 3-5 个 FAQ，含中英文 Q&A。问题覆盖海外采购商真实技术决策点（规格对比、防腐等级、安装要求、认证标准、适用场景）。
- `src/components/products/FaqSection.tsx`：可折叠 FAQ 组件，内嵌 Schema.org `FAQPage` JSON-LD
- `src/app/[locale]/products/[slug]/page.tsx`：改造产品详情页，集成 FaqSection + 注入 JSON-LD 结构化数据

### Part 3: 应用场景解决方案页
- `src/app/[locale]/solutions/page.tsx`：6 大行业方案（河岸防护、公路边坡、周界安防、矿山设施、体育场馆、景观建筑），每个含场景介绍、分步实施流程（编号步骤卡片）、推荐产品链接、底部 CTA

### Part 4: 行业 FAQ 页强化
- `src/app/[locale]/service/faq/page.tsx`：注入 Schema.org `FAQPage` JSON-LD 结构化数据

### Part 5: 导航入口
- Header.tsx：新增 "Solutions / 解决方案" 导航
- MobileNav.tsx：同步新增

### Part 6: 运维规则文档
- `docs/operational-guide.md` (87 行)：周/月/季度维护清单、Blog 写作模板、FAQ 写作准则、SEO 技术基线、数据来源、验证工具清单

## 未开始（后续迭代）
- Sitemap.xml 生成（用于 robots.txt 指向和搜索引擎爬取）
- Organization JSON-LD 全站结构化数据
- 首页 Hero 结论前置优化
- 外链 Profile（Google Business、LinkedIn、行业目录）
- Perplexity Pages 手动提交
