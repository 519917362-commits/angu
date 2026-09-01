'use client';

import PageTextManager, { type PageTab } from './PageTextManager';

const TABS: PageTab[] = [
  {
    id: 'header',
    label: '页面头部 Header',
    fields: [
      { key: 'solutions_header_title', label: '页面主标题 H1' },
      { key: 'solutions_header_subtitle', label: '页面副标题', rows: 2 },
      { key: 'solutions_header_breadcrumb', label: '面包屑文字' },
    ],
  },
  {
    id: 'seo',
    label: 'SEO & AI 语料',
    fields: [
      { key: 'seo.solutions.title_en', label: 'SEO 标题 Title' },
      { key: 'seo.solutions.description_en', label: 'SEO 描述 Description', rows: 2 },
      { key: 'seo.solutions.keywords_en', label: 'SEO 关键词 Keywords' },
      { key: 'solutions_seo_intro', label: 'SEO 简介段落', rows: 3, hint: 'AI爬虫语料' },
    ],
  },
  {
    id: 'solution-images',
    label: '方案卡片图片 Solution Images',
    fields: [
      { key: 'solutions_construction-engineering_image', label: '① 建筑与土木工程 / Construction', type: 'image' },
      { key: 'solutions_highway-railway_image', label: '② 公路与铁路基建 / Highway & Railway', type: 'image' },
      { key: 'solutions_mining-slope-safety_image', label: '③ 矿山与边坡安全 / Mining & Slope', type: 'image' },
      { key: 'solutions_water-conservancy_image', label: '④ 水利与防洪工程 / Water Conservancy', type: 'image' },
      { key: 'solutions_industrial-factory_image', label: '⑤ 工厂与工业方案 / Industrial', type: 'image' },
      { key: 'solutions_perimeter-security_image', label: '⑥ 安防与围界防护 / Perimeter Security', type: 'image' },
      { key: 'solutions_agriculture-farming_image', label: '⑦ 农牧与养殖围栏 / Agriculture', type: 'image' },
      { key: 'solutions_environmental-ecology_image', label: '⑧ 生态修复与绿化 / Environmental', type: 'image' },
      { key: 'solutions_residential-community_image', label: '⑨ 住宅与社区景观 / Residential', type: 'image' },
    ],
  },
];

interface Props { token: string; onLogout: () => void; }

export default function SolutionsPageManager({ token, onLogout }: Props) {
  return <PageTextManager pagePrefix="solutions" title="方案页配置 Solutions Page" subtitle="管理方案页头部文字、SEO信息和方案图片" tabs={TABS} token={token} onLogout={onLogout} />;
}
