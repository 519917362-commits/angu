'use client';

import PageTextManager, { type PageTab } from './PageTextManager';

const TABS: PageTab[] = [
  {
    id: 'header',
    label: '页面头部 Header',
    fields: [
      { key: 'service_header_title', label: '页面主标题 H1' },
      { key: 'service_header_subtitle', label: '页面副标题', rows: 2 },
      { key: 'service_header_breadcrumb', label: '面包屑文字' },
    ],
  },
  {
    id: 'seo',
    label: 'SEO & AI 语料',
    fields: [
      { key: 'seo.service.title_en', label: 'SEO 标题 Title' },
      { key: 'seo.service.description_en', label: 'SEO 描述 Description', rows: 2 },
      { key: 'seo.service.keywords_en', label: 'SEO 关键词 Keywords' },
      { key: 'service_seo_intro', label: 'SEO 简介段落', rows: 4, hint: 'AI爬虫语料' },
    ],
  },
  {
    id: 'service-images',
    label: '服务卡片图片 Service Images',
    fields: [
      { key: 'service_card_1_image', label: '① 定制生产 / Custom Manufacturing', type: 'image' },
      { key: 'service_card_2_image', label: '② 全球运输 / Global Shipping', type: 'image' },
      { key: 'service_card_3_image', label: '③ 单证支持 / Documentation Support', type: 'image' },
      { key: 'service_card_4_image', label: '④ Logo与包装 / Logo & Packaging', type: 'image' },
      { key: 'service_card_5_image', label: '⑤ 24/7销售支持 / Sales Support', type: 'image' },
      { key: 'service_card_6_image', label: '⑥ 第三方检验 / Third-Party Inspection', type: 'image' },
    ],
  },
];

interface Props { token: string; onLogout: () => void; }

export default function ServicePageManager({ token, onLogout }: Props) {
  return <PageTextManager pagePrefix="service" title="服务页配置 Service Page" subtitle="管理服务页头部文字和SEO信息" tabs={TABS} token={token} onLogout={onLogout} />;
}
