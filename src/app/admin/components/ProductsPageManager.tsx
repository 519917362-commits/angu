'use client';

import PageTextManager, { type PageTab } from './PageTextManager';

const TABS: PageTab[] = [
  {
    id: 'header',
    label: '页面头部 Header',
    fields: [
      { key: 'products_header_title', label: '页面主标题 H1' },
      { key: 'products_header_subtitle', label: '页面副标题', rows: 2 },
      { key: 'products_header_breadcrumb', label: '面包屑文字' },
    ],
  },
  {
    id: 'seo',
    label: 'SEO & AI 语料',
    fields: [
      { key: 'seo.products.title_en', label: 'SEO 标题 Title' },
      { key: 'seo.products.description_en', label: 'SEO 描述 Description', rows: 2 },
      { key: 'seo.products.keywords_en', label: 'SEO 关键词 Keywords' },
      { key: 'products_seo_intro', label: 'SEO 简介段落', rows: 3, hint: 'AI爬虫语料，不在页面上显示' },
    ],
  },
];

interface Props { token: string; onLogout: () => void; }

export default function ProductsPageManager({ token, onLogout }: Props) {
  return <PageTextManager pagePrefix="products" title="产品页配置 Products Page" subtitle="管理产品列表页头部文字和SEO信息" tabs={TABS} token={token} onLogout={onLogout} />;
}
